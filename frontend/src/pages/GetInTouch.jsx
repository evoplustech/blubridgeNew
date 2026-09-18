import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Wrench, Handshake, Users, ChevronRight } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';
const API_URL = process.env.REACT_APP_BACKEND_URL;

/* ------------------------------------------------------------------
   GET IN TOUCH — editorial two-column enquiry page (light theme #f0f1f9)
   Reuses BluBridge design system: cx-* form/card styles, same inputs,
   labels, verify-email pattern, navy submit. Fresh composition.
   ------------------------------------------------------------------ */

const countryCodes = [
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+7', flag: '🇷🇺', name: 'Russia' },
  { code: '+20', flag: '🇪🇬', name: 'Egypt' },
  { code: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: '+30', flag: '🇬🇷', name: 'Greece' },
  { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { code: '+32', flag: '🇧🇪', name: 'Belgium' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: '+36', flag: '🇭🇺', name: 'Hungary' },
  { code: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: '+40', flag: '🇷🇴', name: 'Romania' },
  { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
  { code: '+43', flag: '🇦🇹', name: 'Austria' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+45', flag: '🇩🇰', name: 'Denmark' },
  { code: '+46', flag: '🇸🇪', name: 'Sweden' },
  { code: '+47', flag: '🇳🇴', name: 'Norway' },
  { code: '+48', flag: '🇵🇱', name: 'Poland' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+82', flag: '🇰🇷', name: 'South Korea' },
  { code: '+84', flag: '🇻🇳', name: 'Vietnam' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
  { code: '+90', flag: '🇹🇷', name: 'Turkey' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: '+353', flag: '🇮🇪', name: 'Ireland' },
  { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+972', flag: '🇮🇱', name: 'Israel' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
];

const enquiryTypes = [
  'Software Development',
  'AI & Automation',
  'Web Application Development',
  'Mobile Application Development',
  'Cloud & Infrastructure',
  'Digital Transformation',
  'Product Development',
  'Technical Support',
  'Partnership',
  'Careers',
  'Other',
];

const helpCards = [
  {
    label: 'NEW PROJECTS',
    title: 'Business Enquiries',
    description: 'Discuss a software, AI, digital transformation or technology requirement with our team.',
    cta: 'Start a conversation',
    href: '#git-form',
    Icon: Briefcase,
    testId: 'git-card-business',
  },
  {
    label: 'SUPPORT',
    title: 'Technical Support',
    description: 'Need assistance with an existing BluBridge solution, platform or service?',
    cta: 'Contact support',
    href: 'mailto:info@blubridge.com',
    Icon: Wrench,
    testId: 'git-card-support',
  },
  {
    label: 'COLLABORATE',
    title: 'Partnerships',
    description: 'Connect with BluBridge regarding technology, integration, business or strategic partnerships.',
    cta: 'Explore partnerships',
    href: '/partners',
    Icon: Handshake,
    testId: 'git-card-partnerships',
  },
  {
    label: 'JOIN US',
    title: 'Careers',
    description: 'Interested in building technology with BluBridge? Explore opportunities to work with our team.',
    cta: 'View opportunities',
    href: '/careers',
    Icon: Users,
    testId: 'git-card-careers',
  },
];

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    phoneCode: '+91', phoneNumber: '',
    company: '', role: '', enquiryType: '', message: '',
    marketingConsent: false,
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useDocumentTitle('Get in Touch | BluBridge');
  useMetaDescription('Connect with BluBridge for software development, AI, automation, digital transformation, technical support, partnerships and technology solutions.');

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePhone = (p) => /^[0-9]{6,15}$/.test(p.replace(/\s/g, ''));

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (validationErrors[name]) setValidationErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFormData(prev => ({ ...prev, phoneNumber: value }));
    if (validationErrors.phoneNumber) setValidationErrors(prev => ({ ...prev, phoneNumber: '' }));
  };

  const handleVerifyEmail = () => {
    if (formData.email && validateEmail(formData.email)) {
      setEmailVerified(true);
      setValidationErrors(prev => ({ ...prev, email: '' }));
    } else {
      setValidationErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Work email is required';
    else if (!validateEmail(formData.email.trim())) errors.email = 'Please enter a valid email address';
    if (formData.phoneNumber.trim() && !validatePhone(formData.phoneNumber)) errors.phoneNumber = 'Please enter a valid phone number (6-15 digits)';
    if (!formData.company.trim()) errors.company = 'Company / Organization is required';
    if (!formData.enquiryType) errors.enquiryType = 'Please select an enquiry type';
    if (!formData.message.trim()) errors.message = 'Please tell us about your requirement';
    else if (formData.message.trim().length > 1500) errors.message = 'Message must be 1500 characters or fewer';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError('');
    setSubmitSuccess(false);
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/contact-enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phoneNumber.trim() ? `${formData.phoneCode} ${formData.phoneNumber}` : '',
          company: formData.company.trim(),
          role: formData.role.trim(),
          enquiryType: formData.enquiryType,
          message: formData.message.trim(),
          marketingConsent: formData.marketingConsent,
        }),
      });
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          firstName: '', lastName: '', email: '',
          phoneCode: '+91', phoneNumber: '',
          company: '', role: '', enquiryType: '', message: '',
          marketingConsent: false,
        });
        setEmailVerified(false);
        setValidationErrors({});
      } else if (response.status === 409) {
        setSubmitError('You have already submitted an enquiry recently. Please wait a moment before trying again.');
      } else {
        setSubmitError('Something went wrong while sending your enquiry. Please try again.');
      }
    } catch {
      setSubmitError('Something went wrong while sending your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelStyle = {
    display: 'block',
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: '10.5px',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#3f4966',
    marginBottom: '8px',
  };
  const inputBase = {
    width: '100%',
    padding: '11px 14px',
    border: '1px solid #d4d8e8',
    borderRadius: '3px',
    background: '#ffffff',
    fontSize: '15px',
    fontFamily: 'Inter, sans-serif',
    color: '#0a1230',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 180ms ease, background 180ms ease',
  };
  const errBorder = { border: '1px solid #dc2626' };
  const errText = { color: '#dc2626', fontSize: '12px', margin: '6px 0 0', fontFamily: 'Inter, sans-serif' };
  const req = <span style={{ color: '#dc2626', marginLeft: 4 }}>*</span>;
  const focusBlur = (name) => ({
    onFocus: (e) => { e.target.style.borderColor = '#0a1230'; },
    onBlur: (e) => { e.target.style.borderColor = validationErrors[name] ? '#dc2626' : '#d4d8e8'; },
  });

  return (
    <div style={{ background: '#f0f1f9' }} data-testid="get-in-touch-page">

      {/* ===== HERO ===== */}
      <section style={{ paddingTop: '64px', paddingBottom: '0' }}>
        <div className="bb-container">
          <span className="git-eyebrow" data-testid="git-eyebrow">GET IN TOUCH</span>
          <h1 data-testid="git-heading" className="cx-title" style={{ marginTop: '18px' }}>Let&rsquo;s build what&rsquo;s next.</h1>
          <span className="cx-dash" aria-hidden="true"></span>
          <p className="git-lede" data-testid="git-lede">
            Have a project, partnership, technology requirement or business idea in mind? Connect with BluBridge and tell us how we can help.
          </p>
        </div>
      </section>

      {/* ===== MAIN — two columns ===== */}
      <section style={{ paddingTop: '56px', paddingBottom: '112px', overflow: 'hidden' }}>
        <div className="bb-container">
          <div className="git-grid">

            {/* Left rail — help cards */}
            <div>
              <p className="git-label" data-testid="git-help-label">HOW CAN WE HELP?</p>
              <div className="git-cards" data-testid="git-help-cards">
                {helpCards.map((c) => (
                  c.href.startsWith('#') ? (
                    <a
                      key={c.testId}
                      href={c.href}
                      data-testid={c.testId}
                      className="git-card"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('git-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <span className="git-card-icon" aria-hidden="true"><c.Icon strokeWidth={1.6} /></span>
                      <span className="git-card-body">
                        <span className="cx-channel-label">{c.label}</span>
                        <span className="git-card-title">{c.title}</span>
                        <span className="git-card-desc">{c.description}</span>
                        <span className="git-card-cta">{c.cta} <span className="git-card-arrow" aria-hidden="true">→</span></span>
                      </span>
                      <ChevronRight className="cx-channel-chev" aria-hidden="true" strokeWidth={1.8} />
                    </a>
                  ) : c.href.startsWith('mailto') ? (
                    <a key={c.testId} href={c.href} data-testid={c.testId} className="git-card">
                      <span className="git-card-icon" aria-hidden="true"><c.Icon strokeWidth={1.6} /></span>
                      <span className="git-card-body">
                        <span className="cx-channel-label">{c.label}</span>
                        <span className="git-card-title">{c.title}</span>
                        <span className="git-card-desc">{c.description}</span>
                        <span className="git-card-cta">{c.cta} <span className="git-card-arrow" aria-hidden="true">→</span></span>
                      </span>
                      <ChevronRight className="cx-channel-chev" aria-hidden="true" strokeWidth={1.8} />
                    </a>
                  ) : (
                    <Link key={c.testId} to={c.href} data-testid={c.testId} className="git-card">
                      <span className="git-card-icon" aria-hidden="true"><c.Icon strokeWidth={1.6} /></span>
                      <span className="git-card-body">
                        <span className="cx-channel-label">{c.label}</span>
                        <span className="git-card-title">{c.title}</span>
                        <span className="git-card-desc">{c.description}</span>
                        <span className="git-card-cta">{c.cta} <span className="git-card-arrow" aria-hidden="true">→</span></span>
                      </span>
                      <ChevronRight className="cx-channel-chev" aria-hidden="true" strokeWidth={1.8} />
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Right — form card over navy accent */}
            <div className="cx-right" id="git-form" style={{ scrollMarginTop: '130px' }}>
              <span className="cx-blob" aria-hidden="true"></span>
              <form onSubmit={handleSubmit} data-testid="git-form-card" className="cx-card" noValidate>
                <h2 className="git-form-title" data-testid="git-form-heading">TELL US ABOUT YOUR REQUIREMENT</h2>
                <p className="git-form-sub">Share a few details and we&rsquo;ll connect you with the appropriate BluBridge team.</p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-5 gap-y-5">

                  {/* Row 1: First / Last */}
                  <div className="lg:col-span-6">
                    <label style={labelStyle}>First Name{req}</label>
                    <input
                      type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                      data-testid="git-input-first-name"
                      style={{ ...inputBase, ...(validationErrors.firstName ? errBorder : {}) }} {...focusBlur('firstName')}
                    />
                    {validationErrors.firstName && <p style={errText} data-testid="git-error-first-name">{validationErrors.firstName}</p>}
                  </div>
                  <div className="lg:col-span-6">
                    <label style={labelStyle}>Last Name{req}</label>
                    <input
                      type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                      data-testid="git-input-last-name"
                      style={{ ...inputBase, ...(validationErrors.lastName ? errBorder : {}) }} {...focusBlur('lastName')}
                    />
                    {validationErrors.lastName && <p style={errText} data-testid="git-error-last-name">{validationErrors.lastName}</p>}
                  </div>

                  {/* Row 2: Email + Verify */}
                  <div className="lg:col-span-9">
                    <label style={labelStyle}>Work Email{req}</label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleInputChange}
                      data-testid="git-input-email"
                      style={{ ...inputBase, ...(validationErrors.email ? errBorder : {}) }} {...focusBlur('email')}
                    />
                    {validationErrors.email && <p style={errText} data-testid="git-error-email">{validationErrors.email}</p>}
                  </div>
                  <div className="lg:col-span-3 flex flex-col">
                    <label style={{ ...labelStyle, visibility: 'hidden' }}>Verify</label>
                    <button
                      type="button"
                      onClick={handleVerifyEmail}
                      data-testid="git-verify-email"
                      style={{
                        width: '100%',
                        padding: '11px 12px',
                        fontSize: '11px',
                        fontFamily: 'IBM Plex Mono, monospace',
                        letterSpacing: '0.1em',
                        cursor: 'pointer',
                        background: emailVerified ? '#0a5231' : '#ffffff',
                        color: emailVerified ? '#ffffff' : '#0a1230',
                        border: '1px solid ' + (emailVerified ? '#0a5231' : '#c4cbe0'),
                        borderRadius: '6px',
                        textTransform: 'uppercase',
                        boxSizing: 'border-box',
                        transition: 'background 180ms ease, border-color 180ms ease',
                      }}
                    >
                      {emailVerified ? 'Verified ✓' : 'Verify Email'}
                    </button>
                  </div>

                  {/* Row 3: Phone / Company */}
                  <div className="lg:col-span-6">
                    <label style={labelStyle}>Phone Number</label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'stretch',
                        background: '#ffffff',
                        border: validationErrors.phoneNumber ? '1px solid #dc2626' : '1px solid #d4d8e8',
                        borderRadius: '6px',
                        overflow: 'hidden',
                      }}
                    >
                      <select
                        name="phoneCode"
                        value={formData.phoneCode}
                        onChange={handleInputChange}
                        data-testid="git-select-phone-code"
                        style={{
                          padding: '11px 10px 11px 12px',
                          background: 'transparent',
                          border: 'none',
                          borderRight: '1px solid #d4d8e8',
                          fontSize: '15px',
                          fontFamily: 'Inter, sans-serif',
                          color: '#0a1230',
                          outline: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {countryCodes.map((c, i) => (
                          <option key={`${c.code}-${i}`} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="Enter phone number"
                        maxLength={15}
                        data-testid="git-input-phone"
                        style={{
                          flex: 1,
                          padding: '11px 12px',
                          background: 'transparent',
                          border: 'none',
                          fontSize: '15px',
                          outline: 'none',
                          fontFamily: 'Inter, sans-serif',
                          color: '#0a1230',
                          minWidth: 0,
                        }}
                      />
                    </div>
                    {validationErrors.phoneNumber && <p style={errText} data-testid="git-error-phone">{validationErrors.phoneNumber}</p>}
                  </div>
                  <div className="lg:col-span-6">
                    <label style={labelStyle}>Company / Organization{req}</label>
                    <input
                      type="text" name="company" value={formData.company} onChange={handleInputChange}
                      data-testid="git-input-company"
                      style={{ ...inputBase, ...(validationErrors.company ? errBorder : {}) }} {...focusBlur('company')}
                    />
                    {validationErrors.company && <p style={errText} data-testid="git-error-company">{validationErrors.company}</p>}
                  </div>

                  {/* Row 4: Role / Enquiry Type */}
                  <div className="lg:col-span-6">
                    <label style={labelStyle}>Job Role / Designation</label>
                    <input
                      type="text" name="role" value={formData.role} onChange={handleInputChange}
                      data-testid="git-input-role"
                      style={{ ...inputBase }} {...focusBlur('role')}
                    />
                  </div>
                  <div className="lg:col-span-6">
                    <label style={labelStyle}>Enquiry Type{req}</label>
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleInputChange}
                      data-testid="git-select-enquiry-type"
                      style={{
                        ...inputBase,
                        cursor: 'pointer',
                        color: formData.enquiryType ? '#0a1230' : '#7c86a2',
                        ...(validationErrors.enquiryType ? errBorder : {}),
                      }}
                      {...focusBlur('enquiryType')}
                    >
                      <option value="" disabled>Select</option>
                      {enquiryTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {validationErrors.enquiryType && <p style={errText} data-testid="git-error-enquiry-type">{validationErrors.enquiryType}</p>}
                  </div>

                  {/* Row 5: Message + counter */}
                  <div className="lg:col-span-12">
                    <label style={labelStyle}>Project / Requirement Details{req}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      maxLength={1500}
                      placeholder="Tell us about your objectives, requirements, timeline, challenges or anything else that will help us understand your project."
                      data-testid="git-input-message"
                      style={{
                        ...inputBase,
                        padding: '12px 14px',
                        resize: 'vertical',
                        minHeight: '150px',
                        lineHeight: 1.6,
                        ...(validationErrors.message ? errBorder : {}),
                      }}
                      {...focusBlur('message')}
                    />
                    <div className="git-counter" data-testid="git-char-counter">{formData.message.length} / 1500</div>
                    {validationErrors.message && <p style={errText} data-testid="git-error-message">{validationErrors.message}</p>}
                  </div>

                  {/* Consent */}
                  <div className="lg:col-span-12">
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        name="marketingConsent"
                        checked={formData.marketingConsent}
                        onChange={handleInputChange}
                        data-testid="git-checkbox-consent"
                        style={{ marginTop: '3px', accentColor: '#0a1230', width: '15px', height: '15px', flexShrink: 0, cursor: 'pointer' }}
                      />
                      <span style={{ color: '#3f4966', fontFamily: 'Inter, sans-serif', fontSize: '13.5px', lineHeight: 1.55 }}>
                        I&rsquo;d like to receive occasional updates about BluBridge products, services and company news.
                      </span>
                    </label>
                    <p style={{ color: '#7c86a2', fontFamily: 'Inter, sans-serif', fontSize: '12.5px', lineHeight: 1.6, margin: '14px 0 0' }}>
                      By submitting this form, you agree that BluBridge may use the information provided to respond to your enquiry in accordance with our{' '}
                      <Link to="/policies/privacy-policy" data-testid="git-privacy-link" style={{ color: '#0a1230', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                        Privacy Policy
                      </Link>.
                    </p>
                  </div>

                  {submitSuccess && (
                    <div className="lg:col-span-12">
                      <p className="git-success" data-testid="git-success-message">
                        Thank you for contacting BluBridge. Your enquiry has been received and our team will get back to you shortly.
                      </p>
                    </div>
                  )}
                  {submitError && (
                    <div className="lg:col-span-12">
                      <p style={{ color: '#dc2626', fontSize: '13px', margin: 0, fontFamily: 'Inter, sans-serif' }} data-testid="git-submit-error">{submitError}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <div className="lg:col-span-12" style={{ marginTop: '4px' }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      data-testid="git-submit"
                      className="cx-submit"
                      style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
                    >
                      {isSubmitting ? 'Sending…' : 'Send Enquiry'}
                      <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInTouch;
