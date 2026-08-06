import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

/* ------------------------------------------------------------------
   BluBridge Footer — global compact correspondence index
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

  const boxInput = "bg-white border border-[#d4d8e8] rounded-[6px] h-11 px-4 text-[#0a1230] placeholder:text-[#8b93ad] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#0a1230]";
  const colLabel = { fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8b93ad', margin: 0 };
  const colLink = "block text-[15px] text-[#0a1230] hover:text-bb-accent transition-colors";

  return (
    <footer style={{ backgroundColor: '#e8eaf3', color: '#0a1230' }} data-testid="site-footer">
      <div className="bb-container" style={{ paddingTop: '72px', paddingBottom: '36px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-10">

          {/* Contact form + brand column */}
          <div className="lg:col-span-5">
            <h4 style={{ ...colLabel, color: '#6a7390', marginBottom: '22px' }}>Contact Us</h4>
            <form onSubmit={handleSubmit} style={{ maxWidth: '486px' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={boxInput} data-testid="footer-first-name" />
                <Input type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className={boxInput} data-testid="footer-last-name" />
              </div>
              <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className={`${boxInput} mt-3 w-full`} required data-testid="footer-email" />
              <Input type="text" placeholder="Message (optional)" value={message} onChange={(e) => setMessage(e.target.value)} className={`${boxInput} mt-3 w-full`} data-testid="footer-message" />
              <Button
                type="submit"
                disabled={loading}
                className="mt-4 h-12 w-full text-white hover:bg-[#172449]"
                style={{ backgroundColor: '#0a1230', borderRadius: '6px', fontFamily: 'Geist, sans-serif', fontSize: '14.5px', fontWeight: 600 }}
                data-testid="footer-submit"
              >
                {loading ? 'Submitting...' : 'Contact Now'}
              </Button>
            </form>

            <div style={{ marginTop: '48px' }}>
              <img src="/images/blubridge-logo.svg" alt="BluBridge" style={{ height: '22px', width: 'auto', objectFit: 'contain', marginBottom: '18px' }} />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', lineHeight: 1.7, color: '#3f4966', maxWidth: '300px', margin: 0 }}>
                BluBridge is committed to protecting your privacy. We only use your information to provide requested content.
              </p>
            </div>
          </div>

          {/* Product */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 style={colLabel}>Product</h4>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#0a1230', margin: '26px 0 0' }}>Coming Soon</p>
          </div>

          {/* Solutions */}
          <div className="lg:col-span-3">
            <h4 style={colLabel}>Solutions</h4>
            <div className="space-y-4" style={{ marginTop: '26px' }}>
              <Link to="/solutions#model-customization" className={colLink}>Model Customization</Link>
              <Link to="/solutions#value-realization" className={colLink}>Value Realization</Link>
              <Link to="/solutions#deployment" className={colLink}>Deployment</Link>
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 style={colLabel}>Company</h4>
            <div className="space-y-4" style={{ marginTop: '26px' }}>
              <Link to="/about-us" className={colLink}>About Us</Link>
              <Link to="/careers" className={colLink}>Careers</Link>
              <Link to="/contact" className={colLink}>Contact</Link>
              <a href="https://www.linkedin.com/company/blubridge/" target="_blank" rel="noopener noreferrer" className={colLink}>LinkedIn</a>
              <a href="https://x.com/BlubridgeAI" target="_blank" rel="noopener noreferrer" className={colLink}>X (Twitter)</a>
              <a href="https://github.com/BlubridgeAI/" target="_blank" rel="noopener noreferrer" className={colLink}>GitHub</a>
            </div>
          </div>
        </div>

        {/* Final baseline */}
        <div className="mt-14 pt-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ borderTop: '1px solid #d4d8e8' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#3f4966', margin: 0 }}>©2026 BluBridge Technologies Private Limited. All rights reserved</p>
          <div className="flex flex-wrap gap-8">
            <Link to="/policies/privacy-policy" className="text-[13.5px] text-[#0a1230] hover:text-bb-accent transition-colors">Privacy Policy</Link>
            <Link to="/policies/terms-conditions" className="text-[13.5px] text-[#0a1230] hover:text-bb-accent transition-colors">Terms Of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
