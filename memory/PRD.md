# BluBridge Website - Product Requirements Document

## Original Problem Statement
Build and iteratively refine a corporate website for BluBridge, an AI engineering company. Key objectives include:
1. Building a `/solutions` page with content from provided documents
2. Implementing admin panel with password change and data export features
3. SEO optimization with server-side content injection
4. Form duplicate prevention and data integrity
5. Email service migration from Gmail SMTP to Resend API

## Current State (December 2025)

### Completed Features

#### Core Website
- **Solutions Page (`/solutions`)**: Complete with Hero, Model Customization, Value Realization, and Deployment sections
- **Header Component**: Functional Solutions dropdown with proper hover states
- **Home Page**: Updated icons and content
- **About Us Page**: Highlighted "Join Us" button
- **Careers Page**: Hero section with "BluBridge Careers" and working `#join-our-team` hash link
- **Global favicon and Clicky analytics script**
- **robots.txt for SEO**

#### Admin Panel (`/admin`)
- **Dashboard**: Overview of submissions
- **Footer Forms**: View footer form submissions
- **Contact Forms**: View contact form submissions
- **Career Applications**: View job applications with date-range filter and CSV export
- **Settings Page** (TESTED ✅):
  - Change Password (with validation: min 6 chars, password match check)
  - Export Footer Forms (CSV download)
  - Export Contact Forms (CSV download)
  - Export Career Applications (CSV download)
  - Export All Data (combined CSV download)
  - Database Maintenance (cleanup duplicates)

#### Data Integrity
- Frontend double-submit protection on all forms
- Backend duplicate prevention with time-based cooldowns:
  - Contact forms: 1 minute cooldown
  - Job applications: 24 hour cooldown
- Database cleanup endpoint for existing duplicates

#### SEO Implementation
- Custom Express.js server for server-side content injection
- Meta tags visible in HTML source
- Page content visible in "View Source" for crawlers

#### Email Service
- Migrated from Gmail SMTP to Resend API
- Configured with `contact@blubridge.ai` sender

### Technical Architecture

```
/app
├── backend/
│   ├── server.py (FastAPI - all routes)
│   ├── requirements.txt
│   └── .env (MONGO_URL, RESEND_API_KEY)
├── frontend/
│   ├── build/ (production build, required by server.js)
│   ├── public/
│   │   ├── index.html (template with SEO placeholders)
│   │   ├── favicon.png
│   │   └── robots.txt
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Careers.jsx
│   │   │   ├── Solutions.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminSettings.jsx
│   │   │       └── CareerApplications.jsx
│   │   └── components/
│   ├── server.js (Express.js - serves production build)
│   └── package.json
└── memory/
    └── PRD.md
```

### Key API Endpoints
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/change-password` - Password change
- `GET /api/admin/settings` - Get admin settings
- `GET /api/admin/export/{data_type}` - Export CSV (footer, contact, careers, all)
- `POST /api/admin/cleanup-duplicates` - Remove duplicate records
- `POST /api/contacts/submit` - Contact form submission
- `POST /api/job-applications/submit` - Job application submission

### Admin Credentials
- Username: `admin`
- Password: `adminpass` (minimum 6 characters required)

## Prioritized Backlog

### P0 (Critical)
- ✅ Fix recurring frontend server crash (build directory issue)
- ✅ Test Admin Settings page features (password change, exports)

### P1 (High Priority)
- Apply 3-Grid color scheme to About Page
- Create Individual GPU Node Pages

### P2 (Medium Priority)
- Refactor `server.py` into proper project structure (routes, models)
- Refactor large React components (`Solutions.jsx`, `Home.jsx`)
- Create Blog/Press Pages
- Create Contact Sub-pages

### P3 (Lower Priority)
- Responsiveness improvements
- Pre-existing lint error fixes

## 3rd Party Integrations
- **Resend API** - Email sending
- **Clicky Analytics** - Web analytics
- MongoDB Atlas - Database
- Embla Carousel React
- Lucide React
- Framer Motion

## Known Issues
- Frontend build directory may be deleted on environment resets; requires `yarn build` and service restart

## Test Reports
- `/app/test_reports/iteration_4.json` - Admin Settings page tests (100% backend, 90% frontend)

## Notes
- Frontend uses Express.js server for production builds (NOT webpack-dev-server)
- Any frontend changes require `yarn build` and `supervisorctl restart frontend`
- User workflow is iterative and screenshot-driven
