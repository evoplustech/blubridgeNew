import React, { useState } from 'react';
import { Mail, Handshake, Settings } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useDocumentTitle('Contact | Design Sprint');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${API_URL}/api/contacts/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact_us',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          enquiryCategory: formData.subject,
          message: formData.message
        }),
      });

      if (response.ok) {
        alert('Thank you for your message. We will get back to you soon!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.detail || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: Mail,
      title: 'General Inquiries',
      email: 'contact@designsprint.ai',
      testId: 'general-inquiries-card'
    },
    {
      icon: Handshake,
      title: 'Partnership Opportunities',
      email: 'partners@designsprint.ai',
      testId: 'partnership-card'
    },
    {
      icon: Settings,
      title: 'Technical Support',
      email: 'support@designsprint.ai',
      testId: 'technical-support-card'
    }
  ];

  return (
    <div 
      data-testid="contact-page"
      className="min-h-screen"
      style={{
        backgroundColor: '#0a0a0a',
        paddingTop: '120px',
        paddingBottom: '80px'
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 
            data-testid="contact-hero-title"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: '#ffffff' }}
          >
            Let's Build the Future Together
          </h1>
          <p 
            data-testid="contact-hero-subtitle"
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: '#9ca3af' }}
          >
            Ready to transform your business with AI? Connect with our team of experts.
          </p>
        </div>

        {/* Contact Cards */}
        <div 
          data-testid="contact-cards-section"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {contactCards.map((card, index) => (
            <div
              key={index}
              data-testid={card.testId}
              className="rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: '#141414',
                border: '1px solid #2a2a2a'
              }}
            >
              <div 
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#1f1f1f' }}
              >
                <card.icon size={28} color="#ffffff" strokeWidth={1.5} />
              </div>
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ color: '#ffffff' }}
              >
                {card.title}
              </h3>
              <a 
                href={`mailto:${card.email}`}
                className="text-base transition-colors duration-200 hover:underline"
                style={{ color: '#9ca3af' }}
              >
                {card.email}
              </a>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div 
          data-testid="contact-form-section"
          className="rounded-2xl p-8 md:p-12"
          style={{
            backgroundColor: '#141414',
            border: '1px solid #2a2a2a'
          }}
        >
          <h2 
            data-testid="form-title"
            className="text-2xl md:text-3xl font-bold mb-8 text-center"
            style={{ color: '#ffffff' }}
          >
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            {/* First Row - First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#9ca3af' }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  data-testid="first-name-input"
                  className="w-full px-4 py-3 rounded-lg text-base outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-600"
                  style={{
                    backgroundColor: '#1f1f1f',
                    border: '1px solid #2a2a2a',
                    color: '#ffffff'
                  }}
                  placeholder="John"
                />
              </div>
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#9ca3af' }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  data-testid="last-name-input"
                  className="w-full px-4 py-3 rounded-lg text-base outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-600"
                  style={{
                    backgroundColor: '#1f1f1f',
                    border: '1px solid #2a2a2a',
                    color: '#ffffff'
                  }}
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Second Row - Email & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#9ca3af' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  data-testid="email-input"
                  className="w-full px-4 py-3 rounded-lg text-base outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-600"
                  style={{
                    backgroundColor: '#1f1f1f',
                    border: '1px solid #2a2a2a',
                    color: '#ffffff'
                  }}
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#9ca3af' }}
                >
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  data-testid="company-input"
                  className="w-full px-4 py-3 rounded-lg text-base outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-600"
                  style={{
                    backgroundColor: '#1f1f1f',
                    border: '1px solid #2a2a2a',
                    color: '#ffffff'
                  }}
                  placeholder="Acme Inc."
                />
              </div>
            </div>

            {/* Subject Dropdown */}
            <div className="mb-6">
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: '#9ca3af' }}
              >
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                data-testid="subject-select"
                className="w-full px-4 py-3 rounded-lg text-base outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-600 cursor-pointer"
                style={{
                  backgroundColor: '#1f1f1f',
                  border: '1px solid #2a2a2a',
                  color: formData.subject ? '#ffffff' : '#6b7280'
                }}
              >
                <option value="" disabled>Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="partnership">Partnership Opportunity</option>
                <option value="technical">Technical Support</option>
                <option value="sales">Sales Inquiry</option>
                <option value="careers">Careers</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message Textarea */}
            <div className="mb-8">
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: '#9ca3af' }}
              >
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                data-testid="message-textarea"
                className="w-full px-4 py-3 rounded-lg text-base outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-600 resize-none"
                style={{
                  backgroundColor: '#1f1f1f',
                  border: '1px solid #2a2a2a',
                  color: '#ffffff'
                }}
                placeholder="Tell us about your project or inquiry..."
              />
            </div>

            {/* Error Message */}
            {submitError && (
              <div 
                className="mb-6 p-4 rounded-lg text-center"
                style={{ backgroundColor: '#7f1d1d', color: '#fca5a5' }}
              >
                {submitError}
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="submit-button"
                className="px-12 py-4 rounded-lg text-base font-semibold transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#0a0a0a',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
