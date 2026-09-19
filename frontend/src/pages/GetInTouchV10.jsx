import React, { useState } from 'react';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';

/* /get-in-touch-9 — FRONTEND ONLY (no API call). Form panel left, heading + direct contact details right.
   Contact details mirror /contact. Styles scoped under .git10-* (index.css). */

const enquiries = [
  { value: 'sales', label: 'Sales Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'careers', label: 'Careers' },
  { value: 'other', label: 'Other' },
];

const emptyForm = { firstName: '', lastName: '', phone: '', organization: '', email: '', enquiry: '' };

const GetInTouchV10 = () => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');

  useDocumentTitle('Get in Touch | BluBridge');
  useMetaDescription('Have a project, technology requirement or collaboration in mind? Tell us what you are working on and connect with the BluBridge team.');

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (notice) setNotice('');
  };

  const validate = () => {
    const er = {};
    if (!form.firstName.trim()) er.firstName = 'First name is required';
    if (!form.lastName.trim()) er.lastName = 'Last name is required';
    if (!form.phone.trim()) er.phone = 'Phone is required';
    else if (!/^[0-9]{6,15}$/.test(form.phone.replace(/[^0-9]/g, ''))) er.phone = 'Please enter a valid phone number';
    if (!form.organization.trim()) er.organization = 'Organization name is required';
    if (!form.email.trim()) er.email = 'Business email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) er.email = 'Please enter a valid email address';
    if (!form.enquiry) er.enquiry = 'Please select an enquiry type';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setNotice('');
    if (!validate()) return;
    setNotice('Form is ready. Backend integration will be added later.');
  };

  const cls = (n, extra = '') => `git10-input${extra}${errors[n] ? ' git10-input-error' : ''}`;
  const Err = ({ name }) => errors[name] ? <p className="git10-err" data-testid={`git10-error-${name}`}>{errors[name]}</p> : null;

  return (
    <div className="git10-page" data-testid="get-in-touch-v10-page">
      <section className="git10-section">
        <div className="bb-container">
          <div className="git10-grid">

            {/* LEFT — form panel */}
            <form onSubmit={onSubmit} className="git10-form" data-testid="git10-form" noValidate>
              <h2 className="git10-form-title" data-testid="git10-form-heading">Let&rsquo;s Connect</h2>
              <div className="git10-row-2">
                <div className="git10-field">
                  <label htmlFor="git10-first-name" className="git10-sr">First Name (required)</label>
                  <input id="git10-first-name" name="firstName" type="text" placeholder="First Name" autoComplete="given-name" value={form.firstName} onChange={onChange} className={cls('firstName')} data-testid="git10-input-first-name" />
                  <Err name="firstName" />
                </div>
                <div className="git10-field">
                  <label htmlFor="git10-last-name" className="git10-sr">Last Name (required)</label>
                  <input id="git10-last-name" name="lastName" type="text" placeholder="Last Name" autoComplete="family-name" value={form.lastName} onChange={onChange} className={cls('lastName')} data-testid="git10-input-last-name" />
                  <Err name="lastName" />
                </div>
              </div>
              <div className="git10-field">
                <label htmlFor="git10-phone" className="git10-sr">Phone (required)</label>
                <input id="git10-phone" name="phone" type="tel" placeholder="Phone" autoComplete="tel" value={form.phone} onChange={onChange} className={cls('phone')} data-testid="git10-input-phone" />
                <Err name="phone" />
              </div>
              <div className="git10-field">
                <label htmlFor="git10-organization" className="git10-sr">Organization Name (required)</label>
                <input id="git10-organization" name="organization" type="text" placeholder="Organization Name" autoComplete="organization" value={form.organization} onChange={onChange} className={cls('organization')} data-testid="git10-input-organization" />
                <Err name="organization" />
              </div>
              <div className="git10-field">
                <label htmlFor="git10-email" className="git10-sr">Business Email (required)</label>
                <input id="git10-email" name="email" type="email" placeholder="Business Email" autoComplete="email" value={form.email} onChange={onChange} className={cls('email')} data-testid="git10-input-email" />
                <Err name="email" />
              </div>
              <div className="git10-field">
                <label htmlFor="git10-enquiry" className="git10-sr">Select Enquiry (required)</label>
                <select id="git10-enquiry" name="enquiry" value={form.enquiry} onChange={onChange} className={cls('enquiry', ` git10-select${form.enquiry ? '' : ' git10-select-empty'}`)} data-testid="git10-select-enquiry">
                  <option value="">- Select Enquiry -</option>
                  {enquiries.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <Err name="enquiry" />
              </div>
              {notice && <p className="git10-notice" role="status" data-testid="git10-notice">{notice}</p>}
              <div className="git10-actions">
                <button type="submit" className="git10-submit" data-testid="git10-submit">Schedule a Meeting</button>
              </div>
            </form>

            {/* RIGHT — heading + direct contact */}
            <div className="git10-info">
              <span className="git10-eyebrow" data-testid="git10-eyebrow">GET IN TOUCH</span>
              <h1 className="git10-title" data-testid="git10-heading">Let&rsquo;s build what&rsquo;s next.</h1>

              <ul className="git10-list">
                <li className="git10-item" data-testid="git10-contact-phone">
                  <span className="git10-icon" aria-hidden="true"><Phone strokeWidth={1.6} /></span>
                  <div>
                    <h3 className="git10-item-title">Phone</h3>
                    <a href="tel:+918925987250" className="git10-item-link">+91 8925987250</a>
                  </div>
                </li>
                <li className="git10-item" data-testid="git10-contact-email">
                  <span className="git10-icon" aria-hidden="true"><Mail strokeWidth={1.6} /></span>
                  <div>
                    <h3 className="git10-item-title">Email</h3>
                    <a href="mailto:info@blubridge.com" className="git10-item-link">info@blubridge.com</a>
                  </div>
                </li>
                <li className="git10-item" data-testid="git10-contact-location">
                  <span className="git10-icon" aria-hidden="true"><MapPin strokeWidth={1.6} /></span>
                  <div>
                    <h3 className="git10-item-title">Location</h3>
                    <p className="git10-item-text">Plot #E160 Tiger Varadhachari Road, Kalakshetra Colony, Besant Nagar, Chennai – 600090</p>
                  </div>
                </li>
              </ul>

              <a href="https://www.linkedin.com/company/blubridge/" target="_blank" rel="noopener noreferrer" className="git10-social" aria-label="BluBridge on LinkedIn" data-testid="git10-linkedin">
                <Linkedin strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInTouchV10;
