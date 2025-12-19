import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid } from 'lucide-react';

const Inference = () => {
  const [openFaq, setOpenFaq] = useState(3);
  const [animationOffset, setAnimationOffset] = useState({ x: 0, y: 0 });

  // Subtle ambient motion for hero background
  useEffect(() => {
    let animationFrame;
    let time = 0;
    
    const animate = () => {
      time += 0.003;
      setAnimationOffset({
        x: Math.sin(time) * 8,
        y: Math.cos(time * 0.7) * 6
      });
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Hero Section - Dark blue/teal 3D glass-like abstract geometry */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Base dark blue background */}
        <div className="absolute inset-0 bg-[#000508]" />
        
        {/* 3D Glass-like Abstract Geometry SVG with subtle motion */}
        <div 
          className="absolute inset-0"
          style={{ 
            transform: `translate(${animationOffset.x}px, ${animationOffset.y}px)` 
          }}
        >
          <svg 
            className="absolute top-0 right-0 w-full h-full" 
            viewBox="0 0 1200 800" 
            preserveAspectRatio="xMaxYMid slice"
            style={{ minWidth: '100%', minHeight: '100%' }}
          >
            <defs>
              {/* Dark blue base gradients */}
              <linearGradient id="blue-base-1" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#000a12" />
                <stop offset="30%" stopColor="#0a2540" />
                <stop offset="60%" stopColor="#1a4060" />
                <stop offset="100%" stopColor="#051525" />
              </linearGradient>
              <linearGradient id="blue-base-2" x1="20%" y1="100%" x2="80%" y2="0%">
                <stop offset="0%" stopColor="#001020" />
                <stop offset="35%" stopColor="#103050" />
                <stop offset="70%" stopColor="#205070" />
                <stop offset="100%" stopColor="#0a2035" />
              </linearGradient>
              {/* Teal/cyan highlight gradients */}
              <linearGradient id="teal-highlight" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#00e0e0" />
                <stop offset="50%" stopColor="#40f0f0" />
                <stop offset="100%" stopColor="#00c0c0" />
              </linearGradient>
              <linearGradient id="cyan-glow" x1="30%" y1="100%" x2="70%" y2="0%">
                <stop offset="0%" stopColor="#003040" />
                <stop offset="40%" stopColor="#106080" />
                <stop offset="70%" stopColor="#20a0c0" />
                <stop offset="100%" stopColor="#004050" />
              </linearGradient>
              {/* Shadow gradient */}
              <linearGradient id="blue-shadow" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#000408" />
                <stop offset="100%" stopColor="#000810" />
              </linearGradient>
              {/* Soft glow filter */}
              <filter id="glass-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Back layer - darkest angular shapes */}
            <path 
              d="M 450 800 L 550 500 L 650 600 L 750 400 L 850 550 L 950 350 L 1050 450 L 1150 300 L 1200 350 L 1200 800 Z" 
              fill="url(#blue-shadow)" 
              opacity="0.95"
            />
            
            {/* Middle layers - blue angular shards with depth */}
            <path 
              d="M 500 800 L 600 480 L 700 580 L 800 380 L 900 500 L 1000 320 L 1100 420 L 1200 280 L 1200 800 Z" 
              fill="url(#blue-base-1)" 
              filter="url(#glass-glow)"
            />
            <path 
              d="M 550 800 L 650 450 L 750 550 L 850 360 L 950 480 L 1050 300 L 1150 380 L 1200 250 L 1200 800 Z" 
              fill="url(#blue-base-2)" 
              opacity="0.85"
            />
            
            {/* Front layer - brighter shards with cyan tones */}
            <path 
              d="M 600 800 L 700 420 L 800 520 L 900 340 L 1000 460 L 1100 280 L 1180 350 L 1200 300 L 1200 800 Z" 
              fill="url(#cyan-glow)"
              opacity="0.75"
            />
            <path 
              d="M 680 800 L 780 400 L 880 500 L 980 320 L 1080 440 L 1160 280 L 1200 320 L 1200 800 Z" 
              fill="url(#blue-base-2)"
            />
            
            {/* Teal/cyan highlight edges - glass-like reflections */}
            <path 
              d="M 680 800 L 780 400 L 880 500 L 980 320 L 1080 440 L 1160 280" 
              fill="none" 
              stroke="url(#teal-highlight)" 
              strokeWidth="2.5" 
              opacity="0.8"
            />
            <path 
              d="M 600 800 L 700 420 L 800 520 L 900 340 L 1000 460" 
              fill="none" 
              stroke="url(#teal-highlight)" 
              strokeWidth="1.5" 
              opacity="0.5"
            />
            <path 
              d="M 550 800 L 650 450 L 750 550 L 850 360" 
              fill="none" 
              stroke="rgba(0,220,220,0.3)" 
              strokeWidth="1"
            />
            
            {/* Additional angular facets for depth */}
            <path 
              d="M 750 800 L 850 380 L 950 480 L 1050 310 L 1140 400 L 1200 350 L 1200 800 Z" 
              fill="url(#blue-base-1)" 
              opacity="0.5"
            />
            <path 
              d="M 750 800 L 850 380 L 950 480 L 1050 310" 
              fill="none" 
              stroke="rgba(0,240,240,0.4)" 
              strokeWidth="1.5"
            />
            
            {/* Inner fold shadows for glass depth */}
            <path 
              d="M 800 800 L 900 400 L 1000 500 L 1100 350" 
              fill="none" 
              stroke="rgba(0,15,25,0.9)" 
              strokeWidth="15" 
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Hero content - left aligned with high contrast */}
        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              AI & ML INFERENCE
            </h1>
            <p className="text-lg lg:text-xl text-white/75 mb-10 leading-relaxed max-w-2xl">
              We offer GPU-accelerated nodes designed for efficient AI and Machine Learning Inference at competitive prices. Our experienced team at BluBrg manages system optimisations and scaling, allowing you to focus on the science instead of infrastructure administration.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/contact/sales">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#0a1a2e] px-10 py-6 text-base font-medium rounded-md">
                  Get Started
                </Button>
              </Link>
              <Link to="/contact/sales" className="text-white hover:text-white/80 px-4 py-3 text-base font-medium transition-colors flex items-center gap-2">
                Contact Sales <ArrowRight className="w-4 h-4" />
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
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-light mb-4 text-white">More Solutions</h2>
            <p className="text-gray-400 max-w-2xl">
              BluBrg accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives..
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5">
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

      {/* FAQs */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12">FAQs</h2>
          <div className="max-w-4xl space-y-3">
            {[
              {
                question: "What makes BluBrg's GPU Cloud different from others?",
                answer: "Blubrg controls the full infrastructure stack, enabling deep optimisation across hardware, software, and orchestration layers for better performance and efficiency."
              },
              {
                question: "What types of GPUs does BluBrg offer?",
                answer: "A range of NVIDIA GPUs is available to support different inference workloads, providing flexibility for varying performance and scale requirements."
              },
              {
                question: "How does BluBrg support sustainability?",
                answer: "Inference workloads run on energy-efficient infrastructure powered by renewable energy, reducing environmental impact without compromising performance."
              },
              {
                question: "What makes your AI inference service different from others?",
                answer: "The service combines high-performance GPUs with advanced orchestration to support both batch and streaming inference with low latency and strong scalability."
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
     <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Access thousands of GPUs tailored to your<br />requirements.
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/products/gpu-nodes">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors font-medium">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inference;
