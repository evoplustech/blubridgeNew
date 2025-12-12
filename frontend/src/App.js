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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="pt-32">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/*" element={<Products />} />
            <Route path="/solutions/*" element={<Solutions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/company/blog" element={<Blog />} />
            <Route path="/pricing" element={<Pricing />} />
            {/* Catch all other routes to Home */}
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