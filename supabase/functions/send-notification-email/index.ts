
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
    
    console.log(`Processing email notification for ${table} submission`);
    console.log('Form data:', JSON.stringify(data, null, 2));

    const recipients = ['akhilshreedharan@gmail.com', 'niethinrueshil@gmail.com'];
    
    let subject = '';
    let htmlContent = '';
    
    if (table === 'applications') {
      subject = 'New Course Information Request - Aadhvikha Ventures';
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Aadhvikha Ventures</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">New Course Information Request</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="margin-top: 0; color: #374151; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Applicant Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 30%; color: #6b7280;">Name:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.full_name || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Email:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.email || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Phone:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Course Interest:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.course || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Submitted:</td>
                  <td style="padding: 12px 0; color: #374151;">${new Date(data.submitted_at || data.created_at).toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            ${data.message ? `
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
              <h4 style="margin-top: 0; color: #92400e; font-size: 16px;">Message from Applicant:</h4>
              <p style="margin-bottom: 0; color: #92400e; line-height: 1.6;">${data.message}</p>
            </div>
            ` : ''}
            
            <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1e40af; font-weight: 500;">
                <strong>⚡ Action Required:</strong> Please follow up with the applicant within 24 hours as promised on the website.
              </p>
            </div>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; border: 1px solid #e5e7eb; border-top: none;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This email was automatically generated from your website contact form.
            </p>
          </div>
        </div>
      `;
    } else if (table === 'course_applications') {
      subject = 'New Course Application Submitted - Aadhvikha Ventures';
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Aadhvikha Ventures</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">New Course Application - ${data.course_code || 'MGT1800'}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="margin-top: 0; color: #374151; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Personal Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 30%; color: #6b7280;">Name:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.full_name || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Email:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.email || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Phone:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Date of Birth:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.date_of_birth || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Gender:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #374151; text-transform: capitalize;">${data.gender || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: bold; color: #6b7280;">Passport/IC:</td>
                  <td style="padding: 12px 0; color: #374151;">${data.passport_ic || 'Not provided'}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="margin-top: 0; color: #374151; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Address Information</h3>
              <div style="color: #374151; line-height: 1.6;">
                <p style="margin: 5px 0;"><strong>Street:</strong> ${data.street || 'Not provided'}</p>
                ${data.street_second ? `<p style="margin: 5px 0;"><strong>Street (Line 2):</strong> ${data.street_second}</p>` : ''}
                <p style="margin: 5px 0;"><strong>State:</strong> ${data.state || 'Not provided'}</p>
                <p style="margin: 5px 0;"><strong>Postcode:</strong> ${data.postcode || 'Not provided'}</p>
                <p style="margin: 5px 0;"><strong>Country:</strong> ${data.country || 'Not provided'}</p>
              </div>
            </div>
            
            ${data.document_file_name ? `
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
              <h4 style="margin-top: 0; color: #92400e; font-size: 16px;">Document Submitted:</h4>
              <p style="margin-bottom: 5px; color: #92400e; font-weight: 500;">${data.document_file_name}</p>
              ${data.document_file_url ? `<p style="margin: 5px 0;"><a href="${data.document_file_url}" style="color: #1d4ed8; text-decoration: underline;">📄 View Document</a></p>` : ''}
            </div>
            ` : ''}
            
            <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; border-left: 4px solid #16a34a; margin-bottom: 20px;">
              <p style="margin: 0; color: #15803d; font-weight: 500;">
                <strong>⚡ Action Required:</strong> Please review the application and supporting documents. Follow up within 24-48 hours as promised.
              </p>
            </div>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; border: 1px solid #e5e7eb; border-top: none;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              Submitted on: ${new Date(data.submitted_at || data.created_at).toLocaleString()}
            </p>
            <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">
              This email was automatically generated from your course application form.
            </p>
          </div>
        </div>
      `;
    } else {
      throw new Error(`Unknown table: ${table}`);
    }

    console.log(`Sending email with subject: ${subject}`);
    console.log(`Recipients: ${recipients.join(', ')}`);

    // Send emails to both recipients
    const emailPromises = recipients.map(email => {
      console.log(`Preparing email for: ${email}`);
      return resend.emails.send({
        from: 'Aadhvikha Ventures <notifications@resend.dev>',
        to: [email],
        subject: subject,
        html: htmlContent,
      });
    });

    const results = await Promise.allSettled(emailPromises);
    
    // Log detailed results
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`✅ Email sent successfully to ${recipients[index]}:`, result.value);
      } else {
        console.error(`❌ Failed to send email to ${recipients[index]}:`, result.reason);
      }
    });

    // Check if any emails failed
    const failedEmails = results.filter(result => result.status === 'rejected');
    const successfulEmails = results.filter(result => result.status === 'fulfilled');

    console.log(`Email summary: ${successfulEmails.length} successful, ${failedEmails.length} failed`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Email notifications processed for ${table} submission`,
        summary: {
          total: recipients.length,
          successful: successfulEmails.length,
          failed: failedEmails.length
        },
        results: results.map((result, index) => ({
          recipient: recipients[index],
          status: result.status,
          success: result.status === 'fulfilled',
          details: result.status === 'fulfilled' ? result.value : result.reason
        }))
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error in send-notification-email function:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    });
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send notification email', 
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
