import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Check, Gauge, TrendingUp } from 'lucide-react';

const Inference = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Unique Hero - Centered with metrics overlay */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A1F3D]" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-[#0066FF] rounded-full filter blur-[180px]" />
          </div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full px-6 py-3 mb-8">
              <Gauge className="w-4 h-4 text-[#0066FF]" />
              <span className="text-[#0066FF] font-semibold text-sm uppercase tracking-wider">Real-Time AI Serving</span>
            </div>
            <h1 className="text-7xl font-bold text-white mb-8 leading-tight">
              Inference infrastructure that scales instantly
            </h1>
            <p className="text-2xl text-white/60 mb-12 leading-relaxed max-w-3xl mx-auto">
              Deploy models to production with confidence. Auto-scaling endpoints handle traffic spikes while maintaining sub-second response times.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/products/inference">
                <Button size="lg" className="bg-white text-[#0A1F3D] hover:bg-white/90 px-10 py-7 text-lg font-semibold">
                  Explore Inference Platform
                </Button>
              </Link>
              <Link to="/products/serverless">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
                  Try Serverless APIs
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Metrics Banner */}
          <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
            {[
              { metric: '< 100ms', label: 'Average Latency', trend: '40% improvement' },
              { metric: '100M+', label: 'Daily Requests', trend: 'Auto-scaling' },
              { metric: '99.99%', label: 'Availability SLA', trend: 'Guaranteed' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-[#0066FF] mb-2">{item.metric}</div>
                <div className="text-white font-medium mb-2">{item.label}</div>
                <div className="text-white/50 text-sm">{item.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inference Patterns - Unique layout */}
      <section className="py-32 bg-gradient-to-b from-[#0B1F35] to-[#0A1F3D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="sticky top-32">
                <h2 className="text-5xl font-bold text-white mb-6">Two paths to production</h2>
                <p className="text-xl text-white/60 leading-relaxed">
                  Choose the deployment model that matches your latency, scale, and cost requirements.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              {[
                {
                  icon: <TrendingUp className="w-10 h-10" />,
                  title: 'Serverless Endpoints',
                  description: 'Zero infrastructure management. Deploy models via API with automatic scaling from zero to thousands of requests per second.',
                  ideal: ['Variable traffic', 'Multiple models', 'Pay-per-use', 'Rapid iteration'],
                  color: 'from-[#0066FF]/20 to-transparent'
                },
                {
                  icon: <Gauge className="w-10 h-10" />,
                  title: 'Dedicated Clusters',
                  description: 'Reserved GPU capacity for consistent performance. Ideal for high-volume production workloads requiring predictable latency.',
                  ideal: ['Steady traffic', 'Latency-critical', 'High throughput', 'Cost predictability'],
                  color: 'from-purple-500/20 to-transparent'
                }
              ].map((pattern, i) => (
                <Card key={i} className={`bg-gradient-to-br ${pattern.color} border-white/10 overflow-hidden group hover:scale-[1.02] transition-transform`}>
                  <CardContent className="p-10">
                    <div className="text-[#0066FF] mb-6">{pattern.icon}</div>
                    <h3 className="text-3xl font-bold text-white mb-4">{pattern.title}</h3>
                    <p className="text-white/70 text-lg mb-6 leading-relaxed">{pattern.description}</p>
                    <div className="space-y-3">
                      <div className="text-[#0066FF] font-semibold text-sm uppercase tracking-wider mb-3">Ideal For</div>
                      {pattern.ideal.map((item, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-[#0066FF]" />
                          <span className="text-white">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Optimization */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">Optimized for speed and efficiency</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">BluBrg applies cutting-edge optimization techniques to maximize throughput and minimize cost.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { tech: 'Quantization', desc: 'INT8/FP16 precision reduces memory and increases speed', impact: '3X faster' },
              { tech: 'Dynamic Batching', desc: 'Intelligent request grouping maximizes GPU utilization', impact: '5X throughput' },
              { tech: 'KV Caching', desc: 'Attention cache reuse for transformer models', impact: '60% latency cut' },
              { tech: 'Model Parallelism', desc: 'Split large models across multiple GPUs', impact: 'Unlimited scale' }
            ].map((tech, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:border-[#0066FF]/50 transition-all group">
                <CardContent className="p-8">
                  <div className="text-[#0066FF] font-bold text-lg mb-3">{tech.tech}</div>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">{tech.desc}</p>
                  <div className="inline-block bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full px-4 py-1">
                    <span className="text-[#0066FF] text-sm font-semibold">{tech.impact}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Unique gradient design */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] via-[#0052CC] to-[#0066FF]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full filter blur-[120px]" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl font-bold text-white mb-8">Deploy in minutes, scale to millions</h2>
            <p className="text-2xl text-white/90 mb-10">Start serving requests today with our inference platform.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/products/serverless">
                <Button size="lg" className="bg-white text-[#0066FF] hover:bg-white/90 px-12 py-8 text-xl font-semibold">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-12 py-8 text-xl font-semibold">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inference;