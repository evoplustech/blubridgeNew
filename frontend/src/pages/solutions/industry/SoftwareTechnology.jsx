import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { ArrowRight, Code, Rocket, Layers, Zap, GitBranch } from 'lucide-react';

const SoftwareTechnology = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero - Centered with Floating Elements */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0A1F3D]" />
          {/* Floating gradient orbs */}
          <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-[#0066FF]/30 rounded-full filter blur-[200px] animate-pulse" />
          <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-purple-500/20 rounded-full filter blur-[200px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-6 py-3 mb-8">
            <Code className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-semibold">Software & Technology</span>
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.05] max-w-5xl mx-auto">
            Ship AI features faster
          </h1>
          <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto">
            Software companies are in an AI arms race. BluBrg provides the scalable GPU infrastructure that lets you train, fine-tune, and deploy models without managing complex hardware.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products/serverless">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-7 text-lg">
                Start Building <Rocket className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
                Talk to Sales
              </Button>
            </Link>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {[
              { value: '10x', label: 'Faster deployment' },
              { value: '70%', label: 'Cost reduction' },
              { value: '99.9%', label: 'API uptime' },
              { value: '<50ms', label: 'Average latency' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Software Companies Choose BluBrg */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Built for developer velocity</h2>
            <p className="text-lg text-white/60">Focus on building products, not managing infrastructure. BluBrg abstracts away the complexity of GPU orchestration.</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-10 h-10" />,
                title: 'Deploy in Minutes',
                desc: 'Go from code to production with simple APIs. No DevOps overhead, no infrastructure management, just scalable AI compute on demand.',
                color: 'from-yellow-500/20 to-transparent'
              },
              {
                icon: <Layers className="w-10 h-10" />,
                title: 'Scale Automatically',
                desc: 'Handle traffic spikes seamlessly. Our infrastructure auto-scales from zero to thousands of requests per second without manual intervention.',
                color: 'from-blue-500/20 to-transparent'
              },
              {
                icon: <GitBranch className="w-10 h-10" />,
                title: 'Multi-Model Flexibility',
                desc: 'Run any framework—PyTorch, TensorFlow, JAX. Deploy custom models or use pre-trained ones. Switch between models without infrastructure changes.',
                color: 'from-purple-500/20 to-transparent'
              }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-3xl blur-xl group-hover:blur-2xl transition-all`} />
                <Card className="relative bg-white/5 border-white/10 hover:bg-white/10 transition-all h-full">
                  <CardContent className="p-10">
                    <div className="w-20 h-20 bg-[#0066FF]/10 rounded-2xl flex items-center justify-center mb-8 text-[#0066FF]">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed text-lg">{item.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases - Grid Layout */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16">Popular AI features powered by BluBrg</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                category: 'Generative AI',
                title: 'LLM-Powered Applications',
                desc: 'Build chatbots, content generators, code assistants, and AI copilots. Fine-tune LLMs on your proprietary data for domain-specific expertise.',
                icon: <Code className="w-6 h-6" />
              },
              {
                category: 'Computer Vision',
                title: 'Image & Video Analysis',
                desc: 'Real-time object detection, facial recognition, medical imaging analysis, and automated content moderation at scale.',
                icon: <Layers className="w-6 h-6" />
              },
              {
                category: 'NLP',
                title: 'Language Understanding',
                desc: 'Sentiment analysis, document classification, entity extraction, and semantic search for SaaS applications.',
                icon: <GitBranch className="w-6 h-6" />
              },
              {
                category: 'Recommendation',
                title: 'Personalization Engines',
                desc: 'Build recommendation systems that learn user preferences and deliver personalized content, products, or services in real-time.',
                icon: <Rocket className="w-6 h-6" />
              }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-white/5 via-white/5 to-transparent border border-white/10 rounded-2xl p-10 hover:border-purple-500/50 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400">
                    {item.icon}
                  </div>
                  <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">{item.category}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Experience */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-[#0A1F3D] border border-white/10 rounded-2xl p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/10 rounded-full filter blur-[100px]" />
              <div className="relative">
                <div className="text-[#0066FF] font-mono text-sm mb-4"># Deploy AI in 3 steps</div>
                <div className="space-y-6">
                  {[
                    { step: '1', title: 'Install SDK', code: 'pip install blubrg' },
                    { step: '2', title: 'Initialize Client', code: 'client = BluBrg(api_key="your_key")' },
                    { step: '3', title: 'Deploy Model', code: 'client.deploy("model.pt")' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-8 h-8 bg-[#0066FF] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {item.step}
                        </div>
                        <span className="text-white font-semibold">{item.title}</span>
                      </div>
                      <code className="text-[#0066FF] text-sm font-mono">{item.code}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Developer-first AI platform</h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                We've obsessed over developer experience. From comprehensive documentation to simple APIs, everything is designed to get you from idea to production as fast as possible.
              </p>
              <div className="space-y-6">
                {[
                  'Comprehensive API documentation with examples',
                  'SDKs for Python, JavaScript, Go, and more',
                  'Real-time monitoring and debugging dashboards',
                  'Dedicated support with <15min response time'
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-[#0066FF] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-purple-600" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
            <div className="relative p-16 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Start building AI features today</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join thousands of software companies using BluBrg to ship AI features faster without infrastructure complexity.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/products/serverless">
                  <Button size="lg" className="bg-white hover:bg-white/90 text-[#0066FF] px-10 py-7 text-lg font-bold">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-7 text-lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoftwareTechnology;