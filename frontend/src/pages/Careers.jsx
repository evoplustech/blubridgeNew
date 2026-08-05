import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';

const jobListings = [
  { id: 1,  title: 'Administration Executive (Male)',                                      department: 'Operations',            team: 'Administration',        location: 'Chennai', slug: 'administration-executive-male' },
  { id: 2,  title: 'HR Executive - Talent & People Operations',                            department: 'Human Resources',       team: 'People & Talent',       location: 'Chennai', slug: 'hr-executive-talent-people-operations' },
  { id: 3,  title: 'Business Development - AI Strategy & Partnerships',                    department: 'Business Development',  team: 'Strategy',              location: 'Chennai', slug: 'business-development-ai-strategy' },
  { id: 4,  title: 'HR Admin (Male)',                                                      department: 'Human Resources',       team: 'HR Operations',         location: 'Chennai', slug: 'hr-admin-male' },
  { id: 5,  title: 'Senior Administration Officer (Male)',                                 department: 'Operations',            team: 'Administration',        location: 'Chennai', slug: 'senior-administration-officer-male' },
  { id: 6,  title: 'Accounts And Compliance Executive (Male)',                             department: 'Finance',               team: 'Accounts & Compliance', location: 'Chennai', slug: 'accounts-compliance-executive' },
  { id: 7,  title: 'AI ML Engineer (Freshers)',                                            department: 'Engineering',           team: 'Core ML',               location: 'Chennai', slug: 'ai-ml-engineer-freshers' },
  { id: 8,  title: 'AI Systems Engineer - Deep Learning Infrastructure (Freshers)',        department: 'Engineering',           team: 'AI Infrastructure',     location: 'Chennai', slug: 'ai-systems-engineer-dl-infrastructure' },
  { id: 9,  title: 'Accounts & Finance Executive - Operations & Compliance',               department: 'Finance',               team: 'Finance & Accounts',    location: 'Chennai', slug: 'accounts-finance-executive' },
  { id: 10, title: 'Business Analyst - Global AI Strategy & Solutions',                    department: 'Business Development',  team: 'Strategy & Analytics',  location: 'Chennai', slug: 'business-analyst-ai-strategy' },
  { id: 11, title: 'HR Executive (Male)',                                                  department: 'Human Resources',       team: 'Recruitment',           location: 'Chennai', slug: 'hr-executive-male' },
  { id: 12, title: 'Infrastructure Monitoring & Governance Executive',                     department: 'IT & Security',         team: 'Infrastructure',        location: 'Chennai', slug: 'infrastructure-monitoring-governance' },
];

const roleCards = [
  {
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

      {/* ============ SECTION 1 — HERO (#f0f1f9) ============ */}
      <section data-testid="careers-masthead" style={{ paddingTop: '64px', paddingBottom: '96px' }}>
        <div className="bb-container">
          <span
            data-testid="hiring-badge"
            className="inline-flex items-center gap-2"
            style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTED }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-bb-accent animate-pulse" />
            We're Hiring
          </span>

          <h1
            data-testid="join-us-title"
            style={{ fontFamily: geist, fontWeight: 500, color: INK, fontSize: 'clamp(56px, 9vw, 140px)', lineHeight: 0.95, letterSpacing: '-0.04em', margin: '32px 0 0' }}
          >
            Join Us
          </h1>

          <div aria-hidden style={{ marginTop: '40px', borderTop: `1px solid ${LINE}` }} />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <h2 style={{ fontFamily: geist, fontWeight: 500, color: INK, fontSize: 'clamp(26px, 3vw, 40px)', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0 }}>
                We Build Intelligence from First Principles, with Precision and Purpose.
              </h2>
            </div>
            <div className="lg:col-span-5 flex lg:justify-end">
              <button
                onClick={() => setShowJobListings(!showJobListings)}
                data-testid="see-open-roles-btn"
                className="inline-flex items-center gap-2.5 rounded-full text-white transition-colors hover:bg-[#172449]"
                style={{ background: INK, fontFamily: geist, fontSize: '14px', fontWeight: 500, padding: '14px 28px', minHeight: '44px' }}
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

      {/* ============ SECTION 2 — WHAT ARE WE? + CANDIDATURE BRIEF (#e8eaf3) ============ */}
      <section className="pt-28 pb-28" style={{ background: '#e8eaf3' }} data-testid="what-are-we-section">
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-14">
            <div className="lg:col-span-4">
              <h2 style={{ fontFamily: geist, fontWeight: 500, color: INK, fontSize: 'clamp(30px, 3.6vw, 48px)', letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0 }}>
                What are we?
              </h2>
            </div>
            <div className="lg:col-span-8 lg:pt-2">
              <p style={{ fontFamily: inter, fontSize: '17px', lineHeight: 1.75, color: INK, margin: 0, maxWidth: '620px' }}>
                We are a frontier AI research company building Large Language Models &amp; Domain Specific Models
              </p>
            </div>
          </div>

          <h3
            data-testid="roles-heading"
            style={{ fontFamily: geist, fontWeight: 500, color: INK, fontSize: 'clamp(19px, 2vw, 24px)', letterSpacing: '-0.015em', margin: '0 0 32px' }}
          >
            Research &amp; Engineering Roles - Interns &amp; Fresh Graduates
          </h3>

          {/* Three groups — divider-separated passages, no boxes */}
          <div style={{ borderTop: `1px solid ${LINE}` }}>
            {roleCards.map((card, i) => (
              <div
                key={i}
                data-testid={`role-card-${i}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
                style={{ padding: '48px 0', borderBottom: `1px solid ${LINE}` }}
              >
                <div className="lg:col-span-4">
                  <h4 style={{ fontFamily: geist, fontWeight: 500, color: INK, fontSize: 'clamp(19px, 2vw, 23px)', letterSpacing: '-0.015em', lineHeight: 1.35, margin: 0, maxWidth: '360px' }}>
                    {card.title}
                  </h4>
                </div>
                <div className="lg:col-span-8">
                  <ul className="space-y-3.5" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3.5">
                        <span aria-hidden style={{ fontFamily: mono, fontSize: '13px', lineHeight: 1.6, color: FAINT, flexShrink: 0 }}>→</span>
                        <span style={{ fontFamily: inter, fontSize: '15px', lineHeight: 1.65, color: INK }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 3 — OUR OFFICES (#f0f1f9) ============ */}
      <section className="py-24" data-testid="office-locations-section">
        <div className="bb-container">
          <h2 className="uppercase" style={{ fontFamily: geist, fontWeight: 500, color: INK, fontSize: 'clamp(30px, 3.8vw, 52px)', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 56px' }}>
            Our Offices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
            {offices.map((office) => (
              <div key={office.id} data-testid={`location-card-${office.id}`} className="flex flex-col">
                <h3 className="uppercase" style={{ fontFamily: geist, fontWeight: 600, fontSize: '21px', letterSpacing: '0.02em', color: INK, margin: 0 }}>
                  {office.city}
                </h3>
                <p style={{ fontFamily: mono, fontSize: '10.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: FAINT, margin: '6px 0 20px' }}>{office.region}</p>

                {office.company && (
                  <p style={{ fontFamily: inter, fontSize: '14px', fontWeight: 600, color: INK, margin: '0 0 4px' }}>{office.company}</p>
                )}
                {office.lines.map((line, i) => (
                  <p key={i} style={{ fontFamily: inter, fontSize: '14px', lineHeight: 1.7, color: MUTED, margin: 0 }}>{line}</p>
                ))}

                <div className="mt-auto pt-6">
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`map-link-${office.id}`}
                    className="flex items-center justify-between hover:text-bb-accent transition-colors"
                    style={{ borderTop: `1px solid ${LINE}`, paddingTop: '16px', fontFamily: geist, fontSize: '13.5px', fontWeight: 500, color: INK, textDecoration: 'none', minHeight: '44px' }}
                  >
                    View on Google Maps
                    <span aria-hidden style={{ fontFamily: mono }}>↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
