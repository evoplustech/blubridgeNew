import React, { useState } from 'react';
import { Phone, Mail, Linkedin, Building2, ChevronRight } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';
const API_URL = process.env.REACT_APP_BACKEND_URL;

/* ------------------------------------------------------------------
   CONTACT — Editorial Redesign (light theme #f0f1f9)
   All existing content preserved: office cards (INDIA / INDIA / USA),
   phone, email, LinkedIn, form fields (First/Last/Email/Verify/
   Phone Code+Number/Inquiry Type/Message), inquiry options,
   submit button, error/success behavior, backend endpoint.
   ------------------------------------------------------------------ */

const countryCodes = [
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
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
  { code: '+51', flag: '🇵🇪', name: 'Peru' },
  { code: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: '+53', flag: '🇨🇺', name: 'Cuba' },
  { code: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+63', flag: '🇵🇭', name: 'Philippines' },
  { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+66', flag: '🇹🇭', name: 'Thailand' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+82', flag: '🇰🇷', name: 'South Korea' },
  { code: '+84', flag: '🇻🇳', name: 'Vietnam' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
  { code: '+90', flag: '🇹🇷', name: 'Turkey' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+93', flag: '🇦🇫', name: 'Afghanistan' },
  { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+95', flag: '🇲🇲', name: 'Myanmar' },
  { code: '+98', flag: '🇮🇷', name: 'Iran' },
  { code: '+212', flag: '🇲🇦', name: 'Morocco' },
  { code: '+213', flag: '🇩🇿', name: 'Algeria' },
  { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
  { code: '+218', flag: '🇱🇾', name: 'Libya' },
  { code: '+220', flag: '🇬🇲', name: 'Gambia' },
  { code: '+221', flag: '🇸🇳', name: 'Senegal' },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
  { code: '+256', flag: '🇺🇬', name: 'Uganda' },
  { code: '+260', flag: '🇿🇲', name: 'Zambia' },
  { code: '+263', flag: '🇿🇼', name: 'Zimbabwe' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: '+352', flag: '🇱🇺', name: 'Luxembourg' },
  { code: '+353', flag: '🇮🇪', name: 'Ireland' },
  { code: '+354', flag: '🇮🇸', name: 'Iceland' },
  { code: '+358', flag: '🇫🇮', name: 'Finland' },
  { code: '+370', flag: '🇱🇹', name: 'Lithuania' },
  { code: '+371', flag: '🇱🇻', name: 'Latvia' },
  { code: '+372', flag: '🇪🇪', name: 'Estonia' },
  { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
  { code: '+381', flag: '🇷🇸', name: 'Serbia' },
  { code: '+385', flag: '🇭🇷', name: 'Croatia' },
  { code: '+386', flag: '🇸🇮', name: 'Slovenia' },
  { code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
  { code: '+421', flag: '🇸🇰', name: 'Slovakia' },
  { code: '+501', flag: '🇧🇿', name: 'Belize' },
  { code: '+502', flag: '🇬🇹', name: 'Guatemala' },
  { code: '+503', flag: '🇸🇻', name: 'El Salvador' },
  { code: '+504', flag: '🇭🇳', name: 'Honduras' },
  { code: '+505', flag: '🇳🇮', name: 'Nicaragua' },
  { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: '+507', flag: '🇵🇦', name: 'Panama' },
  { code: '+509', flag: '🇭🇹', name: 'Haiti' },
  { code: '+591', flag: '🇧🇴', name: 'Bolivia' },
  { code: '+592', flag: '🇬🇾', name: 'Guyana' },
  { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: '+595', flag: '🇵🇾', name: 'Paraguay' },
  { code: '+598', flag: '🇺🇾', name: 'Uruguay' },
  { code: '+852', flag: '🇭🇰', name: 'Hong Kong' },
  { code: '+853', flag: '🇲🇴', name: 'Macau' },
  { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
  { code: '+856', flag: '🇱🇦', name: 'Laos' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+886', flag: '🇹🇼', name: 'Taiwan' },
  { code: '+960', flag: '🇲🇻', name: 'Maldives' },
  { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
  { code: '+962', flag: '🇯🇴', name: 'Jordan' },
  { code: '+963', flag: '🇸🇾', name: 'Syria' },
  { code: '+964', flag: '🇮🇶', name: 'Iraq' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+967', flag: '🇾🇪', name: 'Yemen' },
  { code: '+968', flag: '🇴🇲', name: 'Oman' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+972', flag: '🇮🇱', name: 'Israel' },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+975', flag: '🇧🇹', name: 'Bhutan' },
  { code: '+976', flag: '🇲🇳', name: 'Mongolia' },
  { code: '+977', flag: '🇳🇵', name: 'Nepal' },
  { code: '+992', flag: '🇹🇯', name: 'Tajikistan' },
  { code: '+993', flag: '🇹🇲', name: 'Turkmenistan' },
  { code: '+994', flag: '🇦🇿', name: 'Azerbaijan' },
  { code: '+995', flag: '🇬🇪', name: 'Georgia' },
  { code: '+996', flag: '🇰🇬', name: 'Kyrgyzstan' },
  { code: '+998', flag: '🇺🇿', name: 'Uzbekistan' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    phoneCode: '+91', phoneNumber: '',
    inquiryType: '', message: ''
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  useDocumentTitle('Contact us | Blubridge');
  useMetaDescription('Get in touch with Blubridge to collaborate on AI research, model engineering, and deployment.');

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePhone = (p) => /^[0-9]{6,15}$/.test(p.replace(/\s/g, ''));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!validateEmail(formData.email)) errors.email = 'Please enter a valid email address';
    if (!formData.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
    else if (!validatePhone(formData.phoneNumber)) errors.phoneNumber = 'Please enter a valid phone number (6-15 digits)';
    if (!formData.inquiryType) errors.inquiryType = 'Please select an inquiry type';
    if (!formData.message.trim()) errors.message = 'Message is required';
    else if (formData.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch(`${API_URL}/api/contacts/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact_us',
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: `${formData.phoneCode} ${formData.phoneNumber}`,
          enquiryCategory: formData.inquiryType,
          message: formData.message.trim()
        }),
      });
      if (response.ok) {
        alert('Thank you for your inquiry. We will get back to you soon!');
        setFormData({ firstName: '', lastName: '', email: '', phoneCode: '+91', phoneNumber: '', inquiryType: '', message: '' });
        setEmailVerified(false);
        setValidationErrors({});
      } else if (response.status === 409) {
        setSubmitError('You have already submitted this form recently. Please wait a moment before trying again.');
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.detail || 'Failed to submit form. Please try again.');
      }
    } catch {
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    { region: 'India', address: 'Plot #E160 Tiger Varadhachari Road,', line2: 'Kalakshetra Colony, Besant Nagar,', line3: 'Chennai – 600090', map: 'https://maps.google.com/?q=Plot+E160+Tiger+Varadhachari+Road+Kalakshetra+Colony+Besant+Nagar+Chennai+600090' },
    { region: 'India', address: '30, Norton Rd, Mandavelipakkam,', line2: 'Raja Annamalai Puram,', line3: 'Chennai, Tamil Nadu 600028', map: 'https://maps.google.com/?q=30+Norton+Rd+Mandavelipakkam+Raja+Annamalai+Puram+Chennai+600028' },
    { region: 'USA', address: 'Zeal Solutions Inc', line2: '5 Independence Way, Suite 300,', line3: 'Princeton, New Jersey - 08540', map: 'https://www.google.com/maps/place/5+Independence+Way,+Princeton,+NJ+08540/@40.3430,-74.6514,17z' },
  ];

  /* ==============================================================
     CORRESPONDENCE SHEET — form control styles
     Compact surfaces: fill #ffffff, 1px border #d4d8e8, radius 3px.
     ============================================================== */
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

  const channels = [
    { label: 'Contact Number', value: '+91 8925987250',                 href: 'tel:+91 8925987250',                          Icon: Phone,    testId: 'channel-contact-number' },
    { label: 'Email',          value: 'info@blubridge.com',             href: 'mailto:info@blubridge.com',                    Icon: Mail,     testId: 'channel-email' },
    { label: 'LinkedIn',       value: 'linkedin.com/company/blubridge', href: 'https://www.linkedin.com/company/blubridge/', Icon: Linkedin, testId: 'channel-linkedin' },
  ];

  return (
    <div style={{ background: '#f0f1f9' }} data-testid="contact-page">

      {/* ===== SECTION 1 — CONTACT US + FORM CARD ===== */}
      <section style={{ paddingTop: '64px', paddingBottom: '104px', overflow: 'hidden' }}>
        <div className="bb-container">
          <div className="cx-grid">

            {/* Left rail — title + channel cards */}
            <div className="cx-left">
              <h1 data-testid="contact-heading" className="cx-title">Contact Us</h1>
              <span className="cx-dash" aria-hidden="true"></span>

              <div className="cx-channels" data-testid="contact-directory">
                {channels.map((c) => (
                  <a
                    key={c.testId}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    data-testid={c.testId}
                    className="cx-channel"
                  >
                    <span className="cx-channel-icon" aria-hidden="true"><c.Icon strokeWidth={1.6} /></span>
                    <span className="cx-channel-text">
                      <span className="cx-channel-label">{c.label}</span>
                      <span className="cx-channel-value">{c.value}</span>
                    </span>
                    <ChevronRight className="cx-channel-chev" aria-hidden="true" strokeWidth={1.8} />
                  </a>
                ))}
              </div>

              <span className="cx-dots" aria-hidden="true"></span>
            </div>

            {/* Right — form card over blue accent shape */}
            <div className="cx-right">
              <span className="cx-blob" aria-hidden="true"></span>
              <form onSubmit={handleSubmit} data-testid="contact-form-card" className="cx-card" noValidate>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-5 gap-y-5">

                  {/* Row 1: First / Last */}
                  <div className="lg:col-span-6">
                    <label style={labelStyle}>First Name<span style={{ color: '#dc2626', marginLeft: 4 }}>*</span></label>
                    <input
                      type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                      style={{ ...inputBase, ...(validationErrors.firstName ? errBorder : {}) }}
                      onFocus={(e) => { e.target.style.borderColor = '#0a1230'; }}
                      onBlur={(e) => { e.target.style.borderColor = validationErrors.firstName ? '#dc2626' : '#d4d8e8'; }}
                    />
                    {validationErrors.firstName && <p style={errText}>{validationErrors.firstName}</p>}
                  </div>
                  <div className="lg:col-span-6">
                    <label style={labelStyle}>Last Name<span style={{ color: '#dc2626', marginLeft: 4 }}>*</span></label>
                    <input
                      type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                      style={{ ...inputBase, ...(validationErrors.lastName ? errBorder : {}) }}
                      onFocus={(e) => { e.target.style.borderColor = '#0a1230'; }}
                      onBlur={(e) => { e.target.style.borderColor = validationErrors.lastName ? '#dc2626' : '#d4d8e8'; }}
                    />
                    {validationErrors.lastName && <p style={errText}>{validationErrors.lastName}</p>}
                  </div>

                  {/* Row 2: Email + Verify */}
                  <div className="lg:col-span-9">
                    <label style={labelStyle}>Email<span style={{ color: '#dc2626', marginLeft: 4 }}>*</span></label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleInputChange}
                      style={{ ...inputBase, ...(validationErrors.email ? errBorder : {}) }}
                      onFocus={(e) => { e.target.style.borderColor = '#0a1230'; }}
                      onBlur={(e) => { e.target.style.borderColor = validationErrors.email ? '#dc2626' : '#d4d8e8'; }}
                    />
                    {validationErrors.email && <p style={errText}>{validationErrors.email}</p>}
                  </div>
                  <div className="lg:col-span-3 flex flex-col">
                    <label style={{ ...labelStyle, visibility: 'hidden' }}>Verify</label>
                    <button
                      type="button"
                      onClick={handleVerifyEmail}
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

                  {/* Row 3: Phone / Inquiry */}
                  <div className="lg:col-span-6">
                    <label style={labelStyle}>Phone No<span style={{ color: '#dc2626', marginLeft: 4 }}>*</span></label>
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
                    {validationErrors.phoneNumber && <p style={errText}>{validationErrors.phoneNumber}</p>}
                  </div>
                  <div className="lg:col-span-6">
                    <label style={labelStyle}>Inquiry Type<span style={{ color: '#dc2626', marginLeft: 4 }}>*</span></label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      style={{
                        ...inputBase,
                        cursor: 'pointer',
                        color: formData.inquiryType ? '#0a1230' : '#7c86a2',
                        ...(validationErrors.inquiryType ? errBorder : {}),
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#0a1230'; }}
                      onBlur={(e) => { e.target.style.borderColor = validationErrors.inquiryType ? '#dc2626' : '#d4d8e8'; }}
                    >
                      <option value="" disabled>Select</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="careers">Careers</option>
                      <option value="other">Other</option>
                    </select>
                    {validationErrors.inquiryType && <p style={errText}>{validationErrors.inquiryType}</p>}
                  </div>

                  {/* Row 4: Message */}
                  <div className="lg:col-span-12">
                    <label style={labelStyle}>How can we help you?<span style={{ color: '#dc2626', marginLeft: 4 }}>*</span></label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      style={{
                        ...inputBase,
                        padding: '12px 14px',
                        resize: 'vertical',
                        minHeight: '132px',
                        lineHeight: 1.6,
                        ...(validationErrors.message ? errBorder : {}),
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#0a1230'; }}
                      onBlur={(e) => { e.target.style.borderColor = validationErrors.message ? '#dc2626' : '#d4d8e8'; }}
                    />
                    {validationErrors.message && <p style={errText}>{validationErrors.message}</p>}
                  </div>

                  {submitError && (
                    <div className="lg:col-span-12">
                      <p style={{ color: '#dc2626', fontSize: '13px', margin: 0, fontFamily: 'Inter, sans-serif' }}>{submitError}</p>
                    </div>
                  )}

                  {/* Row 5: Submit — full width */}
                  <div className="lg:col-span-12" style={{ marginTop: '4px' }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      data-testid="contact-submit"
                      className="cx-submit"
                      style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
                    >
                      {isSubmitting ? 'Submitting…' : 'Submit'}
                      <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2 — OUR OFFICES ===== */}
      <section className="cx-offices" data-testid="offices-card">
        <div className="bb-container">
          <span className="cx-offices-tick" aria-hidden="true"></span>
          <h2 className="cx-offices-title">OUR OFFICES</h2>
          <div className="cx-off-card">
            {offices.map((office, i) => (
              <div key={i} className="cx-off-col" data-testid={`office-card-${i}`}>
                <span className="cx-off-icon" aria-hidden="true"><Building2 strokeWidth={1.4} /></span>
                <p className="cx-off-region">{office.region}</p>
                <p className="cx-off-address">{office.address}<br />{office.line2}<br />{office.line3}</p>
                <a href={office.map} target="_blank" rel="noopener noreferrer" className="cx-off-map group">
                  View on Google Maps
                  <span aria-hidden style={{ fontFamily: 'IBM Plex Mono', transition: 'transform 200ms ease' }} className="inline-block group-hover:translate-x-1">↗</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
