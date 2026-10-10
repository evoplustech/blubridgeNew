import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Loader2 } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import './Consulting7.css';
import { API_ORIGIN } from '../../apiOrigin';

/* /consulting-7 — single-column Google Ads landing page for AI consulting.
   Saves to Admin → Contact Forms (type "contact_us", formVariant "consulting-7") and reuses the
   existing notification email, duplicate check and rate limits. */

const CAPABILITIES = [
  { title: 'AI Strategy', text: 'Identify high-value AI opportunities and build a practical roadmap.' },
  { title: 'Generative AI', text: 'Design AI experiences using modern generative AI technologies.' },
  { title: 'AI Agents & Automation', text: 'Automate workflows and business processes with intelligent AI systems.' },
  { title: 'AI Development', text: 'Turn validated AI ideas into production-ready solutions.' },
];

const GOALS = [
  'Explore where AI can help my business',
  'Build a new AI solution',
  'Automate a business process',
  'Add AI to an existing product',
  'Improve an existing AI solution',
  'Not sure yet — I need guidance',
  'Other',
];

const EMPTY = { goal: '', details: '', name: '', email: '', company: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = f => {
  const e = {};
  if (!f.goal) e.goal = 'Please choose what you’re looking to accomplish.';
  if (!f.details.trim()) e.details = 'Please tell us a little about your idea or challenge.';
  if (!f.name.trim()) e.name = 'Please enter your name.';
  if (!f.email.trim()) e.email = 'Please enter your business email.';
  else if (!EMAIL_RE.test(f.email.trim()) || f.email.trim().length > 254) e.email = 'Please enter a valid email address.';
  if (!f.company.trim()) e.company = 'Please enter your company name.';
  return e;
};

const FOCUS_ID = { goal: 'c7-goal-0', details: 'c7-details', name: 'c7-name', email: 'c7-email', company: 'c7-company' };

/** Conversion event — called ONLY after the backend confirms the lead was created. */
function trackLead() {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', form_name: 'ai_consulting_google_ads' });
  } catch { /* tracking must never break the form */ }
}

function ErrorText({ id, error }) {
  return error ? <p id={`${id}-error`} className="c7-error" role="alert" data-testid={`c7-error-${id}`}>{error}</p> : null;
}

export default function Consulting7() {
  useDocumentTitle('AI Consulting for Business | BluBridge');
  useMetaDescription('BluBridge helps businesses identify, build and put practical AI solutions to work — from AI strategy and generative AI to AI agents, automation and development.');

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);
  const formSection = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    if (done) { successRef.current?.focus({ preventScroll: true }); successRef.current?.scrollIntoView({ block: 'center' }); }
  }, [done]);

  const set = (name, value) => {
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => { const n = { ...e }; delete n[name]; return n; });
    if (submitError) setSubmitError('');
  };
  const onInput = e => set(e.target.name, e.target.value);
  const aria = id => ({ 'aria-invalid': Boolean(errors[id]), 'aria-describedby': errors[id] ? `${id}-error` : undefined });

  const scrollToForm = () => {
    formSection.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => document.getElementById('c7-goal-0')?.focus({ preventScroll: true }), 450);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (submitting) return;
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) {
      const first = document.getElementById(FOCUS_ID[Object.keys(v)[0]]);
      first?.focus({ preventScroll: true });
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    const [firstName, ...rest] = form.name.trim().split(/\s+/);
    const body = {
      type: 'contact_us', formVariant: 'consulting-7',
      firstName: firstName.slice(0, 120),
      email: form.email.trim().toLowerCase(),
      company: form.company.trim(),
      enquiryCategory: form.goal,
      message: form.details.trim(),
    };
    if (rest.length) body.lastName = rest.join(' ').slice(0, 120);
    try {
      const res = await fetch(`${API_ORIGIN}/api/contacts/submit`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      if (res.ok) {
        trackLead();
        setForm(EMPTY);
        setDone(true);
      } else if (res.status === 409) {
        setSubmitError('We’ve just received a request from this email. Please wait a minute before sending another.');
      } else if (res.status === 429) {
        setSubmitError('Too many attempts. Please wait a moment and try again.');
      } else {
        setSubmitError('Something went wrong on our side. Please try again.');
      }
    } catch {
      setSubmitError('We couldn’t reach our server. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="c7-page" data-testid="consulting7-page">
      {/* ===== HERO ===== */}
      <section className="c7-hero">
        <div className="c7-wide">
          <p className="c7-label" data-testid="c7-label">AI Consulting for Business</p>
          <h1 className="c7-title" data-testid="c7-headline">Turn Your AI Ideas <br className="c7-br" />Into Business Outcomes</h1>
          <p className="c7-lead" data-testid="c7-lead">
            From identifying the right AI opportunities to building and deploying solutions, BluBridge helps businesses move from ideas to practical implementation.
          </p>
          <p className="c7-sublead">Share your goal with us and we’ll help you determine the right next step.</p>
          <button type="button" className="c7-btn c7-btn-hero" onClick={scrollToForm} data-testid="c7-hero-cta">
            Discuss Your AI Project <ArrowDown size={17} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* ===== WHERE WE CAN HELP ===== */}
      <section className="c7-help" aria-labelledby="c7-help-title" data-testid="c7-capabilities">
        <div className="c7-wide">
          <h2 id="c7-help-title" className="c7-eyebrow-heading">Where We Can Help</h2>
          <ul className="c7-cap-list">
            {CAPABILITIES.map(c => (
              <li key={c.title} className="c7-cap" data-testid={`c7-cap-${c.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
                <p className="c7-cap-title">{c.title}</p>
                <p className="c7-cap-text">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section ref={formSection} id="c7-form" className="c7-form-section" aria-labelledby="c7-form-title">
        <div className="c7-narrow">
          {done ? (
            <div ref={successRef} tabIndex={-1} role="status" className="c7-success" data-testid="c7-success">
              <h2 className="c7-success-title">Thanks — we’ve got it.</h2>
              <p className="c7-success-text">Your request has been sent to the BluBridge team. We’ll review what you’ve shared and reach out to continue the conversation.</p>
              <Link to="/" className="c7-btn c7-btn-secondary" data-testid="c7-back-home">Back to BluBridge <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          ) : (
            <>
              <h2 id="c7-form-title" className="c7-form-title" data-testid="c7-form-title">Have an AI project in mind?</h2>
              <p className="c7-form-intro">Give us a quick overview. You don’t need a detailed technical specification — just tell us what you’re trying to accomplish.</p>

              <form onSubmit={onSubmit} noValidate aria-busy={submitting} className="c7-form" data-testid="c7-form">
                {/* Q1 */}
                <fieldset className="c7-block" aria-describedby={errors.goal ? 'goal-error' : undefined}>
                  <legend className="c7-q">What are you looking to accomplish? <span className="c7-req" aria-hidden="true">*</span></legend>
                  <div className="c7-options" role="radiogroup" aria-required="true" aria-invalid={Boolean(errors.goal)}>
                    {GOALS.map((g, i) => (
                      <label key={g} className={`c7-option${form.goal === g ? ' c7-option-on' : ''}${errors.goal ? ' c7-option-invalid' : ''}`} data-testid={`c7-goal-${i}`}>
                        <input id={`c7-goal-${i}`} type="radio" name="goal" value={g} checked={form.goal === g} onChange={onInput} disabled={submitting} />
                        <span className="c7-radio" aria-hidden="true" />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorText id="goal" error={errors.goal} />
                </fieldset>

                {/* Q2 */}
                <div className="c7-block">
                  <label htmlFor="c7-details" className="c7-q">What would you like us to know? <span className="c7-req" aria-hidden="true">*</span></label>
                  <textarea id="c7-details" name="details" rows={4} maxLength={4000} value={form.details} onChange={onInput} disabled={submitting}
                    placeholder="Briefly describe your idea, challenge, process or existing solution..."
                    className={`c7-input c7-textarea${errors.details ? ' c7-input-invalid' : ''}`} {...aria('details')} data-testid="c7-input-details" />
                  {errors.details ? <ErrorText id="details" error={errors.details} /> : <p className="c7-helper">No technical details required.</p>}
                </div>

                {/* Contact */}
                <div className="c7-block c7-contact">
                  <p className="c7-q c7-q-section">How can we reach you?</p>
                  {[
                    ['name', 'Your Name', 'text', 'name', 200],
                    ['email', 'Business Email', 'email', 'email', 254],
                    ['company', 'Company', 'text', 'organization', 200],
                  ].map(([name, label, type, auto, max]) => (
                    <div key={name} className="c7-field">
                      <label htmlFor={`c7-${name}`} className="c7-label-field">{label} <span className="c7-req" aria-hidden="true">*</span></label>
                      <input id={`c7-${name}`} name={name} type={type} autoComplete={auto} maxLength={max} value={form[name]} onChange={onInput} disabled={submitting}
                        inputMode={type === 'email' ? 'email' : undefined}
                        className={`c7-input${errors[name] ? ' c7-input-invalid' : ''}`} {...aria(name)} data-testid={`c7-input-${name}`} />
                      <ErrorText id={name} error={errors[name]} />
                    </div>
                  ))}
                </div>

                {/* Micro trust */}
                <div className="c7-reassure" data-testid="c7-reassurance">
                  <p className="c7-reassure-title">Not sure what solution you need? That’s okay.</p>
                  <p className="c7-reassure-text">Our team can help you understand where AI makes sense before you commit to a particular technology or approach.</p>
                </div>

                {submitError && <p className="c7-submit-error" role="alert" data-testid="c7-submit-error">{submitError}</p>}

                <button type="submit" className="c7-btn c7-btn-submit" disabled={submitting} aria-busy={submitting} data-testid="c7-submit">
                  {submitting ? <><Loader2 size={17} className="animate-spin" aria-hidden="true" /> Sending…</> : 'Start the Conversation'}
                </button>
                <p className="c7-privacy" data-testid="c7-privacy">
                  We’ll use your information only to respond to your inquiry.{' '}
                  <Link to="/policies/privacy-policy" data-testid="c7-privacy-link">Privacy Policy</Link>
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
