import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';
const API_URL = process.env.REACT_APP_BACKEND_URL;

/* /get-in-touch-6 — minimal two-column contact page: heading left, project enquiry form right.
   Styles scoped under .git7-* (index.css). Backend: POST /api/project-enquiries */

const MAX_MESSAGE = 1000;
const budgetRanges = ['Under 10,000', '10,000–50,000', '50,000–100,000', '100,000–500,000', '500,000+'];
const budgetCurrencies = ['₹', '$', '€'];

const countries = [
  'India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Singapore', 'Australia', 'Canada',
  'Germany', 'France', 'Netherlands', 'Switzerland', 'Ireland', 'Spain', 'Italy', 'Sweden', 'Norway', 'Denmark',
  'Japan', 'South Korea', 'Malaysia', 'Indonesia', 'Saudi Arabia', 'Qatar', 'South Africa', 'Brazil', 'Mexico',
  'New Zealand', 'Israel', 'Sri Lanka', 'Other',
];

const emptyForm = {
  fullName: '', email: '', phone: '', company: '', jobTitle: '', country: '', city: '', message: '',
  budgetCurrency: '₹', budgetRange: '',
  privacyConsent: false, marketingConsent: false,
};

const Field = ({ id, label, required, error, children, full }) => (
  <div className={`git7-field${full ? ' git7-field-full' : ''}`}>
    <label htmlFor={id} className="git7-label">
      {label} <span className={required ? 'git7-req' : 'git7-opt'}>{required ? '(required)' : '(optional)'}</span>
    </label>
    {children}
    {error && <p id={`${id}-error`} className="git7-err" data-testid={`git7-error-${id}`}>{error}</p>}
  </div>
);

const GetInTouchV7 = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useDocumentTitle('Get in Touch | BluBridge');
  useMetaDescription('Have a project, technology requirement or collaboration in mind? Tell us what you are working on and connect with the BluBridge team.');

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePhone = (p) => /^[0-9]{6,15}$/.test(p.replace(/[^0-9]/g, ''));

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const er = {};
    if (!formData.fullName.trim()) er.fullName = 'Full name is required';
    if (!formData.email.trim()) er.email = 'Email is required';
    else if (!validateEmail(formData.email.trim())) er.email = 'Please enter a valid email address';
    if (!formData.phone.trim()) er.phone = 'Phone is required';
    else if (!validatePhone(formData.phone)) er.phone = 'Please enter a valid phone number (6-15 digits)';
    if (!formData.company.trim()) er.company = 'Company is required';
    if (!formData.jobTitle.trim()) er.jobTitle = 'Job title is required';
    if (!formData.city.trim()) er.city = 'City is required';
    if (!budgetRanges.includes(formData.budgetRange)) er.budgetRange = 'Please select a budget range';
    if (formData.message.trim().length > MAX_MESSAGE) er.message = `Please keep this under ${MAX_MESSAGE} characters`;
    if (!formData.privacyConsent) er.privacyConsent = 'Please accept the privacy policy to continue';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError(''); setSubmitSuccess(false);
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/project-enquiries`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(), email: formData.email.trim().toLowerCase(), phone: formData.phone.trim(),
          company: formData.company.trim(), jobTitle: formData.jobTitle.trim(), country: formData.country || null,
          city: formData.city.trim(), message: formData.message.trim() || null,
          budget: `${formData.budgetCurrency} ${formData.budgetRange}`,
          privacyConsent: formData.privacyConsent, marketingConsent: formData.marketingConsent,
        }),
      });
      if (res.ok) { setSubmitSuccess(true); setFormData(emptyForm); setErrors({}); }
      else if (res.status === 409) setSubmitError('You have already submitted an enquiry recently. Please wait a moment before trying again.');
      else setSubmitError('We couldn\u2019t send your enquiry. Please try again.');
    } catch {
      setSubmitError('We couldn\u2019t send your enquiry. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  const cls = (n) => `git7-input${errors[n] ? ' git7-input-error' : ''}`;

  return (
    <div className="git7-page" data-testid="get-in-touch-v7-page">
      <section className="git7-section">
        <div className="bb-container">
          <div className="git7-grid">

            <div className="git7-intro">
              <span className="git7-eyebrow" data-testid="git7-eyebrow">GET IN TOUCH</span>
              <h1 className="git7-title" data-testid="git7-heading">Let&rsquo;s build what&rsquo;s next.</h1>
              <p className="git7-lede" data-testid="git7-lede">
                Have a project, technology requirement or collaboration in mind? Tell us what you&rsquo;re working on and connect with the BluBridge team.
              </p>
            </div>

            <form onSubmit={onSubmit} className="git7-form" data-testid="git7-form" noValidate>
              <Field id="fullName" label="Full name" required error={errors.fullName} full>
                <input id="fullName" name="fullName" type="text" placeholder="Full name" autoComplete="name" value={formData.fullName} onChange={onChange} className={cls('fullName')} data-testid="git7-input-full-name" />
              </Field>
              <Field id="email" label="Email" required error={errors.email}>
                <input id="email" name="email" type="email" placeholder="name@company.com" autoComplete="email" value={formData.email} onChange={onChange} className={cls('email')} data-testid="git7-input-email" />
              </Field>
              <Field id="phone" label="Phone" required error={errors.phone}>
                <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" autoComplete="tel" value={formData.phone} onChange={onChange} className={cls('phone')} data-testid="git7-input-phone" />
              </Field>
              <Field id="company" label="Company" required error={errors.company}>
                <input id="company" name="company" type="text" placeholder="Company name" autoComplete="organization" value={formData.company} onChange={onChange} className={cls('company')} data-testid="git7-input-company" />
              </Field>
              <Field id="jobTitle" label="Job title" required error={errors.jobTitle}>
                <input id="jobTitle" name="jobTitle" type="text" placeholder="Your role or designation" autoComplete="organization-title" value={formData.jobTitle} onChange={onChange} className={cls('jobTitle')} data-testid="git7-input-job-title" />
              </Field>
              <Field id="country" label="Country">
                <select id="country" name="country" value={formData.country} onChange={onChange} className={`git7-input git7-select${formData.country ? '' : ' git7-select-empty'}`} data-testid="git7-select-country">
                  <option value="">Select country</option>
                  {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field id="city" label="City" required error={errors.city}>
                <input id="city" name="city" type="text" placeholder="City name" autoComplete="address-level2" value={formData.city} onChange={onChange} className={cls('city')} data-testid="git7-input-city" />
              </Field>
              <Field id="budget-range" label="Budget" required error={errors.budgetRange} full>
                <div className="git7-budget-controls" data-testid="git7-budget-row">
                  <select name="budgetCurrency" aria-label="Budget currency" required value={formData.budgetCurrency} onChange={onChange} className="git7-input git7-select" data-testid="git7-budget-currency">
                    {budgetCurrencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
                  </select>
                  <select id="budget-range" name="budgetRange" required aria-invalid={Boolean(errors.budgetRange)} aria-describedby={errors.budgetRange ? 'budget-range-error' : undefined} value={formData.budgetRange} onChange={onChange} className={`${cls('budgetRange')} git7-select${formData.budgetRange ? '' : ' git7-select-empty'}`} data-testid="git7-budget-range">
                    <option value="">Select budget range</option>
                    {budgetRanges.map(range => <option key={range} value={range}>{range}</option>)}
                  </select>
                </div>
              </Field>
              <Field id="message" label="Message" error={errors.message} full>
                <textarea id="message" name="message" rows={5} maxLength={MAX_MESSAGE} placeholder="Add details about your project…" value={formData.message} onChange={onChange} className={`${cls('message')} git7-textarea`} data-testid="git7-input-message" />
                <div className="git7-counter" data-testid="git7-char-counter">{formData.message.length} / {MAX_MESSAGE}</div>
              </Field>

              <div className="git7-field-full git7-consents">
                <label className="git7-consent">
                  <input type="checkbox" name="privacyConsent" checked={formData.privacyConsent} onChange={onChange} data-testid="git7-checkbox-privacy" />
                  <span>
                    By submitting, you consent to BluBridge processing your information in accordance with our{' '}
                    <Link to="/policies/privacy-policy" data-testid="git7-privacy-link">Privacy Policy</Link>. <span className="git7-star">*</span>
                  </span>
                </label>
                {errors.privacyConsent && <p className="git7-err" data-testid="git7-error-privacy">{errors.privacyConsent}</p>}
                <label className="git7-consent">
                  <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent} onChange={onChange} data-testid="git7-checkbox-marketing" />
                  <span>Yes, I would like to receive occasional updates from BluBridge. I may unsubscribe at any time.</span>
                </label>
              </div>

              {submitSuccess && (
                <p className="git7-success git7-field-full" role="status" data-testid="git7-success-message">
                  Thanks for getting in touch. Your enquiry has been received and our team will get back to you shortly.
                </p>
              )}
              {submitError && <p className="git7-err git7-err-submit git7-field-full" role="alert" data-testid="git7-submit-error">{submitError}</p>}

              <div className="git7-field-full">
                <button type="submit" disabled={isSubmitting} className="git7-submit" data-testid="git7-submit">
                  {isSubmitting ? 'Sending…' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInTouchV7;
