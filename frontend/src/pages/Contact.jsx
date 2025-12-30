import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+91',
    phoneNumber: '',
    inquiryType: '',
    message: ''
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useDocumentTitle('Contact | BluBridge');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVerifyEmail = () => {
    if (formData.email && formData.email.includes('@')) {
      setEmailVerified(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your inquiry. We will get back to you soon!');
      setIsSubmitting(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneCode: '+91',
        phoneNumber: '',
        inquiryType: '',
        message: ''
      });
      setEmailVerified(false);
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen pt-24 pb-16"
      style={{
        backgroundColor: '#F3F6E8',
        backgroundImage: `
          linear-gradient(rgba(214, 222, 195, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(214, 222, 195, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Left Column - Our Offices */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-[#E8EDD8]">
            <h2 className="text-3xl font-bold text-[#0B1F3B] mb-8 text-center" >
              Our Offices
            </h2>
            
            {/* Office Card 1 */}
            <div className="border border-[#D6DEC3] rounded-xl p-6 mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-[#0B1F3B] text-lg mb-2">
                    BluBridge Technologies (P) Ltd.
                  </h3>
                  <p className="text-[#2F3A4A] text-sm leading-relaxed">
                    Plot #E160 Tiger Varadhachari Road,<br />
                    Kalakshetra Colony, Besant Nagar,<br />
                    Chennai – 600090
                  </p>
                </div>
                <div className="flex flex-col items-center ml-4">
                  <MapPin className="w-6 h-6 text-[#0B1F3B] mb-2" />
                  <a 
                    href="https://maps.google.com/?q=Plot+E160+Tiger+Varadhachari+Road+Kalakshetra+Colony+Besant+Nagar+Chennai+600090"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#328CC1] text-sm hover:underline whitespace-nowrap"
                  >
                    View on Map »
                  </a>
                </div>
              </div>
            </div>

            {/* Office Card 2 */}
            <div className="border border-[#D6DEC3] rounded-xl p-6 mb-8">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-[#0B1F3B] text-lg mb-2">
                    BluBridge Technologies (P) Ltd.
                  </h3>
                  <p className="text-[#2F3A4A] text-sm leading-relaxed">
                    30, Norton Rd, Mandavelipakkam,<br />
                    Raja Annamalai Puram,<br />
                    Chennai, Tamil Nadu 600028
                  </p>
                </div>
                <div className="flex flex-col items-center ml-4">
                  <MapPin className="w-6 h-6 text-[#0B1F3B] mb-2" />
                  <a 
                    href="https://maps.google.com/?q=30+Norton+Rd+Mandavelipakkam+Raja+Annamalai+Puram+Chennai+600028"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#328CC1] text-sm hover:underline whitespace-nowrap"
                  >
                    View on Map »
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-[#0B1F3B] text-base">Phone:</h4>
                <a href="tel:+918925987250" className="text-[#2F3A4A] text-sm hover:text-[#328CC1]">
                  +91 8925987250
                </a>
              </div>
              <div>
                <h4 className="font-bold text-[#0B1F3B] text-base">Email:</h4>
                <a href="mailto:info.1@blubridge.com" className="text-[#2F3A4A] text-sm hover:text-[#328CC1]">
                  Info.1@blubridge.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Us Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-[#E8EDD8]">
            <h2 className="text-3xl font-bold text-[#0B1F3B] mb-8 text-center" >
              Contact Us
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#0B1F3B] text-sm font-medium mb-2">
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#D6DEC3] rounded-lg bg-white focus:outline-none focus:border-[#328CC1] focus:ring-1 focus:ring-[#328CC1] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#0B1F3B] text-sm font-medium mb-2">
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#D6DEC3] rounded-lg bg-white focus:outline-none focus:border-[#328CC1] focus:ring-1 focus:ring-[#328CC1] transition-colors"
                  />
                </div>
              </div>

              {/* Email with Verify Button */}
              <div>
                <label className="block text-[#0B1F3B] text-sm font-medium mb-2">
                  Email<span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="flex-1 px-4 py-3 border border-[#D6DEC3] rounded-lg bg-white focus:outline-none focus:border-[#328CC1] focus:ring-1 focus:ring-[#328CC1] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    className={`px-6 py-3 rounded-full font-medium text-sm transition-colors ${
                      emailVerified 
                        ? 'bg-green-600 text-white' 
                        : 'bg-white text-[#0B1F3B] border border-[#0B1F3B] hover:bg-[#f3f1e9]'
                    }`}
                  >
                    {emailVerified ? 'Verified ✓' : 'Verify Email'}
                  </button>
                </div>
              </div>

              {/* Phone Number & Inquiry Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#0B1F3B] text-sm font-medium mb-2">
                    Phone No<span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 border-[#D6DEC3] rounded-l-lg bg-[#F9FAF5]">
                      <span className="text-lg mr-1">🇮🇳</span>
                      <select
                        name="phoneCode"
                        value={formData.phoneCode}
                        onChange={handleInputChange}
                        className="bg-transparent text-sm text-[#0B1F3B] focus:outline-none py-3"
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+61">+61</option>
                        <option value="+49">+49</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="flex-1 px-4 py-3 border border-[#D6DEC3] rounded-r-lg bg-white focus:outline-none focus:border-[#328CC1] focus:ring-1 focus:ring-[#328CC1] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#0B1F3B] text-sm font-medium mb-2">
                    Inquiry Type<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#D6DEC3] rounded-lg bg-white focus:outline-none focus:border-[#328CC1] focus:ring-1 focus:ring-[#328CC1] transition-colors text-[#2F3A4A]"
                  >
                    <option value="">Select</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="careers">Careers</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[#0B1F3B] text-sm font-medium mb-2">
                  How can we help you?<span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-[#D6DEC3] rounded-lg bg-white focus:outline-none focus:border-[#328CC1] focus:ring-1 focus:ring-[#328CC1] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-3 bg-[#0B1F3B] text-white font-medium rounded-lg hover:bg-[#162B4D] transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
