import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, ShieldCheck, Bug } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';
const API_URL = process.env.REACT_APP_BACKEND_URL;

/* /get-in-touch-1 — same content, fields, validation & backend as /get-in-touch.
   Visual redesign only. All styles scoped under .git6-page (see index.css). */

const MAX_DETAILS = 1000;

const rail = [
  {
    index: '01',
    Icon: Compass,
    title: 'Project Assistance.',
    bullets: [
      'Explore our technology solutions.',
      'Connect with our team about your requirement.',
      'Discuss your project with BluBridge specialists.',
    ],
    cta: { label: 'Explore solutions', href: '/solutions' },
    testId: 'git6-rail-project',
  },
  {
    index: '02',
    Icon: Mail,
    title: 'Business enquiries.',
    text: <>Connect with us at <a href="mailto:info@blubridge.com" className="git6-module-link" data-testid="git6-rail-business-email">info@blubridge.com</a> for business, project and collaboration enquiries.</>,
    testId: 'git6-rail-business',
  },
  {
    index: '03',
    Icon: ShieldCheck,
    title: 'Data & privacy.',
    text: 'Have a question regarding your information or privacy? Contact our team for assistance.',
    cta: { label: 'Contact us', href: 'mailto:privacy@blubridge.com' },
    testId: 'git6-rail-privacy',
  },
  {
    index: '04',
    Icon: Bug,
    title: 'Security reporting.',
    text: 'If you identify a potential security issue involving a BluBridge product or service, you can securely report it to our team.',
    cta: { label: 'Report an issue', href: 'mailto:support@blubridge.com' },
    note: 'General technical questions should be submitted through our standard contact channels.',
    testId: 'git6-rail-security',
  },
];

const emptyForm = { firstName: '', lastName: '', email: '', role: '', message: '', marketingConsent: false };

const RailCta = ({ cta, testId }) => {
  const inner = <>{cta.label}<span className="git6-cta-arrow" aria-hidden="true">→</span></>;
  if (cta.href.startsWith('mailto:')) return <a href={cta.href} className="git6-col-cta" data-testid={testId}>{inner}</a>;
  return <Link to={cta.href} className="git6-col-cta" data-testid={testId}>{inner}</Link>;
};

const RailItem = ({ item }) => (
  <div className="git6-col" data-testid={item.testId}>
    <h3 className="git6-col-title"><item.Icon className="git6-col-icon" strokeWidth={1.6} aria-hidden="true" />{item.title}</h3>
    {item.bullets && <ul className="git6-col-bullets">{item.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
    {item.text && <p className="git6-col-desc">{item.text}</p>}
    <div className="git6-col-foot">
      {item.cta && <RailCta cta={item.cta} testId={`${item.testId}-cta`} />}
      {item.note && <p className="git6-col-note">{item.note}</p>}
    </div>
  </div>
);

const GetInTouchV6 = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useDocumentTitle('Get in Touch | BluBridge');
  useMetaDescription('Have a project, technology requirement or collaboration in mind? Tell us what you are working on and connect with the BluBridge team.');

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (name === 'email') setEmailVerified(false);
    if (validationErrors[name]) setValidationErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleVerifyEmail = () => {
    if (formData.email && validateEmail(formData.email.trim())) {
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
    if (!formData.email.trim()) errors.email = 'Company email is required';
    else if (!validateEmail(formData.email.trim())) errors.email = 'Please enter a valid email address';
    if (!formData.role.trim()) errors.role = 'Role is required';
    if (!formData.message.trim()) errors.message = 'Please tell us about your project';
    else if (formData.message.trim().length > MAX_DETAILS) errors.message = `Please keep this under ${MAX_DETAILS} characters`;
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
          role: formData.role.trim(),
          message: formData.message.trim(),
          marketingConsent: formData.marketingConsent,
        }),
      });
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData(emptyForm);
        setEmailVerified(false);
        setValidationErrors({});
      } else if (response.status === 409) {
        setSubmitError('You have already submitted an enquiry recently. Please wait a moment before trying again.');
      } else {
        setSubmitError('We couldn\u2019t send your enquiry. Please try again.');
      }
    } catch {
      setSubmitError('We couldn\u2019t send your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const req = <span className="git6-req" aria-hidden="true">*</span>;
  const fieldClass = (name) => `git6-input${validationErrors[name] ? ' git6-input-error' : ''}`;

  return (
    <div className="git6-page" data-testid="get-in-touch-v6-page">

      {/* Hero */}
      <section className="git6-hero">
        <div className="bb-container">
          <div className="git6-hero-top"><span className="git6-eyebrow" data-testid="git6-eyebrow">GET IN TOUCH</span></div>
          <div className="git6-hero-grid">
            <h1 className="git6-title" data-testid="git6-heading">Let&rsquo;s build what&rsquo;s next.</h1>
            <p className="git6-lede" data-testid="git6-lede">
              Have a project, technology requirement or collaboration in mind? Tell us what you&rsquo;re working on and connect with the BluBridge team.
            </p>
          </div>
        </div>
      </section>

      {/* Two-column contact section */}
      <section className="git6-main" id="git6-form">
        <div className="bb-container">
          <div className="git6-grid">
            <div className="git6-left">
              <form onSubmit={handleSubmit} className="git6-form" data-testid="git6-form-card" noValidate>
                <div className="git6-form-head">
                  <span className="git6-form-kicker">ENQUIRY FORM</span>
                  <h2 className="git6-form-title" data-testid="git6-form-heading">Tell us about your project</h2>
                </div>
    
                <div className="git6-form-body">
                  <div className="git6-row-2">
                    <div className="git6-field">
                      <label htmlFor="git6-first-name" className="git6-label">First Name{req}</label>
                      <input id="git6-first-name" type="text" name="firstName" placeholder="First name" autoComplete="given-name"
                        value={formData.firstName} onChange={handleInputChange} className={fieldClass('firstName')} data-testid="git6-input-first-name" />
                      {validationErrors.firstName && <p className="git6-err" data-testid="git6-error-first-name">{validationErrors.firstName}</p>}
                    </div>
                    <div className="git6-field">
                      <label htmlFor="git6-last-name" className="git6-label">Last Name{req}</label>
                      <input id="git6-last-name" type="text" name="lastName" placeholder="Last name" autoComplete="family-name"
                        value={formData.lastName} onChange={handleInputChange} className={fieldClass('lastName')} data-testid="git6-input-last-name" />
                      {validationErrors.lastName && <p className="git6-err" data-testid="git6-error-last-name">{validationErrors.lastName}</p>}
                    </div>
                  </div>
    
                  <div className="git6-field">
                    <label htmlFor="git6-email" className="git6-label">Company Email{req}</label>
                    <div className={`git6-email-wrap${validationErrors.email ? ' git6-input-error' : ''}${emailVerified ? ' git6-email-verified' : ''}`}>
                      <input id="git6-email" type="email" name="email" placeholder="name@company.com" autoComplete="email"
                        value={formData.email} onChange={handleInputChange} className="git6-input git6-input-bare" data-testid="git6-input-email" />
                      <button type="button" onClick={handleVerifyEmail} data-testid="git6-verify-email"
                        className={`git6-verify${emailVerified ? ' git6-verify-done' : ''}`} aria-live="polite">
                        {emailVerified ? 'Verified ✓' : 'Verify Email'}
                      </button>
                    </div>
                    {validationErrors.email && <p className="git6-err" data-testid="git6-error-email">{validationErrors.email}</p>}
                  </div>
    
                  <div className="git6-field">
                    <label htmlFor="git6-role" className="git6-label">Role{req}</label>
                    <input id="git6-role" type="text" name="role" placeholder="Your role or designation" autoComplete="organization-title"
                      value={formData.role} onChange={handleInputChange} className={fieldClass('role')} data-testid="git6-input-role" />
                    {validationErrors.role && <p className="git6-err" data-testid="git6-error-role">{validationErrors.role}</p>}
                  </div>
    
                  <div className="git6-field">
                    <label htmlFor="git6-message" className="git6-label">Tell us about your project{req}</label>
                    <textarea id="git6-message" name="message" rows={6} maxLength={MAX_DETAILS}
                      placeholder="Tell us about your project, objectives, requirements, challenges or what you would like BluBridge to help you build."
                      value={formData.message} onChange={handleInputChange}
                      className={`${fieldClass('message')} git6-textarea`} data-testid="git6-input-message" />
                    <div className="git6-counter" data-testid="git6-char-counter">{formData.message.length} / {MAX_DETAILS}</div>
                    {validationErrors.message && <p className="git6-err" data-testid="git6-error-message">{validationErrors.message}</p>}
                  </div>
    
                  <label className="git6-consent">
                    <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent}
                      onChange={handleInputChange} data-testid="git6-checkbox-consent" />
                    <span>I&rsquo;d like to receive occasional updates about BluBridge products and services.</span>
                  </label>
    
                  <p className="git6-legal" data-testid="git6-legal">
                    By submitting this form, you agree that BluBridge may process the information provided to respond to your enquiry in accordance with our{' '}
                    <Link to="/policies/privacy-policy" data-testid="git6-privacy-link">Privacy Policy</Link>.
                  </p>
    
                  {submitSuccess && (
                    <p className="git6-success" role="status" data-testid="git6-success-message">
                      Thanks for getting in touch. Your enquiry has been received and our team will get back to you shortly.
                    </p>
                  )}
                  {submitError && (
                    <p className="git6-err git6-err-submit" role="alert" data-testid="git6-submit-error">{submitError}</p>
                  )}
    
                  <button type="submit" disabled={isSubmitting} className="git6-submit" data-testid="git6-submit">
                    {isSubmitting ? 'Sending…' : 'Talk with our team'}
                    <span className="git6-submit-arrow" aria-hidden="true">→</span>
                  </button>
                </div>
              </form>
            </div>
            <aside className="git6-right" aria-label="How can we help">
              <div className="git6-help-head"><span className="git6-eyebrow">HOW CAN WE HELP</span></div>
              <div className="git6-cols" data-testid="git6-rail">
                {rail.map((item) => <RailItem key={item.testId} item={item} />)}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInTouchV6;
