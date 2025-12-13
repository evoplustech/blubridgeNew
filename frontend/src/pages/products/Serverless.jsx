import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Check, Zap, DollarSign, Lock } from 'lucide-react';

const Serverless = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero Section - Unique for Serverless */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0A1F3D]" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0066FF] rounded-full filter blur-[150px]" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0052CC] rounded-full filter blur-[150px]" />
          </div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-[#0066FF]/20 rounded-full text-[#0066FF] text-sm font-semibold mb-6">SERVERLESS AI</div>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              AI inference without infrastructure management
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl">
              Access pre-trained models through simple API calls. Pay per request with instant scaling from zero to millions of requests per second.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button className="bg-white text-[#0A1F3D] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  API Documentation →
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center space-x-6 text-white/60">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-[#0066FF]" />
                <span>No setup required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-[#0066FF]" />
                <span>Auto-scaling</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-[#0066FF]" />
                <span>Pay per request</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-[#0066FF]/10 to-transparent border-[#0066FF]/30">
              <CardContent className="p-8">
                <Zap className="w-12 h-12 text-[#0066FF] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Instant Availability</h3>
                <p className="text-white/70">
                  Models are always warm and ready to serve requests. Zero cold start latency means consistent sub-second response times for all requests.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-[#0066FF]/10 to-transparent border-[#0066FF]/30">
              <CardContent className="p-8">
                <DollarSign className="w-12 h-12 text-[#0066FF] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Cost Effective</h3>
                <p className="text-white/70">
                  Pay only for what you use with per-request pricing. No idle GPU costs, no minimum commitments, and automatic cost optimization.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-[#0066FF]/10 to-transparent border-[#0066FF]/30">
              <CardContent className="p-8">
                <Lock className="w-12 h-12 text-[#0066FF] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Enterprise Security</h3>
                <p className="text-white/70">
                  Your data never leaves our secure infrastructure. End-to-end encryption, SOC 2 compliance, and guaranteed data privacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Model Library */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">Comprehensive Model Library</h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Access the latest open-source and proprietary models through unified APIs. New models added weekly.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: 'Text Generation', count: '50+', examples: 'LLaMA 3, Mixtral, Qwen' },
              { category: 'Code Generation', count: '15+', examples: 'CodeLLaMA, StarCoder, WizardCoder' },
              { category: 'Image Generation', count: '20+', examples: 'SDXL, Flux, Midjourney' },
              { category: 'Embeddings', count: '30+', examples: 'BGE, E5, Instructor' },
              { category: 'Vision', count: '25+', examples: 'CLIP, SAM, YOLO' },
              { category: 'Audio', count: '10+', examples: 'Whisper, Bark, MusicGen' },
              { category: 'Multimodal', count: '12+', examples: 'GPT-4V, LLaVA, Qwen-VL' },
              { category: 'Specialized', count: '40+', examples: 'BioBERT, FinBERT, Legal' }
            ].map((cat, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:border-[#0066FF]/50 transition-all">
                <CardContent className="p-6">
                  <div className="text-[#0066FF] font-bold text-3xl mb-2">{cat.count}</div>
                  <h3 className="text-white font-semibold mb-2">{cat.category}</h3>
                  <p className="text-white/60 text-sm">{cat.examples}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Example */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Simple, Powerful API</h2>
              <p className="text-white/70 mb-8">
                Call any model with just a few lines of code. Standard REST and WebSocket APIs work with any programming language or framework.
              </p>
              <ul className="space-y-4">
                {[
                  'OpenAI-compatible API endpoints',
                  'Streaming and batch processing',
                  'Automatic retry and failover',
                  'Real-time usage monitoring',
                  'Webhook notifications',
                  'Multi-region deployment'
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-white/80">
                    <Check className="w-5 h-5 text-[#0066FF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0F1419] rounded-xl p-6 border border-white/10">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <pre className="text-sm text-white/80 font-mono overflow-x-auto">
{`import blubrg

client = blubrg.Serverless(
  api_key="your_api_key"
)

response = client.inference(
  model="llama-3-70b",
  prompt="Explain quantum computing",
  max_tokens=500
)

print(response.text)`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Transparent Per-Request Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                type: 'Text Models',
                price: '$0.0001',
                unit: 'per 1K tokens',
                features: ['All LLaMA variants', 'Mixtral models', 'Code generation', 'Embeddings']
              },
              {
                type: 'Image Models',
                price: '$0.01',
                unit: 'per image',
                features: ['SDXL generation', 'Flux models', 'Upscaling', 'Style transfer']
              },
              {
                type: 'Multimodal',
                price: '$0.001',
                unit: 'per request',
                features: ['Vision-language', 'Audio processing', 'OCR', 'Video analysis']
              }
            ].map((plan, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.type}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#0066FF]">{plan.price}</span>
                    <span className="text-white/60 ml-2">{plan.unit}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center space-x-2 text-white/70 text-sm">
                        <Check className="w-4 h-4 text-[#0066FF]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-white/60 mb-4">All plans include: 99.9% uptime SLA, 24/7 support, unlimited API calls</p>
            <Link to="/pricing">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                View Detailed Pricing →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0066FF] to-[#0052CC]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Start building with serverless AI
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get $100 in free credits. No credit card required to start.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-[#0066FF] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Explore API Docs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Serverless;