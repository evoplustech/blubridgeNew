import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import './Consulting10.css';

/* /consulting-10 — asymmetric two-column consultation page. Saves to Admin → Contact Forms (formVariant "consulting-10"). */

const CAPABILITIES = [
  ['AI Strategy', 'Identify high-value AI opportunities and build a practical roadmap.'],
  ['Generative AI', 'Design AI experiences using modern generative AI technologies.'],
  ['AI Agents & Automation', 'Automate workflows and business processes with intelligent AI systems.'],
  ['AI Development', 'Turn validated AI ideas into production-ready solutions.'],
];
const GOALS = [
  'Explore where AI can help my business', 'Build a new AI solution', 'Automate a business process',
  'Add AI to an existing product', 'Improve an existing AI solution', 'Not sure yet — I need guidance', 'Other',
];
const NOT_SURE = GOALS[5];
const OTHER = 'Other';
const EMPTY = { goals: [], other: '', details: '', name: '', email: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FOCUS_ID = { goals: 'c10-goal-0', details: 'c10-details', name: 'c10-name', email: 'c10-email' };

const validate = f => {
  const e = {};
  if (!f.goals.length) e.goals = 'Please choose what you’re looking to accomplish.';
  if (!f.details.trim()) e.details = 'Please tell us a little about your idea or challenge.';
  if (!f.name.trim()) e.name = 'Please enter your name.';
  if (!f.email.trim()) e.email = 'Please enter your business email.';
  else if (!EMAIL_RE.test(f.email.trim()) || f.email.trim().length > 254) e.email = 'Please enter a valid business email address.';
  return e;
};

const toggleGoal = (list, g) => {
  if (list.includes(g)) return list.filter(x => x !== g);
  if (g === NOT_SURE) return [NOT_SURE];
  return [...list.filter(x => x !== NOT_SURE), g];
};

function trackLead() {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', form_name: 'ai_consulting_google_ads' });
  } catch { /* tracking must never break the form */ }
}

const ErrorText = ({ id, error }) => (error ? <p id={`${id}-error`} className="c10-error" role="alert" data-testid={`c10-error-${id}`}>{error}</p> : null);

function Message() {
  return (
    <div className="c10-message">
      <p className="c10-eyebrow" data-testid="c10-eyebrow">AI Consulting for Business</p>
      <h1 className="c10-title" data-testid="c10-headline">Turn Your AI Ideas <br className="c10-br" />Into Business Outcomes</h1>
      <p className="c10-lead" data-testid="c10-lead">From identifying the right AI opportunities to building and deploying solutions, BluBridge helps businesses move from ideas to practical implementation.</p>
      <p className="c10-sublead">Share your goal with us and we’ll help determine the right next step.</p>
      <section className="c10-help" aria-labelledby="c10-help-title" data-testid="c10-capabilities">
        <h2 id="c10-help-title" className="c10-help-title">Where We Can Help</h2>
        <ol className="c10-matrix">
          {CAPABILITIES.map(([title, text], i) => (
            <li key={title} className="c10-cap" data-testid={`c10-cap-${i}`}>
              <span className="c10-cap-num">{String(i + 1).padStart(2, '0')}</span>
              <p className="c10-cap-title">{title}</p>
              <p className="c10-cap-text">{text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function Success() {
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus({ preventScroll: true }); ref.current?.scrollIntoView({ block: 'center' }); }, []);
  return (
    <div ref={ref} tabIndex={-1} role="status" className="c10-success" data-testid="c10-success">
      <span className="c10-success-icon" aria-hidden="true"><Check size={18} strokeWidth={2.6} /></span>
      <h2 className="c10-panel-title">Thank you — your conversation has started.</h2>
      <p className="c10-panel-sub">A BluBridge AI consultant will review what you’ve shared and get back to you shortly.</p>
      <Link to="/" className="c10-home" data-testid="c10-back-home">Back to BluBridge <ArrowRight size={15} aria-hidden="true" /></Link>
    </div>
  );
}

export default function Consulting10() {
  useDocumentTitle('AI Consulting for Business | BluBridge');
  useMetaDescription('BluBridge helps businesses identify, build and put practical AI solutions to work — from AI strategy and generative AI to AI agents, automation and development.');
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);
  const hasOther = form.goals.includes(OTHER);

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
    const goals = form.goals.map(g => (g === OTHER && form.other.trim() ? `Other: ${form.other.trim()}` : g));
    const body = {
      type: 'contact_us', formVariant: 'consulting-10',
      firstName: firstName.slice(0, 120),
      email: form.email.trim().toLowerCase(),
      enquiryCategory: goals.join(', '),
      message: form.details.trim(),
    };
    if (rest.length) body.lastName = rest.join(' ').slice(0, 120);
    try {
      const res = await fetch(`${window.location.origin}/api/contacts/submit`, {
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
    <div className="c10-page" data-testid="consulting10-page">
      <div className="c10-shell">
        <Message />
        <div className="c10-side">
          <div className="c10-panel" data-testid="c10-panel">
            <div className="c10-status" data-testid="c10-status">
              <span className="c10-status-dot" aria-hidden="true" />
              <span className="c10-status-label">AI Consultation</span>
              <span className="c10-status-note">Initial conversation • No technical preparation required</span>
            </div>
            {done ? <Success /> : (
              <form onSubmit={onSubmit} noValidate aria-busy={submitting} aria-labelledby="c10-form-title" data-testid="c10-form">
                <h2 id="c10-form-title" className="c10-panel-title" data-testid="c10-form-title">Have an AI project in mind?</h2>
                <p className="c10-panel-sub">Give us a quick overview. You don’t need a detailed technical specification — just tell us what you’re trying to accomplish.</p>

                <fieldset className="c10-group c10-group-first" aria-describedby={errors.goals ? 'goals-error' : undefined}>
                  <legend className="c10-label">What are you looking to accomplish? <span className="c10-req" aria-hidden="true">*</span></legend>
                  <div className="c10-tiles">
                    {GOALS.map((g, i) => {
                      const on = form.goals.includes(g);
                      return (
                        <button key={g} id={`c10-goal-${i}`} type="button" aria-pressed={on} disabled={submitting}
                          onClick={() => set('goals', toggleGoal(form.goals, g))}
                          className={`c10-tile${on ? ' c10-tile-on' : ''}${errors.goals ? ' c10-tile-invalid' : ''}`} data-testid={`c10-goal-${i}`}>
                          <span>{g}</span>
                          <span className="c10-tile-check" aria-hidden="true">{on && <Check size={11} strokeWidth={3.2} />}</span>
                        </button>
                      );
                    })}
                  </div>
                  {hasOther && (
                    <input id="c10-other" name="other" type="text" maxLength={200} value={form.other} onChange={onInput} disabled={submitting}
                      aria-label="Please specify" placeholder="Please specify (optional)" className="c10-input c10-other" data-testid="c10-input-other" />
                  )}
                  <ErrorText id="goals" error={errors.goals} />
                </fieldset>

                <div className="c10-group">
                  <label htmlFor="c10-details" className="c10-label">What would you like us to know? <span className="c10-req" aria-hidden="true">*</span></label>
                  <textarea id="c10-details" name="details" rows={3} maxLength={4000} value={form.details} onChange={onInput} disabled={submitting}
                    placeholder="Briefly describe your idea, challenge, process or existing solution..."
                    className={`c10-input c10-textarea${errors.details ? ' c10-input-invalid' : ''}`} {...aria('details')} data-testid="c10-input-details" />
                  {errors.details ? <ErrorText id="details" error={errors.details} /> : <p className="c10-helper">No technical details required.</p>}
                </div>

                <div className="c10-group">
                  <p className="c10-details-title">Your Details</p>
                  <div className="c10-row">
                    {[['name', 'Your Name', 'text', 'name', 200], ['email', 'Business Email', 'email', 'email', 254]].map(([name, label, type, auto, max]) => (
                      <div key={name}>
                        <label htmlFor={`c10-${name}`} className="c10-label c10-label-sm">{label} <span className="c10-req" aria-hidden="true">*</span></label>
                        <input id={`c10-${name}`} name={name} type={type} autoComplete={auto} maxLength={max} value={form[name]} onChange={onInput} disabled={submitting}
                          inputMode={type === 'email' ? 'email' : undefined}
                          className={`c10-input${errors[name] ? ' c10-input-invalid' : ''}`} {...aria(name)} data-testid={`c10-input-${name}`} />
                        <ErrorText id={name} error={errors[name]} />
                      </div>
                    ))}
                  </div>
                </div>

                <p className="c10-reassure" data-testid="c10-reassurance">Not sure what solution you need? That’s okay — we’ll help you identify the right approach.</p>
                {submitError && <p className="c10-submit-error" role="alert" data-testid="c10-submit-error">{submitError}</p>}

                <button type="submit" className="c10-submit" disabled={submitting} aria-busy={submitting} data-testid="c10-submit">
                  {submitting ? <><Loader2 size={17} className="animate-spin" aria-hidden="true" /> Sending…</> : <>Start the Conversation <ArrowRight size={17} aria-hidden="true" /></>}
                </button>
                <p className="c10-privacy" data-testid="c10-privacy">
                  We’ll use your information only to respond to your inquiry.{' '}
                  <Link to="/policies/privacy-policy" data-testid="c10-privacy-link">Privacy Policy</Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
