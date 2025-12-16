import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowRight, ChevronDown, ChevronUp, Zap, ShoppingCart } from 'lucide-react';

const Inference = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-[#0a2e4a] via-[#051929] to-[#000000]">
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/20 rounded-full filter blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/20 rounded-full filter blur-[150px]" />
        </div>

        <div className="container-custom relative z-10 flex-1 flex items-center py-32">
          <div className="max-w-4xl">
            <h1 className="text-6xl sm:text-7xl font-bold text-white mb-8 leading-tight">
              AI & ML INFERENCE
            </h1>
            <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-3xl">
              We offer GPU-accelerated nodes designed for efficient AI and Machine Learning Inference at competitive prices. Our experienced team at BluBrg manages system optimizations and scaling, allowing you to focus on the science instead of infrastructure administration.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#0a2e4a] px-12 py-7 text-lg font-medium">
                  Get Started
                </Button>
              </Link>
              <Link to="/contact">
                <button className="text-white hover:text-white/80 px-12 py-7 text-lg font-medium transition-colors flex items-center gap-2">
                  Contact Sales <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Highlights */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Optimised Performance',
                desc: 'State-of-the-art GPU infrastructure with advanced optimizations delivers up to 7.2x faster inference compared to standard cloud platforms.'
              },
              {
                title: 'Simplified Workflows',
                desc: 'Pre-configured environments with popular frameworks and automated orchestration eliminate setup complexity and accelerate deployment.'
              },
              {
                title: 'Versatile Platform',
                desc: 'Support for all major ML frameworks and model formats with flexible deployment options from serverless to dedicated infrastructure.'
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speed up time-to-insights */}
      <section className="py-32 bg-[#000000]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-bold text-white mb-8">Speed up time-to-insights</h2>
              <p className="text-lg text-white/70 leading-relaxed mb-12">
                BluBrg's cutting-edge model optimizations and simplified orchestration and management features guarantee quicker results and enhanced performance while maintaining accuracy.
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">AI & ML Tools</h3>
                  <p className="text-white/70 leading-relaxed">
                    Experience lightning-fast inference with BluBrg Cloud's seamless integrations with industry-leading frameworks including PyTorch, TensorFlow, ONNX, vLLM, and comprehensive orchestration tools.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Simplified Orchestration and Management</h3>
                  <p className="text-white/70 leading-relaxed">
                    Simplified resource management with automated orchestration, intelligent load balancing, and built-in monitoring ensures optimal performance without operational complexity.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-3 gap-6 items-center justify-center">
                {[
                  { name: 'PyTorch', color: 'from-orange-500/20 to-red-500/20' },
                  { name: 'TensorFlow', color: 'from-orange-400/20 to-amber-500/20' },
                  { name: 'ONNX', color: 'from-blue-500/20 to-cyan-500/20' },
                  { name: 'vLLM', color: 'from-purple-500/20 to-pink-500/20' },
                  { name: 'Kubernetes', color: 'from-blue-600/20 to-indigo-500/20' },
                  { name: 'SLURM', color: 'from-green-500/20 to-emerald-500/20' },
                  { name: 'Triton', color: 'from-cyan-500/20 to-teal-500/20' },
                  { name: 'Ray', color: 'from-violet-500/20 to-purple-500/20' },
                  { name: 'MLflow', color: 'from-pink-500/20 to-rose-500/20' }
                ].map((tool, i) => (
                  <div
                    key={i}
                    className={`aspect-square bg-gradient-to-br ${tool.color} border border-white/10 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-white/80 text-sm font-semibold text-center px-2">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inference Stack */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-8">Inference Stack</h2>
            <p className="text-lg text-white/70 mb-16 max-w-3xl">
              BluBrg provides a complete technology stack for running intensive inference workloads in the most efficient and high-performing way possible.
            </p>

            <div className="space-y-8">
              {/* Marketplace */}
              <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">MARKETPLACE</h3>
                <div className="flex flex-wrap gap-4">
                  {['Jupyter Notebook', 'TensorFlow', 'PyTorch', 'ONNX Runtime', 'vLLM', 'Triton', 'HuggingFace'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 text-white text-sm">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* User Experience */}
              <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">USER EXPERIENCE</h3>
                <div className="flex flex-wrap gap-4">
                  {['Web Console', 'API', 'CLI'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 text-white text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">PLATFORM</h3>
                <div className="flex flex-wrap gap-4">
                  {['Virtual Machines', 'Managed Kubernetes'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 text-white text-sm">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">INFRASTRUCTURE</h3>
                <div className="flex flex-wrap gap-4">
                  {['GPU Compute', 'Storage', 'Networking'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-2 text-white text-sm">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hardware */}
              <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">HARDWARE</h3>
                <div className="flex flex-wrap gap-4">
                  {['AMD MI300X', 'AMD MI250X', 'NVIDIA GB200', 'NVIDIA H100', 'NVIDIA H200', 'NVIDIA A100', '...'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 text-white text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Data Centre */}
              <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">DATA CENTRE</h3>
                <div className="flex flex-wrap gap-4">
                  {['Renewable Energy', 'Low-latency Fibre'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-gray-500/10 border border-gray-500/30 rounded-full px-4 py-2 text-white text-sm">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance */}
      <section className="py-32 bg-[#000000]">
        <div className="container-custom">
          <h2 className="text-5xl font-bold text-white mb-20 text-center">Performance</h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { 
                metric: '40%', 
                label: 'MORE EFFICIENT', 
                desc: 'Improved resource utilization and optimized model serving delivers 40% better efficiency compared to standard inference platforms.',
                link: 'See GPU Nodes'
              },
              { 
                metric: 'UP TO 7.2X', 
                label: 'FASTER INFERENCE', 
                desc: 'Accelerate time to insights with industry-leading inference performance powered by latest GPU technology and optimized software.',
                link: 'Blog Post'
              },
              { 
                metric: '80%', 
                label: 'LOWER COST', 
                desc: 'More performance for less spend. Achieve significant cost savings through efficient infrastructure and competitive pricing.',
                link: 'Our Data Centres'
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-10">
                <div className="text-6xl font-bold text-white mb-2">{item.metric}</div>
                <div className="text-white text-lg font-semibold mb-4">{item.label}</div>
                <p className="text-white/60 leading-relaxed mb-6">{item.desc}</p>
                <Link to="/products/gpu-nodes" className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2">
                  {item.link} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container-custom">
          <h2 className="text-5xl font-bold text-white mb-20">Key Services</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: <Zap className="w-16 h-16 text-cyan-400" />,
                title: 'AI Compute',
                subtitle: 'Inference',
                desc: 'GPU-accelerated nodes designed for AI and ML Inference at scale. Deploy models with confidence on infrastructure optimized for low-latency, high-throughput inference workloads.'
              },
              {
                icon: <ShoppingCart className="w-16 h-16 text-blue-400" />,
                title: 'AI Marketplace',
                subtitle: 'Marketplace',
                desc: 'An ecosystem of services for developing and deploying AI applications. Access pre-configured environments, optimized runtimes, and ready-to-use inference solutions.'
              }
            ].map((item, i) => (
              <Card key={i} className="bg-[#121212] border-white/10 hover:border-cyan-500/50 transition-all">
                <CardContent className="p-12">
                  <div className="mb-8">{item.icon}</div>
                  <div className="text-cyan-400 font-semibold mb-2">{item.subtitle}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed text-lg">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* More Solutions */}
      <section className="py-32 bg-[#000000]">
        <div className="container-custom">
          <h2 className="text-5xl font-bold text-white mb-8">More solutions</h2>
          <p className="text-xl text-white/70 mb-16 max-w-3xl">
            BluBrg accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'TRAINING',
                metrics: ['+40% Efficiency', '-45% Cost'],
                gradient: 'from-purple-900/50 via-indigo-900/40 to-violet-900/50',
                link: '/solutions/training'
              },
              {
                title: 'FINE TUNING',
                metrics: ['+40% Efficiency', '30% Faster'],
                gradient: 'from-emerald-900/50 via-teal-900/40 to-green-900/50',
                link: '/solutions/fine-tuning'
              },
              {
                title: 'AI DEVELOPMENT',
                metrics: ['80% Lower Cost', '+40% Efficiency'],
                gradient: 'from-amber-900/50 via-orange-900/40 to-yellow-900/50',
                link: '/solutions/ai-development'
              }
            ].map((item, i) => (
              <Link key={i} to={item.link}>
                <div className={`relative h-96 bg-gradient-to-br ${item.gradient} rounded-2xl overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-10">
                    <h3 className="text-3xl font-light text-white mb-6 tracking-wider">{item.title}</h3>
                    <div className="space-y-2">
                      {item.metrics.map((metric, j) => (
                        <div key={j} className="text-white/90 text-lg font-light">{metric}</div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-white/10 rounded-2xl group-hover:border-cyan-500/60 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container-custom">
          <h2 className="text-5xl font-bold text-white mb-16">FAQs</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "What makes BluBrg's GPU Cloud different from others?",
                answer: "BluBrg specializes in AI-optimized infrastructure with the latest GPUs, ultra-low latency networking, and pre-configured inference stacks. Our platform delivers up to 7.2x faster inference and 80% cost savings compared to general cloud platforms."
              },
              {
                question: "What types of GPUs does BluBrg offer for inference?",
                answer: "We provide access to the latest inference-optimized GPUs including NVIDIA GB200, H100, H200, A100, and AMD MI300X. All configurations include high-bandwidth networking and optimized inference runtimes."
              },
              {
                question: "How does BluBrg support sustainability?",
                answer: "All BluBrg data centers run on 100% renewable energy. We optimize infrastructure for maximum efficiency and locate facilities strategically in regions with abundant clean energy sources."
              },
              {
                question: "What inference frameworks are supported?",
                answer: "BluBrg supports all major inference frameworks including TensorFlow Serving, PyTorch, ONNX Runtime, vLLM, Triton Inference Server, and more. You can bring your own containers or use our pre-optimized marketplace images."
              },
              {
                question: "How quickly can I deploy inference endpoints?",
                answer: "You can deploy inference endpoints within minutes using our marketplace images. Our API and CLI tools enable rapid provisioning, and our team provides onboarding support to optimize your deployment."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-8 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-xl font-bold text-white pr-8">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-6 h-6 text-white flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-white flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-8">
                    <p className="text-white/70 leading-relaxed text-lg">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 bg-gradient-to-r from-[#0066FF] to-[#0052CC]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-light text-white mb-12 max-w-4xl mx-auto leading-tight">
            Access thousands of GPUs tailored to your requirements
          </h2>
          <div className="flex gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white hover:bg-white/90 text-[#0066FF] px-12 py-7 text-lg font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-12 py-7 text-lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inference;
