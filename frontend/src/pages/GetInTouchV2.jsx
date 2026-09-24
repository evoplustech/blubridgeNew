import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, ShieldCheck, Bug } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';
const API_URL = window.location.origin;

/* /get-in-touch-1 — same content, fields, validation & backend as /get-in-touch.
   Visual redesign only. All styles scoped under .git2-page (see index.css). */

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
    testId: 'git2-rail-project',
  },
  {
    index: '02',
    Icon: Mail,
    title: 'Business enquiries.',
    text: <>Connect with us at <a href="mailto:info@blubridge.com" className="git2-item-link" data-testid="git2-rail-business-email">info@blubridge.com</a> for business, project and collaboration enquiries.</>,
    testId: 'git2-rail-business',
  },
  {
    index: '03',
    Icon: ShieldCheck,
    title: 'Data & privacy.',
    text: 'Have a question regarding your information or privacy? Contact our team for assistance.',
    cta: { label: 'Contact us', href: 'mailto:privacy@blubridge.com' },
    testId: 'git2-rail-privacy',
  },
  {
    index: '04',
    Icon: Bug,
    title: 'Security reporting.',
    text: 'If you identify a potential security issue involving a BluBridge product or service, you can securely report it to our team.',
    cta: { label: 'Report an issue', href: 'mailto:support@blubridge.com' },
    note: 'General technical questions should be submitted through our standard contact channels.',
    testId: 'git2-rail-security',
  },
];

const emptyForm = { firstName: '', lastName: '', email: '', role: '', message: '', marketingConsent: false };

const RailCta = ({ cta, testId }) => {
  const inner = <><span className="git2-item-cta-text">{cta.label}</span><span className="git2-item-arrow" aria-hidden="true">→</span></>;
  if (cta.href.startsWith('mailto:')) return <a href={cta.href} className="git2-item-cta" data-testid={testId}>{inner}</a>;
  return <Link to={cta.href} className="git2-item-cta" data-testid={testId}>{inner}</Link>;
};

const RailItem = ({ item }) => (
  <article className="git2-item" data-testid={item.testId}>
    <div className="git2-item-head">
      <span className="git2-item-index" aria-hidden="true">{item.index}</span>
      <span className="git2-item-icon" aria-hidden="true"><item.Icon strokeWidth={1.5} /></span>
    </div>
    <h3 className="git2-item-title">{item.title}</h3>
    <span className="git2-item-rule" aria-hidden="true"></span>
    {item.bullets && (
      <ul className="git2-item-bullets">
        {item.bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
    )}
    {item.text && <p className="git2-item-desc">{item.text}</p>}
    {item.cta && <RailCta cta={item.cta} testId={`${item.testId}-cta`} />}
    {item.note && <p className="git2-item-note">{item.note}</p>}
  </article>
);

const GetInTouchV2 = () => {
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

  const req = <span className="git2-req" aria-hidden="true">*</span>;
  const fieldClass = (name) => `git2-input${validationErrors[name] ? ' git2-input-error' : ''}`;

  return (
    <div className="git2-page" data-testid="get-in-touch-v2-page">

      {/* ===== INTRO ===== */}
      <section className="git2-intro">
        <div className="bb-container">
          <div className="git2-intro-top">
            <span className="git2-eyebrow" data-testid="git2-eyebrow">GET IN TOUCH</span>
            <span className="git2-intro-meta" aria-hidden="true">01 — 04</span>
          </div>
          <div className="git2-intro-grid">
            <h1 className="git2-title" data-testid="git2-heading">
              <span className="git2-title-line">Let&rsquo;s build</span>
              <span className="git2-title-line">what&rsquo;s next.</span>
            </h1>
            <div className="git2-intro-side">
              <span className="git2-intro-side-rule" aria-hidden="true"></span>
              <p className="git2-lede" data-testid="git2-lede">
                Have a project, technology requirement or collaboration in mind? Tell us what you&rsquo;re working on and connect with the BluBridge team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CANVAS ===== */}
      <section className="git2-main">
        <div className="bb-container">
          <div className="git2-canvas" data-testid="git2-canvas">

            {/* LEFT — numbered editorial content */}
            <div className="git2-left" data-testid="git2-rail">
              <div className="git2-left-head">
                <span className="git2-kicker">HOW CAN WE HELP</span>
              </div>
              <div className="git2-items">
                {rail.map((item) => <RailItem key={item.testId} item={item} />)}
              </div>
            </div>

            {/* RIGHT — navy form surface */}
            <div className="git2-right" id="git2-form">
              <span className="git2-vertical-label" aria-hidden="true">ENQUIRY FORM</span>
              <form onSubmit={handleSubmit} className="git2-form" data-testid="git2-form-card" noValidate>
                <div className="git2-form-head">
                  <span className="git2-kicker git2-kicker-light">ENQUIRY FORM</span>
                  <h2 className="git2-form-title" data-testid="git2-form-heading">Tell us about your project</h2>
                </div>

                <div className="git2-fields">
                  <div className="git2-row-2">
                    <div className="git2-field">
                      <label htmlFor="git2-first-name" className="git2-label">First Name{req}</label>
                      <input id="git2-first-name" type="text" name="firstName" placeholder="First name" autoComplete="given-name"
                        value={formData.firstName} onChange={handleInputChange} className={fieldClass('firstName')} data-testid="git2-input-first-name" />
                      {validationErrors.firstName && <p className="git2-err" data-testid="git2-error-first-name">{validationErrors.firstName}</p>}
                    </div>
                    <div className="git2-field">
                      <label htmlFor="git2-last-name" className="git2-label">Last Name{req}</label>
                      <input id="git2-last-name" type="text" name="lastName" placeholder="Last name" autoComplete="family-name"
                        value={formData.lastName} onChange={handleInputChange} className={fieldClass('lastName')} data-testid="git2-input-last-name" />
                      {validationErrors.lastName && <p className="git2-err" data-testid="git2-error-last-name">{validationErrors.lastName}</p>}
                    </div>
                  </div>

                  <div className="git2-field">
                    <label htmlFor="git2-email" className="git2-label">Company Email{req}</label>
                    <div className={`git2-email-wrap${validationErrors.email ? ' git2-input-error' : ''}${emailVerified ? ' git2-email-verified' : ''}`}>
                      <input id="git2-email" type="email" name="email" placeholder="name@company.com" autoComplete="email"
                        value={formData.email} onChange={handleInputChange} className="git2-input git2-input-bare" data-testid="git2-input-email" />
                      <button type="button" onClick={handleVerifyEmail} data-testid="git2-verify-email"
                        className={`git2-verify${emailVerified ? ' git2-verify-done' : ''}`} aria-live="polite">
                        {emailVerified ? 'Verified ✓' : 'Verify Email'}
                      </button>
                    </div>
                    {validationErrors.email && <p className="git2-err" data-testid="git2-error-email">{validationErrors.email}</p>}
                  </div>

                  <div className="git2-field">
                    <label htmlFor="git2-role" className="git2-label">Role{req}</label>
                    <input id="git2-role" type="text" name="role" placeholder="Your role or designation" autoComplete="organization-title"
                      value={formData.role} onChange={handleInputChange} className={fieldClass('role')} data-testid="git2-input-role" />
                    {validationErrors.role && <p className="git2-err" data-testid="git2-error-role">{validationErrors.role}</p>}
                  </div>

                  <div className="git2-field">
                    <div className="git2-label-row">
                      <label htmlFor="git2-message" className="git2-label">Tell us about your project{req}</label>
                      <span className="git2-counter" data-testid="git2-char-counter">{formData.message.length} / {MAX_DETAILS}</span>
                    </div>
                    <textarea id="git2-message" name="message" rows={6} maxLength={MAX_DETAILS}
                      placeholder="Tell us about your project, objectives, requirements, challenges or what you would like BluBridge to help you build."
                      value={formData.message} onChange={handleInputChange}
                      className={`${fieldClass('message')} git2-textarea`} data-testid="git2-input-message" />
                    {validationErrors.message && <p className="git2-err" data-testid="git2-error-message">{validationErrors.message}</p>}
                  </div>

                  <label className="git2-consent">
                    <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent}
                      onChange={handleInputChange} data-testid="git2-checkbox-consent" />
                    <span>I&rsquo;d like to receive occasional updates about BluBridge products and services.</span>
                  </label>

                  <p className="git2-legal" data-testid="git2-legal">
                    By submitting this form, you agree that BluBridge may process the information provided to respond to your enquiry in accordance with our{' '}
                    <Link to="/policies/privacy-policy" data-testid="git2-privacy-link">Privacy Policy</Link>.
                  </p>

                  {submitSuccess && (
                    <p className="git2-success" role="status" data-testid="git2-success-message">
                      Thanks for getting in touch. Your enquiry has been received and our team will get back to you shortly.
                    </p>
                  )}
                  {submitError && (
                    <p className="git2-err git2-err-submit" role="alert" data-testid="git2-submit-error">{submitError}</p>
                  )}

                  <button type="submit" disabled={isSubmitting} className="git2-submit" data-testid="git2-submit">
                    <span>{isSubmitting ? 'Sending…' : 'Talk with our team'}</span>
                    <span className="git2-submit-arrow" aria-hidden="true">↗</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInTouchV2;
