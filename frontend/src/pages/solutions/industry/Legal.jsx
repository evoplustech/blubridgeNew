import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { ArrowRight, Scale, FileText, Search, Brain, Shield, Clock } from 'lucide-react';

const Legal = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero - Split Screen Design */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F3D] to-[#1a3a5c]" />
        
        <div className="container-custom relative z-10 h-full flex items-center py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-6 py-3 mb-8">
                <Scale className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 font-semibold">Legal Services</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.05]">
                AI that transforms legal practice
              </h1>
              <p className="text-xl text-white/70 mb-10 leading-relaxed">
                From legal research and contract analysis to e-discovery and document review, BluBrg provides the AI infrastructure that modern law firms and legal departments need to deliver faster, more accurate services.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products/serverless">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-7 text-lg">
                    Explore Solutions <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Search className="w-6 h-6" />, title: 'Legal Research', metric: '90% faster', desc: 'AI-powered case law and precedent search' },
                { icon: <FileText className="w-6 h-6" />, title: 'Contract Analysis', metric: '95% accuracy', desc: 'Automated review and risk identification' },
                { icon: <Clock className="w-6 h-6" />, title: 'Time Savings', metric: '1000+ hrs/year', desc: 'Reduce billable hours on routine tasks' }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-amber-500/50 transition-all group">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        <span className="text-amber-400 font-bold text-lg">{item.metric}</span>
                      </div>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Cost of Traditional Legal Work */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">The billable hour problem</h2>
            <p className="text-lg text-white/60">Legal professionals spend 60% of their time on tasks that AI can handle faster and more accurately.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { task: 'Document Review', time: '30-40%', desc: 'Hours spent on routine document analysis' },
              { task: 'Legal Research', time: '20-30%', desc: 'Time searching case law and precedents' },
              { task: 'Contract Drafting', time: '15-20%', desc: 'Creating standard agreements' },
              { task: 'Due Diligence', time: '10-15%', desc: 'M&A and compliance reviews' }
            ].map((item, i) => (
              <Card key={i} className="bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-amber-500/50 transition-all">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl font-bold text-amber-400 mb-4">{item.time}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.task}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Use Cases - Detailed Cards */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16">AI applications for legal services</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                icon: <Search className="w-10 h-10" />,
                title: 'Legal Research & Precedent Analysis',
                desc: 'AI-powered semantic search across millions of cases, statutes, and legal documents. Find relevant precedents in seconds instead of hours. Natural language queries return ranked results with citations and context.',
                features: [
                  'Semantic case law search',
                  'Automatic citation generation',
                  'Precedent strength analysis',
                  'Jurisdiction-specific filtering'
                ],
                impact: '90% time reduction',
                color: 'border-amber-500/30'
              },
              {
                icon: <FileText className="w-10 h-10" />,
                title: 'Contract Analysis & Review',
                desc: 'Upload contracts and instantly identify risks, unusual clauses, and compliance issues. AI models trained on millions of contracts recognize patterns and flag potential problems that human reviewers might miss.',
                features: [
                  'Clause extraction & classification',
                  'Risk identification',
                  'Compliance checking',
                  'Redline comparison'
                ],
                impact: '95% accuracy',
                color: 'border-blue-500/30'
              },
              {
                icon: <Brain className="w-10 h-10" />,
                title: 'E-Discovery & Document Management',
                desc: 'Process and analyze millions of documents for litigation. AI categorizes, tags, and prioritizes documents based on relevance. Predictive coding reduces review time by 70% while maintaining accuracy.',
                features: [
                  'Automated document classification',
                  'Predictive coding',
                  'Privilege detection',
                  'Key term extraction'
                ],
                impact: '70% cost savings',
                color: 'border-purple-500/30'
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: 'Due Diligence & Compliance',
                desc: 'Automate M&A due diligence and regulatory compliance reviews. Scan corporate documents, financial records, and contracts to identify issues and ensure compliance with regulations.',
                features: [
                  'Regulatory compliance scanning',
                  'Entity relationship mapping',
                  'Financial document analysis',
                  'Risk scoring'
                ],
                impact: '80% faster',
                color: 'border-green-500/30'
              }
            ].map((item, i) => (
              <Card key={i} className={`bg-white/5 border-2 ${item.color} hover:bg-white/10 transition-all group`}>
                <CardContent className="p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-20 h-20 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full text-sm font-bold">{item.impact}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-6">{item.desc}</p>
                  <div className="space-y-2">
                    {item.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI & Benefits */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Measurable impact on your practice</h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                Law firms and legal departments using AI infrastructure report dramatic improvements in efficiency, accuracy, and client satisfaction. The ROI is clear and immediate.
              </p>
              <div className="space-y-6">
                {[
                  { benefit: 'Reduced billable hours on routine tasks', value: '1000+ hrs/year' },
                  { benefit: 'Faster case preparation and filing', value: '60% improvement' },
                  { benefit: 'Improved contract review accuracy', value: '95%+' },
                  { benefit: 'E-discovery cost reduction', value: '70% savings' }
                ].map((item, i) => (
                  <div key={i} className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-xl p-6 hover:border-amber-500/50 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">{item.benefit}</span>
                      <span className="text-amber-400 font-bold text-lg">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 to-transparent border-2 border-amber-500/30 rounded-3xl p-12">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Client testimonial</h3>
              <div className="space-y-8">
                <div className="text-white/90 text-lg leading-relaxed italic">
                  "BluBrg's AI infrastructure has transformed our practice. What used to take our team 3 weeks in document review now takes 2 days. We're delivering better results for clients at lower cost, and our lawyers can focus on high-value strategic work instead of routine analysis."
                </div>
                <div className="pt-8 border-t border-white/10">
                  <div className="font-bold text-white text-lg mb-1">Sarah Mitchell</div>
                  <div className="text-white/60">Managing Partner, Mitchell & Associates</div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-1">85%</div>
                    <div className="text-white/60 text-sm">Time saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-1">2x</div>
                    <div className="text-white/60 text-sm">Cases handled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-1">98%</div>
                    <div className="text-white/60 text-sm">Client satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Confidentiality */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Built for attorney-client privilege</h2>
            <p className="text-lg text-white/60">Legal work demands the highest levels of security and confidentiality. BluBrg's infrastructure is designed to protect sensitive client information.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { feature: 'End-to-end encryption', desc: 'Data encrypted in transit and at rest' },
              { feature: 'Private deployments', desc: 'Isolated environments for each firm' },
              { feature: 'Audit logging', desc: 'Complete access and activity tracking' },
              { feature: 'Compliance ready', desc: 'SOC 2, ISO 27001, GDPR compliant' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-amber-500/50 transition-all text-center">
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{item.feature}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-amber-500/10 to-transparent border-2 border-amber-500/30 rounded-3xl p-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Transform your legal practice with AI</h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Join leading law firms and legal departments using BluBrg to deliver faster, more accurate, and cost-effective legal services.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-7 text-lg">
                  Schedule a Demo
                </Button>
              </Link>
              <Link to="/products/serverless">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
                  View Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Legal;