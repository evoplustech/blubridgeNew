import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const PrivacyPolicy = () => {
  useDocumentTitle('Privacy Policy | BluBrg');

  return (
    <div className="min-h-screen bg-[#0a0a0f]">      {/* Content Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            {/* Page Title */}
            <h1 className="text-4xl md:text-5xl font-light text-white mb-12">Privacy Policy</h1>

            {/* Last Updated */}
            <p className="text-gray-400 text-sm mb-12">Last updated: December 2024</p>

            {/* Introduction */}
            <div className="space-y-6 mb-12">
              <p className="text-gray-300 text-base leading-relaxed">
                At BluBrg ("we", "us", or "our"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-white mb-6">1. Information We Collect</h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base leading-relaxed">
                  We may collect the following types of information:
                </p>
                <h3 className="text-lg font-medium text-white mt-6 mb-3">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-300 text-base leading-relaxed space-y-2 ml-4">
                  <li>Name and contact information (email address, phone number, postal address)</li>
                  <li>Account credentials and authentication data</li>
                  <li>Payment and billing information</li>
                  <li>Professional information (company name, job title)</li>
                </ul>
                <h3 className="text-lg font-medium text-white mt-6 mb-3">Technical Information</h3>
                <ul className="list-disc list-inside text-gray-300 text-base leading-relaxed space-y-2 ml-4">
                  <li>IP address and device identifiers</li>
                  <li>Browser type and operating system</li>
                  <li>Usage data and interaction with our services</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-white mb-6">2. How We Use Your Information</h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base leading-relaxed">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc list-inside text-gray-300 text-base leading-relaxed space-y-2 ml-4">
                  <li>To provide, maintain, and improve our services</li>
                  <li>To process transactions and send related information</li>
                  <li>To send promotional communications (with your consent)</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To detect, prevent, and address technical issues and security threats</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-white mb-6">3. Legal Basis for Processing</h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base leading-relaxed">
                  We process your personal data based on one or more of the following legal grounds:
                </p>
                <ul className="list-disc list-inside text-gray-300 text-base leading-relaxed space-y-2 ml-4">
                  <li><strong className="text-white">Contract:</strong> Processing necessary for the performance of a contract with you</li>
                  <li><strong className="text-white">Consent:</strong> Where you have given explicit consent to the processing</li>
                  <li><strong className="text-white">Legitimate Interests:</strong> Processing necessary for our legitimate business interests</li>
                  <li><strong className="text-white">Legal Obligation:</strong> Processing necessary to comply with applicable laws</li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-white mb-6">4. Data Sharing and Disclosure</h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base leading-relaxed">
                  We may share your information with:
                </p>
                <ul className="list-disc list-inside text-gray-300 text-base leading-relaxed space-y-2 ml-4">
                  <li><strong className="text-white">Service Providers:</strong> Third-party vendors who assist in providing our services</li>
                  <li><strong className="text-white">Business Partners:</strong> Partners with whom we jointly offer products or services</li>
                  <li><strong className="text-white">Legal Authorities:</strong> When required by law or to protect our rights</li>
                  <li><strong className="text-white">Corporate Transactions:</strong> In connection with mergers, acquisitions, or asset sales</li>
                </ul>
                <p className="text-gray-300 text-base leading-relaxed mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-white mb-6">5. Data Retention</h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. The retention period may vary depending on the context of the processing and our legal obligations.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-white mb-6">6. Your Rights</h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base leading-relaxed">
                  Depending on your location, you may have the following rights regarding your personal data:
                </p>
                <ul className="list-disc list-inside text-gray-300 text-base leading-relaxed space-y-2 ml-4">
                  <li><strong className="text-white">Access:</strong> Request access to your personal data</li>
                  <li><strong className="text-white">Rectification:</strong> Request correction of inaccurate data</li>
                  <li><strong className="text-white">Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong className="text-white">Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong className="text-white">Objection:</strong> Object to certain processing of your data</li>
                  <li><strong className="text-white">Restriction:</strong> Request restriction of processing</li>
                </ul>
                <p className="text-gray-300 text-base leading-relaxed mt-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-white mb-6">7. Data Security</h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-white mb-6">8. International Transfers</h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection laws.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-white mb-6">9. Cookies and Tracking</h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base leading-relaxed">
                  We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookie preferences through your browser settings. For more information, please see our Cookie Policy.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-white mb-6">10. Changes to This Policy</h2>
              <div className="space-y-4">
                <p className="text-gray-300 text-base leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <h2 className="text-xl font-medium text-white mb-4">Contact Us</h2>
              <p className="text-gray-300 text-base leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at{' '}
                <a href="mailto:privacy@blubrg.com" className="text-blue-400 hover:text-blue-300 transition-colors">privacy@blubrg.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
