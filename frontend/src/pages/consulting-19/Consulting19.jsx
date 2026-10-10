import React, { useEffect, useRef, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import { useWizardSubmission } from '../ai-consulting/useWizardSubmission';
import { FormField, FieldError } from '../ai-consulting/FormField';
import { focusError } from '../ai-consulting/fieldUtils';
import { clearAccidentalQuery } from '../ai-consulting/clearAccidentalQuery';
import { services, optionLabel } from '../ai-consulting/options';
import './Consulting19.css';

/* /consulting-19 — dark hero + form card and "What happens next" card. Posts to /api/ai-consulting-enquiries with formVariant "consulting-19". */

const NOT_SURE = 'Not sure — I need guidance';
const SERVICES = [...services.slice(0, 6).map(([, value]) => value), NOT_SURE];
const label = v => (v === NOT_SURE ? 'Not Sure' : optionLabel(v));
const STEPS = ['We review your request.', 'We reach out to schedule a conversation.', 'We recommend a clear, practical next step.'];
const EMPTY = { name: '', organization: '', email: '', phone: '', services: [], details: '', source: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SERVER_TO_FORM = { fullName: 'name', company: 'organization', workEmail: 'email', requirement: 'details', sourceText: 'source' };

const validate = f => {
  const e = {};
  if (!f.name.trim()) e.name = 'Please enter your full name.';
  if (!f.email.trim()) e.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.phone.trim() && (!/^[+\d\s().-]{6,40}$/.test(f.phone.trim()) || !/^\d{6,15}$/.test(f.phone.replace(/\D/g, '')))) e.phone = 'Please enter a valid phone number.';
  if (!f.services.length) e.services = 'Please select at least one service.';
  if (!f.details.trim()) e.details = 'Please enter your project details.';
  return e;
};

const toggle = (list, v) => {
  if (list.includes(v)) return list.filter(x => x !== v);
  if (v === NOT_SURE) return [NOT_SURE];
  return [...list.filter(x => x !== NOT_SURE), v];
};

export default function Consulting19() {
  const submission = useWizardSubmission();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const success = useRef(null);
  const disabled = submission.isSubmitting || Boolean(submission.receipt);
  useDocumentTitle('Request a Consultation | BluBridge AI Consulting');
  useMetaDescription('Tell BluBridge about your organization and what you need. We will review your request and follow up with practical next steps.');
  useEffect(() => { clearAccidentalQuery(); }, []);
  useEffect(() => {
    if (submission.receipt) { success.current?.focus({ preventScroll: true }); success.current?.scrollIntoView({ block: 'center', behavior: 'instant' }); }
  }, [submission.receipt]);

  const set = (name, value) => {
    if (disabled) return;
    submission.clearSubmission();
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };
  const change = e => set(e.target.name, e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (disabled) return;
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) { focusError(v); return; }
    const t = k => form[k].trim();
    const payload = { formVariant: 'consulting-19', fullName: t('name'), workEmail: t('email').toLowerCase(), services: form.services, requirement: t('details'), contactPermission: true };
    if (t('organization')) payload.company = t('organization');
    if (t('phone')) payload.phone = t('phone');
    if (t('source')) payload.sourceText = t('source');
    submission.submit(payload, serverErrors => {
      const mapped = Object.fromEntries(Object.entries(serverErrors).map(([k, msg]) => [SERVER_TO_FORM[k] || k, msg]));
      setErrors(mapped); focusError(mapped);
    });
  };

  const field = (name, text, required = false, type = 'text', autoComplete = 'off', maxLength = 200, placeholder = '') => <FormField name={name} label={text} required={required} type={type}
    autoComplete={autoComplete} maxLength={maxLength} placeholder={placeholder} value={form[name]} onChange={change} error={errors[name]} disabled={disabled} />;

  return <div className="c19-page" data-testid="consulting19-page">
    <section className="c19-hero" data-testid="c19-hero">
      <div className="c19-wrap">
        <p className="c19-eyebrow" data-testid="c19-eyebrow">GET STARTED</p>
        <h1 className="c19-title" data-testid="c19-heading">Request a Consultation</h1>
        <p className="c19-sub" data-testid="c19-subtext">Tell us about your organization and what you need. We will review your request and follow up with practical next steps.</p>
      </div>
      <div className="c19-accent" aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <span key={i} />)}</div>
    </section>

    <section className="c19-body">
      <div className="c19-wrap c19-grid">
        <form className="c19-card c19-form" method="post" noValidate onSubmit={handleSubmit} aria-busy={submission.isSubmitting} aria-label="Request a consultation" data-testid="c19-form">
          {submission.receipt && <div ref={success} tabIndex={-1} className="c19-confirmation" role="status" data-testid="c19-success">
            <p className="font-semibold">Successfully Submitted</p>
            <p>Your consultation request has been received. Our team will be in touch shortly.</p>
          </div>}
          <fieldset className="c19-fieldset" disabled={disabled}>
            <div className="c19-two">
              {field('name', 'Full name', true, 'text', 'name')}
              {field('organization', 'Organization', false, 'text', 'organization')}
              {field('email', 'Email', true, 'email', 'email', 254)}
              {field('phone', 'Phone', false, 'tel', 'tel', 40)}
            </div>
            <fieldset className="c19-services" aria-describedby={errors.services ? 'aic-services-error' : undefined} data-testid="c19-services">
              <legend className="aic-label">Which services are you interested in?<span className="c19-req" aria-hidden="true"> *</span></legend>
              <div className="c19-checks">
                {SERVICES.map((s, i) => { const on = form.services.includes(s); return <label key={s} htmlFor={i === 0 ? 'aic-services' : `c19-service-${i}`} className={`c19-check${on ? ' c19-check-on' : ''}${errors.services ? ' c19-check-invalid' : ''}`}>
                  <input id={i === 0 ? 'aic-services' : `c19-service-${i}`} type="checkbox" checked={on} onChange={() => set('services', toggle(form.services, s))} data-testid={`c19-service-${i}`} />
                  <span className="c19-box" aria-hidden="true"><Check /></span><span>{label(s)}</span>
                </label>; })}
              </div>
              <FieldError name="services" error={errors.services} />
            </fieldset>
            <div className="c19-stack">
              {field('details', 'Project details', true, 'textarea', 'off', 5000, 'What are you working on, and where do things feel stuck?')}
              {field('source', 'How did you hear about us?', false, 'text', 'off', 300)}
            </div>
            <button type="submit" className="c19-submit" disabled={disabled} aria-busy={submission.isSubmitting} data-testid="c19-submit">
              {submission.isSubmitting && <Loader2 className="animate-spin" aria-hidden="true" />}
              <span aria-live="polite">{submission.receipt ? 'Request Submitted' : submission.isSubmitting ? 'Submitting…' : 'Request a Consultation'}</span>
            </button>
          </fieldset>
          {submission.submitError && <p className="aic-error" role="alert" data-testid="c19-submit-error">{submission.submitError}</p>}
        </form>

        <aside className="c19-card c19-next" aria-labelledby="c19-next-title" data-testid="c19-next">
          <h2 id="c19-next-title" className="c19-next-title">What happens next</h2>
          <ol className="c19-steps">{STEPS.map((s, i) => <li key={s} data-testid={`c19-step-${i}`}>{s}</li>)}</ol>
        </aside>
      </div>
    </section>
  </div>;
}
