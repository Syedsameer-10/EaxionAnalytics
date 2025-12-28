import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load project root .env
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;
const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
const port = parseInt(process.env.EMAIL_PORT || '587', 10);

async function run() {
  if (!user || !pass) {
    console.error('EMAIL_USER or EMAIL_PASSWORD not set');
    process.exit(2);
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
  });

  try {
    console.log('Verifying transporter...');
    await transporter.verify();
    console.log('Transporter verified. Sending test email...');

    const info = await transporter.sendMail({
      from: `Eaxion Analytics <${user}>`,
      to: 'banuraju2244@gmail.com',
      subject: 'Test email from local app',
      text: 'This is a test email to verify SMTP settings.',
      html: '<p>This is a <strong>test</strong> email to verify SMTP settings.</p>',
    });

    console.log('Email sent successfully:', info);
    process.exit(0);
  } catch (err: any) {
    console.error('Send failed. Full error object:');
    console.error(err);
    if (err && err.code) console.error('code:', err.code);
    if (err && err.response) console.error('response:', err.response);
    if (err && err.responseCode) console.error('responseCode:', err.responseCode);
    if (err && err.stack) console.error('stack:', err.stack);
    process.exit(1);
  }
}

run();
