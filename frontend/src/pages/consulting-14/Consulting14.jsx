import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Paperclip, ShieldCheck, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import { useWizardSubmission } from '../ai-consulting/useWizardSubmission';
import { FormField, FieldError } from '../ai-consulting/FormField';
import { focusError } from '../ai-consulting/fieldUtils';
import { clearAccidentalQuery } from '../ai-consulting/clearAccidentalQuery';
import { enquiryHeading, enquiryDescription } from '../ai-consulting/introCopy';
import '../ai-consulting/AiConsulting.css';
import '../ai-consulting-base/Dropdowns.css';

/* /consulting-14 — copy of /consulting with a short request form + up to 3 files (uploaded to /api/ai-consulting-attachments/consulting-14, then
   posted to /api/ai-consulting-enquiries with formVariant "consulting-14"). */

const API = window.location.origin;
const MAX_FILES = 3;
const MAX_BYTES = 3 * 1024 * 1024;
const FILE_EXT = ['.doc', '.docx', '.pdf', '.ppt', '.pptx'];
const EMPTY = { name: '', email: '', phone: '', requirements: '', nda: false };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SERVER_TO_FORM = { fullName: 'name', workEmail: 'email', requirement: 'requirements', attachmentIds: 'files' };

const validate = f => {
  const e = {};
  if (!f.name.trim()) e.name = 'Please enter your name.';
  if (!f.email.trim()) e.email = 'Please enter your corporate e-mail.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid e-mail address.';
  if (!f.phone.trim()) e.phone = 'Please enter your phone number.';
  else if (!/^[+\d\s().-]{6,40}$/.test(f.phone.trim()) || !/^\d{6,15}$/.test(f.phone.replace(/\D/g, ''))) e.phone = 'Please enter a valid phone number.';
  if (!f.requirements.trim()) e.requirements = 'Please describe your project requirements.';
  return e;
};

const fileProblem = (file, count) => {
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  if (count >= MAX_FILES) return `No more than ${MAX_FILES} files may be attached.`;
  if (!FILE_EXT.includes(ext)) return `“${file.name}” is not allowed. Formats: doc, docx, pdf, ppt, pptx.`;
  if (file.size > MAX_BYTES) return `“${file.name}” is larger than 3MB.`;
  if (!file.size) return `“${file.name}” is empty.`;
  return '';
};

async function uploadFile(file) {
  const body = new FormData();
  body.append('file', file);
  const res = await fetch(`${API}/api/ai-consulting-attachments/consulting-14`, { method: 'POST', body });
  let data = {};
  try { data = await res.json(); } catch { /* ignore */ }
  if (!res.ok) throw new Error(typeof data.detail === 'string' ? `${file.name}: ${data.detail}` : `${file.name}: upload failed. Please try again.`);
  return data.attachmentId;
}

const kb = n => (n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`);

function Attachments({ files, onAdd, onRemove, error, disabled }) {
  const input = useRef(null);
  return <div className="aic-field" data-testid="c14-attachments">
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <button type="button" disabled={disabled || files.length >= MAX_FILES} onClick={() => input.current?.click()} aria-describedby="c14-files-help"
        className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[5px] border border-[#d4dae4] bg-white text-sm font-medium text-[#0B1F3B] transition-colors hover:border-[#0B1F3B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3B]/30 disabled:opacity-50 disabled:cursor-not-allowed" data-testid="c14-attach-button">
        <Paperclip className="w-4 h-4" aria-hidden="true" />Attach file
      </button>
      <p id="c14-files-help" className="text-xs leading-5 text-gray-500" data-testid="c14-files-help">No more than 3 files may be attached up to 3MB each. Formats: doc, docx, pdf, ppt, pptx.</p>
      <input ref={input} id="aic-files" type="file" multiple accept={FILE_EXT.join(',')} className="sr-only" tabIndex={-1} aria-hidden="true"
        onChange={e => { onAdd([...e.target.files]); e.target.value = ''; }} data-testid="c14-file-input" />
    </div>
    {files.length > 0 && <ul className="mt-3 space-y-2" data-testid="c14-file-list">
      {files.map((f, i) => <li key={`${f.file.name}-${i}`} className="flex items-center justify-between gap-3 rounded-[5px] border border-[#e3e7ee] bg-[#f7f8fa] px-3 py-2 text-sm" data-testid={`c14-file-${i}`}>
        <span className="min-w-0 truncate text-[#0B1F3B]">{f.file.name} <span className="text-gray-500">({kb(f.file.size)})</span></span>
        <button type="button" disabled={disabled} onClick={() => onRemove(i)} aria-label={`Remove ${f.file.name}`} className="shrink-0 p-1 rounded text-gray-500 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3B]/30" data-testid={`c14-file-remove-${i}`}><X className="w-4 h-4" /></button>
      </li>)}
    </ul>}
    <FieldError name="files" error={error} />
  </div>;
}

export default function Consulting14() {
  const submission = useWizardSubmission();
  const [form, setForm] = useState(EMPTY);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const success = useRef(null);
  const busy = submission.isSubmitting || uploading;
  const disabled = busy || Boolean(submission.receipt);
  useDocumentTitle('AI Consulting Services | Tailored AI Systems | BluBridge');
  useMetaDescription(enquiryDescription);
  useEffect(() => { clearAccidentalQuery(); }, []);
  useEffect(() => {
    if (submission.receipt) { success.current?.focus({ preventScroll: true }); success.current?.scrollIntoView({ block: 'center', behavior: 'instant' }); }
  }, [submission.receipt]);

  const clearError = name => setErrors(prev => { if (!prev[name]) return prev; const n = { ...prev }; delete n[name]; return n; });
  const change = e => {
    if (disabled) return;
    const { name, value, type, checked } = e.target;
    submission.clearSubmission();
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    clearError(name);
  };
  const addFiles = picked => {
    const next = [...files];
    let problem = '';
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
        setUploading(false);
        setErrors({ files: err.message }); focusError({ files: err.message });
        return;
      }
      setUploading(false);
    }
    const payload = {
      formVariant: 'consulting-14', fullName: form.name.trim(), workEmail: form.email.trim().toLowerCase(), phone: form.phone.trim(),
      requirement: form.requirements.trim(), ndaRequested: form.nda, contactPermission: true,
    };
    if (ids.length) payload.attachmentIds = ids;
    submission.submit(payload, serverErrors => {
      const mapped = Object.fromEntries(Object.entries(serverErrors).map(([k, msg]) => [SERVER_TO_FORM[k] || k, msg]));
      setErrors(mapped); focusError(mapped);
    });
  };

  const field = (name, label, type, autoComplete, maxLength) => <FormField name={name} label={label} required type={type} autoComplete={autoComplete} maxLength={maxLength}
    placeholder={label} value={form[name]} onChange={change} error={errors[name]} disabled={disabled} />;

  return <section className="aic-page aic-base-smooth-page" data-testid="consulting14-page">
    <div className="aic-container">
      <header className="aic-intro">
        <p className="aic-eyebrow" data-testid="aic-eyebrow">GET IN TOUCH</p>
        <h1 className="aic-heading" data-testid="aic-heading">{enquiryHeading}</h1>
        <p className="aic-subtitle" data-testid="aic-subtitle">{enquiryDescription}</p>
      </header>
      <form className="aic-form-surface" method="post" noValidate onSubmit={handleSubmit} aria-busy={busy} aria-labelledby="aic-form-heading" data-testid="c14-form">
        <h2 id="aic-form-heading" className="sr-only">Send a request</h2>
        {submission.receipt && <div ref={success} tabIndex={-1} className="aic-confirmation" role="status" data-testid="c14-success">
          <p className="font-semibold">Successfully Submitted</p>
          <p>Your request has been received. Our team will be in touch shortly.</p>
        </div>}
        <fieldset className="aic-submit-fields" disabled={disabled}>
          <section className="aic-form-section space-y-6" aria-label="Your request" data-testid="c14-fields">
            {field('name', 'Name', 'text', 'name', 200)}
            {field('email', 'Corporate E-mail', 'email', 'email', 254)}
            {field('phone', 'Phone number', 'tel', 'tel', 40)}
            {field('requirements', 'Describe your project requirements', 'textarea', 'off', 5000)}
            <Attachments files={files} onAdd={addFiles} onRemove={removeFile} error={errors.files} disabled={disabled} />
          </section>
          <section className="aic-form-section" aria-label="NDA and consent" data-testid="c14-section-consent">
            <label className="aic-choice aic-permission" htmlFor="aic-nda">
              <input id="aic-nda" name="nda" type="checkbox" checked={form.nda} onChange={change} data-testid="c14-nda" />
              <span className="aic-base-consent-copy">I want to protect my data by signing an NDA.</span>
            </label>
            <p className="mt-4 text-xs leading-5 text-gray-500" data-testid="c14-consent-text">By submitting this request, you acknowledge that BluBridge may process your data for the purpose of contacting you. Please read our <Link to="/policies/privacy-policy" className="underline underline-offset-2 text-[#0B1F3B]" data-testid="c14-privacy-link">Privacy Policy</Link>.</p>
          </section>
          <div className="aic-actions flex flex-col sm:flex-row sm:items-center gap-4">
            <Button type="submit" className="aic-primary" disabled={disabled} aria-busy={busy} data-testid="c14-submit">
              {busy && <Loader2 className="aic-base-submit-spinner" aria-hidden="true" />}
              <span aria-live="polite">{submission.receipt ? 'Request sent' : uploading ? 'Uploading files…' : submission.isSubmitting ? 'Sending…' : 'Send request'}</span>
            </Button>
            <p className="inline-flex items-center gap-2 text-sm text-gray-600" data-testid="c14-privacy-note"><ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" />Your privacy is protected</p>
          </div>
        </fieldset>
        {submission.submitError && <p className="aic-error aic-submit-error" role="alert" data-testid="c14-submit-error">{submission.submitError}</p>}
      </form>
    </div>
  </section>;
}
