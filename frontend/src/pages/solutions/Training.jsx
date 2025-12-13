import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowRight, Server, Zap, Shield } from 'lucide-react';

const Training = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Unique Hero - Full width with side-by-side content */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F3D] to-[#0F2847]" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0066FF] rounded-full filter blur-[200px] animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <h1 className="text-7xl font-bold text-white mb-8 leading-[1.1]">
                Train models that reshape industries
              </h1>
              <p className="text-2xl text-white/70 mb-10 leading-relaxed">
                High-density GPU clusters engineered for distributed model training. From prototype to production-scale foundation models.
              </p>
              <div className="flex gap-4">
                <Link to="/products/training">
                  <Button size="lg" className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-10 py-7 text-lg">
                    View Training Platform
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
                    Talk to Experts
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2 hidden lg:block">
              <div className="space-y-4">
                {[
                  { value: '10,000+', label: 'GPU Clusters Available', icon: <Server /> },
                  { value: '80%', label: 'Cost Reduction vs Cloud', icon: <Zap /> },
                  { value: '99.95%', label: 'Infrastructure Uptime', icon: <Shield /> }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="text-[#0066FF]">{stat.icon}</div>
                      <div>
                        <div className="text-3xl font-bold text-white">{stat.value}</div>
                        <div className="text-white/60 text-sm">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Training Different */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="max-w-3xl mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Why training demands specialized infrastructure</h2>
            <p className="text-xl text-white/60">Model training is fundamentally different from inference. It requires sustained compute across extended periods with tight inter-GPU communication.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Massive Parallelization',
                desc: 'Training large models requires coordinating hundreds or thousands of GPUs working simultaneously. Every GPU must communicate gradients constantly.'
              },
              {
                title: 'Extended Duration',
                desc: 'Training runs span days to months. Infrastructure must maintain stability, handle checkpointing, and recover from failures automatically.'
              },
              {
                title: 'Data Pipeline Pressure',
                desc: 'Terabyte-scale datasets must stream to GPUs continuously. Storage throughput becomes critical to prevent GPU idle time.'
              }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="h-1 w-20 bg-gradient-to-r from-[#0066FF] to-transparent mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Scenarios */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">Training at every scale</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Whether you're experimenting or training the next GPT, our infrastructure scales to meet your needs.</p>
          </div>
          <div className="space-y-6">
            {[
              { scale: 'Research & Prototyping', gpus: '8-32 GPUs', models: 'Small language models, vision networks, initial experiments', time: 'Hours to days' },
              { scale: 'Production Models', gpus: '64-256 GPUs', models: 'Domain-specific LLMs, production vision systems', time: '1-3 weeks' },
              { scale: 'Foundation Models', gpus: '512-2000+ GPUs', models: 'Large language models, multimodal systems', time: '4-16 weeks' }
            ].map((scenario, i) => (
              <Card key={i} className="bg-gradient-to-r from-white/5 to-transparent border-l-4 border-[#0066FF] hover:from-white/10 transition-all">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div>
                      <div className="text-[#0066FF] text-sm font-semibold mb-1">SCALE</div>
                      <div className="text-white font-bold text-xl">{scenario.scale}</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-sm mb-1">Cluster Size</div>
                      <div className="text-white font-semibold">{scenario.gpus}</div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-white/60 text-sm mb-1">Typical Models</div>
                      <div className="text-white">{scenario.models}</div>
                      <div className="text-[#0066FF] text-sm mt-2">{scenario.time} typical duration</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Unique design */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] via-[#0052CC] to-[#003D99]" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full filter blur-[150px]" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-6xl font-bold text-white mb-6">Ready to train?</h2>
          <p className="text-2xl text-white/90 mb-10 max-w-2xl mx-auto">Reserve GPU capacity and start training within hours.</p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-[#0066FF] hover:bg-white/90 px-12 py-8 text-xl font-semibold">
              Reserve GPUs Now <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Training;