import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config({ path: '../.env' });

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;
const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
const port = parseInt(process.env.EMAIL_PORT || '587', 10);

async function verify() {
  if (!user || !pass) {
    console.error('EMAIL_USER or EMAIL_PASSWORD not set in environment');
    process.exit(2);
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
  });

  try {
    await transporter.verify();
    console.log('SMTP verification succeeded');
  } catch (err: any) {
    console.error('SMTP verification failed:');
    console.error(err && err.message ? err.message : err);
    if (err && err.response) console.error('response:', err.response);
    if (err && err.code) console.error('code:', err.code);
    process.exit(1);
  }
}

verify();
