# Budget/admin follow-up verification — 2026-09-19

Original test report: iteration_25.json (21/21 backend passed).

## Resolved test notes
- Added data-testid selectors to AdminLogin username/password/submit/error plus associated accessible labels; actual login verified using the new selectors.
- Seeded one temporary legacy project enquiry without budget, including a long unbroken full name and company value. Real admin search showed exactly this record; list and detail both displayed `Not provided`.
- Desktop 1920×800: admin list overflow offenders `[]`.
- Mobile 390×844: admin list and detail modal overflow offenders both `[]`. Cursor remained pointer-events:none; mouse placed away from viewport edges to avoid cursor-layer false positives.
- Detail close and confirmed delete verified; temporary fixture `qa-budget-legacy-0a29004658624e8294f271a8bef21521` removed through the admin UI. Empty search result confirmed.
- Screenshots: `/tmp/budget-admin-legacy-desktop.jpg`, `/tmp/budget-admin-legacy-mobile.jpg` (automation output 20260919_095543).
- No remaining functional defect or legacy UI coverage gap from iteration_25. No credentials changed. Email sending success appears in backend logs; inbox delivery was not independently verified.

New budget/admin flows are real. `/get-in-touch-7`, `/get-in-touch-8`, `/get-in-touch-9` remain MOCKED frontend-only submissions by prior instruction.