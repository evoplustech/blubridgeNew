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
          <div className="space-y-24">
            {/* Section 1: Integrated Suite - Interconnected flowing layers */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <h3 className="text-3xl font-light text-white mb-4">A fully integrated suite of AI services and compute</h3>
                <p className="text-gray-400 leading-relaxed">Cut costs, increase revenue, and operate your AI workloads more efficiently with a fully integrated platform. Our platform simplifies the transition from development to production.</p>
              </div>
              <div className="relative h-64 overflow-hidden order-2">
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
              <div className="relative h-64 overflow-hidden order-2 lg:order-1">
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
              <div className="relative h-64 overflow-hidden order-2">
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
              <div className="relative h-64 overflow-hidden order-2 lg:order-1">
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
              <div className="relative h-64 overflow-hidden order-2">
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
              <div className="relative h-64 overflow-hidden order-2 lg:order-1">
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
            {/* TRAINING Card - Flowing Draped Ribbons, Deep Purple */}
            <Link to="/solutions/training">
              <div className="relative h-80 rounded-xl overflow-hidden group cursor-pointer hover:scale-[1.01] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0d0815] via-[#15102a] to-[#0a0612]">
                  <svg viewBox="0 0 500 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <linearGradient id="trainRibbon1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8a3ab0" />
                        <stop offset="50%" stopColor="#6a2a90" />
                        <stop offset="100%" stopColor="#4a1870" />
                      </linearGradient>
                      <linearGradient id="trainRibbon2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#9a4ac0" />
                        <stop offset="50%" stopColor="#7a3aa0" />
                        <stop offset="100%" stopColor="#5a2080" />
                      </linearGradient>
                      <linearGradient id="trainHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c080e0" />
                        <stop offset="100%" stopColor="#a060c0" />
                      </linearGradient>
                      <filter id="trainGlow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    </defs>
                    <g className="training-animate">
                      {/* Cascading fabric ribbons - vertical flow direction */}
                      <path d="M150,-20 C130,60 180,120 160,200 C140,280 190,340 170,420" fill="none" stroke="url(#trainRibbon1)" strokeWidth="45" opacity="0.4" strokeLinecap="round" />
                      <path d="M220,-30 C200,50 250,130 230,220 C210,310 260,380 240,450" fill="none" stroke="url(#trainRibbon2)" strokeWidth="55" opacity="0.5" strokeLinecap="round" />
                      <path d="M300,-10 C280,80 330,160 310,260 C290,360 340,420 320,500" fill="none" stroke="url(#trainRibbon1)" strokeWidth="65" opacity="0.65" strokeLinecap="round" />
                      <path d="M380,0 C360,90 410,180 390,290 C370,400 420,460 400,540" fill="none" stroke="url(#trainRibbon2)" strokeWidth="50" opacity="0.55" strokeLinecap="round" />
                      <path d="M450,-20 C430,70 480,150 460,250 C440,350 490,430 470,520" fill="none" stroke="url(#trainRibbon1)" strokeWidth="40" opacity="0.45" strokeLinecap="round" />
                      {/* Soft highlight streaks */}
                      <path d="M300,-10 C280,80 330,160 310,260" stroke="url(#trainHighlight)" strokeWidth="3" fill="none" opacity="0.8" filter="url(#trainGlow)" />
                      <path d="M220,-30 C200,50 250,130 230,220" stroke="url(#trainHighlight)" strokeWidth="2" fill="none" opacity="0.6" />
                    </g>
                    <ellipse cx="300" cy="280" rx="180" ry="100" fill="#6a2a90" opacity="0.1" />
                  </svg>
                </div>
                <div className="absolute top-6 left-6 z-10"><h3 className="text-2xl font-semibold tracking-wide text-white">TRAINING</h3></div>
                <div className="absolute bottom-6 right-6 flex gap-3 z-10">
                  <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-2.5 border border-white/10 shadow-lg"><span className="text-white font-bold text-sm">80%</span><span className="text-gray-300 text-xs ml-1.5">Lower Cost</span></div>
                  <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-2.5 border border-white/10 shadow-lg"><span className="text-white font-bold text-sm">30%</span><span className="text-gray-300 text-xs ml-1.5">Faster</span></div>
                </div>
                <div className="absolute inset-0 border border-white/5 rounded-xl group-hover:border-purple-500/30 transition-colors" />
              </div>
            </Link>

            {/* INFERENCE Card - Sharp Angular Glass Shards, Cool Blue */}
            <Link to="/solutions/inference">
              <div className="relative h-80 rounded-xl overflow-hidden group cursor-pointer hover:scale-[1.01] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#080c14] via-[#0a1020] to-[#060a12]">
                  <svg viewBox="0 0 500 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <linearGradient id="infShard1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2a5080" />
                        <stop offset="100%" stopColor="#1a3060" />
                      </linearGradient>
                      <linearGradient id="infShard2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3a70a0" />
                        <stop offset="100%" stopColor="#2a5080" />
                      </linearGradient>
                      <linearGradient id="infEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8ac0f0" />
                        <stop offset="50%" stopColor="#aadaff" />
                        <stop offset="100%" stopColor="#6aa0d0" />
                      </linearGradient>
                      <filter id="infGlow"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    </defs>
                    <g className="inference-animate">
                      {/* Sharp angular crystal shards radiating from center-right */}
                      <polygon points="320,200 450,120 480,180 380,220" fill="url(#infShard1)" opacity="0.7" />
                      <polygon points="300,180 420,80 460,130 350,190" fill="url(#infShard2)" opacity="0.6" />
                      <polygon points="340,240 500,200 520,280 400,290" fill="url(#infShard1)" opacity="0.65" />
                      <polygon points="280,220 380,280 420,360 300,300" fill="url(#infShard2)" opacity="0.55" />
                      <polygon points="350,160 480,60 510,120 400,180" fill="url(#infShard1)" opacity="0.5" />
                      <polygon points="310,260 400,320 440,400 340,350" fill="url(#infShard2)" opacity="0.5" />
                      <polygon points="260,200 340,140 380,200 300,240" fill="url(#infShard1)" opacity="0.75" />
                      {/* Sharp reflective edges */}
                      <line x1="320" y1="200" x2="450" y2="120" stroke="url(#infEdge)" strokeWidth="2" opacity="0.9" filter="url(#infGlow)" />
                      <line x1="300" y1="180" x2="420" y2="80" stroke="url(#infEdge)" strokeWidth="1.5" opacity="0.7" />
                      <line x1="340" y1="240" x2="500" y2="200" stroke="url(#infEdge)" strokeWidth="2" opacity="0.8" filter="url(#infGlow)" />
                      <line x1="350" y1="160" x2="480" y2="60" stroke="url(#infEdge)" strokeWidth="1.5" opacity="0.6" />
                    </g>
                    <ellipse cx="380" cy="220" rx="100" ry="80" fill="#2a5080" opacity="0.08" />
                  </svg>
                </div>
                <div className="absolute top-6 left-6 z-10"><h3 className="text-2xl font-semibold tracking-wide text-white">INFERENCE</h3></div>
                <div className="absolute bottom-6 right-6 flex gap-3 z-10">
                  <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-2.5 border border-white/10 shadow-lg"><span className="text-white font-bold text-sm">7.2X</span><span className="text-gray-300 text-xs ml-1.5">Performance</span></div>
                  <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-2.5 border border-white/10 shadow-lg"><span className="text-white font-bold text-sm">+40%</span><span className="text-gray-300 text-xs ml-1.5">Efficiency</span></div>
                </div>
                <div className="absolute inset-0 border border-white/5 rounded-xl group-hover:border-blue-500/30 transition-colors" />
              </div>
            </Link>

            {/* FINE-TUNING Card - Smooth Organic Blob Forms, Soft Green */}
            <Link to="/solutions/fine-tuning">
              <div className="relative h-80 rounded-xl overflow-hidden group cursor-pointer hover:scale-[1.01] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#081410] via-[#0a1a14] to-[#06100c]">
                  <svg viewBox="0 0 500 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <radialGradient id="ftBlob1" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#4a9060" />
                        <stop offset="50%" stopColor="#2a7040" />
                        <stop offset="100%" stopColor="#1a5030" />
                      </radialGradient>
                      <radialGradient id="ftBlob2" cx="70%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="#5aa070" />
                        <stop offset="50%" stopColor="#3a8050" />
                        <stop offset="100%" stopColor="#2a6040" />
                      </radialGradient>
                      <linearGradient id="ftShine" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8ad0a0" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#6ab080" stopOpacity="0.3" />
                      </linearGradient>
                      <filter id="ftBlur"><feGaussianBlur stdDeviation="8" /></filter>
                      <filter id="ftGlow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    </defs>
                    <g className="finetune-animate">
                      {/* Organic blob/droplet shapes flowing and merging */}
                      <ellipse cx="350" cy="280" rx="120" ry="100" fill="url(#ftBlob1)" opacity="0.6" />
                      <ellipse cx="280" cy="200" rx="90" ry="70" fill="url(#ftBlob2)" opacity="0.7" />
                      <ellipse cx="400" cy="180" rx="70" ry="55" fill="url(#ftBlob1)" opacity="0.5" />
                      <ellipse cx="320" cy="320" rx="80" ry="60" fill="url(#ftBlob2)" opacity="0.55" />
                      <ellipse cx="420" cy="260" rx="60" ry="50" fill="url(#ftBlob1)" opacity="0.5" />
                      {/* Smooth liquid highlight arcs */}
                      <path d="M260,160 Q320,140 340,180" fill="none" stroke="url(#ftShine)" strokeWidth="4" opacity="0.7" filter="url(#ftGlow)" strokeLinecap="round" />
                      <path d="M320,240 Q380,220 400,260" fill="none" stroke="url(#ftShine)" strokeWidth="3" opacity="0.5" strokeLinecap="round" />
                      <path d="M380,150 Q420,140 440,170" fill="none" stroke="url(#ftShine)" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />
                    </g>
                    <ellipse cx="340" cy="250" rx="150" ry="100" fill="#2a7040" opacity="0.08" filter="url(#ftBlur)" />
                  </svg>
                </div>
                <div className="absolute top-6 left-6 z-10"><h3 className="text-2xl font-semibold tracking-wide text-white">FINE-TUNING</h3></div>
                <div className="absolute bottom-6 right-6 flex gap-3 z-10">
                  <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-2.5 border border-white/10 shadow-lg"><span className="text-white font-bold text-sm">+40%</span><span className="text-gray-300 text-xs ml-1.5">Efficiency</span></div>
                  <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-2.5 border border-white/10 shadow-lg"><span className="text-white font-bold text-sm">30%</span><span className="text-gray-300 text-xs ml-1.5">Faster</span></div>
                </div>
                <div className="absolute inset-0 border border-white/5 rounded-xl group-hover:border-green-500/30 transition-colors" />
              </div>
            </Link>

            {/* AI DEVELOPMENT Card - Heavy Sculpted Architectural Planes, Warm Brown/Copper */}
            <Link to="/solutions/ai-development">
              <div className="relative h-80 rounded-xl overflow-hidden group cursor-pointer hover:scale-[1.01] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#120c08] via-[#1a1410] to-[#0e0a06]">
                  <svg viewBox="0 0 500 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <linearGradient id="aiPlane1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8a6048" />
                        <stop offset="50%" stopColor="#6a4838" />
                        <stop offset="100%" stopColor="#4a3028" />
                      </linearGradient>
                      <linearGradient id="aiPlane2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#9a7058" />
                        <stop offset="50%" stopColor="#7a5848" />
                        <stop offset="100%" stopColor="#5a4038" />
                      </linearGradient>
                      <linearGradient id="aiPlane3" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3a2818" />
                        <stop offset="100%" stopColor="#5a4030" />
                      </linearGradient>
                      <linearGradient id="aiEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#caa080" />
                        <stop offset="50%" stopColor="#e0c0a0" />
                        <stop offset="100%" stopColor="#b09070" />
                      </linearGradient>
                      <filter id="aiGlow"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                      <filter id="aiShadow"><feDropShadow dx="5" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.5" /></filter>
                    </defs>
                    <g className="aidev-animate">
                      {/* Heavy architectural planes with bold mass */}
                      <polygon points="200,350 280,280 420,300 380,380 260,400" fill="url(#aiPlane3)" opacity="0.6" />
                      <polygon points="250,250 350,180 450,220 400,300 300,320" fill="url(#aiPlane1)" opacity="0.75" filter="url(#aiShadow)" />
                      <polygon points="280,200 380,130 480,170 430,250 330,270" fill="url(#aiPlane2)" opacity="0.7" />
                      <polygon points="320,150 400,90 490,120 450,190 370,210" fill="url(#aiPlane1)" opacity="0.6" />
                      <polygon points="220,300 300,250 380,280 340,340 260,360" fill="url(#aiPlane2)" opacity="0.65" />
                      {/* Sharp bold edges */}
                      <line x1="250" y1="250" x2="350" y2="180" stroke="url(#aiEdge)" strokeWidth="2.5" opacity="0.85" filter="url(#aiGlow)" />
                      <line x1="280" y1="200" x2="380" y2="130" stroke="url(#aiEdge)" strokeWidth="2" opacity="0.75" filter="url(#aiGlow)" />
                      <line x1="350" y1="180" x2="450" y2="220" stroke="url(#aiEdge)" strokeWidth="2" opacity="0.7" />
                      <line x1="320" y1="150" x2="400" y2="90" stroke="url(#aiEdge)" strokeWidth="1.5" opacity="0.6" />
                    </g>
                    <ellipse cx="360" cy="260" rx="130" ry="90" fill="#6a4838" opacity="0.1" />
                  </svg>
                </div>
                <div className="absolute top-6 left-6 z-10"><h3 className="text-2xl font-semibold tracking-wide text-white">AI DEVELOPMENT</h3></div>
                <div className="absolute bottom-6 right-6 flex gap-3 z-10">
                  <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-2.5 border border-white/10 shadow-lg"><span className="text-white font-bold text-sm">80%</span><span className="text-gray-300 text-xs ml-1.5">Lower Cost</span></div>
                  <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-2.5 border border-white/10 shadow-lg"><span className="text-white font-bold text-sm">30%</span><span className="text-gray-300 text-xs ml-1.5">Faster</span></div>
                </div>
                <div className="absolute inset-0 border border-white/5 rounded-xl group-hover:border-amber-500/30 transition-colors" />
              </div>
            </Link>
          </div>
        </div>
        
        <style>{`
          @keyframes trainingFlow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          @keyframes inferenceGlint {
            0%, 100% { transform: translateX(0) scale(1); opacity: 1; }
            50% { transform: translateX(2px) scale(1.01); opacity: 0.95; }
          }
          @keyframes finetuneFloat {
            0%, 100% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.02) translateY(-2px); }
          }
          @keyframes aidevShift {
            0%, 100% { transform: translateX(0) translateY(0); }
            50% { transform: translateX(2px) translateY(-2px); }
          }
          .training-animate { animation: trainingFlow 7s ease-in-out infinite; }
          .inference-animate { animation: inferenceGlint 6s ease-in-out infinite; }
          .finetune-animate { animation: finetuneFloat 8s ease-in-out infinite; }
          .aidev-animate { animation: aidevShift 7s ease-in-out infinite; }
        `}</style>
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
