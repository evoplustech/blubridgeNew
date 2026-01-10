import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const PrivacyPolicy = () => {
  useDocumentTitle('Privacy Policy | BluBridge');

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8f7f3',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}
    >
      <div style={{
        maxWidth: '896px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        {/* Main Card */}
        <div style={{
          backgroundColor: '#fffdf7',
          borderRadius: '20px',
          padding: '60px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)'
        }}>
          {/* Page Title */}
          <h1 style={{
            fontSize: '36px',
            fontWeight: '600',
            color: '#0B1F3B',
            marginBottom: '12px',
            letterSpacing: '-0.02em'
          }}>
            Privacy Policy
          </h1>

          {/* Last Updated */}
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '32px'
          }}>
            Last updated: December 2024
          </p>

          {/* Introduction */}
          <p style={{
            fontSize: '16px',
            color: '#4a5568',
            lineHeight: '1.8',
            marginBottom: '40px'
          }}>
            At BluBridge ("we", "us", or "our"), we are committed to protecting your privacy and safeguarding the personal information you share with us in the course of our AI research, publications, collaborations, and academic or industry engagements. This Privacy Policy explains how we collect, use, disclose, and protect your information when you interact with our research platforms, websites, events, and communications.
          </p>

          {/* Section 1 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              1. Information We Collect
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '16px'
            }}>
              We may collect the following categories of information in connection with our research activities:
            </p>
            
            {/* Personal Information */}
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '12px',
              marginTop: '20px'
            }}>
              Personal Information
            </h3>
            <ul style={{
              paddingLeft: '24px',
              marginBottom: '20px'
            }}>
              {[
                'Name and contact details (such as email address, phone number, or professional address)',
                'Professional and academic information (organization, role, field of expertise, research interests)',
                'Account credentials for accessing research portals or collaboration platforms',
                'Information you provide when submitting research inquiries, papers, or applications'
              ].map((item, index) => (
                <li key={index} style={{
                  fontSize: '15px',
                  color: '#4a5568',
                  lineHeight: '1.8',
                  marginBottom: '8px',
                  listStyleType: 'disc'
                }}>
                  {item}
                </li>
              ))}
            </ul>

            {/* Technical Information */}
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '12px'
            }}>
              Technical Information
            </h3>
            <ul style={{
              paddingLeft: '24px'
            }}>
              {[
                'IP address and device identifiers',
                'Browser type, operating system, and basic device information',
                'Usage data related to your interaction with our research platforms',
                'Cookies and similar tracking technologies'
              ].map((item, index) => (
                <li key={index} style={{
                  fontSize: '15px',
                  color: '#4a5568',
                  lineHeight: '1.8',
                  marginBottom: '8px',
                  listStyleType: 'disc'
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              2. How We Use Your Information
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '16px'
            }}>
              We use the information we collect for purposes related to our research mission, including:
            </p>
            <ul style={{
              paddingLeft: '24px',
              marginBottom: '16px'
            }}>
              {[
                'To facilitate AI research collaboration and communication',
                'To manage access to research portals, publications, and internal tools',
                'To respond to research inquiries and provide academic or technical support',
                'To administer events, workshops, and research programs',
                'To improve our research platforms, tools, and documentation',
                'To maintain the security and integrity of our systems',
                'To comply with legal and regulatory obligations'
              ].map((item, index) => (
                <li key={index} style={{
                  fontSize: '15px',
                  color: '#4a5568',
                  lineHeight: '1.8',
                  marginBottom: '8px',
                  listStyleType: 'disc'
                }}>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              We do not use your data for unrelated commercial advertising or resale.
            </p>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              3. Legal Basis for Processing
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '16px'
            }}>
              We process personal data under one or more of the following legal grounds:
            </p>
            <ul style={{
              paddingLeft: '24px'
            }}>
              {[
                { title: 'Consent', desc: 'where you have explicitly agreed to participate in research activities or communications' },
                { title: 'Contract', desc: 'where processing is necessary for research collaboration or platform access' },
                { title: 'Legitimate Interests', desc: 'for advancing our research objectives, improving systems, and ensuring security' },
                { title: 'Legal Obligation', desc: 'to comply with applicable laws and regulations' }
              ].map((item, index) => (
                <li key={index} style={{
                  fontSize: '15px',
                  color: '#4a5568',
                  lineHeight: '1.8',
                  marginBottom: '8px',
                  listStyleType: 'disc'
                }}>
                  <strong style={{ color: '#0B1F3B' }}>{item.title}</strong> – {item.desc}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              4. Data Sharing and Disclosure
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '16px'
            }}>
              We may share information in limited circumstances, including:
            </p>
            <ul style={{
              paddingLeft: '24px',
              marginBottom: '16px'
            }}>
              {[
                { title: 'Research Partners and Collaborators', desc: 'institutions or individuals involved in joint research initiatives' },
                { title: 'Service Providers', desc: 'trusted third parties that support hosting, security, or research infrastructure' },
                { title: 'Legal Authorities', desc: 'when required by law or to protect rights, safety, or integrity' },
                { title: 'Organizational Changes', desc: 'in connection with mergers, restructuring, or similar events' }
              ].map((item, index) => (
                <li key={index} style={{
                  fontSize: '15px',
                  color: '#4a5568',
                  lineHeight: '1.8',
                  marginBottom: '8px',
                  listStyleType: 'disc'
                }}>
                  <strong style={{ color: '#0B1F3B' }}>{item.title}</strong> – {item.desc}
                </li>
              ))}
            </ul>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              We do not sell personal data or share it for unrelated commercial purposes.
            </p>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              5. Data Retention
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              We retain personal information only for as long as necessary to support research objectives, maintain records of collaboration, or meet legal and compliance requirements. Retention periods vary depending on the nature of the data and the context in which it was collected.
            </p>
          </section>

          {/* Section 6 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              6. Your Rights
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '16px'
            }}>
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul style={{
              paddingLeft: '24px',
              marginBottom: '16px'
            }}>
              {[
                'Access your personal data',
                'Request correction of inaccurate or incomplete data',
                'Request deletion of your data',
                'Request portability of your data',
                'Object to certain types of processing',
                'Request restriction of processing'
              ].map((item, index) => (
                <li key={index} style={{
                  fontSize: '15px',
                  color: '#4a5568',
                  lineHeight: '1.8',
                  marginBottom: '8px',
                  listStyleType: 'disc'
                }}>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              To exercise these rights, please contact us using the details provided below.
            </p>
          </section>

          {/* Section 7 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              7. Data Security
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              We employ appropriate technical and organizational safeguards to protect personal information from unauthorized access, loss, misuse, or disclosure. While we strive to use commercially and academically accepted security practices, no digital system can be guaranteed to be completely secure.
            </p>
          </section>

          {/* Section 8 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              8. International Transfers
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              Your information may be processed in countries other than your own, particularly in the context of global research collaboration. We ensure that appropriate legal and technical safeguards are in place to protect your data in accordance with applicable data protection laws.
            </p>
          </section>

          {/* Section 9 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              9. Cookies and Tracking
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              Our platforms use cookies and similar technologies to understand usage patterns and improve the research experience. You may manage cookie preferences through your browser settings. Additional details are available in our Cookie Policy.
            </p>
          </section>

          {/* Section 10 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              10. Changes to This Policy
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              We may revise this Privacy Policy to reflect changes in our research practices or legal requirements. Updates will be posted on this page with a revised "Last updated" date. Continued interaction with our platforms after such changes indicates acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Section */}
          <section style={{
            marginTop: '48px',
            paddingTop: '32px',
            borderTop: '1px solid #e8e6e0'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              Contact Us
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              If you have questions about this Privacy Policy or our data practices in the context of AI research, please contact us at:
            </p>
            <a 
              href="mailto:privacy@blubridge.com"
              style={{
                display: 'inline-block',
                marginTop: '12px',
                fontSize: '15px',
                color: '#0B1F3B',
                fontWeight: '500',
                textDecoration: 'none',
                borderBottom: '1px solid #0B1F3B',
                paddingBottom: '2px',
                transition: 'color 150ms ease-out'
              }}
            >
              privacy@blubridge.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
