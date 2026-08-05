import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <footer
      style={{ backgroundColor: '#e8eaf3', color: '#0a1230', borderTop: '1px solid #d4d8e8' }}
      data-testid="site-footer"
    >
      <div className="bb-container" style={{ paddingTop: '72px', paddingBottom: '48px' }}>
        {/* Top: contact form */}
        <div className="pb-16 border-b border-bb-line">
          <h3 className="bb-eyebrow mb-5">Contact Us</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                className={`${inputStyle} sm:col-span-2`}
                required
                data-testid="footer-email"
              />
              <Input
                type="text"
                placeholder="Message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputStyle} sm:col-span-2`}
                data-testid="footer-message"
              />
              <Button
                type="submit"
                disabled={loading}
                className="sm:col-span-2 bg-bb-ink hover:bg-[#172449] text-white rounded-md h-11"
                data-testid="footer-submit"
              >
                {loading ? 'Submitting...' : 'Contact Now'}
              </Button>
            </form>
        </div>

        {/* Middle: 4-column layout — brand + nav */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-bb-line">
          <div className="col-span-2 md:col-span-1">
            <img
              src="/images/blubridge-logo.svg"
              alt="BluBridge"
              style={{ height: '22px', width: 'auto', objectFit: 'contain', marginBottom: '20px' }}
            />
            <p className="bb-caption" style={{ maxWidth: '300px', lineHeight: 1.65 }}>
              BluBridge is committed to protecting your privacy. We only use your information to provide requested content.
            </p>
          </div>
          <div>
            <h4 className="bb-eyebrow mb-5">Product</h4>
            <ul className="space-y-3">
              <li className="text-bb-ink-2 text-[13.5px] font-mono">Coming Soon</li>
            </ul>
          </div>
          <div>
            <h4 className="bb-eyebrow mb-5">Solutions</h4>
            <ul className="space-y-3">
              <li><Link to="/solutions#model-customization" className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">Model Customization</Link></li>
              <li><Link to="/solutions#value-realization"   className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">Value Realization</Link></li>
              <li><Link to="/solutions#deployment"          className="text-[14px] text-bb-ink hover:text-bb-accent transition-colors">Deployment</Link></li>
            </ul>
          </div>
          <div>
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
