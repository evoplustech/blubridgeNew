import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid, Cpu } from 'lucide-react';

const Legal = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Animated parallax for hero section
  useEffect(() => {
    let animationFrame;
    let time = 0;

    const animate = () => {
      time += 0.005;
      setOffset({
        x: Math.sin(time) * 10,
        y: Math.cos(time * 0.7) * 8
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Canvas animation for abstract gavel/legal geometric forms
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

    const drawLegalForms = () => {
      time += 0.012;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width * 0.5;
      const centerY = height * 0.45;

      // Draw abstract gavel head (rectangular block)
      const gavelWidth = 120;
      const gavelHeight = 45;
      const gavelRotation = Math.sin(time * 0.5) * 0.05;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(gavelRotation);
      
      // Gavel head gradient
      const gavelGradient = ctx.createLinearGradient(-gavelWidth/2, -gavelHeight/2, gavelWidth/2, gavelHeight/2);
      gavelGradient.addColorStop(0, 'rgba(139, 92, 246, 0.4)');
      gavelGradient.addColorStop(0.5, 'rgba(167, 139, 250, 0.3)');
      gavelGradient.addColorStop(1, 'rgba(139, 92, 246, 0.2)');
      
      ctx.fillStyle = gavelGradient;
      ctx.beginPath();
      ctx.roundRect(-gavelWidth/2, -gavelHeight/2, gavelWidth, gavelHeight, 6);
      ctx.fill();
      
      // Gavel highlight
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.restore();

      // Draw gavel handle
      ctx.save();
      ctx.translate(centerX, centerY + gavelHeight/2);
      ctx.rotate(gavelRotation);
      
      const handleGradient = ctx.createLinearGradient(0, 0, 0, 100);
      handleGradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
      handleGradient.addColorStop(1, 'rgba(139, 92, 246, 0.1)');
      
      ctx.fillStyle = handleGradient;
      ctx.beginPath();
      ctx.roundRect(-8, 0, 16, 100, 4);
      ctx.fill();
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.3)';
      ctx.stroke();
      
      ctx.restore();

      // Draw scale of justice (simplified geometric version)
      const scaleX = centerX + 80;
      const scaleY = centerY - 80;
      const scaleOffset = Math.sin(time) * 15;

      // Scale pillar
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(scaleX, scaleY - 60);
      ctx.lineTo(scaleX, scaleY + 60);
      ctx.stroke();

      // Scale beam
      ctx.beginPath();
      ctx.moveTo(scaleX - 60, scaleY - 50 + scaleOffset);
      ctx.lineTo(scaleX + 60, scaleY - 50 - scaleOffset);
      ctx.stroke();

      // Scale dishes
      ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.beginPath();
      ctx.arc(scaleX - 55, scaleY - 35 + scaleOffset, 25, 0, Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(scaleX + 55, scaleY - 35 - scaleOffset, 25, 0, Math.PI);
      ctx.fill();

      // Draw floating geometric shapes (law books / documents)
      for (let i = 0; i < 5; i++) {
        const x = centerX - 100 + i * 50 + Math.sin(time + i) * 10;
        const y = centerY + 80 + Math.cos(time + i * 0.5) * 15;
        const bookHeight = 40 + i * 5;
        const bookWidth = 25;
        
        const bookGradient = ctx.createLinearGradient(x, y, x + bookWidth, y - bookHeight);
        bookGradient.addColorStop(0, `rgba(99, 102, 241, ${0.15 + i * 0.05})`);
        bookGradient.addColorStop(1, `rgba(139, 92, 246, ${0.1 + i * 0.03})`);
        
        ctx.fillStyle = bookGradient;
        ctx.beginPath();
        ctx.roundRect(x, y - bookHeight, bookWidth, bookHeight, 2);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw floating particles
      for (let i = 0; i < 15; i++) {
        const particleX = (Math.sin(time * 0.4 + i * 2.5) + 1) * width * 0.5;
        const particleY = (Math.cos(time * 0.3 + i * 1.8) + 1) * height * 0.4 + height * 0.1;
        const size = 2 + Math.sin(time + i) * 1;
        
        ctx.beginPath();
        ctx.arc(particleX, particleY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${0.3 + Math.sin(time * 2 + i) * 0.2})`;
        ctx.fill();
      }

      // Draw connecting mesh lines
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const startX = width * 0.1 + i * width * 0.1;
        const startY = height * 0.2 + Math.sin(time + i) * 30;
        const endX = width * 0.2 + i * width * 0.08;
        const endY = height * 0.8 + Math.cos(time + i) * 20;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(centerX, centerY, endX, endY);
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(drawLegalForms);
    };

    resize();
    drawLegalForms();

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
        <div className="absolute inset-0 bg-gradient-to-br from-[#08050d] via-[#0a0812] to-[#000000]" />
        
        {/* Animated legal forms canvas */}
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
        <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-violet-500/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDuration: '5s' }} />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              LEGAL
            </h1>
            <p className="text-lg lg:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
              At Blubrg, we offer GPU cluster computing solutions designed to elevate your organisation’s computing capabilities. Our infrastructure supports advanced legal analytics, accelerates case research, and helps legal teams deliver more efficient and impactful services.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact/sales">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#08050d] px-10 py-6 text-base font-medium rounded-md">
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

      {/* 3-Column Value Highlights */}
      <section className="py-16 bg-[#050505] border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Enhanced Document Analysis</h3>
              <p className="text-white/60 text-sm leading-relaxed">
              Use powerful AI tools to quickly process and interpret large volumes of legal documents, speeding up tasks such as reviewing case files, contracts, and evidence with greater accuracy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Improved Predictive Analytics</h3>
              <p className="text-white/60 text-sm leading-relaxed">
              Apply machine learning techniques to forecast case trends, assess litigation risk, and uncover patterns across historical data, enabling more informed decision-making.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Cost Efficiency and Scalability</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Adopt robust GPU computing resources that adjust to workload demands, helping legal teams increase productivity while managing costs as requirements grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Uses Section */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-violet-400 text-sm font-medium mb-3 uppercase tracking-wider">TRANSFORMING LEGAL WORKFLOWS</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Example uses</h2>
            <p className="text-base text-white/60 max-w-3xl">
            Explore how legal organisations use high-performance GPU infrastructure to improve workflows, support critical tasks, and drive innovation across core legal operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Automated Analysis */}
            <div className="border-l-2 border-violet-500 pl-6">
              <h3 className="text-lg font-semibold text-violet-400 mb-2">Automated Analysis</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">AI-Powered Document Processing</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Reduce preparation time by automating the review and interpretation of large datasets, allowing legal professionals to focus on strategy and judgement.
              </p>
            </div>

            {/* Regulatory Adherence */}
            <div className="border-l-2 border-violet-500 pl-6">
              <h3 className="text-lg font-semibold text-violet-400 mb-2">Regulatory Adherence</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Compliance Monitoring</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Use AI-driven solutions to track and maintain compliance with evolving legal standards, helping reduce regulatory risk and potential penalties.
              </p>
            </div>

            {/* Case Strategy */}
            <div className="border-l-2 border-violet-500 pl-6">
              <h3 className="text-lg font-semibold text-violet-400 mb-2">Case Strategy</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Predictive Legal Intelligence</p>
              <p className="text-white/60 text-sm leading-relaxed">
              Leverage historical insights and predictive modelling to inform litigation strategies, enabling stronger planning and more effective tactical decisions.
              </p>
            </div>

            {/* Contract Management */}
            <div className="border-l-2 border-violet-500 pl-6">
              <h3 className="text-lg font-semibold text-violet-400 mb-2">Contract Management</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Intelligent Contract Lifecycle</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Improve contract workflows by automatically identifying key clauses, potential risks, and important details, ensuring consistency and reducing manual effort.
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
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-violet-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500/30 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-violet-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-violet-400 text-sm mb-4">Training</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A scalable compute environment optimised to shorten model training cycles and increase productivity for legal AI workloads.
              </p>
            </div>

            {/* AI Compute Inference Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-violet-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-violet-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-violet-400 text-sm mb-4">Inference</p>
              <p className="text-white/60 text-sm leading-relaxed">
               A high-performance platform designed to efficiently run inference workloads for production-level AI applications used in legal processes.
              </p>
            </div>

            {/* AI Marketplace Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-violet-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500/30 to-blue-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-violet-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Marketplace</h3>
              <p className="text-violet-400 text-sm mb-4">Marketplace</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A collection of tools and frameworks that support the development, deployment, and scaling of AI applications tailored to legal use cases.
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
                question: "How can AI improve legal document review?",
                answer: "AI-powered document review uses natural language processing to analyse contracts, briefs, and legal filings at scale. Our GPU-accelerated platform can process thousands of documents in minutes, identifying key clauses, risks, and inconsistencies with up to 95% accuracy."
              },
              {
                question: "Is BluBrg's platform secure for confidential legal data?",
                answer: "Yes, BluBrg maintains enterprise-grade security with SOC 2 Type II certification, end-to-end encryption, and private VPC deployments. We understand attorney-client privilege requirements and have designed our infrastructure to meet the highest standards of legal confidentiality."
              },
              {
                question: "Can BluBrg help with legal research and case prediction?",
                answer: "Absolutely. Our platform enables AI models that can analyse millions of case precedents, predict litigation outcomes, and identify relevant legal arguments. Law firms using our infrastructure report 90% time savings in legal research tasks."
              },
              {
                question: "What types of legal AI applications can run on BluBrg?",
                answer: "BluBrg supports a wide range of legal AI applications including contract analysis, e-discovery, due diligence automation, compliance monitoring, legal chatbots, and predictive analytics for case outcomes. Our marketplace includes pre-built legal AI tools and frameworks."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/10">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-violet-400 transition-colors"
                >
                  <span className="text-base font-medium text-white pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-violet-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-violet-400" />
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white">
            Access thousands of GPUs tailored to your requirements.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact/sales">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact/sales" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors font-medium px-6 py-1">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Legal;
