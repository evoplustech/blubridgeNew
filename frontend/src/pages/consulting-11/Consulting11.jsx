import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2, ArrowRight, ArrowUp } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import './Consulting11.css';

/* /consulting-11 — "Guided AI Brief": centered single-journey brief. Saves to Admin → Contact Forms (formVariant "consulting-11"). */

const GOALS = [
  'Explore where AI can help my business', 'Build a new AI solution', 'Automate a business process',
  'Add AI to an existing product', 'Improve an existing AI solution', 'Not sure yet — I need guidance', 'Other',
];
const NOT_SURE = GOALS[5];
const OTHER = 'Other';
const CAPABILITIES = [
  ['AI Strategy', 'Identify opportunities and create a practical roadmap.'],
  ['Generative AI', 'Build useful experiences with modern generative AI.'],
  ['AI Agents & Automation', 'Automate workflows with intelligent systems.'],
  ['AI Development', 'Turn validated ideas into production-ready solutions.'],
];
const EMPTY = { goals: [], other: '', details: '', name: '', email: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FOCUS_ID = { goals: 'c11-goal-0', details: 'c11-details', name: 'c11-name', email: 'c11-email' };
const pad = n => String(n).padStart(2, '0');

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

const ErrorText = ({ id, error }) => (error ? <p id={`${id}-error`} className="c11-error" role="alert" data-testid={`c11-error-${id}`}>{error}</p> : null);

function Progress({ done }) {
  const steps = ['Goal', 'Context', 'Details'];
  const active = done.indexOf(false);
  return (
    <div className="c11-progress" aria-hidden="true" data-testid="c11-progress">
      {steps.map((s, i) => (
        <div key={s} className={`c11-pstep${done[i] ? ' c11-pstep-done' : ''}${i === active ? ' c11-pstep-active' : ''}`} data-testid={`c11-progress-${s.toLowerCase()}`} data-done={done[i]}>
          <span className="c11-pdot">{done[i] && <Check size={9} strokeWidth={3.4} />}</span>
          <span className="c11-plabel"><span className="c11-pnum">{i + 1}</span> {s}</span>
        </div>
      ))}
    </div>
  );
}

function StepHead({ n, label, title, sub, htmlFor, as = 'label' }) {
  const Title = as;
  return (
    <div className="c11-stephead">
      <p className="c11-steptag">{pad(n)} / {label}</p>
      <Title {...(as === 'label' ? { htmlFor } : {})} className="c11-q">{title} <span className="c11-req" aria-hidden="true">*</span></Title>
      {sub && <p className="c11-sub">{sub}</p>}
    </div>
  );
}

function Success() {
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus({ preventScroll: true }); ref.current?.scrollIntoView({ block: 'center' }); }, []);
  return (
    <div ref={ref} tabIndex={-1} role="status" className="c11-success" data-testid="c11-success">
      <span className="c11-success-icon" aria-hidden="true"><Check size={18} strokeWidth={2.6} /></span>
      <h2 className="c11-q">Your AI brief has been sent.</h2>
      <p className="c11-sub">Thank you. A BluBridge AI consultant will review your brief and get back to you shortly.</p>
      <Link to="/" className="c11-textlink" data-testid="c11-back-home">Back to BluBridge <ArrowRight size={15} aria-hidden="true" /></Link>
    </div>
  );
}

export default function Consulting11() {
  useDocumentTitle('What Could AI Do For Your Business? | BluBridge AI Consulting');
  useMetaDescription('Tell BluBridge what you want AI to help you accomplish. Start a short AI brief and we will help you determine the right next step.');
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);
  const briefRef = useRef(null);
  const hasOther = form.goals.includes(OTHER);
  const progress = [form.goals.length > 0, form.details.trim().length > 0, Boolean(form.name.trim() && EMAIL_RE.test(form.email.trim()))];

  const set = (name, value) => {
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => { const n = { ...e }; delete n[name]; return n; });
    if (submitError) setSubmitError('');
  };
  const onInput = e => set(e.target.name, e.target.value);
  const aria = id => ({ 'aria-invalid': Boolean(errors[id]), 'aria-describedby': errors[id] ? `${id}-error` : undefined });

  const toBrief = () => {
    briefRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => document.getElementById('c11-goal-0')?.focus({ preventScroll: true }), 450);
  };

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
      type: 'contact_us', formVariant: 'consulting-11',
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
      else if (res.status === 409) setSubmitError('We’ve just received a brief from this email. Please wait a minute before sending another.');
      else if (res.status === 429) setSubmitError('Too many attempts. Please wait a moment and try again.');
      else setSubmitError('Something went wrong on our side. Please try again.');
    } catch {
      setSubmitError('We couldn’t reach our server. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="c11-page" data-testid="consulting11-page">
      <header className="c11-intro">
        <p className="c11-eyebrow" data-testid="c11-eyebrow">AI Consulting for Business</p>
        <h1 className="c11-title" data-testid="c11-headline">What Could AI Do <br className="c11-br" />For Your Business?</h1>
        <p className="c11-lead" data-testid="c11-lead">Whether you’re exploring an opportunity or already have an AI initiative in mind, tell us what you want to accomplish. We’ll help you determine the right next step.</p>
        <p className="c11-note">No technical specification required.</p>
      </header>

      <section ref={briefRef} id="c11-brief" className="c11-brief" aria-labelledby="c11-brief-title" data-testid="c11-brief">
        <div className="c11-brief-top">
          <h2 id="c11-brief-title" className="c11-brief-title">Start Your AI Brief</h2>
          {!done && <Progress done={progress} />}
        </div>

        {done ? <Success /> : (
          <form onSubmit={onSubmit} noValidate aria-busy={submitting} className="c11-form" data-testid="c11-form">
            <fieldset className="c11-step" aria-describedby={errors.goals ? 'goals-error' : undefined}>
              <legend className="sr-only">What are you looking to accomplish?</legend>
              <StepHead n={1} label="Goal" as="p" title="What are you looking to accomplish?" sub="Choose the option that best matches your goal. You can select more than one." />
              <div className="c11-board">
                {GOALS.map((g, i) => {
                  const on = form.goals.includes(g);
                  return (
                    <button key={g} id={`c11-goal-${i}`} type="button" aria-pressed={on} disabled={submitting}
                      onClick={() => set('goals', toggleGoal(form.goals, g))}
                      className={`c11-row${on ? ' c11-row-on' : ''}${errors.goals ? ' c11-row-invalid' : ''}`} data-testid={`c11-goal-${i}`}>
                      <span className="c11-row-num">{pad(i + 1)}</span>
                      <span className="c11-row-text">{g}</span>
                      <span className="c11-row-ind" aria-hidden="true">{on && <Check size={11} strokeWidth={3.2} />}</span>
                    </button>
                  );
                })}
              </div>
              {hasOther && (
                <input id="c11-other" name="other" type="text" maxLength={200} value={form.other} onChange={onInput} disabled={submitting}
                  aria-label="Tell us more (optional)" placeholder="Tell us more (optional)" className="c11-input c11-other" data-testid="c11-input-other" />
              )}
              <ErrorText id="goals" error={errors.goals} />
            </fieldset>

            <div className="c11-step">
              <StepHead n={2} label="Context" htmlFor="c11-details" title="What would you like us to know?" />
              <textarea id="c11-details" name="details" rows={4} maxLength={5000} value={form.details} onChange={onInput} disabled={submitting}
                placeholder="Briefly describe your idea, challenge, process or existing solution..."
                className={`c11-input c11-textarea${errors.details ? ' c11-input-invalid' : ''}`} {...aria('details')} data-testid="c11-input-details" />
              {errors.details ? <ErrorText id="details" error={errors.details} /> : (
                <p className="c11-helper"><span>No technical details required — describe it in your own words.</span><span className="c11-helper-hint" data-testid="c11-length-hint">A few sentences are enough.</span></p>
              )}
            </div>

            <div className="c11-step">
              <StepHead n={3} label="Your Details" as="p" title="Where should we respond?" />
              <div className="c11-fields">
                {[['name', 'Your Name', 'text', 'name', 200], ['email', 'Business Email', 'email', 'email', 254]].map(([name, label, type, auto, max]) => (
                  <div key={name}>
                    <label htmlFor={`c11-${name}`} className="c11-label">{label} <span className="c11-req" aria-hidden="true">*</span></label>
                    <input id={`c11-${name}`} name={name} type={type} autoComplete={auto} maxLength={max} value={form[name]} onChange={onInput} disabled={submitting}
                      inputMode={type === 'email' ? 'email' : undefined}
                      className={`c11-input${errors[name] ? ' c11-input-invalid' : ''}`} {...aria(name)} data-testid={`c11-input-${name}`} />
                    <ErrorText id={name} error={errors[name]} />
                  </div>
                ))}
              </div>
            </div>

            <div className="c11-action">
              <p className="c11-reassure" data-testid="c11-reassurance"><strong>Not sure what solution you need?</strong> That’s completely fine. We’ll help you identify the right approach.</p>
              <div className="c11-cta-wrap">
                <button type="submit" className="c11-submit" disabled={submitting} aria-busy={submitting} data-testid="c11-submit">
                  {submitting ? <><Loader2 size={17} className="animate-spin" aria-hidden="true" /> Sending…</> : <>Send My AI Brief <ArrowRight size={17} aria-hidden="true" /></>}
                </button>
                <p className="c11-privacy" data-testid="c11-privacy">We’ll only use your information to respond to your inquiry. <Link to="/policies/privacy-policy" data-testid="c11-privacy-link">Privacy Policy</Link></p>
              </div>
            </div>
            {submitError && <p className="c11-submit-error" role="alert" data-testid="c11-submit-error">{submitError}</p>}
          </form>
        )}
      </section>

      <section className="c11-caps" aria-labelledby="c11-caps-title" data-testid="c11-capabilities">
        <h2 id="c11-caps-title" className="c11-section-label">Where BluBridge Can Help</h2>
        <ol className="c11-strip">
          {CAPABILITIES.map(([t, d], i) => (
            <li key={t} className="c11-cap" data-testid={`c11-cap-${i}`}>
              <span className="c11-cap-num">{pad(i + 1)}</span>
              <p className="c11-cap-title">{t}</p>
              <p className="c11-cap-text">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="c11-closing" data-testid="c11-closing">
        <p className="c11-section-label">From Idea to Implementation</p>
        <p className="c11-closing-lead">You don’t need to know exactly what to build before speaking with us.</p>
        <p className="c11-closing-text">BluBridge can help evaluate the opportunity, define the approach and determine the practical next step.</p>
        <button type="button" className="c11-textlink" onClick={toBrief} data-testid="c11-back-to-brief">Start your AI brief <ArrowUp size={15} aria-hidden="true" /></button>
      </section>
    </div>
  );
}
