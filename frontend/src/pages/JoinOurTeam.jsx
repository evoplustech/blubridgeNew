import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const JoinOurTeam = () => {
  useDocumentTitle('Join our Research Team - BluBridge');

  return (
    <div style={{ backgroundColor: '#f3f1e9', minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        padding: '40px 50px',
        backgroundColor: '#f3f1e9',
        fontFamily: 'Georgia, "Times New Roman", serif'
      }}>
        {/* Main Title */}
        <h1 style={{ 
          textAlign: 'center', 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#000',
          textDecoration: 'underline',
          textDecorationThickness: '2px',
          textUnderlineOffset: '4px',
          marginBottom: '8px',
          fontFamily: 'Georgia, "Times New Roman", serif'
        }}>
          Joining our Deep Learning Research Team
        </h1>
        
        {/* Subtitle */}
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '22px', 
          fontWeight: 'bold', 
          color: '#000',
          marginBottom: '30px',
          fontFamily: 'Georgia, "Times New Roman", serif'
        }}>
          What You Need to Know ?
        </h2>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #d0d0d0', margin: '20px 0 25px 0' }} />

        {/* Section a) */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '17px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '8px',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            a) Are we a startup?
          </h3>
          <p style={{ 
            paddingLeft: '20px', 
            fontSize: '15px', 
            color: '#333', 
            lineHeight: '1.6',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            <strong>No.</strong> We are a <strong>Deep Learning Research Organization,</strong> not a startup.
          </p>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #d0d0d0', margin: '20px 0 25px 0' }} />

        {/* Section b) */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '17px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '8px',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            b) Who is funding us?
          </h3>
          <p style={{ 
            paddingLeft: '20px', 
            fontSize: '15px', 
            color: '#333', 
            lineHeight: '1.6',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            We are entirely <strong>self-funded.</strong>
          </p>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #d0d0d0', margin: '20px 0 25px 0' }} />

        {/* Section c) */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '17px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '8px',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            c) Am I eligible to apply?
          </h3>
          <p style={{ 
            paddingLeft: '20px', 
            fontSize: '15px', 
            color: '#333', 
            lineHeight: '1.6',
            marginBottom: '12px',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            Ask yourself the following:
          </p>
          <ul style={{ 
            paddingLeft: '45px', 
            fontSize: '15px', 
            color: '#333', 
            lineHeight: '1.8',
            listStyleType: 'disc',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            <li style={{ marginBottom: '6px' }}>Do I truly understand the <strong>depth of Deep Learning research?</strong></li>
            <li style={{ marginBottom: '6px' }}>Am I aware this is a pragmatic, mathematics-driven science, not just a language task?</li>
            <li style={{ marginBottom: '6px' }}>Am I ready to work with first principles of Machine Learning, not frameworks alone?</li>
          </ul>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #d0d0d0', margin: '20px 0 25px 0' }} />

        {/* Section d) */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '17px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '12px',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            d) Where do I begin? What should I study for the interview?
          </h3>
          <ul style={{ 
            paddingLeft: '45px', 
            fontSize: '15px', 
            color: '#333', 
            lineHeight: '1.8',
            listStyleType: 'disc',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            <li style={{ marginBottom: '6px' }}>Begin by appearing for the <strong>initial interview rounds.</strong></li>
            <li style={{ marginBottom: '6px' }}>If selected, you'll be invited to a <strong>second stage,</strong> where a strong grasp of Mathematics for Machine Learning is essential.</li>
            <li style={{ marginBottom: '6px' }}>You'll get <strong>up to a month</strong> to prepare.</li>
            <li style={{ marginBottom: '6px' }}>Final selection is based on a <strong>Maths for Deep Learning</strong> test.</li>
          </ul>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #d0d0d0', margin: '20px 0 25px 0' }} />

        {/* Section e) */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '17px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '8px',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            e) How is the pay?
          </h3>
          <p style={{ 
            paddingLeft: '20px', 
            fontSize: '15px', 
            color: '#333', 
            lineHeight: '1.6',
            marginBottom: '12px',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            We offer competitive compensation, but ask you to consider:
          </p>
          <ul style={{ 
            paddingLeft: '45px', 
            fontSize: '15px', 
            color: '#333', 
            lineHeight: '1.8',
            listStyleType: 'disc',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            <li style={{ marginBottom: '6px' }}>You'll be working on Deep Learning from first principles — how many organizations offer that?</li>
            <li style={{ marginBottom: '6px' }}>We are among the very few in India genuinely building a foundation model, not just hyping it.</li>
            <li style={{ marginBottom: '6px' }}>Building from "first principles" is not the same as starting "from scratch."</li>
            <li style={{ marginBottom: '6px' }}>
              If you were to study this in a university:
              <ul style={{ 
                paddingLeft: '25px', 
                marginTop: '8px',
                listStyleType: 'none',
                fontFamily: 'Georgia, "Times New Roman", serif'
              }}>
                <li style={{ marginBottom: '4px' }}>► You'd likely go abroad (e.g., the US),</li>
                <li style={{ marginBottom: '4px' }}>► Pay for a Master's degree,</li>
                <li style={{ marginBottom: '4px' }}>► Learn theory & practical without real-world application.</li>
              </ul>
            </li>
          </ul>
          
          {/* Lightbulb callout */}
          <div style={{ 
            paddingLeft: '20px', 
            marginTop: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            fontSize: '15px',
            color: '#333',
            lineHeight: '1.6',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            <span style={{ fontSize: '18px', color: '#f0c000' }}>💡</span>
            <span>
              <strong>If compensation is your main driver,</strong> you will find better-paying jobs. We are seeking <strong>like-minded individuals</strong> who value the mission over money.
            </span>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #d0d0d0', margin: '20px 0 25px 0' }} />

        {/* Section f) */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '17px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '12px',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            f) Why is this opportunity unique?
          </h3>
          <ul style={{ 
            paddingLeft: '45px', 
            fontSize: '15px', 
            color: '#333', 
            lineHeight: '1.8',
            listStyleType: 'disc',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            <li style={{ marginBottom: '6px' }}>We offer a <strong>rare research environment</strong> focused solely on <strong>foundation model development.</strong></li>
            <li style={{ marginBottom: '6px' }}>We're assembling a team of <strong>passionate, like-minded individuals</strong></li>
            <li style={{ marginBottom: '6px' }}>Whether you're a research scholar or a self-taught enthusiast — if you have the fire to understand and build <strong>Large Language Models,</strong> you're welcome to apply.</li>
          </ul>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #d0d0d0', margin: '20px 0 25px 0' }} />

        {/* Section g) */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            fontSize: '17px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '12px',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            g) Who should not apply?
          </h3>
          <ul style={{ 
            paddingLeft: '45px', 
            fontSize: '15px', 
            color: '#333', 
            lineHeight: '1.8',
            listStyleType: 'disc',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}>
            <li style={{ marginBottom: '6px' }}>Those looking for a <strong>routine 9-to-5 job</strong></li>
            <li style={{ marginBottom: '6px' }}>Anyone who <strong>struggled with 12th-grade mathematics</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JoinOurTeam;
