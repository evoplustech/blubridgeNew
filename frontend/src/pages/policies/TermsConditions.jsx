import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const TermsConditions = () => {
  useDocumentTitle('Terms & Conditions | BluBridge');

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
            Terms and Conditions
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
            Welcome to BluBridge. These Terms and Conditions ("Terms") govern your access to and use of our website, research platforms, publications, and collaborative environments (collectively, the "Platform"). By accessing or using the Platform, you agree to be bound by these Terms.
          </p>

          {/* Section 1 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              1. Acceptance of Terms
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '12px'
            }}>
              By using our Platform, you confirm that you have read, understood, and agree to these Terms and our Privacy Policy. If you do not agree, you must not access or use the Platform.
            </p>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              We may update these Terms from time to time. Continued use of the Platform after changes are posted constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              2. Scope of the Platform
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '16px'
            }}>
              BluBridge operates as an AI research organization focused on advancing knowledge in artificial intelligence, large language models, and related fields. Our Platform supports activities such as:
            </p>
            <ul style={{
              paddingLeft: '24px',
              marginBottom: '16px'
            }}>
              {[
                'Publishing and sharing AI research and technical material',
                'Facilitating academic and industry collaboration',
                'Providing access to research portals, documentation, and tools',
                'Hosting events, workshops, and research programs',
                'Enabling communication between researchers, contributors, and partners'
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
              The Platform is intended for research, educational, and collaborative purposes only.
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
              3. Account Registration
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '16px'
            }}>
              Certain areas of the Platform may require account registration. By creating an account, you agree to:
            </p>
            <ul style={{
              paddingLeft: '24px',
              marginBottom: '16px'
            }}>
              {[
                'Provide accurate and complete information',
                'Keep your account details up to date',
                'Safeguard your login credentials',
                'Accept responsibility for all activity under your account',
                'Notify us immediately of any unauthorized access or use'
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
              You are responsible for ensuring that your use of the Platform complies with these Terms.
            </p>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              4. Acceptable Use
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '16px'
            }}>
              You agree to use the Platform in a lawful, responsible, and ethical manner. You must not:
            </p>
            <ul style={{
              paddingLeft: '24px'
            }}>
              {[
                'Violate any applicable laws or regulations',
                'Infringe the intellectual property or rights of others',
                'Upload malicious code, harmful content, or misleading material',
                'Attempt to gain unauthorized access to any part of the Platform',
                'Disrupt or interfere with the integrity, security, or operation of our systems',
                'Misrepresent research, data, or findings',
                'Engage in activities that could harm BluBridge, its researchers, or collaborators'
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

          {/* Section 5 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              5. Research Contributions
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '16px'
            }}>
              If you submit research material, feedback, or other content to the Platform:
            </p>
            <ul style={{
              paddingLeft: '24px',
              marginBottom: '16px'
            }}>
              {[
                'You retain ownership of your original work',
                'You grant BluBridge a non-exclusive, limited license to host, display, and distribute the content solely for research, educational, and collaborative purposes',
                'You represent that you have the right to submit such content and that it does not violate any third-party rights'
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
              BluBridge does not claim ownership over your research.
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
              6. Intellectual Property
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '12px'
            }}>
              All content on the Platform, including text, graphics, design elements, and proprietary research frameworks created by BluBridge, are owned by BluBridge or its licensors and are protected under applicable intellectual property laws.
            </p>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              You may not reproduce, distribute, or exploit such content outside permitted research and educational use without prior written consent.
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
              7. Limitation of Liability
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '12px'
            }}>
              To the fullest extent permitted by law, BluBridge shall not be liable for any indirect, incidental, special, or consequential damages, including loss of data, reputation, or research opportunity, arising from or related to your use of the Platform.
            </p>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              Our total liability for any claim related to these Terms or the Platform shall be limited to the extent permitted by applicable law.
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
              8. Disclaimer
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '12px'
            }}>
              The Platform is provided "as is" and "as available" for research and informational purposes. We make no warranties, express or implied, regarding accuracy, reliability, or suitability for any specific research outcome.
            </p>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              We do not guarantee uninterrupted access, error-free operation, or the completeness of any research material.
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
              9. Indemnification
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '16px'
            }}>
              You agree to indemnify and hold harmless BluBridge, its officers, researchers, and collaborators from any claims, losses, or damages arising from:
            </p>
            <ul style={{
              paddingLeft: '24px'
            }}>
              {[
                'Your misuse of the Platform',
                'Your violation of these Terms',
                'Your submission of content that infringes third-party rights'
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

          {/* Section 10 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              10. Termination
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8',
              marginBottom: '12px'
            }}>
              We may suspend or terminate your access to the Platform at any time if you breach these Terms or misuse the Platform. Upon termination, your right to access the Platform will immediately cease.
            </p>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              You may request account closure at any time. Data handling after termination will follow our Privacy Policy and data retention practices.
            </p>
          </section>

          {/* Section 11 */}
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              11. Governing Law
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              These Terms are governed by and construed in accordance with the laws of Norway, without regard to conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Norway.
            </p>
          </section>

          {/* Section 12 */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#0B1F3B',
              marginBottom: '16px'
            }}>
              12. Severability
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. The affected provision will be modified only to the extent necessary to make it enforceable.
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
              If you have questions about these Terms or our research practices, please contact us at:
            </p>
            <a 
              href="mailto:legal@blubridge.com"
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
              legal@blubridge.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
