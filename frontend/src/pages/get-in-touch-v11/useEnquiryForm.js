import { useRef, useState } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL || window.location.origin;
const emptyForm = { fullName: '', workEmail: '', company: '', phone: '', jobTitle: '', country: '', city: '', budget: '', description: '', privacy: false, marketing: false };

export const services = ['AI strategy', 'Generative AI', 'AI agents', 'Custom AI models', 'AI integration', 'Not sure yet'];
export const serviceId = value => value.toLowerCase().replaceAll(' ', '-');
export const countries = ['India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Singapore', 'Australia', 'Canada', 'Germany', 'France', 'Netherlands', 'Switzerland', 'Ireland', 'Spain', 'Italy', 'Sweden', 'Norway', 'Denmark', 'Japan', 'South Korea', 'Malaysia', 'Indonesia', 'Saudi Arabia', 'Qatar', 'South Africa', 'Brazil', 'Mexico', 'New Zealand', 'Israel', 'Sri Lanka', 'Other'];
export const budgetRanges = ['Under 10,000', '10,000–50,000', '50,000–100,000', '100,000–500,000', '500,000+'];

// Independent /get-in-touch-10 form; other variants are unchanged.
export const useEnquiryForm = () => {
  const [form, setForm] = useState(emptyForm);
  const [selectedServices, setSelectedServices] = useState(['Generative AI']);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitting = useRef(false);

  const onChange = e => {
    if (submitting.current) return;
    const { name, value, checked, type } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setNotice('');
    setSubmitError('');
  };
  const toggleService = service => {
    if (submitting.current) return;
    setSelectedServices(prev => prev.includes(service) ? prev.filter(item => item !== service) : [...prev, service]);
    setErrors(prev => ({ ...prev, services: '' }));
    setNotice('');
    setSubmitError('');
  };
  const onSubmit = async e => {
    e.preventDefault();
    if (submitting.current) return;
    setNotice('');
    setSubmitError('');
    const next = {};
    if (!selectedServices.length) next.services = 'Please choose at least one option';
    if (!form.fullName.trim()) next.fullName = 'Please enter your full name';
    if (!form.workEmail.trim()) next.workEmail = 'Please enter your work email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail.trim())) next.workEmail = 'Please enter a valid email address';
    if (!form.company.trim()) next.company = 'Please enter your company name';
    if (form.phone.trim() && (!/^[+()\d\s.-]+$/.test(form.phone.trim()) || !/^\d{6,15}$/.test(form.phone.replace(/\D/g, '')))) next.phone = 'Please enter a valid phone number';
    if (!form.privacy) next.privacy = 'Please agree to the Privacy Policy to continue';
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      const target = first === 'services' ? '[data-testid="git11-service-ai-strategy"]' : `[name="${first}"]`;
      e.currentTarget.querySelector(target)?.focus();
      return;
    }
    submitting.current = true;
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/ai-consultation-enquiries`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, services: selectedServices }),
      });
      if (response.ok) {
        setNotice('Thank you. Your AI consultation enquiry has been received. Our team will be in touch shortly.');
        setForm(emptyForm); setSelectedServices(['Generative AI']); setErrors({});
      } else if (response.status === 409) {
        setSubmitError('You have already submitted an enquiry recently. Please wait a moment before trying again.');
      } else if (response.status === 429) {
        setSubmitError('Too many requests. Please wait a minute before trying again.');
      } else if (response.status === 422) {
        const result = await response.json();
        const fieldErrors = {};
        if (Array.isArray(result.detail)) result.detail.forEach(item => { const field = item.loc?.[1]; if (field) fieldErrors[field] = item.msg.replace(/^Value error, /, ''); });
        setErrors(fieldErrors);
        setSubmitError('Please check the highlighted fields and try again.');
      } else {
        setSubmitError('We couldn’t send your enquiry. Your details are still here; please try again.');
      }
    } catch {
      setSubmitError('We couldn’t send your enquiry. Please check your connection and try again.');
    } finally { submitting.current = false; setIsSubmitting(false); }
  };
  return { form, errors, notice, submitError, isSubmitting, selectedServices, onChange, toggleService, onSubmit };
};