# BluBridge AI Consulting Contact Form Implementation Blueprint & Guidelines

## 1. Executive Overview
This document provides the section-level implementation blueprint for the new `/ai-consulting` route and the updated "Project Details" step of the BluBridge AI consulting contact form. It preserves the existing BluBridge design system, header, footer, color scheme (`--git11-ink`, `--git11-accent`, `--git11-bg`, `--git11-line`), typography (`Geist`, `IBM Plex Mono`), and structural layout while establishing a multi-step contact experience (Your Details → Project Details → Review & Continue).

---

## 2. Route & Architecture Setup
- **Route Path:** `/ai-consulting`
- **Primary Page Component:** `src/pages/AiConsulting.jsx`
- **Stylesheet:** `src/pages/ai-consulting/AiConsulting.css` (isolated .aic-page rules preserving existing BluBridge token values; no import or edits to source V11 CSS)
- **Guideline File Target:** `/app/ai_consulting_design_guidelines.md`

---

## 3. Form Steps Structure
1. **Step 1: Your Details** (Existing Full name, Work email, Company, Job title, Phone, Country, City, privacy and marketing choices)
2. **Step 2: Project Details** (The updated specialized AI Consulting form requirements)
3. **Step 3: Review** (Read-only summary with Edit and Back; final Submit enquiry disabled, no submission/API/storage)

---

## 4. Section-Level Implementation Blueprint: "Project Details"

### 4.1 Section Header
- **Title:** `Project Details` (H2 / Section Heading)
- **Subtitle:** `Tell us about your requirement so we can understand how to help.`
- **Design:** Clean typography hierarchy using Geist, left-aligned, proper top/bottom margins.

---

### 4.2 Field 1: Service Selection Cards
- **Label:** `What can BluBridge help you with? *`
- **Helper text:** `Select all that apply.`
- **Display:** 2-column grid on desktop (`grid-cols-2`), 1-column stack on mobile (`grid-cols-1`).
- **Options (10 items):**
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
- **Card UI & Behavior:**
  - Outlined selectable card (`border: 1px solid #d9dce5`, `bg: white`, `border-radius: 4px`).
  - Visible checkbox icon / box on the left.
  - Selected state: Primary BluBridge Blue accent border (`#2b4c8c` / `--git11-ink`) with subtle light background tint (`#f4f7ff`).
- **Special Logic Rule 1 (Exclusive Guidance):**
  - If `Not sure — I need guidance` is clicked/selected: automatically deselect ALL other options (1-8 and 10).
  - If any other option is selected while `Not sure — I need guidance` is selected: automatically deselect `Not sure — I need guidance`.
- **Special Logic Rule 2 (Conditional "Other" Field):**
  - If `Other` is selected: immediately display text input underneath:
    - **Label:** `Please specify your requirement *`
    - **Placeholder:** `Briefly specify your requirement`
    - **Validation:** Required when `Other` is active.
    - If `Other` is deselected: hide field and reset text state.

---

### 4.3 Field 2: Project Description
- **Label:** `Tell us about your requirement *`
- **Display:** Large `<textarea>` (height ~120px–140px, clean border, comfortable line height).
- **Placeholder:** `What problem are you trying to solve? Briefly describe what you would like to build or improve, the expected outcome and any existing systems involved.`
- **Validation:** Required (non-empty). Optional subtle character counter.

---

### 4.4 Field 3 & Field 4: Project Stage & Start Timeline (Side-by-Side Grid)
- **Layout:** Desktop 2-column grid (`grid-cols-2`, gap 24px), Mobile 1-column stack.
- **Field 3:**
  - **Label:** `What is the current stage of your project? *`
  - **Type:** Dropdown (`<select>`).
  - **Placeholder:** `Select your project stage`
  - **Options:**
    - Exploring options
    - Requirements defined
    - Planning a proof of concept or pilot
    - Development in progress
    - Improving an existing system
    - Ready for deployment
    - Other
- **Field 4:**
  - **Label:** `When would you like to start? *`
  - **Type:** Dropdown (`<select>`).
  - **Placeholder:** `Select your expected start timeline`
  - **Options:**
    - Within 30 days
    - 1–3 months
    - 3–6 months
    - More than 6 months
    - No fixed start date yet

---

### 4.5 Field 5: Budget Type Selection
- **Label:** `How would you like to specify your budget? *`
- **Display:** Clearly visible native radio buttons with simple labels, not pill cards.
- **Options:**
  1. `Total project / initial engagement budget`
  2. `Monthly budget for an ongoing engagement`
- **Helper text underneath:** `Select whether your estimate covers the project or initial phase, or a recurring monthly engagement.`
- **Design:** Visually separated from preceding fields with light neutral padding container (`bg: #f8fafc` or subtle top/bottom borders).

---

### 4.6 Field 6 & Field 7: Estimated Budget & Budget Status (Dynamic Side-by-Side Grid)
- **Layout:** Desktop 2-column grid (`grid-cols-2`, gap 24px), Mobile 1-column stack.
- **Field 6 Dynamic Behavior:**
  - **Default Placeholder:** `Select your estimated budget`
  - **CASE A:** If Field 5 is `Total project / initial engagement budget`:
    - **Label:** `Estimated Project Budget (USD) *`
    - **Options:**
      - Below $10,000
      - $10,000–$24,999
      - $25,000–$49,999
      - $50,000–$99,999
      - $100,000–$249,999
      - $250,000 or more
      - Budget not yet defined
  - **CASE B:** If Field 5 is `Monthly budget for an ongoing engagement`:
    - **Label:** `Estimated Monthly Budget (USD) *`
    - **Options:**
      - Below $5,000 per month
      - $5,000–$9,999 per month
      - $10,000–$24,999 per month
      - $25,000–$49,999 per month
      - $50,000 or more per month
      - Budget not yet defined
  - **Interaction Rule:** Switching radio selection immediately updates label, updates dropdown options list, and resets selected value to empty.
- **Field 7:**
  - **Label:** `What is the current status of this budget? *`
  - **Type:** Dropdown (`<select>`).
  - **Placeholder:** `Select budget status`
  - **Options:**
    - Budget approved and available
    - Budget proposed — approval pending
    - Need a scoped proposal to secure approval
    - No budget available currently
    - I do not know the budget status yet

---

### 4.7 Form Validation & Error Handling
- **Required Fields:** Service selection, Requirement description, Project stage, Start timeline, Budget type, Estimated budget, Budget status, plus conditional "Other" requirement text.
- **Inline Validation:** Red asterisk `*`, subtle red border (`border-color: #b3293a`), and clear error message directly below the invalid input with `role="alert"`.
- **Error Removal:** Clears instantly as soon as user enters valid input.

---

### 4.8 Navigation & Bottom Actions
- **Left Button:** `Back` (Navigates to Step 1 or previous view).
- **Right Button (Primary CTA):** `Review & Continue`
  - Validates all Step 2 fields upon click.
  - If valid: transitions to Step 3 (Review step).
  - No backend submission at this stage.

---

## 5. Visual & Interaction Design Guidelines

```json
{
  "theme": "light",
  "fonts": {
    "heading": "Geist, sans-serif",
    "body": "Geist, sans-serif",
    "mono": "IBM Plex Mono, monospace"
  },
  "colors": {
    "background": "#f0f2fa",
    "surface": "#ffffff",
    "surface_subtle": "#f8faff",
    "ink": "#0a102c",
    "muted": "#7d8293",
    "line": "#dfe2eb",
    "accent_primary": "#2b4c8c",
    "accent_hover": "#1c2e55",
    "required": "#b3293a",
    "error": "#b3293a"
  },
  "spacing": {
    "container_max_width": "970px",
    "field_gap": "20px",
    "group_gap": "32px",
    "internal_input_padding": "10px 14px"
  },
  "testing": {
    "data_testid_pattern": "ai-consulting-[field-id]-[element-type]"
  }
}
```

---

## 6. General UI/UX Guidelines
1. All form controls must have explicit focus rings (`outline: 2px solid #2b4c8c`, `outline-offset: 2px`).
2. Include exact `data-testid` attributes on every interactive option, checkbox, dropdown, and button for end-to-end test stability.
3. Mobile viewports (< 768px) must stack all 2-column grids into single full-width columns with 42px touch targets.
