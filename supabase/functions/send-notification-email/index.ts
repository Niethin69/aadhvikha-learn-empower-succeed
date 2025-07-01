
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
    const { table, data } = await req.json();
    
    console.log(`Sending email notification for ${table} submission`);
    console.log('Application data:', data);

    const recipients = ['akhilshreedharan@gmail.com', 'niethinrueshil@gmail.com'];
    
    let subject = '';
    let htmlContent = '';
    
    if (table === 'applications') {
      subject = 'New Course Information Request Received';
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
            New Course Information Request
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Applicant Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold; width: 30%;">Name:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${data.full_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${data.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Course:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${data.course}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Submitted:</td>
                <td style="padding: 8px 0;">${new Date(data.submitted_at).toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          ${data.message ? `
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
            <h4 style="margin-top: 0; color: #856404;">Message from Applicant:</h4>
            <p style="margin-bottom: 0; color: #856404;">${data.message}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e7f3ff; border-radius: 8px;">
            <p style="margin: 0; color: #0066cc; font-size: 14px;">
              <strong>Action Required:</strong> Please follow up with the applicant within 24 hours as promised.
            </p>
          </div>
        </div>
      `;
    } else if (table === 'course_applications') {
      subject = 'New Course Application Submitted';
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
            New Course Application - ${data.course_code || 'MGT1800'}
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Personal Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold; width: 30%;">Name:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${data.full_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${data.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Date of Birth:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${data.date_of_birth}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Gender:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #ddd; text-transform: capitalize;">${data.gender}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Passport/IC:</td>
                <td style="padding: 8px 0;">${data.passport_ic}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Address Information</h3>
            <p style="margin: 5px 0;"><strong>Street:</strong> ${data.street}</p>
            ${data.street_second ? `<p style="margin: 5px 0;"><strong>Street (Line 2):</strong> ${data.street_second}</p>` : ''}
            <p style="margin: 5px 0;"><strong>State:</strong> ${data.state}</p>
            <p style="margin: 5px 0;"><strong>Postcode:</strong> ${data.postcode}</p>
            <p style="margin: 5px 0;"><strong>Country:</strong> ${data.country}</p>
          </div>
          
          ${data.document_file_name ? `
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
            <h4 style="margin-top: 0; color: #856404;">Document Submitted:</h4>
            <p style="margin-bottom: 0; color: #856404;">${data.document_file_name}</p>
            ${data.document_file_url ? `<p style="margin: 5px 0;"><a href="${data.document_file_url}" style="color: #0066cc;">View Document</a></p>` : ''}
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 15px; background-color: #d4edda; border-radius: 8px; border-left: 4px solid #28a745;">
            <p style="margin: 0; color: #155724; font-size: 14px;">
              <strong>Action Required:</strong> Please review the application and supporting documents. Follow up within 24-48 hours as promised.
            </p>
          </div>
          
          <div style="margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #666; font-size: 12px;">
              Submitted on: ${new Date(data.submitted_at).toLocaleString()}
            </p>
          </div>
        </div>
      `;
    }

    // Send emails to both recipients
    const emailPromises = recipients.map(email => 
      resend.emails.send({
        from: 'Aadhvikha Ventures <notifications@resend.dev>',
        to: [email],
        subject: subject,
        html: htmlContent,
      })
    );

    const results = await Promise.allSettled(emailPromises);
    
    // Log results
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Email sent successfully to ${recipients[index]}:`, result.value);
      } else {
        console.error(`Failed to send email to ${recipients[index]}:`, result.reason);
      }
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Email notifications sent for ${table} submission`,
        results: results.map((result, index) => ({
          recipient: recipients[index],
          status: result.status,
          success: result.status === 'fulfilled'
        }))
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error sending notification email:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send notification email', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
