import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

/* ------------------------------------------------------------------
   BluBridge Editorial Footer — light theme
   Content preserved verbatim: nav labels, headings, form fields,
   privacy statement, copyright, legal links.
   ------------------------------------------------------------------ */

const Footer = () => {
  const location = useLocation();
  const isCareers = location.pathname === '/careers';
  const isContact = location.pathname === '/contact';
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!email) { toast({ title: 'Error', description: 'Please enter your email address', variant: 'destructive' }); return; }
    if (!validateEmail(email)) { toast({ title: 'Error', description: 'Please enter a valid email address', variant: 'destructive' }); return; }
    setLoading(true);
    try {
      await axios.post(`${API}/contacts/submit`, {
        type: 'footer_form',
        email: email.trim().toLowerCase(),
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
        message: message.trim() || undefined
      });
      toast({ title: 'Success!', description: 'Thank you for contacting us. We will get back to you soon.' });
      setEmail(''); setFirstName(''); setLastName(''); setMessage('');
    } catch (error) {
      if (error.response?.status === 409) {
        toast({ title: 'Already Submitted', description: 'You have already submitted this form recently. Please wait a moment.', variant: 'destructive' });
      } else {
        toast({ title: 'Error', description: error.response?.data?.detail || 'Failed to submit', variant: 'destructive' });
      }
    } finally { setLoading(false); }
  };

  const inputStyle = "bg-white border-bb-line text-bb-ink placeholder:text-bb-ink-3 focus-visible:ring-1 focus-visible:ring-bb-accent focus-visible:border-bb-accent rounded-md";

  /* Careers route — compact correspondence-index footer */
  if (isCareers) {
    const careersInput = "bg-transparent border-0 border-b border-[#d4d8e8] rounded-none px-0 h-11 text-[#0a1230] placeholder:text-[#8b93ad] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#0a1230]";
    const indexLabel = { fontFamily: 'IBM Plex Mono, monospace', fontSize: '10.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8b93ad' };
    const indexLink = "text-[14px] text-[#0a1230] hover:text-bb-accent transition-colors";

    return (
      <footer style={{ backgroundColor: '#f0f1f9', color: '#0a1230' }} data-testid="site-footer">
        <div className="bb-container" style={{ paddingTop: '76px', paddingBottom: '36px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-16">
            {/* Correspondence form — upper portion */}
            <div className="lg:col-span-6">
              <h4 style={{ ...indexLabel, color: '#4a5578', marginBottom: '24px' }}>Contact Us</h4>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                  <Input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={careersInput} data-testid="footer-first-name" />
                  <Input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className={careersInput} data-testid="footer-last-name" />
                </div>
                <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className={`${careersInput} mt-3 w-full`} required data-testid="footer-email" />
                <Input type="text" placeholder="Message (optional)" value={message} onChange={(e) => setMessage(e.target.value)} className={`${careersInput} mt-3 w-full`} data-testid="footer-message" />
                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-8 h-11 px-8 text-white hover:bg-[#172449]"
                  style={{ backgroundColor: '#0a1230', borderRadius: '3px', fontFamily: 'Geist, sans-serif', fontSize: '14px', fontWeight: 500 }}
                  data-testid="footer-submit"
                >
                  {loading ? 'Submitting...' : 'Contact Now'}
                </Button>
              </form>
            </div>

            {/* Typographic index — Product / Solutions / Company */}
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-1">
              <div className="flex items-baseline gap-8" style={{ padding: '10px 0' }}>
                <span className="w-24 flex-shrink-0" style={indexLabel}>Product</span>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', color: '#4a5578' }}>Coming Soon</span>
              </div>
              <div className="flex items-baseline gap-8" style={{ padding: '10px 0' }}>
                <span className="w-24 flex-shrink-0" style={indexLabel}>Solutions</span>
                <span className="flex flex-wrap gap-x-6 gap-y-1.5">
                  <Link to="/solutions#model-customization" className={indexLink}>Model Customization</Link>
                  <Link to="/solutions#value-realization" className={indexLink}>Value Realization</Link>
                  <Link to="/solutions#deployment" className={indexLink}>Deployment</Link>
                </span>
              </div>
              <div className="flex items-baseline gap-8" style={{ padding: '10px 0' }}>
                <span className="w-24 flex-shrink-0" style={indexLabel}>Company</span>
                <span className="flex flex-wrap gap-x-6 gap-y-1.5">
                  <Link to="/about-us" className={indexLink}>About Us</Link>
                  <Link to="/careers" className={indexLink}>Careers</Link>
                  <Link to="/contact" className={indexLink}>Contact</Link>
                  <a href="https://www.linkedin.com/company/blubridge/" target="_blank" rel="noopener noreferrer" className={indexLink}>LinkedIn</a>
                  <a href="https://x.com/BlubridgeAI" target="_blank" rel="noopener noreferrer" className={indexLink}>X (Twitter)</a>
                  <a href="https://github.com/BlubridgeAI/" target="_blank" rel="noopener noreferrer" className={indexLink}>GitHub</a>
                </span>
              </div>
            </div>
          </div>

          {/* Brand block */}
          <div className="mt-16">
            <img src="/images/blubridge-logo.svg" alt="BluBridge" style={{ height: '20px', width: 'auto', objectFit: 'contain', marginBottom: '16px' }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12.5px', lineHeight: 1.7, color: '#4a5578', maxWidth: '360px', margin: 0 }}>
              BluBridge is committed to protecting your privacy. We only use your information to provide requested content.
            </p>
          </div>

          {/* Final baseline */}
          <div className="mt-12 pt-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ borderTop: '1px solid #d4d8e8' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12.5px', color: '#4a5578', margin: 0 }}>©2026 BluBridge Technologies Private Limited. All rights reserved</p>
            <div className="flex flex-wrap gap-6">
              <Link to="/policies/privacy-policy" className="text-[13px] text-[#4a5578] hover:text-bb-accent transition-colors">Privacy Policy</Link>
              <Link to="/policies/terms-conditions" className="text-[13px] text-[#4a5578] hover:text-bb-accent transition-colors">Terms Of Use</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      style={{ backgroundColor: isContact ? '#f0f1f9' : '#e8eaf3', color: '#0a1230', borderTop: '1px solid #d4d8e8' }}
      data-testid="site-footer"
    >
      <div className="bb-container" style={{ paddingTop: '72px', paddingBottom: '48px' }}>
        {/* 5-column layout — brand + nav + contact form */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 pb-14 border-b border-bb-line">
          {/* 1 — Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3">
            <img
              src="/images/blubridge-logo.svg"
              alt="BluBridge"
              style={{ height: '22px', width: 'auto', objectFit: 'contain', marginBottom: '20px' }}
            />
            <p className="bb-caption" style={{ maxWidth: '280px', lineHeight: 1.65 }}>
              BluBridge is committed to protecting your privacy. We only use your information to provide requested content.
            </p>
          </div>

          {/* 2 — Product */}
          <div className="lg:col-span-2">
            <h4 className="bb-eyebrow mb-5">Product</h4>
            <ul className="space-y-3">
              <li className="text-bb-ink-2 text-[13.5px] font-mono">Coming Soon</li>
            </ul>
          </div>

          {/* 3 — Solutions */}
          <div className="lg:col-span-2">
            <h4 className="bb-eyebrow mb-5">Solutions</h4>
            <ul className="space-y-3">
              <li><Link to="/solutions#model-customization" className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">Model Customization</Link></li>
              <li><Link to="/solutions#value-realization"   className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">Value Realization</Link></li>
              <li><Link to="/solutions#deployment"          className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">Deployment</Link></li>
            </ul>
          </div>

          {/* 4 — Company */}
          <div className="lg:col-span-2">
            <h4 className="bb-eyebrow mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about-us" className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">About Us</Link></li>
              <li><Link to="/careers"  className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">Careers</Link></li>
              <li><Link to="/contact"  className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">Contact</Link></li>
              <li><a href="https://www.linkedin.com/company/blubridge/" target="_blank" rel="noopener noreferrer" className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">LinkedIn</a></li>
              <li><a href="https://x.com/BlubridgeAI" target="_blank" rel="noopener noreferrer" className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">X (Twitter)</a></li>
              <li><a href="https://github.com/BlubridgeAI/" target="_blank" rel="noopener noreferrer" className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">GitHub</a></li>
            </ul>
          </div>

          {/* 5 — Contact form */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3">
            <h4 className="bb-eyebrow mb-5">Contact Us</h4>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2.5">
              <Input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputStyle}
                data-testid="footer-first-name"
              />
              <Input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputStyle}
                data-testid="footer-last-name"
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputStyle} col-span-2`}
                required
                data-testid="footer-email"
              />
              <Input
                type="text"
                placeholder="Message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputStyle} col-span-2`}
                data-testid="footer-message"
              />
              <Button
                type="submit"
                disabled={loading}
                className="col-span-2 bg-bb-ink hover:bg-[#172449] text-white rounded-md h-10"
                data-testid="footer-submit"
              >
                {loading ? 'Submitting...' : 'Contact Now'}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="bb-caption">©2026 BluBridge Technologies Private Limited. All rights reserved</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/policies/privacy-policy" className="text-[13px] text-bb-ink-2 hover:text-bb-accent transition-colors">Privacy Policy</Link>
            <Link to="/policies/terms-conditions" className="text-[13px] text-bb-ink-2 hover:text-bb-accent transition-colors">Terms Of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
