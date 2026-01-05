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
    <div style={{ 
      backgroundColor: '#FAFAF7', 
      minHeight: '100vh', 
      paddingTop: '50px', 
      paddingBottom: '70px' 
    }}>
      <div style={{ 
        maxWidth: '1261px',
        margin: '0 auto', 
        padding: '0 20px'
      }}>
        {/* Title */}
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          color: '#1A1A1A',
          marginBottom: '30px',
          lineHeight: '1.2'
        }}>
          Join Us
        </h1>

        {/* Office Address */}
        <p style={{ 
          fontSize: '16px', 
          color: '#333333', 
          lineHeight: '1.6',
          marginBottom: '25px'
        }}>
          We have our office at{' '}
          <a 
            href="https://www.google.com/maps/place/30,+Norton+Rd,+Mandavelipakkam,+Mandaveli,+Chennai,+Tamil+Nadu+600028/@13.0280416,80.2681674,17z"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#007BFF', textDecoration: 'underline' }}
          >
            &quot;30, Norton Rd, Mandavelipakkam, Raja Annamalai Puram, Chennai, Tamil Nadu 600028&quot;
          </a>
        </p>

        {/* Must have(s) */}
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          color: '#1A1A1A',
          marginBottom: '15px',
          lineHeight: '1.3'
        }}>
          Must have(s):-
        </h3>

        <div style={{ 
          paddingLeft: '20px', 
          marginBottom: '30px'
        }}>
          <p style={{ fontSize: '16px', color: '#333333', lineHeight: '1.7', marginBottom: '8px' }}>a) Aptitude and Logical reasoning</p>
          <p style={{ fontSize: '16px', color: '#333333', lineHeight: '1.7', marginBottom: '8px' }}>b) Linear algebra, Calculus, Probability &amp; Statistics</p>
          <p style={{ fontSize: '16px', color: '#333333', lineHeight: '1.7', marginBottom: '8px' }}>c) Strong Programming Foundations in C++ or Java</p>
        </div>

        {/* How to apply */}
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          color: '#1A1A1A',
          marginBottom: '15px',
          lineHeight: '1.3'
        }}>
          <span style={{ textDecoration: 'underline' }}>How to apply</span>:-
        </h3>

        <p style={{ 
          fontSize: '16px', 
          color: '#333333', 
          lineHeight: '1.6',
          marginBottom: '15px'
        }}>
          Before applying, please ensure you read this carefully:
        </p>

        {/* Joining Our Research Unit link */}
        <p style={{ 
          fontSize: '16px', 
          color: '#333333', 
          lineHeight: '1.6',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>👇</span>
          <a
            onClick={handleScrollToJoin}
            style={{
              color: '#007BFF',
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
          fontSize: '16px', 
          color: '#333333', 
          lineHeight: '1.6',
          marginBottom: '15px'
        }}>
          You are welcome to walk in for an interview on any working day, or you can reach out to us via:
        </p>

        {/* Contact Details */}
        <ul style={{ 
          paddingLeft: '30px', 
          fontSize: '16px', 
          color: '#333333', 
          lineHeight: '1.8',
          listStyleType: 'disc',
          margin: '0 0 40px 0'
        }}>
          <li style={{ fontSize: '16px', marginBottom: '5px' }}>
            <strong style={{ color: '#000000' }}>Contact Number:</strong> +91 8925987250
          </li>
          <li style={{ fontSize: '16px', marginBottom: '5px' }}>
            <strong style={{ color: '#000000' }}>Email:</strong> careers.chennai@blubridge.com
          </li>
          <li style={{ fontSize: '16px', marginBottom: '5px' }}>
            <strong style={{ color: '#000000' }}>LinkedIn:</strong>{' '}
            <a 
              href="https://www.linkedin.com/company/blubridge/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#007BFF', textDecoration: 'underline' }}
            >
              https://linkedin.com/blubridge
            </a>
          </li>
          <li style={{ fontSize: '16px', marginBottom: '5px' }}>
            <strong style={{ color: '#000000' }}>LinkedIn:</strong>{' '}
            <a 
              href="https://www.linkedin.com/company/blubridge/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#007BFF', textDecoration: 'underline' }}
            >
              https://linkedin.com/blubridge
            </a>
          </li>
        </ul>
      </div>

      {/* Join Our Team Section */}
      <div style={{ marginTop: '60px' }}>
        <hr style={{ border: 'none', borderTop: '1px solid #E0E0E0', margin: '0 0 30px 0' }} />
        <JoinOurTeam scrollRef={joinOurTeamRef} />
      </div>
    </div>
  );
};

export default Careers;
