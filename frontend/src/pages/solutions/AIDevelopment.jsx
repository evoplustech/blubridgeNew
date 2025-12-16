import React, { useState } from 'react';
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
              At BluBrg, our platform streamlines the entire AI development process, empowering you to swiftly transition from initial experiments in Jupyter notebooks to deploying large-scale AI applications across multiple GPU clusters. By making AI more accessible and less intimidating, BluBrg is your ultimate solution for accelerating innovation and achieving superior results.
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
                The BluBrg platform supports cloud, on-premises, and hybrid environments, freeing you from vendor lock-in and providing the flexibility to choose the best infrastructure for your needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Expert Assistance</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Leverage our team of experts to ensure a smooth and successful transition, providing you with the support and knowledge needed for optimal performance and results.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Increased Productivity</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                BluBrg's innovative Cloud stack enables you to schedule and automate repetitive tasks, freeing up time to focus on your business goals rather than infrastructure management.
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
                BluBrg's GPU cloud platform offers the fastest available GPU-accelerated bare metal nodes, specifically designed for training AI models and handling compute-intensive tasks. Our infrastructure ensures that you get the best performance, helping you achieve your AI goals quicker and more effectively. Whether you are training new models or fine-tuning existing ones, our platform supports your needs with best-in-class performance and reliability.
              </p>

              <div className="space-y-8">
                <div className="border-l-2 border-amber-500 pl-5">
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">Access Latest AI Frameworks</h3>
                  <p className="text-white/50 text-xs font-medium mb-2">AI Development Tools</p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    BluBrg provides easy access to the latest AI tools and frameworks including TensorFlow Serving, PyTorch, and ONNX Runtime.
                  </p>
                </div>

                <div className="border-l-2 border-amber-500 pl-5">
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">Optimised Resource Utilisation</h3>
                  <p className="text-white/50 text-xs font-medium mb-2">Maximising Efficiency</p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Ensures high efficiency in GPU resource usage, reducing idle times and maximising throughput.
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
              BluBrg provides a complete technology stack and IDE for developing AI models, LLMs or other ML implementations. Our services are fully integrated with a wide range of third-party applications to fit your workflow.
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
                desc: 'BluBrg Cloud accelerates time to insights by up to 30% thanks to its AI-optimised stack.',
                link: 'Learn More',
                linkTo: '/about'
              },
              { 
                metric: '80%', 
                label: 'LOWER COST', 
                sublabel: 'More performance for less.',
                desc: 'BluBrg delivers on average 80% cost-saving in comparison to hyperscalers.',
                link: 'Our Data Centres',
                linkTo: '/products/glomfjord'
              },
              { 
                metric: '40%', 
                label: 'MORE EFFICIENT', 
                sublabel: 'Improved Resource Utilisation',
                desc: 'Up to 40% improvement in efficiency.',
                link: 'See GPU Nodes',
                linkTo: '/products/gpu-nodes'
              },
              { 
                metric: '7.2X', 
                label: 'FASTER INFERENCE', 
                sublabel: 'Accelerate time to insights',
                desc: 'Accurate inference, significantly improves throughput and latency by up to 7.2x.',
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
                A highly scalable, performance-optimised architecture that significantly reduces training times and boosts productivity.
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
                An ecosystem of services for developing and deploying AI applications built using BluBrg's tools and other popular AI/ML software.
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
            BluBrg accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives.
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
                answer: "BluBrg owns and operates the full AI stack – from its data centre to the sophisticated orchestration layer – and this allows BluBrg to optimise each layer of the stack to deliver high-performance computing by providing our customers with the latest GPU workloads, maximise utilisation, or ensure scalability."
              },
              {
                question: "What types of GPUs does BluBrg offer?",
                answer: "We provide access to the latest AI-optimized GPUs including NVIDIA GB200, H100, H200, A100, and AMD MI300X, MI250X. All configurations include high-bandwidth networking and optimized software stacks."
              },
              {
                question: "How does BluBrg support sustainability?",
                answer: "All BluBrg data centers run on 100% renewable energy. We optimize infrastructure for maximum efficiency and locate facilities strategically in regions with abundant clean energy sources."
              },
              {
                question: "How does BluBrg accelerate AI development?",
                answer: "BluBrg provides an integrated platform with pre-configured AI frameworks, collaborative development environments, and seamless scaling from prototyping to production. Our optimised infrastructure delivers up to 30% faster time-to-insights."
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
