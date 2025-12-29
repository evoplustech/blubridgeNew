import React, { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

const Sales = () => {
  const [selectedPurpose, setSelectedPurpose] = useState('pricing');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: '',
    jobTitle: '',
    useCase: '',
    gpuType: '',
    gpuCount: '',
    projectStart: '',
    heardAbout: '',
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
          type: 'contact_sales',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          country: formData.country,
          jobTitle: formData.jobTitle,
          purpose: selectedPurpose,
          useCase: formData.useCase,
          gpuType: formData.gpuType,
          expectedGpuCount: formData.gpuCount,
          projectStartTimeline: formData.projectStart,
          heardAbout: formData.heardAbout,
          message: formData.message
        })
      });
      if (response.ok) {
        alert('Thank you for your inquiry. Our sales team will contact you shortly.');
        setFormData({ firstName: '', lastName: '', email: '', company: '', country: '', jobTitle: '', useCase: '', gpuType: '', gpuCount: '', projectStart: '', heardAbout: '', message: '', agreeTerms: false, agreeMarketing: false });
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

  const purposes = [
    { id: 'pricing', label: 'Hear about our pricing' },
    { id: 'products', label: 'Learn about our products' },
    { id: 'solution', label: 'Find a solution' }
  ];

  useDocumentTitle('Contact Sales | BluBrg');

  return (
    <div className="min-h-screen bg-[#F3F6E8]">      {/* Main Contact Section */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left Column - Purpose Selector */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                {/* What is this for? */}
                <div className="mb-12">
                  <h3 className="text-xl font-semibold text-white mb-6">What is this for?</h3>
                  <div className="space-y-4">
                    {purposes.map((purpose) => (
                      <label
                        key={purpose.id}
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setSelectedPurpose(purpose.id)}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all bg-blue-500 border-blue-500`}>
                        {/* <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedPurpose === purpose.id 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-500 group-hover:border-blue-400'
                        }`}> */}
                          {/* {selectedPurpose === purpose.id && ( */}
                            <Check className="w-3 h-3 text-white" />
                          {/* )} */}
                        </div>
                        <span className="text-white text-sm">{purpose.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Technical Support Link */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-3">General question?</h4>
                  <Link to="/contact/general-enquiry">
                    <button className="flex items-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-lg border border-[#D6DEC3] hover:border-blue-500/50 hover:bg-white/5 transition-all group">
                      Contact General
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                {/* Investment Link */}
                {/* <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Interested in Investment?</h4>
                  <Link to="/contact/investors">
                    <button className="flex items-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-lg border border-[#D6DEC3] hover:border-blue-500/50 hover:bg-white/5 transition-all group">
                      Contact IR Team
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div> */}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-8">
              <h1 className="text-4xl font-light text-white mb-10">Contact Sales</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-white mb-2">
                      First Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-[#D6DEC3] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white mb-2">
                      Last Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-[#D6DEC3] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Email & Company Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-white mb-2">
                      Business Email<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-[#D6DEC3] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter your business email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white mb-2">
                      Company Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-[#D6DEC3] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                {/* Country & Job Title Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-white mb-2">
                      Country<span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-[#D6DEC3] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                    >
                      <option value="">Please Select</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                      <option value="SG">Singapore</option>
                      <option value="AU">Australia</option>
                      <option value="CA">Canada</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white mb-2">
                      Job Title<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-[#D6DEC3] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter your job title"
                    />
                  </div>
                </div>

                {/* Use Case & GPU Type Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-white mb-2">
                      Use Case<span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      name="useCase"
                      value={formData.useCase}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-[#D6DEC3] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                    >
                      <option value="">Please Select</option>
                      <option value="training">Model Training</option>
                      <option value="inference">AI Inference</option>
                      <option value="fine-tuning">Model Fine-Tuning</option>
                      <option value="development">AI Development</option>
                      <option value="research">Research</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white mb-2">
                      GPU Type<span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      name="gpuType"
                      value={formData.gpuType}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-[#D6DEC3] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                    >
                      <option value="">Please Select</option>
                      <option value="h100">NVIDIA H100</option>
                      <option value="h200">NVIDIA H200</option>
                      <option value="gb200">NVIDIA GB200 NVL72</option>
                      <option value="a100">NVIDIA A100</option>
                      <option value="mixed">Mixed / Flexible</option>
                      <option value="unsure">Not Sure Yet</option>
                    </select>
                  </div>
                </div>

                {/* GPU Count & Project Start Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-white mb-2">
                      Expected number of GPUs<span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      name="gpuCount"
                      value={formData.gpuCount}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-[#D6DEC3] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                    >
                      <option value="">Please Select</option>
                      <option value="1-8">1 - 8 GPUs</option>
                      <option value="9-32">9 - 32 GPUs</option>
                      <option value="33-128">33 - 128 GPUs</option>
                      <option value="129-512">129 - 512 GPUs</option>
                      <option value="513+">513+ GPUs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white mb-2">
                      When does your project start?<span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      name="projectStart"
                      value={formData.projectStart}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-[#D6DEC3] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                    >
                      <option value="">Please Select</option>
                      <option value="immediately">Immediately</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="1-3-months">1 - 3 months</option>
                      <option value="3-6-months">3 - 6 months</option>
                      <option value="6+-months">6+ months</option>
                    </select>
                  </div>
                </div>

                {/* How did you hear about us */}
                <div>
                  <label className="block text-sm text-white mb-2">
                    How did you hear about us?<span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="heardAbout"
                    value={formData.heardAbout}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white border border-[#D6DEC3] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                  >
                    <option value="">Please Select</option>
                    <option value="search">Search Engine</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="event">Event / Conference</option>
                    <option value="news">News Article</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-white mb-2">
                    Tell us more about your needs
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-white border border-[#D6DEC3] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Describe your AI compute requirements, project timeline, and any specific needs..."
                  />
                </div>
                {/* Privacy Notice */}
                <div className="text-[#243447] text-xs leading-relaxed">
                  BluBrg is committed to protecting and respecting your privacy, and we'll only use your personal information to administer your account and to provide the products and services you requested from us. From time to time, we would like to contact you about our products and services, as well as other content that may be of interest to you. If you consent to us contacting you for this purpose, please tick the box below to say how you would like us to contact you:
                </div>
                {/* Legal Checkboxes */}
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      required
                      className="w-5 h-5 rounded border-[#D6DEC3] bg-white text-blue-500 focus:ring-blue-500 focus:ring-offset-0 mt-0.5"
                    />
                    <span className="text-[#243447] text-sm">
                      I agree to the <Link to="/terms" className="text-blue-400 hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="agreeMarketing"
                      checked={formData.agreeMarketing}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-[#D6DEC3] bg-white text-blue-500 focus:ring-blue-500 focus:ring-offset-0 mt-0.5"
                    />
                    <span className="text-[#243447] text-sm">
                      I agree to receive marketing communications from BluBrg
                    </span>
                  </label>
                </div>

                {/* reCAPTCHA placeholder */}
                {/* <div className="bg-white border border-[#D6DEC3] rounded-lg p-4 w-fit">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 border-2 border-gray-500 rounded flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-500 opacity-0" />
                    </div>
                    <span className="text-[#243447] text-sm">I'm not a robot</span>
                    <div className="ml-4">
                      <div className="text-[10px] text-[#5B6B7A]">reCAPTCHA</div>
                      <div className="text-[8px] text-[#7C8A96]">Privacy - Terms</div>
                    </div>
                  </div>
                </div> */}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-base font-medium rounded-lg w-full md:w-auto"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Get Access Section */}
      <section className="py-20 bg-[#EEF2DC]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6 leading-tight">
                Get access to a fully integrated suite of AI services and compute
              </h2>
              <p className="text-[#243447] text-base leading-relaxed">
                Reduce costs, grow revenue, and run your AI workloads more efficiently on a fully integrated platform. Whether you're using <span className="text-blue-400">BluBrg's</span> built-in AI/ML tools or your own, our platform is designed to simplify the journey from development to production.
              </p>
            </div>

            {/* Right Column - Services Grid with Infrastructure Diagram */}
            <div className="relative">
              {/* Services Icons Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Serverless */}
                <div className="bg-white border border-[#D6DEC3] rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">Serverless</span>
                </div>

                {/* Marketplace */}
                <div className="bg-white border border-[#D6DEC3] rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">Marketplace</span>
                </div>

                {/* Inference */}
                <div className="bg-white border border-[#D6DEC3] rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">Inference</span>
                </div>

                {/* Training */}
                <div className="bg-white border border-[#D6DEC3] rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">Training</span>
                </div>

                {/* GPU Nodes */}
                <div className="bg-white border border-[#D6DEC3] rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">GPU nodes</span>
                </div>

                {/* LLM Library */}
                <div className="bg-white border border-[#D6DEC3] rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">LLM Library</span>
                </div>
              </div>

              {/* Data Center Card */}
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">BluBrg's Data centers</h4>
                    <p className="text-[#243447] text-xs">Powered by renewable energy</p>
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
                    <span className="text-[#243447] text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sales;
