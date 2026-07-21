import React, { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Zap, Server, Cpu, Database, Cloud, Shield, Settings } from 'lucide-react';

const GPUNodes = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeGpu, setActiveGpu] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const performanceMetrics = [
    {
      metric: "4×",
      title: " LLM Training",
      description: "The NVIDIA GB200 NVL72 enables large language model training at scale to run up to four times faster, significantly reducing training time for complex models.",
      link: "Learn More"
    },
    {
      metric: "25×",
      title: "Energy Efficiency",
      description: "GB200 NVL72 offers up to 25× higher energy efficiency compared to previous-generation architectures, helping lower power consumption and operating costs.",
      link: "Learn More"
    },
    {
      metric: "30×",
      title: "LLM Inferencing",
      description: "With GB200 NVL72, real-time inferencing for trillion-parameter large language models can be achieved up to 30× faster, supporting high-throughput AI applications.",
      link: "Get a quote"
    },
    {
      metric: "18X",
      title: "Data Processing",
      description: "Data-intensive workloads can be processed up to 18× faster with GB200 NVL72 when compared to Intel Xeon 8480+ CPU-based systems.",
      link: "Learn More"
    }
  ];

  const gpuCards = [
    {
      name: "NVIDIA H100",
      description: "Experience industry-leading AI performance with NVIDIA H100 GPUs, built to handle the most demanding AI and HPC workloads.",
      highlighted: true,
      color: "from-purple-600/30 to-purple-900/50"
    },
    {
      name: "NVIDIA H200",
      description: "Accelerate advanced AI and high-performance computing tasks using NVIDIA H200 Tensor Core GPUs, optimised for memory-intensive applications.",
      highlighted: false,
      color: "from-slate-700/50 to-slate-800/50"
    },
    {
      name: "NVIDIA GB200 NVL72",
      description: "Designed for next-generation data centres and AI-focused environments, GB200 NVL72 delivers exceptional performance and efficiency for large-scale AI workloads.",
      highlighted: false,
      color: "from-slate-700/50 to-slate-800/50"
    }
  ];

  const services = [
    { name: "Serverless", icon: Cloud },
    { name: "Marketplace", icon: LayoutGrid },
    { name: "Inference", icon: Zap },
    { name: "Training", icon: Cpu },
    { name: "GPU nodes", icon: Server },
    { name: "LLM Library", icon: Database }
  ];

  const faqs = [
    {
      question: "What is GPU Nodes from BluBridge and how does it work?",
      answer: "GPU Nodes provide remote access to high-performance GPUs over the internet. Users can provision and scale GPU resources on demand to support workloads such as AI training, rendering, and scientific computing."
    },
    {
      question: "What types of GPUs does BluBridge offer?",
      answer: "A wide range of NVIDIA GPUs is available to support different use cases, including A100, H100, H200, GB200, and V100, each suited to specific AI, compute, and graphics-intensive workloads."
    },
    {
      question: "What are the benefits of using GPU Nodes from BluBridge?",
      answer: "Key benefits include:Access to powerful GPU hardware without upfront investment,Flexible scaling to match changing workload requirements,Usage-based pricing for better cost control,Multiple GPU options to suit different performance needs,Simplified management through a user-friendly platform,Reliable performance supported by robust infrastructure and expert support"
    },
    {
      question: "What industries can benefit from GPU Nodes?",
      answer: "GPU Nodes are well suited for:,Artificial intelligence and machine learning research,Gaming, media, and entertainment workloads,Healthcare imaging and data analysis,Financial modelling and risk analysis,Automotive development, including autonomous systems,Aerospace and engineering simulations"
    },
    {
      question: "How secure is GPU Nodes with BluBridge?",
      answer: "Strong security measures are in place, including industry-standard encryption, strict access controls, and advanced network protections to safeguard workloads and data."
    },
    {
      question: "Can I try GPU Nodes from BluBridge before committing?",
      answer: "Yes, trial options are available, allowing users to explore the platform, deploy GPU resources, and evaluate performance before making a long-term commitment."
    }
  ];

  useDocumentTitle('GPU Nodes for AI, ML and HPC | BluBridge');

  return (
    <div className="min-h-screen bg-[#f1f2fa] font-['DM_Sans']">      {/* Hero Section with Animation */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden bg-[#f1f2fa]">
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[#328CC1] flex items-center justify-center">
                  <Server className="w-3 h-3 text-white" />
                </div>
                <span className="text-[#328CC1] text-sm font-medium tracking-wide">GPU NODES</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#0B1F3B]">
                NVIDIA Accelerated GPU Nodes
              </h1>
              
              <p className="text-[#2F3A4A] text-lg max-w-xl leading-relaxed">
                Unlock high-end computing for AI, machine learning, and high-performance computing (HPC) workloads using bare-metal infrastructure powered by NVIDIA H100, H200, and GB200 GPUs. This setup delivers outstanding scalability, improved energy efficiency, and enterprise-ready customisation.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact">
                <Button className="bg-white text-[#0B1F3B] border border-[#0B1F3B] hover:bg-[#e8eaf3] px-6 py-3 rounded font-medium">
                  Get Started
                </Button>
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 text-[#328CC1] hover:text-[#0B1F3B] transition-colors font-medium">
                Contact <ArrowRight className="w-4 h-4" />
              </Link>
                
              </div>
            </div>
            
            {/* Right - Hero Image */}
            <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_visual-swap-4/artifacts/xv6hsihb_Bare%20Metal.png"
                alt="Bare Metal GPU Infrastructure"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="py-20 bg-[#e8eaf3]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-12">Performance</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {performanceMetrics.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-[#000000]">{item.metric}</span>
                  <span className="text-lg font-semibold text-[#000000]">{item.title}</span>
                </div>
                <p className="text-[#000000] text-sm leading-relaxed">{item.description}</p>
                {/* <Link to="/contact" className="inline-flex items-center gap-1 text-[#328CC1] text-sm hover:text-blue-300 transition-colors">
                  {item.link} <ArrowRight className="w-3 h-3" />
                </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No Frills GPU Compute Section */}
      <section className="py-20 bg-[#f1f2fa]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                No frills, just GPU compute
              </h2>
              <p className="text-[#2F3A4A] text-lg leading-relaxed max-w-xl">
                GPU Nodes are designed for users who need straightforward, high-performance GPU compute without unnecessary complexity. Select the GPU type and quantity you require, and the infrastructure is provisioned to meet your needs.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[#328CC1] hover:text-blue-300 transition-colors font-medium">
                Get In Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* GPU Nodes Card Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/80 rounded-2xl p-6 border border-[#d4d8e8]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#0B1F3B] flex items-center justify-center">
                    <Server className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-semibold">GPU Nodes</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-[#2F3A4A]">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>Clusters (1)</span>
                    <span className="ml-4">Running</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#2F3A4A]">
                    <Settings className="w-4 h-4" />
                    <span>manifest.toml</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative server image placeholder */}
              {/* <div className="absolute -bottom-8 -left-8 w-32 h-32 opacity-40">
                <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg transform rotate-12" />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="pt-15 pb-20 bg-[#f1f2fa]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img
                      src="/images/gpu.png"
                      alt="Modern GPU Server Racks"
                      className="w-full h-full object-contain"
                    />
            {/* Server Visual */}
            {/* <div className="relative order-2 lg:order-1">
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 to-transparent rounded-2xl" />
                <div className="grid grid-cols-3 gap-2 p-8">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i} 
                      className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg border border-[#d4d8e8]/50 flex items-center justify-center"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <Server className="w-8 h-8 text-slate-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
            
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Infrastructure that grows<br />with you
              </h2>
              <p className="text-[#2F3A4A] text-lg leading-relaxed max-w-xl">
                  All services operate on a shared, unified platform, making it easy to scale resources as demand evolves. You can begin with bare-metal GPU nodes and later extend your setup with orchestration, scheduling, or application-level services when required.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[#328CC1] hover:text-blue-300 transition-colors font-medium">
                Contact <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GPU Accelerators Section */}
      <section className="py-20 bg-[#f1f2fa] relative overflow-hidden">
        {/* Background server rack image effect */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
          <div className="w-full h-full bg-gradient-to-l from-slate-800/50 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="mb-12">
            <p className="text-[#6B7280] text-sm uppercase tracking-wider mb-2">OUR GPUS</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Built with industry leading<br />accelerators
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {gpuCards.map((gpu, index) => (
              <div 
                key={index}
                className={`relative rounded-2xl p-6 border transition-all duration-300 cursor-pointer border-[#d4d8e8] bg-slate-400/30 hover:border-[#d4d8e8]/50 `}
                onClick={() => setActiveGpu(index)}
              >
                <h3 className="text-xl font-bold mb-3">{gpu.name}</h3>
                <p className="text-[#2F3A4A] text-sm leading-relaxed">{gpu.description}</p>
                {/* {activeGpu === index && (
                  <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-purple-500" />
                )} */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated AI Services Section */}
      <section className="py-20 bg-[#f1f2fa]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Get access to a fully<br />integrated suite of AI<br />services and compute
              </h2>
              <p className="text-[#2F3A4A] text-lg leading-relaxed max-w-xl">
                Reduce costs, boost performance, and streamline AI operations using an integrated compute platform. You can use built-in AI and machine learning tools or seamlessly integrate your existing software stack, enabling a smooth transition from development to production.
              </p>
            </div>
            
            {/* Services Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="bg-[#e8eaf3] rounded-xl p-4 border border-[#d4d8e8] hover:border-blue-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0B1F3B]/20 flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-[#328CC1]" />
                      </div>
                      <span className="font-medium text-sm">{service.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Data Center Card */}
              <div className="mt-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-4 border border-blue-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#328CC1]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">BluBridge's Data centers</p>
                    <p className="text-xs text-[#2F3A4A]">Powered by renewable energy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#f1f2fa]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">FAQs</h2>
          
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border-b border-[#d4d8e8]"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-5 text-left hover:text-[#328CC1] transition-colors"
                >
                  <span className="text-lg font-medium text-[#0B1F3B] pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-[#0B1F3B]/80">
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-white" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[#2F3A4A] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-16 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white">
            Access thousands of GPUs tailored to your requirements.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors font-medium px-6 py-0">
              Contact <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Add missing LayoutGrid icon
const LayoutGrid = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

export default GPUNodes;
