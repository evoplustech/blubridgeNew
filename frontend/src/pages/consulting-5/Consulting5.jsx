import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Building2, Mail, Phone, Pencil, Paperclip, X, FileText, Loader2 } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import { useWizardSubmission } from '../ai-consulting/useWizardSubmission';
import { clearAccidentalQuery } from '../ai-consulting/clearAccidentalQuery';
import { enquiryHeading, enquiryDescription } from '../ai-consulting/introCopy';
import { PremiumSelect } from '../consulting-3/PremiumSelect';
import '../ai-consulting/AiConsulting.css';
import './Consulting5.css';

/* /consulting-5 — copy of /consulting with a single centred "Contact Us" card.
   Submits to the existing /api/ai-consulting-enquiries endpoint (formVariant "consulting-5");
   the optional file goes first to /api/ai-consulting-attachments/consulting-5 (max 2MB). */

const API = window.location.origin;
const CONTACT_EMAIL = 'info@blubridge.com';
const MAX_BYTES = 2 * 1024 * 1024;
const FILE_EXT = ['.doc', '.docx', '.xls', '.xlsx', '.pdf', '.jpg', '.jpeg', '.png'];
const SOURCES = ['Google search', 'LinkedIn', 'Referral', 'Social media', 'Event or conference', 'Other'].map(v => ({ value: v, label: v }));
const B_MIN = 10, B_MAX = 500, B_STEP = 5;

const EMPTY = { name: '', company: '', email: '', phone: '', help: '', source: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SERVER_TO_FORM = { fullName: 'name', workEmail: 'email', requirement: 'help', referralSource: 'source', budgetMin: 'budget', budgetMax: 'budget', attachmentIds: 'file' };

const validate = (f, budget) => {
  const e = {};
  if (!f.name.trim()) e.name = 'Please enter your name.';
  if (!f.company.trim()) e.company = 'Please enter your company name.';
  if (!f.email.trim()) e.email = 'Please enter your business email.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.phone.trim() && (!/^[+\d\s().-]{6,40}$/.test(f.phone.trim()) || !/^\d{6,15}$/.test(f.phone.replace(/\D/g, '')))) e.phone = 'Please enter a valid phone number.';
  if (!f.help.trim()) e.help = 'Please tell us how we can help.';
  if (!f.source) e.source = 'Please tell us how you heard about us.';
  if (budget[0] > budget[1]) e.budget = 'Minimum budget cannot exceed the maximum.';
  return e;
};

const snap = n => Math.min(B_MAX, Math.max(B_MIN, Math.round(n / B_STEP) * B_STEP));
const parseK = text => { const n = parseFloat(String(text).replace(/[^\d.]/g, '')); return Number.isFinite(n) ? n : null; };
const sizeLabel = b => (b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);

function IconField({ id, label, icon: Icon, error, children, top = false }) {
  return <div className="c5-field">
    <label htmlFor={`c5-${id}`} className="sr-only">{label}</label>
    <div className={`c5-control${top ? ' c5-control-top' : ''}${error ? ' c5-control-invalid' : ''}`}>
      <Icon className="c5-icon" size={17} strokeWidth={1.9} aria-hidden="true" />
      {children}
    </div>
    {error && <p id={`c5-${id}-error`} className="c5-error" role="alert" data-testid={`c5-error-${id}`}>{error}</p>}
  </div>;
}

function BudgetInput({ id, label, value, onCommit, testId }) {
  const [text, setText] = useState(`$${value}k`);
  useEffect(() => { setText(`$${value}k`); }, [value]);
  // Always show the value actually applied (snapped to $5k steps and kept within min ≤ max).
  const commit = () => { const n = parseK(text); setText(`$${n === null ? value : onCommit(snap(n))}k`); };
  return <div className="c5-budget-input">
    <label htmlFor={id} className="sr-only">{label}</label>
    <input id={id} type="text" inputMode="numeric" value={text} onChange={e => setText(e.target.value)} onBlur={commit}
      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); commit(); } }} className="c5-input" data-testid={testId} />
  </div>;
}

export default function Consulting5() {
  useDocumentTitle('AI Consulting Services | Tailored AI Systems | BluBridge');
  useMetaDescription(enquiryDescription);
  const submission = useWizardSubmission();
  const [form, setForm] = useState(EMPTY);
  const [budget, setBudget] = useState([B_MIN, B_MIN]);
  const [file, setFile] = useState(null); // { blob, name, size, id? }
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef(null);
  const success = useRef(null);
  const busy = uploading || submission.isSubmitting;
  const done = Boolean(submission.receipt);

  useEffect(() => { clearAccidentalQuery(); }, []);
  useEffect(() => { if (done) { success.current?.focus({ preventScroll: true }); success.current?.scrollIntoView({ block: 'center' }); } }, [done]);

  const clearError = name => setErrors(e => { if (!e[name]) return e; const n = { ...e }; delete n[name]; return n; });
  const set = (name, value) => { if (busy || done) return; submission.clearSubmission(); setForm(f => ({ ...f, [name]: value })); clearError(name); };
  const onInput = e => set(e.target.name, e.target.value);
  const aria = id => ({ 'aria-invalid': Boolean(errors[id]), 'aria-describedby': errors[id] ? `c5-${id}-error` : undefined });

  const setMin = v => { const n = Math.min(snap(v), budget[1]); setBudget([n, budget[1]]); clearError('budget'); return n; };
  const setMax = v => { const n = Math.max(snap(v), budget[0]); setBudget([budget[0], n]); clearError('budget'); return n; };
  const pct = v => ((v - B_MIN) / (B_MAX - B_MIN)) * 100;

  const onFile = e => {
    const f = e.target.files?.[0];
    e.target.value = '';
    clearError('file');
    if (!f) return;
    const ext = f.name.slice(f.name.lastIndexOf('.')).toLowerCase();
    if (!FILE_EXT.includes(ext)) { setErrors(er => ({ ...er, file: 'Allowed file formats: doc, xls, pdf, jpg, png.' })); return; }
    if (f.size > MAX_BYTES) { setErrors(er => ({ ...er, file: 'File is too large. Max file size: 2MB.' })); return; }
    if (!f.size) { setErrors(er => ({ ...er, file: 'The selected file is empty.' })); return; }
    setFile({ blob: f, name: f.name, size: f.size });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (busy || done) return;
    const v = validate(form, budget);
    setErrors(prev => (prev.file ? { ...v, file: prev.file } : v));
    const first = ['name', 'company', 'email', 'phone', 'help', 'source'].find(k => v[k]);
    if (first) { document.getElementById(`c5-${first}`)?.focus(); return; }
    if (Object.keys(v).length) return;
    let attachmentId = file?.id;
    if (file && !attachmentId) {
      setUploading(true);
      try {
        const body = new FormData();
        body.append('file', file.blob, file.name);
        const res = await fetch(`${API}/api/ai-consulting-attachments/consulting-5`, { method: 'POST', body });
        let data = {};
        try { data = await res.json(); } catch { /* ignore */ }
        if (!res.ok) throw new Error(typeof data.detail === 'string' ? data.detail : res.status === 413 ? 'File is too large. Max file size: 2MB.' : 'File upload failed. Please try again.');
        attachmentId = data.attachmentId;
        setFile(f => (f ? { ...f, id: attachmentId } : f));
      } catch (err) {
        setErrors(er => ({ ...er, file: err.message }));
        setUploading(false);
        return;
      }
      setUploading(false);
    }
    const payload = {
      formVariant: 'consulting-5',
      fullName: form.name.trim(),
      company: form.company.trim(),
      workEmail: form.email.trim(),
      requirement: form.help.trim(),
      referralSource: form.source,
      budgetMin: budget[0],
      budgetMax: budget[1],
      contactPermission: true, // agreement given by clicking Send Message (see notice under the button)
    };
    if (form.phone.trim()) payload.phone = form.phone.trim();
    if (attachmentId) payload.attachmentIds = [attachmentId];
    submission.submit(payload, serverErrors => {
      setErrors(Object.fromEntries(Object.entries(serverErrors).map(([k, val]) => [SERVER_TO_FORM[k] || k, val])));
    });
  };

  useEffect(() => {
    if (submission.submitError && /attach|file/i.test(submission.submitError)) setFile(f => (f ? { ...f, id: undefined } : f));
  }, [submission.submitError]);

  return <section className="aic-page aic-base-smooth-page" data-testid="consulting5-page">
    <div className="aic-container">
      <header className="aic-intro">
        <p className="aic-eyebrow" data-testid="aic-eyebrow">GET IN TOUCH</p>
        <h1 className="aic-heading" data-testid="aic-heading">{enquiryHeading}</h1>
        <p className="aic-subtitle" data-testid="aic-subtitle">{enquiryDescription}</p>
      </header>

      <div className="c5-card" data-testid="c5-card">
        {done ? <div ref={success} tabIndex={-1} role="status" className="aic-confirmation c5-success" data-testid="aic-success">
          <p className="font-semibold" data-testid="aic-success-message">Successfully Submitted</p>
          <p data-testid="aic-success-details">Thanks for getting in touch. Our team will review your message and contact you shortly.</p>
        </div> : <>
          <h2 className="c5-title" data-testid="c5-title">Contact Us</h2>
          <p className="c5-intro" data-testid="c5-intro">
            Drop us a line about your project or describe a challenge your company needs help solving. We’d love to discuss how BluBridge can work with you. Please get in touch via email at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} data-testid="c5-email-link">{CONTACT_EMAIL}</a> or using the form below.
          </p>

          <form className="c5-form" onSubmit={handleSubmit} noValidate aria-busy={busy} data-testid="c5-form">
            <IconField id="name" label="Name" icon={User} error={errors.name}>
              <input id="c5-name" name="name" type="text" autoComplete="name" maxLength={200} placeholder="Name*" value={form.name} onChange={onInput} disabled={busy} className="c5-input" {...aria('name')} data-testid="c5-input-name" />
            </IconField>
            <IconField id="company" label="Company Name" icon={Building2} error={errors.company}>
              <input id="c5-company" name="company" type="text" autoComplete="organization" maxLength={200} placeholder="Company Name*" value={form.company} onChange={onInput} disabled={busy} className="c5-input" {...aria('company')} data-testid="c5-input-company" />
            </IconField>
            <div className="c5-row">
              <IconField id="email" label="Business email" icon={Mail} error={errors.email}>
                <input id="c5-email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} placeholder="Business email*" value={form.email} onChange={onInput} disabled={busy} className="c5-input" {...aria('email')} data-testid="c5-input-email" />
              </IconField>
              <IconField id="phone" label="Phone" icon={Phone} error={errors.phone}>
                <input id="c5-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Phone" value={form.phone} onChange={onInput} disabled={busy} className="c5-input" {...aria('phone')} data-testid="c5-input-phone" />
              </IconField>
            </div>
            <IconField id="help" label="How can we help you?" icon={Pencil} error={errors.help} top>
              <textarea id="c5-help" name="help" rows={3} maxLength={5000} placeholder="How can we help you?*" value={form.help} onChange={onInput} disabled={busy} className="c5-input c5-textarea" {...aria('help')} data-testid="c5-input-help" />
            </IconField>
            <div className="c5-field">
              <label htmlFor="c5-source" className="sr-only">How did you hear about us?</label>
              <PremiumSelect id="c5-source" value={form.source} onChange={v => set('source', v)} options={SOURCES} placeholder="How did you hear about us?*" error={errors.source} disabled={busy} testId="c5-select-source" />
              {errors.source && <p id="c5-source-error" className="c5-error" role="alert" data-testid="c5-error-source">{errors.source}</p>}
            </div>

            <div className="c5-file">
              {file ? <div className="c5-chip" data-testid="c5-file-chip">
                <FileText size={16} aria-hidden="true" />
                <span className="c5-chip-name">{file.name}</span><span className="c5-chip-size">{sizeLabel(file.size)}</span>
                <button type="button" onClick={() => { setFile(null); clearError('file'); }} disabled={busy} aria-label={`Remove ${file.name}`} data-testid="c5-remove-file"><X size={14} /></button>
              </div> : <button type="button" className="c5-file-btn" onClick={() => fileInput.current?.click()} disabled={busy} data-testid="c5-choose-file">
                <Paperclip size={16} aria-hidden="true" /> Choose a file
              </button>}
              <input ref={fileInput} type="file" accept={FILE_EXT.join(',')} className="sr-only" tabIndex={-1} onChange={onFile} data-testid="c5-file-input" />
              <p className="c5-helper">Max file size: 2MB. Allowed file formats: doc, xls, pdf, jpg, png.</p>
              {errors.file && <p className="c5-error" role="alert" data-testid="c5-error-file">{errors.file}</p>}
            </div>

            <div className="c5-budget" data-testid="c5-budget">
              <p className="c5-budget-title">Please define your budget range for your project:</p>
              <p className="c5-budget-sub">It’ll help us better understand what we can do to turn your idea into reality.</p>
              <div className="c5-row c5-budget-row">
                <BudgetInput id="c5-budget-min" label="Minimum budget" value={budget[0]} onCommit={setMin} testId="c5-budget-min" />
                <BudgetInput id="c5-budget-max" label="Maximum budget" value={budget[1]} onCommit={setMax} testId="c5-budget-max" />
              </div>
              <div className="c5-range" style={{ '--c5-from': `${pct(budget[0])}%`, '--c5-to': `${pct(budget[1])}%` }}>
                <span className="c5-range-track" aria-hidden="true" />
                <input type="range" min={B_MIN} max={B_MAX} step={B_STEP} value={budget[0]} onChange={e => setMin(Number(e.target.value))} disabled={busy}
                  aria-label="Minimum budget" aria-valuetext={`$${budget[0]}k`} className={budget[0] >= B_MAX - B_STEP ? 'c5-range-top' : ''} data-testid="c5-range-min" />
                <input type="range" min={B_MIN} max={B_MAX} step={B_STEP} value={budget[1]} onChange={e => setMax(Number(e.target.value))} disabled={busy}
                  aria-label="Maximum budget" aria-valuetext={`$${budget[1]}k`} data-testid="c5-range-max" />
              </div>
              {errors.budget && <p className="c5-error" role="alert" data-testid="c5-error-budget">{errors.budget}</p>}
            </div>

            <button type="submit" className="c5-submit" disabled={busy} aria-busy={busy} data-testid="c5-submit">
              {busy ? <><Loader2 size={17} className="animate-spin" aria-hidden="true" /> {uploading ? 'Uploading…' : 'Sending…'}</> : 'Send Message'}
            </button>
            {submission.submitError && <p className="c5-error c5-submit-error" role="alert" data-testid="c5-submit-error">{submission.submitError}</p>}
            <p className="c5-terms" data-testid="c5-terms">
              By clicking Send Message, you agree to our <Link to="/policies/terms-conditions" data-testid="c5-terms-link">Terms of Use</Link> and <Link to="/policies/privacy-policy" data-testid="c5-privacy-link">Privacy Policy</Link>.
            </p>
          </form>
        </>}
      </div>
    </div>
  </section>;
}
