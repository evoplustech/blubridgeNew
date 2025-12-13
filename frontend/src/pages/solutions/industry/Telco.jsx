import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { ArrowRight, Network, Cpu, Globe, Radio, TrendingUp } from 'lucide-react';

const Telco = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero - Diagonal Split Design */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F3D] via-[#1a2f4d] to-[#0066FF]/20" />
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
            <div className="absolute top-20 right-20 w-[800px] h-[800px] bg-[#0066FF] rounded-full filter blur-[250px]" />
          </div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full px-6 py-3 mb-8">
              <Radio className="w-5 h-5 text-[#0066FF]" />
              <span className="text-[#0066FF] font-semibold">Telecommunications</span>
            </div>
            <h1 className="text-6xl sm:text-7xl font-bold text-white mb-8 leading-[1.05]">
              Power the next generation of telecom with AI
            </h1>
            <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
              From network optimization and predictive maintenance to 5G enhancement and customer analytics, BluBrg delivers the compute infrastructure that telecommunications providers need to stay competitive.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products/training">
                <Button size="lg" className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-10 py-7 text-lg">
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
        </div>
      </section>

      {/* Key Challenges in Telco */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Challenges facing telecommunications today</h2>
            <p className="text-lg text-white/60">The telecom industry is rapidly evolving. AI infrastructure is essential for staying ahead.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Network className="w-8 h-8" />,
                title: 'Network Complexity',
                desc: 'Managing increasingly complex infrastructure across 5G, edge computing, and legacy systems requires intelligent automation.'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Capacity Planning',
                desc: 'Predicting bandwidth needs and optimizing resource allocation demands real-time AI-powered analytics at massive scale.'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Customer Experience',
                desc: 'Delivering personalized services and reducing churn requires processing vast customer data streams with low-latency AI models.'
              }
            ].map((item, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#0066FF]/10 rounded-xl flex items-center justify-center mb-6 text-[#0066FF] group-hover:bg-[#0066FF]/20 transition-all">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases - Horizontal Cards */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">AI-powered use cases for telecom</h2>
            <p className="text-lg text-white/60">Real-world applications that transform telecommunications operations and customer service.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: 'Network Optimization & Predictive Maintenance',
                desc: 'Use AI to analyze network performance in real-time, predict equipment failures before they occur, and automatically optimize routing to reduce latency and improve reliability.',
                metrics: ['45% reduction in downtime', '30% cost savings', '99.99% uptime']
              },
              {
                title: '5G & Edge Computing Enhancement',
                desc: 'Deploy AI models at the edge to enable ultra-low latency applications, optimize 5G network slicing, and support autonomous vehicles and IoT ecosystems.',
                metrics: ['Sub-10ms latency', '10x throughput', 'Real-time processing']
              },
              {
                title: 'Customer Analytics & Personalization',
                desc: 'Process customer interaction data to predict churn, personalize service offerings, automate support with AI chatbots, and optimize pricing strategies.',
                metrics: ['25% churn reduction', '40% support automation', '2x engagement']
              },
              {
                title: 'Fraud Detection & Security',
                desc: 'Implement real-time AI monitoring to detect fraudulent activities, identify security threats, and protect customer data across massive network traffic.',
                metrics: ['99% fraud detection', 'Real-time alerting', 'Compliance ready']
              }
            ].map((useCase, i) => (
              <div key={i} className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-2xl p-10 hover:border-[#0066FF]/50 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-3xl font-bold text-white group-hover:text-[#0066FF] transition-colors">{useCase.title}</h3>
                  <ArrowRight className="w-6 h-6 text-white/40 group-hover:text-[#0066FF] group-hover:translate-x-2 transition-all" />
                </div>
                <p className="text-white/70 text-lg mb-6 leading-relaxed">{useCase.desc}</p>
                <div className="flex flex-wrap gap-4">
                  {useCase.metrics.map((metric, j) => (
                    <span key={j} className="inline-flex items-center bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full px-5 py-2 text-[#0066FF] text-sm font-semibold">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Requirements */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Infrastructure built for telecom scale</h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                Telecommunications generate petabytes of data daily. BluBrg's AI infrastructure is purpose-built to handle this scale with the performance, reliability, and security that telecom operators demand.
              </p>
              <div className="space-y-6">
                {[
                  { label: 'Petabyte-scale data processing', value: 'Distributed storage' },
                  { label: 'Real-time inference', value: 'Sub-millisecond latency' },
                  { label: 'Enterprise security', value: 'SOC 2, ISO compliance' },
                  { label: 'Global deployment', value: 'Multi-region availability' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-xl">
                    <span className="text-white text-lg font-semibold">{item.label}</span>
                    <span className="text-[#0066FF] font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 to-transparent rounded-3xl" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
                <div className="space-y-8">
                  <div>
                    <div className="text-6xl font-bold text-white mb-2">10PB+</div>
                    <div className="text-white/60">Data processed daily</div>
                  </div>
                  <div>
                    <div className="text-6xl font-bold text-white mb-2">&lt;5ms</div>
                    <div className="text-white/60">Average inference latency</div>
                  </div>
                  <div>
                    <div className="text-6xl font-bold text-white mb-2">99.99%</div>
                    <div className="text-white/60">Infrastructure uptime SLA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-[#0066FF]/10 to-transparent border border-[#0066FF]/30 rounded-3xl p-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to transform your telecom operations?</h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Join leading telecommunications providers using BluBrg's AI infrastructure to optimize networks and deliver exceptional customer experiences.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-10 py-7 text-lg">
                  Schedule a Consultation
                </Button>
              </Link>
              <Link to="/products/training">
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

export default Telco;