import React, { useState, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { getJobBySlug } from '../data/jobsData';
import JobApplicationForm from '../components/JobApplicationForm';

const INK = '#0a1230';
const MUTED = '#3f4966';
const FAINT = '#7c86a2';
const LINE = '#d4d8e8';
const geist = 'Geist, sans-serif';
const inter = 'Inter, sans-serif';
const mono = 'IBM Plex Mono, monospace';

const sectionHeading = {
  fontFamily: geist,
  fontSize: 'clamp(20px, 2.2vw, 26px)',
  fontWeight: 500,
  letterSpacing: '-0.02em',
  color: INK,
  margin: 0,
  paddingBottom: '14px',
  borderBottom: `1px solid ${LINE}`,
};

const listItem = { fontFamily: inter, fontSize: '15px', lineHeight: 1.7, color: '#2a3352' };
const factLabel = { fontFamily: mono, fontSize: '10.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: FAINT, margin: 0 };
const factValue = { fontFamily: geist, fontSize: '17px', fontWeight: 500, color: INK, margin: '6px 0 0' };

const EditorialList = ({ items }) => (
  <ul style={{ listStyle: 'none', margin: '20px 0 0', padding: 0 }} className="space-y-3.5">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-3.5">
        <span aria-hidden style={{ fontFamily: mono, fontSize: '13px', lineHeight: 1.7, color: FAINT, flexShrink: 0 }}>→</span>
        <span style={listItem}>{item}</span>
      </li>
    ))}
  </ul>
);

const JobDetail = () => {
  const { slug } = useParams();
  const job = getJobBySlug(slug);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const formRef = useRef(null);

  useDocumentTitle(job ? `${job.title}` : 'Job Not Found | BluBridge');

  const handleApplyClick = () => {
    setShowApplicationForm(true);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  if (!job) {
    return <Navigate to="/careers" replace />;
  }

  const applyBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: INK,
    color: '#ffffff',
    padding: '13px 28px',
    borderRadius: '3px',
    fontFamily: geist,
    fontSize: '14px',
    fontWeight: 500,
    minHeight: '44px',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div data-testid="job-detail-page" style={{ minHeight: '100vh', backgroundColor: '#e8eaf3', paddingTop: '32px', paddingBottom: '96px' }}>
      <div className="bb-container" style={{ maxWidth: '1060px' }}>
        {/* Back Link */}
        <Link
          to="/careers"
          className="inline-flex items-center gap-2 hover:text-bb-accent transition-colors"
          style={{ color: INK, textDecoration: 'none', fontFamily: geist, fontSize: '14px', fontWeight: 500, marginBottom: '48px' }}
        >
          <ArrowLeft size={16} />
          Back to Careers
        </Link>

        {/* Masthead */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: MUTED, margin: 0 }}>
              {job.department} • {job.team}
            </p>
            <h1 style={{ fontFamily: geist, fontWeight: 500, color: INK, fontSize: 'clamp(30px, 4.2vw, 52px)', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '20px 0 0', maxWidth: '760px' }}>
              {job.title}
            </h1>
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2" style={{ marginTop: '24px' }}>
              <span style={{ fontFamily: inter, fontSize: '14px', color: MUTED }}>{job.location}</span>
              <span style={{ fontFamily: inter, fontSize: '14px', color: MUTED }}>{job.experience}</span>
              <span style={{ fontFamily: inter, fontSize: '14px', color: MUTED }}>{job.salary}</span>
            </div>
          </div>
          <button data-testid="apply-now-header-btn" onClick={handleApplyClick} className="transition-colors hover:bg-[#172449] flex-shrink-0 self-start md:self-auto" style={applyBtnStyle}>
            Apply Now
          </button>
        </div>

        {/* Facts row */}
        <div
          className="flex flex-wrap gap-x-16 gap-y-6"
          style={{ marginTop: '48px', padding: '24px 0', borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}
        >
          <div>
            <p style={factLabel}>Vacancies</p>
            <p style={factValue}>{job.vacancies}</p>
          </div>
          {job.batch && (
            <div>
              <p style={factLabel}>Batch</p>
              <p style={factValue}>{job.batch}</p>
            </div>
          )}
          <div>
            <p style={factLabel}>Employment</p>
            <p style={factValue}>{job.employmentType.split(',')[0]}</p>
          </div>
          {job.duration && (
            <div>
              <p style={factLabel}>Duration</p>
              <p style={factValue}>{job.duration}</p>
            </div>
          )}
        </div>

        {/* Content sections */}
        <div style={{ marginTop: '56px' }}>
          <section style={{ marginBottom: '56px' }}>
            <h2 style={sectionHeading}>About the Role</h2>
            <p style={{ ...listItem, margin: '20px 0 0', maxWidth: '760px' }}>{job.description}</p>
          </section>

          <section style={{ marginBottom: '56px' }}>
            <h2 style={sectionHeading}>Education</h2>
            <p style={{ ...listItem, margin: '20px 0 0', maxWidth: '760px' }}>{job.education}</p>
          </section>

          <section style={{ marginBottom: '56px' }}>
            <h2 style={sectionHeading}>Key Responsibilities</h2>
            <EditorialList items={job.responsibilities} />
          </section>

          {job.softwareStack && (
            <section style={{ marginBottom: '56px' }}>
              <h2 style={sectionHeading}>Software Stack</h2>
              <EditorialList items={job.softwareStack} />
            </section>
          )}

          <section style={{ marginBottom: '56px' }}>
            <h2 style={sectionHeading}>Requirements</h2>
            <EditorialList items={job.requirements} />
          </section>

          {job.addedAdvantage && job.addedAdvantage.length > 0 && (
            <section style={{ marginBottom: '56px' }}>
              <h2 style={sectionHeading}>Added Advantage</h2>
              <EditorialList items={job.addedAdvantage} />
            </section>
          )}

          {job.whyJoin && job.whyJoin.length > 0 && (
            <section style={{ marginBottom: '56px' }}>
              <h2 style={sectionHeading}>Why Join BluBridge?</h2>
              <EditorialList items={job.whyJoin} />
            </section>
          )}

          {job.skills && job.skills.length > 0 && (
            <section style={{ marginBottom: '56px' }}>
              <h2 style={sectionHeading}>Skills</h2>
              <div className="flex flex-wrap gap-x-8 gap-y-2.5" style={{ marginTop: '20px' }}>
                {job.skills.map((skill, index) => (
                  <span key={index} style={{ fontFamily: inter, fontSize: '14px', color: MUTED }}>{skill}</span>
                ))}
              </div>
            </section>
          )}

          {/* Apply CTA */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8" style={{ marginTop: '72px', paddingTop: '40px', borderTop: `1px solid ${LINE}` }}>
            <div>
              <h3 style={{ fontFamily: geist, fontSize: 'clamp(24px, 2.8vw, 34px)', fontWeight: 500, letterSpacing: '-0.02em', color: INK, margin: 0 }}>
                Ready to Join Our Team?
              </h3>
              <p style={{ fontFamily: inter, fontSize: '15px', lineHeight: 1.7, color: MUTED, margin: '14px 0 0', maxWidth: '480px' }}>
                Apply now and be part of BluBridge's mission to build the future of AI.
              </p>
            </div>
            <button data-testid="apply-now-bottom-btn" onClick={handleApplyClick} className="transition-colors hover:bg-[#172449] flex-shrink-0 self-start md:self-auto" style={applyBtnStyle}>
              Apply Now
            </button>
          </div>
        </div>

        {/* Application Form */}
        <JobApplicationForm
          ref={formRef}
          jobTitle={job.title}
          isVisible={showApplicationForm}
          onClose={() => setShowApplicationForm(false)}
        />
      </div>
    </div>
  );
};

export default JobDetail;
