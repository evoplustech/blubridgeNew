import React, { useState, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, Briefcase, Clock, Users, GraduationCap, IndianRupee, Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { getJobBySlug } from '../data/jobsData';
import JobApplicationForm from '../components/JobApplicationForm';

const JobDetail = () => {
  const { slug } = useParams();
  const job = getJobBySlug(slug);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const formRef = useRef(null);

  useDocumentTitle(job ? `${job.title} | Careers | BluBridge` : 'Job Not Found | BluBridge');

  // Handle Apply Now click - show form and scroll to it
  const handleApplyClick = () => {
    setShowApplicationForm(true);
    // Wait for form to render, then scroll to it
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  if (!job) {
    return <Navigate to="/careers" replace />;
  }

  return (
    <div 
      data-testid="job-detail-page"
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8f7f3',
        paddingTop: '100px',
        paddingBottom: '80px'
      }}
    >
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        {/* Back Link */}
        <Link 
          to="/careers"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#0B1F3B',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '24px',
            transition: 'color 150ms ease-out'
          }}
          className="back-link"
        >
          <ArrowLeft size={18} />
          Back to Careers
        </Link>

        {/* Main Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
        }}>
          {/* Header Section */}
          <div style={{
            background: 'linear-gradient(135deg, #0B1F3B 0%, #1a3a5c 100%)',
            padding: '48px 48px 40px',
            color: '#ffffff'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '24px'
            }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                {/* Department Badge */}
                <span style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {job.department} • {job.team}
                </span>

                {/* Job Title */}
                <h1 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em'
                }}>
                  {job.title}
                </h1>

                {/* Meta Info */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  opacity: 0.9
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} />
                    <span style={{ fontSize: '14px' }}>{job.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Briefcase size={16} />
                    <span style={{ fontSize: '14px' }}>{job.experience}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IndianRupee size={16} />
                    <span style={{ fontSize: '14px' }}>{job.salary}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} />
                    <span style={{ fontSize: '14px' }}>{job.postedDate}</span>
                  </div>
                </div>
              </div>

              {/* Apply Button - Header */}
              <button
                data-testid="apply-now-header-btn"
                onClick={handleApplyClick}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  color: '#0B1F3B',
                  padding: '14px 32px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 200ms ease-out',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  border: 'none',
                  cursor: 'pointer'
                }}
                className="apply-btn"
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            padding: '32px 48px',
            borderBottom: '1px solid #f0efe9'
          }}>
            <div style={{
              backgroundColor: '#f8f7f3',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <Users size={22} color="#0B1F3B" style={{ marginBottom: '8px' }} />
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Vacancies</p>
              <p style={{ fontSize: '18px', fontWeight: '600', color: '#0B1F3B' }}>{job.vacancies}</p>
            </div>
            {job.batch && (
              <div style={{
                backgroundColor: '#f8f7f3',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <Calendar size={22} color="#0B1F3B" style={{ marginBottom: '8px' }} />
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Batch</p>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#0B1F3B' }}>{job.batch}</p>
              </div>
            )}
            <div style={{
              backgroundColor: '#f8f7f3',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <GraduationCap size={22} color="#0B1F3B" style={{ marginBottom: '8px' }} />
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Employment</p>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#0B1F3B' }}>{job.employmentType.split(',')[0]}</p>
            </div>
            {job.duration && (
              <div style={{
                backgroundColor: '#f8f7f3',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <Clock size={22} color="#0B1F3B" style={{ marginBottom: '8px' }} />
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Duration</p>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#0B1F3B' }}>{job.duration}</p>
              </div>
            )}
          </div>

          {/* Content Sections */}
          <div style={{ padding: '40px 48px' }}>
            {/* About the Role */}
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#0B1F3B',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '2px solid #0B1F3B'
              }}>
                About the Role
              </h2>
              <p style={{
                fontSize: '15px',
                color: '#4a5568',
                lineHeight: '1.7'
              }}>
                {job.description}
              </p>
            </section>

            {/* Education */}
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#0B1F3B',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '2px solid #0B1F3B'
              }}>
                Education
              </h2>
              <p style={{
                fontSize: '15px',
                color: '#4a5568',
                lineHeight: '1.7'
              }}>
                {job.education}
              </p>
            </section>

            {/* Key Responsibilities */}
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#0B1F3B',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '2px solid #0B1F3B'
              }}>
                Key Responsibilities
              </h2>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {job.responsibilities.map((item, index) => (
                  <li 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '15px',
                      color: '#4a5568',
                      lineHeight: '1.6'
                    }}
                  >
                    <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Software Stack (if available) */}
            {job.softwareStack && (
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#0B1F3B',
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #0B1F3B'
                }}>
                  Software Stack
                </h2>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {job.softwareStack.map((item, index) => (
                    <li 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        fontSize: '15px',
                        color: '#4a5568',
                        lineHeight: '1.6'
                      }}
                    >
                      <CheckCircle2 size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Requirements */}
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#0B1F3B',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '2px solid #0B1F3B'
              }}>
                Requirements
              </h2>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {job.requirements.map((item, index) => (
                  <li 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '15px',
                      color: '#4a5568',
                      lineHeight: '1.6'
                    }}
                  >
                    <span style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#0B1F3B',
                      borderRadius: '50%',
                      flexShrink: 0,
                      marginTop: '8px'
                    }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Added Advantage */}
            {job.addedAdvantage && job.addedAdvantage.length > 0 && (
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#0B1F3B',
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #0B1F3B'
                }}>
                  Added Advantage
                </h2>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {job.addedAdvantage.map((item, index) => (
                    <li 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        fontSize: '15px',
                        color: '#4a5568',
                        lineHeight: '1.6'
                      }}
                    >
                      <span style={{
                        color: '#f59e0b',
                        fontWeight: '600',
                        flexShrink: 0
                      }}>+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Why Join BluBridge */}
            {job.whyJoin && job.whyJoin.length > 0 && (
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#0B1F3B',
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #0B1F3B'
                }}>
                  Why Join BluBridge?
                </h2>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {job.whyJoin.map((item, index) => (
                    <li 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        fontSize: '15px',
                        color: '#4a5568',
                        lineHeight: '1.6'
                      }}
                    >
                      <span style={{
                        color: '#10b981',
                        fontWeight: '700',
                        flexShrink: 0
                      }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#0B1F3B',
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: '2px solid #0B1F3B'
                }}>
                  Skills
                </h2>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  {job.skills.map((skill, index) => (
                    <span 
                      key={index}
                      style={{
                        backgroundColor: '#f0efe9',
                        color: '#4a5568',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '500'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Apply CTA */}
            <div style={{
              backgroundColor: '#f8f7f3',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              marginTop: '48px'
            }}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#0B1F3B',
                marginBottom: '12px'
              }}>
                Ready to Join Our Team?
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#6b7280',
                marginBottom: '24px'
              }}>
                Apply now and be part of BluBridge's mission to build the future of AI.
              </p>
              <button
                data-testid="apply-now-bottom-btn"
                onClick={handleApplyClick}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#0B1F3B',
                  color: '#ffffff',
                  padding: '16px 40px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 200ms ease-out',
                  border: 'none',
                  cursor: 'pointer'
                }}
                className="apply-btn-bottom"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Application Form - Appears at the end of page */}
        <JobApplicationForm 
          ref={formRef}
          jobTitle={job.title}
          isVisible={showApplicationForm}
          onClose={() => setShowApplicationForm(false)}
        />
      </div>

      {/* Hover Styles */}
      <style>{`
        .back-link:hover {
          color: #328CC1;
        }
        .apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }
        .apply-btn-bottom:hover {
          background-color: #162B4D;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(11, 31, 59, 0.3);
        }
      `}</style>
    </div>
  );
};

export default JobDetail;
