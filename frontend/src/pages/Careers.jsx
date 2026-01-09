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
      backgroundColor: '#efede5', 
      minHeight: '100vh', 
      paddingTop: '50px', 
      
    }}>
      <div style={{ 
        maxWidth: '1261px',
        margin: '0 auto', 
        padding: '0 20px',
        
      }}>
        {/* Join Us Container */}
        <div style={{
          backgroundColor: '#fffdf7',
          borderRadius: '12px',
          padding: '40px 50px',
          marginBottom: '30px',
          borderBottom: '3px solid rgb(211, 205, 185)'
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
        <p className="mb-4">We have our office at</p>
        <p style={{ 
          fontSize: '16px', 
          color: '#333333', 
          lineHeight: '1.6',
          marginBottom: '20px',
        }}>
          <p style={{ fontSize: '16px', color: '#333333', lineHeight: '1.7', marginBottom: '8px' }}>b) <a 
            href="https://www.google.com/maps/place/Blubridge+Technologies/@12.9954492,80.2654151,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5267e2599dbced:0xc9079da2f4d833f!8m2!3d12.995444!4d80.26799!16s%2Fg%2F11mry3n8lv?coh=277534&entry=tts&g_ep=EgoyMDI2MDEwNi4wIPu8ASoKLDEwMDc5MjA3MUgBUAM%3D&skid=65fe5d4b-b9b5-43ec-b2f4-ed5d4490dbfc"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#007BFF', textDecoration: 'underline' }}
          >
            &quot;No. E160 Tiger Varadhachari Road, Kalakshetra Colony, Besant Nagar, Chennai - 600090&quot;
          </a></p>
        </p>
        <p style={{ fontSize: '16px', color: '#333333', lineHeight: '1.7', marginBottom: '8px' }}>a) <a 
            href="https://www.google.com/maps/place/30,+Norton+Rd,+Mandavelipakkam,+Mandaveli,+Chennai,+Tamil+Nadu+600028/@13.0280416,80.2681674,17z"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#007BFF', textDecoration: 'underline' }}
          >
            &quot;30, Norton Rd, Mandavelipakkam, Raja Annamalai Puram, Chennai, Tamil Nadu 600028&quot;
          </a></p>
        {/* Must have(s) */}
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          color: '#1A1A1A',
          marginTop : '10px',
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
            <strong style={{ color: '#000000' }}>X (Twitter):</strong>{' '}
            <a 
              href="https://x.com/BlubridgeAI/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#007BFF', textDecoration: 'underline' }}
            >
              https://x.com/BlubridgeAI
            </a>
          </li>
        </ul>
        </div>
      </div>

      {/* Join Our Team Section */}
      <div style={{ marginTop: '30px' }}>
        {/* <hr style={{ border: 'none', borderTop: '1px solid #E0E0E0', padding: '0 0 30px 0' }} /> */}
        <JoinOurTeam scrollRef={joinOurTeamRef} />
      </div>
    </div>
  );
};

export default Careers;
