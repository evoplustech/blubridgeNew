import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { ArrowRight, Factory, Cpu, Eye, Wrench, BarChart3, Boxes } from 'lucide-react';

const Manufacturing = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero - Industrial Design with Side Image */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F3D] via-[#0A1F3D] to-transparent" />
        
        <div className="container-custom relative z-10 h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full py-20">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-6 py-3 mb-8">
                <Factory className="w-5 h-5 text-orange-400" />
                <span className="text-orange-400 font-semibold">Manufacturing</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-8 leading-[1.05]">
                The future of manufacturing is intelligent
              </h1>
              <p className="text-xl text-white/70 mb-10 leading-relaxed">
                AI-powered predictive maintenance, quality control, supply chain optimization, and robotics. BluBrg provides the compute infrastructure that Industry 4.0 demands.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products/inference">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-7 text-lg">
                    Explore Solutions <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
                {[
                  { value: '45%', label: 'Downtime reduction' },
                  { value: '99.8%', label: 'Quality accuracy' },
                  { value: '30%', label: 'Cost savings' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-orange-400 mb-1">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              {[
                { icon: <Eye className="w-6 h-6" />, title: 'Computer Vision', desc: 'Real-time defect detection' },
                { icon: <Cpu className="w-6 h-6" />, title: 'Predictive Maintenance', desc: 'Prevent equipment failures' },
                { icon: <BarChart3 className="w-6 h-6" />, title: 'Supply Chain AI', desc: 'Optimize logistics & inventory' }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20 transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Challenges */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Challenges in modern manufacturing</h2>
            <p className="text-lg text-white/60">AI is transforming how manufacturers operate, compete, and deliver products.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Equipment Downtime',
                desc: 'Unplanned equipment failures cost manufacturers millions annually. Traditional reactive maintenance is no longer viable in competitive markets.',
                impact: '$50B annual loss'
              },
              {
                title: 'Quality Control',
                desc: 'Manual inspection is slow, inconsistent, and misses defects. AI-powered computer vision detects issues that human eyes cannot see.',
                impact: '15-20% defect rate'
              },
              {
                title: 'Supply Chain Volatility',
                desc: 'Global disruptions, demand fluctuations, and complex logistics require intelligent forecasting and optimization.',
                impact: '30% inefficiency'
              }
            ].map((item, i) => (
              <Card key={i} className="bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-orange-500/50 transition-all">
                <CardContent className="p-10">
                  <div className="text-orange-400 text-sm font-bold uppercase tracking-wider mb-4">{item.impact}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Use Cases - Stacked Layout */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16">AI applications in manufacturing</h2>

          <div className="space-y-8">
            {[
              {
                icon: <Wrench className="w-8 h-8" />,
                title: 'Predictive Maintenance',
                desc: 'Use IoT sensor data and ML models to predict equipment failures before they happen. Reduce unplanned downtime by up to 50% and extend equipment lifespan by 20-40%.',
                features: ['Real-time sensor monitoring', 'Failure prediction models', 'Maintenance scheduling automation'],
                color: 'from-orange-500/20'
              },
              {
                icon: <Eye className="w-8 h-8" />,
                title: 'Visual Quality Inspection',
                desc: 'Deploy computer vision models that inspect products at production speed. Detect surface defects, dimensional errors, and assembly mistakes with 99.8% accuracy.',
                features: ['High-speed defect detection', 'Multi-angle inspection', 'Automated sorting & rejection'],
                color: 'from-blue-500/20'
              },
              {
                icon: <Boxes className="w-8 h-8" />,
                title: 'Supply Chain Optimization',
                desc: 'Forecast demand, optimize inventory levels, and streamline logistics using AI. Reduce stockouts by 40% and cut inventory costs by 25%.',
                features: ['Demand forecasting', 'Inventory optimization', 'Route planning AI'],
                color: 'from-green-500/20'
              },
              {
                icon: <Factory className="w-8 h-8" />,
                title: 'Process Optimization',
                desc: 'Analyze production data to identify bottlenecks, reduce waste, and improve throughput. AI models continuously learn and optimize manufacturing processes.',
                features: ['Production line optimization', 'Energy consumption reduction', 'Yield improvement'],
                color: 'from-purple-500/20'
              }
            ].map((useCase, i) => (
              <div key={i} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${useCase.color} to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-10 group-hover:border-orange-500/50 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400">
                          {useCase.icon}
                        </div>
                        <h3 className="text-3xl font-bold text-white">{useCase.title}</h3>
                      </div>
                      <p className="text-white/70 text-lg leading-relaxed mb-6">{useCase.desc}</p>
                      <div className="flex flex-wrap gap-3">
                        {useCase.features.map((feature, j) => (
                          <span key={j} className="bg-orange-500/10 border border-orange-500/30 rounded-lg px-4 py-2 text-orange-400 text-sm font-semibold">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="hidden lg:block w-6 h-6 text-white/40 group-hover:text-orange-400 group-hover:translate-x-2 transition-all flex-shrink-0 mt-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Built for industrial-scale AI</h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                Manufacturing AI demands real-time processing, edge deployment, and 24/7 reliability. BluBrg's infrastructure is engineered for the factory floor.
              </p>
              <div className="space-y-6">
                {[
                  { label: 'Edge AI deployment', value: 'Factory floor' },
                  { label: 'Real-time inference', value: '<10ms latency' },
                  { label: 'High availability', value: '99.99% uptime' },
                  { label: 'Video processing', value: '1000+ FPS' }
                ].map((spec, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-xl">
                    <span className="text-white font-semibold text-lg">{spec.label}</span>
                    <span className="text-orange-400 font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-transparent border-2 border-orange-500/30 rounded-3xl p-12">
              <h3 className="text-2xl font-bold text-white mb-8">ROI in manufacturing AI</h3>
              <div className="space-y-6">
                {[
                  { metric: 'Downtime reduction', value: '45%', desc: 'Fewer unplanned stoppages' },
                  { metric: 'Quality improvement', value: '99.8%', desc: 'Defect detection accuracy' },
                  { metric: 'Cost savings', value: '30%', desc: 'Operational efficiency gains' },
                  { metric: 'Throughput increase', value: '25%', desc: 'Production optimization' }
                ].map((item, i) => (
                  <div key={i} className="pb-6 border-b border-white/10 last:border-0">
                    <div className="flex items-end gap-4 mb-2">
                      <span className="text-4xl font-bold text-orange-400">{item.value}</span>
                      <span className="text-white font-semibold text-lg pb-1">{item.metric}</span>
                    </div>
                    <p className="text-white/60">{item.desc}</p>
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
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700" />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>
            <div className="relative p-16 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Transform your manufacturing with AI</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join manufacturers worldwide using BluBrg to reduce costs, improve quality, and accelerate production.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-white hover:bg-white/90 text-orange-600 px-10 py-7 text-lg font-bold">
                    Schedule a Demo
                  </Button>
                </Link>
                <Link to="/products/inference">
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

export default Manufacturing;