import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ArrowRight } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import { useWizardSubmission } from '../ai-consulting/useWizardSubmission';
import { FormField, FieldError, RequiredMark } from '../ai-consulting/FormField';
import { focusError } from '../ai-consulting/fieldUtils';
import { clearAccidentalQuery } from '../ai-consulting/clearAccidentalQuery';
import { enquiryDescription } from '../ai-consulting/introCopy';
import './Consulting13.css';

/* /consulting-13 — ADC-style contact page layout with a short contact form. Posts to /api/ai-consulting-enquiries (formVariant "consulting-13"). */

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

  const toForm = () => {
    document.getElementById('c13-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => document.getElementById('aic-first-name')?.focus({ preventScroll: true }), 450);
  };

  return <div className="c13-page" data-testid="consulting13-page">
    <section className="c13-hero" aria-labelledby="c13-title">
      <span className="c13-deco" aria-hidden="true" />
      <div className="c13-wrap">
        <p className="c13-kicker" data-testid="c13-kicker">Contact</p>
        <h1 id="c13-title" className="c13-title" data-testid="c13-heading">Let’s start your <br className="c13-br" />journey with us</h1>
      </div>
    </section>

    <section className="c13-wrap c13-main">
      <form id="c13-form" className="c13-form" method="post" noValidate onSubmit={handleSubmit} aria-busy={submission.isSubmitting} aria-labelledby="c13-form-heading" data-testid="c13-form">
        <h2 id="c13-form-heading" className="c13-form-title">Send us a message</h2>
        {submission.receipt && <div ref={success} tabIndex={-1} className="c13-confirmation" role="status" data-testid="c13-success">
          <p className="font-semibold">Successfully Submitted</p>
          <p>Your message has been received. Our team will be in touch shortly.</p>
        </div>}
        <fieldset className="c13-fieldset" disabled={disabled}>
          <div className="c13-grid" data-testid="c13-fields">
            {FIELDS.map(field)}
            <div className="c13-full">{field(['email', 'Email', true, 'email', 'email', 254])}</div>
            <div className="c13-full">{field(['subject', 'Subject', true, 'text', 'off', 300])}</div>
            <div className="c13-full">{field(['message', 'Message', true, 'textarea', 'off', 5000])}</div>
          </div>
          <div className="c13-terms" data-testid="c13-section-terms">
            <label className="c13-check" htmlFor="aic-terms">
              <input id="aic-terms" name="terms" type="checkbox" required checked={form.terms} onChange={change} aria-invalid={Boolean(errors.terms)} aria-describedby={errors.terms ? 'aic-terms-error' : undefined} data-testid="c13-terms" />
              <span>I accept the <Link to="/policies/terms-conditions" target="_blank" rel="noopener noreferrer" data-testid="c13-terms-link">terms and conditions</Link><RequiredMark /></span>
            </label>
            <FieldError name="terms" error={errors.terms} />
          </div>
          <button type="submit" className="c13-pill c13-pill-solid" disabled={disabled} aria-busy={submission.isSubmitting} data-testid="c13-submit">
            {submission.isSubmitting && <Loader2 className="animate-spin" aria-hidden="true" />}
            <span aria-live="polite">{submission.receipt ? 'Submitted' : submission.isSubmitting ? 'Submitting…' : 'Submit'}</span>
          </button>
        </fieldset>
        {submission.submitError && <p className="aic-error c13-submit-error" role="alert" data-testid="c13-submit-error">{submission.submitError}</p>}
      </form>
    </section>

    <section className="c13-cta" aria-labelledby="c13-cta-title" data-testid="c13-cta">
      <div className="c13-wrap c13-cta-inner">
        <h2 id="c13-cta-title" className="c13-cta-title">Connect with our experts</h2>
        <div>
          <p className="c13-cta-text">Whether you are exploring your first AI use case or scaling a system in production, BluBridge works alongside your team, from strategy through to deployment, to build AI that delivers real results.</p>
          <button type="button" onClick={toForm} className="c13-pill c13-pill-light" data-testid="c13-cta-contact">Contact us <ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  </div>;
}
