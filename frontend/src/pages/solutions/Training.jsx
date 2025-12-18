import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowRight, ChevronDown, ChevronUp, Zap, ShoppingCart } from 'lucide-react';

const Training = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [animationOffset, setAnimationOffset] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      setAnimationOffset(elapsed * 0.00005);
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
      {/* Hero Section - Abstract 3D Purple Ribbon Waves */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Dark purple gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#0f051d] to-[#050208]" />
        
        {/* Animated 3D Ribbon Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg viewBox="0 0 1920 1080" className="absolute w-[140%] h-[140%] -top-[20%] -right-[20%]" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="trainDeep" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2a0e47" />
                <stop offset="100%" stopColor="#1a0a2e" />
              </linearGradient>
              <linearGradient id="trainMid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5a2a87" />
                <stop offset="50%" stopColor="#7a3aa7" />
                <stop offset="100%" stopColor="#4a2077" />
              </linearGradient>
              <linearGradient id="trainBright" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8a4fb2" />
                <stop offset="40%" stopColor="#a175d6" />
                <stop offset="100%" stopColor="#7a40a0" />
              </linearGradient>
              <linearGradient id="trainHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c4a0e8" />
                <stop offset="50%" stopColor="#ddc7f5" />
                <stop offset="100%" stopColor="#b090d8" />
              </linearGradient>
              <linearGradient id="trainSpecular" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0e9fa" />
                <stop offset="100%" stopColor="#c8b0e8" />
              </linearGradient>
              <filter id="trainGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Layer 1 - Deep background */}
            <g style={{ transform: `translate(${Math.sin(animationOffset * 0.3) * 6}px, ${Math.cos(animationOffset * 0.25) * 4}px)` }}>
              <path d="M800,-100 C900,100 1000,200 950,400 C900,600 1000,800 950,1000 L1200,1100 L1920,900 L1920,-100 Z" fill="url(#trainDeep)" opacity="0.8" />
            </g>

            {/* Layer 2 - Mid ribbons flowing */}
            <g style={{ transform: `translate(${Math.cos(animationOffset * 0.4) * 10}px, ${Math.sin(animationOffset * 0.35) * 8}px)` }}>
              <path d="M700,0 C800,150 900,250 850,450 L950,550 L850,750 C800,900 900,1000 850,1150 L1100,1100 L1300,900 L1200,700 C1250,550 1150,400 1200,250 L1100,150 C1150,0 1050,-100 1100,-200 L750,-150 Z" fill="url(#trainMid)" opacity="0.9" />
              <path d="M700,0 C800,150 900,250 850,450 L950,550" stroke="url(#trainHighlight)" strokeWidth="4" fill="none" opacity="0.8" filter="url(#trainGlow)" />
            </g>

            {/* Layer 3 - Primary bright ribbon */}
            <g style={{ transform: `translate(${Math.sin(animationOffset * 0.5) * 14}px, ${Math.cos(animationOffset * 0.45) * 10}px)` }}>
              <path d="M600,50 C700,200 800,280 750,450 L880,570 L780,750 C730,900 830,1000 780,1150 L1000,1100 L1200,900 L1080,700 C1130,550 1030,400 1080,250 L960,150 C1010,0 910,-80 960,-180 L650,-100 Z" fill="url(#trainBright)" opacity="0.95" />
              <path d="M600,50 C700,200 800,280 750,450 L880,570" stroke="url(#trainSpecular)" strokeWidth="5" fill="none" opacity="0.95" filter="url(#trainGlow)" />
              <path d="M780,750 C730,900 830,1000 780,1150" stroke="url(#trainHighlight)" strokeWidth="3" fill="none" opacity="0.7" />
            </g>

            {/* Layer 4 - Angular twisted ribbon */}
            <g style={{ transform: `translate(${Math.cos(animationOffset * 0.6) * 12}px, ${Math.sin(animationOffset * 0.55) * 12}px)` }}>
              <path d="M900,150 L1000,300 L920,480 L1020,650 L940,820 L1050,980 L1280,850 L1160,670 L1260,500 L1140,350 L1230,200 L1100,100 Z" fill="url(#trainMid)" opacity="0.85" />
              <path d="M900,150 L1000,300 L920,480 L1020,650" stroke="url(#trainSpecular)" strokeWidth="4" fill="none" opacity="0.9" filter="url(#trainGlow)" />
            </g>

            {/* Layer 5 - Front accent */}
            <g style={{ transform: `translate(${Math.sin(animationOffset * 0.7) * 10}px, ${Math.cos(animationOffset * 0.65) * 8}px)` }}>
              <path d="M750,250 C830,400 900,480 850,650 L960,780 L880,950 L1050,1050 L1200,900 L1100,720 C1150,580 1070,450 1120,320 L1000,220 C1050,100 970,50 1020,-50 L800,0 Z" fill="url(#trainBright)" opacity="0.88" />
              <path d="M750,250 C830,400 900,480 850,650 L960,780" stroke="url(#trainSpecular)" strokeWidth="4" fill="none" opacity="0.9" filter="url(#trainGlow)" />
            </g>

            {/* Layer 6 - Small accent element */}
            <g style={{ transform: `translate(${Math.cos(animationOffset * 0.8) * 8}px, ${Math.sin(animationOffset * 0.75) * 10}px)` }}>
              <path d="M1050,350 L1130,480 L1070,620 L1150,750 L1320,650 L1230,500 L1300,380 L1180,280 Z" fill="url(#trainMid)" opacity="0.75" />
              <path d="M1050,350 L1130,480 L1070,620" stroke="url(#trainHighlight)" strokeWidth="3" fill="none" opacity="0.8" />
            </g>

            {/* Ambient glow */}
            <ellipse cx="1000" cy="500" rx="300" ry="250" fill="#7a3aa7" opacity="0.1" />
            <ellipse cx="1200" cy="700" rx="250" ry="180" fill="#5a2a87" opacity="0.08" />
          </svg>
        </div>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f051d] via-[#0f051d]/50 to-transparent pointer-events-none" />

        {/* Hero Content */}
        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              MODEL TRAINING
            </h1>
            <p className="text-lg lg:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl">
              BluBrg's GPU Cloud offers a highly scalable, performance-optimised architecture that significantly reduces training times and boosts productivity, enabling you to achieve your AI goals easier, faster, and more cost-effectively than alternative Cloud platforms.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#2a0e47] px-10 py-6 text-base font-medium rounded-md">
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

      {/* Value Proposition Strip */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Highly Scalable Architecture',
                desc: 'Easily scale compute resources to match the size and complexity of AI projects, supporting everything from experimentation to large-scale production training.'
              },
              {
                title: 'Reduced Training Times',
                desc: 'Industry-leading GPUs optimised for training workloads accelerate development cycles and enable faster iteration.'
              },
              {
                title: 'Increased Productivity',
                desc: 'Automation and intelligent scheduling reduce operational overhead, allowing teams to focus on innovation rather than infrastructure.'
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accelerated Model Training */}
      <section className="py-32 bg-[#000000]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-bold text-white mb-8">Accelerated Model Training</h2>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                Training advanced AI models requires flexible, reliable, and cost-efficient
                infrastructure. Blubrg simplifies this by delivering purpose-built systems
                designed specifically for AI workloads.
              </p>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                Integrated Slurm and Kubernetes orchestration enables efficient job scheduling
                and workload management across distributed GPU clusters with minimal setup.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                High-performance bare-metal GPU nodes ensure consistent, predictable performance
                for large-scale training and fine-tuning workloads.
              </p>
            </div>
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-2xl p-12 text-center">
                <div className="text-purple-400 text-sm font-semibold mb-4">AI-IN-A-BOX</div>
                <div className="text-4xl font-bold text-white mb-2">Pre-configured</div>
                <div className="text-white/60">Training Environments</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border border-indigo-500/30 rounded-2xl p-12 text-center">
                <div className="text-indigo-400 text-sm font-semibold mb-4">TRAINING COMPUTE</div>
                <div className="text-4xl font-bold text-white mb-2">Scalable</div>
                <div className="text-white/60">GPU Clusters</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Stack */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-8">Training Stack</h2>
            <p className="text-lg text-white/70 mb-16 max-w-3xl">
              Our comprehensive training stack provides everything you need from hardware to
              applications, with full flexibility to customise at every layer.
            </p>

            <div className="space-y-8">
              <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">MARKETPLACE</h3>
                <div className="flex flex-wrap gap-4">
                  {['Jupyter Notebook', 'TensorFlow', 'PyTorch', 'HuggingFace', 'MLflow', 'Ray', 'Weights & Biases'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 text-white text-sm">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">PLATFORM</h3>
                <div className="flex flex-wrap gap-4">
                  {['Virtual Machines', 'Managed Kubernetes'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 text-white text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">INFRASTRUCTURE</h3>
                <div className="flex flex-wrap gap-4">
                  {['GPU Compute', 'Storage', 'Networking'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-2 text-white text-sm">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">HARDWARE</h3>
                <div className="flex flex-wrap gap-4">
                  {['AMD MI300X', 'AMD MI250X', 'NVIDIA GB200', 'NVIDIA H100', 'NVIDIA H200', 'NVIDIA A100', '...'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 text-white text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">USER EXPERIENCE</h3>
                  <div className="space-y-3">
                    {['Web Console', 'API', 'CLI'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">DATA CENTRE</h3>
                  <div className="space-y-3">
                    {['Renewable Energy', 'Low-latency Fibre'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance */}
      <section className="py-32 bg-[#000000]">
        <div className="container-custom">
          <h2 className="text-5xl font-bold text-white mb-20 text-center">Performance</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {[
              { metric: '30%', label: 'FASTER INSIGHTS', desc: 'Shorten development cycles and accelerate feedback loops with an AI-optimised training platform.' },
              { metric: '80%', label: 'LOWER COST', desc: 'Reduce training costs significantly while maintaining high performance.' },
              { metric: '40%', label: 'MORE EFFICIENT', desc: 'Increase utilisation and efficiency across GPU training workloads.' },
              { metric: 'UP TO 7.2X', label: 'FASTER INFERENCE', desc: 'Optimised infrastructure enables faster deployment and inference throughput.' }
            ].map((item, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-10">
                <div className="text-6xl font-bold text-white mb-2">{item.metric}</div>
                <div className="text-white text-lg font-semibold mb-4">{item.label}</div>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container-custom">
          <h2 className="text-5xl font-bold text-white mb-20">Key Services</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: <Zap className="w-16 h-16 text-purple-400" />,
                title: 'AI Compute – Training',
                desc: 'A scalable, performance-optimised compute layer purpose-built for large-scale AI model training.'
              },
              {
                icon: <ShoppingCart className="w-16 h-16 text-cyan-400" />,
                title: 'AI Marketplace',
                desc: 'A curated ecosystem of tools and frameworks to accelerate AI development and deployment.'
              }
            ].map((item, i) => (
              <Card key={i} className="bg-[#121212] border-white/10 hover:border-purple-500/50 transition-all">
                <CardContent className="p-12">
                  <div className="mb-8">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed text-lg">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-light mb-4 text-white">Use cases</h2>
            <p className="text-gray-400 max-w-2xl">
              End-to-end AI solutions covering model training, fine-tuning, inference, and development—all built to accelerate your AI initiatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5">
            

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


      {/* Bottom CTA */}
      <section className="py-32 bg-gradient-to-r from-[#0066FF] to-[#0052CC]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-light text-white mb-12 max-w-4xl mx-auto leading-tight">
            Access thousands of GPUs tailored to your requirements
          </h2>
          <div className="flex gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white hover:bg-white/90 text-[#0066FF] px-12 py-7 text-lg font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-12 py-7 text-lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;