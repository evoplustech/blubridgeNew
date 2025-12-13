import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowRight, Sparkles, Target } from 'lucide-react';

const FineTuning = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Unique Hero - Asymmetric with floating card */}
      <section className="relative py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F3D] via-[#0C2644] to-[#0A1F3D]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 right-1/3 w-[700px] h-[700px] bg-[#0066FF] rounded-full filter blur-[200px] animate-pulse" style={{animationDuration: '6s'}} />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-6 h-6 text-[#0066FF]" />
                <span className="text-[#0066FF] font-bold uppercase tracking-widest text-sm">Model Customization</span>
              </div>
              <h1 className="text-7xl font-bold text-white mb-8 leading-[1.05]">
                Turn general models into domain experts
              </h1>
              <p className="text-2xl text-white/70 mb-10 leading-relaxed">
                Fine-tuning adapts pre-trained models to your specific data and use cases. Achieve expert-level performance without training from scratch.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link to="/products/fine-tuning">
                  <Button size="lg" className="bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#003D99] text-white px-10 py-7 text-lg font-semibold">
                    Start Fine-Tuning
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
                    Book Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 hidden lg:block">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 shadow-2xl">
                <CardContent className="p-10">
                  <div className="space-y-8">
                    <div>
                      <div className="text-[#0066FF] text-sm font-bold mb-2 uppercase tracking-wider">Efficiency Gain</div>
                      <div className="text-6xl font-bold text-white mb-2">10X</div>
                      <div className="text-white/60">Faster than training from scratch</div>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div>
                      <div className="text-[#0066FF] text-sm font-bold mb-2 uppercase tracking-wider">Accuracy</div>
                      <div className="text-6xl font-bold text-white mb-2">95%+</div>
                      <div className="text-white/60">On specialized tasks</div>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div>
                      <div className="text-[#0066FF] text-sm font-bold mb-2 uppercase tracking-wider">Cost Savings</div>
                      <div className="text-6xl font-bold text-white mb-2">90%</div>
                      <div className="text-white/60">Versus full training</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Approaches Section - Unique card design */}
      <section className="py-32 bg-gradient-to-b from-[#0B1F35] to-[#0A1F3D]">
        <div className="container-custom">
          <div className="mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">Choose your fine-tuning approach</h2>
            <p className="text-xl text-white/60 max-w-3xl">Different methods optimize for speed, memory, or accuracy depending on your requirements.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            {[
              {
                icon: <Target className="w-12 h-12" />,
                method: 'Parameter-Efficient (LoRA/QLoRA)',
                tagline: 'Fast, memory-efficient, production-ready',
                description: 'Freeze the base model and train only lightweight adapter layers. Achieves 95% of full fine-tuning accuracy with 90% less memory.',
                benefits: ['Trains 5X faster', 'Minimal GPU memory', 'Easy to swap adapters', 'Lower cost'],
                gradient: 'from-purple-500/10 via-[#0066FF]/10 to-transparent'
              },
              {
                icon: <Sparkles className="w-12 h-12" />,
                method: 'Full Parameter Fine-Tuning',
                tagline: 'Maximum customization and accuracy',
                description: 'Update all model weights for complete adaptation. Required for significant domain shifts or when base model quality is insufficient.',
                benefits: ['Maximum accuracy', 'Full model control', 'Best for large datasets', 'Complete specialization'],
                gradient: 'from-[#0066FF]/10 via-cyan-500/10 to-transparent'
              }
            ].map((approach, i) => (
              <Card key={i} className={`bg-gradient-to-br ${approach.gradient} border-white/10 overflow-hidden hover:border-[#0066FF]/50 transition-all group`}>
                <CardContent className="p-10">
                  <div className="text-[#0066FF] mb-6 group-hover:scale-110 transition-transform">{approach.icon}</div>
                  <h3 className="text-3xl font-bold text-white mb-3">{approach.method}</h3>
                  <div className="text-[#0066FF] text-sm font-semibold mb-6 uppercase tracking-wider">{approach.tagline}</div>
                  <p className="text-white/70 text-lg mb-8 leading-relaxed">{approach.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {approach.benefits.map((benefit, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#0066FF] rounded-full" />
                        <span className="text-white text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real-World Applications */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="max-w-3xl mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">From generic to expert</h2>
            <p className="text-xl text-white/60">See how organizations fine-tune models to achieve breakthrough results in their domains.</p>
          </div>
          <div className="space-y-8">
            {[
              {
                domain: 'Medical Diagnostics',
                before: 'General LLM with basic medical knowledge',
                after: 'Specialized model trained on clinical literature',
                improvement: '87% → 96% diagnostic accuracy'
              },
              {
                domain: 'Legal Document Analysis',
                before: 'Generic text model misses legal nuances',
                after: 'Fine-tuned on case law and statutes',
                improvement: '3 hours → 15 minutes per contract'
              },
              {
                domain: 'Financial Risk Assessment',
                before: 'Standard model lacks market context',
                after: 'Adapted on historical trading data',
                improvement: '65% → 91% prediction accuracy'
              }
            ].map((example, i) => (
              <div key={i} className="bg-gradient-to-r from-white/5 to-transparent border-l-4 border-[#0066FF] p-8 rounded-r-2xl hover:from-white/10 transition-all">
                <div className="flex flex-wrap items-center gap-8">
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-[#0066FF] font-bold uppercase tracking-wider text-sm mb-2">Domain</div>
                    <div className="text-white text-2xl font-bold">{example.domain}</div>
                  </div>
                  <div className="flex items-center gap-6 flex-1">
                    <div className="flex-1">
                      <div className="text-white/40 text-sm mb-1">Before</div>
                      <div className="text-white/70">{example.before}</div>
                    </div>
                    <ArrowRight className="text-[#0066FF] flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-white/40 text-sm mb-1">After</div>
                      <div className="text-white">{example.after}</div>
                    </div>
                  </div>
                  <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-xl px-6 py-3">
                    <div className="text-[#0066FF] font-bold text-lg">{example.improvement}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Unique split design */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F3D] to-[#0066FF]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white rounded-full filter blur-[200px]" />
          </div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-6xl font-bold text-white mb-6">Start fine-tuning today</h2>
              <p className="text-2xl text-white/80">Get $500 in credits to experiment with fine-tuning on our platform.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/products/fine-tuning">
                <Button size="lg" className="bg-white text-[#0066FF] hover:bg-white/90 px-12 py-8 text-xl font-semibold">
                  Claim Free Credits
                </Button>
              </Link>
              <Link to="/docs">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-12 py-8 text-xl font-semibold">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FineTuning;