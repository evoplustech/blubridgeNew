import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    interest: 'general'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast({
        title: 'Success!',
        description: 'We have received your message and will contact you shortly.'
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        interest: 'general'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to send message',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#0A1F3D] via-[#0D2847] to-[#0A1F3D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0066FF] rounded-full filter blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-white mb-6">
              Get in touch
            </h1>
            <p className="text-xl text-white/80">
              Have questions about our AI infrastructure? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2 text-sm font-medium">First Name *</label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 text-sm font-medium">Last Name *</label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white mb-2 text-sm font-medium">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2 text-sm font-medium">Company</label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 text-sm font-medium">Phone</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white mb-2 text-sm font-medium">Area of Interest</label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="training">Training Clusters</option>
                      <option value="inference">Inference Solutions</option>
                      <option value="serverless">Serverless AI</option>
                      <option value="private-cloud">Private Cloud</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2 text-sm font-medium">Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white py-6 text-lg font-semibold"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <p className="text-white/70">sales@blubrg.com</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Sales</h3>
                <p className="text-white/70">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Support</h3>
                <p className="text-white/70">support@blubrg.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;