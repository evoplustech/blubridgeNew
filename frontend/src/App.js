import React from 'react';
// Fine-tuning page updated v2
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import Home from './pages/Home';
import Products from './pages/Products';
import AiConsulting from './pages/AiConsulting';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { getPageAccess } from './routing/pageAccess';

// Company Pages
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import Research from './pages/Research';
import BluWerp from './pages/Research/BluWerp';
import BluTrain from './pages/Research/BluTrain';
import FLUX from './pages/Research/FLUX';
import FLUXData from './pages/Research/FLUXData';
import FLUX3 from './pages/Research/FLUX3';
import FLUX4 from './pages/Research/FLUX4';

import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';

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
import GetInTouchForms from './pages/admin/GetInTouchForms';
import CareerApplications from './pages/admin/CareerApplications';
import AdminSettings from './pages/admin/AdminSettings';

// Main App Layout Component
const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isHome = location.pathname === '/';
  const pageAccess = getPageAccess(location.pathname);

  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      {!isAdminRoute && <Header />}
      <main className={isAdminRoute ? "" : isHome ? "bb-main-home" : "pt-32"} style={isAdminRoute || isHome ? {} : { paddingTop: "7rem" }}>
        {pageAccess === 'not-found' ? <NotFound /> : <Routes>
          {/* Admin Routes - No Header/Footer */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/footer-forms" element={<FooterForms />} />
          <Route path="/admin/contact-forms" element={<ContactForms />} />
          <Route path="/admin/get-in-touch" element={<GetInTouchForms />} />
          <Route path="/admin/project-enquiries" element={<Navigate to="/admin/get-in-touch" replace />} />
          <Route path="/admin/careers" element={<CareerApplications />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          <Route path="/" element={<Home />} />
          
          {/* Only the approved Products and Solutions overview pages are public. */}
          <Route path="/products" element={<Products />} />
          <Route path="/solutions" element={<SolutionsNew />} />
          
          {/* Company Routes */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/joinourteam" element={<JoinOurTeam />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/job/:slug" element={<JobDetail />} />
          <Route path="/research" element={<Research />} />
          <Route path="/Research/FLUX" element={<FLUX />} />
          <Route path="/Research/FLUX-Data" element={<FLUXData />} />
          <Route path="/Research/FLUX-3" element={<FLUX3 />} />
          <Route path="/Research/FLUX-4" element={<FLUX4 />} />
          <Route path="/Research/Blu-Werp" element={<BluWerp />} />
          <Route path="/Research/BluTrain" element={<BluTrain />} />
          
          {/* Contact Routes */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/consulting" element={<AiConsulting />} />
          <Route path="/ai-consulting" element={<Navigate to={`/consulting${location.search}${location.hash}`} replace />} />
          
          {/* Policy Routes */}
          <Route path="/policies/transparency-and-human-rights" element={<TransparencyHumanRights />} />
          <Route path="/policies/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/policies/terms-conditions" element={<TermsConditions />} />
          
          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>}
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
