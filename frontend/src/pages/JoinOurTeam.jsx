import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const JoinOurTeam = ({ scrollRef }) => {
  useDocumentTitle('Join our Research Team | BluBridge');

  return (
    <div  style={{ backgroundColor: '#f5f3eb', minHeight: '100vh', paddingTop: '50px', paddingBottom: '50px' }}>
      <div style={{ 
        // maxWidth: '1000px', 
        margin: '0 auto', 
        padding: '35px 45px 45px 45px',
        backgroundColor: '#faf8f2',
        border: '1px solid #e8e6de',
        
      }}>
        {/* Main Title */}
        <h1 
          ref={scrollRef}
        style={{ 
          textAlign: 'center', 
          fontSize: '26px', 
          fontWeight: 'bold', 
          color: '#000',
          textDecoration: 'underline',
          textDecorationThickness: '1.5px',
          textUnderlineOffset: '3px',
          marginBottom: '6px',
          scrollMarginTop: '150px' 
        }}>
          Join our Deep Learning Research Team
        </h1>
        
        {/* Subtitle */}
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#000',
          marginBottom: '25px'
        }}>
          What You Need to Know ?
        </h2>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '0 0 20px 0' }} />

        {/* Section a) */}
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{ 
            fontSize: '15px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '6px'
          }}>
            a) Are we a startup?
          </h3>
          <p style={{ 
            paddingLeft: '18px', 
            fontSize: '14px', 
            color: '#222', 
            lineHeight: '1.5',
            marginBottom: '0'
          }}>
            <strong>No.</strong> We are a <strong>Deep Learning Research Organization,</strong> not a startup.
          </p>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '16px 0' }} />

        {/* Section b) */}
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{ 
            fontSize: '15px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '6px'
          }}>
            b) Who is funding us?
          </h3>
          <p style={{ 
            paddingLeft: '18px', 
            fontSize: '14px', 
            color: '#222', 
            lineHeight: '1.5',
            
            marginBottom: '0'
          }}>
            We are entirely <strong>self-funded.</strong>
          </p>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '16px 0' }} />

        {/* Section c) */}
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{ 
            fontSize: '15px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '6px'
          }}>
            c) Am I eligible to apply?
          </h3>
          <p style={{ 
            paddingLeft: '18px', 
            fontSize: '14px', 
            color: '#222', 
            lineHeight: '1.5',
            marginBottom: '8px'
          }}>
            Ask yourself the following:
          </p>
          <ul style={{ 
            paddingLeft: '36px', 
            fontSize: '14px', 
            color: '#222', 
            lineHeight: '1.7',
            listStyleType: 'disc',
            margin: '0'
          }}>
            <li style={{ marginBottom: '3px' }}>Do I truly understand the <strong>depth of Deep Learning research?</strong></li>
            <li style={{ marginBottom: '3px' }}>Am I aware this is a pragmatic, mathematics-driven science, not just a language task?</li>
            <li style={{ marginBottom: '3px' }}>Am I ready to work with first principles of Machine Learning, not frameworks alone?</li>
          </ul>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '16px 0' }} />

        {/* Section d) */}
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{ 
            fontSize: '15px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '8px'
          }}>
            d) Where do I begin? What should I study for the interview?
          </h3>
          <ul style={{ 
            paddingLeft: '36px', 
            fontSize: '14px', 
            color: '#222', 
            lineHeight: '1.7',
            listStyleType: 'disc',
            
            margin: '0'
          }}>
            <li style={{ marginBottom: '3px' }}>Begin by appearing for the <strong>initial interview rounds.</strong></li>
            <li style={{ marginBottom: '3px' }}>If selected, you&apos;ll be invited to a <strong>second stage,</strong> where a strong grasp of Mathematics for Machine Learning is essential.</li>
            <li style={{ marginBottom: '3px' }}>You&apos;ll get <strong>up to a month</strong> to prepare.</li>
            <li style={{ marginBottom: '3px' }}>Final selection is based on a <strong>Maths for Deep Learning</strong> test.</li>
          </ul>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '16px 0' }} />

        {/* Section e) */}
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{ 
            fontSize: '15px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '6px'
          }}>
            e) How is the pay?
          </h3>
          <p style={{ 
            paddingLeft: '18px', 
            fontSize: '14px', 
            color: '#222', 
            lineHeight: '1.5',
            marginBottom: '8px'
          }}>
            We offer competitive compensation, but ask you to consider:
          </p>
          <ul style={{ 
            paddingLeft: '36px', 
            fontSize: '14px', 
            color: '#222', 
            lineHeight: '1.7',
            listStyleType: 'disc',
            margin: '0'
          }}>
            <li style={{ marginBottom: '3px' }}>You&apos;ll be working on Deep Learning from first principles — how many organizations offer that?</li>
            <li style={{ marginBottom: '3px' }}>We are among the very few in India genuinely building a foundation model, not just hyping it.</li>
            <li style={{ marginBottom: '3px' }}>Building from &quot;first principles&quot; is not the same as starting &quot;from scratch.&quot;</li>
            <li style={{ marginBottom: '3px' }}>
              If you were to study this in a university:
              <ul style={{ 
                paddingLeft: '20px', 
                marginTop: '6px',
                listStyleType: 'none'
              }}>
                <li style={{ marginBottom: '2px' }}>► You'd likely go abroad (e.g., the US),</li>
                <li style={{ marginBottom: '2px' }}>► Pay for a Master's degree,</li>
                <li style={{ marginBottom: '2px' }}>► Learn theory & practical without real-world application.</li>
              </ul>
            </li>
          </ul>
          
          {/* Lightbulb callout */}
          <div style={{ 
            paddingLeft: '18px', 
            marginTop: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '6px',
            fontSize: '14px',
            color: '#222',
            lineHeight: '1.5'            
          }}>
            <span style={{ fontSize: '16px', color: '#f0c000', flexShrink: 0 }}>💡</span>
            <span>
              <strong>If compensation is your main driver,</strong> you will find better-paying jobs. We are seeking <strong>like-minded individuals</strong> who value the mission over money.
            </span>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '16px 0' }} />

        {/* Section f) */}
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{ 
            fontSize: '15px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '8px'
          }}>
            f) Why is this opportunity unique?
          </h3>
          <ul style={{ 
            paddingLeft: '36px', 
            fontSize: '14px', 
            color: '#222', 
            lineHeight: '1.7',
            listStyleType: 'disc',
            margin: '0'
          }}>
            <li style={{ marginBottom: '3px' }}>We offer a <strong>rare research environment</strong> focused solely on <strong>foundation model development.</strong></li>
            <li style={{ marginBottom: '3px' }}>We're assembling a team of <strong>passionate, like-minded individuals</strong></li>
            <li style={{ marginBottom: '3px' }}>Whether you're a research scholar or a self-taught enthusiast — if you have the fire to understand and build <strong>Large Language Models,</strong> you're welcome to apply.</li>
          </ul>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '16px 0' }} />

        {/* Section g) */}
        <div style={{ marginBottom: '0' }}>
          <h3 style={{ 
            fontSize: '15px', 
            fontWeight: 'bold', 
            color: '#000', 
            marginBottom: '8px'
          }}>
            g) Who should not apply?
          </h3>
          <ul style={{ 
            paddingLeft: '36px', 
            fontSize: '14px', 
            color: '#222', 
            lineHeight: '1.7',
            listStyleType: 'disc',
            margin: '0'
          }}>
            <li style={{ marginBottom: '3px' }}>Those looking for a <strong>routine 9-to-5 job</strong></li>
            <li style={{ marginBottom: '3px' }}>Anyone who <strong>struggled with 12th-grade mathematics</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JoinOurTeam;
