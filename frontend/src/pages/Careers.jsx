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
const LINE = '#d8d5ca';
const geist = 'Geist, sans-serif';
const inter = 'Inter, sans-serif';
const mono = 'IBM Plex Mono, monospace';

const thStyle = { fontFamily: mono, fontSize: '10.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: FAINT };
const bodyLine = { fontFamily: inter, fontSize: '16.5px', lineHeight: 1.7, color: '#232c4d', margin: 0 };
const hiringIndents = ['', 'md:ml-8', 'md:ml-16'];

const Careers = () => {
  useDocumentTitle('Careers | Blubridge');
  useMetaDescription('Join us to build the next frontier of AI. Bring your rigor, ownership, and engineering depth to solve hard, real-world problems.');
  const [showJobListings, setShowJobListings] = useState(false);

  return (
    <div style={{ background: '#f5f3e9' }} data-testid="careers-page">

      {/* ============ MASTHEAD — asymmetric editorial recruitment masthead ============ */}
      <section data-testid="careers-masthead" style={{ paddingTop: '52px', paddingBottom: '88px' }}>
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-2" style={{ paddingTop: '20px' }}>
              <span data-testid="hiring-badge" style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: MUTED }}>
                We're Hiring
              </span>
            </div>
            <div className="lg:col-span-10">
              <h1
                data-testid="join-us-title"
                style={{ fontFamily: geist, fontWeight: 500, color: INK, fontSize: 'clamp(60px, 10.5vw, 164px)', lineHeight: 0.92, letterSpacing: '-0.05em', margin: 0 }}
              >
                Join Us
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8" style={{ marginTop: 'clamp(40px, 5vw, 72px)' }}>
            <div className="lg:col-span-5 lg:col-start-7">
              <h2 style={{ fontFamily: geist, fontWeight: 500, color: INK, fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.4, letterSpacing: '-0.015em', margin: 0, maxWidth: '420px' }}>
                We Build Intelligence from First Principles, with Precision and Purpose.
              </h2>
              <button
                onClick={() => setShowJobListings(!showJobListings)}
                data-testid="see-open-roles-btn"
                className="inline-flex items-center gap-2.5 text-white transition-colors hover:bg-[#172449]"
                style={{ background: INK, fontFamily: geist, fontSize: '14px', fontWeight: 500, padding: '12px 24px', borderRadius: '3px', minHeight: '44px', marginTop: '32px' }}
              >
                See open roles
                <ChevronDown size={15} style={{ transition: 'transform 300ms ease', transform: showJobListings ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>
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
                  className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center transition-colors hover:bg-[#efecdf]"
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
      <section data-testid="what-are-we-section" style={{ paddingTop: '4px', paddingBottom: '92px' }}>
        <div className="bb-container">
          <div className="lg:ml-[8.333%]" style={{ maxWidth: '760px' }}>
            <h2 style={{ fontFamily: geist, fontWeight: 600, fontSize: '17px', letterSpacing: '-0.005em', color: INK, margin: 0 }}>
              What are we?
            </h2>
            <p style={{ fontFamily: geist, fontWeight: 500, fontSize: 'clamp(26px, 3.2vw, 42px)', lineHeight: 1.28, letterSpacing: '-0.02em', color: INK, margin: '26px 0 0' }}>
              We are a frontier AI research company building Large Language Models &amp; Domain Specific Models
            </p>
          </div>

          <h3
            data-testid="roles-heading"
            className="lg:ml-[25%]"
            style={{ fontFamily: geist, fontWeight: 500, fontSize: 'clamp(28px, 3.8vw, 54px)', letterSpacing: '-0.03em', lineHeight: 1.08, color: INK, marginBottom: 0, marginTop: 'clamp(76px, 9vw, 132px)', maxWidth: '860px' }}
          >
            Research &amp; Engineering Roles - Interns &amp; Fresh Graduates
          </h3>
        </div>
      </section>

      {/* ============ CAREER INFORMATION — one continuous candidature brief ============ */}
      <section data-testid="career-brief-section" style={{ paddingBottom: '104px' }}>
        <div className="bb-container">

          {/* Eligibility — narrow heading column, wider reading field */}
          <div data-testid="role-card-0" className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8 gap-y-6">
            <div className="lg:col-span-3">
              <h4 style={{ fontFamily: geist, fontWeight: 500, fontSize: 'clamp(19px, 1.8vw, 23px)', lineHeight: 1.35, letterSpacing: '-0.015em', color: INK, margin: 0, maxWidth: '280px' }}>
                {roleCards[0].title}
              </h4>
            </div>
            <div className="lg:col-span-6 lg:col-start-5">
              <div aria-hidden style={{ width: '40px', height: '1px', background: LINE, marginBottom: '20px' }} />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {roleCards[0].items.map((item, j) => (
                  <li key={j} style={{ ...bodyLine, padding: '8px 0' }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hiring & onboarding — heading above, staggered indented two-column reading */}
          <div data-testid="role-card-1" style={{ marginTop: 'clamp(84px, 9vw, 128px)' }}>
            <h4 style={{ fontFamily: geist, fontWeight: 500, fontSize: 'clamp(19px, 1.8vw, 23px)', lineHeight: 1.4, letterSpacing: '-0.015em', color: INK, margin: 0, maxWidth: '680px' }}>
              {roleCards[1].title}
            </h4>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ marginTop: '40px', columnGap: 'clamp(56px, 8vw, 140px)', rowGap: '34px', maxWidth: '980px' }}
            >
              {roleCards[1].items.map((item, j) => (
                <p
                  key={j}
                  className={`${j % 2 === 1 ? 'md:mt-10 ' : ''}${hiringIndents[Math.floor(j / 2)]}`}
                  style={{ ...bodyLine, maxWidth: '380px' }}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* What we offer — large typographic anchor, benefit cluster lower right */}
          <div data-testid="role-card-2" className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8 gap-y-8" style={{ marginTop: 'clamp(92px, 10vw, 140px)' }}>
            <div className="lg:col-span-5">
              <h4 style={{ fontFamily: geist, fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 62px)', letterSpacing: '-0.03em', lineHeight: 1, color: INK, margin: 0 }}>
                {roleCards[2].title}
              </h4>
            </div>
            <div className="lg:col-span-6 lg:col-start-7" style={{ paddingTop: 'clamp(16px, 5vw, 84px)' }}>
              {roleCards[2].items.map((item, j) => (
                <p key={j} style={{ fontFamily: inter, fontSize: '17.5px', lineHeight: 1.75, color: '#232c4d', margin: 0, padding: '8px 0' }}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ OFFICES — geographic colophon ============ */}
      <section data-testid="office-locations-section" style={{ paddingBottom: '116px' }}>
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8 gap-y-10">
            <div className="lg:col-span-2">
              <div aria-hidden style={{ width: '40px', height: '1px', background: LINE, marginBottom: '24px' }} />
              <h2
                className="hidden lg:block"
                style={{ fontFamily: geist, fontWeight: 500, fontSize: 'clamp(38px, 3.4vw, 54px)', letterSpacing: '0.02em', textTransform: 'uppercase', color: INK, margin: 0, writingMode: 'vertical-rl', transform: 'rotate(180deg)', lineHeight: 1 }}
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

            <div className="lg:col-span-10">
              <div className="grid grid-cols-1 lg:grid-cols-10 lg:gap-x-8">
                {/* First Chennai office — upper middle */}
                <div data-testid="location-card-besant-nagar" className="lg:col-span-3 lg:col-start-2">
                  <h3 style={{ fontFamily: geist, fontWeight: 600, fontSize: '20px', letterSpacing: '0.02em', textTransform: 'uppercase', color: INK, margin: 0 }}>{offices[0].city}</h3>
                  <p style={{ fontFamily: mono, fontSize: '10.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: FAINT, margin: '6px 0 16px' }}>{offices[0].region}</p>
                  {offices[0].lines.map((line, k) => (
                    <p key={k} style={{ fontFamily: inter, fontSize: '14.5px', lineHeight: 1.7, color: MUTED, margin: 0 }}>{line}</p>
                  ))}
                  <a href={offices[0].mapUrl} target="_blank" rel="noopener noreferrer" data-testid="map-link-besant-nagar" className="hover:text-bb-accent transition-colors"
                    style={{ display: 'inline-block', marginTop: '16px', fontFamily: geist, fontSize: '13.5px', fontWeight: 500, color: INK, textDecoration: 'underline', textUnderlineOffset: '5px', textDecorationThickness: '1px', textDecorationColor: '#a8a291' }}>
                    View on Google Maps
                  </a>
                </div>

                {/* Second Chennai office — lower, farther right */}
                <div data-testid="location-card-mandavelipakkam" className="lg:col-span-3 lg:col-start-7 mt-14 lg:mt-28 pl-5 lg:pl-0">
                  <h3 style={{ fontFamily: geist, fontWeight: 600, fontSize: '20px', letterSpacing: '0.02em', textTransform: 'uppercase', color: INK, margin: 0 }}>{offices[1].city}</h3>
                  <p style={{ fontFamily: mono, fontSize: '10.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: FAINT, margin: '6px 0 16px' }}>{offices[1].region}</p>
                  {offices[1].lines.map((line, k) => (
                    <p key={k} style={{ fontFamily: inter, fontSize: '14.5px', lineHeight: 1.7, color: MUTED, margin: 0 }}>{line}</p>
                  ))}
                  <a href={offices[1].mapUrl} target="_blank" rel="noopener noreferrer" data-testid="map-link-mandavelipakkam" className="hover:text-bb-accent transition-colors"
                    style={{ display: 'inline-block', marginTop: '16px', fontFamily: geist, fontSize: '13.5px', fontWeight: 500, color: INK, textDecoration: 'underline', textUnderlineOffset: '5px', textDecorationThickness: '1px', textDecorationColor: '#a8a291' }}>
                    View on Google Maps
                  </a>
                </div>

                {/* Newark — separate baseline */}
                <div data-testid="location-card-newark-de" className="lg:col-span-4 lg:col-start-3 mt-14 lg:mt-24 pl-2 lg:pl-0">
                  <h3 style={{ fontFamily: geist, fontWeight: 600, fontSize: '20px', letterSpacing: '0.02em', textTransform: 'uppercase', color: INK, margin: 0 }}>{offices[2].city}</h3>
                  <p style={{ fontFamily: mono, fontSize: '10.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: FAINT, margin: '6px 0 16px' }}>{offices[2].region}</p>
                  <p style={{ fontFamily: inter, fontSize: '14px', fontWeight: 600, color: INK, margin: '0 0 4px' }}>{offices[2].company}</p>
                  {offices[2].lines.map((line, k) => (
                    <p key={k} style={{ fontFamily: inter, fontSize: '14.5px', lineHeight: 1.7, color: MUTED, margin: 0 }}>{line}</p>
                  ))}
                  <a href={offices[2].mapUrl} target="_blank" rel="noopener noreferrer" data-testid="map-link-newark-de" className="hover:text-bb-accent transition-colors"
                    style={{ display: 'inline-block', marginTop: '16px', fontFamily: geist, fontSize: '13.5px', fontWeight: 500, color: INK, textDecoration: 'underline', textUnderlineOffset: '5px', textDecorationThickness: '1px', textDecorationColor: '#a8a291' }}>
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
