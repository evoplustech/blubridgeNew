import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid, Cpu } from 'lucide-react';

const SoftwareTechnology = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Animated parallax for hero section
  useEffect(() => {
    let animationFrame;
    let time = 0;

    const animate = () => {
      time += 0.006;
      setOffset({
        x: Math.sin(time) * 12,
        y: Math.cos(time * 0.7) * 10
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Canvas animation for abstract tech forms (laptop, code, wireframes)
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

    const drawTechForms = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width * 0.5;
      const centerY = height * 0.45;

      // Draw abstract laptop shape
      const laptopWidth = 200;
      const laptopHeight = 130;
      const laptopX = centerX - laptopWidth / 2;
      const laptopY = centerY - laptopHeight / 2;
      const laptopFloat = Math.sin(time) * 8;

      // Laptop screen
      const screenGradient = ctx.createLinearGradient(laptopX, laptopY + laptopFloat, laptopX + laptopWidth, laptopY + laptopHeight + laptopFloat);
      screenGradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
      screenGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.2)');
      screenGradient.addColorStop(1, 'rgba(99, 102, 241, 0.1)');
      
      ctx.fillStyle = screenGradient;
      ctx.beginPath();
      ctx.roundRect(laptopX, laptopY + laptopFloat, laptopWidth, laptopHeight * 0.7, 8);
      ctx.fill();
      
      // Screen border
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw code lines on screen
      for (let i = 0; i < 6; i++) {
        const lineWidth = 30 + Math.random() * 80;
        const lineX = laptopX + 15;
        const lineY = laptopY + 15 + i * 12 + laptopFloat;
        
        ctx.fillStyle = `rgba(167, 139, 250, ${0.4 + Math.sin(time + i) * 0.2})`;
        ctx.fillRect(lineX, lineY, lineWidth, 4);
        
        // Syntax highlighting dots
        if (i % 2 === 0) {
          ctx.fillStyle = 'rgba(74, 222, 128, 0.6)';
          ctx.fillRect(lineX + lineWidth + 10, lineY, 20, 4);
        }
      }

      // Laptop base
      ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.beginPath();
      ctx.moveTo(laptopX - 20, laptopY + laptopHeight * 0.7 + 10 + laptopFloat);
      ctx.lineTo(laptopX + laptopWidth + 20, laptopY + laptopHeight * 0.7 + 10 + laptopFloat);
      ctx.lineTo(laptopX + laptopWidth + 10, laptopY + laptopHeight * 0.7 + 25 + laptopFloat);
      ctx.lineTo(laptopX - 10, laptopY + laptopHeight * 0.7 + 25 + laptopFloat);
      ctx.closePath();
      ctx.fill();

      // Draw floating UI elements
      const uiElements = [
        { x: centerX - 120, y: centerY - 100, w: 60, h: 40 },
        { x: centerX + 80, y: centerY - 80, w: 50, h: 35 },
        { x: centerX - 100, y: centerY + 80, w: 70, h: 45 },
        { x: centerX + 100, y: centerY + 60, w: 55, h: 38 }
      ];

      uiElements.forEach((ui, i) => {
        const floatOffset = Math.sin(time + i * 1.5) * 15;
        const uiGradient = ctx.createLinearGradient(ui.x, ui.y + floatOffset, ui.x + ui.w, ui.y + ui.h + floatOffset);
        uiGradient.addColorStop(0, `rgba(99, 102, 241, ${0.15 + i * 0.05})`);
        uiGradient.addColorStop(1, `rgba(139, 92, 246, ${0.1 + i * 0.03})`);
        
        ctx.fillStyle = uiGradient;
        ctx.beginPath();
        ctx.roundRect(ui.x, ui.y + floatOffset, ui.w, ui.h, 6);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Mini lines inside
        ctx.fillStyle = 'rgba(167, 139, 250, 0.4)';
        ctx.fillRect(ui.x + 8, ui.y + 10 + floatOffset, ui.w * 0.5, 3);
        ctx.fillRect(ui.x + 8, ui.y + 18 + floatOffset, ui.w * 0.7, 3);
      });

      // Draw wireframe grid
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const gridY = height * 0.15 + i * height * 0.1;
        ctx.beginPath();
        ctx.moveTo(0, gridY + Math.sin(time + i * 0.5) * 5);
        ctx.lineTo(width, gridY + Math.cos(time + i * 0.5) * 5);
        ctx.stroke();
      }

      // Draw floating data particles
      for (let i = 0; i < 20; i++) {
        const particleX = (Math.sin(time * 0.5 + i * 2) + 1) * width * 0.5;
        const particleY = (Math.cos(time * 0.3 + i * 1.5) + 1) * height * 0.4 + height * 0.1;
        const size = 2 + Math.sin(time + i) * 1;
        
        ctx.beginPath();
        ctx.arc(particleX, particleY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${0.4 + Math.sin(time * 2 + i) * 0.2})`;
        ctx.fill();
      }

      // Draw connecting lines
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const startX = width * 0.1 + i * width * 0.15;
        const startY = height * 0.2 + Math.sin(time + i) * 30;
        const endX = centerX + (i - 2) * 40;
        const endY = centerY + Math.cos(time + i) * 20;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(startX + 50, (startY + endY) / 2 - 30, endX, endY);
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(drawTechForms);
    };

    resize();
    drawTechForms();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* ANIMATED HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#080510] via-[#0a0815] to-[#000000]" />
        
        {/* Animated tech forms canvas */}
        <canvas 
          ref={canvasRef}
          className="absolute right-0 top-0 w-[55%] h-full opacity-80"
          style={{ 
            pointerEvents: 'none',
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />

        {/* Ambient glow */}
        <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDuration: '5s' }} />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              SOFTWARE & TECHNOLOGY
            </h1>
            <p className="text-lg lg:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
              At Blubrg, we provide GPU cluster computing solutions that support software and technology companies in powering their compute-intensive tasks. With high-performance infrastructure and scalable cloud capabilities, technology teams can build, deploy, and scale advanced products more quickly and reliably.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact/sales">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#080510] px-10 py-6 text-base font-medium rounded-md">
                  Get Started
                </Button>
              </Link>
              <Link to="/contact/sales" className="inline-flex items-center gap-2 text-white hover:text-blue-300 transition-colors font-medium">
                Contact Sales <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Value Propositions */}
      <section className="py-16 bg-[#050505] border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Accelerated Processing</h3>
              <p className="text-white/60 text-sm leading-relaxed">
              Our GPU clusters deliver substantial computational performance, enabling faster processing for tasks such as machine learning, AI model training, and large-scale data analytics, which significantly shortens development timelines.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Simplified AI Deployment</h3>
              <p className="text-white/60 text-sm leading-relaxed">
              By using scalable GPU clusters tailored to your needs, you can streamline the process of training and deploying AI models. This helps reduce time-to-market for intelligent features and improves overall deployment efficiency.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Enhanced Collaboration</h3>
              <p className="text-white/60 text-sm leading-relaxed">
              High-performance computing resources are accessible remotely, supporting teams working across different locations and helping streamline collaboration, resource allocation, and project workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Uses Section */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-purple-400 text-sm font-medium mb-3 uppercase tracking-wider">ADVANCING TECH SERVICES</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Example uses</h2>
            <p className="text-base text-white/60 max-w-3xl">
              Discover how software and technology companies use GPU cloud infrastructure to improve development, support crucial operational needs, and drive innovation in their product offerings.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Building Your Own Large Language Model */}
            <div className="border-l-2 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Building Your Own Large Language Model</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Custom LLM Development</p>
              <p className="text-white/60 text-sm leading-relaxed">
              Use powerful GPU clusters to train your own large language models, enabling capabilities like natural language understanding, custom text generation, and domain-specific AI solutions.
              </p>
            </div>

            {/* Accelerating Drug Discovery */}
            <div className="border-l-2 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Accelerating Drug Discovery</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Healthcare & Biotech</p>
              <p className="text-white/60 text-sm leading-relaxed">
              Perform complex simulations and analyses that help speed up research in areas like bioinformatics and pharmaceutical development by leveraging parallel processing and high throughput.
              </p>
            </div>

            {/* Advanced Computer Vision */}
            <div className="border-l-2 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Advanced Computer Vision</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Image and Video Analysis</p>
              <p className="text-white/60 text-sm leading-relaxed">
              Accelerate the development of computer vision applications by including image and video analysis, autonomous systems, and security applications by using GPU-optimized computing.
              </p>
            </div>

            {/* Enhancing Cybersecurity */}
            <div className="border-l-2 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Enhancing Cybersecurity</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Threat Detection & Response</p>
              <p className="text-white/60 text-sm leading-relaxed">
              Improve threat detection and response capabilities with GPU-powered systems that analyse large volumes of data in real time to surface patterns and anomalies that indicate risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12">Key Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Compute Training Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-purple-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-purple-400 text-sm mb-4">Training</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A flexible compute environment built to speed up model training and support demanding software workload demands.
              </p>
            </div>

            {/* AI Compute Inference Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-purple-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/30 to-blue-600/20 rounded-xl flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-purple-400 text-sm mb-4">GPU Nodes</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Dedicated GPU clusters designed to handle compute-intensive applications, AI workloads, and data processing with reliability and performance.
              </p>
            </div>

            {/* AI Marketplace Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-purple-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/30 to-violet-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Marketplace</h3>
              <p className="text-purple-400 text-sm mb-4">Marketplace</p>
              <p className="text-white/60 text-sm leading-relaxed">
                An ecosystem of services for developing and deploying AI applications built using BluBrg's tools and popular AI/ML software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Solutions */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">More solutions</h2>
            <p className="text-gray-400 max-w-2xl">
              BluBrg accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives.
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
      {/* FAQs */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12">FAQs</h2>
          <div className="max-w-4xl space-y-3">
            {[
              {
                question: "How does BluBrg help software teams deploy AI faster?",
                answer: "BluBrg provides pre-configured GPU environments with popular ML frameworks, simple APIs for deployment, and auto-scaling infrastructure. Teams can go from model training to production deployment in minutes instead of weeks, without managing complex infrastructure."
              },
              {
                question: "What security measures protect our code and data?",
                answer: "BluBrg implements enterprise-grade security including SOC 2 Type II certification, end-to-end encryption, private VPC deployments, and isolated compute environments. Your code and data never leave your control, and we maintain comprehensive audit logging."
              },
              {
                question: "Can BluBrg handle variable compute demands?",
                answer: "Yes, our platform auto-scales from zero to thousands of GPUs based on demand. You only pay for what you use, and our infrastructure handles traffic spikes seamlessly without manual intervention or performance degradation."
              },
              {
                question: "Which ML frameworks and tools are supported?",
                answer: "BluBrg supports all major frameworks including PyTorch, TensorFlow, JAX, and Hugging Face. Our marketplace includes pre-configured environments, popular libraries, and one-click deployment templates for common AI applications."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/10">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-purple-400 transition-colors"
                >
                  <span className="text-base font-medium text-white pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-purple-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-purple-400" />
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
              <Link to="/contact/sales">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#0066FF] px-10 py-6 text-base font-medium rounded-md">
                  Reserve GPUs
                </Button>
              </Link>
              <Link to="/contact/sales">
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

export default SoftwareTechnology;
