# BluBridge Website — PRD

## Original Problem Statement
Complete visual and structural redesign of the BluBridge website combining approved sections from three reference deployments. STRICT CONTENT LOCK: no adding, removing, or paraphrasing existing text. Premium, minimal, light-themed, enterprise-grade editorial appearance.

## Architecture
- React frontend served via Express (`/app/frontend/server.js` serves `/app/frontend/build`) — **NOT hot-reload; requires `yarn build` after source changes**
- FastAPI backend (`/app/backend/server.py`, monolithic)
- MongoDB
- Global custom cursor: `/app/frontend/src/components/CustomCursor.jsx`

## Key Routes
- `/` Home, `/about-us`, `/careers`, `/research`, `/contact`, `/solutions/*`, `/products/*`
- Admin: `/admin` (user: admin / pass: admin)

## Key API Endpoints
- `POST /api/contacts/submit`
- `POST /api/job-applications/submit`

## Implemented (as of June 2026)
- All major pages visually overhauled per reference URLs
- Careers: hero decorations removed, purple → navy blue, orbit SVG removed
- Home: "Explore Solutions" button moved up 30px
- About Us hero: `.au-hero-side-col` padding-top set to 0 (desktop + mobile) — text aligns with group photo top
- **2026-06 (this session): Removed PUB/00x index and arXiv ID labels from all publication cards on Research page (kept Published date + View on arXiv button)**
- **2026-06 (this session): Home hero heading changed to "Building Tailored AI Systems / for Hard Problems" (was "Beyond the Horizon"), font clamp reduced to fit; hero subtitle changed to "a Frontier AI Research company", rebuilt + verified on preview**
- **2026-06-06 (this session): Verified About Us padding fix is live in PREVIEW (computed padding-top: 0px, text Y == photo Y == 457 on desktop; mobile OK). User's reported recurrence was caused by viewing the STALE DEPLOYED build (`main.ce732460.css`); current build is `main.f4b22752.css`. RESOLUTION: user must REDEPLOY.**

## Backlog
### P0
- Full frontend regression test via testing_agent (skipped by 6 previous agents): routing, clickability (verify CustomCursor.jsx pointer-events: none), form submissions
### P1
- Home hero final integration per reference (if not fully matching)
### P2
- Success toast for contact form (replace browser alert)
- Shared editorial ProductPageLayout for 8 industry pages
- Open Graph previews
### P3
- Refactor backend server.py into MVC structure
- Consolidate FLUX/BluTrain research pages into one dynamic component
- Blog/Press pages

## Critical Notes for Next Agent
- STRICT CONTENT LOCK — never invent text
- Frontend serves a STATIC BUILD: after editing `src/`, run `cd /app/frontend && yarn build` then `sudo supervisorctl restart frontend`
- If user reports a "recurring" visual bug, FIRST check whether they're viewing the deployed site (compare CSS build hash) before re-fixing code
- User wants minimal credit consumption

## Integrations
- Resend (emails, needs user API key), Clicky Analytics, MongoDB
