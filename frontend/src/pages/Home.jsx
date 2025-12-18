import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, ArrowLeft, Plus, Minus, Check, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeInfraTab, setActiveInfraTab] = useState(0);
  const canvasRef = useRef(null);

  // Animated flowing glass ribbon 3D form for hero - premium enterprise style
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

    const drawGlassRibbon = () => {
      time += 0.004; // Slow, calm movement
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Draw multiple layered flowing ribbon shapes (glass-like 3D form)
      for (let layer = 0; layer < 5; layer++) {
        ctx.save();
        ctx.translate(centerX, centerY);
        
        const layerOffset = layer * 0.4;
        const rotation = time * 0.15 + layerOffset;
        const scale = 1.2 - layer * 0.08;
        const breathe = Math.sin(time * 0.5 + layer) * 8;
        
        ctx.rotate(rotation);
        ctx.scale(scale, scale * 0.9);

        // Create flowing ribbon/glass shape
        const ribbonSize = Math.min(width, height) * 0.45;
        
        // Multi-stop gradient for glass-like depth effect
        const gradient = ctx.createLinearGradient(
          -ribbonSize, -ribbonSize * 0.6, 
          ribbonSize, ribbonSize * 0.6
        );
        gradient.addColorStop(0, `rgba(10, 46, 109, ${0.9 - layer * 0.15})`);
        gradient.addColorStop(0.2, `rgba(30, 90, 180, ${0.85 - layer * 0.15})`);
        gradient.addColorStop(0.4, `rgba(60, 120, 200, ${0.7 - layer * 0.12})`);
        gradient.addColorStop(0.6, `rgba(100, 150, 220, ${0.6 - layer * 0.1})`);
        gradient.addColorStop(0.8, `rgba(40, 80, 160, ${0.75 - layer * 0.12})`);
        gradient.addColorStop(1, `rgba(10, 30, 80, ${0.5 - layer * 0.08})`);

        // Draw flowing curved ribbon shape
        ctx.beginPath();
        const wave1 = Math.sin(time + layer) * 15;
        const wave2 = Math.cos(time * 0.8 + layer) * 20;
        
        // Complex bezier curve for glass ribbon
        ctx.moveTo(-ribbonSize, wave1);
        ctx.bezierCurveTo(
          -ribbonSize * 0.5, -ribbonSize * 0.5 + wave2 + breathe,
          ribbonSize * 0.3, -ribbonSize * 0.4 - wave1,
          ribbonSize, wave2
        );
        ctx.bezierCurveTo(
          ribbonSize * 0.8, ribbonSize * 0.3 + wave1,
          ribbonSize * 0.2, ribbonSize * 0.5 - wave2 + breathe,
          -ribbonSize * 0.3, ribbonSize * 0.3 + wave1
        );
        ctx.bezierCurveTo(
          -ribbonSize * 0.7, ribbonSize * 0.2 - wave2,
          -ribbonSize * 0.9, wave1 + breathe,
          -ribbonSize, wave1
        );
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.fill();

        // Subtle highlight edge for glass effect
        if (layer < 2) {
          const highlightGradient = ctx.createLinearGradient(-ribbonSize, 0, ribbonSize, 0);
          highlightGradient.addColorStop(0, `rgba(150, 200, 255, ${0.15 - layer * 0.05})`);
          highlightGradient.addColorStop(0.5, `rgba(180, 220, 255, ${0.25 - layer * 0.08})`);
          highlightGradient.addColorStop(1, `rgba(100, 160, 230, ${0.1 - layer * 0.03})`);
          ctx.strokeStyle = highlightGradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.restore();
      }

      // Inner glow effect
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.min(width, height) * 0.4
      );
      glowGradient.addColorStop(0, 'rgba(80, 140, 220, 0.15)');
      glowGradient.addColorStop(0.5, 'rgba(40, 100, 180, 0.08)');
      glowGradient.addColorStop(1, 'rgba(10, 40, 100, 0)');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      animationFrame = requestAnimationFrame(drawGlassRibbon);
    };

    resize();
    window.addEventListener('resize', resize);
    drawGlassRibbon();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const newsItems = [
    {
      date: "01 June, 2025",
      title: "BluBrg Closes Oversubscribed $500M Series B to Scale AI Infrastructure",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80"
    },
    {
      date: "21 May, 2025",
      title: "BluBrg Expands European Operations with New Data Center in Norway",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80"
    },
    {
      date: "15 May, 2025",
      title: "BluBrg Named NVIDIA Preferred Partner for AI Cloud Infrastructure",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&q=80"
    }
  ];

  const infraTabs = [
    {
      name: "Datacenters",
      title: "Purpose-built for AI",
      description: "BluBrg's Arctic data centers are engineered specifically for the intensive energy demands of GPU-based AI computing, utilizing 100% renewable hydroelectric power.",
      features: ["100% Renewable Energy", "Arctic cooling advantage", "Scalable infrastructure", "Sovereign data hosting"]
    },
    {
      name: "GPU Nodes",
      title: "High-performance compute",
      description: "Access the latest NVIDIA GPUs including H100, H200, and GB200 NVL72, optimized for AI training and inference workloads.",
      features: ["NVIDIA Grace Blackwell", "On-demand access", "Optimized for AI/HPC", "Bare-metal performance"]
    },
    {
      name: "Networking",
      title: "GPU fabric optimized for AI",
      description: "High-bandwidth, low-latency networking built for distributed AI training and inference at scale.",
      features: ["RoCE enabled", "Non-blocking design", "400Gbps InfiniBand", "Built for AI scale"]
    },
    {
      name: "Storage",
      title: "Fast storage for AI workloads",
      description: "High-performance parallel filesystems ensure GPUs are kept busy and fully utilized during training and inference.",
      features: ["RDMA enabled", "Parallel filesystems", "AI storage platform", "Fast checkpointing"]
    },
    {
      name: "Kubernetes",
      title: "Container orchestration at scale",
      description: "Robust Kubernetes infrastructure for deploying, managing, and scaling containerized AI workloads efficiently.",
      features: ["Bare metal performance", "Auto-scale to 1000s GPUs", "Fully managed", "Native GPU support"]
    }
  ];

  const testimonials = [
    {
      quote: "AI is transforming the global economy and reshaping the role of renewable energy. With Blubrg, we are supporting infrastructure that is sovereign, scalable, and purpose-built to drive this shift forward. Blubrg’s full-stack, GPU-first approach provides a clear execution advantage. The scale and quality of this Series B round reflect Blubrg’s strong vision, growing momentum, and the depth of our partnership. Through both our Series B investment and joint venture, we are making a meaningful, long-term commitment to building industrial relevance in the era of AI.",
      name: "Øyvind Eriksen",
      role: "President & CEO",
      company: "Aker ASA"
    },
    {
      quote: "In just a few months, Blubrg has advanced with clear focus and speed, transforming bold plans into real production capacity and achieving meaningful relevance quickly. The team is developing large-scale, sovereign infrastructure that enterprises and governments can truly use, delivering reliability, efficiency, and proximity to their data. We’re excited to support [Josh and the] Blubrg [team] as they scale thoughtfully, empower builders with the right infrastructure, and lay a strong foundation for national AI leadership.",
      name: "Larry Aschebrook",
      role: "Founder & Managing Partner",
      company: "G Squared"
    }
  ];

  const useCases = [
    {
      title: "TRAINING",
      metrics: [{ value: "80%", label: "Lower Cost" }, { value: "30%", label: "Faster" }],
      gradient: "from-purple-800/60 via-violet-900/50 to-indigo-900/60",
      link: "/solutions/training"
    },
    {
      title: "INFERENCE",
      metrics: [{ value: "7.2X", label: "Performance" }, { value: "+40%", label: "Efficiency" }],
      gradient: "from-slate-800/60 via-gray-900/50 to-zinc-900/60",
      link: "/solutions/inference"
    },
    {
      title: "FINE-TUNING",
      metrics: [{ value: "+40%", label: "Efficiency" }, { value: "30%", label: "Faster" }],
      gradient: "from-emerald-800/60 via-teal-900/50 to-green-900/60",
      link: "/solutions/fine-tuning"
    },
    {
      title: "AI DEVELOPMENT",
      metrics: [{ value: "80%", label: "Lower Cost" }, { value: "30%", label: "Faster" }],
      gradient: "from-amber-800/60 via-orange-900/50 to-yellow-900/60",
      link: "/solutions/ai-development"
    }
  ];

  const faqs = [
    {
      question: "What makes BluBrg different from other cloud providers?",
      answer: "BluBrg is purpose-built for AI from the ground up. Unlike general-purpose cloud providers, our infrastructure is optimized specifically for AI workloads with latest NVIDIA GPUs, high-bandwidth networking, and 100% renewable energy. We offer up to 80% cost savings and zero rate limits."
    },
    {
      question: "What GPU options are available?",
      answer: "We offer the latest NVIDIA GPUs including H100, H200, and the new GB200 NVL72 Blackwell architecture. All GPUs are available on-demand with bare-metal performance and can scale from single GPUs to thousands of nodes."
    },
    {
      question: "How does BluBrg ensure sustainability?",
      answer: "All our data centers are powered by 100% renewable hydroelectric energy in Norway. Our Arctic location provides natural cooling advantages, significantly reducing our environmental footprint compared to traditional data centers."
    },
    {
      question: "What support is available for enterprise customers?",
      answer: "Enterprise customers receive dedicated support including 24/7 technical assistance, dedicated account management, custom SLAs, and access to our AI solutions architects for architecture review and optimization."
    },
    {
      question: "Can I try BluBrg before committing?",
      answer: "Yes! We offer free trials and proof-of-concept deployments. Contact our sales team to discuss your specific requirements and get started with a customized evaluation plan."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-['DM_Sans']">
      {/* Hero Section with Animated Glass Ribbon 3D Form */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Deep blue gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#000020] via-[#0a1d54] to-[#061440]" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="space-y-6" style={{ animation: 'fadeInUp 1s ease-out' }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-white">
                The hyperscaler<br />engineered for AI
              </h1>
              
              <p className="text-xl text-white/70 font-light leading-relaxed max-w-md" style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}>
                A full-stack, scalable, and sustainable AI cloud platform.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2" style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}>
                <Link to="/contact">
                  <Button className="bg-white text-[#0a1d54] hover:bg-white/90 px-8 py-3 rounded font-medium text-base">
                    Reserve GPUs
                  </Button>
                </Link>
                <Link to="/contact" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium">
                  Start Building <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Partner Logos */}
              <div className="flex flex-wrap items-center gap-6 pt-10" style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
                <span className="text-white/50 text-xs font-medium tracking-wider">Hewlett Packard Enterprise</span>
                <span className="text-white/50 text-xs font-medium tracking-wider">Computacenter</span>
                <span className="text-white/50 text-xs font-medium tracking-wider">Antler</span>
                <span className="text-white/50 text-xs font-medium tracking-wider">Open Innovation</span>
              </div>
            </div>
            
            {/* Right - Animated Glass Ribbon 3D Visual */}
            <div className="relative h-[450px] lg:h-[550px]">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full"
                style={{ background: 'transparent' }}
              />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* News/Updates Strip */}
      {/* <section className="py-12 bg-[#0a0a0f] border-t border-slate-800/50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-medium">Latest News</h3>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-video rounded-xl overflow-hidden mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <h4 className="text-white font-medium group-hover:text-blue-400 transition-colors">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Integrated AI Platform Section */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom">
          {/* <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              A fully integrated suite of AI services and compute
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Cut costs, increase revenue, and operate your AI workloads more efficiently with a fully integrated platform. Our platform simplifies the transition from development to production.
            </p>
          </div> */}

          {/* Stacked Feature Blocks with Abstract Visuals */}
          <div className="space-y-24 bg-[#0a0a0f]/50 rounded-3xl p-8 lg:p-12">
            {/* Section 1: Integrated Suite - Interconnected flowing layers */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <h3 className="text-3xl font-light text-white mb-4">A fully integrated suite of AI services and compute</h3>
                <p className="text-gray-400 leading-relaxed">Cut costs, increase revenue, and operate your AI workloads more efficiently with a fully integrated platform. Our platform simplifies the transition from development to production.</p>
              </div>
              <div className="relative h-64 order-2">
                <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="integrated1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3a6a9c" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#4a85b0" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#3a6a9c" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="integrated2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4a85b0" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#3a6a9c" stopOpacity="0.5" />
                    </linearGradient>
                    <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <g className="feature-wave">
                    <path d="M50,180 Q100,120 180,140 Q260,160 320,100 Q380,40 400,80" fill="none" stroke="url(#integrated1)" strokeWidth="45" opacity="0.7" strokeLinecap="round" />
                    <path d="M0,140 Q80,80 160,110 Q240,140 300,80 Q360,20 400,60" fill="none" stroke="url(#integrated2)" strokeWidth="35" opacity="0.6" strokeLinecap="round" />
                    <path d="M30,200 Q120,140 200,170 Q280,200 350,140 Q400,100 420,120" fill="none" stroke="url(#integrated1)" strokeWidth="28" opacity="0.5" strokeLinecap="round" />
                  </g>
                  <ellipse cx="200" cy="125" rx="100" ry="60" fill="url(#integrated2)" opacity="0.2" filter="url(#glow1)" />
                </svg>
              </div>
            </div>

            {/* Section 2: Serverless - Lightweight wave-like elastic motion */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-1 lg:order-2 lg:text-right">
                <h3 className="text-3xl font-light text-white mb-4">Serverless model endpoints for inference</h3>
                <p className="text-gray-400 leading-relaxed">Serverless enables smooth, scalable AI inference without the burden of managing infrastructure. It automatically adjusts to demand, delivering low-latency, cost-efficient inference.</p>
              </div>
              <div className="relative h-64 order-2 lg:order-1">
                <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="serverless1" x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stopColor="#2a6a9a" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#4a90c0" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#2a6a9a" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="serverless2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#5aa0d0" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#2a6090" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <g className="feature-wave">
                    <path d="M0,125 Q100,70 200,125 Q300,180 400,125" fill="none" stroke="url(#serverless1)" strokeWidth="50" opacity="0.55" strokeLinecap="round" />
                    <path d="M0,125 Q100,170 200,125 Q300,80 400,125" fill="none" stroke="url(#serverless2)" strokeWidth="35" opacity="0.5" strokeLinecap="round" />
                    <path d="M0,125 Q100,100 200,125 Q300,150 400,125" fill="none" stroke="url(#serverless1)" strokeWidth="22" opacity="0.6" strokeLinecap="round" />
                  </g>
                  <ellipse cx="200" cy="125" rx="90" ry="45" fill="#4a90c0" opacity="0.15" />
                </svg>
              </div>
            </div>

            {/* Section 3: Training Clusters - Heavier structured abstract depth */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <h3 className="text-3xl font-light text-white mb-4">Dedicated training clusters ready to go</h3>
                <p className="text-gray-400 leading-relaxed">BluBrg's optimized GPU clusters are built to shorten model training times and improve productivity. Leverage Slurm and Kubernetes for robust infrastructure management.</p>
              </div>
              <div className="relative h-64 order-2">
                <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="training1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3a6a90" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#2a4a70" stopOpacity="0.5" />
                    </linearGradient>
                    <linearGradient id="training2" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4a80b0" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#3a6a90" stopOpacity="0.55" />
                    </linearGradient>
                    <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <g className="feature-wave">
                    <rect x="70" y="55" width="130" height="85" rx="10" fill="url(#training1)" opacity="0.6" transform="rotate(-5 135 97)" />
                    <rect x="150" y="85" width="110" height="75" rx="10" fill="url(#training2)" opacity="0.55" transform="rotate(3 205 122)" />
                    <rect x="210" y="45" width="120" height="95" rx="10" fill="url(#training1)" opacity="0.5" transform="rotate(-2 270 92)" />
                    <rect x="110" y="125" width="100" height="65" rx="10" fill="url(#training2)" opacity="0.45" transform="rotate(5 160 157)" />
                  </g>
                  <ellipse cx="200" cy="125" rx="130" ry="75" fill="#3a6a90" opacity="0.12" filter="url(#glow2)" />
                </svg>
              </div>
            </div>

            {/* Section 4: New Standard - Clean precision-focused abstract form */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-1 lg:order-2 lg:text-right">
                <h3 className="text-3xl font-light text-white mb-4">Setting a new standard for inference</h3>
                <p className="text-gray-400 leading-relaxed">Access high-performance, cost-effective, and auto-scaling infrastructure for AI inference. Every layer of the stack is optimized for both batch and streaming workloads.</p>
              </div>
              <div className="relative h-64 order-2 lg:order-1">
                <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="precision1" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#4a7ab0" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#2a5a8a" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="precision2" x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stopColor="#2a5a8a" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#5a9ad0" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#2a5a8a" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <g className="feature-wave">
                    <circle cx="200" cy="125" r="85" fill="none" stroke="url(#precision1)" strokeWidth="3" opacity="0.65" />
                    <circle cx="200" cy="125" r="65" fill="none" stroke="url(#precision2)" strokeWidth="2.5" opacity="0.6" />
                    <circle cx="200" cy="125" r="45" fill="none" stroke="url(#precision1)" strokeWidth="2" opacity="0.55" />
                    <circle cx="200" cy="125" r="25" fill="none" stroke="url(#precision2)" strokeWidth="1.5" opacity="0.5" />
                    <line x1="115" y1="125" x2="285" y2="125" stroke="url(#precision2)" strokeWidth="1.5" opacity="0.4" />
                    <line x1="200" y1="40" x2="200" y2="210" stroke="url(#precision2)" strokeWidth="1.5" opacity="0.4" />
                  </g>
                  <circle cx="200" cy="125" r="55" fill="url(#precision1)" opacity="0.18" />
                </svg>
              </div>
            </div>

            {/* Section 5: Scalable Compute - Expanding layered visual scale */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <h3 className="text-3xl font-light text-white mb-4">Scalable, flexible AI Compute</h3>
                <p className="text-gray-400 leading-relaxed">BluBrg's GPU Nodes provide powerful computing performance designed for AI and high-performance computing workloads, backed by advanced cooling technology.</p>
              </div>
              <div className="relative h-64 order-2">
                <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="scale1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2a5a8a" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#4a7ab0" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#5a9ad0" stopOpacity="0.5" />
                    </linearGradient>
                    <linearGradient id="scale2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4a85b0" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#2a5a8a" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="glow3" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <g className="feature-wave">
                    <path d="M95,205 L95,95 L200,45 L305,95 L305,205 L200,255 Z" fill="url(#scale1)" opacity="0.4" />
                    <path d="M125,185 L125,105 L200,65 L275,105 L275,185 L200,225 Z" fill="url(#scale2)" opacity="0.5" />
                    <path d="M155,165 L155,115 L200,90 L245,115 L245,165 L200,190 Z" fill="url(#scale1)" opacity="0.6" />
                  </g>
                  <ellipse cx="200" cy="145" rx="100" ry="55" fill="#4a7ab0" opacity="0.15" filter="url(#glow3)" />
                </svg>
              </div>
            </div>

            {/* Section 6: Turnkey Development - Converging flow end-to-end abstraction */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-1 lg:order-2 lg:text-right">
                <h3 className="text-3xl font-light text-white mb-4">Turnkey AI development and deployment</h3>
                <p className="text-gray-400 leading-relaxed">The BluBrg Marketplace provides users with a wide range of AI/ML tools and resources, supporting efficient, scalable model development and seamless deployment.</p>
              </div>
              <div className="relative h-64 order-2 lg:order-1">
                <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="turnkey1" x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stopColor="#2a6090" stopOpacity="0.7" />
                      <stop offset="50%" stopColor="#4a90c0" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#2a6090" stopOpacity="0.7" />
                    </linearGradient>
                    <linearGradient id="turnkey2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3a7aa0" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#5aa0d0" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  <g className="feature-wave">
                    <path d="M40,45 Q160,125 40,205" fill="none" stroke="url(#turnkey1)" strokeWidth="25" opacity="0.55" strokeLinecap="round" />
                    <path d="M90,25 Q200,125 90,225" fill="none" stroke="url(#turnkey2)" strokeWidth="18" opacity="0.5" strokeLinecap="round" />
                    <path d="M360,45 Q240,125 360,205" fill="none" stroke="url(#turnkey1)" strokeWidth="25" opacity="0.55" strokeLinecap="round" />
                    <path d="M310,25 Q200,125 310,225" fill="none" stroke="url(#turnkey2)" strokeWidth="18" opacity="0.5" strokeLinecap="round" />
                    <ellipse cx="200" cy="125" rx="35" ry="35" fill="url(#turnkey1)" opacity="0.45" />
                  </g>
                  <ellipse cx="200" cy="125" rx="70" ry="45" fill="#4a90c0" opacity="0.15" />
                </svg>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes featureWave {
              0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
              50% { transform: translateY(-3px) scale(1.01); opacity: 0.95; }
            }
            .feature-wave {
              animation: featureWave 6s ease-in-out infinite;
            }
          `}</style>
        </div>
      </section>

      {/* BluBrg Infrastructure Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols gap-12">
            {/* Left - Text and Tabs */}
            <div>
              <h2 className="text-4xl font-light mb-6">BluBrg's Infrastructure</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Blubrg manages the full AI infrastructure stack, from energy-efficient data centres in Norway to advanced compute clusters and software setups. Every component is thoughtfully chosen and engineered to support the demanding requirements of AI.
              </p>
              
              {/* Tab Buttons */}
              <div className="flex flex-wrap gap-2 mb-8">
                {infraTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveInfraTab(index)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeInfraTab === index 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
              
              {/* Active Tab Content */}
              <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-medium mb-3">{infraTabs[activeInfraTab].title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{infraTabs[activeInfraTab].description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {infraTabs[activeInfraTab].features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/products/gpu-nodes" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mt-4 text-sm">
                  See More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Right - Empty for background image */}
            <div />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom">
          <h2 className="text-3xl font-light mb-12">Testimonials</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((item, index) => (
              <div key={index} className="border-l-2 border-slate-700 pl-6">
                <p className="text-gray-300 italic mb-6 leading-relaxed text-sm">"{item.quote}"</p>
                <div className="text-white font-medium">{item.name}</div>
                <div className="text-gray-500 text-sm">{item.role}</div>
                <div className="text-gray-600 text-sm">{item.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-light mb-4">Use cases</h2>
            <p className="text-gray-400 max-w-2xl">
              End-to-end AI solutions covering model training, fine-tuning, inference, and development—all built to accelerate your AI initiatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            {/* Model Training Card - Purple Wave */}
            <Link to="/solutions/training">
              <div className="relative border border-[#353535] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 208" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="uc-purple-1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2a0040" />
                      <stop offset="30%" stopColor="#6020a0" />
                      <stop offset="50%" stopColor="#c060ff" />
                      <stop offset="70%" stopColor="#ff50c0" />
                      <stop offset="100%" stopColor="#400060" />
                    </linearGradient>
                    <linearGradient id="uc-purple-2" x1="0%" y1="80%" x2="100%" y2="20%">
                      <stop offset="0%" stopColor="#200030" />
                      <stop offset="40%" stopColor="#8040c0" />
                      <stop offset="60%" stopColor="#d080ff" />
                      <stop offset="100%" stopColor="#301050" />
                    </linearGradient>
                  </defs>
                  <path d="M -25 220 Q 75 140, 195 170 Q 315 200, 390 120 Q 440 70, 520 100 L 520 220 Z" fill="url(#uc-purple-1)" opacity="0.7"/>
                  <path d="M 50 230 Q 150 100, 290 140 Q 410 170, 500 80 L 520 230 Z" fill="url(#uc-purple-2)" opacity="0.85"/>
                  <path d="M 120 230 Q 220 90, 365 130 Q 465 160, 530 60 L 530 230 Z" fill="url(#uc-purple-1)"/>
                  <path d="M 120 230 Q 220 90, 365 130 Q 465 160, 530 60" fill="none" stroke="rgba(255,200,255,0.4)" strokeWidth="2"/>
                </svg>
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">TRAINING</span>
                </div>
              </div>
            </Link>

            {/* AI & ML Inference Card - Blue Angular */}
            <Link to="/solutions/inference">
              <div className="relative border border-[#353535] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 208" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="uc-steel-1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0a1020" />
                      <stop offset="30%" stopColor="#1a3050" />
                      <stop offset="60%" stopColor="#4a7090" />
                      <stop offset="100%" stopColor="#0a1525" />
                    </linearGradient>
                    <linearGradient id="uc-steel-2" x1="20%" y1="100%" x2="80%" y2="0%">
                      <stop offset="0%" stopColor="#051015" />
                      <stop offset="40%" stopColor="#2a5070" />
                      <stop offset="70%" stopColor="#5a90b0" />
                      <stop offset="100%" stopColor="#102035" />
                    </linearGradient>
                  </defs>
                  <path d="M 75 230 L 170 80 L 270 160 L 340 60 L 440 120 L 520 50 L 520 230 Z" fill="url(#uc-steel-1)" opacity="0.6"/>
                  <path d="M 150 230 L 220 100 L 320 150 L 410 70 L 520 110 L 520 230 Z" fill="url(#uc-steel-2)" opacity="0.8"/>
                  <path d="M 195 230 L 290 90 L 390 140 L 490 60 L 520 80 L 520 230 Z" fill="url(#uc-steel-1)"/>
                  <path d="M 195 230 L 290 90 L 390 140 L 490 60" fill="none" stroke="rgba(150,180,220,0.35)" strokeWidth="2"/>
                </svg>
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">INFERENCE</span>
                </div>
              </div>
            </Link>

            {/* AI Development Card - Orange/Bronze Wave */}
            <Link to="/solutions/ai-development">
              <div className="relative border border-[#353535] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 208" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="uc-bronze-1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#301505" />
                      <stop offset="30%" stopColor="#804020" />
                      <stop offset="55%" stopColor="#d08040" />
                      <stop offset="80%" stopColor="#ffa050" />
                      <stop offset="100%" stopColor="#503010" />
                    </linearGradient>
                    <linearGradient id="uc-bronze-2" x1="10%" y1="90%" x2="90%" y2="10%">
                      <stop offset="0%" stopColor="#201005" />
                      <stop offset="35%" stopColor="#905025" />
                      <stop offset="65%" stopColor="#c07030" />
                      <stop offset="100%" stopColor="#402010" />
                    </linearGradient>
                  </defs>
                  <path d="M -50 230 Q 100 120, 245 160 Q 365 190, 465 100 Q 510 60, 540 90 L 540 230 Z" fill="url(#uc-bronze-1)" opacity="0.65"/>
                  <path d="M 25 230 Q 150 100, 320 150 Q 440 180, 520 90 L 540 230 Z" fill="url(#uc-bronze-2)" opacity="0.8"/>
                  <path d="M 100 230 Q 220 80, 390 130 Q 490 160, 540 70 L 540 230 Z" fill="url(#uc-bronze-1)"/>
                  <path d="M 100 230 Q 220 80, 390 130 Q 490 160, 540 70" fill="none" stroke="rgba(255,200,150,0.4)" strokeWidth="2"/>
                </svg>
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">AI DEVELOPMENT</span>
                </div>
              </div>
            </Link>

            {/* Model Fine-Tuning Card - Green Wave */}
            <Link to="/solutions/fine-tuning">
              <div className="relative h-52 border border-[#353535] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 208" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="uc-green-1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#051510" />
                      <stop offset="30%" stopColor="#106030" />
                      <stop offset="55%" stopColor="#30a060" />
                      <stop offset="80%" stopColor="#50d080" />
                      <stop offset="100%" stopColor="#083020" />
                    </linearGradient>
                    <linearGradient id="uc-green-2" x1="10%" y1="90%" x2="90%" y2="10%">
                      <stop offset="0%" stopColor="#031008" />
                      <stop offset="40%" stopColor="#208050" />
                      <stop offset="70%" stopColor="#40b070" />
                      <stop offset="100%" stopColor="#0a2515" />
                    </linearGradient>
                  </defs>
                  <path d="M 150 230 Q 195 140, 245 170 Q 320 200, 365 110 Q 410 50, 520 80 L 520 230 Z" fill="url(#uc-green-1)" opacity="0.6"/>
                  <path d="M 220 230 Q 270 110, 340 150 Q 425 180, 490 90 L 520 230 Z" fill="url(#uc-green-2)" opacity="0.8"/>
                  <path d="M 270 230 Q 340 90, 410 130 Q 490 160, 540 70 L 540 230 Z" fill="url(#uc-green-1)"/>
                  <path d="M 270 230 Q 340 90, 410 130 Q 490 160, 540 70" fill="none" stroke="rgba(150,255,180,0.35)" strokeWidth="2"/>
                </svg>
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">FINE-TUNING</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* NVIDIA Partner Strip */}
      <section className="py-16 bg-[#0d1117] border-t border-b border-slate-800/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light mb-4">
                BluBrg is now an NVIDIA Preferred Partner
              </h2>
              <p className="text-gray-400 mb-6">
                Access thousands of GPUs tailored to your requirements.
              </p>
              <div className="flex gap-4">
                <Link to="/contact">
                  <Button className="bg-white text-[#0a0a0f] hover:bg-white/90 px-6 py-3">
                    Reserve GPUs
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-6 py-3">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end gap-8">
              <span className="text-5xl font-bold text-white/20 tracking-tight">NVIDIA</span>
              <div className="text-sm text-gray-500">Preferred Partner</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-light mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border-b border-slate-700/50"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-5 text-left hover:text-blue-400 transition-colors"
                >
                  <span className="text-lg font-medium pr-8">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-8">
            Access thousands of GPUs tailored to your requirements.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors font-medium px-6 py-3">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
