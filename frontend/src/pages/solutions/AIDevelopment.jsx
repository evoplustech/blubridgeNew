import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid } from 'lucide-react';

const AIDevelopment = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [animationOffset, setAnimationOffset] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      setAnimationOffset(elapsed * 0.00006);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Hero Section - Deep Green 3D Glass/Ribbon Abstract Forms */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Deep dark green base background */}
        <div className="absolute inset-0 bg-[#0a1f14]" />
        
        {/* Animated 3D Glass Ribbon SVG Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            viewBox="0 0 1920 1080"
            className="absolute w-[200%] h-[150%] -top-[25%] -right-[50%]"
            preserveAspectRatio="xMidYMid slice"
            style={{ transform: `translate(${Math.sin(animationOffset) * 15}px, ${Math.cos(animationOffset * 0.7) * 10}px)` }}
          >
            <defs>
              {/* Main gradient for ribbon surfaces */}
              <linearGradient id="greenRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0d5a35" stopOpacity="1" />
                <stop offset="30%" stopColor="#1a8a50" stopOpacity="1" />
                <stop offset="60%" stopColor="#24a760" stopOpacity="1" />
                <stop offset="100%" stopColor="#0f6b3d" stopOpacity="1" />
              </linearGradient>
              
              <linearGradient id="greenRibbon2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0a4528" stopOpacity="1" />
                <stop offset="40%" stopColor="#158045" stopOpacity="1" />
                <stop offset="70%" stopColor="#1f9555" stopOpacity="1" />
                <stop offset="100%" stopColor="#0b5030" stopOpacity="1" />
              </linearGradient>
              
              <linearGradient id="greenRibbon3" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#2db873" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#1a8a50" stopOpacity="1" />
                <stop offset="100%" stopColor="#0a4025" stopOpacity="1" />
              </linearGradient>
              
              <linearGradient id="greenHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4de89a" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3cd488" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#2ab872" stopOpacity="0.3" />
              </linearGradient>
              
              <linearGradient id="greenDeep" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#052e18" stopOpacity="1" />
                <stop offset="50%" stopColor="#0a4528" stopOpacity="1" />
                <stop offset="100%" stopColor="#0d5a35" stopOpacity="1" />
              </linearGradient>

              <linearGradient id="greenGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a7843" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#22905a" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#28a866" stopOpacity="0.85" />
                <stop offset="75%" stopColor="#1e9058" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#146040" stopOpacity="0.95" />
              </linearGradient>

              {/* Edge highlight gradient */}
              <linearGradient id="edgeHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7aefb8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#4de89a" stopOpacity="0.4" />
              </linearGradient>

              {/* Filters for glass effect */}
              <filter id="glassBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>

              <filter id="softGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background deep layer */}
            <rect x="0" y="0" width="100%" height="100%" fill="#041a10" />

            {/* Layer 1 - Deep background ribbons */}
            <g style={{ transform: `translateY(${Math.sin(animationOffset * 0.5) * 8}px)` }}>
              <path
                d="M1200,0 Q1350,150 1500,100 Q1700,50 1920,200 L1920,400 Q1700,350 1500,450 Q1300,550 1100,400 Q900,250 1000,100 Z"
                fill="url(#greenDeep)"
                opacity="0.7"
              />
              <path
                d="M1400,-100 Q1550,50 1700,0 Q1850,-50 1920,100 L1920,350 Q1800,280 1650,350 Q1450,450 1300,300 Q1150,150 1250,0 Z"
                fill="url(#greenRibbon2)"
                opacity="0.6"
              />
            </g>

            {/* Layer 2 - Mid-ground flowing ribbons */}
            <g style={{ transform: `translate(${Math.sin(animationOffset * 0.8) * 12}px, ${Math.cos(animationOffset * 0.6) * 8}px)` }}>
              {/* Large sweeping ribbon from top-right */}
              <path
                d="M1100,-50 
                   C1200,50 1350,80 1450,40 
                   C1600,-20 1750,100 1920,80 
                   L1920,320 
                   C1800,350 1650,280 1500,350 
                   C1300,450 1150,380 1000,450 
                   C850,520 700,450 600,500 
                   L600,300 
                   C750,250 850,300 1000,220 
                   C1150,140 1050,80 1100,-50 Z"
                fill="url(#greenRibbon1)"
                opacity="0.95"
              />
              {/* Highlight edge on ribbon */}
              <path
                d="M1100,-50 C1200,50 1350,80 1450,40 C1600,-20 1750,100 1920,80"
                stroke="url(#edgeHighlight)"
                strokeWidth="3"
                fill="none"
                opacity="0.8"
              />
            </g>

            {/* Layer 3 - Primary foreground ribbons */}
            <g style={{ transform: `translate(${Math.cos(animationOffset * 0.9) * 10}px, ${Math.sin(animationOffset * 0.7) * 12}px)` }}>
              {/* Main diagonal ribbon - thick and prominent */}
              <path
                d="M800,0 
                   Q950,100 1050,80 
                   Q1200,50 1350,150 
                   Q1550,280 1700,200 
                   Q1850,120 1920,220 
                   L1920,500 
                   Q1800,550 1650,480 
                   Q1450,380 1300,500 
                   Q1100,650 900,550 
                   Q700,450 550,550 
                   Q400,650 300,580 
                   L300,350 
                   Q450,280 600,350 
                   Q750,420 850,320 
                   Q950,220 850,120 
                   Q750,20 800,0 Z"
                fill="url(#greenGlass)"
              />
              {/* Sharp highlight edges */}
              <path
                d="M800,0 Q950,100 1050,80 Q1200,50 1350,150 Q1550,280 1700,200 Q1850,120 1920,220"
                stroke="#7aefb8"
                strokeWidth="2.5"
                fill="none"
                opacity="0.85"
                filter="url(#softGlow)"
              />
              <path
                d="M300,350 Q450,280 600,350 Q750,420 850,320"
                stroke="#5aeaa0"
                strokeWidth="2"
                fill="none"
                opacity="0.7"
              />
            </g>

            {/* Layer 4 - Twisted overlapping ribbon */}
            <g style={{ transform: `translate(${Math.sin(animationOffset * 1.1) * 8}px, ${Math.cos(animationOffset * 0.8) * 10}px)` }}>
              <path
                d="M1000,100 
                   Q1100,200 1250,150 
                   Q1400,100 1500,200 
                   Q1650,350 1800,280 
                   Q1900,230 1920,350 
                   L1920,550 
                   Q1850,500 1750,560 
                   Q1550,650 1400,550 
                   Q1200,420 1050,520 
                   Q850,640 700,560 
                   Q500,460 400,550 
                   L400,380 
                   Q550,300 700,380 
                   Q900,480 1000,380 
                   Q1100,280 1000,200 
                   Q900,120 1000,100 Z"
                fill="url(#greenRibbon3)"
                opacity="0.9"
              />
              {/* Top edge highlight */}
              <path
                d="M1000,100 Q1100,200 1250,150 Q1400,100 1500,200 Q1650,350 1800,280 Q1900,230 1920,350"
                stroke="#8cf5c5"
                strokeWidth="2"
                fill="none"
                opacity="0.75"
              />
            </g>

            {/* Layer 5 - Sharp angular fold element */}
            <g style={{ transform: `translate(${Math.cos(animationOffset * 0.6) * 6}px, ${Math.sin(animationOffset * 1.2) * 8}px)` }}>
              <path
                d="M1300,50 L1450,150 L1550,100 L1700,220 L1800,180 L1920,280 
                   L1920,380 L1750,320 L1600,400 L1450,320 L1350,380 L1200,280 L1150,180 Z"
                fill="url(#greenRibbon1)"
                opacity="0.85"
              />
              <path
                d="M1300,50 L1450,150 L1550,100 L1700,220 L1800,180 L1920,280"
                stroke="#9ff8d0"
                strokeWidth="2.5"
                fill="none"
                opacity="0.9"
                filter="url(#softGlow)"
              />
            </g>

            {/* Layer 6 - Foreground accent ribbons */}
            <g style={{ transform: `translate(${Math.sin(animationOffset * 1.3) * 5}px, ${Math.cos(animationOffset * 0.9) * 7}px)` }}>
              {/* Sharp pointed ribbon */}
              <path
                d="M950,200 Q1050,280 1150,250 Q1300,200 1400,300 Q1550,420 1650,350 L1750,400 
                   Q1650,480 1500,520 Q1300,580 1150,480 Q950,360 850,420 L800,350 Q900,300 950,200 Z"
                fill="url(#greenRibbon2)"
                opacity="0.88"
              />
              <path
                d="M950,200 Q1050,280 1150,250 Q1300,200 1400,300 Q1550,420 1650,350 L1750,400"
                stroke="#6aedb0"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
            </g>

            {/* Layer 7 - Translucent overlay ribbons for depth */}
            <g style={{ transform: `translate(${Math.cos(animationOffset * 0.7) * 4}px, ${Math.sin(animationOffset * 1.0) * 5}px)` }} opacity="0.5">
              <path
                d="M1150,0 Q1300,80 1400,50 Q1600,0 1750,100 Q1900,200 1920,150 
                   L1920,250 Q1850,280 1700,220 Q1500,140 1350,200 Q1150,280 1050,180 Q950,80 1050,20 Z"
                fill="url(#greenHighlight)"
                filter="url(#glassBlur)"
              />
            </g>

            {/* Ambient light spots */}
            <circle cx="1600" cy="200" r="150" fill="#2ab872" opacity="0.15" filter="url(#glassBlur)" />
            <circle cx="1300" cy="400" r="200" fill="#1a8a50" opacity="0.1" filter="url(#glassBlur)" />
            <circle cx="1800" cy="500" r="180" fill="#22905a" opacity="0.12" filter="url(#glassBlur)" />
          </svg>
        </div>

        {/* Subtle dark gradient on left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041a10] via-[#041a10]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041a10]/50 via-transparent to-transparent pointer-events-none" />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              AI DEVELOPMENT
            </h1>
            <p className="text-lg lg:text-xl text-white/75 mb-10 leading-relaxed max-w-2xl">
              Blubrg’s platform makes every step of building AI smoother, enabling you to move quickly from early experiments in interactive notebooks to deploying fully scaled AI applications across multiple GPU clusters. It removes barriers and complexity, helping teams innovate faster and achieve better outcomes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#0a4528] px-10 py-6 text-base font-medium rounded-md">
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
