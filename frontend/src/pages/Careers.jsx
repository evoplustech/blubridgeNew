import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, MapPin, Phone, Mail, Linkedin, Twitter, GraduationCap, Users, Sparkles } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';

const jobListings = [
  { id: 1, title: 'Data Science / AI ML Engineer',                          department: 'Research & Development',      team: 'Core ML',                location: 'Chennai', slug: 'data-science-ai-ml-engineer' },
  { id: 2, title: 'Business Development - AI Strategy & Partnerships',      department: 'Business Development',        team: 'Strategy',               location: 'Chennai', slug: 'business-development-ai-strategy' },
  { id: 3, title: 'Social Media Growth Manager (AI / Deep Tech)',           department: 'Marketing & Communication',   team: 'Brand & Digital Growth', location: 'Chennai', slug: 'social-media-growth-manager-ai-deep-tech' },
  { id: 4, title: 'Social Media Growth Specialist - Freelancer',            department: 'Marketing & Communication',   team: 'Digital Marketing',      location: 'Chennai', slug: 'social-media-growth-specialist-freelancer' },
];

const roleCards = [
  {
    Icon: GraduationCap,
    title: 'Eligibility criteria for research & engineering positions',
    items: [
      'Mathematics,',
      'Deep interest in LLMs,',
      'A college degree in either mathematics, computer science or engineering,',
      'Good communication,',
      'Good command on a low-level language,',
    ],
  },
  {
    Icon: Users,
    title: 'Hiring & Onboarding Process for research & engineering role, once an “invite” is received:',
    items: [
      'Logical, aptitude, mathematics & programming (3-5 rounds),',
      'Mathematics round after 15 days (study material is provided),',
      'Interview round',
      'Paid internship begins',
      'Paid internship is converted to full-time in 3-6 months period.',
    ],
  },
  {
    Icon: Sparkles,
    title: 'What we offer:',
    items: [
      'A space in AI field like none other in the country,',
      'Talent development like none other in AI field in the country,',
      'A chance to work with highly talented people,',
      'A chance to work on cutting edge fore-front of the technology.',
    ],
  },
];

const offices = [
  {
    id: 'besant-nagar',
    city: 'Chennai',
    region: 'Tamil Nadu, IN',
    lines: ['No. E160 Tiger Varadhachari Road,', 'Kalakshetra Colony, Besant Nagar,', 'Chennai – 600090'],
    mapUrl: 'https://www.google.com/maps/place/Blubridge+Technologies/@12.9954492,80.2654151,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5267e2599dbced:0xc9079da2f4d833f!8m2!3d12.995444!4d80.26799!16s%2Fg%2F11mry3n8lv',
  },
  {
    id: 'mandavelipakkam',
    city: 'Chennai',
    region: 'Tamil Nadu, IN',
    lines: ['30, Norton Rd, Mandavelipakkam,', 'Raja Annamalai Puram,', 'Chennai, Tamil Nadu – 600028'],
    mapUrl: 'https://www.google.com/maps/place/30,+Norton+Rd,+Mandavelipakkam,+Mandaveli,+Chennai,+Tamil+Nadu+600028/@13.0280416,80.2681674,17z',
  },
  {
    id: 'newark-de',
    city: 'Newark',
    region: 'Delaware, US',
    company: 'BLUBRIDGE INC',
    lines: ['254 Chapman Rd, STE 208 #28314,', 'Newark, Delaware 19702 USA'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=254+Chapman+Rd+STE+208+Newark+Delaware+19702',
  },
];

const connectChannels = [
  { label: 'Phone',       value: '+91 8925987250',                 href: 'tel:+91 8925987250',                          Icon: Phone,    testId: 'connect-phone' },
  { label: 'Email',       value: 'careers@blubridge.com',          href: 'mailto:careers@blubridge.com',                 Icon: Mail,     testId: 'connect-email' },
  { label: 'LinkedIn',    value: 'linked/blubridge',               href: 'https://www.linkedin.com/company/blubridge/', Icon: Linkedin, testId: 'connect-linkedin' },
  { label: 'X (Twitter)', value: 'x.com/BlubridgeAI',              href: 'https://x.com/BlubridgeAI',                    Icon: Twitter,  testId: 'connect-twitter' },
];

const INK = '#0a1230';
const MUTED = '#3f4966';
const FAINT = '#7c86a2';
const LINE = '#d4d8e8';
const geist = 'Geist, sans-serif';
const inter = 'Inter, sans-serif';
const mono = 'IBM Plex Mono, monospace';

const thStyle = { fontFamily: mono, fontSize: '10.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: FAINT };

const Careers = () => {
  useDocumentTitle('Careers | Blubridge');
  useMetaDescription('Join us to build the next frontier of AI. Bring your rigor, ownership, and engineering depth to solve hard, real-world problems.');
  const [showJobListings, setShowJobListings] = useState(false);

  return (
    <div style={{ background: '#f0f1f9' }} data-testid="careers-page">

      {/* ============ SECTION 1 — HERO (violet reference design) ============ */}
      <section
        data-testid="careers-masthead"
        style={{
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '72px',
          paddingBottom: '96px',
          background: 'radial-gradient(ellipse 40% 55% at 88% 18%, rgba(43, 76, 140, 0.22), transparent 70%), radial-gradient(ellipse 30% 40% at 8% 90%, rgba(43, 76, 140, 0.12), transparent 70%), #f0f1f9',
        }}
      >
        <div className="bb-container" style={{ position: 'relative' }}>
          <span
            data-testid="hiring-badge"
            className="inline-flex items-center gap-2"
            style={{
              background: '#ffffff',
              borderRadius: '999px',
              boxShadow: '0 6px 18px -8px rgba(10, 18, 48, 0.35)',
              padding: '10px 18px',
              fontFamily: inter,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#0a1230',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#2b4c8c' }} />
            We're Hiring
          </span>

          <h1
            data-testid="join-us-title"
            style={{ fontFamily: geist, fontWeight: 700, color: '#181c2a', fontSize: 'clamp(56px, 9vw, 130px)', lineHeight: 0.95, letterSpacing: '-0.04em', margin: '40px 0 0' }}
          >
            Join Us
          </h1>

          <span aria-hidden style={{ display: 'block', width: '88px', height: '3px', borderRadius: '2px', marginTop: '30px', background: 'linear-gradient(90deg, #0a1230, #2b4c8c)' }} />

          <div aria-hidden style={{ marginTop: '44px', borderTop: '1px solid #dcdaeb' }} />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h2 style={{ fontFamily: geist, fontWeight: 400, color: '#2b3040', fontSize: 'clamp(19px, 1.8vw, 24px)', letterSpacing: '-0.01em', lineHeight: 1.45, margin: 0, maxWidth: '520px' }}>
                We Build Intelligence from First Principles, with Precision and Purpose.
              </h2>
            </div>
            <div className="lg:col-span-5 flex items-center lg:justify-end">
              <button
                onClick={() => setShowJobListings(!showJobListings)}
                data-testid="see-open-roles-btn"
                className="inline-flex items-center gap-2.5 rounded-full text-white transition-colors"
                style={{
                  background: '#0a1230',
                  boxShadow: '0 14px 30px -12px rgba(10, 18, 48, 0.55)',
                  fontFamily: geist,
                  fontSize: '14.5px',
                  fontWeight: 600,
                  padding: '15px 30px',
                  minHeight: '48px',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#2b4c8c'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#0a1230'; }}
              >
                See open roles
                <ChevronDown size={16} style={{ transition: 'transform 300ms ease', transform: showJobListings ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>
            </div>
          </div>

          {/* Open roles — expandable ledger */}
          <div
            data-testid="job-listings-section"
            style={{
              maxHeight: showJobListings ? '4000px' : '0',
              opacity: showJobListings ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 400ms ease-out, opacity 300ms ease-out',
              marginTop: showJobListings ? '48px' : '0',
            }}
          >
            <div style={{ borderTop: `1px solid ${LINE}` }}>
              <div className="hidden md:grid grid-cols-12 gap-4" style={{ padding: '12px 0', borderBottom: `1px solid ${LINE}` }}>
                <span className="col-span-7" style={thStyle}>Role</span>
                <span className="col-span-2" style={thStyle}>Department</span>
                <span className="col-span-2" style={thStyle}>Location</span>
                <span className="col-span-1 text-right" style={thStyle}>Apply</span>
              </div>
              {jobListings.map((job) => (
                <Link
                  key={job.id}
                  to={`/careers/job/${job.slug}`}
                  data-testid={`job-row-${job.id}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center transition-colors hover:bg-[#e6e8f4]"
                  style={{ padding: '19px 0', borderBottom: `1px solid ${LINE}`, textDecoration: 'none' }}
                >
                  <span className="md:col-span-7" style={{ fontFamily: geist, fontSize: '15px', fontWeight: 500, color: INK }}>{job.title}</span>
                  <span className="md:col-span-2" style={{ fontFamily: inter, fontSize: '13px', color: MUTED }}>{job.department}</span>
                  <span className="md:col-span-2" style={{ fontFamily: inter, fontSize: '13px', color: MUTED }}>{job.location}</span>
                  <span aria-hidden className="md:col-span-1 md:text-right inline-block transition-transform group-hover:translate-x-0.5" style={{ fontFamily: mono, fontSize: '13px', color: MUTED }}>↗</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2 — OUR OFFICES + LET'S CONNECT (below hero, screenshot-1 design, our theme) ============ */}
      <section className="cr-offices" data-testid="office-locations-section">
        <div className="bb-container">
          <h2 className="cr-offices-title">Our Offices</h2>

          <div className="cr-off-row">
            {offices.map((office) => (
              <div key={office.id} data-testid={`location-card-${office.id}`} className="cr-off-col">
                <span className="cr-off-pin" aria-hidden="true"><MapPin strokeWidth={1.5} /></span>
                <h3 className="cr-off-city">{office.city}, {office.region.split(', ')[1] === 'IN' ? 'India' : 'USA'}</h3>
                <p className="cr-off-region">{office.region}</p>
                {office.company && <p className="cr-off-company">{office.company}</p>}
                <p className="cr-off-lines">
                  {office.lines.map((line, i) => (
                    <React.Fragment key={i}>{line}{i < office.lines.length - 1 && <br />}</React.Fragment>
                  ))}
                </p>
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`map-link-${office.id}`}
                  className="cr-off-map group"
                >
                  View on Google Maps
                  <span aria-hidden style={{ fontFamily: mono, transition: 'transform 200ms ease' }} className="inline-block group-hover:translate-x-1">↗</span>
                </a>
              </div>
            ))}
          </div>

          {/* Let's Connect bar */}
          <div className="cr-connect" data-testid="lets-connect-bar">
            <div className="cr-connect-intro">
              <h3 className="cr-connect-title">Let's Connect</h3>
              <p className="cr-connect-sub">We are always open to conversations with exceptional minds.</p>
            </div>
            <div className="cr-connect-channels">
              {connectChannels.map((c) => (
                <a
                  key={c.testId}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  data-testid={c.testId}
                  className="cr-connect-item"
                >
                  <span className="cr-connect-icon" aria-hidden="true"><c.Icon strokeWidth={1.6} /></span>
                  <span className="cr-connect-text">
                    <span className="cr-connect-label">{c.label}</span>
                    <span className="cr-connect-value">{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3 — WHAT ARE WE? (screenshot-3 design, existing content) ============ */}
      <section className="cr-what" data-testid="what-are-we-section">
        <div className="bb-container">
          <div className="cr-what-head">
            <div className="cr-what-head-left">
              <h2 className="cr-what-title">What are we?</h2>
              <p className="cr-what-desc">
                We are a frontier AI research company building Large Language Models &amp; Domain Specific Models
              </p>
            </div>
          </div>

          <h3 data-testid="roles-heading" className="cr-roles-heading">
            Research &amp; Engineering Roles - Interns &amp; Fresh Graduates
          </h3>

          <div className="cr-what-cols">
            {roleCards.map((card, i) => (
              <div key={i} data-testid={`role-card-${i}`} className="cr-what-col">
                <span className="cr-what-icon" aria-hidden="true"><card.Icon strokeWidth={1.5} /></span>
                <h4 className="cr-what-col-title">{card.title}</h4>
                <ul className="cr-what-list">
                  {card.items.map((item, j) => (
                    <li key={j} className="cr-what-item">
                      <span aria-hidden className="cr-what-bullet"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
