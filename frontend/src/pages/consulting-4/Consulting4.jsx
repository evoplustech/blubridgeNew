import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2, Paperclip, Mic, Square, X, FileText, Info, CheckCircle2 } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import { services, optionLabel } from '../ai-consulting/options';
import { useWizardSubmission } from '../ai-consulting/useWizardSubmission';
import { clearAccidentalQuery } from '../ai-consulting/clearAccidentalQuery';
import { PremiumSelect } from '../consulting-3/PremiumSelect';
import './Consulting4.css';

/* /consulting-4 — copy of /consulting with a two-column contact section.
   Submits to the existing /api/ai-consulting-enquiries endpoint (formVariant "consulting-4");
   attachments go first to /api/ai-consulting-attachments and are linked by id. */

const API = window.location.origin;
const MAX_BYTES = 5 * 1024 * 1024; // matches the backend attachment/file limit (MAX_FILE_SIZE)
const FILE_EXT = ['.pdf', '.doc', '.docx'];
const MAX_RECORD_SECONDS = 300;

const SUBJECT_OPTIONS = services.map(([, value]) => ({ value, label: value === 'Other' ? 'Other' : optionLabel(value) }));
const BUDGET_OPTIONS = ['Less than $10k', '$10k - $50k', '$50k - $100k', '$100k+', 'Not sure yet'].map(v => ({ value: v, label: v }));
const STEPS = [
  'Our expert will follow up after reviewing your needs.',
  'If required, we’ll sign an NDA to ensure privacy.',
  'Our Pre-Sales Manager will send you a proposal.',
  'Then, we get started on your project.',
];

const EMPTY = { challenge: '', name: '', email: '', phone: '', company: '', subject: '', budget: '', nda: false, consent: false };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SERVER_TO_FORM = { fullName: 'name', workEmail: 'email', services: 'subject', requirement: 'challenge', projectBudget: 'budget', contactPermission: 'consent' };

const validate = f => {
  const e = {};
  if (!f.challenge.trim()) e.challenge = 'Please describe your challenge or goal.';
  if (!f.name.trim()) e.name = 'Please enter your name.';
  if (!f.email.trim()) e.email = 'Please enter your corporate email.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.phone.trim() && (!/^[+\d\s().-]{6,40}$/.test(f.phone.trim()) || !/^\d{6,15}$/.test(f.phone.replace(/\D/g, '')))) e.phone = 'Please enter a valid phone number.';
  if (!f.subject) e.subject = 'Please select a subject.';
  if (!f.budget) e.budget = 'Please select a project budget.';
  if (!f.consent) e.consent = 'Please give your consent so we can process your request.';
  return e;
};

const sizeLabel = b => (b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);
const pickMime = () => {
  if (typeof MediaRecorder === 'undefined') return null;
  return [['audio/webm;codecs=opus', 'webm'], ['audio/webm', 'webm'], ['audio/mp4', 'm4a'], ['audio/ogg;codecs=opus', 'ogg']].find(([m]) => MediaRecorder.isTypeSupported?.(m)) || ['', 'webm'];
};

async function uploadAttachment(blob, filename) {
  const body = new FormData();
  body.append('file', blob, filename);
  const res = await fetch(`${API}/api/ai-consulting-attachments`, { method: 'POST', body });
  let data = {};
  try { data = await res.json(); } catch { /* ignore */ }
  if (!res.ok) throw new Error(typeof data.detail === 'string' ? data.detail : res.status === 413 ? 'This file is too large.' : 'Upload failed. Please try again.');
  return data.attachmentId;
}

function Underline({ id, label, error, children, className = '' }) {
  return <div className={`c4-field ${className}`}>
    <label htmlFor={id} className="sr-only">{label}</label>
    {children}
    {error && <p id={`${id}-error`} className="c4-error" role="alert" data-testid={`c4-error-${id}`}>{error}</p>}
  </div>;
}

export default function Consulting4() {
  useDocumentTitle('Contact BluBridge | AI Consulting Enquiry');
  useMetaDescription('Tell BluBridge about your AI challenge or goal. Our experts review every request, can sign an NDA first, and send a tailored proposal.');
  const submission = useWizardSubmission();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null); // { blob, name, size, id? }
  const [voice, setVoice] = useState(null); // { blob, name, size, url, id? }
  const [attachError, setAttachError] = useState('');
  const [recState, setRecState] = useState('idle'); // idle | recording
  const [seconds, setSeconds] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef(null);
  const recorder = useRef(null);
  const timer = useRef(null);
  const success = useRef(null);
  const challengeRef = useRef(null);
  const busy = uploading || submission.isSubmitting;
  const done = Boolean(submission.receipt);

  useEffect(() => { clearAccidentalQuery(); }, []);
  // The microphone is only permitted on a fresh load of this page (see Permissions-Policy). If we arrived
  // via in-app navigation the old document's policy still applies, so reload once before anything is typed.
  useEffect(() => {
    const policy = document.permissionsPolicy || document.featurePolicy;
    if (!policy?.allowsFeature) return;
    if (policy.allowsFeature('microphone')) { sessionStorage.removeItem('c4-mic-reload'); return; }
    if (!sessionStorage.getItem('c4-mic-reload')) { sessionStorage.setItem('c4-mic-reload', '1'); window.location.reload(); }
  }, []);
  useEffect(() => () => { clearInterval(timer.current); recorder.current?.stream?.getTracks().forEach(t => t.stop()); }, []);
  useEffect(() => () => { if (voice?.url) URL.revokeObjectURL(voice.url); }, [voice]);
  useEffect(() => { if (done) success.current?.focus(); }, [done]);

  const set = (name, value) => {
    if (busy || done) return;
    submission.clearSubmission();
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => { const n = { ...e }; delete n[name]; return n; });
  };
  const onInput = e => set(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
  const aria = id => ({ 'aria-invalid': Boolean(errors[id]), 'aria-describedby': errors[id] ? `${id}-error` : undefined });
  const grow = e => { e.target.style.height = 'auto'; e.target.style.height = `${Math.min(e.target.scrollHeight, 220)}px`; };

  const onFile = e => {
    const f = e.target.files?.[0];
    e.target.value = '';
    setAttachError('');
    if (!f) return;
    const ext = f.name.slice(f.name.lastIndexOf('.')).toLowerCase();
    if (!FILE_EXT.includes(ext)) { setAttachError('Please attach a PDF, DOC or DOCX file.'); return; }
    if (f.size > MAX_BYTES) { setAttachError('File is too large. Maximum size is 5MB.'); return; }
    if (!f.size) { setAttachError('The selected file is empty.'); return; }
    setFile({ blob: f, name: f.name, size: f.size });
  };

  const startRecording = async () => {
    setAttachError('');
    const mime = pickMime();
    if (!mime || !navigator.mediaDevices?.getUserMedia) { setAttachError('Voice recording isn’t supported in this browser. You can attach a file instead.'); return; }
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch (err) {
      setAttachError(err?.name === 'NotFoundError' ? 'No microphone was found on this device.' : 'Microphone access was blocked. Allow it in your browser settings, or attach a file instead.');
      return;
    }
    const chunks = [];
    const rec = new MediaRecorder(stream, mime[0] ? { mimeType: mime[0], audioBitsPerSecond: 64000 } : undefined);
    rec.ondataavailable = ev => { if (ev.data.size) chunks.push(ev.data); };
    rec.onstop = () => {
      clearInterval(timer.current);
      stream.getTracks().forEach(t => t.stop());
      setRecState('idle');
      const blob = new Blob(chunks, { type: rec.mimeType || mime[0] || 'audio/webm' });
      if (!blob.size) { setAttachError('Nothing was recorded. Please try again.'); return; }
      if (blob.size > MAX_BYTES) { setAttachError('The recording is too large. Please record a shorter message.'); return; }
      const ext = (rec.mimeType || '').includes('mp4') ? 'm4a' : (rec.mimeType || '').includes('ogg') ? 'ogg' : mime[1];
      setVoice({ blob, name: `voice-message.${ext}`, size: blob.size, url: URL.createObjectURL(blob) });
    };
    recorder.current = rec;
    rec.start(1000);
    setSeconds(0);
    setRecState('recording');
    timer.current = setInterval(() => setSeconds(s => {
      if (s + 1 >= MAX_RECORD_SECONDS) rec.state === 'recording' && rec.stop();
      return s + 1;
    }), 1000);
  };
  const stopRecording = () => { if (recorder.current?.state === 'recording') recorder.current.stop(); };

  const handleSubmit = async e => {
    e.preventDefault();
    if (busy || done) return;
    if (recState === 'recording') { setAttachError('Please stop the recording before sending.'); return; }
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) { document.getElementById(`c4-${Object.keys(v)[0]}`)?.focus(); return; }
    setAttachError('');
    const ids = [];
    setUploading(true);
    try {
      for (const [item, update] of [[file, setFile], [voice, setVoice]]) {
        if (!item) continue;
        const id = item.id || await uploadAttachment(item.blob, item.name);
        if (!item.id) update(prev => (prev ? { ...prev, id } : prev));
        ids.push(id);
      }
    } catch (err) {
      setAttachError(err.message || 'Upload failed. Please try again.');
      setUploading(false);
      return;
    }
    setUploading(false);
    const payload = {
      formVariant: 'consulting-4',
      fullName: form.name.trim(),
      workEmail: form.email.trim(),
      services: [form.subject],
      requirement: form.challenge.trim(),
      projectBudget: form.budget,
      ndaFirst: form.nda,
      contactPermission: form.consent,
    };
    if (form.phone.trim()) payload.phone = form.phone.trim();
    if (form.company.trim()) payload.company = form.company.trim();
    if (ids.length) payload.attachmentIds = ids;
    submission.submit(payload, serverErrors => {
      const mapped = Object.fromEntries(Object.entries(serverErrors).map(([k, val]) => [SERVER_TO_FORM[k] || k, val]));
      if (mapped.attachmentIds) { setAttachError(mapped.attachmentIds); delete mapped.attachmentIds; }
      setErrors(mapped);
    });
  };

  useEffect(() => {
    // An expired attachment is reported as a general error; drop cached ids so the next try re-uploads.
    if (submission.submitError && /attachment/i.test(submission.submitError)) {
      setFile(f => (f ? { ...f, id: undefined } : f));
      setVoice(v => (v ? { ...v, id: undefined } : v));
    }
  }, [submission.submitError]);

  const mm = String(Math.floor(seconds / 60)).padStart(1, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return <div className="c4-page" data-testid="consulting4-page">
    {/* ===== CONTACT ===== */}
    <section className="c4-contact" data-testid="c4-contact-section">
      <div className="bb-container c4-contact-grid">
        <aside className="c4-panel" data-testid="c4-connect-panel">
          <h2 className="c4-panel-title">Let’s connect</h2>
          <p className="c4-panel-text">Fill out the form, and we’ve got you covered.</p>
          <p className="c4-panel-subtitle">What happens next?</p>
          <ol className="c4-steps" data-testid="c4-steps">
            {STEPS.map((step, i) => <li key={step} className="c4-step">
              <span className={`c4-step-dot${i === STEPS.length - 1 ? ' c4-step-dot-last' : ''}`} aria-hidden="true"><Check size={12} strokeWidth={3} /></span>
              <span>{step}</span>
            </li>)}
          </ol>
        </aside>

        <div className="c4-form-wrap">
          <h1 className="c4-form-title" data-testid="c4-form-title">Contact us</h1>
          <p className="c4-form-text">Our team would love to hear from you.</p>

          {done ? <div ref={success} tabIndex={-1} role="status" className="c4-success" data-testid="c4-success">
            <CheckCircle2 size={40} strokeWidth={1.6} aria-hidden="true" />
            <p className="c4-success-title" data-testid="aic-success-message">Successfully Submitted</p>
            <p className="c4-success-text">Your enquiry has been received. Our expert will follow up after reviewing your needs.</p>
          </div> : <form className="c4-form" onSubmit={handleSubmit} noValidate aria-busy={busy} data-testid="c4-form">
            <Underline id="c4-challenge" label="Your challenge/goal" error={errors.challenge} className="c4-span-2">
              <div className="c4-input-row">
                <textarea id="c4-challenge" ref={challengeRef} name="challenge" rows={1} maxLength={5000} placeholder="Your challenge/goal*" value={form.challenge}
                  onChange={e => { onInput(e); grow(e); }} disabled={busy} className={`c4-input c4-textarea${errors.challenge ? ' c4-invalid' : ''}`} {...aria('challenge')} data-testid="c4-input-challenge" />
                <span className="c4-hint" title="Briefly describe the problem you want to solve or the outcome you want." aria-hidden="true"><Info size={15} /></span>
              </div>
            </Underline>
            <Underline id="c4-name" label="Name" error={errors.name}>
              <input id="c4-name" name="name" type="text" autoComplete="name" maxLength={200} placeholder="Name*" value={form.name} onChange={onInput} disabled={busy}
                className={`c4-input${errors.name ? ' c4-invalid' : ''}`} {...aria('name')} data-testid="c4-input-name" />
            </Underline>
            <Underline id="c4-email" label="Corporate email" error={errors.email}>
              <input id="c4-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="Corporate email*" value={form.email} onChange={onInput} disabled={busy}
                className={`c4-input${errors.email ? ' c4-invalid' : ''}`} {...aria('email')} data-testid="c4-input-email" />
            </Underline>
            <Underline id="c4-phone" label="Phone number" error={errors.phone}>
              <input id="c4-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Phone number" value={form.phone} onChange={onInput} disabled={busy}
                className={`c4-input${errors.phone ? ' c4-invalid' : ''}`} {...aria('phone')} data-testid="c4-input-phone" />
            </Underline>
            <Underline id="c4-company" label="Company" error={errors.company}>
              <input id="c4-company" name="company" type="text" autoComplete="organization" maxLength={200} placeholder="Company" value={form.company} onChange={onInput} disabled={busy}
                className="c4-input" data-testid="c4-input-company" />
            </Underline>
            <Underline id="c4-subject" label="Subject" error={errors.subject}>
              <PremiumSelect id="c4-subject" variant="underline" wide value={form.subject} onChange={v => set('subject', v)} options={SUBJECT_OPTIONS} placeholder="Subject*" error={errors.subject} disabled={busy} testId="c4-select-subject" />
            </Underline>
            <Underline id="c4-budget" label="Project budget" error={errors.budget}>
              <PremiumSelect id="c4-budget" variant="underline" value={form.budget} onChange={v => set('budget', v)} options={BUDGET_OPTIONS} placeholder="Project budget*" error={errors.budget} disabled={busy} testId="c4-select-budget" />
            </Underline>

            <div className="c4-span-2 c4-extras">
              <label className="c4-check" data-testid="c4-nda">
                <input type="checkbox" name="nda" checked={form.nda} onChange={onInput} disabled={busy} data-testid="c4-checkbox-nda" />
                <span className="c4-box" aria-hidden="true"><Check size={11} strokeWidth={3.2} /></span>
                <span>Secure data with NDA first</span>
                <span className="c4-hint" title="We’ll sign a non-disclosure agreement before you share any details." aria-hidden="true"><Info size={14} /></span>
              </label>
              <div className="c4-attach-actions">
                <button type="button" className="c4-link" onClick={() => fileInput.current?.click()} disabled={busy} data-testid="c4-attach-file">
                  <Paperclip size={15} aria-hidden="true" /> Attach file
                </button>
                <input ref={fileInput} type="file" accept=".pdf,.doc,.docx" className="sr-only" tabIndex={-1} onChange={onFile} data-testid="c4-file-input" />
                {recState === 'recording'
                  ? <button type="button" className="c4-link c4-recording" onClick={stopRecording} data-testid="c4-stop-recording"><Square size={13} fill="currentColor" aria-hidden="true" /> Stop recording <span className="c4-rec-time">{mm}:{ss}</span></button>
                  : <button type="button" className="c4-link" onClick={startRecording} disabled={busy} data-testid="c4-record-voice"><Mic size={15} aria-hidden="true" /> {voice ? 'Record again' : 'Record voice message'}</button>}
              </div>
            </div>

            {(file || voice || attachError) && <div className="c4-span-2 c4-attachments" data-testid="c4-attachments">
              {file && <div className="c4-chip" data-testid="c4-file-chip">
                <FileText size={16} aria-hidden="true" />
                <span className="c4-chip-name">{file.name}</span><span className="c4-chip-size">{sizeLabel(file.size)}</span>
                <button type="button" onClick={() => setFile(null)} disabled={busy} aria-label={`Remove ${file.name}`} data-testid="c4-remove-file"><X size={14} /></button>
              </div>}
              {voice && <div className="c4-chip c4-chip-voice" data-testid="c4-voice-chip">
                <Mic size={16} aria-hidden="true" />
                <audio controls src={voice.url} preload="metadata" data-testid="c4-voice-player" />
                <span className="c4-chip-size">{sizeLabel(voice.size)}</span>
                <button type="button" onClick={() => setVoice(null)} disabled={busy} aria-label="Remove voice message" data-testid="c4-remove-voice"><X size={14} /></button>
              </div>}
              {attachError && <p className="c4-error" role="alert" data-testid="c4-attach-error">{attachError}</p>}
            </div>}

            <div className="c4-span-2">
              <label className="c4-check c4-consent" data-testid="c4-consent">
                <input id="c4-consent" type="checkbox" name="consent" checked={form.consent} onChange={onInput} disabled={busy} {...aria('consent')} data-testid="c4-checkbox-consent" />
                <span className="c4-box" aria-hidden="true"><Check size={11} strokeWidth={3.2} /></span>
                <span>I consent to the processing of the personal data as set out in the <Link to="/policies/privacy-policy" data-testid="c4-privacy-link">Privacy Policy</Link>, and I agree that, given the global nature of BluBridge business, such processing may take place outside of my jurisdiction.</span>
              </label>
              {errors.consent && <p id="consent-error" className="c4-error" role="alert" data-testid="c4-error-consent">{errors.consent}</p>}
            </div>

            <div className="c4-span-2">
              <button type="submit" className="c4-submit" disabled={busy} aria-busy={busy} data-testid="c4-submit">
                {busy ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> {uploading ? 'Uploading…' : 'Sending…'}</> : 'Send message'}
              </button>
              {submission.submitError && <p className="c4-error c4-submit-error" role="alert" data-testid="c4-submit-error">{submission.submitError}</p>}
            </div>
          </form>}
        </div>
      </div>
    </section>
  </div>;
}
