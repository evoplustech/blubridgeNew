import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus, Loader2, ArrowRight } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import './Consulting12.css';
import { API_ORIGIN } from '../../apiOrigin';

/* /consulting-12 — "AI Opportunity Canvas": editorial numbered canvas. Saves to Admin → Contact Forms (formVariant "consulting-12"). */

const GOALS = [
  'Explore where AI can help my business', 'Build a new AI solution', 'Automate a business process',
  'Add AI to an existing product', 'Improve an existing AI solution', 'Not sure yet — I need guidance', 'Other',
];
const NOT_SURE = GOALS[5];
const OTHER = 'Other';
const SECTIONS = [['objective', 'Objective'], ['situation', 'Situation'], ['details', 'Details']];
const CAPABILITIES = [
  ['AI Strategy', 'Identify high-value AI opportunities and build a practical roadmap.'],
  ['Generative AI', 'Design AI experiences using modern generative AI technologies.'],
  ['AI Agents & Automation', 'Automate workflows and business processes with intelligent AI systems.'],
  ['AI Development', 'Turn validated AI ideas into production-ready solutions.'],
];
const EMPTY = { goals: [], other: '', details: '', name: '', email: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FOCUS_ID = { goals: 'c12-goal-0', details: 'c12-details', name: 'c12-name', email: 'c12-email' };
const pad = n => String(n).padStart(2, '0');

const validate = f => {
  const e = {};
  if (!f.goals.length) e.goals = 'Please select at least one objective.';
  if (!f.details.trim()) e.details = 'Please give us a short overview of your situation.';
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

const ErrorText = ({ id, error }) => (error ? <p id={`${id}-error`} className="c12-error" role="alert" data-testid={`c12-error-${id}`}>{error}</p> : null);

function SideIndex({ active }) {
  return (
    <nav className="c12-index" aria-label="Brief sections" data-testid="c12-side-index">
      <ol>
        {SECTIONS.map(([id, label], i) => (
          <li key={id}>
            <a href={`#c12-${id}`} className={`c12-index-link${active === id ? ' c12-index-on' : ''}`} aria-current={active === id ? 'step' : undefined} data-testid={`c12-index-${id}`}>
              <span className="c12-index-num">{pad(i + 1)}</span>{label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function SectionHead({ n, label, title, sub, htmlFor, as = 'h2' }) {
  const Title = as;
  return (
    <div className="c12-head">
      <p className="c12-tag"><span className="c12-tag-num">{pad(n)}</span><span className="c12-tag-sep" aria-hidden="true" />{label}</p>
      <Title {...(as === 'label' ? { htmlFor } : {})} className="c12-q">{title}<span className="c12-req" aria-hidden="true"> *</span></Title>
      {sub && <p className="c12-sub">{sub}</p>}
    </div>
  );
}

function Success() {
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus({ preventScroll: true }); ref.current?.scrollIntoView({ block: 'center' }); }, []);
  return (
    <div ref={ref} tabIndex={-1} role="status" className="c12-success" data-testid="c12-success">
      <p className="c12-tag"><Check size={13} strokeWidth={3} aria-hidden="true" /><span className="c12-tag-sep" aria-hidden="true" />Brief received</p>
      <h2 className="c12-q">Thank you — your AI brief has been sent.</h2>
      <p className="c12-sub">A BluBridge consultant will review your objective and situation, then get back to you to discuss the right next step.</p>
      <Link to="/" className="c12-textlink" data-testid="c12-back-home">Back to BluBridge <ArrowRight size={15} aria-hidden="true" /></Link>
    </div>
  );
}

export default function Consulting12() {
  useDocumentTitle('AI Consulting for Business | BluBridge');
  useMetaDescription('BluBridge helps businesses identify, build and put practical AI solutions to work — from AI strategy and generative AI to AI agents, automation and development.');
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);
  const [active, setActive] = useState('objective');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (done || !('IntersectionObserver' in window)) return undefined;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) setActive(en.target.dataset.section); });
    }, { rootMargin: '-35% 0px -55% 0px' });
    canvasRef.current?.querySelectorAll('[data-section]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [done]);

  const set = (name, value) => {
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => { const n = { ...e }; delete n[name]; return n; });
    if (submitError) setSubmitError('');
  };
  const onInput = e => set(e.target.name, e.target.value);
  const aria = id => ({ 'aria-invalid': Boolean(errors[id]), 'aria-describedby': errors[id] ? `${id}-error` : undefined });
  const onFocusSection = id => () => setActive(id);

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
      type: 'contact_us', formVariant: 'consulting-12',
      firstName: firstName.slice(0, 120),
      email: form.email.trim().toLowerCase(),
      enquiryCategory: goals.join(', '),
      message: form.details.trim(),
    };
    if (rest.length) body.lastName = rest.join(' ').slice(0, 120);
    try {
      const res = await fetch(`${API_ORIGIN}/api/contacts/submit`, {
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
    <div className="c12-page" data-testid="consulting12-page">
      <div className="c12-wrap">
        <header className="c12-intro">
          <div>
            <p className="c12-eyebrow" data-testid="c12-eyebrow">AI Consulting for Business</p>
            <h1 className="c12-title" data-testid="c12-headline">Turn Your AI Ideas <br className="c12-br" />Into Business Outcomes</h1>
          </div>
          <div className="c12-intro-copy">
            <p className="c12-lead" data-testid="c12-lead">From identifying the right AI opportunities to building and deploying solutions, BluBridge helps businesses move from ideas to practical implementation.</p>
            <p className="c12-sublead">Share your goal with us and we’ll help determine the right next step.</p>
            <p className="c12-note" data-testid="c12-note">No technical specification required.</p>
          </div>
        </header>

        <div ref={canvasRef} className="c12-canvas" data-testid="c12-canvas">
          {!done && <SideIndex active={active} />}
          <div className="c12-main">
            {done ? <Success /> : (
              <form onSubmit={onSubmit} noValidate aria-busy={submitting} aria-label="AI opportunity brief" data-testid="c12-form">
                <fieldset id="c12-objective" data-section="objective" className="c12-section" onFocusCapture={onFocusSection('objective')} aria-describedby={errors.goals ? 'goals-error' : undefined}>
                  <legend className="sr-only">What are you looking to accomplish?</legend>
                  <SectionHead n={1} label="Your Objective" as="p" title="What are you looking to accomplish?" sub="Select the direction that best describes what you’re exploring. Choose more than one if relevant." />
                  <ul className={`c12-list${errors.goals ? ' c12-list-invalid' : ''}`}>
                    {GOALS.map((g, i) => {
                      const on = form.goals.includes(g);
                      return (
                        <li key={g}>
                          <button id={`c12-goal-${i}`} type="button" aria-pressed={on} disabled={submitting}
                            onClick={() => set('goals', toggleGoal(form.goals, g))}
                            className={`c12-opt${on ? ' c12-opt-on' : ''}`} data-testid={`c12-goal-${i}`}>
                            <span className="c12-opt-num">{pad(i + 1)}</span>
                            <span className="c12-opt-text">{g}</span>
                            <span className="c12-opt-ind" aria-hidden="true">{on ? <Check size={16} strokeWidth={2.6} /> : <Plus size={16} strokeWidth={1.8} />}</span>
                          </button>
                          {g === OTHER && on && (
                            <div className="c12-other">
                              <label htmlFor="c12-other" className="sr-only">Tell us what you have in mind (optional)</label>
                              <input id="c12-other" name="other" type="text" maxLength={200} value={form.other} onChange={onInput} disabled={submitting}
                                placeholder="Tell us what you have in mind..." className="c12-line" data-testid="c12-input-other" />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <ErrorText id="goals" error={errors.goals} />
                </fieldset>

                <div id="c12-situation" data-section="situation" className="c12-section" onFocusCapture={onFocusSection('situation')}>
                  <SectionHead n={2} label="The Situation" as="label" htmlFor="c12-details" title="What would you like us to know?" sub="Give us a quick overview of the idea, challenge, process or existing solution." />
                  <div className={`c12-pad${errors.details ? ' c12-pad-invalid' : ''}`}>
                    <textarea id="c12-details" name="details" rows={4} maxLength={5000} value={form.details} onChange={onInput} disabled={submitting}
                      placeholder="Briefly describe your idea, challenge, process or existing solution..."
                      className="c12-pad-input" {...aria('details')} data-testid="c12-input-details" />
                  </div>
                  {errors.details ? <ErrorText id="details" error={errors.details} /> : <p className="c12-helper">No technical details required. A few sentences are enough.</p>}
                </div>

                <div id="c12-details-section" data-section="details" className="c12-section" onFocusCapture={onFocusSection('details')}>
                  <SectionHead n={3} label="Your Details" as="p" title="Where should we respond?" />
                  <div className="c12-fields">
                    {[['name', 'Your Name', 'text', 'name', 200], ['email', 'Business Email', 'email', 'email', 254]].map(([name, label, type, auto, max]) => (
                      <div key={name} className="c12-field">
                        <label htmlFor={`c12-${name}`} className="c12-label">{label} <span className="c12-req" aria-hidden="true">*</span></label>
                        <input id={`c12-${name}`} name={name} type={type} autoComplete={auto} maxLength={max} value={form[name]} onChange={onInput} disabled={submitting}
                          inputMode={type === 'email' ? 'email' : undefined}
                          className={`c12-line${errors[name] ? ' c12-line-invalid' : ''}`} {...aria(name)} data-testid={`c12-input-${name}`} />
                        <ErrorText id={name} error={errors[name]} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="c12-signoff" data-testid="c12-signoff">
                  <div className="c12-signoff-copy">
                    <p className="c12-tag">Ready to Discuss</p>
                    <p className="c12-reassure" data-testid="c12-reassurance"><strong>Not sure what solution you need?</strong> That’s okay. We’ll help you identify the right approach.</p>
                  </div>
                  <div className="c12-cta">
                    <button type="submit" className="c12-submit" disabled={submitting} aria-busy={submitting} data-testid="c12-submit">
                      {submitting ? <><Loader2 size={17} className="animate-spin" aria-hidden="true" /> Sending…</> : <>Send My AI Brief <ArrowRight size={17} aria-hidden="true" /></>}
                    </button>
                    <p className="c12-privacy" data-testid="c12-privacy">We’ll only use your information to respond to your inquiry. <Link to="/policies/privacy-policy" data-testid="c12-privacy-link">Privacy Policy</Link></p>
                  </div>
                </div>
                {submitError && <p className="c12-submit-error" role="alert" data-testid="c12-submit-error">{submitError}</p>}
              </form>
            )}
          </div>
        </div>

        <section className="c12-ledger" aria-labelledby="c12-ledger-title" data-testid="c12-capabilities">
          <h2 id="c12-ledger-title" className="c12-ledger-title">Where We Can Help</h2>
          <ol className="c12-ledger-grid">
            {CAPABILITIES.map(([t, d], i) => (
              <li key={t} className="c12-entry" data-testid={`c12-cap-${i}`}>
                <p className="c12-entry-head"><span className="c12-entry-title">{t}</span><span className="c12-entry-num">{pad(i + 1)}</span></p>
                <p className="c12-entry-text">{d}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
