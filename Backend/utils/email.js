const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const emailTemplates = {
  welcome: (data) => ({
    subject: 'Welcome to Star_Housekeeping !',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to Star_Housekeeping !</h2>
        <p>Hi ${data.name},</p>
        <p>Thank you for registering with Star_Housekeeping ! We're excited to have you as part of our community.</p>
        <p>Your account has been created successfully with the email: <strong>${data.email}</strong></p>
        <p>Here's what you can do next:</p>
        <ul>
          <li>Browse our internet plans</li>
          <li>Check service availability in your area</li>
          <li>Contact our support team for any questions</li>
        </ul>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The Star_Housekeeping  Team</p>
      </div>
    `
  }),

  'password-reset': (data) => ({
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Password Reset Request</h2>
        <p>Hi ${data.name},</p>
        <p>We received a request to reset your password. Click the link below to reset it:</p>
        <p><a href="${process.env.FRONTEND_URL}/reset-password?token=${data.resetToken}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; dlay: inline-block;">Reset Password</a></p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
        <p>Best regards,<br>The Star_Housekeeping  Team</p>
      </div>
    `
  }),

  'new-ticket': (data) => ({
    subject: `New Support Ticket #${data.ticketId}: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Support Ticket</h2>
        <p><strong>Ticket ID:</strong> #${data.ticketId}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Priority:</strong> ${data.priority}</p>
        <p><strong>Category:</strong> ${data.category}</p>
        <p><strong>User:</strong> ${data.userName} (${data.userEmail})</p>
        <p><strong>Description:</strong></p>
        <p style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">${data.description}</p>
        <p>Please respond to this ticket as soon as possible.</p>
      </div>
    `
  }),

  'ticket-message': (data) => ({
    subject: `Support Ticket #${data.ticketId} - New Message`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Message in Support Ticket</h2>
        <p><strong>Ticket ID:</strong> #${data.ticketId}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>From:</strong> ${data.userName}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">${data.message}</p>
        <p>Please review and respond accordingly.</p>
      </div>
    `
  }),

  'ticket-status-update': (data) => ({
    subject: `Support Ticket #${data.ticketId} Status Updated`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Ticket Status Updated</h2>
        <p>Hi ${data.userName},</p>
        <p>The status of your support ticket has been updated:</p>
        <p><strong>Ticket ID:</strong> #${data.ticketId}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>New Status:</strong> <span style="color: #059669; font-weight: bold;">${data.status}</span></p>
        <p>We'll continue to work on resolving your issue. Thank you for your patience.</p>
        <p>Best regards,<br>The Star_Housekeeping  Support Team</p>
      </div>
    `
  }),

  'contact-inquiry': (data) => ({
    subject: data.subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Inquiry Type:</strong> ${data.inquiryType}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">${data.message}</p>
        <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
      </div>
    `
  }),

  'inquiry-confirmation': (data) => ({
    subject: 'Thank you for contacting Star_Housekeeping ',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank you for contacting us!</h2>
        <p>Hi ${data.name},</p>
        <p>We have received your ${data.inquiryType} inquiry: <strong>${data.subject}</strong></p>
        <p>${data.message}</p>
        <p>Our team will review your inquiry and get back to you as soon as possible.</p>
        <p>In the meantime, you can:</p>
        <ul>
          <li>Check our FAQ section</li>
          <li>Browse our internet plans</li>
          <li>Contact us for urgent matters</li>
        </ul>
        <p>Best regards,<br>The Star_Housekeeping  Team</p>
      </div>
    `
  }),

  'customer-feedback': (data) => ({
    subject: `Customer Feedback - ${data.category} (${data.rating}/5)`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Customer Feedback</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Rating:</strong> ${data.rating}/5</p>
        <p><strong>Category:</strong> ${data.category}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">${data.message}</p>
        <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
      </div>
    `
  }),

  'feedback-thanks': (data) => ({
    subject: 'Thank you for your feedback!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank you for your feedback!</h2>
        <p>Hi ${data.name},</p>
        <p>We appreciate you taking the time to provide feedback about our ${data.category}.</p>
        <p>Your rating: <strong>${data.rating}/5</strong></p>
        <p>Your feedback helps us improve our services and provide better experiences for all our customers.</p>
        <p>Best regards,<br>The Star_Housekeeping  Team</p>
      </div>
    `
  }),

  'availability-check': (data) => ({
    subject: `Service Availability Check - ${data.address.zipCode}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Service Availability Check Request</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Address:</strong> ${data.address.street}, ${data.address.city}, ${data.address.state} ${data.address.zipCode}</p>
        <p><strong>Current Provider:</strong> ${data.currentProvider}</p>
        <p><strong>Move-in Date:</strong> ${data.moveInDate}</p>
        <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
        <p>Please check service availability for this address and contact the customer.</p>
      </div>
    `
  }),

  'availability-confirmation': (data) => ({
    subject: 'Service Availability Check Submitted',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Availability Check Submitted</h2>
        <p>Hi ${data.firstName},</p>
        <p>We have received your service availability check request for:</p>
        <p><strong>${data.address}</strong></p>
        <p>${data.message}</p>
        <p>Our sales team will review your area and contact you with the results.</p>
        <p>Best regards,<br>The Star_Housekeeping  Sales Team</p>
      </div>
    `
  })
};

// Main email sending function
const sendEmail = async ({ to, subject, template, data }) => {
  try {
    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email configuration not found. Skipping email send.');
      return;
    }

    const transporter = createTransporter();
    
    // Get template
    const emailTemplate = emailTemplates[template];
    if (!emailTemplate) {
      throw new Error(`Email template '${template}' not found`);
    }

    // Generate email content
    const emailContent = emailTemplate(data);
    
    // Send email
    const info = await transporter.sendMail({
      from: `"Star_Housekeeping " <${process.env.EMAIL_USER}>`,
      to: to,
      subject: emailContent.subject,
      html: emailContent.html
    });

    console.log('Email sent successfully:', info.messageId);
    return info;

  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Test email function
const testEmail = async () => {
  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: 'Test Email from Star_Housekeeping  Backend',
      template: 'welcome',
      data: {
        name: 'Test User',
        email: 'test@example.com'
      }
    });
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Test email failed:', error);
  }
};

module.exports = {
  sendEmail,
  testEmail
};
