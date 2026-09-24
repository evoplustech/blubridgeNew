import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';
const API_URL = window.location.origin;

/* /get-in-touch-1 — same content, fields, validation & backend as /get-in-touch.
   Visual redesign only. All styles scoped under .git5-page (see index.css). */

const MAX_DETAILS = 1000;

const emptyForm = { firstName: '', lastName: '', email: '', role: '', message: '', marketingConsent: false };

const GetInTouchV5 = () => {
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

  const req = <span className="git5-req" aria-hidden="true">*</span>;
  const fieldClass = (name) => `git5-input${validationErrors[name] ? ' git5-input-error' : ''}`;

  return (
    <div className="git5-page" data-testid="get-in-touch-v5-page">

      {/* Hero */}
      <section className="git5-hero">
        <div className="bb-container">
          <div className="git5-hero-top"><span className="git5-eyebrow" data-testid="git5-eyebrow">GET IN TOUCH</span></div>
          <div className="git5-hero-grid">
            <h1 className="git5-title" data-testid="git5-heading">Let&rsquo;s build what&rsquo;s next.</h1>
            <p className="git5-lede" data-testid="git5-lede">
              Have a project, technology requirement or collaboration in mind? Tell us what you&rsquo;re working on and connect with the BluBridge team.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="git5-form-section" id="git5-form">
        <div className="bb-container">
          <form onSubmit={handleSubmit} className="git5-form" data-testid="git5-form-card" noValidate>
            <div className="git5-form-head">
              <span className="git5-form-kicker">ENQUIRY FORM</span>
              <h2 className="git5-form-title" data-testid="git5-form-heading">Tell us about your project</h2>
            </div>

            <div className="git5-form-body">
              <div className="git5-row-2">
                <div className="git5-field">
                  <label htmlFor="git5-first-name" className="git5-label">First Name{req}</label>
                  <input id="git5-first-name" type="text" name="firstName" placeholder="First name" autoComplete="given-name"
                    value={formData.firstName} onChange={handleInputChange} className={fieldClass('firstName')} data-testid="git5-input-first-name" />
                  {validationErrors.firstName && <p className="git5-err" data-testid="git5-error-first-name">{validationErrors.firstName}</p>}
                </div>
                <div className="git5-field">
                  <label htmlFor="git5-last-name" className="git5-label">Last Name{req}</label>
                  <input id="git5-last-name" type="text" name="lastName" placeholder="Last name" autoComplete="family-name"
                    value={formData.lastName} onChange={handleInputChange} className={fieldClass('lastName')} data-testid="git5-input-last-name" />
                  {validationErrors.lastName && <p className="git5-err" data-testid="git5-error-last-name">{validationErrors.lastName}</p>}
                </div>
              </div>

              <div className="git5-field">
                <label htmlFor="git5-email" className="git5-label">Company Email{req}</label>
                <div className={`git5-email-wrap${validationErrors.email ? ' git5-input-error' : ''}${emailVerified ? ' git5-email-verified' : ''}`}>
                  <input id="git5-email" type="email" name="email" placeholder="name@company.com" autoComplete="email"
                    value={formData.email} onChange={handleInputChange} className="git5-input git5-input-bare" data-testid="git5-input-email" />
                  <button type="button" onClick={handleVerifyEmail} data-testid="git5-verify-email"
                    className={`git5-verify${emailVerified ? ' git5-verify-done' : ''}`} aria-live="polite">
                    {emailVerified ? 'Verified ✓' : 'Verify Email'}
                  </button>
                </div>
                {validationErrors.email && <p className="git5-err" data-testid="git5-error-email">{validationErrors.email}</p>}
              </div>

              <div className="git5-field">
                <label htmlFor="git5-role" className="git5-label">Role{req}</label>
                <input id="git5-role" type="text" name="role" placeholder="Your role or designation" autoComplete="organization-title"
                  value={formData.role} onChange={handleInputChange} className={fieldClass('role')} data-testid="git5-input-role" />
                {validationErrors.role && <p className="git5-err" data-testid="git5-error-role">{validationErrors.role}</p>}
              </div>

              <div className="git5-field">
                <label htmlFor="git5-message" className="git5-label">Tell us about your project{req}</label>
                <textarea id="git5-message" name="message" rows={6} maxLength={MAX_DETAILS}
                  placeholder="Tell us about your project, objectives, requirements, challenges or what you would like BluBridge to help you build."
                  value={formData.message} onChange={handleInputChange}
                  className={`${fieldClass('message')} git5-textarea`} data-testid="git5-input-message" />
                <div className="git5-counter" data-testid="git5-char-counter">{formData.message.length} / {MAX_DETAILS}</div>
                {validationErrors.message && <p className="git5-err" data-testid="git5-error-message">{validationErrors.message}</p>}
              </div>

              <label className="git5-consent">
                <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent}
                  onChange={handleInputChange} data-testid="git5-checkbox-consent" />
                <span>I&rsquo;d like to receive occasional updates about BluBridge products and services.</span>
              </label>

              <p className="git5-legal" data-testid="git5-legal">
                By submitting this form, you agree that BluBridge may process the information provided to respond to your enquiry in accordance with our{' '}
                <Link to="/policies/privacy-policy" data-testid="git5-privacy-link">Privacy Policy</Link>.
              </p>

              {submitSuccess && (
                <p className="git5-success" role="status" data-testid="git5-success-message">
                  Thanks for getting in touch. Your enquiry has been received and our team will get back to you shortly.
                </p>
              )}
              {submitError && (
                <p className="git5-err git5-err-submit" role="alert" data-testid="git5-submit-error">{submitError}</p>
              )}

              <button type="submit" disabled={isSubmitting} className="git5-submit" data-testid="git5-submit">
                {isSubmitting ? 'Sending…' : 'Talk with our team'}
                <span className="git5-submit-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
};

export default GetInTouchV5;
