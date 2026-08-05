import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
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

const Careers = () => {
  useDocumentTitle('Careers | Blubridge');
  useMetaDescription('Join us to build the next frontier of AI. Bring your rigor, ownership, and engineering depth to solve hard, real-world problems.');
  const [showJobListings, setShowJobListings] = useState(false);

  return (
    <div style={{ background: '#f0f1f9' }} data-testid="careers-page">

      {/* ============================================================
          SECTION 1 — HERO (#f0f1f9)
          ============================================================ */}
      <section style={{ paddingTop: '64px' }}>
        <div className="bb-container">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-bb-line-strong bg-white/60 px-4 py-1.5 font-mono text-[10.5px] tracking-[0.16em] uppercase text-bb-ink"
            data-testid="hiring-badge"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-bb-accent animate-pulse" />
            We're Hiring
          </span>

          <h1 data-testid="join-us-title" className="bb-display mt-8" style={{ fontSize: 'clamp(56px, 9vw, 140px)' }}>
            Join Us
          </h1>

          <div className="mt-10 border-t border-bb-line" />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <h2
                className="text-bb-ink"
                style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(26px, 3vw, 40px)', letterSpacing: '-0.02em', lineHeight: 1.2, fontWeight: 500 }}
              >
                We Build Intelligence from First Principles, with Precision and Purpose.
              </h2>
            </div>
            <div className="lg:col-span-5 flex lg:justify-end">
              <button
                onClick={() => setShowJobListings(!showJobListings)}
                data-testid="see-open-roles-btn"
                className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#172449]"
                style={{ background: '#0a1230', fontFamily: 'Geist, sans-serif' }}
              >
                See open roles
                <ChevronDown
                  size={16}
                  style={{ transition: 'transform 300ms ease', transform: showJobListings ? 'rotate(180deg)' : 'rotate(0)' }}
                />
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
            <div className="border-t border-bb-line">
              <div className="hidden md:grid grid-cols-12 gap-4 py-3 border-b border-bb-line">
                <span className="col-span-7 bb-caption">Role</span>
                <span className="col-span-2 bb-caption">Department</span>
                <span className="col-span-2 bb-caption">Location</span>
                <span className="col-span-1 bb-caption text-right">Apply</span>
              </div>
              {jobListings.map((job) => (
                <Link
                  key={job.id}
                  to={`/careers/job/${job.slug}`}
                  data-testid={`job-row-${job.id}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 py-5 border-b border-bb-line hover:bg-white/70 transition-colors items-center"
                  style={{ textDecoration: 'none' }}
                >
                  <span className="md:col-span-7 text-[15px] font-medium text-bb-ink" style={{ fontFamily: 'Geist, sans-serif' }}>
                    {job.title}
                  </span>
                  <span className="md:col-span-2 text-[13px] text-bb-ink-2">{job.department}</span>
                  <span className="md:col-span-2 text-[13px] text-bb-ink-2">{job.location}</span>
                  <span className="md:col-span-1 md:text-right font-mono text-[12px] text-bb-ink-3 group-hover:text-bb-accent transition-colors">
                    <ArrowRight size={14} className="inline transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — WHAT ARE WE? + ROLE CARDS (#f0f1f9)
          ============================================================ */}
      <section className="pt-24 pb-24" data-testid="what-are-we-section">
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-14">
            <div className="lg:col-span-4">
              <h2 className="bb-h2" style={{ fontSize: 'clamp(30px, 3.6vw, 48px)' }}>
                What are we?
              </h2>
            </div>
            <div className="lg:col-span-8 lg:pt-2">
              <p className="text-bb-ink text-[17px] leading-[1.75] max-w-[620px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                We are a frontier AI research company building Large Language Models &amp; Domain Specific Models
              </p>
            </div>
          </div>

          <h3
            className="text-bb-ink mb-8"
            style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(19px, 2vw, 24px)', fontWeight: 500, letterSpacing: '-0.015em' }}
          >
            Research &amp; Engineering Roles - Interns &amp; Fresh Graduates
          </h3>

          <div className="space-y-5">
            {roleCards.map((card, i) => (
              <div
                key={i}
                data-testid={`role-card-${i}`}
                className="bg-white border border-bb-line rounded-xl p-8 lg:p-12"
                style={{ boxShadow: '0 10px 32px -18px rgba(10, 18, 48, 0.12)' }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                  <div className="lg:col-span-5">
                    <h4
                      className="text-bb-ink max-w-[360px]"
                      style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(19px, 2vw, 23px)', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.35 }}
                    >
                      {card.title}
                    </h4>
                  </div>
                  <div className="lg:col-span-7">
                    <ul className="space-y-3.5">
                      {card.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3.5">
                          <span aria-hidden className="font-mono text-bb-ink-3 text-[13px] leading-[1.6] flex-shrink-0">→</span>
                          <span className="text-bb-ink text-[14.5px] leading-[1.65]" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — OUR OFFICES (#e8eaf3)
          ============================================================ */}
      <section className="py-24" style={{ background: '#e8eaf3' }} data-testid="office-locations-section">
        <div className="bb-container">
          <h2 className="bb-h2 uppercase mb-14" style={{ fontSize: 'clamp(30px, 3.8vw, 52px)' }}>
            Our Offices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div
                key={office.id}
                data-testid={`location-card-${office.id}`}
                className="bg-white border border-bb-line rounded-xl p-8 flex flex-col"
                style={{ boxShadow: '0 10px 32px -18px rgba(10, 18, 48, 0.12)' }}
              >
                <h3
                  className="text-bb-ink uppercase"
                  style={{ fontFamily: 'Geist, sans-serif', fontSize: '22px', fontWeight: 600, letterSpacing: '0.02em' }}
                >
                  {office.city}
                </h3>
                <p className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-bb-ink-3 mt-1.5 mb-6">{office.region}</p>

                {office.company && (
                  <p className="text-bb-ink text-[14px] font-semibold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{office.company}</p>
                )}
                {office.lines.map((line, i) => (
                  <p key={i} className="text-bb-ink-2 text-[14px] leading-[1.7]" style={{ fontFamily: 'Inter, sans-serif' }}>{line}</p>
                ))}

                <div className="mt-auto pt-6">
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`map-link-${office.id}`}
                    className="flex items-center justify-between border-t border-bb-line pt-4 text-bb-ink text-[13.5px] font-medium hover:text-bb-accent transition-colors"
                    style={{ fontFamily: 'Geist, sans-serif', textDecoration: 'none' }}
                  >
                    View on Google Maps
                    <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
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
