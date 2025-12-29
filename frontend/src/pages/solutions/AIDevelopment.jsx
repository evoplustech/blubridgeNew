import React, { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid } from 'lucide-react';

const AIDevelopment = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useDocumentTitle('Integrated tools for AI development | BluBrg');

  return (
    <div className="min-h-screen bg-[#F3F6E8]">
      {/* Hero Section - AI Development Background with Wave Animation */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Animated Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%]"
            style={{
              backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/t1azfeg2_AI%20Development.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              animation: 'heroWaveAIDev 14s ease-in-out infinite'
            }}
          />
        </div>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1510]/90 via-[#0a1510]/50 to-transparent pointer-events-none" />
        {/* Hero Content */}

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              AI DEVELOPMENT
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              BluBrg’s platform makes every step of building AI smoother, enabling you to move quickly from early experiments in interactive notebooks to deploying fully scaled AI applications across multiple GPU clusters. It removes barriers and complexity, helping teams innovate faster and achieve better outcomes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact/sales">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#1A251E] px-10 py-6 text-base font-medium rounded-md">
                  Get Started
                </Button>
              </Link>
              <Link to="/contact/sales" className="inline-flex items-center gap-2 text-white hover:text-blue-300 transition-colors font-medium">
                Contact Sales <ArrowRight className="w-4 h-4" />
</Link>
            </div>
          </div>
        </div>
        {/* CSS Animation Keyframes */}
        <style>{`
          @keyframes heroWaveAIDev {
            0%, 100% {
              transform: translate(0, 0) scale(1.05);
            }
            25% {
              transform: translate(-1.2%, 0.8%) scale(1.05);
            }
            50% {
              transform: translate(-0.4%, -0.8%) scale(1.05);
            }
            75% {
              transform: translate(0.8%, 0.4%) scale(1.05);
            }
          }
        `}</style>
      </section>

      {/* Value Highlights - 3 Column Strip */}
      <section className="py-16 bg-[#EEF2DC] border-t border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Ease of Migration</h3>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
               The platform works across cloud, on-premises, and hybrid environments, giving you flexibility and avoiding dependence on a single provider. You can choose the infrastructure setup that best fits your needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Expert Assistance</h3>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                Tap into skilled support to help guide your transition and ensure you get the most out of your AI infrastructure, with knowledgeable teams helping you optimise performance and execution.

              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Increased Productivity</h3>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                BluBrg’s cloud stack automates routine and repetitive tasks, liberating your team to focus on strategic work instead of day-to-day infrastructure management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fastest GPU Nodes Available Section */}
      <section className="py-24 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-amber-500 text-sm font-medium mb-3 uppercase tracking-wider">NVIDIA & AMD PARTNERSHIP</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-6 leading-tight">
                Fastest GPU nodes<br />available
              </h2>
              <p className="text-base text-white/65 leading-relaxed mb-10">
                The BluBrg GPU Cloud delivers high-performance, bare-metal GPU nodes purpose-built for demanding AI workloads. Whether you’re training new models or improving existing ones, the infrastructure offers dependable, top-tier performance to support faster development.
              </p>

              <div className="space-y-8">
                <div className="border-l-2 border-amber-500 pl-5">
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">Access Latest AI Frameworks</h3>
                  <p className="text-[#5B6B7A] text-xs font-medium mb-2">AI Development Tools</p>
                  <p className="text-[#5B6B7A] text-sm leading-relaxed">
                    You get easy access to modern AI tools and frameworks such as TensorFlow Serving, PyTorch, and ONNX Runtime, enabling you to work with the technologies your team prefers
                  </p>
                </div>

                <div className="border-l-2 border-amber-500 pl-5">
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">Optimised Resource Utilisation</h3>
                  <p className="text-[#5B6B7A] text-xs font-medium mb-2">Maximising Efficiency</p>
                  <p className="text-[#5B6B7A] text-sm leading-relaxed">
                    The architecture is designed to minimise idle GPU time and maximise throughput, ensuring your compute resources are used as effectively as possible.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Framework icons cluster */}
            <div className="flex justify-center">
              <div className="relative bg-white border border-[#D6DEC3] rounded-2xl p-8 w-full max-w-md">
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
                      <span className="text-[#243447] text-xs font-semibold text-center px-1">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Development Stack - Two column layout */}
      <section className="py-24 bg-[#EEF2DC]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4">AI-Development<br />Stack</h2>
            <p className="text-base text-[#5B6B7A] max-w-2xl">
             BluBrg offers a complete technology stack and integrated development environment purpose-built for creating AI models, large language models (LLMs), and other machine learning applications. This stack works seamlessly with a broad set of third-party tools to fit your existing workflows.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Stacked categories */}
            <div className="space-y-4">
              {/* Marketplace */}
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6">
                <h3 className="text-sm font-bold text-[#243447] mb-4 tracking-wider">MARKETPLACE</h3>
                <div className="flex flex-wrap gap-2">
                  {['Jupyter Notebook', 'TensorFlow', 'PyTorch'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1.5 text-[#0B1F3B] text-xs">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6">
                <h3 className="text-sm font-bold text-[#243447] mb-4 tracking-wider">PLATFORM</h3>
                <div className="flex flex-wrap gap-2">
                  {['Virtual Machines', 'Managed Kubernetes'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-3 py-1.5 text-[#0B1F3B] text-xs">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6">
                <h3 className="text-sm font-bold text-[#243447] mb-4 tracking-wider">INFRASTRUCTURE</h3>
                <div className="flex flex-wrap gap-2">
                  {['GPU Compute', 'Storage', 'Networking'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1.5 text-[#0B1F3B] text-xs">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hardware */}
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6">
                <h3 className="text-sm font-bold text-[#243447] mb-4 tracking-wider">HARDWARE</h3>
                <div className="flex flex-wrap gap-2">
                  {['AMD MI300X', 'AMD MI50X', 'NVDA GB200', 'H100', '...'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1.5 text-[#0B1F3B] text-xs">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - User Experience & Data Centre */}
            <div className="space-y-4">
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6 h-[calc(50%-8px)]">
                <h3 className="text-sm font-bold text-[#243447] mb-4 tracking-wider">USER EXPERIENCE</h3>
                <div className="space-y-3">
                  {['Web Console', 'API', 'CLI'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      <span className="text-[#243447] text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6 h-[calc(50%-8px)]">
                <h3 className="text-sm font-bold text-[#243447] mb-4 tracking-wider">DATA CENTRE</h3>
                <div className="space-y-3">
                  {['Renewable Energy', 'Low-latency Fibre'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <span className="text-[#243447] text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics - 2x2 Grid */}
      <section className="py-24 bg-[#F3F6E8]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-16">Performance</h2>
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
              <div key={i} className="border-l border-[#D6DEC3] pl-6">
                <div className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-1">{item.metric}</div>
                <div className="text-[#0B1F3B] text-sm font-semibold mb-2 uppercase tracking-wide">{item.label}</div>
                <p className="text-[#5B6B7A] text-sm leading-relaxed mb-4">{item.desc}</p>
                {/* <Link to={item.linkTo} className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center gap-1">
                  {item.link} <ArrowRight className="w-3 h-3" />
                </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-24 bg-[#EEF2DC]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">Key Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Compute Training Card */}
            <div className="bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-amber-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500/30 to-orange-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-amber-400 text-sm mb-4">Training</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                A scalable, high-performance compute layer designed to shorten training times and boost development productivity.

              </p>
            </div>

            {/* AI Marketplace Card */}
            <div className="bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-amber-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-[#328CC1]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Marketplace</h3>
              <p className="text-[#328CC1] text-sm mb-4">Marketplace</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                An ecosystem of services and tools that support application development and deployment, compatible with both BluBrg offerings and popular AI/ML frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-light mb-4 text-[#0B1F3B]">More Solutions</h2>
            <p className="text-[#243447] max-w-2xl">
              BluBrg accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives..
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5">
            {/* Model Training Card - Purple Wave */}
            <Link to="/solutions/training">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/tbqd1w9m_Training.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-[#0B1F3B] font-semibold text-2xl">TRAINING</span>
                </div>
              </div>
            </Link>

            {/* AI & ML Inference Card - Blue Angular */}
            <Link to="/solutions/inference">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/2qvmu3rl_INFERENCE.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-[#0B1F3B] font-semibold text-2xl">INFERENCE</span>
                </div>
              </div>
            </Link>



            {/* Model Fine-Tuning Card - Green Wave */}
            <Link to="/solutions/fine-tuning">
              <div className="relative h-52 border border-[#D6DEC3] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/zsuql6xm_Finetuning.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-[#0B1F3B] font-semibold text-2xl">FINE-TUNING</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      

      {/* FAQs */}
      <section className="py-24 bg-[#EEF2DC]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">FAQs</h2>
          <div className="max-w-4xl space-y-3">
            {[
              {
                question: "What makes BluBrg's GPU Cloud different from others?",
                answer: "BluBrg controls the entire stack from data centre infrastructure to orchestration software, enabling deep optimisation across every layer. This integrated approach delivers exceptional performance, efficiency, and support for scaling AI workloads."
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
              <div key={i} className="border-b border-[#D6DEC3]">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-amber-400 transition-colors"
                >
                  <span className="text-base font-medium text-[#0B1F3B] pr-8">{faq.question}</span>
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
                    <p className="text-[#5B6B7A] text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Access thousands of GPUs tailored to your<br />requirements.
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/contact/sales">
              <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact/sales" className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors font-medium">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIDevelopment;
