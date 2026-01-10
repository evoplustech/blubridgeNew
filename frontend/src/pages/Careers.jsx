import React, { useRef, useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import JoinOurTeam from './JoinOurTeam';
import { MapPin, Phone, Mail, Linkedin, ChevronRight, CheckCircle2, ChevronDown, ExternalLink } from 'lucide-react';

// Custom X (Twitter) Icon Component
const XIcon = ({ size = 24, color = "currentColor", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Job listings data - minimal format
const jobListings = [
  {
    id: 1,
    title: 'AI Systems Engineer',
    department: 'Engineering',
    team: 'AI Research',
    location: 'Chennai',
    link: 'https://www.naukri.com/blubridge-technologies-jobs-careers'
  },
  {
    id: 2,
    title: 'AI & ML Engineer – C++ / Java',
    department: 'Engineering',
    team: 'Core ML',
    location: 'Chennai',
    link: 'https://www.naukri.com/blubridge-technologies-jobs-careers'
  },
  {
    id: 3,
    title: 'Branding & Communications Lead',
    department: 'Marketing',
    team: 'Brand',
    location: 'Chennai',
    link: 'https://www.naukri.com/blubridge-technologies-jobs-careers'
  },
  {
    id: 4,
    title: 'Marketing & Growth Lead',
    department: 'Marketing',
    team: 'Growth',
    location: 'Chennai',
    link: 'https://www.naukri.com/blubridge-technologies-jobs-careers'
  },
  {
    id: 5,
    title: 'Research Intern – Deep Learning',
    department: 'Research',
    team: 'AI Research',
    location: 'Chennai',
    link: 'https://www.naukri.com/blubridge-technologies-jobs-careers'
  },
  {
    id: 6,
    title: 'Operations & Admin Executive',
    department: 'Operations',
    team: 'Admin',
    location: 'Chennai',
    link: 'https://www.naukri.com/blubridge-technologies-jobs-careers'
  }
];

const Careers = () => {
  useDocumentTitle('Careers | BluBridge');
  const joinOurTeamRef = useRef(null);
  const [showJobListings, setShowJobListings] = useState(false);
  
  const handleScrollToJoin = () => {
    joinOurTeamRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const toggleJobListings = () => {
    setShowJobListings(!showJobListings);
  };

  const officeLocations = [
    {
      id: 'besant-nagar',
      address: 'No. E160 Tiger Varadhachari Road,',
      area: 'Kalakshetra Colony, Besant Nagar,',
      city: 'Chennai – 600090',
      mapUrl: 'https://www.google.com/maps/place/Blubridge+Technologies/@12.9954492,80.2654151,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5267e2599dbced:0xc9079da2f4d833f!8m2!3d12.995444!4d80.26799!16s%2Fg%2F11mry3n8lv',
      mapImage: 'https://maps.googleapis.com/maps/api/staticmap?center=12.995444,80.26799&zoom=16&size=400x200&maptype=roadmap&markers=color:red%7C12.995444,80.26799&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&style=feature:all|saturation:-100'
    },
    {
      id: 'mandavelipakkam',
      address: '30, Norton Rd, Mandavelipakkam,',
      area: 'Raja Annamalai Puram,',
      city: 'Chennai, Tamil Nadu – 600028',
      mapUrl: 'https://www.google.com/maps/place/30,+Norton+Rd,+Mandavelipakkam,+Mandaveli,+Chennai,+Tamil+Nadu+600028/@13.0280416,80.2681674,17z',
      mapImage: 'https://maps.googleapis.com/maps/api/staticmap?center=13.0280416,80.2681674&zoom=16&size=400x200&maptype=roadmap&markers=color:red%7C13.0280416,80.2681674&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&style=feature:all|saturation:-100'
    }
  ];

  const mustHaveSkills = [
    'Aptitude and Logical Reasoning',
    'Linear Algebra, Calculus, Probability & Statistics',
    'Strong Programming Foundations in C++ or Java'
  ];

  const contactDetails = [
    { icon: Phone, label: 'Contact Number', value: '+91 8925987250', href: 'tel:+918925987250' },
    { icon: Mail, label: 'Email', value: 'careers@blubridge.com', href: 'mailto:careers@blubridge.com' },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/blubridge', href: 'https://www.linkedin.com/company/blubridge/' },
    { icon: XIcon, label: 'X (Twitter)', value: 'x.com/BlubridgeAI', href: 'https://x.com/BlubridgeAI/' }
  ];

  return (
    <div 
      data-testid="careers-page"
      style={{ 
        backgroundColor: '#efede5', 
        minHeight: '100vh', 
        paddingTop: '50px'
      }}
    >
      <div style={{ 
        maxWidth: '1261px',
        margin: '0 auto', 
        padding: '0 20px'
      }}>
        {/* Join Us Container - Premium Redesign */}
        <div 
          data-testid="join-us-section"
          style={{
            backgroundColor: '#fffdf7',
            borderRadius: '12px',
            padding: '50px',
            marginBottom: '30px',
            borderBottom: '3px solid rgb(211, 205, 185)'
          }}
        >
          {/* Title */}
          <h1 
            data-testid="join-us-title"
            style={{ 
              fontSize: '36px', 
              fontWeight: '600', 
              color: '#1A1A1A',
              marginBottom: '30px',
              lineHeight: '1.2',
              letterSpacing: '-0.02em'
            }}
          >
            Join Us
          </h1>

          {/* ======================================== */}
          {/* CAREERS CTA STRIP */}
          {/* ======================================== */}
          <div 
            data-testid="careers-cta-strip"
            style={{
              background: '#f3f1e9',
              borderRadius: '14px',
              padding: '28px 36px',
              marginBottom: showJobListings ? '0' : '45px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid #e8e6e0',
              borderBottomLeftRadius: showJobListings ? '0' : '14px',
              borderBottomRightRadius: showJobListings ? '0' : '14px',
              transition: 'all 250ms ease-out'
            }}
          >
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1a1a1a',
              margin: 0,
              lineHeight: '1.4'
            }}>
              Interested in building the future of AI with us?
            </h3>
            <button
              onClick={toggleJobListings}
              data-testid="see-open-roles-btn"
              className="see-roles-link"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                fontWeight: '500',
                color: '#0B1F3B',
                transition: 'color 150ms ease-out'
              }}
            >
              {showJobListings ? 'Hide roles' : 'See open roles'}
              <ChevronDown 
                size={18} 
                style={{
                  transition: 'transform 300ms ease-out',
                  transform: showJobListings ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              />
            </button>
          </div>

          {/* ======================================== */}
          {/* INLINE JOB LISTINGS SECTION */}
          {/* ======================================== */}
          <div 
            data-testid="job-listings-section"
            style={{
              maxHeight: showJobListings ? '2000px' : '0',
              opacity: showJobListings ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 300ms ease-out, opacity 250ms ease-out',
              marginBottom: showJobListings ? '45px' : '0'
            }}
          >
            <div style={{
              background: '#f3f1e9',
              borderRadius: '0 0 14px 14px',
              padding: showJobListings ? '0 36px 36px 36px' : '0 36px',
              border: '1px solid #e8e6e0',
              borderTop: 'none'
            }}>
              {/* Job Rows - Minimal Horizontal List (No Header) */}

              {/* Job Rows - Minimal Horizontal List */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {jobListings.map((job, index) => (
                  <a 
                    key={job.id}
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="job-row"
                    data-testid={`job-row-${job.id}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr 1fr 40px',
                      alignItems: 'center',
                      padding: '18px 0',
                      borderTop: index === 0 ? '1px solid #e0ded8' : 'none',
                      borderBottom: '1px solid #e0ded8',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 150ms ease-out'
                    }}
                  >
                    {/* Job Title */}
                    <span style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#0B1F3B',
                      lineHeight: '1.4'
                    }}>
                      {job.title}
                    </span>

                    {/* Department */}
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#6b7280'
                    }}>
                      {job.department}
                    </span>

                    {/* Team */}
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#6b7280'
                    }}>
                      {job.team}
                    </span>

                    {/* Location */}
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#6b7280'
                    }}>
                      {job.location}
                    </span>

                    {/* Arrow */}
                    <span 
                      className="job-arrow"
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        color: '#9ca3af',
                        transition: 'transform 150ms ease-out, color 150ms ease-out'
                      }}
                    >
                      <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </a>
                ))}
              </div>

              {/* View All Link */}
              <div style={{ 
                textAlign: 'center', 
                marginTop: '28px',
                paddingTop: '20px'
              }}>
                <a
                  href="https://www.naukri.com/blubridge-technologies-jobs-careers"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#0B1F3B',
                    textDecoration: 'none',
                    transition: 'color 150ms ease-out'
                  }}
                  className="view-all-link"
                >
                  View all roles on Naukri
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* ======================================== */}
          {/* 1. OFFICE LOCATIONS - Visual Grid */}
          {/* ======================================== */}
          <section data-testid="office-locations-section" style={{ marginBottom: '50px' }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#1A1A1A',
              marginBottom: '24px',
              letterSpacing: '-0.01em'
            }}>
              Our Office Locations
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {officeLocations.map((location, index) => (
                <a
                  key={location.id}
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`location-card-${location.id}`}
                  style={{
                    display: 'block',
                    backgroundColor: '#f3f1e9',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #e8e6e0',
                    textDecoration: 'none',
                    transition: 'all 200ms ease-out',
                    cursor: 'pointer'
                  }}
                  className="location-card"
                >
                  {/* Map Preview */}
                  <div style={{
                    width: '100%',
                    height: '160px',
                    backgroundColor: '#e8e6e0',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Fallback map visual */}
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #e8e6e0 0%, #d4d2cc 50%, #c8c6c0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      {/* Grid pattern for map effect */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `
                          linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                      }} />
                      {/* Map pin */}
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#c94c4c',
                        borderRadius: '50% 50% 50% 0',
                        transform: 'rotate(-45deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(201, 76, 76, 0.3)',
                        transition: 'transform 150ms ease-out'
                      }} className="map-pin">
                        <div style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transform: 'rotate(45deg)'
                        }} />
                      </div>
                    </div>
                  </div>

                  {/* Address Content */}
                  <div style={{ padding: '20px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <MapPin 
                        size={20} 
                        style={{ 
                          color: '#c94c4c', 
                          flexShrink: 0, 
                          marginTop: '2px',
                          transition: 'color 150ms ease-out'
                        }} 
                        className="location-pin-icon"
                      />
                      <div>
                        <p style={{ 
                          fontSize: '15px', 
                          color: '#333', 
                          lineHeight: '1.5',
                          margin: 0
                        }}>
                          {location.address}
                        </p>
                        <p style={{ 
                          fontSize: '15px', 
                          color: '#333', 
                          lineHeight: '1.5',
                          margin: 0
                        }}>
                          {location.area}
                        </p>
                        <p style={{ 
                          fontSize: '15px', 
                          color: '#333', 
                          lineHeight: '1.5',
                          margin: 0,
                          fontWeight: '500'
                        }}>
                          {location.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* ======================================== */}
          {/* 2. MUST-HAVE SKILLS - Research Card */}
          {/* ======================================== */}
          {/* <section data-testid="must-have-skills-section" style={{ marginBottom: '50px' }}>
            <div style={{
              backgroundColor: '#f8f7f3',
              borderRadius: '12px',
              padding: '28px 32px',
              border: '1px solid #e8e6e0'
            }}>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                color: '#1A1A1A',
                marginBottom: '20px',
                letterSpacing: '-0.01em'
              }}>
                Must-Have Skills
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {mustHaveSkills.map((skill, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <CheckCircle2 
                      size={18} 
                      style={{ 
                        color: '#4a7c59', 
                        flexShrink: 0 
                      }} 
                    />
                    <span style={{ 
                      fontSize: '15px', 
                      color: '#333', 
                      lineHeight: '1.5' 
                    }}>
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section> */}

          {/* ======================================== */}
          {/* 3. HOW TO APPLY - Guided Action Card */}
          {/* ======================================== */}
          {/* <section data-testid="how-to-apply-section" style={{ marginBottom: '50px' }}>
            <div style={{
              backgroundColor: '#f8f7f3',
              borderRadius: '12px',
              padding: '28px 32px',
              border: '1px solid #e8e6e0'
            }}>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                color: '#1A1A1A',
                marginBottom: '20px',
                letterSpacing: '-0.01em'
              }}>
                How to Apply
              </h2>

              <p style={{ 
                fontSize: '15px', 
                color: '#555', 
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Before applying, please ensure you read this carefully:
              </p>

             
              <button
                onClick={handleScrollToJoin}
                data-testid="joining-research-unit-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#1a5fb4',
                  fontSize: '16px',
                  fontWeight: '500',
                  background: 'none',
                  border: 'none',
                  padding: '8px 0',
                  cursor: 'pointer',
                  transition: 'all 150ms ease-out',
                  position: 'relative'
                }}
                className="research-link"
              >
                <span style={{ fontSize: '18px' }}>👉</span>
                <span style={{ 
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px'
                }}>
                  Joining Our Research Unit
                </span>
                <ChevronRight size={18} style={{ marginLeft: '2px' }} />
              </button>
            </div>
          </section> */}

          {/* ======================================== */}
          {/* 4. CONTACT & WALK-IN DETAILS */}
          {/* ======================================== */}
          <section data-testid="contact-section">
            <div style={{
              backgroundColor: '#f3f1e9',
              borderRadius: '12px',
              padding: '28px 32px',
              border: '1px solid #e8e6e0'
            }}>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                color: '#1A1A1A',
                marginBottom: '16px',
                letterSpacing: '-0.01em'
              }}>
                Get in Touch
              </h2>

              <p style={{ 
                fontSize: '15px', 
                color: '#555', 
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                You are welcome to walk in for an interview on any working day, or you can reach out to us via:
              </p>

              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px'
              }}>
                {contactDetails.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <a
                      key={index}
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      data-testid={`contact-${contact.label.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '14px 16px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        border: '1px solid #e8e6e0',
                        textDecoration: 'none',
                        transition: 'all 150ms ease-out'
                      }}
                      className="contact-item"
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: '#f0efe9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <IconComponent size={20} style={{ color: '#555' }} />
                      </div>
                      <div>
                        <p style={{ 
                          fontSize: '12px', 
                          color: '#888', 
                          margin: 0,
                          marginBottom: '2px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          fontWeight: '500'
                        }}>
                          {contact.label}
                        </p>
                        <p style={{ 
                          fontSize: '14px', 
                          color: '#333', 
                          margin: 0,
                          fontWeight: '500'
                        }}>
                          {contact.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Join Our Team Section */}
      <div style={{ marginTop: '30px' }}>
        <JoinOurTeam scrollRef={joinOurTeamRef} />
      </div>

      {/* Hover Styles */}
      <style>{`
        .location-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          border-color: #d0cec8;
        }
        
        .location-card:hover .map-pin {
          transform: rotate(-45deg) scale(1.1);
        }
        
        .location-card:hover .location-pin-icon {
          color: #a83c3c;
        }
        
        .research-link:hover {
          color: #144a8f;
        }
        
        .research-link:hover span:nth-child(2) {
          text-decoration-thickness: 2px;
        }
        
        .contact-item:hover {
          border-color: #c0beb8;
          background-color: #fafaf8;
          transform: translateY(-1px);
        }
        
        .careers-cta-button:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 16px rgba(11, 31, 59, 0.2);
          background-color: #162B4D;
        }
        
        .job-row:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }
        
        .job-row:hover .job-arrow {
          transform: translateX(4px);
          color: #0B1F3B;
        }
        
        .view-all-link:hover {
          color: #328CC1;
        }
        
        @media (max-width: 768px) {
          .location-card {
            max-width: 100%;
          }
          .job-row {
            grid-template-columns: 1fr !important;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Careers;
