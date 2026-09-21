# Locked source inventory — /ai-consulting → /ai-consulting-1

## Latest approved override — 2026-09-21
This historical snapshot is superseded for the Other field on all four `/ai-consulting`, `-1`, `-2`, `-3` routes. User approved removing duplicate `otherRequirement` input and showing only `requirement` (label/placeholder unchanged, max5000) inside **Other - Please specify** when selected. Collapsed initially; checkbox click/Space expands; deselection collapses. Description required only when Other selected. Draft survives toggling but submits empty when hidden. Backend accepts empty/omitted description for non-Other and rejects blank/whitespace for Other. Legacy `other_requirement` remains readable/exportable; no migration. See PRD update and iteration_33.json. Other form choices and layouts remain as they were immediately before this request.

## Historical source snapshot
Source snapshot: `/app/memory/ai-consulting-source-lock.sha256`. Source files, existing CSS, header/footer, hooks, validation and backend must not be edited for the design alternative. Only App.js adds a route/import. Both designs render the same existing field components and use the same validated submission hook; all content below is retained verbatim.

## Page and sections
- Title: AI Consulting | BluBridge
- Eyebrow: GET IN TOUCH
- H1: Let’s build what’s next.
- Description: From an early idea to your next AI initiative, let’s find the right place to start.
- Accessible form heading: AI Consulting Enquiry
- Contact Information — Tell us who you are and how we can reach you.
- Your Role & Project Requirements — Help us understand your involvement and what you are looking to achieve.
- Project Timeline & Budget — Tell us where the project currently stands and your expected investment range.
- Contact Permission
- Existing global Header (including information strip, logo, all navigation/options/links) and Footer are reused unchanged by App.js.

## Every field, placeholder, state and limit
| Name | Label | Placeholder | Required | Constraint/default |
|---|---|---|---|---|
| fullName | Full Name | Enter your full name | Yes | trimmed nonempty; max200 |
| workEmail | Work Email | name@company.com | Yes | email format; max254 |
| company | Company Name | Enter your company name | Yes | trimmed nonempty; max200 |
| jobTitle | Job Title | Example: CTO, Head of AI, Founder | Yes | trimmed nonempty; max200 |
| countryCode | Your Country / Region | Select your country / region | Yes | searchable252-country/region dataset; empty initial |
| phoneCountry | Country calling code (accessible label) | Code | Part of Phone Number | calling-code search; synced automatically from country; independently overridable |
| phone | Phone Number | Enter your phone number | Yes | selected calling-code-aware possible number; max40; E164 on submission |
| website | Company Website (Optional) | https://www.company.com | No | HTTP/HTTPS URL if entered; max2048 |
| initiativeRole | What is your role in this initiative? | Select your role | Yes | role options below |
| otherRole | Please specify your role | Enter your role | Only role Other | max200; clear/hide when role changes |
| services | What can BluBridge help you with? | Select all that apply. (helper) | At least one | service options below; empty initial |
| otherRequirement | Please specify your requirement | Briefly specify your requirement | Only service Other | max1000; clear/hide on deselect |
| requirement | Tell us about your requirement | What problem are you trying to solve? Briefly describe what you would like to build or improve, the expected outcome and any existing systems involved. | Yes | trimmed nonempty; max5000 |
| stage | What is the current stage of your project? | Select your project stage | Yes | stage options below |
| timeline | When would you like to start? | Select your expected start timeline | Yes | timeline options below |
| budgetType | How would you like to specify your budget? | none | Yes | project/monthly radio options below; initially neither |
| estimatedBudget | Estimated Project Budget (USD) / Estimated Monthly Budget (USD) | Select your estimated budget | Yes | dependent options below; disabled until type chosen; resets on type switch |
| budgetStatus | What is the current status of this budget? | Select budget status | Yes | status options below |
| contactPermission | I agree that BluBridge may contact me by phone or email regarding this enquiry. I acknowledge the Privacy Policy. | none | Yes | unchecked initially; no promotional checkbox |

Required labels have the same red * and optional website suffix is `(Optional)`.

## Exact choices
### Role
1. Final decision-maker / approver
2. Part of the decision-making team
3. Technical evaluator / recommender
4. Procurement / purchasing
5. Researching on behalf of a decision-maker
6. Other

### Services (ordered)
1. AI Consulting & Technical Advisory
2. Custom AI & Model Development
3. Generative AI, LLM & RAG Systems
4. AI Agents & Automation
5. Model Training & Fine-Tuning
6. GPU & AI Systems Optimisation
7. Deployment & Integration
8. Maintenance & Support
9. Not sure — I need guidance
10. Other

Guidance clears all other selections (including Other). Selecting any normal service clears guidance. Other conditionally requires specification; hidden value/error cleared when deselected. Regular services allow multiple selections.

### Project stage
1. Exploring options
2. Requirements defined
3. Planning a proof of concept or pilot
4. Development in progress
5. Improving an existing system
6. Ready for deployment
7. Other

### Start timeline
1. Within 30 days
2. 1–3 months
3. 3–6 months
4. More than 6 months
5. No fixed start date yet

### Budget type
- Total project / initial engagement budget
- Monthly budget for an ongoing engagement

Exact helper: Select whether your estimate covers the project or initial phase, or a recurring monthly engagement.

### Project estimate
1. Below $10,000
2. $10,000–$24,999
3. $25,000–$49,999
4. $50,000–$99,999
5. $100,000–$249,999
6. $250,000 or more
7. Budget not yet defined

### Monthly estimate
1. Below $5,000 per month
2. $5,000–$9,999 per month
3. $10,000–$24,999 per month
4. $25,000–$49,999 per month
5. $50,000 or more per month
6. Budget not yet defined

### Budget status
1. Budget approved and available
2. Budget proposed — approval pending
3. Need a scoped proposal to secure approval
4. No budget available currently
5. I do not know the budget status yet

### Country and phone selector inventory
- All252 entries/names/ISOcodes/calling codes captured in `ai-consulting-country-inventory.json`.
- Data source: unchanged `pages/ai-consulting/countryData.js`, i18n-iso-countries + libphonenumber-js.
- Search placeholders: `Search countries / regions`, `Search country or calling code`.
- Empty result: `No country found.`
- Exact name/code matches prioritized; partial names and calling codes searchable; flags where supported.
- Country selection automatically selects matching calling code; phone selector can subsequently override it.

## Validation and interactions
- Inline errors, first invalid field focused/scrolled into view, no browser popup alerts.
- Every exact validation string is in the locked `validation.js`; both versions reuse that file directly.
- Required nonempty values reject whitespace; email syntax validated; website must be HTTP/HTTPS with hostname; phone validated against selected country numbering plan.
- Error state clears when corrected, while other outstanding errors remain.
- Budget label/options switch immediately; prior estimate always cleared, including shared `Budget not yet defined`.
- Native accessible checkbox/radio controls, searchable keyboard country controls, keyboard Enter submission on the single-page form.
- Privacy Policy link: `/policies/privacy-policy` (unchanged).
- No steps, progress, tabs, hidden accordion sections, Back/Next/Review controls.

## Submission, success, error copy
- One CTA: Submit Enquiry; pending: Submitting…; saved: Enquiry Submitted.
- Real endpoint: POST `/api/ai-consulting-enquiries` with unchanged JSON payload/schema/admin integration. Same source metadata as the original endpoint; no backend change for this design variant.
- Event preventDefault prevents native GET/URL leakage. Known accidental enquiry query keys removed on load, unrelated URL parameters retained.
- Double-click latch; pending/success disables form controls. Failed requests preserve values.
- Success: `Success Fully Submitted`
- Supporting confirmation: `Your AI consulting enquiry has been received. Our team will be in touch shortly.`
- Reference: `Enquiry reference: {id}`
- 422: `Please check the highlighted fields and try again.` plus server field errors.
- 409: `An enquiry was already submitted with this email recently. Please wait a minute before submitting again.`
- 429: `Too many requests. Please wait a minute before trying again.`
- Server error: `We couldn’t submit your enquiry. Your details are still here; please try again.`
- Network error: `We couldn’t confirm submission. Please check your connection and try again.`
- Saved data appears in existing Admin → AI Consulting Enquiry, with unchanged CSV exports.