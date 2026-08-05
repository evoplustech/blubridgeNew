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
const MUTED = '#4a5578';
const FAINT = '#8b93ad';
const LINE = '#d4d8e8';
const geist = 'Geist, sans-serif';
const inter = 'Inter, sans-serif';
const mono = 'IBM Plex Mono, monospace';

const thStyle = { fontFamily: mono, fontSize: '10.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: FAINT };
const groupTitleStyle = { fontFamily: geist, fontWeight: 500, fontSize: 'clamp(19px, 1.9vw, 24px)', lineHeight: 1.35, letterSpacing: '-0.015em', color: INK, margin: 0 };
const bodyLineStyle = { fontFamily: inter, fontSize: '16.5px', lineHeight: 1.7, color: '#232c4d', margin: 0 };

const officeOffsets = ['', 'lg:ml-[36%] mt-14 lg:mt-20 pl-5 lg:pl-0', 'lg:ml-[14%] mt-14 lg:mt-24 pl-2 lg:pl-0'];

const Careers = () => {
  useDocumentTitle('Careers | Blubridge');
  useMetaDescription('Join us to build the next frontier of AI. Bring your rigor, ownership, and engineering depth to solve hard, real-world problems.');
  const [showJobListings, setShowJobListings] = useState(false);

  return (
    <div style={{ background: '#f0f1f9' }} data-testid="careers-page">

      {/* ============ MASTHEAD — editorial recruitment masthead ============ */}
      <section data-testid="careers-masthead" style={{ paddingTop: '44px', paddingBottom: '76px' }}>
        <div className="bb-container">
          <span data-testid="hiring-badge" style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTED }}>
            We're Hiring
          </span>

          <h1
            data-testid="join-us-title"
            style={{
              fontFamily: geist, fontWeight: 500, color: INK,
              fontSize: 'clamp(60px, 9.5vw, 150px)', lineHeight: 0.95, letterSpacing: '-0.045em',
              margin: 0, marginTop: '26px', paddingLeft: 'clamp(0px, 4vw, 72px)',
            }}
          >
            Join Us
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12" style={{ marginTop: 'clamp(44px, 5.5vw, 80px)' }}>
            <div className="lg:col-span-8 lg:col-start-5">
              <div className="flex flex-col md:flex-row md:items-end" style={{ gap: 'clamp(28px, 4vw, 64px)' }}>
                <h2 style={{ fontFamily: geist, fontWeight: 500, color: INK, fontSize: 'clamp(21px, 2.1vw, 28px)', lineHeight: 1.35, letterSpacing: '-0.015em', margin: 0, maxWidth: '440px' }}>
                  We Build Intelligence from First Principles, with Precision and Purpose.
                </h2>
                <button
                  onClick={() => setShowJobListings(!showJobListings)}
                  data-testid="see-open-roles-btn"
                  className="inline-flex items-center gap-2.5 text-white transition-colors hover:bg-[#172449] flex-shrink-0 self-start md:self-auto"
                  style={{ background: INK, fontFamily: geist, fontSize: '14px', fontWeight: 500, padding: '12px 24px', borderRadius: '3px', minHeight: '44px' }}
                >
                  See open roles
                  <ChevronDown size={15} style={{ transition: 'transform 300ms ease', transform: showJobListings ? 'rotate(180deg)' : 'rotate(0)' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Open roles — expandable index */}
          <div
            data-testid="job-listings-section"
            style={{
              maxHeight: showJobListings ? '4000px' : '0',
              opacity: showJobListings ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 400ms ease-out, opacity 300ms ease-out',
              marginTop: showJobListings ? '64px' : '0',
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

      {/* ============ WHAT ARE WE? — compact editorial hinge ============ */}
      <section data-testid="what-are-we-section" style={{ background: '#e8eaf3', paddingTop: '88px', paddingBottom: '96px' }}>
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-7">
            <div className="lg:col-span-3" style={{ paddingTop: '14px' }}>
              <h2 style={{ fontFamily: geist, fontWeight: 600, fontSize: '19px', letterSpacing: '-0.01em', color: INK, margin: 0 }}>
                What are we?
              </h2>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <p style={{ fontFamily: geist, fontWeight: 500, fontSize: 'clamp(24px, 3vw, 40px)', lineHeight: 1.3, letterSpacing: '-0.02em', color: INK, margin: 0, maxWidth: '720px' }}>
                We are a frontier AI research company building Large Language Models &amp; Domain Specific Models
              </p>
            </div>
          </div>

          <h3
            data-testid="roles-heading"
            style={{ fontFamily: geist, fontWeight: 500, fontSize: 'clamp(28px, 3.8vw, 52px)', letterSpacing: '-0.03em', lineHeight: 1.08, color: INK, margin: 0, marginTop: 'clamp(72px, 9vw, 128px)', maxWidth: '900px' }}
          >
            Research &amp; Engineering Roles - Interns &amp; Fresh Graduates
          </h3>
        </div>
      </section>

      {/* ============ CAREER INFORMATION — one continuous candidature brief ============ */}
      <section data-testid="career-brief-section" style={{ background: '#f0f1f9', paddingTop: '96px', paddingBottom: '108px' }}>
        <div className="bb-container">

          {/* Eligibility — narrow heading column, wide reading field */}
          <div data-testid="role-card-0" className="grid grid-cols-1 lg:grid-cols-12 gap-y-6">
            <div className="lg:col-span-4">
              <div aria-hidden style={{ width: '44px', height: '1px', background: LINE, marginBottom: '22px' }} />
              <h4 style={{ ...groupTitleStyle, maxWidth: '340px' }}>{roleCards[0].title}</h4>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {roleCards[0].items.map((item, j) => (
                  <li key={j} style={{ ...bodyLineStyle, padding: '9px 0' }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hiring & onboarding — heading above, staggered two-column reading */}
          <div data-testid="role-card-1" style={{ marginTop: 'clamp(80px, 9vw, 120px)' }}>
            <h4 style={{ ...groupTitleStyle, maxWidth: '640px' }}>{roleCards[1].title}</h4>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ marginTop: '44px', columnGap: 'clamp(48px, 7vw, 120px)', rowGap: '30px', maxWidth: '1000px' }}
            >
              {roleCards[1].items.map((item, j) => (
                <p key={j} className={j % 2 === 1 ? 'md:mt-9 md:pl-12' : ''} style={{ ...bodyLineStyle, maxWidth: '400px' }}>
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* What we offer — typographic anchor left, benefit cluster right */}
          <div data-testid="role-card-2" className="grid grid-cols-1 lg:grid-cols-12 gap-y-8" style={{ marginTop: 'clamp(88px, 10vw, 136px)' }}>
            <div className="lg:col-span-5 lg:self-center">
              <h4 style={{ fontFamily: geist, fontWeight: 500, fontSize: 'clamp(32px, 4.2vw, 58px)', letterSpacing: '-0.03em', lineHeight: 1.02, color: INK, margin: 0 }}>
                {roleCards[2].title}
              </h4>
            </div>
            <div className="lg:col-span-6 lg:col-start-7" style={{ paddingTop: 'clamp(0px, 4vw, 52px)' }}>
              {roleCards[2].items.map((item, j) => (
                <p key={j} style={{ fontFamily: inter, fontSize: '17px', lineHeight: 1.75, color: '#232c4d', margin: 0, padding: '7px 0' }}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ OFFICES — geographic colophon ============ */}
      <section data-testid="office-locations-section" style={{ background: '#e8eaf3', paddingTop: '96px', paddingBottom: '120px' }}>
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10">
            <div className="lg:col-span-3">
              <div aria-hidden style={{ width: '44px', height: '1px', background: LINE, marginBottom: '26px' }} />
              <h2
                className="hidden lg:block"
                style={{ fontFamily: geist, fontWeight: 500, fontSize: 'clamp(40px, 3.6vw, 56px)', letterSpacing: '0.02em', textTransform: 'uppercase', color: INK, margin: 0, writingMode: 'vertical-rl', transform: 'rotate(180deg)', lineHeight: 1 }}
              >
                Our Offices
              </h2>
              <h2
                className="lg:hidden"
                style={{ fontFamily: geist, fontWeight: 500, fontSize: 'clamp(32px, 6vw, 44px)', letterSpacing: '0.02em', textTransform: 'uppercase', color: INK, margin: 0, lineHeight: 1 }}
              >
                Our Offices
              </h2>
            </div>

            <div className="lg:col-span-9">
              {offices.map((office, i) => (
                <div key={office.id} data-testid={`location-card-${office.id}`} className={officeOffsets[i]} style={{ maxWidth: '340px' }}>
                  <h3 style={{ fontFamily: geist, fontWeight: 600, fontSize: '21px', letterSpacing: '0.02em', textTransform: 'uppercase', color: INK, margin: 0 }}>
                    {office.city}
                  </h3>
                  <p style={{ fontFamily: mono, fontSize: '10.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: FAINT, margin: '6px 0 18px' }}>{office.region}</p>
                  {office.company && (
                    <p style={{ fontFamily: inter, fontSize: '14px', fontWeight: 600, color: INK, margin: '0 0 4px' }}>{office.company}</p>
                  )}
                  {office.lines.map((line, k) => (
                    <p key={k} style={{ fontFamily: inter, fontSize: '14.5px', lineHeight: 1.7, color: MUTED, margin: 0 }}>{line}</p>
                  ))}
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`map-link-${office.id}`}
                    className="hover:text-bb-accent transition-colors"
                    style={{ display: 'inline-block', marginTop: '18px', fontFamily: geist, fontSize: '13.5px', fontWeight: 500, color: INK, textDecoration: 'underline', textUnderlineOffset: '5px', textDecorationThickness: '1px', textDecorationColor: '#9aa2bd', minHeight: '24px' }}
                  >
                    View on Google Maps
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
