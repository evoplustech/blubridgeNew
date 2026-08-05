import React, { useState } from 'react';
import { MapPin, Phone, Mail, Linkedin } from 'lucide-react';
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

  const inputBase = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #d4d8e8',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    color: '#0a1230',
    outline: 'none',
    boxSizing: 'border-box',
  };
  const errBorder = { border: '1px solid #dc2626' };
  const labelStyle = {
    display: 'block',
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#3f4966',
    marginBottom: '8px',
  };

  const offices = [
    { region: 'India', address: 'Plot #E160 Tiger Varadhachari Road,', line2: 'Kalakshetra Colony, Besant Nagar,', line3: 'Chennai – 600090', map: 'https://maps.google.com/?q=Plot+E160+Tiger+Varadhachari+Road+Kalakshetra+Colony+Besant+Nagar+Chennai+600090' },
    { region: 'India', address: '30, Norton Rd, Mandavelipakkam,', line2: 'Raja Annamalai Puram,', line3: 'Chennai, Tamil Nadu 600028', map: 'https://maps.google.com/?q=30+Norton+Rd+Mandavelipakkam+Raja+Annamalai+Puram+Chennai+600028' },
    { region: 'USA', address: 'Zeal Solutions Inc', line2: '5 Independence Way, Suite 300,', line3: 'Princeton, New Jersey - 08540', map: 'https://www.google.com/maps/place/5+Independence+Way,+Princeton,+NJ+08540/@40.3430,-74.6514,17z' },
  ];

  return (
    <div style={{ background: '#f0f1f9', paddingTop: '48px', paddingBottom: '96px' }} data-testid="contact-page">
      <div className="bb-container">
        {/* Editorial header row */}
        <div className="pb-8 border-b border-bb-line flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="bb-display" style={{ fontSize: 'clamp(44px, 6.5vw, 96px)' }}>
              Contact Us
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-14">
          {/* LEFT — Offices + contact info */}
          <div className="lg:col-span-5" data-testid="offices-card">
            <div className="space-y-4 mb-10">
              {offices.map((o, i) => (
                <div
                  key={i}
                  className="bb-panel"
                  data-testid={`office-card-${i}`}
                  style={{ padding: '20px 24px' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-3">
                        <h3 style={{ fontFamily: 'Geist, sans-serif', fontSize: '17px', fontWeight: 500, letterSpacing: '-0.01em', color: '#0a1230' }}>
                          {o.region}
                        </h3>
                      </div>
                      <p style={{ color: '#3f4966', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                        {o.address}<br />{o.line2}<br />{o.line3}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2 pl-4 border-l border-bb-line">
                      <MapPin size={18} color="#0a1230" />
                      <a href={o.map} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-bb-accent hover:text-bb-ink whitespace-nowrap">
                        Map ↗
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {[
                { icon: Phone,    label: 'Contact Number', value: '+91 8925987250',           href: 'tel:+91 8925987250' },
                { icon: Mail,     label: 'Email',          value: 'info@blubridge.com',        href: 'mailto:info@blubridge.com' },
                { icon: Linkedin, label: 'LinkedIn',       value: 'linkedin.com/company/blubridge', href: 'https://www.linkedin.com/company/blubridge/' },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <a
                    key={i}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="bb-panel flex items-center gap-4 p-4 hover:border-bb-line-strong transition-colors"
                    data-testid={`channel-${c.label.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ background: '#dfe6f5' }}>
                      <Icon size={18} color="#2b4c8c" />
                    </div>
                    <div className="flex-1">
                      <p style={labelStyle} className="!mb-1">{c.label}</p>
                      <p style={{ fontSize: '14px', color: '#0a1230', margin: 0, fontFamily: 'Inter, sans-serif' }}>{c.value}</p>
                    </div>
                    <span className="font-mono text-[11px] text-bb-ink-3">↗</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="lg:col-span-7">
            <div className="bb-panel p-8 lg:p-10" data-testid="contact-form-card">
              <form onSubmit={handleSubmit}>
                {/* First / Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label style={labelStyle}>First Name<span style={{ color: '#dc2626', marginLeft: 4 }}>*</span></label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                      style={{ ...inputBase, ...(validationErrors.firstName ? errBorder : {}) }} />
                    {validationErrors.firstName && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', margin: '4px 0 0' }}>{validationErrors.firstName}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name<span style={{ color: '#dc2626', marginLeft: 4 }}>*</span></label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                      style={{ ...inputBase, ...(validationErrors.lastName ? errBorder : {}) }} />
                    {validationErrors.lastName && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', margin: '4px 0 0' }}>{validationErrors.lastName}</p>}
                  </div>
                </div>

                {/* Email + verify */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>Email<span style={{ color: '#dc2626', marginLeft: 4 }}>*</span></label>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{ ...inputBase, ...(validationErrors.email ? errBorder : {}), flex: '1 1 220px' }}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyEmail}
                      style={{
                        padding: '12px 20px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontFamily: 'IBM Plex Mono, monospace',
                        letterSpacing: '0.08em',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        backgroundColor: emailVerified ? '#16a34a' : '#0a1230',
                        color: '#ffffff',
                        border: 'none',
                      }}
                    >
                      {emailVerified ? 'VERIFIED ✓' : 'VERIFY EMAIL'}
                    </button>
                  </div>
                  {validationErrors.email && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', margin: '4px 0 0' }}>{validationErrors.email}</p>}
                </div>

                {/* Phone + Inquiry */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label style={labelStyle}>Phone No<span style={{ color: '#dc2626', marginLeft: 4 }}>*</span></label>
                    <div style={{ display: 'flex' }}>
                      <select
                        name="phoneCode"
                        value={formData.phoneCode}
                        onChange={handleInputChange}
                        style={{
                          padding: '12px 8px',
                          backgroundColor: '#e8eaf3',
                          border: '1px solid #d4d8e8',
                          borderRight: 'none',
                          borderRadius: '6px 0 0 6px',
                          fontSize: '14px',
                          color: '#0a1230',
                          outline: 'none',
                          cursor: 'pointer',
                          minWidth: '96px',
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
                          padding: '12px 14px',
                          border: '1px solid #d4d8e8',
                          borderRadius: '0 6px 6px 0',
                          backgroundColor: '#ffffff',
                          fontSize: '14px',
                          outline: 'none',
                          fontFamily: 'Inter, sans-serif',
                          ...(validationErrors.phoneNumber ? { borderColor: '#dc2626' } : {}),
                        }}
                      />
                    </div>
                    {validationErrors.phoneNumber && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', margin: '4px 0 0' }}>{validationErrors.phoneNumber}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Inquiry Type<span style={{ color: '#dc2626', marginLeft: 4 }}>*</span></label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      style={{ ...inputBase, cursor: 'pointer', color: formData.inquiryType ? '#0a1230' : '#7c86a2', ...(validationErrors.inquiryType ? errBorder : {}) }}
                    >
                      <option value="" disabled>Select</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="careers">Careers</option>
                      <option value="other">Other</option>
                    </select>
                    {validationErrors.inquiryType && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', margin: '4px 0 0' }}>{validationErrors.inquiryType}</p>}
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={labelStyle}>How can we help you?<span style={{ color: '#dc2626', marginLeft: 4 }}>*</span></label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={9}
                    style={{ ...inputBase, resize: 'none', ...(validationErrors.message ? errBorder : {}) }}
                  />
                  {validationErrors.message && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', margin: '4px 0 0' }}>{validationErrors.message}</p>}
                </div>

                {submitError && (
                  <div style={{ padding: '12px 16px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', marginBottom: '18px' }}>
                    <p style={{ color: '#dc2626', fontSize: '13px', margin: 0 }}>{submitError}</p>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bb-btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '14px 32px', opacity: isSubmitting ? 0.7 : 1 }}
                    data-testid="contact-submit"
                  >
                    {isSubmitting ? 'Submitting…' : 'Submit'} <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
