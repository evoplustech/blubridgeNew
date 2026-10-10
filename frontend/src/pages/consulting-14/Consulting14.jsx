import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Paperclip, ShieldCheck, X } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import { useWizardSubmission } from '../ai-consulting/useWizardSubmission';
import { FormField, FieldError } from '../ai-consulting/FormField';
import { focusError } from '../ai-consulting/fieldUtils';
import { clearAccidentalQuery } from '../ai-consulting/clearAccidentalQuery';
import { enquiryDescription } from '../ai-consulting/introCopy';
import { services, optionLabel } from '../ai-consulting/options';
import './Consulting14.css';
import { API_ORIGIN } from '../../apiOrigin';

/* /consulting-14 — Andersen-style contact layout with a short request form + up to 3 files (uploaded to /api/ai-consulting-attachments/consulting-14, then
   posted to /api/ai-consulting-enquiries with formVariant "consulting-14"). */

const API = API_ORIGIN;
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

const DEMANDS = services.map(([, label]) => label);
const STEPS = [
  'A BluBridge expert reviews your requirements and contacts you to discuss them;',
  'If needed, we sign an NDA to keep your information fully confidential;',
  'We send you a project proposal with estimates, timelines and the proposed team.',
];

const LinePattern = () => <svg className="c14-lines" viewBox="0 0 1440 640" preserveAspectRatio="none" aria-hidden="true" focusable="false">
  {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M-40 ${120 + i * 26} C 320 ${-20 + i * 30}, 760 ${420 + i * 8}, 1480 ${60 + i * 34}`} />)}
</svg>;

function DiscussSection({ onNext }) {
  const [picked, setPicked] = useState([]);
  const toggle = d => setPicked(p => (p.includes(d) ? p.filter(x => x !== d) : [...p, d]));
  return <section className="c14-discuss" aria-labelledby="c14-discuss-title" data-testid="c14-discuss">
    <h2 id="c14-discuss-title" className="c14-discuss-title">Let’s discuss your project!</h2>
    <div className="c14-discuss-grid">
      <div>
        <p className="c14-discuss-q" id="c14-demands-label">Please specify your current business demands:</p>
        <div className="c14-chips" role="group" aria-labelledby="c14-demands-label">
          {DEMANDS.map((d, i) => <button key={d} type="button" aria-pressed={picked.includes(d)} onClick={() => toggle(d)}
            className={`c14-chip${picked.includes(d) ? ' c14-chip-on' : ''}`} data-testid={`c14-demand-${i}`}>{optionLabel(d) === 'Other - Please specify' ? 'Other' : optionLabel(d)}</button>)}
        </div>
        <button type="button" className="c14-yellow c14-next" onClick={() => onNext(picked.map(d => (d === 'Other' ? 'Other' : optionLabel(d))))} data-testid="c14-next">Next</button>
      </div>
      <p className="c14-discuss-text">Describe your project requests to discuss your business objectives and get a cost estimate from the BluBridge team.</p>
    </div>
  </section>;
}

const kb = n => (n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`);

function Attachments({ files, onAdd, onRemove, error, disabled }) {
  const input = useRef(null);
  return <div className="aic-field" data-testid="c14-attachments">
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <button type="button" disabled={disabled || files.length >= MAX_FILES} onClick={() => input.current?.click()} aria-describedby="c14-files-help"
        className="c14-attach" data-testid="c14-attach-button">
        <Paperclip className="w-4 h-4" aria-hidden="true" />Attach file
      </button>
      <p id="c14-files-help" className="c14-small" data-testid="c14-files-help">No more than 3 files may be attached up to 3MB each. Formats: doc, docx, pdf, ppt, pptx.</p>
      <input ref={input} id="aic-files" type="file" multiple accept={FILE_EXT.join(',')} className="sr-only" tabIndex={-1} aria-hidden="true"
        onChange={e => { onAdd([...e.target.files]); e.target.value = ''; }} data-testid="c14-file-input" />
    </div>
    {files.length > 0 && <ul className="mt-3 space-y-2" data-testid="c14-file-list">
      {files.map((f, i) => <li key={`${f.file.name}-${i}`} className="c14-file" data-testid={`c14-file-${i}`}>
        <span className="min-w-0 truncate">{f.file.name} <span className="text-gray-500">({kb(f.file.size)})</span></span>
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

  const onNext = picked => {
    if (picked.length && !disabled) {
      const line = `Business demands: ${picked.join(', ')}.`;
      setForm(f => ({ ...f, requirements: f.requirements.startsWith('Business demands:') ? f.requirements.replace(/^Business demands:[^\n]*/, line) : (f.requirements ? `${line}\n${f.requirements}` : `${line}\n`) }));
      clearError('requirements');
    }
    const el = document.getElementById('aic-requirements');
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => { el?.focus({ preventScroll: true }); el?.setSelectionRange?.(el.value.length, el.value.length); }, 450);
  };

  return <div className="c14-page" data-testid="consulting14-page">
    <section className="c14-hero">
      <LinePattern />
      <div className="c14-wrap c14-hero-grid">
        <div className="c14-left">
          <h1 className="c14-title" data-testid="c14-heading">Contact us</h1>
          <h2 className="c14-next-title">What happens next?</h2>
          <ol className="c14-steps" data-testid="c14-steps">
            {STEPS.map((step, i) => <li key={step} data-testid={`c14-step-${i}`}><span className="c14-step-num" aria-hidden="true">{i + 1}</span><span>{step}</span></li>)}
          </ol>
        </div>

        <form className="c14-card" method="post" noValidate onSubmit={handleSubmit} aria-busy={busy} aria-labelledby="aic-form-heading" data-testid="c14-form">
          <h2 id="aic-form-heading" className="sr-only">Send a request</h2>
          {submission.receipt && <div ref={success} tabIndex={-1} className="c14-confirmation" role="status" data-testid="c14-success">
            <p className="font-semibold">Successfully Submitted</p>
            <p>Your request has been received. Our team will be in touch shortly.</p>
          </div>}
          <fieldset className="c14-fieldset" disabled={disabled}>
            <div className="c14-fields" data-testid="c14-fields">
              {field('name', 'Name', 'text', 'name', 200)}
              {field('email', 'Corporate E-mail', 'email', 'email', 254)}
              {field('phone', 'Phone number', 'tel', 'tel', 40)}
              {field('requirements', 'Describe your project requirements', 'textarea', 'off', 5000)}
            </div>
            <Attachments files={files} onAdd={addFiles} onRemove={removeFile} error={errors.files} disabled={disabled} />
            <label className="c14-check" htmlFor="aic-nda">
              <input id="aic-nda" name="nda" type="checkbox" checked={form.nda} onChange={change} data-testid="c14-nda" />
              <span>I want to protect my data by signing an NDA.</span>
            </label>
            <p className="c14-small c14-consent" data-testid="c14-consent-text">By submitting this request, you acknowledge that BluBridge may process your data for the purpose of contacting you. Please read our <Link to="/policies/privacy-policy" data-testid="c14-privacy-link">Privacy Policy</Link>.</p>
            <div className="c14-actions">
              <button type="submit" className="c14-yellow" disabled={disabled} aria-busy={busy} data-testid="c14-submit">
                {busy && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                <span aria-live="polite">{submission.receipt ? 'Request sent' : uploading ? 'Uploading files…' : submission.isSubmitting ? 'Sending…' : 'Send request'}</span>
              </button>
              <p className="c14-protected" data-testid="c14-privacy-note"><ShieldCheck aria-hidden="true" />Your privacy is protected</p>
            </div>
          </fieldset>
          {submission.submitError && <p className="aic-error" role="alert" data-testid="c14-submit-error">{submission.submitError}</p>}
        </form>
      </div>
    </section>

    <div className="c14-wrap c14-discuss-wrap"><DiscussSection onNext={onNext} /></div>
  </div>;
}
