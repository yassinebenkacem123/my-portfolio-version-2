/**
 * Brevo Email Service
 *
 * Sends transactional email alerts using native Node fetch to call the Brevo SMTP API.
 */

export interface SendEmailOptions {
  userEmail: string
  name?: string
  message?: string
}

/**
 * Sends a notification email when a user submits their email address or a full contact message.
 */
export async function sendContactEmail({ userEmail, name, message }: SendEmailOptions): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    throw new Error('Server missing BREVO_API_KEY environment variable.')
  }

  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'yassinbenkacem12@gmail.com'
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'yassinbenkacem12@gmail.com'

  const subject = name 
    ? `📩 New Contact Request from ${name}`
    : '📩 New Contact Request'

  // Dynamic rows based on which fields are provided
  const nameCard = name 
    ? `
        <div class="card">
          <div class="label">Name</div>
          <div class="value">${name}</div>
        </div>
      `
    : '';

  const emailCard = `
    <div class="card">
      <div class="label">Email Address</div>
      <div class="value">${userEmail}</div>
    </div>
  `;

  const messageCard = message 
    ? `
        <div class="card">
          <div class="label">Message</div>
          <div class="value" style="font-size: 15px; line-height: 1.6; color: #334155; white-space: pre-wrap; font-weight: normal;">${message}</div>
        </div>
      `
    : `
        <div class="message-box">
          <p>Hello Yassine,</p>
          <p>A user with the email address <strong>${userEmail}</strong> wants to contact you. Don't forget to get back to them as soon as possible.</p>
        </div>
      `;

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: name ? `${name} (via Portfolio)` : 'Portfolio Contact Form',
        email: senderEmail,
      },
      to: [
        {
          email: receiverEmail,
          name: 'Yassine Benkacem',
        },
      ],
      replyTo: {
        email: userEmail,
        ...(name ? { name } : {}),
      },
      subject: subject,
      htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f6f9fc;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f6f9fc;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
    }
    .header {
      background: linear-gradient(135deg, #111111 0%, #333333 100%);
      padding: 36px 30px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: -0.02em;
    }
    .header p {
      margin: 6px 0 0 0;
      font-size: 13px;
      color: #999999;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .content {
      padding: 40px 30px;
    }
    .card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .card:last-of-type {
      margin-bottom: 28px;
    }
    .label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
      margin-bottom: 6px;
      font-weight: 700;
    }
    .value {
      font-size: 16px;
      color: #0f172a;
      font-weight: 500;
      word-break: break-all;
    }
    .message-box {
      font-size: 15px;
      line-height: 1.6;
      color: #334155;
      margin-bottom: 32px;
    }
    .button-container {
      text-align: center;
    }
    .btn {
      display: inline-block;
      background-color: #111111;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(17, 17, 17, 0.15);
      transition: all 0.2s ease;
    }
    .footer {
      padding: 24px 30px;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      border-top: 1px solid #f1f5f9;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>New Contact Request</h1>
        <p>Portfolio Website</p>
      </div>
      <div class="content">
        ${nameCard}
        ${emailCard}
        ${messageCard}
        
        <div class="button-container">
          <a href="mailto:${userEmail}" class="btn">Reply to Visitor</a>
        </div>
      </div>
      <div class="footer">
        <p>This notification was automatically sent from your portfolio backend.</p>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Brevo SMTP API returned HTTP ${response.status}: ${errorText}`)
  }
}
