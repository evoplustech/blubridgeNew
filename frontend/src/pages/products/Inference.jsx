import React, { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Server, Layers, Cpu,Zap,  Database, Cloud, Shield, Settings,SlidersHorizontal } from 'lucide-react';

const Inference = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Performance metrics data
  const performanceMetrics = [
    {
      metric: '+40%',
      label: 'EFFICIENCY',
      title: 'Improved resource utilisation',
      description: 'Efficiency gains reaching 40%.',
      link: '/products/inference'
    },
    {
      metric: '7.2X',
      label: 'FASTER',
      title: 'On throughput and latency',
      description: 'Using AMD MI300X GPUs combined with GEMM tuning delivers throughput and latency enhancements of up to 7.2×',
      link: '/products/gpu-nodes'
    },
    {
      metric: '80%',
      label: 'LOWER COST',
      title: 'More performance for less',
      description: 'BluBridge delivers an average cost saving of up to 80% compared to hyperscalers.',
      link: '/pricing'
    },
    {
      metric: '30%',
      label: 'FASTER',
      title: 'On time to insights',
      description: 'BluBridge Cloud shortens the path to actionable insights by as much as 30%, powered by a stack purpose-built and tuned specifically for AI workloads.',
      link: '/products/training'
    }
  ];

  // Model cards data
  const modelCards = [
    { type: 'TEXT GENERATION', name: 'LLAMA 3 70B INSTRUCT', publisher: 'META' },
    { type: 'TEXT GENERATION', name: 'LLAMA 3 8B INSTRUCT', publisher: 'META' },
    { type: 'IMAGE-TO-TEXT', name: 'FLORENCE 2', publisher: 'MICROSOFT' },
    { type: 'TEXT-TO-IMAGE', name: 'STABLE DIFFUSION 3', publisher: 'STABILITY AI' },
    { type: 'TEXT GENERATION', name: 'MIXTRAL 8x7B', publisher: 'MISTRAL AI' },
    { type: 'TEXT GENERATION', name: 'PHI 3', publisher: 'MICROSOFT' }
  ];

  // Feature strip data
  const features = [
    {
      icon: Zap,
      title: 'Performance & Scalability',
      description: 'Dynamically expanding graphics-based compute sits at the core of what we deliver. Confidence comes from knowing artificial intelligence runs with low latency while every assigned resource is used to its fullest potential.'
    },
    {
      icon: Server,
      title: 'Purpose-built Stack',
      description: 'Unlock the full financial and performance advantages of a tightly unified infrastructure platform, specifically engineered to support artificial intelligence workloads ranging from small experiments to massive production-scale deployments.'
    },
    {
      icon: Settings,
      title: 'No Integration Hurdles',
      description: 'Flexibility is a core priority for us. Use ready-made software configurations or seamlessly connect your existing tools and workflows with ease.'
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "What makes your AI inference service different from others?",
      answer: "The inference offering for artificial intelligence utilises next-generation graphics processors tailored to handle offline processing alongside real-time data flows. Through a tightly unified software environment and coordinated control via Kubernetes and SLURM, it delivers exceptional speed, elastic growth, and operational efficiency."
    },
    {
      question: "Can I integrate existing LLMs with your inference service?",
      answer: "Yes, an extensive collection of widely adopted open-source models is available for immediate launch and usage. In addition, the platform enables smooth connectivity with well-known AI frameworks such as TensorFlow, PyTorch, and ONNX Runtime, making it straightforward to run and operate models you already have."
    },
    {
      question: "What kind of support and optimisations do you offer for AI inference workloads?",
      answer: "End-to-end assistance is available, covering throughput optimisation, model-level enhancements like quantisation and pruning, along with ongoing observability. Dedicated specialists ensure inference operations remain smooth and effective, driving maximum output while minimising response time."
    },
    {
      question: "How secure is your AI inference service?",
      answer: "Protection sits at the core of BluBridge’s approach. Strong identity and access controls are in place, with compatibility for OAuth2, SSO, and 2FA. Information is safeguarded through encryption during storage and transmission, while compliance aligns with recognised frameworks such as GDPR and HIPAA. Shared environments are designed to maintain strict separation, preserving confidentiality and isolation for every tenant."
    }
  ];

  // Infrastructure tools
  const infrastructureTools = [
    'LLM Library',
    'Job Management',
    'Container Orchestration',
    'Optimised Libraries',
    'Pre-configured Software',
    'Pre-configured Infrastructure'
  ];

  // Framework icons for vLLM section
  const frameworkIcons = [
    { name: 'TensorFlow', color: '#FF6F00' },
    { name: 'PyTorch', color: '#EE4C2C' },
    { name: 'ONNX', color: '#005CED' },
    { name: 'HuggingFace', color: '#FFD21E' },
    { name: 'vLLM', color: '#3B82F6' },
    { name: 'Triton', color: '#76B900' }
  ];

    const LayoutGrid = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const services = [
    { name: "Serverless", icon: Cloud ,link:"/products/serverless"},
    { name: "Marketplace", icon: LayoutGrid,link:"/products/marketplace" },
    { name: "Inference", icon: Zap ,link:"/products/inference"},
    { name: "Training", icon: Cpu ,link:"/products/training"},
    { name: "GPU nodes", icon: Server ,link:"/products/gpu-nodes"},
    { name: "Fine-Tuning", icon: SlidersHorizontal ,link:"/products/fine-tuning"}
  ];

  useDocumentTitle('AI Inference | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7] font-['DM_Sans']">      {/* SECTION 1: Hero Section with Animated Inference Visual */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden bg-[#fffdf7]">
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6" style={{ animation: 'fadeInUp 1s ease-out' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#328CC1]/10 rounded-full border border-[#328CC1]/30">
                <span className="w-2 h-2 bg-[#328CC1] rounded-full animate-pulse" />
                <span className="text-[#328CC1] text-sm font-medium">INFERENCE</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#0B1F3B]" style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}>
                Fast, affordable,<br />auto-scaling AI<br />inference
              </h1>
              
              <p className="text-[#2F3A4A] text-lg max-w-xl leading-relaxed" style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}>
                Designed for maximum efficiency, the inference offering runs on dynamically scaling GPU capacity, with end-to-end optimisation tailored to support both batch processing and real-time streaming demands.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4" style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
                <Link to="/contact">
                  <Button className="bg-white text-[#0B1F3B] border border-[#0B1F3B] hover:bg-[#f3f1e9] px-6 py-3 rounded font-medium">
                    Get Started
                  </Button>
                </Link>
                <Link to="/contact" className="flex items-center gap-2 text-[#328CC1] hover:text-[#0B1F3B] transition-colors font-medium">
                  Contact <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Right - Hero Image */}
            <div className="relative h-[400px] lg:h-[450px]" style={{ animation: 'fadeInRight 1s ease-out 0.4s both' }}>
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                {/* Hero image */}
                <img 
                  src="https://customer-assets.emergentagent.com/job_visual-swap-4/artifacts/3hcnalr5_infarence.png"
                  alt="AI inference GPU cluster visualization"
                  className="w-full h-full object-contain relative z-10"
                  style={{
                   
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </section>

      {/* SECTION 2: Performance Metrics Strip */}
      <section className="py-16 bg-[#fffdf7] border-t border-b border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            {performanceMetrics.map((item, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-1">
                  {item.metric} <span className="text-lg font-medium">{item.label}</span>
                </div>
                <p className="text-[#0B1F3B] font-medium mb-1">{item.title}</p>
                <p className="text-[#2F3A4A] text-sm mb-3">{item.description}</p>
                {/* <Link to={item.link} className="text-[#328CC1] text-sm hover:text-blue-300 flex items-center gap-1 justify-center md:justify-start">
                  Learn More <ArrowRight className="w-3 h-3" />
                </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Inference Frameworks Section */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Easily access optimised<br />inference frameworks
              </h2>
              <p className="text-[#2F3A4A] mb-6 leading-relaxed">
                 Immediate compatibility is available with TensorFlow Serving, PyTorch, and ONNX Runtime to enable rapid inference execution. Proprietary optimization methods lower response times and enhance throughput while preserving model accuracy.
              </p>
              <Link to="/contact">
                <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded font-medium">
                  Get Started <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </Link>
            </div>
            
            {/* Framework Icons Visualization */}
            <div className="relative flex items-center justify-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_logo-update-17/artifacts/j856orkr_image.png"
                alt="Inference frameworks including TensorFlow, PyTorch, ONNX, vLLM and more"
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Model Grid Section */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Model Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {modelCards.map((model, i) => (
                <div key={i} className="bg-slate-900/50 rounded-lg p-4 border border-[#D6DEC3] hover:border-[#D6DEC3]/50 transition-colors">
                  <div className="text-xs text-[#6B7280] mb-1">{model.type}</div>
                  <div className="text-[#0B1F3B] font-semibold text-sm mb-2">{model.name}</div>
                  <div className="text-xs text-[#2F3A4A]">{model.publisher}</div>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Dedicated endpoints for<br />100+ open-source models
              </h2>
              <p className="text-[#2F3A4A] mb-6 leading-relaxed">
                Using Inference Endpoints, you can quickly launch Transformers, Diffusers, or bespoke models on dedicated, fully managed compute environments. Choose from over 100 available models, enhanced through BluBridge’s proprietary optimisation layer to achieve maximum performance.

              </p>
              <Link to="/contact" className="text-[#328CC1] hover:text-blue-300 inline-flex items-center gap-2">
                Contact <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: GPU Compute Section */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Built on high-<br />performance GPU<br />compute
              </h2>
              <p className="text-[#2F3A4A] mb-6 leading-relaxed">
               The inference offering runs on next-generation GPU acceleration. Paired with ultra-fast networking and rapid storage systems, it provides exceptional compute capability for both batch processing and real-time artificial intelligence workloads.
              </p>
              <Link to="/products/gpu-nodes" className="text-[#328CC1] hover:text-blue-300 inline-flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* GPU Visual */}
            <div className="relative">
              <div className=" rounded-xl  p-6  flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="rounded-xl overflow-hidden">
                <img 
                  src="/images/serverless.png" 
                  alt="Enterprise GPU Infrastructure"
                  className="h-auto object-contain"
                />
              </div>
                  {/* GPU server rack representation */}
                  {/* <div className="grid grid-cols-4 gap-2 mb-4">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="h-8 bg-slate-700/50 rounded border border-[#D6DEC3]/30 flex items-center justify-center">
                        <div className="flex gap-0.5">
                          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                          <div className="w-1 h-1 rounded-full bg-blue-500" />
                        </div>
                      </div>
                    ))}
                  </div> */}
                  {/* <p className="text-[#6B7280] text-sm">NVIDIA H100 • H200 • GB200 NVL72</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Feature Strip */}
      <section className="py-16 bg-[#fffdf7] border-t border-b border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="text-center md:text-left">
                <feature.icon className="w-10 h-10 text-blue-500 mb-4 mx-auto md:mx-0" />
                <h3 className="text-xl font-bold text-[#0B1F3B] mb-3">{feature.title}</h3>
                <p className="text-[#2F3A4A] text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Fully Integrated AI Infrastructure */}
      {/* Integrated AI Services Section */}
      <section className="py-20 bg-[#fffdf7]">
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
              <div className="grid grid-cols-2 gap-4 ">
                {services.map((service, index) => (
                 <Link className="block text-[#243447] hover:text-[#328CC1] transition-colors text-sm" to={service.link}> <div 
                    key={index}
                    className="hover:bg-[#e8e6de] bg-[#f3f1e9] rounded-xl p-4 border border-[#D6DEC3] hover:border-blue-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 ">
                      <div className="w-10 h-10 rounded-lg bg-[#0B1F3B]/20 flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-[#328CC1]" />
                      </div>
                      <span className=" font-medium text-sm">{service.name}</span>
                    </div>
                  </div>
                  </Link>
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

      {/* SECTION 8: FAQs */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">FAQs</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border-b border-[#D6DEC3] pb-4"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left py-3 group"
                >
                  <span className="text-[#0B1F3B] text-lg pr-4">{faq.question}</span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-[#0B1F3B] rotate-180' : 'bg-[#0B1F3B]/80'}`}>
                    {openFaq === index ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-[#2F3A4A] pb-4 pr-12">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Final CTA Strip */}
     <section className="py-20 bg-[#0B1F3B] from-blue-600 via-blue-700 to-indigo-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Access thousands of GPUs tailored to your<br />requirements.
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/contact">
              <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors font-medium">
              Contact <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inference;
