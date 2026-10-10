import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader2, UploadCloud, X } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import { useWizardSubmission } from '../ai-consulting/useWizardSubmission';
import { FormField, FieldError } from '../ai-consulting/FormField';
import { focusError } from '../ai-consulting/fieldUtils';
import { clearAccidentalQuery } from '../ai-consulting/clearAccidentalQuery';
import './Consulting17.css';
import { API_ORIGIN } from '../../apiOrigin';

/* /consulting-17 — "what happens next" timeline + brand form card. Files go to /api/ai-consulting-attachments/consulting-17,
   then the enquiry posts to /api/ai-consulting-enquiries with formVariant "consulting-17". The call slot is a preference only. */

const API = API_ORIGIN;
const MAX_FILES = 3;
const MAX_BYTES = 3 * 1024 * 1024;
const FILE_EXT = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.jpg', '.jpeg', '.png'];
const BUDGETS = ['Under $10k', '$10k - $50k', '$50k - $100k', '$100k - $250k', '$250k+', 'Not sure yet'];
const SOURCES = ['Google search', 'LinkedIn', 'Referral', 'Social media', 'Event', 'Other'];
const BASE_ZONES = ['UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'Europe/London', 'Europe/Berlin', 'Europe/Paris', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney'];
const SLOTS = Array.from({ length: 16 }, (_, i) => `${String(10 + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 ? '30' : '00'}`);
const STEPS = [
  ['Free technical consultation', 'Our AI consultants put together a detailed plan for your project, covering the right models, system architecture, deployment approach, timeline and budget.'],
  ['Connect with the tech team', 'Over a series of calls, our engineers discuss the technologies and approaches best suited to your goals, from LLM and RAG systems to custom model development.'],
  ['Onboarding the team', 'Once the engagement is signed off, our team is ready to work alongside yours and take your AI initiative from strategy through to deployment.'],
];
const EMPTY = { name: '', email: '', phone: '', company: '', description: '', budget: '', source: '', day: '', time: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SERVER_TO_FORM = { fullName: 'name', workEmail: 'email', requirement: 'description', budgetRange: 'budget', referralSource: 'source', attachmentIds: 'files', preferredDay: 'day', preferredTime: 'time' };
const browserZone = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch { return 'UTC'; } })();
const ZONES = BASE_ZONES.includes(browserZone) ? BASE_ZONES : [browserZone, ...BASE_ZONES];
const zoneLabel = z => z.replace(/_/g, ' ').replace('/', ' / ');
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const weekdays = (offset, count = 7) => {
  const out = []; const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + 1);
  let skipped = 0;
  while (out.length < count) {
    if (d.getDay() !== 0 && d.getDay() !== 6) { if (skipped >= offset) out.push(new Date(d)); else skipped += 1; }
    d.setDate(d.getDate() + 1);
  }
  return out;
};

const validate = f => {
  const e = {};
  if (!f.name.trim()) e.name = 'Please enter your name.';
  if (!f.email.trim()) e.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.phone.trim() && (!/^[+\d\s().-]{6,40}$/.test(f.phone.trim()) || !/^\d{6,15}$/.test(f.phone.replace(/\D/g, '')))) e.phone = 'Please enter a valid phone number.';
  if (!f.description.trim()) e.description = 'Please describe your project briefly.';
  if (!f.budget) e.budget = 'Please choose the budget.';
  if (f.time && !f.day) e.day = 'Please select a day for the call.';
  return e;
};

const fileProblem = (file, count) => {
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  if (count >= MAX_FILES) return `No more than ${MAX_FILES} files may be attached.`;
  if (!FILE_EXT.includes(ext)) return `“${file.name}” is not allowed. Formats: pdf, doc, docx, ppt, pptx, jpg, jpeg, png.`;
  if (file.size > MAX_BYTES) return `“${file.name}” is larger than 3MB.`;
  if (!file.size) return `“${file.name}” is empty.`;
  return '';
};

async function uploadFile(file) {
  const body = new FormData();
  body.append('file', file);
  const res = await fetch(`${API}/api/ai-consulting-attachments/consulting-17`, { method: 'POST', body });
  let data = {};
  try { data = await res.json(); } catch { /* ignore */ }
  if (!res.ok) throw new Error(typeof data.detail === 'string' ? `${file.name}: ${data.detail}` : `${file.name}: upload failed. Please try again.`);
  return data.attachmentId;
}

function Timeline() {
  return <aside className="c17-next" aria-labelledby="c17-next-title" data-testid="c17-next">
    <h2 id="c17-next-title" className="c17-next-title">What will happen next?</h2>
    <p className="c17-next-line">We will get back to you shortly.</p>
    <p className="c17-next-line">You are a step closer to building AI that delivers real results.</p>
    <ol className="c17-steps">
      {STEPS.map(([t, d], i) => <li key={t} data-testid={`c17-step-${i}`}><h3>{i + 1}. {t}</h3><p>{d}</p></li>)}
    </ol>
  </aside>;
}

function Dropzone({ files, onAdd, onRemove, error, disabled }) {
  const input = useRef(null);
  const [over, setOver] = useState(false);
  return <div data-testid="c17-attachments">
    <div className={`c17-drop${over ? ' c17-drop-over' : ''}`} onDragOver={e => { e.preventDefault(); if (!disabled) setOver(true); }} onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); if (!disabled) onAdd([...e.dataTransfer.files]); }} data-testid="c17-dropzone">
      <UploadCloud className="c17-drop-icon" aria-hidden="true" />
      <p className="c17-drop-text">Drag files or browse to upload (optional)<span>Up to 3 files, 3MB each: pdf, doc, docx, ppt, pptx, jpg, png</span></p>
      <button type="button" className="c17-upload" disabled={disabled || files.length >= MAX_FILES} onClick={() => input.current?.click()} data-testid="c17-upload-button">Upload</button>
      <input ref={input} id="aic-files" type="file" multiple accept={FILE_EXT.join(',')} className="sr-only" tabIndex={-1} aria-hidden="true"
        onChange={e => { onAdd([...e.target.files]); e.target.value = ''; }} data-testid="c17-file-input" />
    </div>
    {files.length > 0 && <ul className="c17-files" data-testid="c17-file-list">
      {files.map((f, i) => <li key={`${f.file.name}-${i}`} data-testid={`c17-file-${i}`}>
        <span className="truncate">{f.file.name}</span>
        <button type="button" disabled={disabled} onClick={() => onRemove(i)} aria-label={`Remove ${f.file.name}`} data-testid={`c17-file-remove-${i}`}><X /></button>
      </li>)}
    </ul>}
    <FieldError name="files" error={error} />
  </div>;
}

function Scheduler({ form, set, zone, setZone, errors, disabled }) {
  const [week, setWeek] = useState(0);
  const days = useMemo(() => weekdays(week * 7), [week]);
  return <div className="c17-sched" data-testid="c17-scheduler">
    <div className="c17-sched-head"><span id="c17-day-label">Select a day</span><span className="c17-meeting"><span aria-hidden="true" />30 Min Meeting</span></div>
    <div className="c17-days" role="group" aria-labelledby="c17-day-label">
      <button type="button" className="c17-arrow" disabled={disabled || week === 0} onClick={() => setWeek(w => w - 1)} aria-label="Previous days" data-testid="c17-days-prev"><ChevronLeft /></button>
      <div className="c17-day-row">
        {days.map(d => { const v = iso(d); const on = form.day === v; return <button key={v} id={on ? 'aic-day' : undefined} type="button" aria-pressed={on} disabled={disabled}
          onClick={() => set('day', on ? '' : v)} className={`c17-day${on ? ' c17-day-on' : ''}`} data-testid={`c17-day-${v}`}>
          <strong>{d.toLocaleDateString('en-US', { weekday: 'short' })}</strong>{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </button>; })}
      </div>
      <button type="button" className="c17-arrow" disabled={disabled || week >= 7} onClick={() => setWeek(w => w + 1)} aria-label="Later days" data-testid="c17-days-next"><ChevronRight /></button>
    </div>
    <FieldError name="day" error={errors.day} />
    <div className="c17-sched-selects">
      <label className="c17-inline-select">Timezone -
        <select value={zone} onChange={e => setZone(e.target.value)} disabled={disabled} data-testid="c17-timezone">{ZONES.map(z => <option key={z} value={z}>{zoneLabel(z)}</option>)}</select>
      </label>
      <label className="c17-inline-select">Schedule Meeting -
        <select id="aic-time" value={form.time} onChange={e => set('time', e.target.value)} disabled={disabled} data-testid="c17-time">
          <option value="">Select a time slot</option>{SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
    </div>
    <p className="c17-sched-note" data-testid="c17-sched-note">This sends your preferred time only. Our team will confirm the meeting by email.</p>
  </div>;
}

export default function Consulting17() {
  const submission = useWizardSubmission();
  const [form, setForm] = useState(EMPTY);
  const [zone, setZone] = useState(browserZone);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const success = useRef(null);
  const busy = submission.isSubmitting || uploading;
  const disabled = busy || Boolean(submission.receipt);
  useDocumentTitle('AI Consulting Services | Tailored AI Systems | BluBridge');
  useMetaDescription('Get in touch with BluBridge to discuss your AI project, request a quote or schedule a free technical consultation with our team.');
  useEffect(() => { clearAccidentalQuery(); }, []);
  useEffect(() => {
    if (submission.receipt) { success.current?.focus({ preventScroll: true }); success.current?.scrollIntoView({ block: 'center', behavior: 'instant' }); }
  }, [submission.receipt]);

  const clearError = name => setErrors(prev => { if (!prev[name]) return prev; const n = { ...prev }; delete n[name]; return n; });
  const set = (name, value) => { if (disabled) return; submission.clearSubmission(); setForm(f => ({ ...f, [name]: value })); clearError(name); if (name === 'time') clearError('day'); };
  const change = e => set(e.target.name, e.target.value);
  const addFiles = picked => {
    const next = [...files]; let problem = '';
    picked.forEach(file => { const p = fileProblem(file, next.length); if (p) problem = problem || p; else next.push({ file, id: null }); });
    setFiles(next);
    if (problem) setErrors(prev => ({ ...prev, files: problem })); else clearError('files');
  };
  const removeFile = i => { setFiles(fs => fs.filter((_, j) => j !== i)); clearError('files'); };

  const handleSubmit = async e => {
    e.preventDefault();
    if (disabled) return;
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) { focusError(v); return; }
    let ids = [];
    if (files.length) {
      setUploading(true);
      try {
        ids = await Promise.all(files.map(f => f.id || uploadFile(f.file)));
        setFiles(fs => fs.map((f, i) => ({ ...f, id: ids[i] })));
      } catch (err) {
        setUploading(false); setErrors({ files: err.message }); focusError({ files: err.message });
        return;
      }
      setUploading(false);
    }
    const t = k => form[k].trim();
    const payload = { formVariant: 'consulting-17', fullName: t('name'), workEmail: t('email').toLowerCase(), requirement: t('description'), budgetRange: form.budget, contactPermission: true };
    if (t('phone')) payload.phone = t('phone');
    if (t('company')) payload.company = t('company');
    if (form.source) payload.referralSource = form.source;
    if (form.day) { payload.preferredDay = form.day; payload.timezone = zone; }
    if (form.time) { payload.preferredTime = form.time; payload.timezone = zone; }
    if (ids.length) payload.attachmentIds = ids;
    submission.submit(payload, serverErrors => {
      const mapped = Object.fromEntries(Object.entries(serverErrors).map(([k, msg]) => [SERVER_TO_FORM[k] || k, msg]));
      setErrors(mapped); focusError(mapped);
    });
  };

  const field = (name, label, required, type = 'text', autoComplete = 'off', maxLength = 200, options) => <FormField name={name} label={label} required={required} type={type}
    autoComplete={autoComplete} maxLength={maxLength} options={options} placeholder={options ? (name === 'budget' ? 'Please Choose the Budget*' : 'How did you hear about us?') : `${label}${required ? '*' : ''}`}
    value={form[name]} onChange={change} error={errors[name]} disabled={disabled} />;

  return <div className="c17-page" data-testid="consulting17-page">
    <div className="c17-wrap c17-grid">
      <Timeline />
      <form className="c17-card" method="post" noValidate onSubmit={handleSubmit} aria-busy={busy} aria-labelledby="c17-form-title" data-testid="c17-form">
        <h1 id="c17-form-title" className="c17-card-title" data-testid="c17-heading">Get in touch to discuss your project, request a quote or even just to pick our brains.</h1>
        <p className="c17-card-sub">To apply for a job, visit the <Link to="/careers" data-testid="c17-careers-link">career page.</Link></p>
        {submission.receipt && <div ref={success} tabIndex={-1} className="c17-confirmation" role="status" data-testid="c17-success">
          <p className="font-semibold">Successfully Submitted</p>
          <p>Your enquiry has been received. Our team will be in touch shortly{form.day || form.time ? ' and will confirm your call by email' : ''}.</p>
        </div>}
        <fieldset className="c17-fieldset" disabled={disabled}>
          <h2 className="c17-sec">1. Tell us about your company</h2>
          <div className="c17-stack">
            {field('name', 'Your Name', true, 'text', 'name')}
            <div className="c17-two">
              {field('email', 'Your Email', true, 'email', 'email', 254)}
              {field('phone', 'Your Phone Number', false, 'tel', 'tel', 40)}
            </div>
            {field('company', 'Company Name or Website', false, 'text', 'organization')}
          </div>

          <h2 className="c17-sec">2. Tell us more about your project</h2>
          <div className="c17-stack">
            {field('description', 'Describe Your Project Briefly', true, 'textarea', 'off', 5000)}
            {field('budget', 'Please Choose the Budget', true, 'text', 'off', 200, BUDGETS)}
            <Dropzone files={files} onAdd={addFiles} onRemove={removeFile} error={errors.files} disabled={disabled} />
          </div>

          <h2 className="c17-sec">3. Where did you hear about us?</h2>
          {field('source', 'How did you hear about us?', false, 'text', 'off', 200, SOURCES)}

          <h2 className="c17-sec">4. Schedule a call with our tech expert. Get a tech consultation for free! <span className="c17-optional">(optional)</span></h2>
          <Scheduler form={form} set={set} zone={zone} setZone={setZone} errors={errors} disabled={disabled} />

          <p className="c17-consent" data-testid="c17-consent">By clicking the button ‘SUBMIT’ you acknowledge reading and accepting our <Link to="/policies/privacy-policy" data-testid="c17-privacy-link">Privacy Policy.</Link></p>
          <button type="submit" className="c17-submit" disabled={disabled} aria-busy={busy} data-testid="c17-submit">
            {busy && <Loader2 className="animate-spin" aria-hidden="true" />}
            <span aria-live="polite">{submission.receipt ? 'Submitted' : uploading ? 'Uploading…' : submission.isSubmitting ? 'Submitting…' : 'Submit'}</span>
          </button>
        </fieldset>
        {submission.submitError && <p className="aic-error" role="alert" data-testid="c17-submit-error">{submission.submitError}</p>}
      </form>
    </div>
  </div>;
}
