import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Footer = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter your email address',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/contacts/submit`, {
        type: 'contact_us',
        email,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        message: message || undefined
      });
      toast({
        title: 'Success!',
        description: 'Thank you for contacting us. We will get back to you soon.'
      });
      setEmail('');
      setFirstName('');
      setLastName('');
      setMessage('');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to submit',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#f3f1e9] text-[#0B1F3B] border-t border-[#D6DEC3]">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#0B1F3B]">PRODUCT</h3>
            <ul className="space-y-3">
              <li><Link to="/products/gpu-nodes" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">GPU Nodes</Link></li>
              <li><Link to="/products/fine-tuning" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">Fine-tuning</Link></li>
              <li><Link to="/products/marketplace" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">Marketplace</Link></li>
              <li><Link to="/products/inference" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">Inference Service</Link></li>
              <li><Link to="/products/training" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">Training Clusters</Link></li>
              <li><Link to="/products/serverless" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">Serverless</Link></li>
              <li><Link to="/products/glomfjord" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">Glomfjord</Link></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#0B1F3B]">SOLUTIONS</h3>
            <ul className="space-y-3">
              <li><Link to="/solutions/training" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">Model Training</Link></li>
              <li><Link to="/solutions/fine-tuning" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">Model Fine-Tuning</Link></li>
              <li><Link to="/solutions/inference" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">AI & ML Inference</Link></li>
              <li><Link to="/solutions/ai-development" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">AI Development</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#0B1F3B]">COMPANY</h3>
            <ul className="space-y-3">
              <li><Link to="/company/about" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">About</Link></li>
             
              <li><Link to="/company/careers" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">Careers</Link></li>
              <li><Link to="/contact" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">Contact</Link></li>
              <li><a href="https://www.linkedin.com/company/blubridge/" target="_blank" rel="noopener noreferrer" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">LinkedIn</a></li>
              <li><a href="https://x.com/BlubridgeAI" target="_blank" rel="noopener noreferrer" className="text-[#243447] hover:text-[#328CC1] transition-colors text-sm">X (Twitter)</a></li>
            </ul>
          </div>

          {/* Contact Us Form */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4 text-[#0B1F3B]">CONTACT US</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-white border-[#D6DEC3] text-[#0B1F3B] placeholder:text-[#7C8A96] focus:border-[#328CC1]"
              />
              <Input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-white border-[#D6DEC3] text-[#0B1F3B] placeholder:text-[#7C8A96] focus:border-[#328CC1]"
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-[#D6DEC3] text-[#0B1F3B] placeholder:text-[#7C8A96] focus:border-[#328CC1]"
                required
              />
              <Input
                type="text"
                placeholder="Message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white border-[#D6DEC3] text-[#0B1F3B] placeholder:text-[#7C8A96] focus:border-[#328CC1]"
              />
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0B1F3B] hover:bg-[#162B4D] text-white"
              >
                {loading ? 'Submitting...' : 'Contact Now'}
              </Button>
              <p className="text-xs text-[#5B6B7A]">
                BluBridge is committed to protecting your privacy. We'll only use your information to provide requested content.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#D6DEC3]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <img src="https://blubridge-fixes.preview.emergentagent.com/images/blubridge-wordmark.png" alt="BluBridge" className="object-contain" />
            </div>
            <p className="text-[#5B6B7A] text-sm">©2026 BluBridge Technologies Private Limited. All rights reserved</p>
            <div className="flex space-x-6 text-sm">
              <Link to="policies/transparency-and-human-rights" className="text-[#243447] hover:text-[#328CC1] transition-colors">Transparency & Human Rights</Link>
              <Link to="/policies/privacy-policy" className="text-[#243447] hover:text-[#328CC1] transition-colors">Privacy Policy</Link>
              <Link to="/policies/terms-conditions" className="text-[#243447] hover:text-[#328CC1] transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;