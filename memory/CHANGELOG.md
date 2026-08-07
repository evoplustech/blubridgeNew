
## 2026-06 (fork session)
- Content-lock purge: removed all agent-added numberings/labels site-wide (FIG., METHOD, /01 eyebrows, index numbers, chapter markers) incl. Home hero per user red markup
- New alternating background scheme: odd sections #f0f1f9, even #e8eaf3; top bar + header now #f0f1f9 (light); footer #e8eaf3. Excluded: Research pages, JobDetail
- Replaced logo with user-provided BluBridge wordmark SVG (/images/blubridge-logo.svg) in Header + Footer
- Home page redesigned per user reference image: Expertise industry spotlight (click/hover select), 3-col By Services with Learn More links, horizontal-tab Infrastructure, +/- accordion "What we can do for you" (with original site headlines recovered from blubridge.com JS bundle), framed team photo
- Footer restructured: full-width contact form on top, 4-column row (brand+privacy | Product | Solutions | Company)

## 2026-06 (continued)
- Solutions hero rebuilt per user reference (italic "for Enterprise Frontiers", right rule + para + CTA, stepped node-path SVG)
- Solutions body sections redesigned: 3-col method columns with dash lists, zebra Customization Stack table, editorial value rows, horizontal deployment tabs (matches Home infra pattern)
- About Us redesigned per reference: hero with framed team photo + underlined "Get in touch" link, Mission as eyebrow + large statement + "Join us →", How We Build with typing text under heading + 4 definition rows
- Careers page fully rebuilt with user-specified content ONLY: hiring badge, Join Us hero, See open roles toggle (job ledger), What are we?, 3 role cards (eligibility/hiring process/what we offer), OUR OFFICES with 3 cards incl. new Newark Delaware office (replaces Princeton)
- Custom cursor: circle-with-dot design site-wide (accent variant on interactive elements)
- Footer: 5-column layout (brand | Product | Solutions | Company | contact form)
- NOTE: frontend auto-rebuild watcher unreliable (inotify) — use manual `yarn build` + supervisor restart when build seems stale

## 2026-08-06 (fork session)
- "What we can do for you" — 6th iteration: rebuilt as EDITORIAL INDEX BAR + JOURNAL SPREAD
  - Oversized left-anchored title with baseline hairline extending right
  - Horizontal 5-column capability index bar bounded by top/bottom hairlines with fine vertical rule separators
  - Active capability marked by an animated solid ink underline block (scaleX transition)
  - Two-column journal spread below: large active heading (cols 1-7) + description (cols 8-12) with a short ink dash accent
  - Strict content lock respected; no boxes/gradients/badges

## 2026-08-06 (fork) — Home: Expertise + By Services swapped to Ref 2
- `pages/Home.jsx` — `ExpertiseSection` rebuilt to Reference 2 layout: "Our Frontier AI Expertise" heading + `BY INDUSTRY` mono eyebrow row + hairline rule + **numbered 2×5 grid** of 10 industries with 01–10 mono indices (was Ref 3 Telco spotlight list). All 10 industry names preserved; `data-testid="frontier-expertise-section"` / `industry-grid` / `expertise-<slug>` added.
- `pages/Home.jsx` — By Services section (SECTION 3) rebuilt to Reference 2 asymmetric grid: **tall dark `Model Customization` card on left** with 6 faint horizontal rails; **`Value Realization`** (light card with dashed strip) + **`Deployment`** (dark card with dashed wave line) stacked on the right column. Each card has `OPEN ↗` hover reveal. Rectangular navy "Talk To Us" CTA retained bottom-right. Content verbatim; testids preserved (`solution-model-customization`, `solution-value-realization`, `solution-deployment`, `support-talk-to-us-btn`).
- Build verified: `yarn build` compiled cleanly, no console errors, screenshots at 1440px confirm both sections render correctly.
- REMAINING (not done in this session due to scope): Infrastructure → Ref 1 exact `fxi-*` styling; Capabilities → Ref 2 left-list `cap-split` layout; Work with BluBridge → Ref 2 `wwb-grid` with thin vertical divider; Solutions/Research/About Us Mission/Careers/Contact full migrations from the source refs.

## 2026-08-06 (fork 2) — Home: exact 1:1 copies from premium-pages-ui reference
- Added `Cache-Control: no-cache` on all HTML responses in `frontend/server.js` (users were seeing stale cached builds).
- `pages/Home.jsx` + `index.css` — **By Services** section replaced with EXACT copy from https://premium-minimal-site.preview.emergentagent.com/ (bys-* classes: white MC card w/ rails, light VR card w/ strip, dark gradient DP card w/ wave, bys-bg-lines vertical grid overlay, big fx-label "By Services", Talk To Us bottom-right). Old inline-styled version deleted. Verified via screenshot — pixel-matches reference.
- `pages/Home.jsx` — **What we can do for you** section replaced with EXACT copy from same reference (vertical tab list left / detail right, cap-* classes in inline <style>, testids `vertical-tabs`, `vertical-tab-{i}`, `vertical-tab-content`, `capabilities-explore-solutions`). Tab switching verified.

## 2026-08-06 (fork 2, cont.) — Solutions page: exact 1:1 copy from mission-polish reference
- `pages/SolutionsNew.jsx` rewritten as EXACT copy of https://premium-minimal-site.preview.emergentagent.com/solutions (excluding header/footer): sxh hero (animated circuit SVG + signal dot), S1 model-customization (3 sxp-cards + Customization Stack table desktop/mobile + Customize Your Model CTA), S2 value-realization (3 vitems + Request Assessment CTA), S3 deployment tabs (Deployment Tooling/Serving Frameworks/Infrastructure Tracks, indicator + is-active + panel content verified), S4 Research & Publications dark CTA. IntersectionObserver adds `is-inview` for reveal animations. All sxh-*/sxp-* CSS + keyframes appended to `index.css` verbatim. Section ids preserved: #model-customization, #value-realization, #deployment.

## 2026-08-06 (fork 2, cont.) — Research page copy + Solutions CTA tweak
- `pages/SolutionsNew.jsx` — Deployment section "Talk to Us" CTA moved to LEFT of the rule and enlarged (56px min-height, 16px font, 1.1rem/2.2rem padding) per user request.
- `pages/Research.jsx` rewritten as EXACT copy of https://premium-minimal-site.preview.emergentagent.com/research (excl. header/footer): in-hero (bluefield grid, scanline, token strip, Publication Index eyebrow), ARCHIVE // 004 ENTRIES signal divider, 4 in-folio publication cards (Nova, BluTrain, FLUX, Blu-WERP) with arXiv links, authors, abstracts and More » links (FLUX→/Research/FLUX-Data, Blu-WERP→/Research/Blu-Werp). Full `internal-site` design-system CSS added to `index.css` (namespaced under .internal-site). IntersectionObserver drives .in-rev/.in-view reveals. Verified via screenshots.

## 2026-08-06 (fork 2, cont.) — About Us page: exact 1:1 copy from premium-pages-ui reference
- `pages/AboutUs.jsx` rewritten as EXACT copy of https://premium-minimal-site.preview.emergentagent.com/about-us (excl. header/footer AND the "Know more about our Research" section which was kept from the existing page as user requested): au-hero (eyebrow + heading + team photo + para + Get in touch), au-mission (SVG path lines, indented statement, Join us CTA), au-method (Our Purpose cell + "It's Our Hunger./Precision." typing animation with blinking caret + 3 method cells with dark emphasis middle). All au-* CSS + responsive rules appended to index.css. Team photo downloaded to /public/images/cdn/183b87_3g9ggy4y_SA7.jpg. Verified via screenshots.

## 2026-08-06 (fork 2, cont.) — About Us fixes
- Our Mission rebuilt as 3-column editorial row per user screenshot: "Our Mission" title + dash (left), vertical hairlines, mission paragraph (middle), circled → arrow + "Join us" link to /careers (right). Same content, testids preserved. Responsive stack <1024px.
- Fixed typing animation bug in PassionTypingText: word-switch branch never re-triggered the effect (text stayed ''), so animation stalled after first cycle. Now types/deletes "Hunger." ↔ "Precision." continuously — verified via sampled inner_text.

## 2026-08-06 (fork 2, cont.) — Contact page redesigned from user's two design references
- `pages/Contact.jsx` re-skinned (content + logic 100% preserved: same 3 channels, form fields, validation, verify email, /api/contacts/submit, offices data, testids): left rail = Contact Us title + accent dash + white channel cards (icon tile, mono label, value, chevron, hover lift) + dot-grid accent; right = floating white form card (16px radius, soft shadow) over blue blob accent, full-width dark Submit; OUR OFFICES = centered tick + heading + single white card with 3 hairline-divided columns (circle Building2 icon, region title, address, maps link). All cx-* CSS in index.css. Form submit verified via curl (HTTP 200).

## 2026-08-06 (fork 2, cont.) — Contact details updated
- USA office corrected to: BLUBRIDGE INC, 254 Chapman Rd, STE 208 #28314, Newark, Delaware 19702 USA (+ updated maps link).
- Added X (Twitter) channel card below LinkedIn: x.com/BlubridgeAI → https://x.com/BlubridgeAI (testid channel-twitter). Verified via screenshot.

## 2026-08-06 (fork 2, cont.) — batch: careers, footer, home industry, logo, spacing
- Careers page rebuilt: hero kept then restyled per violet reference (lavender bg + purple glow, white WE'RE HIRING pill, bold Join Us + gradient underline, violet See open roles pill — toggle/jobs logic intact); offices section moved BELOW hero in screenshot-1 design (our navy theme: MapPin tiles, centered columns w/ dividers, Let's Connect dark rounded bar w/ phone/careers@blubridge.com/LinkedIn/X); "What are we?" re-laid out per screenshot-3 (heading+desc left, animated navy orbital SVG right, roles heading, 3 icon columns with dividers) — ALL existing content preserved (job rows verified = 4).
- Footer.jsx replaced globally with exact copy of premium-pages-ui footer (logo col, Product/Pages/Connect, Contact Us mini-form wired to existing /api/contacts/submit footer_form + toasts, privacy note, © bar with Privacy Policy/Terms Of Use).
- Home "By Industry" replaced with exact reference copy (fx-label big label row, fxi-grid 2-col bordered cells 01-10, hover #ffffff73, testids expertise-telco…expertise-construction-infra). fxi/fx-head CSS added.
- ORIGINAL BluBridge vector logo restored from git (aa726a5) after it was accidentally overwritten by reference's plain-text SVG — header+footer both use /images/blubridge-logo.svg.
- Removed gap between industry grid and By Services (fx-industry margin 0, bys-scope marginTop 0) and set services section bg to #f0f1f9 per user annotation.
