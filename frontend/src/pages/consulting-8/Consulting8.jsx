import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import { PremiumSelect } from '../consulting-3/PremiumSelect';
import './Consulting8.css';

/* /consulting-8 — focused Google Ads landing page ("focus frame" concept).
   No site header/footer (see App.js isFocusLanding). Saves to Admin → Contact Forms
   (type "contact_us", formVariant "consulting-8") via the existing endpoint, email flow and rate limits. */

const HELP_OPTIONS = ['AI Strategy', 'Generative AI', 'AI Agents & Automation', 'AI Development', 'Data & AI', 'Not Sure Yet', 'Other'].map(v => ({ value: v, label: v }));
const PILLARS = [
  ['Strategy', 'Find the right AI opportunities.'],
  ['Build', 'Turn ideas into working solutions.'],
  ['Automate', 'Improve workflows with AI.'],
  ['Scale', 'Move AI into real operations.'],
];

const EMPTY = { email: '', name: '', company: '', help: '', goal: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ORDER = ['email', 'name', 'company', 'help', 'goal'];

const validate = f => {
  const e = {};
  if (!f.email.trim()) e.email = 'Please enter your work email.';
  else if (!EMAIL_RE.test(f.email.trim()) || f.email.trim().length > 254) e.email = 'Please enter a valid email address.';
  if (!f.name.trim()) e.name = 'Please enter your name.';
  if (!f.company.trim()) e.company = 'Please enter your company name.';
  if (!f.help) e.help = 'Please choose what you need help with.';
  if (!f.goal.trim()) e.goal = 'Please give us a quick overview.';
  return e;
};

/** Conversion — called ONLY after the backend confirms the lead was stored. */
const trackLead = () => {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', form_name: 'ai_consulting_ads' });
  } catch { /* never break the form */ }
};

function Field({ id, label, error, children }) {
  return <div className="c8-field">
    <label htmlFor={`c8-${id}`} className="c8-label">{label} <span className="c8-req" aria-hidden="true">*</span></label>
    {children}
    {error && <p id={`c8-${id}-error`} className="c8-error" role="alert" data-testid={`c8-error-${id}`}>{error}</p>}
  </div>;
}

export default function Consulting8() {
  useDocumentTitle('AI Consulting | Connect With BluBridge');
  useMetaDescription('Exploring an AI opportunity, solving a business challenge or ready to build? Tell BluBridge where you are and our AI consultants will help you move forward.');

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);
  const panelRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => { if (done) successRef.current?.focus(); }, [done]);

  const set = (name, value) => {
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => { const n = { ...e }; delete n[name]; return n; });
    if (submitError) setSubmitError('');
  };
  const onInput = e => set(e.target.name, e.target.value);
  const aria = id => ({ 'aria-invalid': Boolean(errors[id]), 'aria-describedby': errors[id] ? `c8-${id}-error` : undefined });

  const focusForm = () => {
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => document.getElementById(done ? 'c8-success' : 'c8-email')?.focus({ preventScroll: true }), 450);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (sending) return;
    const v = validate(form);
    setErrors(v);
    const first = ORDER.find(k => v[k]);
    if (first) { document.getElementById(`c8-${first}`)?.focus(); return; }
    setSending(true);
    setSubmitError('');
    const [firstName, ...rest] = form.name.trim().split(/\s+/);
    const body = {
      type: 'contact_us', formVariant: 'consulting-8',
      firstName: firstName.slice(0, 120),
      email: form.email.trim().toLowerCase(),
      company: form.company.trim(),
      enquiryCategory: form.help,
      message: form.goal.trim(),
    };
    if (rest.length) body.lastName = rest.join(' ').slice(0, 120);
    try {
      const res = await fetch(`${window.location.origin}/api/contacts/submit`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      if (res.ok) {
        trackLead();
        setForm(EMPTY);
        setDone(true);
      } else if (res.status === 409) {
        setSubmitError('We’ve just received a request from this email. Please wait a minute before trying again.');
      } else if (res.status === 429) {
        setSubmitError('Too many attempts. Please wait a moment and try again.');
      } else {
        setSubmitError('Something went wrong on our side. Please try again.');
      }
    } catch {
      setSubmitError('We couldn’t reach our server. Please check your connection and try again.');
    } finally {
      setSending(false);
    }
  };

  return <div className="c8-page" data-testid="consulting8-page">
    <header className="c8-topbar">
      <div className="c8-shell c8-topbar-inner">
        <Link to="/" aria-label="BluBridge home" data-testid="c8-logo"><img src="/images/blubridge-logo.svg" alt="BluBridge" className="c8-logo" /></Link>
      </div>
    </header>

    <main className="c8-main">
      <section className="c8-shell c8-hero" aria-labelledby="c8-headline">
        <p className="c8-eyebrow" data-testid="c8-eyebrow">BluBridge AI Consulting</p>
        <h1 id="c8-headline" className="c8-headline" data-testid="c8-headline">Ready to Put AI to Work?</h1>
        <p className="c8-lede" data-testid="c8-lede">Whether you’re exploring an opportunity, solving a business challenge or ready to build, tell us where you are and we’ll help you move forward.</p>

        <div className="c8-frame-wrap">
          <span className="c8-frame" aria-hidden="true" />
          <div ref={panelRef} className="c8-panel" data-testid="c8-panel">
            {done ? <div id="c8-success" ref={successRef} tabIndex={-1} role="status" className="c8-success" data-testid="c8-success">
              <CheckCircle2 className="c8-success-icon" size={40} strokeWidth={1.5} aria-hidden="true" />
              <h2 className="c8-success-title">You’re all set.</h2>
              <p className="c8-success-text">Thanks for reaching out. We’ve received your request and a member of the BluBridge team will review it shortly.</p>
              <p className="c8-success-sub">We’ll contact you using the email you provided.</p>
            </div> : <>
              <div className="c8-panel-head">
                <h2 className="c8-panel-title" data-testid="c8-panel-title">Start a Conversation</h2>
                <p className="c8-panel-note">It takes less than a minute.</p>
              </div>
              <form className="c8-form" onSubmit={onSubmit} noValidate aria-busy={sending} data-testid="c8-form">
                <Field id="email" label="Work Email" error={errors.email}>
                  <input id="c8-email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} placeholder="you@company.com"
                    value={form.email} onChange={onInput} disabled={sending} className={`c8-input c8-input-primary${errors.email ? ' c8-invalid' : ''}`} {...aria('email')} data-testid="c8-input-email" />
                </Field>
                <div className="c8-row">
                  <Field id="name" label="Your Name" error={errors.name}>
                    <input id="c8-name" name="name" type="text" autoComplete="name" maxLength={200} placeholder="Full name"
                      value={form.name} onChange={onInput} disabled={sending} className={`c8-input${errors.name ? ' c8-invalid' : ''}`} {...aria('name')} data-testid="c8-input-name" />
                  </Field>
                  <Field id="company" label="Company" error={errors.company}>
                    <input id="c8-company" name="company" type="text" autoComplete="organization" maxLength={200} placeholder="Company name"
                      value={form.company} onChange={onInput} disabled={sending} className={`c8-input${errors.company ? ' c8-invalid' : ''}`} {...aria('company')} data-testid="c8-input-company" />
                  </Field>
                </div>
                <Field id="help" label="I need help with" error={errors.help}>
                  <PremiumSelect id="c8-help" value={form.help} onChange={v => set('help', v)} options={HELP_OPTIONS} placeholder="Choose one" error={errors.help} disabled={sending} testId="c8-select-help" />
                </Field>
                <Field id="goal" label="What are you looking to achieve?" error={errors.goal}>
                  <textarea id="c8-goal" name="goal" rows={3} maxLength={4000} placeholder="Give us a quick overview..."
                    value={form.goal} onChange={onInput} disabled={sending} className={`c8-input c8-textarea${errors.goal ? ' c8-invalid' : ''}`} {...aria('goal')} data-testid="c8-input-goal" />
                </Field>

                {submitError && <p className="c8-submit-error" role="alert" data-testid="c8-submit-error">{submitError}</p>}

                <button type="submit" className="c8-cta" disabled={sending} aria-busy={sending} data-testid="c8-submit">
                  {sending ? <><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending...</> : <>Connect With BluBridge <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" /></>}
                </button>
                <p className="c8-trust" data-testid="c8-trust">Simple. Confidential. No obligation.</p>
                <p className="c8-privacy" data-testid="c8-privacy">We’ll only use your details to respond to your inquiry. <Link to="/policies/privacy-policy" data-testid="c8-privacy-link">Privacy Policy</Link></p>
              </form>
            </>}
          </div>
        </div>
      </section>

      <section className="c8-shell c8-pillars" aria-label="How BluBridge helps" data-testid="c8-pillars">
        <ul className="c8-pillar-list">
          {PILLARS.map(([title, text]) => <li key={title} className="c8-pillar" data-testid={`c8-pillar-${title.toLowerCase()}`}>
            <p className="c8-pillar-title">{title}</p>
            <p className="c8-pillar-text">{text}</p>
          </li>)}
        </ul>
      </section>

      <section className="c8-shell c8-question">
        <p>Have a question before getting started?</p>
        <button type="button" className="c8-question-link" onClick={focusForm} data-testid="c8-talk-link">Talk to Our AI Team <ArrowRight size={16} aria-hidden="true" /></button>
      </section>
    </main>

    <footer className="c8-footer">
      <div className="c8-shell c8-footer-inner">
        <span>© {new Date().getFullYear()} BluBridge</span>
        <Link to="/policies/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  </div>;
}
