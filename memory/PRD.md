# BluBridge Website - Product Requirements Document

## Original Problem Statement
Build and maintain the BluBridge corporate website with React frontend + FastAPI backend + MongoDB. Features include a Solutions page, SEO overhaul, admin panel, research paper pages (FLUX), and careers page with job listings.

## Core Requirements
- Corporate website with multiple pages (Home, Solutions, Products, Research, About, Careers, Contact)
- Admin panel for managing submissions (Career Applications, Contact Forms, Footer Submissions)
- SEO-optimized server-side rendering
- Research paper pages (FLUX series)
- Careers page with job listings and internal job detail pages

## What's Been Implemented

### Completed Features
- Full website with all major pages
- Admin panel with server-side pagination for all data tables
- Permanent frontend auto-rebuild and live-reload system
- Multiple research pages (FLUX, FLUX-3, FLUX-4, FLUX-Data)
- **Careers page job replacement (March 2026)**: Replaced 7 old job listings with 12 new jobs from Excel file. All jobs use internal routing (/careers/job/:slug). Job data sourced from Naukri listings. NO external redirects.

### 12 Current Job Listings (March 2026)
1. Administration Executive (Male) - Operations
2. HR Executive - Talent & People Operations - HR
3. Business Development - AI Strategy & Partnerships - BD
4. HR Admin (Male) - HR
5. Senior Administration Officer (Male) - Operations
6. Accounts And Compliance Executive (Male) - Finance
7. AI ML Engineer (Freshers) - Engineering
8. AI Systems Engineer - Deep Learning Infrastructure (Freshers) - Engineering
9. Accounts & Finance Executive - Operations & Compliance - Finance
10. Business Analyst - Global AI Strategy & Solutions - BD
11. HR Executive (Male) - HR
12. Infrastructure Monitoring & Governance Executive - IT & Security

## Architecture
- Frontend: React (CRA + CRACO) with Shadcn UI components
- Backend: FastAPI + MongoDB
- Build: CRACO with @ path alias support
- Server: Custom Express server (server.js) with self-healing + live-reload
- File watcher: Supervisor-managed inotifywait for auto-rebuild

## Key Files
- `/app/frontend/src/data/jobsData.js` - All 12 job entries with full details
- `/app/frontend/src/pages/Careers.jsx` - Careers page with job listings
- `/app/frontend/src/pages/JobDetail.jsx` - Job detail page
- `/app/frontend/src/App.js` - Routes including /careers/job/:slug
- `/app/backend/server.py` - Backend with paginated admin endpoints
- `/app/frontend/server.js` - Express server with SEO, self-healing, live-reload
- `/app/frontend/craco.config.js` - CRACO config with @ alias

## Pending Tasks (Prioritized)
### P1
- Apply 3-Grid color theme to About Page
- Create Individual GPU Node Pages

### P2
- Add SEO content for research pages (FLUX-3, FLUX-4, FLUX-Data) in server.js
- Refactor server.py into proper project structure
- Consolidate duplicated FLUX page components
- Create Blog/Press Pages
- Create Contact Sub-pages

## Admin Credentials
- Username: admin
- Password: admin

## 3rd Party Integrations
- Resend API (Email)
- Clicky Analytics
- MongoDB Atlas
- inotify-tools (OS dependency)
