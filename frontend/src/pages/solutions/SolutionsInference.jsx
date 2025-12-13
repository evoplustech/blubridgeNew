import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Check, Gauge, Users, Shield } from 'lucide-react';

const SolutionsInference = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-[#0A1F3D] via-[#0C2644] to-[#0A1F3D]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-[#0066FF] rounded-full filter blur-[140px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-[#0066FF]/20 rounded-full text-[#0066FF] text-sm font-semibold mb-6 uppercase">Inference Solutions</div>
              <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                Deploy AI models with production-grade performance
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Serve millions of requests per day with consistent latency, automatic scaling, and enterprise reliability. BluBrg inference infrastructure handles real-time and batch workloads at any scale.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products/inference">
                  <Button className="bg-white text-[#0A1F3D] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                    Explore Inference Product
                  </Button>
                </Link>
                <Link to="/products/serverless">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                    Try Serverless →
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {[
                      { metric: '< 50ms', label: 'P99 latency', icon: <Gauge className="w-6 h-6" /> },
                      { metric: '10M+', label: 'Daily requests', icon: <Users className="w-6 h-6" /> },
                      { metric: '99.99%', label: 'Uptime SLA', icon: <Shield className="w-6 h-6" /> }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="text-[#0066FF]">{item.icon}</div>
                        <div>
                          <div className="text-3xl font-bold text-white">{item.metric}</div>
                          <div className="text-white/60 text-sm">{item.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Patterns */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12">Inference Deployment Patterns</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Real-Time Inference',
                description: 'Serve individual requests with sub-second latency for interactive applications.',
                useCases: ['Chatbots and conversational AI', 'Content generation', 'Real-time recommendations', 'Interactive search'],
                requirements: ['Low-latency networking', 'GPU memory optimization', 'Request batching', 'Load balancing']
              },
              {
                title: 'Batch Processing',
                description: 'Process large volumes of data asynchronously with maximum throughput optimization.',
                useCases: ['Document analysis at scale', 'Video processing pipelines', 'Scheduled model evaluation', 'Data enrichment'],
                requirements: ['High throughput queuing', 'Dynamic batch sizing', 'Job scheduling', 'Resource pooling']
              }
            ].map((pattern, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">{pattern.title}</h3>
                  <p className="text-white/70 mb-6">{pattern.description}</p>
                  <div className="mb-6">
                    <div className="text-[#0066FF] text-sm font-semibold mb-3">Common Use Cases</div>
                    <ul className="space-y-2">
                      {pattern.useCases.map((useCase, j) => (
                        <li key={j} className="text-white/70 text-sm flex items-start space-x-2">
                          <span className="text-[#0066FF] mt-1">•</span>
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[#0066FF] text-sm font-semibold mb-3">Infrastructure Requirements</div>
                    <div className="space-y-2">
                      {pattern.requirements.map((req, j) => (
                        <div key={j} className="flex items-center space-x-2 text-white/70 text-sm">
                          <Check className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Optimization Strategies */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-6">Performance Optimization</h2>
          <p className="text-white/70 text-lg mb-12 max-w-3xl">
            BluBrg applies multiple optimization techniques to maximize inference throughput while minimizing cost and latency.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Model Optimization',
                description: 'Reduce model size and increase speed without sacrificing accuracy.',
                techniques: ['Quantization (INT8, FP16)', 'Pruning and distillation', 'Operator fusion', 'Graph optimization']
              },
              {
                title: 'Runtime Optimization',
                description: 'Maximize hardware utilization through intelligent scheduling and batching.',
                techniques: ['Dynamic batching', 'Continuous batching', 'KV cache management', 'Speculative decoding']
              },
              {
                title: 'Infrastructure Optimization',
                description: 'Deploy on optimal hardware with efficient resource allocation.',
                techniques: ['GPU selection matching', 'Multi-model serving', 'Auto-scaling policies', 'Geographic distribution']
              }
            ].map((strategy, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-3">{strategy.title}</h3>
                  <p className="text-white/70 mb-6 text-sm">{strategy.description}</p>
                  <ul className="space-y-2">
                    {strategy.techniques.map((tech, j) => (
                      <li key={j} className="text-white/70 text-sm">• {tech}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Monitoring */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6 text-center">Built-In Observability</h2>
            <p className="text-white/70 text-center mb-12">
              Comprehensive monitoring and analytics for production inference deployments.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { feature: 'Request Tracing', description: 'End-to-end visibility into every inference request with distributed tracing' },
                { feature: 'Performance Metrics', description: 'Real-time latency, throughput, and utilization dashboards' },
                { feature: 'Cost Analytics', description: 'Per-model, per-endpoint cost tracking and optimization recommendations' },
                { feature: 'Alerting', description: 'Configurable alerts for latency spikes, errors, and capacity limits' }
              ].map((item, i) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-white font-semibold mb-2">{item.feature}</h3>
                    <p className="text-white/70 text-sm">{item.description}</p>
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
            Deploy inference endpoints in minutes
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start with serverless or reserve dedicated capacity for production workloads.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products/serverless">
              <Button className="bg-white text-[#0066FF] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                Try Serverless Free
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Discuss Requirements
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsInference;