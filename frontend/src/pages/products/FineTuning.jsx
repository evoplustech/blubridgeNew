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
              Fine-tune open-source models directly in your browser
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Serverless, usage-based fine-tuning that keeps you fully in control. Zero configuration, friction-free execution, and uncompromised performance throughout.
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
              { step: '01', title: 'Built for Builders', desc: 'Fine-tuning models without dealing with backend operations.' },
              { step: '02', title: 'Performance First', desc: 'Track optimization progress live and refine cycles rapidly with assurance' },
              { step: '03', title: 'Clear Economics', desc: 'Spend only on actual training usage through a straightforward pricing' },
              { step: '04', title: 'Fully Serverless', desc: 'Begin instantly, expand effortlessly, and dedicate all attention' }
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
                <h3 className="text-2xl font-bold text-white mb-3">Supported Models</h3>
                <p className="text-white/70 mb-6">
                  Adapt top open-source models such as Qwen2.5 and Deepseek R1 to your needs. We continuously review and introduce additional options to ensure you always have a strong and up-to-date starting point.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-[#0066FF] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Fine-tune Pricing</h3>
                <p className="text-white/70 mb-6">
                  Costs are determined by model scale and computed using the full volume of tokens handled, covering training data across every epoch along with any validation runs performed during evaluation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <Sparkles className="w-12 h-12 text-[#0066FF] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Built for Speed & Simplicity</h3>
                <p className="text-white/70 mb-6">
                  Maintain complete transparency across fine-tuning pipelines through simple task monitoring, organised data handling, and intuitive outcome visualisation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12">How it works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Upload your data - drop in a CSV file',
                description: 'Build and control both learning and evaluation data collections straight from the interface'
                
              },
              {
                title: 'Configure your job - Tweak setting or rely on smart defaults',
                description: 'Apply LoRa to enable resource-efficient model adaptation, set epoch counts, and fine-adjust parameters such as learning rate, weight decay, and additional training controls'
  
              },
              {
                title: 'Monitor & Evaluate real time metrics at a glance',
                description: 'Observe optimization and evaluation metrics, including loss values, perplexity, and precision, while the process executes.'
               
              },
              {
                title: 'Export your model - Download or push to Hugging face',
                description: 'Download the tuned model in PyTorch or ONNX format, or publish it directly to Hugging Face with minimal effort.',
                
              }
            ].map((useCase, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:border-[#0066FF]/50 transition-all">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">{useCase.title}</h3>
                  <p className="text-white/70 mb-6">{useCase.description}</p>
                  {/* <div className="space-y-2">
                    {useCase.benefits.map((benefit, j) => (
                      <div key={j} className="flex items-center space-x-2 text-white/80">
                        <div className="w-1.5 h-1.5 bg-[#0066FF] rounded-full" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div> */}
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
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Savings by design, not compromise</h2>
            <p className="text-white/70 text-center mb-8">
             Each tier of our vertically unified platform is carefully refined, spanning physical components through coordination layers, reducing processing expenses while maintaining stable output. The outcome is tangible cost reduction delivered straight to users, achieved without compromising velocity, capacity, or protection.

            </p>

             <h2 className="text-3xl font-bold text-white mb-6 text-center">Serverless without trade-offs</h2>
            <p className="text-white/70 text-center mb-8">
             Serverless with no trade-offs. Ownership of models stays entirely with you, and information is never recycled or used again for learning. Benefit from complete workload separation, embedded regulatory controls, and powerful computing resources which are available immediately, without the burden of infrastructure operations.


            </p>
            {/* <div className="grid md:grid-cols-3 gap-6 text-center">
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
            </div> */}
            {/* <div className="mt-8 text-center">
              <Link to="/pricing">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  View Full Pricing →
                </Button>
              </Link>
            </div> */}
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