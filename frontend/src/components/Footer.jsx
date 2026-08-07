import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const inputCls = 'bg-white border-bb-line text-bb-ink placeholder:text-bb-ink-3 focus-visible:ring-1 focus-visible:ring-bb-accent focus-visible:border-bb-accent rounded-md h-9';

const Footer = () => {
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

  return (
    <footer data-testid="site-footer" style={{ backgroundColor: '#eceefa', color: '#0a1230', borderTop: '1px solid #d4d8e8' }}>
      <div className="bb-container" style={{ paddingTop: '72px', paddingBottom: '40px' }}>
        <div className="bb-footer-grid">

          {/* Logo */}
          <div className="bb-footer-col bb-footer-logo">
            <img alt="BluBridge" src="/images/blubridge-logo.svg" style={{ height: '24px', width: 'auto', objectFit: 'contain', display: 'block' }} />
          </div>

          {/* Product */}
          <div className="bb-footer-col">
            <h4 className="bb-eyebrow mb-5" style={{ minHeight: '18px' }}>Product</h4>
            <ul className="space-y-3">
              <li className="text-bb-ink-2 text-[13.5px] font-mono">Coming Soon</li>
            </ul>
          </div>

          {/* Pages */}
          <div className="bb-footer-col">
            <h4 className="bb-eyebrow mb-5" style={{ minHeight: '18px' }}>Pages</h4>
            <ul className="space-y-3" data-testid="footer-pages-list">
              <li><Link className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors" to="/">Home</Link></li>
              <li><Link className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors" to="/solutions">Solutions</Link></li>
              <li><Link className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors" to="/about-us">About Us</Link></li>
              <li><Link className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors" to="/careers">Careers</Link></li>
              <li><Link className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors" to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="bb-footer-col">
            <h4 className="bb-eyebrow mb-5" style={{ minHeight: '18px' }}>Connect</h4>
            <ul className="space-y-3" data-testid="footer-connect-list">
              <li><a href="https://www.linkedin.com/company/blubridge/" target="_blank" rel="noopener noreferrer" className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">LinkedIn</a></li>
              <li><a href="https://x.com/BlubridgeAI" target="_blank" rel="noopener noreferrer" className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">X (Twitter)</a></li>
              <li><a href="https://github.com/BlubridgeAI/" target="_blank" rel="noopener noreferrer" className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">GitHub</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="bb-footer-col bb-footer-contact">
            <h4 className="bb-eyebrow mb-5" style={{ minHeight: '18px' }}>Contact Us</h4>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-3" onSubmit={handleSubmit}>
              <Input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} data-testid="footer-first-name" />
              <Input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} data-testid="footer-last-name" />
              <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputCls} sm:col-span-2`} required data-testid="footer-email" />
              <Input type="text" placeholder="Message (optional)" value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputCls} sm:col-span-2`} data-testid="footer-message" />
              <Button type="submit" disabled={loading} className="sm:col-span-2 bg-bb-ink hover:bg-[#172449] text-white rounded-md h-11" data-testid="footer-submit">
                {loading ? 'Submitting...' : 'Contact Now'}
              </Button>
            </form>
            <p className="mt-4" data-testid="footer-privacy-statement" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11.5px', lineHeight: 1.6, color: '#6b7593', margin: '16px 0 0' }}>
              BluBridge is committed to protecting your privacy. We only use your information to provide requested content.
            </p>
          </div>
        </div>

        {/* Baseline */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ marginTop: '48px', paddingTop: '20px', borderTop: '1px solid #d4d8e8' }}>
          <p className="bb-caption" style={{ margin: 0 }}>©2026 BluBridge Technologies Private Limited. All rights reserved</p>
          <div className="flex flex-wrap gap-6">
            <Link className="text-[13px] text-bb-ink-2 hover:text-bb-accent transition-colors" to="/policies/privacy-policy">Privacy Policy</Link>
            <Link className="text-[13px] text-bb-ink-2 hover:text-bb-accent transition-colors" to="/policies/terms-conditions">Terms Of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
