import React from 'react';
// Fine-tuning page updated v2
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import Home from './pages/Home';
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

// Solution Pages - Cases
import SolutionTraining from './pages/solutions/Training';
import SolutionInference from './pages/solutions/Inference';
import SolutionFineTuning from './pages/solutions/FineTuning';
import AIDevelopment from './pages/solutions/AIDevelopment';

// Company Pages
import AboutUs from './pages/AboutUs';
import MediaKit from './pages/MediaKit';
import Careers from './pages/Careers';

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
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop />
        <Header />
        <main className="pt-32" style={{ paddingTop: "7rem" }}>
          <Routes>
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
            <Route path="/products/*" element={<Products />} />
            
            {/* Solution Routes - Cases */}
            <Route path="/solutions/training" element={<SolutionTraining />} />
            <Route path="/solutions/inference" element={<SolutionInference />} />
            <Route path="/solutions/fine-tuning" element={<SolutionFineTuning />} />
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
            
            {/* Solutions Fallback */}
            <Route path="/solutions/*" element={<Solutions />} />
            
            {/* Company Routes */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/media-kit" element={<MediaKit />} />
            <Route path="/careers" element={<Careers />} />
            
            {/* Other Routes */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/docs" element={<Documentation />} />
            
            {/* Catch all */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;