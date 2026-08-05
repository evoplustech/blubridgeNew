import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Linkedin, ChevronDown, ArrowRight } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';
import JoinOurTeam from './JoinOurTeam';

/* ------------------------------------------------------------------
   CAREERS — Editorial Redesign
   Content preserved: "Join Us" heading, tagline, job listings (12 roles
   with title/department/team/location/slug), office locations,
   "Get in Touch" contact channels, walk-in text, JoinOurTeam section.
   ------------------------------------------------------------------ */

const XIcon = ({ size = 20, color = 'currentColor', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color} {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

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

const officeLocations = [
  { id: 'besant-nagar',    address: 'No. E160 Tiger Varadhachari Road,', area: 'Kalakshetra Colony, Besant Nagar,', city: 'Chennai – 600090',        mapUrl: 'https://www.google.com/maps/place/Blubridge+Technologies/@12.9954492,80.2654151,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5267e2599dbced:0xc9079da2f4d833f!8m2!3d12.995444!4d80.26799!16s%2Fg%2F11mry3n8lv' },
  { id: 'mandavelipakkam', address: '30, Norton Rd, Mandavelipakkam,',   area: 'Raja Annamalai Puram,',             city: 'Chennai, Tamil Nadu – 600028', mapUrl: 'https://www.google.com/maps/place/30,+Norton+Rd,+Mandavelipakkam,+Mandaveli,+Chennai,+Tamil+Nadu+600028/@13.0280416,80.2681674,17z' },
  { id: 'princeton-nj',    company: 'Zeal Solutions Inc', address: '5 Independence Way, Suite 300,', area: 'Princeton,', city: 'New Jersey – 08540', mapUrl: 'https://www.google.com/maps/place/5+Independence+Way,+Princeton,+NJ+08540/@40.3430,-74.6514,17z' },
];

const contactDetails = [
  { icon: Phone,    label: 'Contact Number', value: '+91 8925987250',           href: 'tel:+91 8925987250' },
  { icon: Mail,     label: 'Email',          value: 'careers@blubridge.com',    href: 'mailto:careers@blubridge.com' },
  { icon: Linkedin, label: 'LinkedIn',       value: 'linkedin.com/blubridge',   href: 'https://www.linkedin.com/company/blubridge/' },
  { icon: XIcon,    label: 'X (Twitter)',    value: 'x.com/BlubridgeAI',         href: 'https://x.com/BlubridgeAI/' },
];

const Careers = () => {
  useDocumentTitle('Careers | Blubridge');
  useMetaDescription('Join us to build the next frontier of AI. Bring your rigor, ownership, and engineering depth to solve hard, real-world problems.');
  const joinOurTeamRef = useRef(null);
  const [showJobListings, setShowJobListings] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#join-our-team') {
      setTimeout(() => joinOurTeamRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [location]);

  return (
    <div style={{ background: '#f0f1f9', paddingTop: '48px', paddingBottom: '48px' }} data-testid="careers-page">
      <div className="bb-container">

        {/* Editorial header */}
        <div className="pb-8 border-b border-bb-line flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 data-testid="join-us-title" className="bb-display" style={{ fontSize: 'clamp(48px, 8vw, 128px)' }}>
              Join Us
            </h1>
          </div>
        </div>

        {/* Tagline strip */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h2
              className="text-bb-ink"
              style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.02em', lineHeight: 1.1, fontWeight: 500 }}
            >
              We Build Intelligence from First Principles, with Precision and Purpose
            </h2>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <button
              onClick={() => setShowJobListings(!showJobListings)}
              data-testid="see-open-roles-btn"
              className="bb-btn-primary"
            >
              {showJobListings ? 'Hide roles' : 'See open roles'}
              <ChevronDown
                size={16}
                style={{ transition: 'transform 300ms ease', transform: showJobListings ? 'rotate(180deg)' : 'rotate(0)' }}
              />
            </button>
          </div>
        </div>

        {/* Job listings — editorial ledger table */}
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
            {/* Column header */}
            <div className="hidden md:grid grid-cols-12 gap-4 py-3 border-b border-bb-line">
              <span className="col-span-7 bb-caption">Role</span>
              <span className="col-span-2 bb-caption">Department</span>
              <span className="col-span-2 bb-caption">Location</span>
              <span className="col-span-1 bb-caption text-right">Apply</span>
            </div>

            {jobListings.map((job, i) => (
              <Link
                key={job.id}
                to={`/careers/job/${job.slug}`}
                data-testid={`job-row-${job.id}`}
                className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 py-5 border-b border-bb-line hover:bg-bb-bg-subtle transition-colors items-center"
                style={{ textDecoration: 'none' }}
              >
                <span className="md:col-span-7 text-[15px] font-medium text-bb-ink" style={{ fontFamily: 'Geist, sans-serif' }}>
                  {job.title}
                </span>
                <span className="md:col-span-2 text-[13px] text-bb-ink-2">{job.department}</span>
                <span className="md:col-span-2 text-[13px] text-bb-ink-2">{job.location}</span>
                <span className="md:col-span-1 md:text-right font-mono text-[12px] text-bb-ink-3 group-hover:text-bb-accent transition-colors">
                  <span className="inline-flex items-center gap-1">
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Offices */}
        <section data-testid="office-locations-section" className="mt-20">
          <p className="bb-eyebrow mb-6">Our Offices &amp; Partner Locations</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {officeLocations.map((loc, i) => (
              <a
                key={loc.id}
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`location-card-${loc.id}`}
                className="bb-panel group block hover:border-bb-line-strong transition-all"
                style={{ textDecoration: 'none', overflow: 'hidden' }}
              >
                {/* Editorial map placeholder */}
                <div style={{ width: '100%', height: '160px', backgroundColor: '#e8eaf3', position: 'relative', overflow: 'hidden' }}>
                  <svg viewBox="0 0 400 160" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <pattern id={`grid-${i}`} width="16" height="16" patternUnits="userSpaceOnUse">
                        <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#c9cde0" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="400" height="160" fill={`url(#grid-${i})`} />
                    <path d="M 0 100 Q 100 60 200 90 T 400 80" stroke="#b8bfd6" strokeWidth="1.5" fill="none" />
                    <path d="M 0 130 Q 120 100 240 120 T 400 110" stroke="#b8bfd6" strokeWidth="1" fill="none" opacity="0.6" />
                    <circle cx="200" cy="80" r="6" fill="#2b4c8c" />
                    <circle cx="200" cy="80" r="14" fill="none" stroke="#2b4c8c" strokeWidth="1" opacity="0.4">
                      <animate attributeName="r" values="6;18;6" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>

                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-bb-accent flex-shrink-0 mt-0.5" />
                    <div>
                      {loc.company && (
                        <p style={{ fontSize: '14px', color: '#0a1230', margin: 0, fontWeight: 500, fontFamily: 'Geist, sans-serif' }}>{loc.company}</p>
                      )}
                      <p style={{ fontSize: '14px', color: '#3f4966', lineHeight: 1.6, margin: 0 }}>{loc.address}</p>
                      <p style={{ fontSize: '14px', color: '#3f4966', lineHeight: 1.6, margin: 0 }}>{loc.area}</p>
                      <p style={{ fontSize: '14px', color: '#0a1230', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{loc.city}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Get in Touch */}
        <section data-testid="contact-section" className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
            <div className="lg:col-span-8">
              <h2 className="bb-h2" style={{ fontSize: 'clamp(28px, 3.6vw, 44px)' }}>
                Get in Touch
              </h2>
              <p style={{ marginTop: '12px', fontSize: '15px', color: '#3f4966', lineHeight: 1.7, maxWidth: '640px' }}>
                You are welcome to walk in for an interview on any working day, or you can reach out to us via:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {contactDetails.map((c, i) => {
              const Icon = c.icon;
              return (
                <a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  data-testid={`contact-${c.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bb-panel flex items-center gap-4 p-4 hover:border-bb-line-strong transition-colors"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ background: '#dfe6f5' }}>
                    <Icon size={18} color="#2b4c8c" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="bb-caption !mb-1" style={{ margin: '0 0 4px', fontSize: '10px', letterSpacing: '0.14em' }}>{c.label}</p>
                    <p style={{ fontSize: '13px', color: '#0a1230', margin: 0, fontFamily: 'Inter, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </div>

      {/* Join Our Team embedded */}
      <div id="join-our-team" ref={joinOurTeamRef} style={{ marginTop: '48px', scrollMarginTop: '100px' }}>
        <JoinOurTeam scrollRef={joinOurTeamRef} />
      </div>
    </div>
  );
};

export default Careers;
