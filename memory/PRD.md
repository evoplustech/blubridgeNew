# BluBridge Website - Product Requirements Document

## Original Problem Statement
Building the BluBridge corporate website - a static full-stack React/FastAPI application for a Deep Learning Research Organization. The project involves rapid, iterative UI and content updates with strict adherence to visual references.

## User Personas
- **Deep Learning Researchers**: Potential team members exploring career opportunities
- **Business Stakeholders**: Organizations interested in AI/ML products and solutions
- **General Visitors**: Learning about BluBridge's mission and offerings

## Core Requirements
- **Strict Adherence**: Implement all UI prompts exactly as described using provided visual attachments
- **Scope Isolation**: Changes confined to specific pages/sections mentioned in prompts
- **Visual Fidelity**: Output must be 100% visually identical to reference images
- **Iterative Development**: Support continuous flow of UI change requests

## Tech Stack
- **Frontend**: React + TailwindCSS + Shadcn/UI + Framer Motion
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Key Libraries**: @radix-ui/react-accordion, embla-carousel-react, lucide-react, framer-motion

---

## What's Been Implemented

### December 2025
- **About Us Page Three-Part Enhancement**: Complete overhaul of the About Us page with:
  - **Task 1 - Hero Section "We are BluBridge" with Animated Logo**: 
    - Removed all existing hero text content
    - Added centered "We are BluBridge" text with animated "B" logo
    - Logo has entrance animation (scale + rotate) and subtle pulse effect
    - Text has coordinated fade-in reveal animation (1-2 seconds)
    - Responsive: stacks on mobile (We are / BluBridge)
    - Background image and overlay preserved
  - **Task 2 - "Who We Are" Section Scroll Animations**:
    - All four content containers have scroll-triggered entrance animations
    - Staggered animation (0.15s delay between each)
    - Left containers slide from left, right containers slide from right
    - Animations play once when containers enter viewport (IntersectionObserver)
  - **Task 3 - Testimonials Carousel Implementation**:
    - Expanded testimonials from 3 to 5 items (scalable to 8+)
    - Carousel shows 2 testimonials at a time on desktop, 1 on mobile
    - Navigation: left/right arrow buttons + dot indicators
    - Smooth slide transition (500ms ease-out)
    - Circular navigation (loops back to start)
    - Touch/swipe support on mobile
    - Responsive with viewport-based visible count

### January 10, 2025
- **Inline Job Application Form System**: Replaced external Naukri links with full inline application system
  - "Apply Now" buttons (header and bottom CTA) now trigger inline form instead of external redirect
  - Form appears at end of job detail page with smooth slide-in animation
  - Page auto-scrolls to form when Apply Now is clicked
  - Form Fields: First Name*, Last Name*, Email*, Phone*, Location*, Resume/CV* (file upload), LinkedIn Profile (optional)
  - Real-time validation on all fields with error messages
  - Submit button disabled until all validations pass
  - File upload: PDF, DOC, DOCX (max 5MB)
  - Backend API: POST /api/job-applications/submit (multipart form data)
  - GET /api/job-applications - retrieve all applications
  - GET /api/job-applications/{id} - retrieve single application
  - PATCH /api/job-applications/{id}/status - update application status
  - MongoDB collection: job_applications
  - Files stored in /app/backend/uploads/resumes/
  - Email notification via Brevo on submission
  - **Test Coverage**: 93% backend tests passed, 100% frontend tests passed

### January 9, 2025
- **Careers Page "Join Us" Section Premium Redesign**: Complete overhaul with research-focused layout
  - Office Locations: 2-column visual map cards with interactive pins, opens Google Maps on click
  - Must-Have Skills: Clean card with checkmark icons for requirements
  - How to Apply: Guided action card with prominent research unit link
  - Get in Touch: 4-column contact grid (Phone, Email, LinkedIn, Twitter) with icon-based cards
  - Enterprise-grade design with subtle hover animations (150-200ms)

- **Homepage "Who We Are?" & "What We Aim to Do?" Interactive Section**: Transformed static cards into interactive collapsible accordion
  - Both content containers hidden by default, only titles visible initially
  - Clickable titles with hover effects (blue color change, animated underline reveal)
  - Smooth 400ms slide-down + fade-in animation on expand
  - Only one card open at a time
  - Rotating chevron icons as visual indicators

- **Careers Page FAQ Transformation**: Converted static FAQ section into professional accordion format
  - 7 FAQ items (a-g) with smooth expand/collapse animation (300ms)
  - Only one item opens at a time
  - Preserved all original content, bullet points, and bold emphasis
  - Clean divider lines, rotating chevron icons

### Previous Session (Handoff)
- **Navigation Dropdown Overhaul**: Hover-triggered Products/Solutions dropdowns with framer-motion animations
- **"Coming Soon" Text Animation**: Per-letter staggered fade-in with two-tone gradient shimmer (#c9a57e, #bd8346)
- **Home Page Hero**: Replaced canvas animation with static Banner.jpg + 70% black overlay
- **Careers Page Styling**: Updated to beige background (#efede5) with white cards (#fffdf7)
- **Research Teams Icon**: Updated CGAD icon to GitBranch

---

## Prioritized Backlog

### P0 - Immediate
- ✅ DONE: Inline Job Application Form (replaces external Naukri links)
- ✅ DONE: About Us Page Three-Part Enhancement (Hero animation, Who We Are scroll animations, Testimonials carousel)

### P1 - High Priority
- Apply 3-Grid color to About Page
- Fix Container Width Inconsistencies in `/products/Training.jsx` and `/products/SovereignCloud.jsx`
- Create Individual GPU Node Pages

### P2 - Medium Priority
- Verify Header Logo Scroll Behavior
- Create Blog/Press Pages
- Create "Home-1" page cloning scale.com (on hold)
- Create Contact Sub-pages

### P3 - Technical Debt/Refactoring
- Extract `AnimatedText` component from `Header.jsx` to its own file
- Extract `AIExpertiseOrbit` from `Home.jsx`
- Standardize container widths globally

---

## Key Files Reference
- `/app/frontend/src/pages/AboutUs.jsx` - About page with animated hero, scroll animations, testimonials carousel
- `/app/frontend/src/pages/JobDetail.jsx` - Job detail page with inline application form trigger
- `/app/frontend/src/components/JobApplicationForm.jsx` - NEW: Inline job application form component
- `/app/frontend/src/data/jobsData.js` - Job listings data
- `/app/backend/server.py` - API endpoints including job-applications
- `/app/frontend/src/components/Header.jsx` - Navigation with dropdown logic
- `/app/frontend/src/pages/Home.jsx` - Hero section, research teams
- `/app/frontend/src/pages/Careers.jsx` - Career page structure
- `/app/frontend/src/pages/JoinOurTeam.jsx` - FAQ accordion component
- `/app/frontend/src/index.css` - Custom CSS including shimmer animation
- `/app/frontend/tailwind.config.js` - Theme configuration

## Third-Party Integrations
- Brevo (Sendinblue) - Email services
- Embla Carousel React - Carousel functionality
- Lucide React - Icons
- Framer Motion - Animations

## API Endpoints (Job Applications)
- `POST /api/job-applications/submit` - Submit job application with resume upload
- `GET /api/job-applications` - Get all applications (optional filters: status, limit)
- `GET /api/job-applications/{id}` - Get single application
- `PATCH /api/job-applications/{id}/status` - Update application status

## MongoDB Collections
- `job_applications` - Stores job application submissions with resume paths
