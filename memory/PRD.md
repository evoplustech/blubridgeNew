# BluBridge Website - Product Requirements Document

## Original Problem Statement
Build and iteratively refine a corporate website for BluBridge, an AI engineering company. Key objectives include:
1. Building a `/solutions` page with content from provided documents
2. Implementing admin panel with password change and data export features
3. SEO optimization with server-side content injection
4. Form duplicate prevention and data integrity
5. Email service migration from Gmail SMTP to Resend API
6. Research paper pages (FLUX) with multiple design variants
7. Admin panel pagination for large datasets

## Current State (March 2026)

### Completed Features

#### Core Website
- Solutions Page, Header, Home, About Us, Careers, Contact pages
- Global favicon, Clicky analytics, robots.txt, sitemap.xml (9 URLs)

#### Research Pages
- `/Research/FLUX` — Original plain design
- `/Research/FLUX-Data` — Redesigned with callout boxes, dark table headers, progress bars (separate file FLUXData.jsx)
- `/Research/FLUX-3` — Polished editorial design with dark hero header, numbered sections
- `/Research/FLUX-4` — Same content as FLUX with improved readability (bolded key terms)
- `/Research/Blu-Werp` — Existing research page

#### Admin Panel (`/admin`) — FULLY PAGINATED
- **Dashboard**: Overview of submissions with correct totals
- **Career Applications**: Server-side pagination (1051 records), page size 50/100/200, Export All Data / Export Current Page dropdown
- **Contact Forms**: Server-side pagination (76 records), Export All CSV
- **Footer Forms**: Server-side pagination (75 records), Export All CSV
- **Settings Page**: Password change, data exports, DB maintenance
- **Credentials**: username `admin`, password `admin`

#### Data Integrity & SEO
- Frontend double-submit protection on all forms
- Backend duplicate prevention with time-based cooldowns
- Custom Express.js server for server-side SEO content injection (40+ pages)

#### Auto-Rebuild & Live Reload
- File watcher (supervisor-managed `frontend-watcher`) auto-rebuilds on VS Code edits
- Live reload script auto-refreshes browser when build changes
- Auto-rebuild on startup if build directory is missing

### Technical Architecture
```
/app
├── backend/
│   ├── server.py (FastAPI - all routes, paginated admin endpoints)
│   ├── tests/test_admin_pagination.py
│   └── .env
├── frontend/
│   ├── build/ (production build)
│   ├── public/ (index.html, favicon, robots.txt, sitemap.xml, images/)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Research/FLUX.jsx, FLUXData.jsx, FLUX3.jsx, FLUX4.jsx, BluWerp.jsx
│   │   │   └── admin/
│   │   │       ├── CareerApplications.jsx (paginated)
│   │   │       ├── ContactForms.jsx (paginated)
│   │   │       ├── FooterForms.jsx (paginated)
│   │   │       ├── Pagination.jsx (shared component)
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminLayout.jsx
│   │   │       └── Settings.jsx
│   │   └── App.js
│   ├── server.js (Express.js - SEO + live reload)
│   └── watch-rebuild.sh
└── memory/PRD.md
```

### Key API Endpoints
- `POST /api/admin/login` — Admin auth
- `GET /api/admin/submissions/careers?page=1&limit=50` — Paginated careers
- `GET /api/admin/submissions/contact?page=1&limit=50` — Paginated contacts
- `GET /api/admin/submissions/footer?page=1&limit=50` — Paginated footer
- `GET /api/admin/export/{careers|contact|footer}` — Full CSV export (all records)
- `POST /api/admin/change-password` — Password change

## Prioritized Backlog

### P1 (High Priority)
- Apply 3-Grid color scheme to About Page
- Create Individual GPU Node Pages

### P2 (Medium Priority)
- Refactor `server.py` into proper project structure (routes, models)
- Refactor large React components
- Create Blog/Press Pages
- Create Contact Sub-pages
- Add SEO content for FLUX-3, FLUX-4, FLUX-Data in server.js

### P3 (Lower Priority)
- Consolidate FLUX page variants into reusable components

## 3rd Party Integrations
- Resend API (Email), Clicky Analytics, MongoDB Atlas

## Known Issues
- Frontend build directory may be deleted on environment resets (auto-rebuild mitigates this)
- SEO content in server.js is hardcoded and brittle

## Test Reports
- `/app/test_reports/iteration_4.json` — Admin Settings page tests
- `/app/test_reports/iteration_5.json` — Admin Pagination tests (94% backend, 100% frontend)
