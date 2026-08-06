
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
- `pages/Home.jsx` + `index.css` — **By Services** section replaced with EXACT copy from https://premium-pages-ui.preview.emergentagent.com/ (bys-* classes: white MC card w/ rails, light VR card w/ strip, dark gradient DP card w/ wave, bys-bg-lines vertical grid overlay, big fx-label "By Services", Talk To Us bottom-right). Old inline-styled version deleted. Verified via screenshot — pixel-matches reference.
- `pages/Home.jsx` — **What we can do for you** section replaced with EXACT copy from same reference (vertical tab list left / detail right, cap-* classes in inline <style>, testids `vertical-tabs`, `vertical-tab-{i}`, `vertical-tab-content`, `capabilities-explore-solutions`). Tab switching verified.

## 2026-08-06 (fork 2, cont.) — Solutions page: exact 1:1 copy from mission-polish reference
- `pages/SolutionsNew.jsx` rewritten as EXACT copy of https://mission-polish.preview.emergentagent.com/solutions (excluding header/footer): sxh hero (animated circuit SVG + signal dot), S1 model-customization (3 sxp-cards + Customization Stack table desktop/mobile + Customize Your Model CTA), S2 value-realization (3 vitems + Request Assessment CTA), S3 deployment tabs (Deployment Tooling/Serving Frameworks/Infrastructure Tracks, indicator + is-active + panel content verified), S4 Research & Publications dark CTA. IntersectionObserver adds `is-inview` for reveal animations. All sxh-*/sxp-* CSS + keyframes appended to `index.css` verbatim. Section ids preserved: #model-customization, #value-realization, #deployment.
