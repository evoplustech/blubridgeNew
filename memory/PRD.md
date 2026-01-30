# BluBridge Website - Product Requirements Document

## Original Problem Statement
Build and iteratively refine a corporate website for BluBridge, an AI engineering company. The primary focus is creating a `/solutions-new` page and updating various other pages (Home, About Us, Careers) based on visual feedback and document content.

## Current State (December 2025)

### Completed Features
- **Solutions New Page (`/solutions-new`)**: Complete with Hero, Model Customization, Value Realization, and Deployment sections
- **Header Component**: Functional Solutions dropdown with proper hover states
- **Home Page**: Updated icons for Retail and Real Estate categories
- **About Us Page**: Highlighted "Join Us" button
- **Careers Page**: New hero section with "BluBridge Careers" and "CURIOSITY WANTED" titles
- **Content Update (Latest)**: All Solutions page content replaced from Solution.docx document

### Key Pages Structure

#### /solutions-new
- Hero Section: "Engineering AI-Native Systems for Enterprise Frontiers"
- Model Customization Section: 3 premium cards (Custom Pre-Training, Specialized Model Capabilities, Inference & Deployment Optimization)
- Customization Stack Table
- Value Realization Section: 3 cards (Proof of Value, Custom Training, Deployment Engineering)
- Deployment Section: Interactive tabs (Self-Deployment Tooling, Serving Frameworks, Infrastructure Tracks) with golden grid background

### Technical Stack
- Frontend: React with Tailwind CSS
- Backend: FastAPI with MongoDB
- UI Components: Shadcn/UI
- Icons: Lucide React
- Fonts: Custom (Playfair Display via Google Fonts)
- Animation: Framer Motion

## Prioritized Backlog

### P0 (High Priority)
- Apply 3-Grid color to About Page
- Create Individual GPU Node Pages

### P1 (Medium Priority)
- Create Blog/Press Pages
- Create Contact Sub-pages
- Refactor `SolutionsNew.jsx` and `Home.jsx` into smaller components

### P2 (Lower Priority)
- Responsiveness fixes for new components
- Fix pre-existing lint errors
- Container width consistency across pages

## File References
- `/app/frontend/src/pages/SolutionsNew.jsx`: Main solutions page
- `/app/frontend/src/pages/Home.jsx`: Home page with updated icons
- `/app/frontend/src/pages/AboutUs.jsx`: About page with button styling
- `/app/frontend/src/pages/Careers.jsx`: Careers page with hero section
- `/app/frontend/src/components/Header.jsx`: Navigation header
- `/app/frontend/public/index.html`: Custom fonts

## 3rd Party Integrations
- Brevo (Sendinblue)
- Embla Carousel React
- Lucide React
- Framer Motion
- MongoDB Atlas

## Notes
- User workflow is iterative and screenshot-driven
- Design changes must be pixel-perfect to user requirements
- Large components (SolutionsNew.jsx, Home.jsx) need refactoring into smaller pieces
