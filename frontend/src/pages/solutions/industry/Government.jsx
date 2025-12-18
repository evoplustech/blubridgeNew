import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid, Cpu } from 'lucide-react';

const Government = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Animated parallax for hero section
  useEffect(() => {
    let animationFrame;
    let time = 0;

    const animate = () => {
      time += 0.004;
      setOffset({
        x: Math.sin(time) * 8,
        y: Math.cos(time * 0.7) * 6
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Canvas animation for government building/pillars visual
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

    const drawGovernmentForms = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width * 0.5;
      const baseY = height * 0.85;

      // Draw classical pillars
      const pillarCount = 5;
      const pillarSpacing = width * 0.15;
      const startX = centerX - (pillarCount - 1) * pillarSpacing / 2;

      for (let i = 0; i < pillarCount; i++) {
        const pillarX = startX + i * pillarSpacing;
        const pillarHeight = 200 + Math.sin(time + i * 0.5) * 10;
        const pillarWidth = 30;
        const pillarY = baseY - pillarHeight;

        // Pillar gradient
        const pillarGradient = ctx.createLinearGradient(pillarX - pillarWidth/2, pillarY, pillarX + pillarWidth/2, baseY);
        pillarGradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
        pillarGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.25)');
        pillarGradient.addColorStop(1, 'rgba(59, 130, 246, 0.15)');

        // Main pillar body
        ctx.fillStyle = pillarGradient;
        ctx.beginPath();
        ctx.roundRect(pillarX - pillarWidth/2, pillarY, pillarWidth, pillarHeight, [4, 4, 0, 0]);
        ctx.fill();

        // Pillar capital (top)
        ctx.fillStyle = 'rgba(96, 165, 250, 0.4)';
        ctx.beginPath();
        ctx.roundRect(pillarX - pillarWidth/2 - 5, pillarY - 15, pillarWidth + 10, 15, [3, 3, 0, 0]);
        ctx.fill();

        // Pillar base
        ctx.fillStyle = 'rgba(96, 165, 250, 0.3)';
        ctx.beginPath();
        ctx.roundRect(pillarX - pillarWidth/2 - 5, baseY, pillarWidth + 10, 12, [0, 0, 3, 3]);
        ctx.fill();

        // Vertical lines on pillar (fluting)
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.2)';
        ctx.lineWidth = 1;
        for (let j = -2; j <= 2; j++) {
          ctx.beginPath();
          ctx.moveTo(pillarX + j * 5, pillarY + 5);
          ctx.lineTo(pillarX + j * 5, baseY - 5);
          ctx.stroke();
        }
      }

      // Draw triangular pediment (roof)
      const pedimentWidth = (pillarCount - 1) * pillarSpacing + 80;
      const pedimentHeight = 60;
      const pedimentY = baseY - 220;

      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.beginPath();
      ctx.moveTo(centerX - pedimentWidth/2, pedimentY);
      ctx.lineTo(centerX, pedimentY - pedimentHeight);
      ctx.lineTo(centerX + pedimentWidth/2, pedimentY);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(96, 165, 250, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw entablature (horizontal beam below pediment)
      ctx.fillStyle = 'rgba(59, 130, 246, 0.25)';
      ctx.fillRect(centerX - pedimentWidth/2 - 10, pedimentY, pedimentWidth + 20, 15);

      // Draw base platform
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.fillRect(centerX - pedimentWidth/2 - 30, baseY + 12, pedimentWidth + 60, 20);

      // Draw steps
      for (let i = 0; i < 3; i++) {
        const stepWidth = pedimentWidth + 80 + i * 40;
        const stepY = baseY + 32 + i * 12;
        ctx.fillStyle = `rgba(59, 130, 246, ${0.15 - i * 0.03})`;
        ctx.fillRect(centerX - stepWidth/2, stepY, stepWidth, 12);
      }

      // Draw floating data elements
      for (let i = 0; i < 12; i++) {
        const particleX = (Math.sin(time * 0.5 + i * 2) + 1) * width * 0.5;
        const particleY = (Math.cos(time * 0.3 + i * 1.5) + 1) * height * 0.35 + height * 0.05;
        const size = 2 + Math.sin(time + i) * 1;
        
        ctx.beginPath();
        ctx.arc(particleX, particleY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${0.4 + Math.sin(time * 2 + i) * 0.2})`;
        ctx.fill();
      }

      // Draw connecting data lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const startY = height * 0.1 + i * height * 0.12;
        ctx.beginPath();
        ctx.moveTo(0, startY + Math.sin(time + i) * 10);
        ctx.lineTo(width, startY + Math.cos(time + i) * 10);
        ctx.stroke();
      }

      // Draw digital overlay effect on building
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const y = pedimentY - 30 + i * 30;
        ctx.beginPath();
        ctx.moveTo(centerX - pedimentWidth/2 + 20, y);
        ctx.lineTo(centerX + pedimentWidth/2 - 20, y);
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(drawGovernmentForms);
    };

    resize();
    drawGovernmentForms();

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
        <div className="absolute inset-0 bg-gradient-to-br from-[#050812] via-[#030610] to-[#000000]" />
        
        {/* Animated government forms canvas */}
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
        <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-blue-500/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDuration: '5s' }} />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              GOVERNMENT
            </h1>
            <p className="text-lg lg:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
              Blubrg provides secure, scalable GPU cloud infrastructure designed to help government organisations modernise operations, drive data-informed decision making, and support digital transformation initiatives across public services.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#050812] px-10 py-6 text-base font-medium rounded-md">
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

      {/* 3-Column Value Propositions */}
      <section className="py-16 bg-[#050505] border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Enhanced Data Processing</h3>
              <p className="text-white/60 text-sm leading-relaxed">
              Enable government teams to handle and interpret large volumes of data quickly, supporting advanced analytics, real-time monitoring, and AI-based insights that improve operational effectiveness.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Accelerated AI Development</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Deploy and adopt advanced AI technologies more rapidly, enabling capabilities such as enhanced security monitoring, automated services for citizens, and tools for reducing fraud, all while improving service delivery.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Cost Efficiency and Scalability</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Benefit from infrastructure that scales based on demand, allowing agencies to optimise compute resources and control costs without investing in and maintaining large physical hardware fleets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Uses Section */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-blue-400 text-sm font-medium mb-3 uppercase tracking-wider">BUILD A MODERN, DIGITAL PUBLIC SECTOR</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Example uses</h2>
            <p className="text-base text-white/60 max-w-3xl">
              Blubrg’s GPU cloud helps public sector organisations enhance efficiency, improve service quality, and introduce innovative AI-driven solutions across various government functions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Predictive Analytics in Healthcare */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Predictive Analytics in Healthcare</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Improved health outcomes</p>
              <p className="text-white/60 text-sm leading-relaxed">
              Improve public health planning and forecasting by using AI to analyse health data, helping anticipate disease outbreaks and manage medical resources more effectively.
              </p>
            </div>

            {/* Environmental Monitoring */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Environmental Monitoring</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Protect Natural Resources</p>
              <p className="text-white/60 text-sm leading-relaxed">
              Accelerate complex simulations and analytics to assess climate conditions, track natural resources, and support planning for sustainable infrastructure and environmental policies.
              </p>
            </div>

            {/* Public Service Automation */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Public Service Automation</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Increase productivity</p>
              <p className="text-white/60 text-sm leading-relaxed">
              Use AI-powered tools to handle common citizen requests and administrative tasks, increasing productivity and freeing up staff to focus on more complex work.
              </p>
            </div>

            {/* Public Safety and Security */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Public Safety and Security</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Maximise productivity</p>
              <p className="text-white/60 text-sm leading-relaxed">
              Provide real-time data analysis and pattern detection that support emergency response coordination, crime prediction, and safety initiatives across communities.
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
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-blue-400 text-sm mb-4">Training</p>
              <p className="text-white/60 text-sm leading-relaxed">
              A scalable compute platform optimised to reduce training times and help teams rapidly build and refine machine learning models.
              </p>
            </div>

            {/* AI Compute Inference Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 rounded-xl flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-blue-400 text-sm mb-4">Inference</p>
              <p className="text-white/60 text-sm leading-relaxed">
              A performance-tuned environment designed to run inference workloads efficiently, enabling real-time AI applications in production.
              </p>
            </div>

            {/* AI Marketplace Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Marketplace</h3>
              <p className="text-blue-400 text-sm mb-4">Marketplace</p>
              <p className="text-white/60 text-sm leading-relaxed">
              A suite of tools and frameworks that assist government organisations in developing, deploying, and scaling AI models in a structured and consistent way.
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
                question: "How does AI support public sector modernisation?",
                answer: "AI enables government agencies to automate routine tasks, analyse vast amounts of data for better decision-making, improve citizen services through chatbots and personalisation, and enhance security through advanced threat detection. BluBrg's GPU infrastructure provides the computational power needed to train and deploy these AI solutions at scale."
              },
              {
                question: "What security and compliance certifications does BluBrg support?",
                answer: "BluBrg maintains enterprise-grade security with certifications including SOC 2 Type II, ISO 27001, and supports compliance with government-specific requirements. Our infrastructure includes end-to-end encryption, private VPC deployments, comprehensive audit logging, and data sovereignty options for sensitive government workloads."
              },
              {
                question: "Can BluBrg scale to meet government workload demands?",
                answer: "Yes, BluBrg's infrastructure is designed for elastic scalability. Government agencies can scale from development workloads to production deployments serving millions of citizens. Our platform automatically adjusts resources based on demand, ensuring optimal performance during peak periods without over-provisioning."
              },
              {
                question: "How does BluBrg help optimise costs for public agencies?",
                answer: "BluBrg delivers up to 80% cost savings compared to traditional cloud providers through efficient GPU utilisation, pay-as-you-go pricing, and optimised infrastructure. Agencies only pay for the resources they use, eliminating waste from over-provisioning and reducing the total cost of AI initiatives."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/10">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-blue-400 transition-colors"
                >
                  <span className="text-base font-medium text-white pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-blue-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-blue-400" />
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

export default Government;
