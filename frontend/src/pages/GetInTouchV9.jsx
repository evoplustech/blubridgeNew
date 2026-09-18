import React, { useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';

/* /get-in-touch-8 — FRONTEND ONLY (no API call). Heading left, minimal six-field form right.
   Styles scoped under .git9-* (index.css). */

const services = [
  'AI & Automation', 'Custom Software Development', 'Web Application Development', 'Mobile Application Development',
  'Product Engineering', 'Cloud & Infrastructure', 'Digital Transformation', 'Other',
];
const sizes = ['Small project', 'Medium project', 'Large project', 'Enterprise / Ongoing engagement', 'Not sure yet'];

const emptyForm = { name: '', email: '', website: '', service: '', size: '', details: '' };

const GetInTouchV9 = () => {
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

  const validWebsite = (w) => /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(w);

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = 'Please enter your name';
    if (!form.email.trim()) er.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) er.email = 'Please enter a valid email address';
    if (form.website.trim() && !validWebsite(form.website.trim())) er.website = 'Please enter a valid website address';
    if (!form.service) er.service = 'Please select a service';
    if (!form.size) er.size = 'Please select a project size';
    if (!form.details.trim()) er.details = 'Please tell us a little about your project or business';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setNotice('');
    if (!validate()) return;
    setNotice('Form is ready. Backend integration will be added later.');
  };

  const cls = (n, extra = '') => `git9-input${extra}${errors[n] ? ' git9-input-error' : ''}`;
  const Err = ({ name }) => errors[name] ? <p className="git9-err" data-testid={`git9-error-${name}`}>{errors[name]}</p> : null;

  return (
    <div className="git9-page" data-testid="get-in-touch-v9-page">
      <section className="git9-section">
        <div className="bb-container">
          <div className="git9-grid">

            <div className="git9-intro">
              <span className="git9-eyebrow" data-testid="git9-eyebrow">GET IN TOUCH</span>
              <h1 className="git9-title" data-testid="git9-heading">Let&rsquo;s build what&rsquo;s next.</h1>
              <p className="git9-lede" data-testid="git9-lede">
                Have a project, technology requirement or collaboration in mind? Tell us what you&rsquo;re working on and connect with the BluBridge team.
              </p>
            </div>

            <form onSubmit={onSubmit} className="git9-form" data-testid="git9-form" noValidate>
              <div className="git9-field">
                <label htmlFor="git9-name" className="git9-label">Name</label>
                <input id="git9-name" name="name" type="text" placeholder="John Doe" autoComplete="name" value={form.name} onChange={onChange} className={cls('name')} data-testid="git9-input-name" />
                <Err name="name" />
              </div>
              <div className="git9-field">
                <label htmlFor="git9-email" className="git9-label">Email</label>
                <input id="git9-email" name="email" type="email" placeholder="john@company.com" autoComplete="email" value={form.email} onChange={onChange} className={cls('email')} data-testid="git9-input-email" />
                <Err name="email" />
              </div>
              <div className="git9-field">
                <label htmlFor="git9-website" className="git9-label">Company&rsquo;s website</label>
                <input id="git9-website" name="website" type="text" inputMode="url" placeholder="www.company.com" autoComplete="url" value={form.website} onChange={onChange} className={cls('website')} data-testid="git9-input-website" />
                <Err name="website" />
              </div>
              <div className="git9-field">
                <label htmlFor="git9-service" className="git9-label">What services are you most interested in?</label>
                <select id="git9-service" name="service" value={form.service} onChange={onChange} className={cls('service', ` git9-select${form.service ? '' : ' git9-select-empty'}`)} data-testid="git9-select-service">
                  <option value="">Select services</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <Err name="service" />
              </div>
              <div className="git9-field">
                <label htmlFor="git9-size" className="git9-label">What size projects are you typically working on?</label>
                <select id="git9-size" name="size" value={form.size} onChange={onChange} className={cls('size', ` git9-select${form.size ? '' : ' git9-select-empty'}`)} data-testid="git9-select-size">
                  <option value="">Select project size</option>
                  {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <Err name="size" />
              </div>
              <div className="git9-field">
                <label htmlFor="git9-details" className="git9-label">What else can you tell us about your project or business?</label>
                <textarea id="git9-details" name="details" rows={5} placeholder="Tell us about your goals, challenges, timeline, or any other relevant details" value={form.details} onChange={onChange} className={cls('details', ' git9-textarea')} data-testid="git9-input-details" />
                <Err name="details" />
              </div>
              {notice && <p className="git9-notice" role="status" data-testid="git9-notice">{notice}</p>}
              <button type="submit" className="git9-submit" data-testid="git9-submit">Get in touch</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInTouchV9;
