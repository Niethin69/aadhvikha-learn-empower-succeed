
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { table, operation, data } = await req.json();
    
    console.log(`Syncing ${operation} operation on ${table} table to Google Sheets`);
    console.log('Data:', data);

    // Get Google Sheets credentials from Supabase secrets
    const googleCredentials = Deno.env.get('GOOGLE_SHEETS_CREDENTIALS');
    const googleSheetsId = Deno.env.get('GOOGLE_SHEETS_ID');
    
    if (!googleCredentials || !googleSheetsId) {
      console.error('Missing Google Sheets credentials or Sheet ID');
      return new Response(
        JSON.stringify({ 
          error: 'Google Sheets credentials not configured',
          message: 'Please configure GOOGLE_SHEETS_CREDENTIALS and GOOGLE_SHEETS_ID in Supabase secrets'
        }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse Google credentials
    const credentials = JSON.parse(googleCredentials);
    
    // Get access token from Google
    const jwtToken = await createJWT(credentials);
    const accessToken = await getAccessToken(jwtToken);
    
    // Determine which sheet to write to and format data
    let sheetName = '';
    let values: any[] = [];
    
    if (table === 'applications') {
      sheetName = 'Applications';
      values = [
        data.id,
        data.submitted_at,
        data.full_name,
        data.email,
        data.phone,
        data.course,
        data.message || ''
      ];
    } else if (table === 'course_applications') {
      sheetName = 'Course Applications';
      values = [
        data.id,
        data.submitted_at,
        data.full_name,
        data.email,
        data.phone,
        data.date_of_birth,
        data.gender,
        data.street,
        data.street_second || '',
        data.state,
        data.postcode,
        data.country,
        data.passport_ic,
        data.document_file_name || '',
        data.document_file_url || '',
        data.terms_accepted ? 'YES' : 'NO',
        data.course_code || 'MGT1800'
      ];
    }
    
    // Append data to Google Sheets
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${googleSheetsId}/values/${sheetName}:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [values]
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API error:', errorText);
      throw new Error(`Google Sheets API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Successfully synced to Google Sheets:', result);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully synced ${table} data to Google Sheets`,
        updatedRange: result.updates?.updatedRange 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error syncing to Google Sheets:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to sync to Google Sheets', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Helper function to create JWT token for Google API
async function createJWT(credentials: any) {
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  
  // Import the private key
  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    new TextEncoder().encode(credentials.private_key.replace(/\\n/g, '\n')),
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  // Sign the JWT
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    new TextEncoder().encode(signatureInput)
  );

  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${signatureInput}.${encodedSignature}`;
}

// Helper function to get access token from Google
async function getAccessToken(jwtToken: string) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwtToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}
