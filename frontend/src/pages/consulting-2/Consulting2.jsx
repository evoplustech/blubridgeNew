import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';
import {
  CONTACT_EMAIL, CONTACT_PHONE, telHref, LOCATIONS, useConsultingContactForm,
} from '../consulting-shared/consultingContact';
import { PremiumSelect } from '../consulting-3/PremiumSelect';
import { COUNTRY_NAME_OPTIONS, SERVICE_OPTIONS } from '../consulting-shared/premiumOptions';

const BLUE = '#1f6fe5';
const HEAD_FONT = { fontFamily: 'Geist, Inter, sans-serif' };
const labelCls = 'block text-[14px] font-semibold text-[#0a1230] mb-2';
const fieldBase =
  'w-full rounded-lg border bg-white px-4 text-[14px] text-[#0a1230] placeholder:text-[#9aa3b8] outline-none transition-colors duration-200 focus:border-[#1f6fe5] focus:ring-4 focus:ring-[#1f6fe5]/10';

function Field({ label, htmlFor, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={labelCls}>{label} *</label>
      {children}
      {error && <p className="mt-1.5 text-[12px] text-[#d14343]" data-testid={`error-${htmlFor}`}>{error}</p>}
    </div>
  );
}

function SelectField({ id, value, onChange, placeholder, options, error, testId, ...rest }) {
  return <PremiumSelect id={id} value={value} onChange={v => onChange({ target: { name: id, value: v } })} error={error} options={options} placeholder={placeholder} testId={testId} {...rest} />;
}

function InfoCard({ href, Icon, label, value, note, testId }) {
  return (
    <a href={href} className="group flex items-center gap-5 rounded-xl border border-[#eef2f9] bg-[#f7f9fd] px-6 py-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dbe5f7] hover:bg-white hover:shadow-[0_16px_36px_-24px_rgba(10,18,48,0.35)]" data-testid={testId}>
      <span className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full text-white shadow-[0_8px_18px_-8px_rgba(31,111,229,0.7)]" style={{ background: BLUE }}>
        <Icon className="h-[22px] w-[22px]" strokeWidth={2} />
      </span>
      <span className="min-w-0">
        <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#3b4560]">{label}</span>
        <span className="mt-1 block truncate text-[16px] font-semibold text-[#0a1230] group-hover:text-[#1f6fe5]">{value}</span>
        <span className="mt-1 block text-[12.5px] text-[#6b7590]">{note}</span>
      </span>
    </a>
  );
}

export default function Consulting2() {
  useDocumentTitle('Contact Our AI Consulting Team | BluBridge');
  useMetaDescription('Tell BluBridge about your AI project — strategy, custom models, GenAI or production deployment — and our consulting team will get back to you within one business day.');

  const { form, errors, submitting, submitError, submitted, setSubmitted, onChange, onSubmit } =
    useConsultingContactForm({ messageLabel: 'project', inquiryLabel: 'a service' });
  const border = name => (errors[name] ? 'border-[#d14343]' : 'border-[#dde2ee]');

  return (
    <div className="relative overflow-hidden bg-[#fcfdff] text-[#0a1230]" style={{ fontFamily: 'Inter, sans-serif' }} data-testid="consulting2-page">
      {/* soft decorative circles */}
      <span aria-hidden="true" className="pointer-events-none absolute -left-40 -top-32 h-[420px] w-[420px] rounded-full bg-[#eef3fc]" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-44 top-[520px] h-[380px] w-[380px] rounded-full bg-[#f1f5fd]" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 h-[360px] w-[360px] rounded-full bg-[#f1f5fd]" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-48 -right-36 h-[420px] w-[420px] rounded-full bg-[#eef3fc]" />

      {/* ===== HEADER ===== */}
      <section className="relative">
        <div className="bb-container pt-16 text-center md:pt-20">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: BLUE }} data-testid="consulting2-eyebrow">Contact us</p>
          <h1 className="mx-auto mt-4 max-w-[820px] text-[36px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[48px]" style={HEAD_FONT} data-testid="consulting2-heading">
            Let’s Build Intelligent Systems Together
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.65] text-[#4a5470] sm:text-[17px]" data-testid="consulting2-intro">
            Have an AI use case, a model to scale, or need a custom solution? Our consulting team is here to help.
          </p>

          <div className="mx-auto mt-12 grid max-w-[720px] grid-cols-1 gap-5 text-left sm:grid-cols-2">
            <InfoCard href={`mailto:${CONTACT_EMAIL}`} Icon={Mail} label="Email us" value={CONTACT_EMAIL} note="We typically reply within 1 business day." testId="consulting2-email" />
            <InfoCard href={telHref(CONTACT_PHONE)} Icon={Phone} label="Call us" value={CONTACT_PHONE} note="Mon – Fri, 9am – 6pm (IST)" testId="consulting2-phone" />
          </div>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section className="relative">
        <div className="bb-container pb-20 pt-10 md:pb-24">
          <div className="mx-auto max-w-[900px] rounded-2xl border border-[#eef1f7] bg-white p-6 shadow-[0_24px_60px_-34px_rgba(10,18,48,0.28)] sm:p-10" data-testid="consulting2-form-card">
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center" data-testid="consulting2-success">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f6ee] text-[#1f9254]">
                  <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
                </span>
                <h2 className="mt-6 text-[24px] font-bold tracking-[-0.02em]" style={HEAD_FONT}>Thanks — we’ve got your project details.</h2>
                <p className="mt-3 max-w-[420px] text-[15px] leading-relaxed text-[#5b6580]">
                  A BluBridge consultant will review your request and get back to you within one business day.
                </p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-8 text-[14px] font-semibold underline-offset-4 hover:underline" style={{ color: BLUE }} data-testid="consulting2-send-another">
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-[24px] font-bold tracking-[-0.02em]" style={HEAD_FONT}>Send us a message</h2>
                <p className="mt-1.5 text-[14px] text-[#5b6580]">Fill out the form below and we’ll get back to you shortly.</p>

                <form onSubmit={onSubmit} noValidate className="mt-8 grid grid-cols-1 gap-x-7 gap-y-6 sm:grid-cols-2" data-testid="consulting2-form">
                  <Field label="Full Name" htmlFor="fullName" error={errors.fullName}>
                    <input id="fullName" name="fullName" type="text" autoComplete="name" maxLength={200} placeholder="John Doe"
                      value={form.fullName} onChange={onChange} className={`${fieldBase} h-12 ${border('fullName')}`} data-testid="input-full-name" />
                  </Field>
                  <Field label="Work Email" htmlFor="email" error={errors.email}>
                    <input id="email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@company.com"
                      value={form.email} onChange={onChange} className={`${fieldBase} h-12 ${border('email')}`} data-testid="input-email" />
                  </Field>
                  <Field label="Phone" htmlFor="phone" error={errors.phone}>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+91 98765 43210"
                      value={form.phone} onChange={onChange} className={`${fieldBase} h-12 ${border('phone')}`} data-testid="input-phone" />
                  </Field>
                  <Field label="Company" htmlFor="company" error={errors.company}>
                    <input id="company" name="company" type="text" autoComplete="organization" maxLength={200} placeholder="Your company name"
                      value={form.company} onChange={onChange} className={`${fieldBase} h-12 ${border('company')}`} data-testid="input-company" />
                  </Field>
                  <Field label="Country" htmlFor="country" error={errors.country}>
                    <SelectField id="country" value={form.country} onChange={onChange} placeholder="Select country" options={COUNTRY_NAME_OPTIONS} error={errors.country} searchable searchPlaceholder="Search countries" emptyText="No country found." testId="select-country" />
                  </Field>
                  <Field label="Service Needed" htmlFor="inquiryType" error={errors.inquiryType}>
                    <SelectField id="inquiryType" value={form.inquiryType} onChange={onChange} placeholder="Select a service" options={SERVICE_OPTIONS} error={errors.inquiryType} wide testId="select-service" />
                  </Field>
                  <Field label="Project Details" htmlFor="message" error={errors.message} className="sm:col-span-2">
                    <textarea id="message" name="message" rows={4} maxLength={4000} placeholder="Tell us about your project, goals or any specific requirements…"
                      value={form.message} onChange={onChange} className={`${fieldBase} resize-y py-3 ${border('message')}`} data-testid="input-message" />
                  </Field>

                  {submitError && (
                    <p className="rounded-lg border border-[#f3c7c7] bg-[#fdf2f2] px-4 py-3 text-[13px] text-[#b42318] sm:col-span-2" data-testid="consulting2-submit-error">
                      {submitError}
                    </p>
                  )}

                  <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg px-8 text-[15px] font-semibold text-white shadow-[0_10px_22px_-12px_rgba(31,111,229,0.8)] transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                      style={{ background: BLUE }}
                      data-testid="consulting2-submit"
                    >
                      {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : (<>Send Message <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>)}
                    </button>
                    <p className="text-[12px] leading-relaxed text-[#6b7590] sm:max-w-[400px] sm:text-right">
                      By submitting, you agree to our{' '}
                      <a href="/policies/privacy-policy" className="underline underline-offset-2" style={{ color: BLUE }} data-testid="consulting2-privacy-link">Privacy Policy</a>.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS ===== */}
      <section className="relative pb-24" data-testid="consulting2-locations">
        <div className="bb-container">
          <div className="text-center">
            <div className="flex items-center justify-center gap-5">
              <span className="h-px w-16 bg-[#d5dbe8]" aria-hidden="true" />
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: BLUE }}>Our locations</p>
              <span className="h-px w-16 bg-[#d5dbe8]" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-[32px] font-bold tracking-[-0.03em] sm:text-[40px]" style={HEAD_FONT}>BluBridge’s Global Presence</h2>
            <p className="mx-auto mt-3 max-w-[560px] text-[16px] text-[#4a5470]">We work with organizations around the world. Find our key locations below.</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map(loc => (
              <article key={loc.id} className="group flex flex-col rounded-xl border border-[#edf0f7] bg-white p-7 shadow-[0_4px_18px_-12px_rgba(10,18,48,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_-26px_rgba(10,18,48,0.32)]" data-testid={`c2-location-card-${loc.id}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf1fd]" style={{ color: BLUE }}>
                  <MapPin className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 text-[19px] font-bold" style={HEAD_FONT}>{loc.title}</h3>
                <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1.5 text-[14px] text-[#4a5470] hover:text-[#1f6fe5]">{CONTACT_EMAIL}</a>
                <a href={telHref(CONTACT_PHONE)} className="text-[14px] text-[#6b7590] hover:text-[#1f6fe5]">{CONTACT_PHONE}</a>
                <span className="mt-5 block h-px w-full bg-[#edf0f7]" aria-hidden="true" />
                <address className="mt-5 flex-1 text-[14px] not-italic leading-[1.7] text-[#4a5470]">
                  {loc.lines.map(l => <span key={l} className="block">{l}</span>)}
                </address>
                <a href={loc.map} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold hover:underline" style={{ color: BLUE }} data-testid={`c2-location-map-${loc.id}`}>
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
