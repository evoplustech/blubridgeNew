import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';
const API_URL = process.env.REACT_APP_BACKEND_URL || window.location.origin;

/* /get-in-touch-1 — same content, fields, validation & backend as /get-in-touch.
   Visual redesign only. All styles scoped under .git3-page (see index.css). */

const MAX_DETAILS = 1000;

const emptyForm = { firstName: '', lastName: '', email: '', role: '', message: '', marketingConsent: false };

const GetInTouchV4 = () => {
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

  const req = <span className="git3-req" aria-hidden="true">*</span>;
  const fieldClass = (name) => `git3-input${validationErrors[name] ? ' git3-input-error' : ''}`;

  return (
    <div className="git3-page git4-page" data-testid="get-in-touch-v4-page">

      {/* ===== SECTION 1 — wide editorial hero ===== */}
      <section className="git3-hero">
        <div className="bb-container">
          <div className="git3-hero-rule">
            <span className="git3-eyebrow" data-testid="git3-eyebrow">GET IN TOUCH</span>
          </div>
          <h1 className="git3-title" data-testid="git3-heading">Let&rsquo;s build what&rsquo;s next.</h1>
          <div className="git3-hero-foot">
            <span className="git3-hero-marker" aria-hidden="true"></span>
            <p className="git3-lede" data-testid="git3-lede">
              Have a project, technology requirement or collaboration in mind? Tell us what you&rsquo;re working on and connect with the BluBridge team.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3 — full-width form ===== */}
      <section className="git3-form-section" id="git3-form">
        <div className="bb-container">
          <form onSubmit={handleSubmit} className="git3-form" data-testid="git3-form-card" noValidate>
            <div className="git3-form-head">
              <h2 className="git3-form-title" data-testid="git3-form-heading">Tell us about your project</h2>
              <span className="git3-kicker">ENQUIRY FORM</span>
            </div>

            <div className="git3-form-body">
              <div className="git3-grid">
                <div className="git3-field git3-span-6">
                  <label htmlFor="git3-first-name" className="git3-label">First Name{req}</label>
                  <input id="git3-first-name" type="text" name="firstName" placeholder="First name" autoComplete="given-name"
                    value={formData.firstName} onChange={handleInputChange} className={fieldClass('firstName')} data-testid="git3-input-first-name" />
                  {validationErrors.firstName && <p className="git3-err" data-testid="git3-error-first-name">{validationErrors.firstName}</p>}
                </div>
                <div className="git3-field git3-span-6">
                  <label htmlFor="git3-last-name" className="git3-label">Last Name{req}</label>
                  <input id="git3-last-name" type="text" name="lastName" placeholder="Last name" autoComplete="family-name"
                    value={formData.lastName} onChange={handleInputChange} className={fieldClass('lastName')} data-testid="git3-input-last-name" />
                  {validationErrors.lastName && <p className="git3-err" data-testid="git3-error-last-name">{validationErrors.lastName}</p>}
                </div>

                <div className="git3-field git3-span-12">
                  <label htmlFor="git3-email" className="git3-label">Company Email{req}</label>
                  <div className={`git3-email-wrap${validationErrors.email ? ' git3-input-error' : ''}${emailVerified ? ' git3-email-verified' : ''}`}>
                    <input id="git3-email" type="email" name="email" placeholder="name@company.com" autoComplete="email"
                      value={formData.email} onChange={handleInputChange} className="git3-input git3-input-bare" data-testid="git3-input-email" />
                    <button type="button" onClick={handleVerifyEmail} data-testid="git3-verify-email"
                      className={`git3-verify${emailVerified ? ' git3-verify-done' : ''}`} aria-live="polite">
                      {emailVerified ? 'Verified ✓' : 'Verify Email'}
                    </button>
                  </div>
                  {validationErrors.email && <p className="git3-err" data-testid="git3-error-email">{validationErrors.email}</p>}
                </div>

                <div className="git3-field git3-span-12">
                  <label htmlFor="git3-role" className="git3-label">Role{req}</label>
                  <input id="git3-role" type="text" name="role" placeholder="Your role or designation" autoComplete="organization-title"
                    value={formData.role} onChange={handleInputChange} className={fieldClass('role')} data-testid="git3-input-role" />
                  {validationErrors.role && <p className="git3-err" data-testid="git3-error-role">{validationErrors.role}</p>}
                </div>

                <div className="git3-field git3-span-12">
                  <div className="git3-label-row">
                    <label htmlFor="git3-message" className="git3-label">Tell us about your project{req}</label>
                    <span className="git3-counter" data-testid="git3-char-counter">{formData.message.length} / {MAX_DETAILS}</span>
                  </div>
                  <textarea id="git3-message" name="message" rows={6} maxLength={MAX_DETAILS}
                    placeholder="Tell us about your project, objectives, requirements, challenges or what you would like BluBridge to help you build."
                    value={formData.message} onChange={handleInputChange}
                    className={`${fieldClass('message')} git3-textarea`} data-testid="git3-input-message" />
                  {validationErrors.message && <p className="git3-err" data-testid="git3-error-message">{validationErrors.message}</p>}
                </div>
              </div>

              <div className="git3-form-foot">
                <div className="git3-form-foot-text">
                  <label className="git3-consent">
                    <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent}
                      onChange={handleInputChange} data-testid="git3-checkbox-consent" />
                    <span>I&rsquo;d like to receive occasional updates about BluBridge products and services.</span>
                  </label>
                  <p className="git3-legal" data-testid="git3-legal">
                    By submitting this form, you agree that BluBridge may process the information provided to respond to your enquiry in accordance with our{' '}
                    <Link to="/policies/privacy-policy" data-testid="git3-privacy-link">Privacy Policy</Link>.
                  </p>
                  {submitSuccess && (
                    <p className="git3-success" role="status" data-testid="git3-success-message">
                      Thanks for getting in touch. Your enquiry has been received and our team will get back to you shortly.
                    </p>
                  )}
                  {submitError && (
                    <p className="git3-err git3-err-submit" role="alert" data-testid="git3-submit-error">{submitError}</p>
                  )}
                </div>
                <button type="submit" disabled={isSubmitting} className="git3-submit" data-testid="git3-submit">
                  {isSubmitting ? 'Sending…' : 'Talk with our team'}
                  <span className="git3-submit-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default GetInTouchV4;
