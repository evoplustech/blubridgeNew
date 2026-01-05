import React, { useRef } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import JoinOurTeam from './JoinOurTeam';

const Careers = () => {
  useDocumentTitle('Careers | BluBridge');
  const joinOurTeamRef = useRef(null);
  
  const handleScrollToJoin = () => {
    joinOurTeamRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div style={{ backgroundColor: '#f5f3eb', minHeight: '100vh', paddingTop: '60px', paddingBottom: '20px' }}>
      <div style={{ 
        margin: '0 auto', 
        padding: '35px 50px 45px 50px',
        backgroundColor: '#faf8f2',
        border: '1px solid #e8e6de',
        borderRadius: '12px'
      }}>
        {/* Title */}
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#000',
          marginBottom: '15px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          Join Us
        </h1>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '0 0 18px 0' }} />

        {/* Office Address */}
        <p style={{ 
          fontSize: '15px', 
          color: '#222', 
          lineHeight: '1.6',
          marginBottom: '20px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          We have our office at{' '}
          <a 
            href="https://www.google.com/maps/place/30,+Norton+Rd,+Mandavelipakkam,+Mandaveli,+Chennai,+Tamil+Nadu+600028/@13.0280416,80.2681674,17z"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#046bd2', textDecoration: 'underline' }}
          >
            &quot;30, Norton Rd, Mandavelipakkam, Raja Annamalai Puram, Chennai, Tamil Nadu 600028&quot;
          </a>
        </p>

        {/* Must have(s) */}
        <h2 style={{ 
          fontSize: '17px', 
          fontWeight: 'bold', 
          color: '#000',
          marginBottom: '12px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          Must have(s):-
        </h2>

        <div style={{ 
          paddingLeft: '8px', 
          fontSize: '15px', 
          color: '#222', 
          lineHeight: '1.8',
          marginBottom: '20px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <p style={{ marginBottom: '4px' }}>a) Aptitude and Logical reasoning</p>
          <p style={{ marginBottom: '4px' }}>b) Linear algebra, Calculus, Probability &amp; Statistics</p>
          <p style={{ marginBottom: '4px' }}>c) Strong Programming Foundations in C++ or Java</p>
        </div>

        {/* How to apply */}
        <h2 style={{ 
          fontSize: '17px', 
          fontWeight: 'bold', 
          color: '#000',
          marginBottom: '12px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <span style={{ textDecoration: 'underline' }}>How to apply</span>:-
        </h2>

        <p style={{ 
          fontSize: '15px', 
          color: '#222', 
          lineHeight: '1.6',
          marginBottom: '10px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          Before applying, please ensure you read this carefully:
        </p>

        {/* Joining Our Research Unit link */}
        <p style={{ 
          fontSize: '15px', 
          color: '#222', 
          lineHeight: '1.6',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <span style={{ fontSize: '16px' }}>👆</span>
          <a
            onClick={handleScrollToJoin}
            style={{
              color: '#046bd2',
              textDecoration: 'underline',
              fontWeight: '500',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer'
            }}
          >
            Joining Our Research Unit
          </a>
        </p>
            
        <p style={{ 
          fontSize: '15px', 
          color: '#222', 
          lineHeight: '1.6',
          marginBottom: '14px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          You are welcome to walk in for an interview on any working day, or you can reach out to us via:
        </p>

        {/* Contact Details */}
        <ul style={{ 
          paddingLeft: '25px', 
          fontSize: '15px', 
          color: '#222', 
          lineHeight: '1.9',
          listStyleType: 'disc',
          margin: '0',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <li style={{ marginBottom: '2px' }}>
            <strong>Contact Number:</strong> +91 8925987250
          </li>
          <li style={{ marginBottom: '2px' }}>
            <strong>Email:</strong> careers.chennai@blubridge.com
          </li>
          <li style={{ marginBottom: '2px' }}>
            <strong>LinkedIn:</strong>{' '}
            <a 
              href="https://www.linkedin.com/company/blubridge/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#046bd2', textDecoration: 'underline' }}
            >
              https://linkedin.com/blubridge
            </a>
          </li>
        </ul>
      </div>

      {/* Join Our Team Section */}
      <div style={{ marginTop: '80px' }}>
        <JoinOurTeam scrollRef={joinOurTeamRef} />
      </div>
    </div>
  );
};

export default Careers;
