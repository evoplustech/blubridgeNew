import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, ChevronDown, CheckCircle2, Loader2 } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';

const API_URL = window.location.origin;
const ART = '/images/consulting-1';

const CONTACT_EMAIL = 'info@blubridge.com';
const CONTACT_PHONE = '+91 8925987250';

const INQUIRY_TYPES = [
  'AI Strategy & Roadmap',
  'Custom Model Development',
  'Generative AI & LLM Solutions',
  'Data & ML Engineering',
  'AI Infrastructure & Deployment',
  'Partnership',
  'Other',
];

const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Singapore', 'United Arab Emirates',
  'Saudi Arabia', 'Qatar', 'Germany', 'France', 'Netherlands', 'Switzerland', 'Sweden', 'Ireland', 'Spain',
  'Italy', 'Belgium', 'Denmark', 'Norway', 'Finland', 'Poland', 'Austria', 'Israel', 'Japan', 'South Korea',
  'China', 'Hong Kong', 'Taiwan', 'Malaysia', 'Indonesia', 'Thailand', 'Vietnam', 'Philippines', 'New Zealand',
  'South Africa', 'Nigeria', 'Kenya', 'Egypt', 'Brazil', 'Mexico', 'Argentina', 'Chile', 'Colombia',
  'Sri Lanka', 'Bangladesh', 'Nepal', 'Other',
];

const LOCATIONS = [
  {
    id: 'chennai-besant-nagar',
    title: 'India: Besant Nagar',
    lines: ['Plot #E160 Tiger Varadhachari Road,', 'Kalakshetra Colony, Besant Nagar,', 'Chennai – 600090'],
    map: 'https://maps.google.com/?q=Plot+E160+Tiger+Varadhachari+Road+Kalakshetra+Colony+Besant+Nagar+Chennai+600090',
    art: `${ART}/chennai-temple-lineart.webp`,
    artAlt: 'Line drawing of a Chennai temple gopuram',
  },
  {
    id: 'chennai-ra-puram',
    title: 'India: R.A. Puram',
    lines: ['30, Norton Rd, Mandavelipakkam,', 'Raja Annamalai Puram,', 'Chennai, Tamil Nadu 600028'],
    map: 'https://maps.google.com/?q=30+Norton+Rd+Mandavelipakkam+Raja+Annamalai+Puram+Chennai+600028',
    art: `${ART}/chennai-central-lineart.webp`,
    artAlt: 'Line drawing of Chennai Central clock tower',
  },
  {
    id: 'usa-delaware',
    title: 'USA: Delaware',
    lines: ['BLUBRIDGE INC', '254 Chapman Rd, STE 208 #28314,', 'Newark, Delaware 19702 USA'],
    map: 'https://maps.google.com/?q=254+Chapman+Rd+STE+208+%2328314+Newark+Delaware+19702+USA',
    art: `${ART}/delaware-lineart.webp`,
    artAlt: 'Line drawing of the Delaware Memorial Bridge and a colonial building',
  },
];

const EMPTY = { fullName: '', email: '', phone: '', company: '', country: '', inquiryType: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d\s().-]{6,40}$/;

const labelCls = 'block text-[13px] font-medium text-[#0a1230] mb-2';
const fieldBase =
  'w-full rounded-lg border bg-white px-4 text-[14px] text-[#0a1230] placeholder:text-[#9aa3b8] outline-none transition-colors duration-200 focus:border-[#2b4c8c] focus:ring-4 focus:ring-[#2b4c8c]/10';

function Field({ label, error, children, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelCls}>
        {label} <span className="text-[#d14343]">*</span>
      </label>
      {children}
      {error && <p className="mt-1.5 text-[12px] text-[#d14343]" data-testid={`error-${htmlFor}`}>{error}</p>}
    </div>
  );
}

export default function Consulting1() {
  useDocumentTitle('Talk to Our AI Consultants | BluBridge');
  useMetaDescription('Have an AI initiative in mind? Share your goals with BluBridge consultants and get a response within one business day.');

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const border = name => (errors[name] ? 'border-[#d14343]' : 'border-[#dde2ee]');

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const validate = () => {
    const er = {};
    const nameParts = form.fullName.trim().split(/\s+/).filter(Boolean);
    if (!form.fullName.trim()) er.fullName = 'Please enter your full name';
    else if (nameParts.length < 2) er.fullName = 'Please enter your first and last name';
    else if (form.fullName.trim().length > 200) er.fullName = 'Name is too long';
    if (!form.email.trim()) er.email = 'Please enter your work email';
    else if (!EMAIL_RE.test(form.email.trim())) er.email = 'Please enter a valid email address';
    if (!form.phone.trim()) er.phone = 'Please enter your phone number';
    else if (!PHONE_RE.test(form.phone.trim()) || form.phone.replace(/\D/g, '').length < 6) er.phone = 'Please enter a valid phone number';
    if (!form.company.trim()) er.company = 'Please enter your company name';
    if (!form.country) er.country = 'Please select a country';
    if (!form.inquiryType) er.inquiryType = 'Please select an inquiry type';
    if (!form.message.trim()) er.message = 'Please tell us about your inquiry';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (submitting) return;
    setSubmitError('');
    if (!validate()) return;
    setSubmitting(true);
    const [firstName, ...rest] = form.fullName.trim().split(/\s+/);
    try {
      const response = await fetch(`${API_URL}/api/contacts/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact_us',
          firstName: firstName.slice(0, 120),
          lastName: rest.join(' ').slice(0, 120),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          country: form.country,
          enquiryCategory: form.inquiryType,
          message: form.message.trim(),
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        setForm(EMPTY);
        setErrors({});
      } else if (response.status === 409) {
        setSubmitError('You have already submitted this form recently. Please wait a moment before trying again.');
      } else if (response.status === 429) {
        setSubmitError('Too many attempts. Please wait a minute and try again.');
      } else {
        let detail = '';
        try { const data = await response.json(); detail = typeof data.detail === 'string' ? data.detail : ''; } catch { /* ignore */ }
        setSubmitError(detail || 'Failed to submit form. Please try again.');
      }
    } catch {
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-[#0a1230]" style={{ fontFamily: 'Inter, sans-serif' }} data-testid="consulting1-page">
      {/* ===== HERO + FORM ===== */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{ background: 'radial-gradient(1200px 500px at 10% 0%, #f3f6fd 0%, rgba(255,255,255,0) 60%)' }}
        />
        <img
          src={`${ART}/world-dots.webp`}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-[-6%] hidden w-[58%] max-w-[820px] select-none opacity-70 lg:block"
        />

        <div className="bb-container relative pb-20 pt-14 md:pt-20 lg:pb-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-16 xl:gap-24">
            {/* Left */}
            <div className="lg:pt-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#2b6cd4]" data-testid="consulting1-eyebrow">
                Get in touch
              </p>
              <h1
                className="mt-5 text-[44px] font-bold leading-[1.04] tracking-[-0.035em] text-[#0a1230] sm:text-[56px] lg:text-[64px]"
                style={{ fontFamily: 'Geist, Inter, sans-serif' }}
                data-testid="consulting1-heading"
              >
                Let’s build
                <br />
                what’s next.
              </h1>
              <p className="mt-6 max-w-[440px] text-[17px] leading-[1.65] text-[#4a5470]" data-testid="consulting1-intro">
                Planning an AI initiative, scaling a model into production, or simply exploring what’s possible?
                Our consultants will help you turn the idea into a working system.
              </p>

              <span className="mt-10 block h-px w-14 bg-[#d5dbe8]" aria-hidden="true" />

              <div className="mt-10 space-y-9">
                <a href={`mailto:${CONTACT_EMAIL}`} className="group flex items-start gap-6" data-testid="consulting1-email">
                  <span className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-full bg-[#edf2fc] text-[#0b2c5f] transition-colors group-hover:bg-[#dfe8fa]">
                    <Mail className="h-[22px] w-[22px]" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-[17px] font-semibold text-[#0a1230]">Email Us</span>
                    <span className="mt-1 block text-[15px] text-[#0a1230] group-hover:text-[#2b6cd4]">{CONTACT_EMAIL}</span>
                    <span className="mt-1.5 block max-w-[260px] text-[13px] leading-relaxed text-[#6b7590]">
                      We typically respond within one business day.
                    </span>
                  </span>
                </a>
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="group flex items-start gap-6" data-testid="consulting1-phone">
                  <span className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-full bg-[#edf2fc] text-[#0b2c5f] transition-colors group-hover:bg-[#dfe8fa]">
                    <Phone className="h-[22px] w-[22px]" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-[17px] font-semibold text-[#0a1230]">Call Us</span>
                    <span className="mt-1 block text-[15px] text-[#0a1230] group-hover:text-[#2b6cd4]">{CONTACT_PHONE}</span>
                    <span className="mt-1.5 block text-[13px] text-[#6b7590]">Mon – Fri, 9:00 AM – 6:00 PM (IST)</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Right — form card */}
            <div
              className="rounded-2xl border border-[#eef1f7] bg-white p-6 shadow-[0_24px_60px_-28px_rgba(10,18,48,0.25)] sm:p-9"
              data-testid="consulting1-form-card"
            >
              {submitted ? (
                <div className="flex min-h-[520px] flex-col items-center justify-center text-center" data-testid="consulting1-success">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f6ee] text-[#1f9254]">
                    <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
                  </span>
                  <h2 className="mt-6 text-[24px] font-semibold tracking-[-0.02em]" style={{ fontFamily: 'Geist, Inter, sans-serif' }}>
                    Thank you — message received.
                  </h2>
                  <p className="mt-3 max-w-[360px] text-[15px] leading-relaxed text-[#5b6580]">
                    One of our consultants will review your inquiry and get back to you within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-[14px] font-medium text-[#2b6cd4] underline-offset-4 hover:underline"
                    data-testid="consulting1-send-another"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-[26px] font-semibold tracking-[-0.02em]" style={{ fontFamily: 'Geist, Inter, sans-serif' }}>
                    Send us a message
                  </h2>
                  <p className="mt-2 text-[14px] text-[#5b6580]">Fill out the form and our team will get back to you shortly.</p>

                  <form onSubmit={onSubmit} noValidate className="mt-8 space-y-6" data-testid="consulting1-form">
                    <Field label="Full Name" htmlFor="fullName" error={errors.fullName}>
                      <input id="fullName" name="fullName" type="text" autoComplete="name" maxLength={200} placeholder="John Smith"
                        value={form.fullName} onChange={onChange} className={`${fieldBase} h-12 ${border('fullName')}`} data-testid="input-full-name" />
                    </Field>

                    <Field label="Work Email" htmlFor="email" error={errors.email}>
                      <input id="email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@company.com"
                        value={form.email} onChange={onChange} className={`${fieldBase} h-12 ${border('email')}`} data-testid="input-email" />
                    </Field>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5">
                      <Field label="Phone" htmlFor="phone" error={errors.phone}>
                        <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+91 98765 43210"
                          value={form.phone} onChange={onChange} className={`${fieldBase} h-12 ${border('phone')}`} data-testid="input-phone" />
                      </Field>
                      <Field label="Company" htmlFor="company" error={errors.company}>
                        <input id="company" name="company" type="text" autoComplete="organization" maxLength={200} placeholder="Your company name"
                          value={form.company} onChange={onChange} className={`${fieldBase} h-12 ${border('company')}`} data-testid="input-company" />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5">
                      <Field label="Country" htmlFor="country" error={errors.country}>
                        <div className="relative">
                          <select id="country" name="country" value={form.country} onChange={onChange}
                            className={`${fieldBase} h-12 appearance-none pr-10 ${form.country ? '' : 'text-[#9aa3b8]'} ${border('country')}`} data-testid="select-country">
                            <option value="" disabled>Select a country</option>
                            {COUNTRIES.map(c => <option key={c} value={c} className="text-[#0a1230]">{c}</option>)}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5b6580]" />
                        </div>
                      </Field>
                      <Field label="Inquiry Type" htmlFor="inquiryType" error={errors.inquiryType}>
                        <div className="relative">
                          <select id="inquiryType" name="inquiryType" value={form.inquiryType} onChange={onChange}
                            className={`${fieldBase} h-12 appearance-none pr-10 ${form.inquiryType ? '' : 'text-[#9aa3b8]'} ${border('inquiryType')}`} data-testid="select-inquiry-type">
                            <option value="" disabled>Select an option</option>
                            {INQUIRY_TYPES.map(t => <option key={t} value={t} className="text-[#0a1230]">{t}</option>)}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5b6580]" />
                        </div>
                      </Field>
                    </div>

                    <Field label="Message" htmlFor="message" error={errors.message}>
                      <textarea id="message" name="message" rows={5} maxLength={4000} placeholder="Tell us about your project, goals or timeline…"
                        value={form.message} onChange={onChange} className={`${fieldBase} resize-y py-3 ${border('message')}`} data-testid="input-message" />
                    </Field>

                    {submitError && (
                      <p className="rounded-lg border border-[#f3c7c7] bg-[#fdf2f2] px-4 py-3 text-[13px] text-[#b42318]" data-testid="consulting1-submit-error">
                        {submitError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group flex h-[52px] w-full items-center justify-center gap-2.5 rounded-lg bg-[#0b2c5f] text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#0a2550] hover:shadow-[0_12px_24px_-12px_rgba(11,44,95,0.6)] disabled:cursor-not-allowed disabled:opacity-70"
                      data-testid="consulting1-submit"
                    >
                      {submitting ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                      ) : (
                        <>Send Message <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>
                      )}
                    </button>

                    <p className="text-[12px] leading-relaxed text-[#6b7590]">
                      By submitting this form, you agree to our{' '}
                      <a href="/policies/privacy-policy" className="text-[#2b6cd4] underline underline-offset-2" data-testid="consulting1-privacy-link">
                        Privacy Policy
                      </a>
                      . We’ll only use your information to respond to your inquiry.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS ===== */}
      <section className="bg-[#f6f8fc] py-20 lg:py-28" data-testid="consulting1-locations">
        <div className="bb-container">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#2b6cd4]">Our locations</p>
            <h2
              className="mt-4 text-[34px] font-bold leading-[1.1] tracking-[-0.03em] text-[#0a1230] sm:text-[44px]"
              style={{ fontFamily: 'Geist, Inter, sans-serif' }}
            >
              Global presence. Local support.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.6] text-[#4a5470]">
              We partner with organizations around the world. Find an office near you or get in touch with our team.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map(loc => (
              <article
                key={loc.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-[#e8ecf5] bg-white p-7 shadow-[0_2px_12px_-8px_rgba(10,18,48,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(10,18,48,0.3)]"
                data-testid={`location-card-${loc.id}`}
              >
                <img
                  src={loc.art}
                  alt={loc.artAlt}
                  loading="lazy"
                  className="pointer-events-none absolute right-4 top-5 h-[96px] w-auto max-w-[42%] select-none object-contain object-right-bottom opacity-80"
                />
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#0b2c5f] text-white">
                  <MapPin className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
                <h3 className="relative mt-5 max-w-[58%] text-[19px] font-semibold leading-snug text-[#0a1230]">{loc.title}</h3>
                <a href={`mailto:${CONTACT_EMAIL}`} className="relative mt-2 text-[14px] text-[#2f3a56] hover:text-[#2b6cd4]">{CONTACT_EMAIL}</a>
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="relative mt-0.5 text-[14px] text-[#5b6580] hover:text-[#2b6cd4]">{CONTACT_PHONE}</a>

                <span className="relative mt-6 block h-px w-full bg-[#e8ecf5]" aria-hidden="true" />

                <address className="relative mt-5 flex-1 text-[14px] not-italic leading-[1.7] text-[#4a5470]">
                  {loc.lines.map(l => <span key={l} className="block">{l}</span>)}
                </address>

                <a
                  href={loc.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-[#2b6cd4] hover:text-[#0b2c5f]"
                  data-testid={`location-map-${loc.id}`}
                >
                  View on Google Maps <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
