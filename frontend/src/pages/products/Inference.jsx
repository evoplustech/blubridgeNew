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
                Fast, affordable, auto-scaling AI inference
              </h1>
              <p className="text-xl text-white/80 mb-8">
               Designed for maximum efficiency, the inference offering runs on dynamically scaling GPU capacity, with end-to-end optimisation tailored to support both batch processing and real-time streaming demands.
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
          <h2 className="text-4xl font-bold text-white mb-12">Easily access optimized inference frameworks</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-[#0066FF]/10 to-transparent border-[#0066FF]/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Dedicated Clusters</h3>
                <p className="text-white/70 mb-6">
                  Immediate compatibility is available with TensorFlow Serving, PyTorch, and ONNX Runtime to enable rapid inference execution. Proprietary optimization methods lower response times and enhance throughput while preserving model accuracy.
                </p>
                {/* <ul className="space-y-3 mb-6">
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
                </ul> */}
                {/* <Link to="/contact">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More →
                  </Button>
                </Link> */}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-transparent border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Dedicated endpoints for 100+ open-source models</h3>
                <p className="text-white/70 mb-6">
                 Using Inference Endpoints, you can quickly launch Transformers, Diffusers, or bespoke models on dedicated, fully managed compute environments. Choose from over 100 available models, enhanced through Blubrg’s proprietary optimisation layer to achieve maximum performance.
                </p>
                {/* <ul className="space-y-3 mb-6">
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
                </Link> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Optimization Features */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Built on high-performance GPU compute</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Performance & Scalability',
                description: 'Dynamically expanding graphics-based compute sits at the core of what we deliver. Confidence comes from knowing artificial intelligence runs with low latency while every assigned resource is used to its fullest potential',
                features: ['INT8/FP16 quantization', 'Dynamic batching', 'KV cache optimization']
              },
              {
                title: 'Purpose-built Stack',
                description: 'Unlock the full financial and performance advantages of a tightly unified infrastructure platform, specifically engineered to support artificial intelligence workloads ranging from small experiments to massive production-scale deployments',
                features: ['Geographic routing', 'Version management', 'Canary deployments']
              },
              {
                title: 'No integration hurdles',
                description: 'Flexibility is a core priority for us. Use ready-made software configurations or seamlessly connect your existing tools and workflows with ease',
                features: ['Request tracing', 'Latency analysis', 'Cost optimization']
              }
            ].map((feature, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 mb-4">{feature.description}</p>
                  {/* <div className="space-y-2">
                    {feature.features.map((item, j) => (
                      <div key={j} className="text-white/60 text-sm">• {item}</div>
                    ))}
                  </div> */}
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