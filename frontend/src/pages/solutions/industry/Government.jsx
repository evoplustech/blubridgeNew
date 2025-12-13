import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { ArrowRight, Shield, Lock, Globe, AlertTriangle, FileCheck, Database } from 'lucide-react';

const Government = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero - Banner Style */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F3D] via-[#1a3a5c] to-[#0A1F3D]" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(45deg, #0066FF 25%, transparent 25%, transparent 75%, #0066FF 75%), linear-gradient(45deg, #0066FF 25%, transparent 25%, transparent 75%, #0066FF 75%)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 30px 30px' }} />
          </div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full px-6 py-3 mb-8">
              <Shield className="w-5 h-5 text-[#0066FF]" />
              <span className="text-[#0066FF] font-semibold">Government & Public Sector</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.05]">
              Secure, sovereign AI infrastructure for public services
            </h1>
            <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-3xl">
              Enable digital transformation in government services, defense, and public administration with AI infrastructure that meets the highest security, compliance, and data sovereignty requirements.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products/sovereign-cloud">
                <Button size="lg" className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-10 py-7 text-lg">
                  Explore Sovereign Cloud <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
                  Contact Government Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Government Requirements */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Built for government requirements</h2>
            <p className="text-lg text-white/60">Meeting the unique security, compliance, and operational demands of public sector organizations.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="w-10 h-10" />,
                title: 'Data Sovereignty',
                desc: 'Full control over data location and processing. Deploy in your jurisdiction with complete transparency and no foreign access.',
                badge: 'Critical'
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: 'Security Clearance',
                desc: 'Infrastructure certified for classified workloads. Multi-level security architectures for defense and intelligence applications.',
                badge: 'Certified'
              },
              {
                icon: <FileCheck className="w-10 h-10" />,
                title: 'Compliance',
                desc: 'Meet FedRAMP, IL5, GDPR, and regional regulatory requirements. Comprehensive audit trails and reporting.',
                badge: 'Compliant'
              },
              {
                icon: <Database className="w-10 h-10" />,
                title: 'Air-Gapped Options',
                desc: 'Isolated infrastructure for sensitive operations. On-premises or dedicated private cloud deployments available.',
                badge: 'Available'
              },
              {
                icon: <Globe className="w-10 h-10" />,
                title: 'Interoperability',
                desc: 'Integrate with existing government systems and legacy infrastructure. API-first architecture for seamless connectivity.',
                badge: 'Compatible'
              },
              {
                icon: <AlertTriangle className="w-10 h-10" />,
                title: 'Disaster Recovery',
                desc: 'Mission-critical uptime with geographic redundancy. Automated failover and backup systems.',
                badge: '99.99% SLA'
              }
            ].map((item, i) => (
              <Card key={i} className="bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-[#0066FF]/50 transition-all group">
                <CardContent className="p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-[#0066FF]/10 rounded-xl flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF]/20 transition-all">
                      {item.icon}
                    </div>
                    <span className="bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold px-3 py-1 rounded-full">{item.badge}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases - Full Width Cards */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16">AI applications in government</h2>

          <div className="space-y-6">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'National Security & Defense',
                desc: 'Deploy AI for threat detection, intelligence analysis, cybersecurity, and strategic planning. Process classified data with military-grade security.',
                applications: ['Threat intelligence analysis', 'Autonomous systems', 'Cybersecurity defense', 'Satellite imagery analysis'],
                color: 'from-red-500/10'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Citizen Services & Digital Government',
                desc: 'Transform public services with AI-powered chatbots, document processing, and personalized citizen portals. Reduce wait times and improve satisfaction.',
                applications: ['AI citizen support', 'Document automation', 'Service personalization', 'Multi-language support'],
                color: 'from-blue-500/10'
              },
              {
                icon: <AlertTriangle className="w-8 h-8" />,
                title: 'Emergency Response & Public Safety',
                desc: 'Predict and respond to natural disasters, coordinate emergency services, and analyze crime patterns. AI-powered early warning systems save lives.',
                applications: ['Disaster prediction', 'Resource allocation', 'Crime pattern analysis', 'Emergency coordination'],
                color: 'from-orange-500/10'
              },
              {
                icon: <FileCheck className="w-8 h-8" />,
                title: 'Policy & Regulatory Analysis',
                desc: 'Use NLP to analyze legislation, predict policy impact, and streamline regulatory processes. Make data-driven decisions faster.',
                applications: ['Legislative analysis', 'Impact modeling', 'Compliance automation', 'Public sentiment analysis'],
                color: 'from-green-500/10'
              }
            ].map((useCase, i) => (
              <div key={i} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${useCase.color} to-transparent rounded-2xl`} />
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-10 hover:border-[#0066FF]/50 transition-all">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-[#0066FF]/10 rounded-xl flex items-center justify-center text-[#0066FF]">
                          {useCase.icon}
                        </div>
                        <h3 className="text-3xl font-bold text-white">{useCase.title}</h3>
                      </div>
                      <p className="text-white/70 text-lg leading-relaxed mb-6">{useCase.desc}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {useCase.applications.map((app, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#0066FF] rounded-full" />
                            <span className="text-white/80 text-sm">{app}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="hidden lg:block w-6 h-6 text-white/40 group-hover:text-[#0066FF] group-hover:translate-x-2 transition-all flex-shrink-0 mt-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Enterprise security for government</h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                BluBrg's infrastructure is built to government standards from the ground up. Every layer of the stack is hardened, audited, and certified for sensitive workloads.
              </p>
              <div className="space-y-6">
                {[
                  { cert: 'FedRAMP High', desc: 'Authorized for federal agencies' },
                  { cert: 'IL5 Classification', desc: 'Defense and intelligence ready' },
                  { cert: 'ISO 27001', desc: 'Information security certified' },
                  { cert: 'SOC 2 Type II', desc: 'Annual security audits' }
                ].map((item, i) => (
                  <div key={i} className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-xl p-6 hover:border-[#0066FF]/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-lg mb-1">{item.cert}</div>
                        <div className="text-white/60 text-sm">{item.desc}</div>
                      </div>
                      <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 flex-shrink-0">
                        <FileCheck className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0066FF]/10 to-transparent border-2 border-[#0066FF]/30 rounded-3xl p-12">
              <h3 className="text-2xl font-bold text-white mb-8">Deployment Options</h3>
              <div className="space-y-6">
                {[
                  {
                    option: 'Sovereign Cloud',
                    desc: 'Dedicated infrastructure in your jurisdiction',
                    availability: 'Available now'
                  },
                  {
                    option: 'On-Premises',
                    desc: 'Full control with local deployment',
                    availability: 'Available now'
                  },
                  {
                    option: 'Air-Gapped',
                    desc: 'Isolated environment for classified work',
                    availability: 'Custom deployment'
                  },
                  {
                    option: 'Hybrid',
                    desc: 'Mix of cloud and on-prem resources',
                    availability: 'Available now'
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-white text-lg">{item.option}</h4>
                      <span className="bg-[#0066FF]/20 text-[#0066FF] text-xs font-bold px-3 py-1 rounded-full">{item.availability}</span>
                    </div>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-[#0066FF]" />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            </div>
            <div className="relative p-16 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to modernize government services?</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join government agencies worldwide using BluBrg's secure, sovereign AI infrastructure to transform public services.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-white hover:bg-white/90 text-[#0066FF] px-10 py-7 text-lg font-bold">
                    Schedule Consultation
                  </Button>
                </Link>
                <Link to="/products/sovereign-cloud">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-7 text-lg">
                    View Sovereign Cloud
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Government;