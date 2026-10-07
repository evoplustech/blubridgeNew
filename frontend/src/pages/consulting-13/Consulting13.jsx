import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import { useWizardSubmission } from '../ai-consulting/useWizardSubmission';
import { FormField, FieldError, RequiredMark } from '../ai-consulting/FormField';
import { focusError } from '../ai-consulting/fieldUtils';
import { clearAccidentalQuery } from '../ai-consulting/clearAccidentalQuery';
import { enquiryHeading, enquiryDescription } from '../ai-consulting/introCopy';
import '../ai-consulting/AiConsulting.css';
import '../ai-consulting-base/Dropdowns.css';

/* /consulting-13 — copy of /consulting with a short contact form. Posts to /api/ai-consulting-enquiries (formVariant "consulting-13"). */

const EMPTY = { firstName: '', lastName: '', company: '', phone: '', email: '', subject: '', message: '', terms: false };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SERVER_TO_FORM = { workEmail: 'email', requirement: 'message', termsAccepted: 'terms', fullName: 'firstName' };

const validate = f => {
  const e = {};
  if (!f.company.trim()) e.company = 'Please enter your company name.';
  if (f.phone.trim() && (!/^[+\d\s().-]{6,40}$/.test(f.phone.trim()) || !/^\d{6,15}$/.test(f.phone.replace(/\D/g, '')))) e.phone = 'Please enter a valid phone number.';
  if (!f.email.trim()) e.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (!f.subject.trim()) e.subject = 'Please enter a subject.';
  if (!f.message.trim()) e.message = 'Please enter a message.';
  if (!f.terms) e.terms = 'Please accept the terms and conditions.';
  return e;
};

const FIELDS = [
  ['firstName', 'First name', false, 'text', 'given-name', 120],
  ['lastName', 'Last name', false, 'text', 'family-name', 120],
  ['company', 'Company name', true, 'text', 'organization', 200],
  ['phone', 'Phone number', false, 'tel', 'tel', 40],
];

export default function Consulting13() {
  const submission = useWizardSubmission();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const success = useRef(null);
  const disabled = submission.isSubmitting || Boolean(submission.receipt);
  useDocumentTitle('AI Consulting Services | Tailored AI Systems | BluBridge');
  useMetaDescription(enquiryDescription);
  useEffect(() => { clearAccidentalQuery(); }, []);
  useEffect(() => {
    if (submission.receipt) { success.current?.focus({ preventScroll: true }); success.current?.scrollIntoView({ block: 'center', behavior: 'instant' }); }
  }, [submission.receipt]);

  const change = e => {
    if (disabled) return;
    const { name, value, type, checked } = e.target;
    submission.clearSubmission();
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (disabled) return;
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) { focusError(v); return; }
    const t = k => form[k].trim();
    const payload = {
      formVariant: 'consulting-13',
      fullName: [t('firstName'), t('lastName')].filter(Boolean).join(' ') || t('company'),
      workEmail: t('email').toLowerCase(), company: t('company'), subject: t('subject'), requirement: t('message'),
      termsAccepted: true, contactPermission: true,
    };
    if (t('firstName')) payload.firstName = t('firstName');
    if (t('lastName')) payload.lastName = t('lastName');
    if (t('phone')) payload.phone = t('phone');
    submission.submit(payload, serverErrors => {
      const mapped = Object.fromEntries(Object.entries(serverErrors).map(([k, msg]) => [SERVER_TO_FORM[k] || k, msg]));
      setErrors(mapped); focusError(mapped);
    });
  };

  const field = ([name, label, required, type, autoComplete, maxLength]) => <FormField key={name} name={name} label={label} required={required} type={type} autoComplete={autoComplete} maxLength={maxLength}
    placeholder={label} value={form[name]} onChange={change} error={errors[name]} disabled={disabled} />;

  return <section className="aic-page aic-base-smooth-page" data-testid="consulting13-page">
    <div className="aic-container">
      <header className="aic-intro">
        <p className="aic-eyebrow" data-testid="aic-eyebrow">GET IN TOUCH</p>
        <h1 className="aic-heading" data-testid="aic-heading">{enquiryHeading}</h1>
        <p className="aic-subtitle" data-testid="aic-subtitle">{enquiryDescription}</p>
      </header>
      <form className="aic-form-surface" method="post" noValidate onSubmit={handleSubmit} aria-busy={submission.isSubmitting} aria-labelledby="aic-form-heading" data-testid="c13-form">
        <h2 id="aic-form-heading" className="sr-only">Contact form</h2>
        {submission.receipt && <div ref={success} tabIndex={-1} className="aic-confirmation" role="status" data-testid="c13-success">
          <p className="font-semibold">Successfully Submitted</p>
          <p>Your message has been received. Our team will be in touch shortly.</p>
        </div>}
        <fieldset className="aic-submit-fields" disabled={disabled}>
          <section className="aic-form-section" aria-label="Your details" data-testid="c13-fields">
            <div className="aic-two-columns">
              {FIELDS.map(field)}
              <div className="aic-full-width">{field(['email', 'Email', true, 'email', 'email', 254])}</div>
              <div className="aic-full-width">{field(['subject', 'Subject', true, 'text', 'off', 300])}</div>
              <div className="aic-full-width">{field(['message', 'Message', true, 'textarea', 'off', 5000])}</div>
            </div>
          </section>
          <section className="aic-form-section" aria-label="Terms and conditions" data-testid="c13-section-terms">
            <label className="aic-choice aic-permission" htmlFor="aic-terms">
              <input id="aic-terms" name="terms" type="checkbox" required checked={form.terms} onChange={change} aria-invalid={Boolean(errors.terms)} aria-describedby={errors.terms ? 'aic-terms-error' : undefined} data-testid="c13-terms" />
              <span className="aic-base-consent-copy">I accept the <Link to="/policies/terms-conditions" target="_blank" rel="noopener noreferrer" data-testid="c13-terms-link">terms and conditions</Link><RequiredMark /></span>
            </label>
            <FieldError name="terms" error={errors.terms} />
          </section>
          <div className="aic-actions"><Button type="submit" className="aic-primary" disabled={disabled} aria-busy={submission.isSubmitting} data-testid="c13-submit">
            {submission.isSubmitting && <Loader2 className="aic-base-submit-spinner" aria-hidden="true" />}
            <span aria-live="polite">{submission.receipt ? 'Submitted' : submission.isSubmitting ? 'Submitting…' : 'Submit'}</span>
          </Button></div>
        </fieldset>
        {submission.submitError && <p className="aic-error aic-submit-error" role="alert" data-testid="c13-submit-error">{submission.submitError}</p>}
      </form>
    </div>
  </section>;
}
