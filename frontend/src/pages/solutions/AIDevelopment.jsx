import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid } from 'lucide-react';

const AIDevelopment = () => {
  const [openFaq, setOpenFaq] = useState(0); // First FAQ open by default

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Hero Section - Orange/Amber gradient with abstract 3D visuals */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background with orange/amber gradient and abstract shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f05] via-[#0d0805] to-[#000000]">
          {/* Abstract 3D shard visuals */}
          <div className="absolute top-0 right-0 w-[70%] h-full opacity-60">
            <div className="absolute top-10 right-10 w-[500px] h-[400px] bg-gradient-to-br from-amber-600/40 via-orange-700/30 to-transparent rounded-full filter blur-[100px] transform rotate-12" />
            <div className="absolute top-40 right-40 w-[300px] h-[350px] bg-gradient-to-br from-orange-500/35 via-amber-800/25 to-transparent rounded-full filter blur-[80px] transform -rotate-6" />
            <div className="absolute top-20 right-60 w-[400px] h-[300px] bg-gradient-to-br from-red-800/25 via-orange-900/20 to-transparent rounded-full filter blur-[90px]" />
          </div>
        </div>

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              AI DEVELOPMENT
            </h1>
            <p className="text-lg lg:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
              Blubrg’s platform makes every step of building AI smoother, enabling you to move quickly from early experiments in interactive notebooks to deploying fully scaled AI applications across multiple GPU clusters. It removes barriers and complexity, helping teams innovate faster and achieve better outcomes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#1a0f05] px-10 py-6 text-base font-medium rounded-md">
                  Get Started
                </Button>
              </Link>
              <Link to="/contact">
                <button className="text-white hover:text-white/80 px-6 py-6 text-base font-medium transition-colors flex items-center gap-2">
                  Contact Sales <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Highlights - 3 Column Strip */}
      <section className="py-16 bg-[#050505] border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Ease of Migration</h3>
              <p className="text-white/60 text-sm leading-relaxed">
               The platform works across cloud, on-premises, and hybrid environments, giving you flexibility and avoiding dependence on a single provider. You can choose the infrastructure setup that best fits your needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Expert Assistance</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Tap into skilled support to help guide your transition and ensure you get the most out of your AI infrastructure, with knowledgeable teams helping you optimise performance and execution.

              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Increased Productivity</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Blubrg’s cloud stack automates routine and repetitive tasks, liberating your team to focus on strategic work instead of day-to-day infrastructure management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fastest GPU Nodes Available Section */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-amber-500 text-sm font-medium mb-3 uppercase tracking-wider">NVIDIA & AMD PARTNERSHIP</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Fastest GPU nodes<br />available
              </h2>
              <p className="text-base text-white/65 leading-relaxed mb-10">
                The Blubrg GPU Cloud delivers high-performance, bare-metal GPU nodes purpose-built for demanding AI workloads. Whether you’re training new models or improving existing ones, the infrastructure offers dependable, top-tier performance to support faster development.
              </p>

              <div className="space-y-8">
                <div className="border-l-2 border-amber-500 pl-5">
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">Access Latest AI Frameworks</h3>
                  <p className="text-white/50 text-xs font-medium mb-2">AI Development Tools</p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    You get easy access to modern AI tools and frameworks such as TensorFlow Serving, PyTorch, and ONNX Runtime, enabling you to work with the technologies your team prefers
                  </p>
                </div>

                <div className="border-l-2 border-amber-500 pl-5">
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">Optimised Resource Utilisation</h3>
                  <p className="text-white/50 text-xs font-medium mb-2">Maximising Efficiency</p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    The architecture is designed to minimise idle GPU time and maximise throughput, ensuring your compute resources are used as effectively as possible.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Framework icons cluster */}
            <div className="flex justify-center">
              <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 w-full max-w-md">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: 'PyTorch', color: 'bg-orange-500/20 border-orange-500/30' },
                    { name: 'TensorFlow', color: 'bg-amber-500/20 border-amber-500/30' },
                    { name: 'ONNX', color: 'bg-gray-500/20 border-gray-500/30' },
                    { name: 'vLLM', color: 'bg-purple-500/20 border-purple-500/30' },
                    { name: 'ML', color: 'bg-amber-600/30 border-amber-500/50', isCenter: true },
                    { name: 'Triton', color: 'bg-green-500/20 border-green-500/30' },
                    { name: 'Ray', color: 'bg-blue-500/20 border-blue-500/30' },
                    { name: 'K8s', color: 'bg-indigo-500/20 border-indigo-500/30' },
                    { name: 'SLURM', color: 'bg-teal-500/20 border-teal-500/30' }
                  ].map((tool, i) => (
                    <div
                      key={i}
                      className={`aspect-square ${tool.color} border rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-200 ${tool.isCenter ? 'ring-2 ring-amber-400/50' : ''}`}
                    >
                      <span className="text-white/80 text-xs font-semibold text-center px-1">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Development Stack - Two column layout */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">AI-Development<br />Stack</h2>
            <p className="text-base text-white/60 max-w-2xl">
             Blubrg offers a complete technology stack and integrated development environment purpose-built for creating AI models, large language models (LLMs), and other machine learning applications. This stack works seamlessly with a broad set of third-party tools to fit your existing workflows.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Stacked categories */}
            <div className="space-y-4">
              {/* Marketplace */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wider">MARKETPLACE</h3>
                <div className="flex flex-wrap gap-2">
                  {['Jupyter Notebook', 'TensorFlow', 'PyTorch'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1.5 text-white text-xs">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wider">PLATFORM</h3>
                <div className="flex flex-wrap gap-2">
                  {['Virtual Machines', 'Managed Kubernetes'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-3 py-1.5 text-white text-xs">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wider">INFRASTRUCTURE</h3>
                <div className="flex flex-wrap gap-2">
                  {['GPU Compute', 'Storage', 'Networking'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1.5 text-white text-xs">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hardware */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wider">HARDWARE</h3>
                <div className="flex flex-wrap gap-2">
                  {['AMD MI300X', 'AMD MI50X', 'NVDA GB200', 'H100', '...'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1.5 text-white text-xs">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - User Experience & Data Centre */}
            <div className="space-y-4">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 h-[calc(50%-8px)]">
                <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wider">USER EXPERIENCE</h3>
                <div className="space-y-3">
                  {['Web Console', 'API', 'CLI'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 h-[calc(50%-8px)]">
                <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wider">DATA CENTRE</h3>
                <div className="space-y-3">
                  {['Renewable Energy', 'Low-latency Fibre'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics - 2x2 Grid */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-16">Performance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                metric: '30%', 
                label: 'FASTER INSIGHTS', 
                sublabel: 'Excellent Time-to-Value',
                desc: 'Accelerate the pace of experimentation and delivery with an AI-optimised platform that drives quicker results.',
                link: 'Learn More',
                linkTo: '/about'
              },
              { 
                metric: '80%', 
                label: 'LOWER COST', 
                sublabel: 'More performance for less.',
                desc: 'Achieve high performance more affordably, with significant cost savings compared to traditional hyperscaler services.',
                link: 'Our Data Centres',
                linkTo: '/products/glomfjord'
              },
              { 
                metric: '40%', 
                label: 'MORE EFFICIENT', 
                sublabel: 'Improved Resource Utilisation',
                desc: 'Increase utilisation and reduce waste with hardware and software optimised for peak efficiency',
                link: 'See GPU Nodes',
                linkTo: '/products/gpu-nodes'
              },
              { 
                metric: '7.2X', 
                label: 'FASTER INFERENCE', 
                sublabel: 'Accelerate time to insights',
                desc: ' Experience dramatic improvements in throughput and latency thanks to GPU tuning and performance enhancements',
                link: 'Blog Post',
                linkTo: '/blog'
              }
            ].map((item, i) => (
              <div key={i} className="border-l border-white/20 pl-6">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-1">{item.metric}</div>
                <div className="text-white text-sm font-semibold mb-2 uppercase tracking-wide">{item.label}</div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{item.desc}</p>
                <Link to={item.linkTo} className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center gap-1">
                  {item.link} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12">Key Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Compute Training Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-amber-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500/30 to-orange-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-amber-400 text-sm mb-4">Training</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A scalable, high-performance compute layer designed to shorten training times and boost development productivity.

              </p>
            </div>

            {/* AI Marketplace Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-amber-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Marketplace</h3>
              <p className="text-blue-400 text-sm mb-4">Marketplace</p>
              <p className="text-white/60 text-sm leading-relaxed">
                An ecosystem of services and tools that support application development and deployment, compatible with both Blubrg offerings and popular AI/ML frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Solutions */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">More solutions</h2>
          <p className="text-base text-white/60 mb-12 max-w-2xl">
            Blubrg accelerates the entire AI journey, helping organisations go from initial concept to deployed solution more quickly and efficiently.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Training Card */}
            <Link to="/solutions/training" className="group">
              <div className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/60 via-indigo-900/50 to-violet-900/60">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                  backgroundSize: '30px 30px'
                }}></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-light text-white mb-6 tracking-wider uppercase">Training</h3>
                  <div className="flex gap-4">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">80%</span>
                      <span className="text-white/60 text-xs ml-2">Lower Cost</span>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">30%</span>
                      <span className="text-white/60 text-xs ml-2">Faster</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-purple-500/50 transition-colors" />
              </div>
            </Link>

            {/* Inference / Fine Tuning Combined Column */}
            <div className="space-y-4">
              <Link to="/solutions/inference" className="group block">
                <div className="relative h-[calc(160px-8px)] rounded-xl overflow-hidden bg-gradient-to-br from-slate-800/60 via-gray-900/50 to-slate-900/60">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-lg font-light text-white mb-3 tracking-wider uppercase">Inference</h3>
                    <div className="flex gap-3">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded px-3 py-1">
                        <span className="text-white text-xs">7.2X</span>
                        <span className="text-white/60 text-xs ml-1">Performance</span>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded px-3 py-1">
                        <span className="text-white text-xs">+40%</span>
                        <span className="text-white/60 text-xs ml-1">Efficiency</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-gray-500/50 transition-colors" />
                </div>
              </Link>

              <Link to="/solutions/fine-tuning" className="group block">
                <div className="relative h-[calc(160px-8px)] rounded-xl overflow-hidden bg-gradient-to-br from-emerald-900/50 via-teal-900/40 to-green-900/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-lg font-light text-white mb-3 tracking-wider uppercase">Fine Tuning</h3>
                    <div className="flex gap-3">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded px-3 py-1">
                        <span className="text-white text-xs">+40%</span>
                        <span className="text-white/60 text-xs ml-1">Efficiency</span>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded px-3 py-1">
                        <span className="text-white text-xs">30%</span>
                        <span className="text-white/60 text-xs ml-1">Faster</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-emerald-500/50 transition-colors" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12">FAQs</h2>
          <div className="max-w-4xl space-y-3">
            {[
              {
                question: "What makes BluBrg's GPU Cloud different from others?",
                answer: "Blubrg controls the entire stack from data centre infrastructure to orchestration software, enabling deep optimisation across every layer. This integrated approach delivers exceptional performance, efficiency, and support for scaling AI workloads."
              },
              {
                question: "What types of GPUs does BluBrg offer?",
                answer: "A range of NVIDIA GPU models are available to support different AI development tasks, including GPUs designed for training, inferencing, and other compute-intensive workloads."
              },
              {
                question: "How does BluBrg support sustainability?",
                answer: "Environmental responsibility is a priority, with the company operating on renewable energy sources and adopting sustainable computing practices to help reduce carbon impact."
              },
              {
                question: "How does BluBrg accelerate AI development?",
                answer: "By simplifying orchestration and workload management through technologies like Kubernetes and SLURM, the platform makes managing GPU resources easier and more responsive to changing demands."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/10">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-amber-400 transition-colors"
                >
                  <span className="text-base font-medium text-white pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-amber-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                </button>
                {openFaq === i && (
                  <div className="pb-6">
                    <p className="text-white/60 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0066FF] to-[#0055DD]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-8 leading-tight">
              Access thousands of GPUs tailored to your requirements.
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#0066FF] px-10 py-6 text-base font-medium rounded-md">
                  Reserve GPUs
                </Button>
              </Link>
              <Link to="/contact">
                <button className="text-white hover:text-white/80 px-6 py-6 text-base font-medium transition-colors flex items-center gap-2">
                  Contact Sales <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIDevelopment;
