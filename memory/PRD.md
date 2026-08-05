# BluBridge — PRD & Redesign Status

## Original Problem Statement
Complete visual & structural redesign of the BluBridge website to a premium, light-theme, editorial, research-led aesthetic (Soket/Sakana-quality but not copied). **Strict content-lock**: every existing heading, paragraph, CTA, link, form field, image, and route must be preserved verbatim. Primary background color `#f1f2fa`. Logo untouched. Completely different hero.

## Design System (LOCKED)
- Fonts: **Geist** (headings) · **Inter** (body) · **IBM Plex Mono** (technical labels/eyebrows/data captions)
- Palette (light theme)
  - `--bb-bg` `#f1f2fa` (main), `--bb-bg-subtle` `#e8eaf3`, `--bb-bg-panel` `#eceefa`, `--bb-bg-elevated` `#ffffff`
  - `--bb-ink` `#0a1230`, `--bb-ink-2` `#3f4966`, `--bb-ink-3` `#7c86a2`
  - `--bb-line` `#d4d8e8`, `--bb-line-strong` `#b8bfd6`
  - Accent `--bb-accent` `#2b4c8c`, soft `#dfe6f5`, signal `#4a7bd6`
- Grid: 12 col, max width 1320px, editorial asymmetric layouts, mono captions, thin borders, no rounded pills, no glassmorphism, no gradients on hero.

## Phase 1 — COMPLETE (2026-02-21) ✅
Files rewritten (backups saved as `_*_backup.jsx` alongside):
1. `frontend/src/index.css` — new design tokens, fonts, editorial utilities (`.bb-eyebrow`, `.bb-display`, `.bb-h2`, `.bb-panel`, `.bb-btn-primary`, `.bb-btn-ghost`, `.bb-line-draw`, `.bb-pulse-node`, `.bb-flow-line`) + `prefers-reduced-motion` support
2. `frontend/tailwind.config.js` — added `bb-*` color tokens + `geist` / `inter` / `mono` font families
3. `components/Header.jsx` — light editorial fixed header, translucent bg with blur, mono announcement strip, hover mega-menu with icon-tile items, mono chevrons, shrink-on-scroll (logo swap preserved wordmark → B icon)
4. `components/Footer.jsx` — editorial 12-col grid, IBM Plex Mono column headings, form retained (First/Last/Email/Message + Contact Now), all links preserved (About, Careers, Contact, LinkedIn, X, GitHub), copyright + legal
5. `pages/Home.jsx` — 8 sections, all content preserved:
   - **Hero**: asymmetric split — big `"Beyond / the Horizon"` display type + bespoke animated SVG pipeline diagram (DATA → TOKENIZER → PRE-TRAINING → POST-TRAINING → INFERENCE) with animated data-flow curves and corner brackets
   - **/01 Expertise** — orbit visual + industry grid (10 industries) with mono numbers
   - **/02 Services** — 3 editorial row items (Model Customization / Value Realization / Deployment) linking to /solutions#anchors, hover-reveal `OPEN ↗`
   - **/03 Infrastructure** — sidebar tabs (7 tabs: Data / Pre-training / Mid-training / Post-training / Agent Build / Inference Optimization / Infrastructure Scaling) with detail panel and 4 features each
   - **/05 What we can do for you** — vertical tabs (Smart Agents, AI Driven Search, In-Depth Research, Developer APIs, Custom AI Deployments)
   - **/06 Work with BluBridge** — team image with `FIG. ii` overlay + "Join us" CTA
   - **/07 Know more about our Research** — dark navy final CTA on `#0a1230`
6. `pages/AboutUs.jsx` — Hero (About Us eyebrow → "Building the Next Frontier of AI") + reframed hero image + Our Mission + 4-block editorial grid (Our Purpose / How we Build / Innovation Through Rigor / Our People) + typing animation "It's Our Hunger. / Precision." + final dark CTA
7. `pages/Contact.jsx` — Editorial header + 3 office cards (INDIA/INDIA/USA with map links) + Direct Channels (Phone/Email/LinkedIn) + full form (all fields, verify email, phone country codes with all 100+ options, inquiry types, validation, backend submit unchanged)
8. `pages/Careers.jsx` — Editorial Join Us hero, principle tagline, expandable 12-role ledger table with mono index/dept/location, editorial map cards for 3 offices with animated pulsing pin, 4 direct channels, JoinOurTeam sub-component embedded

## Hero — Bespoke Pipeline Diagram
Custom animated SVG per requirements:
- 500×600 viewBox, coordinate grid backdrop with fade mask
- Vertical spine, 5 nodes (DATA/TOKENIZER/PRE-TRAINING/POST-TRAINING/INFERENCE) with pulse animation
- Side data-flow curves with animated `stroke-dasharray`
- Mono index labels (00-04), corner brackets, FIG. i annotation
- No particles, no brains, no robots — pure editorial technical illustration

## Verified
- `yarn build` compiles cleanly (295 kB JS, 22.5 kB CSS)
- All lint checks passing
- Screenshots verified: Home hero, Home industry, Home services, About hero, Contact form, Careers, Footer

## Phase 2 — Partial (2026-02-21)
Global background sweep + SolutionsNew redesign:
- Global sed replacement: all `#fffdf7`/`#f3f1e9`/`#faf8f0`/etc → `#f1f2fa`/`#e8eaf3`; `#D6DEC3` border → `#d4d8e8`. Applied to all pages/components except backups. Verified 0 legacy color references remaining.
- `NeuralBackground.jsx` gradient stops updated to the new palette.
- `pages/SolutionsNew.jsx` (route `/solutions`) fully rewritten in editorial style — verified by testing_agent iteration_9 (10/10 PASS). All content preserved: hero H1, 3 customization cards with 4/5/5 bullets, Customization Stack table (3 columns × 5 rows), 3 value cards, 3 deployment tabs, all 5 CTAs.

## Phase 2 — REMAINING (P0 next up)
Apply full editorial redesign to:
- 10 Product pages (`products/Training`, `Inference`, `FineTuning`, `Serverless`, `SovereignCloud`, `Glomfjord`, `Narvik`, `GPUNodes`, `Marketplace`, `ModelCustomization`)
- 6 Solution detail pages (`solutions/Training`, `Inference`, `FineTuning`, `Deployment`, `ValueRealization`, `AIDevelopment`) — these still use the old design layout with the new bg color
- 8 Solution industry pages (`solutions/industry/*`)
- Legacy `pages/Solutions.jsx` catch-all (route `/solutions/*` fallback)
- `pages/Products.jsx` landing

## Phase 4
- Research list + 7 detail pages (`FLUX`, `FLUX-Data`, `FLUX-3`, `FLUX-4`, `BluWerp`, `BluTrain`)

## Phase 5
- Blog, Pricing, Documentation, Partners, MediaKit, JobDetail, ContactSales, GeneralEnquiry, Policy pages, JoinOurTeam
- Admin pages left untouched per user

## Content-Lock Rule (ACTIVE)
- Every heading, paragraph, CTA label, link, product/research/solution name, form field, footer item preserved verbatim.
- No paraphrasing, no shortening, no marketing copy added.
- Same content on desktop / tablet / mobile.
- Backups exist as `_Home_backup_v2.jsx`, `_AboutUs_backup.jsx`, `_Contact_backup.jsx`, `_Careers_backup.jsx`, `_Header_backup.jsx`, `_Footer_backup.jsx` (deleteable once user validates).

## Environment
- Frontend: React + CRA (craco), Tailwind, Shadcn UI, Express-served build
- Backend: FastAPI + MongoDB (untouched)
- Backend URL: `REACT_APP_BACKEND_URL` (Kubernetes ingress → /api)
- Admin: `/admin` route — untouched per user's Phase 1 scope

## 3rd Party Integrations
- Resend (Emails) — user API key
- Clicky Analytics — user ID
- MongoDB — user connection string
- Backend contact endpoint: `POST /api/contacts/submit` (types: `footer_form`, `contact_us`)

## Testing Credentials
- Admin: `/admin` — user `admin` / pass `admin`

## Known Non-Issues
- The `JoinOurTeam` sub-component (embedded on Careers) retains its previous styling — will be redesigned in Phase 5.
- Other pages (Research, Products, Solutions, Blog, Pricing, Docs, Partners, MediaKit, Policies) still use previous styling — Phase 2–5 work.

## 2026-06 (fork) — Content-Lock Purge COMPLETE
- Removed ALL agent-added decorative numberings/labels sitewide: eyebrow numbers (/ 01 ·, / 02 ·...), FIG. markers, METHOD · tags, / intent, / workstreams, / chapter, / INDEX · ENTRIES, VOL. 2026, capability tags (AGENTS/SEARCH/...), giant outline index numbers, 01.01 bullet numbering, table cell numbers, OPEN text, · Continue labels, LOCATION badges, job-table # column, arxiv id labels (restored 'View on arXiv'), added descriptive captions on Research/Contact/Careers.
- EXCEPTION (per user): Home page Hero section kept EXACTLY as-is — SVG pipeline diagram ('01 / SYSTEM MAP', 'FIG. i', node numbers), '/ 00 · Frontier AI' eyebrow, 'EST. 2024 · CHENNAI · PRINCETON', MODE/FOCUS/STATE strip.
- Files touched: Home.jsx, SolutionsNew.jsx, Research.jsx, AboutUs.jsx, Contact.jsx, Careers.jsx
- Verified by testing agent iteration_12.json — 100% pass incl. infra tabs, deployment tabs, roles toggle, contact form e2e (POST /api/contacts/submit 200).

## 2026-06 (fork 2) — Careers rebuild + global changes (verified iteration_14.json, 100% structural pass)
- **Careers page** (`Careers.jsx`) — FINAL: cool alternating palette per user's mock. Hero #f0f1f9 (dot + We're Hiring label, Join Us, full hairline divider, statement left + pill 'See open roles' right, toggleable 12-row ledger); Section 2 #e8eaf3 ('What are we?' left + desc right, roles heading, 3 groups as divider-separated passages with mono → bullets — NO boxes/cards per user); Section 3 offices #f0f1f9 (3 columns, no boxes, hairline above 'View on Google Maps ↗' links); footer standard #e8eaf3. All isCareers header/footer special-casing REMOVED (header/top bar standard #f0f1f9). GOTCHA: inline `margin: 0` shorthand overrides Tailwind ml-classes — use marginBottom/marginTop individually.
- **JobDetail** (`JobDetail.jsx`) restyled editorial on #e8eaf3: masthead (mono dept • team eyebrow, Geist title, plain meta row, rectangular navy Apply Now), hairline facts row (Vacancies/Batch/Employment/Duration), sections with thin #d4d8e8 heading rules and → lists, flat bottom CTA. JobApplicationForm component untouched; testids apply-now-header-btn / apply-now-bottom-btn preserved.
- **Home 'Work with BluBridge'** redesigned: text block left (heading, description, pill Join us) + team photo right cropped via aspect-ratio 4/3 + object-cover + scale(1.14) to remove the PNG's white feathered halo.
- **Alternating backgrounds** #f0f1f9/#e8eaf3 applied on Home (hero→work sections), Careers (hero f0f1f9 / brief e8eaf3 / offices f0f1f9) and Contact (2 sections). Dark navy CTA sections stay dark. Footer bg: #f0f1f9 on /contact, #e8eaf3 elsewhere (incl. /careers).
- **Home 'What we can do for you'** redesigned: inline flowing title selector (capability-toggle-0..4) + indented reading stage (capability-active-heading/description). NOTE: capabilities[2..4] share the same heading string — this is ORIGINAL site copy, content-lock forbids rewriting (flagged by testing agent as content note, intentionally not changed).
- **Home**: removed hairline above team photo in Work with BluBridge.
- **About Us 'How We Build, Engineer and Validate'** redesigned: sticky left thesis rail (heading + hairline + typing 'It's Our Hunger./Precision.' at clamp 30-46px) with 4 passages in an offset 2×2 grid (short hairline accents, right column pushed down). No numbers per user.
- **Header**: logo wordmark 225×31px; scroll state uses new `/images/b-icon.svg` (user-provided SVG); on /careers header/strip are borderless; Contact CTA 3px radius on /careers.
- **Footer** (`Footer.jsx`) replaced GLOBALLY with compact correspondence-index layout: hairline-underline form (First/Last on one row, Email, Message, rectangular Contact Now), Product/Solutions/Company typographic index, brand block + privacy text, baseline with copyright/Privacy Policy/Terms Of Use. Form e2e verified (POST /api/contacts/submit type footer_form → 200).
- Frontend serving note: Express serves static build; watcher auto-rebuilds (~90s) on src changes; manual `yarn build && sudo supervisorctl restart frontend` if watcher misses (lock: /tmp/frontend_build.lock).

## 2026-06 (fork 2) — Careers ground-up rebuild + Home colors COMPLETE
- `Careers.jsx` fully rebuilt as editorial "recruitment publication" on warm `#f5f3e9` (per explicit user brief; rest of site stays cool palette). Sections: asymmetric masthead (Join Us inset, statement offset right, rectangular 3px 'See open roles' toggle), job ledger (12 rows preserved), compact "What are we?" hinge, one continuous candidature brief (3 distinct compositions for Eligibility / Hiring & Onboarding staggered 2-col / What we offer anchor+cluster), geographic colophon offices (vertical 'OUR OFFICES' anchor, offset address blocks, underlined map links). All content verbatim.
- `Header.jsx` + `Footer.jsx`: route-aware `/careers` variants — cream header w/ no borders, 3px CTA radius; compact correspondence-index footer (form upper-left, typographic Product/Solutions/Company index, brand block, baseline) with identical form logic/testids. Other routes unchanged.
- `Home.jsx`: alternating section backgrounds applied per user spec — hero `#f0f1f9`, expertise `#e8eaf3`, services `#f0f1f9`, infrastructure `#e8eaf3`, capabilities `#f0f1f9`, work `#e8eaf3`, final CTA stays dark navy. Warm tokens (`#d8d5ca`/`#8a8471`/`#6b6a5c`) swapped to cool (`#d4d8e8`/`#7c86a2`).
- Home "What we can do for you" redesigned (was accordion → now inline flowing title selector + indented reading stage, testids capability-toggle-0..4, capability-active-heading/description). Content verbatim.
- Full frontend regression by testing agent iteration_13.json — 49/50 PASS (98%); footer form e2e 200; mobile 390px no h-scroll; only note is intentional (stage heading shows original tagline content). PENDING REGRESSION DEBT FROM PRIOR SESSION CLEARED.
- Note: frontend-watcher (inotify) did not trigger; manual `yarn build && sudo supervisorctl restart frontend` was needed after src edits.
