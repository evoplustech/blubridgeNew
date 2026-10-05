import { useState } from 'react';

export const CONTACT_EMAIL = 'info@blubridge.com';
export const CONTACT_PHONE = '+91 8925987250';
export const telHref = phone => `tel:${phone.replace(/\s/g, '')}`;

export const SERVICE_TYPES = [
  'AI Strategy & Roadmap',
  'Custom Model Development',
  'Generative AI & LLM Solutions',
  'Data & ML Engineering',
  'AI Infrastructure & Deployment',
  'Partnership',
  'Other',
];

export const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Singapore', 'United Arab Emirates',
  'Saudi Arabia', 'Qatar', 'Germany', 'France', 'Netherlands', 'Switzerland', 'Sweden', 'Ireland', 'Spain',
  'Italy', 'Belgium', 'Denmark', 'Norway', 'Finland', 'Poland', 'Austria', 'Israel', 'Japan', 'South Korea',
  'China', 'Hong Kong', 'Taiwan', 'Malaysia', 'Indonesia', 'Thailand', 'Vietnam', 'Philippines', 'New Zealand',
  'South Africa', 'Nigeria', 'Kenya', 'Egypt', 'Brazil', 'Mexico', 'Argentina', 'Chile', 'Colombia',
  'Sri Lanka', 'Bangladesh', 'Nepal', 'Other',
];

// Offices — same as the Contact Us page.
export const LOCATIONS = [
  {
    id: 'chennai-besant-nagar',
    title: 'India: Besant Nagar',
    lines: ['Plot #E160 Tiger Varadhachari Road,', 'Kalakshetra Colony, Besant Nagar,', 'Chennai – 600090'],
    map: 'https://maps.google.com/?q=Plot+E160+Tiger+Varadhachari+Road+Kalakshetra+Colony+Besant+Nagar+Chennai+600090',
    art: '/images/consulting-1/chennai-temple-lineart.webp',
    artAlt: 'Line drawing of a Chennai temple gopuram',
  },
  {
    id: 'chennai-ra-puram',
    title: 'India: R.A. Puram',
    lines: ['30, Norton Rd, Mandavelipakkam,', 'Raja Annamalai Puram,', 'Chennai, Tamil Nadu 600028'],
    map: 'https://maps.google.com/?q=30+Norton+Rd+Mandavelipakkam+Raja+Annamalai+Puram+Chennai+600028',
    art: '/images/consulting-1/chennai-central-lineart.webp',
    artAlt: 'Line drawing of Chennai Central clock tower',
  },
  {
    id: 'usa-delaware',
    title: 'USA: Delaware',
    lines: ['BLUBRIDGE INC', '254 Chapman Rd, STE 208 #28314,', 'Newark, Delaware 19702 USA'],
    map: 'https://maps.google.com/?q=254+Chapman+Rd+STE+208+%2328314+Newark+Delaware+19702+USA',
    art: '/images/consulting-1/delaware-lineart.webp',
    artAlt: 'Line drawing of the Delaware Memorial Bridge and a colonial building',
  },
];

const EMPTY = { fullName: '', email: '', phone: '', company: '', country: '', inquiryType: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d\s().-]{6,40}$/;

/**
 * Shared form state + submission for the consulting contact pages.
 * Saves to Admin → Contact Forms (type "contact_us") incl. company & country.
 */
export function useConsultingContactForm({ messageLabel = 'inquiry', inquiryLabel = 'an inquiry type' } = {}) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
    if (!form.inquiryType) er.inquiryType = `Please select ${inquiryLabel}`;
    if (!form.message.trim()) er.message = `Please tell us about your ${messageLabel}`;
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
      const response = await fetch(`${window.location.origin}/api/contacts/submit`, {
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

  return { form, errors, submitting, submitError, submitted, setSubmitted, onChange, onSubmit };
}
