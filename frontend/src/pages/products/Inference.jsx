import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Server, Zap, Settings } from 'lucide-react';

const Inference = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const canvasRef = useRef(null);

  // Animated inference/data flow visualization for hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const drawInferenceAnimation = () => {
      time += 0.015;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Create flowing data streams representing inference
      for (let stream = 0; stream < 5; stream++) {
        const streamOffset = stream * 0.5;
        const amplitude = 40 + stream * 15;
        
        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const wave = Math.sin(x * 0.01 + time + streamOffset) * amplitude;
          const wave2 = Math.cos(x * 0.015 + time * 0.7 + streamOffset) * (amplitude * 0.5);
          const y = height * (0.3 + stream * 0.1) + wave + wave2;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, `rgba(0, 102, 255, ${0.1 + stream * 0.05})`);
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.3 + stream * 0.05})`);
        gradient.addColorStop(1, `rgba(0, 102, 255, ${0.1 + stream * 0.05})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw central processing nodes
      const nodes = [
        { x: centerX - 80, y: centerY - 60, size: 25, label: 'Input' },
        { x: centerX, y: centerY, size: 35, label: 'GPU' },
        { x: centerX + 80, y: centerY + 60, size: 25, label: 'Output' }
      ];

      // Draw connecting lines
      ctx.strokeStyle = 'rgba(0, 102, 255, 0.3)';
      ctx.lineWidth = 2;
      for (let i = 0; i < nodes.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
        ctx.stroke();
      }

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time * 2 + i) * 5;
        
        // Glow effect
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.size + pulse + 20
        );
        glowGradient.addColorStop(0, 'rgba(0, 102, 255, 0.4)');
        glowGradient.addColorStop(1, 'rgba(0, 102, 255, 0)');
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + pulse + 20, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Main node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + pulse, 0, Math.PI * 2);
        const nodeGradient = ctx.createRadialGradient(
          node.x - 5, node.y - 5, 0,
          node.x, node.y, node.size + pulse
        );
        nodeGradient.addColorStop(0, '#3b82f6');
        nodeGradient.addColorStop(1, '#1d4ed8');
        ctx.fillStyle = nodeGradient;
        ctx.fill();
        
        // Border
        ctx.strokeStyle = 'rgba(100, 180, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Floating data particles
      for (let i = 0; i < 25; i++) {
        const px = (Math.sin(time * 0.5 + i * 0.4) + 1) * width * 0.4 + width * 0.1;
        const py = (Math.cos(time * 0.3 + i * 0.5) + 1) * height * 0.4 + height * 0.1;
        const size = 2 + Math.sin(time + i) * 1;
        
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 180, 255, ${0.3 + Math.sin(time + i) * 0.2})`;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(drawInferenceAnimation);
    };

    resize();
    window.addEventListener('resize', resize);
    drawInferenceAnimation();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

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
      description: 'Blubrg delivers an average cost saving of up to 80% compared to hyperscalers.',
      link: '/pricing'
    },
    {
      metric: '30%',
      label: 'FASTER',
      title: 'On time to insights',
      description: 'Blubrg Cloud shortens the path to actionable insights by as much as 30%, powered by a stack purpose-built and tuned specifically for AI workloads.',
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
      answer: "Protection sits at the core of Blubrg’s approach. Strong identity and access controls are in place, with compatibility for OAuth2, SSO, and 2FA. Information is safeguarded through encryption during storage and transmission, while compliance aligns with recognised frameworks such as GDPR and HIPAA. Shared environments are designed to maintain strict separation, preserving confidentiality and isolation for every tenant."
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

  useDocumentTitle('AI Inference | BluBrg');

  return (
    <div className="min-h-screen bg-[#F3F6E8] font-['DM_Sans']">      {/* SECTION 1: Hero Section with Animated Inference Visual */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d1420] to-[#0a0a0f]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#0B1F3B]/20 rounded-full filter blur-[120px] animate-pulse" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6" style={{ animation: 'fadeInUp 1s ease-out' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0B1F3B]/20 rounded-full border border-blue-600/30">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-[#328CC1] text-sm font-medium">INFERENCE</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}>
                Fast, affordable,<br />auto-scaling AI<br />inference
              </h1>
              
              <p className="text-[#243447] text-lg max-w-xl leading-relaxed" style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}>
                Designed for maximum efficiency, the inference offering runs on dynamically scaling GPU capacity, with end-to-end optimisation tailored to support both batch processing and real-time streaming demands.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4" style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
                <Link to="/contact/sales">
                  <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded font-medium">
                    Get Started
                  </Button>
                </Link>
                <Link to="/contact/sales" className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors font-medium">
                  Contact Sales <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Right - Animated Inference Visual */}
            <div className="relative h-[400px] lg:h-[450px]" style={{ animation: 'fadeInRight 1s ease-out 0.4s both' }}>
              <div className="absolute inset-0 bg-slate-900/50 rounded-2xl border border-[#D6DEC3]/30 overflow-hidden">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full"
                  style={{ background: 'transparent' }}
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
      <section className="py-16 bg-[#F3F6E8] border-t border-b border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            {performanceMetrics.map((item, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-1">
                  {item.metric} <span className="text-lg font-medium">{item.label}</span>
                </div>
                <p className="text-[#0B1F3B] font-medium mb-1">{item.title}</p>
                <p className="text-[#243447] text-sm mb-3">{item.description}</p>
                {/* <Link to={item.link} className="text-[#328CC1] text-sm hover:text-blue-300 flex items-center gap-1 justify-center md:justify-start">
                  Learn More <ArrowRight className="w-3 h-3" />
                </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Inference Frameworks Section */}
      <section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Easily access optimised<br />inference frameworks
              </h2>
              <p className="text-[#243447] mb-6 leading-relaxed">
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
              <div className="relative w-80 h-80">
                {/* Central vLLM logo */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#0B1F3B] rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <span className="text-[#0B1F3B] font-bold text-lg">vLLM</span>
                </div>
                
                {/* Orbiting framework icons */}
                {frameworkIcons.map((fw, i) => {
                  const angle = (i / frameworkIcons.length) * Math.PI * 2 - Math.PI / 2;
                  const radius = 120;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <div 
                      key={i}
                      className="absolute w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center border border-[#D6DEC3] shadow-lg"
                      style={{
                        left: `calc(50% + ${x}px - 28px)`,
                        top: `calc(50% + ${y}px - 28px)`
                      }}
                    >
                      <span className="text-xs text-[#243447] text-center">{fw.name}</span>
                    </div>
                  );
                })}
                
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {frameworkIcons.map((_, i) => {
                    const angle = (i / frameworkIcons.length) * Math.PI * 2 - Math.PI / 2;
                    const radius = 120;
                    const x = 160 + Math.cos(angle) * radius;
                    const y = 160 + Math.sin(angle) * radius;
                    
                    return (
                      <line 
                        key={i}
                        x1="160" y1="160" 
                        x2={x} y2={y}
                        stroke="rgba(59, 130, 246, 0.3)"
                        strokeWidth="1"
                        strokeDasharray="4,4"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Model Grid Section */}
      <section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Dedicated endpoints for<br />100+ open-source models
              </h2>
              <p className="text-[#243447] mb-6 leading-relaxed">
                Using Inference Endpoints, you can quickly launch Transformers, Diffusers, or bespoke models on dedicated, fully managed compute environments. Choose from over 100 available models, enhanced through Blubrg’s proprietary optimisation layer to achieve maximum performance.

              </p>
              <Link to="/contact/sales" className="text-[#328CC1] hover:text-blue-300 inline-flex items-center gap-2">
                Contact Sales <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Model Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {modelCards.map((model, i) => (
                <div key={i} className="bg-slate-900/50 rounded-lg p-4 border border-[#D6DEC3] hover:border-[#D6DEC3]/50 transition-colors">
                  <div className="text-xs text-[#5B6B7A] mb-1">{model.type}</div>
                  <div className="text-[#0B1F3B] font-semibold text-sm mb-2">{model.name}</div>
                  <div className="text-xs text-[#243447]">{model.publisher}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: GPU Compute Section */}
      <section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Built on high-<br />performance GPU<br />compute
              </h2>
              <p className="text-[#243447] mb-6 leading-relaxed">
               The inference offering runs on next-generation GPU acceleration. Paired with ultra-fast networking and rapid storage systems, it provides exceptional compute capability for both batch processing and real-time artificial intelligence workloads.
              </p>
              <Link to="/products/gpu-nodes" className="text-[#328CC1] hover:text-blue-300 inline-flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* GPU Visual */}
            <div className="relative">
              <div className="bg-slate-900/50 rounded-xl border border-[#D6DEC3]/30 p-6 aspect-video flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  {/* GPU server rack representation */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="h-8 bg-slate-700/50 rounded border border-[#D6DEC3]/30 flex items-center justify-center">
                        <div className="flex gap-0.5">
                          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                          <div className="w-1 h-1 rounded-full bg-blue-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[#5B6B7A] text-sm">NVIDIA H100 • H200 • GB200 NVL72</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Feature Strip */}
      <section className="py-16 bg-[#F3F6E8] border-t border-b border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="text-center md:text-left">
                <feature.icon className="w-10 h-10 text-blue-500 mb-4 mx-auto md:mx-0" />
                <h3 className="text-xl font-bold text-[#0B1F3B] mb-3">{feature.title}</h3>
                <p className="text-[#243447] text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Fully Integrated AI Infrastructure */}
      <section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Get access to a fully<br />integrated suite of AI<br />services and compute
              </h2>
              <p className="text-[#243447] mb-6 leading-relaxed">
                 Lower spending, increase income, and operate artificial intelligence workloads with greater effectiveness through a completely unified environment. Whether leveraging <Link to="/" className="text-[#328CC1] hover:underline">BluBrg</Link>'s AI/ML capabilities or integrating external solutions, this platform streamlines progression from creation stages into live deployment.
              </p>
            </div>
            
            {/* Infrastructure Diagram */}
            <div className="bg-slate-900/30 rounded-xl border border-[#D6DEC3]/30 p-6">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#EEF2DC] rounded-lg p-3 text-center border border-[#D6DEC3]/30">
                  <span className="text-sm text-[#243447]">Serverless</span>
                </div>
                <div className="bg-[#EEF2DC] rounded-lg p-3 text-center border border-[#D6DEC3]/30">
                  <span className="text-sm text-[#243447]">Marketplace</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#0B1F3B]/20 rounded-lg p-3 text-center border border-blue-500/30">
                  <span className="text-sm text-blue-300">Inference</span>
                </div>
                <div className="bg-[#0B1F3B]/20 rounded-lg p-3 text-center border border-blue-500/30">
                  <span className="text-sm text-blue-300">Training</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                {infrastructureTools.map((tool, i) => (
                  <div key={i} className="bg-slate-800/30 rounded-lg p-2 text-center border border-[#D6DEC3]/20">
                    <span className="text-xs text-[#243447]">{tool}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-[#EEF2DC] rounded-lg p-3 text-center border border-[#D6DEC3]/30 mb-4">
                <span className="text-sm text-[#243447]">GPU nodes</span>
              </div>
              
              {/* Data Center Badge */}
              <div className="bg-slate-900 rounded-lg p-4 border border-[#D6DEC3]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0B1F3B]/20 rounded-lg flex items-center justify-center">
                    <Server className="w-4 h-4 text-[#328CC1]" />
                  </div>
                  <div>
                    <div className="text-[#0B1F3B] text-sm font-medium">BluBrg's Data centers</div>
                    <div className="text-xs text-[#5B6B7A]">Powered by renewable energy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQs */}
      <section className="py-20 bg-[#F3F6E8]">
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
                  <p className="text-[#243447] pb-4 pr-12">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Final CTA Strip */}
     <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#0B1F3B]">
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

export default Inference;
