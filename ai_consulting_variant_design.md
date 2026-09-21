# BluBridge AI Consulting Variant Design Blueprint (/ai-consulting-1)

## 1. Executive Summary & Architecture Strategy
This document defines the complete visual and structural design blueprint for the **NEW `/ai-consulting-1` route**. 
- **Route:** `/ai-consulting-1`
- **Source Safety:** The original `/ai-consulting` route and source files (`src/pages/AiConsulting.jsx`, `src/pages/ai-consulting/AiConsulting.css`) are strictly locked and untouched.
- **Content & Logic Lock:** Verbatim content, validation rules, field inventory, conditional logic, and submission API (`POST /api/ai-consulting-enquiries`) from `/app/memory/AI_CONSULTING_CONTENT_INVENTORY.md` are 100% preserved.
- **Design Philosophy:** Premium enterprise AI consulting contact experience. Asymmetric editorial 2-part composition (Sticky Left Intro + Clean Right Form Area), replacing the traditional centered card layout with high-end spatial layout, crisp typography, and refined micro-interactions.

---

## 2. Page Composition & Layout System

### 2.1 Desktop Composition (Viewport >= 1024px)
- **Container:** Full-width responsive layout with `max-width: 1360px` centered, generous top/bottom padding (`py-12 lg:py-16`).
- **Grid Layout:** Asymmetric 2-column layout using CSS Grid or Flex:
  - **Left Intro Panel:** `w-full lg:w-[32%] xl:w-[35%]`, sticky positioning (`sticky top-28 self-start`).
  - **Right Form Column:** `w-full lg:w-[68%] xl:w-[65%]`, contains the single-page enquiry form. Form max-width within column: `780px - 840px`.
  - **Column Gap:** `gap-12 lg:gap-16 xl:gap-20`.

### 2.2 Tablet Composition (768px - 1023px)
- Responsive 2-part grid or compact stack with scaled padding. Intro stays top-aligned with condensed vertical footprint (`mb-10`), form expands to fill tablet column with 2-column inline fields intact where width permits (`>= 768px`).

### 2.3 Mobile Composition (< 768px)
- Single column stacked composition:
  1. Sticky/top header navigation (reused global header).
  2. Compact Left Intro Panel (stacked above form, static positioning).
  3. Single-Page Form Area (1-column fields, full width CTA).

---

## 3. Left Intro Panel Specifications

- **Background:** Soft architectural pale neutral tint (`#F5F7FB` or `hsl(220, 30%, 97%)`) with light 1px border (`border-r border-slate-200/80` on desktop).
- **Decorations:** Abstract subtle CSS linear grid lines (`bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]`), no stock photos or heavy illustrations.
- **Typography & Content (Verbatim Reuse):**
  - **Eyebrow:** `GET IN TOUCH` — Monospace / Tracking wide, uppercase (`text-xs font-mono font-semibold tracking-[0.2em] text-blue-600 mb-4`).
  - **H1 Heading:** `Let’s build what’s next.` — Large editorial serif/display heading (`text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] mb-6`).
  - **Description:** `From an early idea to your next AI initiative, let’s find the right place to start.` — Refined secondary copy (`text-base lg:text-lg text-slate-600 leading-relaxed max-w-md`).
- **Key Value Indicators / Trust Badges:** Clean text bullet indicators highlighting enterprise advisory, custom models, and confidential scoping.

---

## 4. Right Form Area Specifications

- **Form Container:** Clean solid white background (`#FFFFFF`), `rounded-2xl`, subtle border (`border border-slate-200/80`), floating shadow (`shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)]`), internal padding (`p-6 sm:p-10 lg:p-12`).
- **No Outer Card Stacking:** The form is divided into visual sections using spacing, clear section headings, and thin neutral divider lines (`border-t border-slate-100`).

---

## 5. Visual Form Section Breakdown

### Section 1: Contact Information
- **Section Heading:** `CONTACT INFORMATION`
- **Subtitle:** `Tell us who you are and how we can reach you.`
- **Fields & Grid:**
  - Row 1: `fullName` (Full Name) | `workEmail` (Work Email) — 2-column grid (`grid-cols-1 md:grid-cols-2 gap-6`).
  - Row 2: `phone` (Phone Number with integrated country calling code selector) | `company` (Company Name) — 2-column grid (`grid-cols-1 md:grid-cols-2 gap-6`).
  - Row 3: `jobTitle` (Job Title) | `website` (Company Website (Optional)) — 2-column grid (`grid-cols-1 md:grid-cols-2 gap-6`).
  - Row 4: `countryCode` (Your Country / Region) — Full width (`col-span-full`). Integrated searchable custom dropdown.

### Section 2: Your Role & Requirements
- **Section Heading:** `YOUR ROLE & REQUIREMENTS`
- **Subtitle:** `Help us understand your involvement and what you are looking to achieve.`
- **Fields & Grid:**
  - `initiativeRole` (What is your role in this initiative?) — Custom dropdown. If `Other`, conditionally renders `otherRole` (Please specify your role).
  - `services` (What can BluBridge help you with?) — **2-Column Selectable Service Tile Grid** (`grid-cols-1 sm:grid-cols-2 gap-3.5`).
    - Service Tiles: Height `54px–58px`, subtle border (`#E2E8F0`), radius `10px`, hover tint. Selected tile: `#EFF6FF` pale blue fill, `#2563EB` BluBridge blue border, checked icon.
    - Exclusive guidance logic: "Not sure — I need guidance" auto-deselects all other options and vice-versa.
    - Conditional "Other" field: Displays `otherRequirement` when "Other" is active.
  - `requirement` (Tell us about your requirement) — Textarea height `150px`, comfortable padding, dark navy text.

### Section 3: Project Details & Timeline
- **Section Heading:** `PROJECT DETAILS`
- **Subtitle:** `Tell us where the project currently stands and your expected start timeline.`
- **Fields & Grid:**
  - Row 1: `stage` (What is the current stage of your project?) | `timeline` (When would you like to start?) — 2-column grid (`grid-cols-1 md:grid-cols-2 gap-6`).

### Section 4: Budget & Investment
- **Section Heading:** `BUDGET & TIMELINE`
- **Subtitle:** `Specify your budget structure and investment range.`
- **Fields & Grid:**
  - `budgetType` (How would you like to specify your budget?) — **Selectable Horizontal Choice Panels**:
    - Card 1: `Total project / initial engagement budget`
    - Card 2: `Monthly budget for an ongoing engagement`
    - Helper text: *Select whether your estimate covers the project or initial phase, or a recurring monthly engagement.*
  - Row 2: `estimatedBudget` (Dynamic Budget dropdown based on budgetType selection) | `budgetStatus` (What is the current status of this budget?) — 2-column grid (`grid-cols-1 md:grid-cols-2 gap-6`).

### Section 5: Contact Permission & Final Submission
- **Section Heading:** `CONTACT PERMISSION`
- **Fields & Grid:**
  - `contactPermission` — Checkbox with label: *I agree that BluBridge may contact me by phone or email regarding this enquiry. I acknowledge the Privacy Policy.* (Privacy Policy links to `/policies/privacy-policy`).
- **Final CTA Button:**
  - Label: `Submit Enquiry`
  - Style: BluBridge Primary Blue (`bg-[#1D4ED8]` / hover `#1E40AF`), height `52px`, rounded `10px`, font-semibold, right-aligned on desktop (`md:ml-auto md:w-auto md:px-10`), full-width on mobile.
  - Test ID: `data-testid="ai-consulting-submit-button"`.

---

## 6. Design System Tokens & Typography Scale

```json
{
  "theme": "light",
  "fonts": {
    "heading": "Outfit, Geist, sans-serif",
    "body": "Inter, Geist, sans-serif",
    "mono": "JetBrains Mono, IBM Plex Mono, monospace"
  },
  "typography_scale": {
    "h1": "44px - 52px (desktop), 32px (mobile)",
    "intro_description": "17px - 18px",
    "section_heading": "20px - 22px, font-weight 700, tracking-tight",
    "field_label": "15px - 16px, font-weight 600, color #0F172A",
    "input_text": "15px - 16px, color #0F172A",
    "placeholder": "14px - 15px, color #94A3B8",
    "helper_text": "13px - 14px, color #64748B",
    "validation_error": "13px, color #DC2626"
  },
  "colors": {
    "page_bg": "#F8FAFC",
    "intro_bg": "#F5F7FB",
    "form_bg": "#FFFFFF",
    "border_default": "#DCE2EA",
    "border_focus": "#2563EB",
    "primary_accent": "#1D4ED8",
    "primary_hover": "#1E40AF",
    "selected_tile_bg": "#EFF6FF",
    "text_primary": "#0F172A",
    "text_secondary": "#475569",
    "text_muted": "#94A3B8",
    "error_red": "#DC2626"
  },
  "component_styling": {
    "input_height": "52px",
    "border_radius": "10px",
    "service_tile_height": "56px",
    "cta_height": "52px"
  }
}
```

---

## 7. Validation & Micro-Interactions
- **Inline Error Style:** Thin red border (`border-red-500`), subtle red background ring, non-disruptive 13px red error message directly below input.
- **Scroll on Invalid:** First invalid field scrolls into view with standard smooth animation.
- **Focus Rings:** `focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600`.
- **Keyboard Navigation:** Native ARIA roles, full tab index support, custom country search handles ArrowUp/ArrowDown/Enter/Escape.
- **Test Attributes:** All fields and interactives include `data-testid="ai-consulting-1-[field-name]"`.
