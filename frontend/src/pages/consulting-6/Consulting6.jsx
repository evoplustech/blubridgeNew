import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, CheckCircle2, Loader2 } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import { PremiumSelect } from '../consulting-3/PremiumSelect';
import { API_ORIGIN } from '../../apiOrigin';

/* /consulting-6 — minimal Google Ads lead-generation page.
   Saves to Admin → Contact Forms (type "contact_us", formVariant "consulting-6") and
   reuses the existing notification email, duplicate check and rate limits. */

const SERVICES = ['AI Strategy & Consulting', 'Generative AI', 'AI Agents & Automation', 'Data & AI', 'AI Implementation', 'Other'];
const SERVICE_OPTIONS = SERVICES.map(s => ({ value: s, label: s }));
const TRUST_POINTS = ['AI strategy through implementation', 'Enterprise-focused AI solutions', 'Talk directly with an AI consultant'];

// Optional: set to your Google Ads conversion "send_to" value (e.g. 'AW-18460200148/AbCdEfGh') to also fire a direct Ads conversion.
const ADS_CONVERSION_SEND_TO = '';

const EMPTY = { email: '', fullName: '', company: '', service: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = f => {
  const e = {};
  if (!f.email.trim()) e.email = 'Please enter your work email.';
  else if (!EMAIL_RE.test(f.email.trim()) || f.email.trim().length > 254) e.email = 'Please enter a valid email address.';
  if (!f.fullName.trim()) e.fullName = 'Please enter your full name.';
  if (!f.company.trim()) e.company = 'Please enter your company name.';
  if (!f.service) e.service = 'Please select a service.';
  if (!f.message.trim()) e.message = 'Please tell us briefly about your requirement.';
  return e;
};

/** Fires ONLY after the backend confirms a successful submission. */
function trackLead(service) {
  const payload = { form_id: 'consulting-6', form_name: 'ai_consulting_lead', service_interest: service };
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', ...payload }); // Google Tag Manager custom-event trigger: generate_lead
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', payload); // gtag.js (Google Ads / GA4)
      if (ADS_CONVERSION_SEND_TO) window.gtag('event', 'conversion', { send_to: ADS_CONVERSION_SEND_TO });
    }
  } catch { /* tracking must never break the form */ }
}

const labelCls = 'block text-[13.5px] font-medium text-[#0a1230] mb-1';
const inputCls = err =>
  `w-full h-12 rounded-[10px] border bg-white px-3.5 text-[15px] text-[#0a1230] placeholder:text-[#8a93a6] outline-none transition-[border-color,box-shadow] duration-150 hover:border-[#b9c3db] focus:border-[#2b4c8c] focus:ring-4 focus:ring-[#2b4c8c]/10 disabled:bg-[#f4f5f9] ${err ? 'border-[#b3293a]' : 'border-[#dfe2eb]'}`;

function Field({ id, label, error, children }) {
  return <div>
    <label htmlFor={id} className={labelCls}>{label} <span className="text-[#b3293a]" aria-hidden="true">*</span></label>
    {children}
    {error && <p id={`${id}-error`} className="mt-1.5 text-[12.5px] text-[#b3293a]" role="alert" data-testid={`c6-error-${id}`}>{error}</p>}
  </div>;
}

export default function Consulting6() {
  useDocumentTitle('AI Consulting Services | Talk to an AI Consultant | BluBridge');
  useMetaDescription('Talk to a BluBridge AI consultant. From AI strategy and generative AI to AI agents and enterprise implementation — tell us your requirement and we’ll connect with you.');

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);
  const successRef = useRef(null);

  useEffect(() => { if (done) successRef.current?.focus(); }, [done]);

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
    if (Object.keys(v).length) { document.getElementById(Object.keys(v)[0])?.focus(); return; }
    setSubmitting(true);
    setSubmitError('');
    const [firstName, ...rest] = form.fullName.trim().split(/\s+/);
    const body = {
      type: 'contact_us', formVariant: 'consulting-6',
      firstName: firstName.slice(0, 120),
      email: form.email.trim().toLowerCase(),
      company: form.company.trim(),
      enquiryCategory: form.service,
      message: form.message.trim(),
    };
    if (rest.length) body.lastName = rest.join(' ').slice(0, 120);
    try {
      const res = await fetch(`${API_ORIGIN}/api/contacts/submit`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      if (res.ok) {
        trackLead(form.service);
        setDone(true);
        setForm(EMPTY);
      } else if (res.status === 409) {
        setSubmitError('We’ve just received a request from this email. Please wait a minute before submitting again.');
      } else if (res.status === 429) {
        setSubmitError('Too many attempts. Please wait a moment and try again.');
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('We couldn’t reach our server. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#f7f8fa] text-[#0a1230]" style={{ fontFamily: 'Inter, sans-serif' }} data-testid="consulting6-page">
      <div className="bb-container py-10 md:py-14 lg:py-10 xl:py-12">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-20 xl:gap-28">
          {/* Left — message */}
          <div className="lg:pt-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2b4c8c]" data-testid="c6-eyebrow">AI Consulting</p>
            <h1 className="mt-4 max-w-[520px] text-[36px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[46px] lg:text-[52px]" style={{ fontFamily: 'Geist, Inter, sans-serif' }} data-testid="c6-heading">
              Let’s Talk About Your AI Initiative
            </h1>
            <p className="mt-5 max-w-[480px] text-[17px] leading-[1.65] text-[#4a5470]" data-testid="c6-intro">
              Tell us what you’re looking to solve. Our AI consulting team will review your requirements and connect with you to discuss the right approach.
            </p>
            <ul className="mt-9 max-w-[480px] border-t border-[#e3e6ee]" data-testid="c6-trust-points">
              {TRUST_POINTS.map(t => (
                <li key={t} className="flex items-center gap-3.5 border-b border-[#e3e6ee] py-4 text-[15.5px] text-[#1c2440]">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[#2b4c8c]/25 text-[#2b4c8c]" aria-hidden="true">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl border border-[#e3e6ee] bg-white p-6 shadow-[0_1px_2px_rgba(10,18,48,0.04),0_18px_40px_-28px_rgba(10,18,48,0.25)] sm:px-8 sm:py-7" data-testid="c6-form-card">
            {done ? (
              <div ref={successRef} tabIndex={-1} role="status" className="flex min-h-[460px] flex-col items-center justify-center px-2 text-center outline-none" data-testid="c6-success">
                <CheckCircle2 className="h-12 w-12 text-[#1f8a4c]" strokeWidth={1.6} aria-hidden="true" />
                <h2 className="mt-5 text-[22px] font-semibold tracking-[-0.02em]" style={{ fontFamily: 'Geist, Inter, sans-serif' }}>Thank you. We’ve received your request.</h2>
                <p className="mt-2.5 text-[15px] text-[#4a5470]">Our AI consulting team will be in touch shortly.</p>
              </div>
            ) : (
              <>
                <h2 className="text-[22px] font-semibold tracking-[-0.02em]" style={{ fontFamily: 'Geist, Inter, sans-serif' }} data-testid="c6-form-heading">Talk to an AI Consultant</h2>
                <p className="mt-1.5 text-[14.5px] text-[#5b6580]">Tell us a little about your requirement and we’ll get in touch.</p>

                <form onSubmit={onSubmit} noValidate className="mt-5 space-y-3.5" aria-busy={submitting} data-testid="c6-form">
                  <Field id="email" label="Work Email" error={errors.email}>
                    <input id="email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} placeholder="name@company.com"
                      value={form.email} onChange={onInput} disabled={submitting} className={inputCls(errors.email)} {...aria('email')} data-testid="c6-input-email" />
                  </Field>
                  <Field id="fullName" label="Full Name" error={errors.fullName}>
                    <input id="fullName" name="fullName" type="text" autoComplete="name" maxLength={200} placeholder="Your full name"
                      value={form.fullName} onChange={onInput} disabled={submitting} className={inputCls(errors.fullName)} {...aria('fullName')} data-testid="c6-input-full-name" />
                  </Field>
                  <Field id="company" label="Company Name" error={errors.company}>
                    <input id="company" name="company" type="text" autoComplete="organization" maxLength={200} placeholder="Company name"
                      value={form.company} onChange={onInput} disabled={submitting} className={inputCls(errors.company)} {...aria('company')} data-testid="c6-input-company" />
                  </Field>
                  <Field id="service" label="What can we help you with?" error={errors.service}>
                    <PremiumSelect id="service" value={form.service} onChange={v => set('service', v)} options={SERVICE_OPTIONS}
                      placeholder="Select a service" error={errors.service} disabled={submitting} testId="c6-select-service" />
                  </Field>
                  <Field id="message" label="Tell us briefly about your requirement" error={errors.message}>
                    <textarea id="message" name="message" rows={3} maxLength={4000} placeholder="What are you looking to achieve with AI?"
                      value={form.message} onChange={onInput} disabled={submitting} className={`${inputCls(errors.message)} h-auto min-h-[88px] resize-y py-2.5 leading-[1.5]`} {...aria('message')} data-testid="c6-input-message" />
                  </Field>

                  {submitError && <p className="rounded-[10px] border border-[#f1c9cf] bg-[#fdf3f4] px-3.5 py-2.5 text-[13px] text-[#9b1c2c]" role="alert" data-testid="c6-submit-error">{submitError}</p>}

                  <button type="submit" disabled={submitting} aria-busy={submitting}
                    className="mt-1 flex h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#0a1230] text-[15.5px] font-semibold text-white transition-colors duration-150 hover:bg-[#16224d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2b4c8c]/25 disabled:cursor-not-allowed disabled:opacity-70"
                    data-testid="c6-submit">
                    {submitting ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting…</> : 'Talk to an AI Consultant'}
                  </button>
                  <p className="text-center text-[12.5px] leading-[1.6] text-[#6b7590]" data-testid="c6-privacy">
                    By submitting this form, you agree that BluBridge may contact you regarding your inquiry. Please review our{' '}
                    <Link to="/policies/privacy-policy" className="text-[#2b4c8c] underline underline-offset-2" data-testid="c6-privacy-link">Privacy Policy</Link>.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
