import React, { useEffect, useRef, useState } from 'react';
import { Loader2, CheckCircle2, Check } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import { useWizardSubmission } from '../ai-consulting/useWizardSubmission';
import { FormField } from '../ai-consulting/FormField';
import { focusError } from '../ai-consulting/fieldUtils';
import { clearAccidentalQuery } from '../ai-consulting/clearAccidentalQuery';
import { services, optionLabel } from '../ai-consulting/options';
import './Consulting15.css';

/* /consulting-15 — consultation request page (form card + info cards). Posts to /api/ai-consulting-enquiries with formVariant "consulting-15". */

const SERVICES = services.slice(0, 6).map(([, value]) => value);
const INDUSTRIES = ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Education', 'Government', 'Other'];
const TIMELINES = ['Immediately', 'Within 1 month', '1-3 months', '3-6 months', 'Just exploring'];
const BUDGETS = ['Under $10k', '$10k - $50k', '$50k - $100k', '$100k+', 'Not sure yet'];
const EXPECT = ['Initial response from our team', 'Complimentary consultation call', 'Detailed project assessment', 'Custom proposal development', 'Transparent pricing structure', 'Clear project timeline'];
const EMPTY = { firstName: '', lastName: '', email: '', phone: '', organization: '', title: '', industry: '', services: [], timeline: '', budget: '', description: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SERVER_TO_FORM = { workEmail: 'email', company: 'organization', jobTitle: 'title', projectTimeline: 'timeline', budgetRange: 'budget', requirement: 'description', fullName: 'firstName' };

const validate = f => {
  const e = {};
  if (!f.firstName.trim()) e.firstName = 'Please enter your first name.';
  if (!f.lastName.trim()) e.lastName = 'Please enter your last name.';
  if (!f.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.phone.trim() && (!/^[+\d\s().-]{6,40}$/.test(f.phone.trim()) || !/^\d{6,15}$/.test(f.phone.replace(/\D/g, '')))) e.phone = 'Please enter a valid phone number.';
  if (!f.description.trim()) e.description = 'Please enter a project description.';
  return e;
};

function Sidebar() {
  return <aside className="c15-side" aria-label="What to expect">
    <div className="c15-card c15-info" data-testid="c15-card-expect">
      <h2 className="c15-expect-title">What to Expect</h2>
      <ul className="c15-expect">
        {EXPECT.map(item => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}
      </ul>
    </div>
  </aside>;
}

export default function Consulting15() {
  const submission = useWizardSubmission();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const success = useRef(null);
  const disabled = submission.isSubmitting || Boolean(submission.receipt);
  useDocumentTitle('AI Consulting Services | Tailored AI Systems | BluBridge');
  useMetaDescription('Ready to transform your organization with AI? Schedule a consultation with BluBridge to explore how AI can help you achieve your objectives safely and effectively.');
  useEffect(() => { clearAccidentalQuery(); }, []);
  useEffect(() => {
    if (submission.receipt) { success.current?.focus({ preventScroll: true }); success.current?.scrollIntoView({ block: 'center', behavior: 'instant' }); }
  }, [submission.receipt]);

  const set = (name, value) => {
    if (disabled) return;
    submission.clearSubmission();
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };
  const change = e => set(e.target.name, e.target.value);
  const toggleService = s => set('services', form.services.includes(s) ? form.services.filter(x => x !== s) : [...form.services, s]);

  const handleSubmit = e => {
    e.preventDefault();
    if (disabled) return;
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) { focusError(v); return; }
    const t = k => form[k].trim();
    const payload = {
      formVariant: 'consulting-15', firstName: t('firstName'), lastName: t('lastName'), fullName: `${t('firstName')} ${t('lastName')}`,
      workEmail: t('email').toLowerCase(), services: form.services, requirement: t('description'), contactPermission: true,
    };
    if (t('phone')) payload.phone = t('phone');
    if (t('organization')) payload.company = t('organization');
    if (t('title')) payload.jobTitle = t('title');
    if (form.industry) payload.industry = form.industry;
    if (form.timeline) payload.projectTimeline = form.timeline;
    if (form.budget) payload.budgetRange = form.budget;
    submission.submit(payload, serverErrors => {
      const mapped = Object.fromEntries(Object.entries(serverErrors).map(([k, msg]) => [SERVER_TO_FORM[k] || k, msg]));
      setErrors(mapped); focusError(mapped);
    });
  };

  const field = (name, label, required = false, type = 'text', autoComplete = 'off', maxLength = 200, options) => <FormField name={name} label={label} required={required} type={type}
    autoComplete={autoComplete} maxLength={maxLength} options={options} placeholder={options ? { industry: 'Select your industry', timeline: 'Select timeline', budget: 'Select budget range' }[name] : ''}
    value={form[name]} onChange={change} error={errors[name]} disabled={disabled} />;

  return <div className="c15-page" data-testid="consulting15-page">
    <section className="c15-hero">
      <h1 className="c15-title" data-testid="c15-heading">Let’s Discuss Your AI Strategy</h1>
      <p className="c15-sub" data-testid="c15-subtext">Ready to transform your organization with AI? Schedule a consultation with BluBridge to explore how we can help you achieve your objectives safely and effectively.</p>
    </section>

    <section className="c15-body">
      <div className="c15-wrap c15-grid">
        <form className="c15-card c15-form" method="post" noValidate onSubmit={handleSubmit} aria-busy={submission.isSubmitting} aria-labelledby="c15-form-title" data-testid="c15-form">
          <h2 id="c15-form-title" className="c15-form-title">Request a Consultation</h2>
          <p className="c15-form-sub">Tell us about your project and we’ll provide a customized assessment of your AI opportunities.</p>
          {submission.receipt && <div ref={success} tabIndex={-1} className="c15-confirmation" role="status" data-testid="c15-success">
            <p className="font-semibold">Successfully Submitted</p>
            <p>Your consultation request has been received. Our team will be in touch shortly.</p>
          </div>}
          <fieldset className="c15-fieldset" disabled={disabled}>
            <h3 className="c15-group">Personal Information</h3>
            <div className="c15-two">
              {field('firstName', 'First Name', true, 'text', 'given-name', 120)}
              {field('lastName', 'Last Name', true, 'text', 'family-name', 120)}
              {field('email', 'Email Address', true, 'email', 'email', 254)}
              {field('phone', 'Phone Number', false, 'tel', 'tel', 40)}
            </div>

            <h3 className="c15-group">Organization Information</h3>
            <div className="c15-two">
              {field('organization', 'Organization Name', false, 'text', 'organization')}
              {field('title', 'Your Title', false, 'text', 'organization-title')}
              <div className="c15-full">{field('industry', 'Industry', false, 'text', 'off', 200, INDUSTRIES)}</div>
            </div>

            <h3 className="c15-group">Project Information</h3>
            <fieldset className="c15-services" data-testid="c15-services">
              <legend className="aic-label">Services of Interest (Select all that apply)</legend>
              <div className="c15-checks">
                {SERVICES.map((s, i) => <label key={s} className="c15-check" htmlFor={`c15-service-${i}`}>
                  <input id={`c15-service-${i}`} type="checkbox" checked={form.services.includes(s)} onChange={() => toggleService(s)} data-testid={`c15-service-${i}`} />
                  <span className="c15-box" aria-hidden="true"><Check /></span>{optionLabel(s)}
                </label>)}
              </div>
            </fieldset>
            <div className="c15-two">
              {field('timeline', 'Timeline', false, 'text', 'off', 200, TIMELINES)}
              {field('budget', 'Budget Range (Optional)', false, 'text', 'off', 200, BUDGETS)}
              <div className="c15-full">
                {field('description', 'Project Description', true, 'textarea', 'off', 5000)}
                {!errors.description && <p className="c15-help" data-testid="c15-description-help">Please describe your AI objectives, current challenges, and what you hope to achieve.</p>}
              </div>
            </div>

            <button type="submit" className="c15-submit" disabled={disabled} aria-busy={submission.isSubmitting} data-testid="c15-submit">
              {submission.isSubmitting && <Loader2 className="animate-spin" aria-hidden="true" />}
              <span aria-live="polite">{submission.receipt ? 'Request Submitted' : submission.isSubmitting ? 'Submitting…' : 'Submit Consultation Request'}</span>
            </button>
          </fieldset>
          {submission.submitError && <p className="aic-error" role="alert" data-testid="c15-submit-error">{submission.submitError}</p>}
        </form>
        <Sidebar />
      </div>
    </section>
  </div>;
}
