# Published pages and consulting migration — follow-up

## Resolved findings
- Initial report38:12/13 backend tests passed, one test identified9 pages inheriting Home metadata. Added missing metadata in `frontend/publishedPageSeo.js`, removed title-only Home-content fallback and normalized canonical lookup. Targeted retest now passes across all46 URLs: `pytest/published_seo_followup.xml`.
- Initial report38's browser submission proof was incomplete due dropdown action synchronization. Investigation identified automation timing; no application-form change was needed. Reused the previously verified menu-visible/hidden waiting pattern. Desktop keyboard and mobile pointer sequences both pass with real requests and DB persistence:20 checks in `published_form_followup.json`. Exactly onePOST/one record per double-click + Enter; all exact QA rows removed.
- Full browser route/link crawl found one additional stale `/gpu-nodes` link in FineTuning, corrected to `/products/gpu-nodes`. No retained layout/text changes.

## Final verification
- `published_navigation_followup.json`: all46 approved React pages render and all rendered internal links target allowed routes; one Google script/config across SPA navigation; full document public/admin transitions with no Google on admin; desktop1920×800/mobile390×844 excluded page and Home recovery have zero horizontal overflow.
- `iteration_38.json` records passing HTTP redirects/exclusions, admin route/API protection, sitemap/robots, Google head scoping/CSP and real API submission/admin visibility. These checks were not affected by the metadata and single-link follow-up edits.
- Main visual smoke: `/root/.emergent/automation_output/20260924_103737/` (desktop moved form and mobile404). Earlier Google runtime smoke confirmed gtag.js and Google Ads collection requests200 with no Google CSP violations.
- Build compiled.51/51 protected backend/admin/base-form source hashes unchanged.
- No current-scope unresolved functional issues; no production mocks added. Existing preview-infrastructure SameSite rewrite and automatic noindex behavior remain unchanged and are outside this route-only task. No production deployment was initiated.