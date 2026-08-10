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
- **2026-02 (this session): 3 UI polish fixes — (1) Footer: switched to `.bb-footer-grid` with `grid-template-columns: auto auto auto auto minmax(320px, 1fr)` and uniform `column-gap: clamp(32px, 5.5vw, 88px)` for even inter-column gutters. (2) Careers Let's Connect: LinkedIn display text changed to "linked/blubridge" (href unchanged), email `careers@blubridge.com` now `white-space: nowrap`, channels use flex+space-between so all 4 fit without truncation. (3) Home Hero: reduced inner grid `pt-16 lg:pt-20` → `pt-8 lg:pt-10` (~48px less top space on desktop).**
- **2026-02 (this session): Meta Titles updated across 15 routes via `server.js` SSR + `useDocumentTitle` client hooks; Privacy Policy & Terms of Use backgrounds changed to `#F1F2FA` with `#FFFFFF` containers.**
- **2026-02 (this session): (1) Home hero headline: inserted "real" between "for" and "Hard Problems"; `.bb-real-shine` class applies accent color (`--bb-accent` #2b4c8c) + a subtle L→R reflective shine (4.5s loop, ~810ms pass) via `-webkit-background-clip: text` gradient position animation; `prefers-reduced-motion` disables animation. (2) Header announcement strip global text updated to "Tailored AI Systems: Large Language Models & Domain Specific Models" (styling preserved). (3) About Us "How We Build" rotating phrase: replaced typing animation with `PrecisionScanReveal` component cycling 4 phrases ("It's our Numerical Fidelity." / "…Training Throughput" / "…Inference Latency" / "…Evaluation Benchmarks") using clip-path masked reveal + 1px calibration line + navy dot at end, cubic-bezier(0.22,1,0.36,1), 2800ms cycle, IntersectionObserver pause, reduced-motion static fallback, invisible sizer reserves space (zero layout shift).**
- **2026-02 (this session): About Us statement animation upgraded to **Precision Metric Swap**: split into stationary "It's our" prefix + animated technical term; term enters from 11px below with clip-path L→R reveal + underline draw + navy dot, holds ~2.5s, exits up 9px with underline retract; `pms-active` uses `display: inline-flex; width: max-content` so the 1px calibration underline (`.pms-underline` at `width: 100%`) snaps to the ACTUAL rendered phrase width per cycle (verified: 550/580/541/658px for the four phrases) while the outer `.pms-sizer` reserves the longest-phrase width for zero layout shift; `aria-hidden` on rotating parts + a single visually-hidden accessible label; IntersectionObserver pauses off-screen; `prefers-reduced-motion` renders "It's our Numerical Fidelity." static with matching-width underline.**
- **2026-02 (this session): Two targeted micro-updates. (1) Careers `roleCards[1]` bullet reworded from "Paid internship is converted to full-time in 3-6 months period." → "Paid internship is converted to full-time **offer** in 3-6 months period." (single-word insertion, styling untouched). (2) About Us Precision Metric Swap refined: removed the underline (`.pms-underline`) + navy dot (`.pms-dot`) elements from JSX and neutralized their CSS; added trailing period to all four TERMS ("Numerical Fidelity.", "Training Throughput.", "Inference Latency.", "Evaluation Benchmarks.") — periods render from the string in the same Geist weight so they visually match the existing "Numerical Fidelity." period; animated term color changed from `#A5A5A3` → `#2b4c8c`; clip-path reveal replaced with a pure translateY slide (28px in-from-below → hold ~2.5s → 28px slide-up-out) with opacity fade; "It's our" prefix remains fully static; loop cycles Numerical Fidelity → Training Throughput → Inference Latency → Evaluation Benchmarks → back. Sizer/wrap sizing preserved so there is zero layout shift; reduced-motion fallback shows the first phrase statically.**

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

## Update (2026-06 fork): Hero "real" artwork V2
- Replaced Caveat Brush font + SVG underline "real" with the user-supplied brush artwork (transparent PNG extracted from screenshot, bg #f1f1f5 removed, tight crop 208x142, saved at /app/frontend/public/real-brush.png).
- New impl: .bb-real-slot (overflow-hidden inline-block, width 0 -> 1.55em + margin-right sync, 5.2s loop, cubic-bezier(0.7,0,0.3,1)), img.bb-real-img fixed width for left-to-right reveal. aria-hidden img + sr-only "real" for a11y. prefers-reduced-motion keeps artwork visible.
- Removed Caveat Google Font import (unused elsewhere). Files: Home.jsx (hero third row), index.css.
