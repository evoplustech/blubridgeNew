import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const TermsConditions = () => {
  useDocumentTitle('Terms & Conditions | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7]">      {/* Content Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            {/* Page Title */}
            <h1 className="text-4xl md:text-5xl font-light text-[#0B1F3B] mb-12">Terms and Conditions</h1>

            {/* Last Updated */}
            <p className="text-[#243447] text-sm mb-12">Last updated: December 2024</p>

            {/* Introduction */}
            <div className="space-y-6 mb-12">
              <p className="text-[#243447] text-base leading-relaxed">
                Welcome to BluBridge. These Terms and Conditions ("Terms") govern your use of our website, products, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-[#0B1F3B] mb-6">1. Acceptance of Terms</h2>
              <div className="space-y-4">
                <p className="text-[#243447] text-base leading-relaxed">
                  By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use our Services.
                </p>
                <p className="text-[#243447] text-base leading-relaxed">
                  We reserve the right to modify these Terms at any time. Your continued use of the Services following any changes constitutes acceptance of those changes.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-[#0B1F3B] mb-6">2. Services Description</h2>
              <div className="space-y-4">
                <p className="text-[#243447] text-base leading-relaxed">
                  BluBridge provides cloud computing infrastructure, GPU resources, and related services for artificial intelligence and machine learning workloads. Our Services include, but are not limited to:
                </p>
                <ul className="list-disc list-inside text-[#243447] text-base leading-relaxed space-y-2 ml-4">
                  <li>GPU compute resources (nodes, clusters)</li>
                  <li>Serverless inference endpoints</li>
                  <li>Model training infrastructure</li>
                  <li>AI marketplace and tools</li>
                  <li>Data storage and management</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-[#0B1F3B] mb-6">3. Account Registration</h2>
              <div className="space-y-4">
                <p className="text-[#243447] text-base leading-relaxed">
                  To access certain features of our Services, you may be required to create an account. You agree to:
                </p>
                <ul className="list-disc list-inside text-[#243447] text-base leading-relaxed space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-[#0B1F3B] mb-6">4. Acceptable Use</h2>
              <div className="space-y-4">
                <p className="text-[#243447] text-base leading-relaxed">
                  You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc list-inside text-[#243447] text-base leading-relaxed space-y-2 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the intellectual property rights of others</li>
                  <li>Transmit malware, viruses, or other harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems or networks</li>
                  <li>Interfere with or disrupt the integrity of our Services</li>
                  <li>Use our Services for cryptocurrency mining without authorization</li>
                  <li>Engage in any activity that could harm BluBridge or its users</li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-[#0B1F3B] mb-6">5. Payment Terms</h2>
              <div className="space-y-4">
                <p className="text-[#243447] text-base leading-relaxed">
                  Certain Services may require payment. You agree to pay all fees and charges associated with your account on a timely basis. Payment terms include:
                </p>
                <ul className="list-disc list-inside text-[#243447] text-base leading-relaxed space-y-2 ml-4">
                  <li>All fees are quoted and payable in the currency specified</li>
                  <li>Fees are non-refundable unless otherwise specified</li>
                  <li>We may change our pricing with reasonable notice</li>
                  <li>You are responsible for all taxes associated with your use of the Services</li>
                  <li>Failure to pay may result in suspension or termination of your account</li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-[#0B1F3B] mb-6">6. Intellectual Property</h2>
              <div className="space-y-4">
                <p className="text-[#243447] text-base leading-relaxed">
                  All content, features, and functionality of our Services, including but not limited to text, graphics, logos, and software, are owned by BluBridge or its licensors and are protected by intellectual property laws.
                </p>
                <p className="text-[#243447] text-base leading-relaxed">
                  You retain ownership of any content you upload or create using our Services. By uploading content, you grant us a limited license to use, store, and process that content solely for the purpose of providing the Services.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-[#0B1F3B] mb-6">7. Limitation of Liability</h2>
              <div className="space-y-4">
                <p className="text-[#243447] text-base leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, BluBridge SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES.
                </p>
                <p className="text-[#243447] text-base leading-relaxed">
                  Our total liability for any claims arising from these Terms or your use of the Services shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-[#0B1F3B] mb-6">8. Disclaimer of Warranties</h2>
              <div className="space-y-4">
                <p className="text-[#243447] text-base leading-relaxed">
                  THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="text-[#243447] text-base leading-relaxed">
                  We do not warrant that the Services will be uninterrupted, secure, or error-free, or that any defects will be corrected.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-[#0B1F3B] mb-6">9. Indemnification</h2>
              <div className="space-y-4">
                <p className="text-[#243447] text-base leading-relaxed">
                  You agree to indemnify, defend, and hold harmless BluBridge and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your use of the Services or violation of these Terms.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-[#0B1F3B] mb-6">10. Termination</h2>
              <div className="space-y-4">
                <p className="text-[#243447] text-base leading-relaxed">
                  We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Services will immediately cease.
                </p>
                <p className="text-[#243447] text-base leading-relaxed">
                  You may terminate your account at any time by contacting us. Upon termination, we may delete your data in accordance with our data retention policies.
                </p>
              </div>
            </div>

            {/* Section 11 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-[#0B1F3B] mb-6">11. Governing Law</h2>
              <div className="space-y-4">
                <p className="text-[#243447] text-base leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of Norway, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Services shall be subject to the exclusive jurisdiction of the courts of Norway.
                </p>
              </div>
            </div>

            {/* Section 12 */}
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-[#0B1F3B] mb-6">12. Severability</h2>
              <div className="space-y-4">
                <p className="text-[#243447] text-base leading-relaxed">
                  If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid or unenforceable provision shall be modified to the minimum extent necessary to make it valid and enforceable.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-16 pt-8 border-t border-[#D6DEC3]">
              <h2 className="text-xl font-medium text-[#0B1F3B] mb-4">Contact Us</h2>
              <p className="text-[#243447] text-base leading-relaxed">
                If you have any questions about these Terms, please contact us at{' '}
                <a href="mailto:legal@BluBridge.com" className="text-[#328CC1] hover:text-blue-300 transition-colors">legal@BluBridge.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
