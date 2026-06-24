# BluBridge Website - Product Requirements Document

## Original Problem Statement
Build and maintain the BluBridge corporate website with React frontend + FastAPI backend + MongoDB.

## What's Been Implemented

### Security Hardening (May 2026) - COMPLETE
**Backend Security:**
- SecurityMiddleware: rate limiting per IP/endpoint, security headers on all responses
- CORS restricted to known origins (blubridge.ai, blubridge.com, preview URL)
- NoSQL injection prevention: all search queries use `sanitize_regex_input()`
- Admin brute force protection: 5 failed attempts = 15min lockout
- Admin token expiration: 24-hour TTL
- File upload hardening: magic byte validation, executable content blocking
- Path traversal prevention on resume downloads
- Query param clamping (limit 1-200, page >= 1)
- Export type validation
- Form type validation on detail/delete endpoints
- API docs/OpenAPI schema disabled in production
- Resend API key moved from source code to .env

**Frontend Security:**
- Security headers middleware in server.js (X-Frame-Options, CSP, HSTS, etc.)
- Source map generation disabled (`GENERATE_SOURCEMAP=false`)
- Source map requests blocked (404)
- X-Powered-By header removed

**Security Headers (both layers):**
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: max-age=31536000; includeSubDomains
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
- Cross-Origin-Opener-Policy: same-origin

### Research Pages Premium UX (Jun 24, 2026)
- Premium horizontal pill-shaped author badges on `/Research/FLUX`, `/Research/Blu-Werp`, `/Research/BluTrain`
- Each pill: dark navy initials avatar + author name, cream bg, hover lift/shadow
- BluTrain shows "AUTHORS · 22" count label
- Replaced BluTrain Figure 1 (architecture diagram) with user-uploaded image
- Production build refreshed and frontend service restarted

### Previous Features
- Full website with all major pages
- Admin panel with server-side pagination
- 12 career job listings from Excel data
- Email config: contact@blubridge.ai (from) → hiring@blubridge.com (to) for jobs, contact@blubridge.ai for contact/footer forms
- Reply-To set to user's email on all forms
- US address: 5 Independence Way, Suite 300, Princeton, NJ 08540

## Architecture
- Frontend: React (CRA + CRACO) with Shadcn UI
- Backend: FastAPI + MongoDB + SecurityMiddleware
- Email: Resend API (isolated functions for job vs contact forms)
- Build: CRACO with @ alias, no source maps in production

## Admin Credentials
- Username: admin, Password: admin

## Pending Tasks
### P1
- Apply 3-Grid color theme to About Page
- Create Individual GPU Node Pages
### P2
- Add SEO content for FLUX-3, FLUX-4, FLUX-Data pages
- Refactor server.py into routes/models
- Consolidate FLUX page components
- Blog/Press Pages, Contact Sub-pages
