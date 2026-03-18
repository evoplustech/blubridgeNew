import React from 'react';
// Fine-tuning page updated v2
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import Home from './pages/Home';
import Home1 from './pages/Home1';
import Products from './pages/Products';
import Solutions from './pages/Solutions';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Pricing from './pages/Pricing';
import Documentation from './pages/Documentation';
import Partners from './pages/Partners';

// Product Pages
import Training from './pages/products/Training';
import Inference from './pages/products/Inference';
import FineTuning from './pages/products/FineTuning';
import Serverless from './pages/products/Serverless';
import SovereignCloud from './pages/products/SovereignCloud';
import Glomfjord from './pages/products/Glomfjord';
import Narvik from './pages/products/Narvik';
import GPUNodes from './pages/products/GPUNodes';
import Marketplace from './pages/products/Marketplace';
import ModelCustomization from './pages/products/ModelCustomization';

// Solution Pages - Cases
import SolutionTraining from './pages/solutions/Training';
import SolutionInference from './pages/solutions/Inference';
import SolutionFineTuning from './pages/solutions/FineTuning';
import SolutionDeployment from './pages/solutions/Deployment';
import ValueRealization from './pages/solutions/ValueRealization';
import AIDevelopment from './pages/solutions/AIDevelopment';

// Company Pages
import AboutUs from './pages/AboutUs';
import MediaKit from './pages/MediaKit';
import Careers from './pages/Careers';
import Research from './pages/Research';
import BluWerp from './pages/Research/BluWerp';
import FLUX from './pages/Research/FLUX';
import FLUX2 from './pages/Research/FLUX2';
import FLUX3 from './pages/Research/FLUX3';

// Solution Pages - Industry
import Telco from './pages/solutions/industry/Telco';
import SoftwareTechnology from './pages/solutions/industry/SoftwareTechnology';
import FinanceInsurance from './pages/solutions/industry/FinanceInsurance';
import Manufacturing from './pages/solutions/industry/Manufacturing';
import Education from './pages/solutions/industry/Education';
import Government from './pages/solutions/industry/Government';
import Legal from './pages/solutions/industry/Legal';
import Healthcare from './pages/solutions/industry/Healthcare';
import ScrollToTop from './components/ScrollToTop';

// Contact Sub-pages
import ContactSales from './pages/contact/Sales';
import GeneralEnquiry from './pages/contact/GeneralEnquiry';

// Job Detail Page
import JobDetail from './pages/JobDetail';

// Policy Pages
import TransparencyHumanRights from './pages/policies/TransparencyHumanRights';
import PrivacyPolicy from './pages/policies/PrivacyPolicy';
import TermsConditions from './pages/policies/TermsConditions';
import JoinOurTeam from './pages/JoinOurTeam';
import SolutionsNew from './pages/SolutionsNew';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import FooterForms from './pages/admin/FooterForms';
import ContactForms from './pages/admin/ContactForms';
import CareerApplications from './pages/admin/CareerApplications';
import AdminSettings from './pages/admin/AdminSettings';

// Main App Layout Component
const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Header />}
      <main className={isAdminRoute ? "" : "pt-32"} style={isAdminRoute ? {} : { paddingTop: "7rem" }}>
        <Routes>
          {/* Admin Routes - No Header/Footer */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/footer-forms" element={<FooterForms />} />
          <Route path="/admin/contact-forms" element={<ContactForms />} />
          <Route path="/admin/careers" element={<CareerApplications />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          <Route path="/" element={<Home />} />
          
          {/* Product Routes - Each unique */}
          <Route path="/products/training" element={<Training />} />
          <Route path="/products/inference" element={<Inference />} />
          <Route path="/products/fine-tuning" element={<FineTuning />} />
          <Route path="/products/serverless" element={<Serverless />} />
          <Route path="/products/sovereign-cloud" element={<SovereignCloud />} />
          <Route path="/products/glomfjord" element={<Glomfjord />} />
          <Route path="/products/narvik" element={<Narvik />} />
          <Route path="/products/gpu-nodes" element={<GPUNodes />} />
          <Route path="/products/marketplace" element={<Marketplace />} />
          <Route path="/solutions/model-customization" element={<ModelCustomization />} />
          <Route path="/products/*" element={<Products />} />
          
          {/* Solution Routes - Cases */}
          <Route path="/solutions/training" element={<SolutionTraining />} />
          <Route path="/solutions/inference" element={<SolutionInference />} />
          <Route path="/solutions/fine-tuning" element={<SolutionFineTuning />} />
          <Route path="/solutions/deployment" element={<SolutionDeployment />} />
          <Route path="/solutions/value-realization" element={<ValueRealization />} />
          <Route path="/solutions/ai-development" element={<AIDevelopment />} />
          
          {/* Solution Routes - Industry */}
          <Route path="/solutions/industry/telco" element={<Telco />} />
          <Route path="/solutions/industry/software-technology" element={<SoftwareTechnology />} />
          <Route path="/solutions/industry/finance-insurance" element={<FinanceInsurance />} />
          <Route path="/solutions/industry/manufacturing" element={<Manufacturing />} />
          <Route path="/solutions/industry/education" element={<Education />} />
          <Route path="/solutions/industry/government" element={<Government />} />
          <Route path="/solutions/industry/legal" element={<Legal />} />
          <Route path="/solutions/industry/healthcare" element={<Healthcare />} />
          
          {/* Solutions New Page */}
          <Route path="/solutions" element={<SolutionsNew />} />
          
          {/* Solutions Fallback */}
          <Route path="/solutions/*" element={<Solutions />} />
          
          {/* Company Routes */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/joinourteam" element={<JoinOurTeam />} />
          <Route path="/media-kit" element={<MediaKit />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/job/:slug" element={<JobDetail />} />
          <Route path="/research" element={<Research />} />
          <Route path="/Research/FLUX" element={<FLUX />} />
          <Route path="/Research/FLUX-2" element={<FLUX2 />} />
          <Route path="/Research/FLUX-3" element={<FLUX3 />} />
          <Route path="/Research/Blu-Werp" element={<BluWerp />} />
          
          {/* Contact Routes */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/sales" element={<ContactSales />} />
          <Route path="/contact/general-enquiry" element={<GeneralEnquiry />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Documentation />} />
          
          {/* Policy Routes */}
          <Route path="/policies/transparency-and-human-rights" element={<TransparencyHumanRights />} />
          <Route path="/policies/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/policies/terms-conditions" element={<TermsConditions />} />
          
          {/* Catch all */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <Toaster />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
