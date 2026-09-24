import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, ShieldCheck, Bug } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';
const API_URL = window.location.origin;

const MAX_DETAILS = 1000;

const rail = [
  {
    Icon: Compass,
    title: 'Project Assistance.',
    bullets: [
      'Explore our technology solutions.',
      'Connect with our team about your requirement.',
      'Discuss your project with BluBridge specialists.',
    ],
    cta: { label: 'Explore solutions', href: '/solutions' },
    testId: 'git-rail-project',
  },
  {
    Icon: Mail,
    title: 'Business enquiries.',
    text: <>Connect with us at <a href="mailto:info@blubridge.com" className="git-item-link" data-testid="git-rail-business-email">info@blubridge.com</a> for business, project and collaboration enquiries.</>,
    testId: 'git-rail-business',
  },
  {
    Icon: ShieldCheck,
    title: 'Data & privacy.',
    text: 'Have a question regarding your information or privacy? Contact our team for assistance.',
    cta: { label: 'Contact us', href: 'mailto:privacy@blubridge.com' },
    testId: 'git-rail-privacy',
  },
  {
    Icon: Bug,
    title: 'Security reporting.',
    text: 'If you identify a potential security issue involving a BluBridge product or service, you can securely report it to our team.',
    cta: { label: 'Report an issue', href: 'mailto:support@blubridge.com' },
    note: 'General technical questions should be submitted through our standard contact channels.',
    testId: 'git-rail-security',
  },
];

const emptyForm = { firstName: '', lastName: '', email: '', role: '', message: '', marketingConsent: false };

const RailCta = ({ cta, testId }) => {
  const inner = <>{cta.label}<span className="git-item-arrow" aria-hidden="true">→</span></>;
  if (cta.href.startsWith('mailto:')) return <a href={cta.href} className="git-item-cta" data-testid={testId}>{inner}</a>;
  return <Link to={cta.href} className="git-item-cta" data-testid={testId}>{inner}</Link>;
};

const RailItem = ({ item }) => (
  <div className="git-item" data-testid={item.testId}>
    <span className="git-item-icon" aria-hidden="true"><item.Icon strokeWidth={1.6} /></span>
    <div className="git-item-body">
      <h3 className="git-item-title">{item.title}</h3>
      {item.bullets && (
        <ul className="git-item-bullets">
          {item.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
      )}
      {item.text && <p className="git-item-desc">{item.text}</p>}
      {item.cta && <RailCta cta={item.cta} testId={`${item.testId}-cta`} />}
      {item.note && <p className="git-item-note">{item.note}</p>}
    </div>
  </div>
);

const GetInTouch = () => {
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

  const req = <span className="git-req" aria-hidden="true">*</span>;
  const fieldClass = (name) => `git-input${validationErrors[name] ? ' git-input-error' : ''}`;

  return (
    <div className="git-page" data-testid="get-in-touch-page">

      {/* ===== INTRO ===== */}
      <section className="git-intro">
        <div className="bb-container">
          <span className="git-eyebrow" data-testid="git-eyebrow">GET IN TOUCH</span>
          <h1 className="git-title" data-testid="git-heading">Let&rsquo;s build what&rsquo;s next.</h1>
          <p className="git-lede" data-testid="git-lede">
            Have a project, technology requirement or collaboration in mind? Tell us what you&rsquo;re working on and connect with the BluBridge team.
          </p>
        </div>
      </section>

      {/* ===== MAIN ===== */}
      <section className="git-main">
        <div className="bb-container">
          <div className="git-grid">

            {/* LEFT — one continuous structured panel */}
            <aside className="git-rail" data-testid="git-rail" aria-label="How can we help">
              <div className="git-rail-head">
                <span className="git-rail-kicker">HOW CAN WE HELP</span>
              </div>
              {rail.map((item) => <RailItem key={item.testId} item={item} />)}
            </aside>

            {/* RIGHT — form */}
            <div className="git-form-wrap" id="git-form">
              <form onSubmit={handleSubmit} className="git-form" data-testid="git-form-card" noValidate>
                <div className="git-form-head">
                  <span className="git-form-kicker">ENQUIRY FORM</span>
                  <h2 className="git-form-title" data-testid="git-form-heading">Tell us about your project</h2>
                </div>

                <div className="git-fields">
                  <div className="git-row-2">
                    <div className="git-field">
                      <label htmlFor="git-first-name" className="git-label">First Name{req}</label>
                      <input id="git-first-name" type="text" name="firstName" placeholder="First name" autoComplete="given-name"
                        value={formData.firstName} onChange={handleInputChange} className={fieldClass('firstName')} data-testid="git-input-first-name" />
                      {validationErrors.firstName && <p className="git-err" data-testid="git-error-first-name">{validationErrors.firstName}</p>}
                    </div>
                    <div className="git-field">
                      <label htmlFor="git-last-name" className="git-label">Last Name{req}</label>
                      <input id="git-last-name" type="text" name="lastName" placeholder="Last name" autoComplete="family-name"
                        value={formData.lastName} onChange={handleInputChange} className={fieldClass('lastName')} data-testid="git-input-last-name" />
                      {validationErrors.lastName && <p className="git-err" data-testid="git-error-last-name">{validationErrors.lastName}</p>}
                    </div>
                  </div>

                  <div className="git-field">
                    <label htmlFor="git-email" className="git-label">Company Email{req}</label>
                    <input id="git-email" type="email" name="email" placeholder="name@company.com" autoComplete="email"
                      value={formData.email} onChange={handleInputChange} className={fieldClass('email')} data-testid="git-input-email" />
                    {validationErrors.email && <p className="git-err" data-testid="git-error-email">{validationErrors.email}</p>}
                    <div className="git-verify-row">
                      <button type="button" onClick={handleVerifyEmail} data-testid="git-verify-email"
                        className={`git-verify${emailVerified ? ' git-verify-done' : ''}`} aria-live="polite">
                        {emailVerified ? 'Verified ✓' : 'Verify Email'}
                      </button>
                    </div>
                  </div>

                  <div className="git-field">
                    <label htmlFor="git-role" className="git-label">Role{req}</label>
                    <input id="git-role" type="text" name="role" placeholder="Your role or designation" autoComplete="organization-title"
                      value={formData.role} onChange={handleInputChange} className={fieldClass('role')} data-testid="git-input-role" />
                    {validationErrors.role && <p className="git-err" data-testid="git-error-role">{validationErrors.role}</p>}
                  </div>

                  <div className="git-field">
                    <label htmlFor="git-message" className="git-label">Tell us about your project{req}</label>
                    <textarea id="git-message" name="message" rows={6} maxLength={MAX_DETAILS}
                      placeholder="Tell us about your project, objectives, requirements, challenges or what you would like BluBridge to help you build."
                      value={formData.message} onChange={handleInputChange}
                      className={`${fieldClass('message')} git-textarea`} data-testid="git-input-message" />
                    <div className="git-counter" data-testid="git-char-counter">{formData.message.length} / {MAX_DETAILS}</div>
                    {validationErrors.message && <p className="git-err" data-testid="git-error-message">{validationErrors.message}</p>}
                  </div>

                  <label className="git-consent">
                    <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent}
                      onChange={handleInputChange} data-testid="git-checkbox-consent" />
                    <span>I&rsquo;d like to receive occasional updates about BluBridge products and services.</span>
                  </label>

                  <p className="git-legal" data-testid="git-legal">
                    By submitting this form, you agree that BluBridge may process the information provided to respond to your enquiry in accordance with our{' '}
                    <Link to="/policies/privacy-policy" data-testid="git-privacy-link">Privacy Policy</Link>.
                  </p>

                  {submitSuccess && (
                    <p className="git-success" role="status" data-testid="git-success-message">
                      Thanks for getting in touch. Your enquiry has been received and our team will get back to you shortly.
                    </p>
                  )}
                  {submitError && (
                    <p className="git-err git-err-submit" role="alert" data-testid="git-submit-error">{submitError}</p>
                  )}

                  <button type="submit" disabled={isSubmitting} className="git-submit" data-testid="git-submit">
                    {isSubmitting ? 'Sending…' : 'Talk with our team'}
                    <span className="git-submit-arrow" aria-hidden="true">→</span>
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

export default GetInTouch;
