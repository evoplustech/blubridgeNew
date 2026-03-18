# BluBridge Website - Product Requirements Document

## Original Problem Statement
Build and iteratively refine a corporate website for BluBridge, an AI engineering company. Key objectives include:
1. Building a `/solutions` page with content from provided documents
2. Implementing admin panel with password change and data export features
3. SEO optimization with server-side content injection
4. Form duplicate prevention and data integrity
5. Email service migration from Gmail SMTP to Resend API
6. Research paper pages (FLUX) with multiple design variants

## Current State (February 2026)

### Completed Features

#### Core Website
- **Solutions Page (`/solutions`)**: Complete with Hero, Model Customization, Value Realization, and Deployment sections
- **Header Component**: Functional Solutions dropdown with proper hover states
- **Home Page**: Updated icons and content
- **About Us Page**: Highlighted "Join Us" button
- **Careers Page**: Hero section with "BluBridge Careers" and working `#join-our-team` hash link
- **Global favicon and Clicky analytics script**
- **robots.txt for SEO**
- **sitemap.xml** with 9 URLs

#### Research Pages
- **`/Research/FLUX`**: Original plain design
- **`/Research/FLUX-2`**: Redesigned with callout boxes, dark table headers, progress bars
- **`/Research/FLUX-3`**: NEW - Polished editorial design with dark hero header, numbered sections, card-based layout, stat cards, vertical pipeline timeline, emerald accent system
- **`/Research/Blu-Werp`**: Existing research page

#### Admin Panel (`/admin`)
- **Dashboard**: Overview of submissions
- **Footer/Contact/Career Forms**: View submissions with filters and CSV export
- **Settings Page** (TESTED): Password change, data exports, DB maintenance
- **Credentials**: username `admin`, password `admin`

#### Data Integrity
- Frontend double-submit protection on all forms
- Backend duplicate prevention with time-based cooldowns

#### SEO Implementation
- Custom Express.js server for server-side content injection
- Meta tags visible in HTML source for 40+ pages

#### Email Service
- Resend API with `contact@blubridge.ai` sender

### Technical Architecture
```
/app
├── backend/
│   ├── server.py (FastAPI - all routes)
│   ├── requirements.txt
│   └── .env (MONGO_URL, RESEND_API_KEY)
├── frontend/
│   ├── build/ (production build, VOLATILE)
│   ├── public/
│   │   ├── index.html, favicon.png, robots.txt, sitemap.xml
│   │   └── images/flux/ (7 images)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx, Careers.jsx, Solutions.jsx, AboutUs.jsx
│   │   │   ├── Research.jsx
│   │   │   ├── Research/FLUX.jsx, FLUX2.jsx, FLUX3.jsx, BluWerp.jsx
│   │   │   └── admin/
│   │   ├── App.js (all routes)
│   │   └── components/
│   ├── server.js (Express.js - SEO content injection)
│   └── package.json
└── memory/
    └── PRD.md
```

### Key API Endpoints
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/change-password` - Password change
- `GET /api/admin/export/{data_type}` - CSV exports
- `POST /api/contacts/submit` - Contact form
- `POST /api/job-applications/submit` - Job applications

## Prioritized Backlog

### P1 (High Priority)
- Apply 3-Grid color scheme to About Page
- Create Individual GPU Node Pages

### P2 (Medium Priority)
- Refactor `server.py` into proper project structure (routes, models)
- Refactor large React components (`Solutions.jsx`, `Home.jsx`)
- Create Blog/Press Pages
- Create Contact Sub-pages
- Add SEO content for FLUX-3 in server.js

### P3 (Lower Priority)
- Responsiveness improvements
- Consolidate FLUX page variants into reusable components
- Pre-existing lint error fixes

## 3rd Party Integrations
- **Resend API** - Email sending
- **Clicky Analytics** - Web analytics
- MongoDB Atlas - Database

## Known Issues
- Frontend build directory may be deleted on environment resets; requires `yarn build` and service restart
- SEO content in server.js is hardcoded and brittle

## Test Reports
- `/app/test_reports/iteration_4.json` - Admin Settings page tests

## Notes
- Frontend uses Express.js server for production builds (NOT webpack-dev-server)
- Any frontend changes require `yarn build` and `supervisorctl restart frontend`
- Admin credentials: `admin` / `admin`
