import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid } from 'lucide-react';

const Inference = () => {
  const [openFaq, setOpenFaq] = useState(3); // Fourth FAQ open by default as shown in screenshot

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background with abstract blue imagery */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a2e] via-[#051525] to-[#000000]">
          {/* Abstract visual element on right */}
          <div className="absolute top-1/4 right-0 w-[60%] h-[80%] opacity-40">
            <div className="absolute top-0 right-20 w-[400px] h-[300px] bg-gradient-to-br from-cyan-500/30 via-blue-600/20 to-transparent rounded-full filter blur-[80px]" />
            <div className="absolute top-20 right-40 w-[300px] h-[400px] bg-gradient-to-br from-blue-400/20 via-indigo-500/15 to-transparent rounded-full filter blur-[60px]" />
            <div className="absolute bottom-20 right-10 w-[350px] h-[250px] bg-gradient-to-br from-teal-500/25 via-cyan-600/15 to-transparent rounded-full filter blur-[70px]" />
          </div>
        </div>

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              AI & ML INFERENCE
            </h1>
            <p className="text-lg lg:text-xl text-white/75 mb-10 leading-relaxed max-w-2xl">
              We offer GPU-accelerated nodes purpose-built for efficient AI and machine learning inference at competitive cost. Our team handles performance optimisation and scaling in the background, allowing you to focus entirely on deploying and running your models without infrastructure overhead.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#0a1a2e] px-10 py-6 text-base font-medium rounded-md">
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

      {/* Value Proposition Strip - 3 columns */}
      <section className="py-16 bg-[#050505] border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Optimised Performance</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Boost throughput and reduce response times using advanced GPU technology specifically tuned for inference workloads.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Simplified Workflows</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Blubrg Cloud removes the complexity of managing and scaling inference operations, enabling teams to concentrate on insights and outcomes rather than resource management
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Versatile Platform</h3>
              <p className="text-white/60 text-sm leading-relaxed">
              The platform supports both batch and continuous inference, including streaming use cases, making it suitable for a wide range of deployment scenarios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Speed up time-to-insights */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-cyan-400 text-sm font-medium mb-3 uppercase tracking-wider">BLUBRG PLATFORM</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Speed up time-to-<br />insights
              </h2>
              <p className="text-base text-white/65 leading-relaxed mb-10 max-w-lg">
                Model optimisations combined with streamlined orchestration help deliver faster results while maintaining accuracy, reliability, and consistency.
              </p>

              <div className="space-y-8">
                <div className="border-l-2 border-cyan-500 pl-5">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">AI & ML Tools</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Access the latest frameworks Work seamlessly with widely used AI frameworks such as TensorFlow Serving, PyTorch, and ONNX Runtime to ensure smooth and efficient inference execution.
                  </p>
                </div>

                <div className="border-l-2 border-cyan-500 pl-5">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Simplified Orchestration and Management</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                   Featuring SLURM and Kubernetes
 Integrated orchestration and scheduling through SLURM and Kubernetes simplify workload management and ensure efficient resource utilisation across inference jobs.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Framework icons grid */}
            <div className="flex justify-center">
              <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 w-full max-w-md">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: 'PyTorch', color: 'bg-orange-500/20 border-orange-500/30' },
                    { name: 'TensorFlow', color: 'bg-amber-500/20 border-amber-500/30' },
                    { name: 'ONNX', color: 'bg-gray-500/20 border-gray-500/30' },
                    { name: 'vLLM', color: 'bg-purple-500/20 border-purple-500/30' },
                    { name: 'ML', color: 'bg-cyan-500/30 border-cyan-500/50', isCenter: true },
                    { name: 'Triton', color: 'bg-green-500/20 border-green-500/30' },
                    { name: 'Ray', color: 'bg-blue-500/20 border-blue-500/30' },
                    { name: 'K8s', color: 'bg-indigo-500/20 border-indigo-500/30' },
                    { name: 'SLURM', color: 'bg-teal-500/20 border-teal-500/30' }
                  ].map((tool, i) => (
                    <div
                      key={i}
                      className={`aspect-square ${tool.color} border rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-200 ${tool.isCenter ? 'ring-2 ring-cyan-400/50' : ''}`}
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

      {/* Inference Stack - Two column layout */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Inference Stack</h2>
            <p className="text-base text-white/60 max-w-2xl">
              Blubrg provides a complete inference stack designed to deliver high performance, efficiency, and reliability for production-grade inference workloads.            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Stacked categories */}
            <div className="space-y-4">
              {/* Marketplace */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wider">MARKETPLACE</h3>
                <div className="flex flex-wrap gap-2">
                  {['Jupyter Notebook', 'TensorFlow', 'PyTorch'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-3 py-1.5 text-white text-xs">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
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
                  {['AMD MI300X', 'AMD MI250X', 'NVDA GB200', 'H100', '...'].map((item, i) => (
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
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
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

      {/* Performance - Horizontal 4 column */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-16">Performance</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            {[
              { 
                metric: '40%', 
                label: 'MORE EFFICIENT', 
                sublabel: 'Improved Resource Utilisation',
                desc: 'Achieve higher utilisation of compute resources, reducing waste while maximising inference performance.',
                link: 'See GPU Nodes',
                linkTo: '/products/gpu-nodes'
              },
              { 
                metric: '7.2X', 
                label: 'FASTER INFERENCE', 
                sublabel: 'Accelerate Time to Insights',
                desc: 'GPUs with GEMM tuning improves throughput and latency by up to 7.2x.',
                link: 'Our Data Centres',
                linkTo: '/products/glomfjord'
              },
              { 
                metric: '80%', 
                label: 'LOWER COST', 
                sublabel: 'More performance for less.',
                desc: ' Lower inference costs through efficient hardware usage and integrated optimisation compared to traditional cloud platforms.',
                link: 'Learn More',
                linkTo: '/about'
              }
            ].map((item, i) => (
              <div key={i} className="border-l border-white/20 pl-6">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-1">{item.metric}</div>
                <div className="text-white text-sm font-semibold mb-2 uppercase tracking-wide">{item.label}</div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{item.desc}</p>
                <Link to={item.linkTo} className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1">
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
            {/* AI Compute Inference Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-cyan-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/30 to-blue-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-cyan-400 text-sm mb-4">Inference</p>
              <p className="text-white/60 text-sm leading-relaxed">
              Dedicated GPU compute optimised for inference workloads, delivering consistent performance and cost efficiency at scale.
              </p>
            </div>

            {/* AI Marketplace Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-cyan-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Marketplace</h3>
              <p className="text-blue-400 text-sm mb-4">Marketplace</p>
              <p className="text-white/60 text-sm leading-relaxed">
               A collection of tools and services that support the development, deployment, and scaling of inference pipelines using both Blubrg and popular AI frameworks.
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
            Blubrg supports the full AI lifecycle, helping organisations move smoothly from development and training to large-scale inference deployment.
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
                      <span className="text-white text-sm">+40%</span>
                      <span className="text-white/60 text-xs ml-2">Efficiency</span>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">-45%</span>
                      <span className="text-white/60 text-xs ml-2">Cost</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-purple-500/50 transition-colors" />
              </div>
            </Link>

            {/* Fine Tuning / AI Development Combined Card */}
            <div className="space-y-4">
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

              <Link to="/solutions/ai-development" className="group block">
                <div className="relative h-[calc(160px-8px)] rounded-xl overflow-hidden bg-gradient-to-br from-amber-900/50 via-orange-900/40 to-yellow-900/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-lg font-light text-white mb-3 tracking-wider uppercase">AI Development</h3>
                    <div className="flex gap-3">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded px-3 py-1">
                        <span className="text-white text-xs">80%</span>
                        <span className="text-white/60 text-xs ml-1">Lower Cost</span>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded px-3 py-1">
                        <span className="text-white text-xs">30%</span>
                        <span className="text-white/60 text-xs ml-1">Faster</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-amber-500/50 transition-colors" />
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
                answer: "BluBrg specializes in AI-optimized infrastructure with the latest GPUs, ultra-low latency networking, and pre-configured inference stacks. Our platform delivers up to 7.2x faster inference and 80% cost savings compared to general cloud platforms."
              },
              {
                question: "What types of GPUs does BluBrg offer?",
                answer: "We provide access to the latest inference-optimized GPUs including NVIDIA GB200, H100, H200, A100, and AMD MI300X, MI250X. All configurations include high-bandwidth networking and optimized inference runtimes."
              },
              {
                question: "How does BluBrg support sustainability?",
                answer: "All BluBrg data centers run on 100% renewable energy. We optimize infrastructure for maximum efficiency and locate facilities strategically in regions with abundant clean energy sources."
              },
              {
                question: "What makes your AI inference service different from others?",
                answer: "Our AI inference service leverages cutting-edge GPUs, optimised for both batch and streaming workloads. With our integrated software stack and orchestration using Kubernetes and SLURM, we provide unmatched performance, scalability, and efficiency."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/10">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-cyan-400 transition-colors"
                >
                  <span className="text-base font-medium text-white pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-cyan-400" />
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

export default Inference;
