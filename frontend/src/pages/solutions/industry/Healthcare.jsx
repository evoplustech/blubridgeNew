import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { ArrowRight, HeartPulse, Brain, Shield, Activity, Microscope, Users } from 'lucide-react';

const Healthcare = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero - Medical Gradient Design */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F3D] via-[#0e2642] to-[#0A1F3D]" />
          <div className="absolute top-1/4 left-1/3 w-[800px] h-[800px] bg-cyan-500/15 rounded-full filter blur-[200px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-teal-500/15 rounded-full filter blur-[200px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-6 py-3 mb-8">
              <HeartPulse className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-semibold">Healthcare & Life Sciences</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.05]">
              AI infrastructure for the future of medicine
            </h1>
            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              From medical imaging and drug discovery to clinical decision support and personalized treatment, BluBrg provides secure, HIPAA-compliant AI infrastructure that's transforming healthcare delivery and research.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-20">
              <Link to="/products/training">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-7 text-lg">
                  Explore Solutions <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
                  Contact Healthcare Team
                </Button>
              </Link>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { value: '99.95%', label: 'Diagnostic accuracy' },
                { value: '60%', label: 'Faster drug discovery' },
                { value: 'HIPAA', label: 'Compliant infrastructure' },
                { value: '24/7', label: 'Clinical AI availability' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Challenges */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Challenges facing healthcare today</h2>
            <p className="text-lg text-white/60">AI is addressing critical challenges in healthcare delivery, research, and patient outcomes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="w-10 h-10" />,
                title: 'Diagnostic Accuracy',
                desc: 'Medical errors cause 250,000+ deaths annually in the US. AI-assisted diagnosis reduces errors and catches conditions earlier.',
                stat: '3rd leading cause of death'
              },
              {
                icon: <Microscope className="w-10 h-10" />,
                title: 'Drug Development Speed',
                desc: 'Traditional drug discovery takes 10-15 years and costs $2.6B. AI accelerates every phase from target identification to clinical trials.',
                stat: '$2.6B per drug'
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: 'Healthcare Access',
                desc: 'Physician shortages and geographic barriers limit access. AI telemedicine and diagnostic tools democratize quality care.',
                stat: '120K physician shortage'
              }
            ].map((item, i) => (
              <Card key={i} className="bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-cyan-500/50 transition-all group">
                <CardContent className="p-10">
                  <div className="w-20 h-20 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-cyan-400 font-bold text-sm mb-4">{item.stat}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Use Cases - Medical Focus */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16">AI applications in healthcare</h2>

          <div className="space-y-12">
            {/* Medical Imaging */}
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-5 py-2 mb-6">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400 font-semibold text-sm">Radiology & Pathology</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Medical Imaging & Diagnostics</h3>
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  AI models analyze X-rays, CT scans, MRIs, and pathology slides with superhuman accuracy. Detect tumors, fractures, and abnormalities earlier than traditional methods. Computer vision algorithms trained on millions of medical images identify patterns invisible to the human eye.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: 'Cancer detection', value: '99.5% accuracy' },
                    { label: 'Diagnosis time', value: '90% reduction' },
                    { label: 'Early detection', value: '40% improvement' },
                    { label: 'Radiologist productivity', value: '3x increase' }
                  ].map((metric, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <div className="text-white font-semibold mb-1">{metric.label}</div>
                      <div className="text-cyan-400 font-bold text-lg">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-3xl p-10">
                  <h4 className="text-white font-bold text-xl mb-6">Imaging Modalities</h4>
                  <div className="space-y-4">
                    {[
                      'X-Ray & CT Scans',
                      'MRI Analysis',
                      'Ultrasound Imaging',
                      'Pathology Slides',
                      'Retinal Screening',
                      'Mammography'
                    ].map((modality, i) => (
                      <div key={i} className="flex items-center gap-3 text-white/80">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                        {modality}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Drug Discovery */}
            <div className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-3xl p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-5 py-2 mb-6">
                    <Microscope className="w-5 h-5 text-teal-400" />
                    <span className="text-teal-400 font-semibold text-sm">Pharmaceutical R&D</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6">AI-Powered Drug Discovery</h3>
                  <p className="text-white/70 text-lg leading-relaxed mb-6">
                    Accelerate drug development from years to months. AI models predict molecular interactions, identify drug candidates, optimize compounds, and simulate clinical trials. Machine learning analyzes millions of compounds to find promising treatments faster than traditional methods.
                  </p>
                  <div className="space-y-3">
                    {[
                      'Target identification and validation',
                      'Compound screening and optimization',
                      'Toxicity and side effect prediction',
                      'Clinical trial patient matching',
                      'Repurposing existing drugs'
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-teal-400 rounded-full" />
                        <span className="text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  {[
                    { metric: '60%', label: 'Faster discovery', desc: 'Time to identify candidates' },
                    { metric: '40%', label: 'Cost reduction', desc: 'R&D expenses saved' },
                    { metric: '10x', label: 'More compounds', desc: 'Screened per day' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <div className="flex items-end gap-4 mb-2">
                        <span className="text-5xl font-bold text-teal-400">{item.metric}</span>
                        <span className="text-white font-bold text-lg pb-2">{item.label}</span>
                      </div>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Clinical Decision Support */}
            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  icon: <Brain className="w-10 h-10" />,
                  title: 'Clinical Decision Support',
                  desc: 'AI assistants that analyze patient data, medical history, and latest research to recommend evidence-based treatment plans. Real-time alerts for drug interactions and adverse events.',
                  features: ['Treatment recommendations', 'Risk stratification', 'Drug interaction alerts', 'Evidence-based protocols'],
                  color: 'from-purple-500/10'
                },
                {
                  icon: <HeartPulse className="w-10 h-10" />,
                  title: 'Personalized Medicine',
                  desc: 'Use genomic data and AI to tailor treatments to individual patients. Predict drug response, identify optimal therapies, and minimize adverse reactions based on genetic profiles.',
                  features: ['Genomic analysis', 'Treatment optimization', 'Adverse reaction prediction', 'Precision dosing'],
                  color: 'from-pink-500/10'
                }
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} to-transparent rounded-3xl`} />
                  <div className="relative bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-cyan-500/50 transition-all">
                    <div className="w-20 h-20 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 text-cyan-400">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed mb-6">{item.desc}</p>
                    <div className="space-y-2">
                      {item.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                          <span className="text-white/80 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HIPAA Compliance */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">HIPAA-compliant infrastructure</h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                Healthcare data requires the highest levels of security and privacy. BluBrg's infrastructure is built to meet HIPAA, HITECH, and other healthcare compliance standards from the ground up.
              </p>
              <div className="space-y-6">
                {[
                  { feature: 'BAA Agreement', desc: 'Business Associate Agreement included' },
                  { feature: 'Encryption at rest & in transit', desc: 'AES-256 encryption standard' },
                  { feature: 'Access controls & audit logs', desc: 'Complete activity tracking' },
                  { feature: 'PHI data isolation', desc: 'Dedicated secure environments' }
                ].map((item, i) => (
                  <div key={i} className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 flex-shrink-0">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-white mb-1">{item.feature}</div>
                        <div className="text-white/60 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border-2 border-cyan-500/30 rounded-3xl p-12">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Compliance Certifications</h3>
              <div className="space-y-6">
                {[
                  { cert: 'HIPAA', status: 'Compliant', desc: 'Protected Health Information security' },
                  { cert: 'HITECH', status: 'Compliant', desc: 'Electronic health records standards' },
                  { cert: 'SOC 2 Type II', status: 'Certified', desc: 'Security and availability controls' },
                  { cert: 'ISO 27001', status: 'Certified', desc: 'Information security management' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white text-lg">{item.cert}</span>
                      <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-bold">{item.status}</span>
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
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500" />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>
            <div className="relative p-16 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Transform healthcare with AI</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join leading hospitals, research institutions, and healthcare companies using BluBrg to improve patient outcomes and accelerate medical breakthroughs.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-white hover:bg-white/90 text-cyan-600 px-10 py-7 text-lg font-bold">
                    Schedule Consultation
                  </Button>
                </Link>
                <Link to="/products/training">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-7 text-lg">
                    View Products
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

export default Healthcare;