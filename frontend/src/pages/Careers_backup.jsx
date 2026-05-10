import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';

const Careers = () => {
  useDocumentTitle('Careers | BluBridge');

  return (
    <div style={{ backgroundColor: '#f5f3eb', minHeight: '100vh', paddingTop: '60px', paddingBottom: '20px' }} className="rounded-2xl">
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        padding: '35px 50px 45px 50px',
        backgroundColor: '#faf8f2',
        border: '1px solid #e8e6de'
        
      }} className="rounded-2xl">
        {/* Title */}
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#000',
          marginBottom: '15px'
        }}>
          Join Us
        </h1>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '0 0 18px 0' }} />
        {/* <a href="/joinourteam" class="text-lg font-bold pt-3 text-[#046bd2] underline mb-4 block"><h2>What You Need to Know ?</h2></a> */}

        {/* Office Address */}
        <p style={{ 
          fontSize: '15px', 
          color: '#222', 
          lineHeight: '1.6',
          marginBottom: '20px'
        }}>
          We have our offices at{' '}
          <a 
            href="https://www.google.com/maps/place/30,+Norton+Rd,+Mandavelipakkam,+Mandaveli,+Chennai,+Tamil+Nadu+600028/@13.0280416,80.2681674,17z"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#046bd2', textDecoration: 'underline' }}
          >
            "30, Norton Rd, Mandavelipakkam, Raja Annamalai Puram, Chennai, Tamil Nadu 600028"
          </a>
        </p>

        {/* Must have(s) */}
        <h2 style={{ 
          fontSize: '17px', 
          fontWeight: 'bold', 
          color: '#000',
          marginBottom: '12px'
        }}>
          Must have(s):-
        </h2>

        <div style={{ 
          paddingLeft: '8px', 
          fontSize: '15px', 
          color: '#222', 
          lineHeight: '1.8',
          marginBottom: '20px'
        }}>
          <p style={{ marginBottom: '4px' }}>a) Aptitude and Logical reasoning</p>
          <p style={{ marginBottom: '4px' }}>b) Linear algebra, Calculus, Probability & Statistics</p>
          <p style={{ marginBottom: '4px' }}>c) Strong Programming Foundations in C++ or Java</p>
        </div>

        {/* How to apply */}
        <h2 style={{ 
          fontSize: '17px', 
          fontWeight: 'bold', 
          color: '#000',
          marginBottom: '12px'
        }}>
          <span style={{ textDecoration: 'underline' }}>How to apply</span>:-
        </h2>

        <p style={{ 
          fontSize: '15px', 
          color: '#222', 
          lineHeight: '1.6',
          marginBottom: '10px'
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
          gap: '6px'
        }}>
          <span style={{ fontSize: '16px' }}>👆</span>
          <Link 
            to="/joinourteam"
            style={{ color: '#046bd2', textDecoration: 'underline', fontWeight: '500' }}
          >
            Joining Our Research Unit
          </Link>
        </p>

        <p style={{ 
          fontSize: '15px', 
          color: '#222', 
          lineHeight: '1.6',
          marginBottom: '14px'
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
          margin: '0'
        }}>
          <li style={{ marginBottom: '2px' }}>
            <strong>Contact Number:</strong> 044-466-00222
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
    </div>
  );
};

export default Careers;
