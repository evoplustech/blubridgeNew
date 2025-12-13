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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !firstName || !lastName) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/newsletter/subscribe`, {
        email,
        firstName,
        lastName
      });
      toast({
        title: 'Success!',
        description: 'You have been subscribed to our newsletter'
      });
      setEmail('');
      setFirstName('');
      setLastName('');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to subscribe',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0A1F3D] text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">PRODUCT</h3>
            <ul className="space-y-3">
              <li><Link to="/products/gpu-nodes" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">GPU Nodes</Link></li>
              <li><Link to="/products/fine-tuning" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">Fine-tuning</Link></li>
              <li><Link to="/products/marketplace" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">Marketplace</Link></li>
              <li><Link to="/products/inference" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">Inference Service</Link></li>
              <li><Link to="/products/training" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">Training Clusters</Link></li>
              <li><Link to="/products/serverless" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">Serverless</Link></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">SOLUTIONS</h3>
            <ul className="space-y-3">
              <li><Link to="/solutions/training" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">Model Training</Link></li>
              <li><Link to="/solutions/fine-tuning" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">Model Fine-Tuning</Link></li>
              <li><Link to="/solutions/inference" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">AI & ML Inference</Link></li>
              <li><Link to="/solutions/ai-development" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">AI Development</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">COMPANY</h3>
            <ul className="space-y-3">
              <li><Link to="/company/about" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">About</Link></li>
              <li><Link to="/company/blog" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">Blog</Link></li>
              <li><Link to="/company/newsroom" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">Newsroom</Link></li>
              <li><Link to="/company/media-kit" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">Media Kit</Link></li>
              <li><Link to="/company/careers" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">Careers</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">Contact</Link></li>
              <li><a href="https://www.linkedin.com/company/blubrg" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">LinkedIn</a></li>
              <li><a href="https://twitter.com/blubrg" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#0066FF] transition-colors text-sm">X (Twitter)</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4">NEWSLETTER SIGNUP</h3>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <Input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
              <p className="text-xs text-white/50">
                BluBrg is committed to protecting your privacy. We'll only use your information to provide requested content.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">BLUBRG</span>
            </div>
            <p className="text-white/50 text-sm">©2025 BluBrg Technologies Private Limited. All rights reserved</p>
            <div className="flex space-x-6 text-sm">
              <Link to="/policies/privacy" className="text-white/70 hover:text-[#0066FF] transition-colors">Privacy Policy</Link>
              <Link to="/policies/terms" className="text-white/70 hover:text-[#0066FF] transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;