import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Check, Gauge, Shield, TrendingUp } from 'lucide-react';

const Inference = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero Section - Unique for Inference */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1F3D] via-[#0F2847] to-[#0A1F3D]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#0066FF] rounded-full filter blur-[100px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-[#0066FF]/20 rounded-full text-[#0066FF] text-sm font-semibold mb-6">PRODUCTION INFERENCE</div>
              <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                Lightning-fast inference at any scale
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Deploy AI models with sub-100ms latency. Auto-scaling infrastructure handles millions of requests per second with guaranteed uptime.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button className="bg-white text-[#0A1F3D] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                    Get Started
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                    View Pricing →
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="text-[#0066FF] text-5xl font-bold mb-2">&lt; 100ms</div>
                <div className="text-white/60 mb-6">Average response time</div>
                <div className="space-y-4">
                  <div>
                    <div className="text-white font-semibold mb-1">Throughput</div>
                    <div className="text-white/60">10M+ requests/day</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Availability</div>
                    <div className="text-white/60">99.99% SLA guaranteed</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Scaling</div>
                    <div className="text-white/60">Automatic, zero config</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Built for Speed and Scale</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { metric: '7.2X', label: 'Faster than competitors', icon: <Gauge className="w-8 h-8" /> },
              { metric: '99.99%', label: 'Uptime SLA', icon: <Shield className="w-8 h-8" /> },
              { metric: '40%', label: 'Cost reduction', icon: <TrendingUp className="w-8 h-8" /> },
              { metric: 'Auto', label: 'Zero-touch scaling', icon: <TrendingUp className="w-8 h-8" /> }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center text-[#0066FF] mb-4">{item.icon}</div>
                <div className="text-5xl font-bold text-white mb-2">{item.metric}</div>
                <div className="text-white/60">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Options */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12">Deployment Options</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-[#0066FF]/10 to-transparent border-[#0066FF]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Dedicated Clusters</h3>
                <p className="text-white/70 mb-6">
                  Reserved GPU capacity for consistent performance. Ideal for high-volume production workloads requiring predictable latency.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Reserved GPU allocation',
                    'Predictable pricing',
                    'Custom scaling policies',
                    'Priority support'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-white/80">
                      <Check className="w-5 h-5 text-[#0066FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-transparent border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Serverless Endpoints</h3>
                <p className="text-white/70 mb-6">
                  Pay-per-request pricing with instant scaling. Perfect for variable workloads and development environments.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Pay per request',
                    'Instant auto-scaling',
                    'Zero infrastructure management',
                    'Built-in load balancing'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-white/80">
                      <Check className="w-5 h-5 text-[#0066FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/products/serverless">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Explore Serverless →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Optimization Features */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Enterprise Optimization</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Model Optimization',
                description: 'Automatic quantization, pruning, and distillation reduce model size by up to 75% while maintaining accuracy.',
                features: ['INT8/FP16 quantization', 'Dynamic batching', 'KV cache optimization']
              },
              {
                title: 'Intelligent Routing',
                description: 'Smart load balancing across GPU clusters ensures optimal resource utilization and minimal cold starts.',
                features: ['Geographic routing', 'Version management', 'Canary deployments']
              },
              {
                title: 'Monitoring & Analytics',
                description: 'Real-time performance metrics, cost tracking, and alerting built into every deployment.',
                features: ['Request tracing', 'Latency analysis', 'Cost optimization']
              }
            ].map((feature, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.features.map((item, j) => (
                      <div key={j} className="text-white/60 text-sm">• {item}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0066FF] to-[#0052CC]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Deploy production-ready inference today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start with serverless endpoints or reserve dedicated capacity for your AI applications.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-[#0066FF] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                Schedule Demo
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                API Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inference;