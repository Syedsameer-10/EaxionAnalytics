# Eaxion Analytics - Modern Professional Learning Platform

## Project Overview
A modern, professional website for Eaxion Analytics featuring:
- Advanced interactive UI with mouse-following hover effects
- Dark theme with emerald accents
- Integrated contact/registration forms with email confirmations
- 3 professional course verticals: Finance, Technology, Traditional Wisdom
- Consulting services showcase

## Recent Features & Changes

### Email Integration (Latest)
- **Nodemailer** configured for transactional email sending
- **Client Confirmation Emails**: Detailed HTML emails sent to applicants after form submission
- **Admin Notifications**: Formatted emails sent to admin (syedcocv3@gmail.com) with application details
- **API Endpoint**: `/api/submit-application` handles form submissions and email dispatch

### Page Restructuring (Dec 27)
- **Removed Contact Route**: `/contact` route removed entirely
- **Connected Page**: Now serves as single entry point for all applications
- **New Form Layout**: Reorganized with sections for Identity Details, Contact Info, Learning Path, and Additional Information
- **Success State**: Enhanced confirmation screen with animations

### Hover Effects & Animations
- **Duration**: 1500ms smooth transitions on all interactive elements
- **Text Behavior**: All text stays white on hover for readability
- **Glow Effect**: Category-specific radial gradients (Finance: blue, Tech: emerald, Traditional: amber)
- **Mouse Tracking**: CSS variables (--glow-x, --glow-y) for real-time tracking

## Tech Stack
- **Frontend**: React 19 + Vite + TypeScript
- **Backend**: Express + Node.js
- **Styling**: Tailwind CSS + Framer Motion
- **Forms**: React Hook Form + Zod
- **Email**: Nodemailer (Gmail SMTP)
- **Database**: PostgreSQL (configured but not currently used for forms)

## Environment Secrets Required
```
# Gmail account used for sending confirmation emails
EMAIL_USER = vijayraju346@gmail.com
# Use an App Password if your account has 2FA enabled (recommended)
EMAIL_PASSWORD = [Gmail app password or app-specific password]
# Optional: where admin notifications are sent (defaults to admissions@eaxion.com)
ADMIN_EMAIL = admissions@eaxion.com
```

## Project Structure
```
client/
├── src/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Connect.tsx (application form)
│   │   ├── Courses.tsx
│   │   ├── Services.tsx
│   ├── components/
│   │   ├── layout/ (Navbar, Footer)
│   │   ├── sections/ (Hero, Services, Courses)
│   │   └── ui/ (form components)
│   └── data/
│       └── content.ts (course & service data)
server/
├── index.ts (main server setup)
├── routes.ts (API endpoints including /api/submit-application)
├── email.ts (Nodemailer configuration & email templates)
├── storage.ts (database models)
└── vite.ts (Vite middleware)
```

## Key Features Implemented

### 1. Application Form (Connect Page)
- Validates: Name, Email, Phone, Course Selection
- Optional: Additional message field
- Real-time validation with Zod
- Success confirmation screen
- Auto-populated course selection from URL params

### 2. Email System
- **Confirmation Email**: 
  - Course details
  - Applicant information summary
  - Professional HTML formatting
  - Call-to-action for support contact

- **Admin Notification Email**:
  - Complete applicant details with links
  - Course information
  - Timestamp of submission
  - Formatted for quick review

### 3. Navigation
- Home, Services, Courses, Connect (main nav)
- Launch button → connects to /connect form
- Mobile responsive with hamburger menu

## Design Specifications
- **Color Scheme**: Slate-950 dark background with emerald-500 primary accent
- **Typography**: Bold, uppercase tracking for headlines
- **Spacing**: Large padding (8-12px) on form elements
- **Border Radius**: 2rem-3rem for premium appearance
- **Animations**: Framer Motion with spring physics where appropriate

## Known Notes
- SendGrid integration was offered but user preferred Nodemailer
- Email integration stores credentials as encrypted secrets (not in code)
- Contact page fully removed - all applications flow through /connect

## User Preferences
- Fast hover animations (1500ms) for snappy feel
- Text stays white on all hover effects
- Professional, corporate design aesthetic
- Course-specific glow colors for category differentiation

## Next Steps (If Needed)
- Test email delivery in production
- Add email template customization
- Consider email template versioning
- Add contact form for support requests
