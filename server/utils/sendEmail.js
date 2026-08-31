export const sendEmail = async ({ to, subject, html }) => {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Text-To-Learn",
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html,
      }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Failed to send email via Brevo API");
    }
  
    return data;
};