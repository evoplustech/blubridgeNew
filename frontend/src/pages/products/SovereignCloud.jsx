import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Check, Shield, Lock, MapPin, FileCheck } from 'lucide-react';

const SovereignCloud = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F3D] via-[#0E2744] to-[#0A1F3D]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#0066FF] rounded-full filter blur-[150px]" />
          </div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-[#0066FF]/20 rounded-full text-[#0066FF] text-sm font-semibold mb-6">SOVEREIGN AI INFRASTRUCTURE</div>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Complete data control for regulated industries
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl">
              Deploy AI workloads with guaranteed jurisdictional control, compliance-first architecture, and enterprise-grade security. Your data never leaves your designated regions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button className="bg-white text-[#0A1F3D] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                  Discuss Requirements
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Compliance Documentation →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Pillars */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Built for Compliance and Control</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-10 h-10" />,
                title: 'Data Sovereignty',
                description: 'All data, models, and processing remain within your specified jurisdiction with cryptographic guarantees.'
              },
              {
                icon: <Lock className="w-10 h-10" />,
                title: 'Zero Foreign Access',
                description: 'Infrastructure immune to extraterritorial data requests. Complete operational independence.'
              },
              {
                icon: <MapPin className="w-10 h-10" />,
                title: 'Regional Isolation',
                description: 'Physically separated compute zones with dedicated networking and isolated control planes.'
              },
              {
                icon: <FileCheck className="w-10 h-10" />,
                title: 'Audit Ready',
                description: 'Built-in compliance frameworks for GDPR, DORA, NIS2, and sector-specific regulations.'
              }
            ].map((pillar, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:border-[#0066FF]/50 transition-all">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center text-[#0066FF] mb-4">{pillar.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                  <p className="text-white/70 text-sm">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Details */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Purpose-Built Architecture</h2>
              <p className="text-white/70 text-lg mb-8">
                BluBrg Sovereign Cloud delivers the performance of hyperscale infrastructure with the control and compliance guarantees required by regulated enterprises.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: 'Jurisdictional Boundaries',
                    items: [
                      'Dedicated regional availability zones',
                      'Isolated networking with no cross-border data flow',
                      'Local key management and encryption',
                      'Region-specific operations teams'
                    ]
                  },
                  {
                    title: 'Compliance Framework',
                    items: [
                      'Pre-certified for EU Cloud Code of Conduct',
                      'SOC 2 Type II, ISO 27001, ISO 27018',
                      'GDPR-compliant by design',
                      'Continuous audit logging and reporting'
                    ]
                  }
                ].map((section, i) => (
                  <div key={i}>
                    <h3 className="text-xl font-semibold text-white mb-3">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-center space-x-3 text-white/70">
                          <Check className="w-5 h-5 text-[#0066FF] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Technical Guarantees</h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Data Residency', value: 'Guaranteed' },
                      { label: 'Encryption', value: 'AES-256 at rest, TLS 1.3 in transit' },
                      { label: 'Key Management', value: 'Customer-controlled HSM' },
                      { label: 'Network Isolation', value: 'VXLAN with microsegmentation' },
                      { label: 'Backup Location', value: 'Same jurisdiction only' },
                      { label: 'Data Deletion', value: 'Cryptographic erasure' }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0">
                        <span className="text-white/70">{item.label}</span>
                        <span className="text-white font-semibold text-sm">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">Trusted by Regulated Industries</h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Organizations handling sensitive data trust BluBrg Sovereign Cloud for their most critical AI workloads.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                industry: 'Government & Defense',
                challenges: 'National security requirements, classified data handling, strict access controls',
                solution: 'Air-gapped deployments with sovereign operations, dedicated security clearance requirements, and full audit trails.'
              },
              {
                industry: 'Financial Services',
                challenges: 'DORA compliance, transaction data protection, multi-jurisdiction operations',
                solution: 'Region-locked processing for payment data, automated compliance reporting, and cross-border data flow controls.'
              },
              {
                industry: 'Healthcare',
                challenges: 'Patient privacy, medical record protection, research data security',
                solution: 'HIPAA and GDPR-aligned infrastructure, anonymized processing capabilities, and granular access controls.'
              }
            ].map((useCase, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-3">{useCase.industry}</h3>
                  <div className="mb-4">
                    <div className="text-[#0066FF] text-sm font-semibold mb-2">Challenges</div>
                    <p className="text-white/60 text-sm">{useCase.challenges}</p>
                  </div>
                  <div>
                    <div className="text-[#0066FF] text-sm font-semibold mb-2">Our Solution</div>
                    <p className="text-white/70 text-sm">{useCase.solution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Levels */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Enterprise Service Levels</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { metric: '99.99%', label: 'Infrastructure Uptime SLA' },
                { metric: '< 4 hours', label: 'Critical Issue Response' },
                { metric: '24/7/365', label: 'Dedicated Support Team' },
                { metric: '100%', label: 'Data Residency Guarantee' }
              ].map((item, i) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-[#0066FF] mb-2">{item.metric}</div>
                    <div className="text-white/70">{item.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0066FF] to-[#0052CC]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Deploy AI with complete sovereignty
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a consultation to discuss your compliance requirements and infrastructure needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-[#0066FF] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                Request Consultation
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Download Compliance Brief
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SovereignCloud;