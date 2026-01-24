import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const PrivacyPolicy = () => {
  useDocumentTitle('Privacy Policy | BluBridge');

  const sectionStyle = {
    marginBottom: '32px'
  };

  const headingStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#0B1F3B',
    marginBottom: '16px',
    marginTop: '32px'
  };

  const paragraphStyle = {
    fontSize: '15px',
    color: '#4a5568',
    lineHeight: '1.8',
    marginBottom: '16px',
    textAlign: 'justify'
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: 'rgb(243, 241, 233)',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}
    >
      <div style={{
        maxWidth: '1261px',
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
            marginBottom: '32px',
            letterSpacing: '-0.02em'
          }}>
            Privacy Policy – Blubridge Technologies Private Limited
          </h1>

          {/* Introduction */}
          <p style={paragraphStyle}>
            This Privacy Policy governs the manner in which Blubridge Technologies Private Limited ("Blubridge", "we", "our", or "us"), a company incorporated under the laws of India, collects, uses, stores, processes, and protects information in connection with your access to and use of our websites, platforms, research interfaces, developer tools, experimental systems, APIs, products, and services (collectively, the "Services"). This Policy applies to all individuals who visit, access, or interact with our Services, whether as visitors, researchers, collaborators, customers, partners, or users ("you" or "User").
          </p>

          <p style={paragraphStyle}>
            Blubridge is an AI research–driven organization focused on building, evaluating, and advancing foundational and applied artificial intelligence systems. Our work involves research experimentation, model training, evaluation, deployment frameworks, and supporting tools. The nature of these activities requires us to handle both personal information and technical data responsibly, with a strong emphasis on confidentiality, integrity, and lawful processing. By accessing or using our Services, you acknowledge that you have read, understood, and agreed to the practices described in this Privacy Policy. If you do not agree with this Policy, you should discontinue use of the Services.
          </p>

          <p style={paragraphStyle}>
            We may update this Privacy Policy from time to time to reflect changes in law, technology, or our practices. Any revisions will become effective upon publication. Continued use of our Services after such updates constitutes your acceptance of the revised Policy.
          </p>

          {/* Scope and Objectives */}
          <h2 style={headingStyle}>Scope and Objectives</h2>
          <p style={paragraphStyle}>
            The objective of this Privacy Policy is to clearly describe the categories of information we collect, the purposes for which such information is processed, the manner in which it is handled, and the rights available to you under applicable law. This Policy applies to information collected directly from you, automatically through your interaction with our Services, or from lawful third-party sources. It covers both personal data and certain technical or operational data that may arise in the context of AI research and system usage.
          </p>
          <p style={paragraphStyle}>
            Depending on the nature of your engagement with Blubridge—such as a website visitor, research collaborator, enterprise customer, or developer—we may provide supplemental notices or contractual data protection terms. This Policy operates as the baseline framework governing our data practices.
          </p>

          {/* Information We Collect */}
          <h2 style={headingStyle}>Information We Collect</h2>
          <p style={paragraphStyle}>
            We collect information that is necessary to operate, secure, improve, and advance our Services and research. Some information is provided directly by you, such as when you create an account, contact us, participate in research programs, request support, or communicate with us. This may include your name, email address, organization, role, contact details, geographic location, and any other information you choose to provide.
          </p>
          <p style={paragraphStyle}>
            When you interact with our platforms or tools, we may collect content that you submit, including prompts, inputs, uploaded files, configuration data, logs, and outputs generated by our systems. In research and development contexts, this may include experimental datasets, evaluation artifacts, or technical feedback. We process such information solely to provide and improve the Services, conduct research, ensure safety, and maintain system reliability.
          </p>
          <p style={paragraphStyle}>
            We also collect certain information automatically when you access our Services. This may include your IP address, browser type, device information, operating system, referral URLs, access timestamps, usage patterns, and diagnostic logs. Such data helps us understand how our Services are used, identify errors, prevent abuse, and improve performance.
          </p>
          <p style={paragraphStyle}>
            Where permitted by your device and settings, we may receive limited technical signals such as approximate location derived from IP address, device identifiers, or application-level telemetry. We do not collect contact lists or unrelated personal content stored on your device.
          </p>
          <p style={paragraphStyle}>
            We may receive information from third parties in limited circumstances, such as when a partner refers you, when you authenticate through an external identity provider, or when public information is relevant to a professional engagement. We do not purchase personal data, and we do not engage in data brokerage activities.
          </p>

          {/* Purpose and Use of Information */}
          <h2 style={headingStyle}>Purpose and Use of Information</h2>
          <p style={paragraphStyle}>
            We process information to operate and enhance our Services, conduct AI research responsibly, and fulfill our obligations to users and partners. This includes enabling access, maintaining accounts, providing support, responding to inquiries, and delivering requested functionality. We use information to understand system usage, identify performance issues, and improve model quality, reliability, and safety.
          </p>
          <p style={paragraphStyle}>
            In the context of research and development, information may be used to train, evaluate, fine-tune, or benchmark models, to test new features, and to study system behavior. Where feasible and appropriate, we de-identify or aggregate data before using it for analytical or research purposes.
          </p>
          <p style={paragraphStyle}>
            We may use your contact information to communicate with you about service updates, security notices, research participation, support responses, and relevant offerings. You may opt out of non-essential communications at any time, though operational and security communications may still be sent.
          </p>
          <p style={paragraphStyle}>
            We process information to comply with legal obligations, enforce our terms, protect our rights and property, prevent fraud or misuse, and ensure the safety of our systems and users. We do not sell personal data and do not use personal information for third-party advertising.
          </p>

          {/* Legal Basis for Processing */}
          <h2 style={headingStyle}>Legal Basis for Processing</h2>
          <p style={paragraphStyle}>
            We process personal data in accordance with applicable law. In most cases, processing is necessary to perform a contract with you, to provide the Services you request, or to pursue our legitimate interests in operating and improving our research and systems in a responsible manner. In certain contexts, we rely on your consent, particularly where optional features or research participation are involved. You may withdraw consent at any time, subject to legal and operational constraints.
          </p>

          {/* Sharing of Information */}
          <h2 style={headingStyle}>Sharing of Information</h2>
          <p style={paragraphStyle}>
            We share information only as necessary to operate our Services and conduct our research. This may include sharing with trusted service providers who assist us with infrastructure, security, analytics, customer support, or operational tooling. Such providers are contractually bound to process data only on our instructions and to maintain appropriate security safeguards.
          </p>
          <p style={paragraphStyle}>
            Within Blubridge, access to information is limited to personnel who require it for legitimate purposes. We may share de-identified or aggregated data with research partners for collaborative or benchmarking purposes.
          </p>
          <p style={paragraphStyle}>
            We may disclose information if required by law, legal process, or governmental request, or where necessary to protect our rights, users, or the public. In the event of a merger, acquisition, or restructuring, information may be transferred as part of the transaction, subject to continued protection under this Policy.
          </p>
          <p style={paragraphStyle}>
            Our Services may contain links to third-party websites or integrations. We are not responsible for the privacy practices of such third parties, and you should review their policies before sharing information.
          </p>

          {/* Your Rights and Choices */}
          <h2 style={headingStyle}>Your Rights and Choices</h2>
          <p style={paragraphStyle}>
            Subject to applicable law, you have the right to access, correct, or update your personal information. You may request deletion, restriction, or portability of your data, and you may object to certain processing activities. You may withdraw consent where processing is based on consent.
          </p>
          <p style={paragraphStyle}>
            To exercise your rights, you may contact us through the channels provided in this Policy. We will respond in accordance with applicable legal timelines. Please note that certain requests may affect your ability to use the Services.
          </p>

          {/* Data Retention */}
          <h2 style={headingStyle}>Data Retention</h2>
          <p style={paragraphStyle}>
            Blubridge retains personal data and operational records only for as long as they are required to fulfill the purposes for which they were collected. This includes providing access to our Services, maintaining system integrity, complying with legal obligations, resolving disputes, enforcing agreements, and supporting audit and security requirements. Account-related information is retained for the duration of your relationship with us and for a reasonable period thereafter, as required under applicable Indian laws, including tax, corporate, and information technology regulations.
          </p>
          <p style={paragraphStyle}>
            Research and system data, such as logs, prompts, outputs, telemetry, and evaluation artifacts, may be retained for longer periods in de-identified or aggregated form to enable longitudinal analysis, model safety assessments, reproducibility of experiments, and continuous improvement of our systems. Where data is no longer required in identifiable form, we apply anonymization, pseudonymization, or irreversible aggregation techniques consistent with industry practices.
          </p>
          <p style={paragraphStyle}>
            When retention periods expire, data is securely deleted from active systems and, within defined operational cycles, from backups. In certain circumstances, we may retain limited information to comply with statutory obligations, prevent abuse, or preserve evidence for legal proceedings. All retention practices are aligned with the principles of data minimization and purpose limitation under Indian law and internationally recognized data protection frameworks.
          </p>

          {/* Security Measures */}
          <h2 style={headingStyle}>Security Measures</h2>
          <p style={paragraphStyle}>
            Blubridge implements layered administrative, technical, and physical safeguards designed to protect information against unauthorized access, loss, alteration, or disclosure. Our infrastructure is hosted in access-controlled environments, and internal systems are segmented based on role and operational necessity. Access to personal and research data is granted strictly on a need-to-know basis and is subject to authentication, authorization, and audit controls.
          </p>
          <p style={paragraphStyle}>
            Data in transit is protected using industry-standard encryption protocols, including Transport Layer Security (TLS). Sensitive data at rest is encrypted using cryptographic standards appropriate for its classification. We employ continuous monitoring, vulnerability assessment, and incident response procedures consistent with widely adopted security frameworks used in cloud-native and research environments.
          </p>
          <p style={paragraphStyle}>
            While we take reasonable and proportionate measures to protect information, no system can guarantee absolute security. In the event of a confirmed security incident that poses a material risk to users, we will take prompt steps to contain and remediate the issue and will notify affected individuals and authorities as required under applicable law, including the Information Technology Act, 2000 and related rules.
          </p>

          {/* International Transfers */}
          <h2 style={headingStyle}>International Transfers</h2>
          <p style={paragraphStyle}>
            Blubridge operates and collaborates globally. As a result, information may be processed or stored in jurisdictions outside India, including locations where our infrastructure providers, research partners, or operational teams are based. Where personal data is transferred across borders, we ensure that such transfers are carried out in accordance with applicable law and are subject to appropriate contractual and technical safeguards.
          </p>
          <p style={paragraphStyle}>
            These safeguards may include data protection agreements, standard contractual clauses, and organizational controls designed to ensure that information receives a level of protection consistent with this Privacy Policy and with internationally recognized data protection principles. By using our Services, you acknowledge that such cross-border transfers may occur.
          </p>

          {/* Children's Information */}
          <h2 style={headingStyle}>Children's Information</h2>
          <p style={paragraphStyle}>
            Our Services are not designed for, nor directed toward, individuals under the age of thirteen. We do not knowingly collect personal information from children. If we become aware that personal data has been collected from a child in violation of applicable law, we will take steps to delete such information promptly.
          </p>
          <p style={paragraphStyle}>
            Where our Services are accessed by individuals between the ages of thirteen and eighteen, such use must occur under the guidance and supervision of a parent or legal guardian. We encourage guardians to be aware of the digital activities of minors and to ensure that any engagement with AI systems is appropriate and lawful.
          </p>

          {/* Cookies and Similar Technologies */}
          <h2 style={headingStyle}>Cookies and Similar Technologies</h2>
          <p style={paragraphStyle}>
            We use cookies and similar technologies to enable essential functionality, maintain session integrity, remember preferences, and understand how our Services are used. These technologies help us improve performance, diagnose issues, and design better user experiences. We primarily rely on first-party cookies and avoid intrusive third-party tracking mechanisms.
          </p>
          <p style={paragraphStyle}>
            You may control or disable cookies through your browser or device settings. Doing so may affect the availability or functionality of certain features. Even where cookies are disabled, we may continue to receive limited technical information necessary to ensure the security and reliability of our Services.
          </p>

          {/* Updates to this Policy */}
          <h2 style={headingStyle}>Updates to this Policy</h2>
          <p style={paragraphStyle}>
            We may revise this Privacy Policy periodically to reflect changes in our practices, technology, or legal obligations. Updated versions will be published on our website with an effective date. Where changes materially affect your rights or obligations, we will take reasonable steps to notify you through appropriate channels. Your continued use of the Services after such updates constitutes acceptance of the revised Policy.
          </p>

          {/* Governing Law and Jurisdiction */}
          <h2 style={headingStyle}>Governing Law and Jurisdiction</h2>
          <p style={paragraphStyle}>
            This Privacy Policy is governed by and construed in accordance with the laws of India. Any disputes, claims, or proceedings arising out of or relating to this Policy shall be subject to the exclusive jurisdiction of the competent courts located in India.
          </p>

          {/* Contact Information */}
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
              Contact Information
            </h2>
            <p style={paragraphStyle}>
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, you may contact us at:
            </p>
            <div style={{
              marginTop: '16px',
              padding: '20px',
              backgroundColor: '#f8f7f4',
              borderRadius: '8px',
              border: '1px solid #e8e6e0'
            }}>
              <p style={{
                fontSize: '15px',
                color: '#0B1F3B',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Blubridge Technologies Private Limited
              </p>
              <p style={{
                fontSize: '15px',
                color: '#4a5568',
                margin: 0
              }}>
                Email: <a 
                  href="mailto:privacy@blubridge.com"
                  style={{
                    color: '#0B1F3B',
                    fontWeight: '500',
                    textDecoration: 'none',
                    borderBottom: '1px solid #0B1F3B'
                  }}
                >
                  privacy@blubridge.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
