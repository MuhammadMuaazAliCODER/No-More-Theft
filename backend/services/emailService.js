const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    try {
      // Validate required environment variables
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('❌ EMAIL_USER and EMAIL_PASS must be set in .env file');
        return;
      }

      if (!process.env.SUPPORT_EMAIL) {
        console.error('❌ SUPPORT_EMAIL must be set in .env file');
        return;
      }

      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      console.log('✅ Email transporter initialized');
      console.log(`📧 Emails will be sent from: ${process.env.EMAIL_USER}`);
      console.log(`📬 Support emails will go to: ${process.env.SUPPORT_EMAIL}`);
    } catch (error) {
      console.error('❌ Failed to initialize email transporter:', error.message);
    }
  }

  async sendDemoRequestEmail(data) {
    if (!this.transporter) {
      console.error('Email transporter not initialized');
      return false;
    }

    // Validate support email
    if (!process.env.SUPPORT_EMAIL) {
      console.error('SUPPORT_EMAIL is not defined in environment variables');
      return false;
    }

    const {
      name,
      companyName,
      email,
      phoneNumber,
      businessType,
      numCameras,
      businessHours,
      description
    } = data;

    // Email to support team
    const supportEmailOptions = {
      from: `"Demo Requests" <${process.env.EMAIL_USER}>`,
      to: process.env.SUPPORT_EMAIL,
      subject: `New Demo Request from ${companyName}`,
      html: this.generateSupportEmailTemplate(data),
      text: this.generateSupportEmailText(data)
    };

    // Confirmation email to user
    const userEmailOptions = {
      from: `"Your Company" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank You for Your Demo Request',
      html: this.generateUserConfirmationTemplate(data),
      text: this.generateUserConfirmationText(data)
    };

    try {
      // Send to support
      await this.transporter.sendMail(supportEmailOptions);
      console.log(`📧 Support email sent for demo request from ${name}`);

      // Send confirmation to user
      await this.transporter.sendMail(userEmailOptions);
      console.log(`📧 Confirmation email sent to ${email}`);

      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  generateSupportEmailTemplate(data) {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .header {
      background-color: #4CAF50;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      background-color: white;
      padding: 30px;
      border-radius: 0 0 5px 5px;
    }
    .field {
      margin-bottom: 15px;
    }
    .label {
      font-weight: bold;
      color: #555;
    }
    .value {
      margin-top: 5px;
      padding: 10px;
      background-color: #f5f5f5;
      border-left: 3px solid #4CAF50;
    }
    .footer {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🎯 New Demo Request</h2>
    </div>
    <div class="content">
      <p>A new demo request has been submitted. Details below:</p>
      
      <div class="field">
        <div class="label">Contact Person:</div>
        <div class="value">${data.name}</div>
      </div>
      
      <div class="field">
        <div class="label">Company Name:</div>
        <div class="value">${data.companyName}</div>
      </div>
      
      <div class="field">
        <div class="label">Email Address:</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      
      <div class="field">
        <div class="label">Phone Number:</div>
        <div class="value"><a href="tel:${data.phoneNumber}">${data.phoneNumber}</a></div>
      </div>
      
      <div class="field">
        <div class="label">Business Type:</div>
        <div class="value">${data.businessType}</div>
      </div>
      
      <div class="field">
        <div class="label">Number of Cameras:</div>
        <div class="value">${data.numCameras}</div>
      </div>
      
      <div class="field">
        <div class="label">Business Hours:</div>
        <div class="value">${data.businessHours}</div>
      </div>
      
      ${data.description ? `
      <div class="field">
        <div class="label">Additional Information:</div>
        <div class="value">${data.description}</div>
      </div>
      ` : ''}
      
      <div class="footer">
        <p>Submitted on: ${new Date().toLocaleString()}</p>
        <p>Please follow up with this request as soon as possible.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;
  }

  generateSupportEmailText(data) {
    return `
NEW DEMO REQUEST

Contact Person: ${data.name}
Company Name: ${data.companyName}
Email: ${data.email}
Phone Number: ${data.phoneNumber}
Business Type: ${data.businessType}
Number of Cameras: ${data.numCameras}
Business Hours: ${data.businessHours}
${data.description ? `Additional Information: ${data.description}` : ''}

Submitted on: ${new Date().toLocaleString()}
    `;
  }

  generateUserConfirmationTemplate(data) {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .header {
      background-color: #4CAF50;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      background-color: white;
      padding: 30px;
      border-radius: 0 0 5px 5px;
    }
    .highlight {
      background-color: #e8f5e9;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>✅ Demo Request Received</h2>
    </div>
    <div class="content">
      <p>Dear ${data.name},</p>
      
      <p>Thank you for requesting a demo! We've received your submission and our team will review it shortly.</p>
      
      <div class="highlight">
        <strong>What's Next?</strong>
        <ul>
          <li>Our team will review your request within 24 hours</li>
          <li>We'll reach out to schedule a convenient time for your demo</li>
          <li>You'll receive a confirmation email with the demo details</li>
        </ul>
      </div>
      
      <p><strong>Your Submission Details:</strong></p>
      <ul>
        <li>Company: ${data.companyName}</li>
        <li>Business Type: ${data.businessType}</li>
        <li>Number of Cameras: ${data.numCameras}</li>
      </ul>
      
      <p>If you have any questions or need immediate assistance, please don't hesitate to contact us.</p>
      
      <p>Best regards,<br>The Team</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  generateUserConfirmationText(data) {
    return `
Dear ${data.name},

Thank you for requesting a demo! We've received your submission and our team will review it shortly.

What's Next?
- Our team will review your request within 24 hours
- We'll reach out to schedule a convenient time for your demo
- You'll receive a confirmation email with the demo details

Your Submission Details:
- Company: ${data.companyName}
- Business Type: ${data.businessType}
- Number of Cameras: ${data.numCameras}

If you have any questions or need immediate assistance, please don't hesitate to contact us.

Best regards,
The Team
    `;
  }
}

module.exports = new EmailService();