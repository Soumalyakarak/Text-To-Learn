export const otpEmailTemplate = (otpCode) => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; color: #171717;">
        
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f5; padding: 40px 20px;">
          <tr>
            <td align="center">
              <!-- Main Card -->
              <table width="100%" style="max-width: 500px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
                
                <!-- Header -->
                <tr>
                  <td style="padding: 32px 32px 0 32px; text-align: center;">
                    <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #171717; letter-spacing: -0.5px;">
                      <span style="color: #FF6363;">●</span> Text-to-Learn
                    </h2>
                  </td>
                </tr>
      
                <!-- Body -->
                <tr>
                  <td style="padding: 24px 32px 32px 32px;">
                    <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 24px; color: #525252;">
                      Hello,
                    </p>
                    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: #525252;">
                      You recently requested to verify your identity. Enter the following verification code to complete the process:
                    </p>
      
                    <!-- OTP Box -->
                    <div style="background-color: #fafafa; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
                      <span style="font-family: monospace; font-size: 36px; font-weight: 700; color: #171717; letter-spacing: 8px;">
                        {{OTP_CODE}}
                      </span>
                    </div>
      
                    <p style="margin: 0 0 8px 0; font-size: 14px; line-height: 20px; color: #737373;">
                      This code will expire in <strong>10 minutes</strong>.
                    </p>
                    <p style="margin: 0; font-size: 14px; line-height: 20px; color: #737373;">
                      If you did not request this code, you can safely ignore this email.
                    </p>
                  </td>
                </tr>
      
                <!-- Footer -->
                <tr>
                  <td style="padding: 24px 32px; background-color: #fafafa; border-top: 1px solid #f0f0f0; text-align: center;">
                    <p style="margin: 0; font-size: 12px; color: #a3a3a3;">
                      &copy; 2026 Text-to-Learn. All rights reserved.
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  
    return html.replace('{{OTP_CODE}}', otpCode);
  };