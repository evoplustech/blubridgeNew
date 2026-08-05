
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
