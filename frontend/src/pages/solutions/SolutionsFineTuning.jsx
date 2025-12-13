import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
im{ Check, Target, Sparkles, TrendingUp } from 'lucide-react';

const SolutionsFineTuning = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F3D] via-[#0D2640] to-[#0A1F3D]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#0066FF] rounded-full filter blur-[150px]" />
          </div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-[#0066FF]/20 rounded-full text-[#0066FF] text-sm font-semibold mb-6 uppercase">Fine-Tuning Solutions</div>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Adapt foundation models to your specific domain
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Transform general-purpose models into specialized experts through efficient fine-tuning. Achieve state-of-the-art performance on your proprietary datasets without full retraining costs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/products/fine-tuning">
                <Button className="bg-white text-[#0A1F3D] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                  Explore Fine-Tuning Product
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Discuss Your Use Case →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fine-Tuning Approaches */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12">Fine-Tuning Methodologies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Target className="w-10 h-10" />,
                method: 'Full Parameter Fine-Tuning',
                description: 'Update all model weights during training for maximum adaptation capability.',
                when: 'Use when you have substantial training data and require complete model customization.',
                benefits: ['Maximum flexibility', 'Best final accuracy', 'Complete control over model behavior'],
                considerations: ['Higher GPU memory requirements', 'Longer training time', 'Larger compute budget']
              },
              {
                icon: <Sparkles className="w-10 h-10" />,
                method: 'Parameter-Efficient Fine-Tuning (PEFT)',
                description: 'Freeze base model and train only small adapter layers or LoRA matrices.',
                when: 'Ideal for resource constraints, faster iteration, or when base model quality is already high.',
                benefits: ['90% less memory usage', '3-5X faster training', 'Easier deployment'],
                considerations: ['Slight accuracy trade-off', 'Limited to specific use cases', 'Adapter architecture choices']
              }
            ].map((approach, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-[#0066FF]">{approach.icon}</div>
                    <h3 className="text-2xl font-bold text-white">{approach.method}</h3>
                  </div>
                  <p className="text-white/70 mb-4">{approach.description}</p>
                  <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-lg p-4 mb-6">
                    <div className="text-[#0066FF] text-sm font-semibold mb-1">When to Use</div>
                    <p className="text-white/80 text-sm">{approach.when}</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-white font-semibold mb-2 text-sm">Benefits</div>
                      {approach.benefits.map((benefit, j) => (
                        <div key={j} className="flex items-center space-x-2 text-white/70 text-sm mb-1">
                          <Check className="w-4 h-4 text-[#0066FF]" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2 text-sm">Considerations</div>
                      {approach.considerations.map((consideration, j) => (
                        <div key={j} className="text-white/60 text-sm mb-1">• {consideration}</div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Case Examples */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-6">Fine-Tuning Use Cases</h2>
          <p className="text-white/70 text-lg mb-12 max-w-3xl">
            Organizations across industries fine-tune models to achieve domain expertise that off-the-shelf models cannot provide.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                industry: 'Legal Services',
                challenge: 'Legal language differs significantly from general text. Pre-trained models struggle with case law citations, legal precedents, and jurisdiction-specific terminology.',
                solution: 'Fine-tune on firm-specific documents, case histories, and legal databases to create models that understand your practice area and jurisdiction.',
                outcome: 'Contract review automation, legal research assistance, and document generation with 95%+ accuracy.'
              },
              {
                industry: 'Healthcare',
                challenge: 'Medical terminology, clinical workflows, and patient privacy requirements demand specialized model behavior beyond general capabilities.',
                solution: 'Adapt models on de-identified clinical notes, research papers, and treatment protocols while maintaining HIPAA compliance.',
                outcome: 'Clinical decision support, automated diagnosis assistance, and medical record summarization.'
              },
              {
                industry: 'Financial Services',
                challenge: 'Financial models require understanding of market dynamics, regulatory language, and institution-specific risk frameworks.',
                solution: 'Fine-tune on market data, financial reports, regulatory filings, and internal risk assessment documents.',
                outcome: 'Automated compliance checking, risk analysis, and investment research at scale.'
              },
              {
                industry: 'Software Engineering',
                challenge: 'Code generation models need to understand company-specific APIs, coding standards, and architectural patterns.',
                solution: 'Train on internal codebases, API documentation, and code review history to create organization-aware assistants.',
                outcome: 'Context-aware code completion, automated testing, and documentation generation.'
              }
            ].map((useCase, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <div className="text-[#0066FF] font-semibold mb-2">{useCase.industry}</div>
                  <h3 className="text-xl font-bold text-white mb-4">Domain Adaptation Challenge</h3>
                  <p className="text-white/70 text-sm mb-4">{useCase.challenge}</p>
                  <h4 className="text-white font-semibold mb-2 text-sm">Solution Approach</h4>
                  <p className="text-white/70 text-sm mb-4">{useCase.solution}</p>
                  <div className="bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-lg p-3">
                    <div className="text-[#0066FF] text-xs font-semibold mb-1">Business Outcome</div>
                    <p className="text-white/80 text-sm">{useCase.outcome}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Requirements */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6 text-center">Infrastructure for Efficient Fine-Tuning</h2>
            <p className="text-white/70 text-center mb-12">
              BluBrg provides optimized infrastructure that reduces fine-tuning time and cost.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  feature: 'Rapid Iteration',
                  description: 'Test multiple hyperparameters, datasets, and approaches quickly with on-demand GPU access.'
                },
                {
                  icon: <Check className="w-8 h-8" />,
                  feature: 'Automatic Optimization',
                  description: 'Hyperparameter search, learning rate scheduling, and early stopping built into the platform.'
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  feature: 'Version Management',
                  description: 'Track experiments, compare results, and deploy best-performing checkpoints seamlessly.'
                }
              ].map((item, i) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center text-[#0066FF] mb-3">{item.icon}</div>
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
            Start fine-tuning with $500 in free credits
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            New customers receive credits to experiment with fine-tuning on our platform.
          </p>
          <Link to="/contact">
            <Button className="bg-white text-[#0066FF] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
              Claim Free Credits
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SolutionsFineTuning;