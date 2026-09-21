# Iteration 29 follow-up — 2026-09-21

Original report: iteration_29.json. Backend 21/21 passed; one frontend keyboard mismatch identified.

## Fix
AiConsulting.jsx prevents implicit Enter from INPUT fields during Your Details and Project Details. Native keyboard activation of buttons, checkbox/radio controls and textarea line breaks remain available; Review submits normally.

## Targeted live-browser verification
- Completed valid contact details; Enter in Company stayed on Your Details, zero POST requests.
- Activated Continue with keyboard Enter, selected Other and completed project fields.
- Enter in requirement textarea preserved a line break; Enter in Other specification stayed on Project Details, zero POST requests.
- Activated Review & Continue by keyboard. Enter on Submit enquiry issued exactly ONE real POST `/api/ai-consulting-enquiries`, returned201.
- Exact `Success Fully Submitted` visible, Submitted status and reference displayed.
- Desktop1920×800 and mobile390×844 screenshots: no overflow offenders.
- Temporary test enquiry was deleted via authenticated admin API; existing records untouched.
- Build successful. No remaining issue from iteration_29.

Screenshots: `/tmp/ai-consulting-final-success-desktop.jpg`, `/tmp/ai-consulting-final-success-mobile.jpg` (automation output 20260921_151137).

Old Project Enquiries page/menu/card removal, preserved stored records, redirect and complete AI Consulting Enquiry admin/export fields were verified in iteration_29. Only /get-in-touch-7/-8/-9 remain MOCKED.