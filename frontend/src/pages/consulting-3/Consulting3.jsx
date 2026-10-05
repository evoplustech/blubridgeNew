import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Mail, Phone, MapPin, ArrowRight, Lightbulb, Cpu, Sparkles, Bot, BrainCircuit, Gauge, Rocket, LifeBuoy, MoreHorizontal } from 'lucide-react';
import { Button } from '../../components/ui/button';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import { FormField, FieldError, RequiredMark } from '../ai-consulting/FormField';
import { PremiumSelect } from './PremiumSelect';
import { CountryFlag } from '../ai-consulting/CountryFlag';
import { countries, countryByCode, filterCountry, parsePhone } from '../ai-consulting/countryData';
import { services, optionLabel } from '../ai-consulting/options';
import { focusError } from '../ai-consulting/fieldUtils';
import { useWizardSubmission } from '../ai-consulting/useWizardSubmission';
import { clearAccidentalQuery } from '../ai-consulting/clearAccidentalQuery';
import { enquiryHeading, enquiryDescription } from '../ai-consulting/introCopy';
import '../ai-consulting/AiConsulting.css';
import '../ai-consulting-base/Dropdowns.css';
import './Consulting3.css';

/* /consulting-3 — copy of /consulting with a short two-column enquiry form.
   Submits to the same /api/ai-consulting-enquiries endpoint (formVariant "consulting-3"). */

const COUNTRY_OPTIONS = countries.map(c => ({ value: c.code, label: c.name, leading: <CountryFlag code={c.code} name={c.name} /> }));

// Same services as /consulting (already ends with "Other"); icons + one-line hints for the premium dropdown.
const AREA_META = {
  consulting: [Lightbulb, 'Strategy, roadmaps and architecture reviews'],
  'custom-ai': [Cpu, 'Purpose-built models trained on your data'],
  'generative-ai': [Sparkles, 'Assistants, enterprise search and RAG'],
  agents: [Bot, 'Autonomous workflows and tool-using agents'],
  'model-training': [BrainCircuit, 'Adapt foundation models to your domain'],
  'gpu-optimisation': [Gauge, 'Faster, more efficient training and inference'],
  integration: [Rocket, 'Ship models into production systems'],
  support: [LifeBuoy, 'Monitoring, upkeep and continuous improvement'],
  other: [MoreHorizontal, 'Tell us what you have in mind'],
};
const AREA_OPTIONS = services.map(([key, label]) => {
  const [Icon, description] = AREA_META[key] || [MoreHorizontal, ''];
  return { value: label, label: label === 'Other' ? 'Other' : optionLabel(label), description, leading: <span className="c3-icon-tile"><Icon strokeWidth={1.9} /></span> };
});

// Offices — first 3 entries of "Our Offices" on /careers, as written there.
const OFFICES = [
  {
    id: 'besant-nagar', city: 'Chennai', region: 'Tamil Nadu, IN',
    lines: ['No. E160 Tiger Varadhachari Road,', 'Kalakshetra Colony, Besant Nagar,', 'Chennai – 600090'],
    mapUrl: 'https://www.google.com/maps/place/Blubridge+Technologies/@12.9954492,80.2654151,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5267e2599dbced:0xc9079da2f4d833f!8m2!3d12.995444!4d80.26799!16s%2Fg%2F11mry3n8lv',
  },
  {
    id: 'mandavelipakkam', city: 'Chennai', region: 'Tamil Nadu, IN',
    lines: ['30, Norton Rd, Mandavelipakkam,', 'Raja Annamalai Puram,', 'Chennai, Tamil Nadu – 600028'],
    mapUrl: 'https://www.google.com/maps/place/30,+Norton+Rd,+Mandavelipakkam,+Mandaveli,+Chennai,+Tamil+Nadu+600028/@13.0280416,80.2681674,17z',
  },
  {
    id: 'newark-de', city: 'Newark', region: 'Delaware, US', company: 'BLUBRIDGE INC',
    lines: ['254 Chapman Rd, STE 208 #28314,', 'Newark, Delaware 19702 USA'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=254+Chapman+Rd+STE+208+Newark+Delaware+19702',
  },
];

// BluBridge contact details.
const PHONE = '+91 8925987250';
const EMAIL = 'info@blubridge.com';

const EMPTY = { firstName: '', lastName: '', workEmail: '', phone: '', jobTitle: '', country: '', company: '', area: '', website: '', requirement: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = f => {
  const e = {};
  if (!f.firstName.trim()) e.firstName = 'Please enter your first name.';
  if (!f.lastName.trim()) e.lastName = 'Please enter your last name.';
  if (!f.workEmail.trim()) e.workEmail = 'Please enter your work email.';
  else if (!EMAIL_RE.test(f.workEmail.trim())) e.workEmail = 'Please enter a valid email address.';
  if (!f.phone.trim()) e.phone = 'Please enter your phone number.';
  else if (f.country && !parsePhone(f.phone, f.country)) e.phone = 'Please enter a valid phone number for the selected country.';
  else if (!f.country && !/^[+()\d\s.-]{6,40}$/.test(f.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (!f.jobTitle.trim()) e.jobTitle = 'Please enter your job title.';
  if (!f.country) e.country = 'Please select your country.';
  if (!f.company.trim()) e.company = 'Please enter your company name.';
  if (!f.area) e.area = 'Please select an area of interest.';
  if (f.website.trim()) {
    try {
      const url = new URL(f.website.trim());
      if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.')) e.website = 'Please enter a valid website URL, including https://.';
    } catch { e.website = 'Please enter a valid website URL, including https://.'; }
  }
  return e;
};

// Server field names -> form field names (for 422 responses).
const SERVER_TO_FORM = { fullName: 'firstName', services: 'area', countryCode: 'country' };

export default function Consulting3() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const submission = useWizardSubmission();
  const success = useRef(null);
  const disabled = submission.isSubmitting || Boolean(submission.receipt);
  useDocumentTitle('AI Consulting Services | Tailored AI Systems | BluBridge');
  useMetaDescription(enquiryDescription);
  useEffect(() => { clearAccidentalQuery(); }, []);
  useEffect(() => {
    if (submission.receipt) { success.current?.focus({ preventScroll: true }); success.current?.scrollIntoView({ block: 'center', behavior: 'instant' }); }
  }, [submission.receipt]);

  const change = event => {
    if (disabled) return;
    const { name, value } = event.target;
    const next = { ...form, [name]: value };
    submission.clearSubmission();
    setForm(next);
    if (errors[name] || (name === 'country' && errors.phone)) {
      const v = validate(next);
      setErrors(prev => Object.fromEntries(Object.keys(prev).filter(k => v[k]).map(k => [k, v[k]])));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (disabled) return;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { focusError(nextErrors); return; }
    const code = form.country;
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    submission.submit({
      formVariant: 'consulting-3',
      firstName, lastName,
      fullName: `${firstName} ${lastName}`,
      workEmail: form.workEmail.trim(),
      phone: parsePhone(form.phone, code).number,
      phoneCountry: code,
      countryCode: code,
      country: countryByCode[code].name,
      jobTitle: form.jobTitle.trim(),
      company: form.company.trim(),
      website: form.website.trim() || null,
      services: [form.area],
      requirement: form.requirement.trim(),
      contactPermission: true, // consent given by submitting (see notice above the button)
    }, serverErrors => {
      const mapped = Object.fromEntries(Object.entries(serverErrors).map(([k, v]) => [SERVER_TO_FORM[k] || k, v]));
      setErrors(mapped); focusError(mapped);
    });
  };

  const props = name => ({ name, value: form[name], onChange: change, error: errors[name], disabled });
  const pick = name => value => change({ target: { name, value } });
  const selectField = (name, label, extra) => <div className="aic-field">
    <label htmlFor={`aic-${name}`} className="aic-label" data-testid={`aic-${name}-label`}>{label}<RequiredMark /></label>
    <PremiumSelect id={`aic-${name}`} value={form[name]} onChange={pick(name)} error={errors[name]} disabled={disabled} {...extra} />
    <FieldError name={name} error={errors[name]} />
  </div>;

  return <div data-testid="consulting3-page">
    <section className="aic-page aic-base-smooth-page" data-testid="ai-consulting-page">
      <div className="aic-container">
        <div className="grid grid-cols-1 gap-10 rounded-2xl border border-[#e2e6f2] bg-white p-6 shadow-[0_24px_60px_-34px_rgba(10,18,48,0.28)] sm:p-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:gap-14" data-testid="consulting3-card">
          {/* Left — intro + contact details */}
          <aside data-testid="consulting3-contact-panel">
            <header className="aic-intro" style={{ textAlign: 'left', margin: 0 }}>
              <p className="aic-eyebrow" data-testid="aic-eyebrow">GET IN TOUCH</p>
              <h1 className="aic-heading c3-heading" data-testid="aic-heading" aria-label={enquiryHeading}>
                {(() => { const i = enquiryHeading.lastIndexOf(' '); return <><span className="c3-heading-line" aria-hidden="true">{enquiryHeading.slice(0, i)}</span><span className="c3-heading-line" aria-hidden="true">{enquiryHeading.slice(i + 1)}</span></>; })()}
              </h1>
              <p className="aic-subtitle" data-testid="aic-subtitle">{enquiryDescription}</p>
            </header>
            <div className="mt-10 space-y-8">
              <div className="flex items-start gap-4" data-testid="consulting3-email">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#edf1fb] text-[#2b4c8c]"><Mail className="h-5 w-5" strokeWidth={1.8} /></span>
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0a1230]">Email Us</p>
                  <p className="mt-1 text-[14px] text-[#4a5470]"><a href={`mailto:${EMAIL}`} className="text-[#2b4c8c] hover:underline">{EMAIL}</a></p>
                </div>
              </div>
              <div className="flex items-start gap-4" data-testid="consulting3-phone">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#edf1fb] text-[#2b4c8c]"><Phone className="h-5 w-5" strokeWidth={1.8} /></span>
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0a1230]">Call Us</p>
                  <p className="mt-1 text-[14px] text-[#4a5470]"><a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-[#2b4c8c] hover:underline">{PHONE}</a></p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right — form */}
          <form className="aic-form-surface" style={{ margin: 0, padding: 0, border: 0, boxShadow: 'none', background: 'transparent' }} method="post" noValidate onSubmitCapture={e => e.preventDefault()} onSubmit={handleSubmit} aria-busy={submission.isSubmitting} aria-labelledby="aic-form-heading" data-testid="consulting3-form">
            <h2 id="aic-form-heading" className="sr-only">AI Consulting Enquiry</h2>
            {submission.receipt && <div ref={success} tabIndex={-1} className="aic-confirmation" role="status" data-testid="aic-success">
              <p className="font-semibold" data-testid="aic-success-message">Successfully Submitted</p>
              <p data-testid="aic-success-details">Your AI consulting enquiry has been received. Our team will be in touch shortly.</p>
            </div>}
            <div className="aic-two-columns" data-testid="consulting3-fields">
              <FormField {...props('firstName')} label="First Name" placeholder="First Name" autoComplete="given-name" maxLength={120} />
              <FormField {...props('lastName')} label="Last Name" placeholder="Last Name" autoComplete="family-name" maxLength={120} />
              <FormField {...props('workEmail')} label="Work Email" placeholder="you@company.com" type="email" autoComplete="email" maxLength={254} />
              <FormField {...props('phone')} label="Phone" placeholder="Phone" type="tel" autoComplete="tel" maxLength={40} />
              <FormField {...props('jobTitle')} label="Job Title" placeholder="Job Title" autoComplete="organization-title" maxLength={200} />
              {selectField('country', 'Country', { options: COUNTRY_OPTIONS, placeholder: 'Select Country', searchable: true, searchPlaceholder: 'Search countries', emptyText: 'No country found.', filter: filterCountry })}
              <FormField {...props('company')} label="Company Name" placeholder="Company" autoComplete="organization" maxLength={200} />
              {selectField('area', 'Area of Interest', { options: AREA_OPTIONS, placeholder: 'Please Select', wide: true })}
              <div className="aic-full-width"><FormField {...props('website')} label="Website URL" placeholder="https://www.company.com" type="url" autoComplete="url" required={false} maxLength={2048} /></div>
              <div className="aic-full-width"><FormField {...props('requirement')} label="Tell us about your project" placeholder="Tell us about your project" type="textarea" required={false} maxLength={5000} /></div>
            </div>
            <p className="mt-6 text-[13px] leading-relaxed text-[#4a5470]" data-testid="consulting3-consent">
              BluBridge needs the contact information you provide to contact you about our products and services. You may unsubscribe from these communications at any time. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our{' '}
              <Link to="/policies/privacy-policy" className="text-[#2b4c8c] underline underline-offset-2" data-testid="consulting3-privacy-link">Privacy Policy</Link>.
            </p>
            <div className="aic-actions" style={{ justifyContent: 'flex-start' }}><Button type="submit" className="aic-primary" disabled={disabled} aria-busy={submission.isSubmitting} data-testid="aic-submit-enquiry">
              {submission.isSubmitting && <Loader2 className="aic-base-submit-spinner" aria-hidden="true" />}
              <span aria-live="polite" data-testid="aic-submit-label">{submission.receipt ? 'Enquiry Submitted' : submission.isSubmitting ? 'Submitting…' : 'Submit'}</span>
              {!submission.isSubmitting && !submission.receipt && <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />}
            </Button></div>
            {submission.submitError && <p className="aic-error aic-submit-error" role="alert" data-testid="aic-submit-error">{submission.submitError}</p>}
          </form>
        </div>
      </div>
    </section>

    {/* Our Offices */}
    <section className="bg-[#f0f1f9] py-20 lg:py-24" data-testid="consulting3-offices">
      <div className="bb-container">
        <h2 className="text-center text-[32px] font-medium tracking-[-0.03em] text-[#0a1230] sm:text-[40px]" style={{ fontFamily: 'Geist, Inter, sans-serif' }} data-testid="consulting3-offices-heading">Our Offices</h2>
        <div className="mx-auto mt-16 grid max-w-[1100px] grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-3">
          {OFFICES.map(o => (
            <article key={o.id} className="relative flex flex-col rounded-xl border border-[#e2e6f2] bg-white px-7 pb-7 pt-12 shadow-[0_2px_14px_-8px_rgba(10,18,48,0.18)]" data-testid={`consulting3-office-${o.id}`}>
              <span className="absolute -top-5 left-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#0a1230] text-white shadow-md" aria-hidden="true"><MapPin className="h-5 w-5" strokeWidth={1.8} /></span>
              <h3 className="text-[19px] font-semibold text-[#0a1230]" style={{ fontFamily: 'Geist, Inter, sans-serif' }}>{o.city}, {o.region.split(', ')[1] === 'IN' ? 'India' : 'USA'}</h3>
              <p className="mt-1 text-[13px] text-[#6b7590]">{o.region}</p>
              {o.company && <p className="mt-4 text-[14px] font-medium text-[#0a1230]">{o.company}</p>}
              <p className={`${o.company ? 'mt-1' : 'mt-4'} flex-1 text-[14px] leading-[1.7] text-[#4a5470]`}>
                {o.lines.map((l, i) => <React.Fragment key={l}>{l}{i < o.lines.length - 1 && <br />}</React.Fragment>)}
              </p>
              <a href={o.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#2b4c8c] hover:underline" data-testid={`consulting3-map-${o.id}`}>
                View on Google Maps <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  </div>;
}
