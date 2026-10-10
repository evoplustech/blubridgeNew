import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2, Paperclip, X } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import { useWizardSubmission } from '../ai-consulting/useWizardSubmission';
import { focusError } from '../ai-consulting/fieldUtils';
import { clearAccidentalQuery } from '../ai-consulting/clearAccidentalQuery';
import { enquiryHeading, enquiryDescription } from '../ai-consulting/introCopy';
import '../ai-consulting/AiConsulting.css';
import './Consulting18.css';

/* /consulting-18 — /consulting intro + dark "Get in touch" panel. One optional file goes to /api/ai-consulting-attachments/consulting-18
   (backend MAX_FILE_SIZE = 5MB), then the enquiry posts to /api/ai-consulting-enquiries with formVariant "consulting-18". */

const API = window.location.origin;
const MAX_BYTES = 5 * 1024 * 1024;
const FILE_EXT = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.jpg', '.jpeg', '.png'];
const EMPTY = { name: '', email: '', phone: '', message: '', updates: false };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SERVER_TO_FORM = { fullName: 'name', workEmail: 'email', requirement: 'message', attachmentIds: 'file' };

const checks = {
  name: v => (v.trim() ? '' : 'Please enter your name.'),
  email: v => (!v.trim() ? 'Please enter your email.' : EMAIL_RE.test(v.trim()) ? '' : 'Please enter a valid email address.'),
  phone: v => (!v.trim() || (/^[+\d\s().-]{6,40}$/.test(v.trim()) && /^\d{6,15}$/.test(v.replace(/\D/g, ''))) ? '' : 'Please enter a valid phone number.'),
  message: v => (v.trim() ? '' : 'Please enter a message.'),
};
const validate = f => Object.fromEntries(Object.entries(checks).map(([k, fn]) => [k, fn(f[k])]).filter(([, msg]) => msg));

const fileProblem = file => {
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  if (!FILE_EXT.includes(ext)) return 'Allowed formats: pdf, doc, docx, xls, xlsx, ppt, pptx, jpg, jpeg, png.';
  if (file.size > MAX_BYTES) return 'File is too large. Max file size: 5MB.';
  if (!file.size) return 'The selected file is empty.';
  return '';
};

async function uploadFile(file) {
  const body = new FormData();
  body.append('file', file);
  const res = await fetch(`${API}/api/ai-consulting-attachments/consulting-18`, { method: 'POST', body });
  let data = {};
  try { data = await res.json(); } catch { /* ignore */ }
  if (!res.ok) throw new Error(typeof data.detail === 'string' ? data.detail : 'Upload failed. Please try again.');
  return data.attachmentId;
}

function LineField({ name, label, required, type = 'text', value, onChange, onBlur, error, valid, disabled, multiline, autoComplete, maxLength }) {
  const id = `aic-${name}`;
  const Tag = multiline ? 'textarea' : 'input';
  const state = error ? 'bad' : valid ? 'ok' : '';
  return <div className={`c18-field${state ? ` c18-field-${state}` : ''}`} data-testid={`c18-field-${name}`}>
    <Tag id={id} name={name} type={multiline ? undefined : type} rows={multiline ? 1 : undefined} placeholder=" " value={value} onChange={onChange} onBlur={onBlur} disabled={disabled}
      autoComplete={autoComplete} maxLength={maxLength} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}
      className="c18-input" data-testid={`c18-input-${name}`} />
    <label htmlFor={id} className="c18-label">{label}{required && '*'}</label>
    <span className="c18-status" aria-hidden="true" data-testid={`c18-status-${name}`} data-state={state || 'empty'}>{state === 'ok' ? <Check /> : state === 'bad' ? <X /> : null}</span>
    {error && <p id={`${id}-error`} className="c18-error" role="alert" data-testid={`c18-error-${name}`}>{error}</p>}
  </div>;
}

export default function Consulting18() {
  const submission = useWizardSubmission();
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef(null);
  const success = useRef(null);
  const busy = submission.isSubmitting || uploading;
  const disabled = busy || Boolean(submission.receipt);
  const problems = validate(form);
  const canSend = !Object.keys(problems).length && !disabled;
  useDocumentTitle('AI Consulting Services | Tailored AI Systems | BluBridge');
  useMetaDescription(enquiryDescription);
  useEffect(() => { clearAccidentalQuery(); }, []);
  useEffect(() => {
    if (submission.receipt) { success.current?.focus({ preventScroll: true }); success.current?.scrollIntoView({ block: 'center', behavior: 'instant' }); }
  }, [submission.receipt]);

  const errorFor = k => serverErrors[k] || (touched[k] ? problems[k] : '');
  const isValid = k => Boolean(form[k].trim()) && !problems[k] && !serverErrors[k];
  const change = e => {
    if (disabled) return;
    const { name, value, type, checked } = e.target;
    submission.clearSubmission();
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (serverErrors[name]) setServerErrors(s => { const n = { ...s }; delete n[name]; return n; });
  };
  const blur = e => setTouched(t => ({ ...t, [e.target.name]: true }));
  const pickFile = e => {
    const f = e.target.files?.[0]; e.target.value = '';
    if (!f) return;
    const p = fileProblem(f);
    setFileError(p); setFile(p ? null : { file: f, id: null });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (disabled) return;
    setTouched({ name: true, email: true, phone: true, message: true });
    if (Object.keys(problems).length) { focusError(problems); return; }
    let ids = [];
    if (file) {
      setUploading(true);
      try { const id = file.id || await uploadFile(file.file); setFile(f => ({ ...f, id })); ids = [id]; }
      catch (err) { setUploading(false); setFileError(err.message); return; }
      setUploading(false);
    }
    const t = k => form[k].trim();
    const payload = { formVariant: 'consulting-18', fullName: t('name'), workEmail: t('email').toLowerCase(), requirement: t('message'), newsUpdates: form.updates, contactPermission: true };
    if (t('phone')) payload.phone = t('phone');
    if (ids.length) payload.attachmentIds = ids;
    submission.submit(payload, errs => {
      const mapped = Object.fromEntries(Object.entries(errs).map(([k, msg]) => [SERVER_TO_FORM[k] || k, msg]));
      if (mapped.file) setFileError(mapped.file);
      setServerErrors(mapped); focusError(mapped);
    });
  };

  const lf = (name, label, extra = {}) => <LineField name={name} label={label} value={form[name]} onChange={change} onBlur={blur} error={errorFor(name)} valid={isValid(name)} disabled={disabled} {...extra} />;

  return <section className="aic-page aic-base-smooth-page" data-testid="consulting18-page">
    <div className="aic-container">
      <header className="aic-intro">
        <p className="aic-eyebrow" data-testid="aic-eyebrow">GET IN TOUCH</p>
        <h1 className="aic-heading" data-testid="aic-heading">{enquiryHeading}</h1>
        <p className="aic-subtitle" data-testid="aic-subtitle">{enquiryDescription}</p>
      </header>
      <form className="c18-panel" method="post" noValidate onSubmit={handleSubmit} aria-busy={busy} aria-labelledby="c18-title" data-testid="c18-form">
        <h2 id="c18-title" className="c18-title" data-testid="c18-heading">Get in touch</h2>
        {submission.receipt && <div ref={success} tabIndex={-1} className="c18-confirmation" role="status" data-testid="c18-success">
          <p className="font-semibold">Successfully Submitted</p>
          <p>Your message has been received. Our team will be in touch shortly.</p>
        </div>}
        <fieldset className="c18-fieldset" disabled={disabled}>
          <div className="c18-grid">
            <div className="c18-col">
              {lf('name', 'Name', { required: true, autoComplete: 'name', maxLength: 200 })}
              {lf('email', 'Email', { required: true, type: 'email', autoComplete: 'email', maxLength: 254 })}
              <div className="c18-attach" data-testid="c18-attach">
                {file ? <p className="c18-file" data-testid="c18-file-name"><Paperclip aria-hidden="true" /><span className="truncate">{file.file.name}</span>
                  <button type="button" onClick={() => { setFile(null); setFileError(''); }} aria-label={`Remove ${file.file.name}`} data-testid="c18-file-remove"><X /></button></p>
                  : <button type="button" className="c18-attach-btn" onClick={() => fileInput.current?.click()} data-testid="c18-attach-button">
                    <Paperclip aria-hidden="true" /><span><strong>Attach your file</strong><small>up to 5MB</small></span>
                  </button>}
                <input ref={fileInput} id="aic-file" type="file" accept={FILE_EXT.join(',')} className="sr-only" tabIndex={-1} aria-hidden="true" onChange={pickFile} data-testid="c18-file-input" />
                {fileError && <p className="c18-error" role="alert" data-testid="c18-error-file">{fileError}</p>}
              </div>
            </div>
            <div className="c18-col">
              {lf('phone', 'Phone', { type: 'tel', autoComplete: 'tel', maxLength: 40 })}
              {lf('message', 'Message', { required: true, multiline: true, maxLength: 5000 })}
              <p className="c18-legal" data-testid="c18-privacy-text">We will process your personal information in accordance with our <Link to="/policies/privacy-policy" data-testid="c18-privacy-link">Privacy Policy</Link>.</p>
              <label className="c18-check" htmlFor="aic-updates">
                <input id="aic-updates" name="updates" type="checkbox" checked={form.updates} onChange={change} data-testid="c18-updates" />
                <span className="c18-check-dot" aria-hidden="true"><Check /></span>
                <span>I would like to be contacted with news and updates about your events and services</span>
              </label>
            </div>
          </div>
          <button type="submit" className="c18-submit" disabled={!canSend} aria-busy={busy} data-testid="c18-submit">
            {busy && <Loader2 className="animate-spin" aria-hidden="true" />}
            <span aria-live="polite">{submission.receipt ? 'Message sent' : uploading ? 'Uploading…' : submission.isSubmitting ? 'Sending…' : 'Send message'}</span>
          </button>
        </fieldset>
        {submission.submitError && <p className="c18-error c18-submit-error" role="alert" data-testid="c18-submit-error">{submission.submitError}</p>}
      </form>
    </div>
  </section>;
}
