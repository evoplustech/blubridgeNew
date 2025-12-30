import React, { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const GeneralEnquiry = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    companyName: '',
    message: '',
    agreeTerms: false,
    agreeMarketing: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contacts/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'general_enquiry',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.workEmail,
          company: formData.companyName,
          message: formData.message
        })
      });
      if (response.ok) {
        alert('Thank you for your enquiry. We will get back to you shortly.');
        setFormData({ firstName: '', lastName: '', workEmail: '', companyName: '', message: '', agreeTerms: false, agreeMarketing: false });
      } else {
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useDocumentTitle('General Enquiry | BluBridge');

  return (
    <div className="min-h-screen bg-[#f3f6e8]">      {/* Main Content Section */}
      <section className="pt-16 pb-24">
        <div className="container-custom">
          {/* Page Title */}
          <h1 className="text-5xl font-light text-[#0B1F3B] mb-16">General Enquiry</h1>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Column - Helper CTAs */}
            <div className="lg:col-span-4">
              <div className="space-y-10">
                {/* Sales CTA */}
                <div className="flex gap-4">
                  <div className="w-1 bg-blue-500 rounded-full flex-shrink-0" />
                  <div>
                    <h3 className="text-[#0B1F3B] text-lg font-medium mb-3">Want a new service or product?</h3>
                    <Link to="/contact">
                      <button className="inline-flex items-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-full border border-white/30 hover:border-white/60 hover:bg-[#f3f1e9] transition-all group">
                        Contact
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
                {/* Technical Support CTA */}
                {/* <div className="flex gap-4">
                  <div className="w-1 bg-blue-500 rounded-full flex-shrink-0" />
                  <div>
                    <h3 className="text-[#0B1F3B] text-lg font-medium mb-3">Technical issue or question?</h3>
                    <Link to="/contact/support">
                      <button className="inline-flex items-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-full border border-white/30 hover:border-white/60 hover:bg-[#f3f1e9] transition-all group">
                        Contact Support
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div> */}
                {/* Investment CTA */}
                {/* <div className="flex gap-4">
                  <div className="w-1 bg-blue-500 rounded-full flex-shrink-0" />
                  <div>
                    <h3 className="text-[#0B1F3B] text-lg font-medium mb-3">Interested in investment?</h3>
                    <Link to="/contact/investors">
                      <button className="inline-flex items-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-full border border-white/30 hover:border-white/60 hover:bg-[#f3f1e9] transition-all group">
                        Contact IR Team
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm text-[#0B1F3B] mb-2">
                    First Name<span className="text-[#0B1F3B]">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white border border-[#D6DEC3] rounded-md px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="Enter your first name..."
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm text-[#0B1F3B] mb-2">
                    Last name<span className="text-[#0B1F3B]">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white border border-[#D6DEC3] rounded-md px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder=""
                  />
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-sm text-[#0B1F3B] mb-2">
                    Work Email<span className="text-[#0B1F3B]">*</span>
                  </label>
                  <input
                    type="email"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white border border-[#D6DEC3] rounded-md px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="name@example.com"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm text-[#0B1F3B] mb-2">
                    Company name<span className="text-[#0B1F3B]">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white border border-[#D6DEC3] rounded-md px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder=""
                  />
                </div>

                {/* How can we help you today? */}
                <div>
                  <label className="block text-sm text-[#0B1F3B] mb-2">
                    How can we help you today?
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full bg-white border border-[#D6DEC3] rounded-md px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    placeholder=""
                  />
                </div>

                {/* Privacy Notice */}
                <div className="text-[#2F3A4A] text-xs leading-relaxed">
                  BluBridge is committed to protecting and respecting your privacy, and we'll only use your personal information to administer your account and to provide the products and services you requested from us. From time to time, we would like to contact you about our products and services, as well as other content that may be of interest to you. If you consent to us contacting you for this purpose, please tick the box below to say how you would like us to contact you:
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 rounded border-[#D6DEC3] bg-white text-blue-500 focus:ring-blue-500 focus:ring-offset-0 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-[#2F3A4A] text-sm">
                      I have read and agree to the <Link to="/terms" className="text-white underline hover:text-[#328CC1]">Terms and Conditions</Link> and <Link to="/privacy" className="text-white underline hover:text-[#328CC1]">Privacy Policy</Link>.*
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="agreeMarketing"
                      checked={formData.agreeMarketing}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-[#D6DEC3] bg-white text-blue-500 focus:ring-blue-500 focus:ring-offset-0 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-[#2F3A4A] text-sm">
                      I agree to receive marketing communications from BluBridge. You can unsubscribe at any time.
                    </span>
                  </label>
                </div>

                {/* Consent Notice */}
                <div className="text-[#6B7280] text-xs">
                  By clicking submit below, you consent to allow BluBridge to store and process the personal information submitted above to provide you the content requested.
                </div>

                {/* reCAPTCHA */}
                <div className="inline-flex items-center bg-[#222222] rounded overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-[#1a5fb4]">
                    <span className="text-[#0B1F3B] text-xs font-medium">protected by reCAPTCHA</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-[#222222]">
                    <span className="text-[#2F3A4A] text-[10px]">Privacy - Terms</span>
                    <svg viewBox="0 0 64 64" className="w-6 h-6">
                      <path fill="#1c3aa9" d="M32 0C14.4 0 0 14.4 0 32s14.4 32 32 32 32-14.4 32-32S49.6 0 32 0z"/>
                      <path fill="#4285f4" d="M32 6.4c14.1 0 25.6 11.5 25.6 25.6S46.1 57.6 32 57.6 6.4 46.1 6.4 32 17.9 6.4 32 6.4z"/>
                      <path fill="#fff" d="M32 19.2c-7.1 0-12.8 5.7-12.8 12.8s5.7 12.8 12.8 12.8 12.8-5.7 12.8-12.8-5.7-12.8-12.8-12.8zm0 19.2c-3.5 0-6.4-2.9-6.4-6.4s2.9-6.4 6.4-6.4 6.4 2.9 6.4 6.4-2.9 6.4-6.4 6.4z"/>
                    </svg>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-transparent hover:bg-[#f3f1e9] text-white px-10 py-3 text-sm font-medium rounded-full border border-[#0B1F3B] hover:border-white/60 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Promotional Section */}
            <section className="py-20 bg-[#f3f6e8]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B] mb-6 leading-tight">
                Get access to a fully integrated suite of AI services and compute
              </h2>
              <p className="text-[#2F3A4A] text-base leading-relaxed">
                Reduce costs, grow revenue, and run your AI workloads more efficiently on a fully integrated platform. Whether you're using <span className="text-[#328CC1]">BluBridge's</span> built-in AI/ML tools or your own, our platform is designed to simplify the journey from development to production.
              </p>
            </div>

            {/* Right Column - Services Grid with Infrastructure Diagram */}
            <div className="relative">
              {/* Services Icons Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Serverless */}
                <div className="bg-white border border-[#D6DEC3] rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#328CC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <span className="text-[#0B1F3B] text-xs font-medium">Serverless</span>
                </div>

                {/* Marketplace */}
                <div className="bg-white border border-[#D6DEC3] rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#328CC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="text-[#0B1F3B] text-xs font-medium">Marketplace</span>
                </div>

                {/* Inference */}
                <div className="bg-white border border-[#D6DEC3] rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#328CC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-[#0B1F3B] text-xs font-medium">Inference</span>
                </div>

                {/* Training */}
                <div className="bg-white border border-[#D6DEC3] rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#328CC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="text-[#0B1F3B] text-xs font-medium">Training</span>
                </div>

                {/* GPU Nodes */}
                <div className="bg-white border border-[#D6DEC3] rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#328CC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <span className="text-[#0B1F3B] text-xs font-medium">GPU nodes</span>
                </div>

                {/* LLM Library */}
                <div className="bg-white border border-[#D6DEC3] rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#328CC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-[#0B1F3B] text-xs font-medium">LLM Library</span>
                </div>
              </div>

              {/* Data Center Card */}
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#328CC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3B] font-medium text-sm">BluBridge's Data centers</h4>
                    <p className="text-[#2F3A4A] text-xs">Powered by renewable energy</p>
                  </div>
                </div>
              </div>

              {/* Feature List */}
              <div className="mt-6 space-y-2">
                {[
                  'Pre-configured Software',
                  'Pre-configured Infrastructure',
                  'Job Management',
                  'Job Scheduling',
                  'Container Orchestration',
                  'Optimised Libraries',
                  'Optimised Compilers and Tools',
                  'Optimised Runtime'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-[#2F3A4A] text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="py-24 border-t border-[#D6DEC3]">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B] mb-6 leading-tight">
              Get access to a fully integrated suite of AI services and compute
            </h2>
            <p className="text-[#2F3A4A] text-base leading-relaxed">
              Reduce costs, grow revenue, and run your AI workloads more efficiently on a fully integrated platform. Whether you're using BluBridge's built-in AI/ML tools or your own, our platform is designed to simplify the journey from development to production.
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default GeneralEnquiry;
