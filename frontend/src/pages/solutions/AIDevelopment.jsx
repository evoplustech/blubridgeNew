import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Play, Code2, Rocket } from 'lucide-react';

const AIDevelopment = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Unique Hero - Centered with animated background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0A1F3D]" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0066FF] rounded-full filter blur-[160px] animate-pulse" style={{animationDuration: '4s'}} />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500 rounded-full filter blur-[160px] animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}} />
          </div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0066FF]/10 to-purple-500/10 border border-[#0066FF]/30 rounded-full px-8 py-4 mb-10">
              <Code2 className="w-5 h-5 text-[#0066FF]" />
              <span className="text-white font-semibold text-sm uppercase tracking-widest">End-to-End AI Platform</span>
            </div>
            <h1 className="text-8xl font-bold text-white mb-10 leading-none">
              Build, train, deploy
            </h1>
            <p className="text-3xl text-white/60 mb-14 leading-relaxed max-w-4xl mx-auto">
              Complete development environment from first experiment to production deployment. Everything your AI team needs in one integrated platform.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-[#0066FF] to-purple-500 hover:from-[#0052CC] hover:to-purple-600 text-white px-12 py-8 text-xl font-semibold">
                  <Play className="mr-3" /> Start Building
                </Button>
              </Link>
              <Link to="/docs">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-8 text-xl font-semibold">
                  Explore Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Development Journey - Unique timeline design */}
      <section className="py-32 bg-gradient-to-b from-[#0B1F35] to-[#0A1F3D]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">From idea to production</h2>
            <p className="text-xl text-white/60">Your AI journey, streamlined into four seamless phases.</p>
          </div>
          <div className="max-w-5xl mx-auto space-y-16">
            {[
              {
                phase: '01',
                title: 'Experiment',
                icon: <Code2 className="w-8 h-8" />,
                description: 'Start with Jupyter notebooks and interactive development environments. Access curated datasets and pre-trained models to accelerate prototyping.',
                features: ['Browser-based notebooks', 'GPU-accelerated compute', 'Shared team workspaces', 'Version-controlled experiments']
              },
              {
                phase: '02',
                title: 'Train',
                icon: <Rocket className="w-8 h-8" />,
                description: 'Scale from single GPU to distributed clusters with one click. Automatic hyperparameter tuning and distributed training frameworks included.',
                features: ['Auto-scaling clusters', 'Distributed training', 'Experiment tracking', 'Checkpointing & recovery']
              },
              {
                phase: '03',
                title: 'Optimize',
                icon: <Rocket className="w-8 h-8" />,
                description: 'Compress and optimize models for deployment. Quantization, pruning, and distillation tools built into the platform.',
                features: ['Model quantization', 'Performance profiling', 'A/B testing', 'Cost analysis']
              },
              {
                phase: '04',
                title: 'Deploy',
                icon: <Play className="w-8 h-8" />,
                description: 'One-click deployment to production endpoints. Auto-scaling, monitoring, and version control for all deployed models.',
                features: ['Instant API deployment', 'Auto-scaling', 'Real-time monitoring', 'Rollback support']
              }
            ].map((stage, i) => (
              <div key={i} className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="text-8xl font-bold text-white">{stage.phase}</div>
                </div>
                <div className="lg:col-span-10">
                  <Card className="bg-gradient-to-r from-white/5 to-transparent border-l-4 border-[#0066FF] hover:from-white/10 transition-all">
                    <CardContent className="p-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-[#0066FF]">{stage.icon}</div>
                        <h3 className="text-4xl font-bold text-white">{stage.title}</h3>
                      </div>
                      <p className="text-white/70 text-xl mb-8 leading-relaxed">{stage.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {stage.features.map((feature, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-[#0066FF] rounded-full" />
                            <span className="text-white/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Tools */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">Everything included</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">No need to piece together tools from multiple vendors. Our platform provides everything you need.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { tool: 'Development IDEs', items: ['JupyterLab', 'VS Code Remote', 'SSH access'] },
              { tool: 'ML Frameworks', items: ['PyTorch', 'TensorFlow', 'JAX'] },
              { tool: 'Data Tools', items: ['Pandas', 'Spark', 'DuckDB'] },
              { tool: 'Experiment Tracking', items: ['MLflow', 'W&B', 'Custom dashboards'] },
              { tool: 'Model Serving', items: ['REST APIs', 'gRPC', 'WebSocket'] },
              { tool: 'Monitoring', items: ['Metrics', 'Logs', 'Alerts'] }
            ].map((category, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:border-[#0066FF]/50 transition-all">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-6">{category.tool}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-white/70">
                        <div className="w-1.5 h-1.5 bg-[#0066FF] rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Unique full-bleed design */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] via-purple-500 to-[#0066FF]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-full"
                  style={{
                    width: Math.random() * 4 + 2 + 'px',
                    height: Math.random() * 4 + 2 + 'px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    opacity: Math.random() * 0.5 + 0.2
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-7xl font-bold text-white mb-8">Ready to build?</h2>
          <p className="text-3xl text-white/90 mb-14 max-w-3xl mx-auto">
            Join thousands of AI teams building the future on BluBrg.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-[#0066FF] hover:bg-white/90 px-14 py-10 text-2xl font-bold">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AIDevelopment;