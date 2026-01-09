import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const JoinOurTeam = ({ scrollRef }) => {
  useDocumentTitle('Join our Research Team | BluBridge');

  return (
    <div style={{ 
      backgroundColor: '#efede5', 
      paddingTop: '0', 
      paddingBottom: '50px' 
    }}>
      <div style={{ 
        maxWidth: '1261px',
        margin: '0 auto', 
        padding: '0 20px'
      }}>
        {/* Research Team Container */}
        <div style={{
          backgroundColor: '#fffdf7',
          borderRadius: '12px',
          padding: '40px 50px'
        }}>
        {/* Main Title */}
        <h1 
          ref={scrollRef}
          style={{ 
            textAlign: 'center', 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#1A1A1A',
            textDecoration: 'underline',
            textDecorationThickness: '1px',
            textUnderlineOffset: '4px',
            marginBottom: '10px',
            scrollMarginTop: '150px',
            lineHeight: '1.3',
            paddingTop:'0'
          }}
        >
          Join our Deep Learning Research Team
        </h1>
        
        {/* Subtitle */}
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: '#1A1A1A',
          marginBottom: '35px',
          lineHeight: '1.3'
        }}>
          What You Need to Know ?
        </h2>

      

        {/* Section a) */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            color: '#1A1A1A', 
            marginBottom: '10px',
            lineHeight: '1.3'
          }}>
            a) Are we a startup?
          </h3>
          <p style={{ 
            paddingLeft: '20px', 
            fontSize: '16px', 
            color: '#333333', 
            lineHeight: '1.6',
            marginBottom: '0'
          }}>
            <strong style={{ color: '#000000' }}>No.</strong> We are a <strong style={{ color: '#000000' }}>Deep Learning Research Organization,</strong> not a startup.
          </p>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #E0E0E0', margin: '0 0 30px 0' }} />

        {/* Section b) */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            color: '#1A1A1A', 
            marginBottom: '10px',
            lineHeight: '1.3'
          }}>
            b) Who is funding us?
          </h3>
          <p style={{ 
            paddingLeft: '20px', 
            fontSize: '16px', 
            color: '#333333', 
            lineHeight: '1.6',
            marginBottom: '0'
          }}>
            We are entirely <strong style={{ color: '#000000' }}>self-funded.</strong>
          </p>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #E0E0E0', margin: '0 0 30px 0' }} />

        {/* Section c) */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            color: '#1A1A1A', 
            marginBottom: '10px',
            lineHeight: '1.3'
          }}>
            c) Am I eligible to apply?
          </h3>
          <p style={{ 
            paddingLeft: '20px', 
            fontSize: '16px', 
            color: '#333333', 
            lineHeight: '1.6',
            marginBottom: '12px'
          }}>
            Ask yourself the following:
          </p>
          <ul style={{ 
            paddingLeft: '45px', 
            fontSize: '16px', 
            color: '#333333', 
            lineHeight: '1.7',
            listStyleType: 'disc',
            margin: '0'
          }}>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>Do I truly understand the <strong style={{ color: '#000000' }}>depth of Deep Learning research?</strong></li>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>Am I aware this is a pragmatic, mathematics-driven science, not just a language task?</li>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>Am I ready to work with first principles of Machine Learning, not frameworks alone?</li>
          </ul>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #E0E0E0', margin: '0 0 30px 0' }} />

        {/* Section d) */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            color: '#1A1A1A', 
            marginBottom: '12px',
            lineHeight: '1.3'
          }}>
            d) Where do I begin? What should I study for the interview?
          </h3>
          <ul style={{ 
            paddingLeft: '45px', 
            fontSize: '16px', 
            color: '#333333', 
            lineHeight: '1.7',
            listStyleType: 'disc',
            margin: '0'
          }}>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>Begin by appearing for the <strong style={{ color: '#000000' }}>initial interview rounds.</strong></li>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>If selected, you&apos;ll be invited to a <strong style={{ color: '#000000' }}>second stage,</strong> where a strong grasp of Mathematics for Machine Learning is essential.</li>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>You&apos;ll get <strong style={{ color: '#000000' }}>up to a month</strong> to prepare.</li>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>Final selection is based on a <strong style={{ color: '#000000' }}>Maths for Deep Learning</strong> test.</li>
          </ul>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #E0E0E0', margin: '0 0 30px 0' }} />

        {/* Section e) */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            color: '#1A1A1A', 
            marginBottom: '10px',
            lineHeight: '1.3'
          }}>
            e) How is the pay?
          </h3>
          <p style={{ 
            paddingLeft: '20px', 
            fontSize: '16px', 
            color: '#333333', 
            lineHeight: '1.6',
            marginBottom: '12px'
          }}>
            We offer competitive compensation, but ask you to consider:
          </p>
          <ul style={{ 
            paddingLeft: '45px', 
            fontSize: '16px', 
            color: '#333333', 
            lineHeight: '1.7',
            listStyleType: 'disc',
            margin: '0'
          }}>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>You&apos;ll be working on Deep Learning from first principles — how many organizations offer that?</li>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>We are among the very few in India genuinely building a foundation model, not just hyping it.</li>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>Building from &quot;first principles&quot; is not the same as starting &quot;from scratch.&quot;</li>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>
              If you were to study this in a university:
              <ul style={{ 
                paddingLeft: '25px', 
                marginTop: '8px',
                listStyleType: 'none'
              }}>
                <li style={{ fontSize: '16px', marginBottom: '4px' }}>▶ You&apos;d likely go abroad (e.g., the US),</li>
                <li style={{ fontSize: '16px', marginBottom: '4px' }}>▶ Pay for a Master&apos;s degree,</li>
                <li style={{ fontSize: '16px', marginBottom: '4px' }}>▶ Learn theory &amp; practical without real-world application.</li>
              </ul>
            </li>
          </ul>
          
          {/* Lightbulb callout */}
          <div style={{ 
            paddingLeft: '20px', 
            marginTop: '15px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            fontSize: '16px',
            color: '#333333',
            lineHeight: '1.6'
          }}>
            <span style={{ fontSize: '16px', flexShrink: 0 }}>💡</span>
            <span>
              <strong style={{ color: '#000000' }}>If compensation is your main driver,</strong> you will find better-paying jobs. We are seeking <strong style={{ color: '#000000' }}>like-minded individuals</strong> who value the mission over money.
            </span>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #E0E0E0', margin: '0 0 30px 0' }} />

        {/* Section f) */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            color: '#1A1A1A', 
            marginBottom: '12px',
            lineHeight: '1.3'
          }}>
            f) Why is this opportunity unique?
          </h3>
          <ul style={{ 
            paddingLeft: '45px', 
            fontSize: '16px', 
            color: '#333333', 
            lineHeight: '1.7',
            listStyleType: 'disc',
            margin: '0'
          }}>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>We offer a <strong style={{ color: '#000000' }}>rare research environment</strong> focused solely on <strong style={{ color: '#000000' }}>foundation model development.</strong></li>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>We&apos;re assembling a team of <strong style={{ color: '#000000' }}>passionate, like-minded individuals</strong></li>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>Whether you&apos;re a research scholar or a self-taught enthusiast — if you have the fire to understand and build <strong style={{ color: '#000000' }}>Large Language Models,</strong> you&apos;re welcome to apply.</li>
          </ul>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #E0E0E0', margin: '0 0 30px 0' }} />

        {/* Section g) */}
        <div style={{ marginBottom: '0' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            color: '#1A1A1A', 
            marginBottom: '12px',
            lineHeight: '1.3'
          }}>
            g) Who should not apply?
          </h3>
          <ul style={{ 
            paddingLeft: '45px', 
            fontSize: '16px', 
            color: '#333333', 
            lineHeight: '1.7',
            listStyleType: 'disc',
            margin: '0'
          }}>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>Those looking for a <strong style={{ color: '#000000' }}>routine 9-to-5 job</strong></li>
            <li style={{ fontSize: '16px', marginBottom: '6px' }}>Anyone who <strong style={{ color: '#000000' }}>struggled with 12th-grade mathematics</strong></li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
};

export default JoinOurTeam;
