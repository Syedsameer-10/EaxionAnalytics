import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

export function initializeEmailService(config: {
  email: string;
  password: string;
  host?: string;
  port?: number;
}) {
  transporter = nodemailer.createTransport({
    host: config.host || "smtp.gmail.com",
    port: config.port || 587,
    secure: false,
    auth: {
      user: config.email,
      pass: config.password,
    },
  });
  // Verify transporter connectivity and credentials early so failures are visible on startup
  transporter.verify()
    .then(() => console.log('SMTP transporter verified successfully'))
    .catch((err) => console.error('SMTP transporter verification failed:', err && err.message ? err.message : err));
}

export interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
}

export async function sendConfirmationEmail(
  clientEmail: string,
  data: ApplicationData,
  courseTitle: string
) {
  if (!transporter) {
    throw new Error("Email service not initialized");
  }

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #000000 0%, #1a2332 100%); padding: 40px; border-radius: 10px; text-align: center;">
        <h1 style="color: #10b981; margin: 0; font-size: 28px;">Eaxion Analytics</h1>
        <p style="color: #9ca3af; margin: 10px 0 0 0;">Professional Learning Tracks</p>
      </div>
      
      <div style="background: #f9fafb; padding: 40px; border-radius: 10px; margin-top: 20px;">
        <h2 style="color: #1f2937; margin-top: 0;">Application Received!</h2>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Dear <strong>${data.name}</strong>,
        </p>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Thank you for submitting your application to Eaxion Analytics. We've received your registration and our team will review your details shortly.
        </p>
        
        <div style="background: white; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin: 30px 0;">
          <h3 style="color: #10b981; margin-top: 0;">Application Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;"><strong>Name:</strong></td>
              <td style="padding: 10px 0; color: #1f2937;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; color: #1f2937;">${data.email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;"><strong>Phone:</strong></td>
              <td style="padding: 10px 0; color: #1f2937;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280;"><strong>Selected Course:</strong></td>
              <td style="padding: 10px 0; color: #1f2937;">${courseTitle}</td>
            </tr>
          </table>
        </div>
        
        <p style="color: #4b5563; line-height: 1.6;">
          ${data.message ? `<strong>Your Message:</strong><br/><em>"${data.message}"</em><br/><br/>` : ""}
          Our admissions team will contact you within 24-48 hours to discuss your learning goals and next steps. In the meantime, if you have any questions, feel free to reach out to us at <a href="mailto:admissions@eaxion.com" style="color: #10b981; text-decoration: none;">admissions@eaxion.com</a>.
        </p>
        
        <p style="color: #6b7280; margin-top: 30px; font-size: 14px;">
          Best regards,<br/>
          <strong>The Eaxion Analytics Team</strong>
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
        <p>© 2025 Eaxion Analytics. All rights reserved.</p>
      </div>
    </div>
  `;

  const info = await transporter.sendMail({
    from: `Eaxion Analytics <${process.env.EMAIL_USER || 'noreply@eaxion.com'}>`,
    to: clientEmail,
    subject: `Application Confirmed - ${courseTitle} at Eaxion Analytics`,
    html: emailHtml,
  });
  console.log(`Sent confirmation email to ${clientEmail} (messageId: ${info.messageId})`);
  return info;
}

export async function sendAdminNotification(
  adminEmail: string,
  data: ApplicationData,
  courseTitle: string
) {
  if (!transporter) {
    throw new Error("Email service not initialized");
  }

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #000000 0%, #1a2332 100%); padding: 40px; border-radius: 10px; text-align: center;">
        <h1 style="color: #10b981; margin: 0; font-size: 28px;">NEW APPLICATION</h1>
        <p style="color: #9ca3af; margin: 10px 0 0 0;">Eaxion Analytics Admin Portal</p>
      </div>
      
      <div style="background: #f9fafb; padding: 40px; border-radius: 10px; margin-top: 20px;">
        <h2 style="color: #1f2937; margin-top: 0;">New Course Application Received</h2>
        
        <div style="background: white; border-left: 4px solid #10b981; border-radius: 4px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #10b981; margin-top: 0;">Applicant Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 12px 0; color: #1f2937;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280; font-weight: bold;">Email:</td>
              <td style="padding: 12px 0; color: #1f2937;"><a href="mailto:${data.email}" style="color: #10b981;">${data.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280; font-weight: bold;">Phone:</td>
              <td style="padding: 12px 0; color: #1f2937;"><a href="tel:${data.phone}" style="color: #10b981;">${data.phone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 12px 0; color: #6b7280; font-weight: bold;">Course:</td>
              <td style="padding: 12px 0; color: #1f2937; font-weight: bold;">${courseTitle}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #6b7280; font-weight: bold; vertical-align: top;">Submitted At:</td>
              <td style="padding: 12px 0; color: #1f2937;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>
        
        ${
          data.message
            ? `
        <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; border-radius: 4px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Applicant's Message:</h3>
          <p style="color: #1f2937; margin: 0;">"${data.message}"</p>
        </div>
        `
            : ""
        }
        
        <div style="background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 4px; padding: 20px; margin: 20px 0;">
          <p style="color: #92400e; margin: 0;">
            <strong>Action Required:</strong> Please contact the applicant within 24 hours to discuss their application and learning objectives.
          </p>
        </div>
      </div>
    </div>
  `;

  const info = await transporter.sendMail({
    from: `Eaxion Analytics <${process.env.EMAIL_USER || 'noreply@eaxion.com'}>`,
    to: adminEmail,
    subject: `NEW APPLICATION: ${data.name} - ${courseTitle}`,
    html: emailHtml,
  });
  console.log(`Sent admin notification to ${adminEmail} (messageId: ${info.messageId})`);
  return info;
}
