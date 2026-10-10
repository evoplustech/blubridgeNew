import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import './Consulting9.css';
import { API_ORIGIN } from '../../apiOrigin';

/* /consulting-9 — 55/45 split lead-gen page. Saves to Admin → Contact Forms (formVariant "consulting-9"). */

const BENEFITS = ['Practical AI guidance', 'Solutions aligned with your business', 'Clear next steps'];
const SERVICES = ['AI Strategy', 'Generative AI', 'AI Automation', 'AI Solution Development', 'Data & Analytics', 'Not Sure — Need Guidance'];
const NOT_SURE = SERVICES[SERVICES.length - 1];
const EMPTY = { services: [], details: '', name: '', email: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FOCUS_ID = { services: 'c9-service-0', details: 'c9-details', name: 'c9-name', email: 'c9-email' };

const validate = f => {
  const e = {};
  if (!f.services.length) e.services = 'Please choose at least one option.';
  if (!f.details.trim()) e.details = 'Please tell us briefly what you need.';
  if (!f.name.trim()) e.name = 'Please enter your full name.';
  if (!f.email.trim()) e.email = 'Please enter your work email.';
  else if (!EMAIL_RE.test(f.email.trim()) || f.email.trim().length > 254) e.email = 'Please enter a valid email address.';
  return e;
};

const toggleService = (list, s) => {
  if (list.includes(s)) return list.filter(x => x !== s);
  if (s === NOT_SURE) return [NOT_SURE];
  return [...list.filter(x => x !== NOT_SURE), s];
};

function trackLead() {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', form_name: 'ai_consulting_google_ads' });
  } catch { /* tracking must never break the form */ }
}

const ErrorText = ({ id, error }) => (error ? <p id={`${id}-error`} className="c9-error" role="alert" data-testid={`c9-error-${id}`}>{error}</p> : null);

function Intro() {
  return (
    <div className="c9-intro">
      <p className="c9-eyebrow" data-testid="c9-eyebrow">AI Consulting</p>
      <h1 className="c9-title" data-testid="c9-headline">Build the Right AI Solution for Your Business</h1>
      <p className="c9-lead" data-testid="c9-lead">Tell us what you’re trying to achieve. Our AI consultants will help you identify the right approach and next steps.</p>
      <ul className="c9-benefits" data-testid="c9-benefits">
        {BENEFITS.map((b, i) => (
          <li key={b} data-testid={`c9-benefit-${i}`}><span className="c9-tick" aria-hidden="true"><Check size={13} strokeWidth={3} /></span>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function Success() {
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus({ preventScroll: true }); ref.current?.scrollIntoView({ block: 'center' }); }, []);
  return (
    <div ref={ref} tabIndex={-1} role="status" className="c9-success" data-testid="c9-success">
      <span className="c9-success-icon" aria-hidden="true"><Check size={20} strokeWidth={2.6} /></span>
      <h2 className="c9-card-title">Thank you — we’ve received it.</h2>
      <p className="c9-card-sub">An AI consultant will review your requirement and get back to you shortly.</p>
      <Link to="/" className="c9-link-home" data-testid="c9-back-home">Back to BluBridge <ArrowRight size={15} aria-hidden="true" /></Link>
    </div>
  );
}

export default function Consulting9() {
  useDocumentTitle('AI Consulting | Talk to an AI Consultant | BluBridge');
  useMetaDescription('Tell BluBridge what you are trying to achieve. Our AI consultants will help you identify the right approach and next steps.');
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);

  const set = (name, value) => {
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => { const n = { ...e }; delete n[name]; return n; });
    if (submitError) setSubmitError('');
  };
  const onInput = e => set(e.target.name, e.target.value);
  const aria = id => ({ 'aria-invalid': Boolean(errors[id]), 'aria-describedby': errors[id] ? `${id}-error` : undefined });

  const onSubmit = async e => {
    e.preventDefault();
    if (submitting) return;
    const v = validate(form);
    setErrors(v);
    const firstKey = Object.keys(v)[0];
    if (firstKey) {
      const el = document.getElementById(FOCUS_ID[firstKey]);
      el?.focus({ preventScroll: true });
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    const [firstName, ...rest] = form.name.trim().split(/\s+/);
    const body = {
      type: 'contact_us', formVariant: 'consulting-9',
      firstName: firstName.slice(0, 120),
      email: form.email.trim().toLowerCase(),
      enquiryCategory: form.services.join(', '),
      message: form.details.trim(),
    };
    if (rest.length) body.lastName = rest.join(' ').slice(0, 120);
    try {
      const res = await fetch(`${API_ORIGIN}/api/contacts/submit`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      if (res.ok) { trackLead(); setForm(EMPTY); setDone(true); }
      else if (res.status === 409) setSubmitError('We’ve just received a request from this email. Please wait a minute before sending another.');
      else if (res.status === 429) setSubmitError('Too many attempts. Please wait a moment and try again.');
      else setSubmitError('Something went wrong on our side. Please try again.');
    } catch {
      setSubmitError('We couldn’t reach our server. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="c9-page" data-testid="consulting9-page">
      <div className="c9-shell">
        <Intro />
        <div className="c9-card" data-testid="c9-card">
          {done ? <Success /> : (
            <form onSubmit={onSubmit} noValidate aria-busy={submitting} aria-labelledby="c9-form-title" data-testid="c9-form">
              <h2 id="c9-form-title" className="c9-card-title" data-testid="c9-form-title">Talk to an AI Consultant</h2>
              <p className="c9-card-sub">Tell us a little about your requirement.</p>

              <fieldset className="c9-group" aria-describedby={errors.services ? 'services-error' : undefined}>
                <legend className="c9-label">What can we help you with? <span className="c9-req" aria-hidden="true">*</span></legend>
                <div className="c9-chips" aria-invalid={Boolean(errors.services)}>
                  {SERVICES.map((s, i) => {
                    const on = form.services.includes(s);
                    return (
                      <button key={s} id={`c9-service-${i}`} type="button" aria-pressed={on} disabled={submitting}
                        onClick={() => set('services', toggleService(form.services, s))}
                        className={`c9-chip${on ? ' c9-chip-on' : ''}${errors.services ? ' c9-chip-invalid' : ''}`}
                        data-testid={`c9-service-${i}`}>
                        <span className="c9-chip-box" aria-hidden="true">{on && <Check size={12} strokeWidth={3} />}</span>
                        <span>{s}</span>
                      </button>
                    );
                  })}
                </div>
                <ErrorText id="services" error={errors.services} />
              </fieldset>

              <div className="c9-group">
                <label htmlFor="c9-details" className="c9-label">Briefly tell us what you need <span className="c9-req" aria-hidden="true">*</span></label>
                <textarea id="c9-details" name="details" rows={3} maxLength={4000} value={form.details} onChange={onInput} disabled={submitting}
                  placeholder="What are you looking to build, improve, or automate?"
                  className={`c9-input c9-textarea${errors.details ? ' c9-input-invalid' : ''}`} {...aria('details')} data-testid="c9-input-details" />
                <ErrorText id="details" error={errors.details} />
              </div>

              <div className="c9-row">
                {[['name', 'Full Name', 'text', 'name', 200], ['email', 'Work Email', 'email', 'email', 254]].map(([name, label, type, auto, max]) => (
                  <div key={name} className="c9-group">
                    <label htmlFor={`c9-${name}`} className="c9-label">{label} <span className="c9-req" aria-hidden="true">*</span></label>
                    <input id={`c9-${name}`} name={name} type={type} autoComplete={auto} maxLength={max} value={form[name]} onChange={onInput} disabled={submitting}
                      inputMode={type === 'email' ? 'email' : undefined}
                      className={`c9-input${errors[name] ? ' c9-input-invalid' : ''}`} {...aria(name)} data-testid={`c9-input-${name}`} />
                    <ErrorText id={name} error={errors[name]} />
                  </div>
                ))}
              </div>

              {submitError && <p className="c9-submit-error" role="alert" data-testid="c9-submit-error">{submitError}</p>}

              <button type="submit" className="c9-submit" disabled={submitting} aria-busy={submitting} data-testid="c9-submit">
                {submitting ? <><Loader2 size={17} className="animate-spin" aria-hidden="true" /> Sending…</> : <>Get AI Consultation <ArrowRight size={17} aria-hidden="true" /></>}
              </button>
              <p className="c9-reassure" data-testid="c9-reassurance">No obligation. We’ll review your requirement and get back to you.</p>
              <p className="c9-privacy"><Link to="/policies/privacy-policy" data-testid="c9-privacy-link">Privacy Policy</Link></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
