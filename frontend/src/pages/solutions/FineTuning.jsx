import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid } from 'lucide-react';

const FineTuning = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [animationOffset, setAnimationOffset] = useState({ x: 0, y: 0 });

  // Smooth animation for hero background
  useEffect(() => {
    let animationFrame;
    let time = 0;
    
    const animate = () => {
      time += 0.005;
      setAnimationOffset({
        x: Math.sin(time) * 20,
        y: Math.cos(time * 0.8) * 15
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
      {/* HERO SECTION - Deep green 3D ribbon/folded geometry - exact match to screenshot */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-[#000000]" />
        
        {/* 3D Ribbon SVG Background with subtle ambient motion */}
        <div 
          className="absolute inset-0"
          style={{ 
            transform: `translate(${animationOffset.x * 0.3}px, ${animationOffset.y * 0.3}px)` 
          }}
        >
          <svg 
            className="absolute top-0 right-0 w-full h-full" 
            viewBox="0 0 1200 800" 
            preserveAspectRatio="xMaxYMid slice"
            style={{ minWidth: '100%', minHeight: '100%' }}
          >
            <defs>
              {/* Deep emerald base gradient */}
              <linearGradient id="green-base-1" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#001a0d" />
                <stop offset="25%" stopColor="#003820" />
                <stop offset="50%" stopColor="#006040" />
                <stop offset="75%" stopColor="#004030" />
                <stop offset="100%" stopColor="#001510" />
              </linearGradient>
              {/* Mid-tone emerald */}
              <linearGradient id="green-base-2" x1="20%" y1="100%" x2="80%" y2="0%">
                <stop offset="0%" stopColor="#002515" />
                <stop offset="30%" stopColor="#007545" />
                <stop offset="60%" stopColor="#00a060" />
                <stop offset="100%" stopColor="#003020" />
              </linearGradient>
              {/* Neon green highlight */}
              <linearGradient id="green-highlight" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#00ff80" />
                <stop offset="50%" stopColor="#40ffa0" />
                <stop offset="100%" stopColor="#00cc60" />
              </linearGradient>
              {/* Dark shadow */}
              <linearGradient id="green-shadow" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#000a05" />
                <stop offset="100%" stopColor="#001008" />
              </linearGradient>
              {/* Soft glow filter */}
              <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Back layer - darkest ribbons */}
            <path 
              d="M 500 800 Q 600 600, 750 650 Q 900 700, 1000 500 Q 1100 350, 1200 400 L 1200 800 Z" 
              fill="url(#green-shadow)" 
              opacity="0.9"
            />
            
            {/* Middle layer - emerald base ribbons */}
            <path 
              d="M 550 800 Q 650 550, 800 600 Q 950 650, 1050 450 Q 1150 300, 1200 350 L 1200 800 Z" 
              fill="url(#green-base-1)" 
              filter="url(#soft-glow)"
            />
            <path 
              d="M 620 800 Q 720 500, 870 550 Q 1000 600, 1100 400 Q 1180 280, 1200 300 L 1200 800 Z" 
              fill="url(#green-base-2)" 
              opacity="0.85"
            />
            
            {/* Front layer - brighter ribbons with highlights */}
            <path 
              d="M 700 800 Q 800 480, 920 520 Q 1040 560, 1120 380 Q 1180 260, 1200 280 L 1200 800 Z" 
              fill="url(#green-base-2)"
            />
            
            {/* Highlight edges - neon green accents */}
            <path 
              d="M 700 800 Q 800 480, 920 520 Q 1040 560, 1120 380 Q 1180 260, 1200 280" 
              fill="none" 
              stroke="url(#green-highlight)" 
              strokeWidth="3" 
              opacity="0.7"
            />
            <path 
              d="M 620 800 Q 720 500, 870 550 Q 1000 600, 1100 400" 
              fill="none" 
              stroke="url(#green-highlight)" 
              strokeWidth="2" 
              opacity="0.5"
            />
            
            {/* Additional folded ribbon layers */}
            <path 
              d="M 780 800 Q 880 450, 980 490 Q 1080 530, 1150 360 Q 1190 260, 1200 270 L 1200 800 Z" 
              fill="url(#green-base-1)" 
              opacity="0.6"
            />
            <path 
              d="M 780 800 Q 880 450, 980 490 Q 1080 530, 1150 360" 
              fill="none" 
              stroke="rgba(0,255,120,0.4)" 
              strokeWidth="1.5"
            />
            
            {/* Inner fold shadows for depth */}
            <path 
              d="M 850 800 Q 920 520, 1000 540 Q 1100 560, 1160 420" 
              fill="none" 
              stroke="rgba(0,20,10,0.8)" 
              strokeWidth="20" 
              opacity="0.4"
            />
          </svg>
        </div>

        <style>{`
          @keyframes subtleFloat {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(5px, 3px); }
          }
        `}</style>

        {/* Hero content - left aligned */}
        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              MODEL<br />FINE-TUNING
            </h1>
            <p className="text-lg lg:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
              At BluBrg, we offer GPU cloud computing solutions designed to fine-tune your AI models for peak performance. Our advanced infrastructure and expert support ensure that your models are optimised for accuracy, efficiency, and scalability, helping you accelerate time to market.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#003820] px-10 py-6 text-base font-medium rounded-md">
                  Get Started
                </Button>
              </Link>
              <Link to="/contact" className="text-white hover:text-white/80 px-4 py-3 text-base font-medium transition-colors flex items-center gap-2">
                Contact Sales <ArrowRight className="w-4 h-4" />
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
              <h3 className="text-xl font-semibold text-white mb-3">Optimise for Performance</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Unlock the full potential of your AI models and fine-tune to achieve peak performance on your specific datasets and tasks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Accelerate Time to Market</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Reduce the time it takes to prepare and deploy your AI solutions. With streamlined fine-tuning processes, you can iterate and refine your models more quickly, allowing innovations to reach users sooner.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Cost-Effective Scalability</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Easily grow your AI operations without excessive costs. Blubrg’s GPU cloud solutions are built to scale smoothly and offer flexible pricing that adapts to your resource needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fast, Efficient Model Fine-tuning Section */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-emerald-500 text-sm font-medium mb-3 uppercase tracking-wider">LEVERAGE ADVANCED GPU CLOUD INFRASTRUCTURE</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Fast, efficient model fine-tuning
              </h2>
              <p className="text-base text-white/65 leading-relaxed mb-10">
                Our platform leverages the latest in GPU technology to provide exceptional performance, efficiency, and scalability. This ensures your AI models are fine-tuned to deliver strong value while meeting the demands of real-world use cases.
              </p>

              {/* <div className="space-y-8">
                <div className="border-l-2 border-emerald-500 pl-5">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">30% Faster Time to Value for Your AI Projects</h3>
                  <p className="text-white/50 text-xs font-medium mb-2">Accelerate the time to actionable results with an AI stack optimised for rapid experimentation and tuning.</p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    We own the infrastructure so you can focus on the innovation.
                  </p>
                </div>

                <div className="border-l-2 border-emerald-500 pl-5">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">40% Efficiency Improvement</h3>
                  <p className="text-white/50 text-xs font-medium mb-2">Optimised Resource Utilisation</p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Increase the effectiveness of compute resources with improved hardware utilisation.
                  </p>
                </div>
              </div> */}
            </div>

            {/* Right side - Stacked system cards */}
            <div className="space-y-4">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/30 to-green-600/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">AI Marketplace</h4>
                    <p className="text-white/50 text-sm">Pre-built fine-tuning templates</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                    <LayoutGrid className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Training Compute</h4>
                    <p className="text-white/50 text-sm">Scalable GPU clusters</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-violet-600/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Inference & Deployment</h4>
                    <p className="text-white/50 text-sm">One-click model serving</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fine-Tuning Stack - Two column layout */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Fine-Tuning Stack</h2>
            <p className="text-base text-white/60 max-w-2xl">
              BluBrg provides a complete technology stack for running intensive fine-tuning workloads in the most efficient and high-performing way possible.
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
                    <span key={i} className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1.5 text-white text-xs">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
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
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
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

      {/* Performance Metrics - 4 Column */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-16">Performance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                metric: '30%', 
                label: 'FASTER INSIGHTS', 
                sublabel: 'Accelerate Time to Value',
                desc: 'Accelerate the time to actionable results with an AI stack optimised for rapid experimentation and tuning.',
                link: 'Learn More',
                linkTo: '/about'
              },
              { 
                metric: '80%', 
                label: 'LOWER COST', 
                sublabel: 'More performance for less.',
                desc: ' Reduce costly cloud compute expenses while maintaining powerful performance.',
                link: 'Our Data Centres',
                linkTo: '/products/glomfjord'
              },
              { 
                metric: '40%', 
                label: 'MORE EFFICIENT', 
                sublabel: 'Improved Resource Utilisation',
                desc: ' Increase the effectiveness of compute resources with improved hardware utilisation.',
                link: 'See GPU Nodes',
                linkTo: '/products/gpu-nodes'
              },
              { 
                metric: '7.2X', 
                label: 'FASTER INFERENCE', 
                sublabel: 'Accelerate time to insights',
                desc: 'Experience marked improvements in throughput and responsiveness thanks to GPU tuning and system-level optimisation.',
                link: 'Blog Post',
                linkTo: '/blog'
              }
            ].map((item, i) => (
              <div key={i} className="border-l border-white/20 pl-6">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-1">{item.metric}</div>
                <div className="text-white text-sm font-semibold mb-2 uppercase tracking-wide">{item.label}</div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{item.desc}</p>
                <Link to={item.linkTo} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1">
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
            {/* Training Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-emerald-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/30 to-green-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-emerald-400 text-sm mb-4">Training</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A highly scalable and performance-optimised compute framework that shortens model training cycles and boosts productivity.
              </p>
            </div>

            {/* Marketplace Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-emerald-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Marketplace</h3>
              <p className="text-blue-400 text-sm mb-4">Marketplace</p>
              <p className="text-white/60 text-sm leading-relaxed">
                An ecosystem of services and tools that support the entire model lifecycle, enabling development and deployment using both Blubrg offerings and popular AI/ML technologies.
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
                answer: "Blubrg owns and operates the entire infrastructure stack, from physical data centres to orchestration software, allowing the company to tune every layer for performance, efficiency, and scalability. This integrated approach delivers superior compute power and expert support for complex AI workloads."
              },
              {
                question: "What types of GPUs does BluBrg offer?",
                answer: "A range of high-performance NVIDIA GPUs are available to support different fine-tuning workloads, giving you flexibility in choosing the right hardware for your model size and performance needs."
              },
              {
                question: "What industries can benefit from Fine-Tuning?",
                answer: "Fine-tuning is valuable across multiple sectors, including:Artificial intelligence and machine learning research and development,Gaming and entertainment for graphics and interactive applications,Healthcare for clinical analysis and advanced imaging,Finance for modelling and predictive analytics,Automotive industries for autonomous and simulation tasks,Aerospace and engineering for simulation and design optimisation"
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/10">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-emerald-400 transition-colors"
                >
                  <span className="text-base font-medium text-white pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-emerald-400" />
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

export default FineTuning;
