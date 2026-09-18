import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';

/* /get-in-touch-7 — FRONTEND ONLY (no API call). Heading left, placeholder-style form right.
   Styles scoped under .git8-* (index.css). */

const MAX_COMMENTS = 300;

const countries = [
  'India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Singapore', 'Australia', 'Canada',
  'Germany', 'France', 'Netherlands', 'Switzerland', 'Ireland', 'Spain', 'Italy', 'Sweden', 'Norway', 'Denmark',
  'Japan', 'South Korea', 'Malaysia', 'Indonesia', 'Saudi Arabia', 'Qatar', 'South Africa', 'Brazil', 'Mexico',
  'New Zealand', 'Israel', 'Sri Lanka', 'Other',
];

const emptyForm = { firstName: '', lastName: '', companyEmail: '', companyName: '', jobTitle: '', phone: '', country: '', comments: '', terms: false };

const GetInTouchV8 = () => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');

  useDocumentTitle('Get in Touch | BluBridge');
  useMetaDescription('Have a project, technology requirement or collaboration in mind? Tell us what you are working on and connect with the BluBridge team.');

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (notice) setNotice('');
  };

  const validate = () => {
    const er = {};
    if (!form.firstName.trim()) er.firstName = 'First name is required';
    if (!form.lastName.trim()) er.lastName = 'Last name is required';
    if (!form.companyEmail.trim()) er.companyEmail = 'Company email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.companyEmail.trim())) er.companyEmail = 'Please enter a valid email address';
    if (!form.companyName.trim()) er.companyName = 'Company name is required';
    if (!form.jobTitle.trim()) er.jobTitle = 'Job title is required';
    if (form.phone.trim() && !/^[0-9]{6,15}$/.test(form.phone.replace(/[^0-9]/g, ''))) er.phone = 'Please enter a valid phone number';
    if (!form.country) er.country = 'Please select a country';
    if (!form.comments.trim()) er.comments = 'Comments are required';
    else if (form.comments.trim().length > MAX_COMMENTS) er.comments = `Please keep comments under ${MAX_COMMENTS} characters`;
    if (!form.terms) er.terms = 'Please agree to the Terms of use and Privacy policy';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setNotice('');
    if (!validate()) return;
    setNotice('Form validated successfully. Backend connection will be added later.');
  };

  const cls = (n, extra = '') => `git8-input${extra}${errors[n] ? ' git8-input-error' : ''}`;
  const Err = ({ name }) => errors[name] ? <p className="git8-err" data-testid={`git8-error-${name}`}>{errors[name]}</p> : null;

  return (
    <div className="git8-page" data-testid="get-in-touch-v8-page">
      <section className="git8-section">
        <div className="bb-container">
          <div className="git8-grid">

            <div className="git8-intro">
              <span className="git8-eyebrow" data-testid="git8-eyebrow">GET IN TOUCH</span>
              <h1 className="git8-title" data-testid="git8-heading">Let&rsquo;s build what&rsquo;s next.</h1>
              <p className="git8-lede" data-testid="git8-lede">
                Have a project, technology requirement or collaboration in mind? Tell us what you&rsquo;re working on and connect with the BluBridge team.
              </p>
            </div>

            <form onSubmit={onSubmit} className="git8-form" data-testid="git8-form" noValidate>
              <div className="git8-field">
                <label htmlFor="git8-first-name" className="git8-sr">First Name (required)</label>
                <input id="git8-first-name" name="firstName" type="text" placeholder="First Name*" autoComplete="given-name" value={form.firstName} onChange={onChange} className={cls('firstName')} data-testid="git8-input-first-name" />
                <Err name="firstName" />
              </div>
              <div className="git8-field">
                <label htmlFor="git8-last-name" className="git8-sr">Last Name (required)</label>
                <input id="git8-last-name" name="lastName" type="text" placeholder="Last Name*" autoComplete="family-name" value={form.lastName} onChange={onChange} className={cls('lastName')} data-testid="git8-input-last-name" />
                <Err name="lastName" />
              </div>
              <div className="git8-field">
                <label htmlFor="git8-company-email" className="git8-sr">Company Email (required)</label>
                <input id="git8-company-email" name="companyEmail" type="email" placeholder="Company Email*" autoComplete="email" value={form.companyEmail} onChange={onChange} className={cls('companyEmail')} data-testid="git8-input-company-email" />
                <Err name="companyEmail" />
              </div>
              <div className="git8-field">
                <label htmlFor="git8-company-name" className="git8-sr">Company Name (required)</label>
                <input id="git8-company-name" name="companyName" type="text" placeholder="Company Name*" autoComplete="organization" value={form.companyName} onChange={onChange} className={cls('companyName')} data-testid="git8-input-company-name" />
                <Err name="companyName" />
              </div>
              <div className="git8-field">
                <label htmlFor="git8-job-title" className="git8-sr">Job Title (required)</label>
                <input id="git8-job-title" name="jobTitle" type="text" placeholder="Job Title*" autoComplete="organization-title" value={form.jobTitle} onChange={onChange} className={cls('jobTitle')} data-testid="git8-input-job-title" />
                <Err name="jobTitle" />
              </div>
              <div className="git8-field">
                <label htmlFor="git8-phone" className="git8-sr">Phone Number (optional)</label>
                <input id="git8-phone" name="phone" type="tel" placeholder="Phone Number" autoComplete="tel" value={form.phone} onChange={onChange} className={cls('phone')} data-testid="git8-input-phone" />
                <Err name="phone" />
              </div>
              <div className="git8-field git8-full">
                <label htmlFor="git8-country" className="git8-sr">Select a country (required)</label>
                <select id="git8-country" name="country" value={form.country} onChange={onChange} className={cls('country', ` git8-select${form.country ? '' : ' git8-select-empty'}`)} data-testid="git8-select-country">
                  <option value="">Select a country*</option>
                  {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <Err name="country" />
              </div>
              <div className="git8-field git8-full">
                <label htmlFor="git8-comments" className="git8-sr">Comments (required)</label>
                <textarea id="git8-comments" name="comments" rows={6} maxLength={MAX_COMMENTS} placeholder="Comments*" value={form.comments} onChange={onChange} className={cls('comments', ' git8-textarea')} data-testid="git8-input-comments" />
                <div className="git8-counter" data-testid="git8-char-counter">{form.comments.length} of {MAX_COMMENTS} max characters</div>
                <Err name="comments" />
              </div>
              <div className="git8-field git8-full">
                <label className="git8-terms">
                  <input type="checkbox" name="terms" checked={form.terms} onChange={onChange} data-testid="git8-checkbox-terms" />
                  <span>I agree to the <Link to="/policies/terms-conditions" data-testid="git8-terms-link">Terms of use</Link> and <Link to="/policies/privacy-policy" data-testid="git8-privacy-link">Privacy policy</Link>.</span>
                </label>
                <Err name="terms" />
              </div>
              {notice && <p className="git8-notice git8-full" role="status" data-testid="git8-notice">{notice}</p>}
              <div className="git8-full">
                <button type="submit" className="git8-submit" data-testid="git8-submit">Start a conversation</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInTouchV8;
