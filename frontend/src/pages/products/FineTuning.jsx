import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Check, Brain, Target, Sparkles } from 'lucide-react';

const FineTuning = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero Section - Unique for Fine-tuning */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#0A1F3D] via-[#0C2540] to-[#0A1F3D]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0066FF] rounded-full filter blur-[120px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-[#0066FF]/20 rounded-full text-[#0066FF] text-sm font-semibold mb-6">MODEL CUSTOMIZATION</div>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Transform foundation models into domain experts
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Fine-tune pre-trained models on your proprietary data. Achieve superior performance on specialized tasks without training from scratch.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-white text-[#0A1F3D] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                  Start Fine-Tuning
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  View Examples →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">Streamlined Fine-Tuning Process</h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Our platform handles the complexity of distributed training, hyperparameter tuning, and model versioning automatically.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Upload Data', desc: 'Securely upload your training dataset in any format' },
              { step: '02', title: 'Select Model', desc: 'Choose from 100+ pre-trained foundation models' },
              { step: '03', title: 'Configure', desc: 'Set training parameters or use smart defaults' },
              { step: '04', title: 'Deploy', desc: 'Instantly deploy to production inference endpoints' }
            ].map((item, i) => (
              <div key={i} className="relative">
                {/* {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-[#0066FF]/30" />
                )} */}
                <Card className="bg-white/5 border-white/10 relative z-10">
                  <CardContent className="p-6">
                    <div className="text-5xl font-bold text-[#0066FF]/30 mb-3">{item.step}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <Brain className="w-12 h-12 text-[#0066FF] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Any Model, Any Framework</h3>
                <p className="text-white/70 mb-6">
                  Fine-tune LLaMA, GPT, BERT, T5, or custom architectures. Native support for PyTorch, TensorFlow, and Hugging Face.
                </p>
                <ul className="space-y-2">
                  {['100+ base models', 'Custom architectures', 'PEFT methods (LoRA, QLoRA)', 'Full parameter tuning'].map((item, i) => (
                    <li key={i} className="flex items-center space-x-2 text-white/70 text-sm">
                      <Check className="w-4 h-4 text-[#0066FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-[#0066FF] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Intelligent Optimization</h3>
                <p className="text-white/70 mb-6">
                  Automated hyperparameter search finds optimal configurations. Early stopping prevents overfitting and saves compute.
                </p>
                <ul className="space-y-2">
                  {['Auto hyperparameter tuning', 'Learning rate scheduling', 'Gradient accumulation', 'Mixed precision training'].map((item, i) => (
                    <li key={i} className="flex items-center space-x-2 text-white/70 text-sm">
                      <Check className="w-4 h-4 text-[#0066FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <Sparkles className="w-12 h-12 text-[#0066FF] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Production Integration</h3>
                <p className="text-white/70 mb-6">
                  Seamlessly deploy fine-tuned models to inference endpoints. Version control and rollback with zero downtime.
                </p>
                <ul className="space-y-2">
                  {['One-click deployment', 'A/B testing', 'Model versioning', 'Performance monitoring'].map((item, i) => (
                    <li key={i} className="flex items-center space-x-2 text-white/70 text-sm">
                      <Check className="w-4 h-4 text-[#0066FF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12">Fine-Tuning Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Domain-Specific Language Models',
                description: 'Adapt general-purpose LLMs to legal, medical, financial, or technical domains. Achieve expert-level performance on specialized terminology and reasoning.',
                benefits: ['90% accuracy improvement', '10X faster convergence', 'Reduced hallucinations']
              },
              {
                title: 'Custom Code Generation',
                description: 'Fine-tune code models on your internal codebases and API patterns. Generate code that follows your team\'s conventions and best practices.',
                benefits: ['Organization-specific patterns', 'Private API knowledge', 'Style consistency']
              },
              {
                title: 'Enterprise Chatbots',
                description: 'Create conversational AI that understands your products, services, and company policies. Handle customer queries with accuracy and brand voice.',
                benefits: ['Brand-aligned responses', 'Product expertise', 'Multi-language support']
              },
              {
                title: 'Document Understanding',
                description: 'Train models to extract entities, classify documents, and answer questions from your specific document types and formats.',
                benefits: ['Custom entity extraction', 'Format-specific parsing', 'Multi-modal processing']
              }
            ].map((useCase, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:border-[#0066FF]/50 transition-all">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">{useCase.title}</h3>
                  <p className="text-white/70 mb-6">{useCase.description}</p>
                  <div className="space-y-2">
                    {useCase.benefits.map((benefit, j) => (
                      <div key={j} className="flex items-center space-x-2 text-white/80">
                        <div className="w-1.5 h-1.5 bg-[#0066FF] rounded-full" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white/5 rounded-2xl p-12 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Transparent Pricing</h2>
            <p className="text-white/70 text-center mb-8">
              Pay only for GPU hours used during fine-tuning. No hidden fees or minimum commitments.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-[#0066FF] mb-2">$1.99</div>
                <div className="text-white/60 text-sm">per GPU hour</div>
                <div className="text-white/40 text-xs mt-1">H100 GPUs</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#0066FF] mb-2">$0.50</div>
                <div className="text-white/60 text-sm">per GB storage</div>
                <div className="text-white/40 text-xs mt-1">Model checkpoints</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#0066FF] mb-2">Free</div>
                <div className="text-white/60 text-sm">API requests</div>
                <div className="text-white/40 text-xs mt-1">Deployment included</div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link to="/pricing">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  View Full Pricing →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0066FF] to-[#0052CC]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Build specialized AI models faster
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start fine-tuning today with $500 in free credits for new customers.
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

export default FineTuning;