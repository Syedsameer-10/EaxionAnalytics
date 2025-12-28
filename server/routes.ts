import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendConfirmationEmail, sendAdminNotification } from "./email";
import { log } from "./index";

// Server-side canonical course list — keep ids consistent with client `ALL_COURSES`
const ALL_COURSES = [
  // Finance
  { id: "acs", title: "ACS (Institute of Company Secretaries of India)", category: "finance" },
  { id: "ca", title: "CA (Institute of Chartered Accountants of India)", category: "finance" },
  { id: "cma", title: "CMA (Institute of Cost and Management Accountants)", category: "finance" },
  { id: "icsa", title: "ICSA (London, Australia, Hong Kong, Singapore)", category: "finance" },
  { id: "cfa-aus", title: "CFA Australia", category: "finance" },
  { id: "cfa-usa", title: "CFA USA", category: "finance" },
  { id: "acca", title: "ACCA", category: "finance" },
  { id: "cima", title: "CIMA", category: "finance" },

  // Tech
  { id: "java", title: "Java Stack", category: "tech" },
  { id: "mern", title: "MEAN & MERN Stack", category: "tech" },
  { id: "python", title: "Python", category: "tech" },
  { id: "bi", title: "Business Intelligence (BI)", category: "tech" },
  { id: "analytics", title: "Analytics", category: "tech" },
  { id: "ai", title: "AI Basics", category: "tech" },

  // Traditional
  { id: "ndp", title: "Nalayira Divya Prabandham", category: "traditional" },
  { id: "vedas", title: "Vedas", category: "traditional" },
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/submit-application", async (req, res) => {
    try {
      const { name, email, phone, course, message } = req.body;

      if (!name || !email || !phone || !course) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const courseData = ALL_COURSES.find((c) => c.id === course);
      if (!courseData) {
        return res.status(400).json({ message: "Invalid course selected" });
      }

      const adminEmail = process.env.ADMIN_EMAIL || "admissions@eaxion.com";

      try {
        await Promise.all([
          sendConfirmationEmail(email, { name, email, phone, course, message }, courseData.title),
          sendAdminNotification(adminEmail, { name, email, phone, course, message }, courseData.title),
        ]);
      } catch (emailError) {
        log(`Email error: ${emailError}`, "email");
        // Still return success to user if form is submitted, even if email fails
        // This prevents user-facing errors when email service has temporary issues
      }

      log(`Application submitted by ${name} (${email}) for course: ${courseData.title}`);

      res.json({
        success: true,
        message: "Application submitted successfully. Please check your email for confirmation.",
      });
    } catch (error) {
      log(`Error submitting application: ${error}`, "error");
      res.status(500).json({ message: "Failed to submit application. Please try again." });
    }
  });

  // TEST: send a test confirmation email to verify SMTP settings (dev only)
  app.post('/api/test-email', async (req, res) => {
    try {
      const { to } = req.body;
      if (!to) return res.status(400).json({ message: 'Missing "to" address' });

      await sendConfirmationEmail(to, { name: 'Test User', email: to, phone: '0000000000', course: 'test-course', message: 'This is a test email.' }, 'Test Course');

      res.json({ success: true, message: `Test email sent to ${to}` });
    } catch (err) {
      log(`Failed to send test email: ${err}`, 'email');
      res.status(500).json({ message: 'Failed to send test email' });
    }
  });

  return httpServer;
}
