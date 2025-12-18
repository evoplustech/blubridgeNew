import React, { useState } from 'react';
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your enquiry. We will get back to you shortly.');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Main Content Section */}
      <section className="pt-16 pb-24">
        <div className="container-custom">
          {/* Page Title */}
          <h1 className="text-5xl font-light text-white mb-16">General Enquiry</h1>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Column - Helper CTAs */}
            <div className="lg:col-span-4">
              <div className="space-y-10">
                {/* Technical Support CTA */}
                <div className="flex gap-4">
                  <div className="w-1 bg-blue-500 rounded-full flex-shrink-0" />
                  <div>
                    <h3 className="text-white text-lg font-medium mb-3">Technical issue or question?</h3>
                    <Link to="/contact/support">
                      <button className="inline-flex items-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-full border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all group">
                        Contact Support
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Sales CTA */}
                <div className="flex gap-4">
                  <div className="w-1 bg-blue-500 rounded-full flex-shrink-0" />
                  <div>
                    <h3 className="text-white text-lg font-medium mb-3">Want a new service or product?</h3>
                    <Link to="/contact/sales">
                      <button className="inline-flex items-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-full border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all group">
                        Contact Sales
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Investment CTA */}
                <div className="flex gap-4">
                  <div className="w-1 bg-blue-500 rounded-full flex-shrink-0" />
                  <div>
                    <h3 className="text-white text-lg font-medium mb-3">Interested in investment?</h3>
                    <Link to="/contact/investors">
                      <button className="inline-flex items-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-full border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all group">
                        Contact IR Team
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm text-white mb-2">
                    First Name<span className="text-white">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#141418] border border-white/10 rounded-md px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="Enter your first name..."
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm text-white mb-2">
                    Last name<span className="text-white">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#141418] border border-white/10 rounded-md px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder=""
                  />
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-sm text-white mb-2">
                    Work Email<span className="text-white">*</span>
                  </label>
                  <input
                    type="email"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#141418] border border-white/10 rounded-md px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder="name@example.com"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm text-white mb-2">
                    Company name<span className="text-white">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#141418] border border-white/10 rounded-md px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    placeholder=""
                  />
                </div>

                {/* How can we help you today? */}
                <div>
                  <label className="block text-sm text-white mb-2">
                    How can we help you today?
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full bg-[#141418] border border-white/10 rounded-md px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    placeholder=""
                  />
                </div>

                {/* Privacy Notice */}
                <div className="text-gray-400 text-xs leading-relaxed">
                  BluBrg is committed to protecting and respecting your privacy, and we'll only use your personal information to administer your account and to provide the products and services you requested from us. From time to time, we would like to contact you about our products and services, as well as other content that may be of interest to you. If you consent to us contacting you for this purpose, please tick the box below to say how you would like us to contact you:
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
                      className="w-4 h-4 rounded border-white/20 bg-[#141418] text-blue-500 focus:ring-blue-500 focus:ring-offset-0 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-300 text-sm">
                      I have read and agree to the <Link to="/terms" className="text-white underline hover:text-blue-400">Terms and Conditions</Link> and <Link to="/privacy" className="text-white underline hover:text-blue-400">Privacy Policy</Link>.*
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="agreeMarketing"
                      checked={formData.agreeMarketing}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-white/20 bg-[#141418] text-blue-500 focus:ring-blue-500 focus:ring-offset-0 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-300 text-sm">
                      I agree to receive marketing communications from BluBrg. You can unsubscribe at any time.
                    </span>
                  </label>
                </div>

                {/* Consent Notice */}
                <div className="text-gray-500 text-xs">
                  By clicking submit below, you consent to allow BluBrg to store and process the personal information submitted above to provide you the content requested.
                </div>

                {/* reCAPTCHA */}
                <div className="inline-flex items-center bg-[#222222] rounded overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-[#1a5fb4]">
                    <span className="text-white text-xs font-medium">protected by reCAPTCHA</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-[#222222]">
                    <span className="text-gray-400 text-[10px]">Privacy - Terms</span>
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
                    className="bg-transparent hover:bg-white/10 text-white px-10 py-3 text-sm font-medium rounded-full border border-white/40 hover:border-white/60 transition-colors"
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
      <section className="py-24 border-t border-white/5">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 leading-tight">
              Get access to a fully integrated suite of AI services and compute
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Reduce costs, grow revenue, and run your AI workloads more efficiently on a fully integrated platform. Whether you're using BluBrg's built-in AI/ML tools or your own, our platform is designed to simplify the journey from development to production.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GeneralEnquiry;
