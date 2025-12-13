import React from 'react';
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
import About from './pages/About';
import Documentation from './pages/Documentation';
import Partners from './pages/Partners';

// Product Pages
import Training from './pages/products/Training';
import Inference from './pages/products/Inference';
import FineTuning from './pages/products/FineTuning';
import Serverless from './pages/products/Serverless';
import SovereignCloud from './pages/products/SovereignCloud';
import Narvik from './pages/products/Narvik';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
            <Route path="/products/narvik" element={<Narvik />} />
            <Route path="/products/*" element={<Products />} />
            
            {/* Solutions Routes */}
            <Route path="/solutions/*" element={<Solutions />} />
            
            {/* Company Routes */}
            <Route path="/company/about" element={<About />} />
            <Route path="/company/blog" element={<Blog />} />
            
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