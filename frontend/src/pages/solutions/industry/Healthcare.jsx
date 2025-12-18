import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid, Cpu } from 'lucide-react';

const Healthcare = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationFrame;
    let time = 0;
    const animate = () => {
      time += 0.004;
      setOffset({ x: Math.sin(time) * 8, y: Math.cos(time * 0.7) * 6 });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

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

    const drawHealthcareForms = () => {
      time += 0.015;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // DNA Helix
      const helixLength = height * 0.8;
      const helixRadius = 50;
      const helixTurns = 3;
      const pointsPerTurn = 30;
      const totalPoints = helixTurns * pointsPerTurn;

      for (let strand = 0; strand < 2; strand++) {
        const phaseOffset = strand * Math.PI;
        ctx.beginPath();
        for (let i = 0; i <= totalPoints; i++) {
          const t = i / totalPoints;
          const angle = t * helixTurns * Math.PI * 2 + time + phaseOffset;
          const x = centerX + Math.cos(angle) * helixRadius;
          const y = (height - helixLength) / 2 + t * helixLength;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const gradient = ctx.createLinearGradient(centerX - helixRadius, 0, centerX + helixRadius, height);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)');
        gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.5)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.6)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      // Base pairs
      for (let i = 0; i <= totalPoints; i += 3) {
        const t = i / totalPoints;
        const angle1 = t * helixTurns * Math.PI * 2 + time;
        const angle2 = angle1 + Math.PI;
        const y = (height - helixLength) / 2 + t * helixLength;
        const x1 = centerX + Math.cos(angle1) * helixRadius;
        const x2 = centerX + Math.cos(angle2) * helixRadius;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = `rgba(147, 197, 253, ${0.3 + Math.sin(time + i * 0.2) * 0.1})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x1, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96, 165, 250, 0.7)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x2, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(167, 139, 250, 0.7)';
        ctx.fill();
      }

      // Floating particles
      for (let i = 0; i < 15; i++) {
        const px = (Math.sin(time * 0.5 + i * 2) + 1) * width * 0.5;
        const py = (Math.cos(time * 0.3 + i * 1.5) + 1) * height * 0.4 + height * 0.1;
        ctx.beginPath();
        ctx.arc(px, py, 2 + Math.sin(time + i), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${0.4 + Math.sin(time * 2 + i) * 0.2})`;
        ctx.fill();
      }

      // Pulse lines
      for (let i = 0; i < 3; i++) {
        const py = height * 0.2 + i * height * 0.3;
        ctx.beginPath();
        ctx.moveTo(0, py);
        for (let x = 0; x < width; x += 5) {
          const pulseY = py + Math.sin((x + time * 100) * 0.02) * 15 * Math.exp(-Math.pow((x - width * 0.5) / (width * 0.3), 2));
          ctx.lineTo(x, pulseY);
        }
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 - i * 0.03})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(drawHealthcareForms);
    };

    resize();
    drawHealthcareForms();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animationFrame); window.removeEventListener('resize', resize); };
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#030308] to-[#000000]" />
        <canvas ref={canvasRef} className="absolute right-0 top-0 w-[55%] h-full opacity-80" style={{ pointerEvents: 'none', transform: `translate(${offset.x}px, ${offset.y}px)`, transition: 'transform 0.5s ease-out' }} />
        <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-blue-500/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">HEALTHCARE</h1>
            <p className="text-lg lg:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">Blubrg Cloud offers tailored computing solutions for biotechnology firms and healthcare research organisations. By providing accessible and powerful GPU resources alongside expert AI support, Blubrg enables healthcare teams to speed up research efforts and deliver more personalised treatments.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact"><Button size="lg" className="bg-white hover:bg-white/90 text-[#050510] px-10 py-6 text-base font-medium rounded-md">Get Started</Button></Link>
              <Link to="/contact"><button className="text-white hover:text-white/80 px-6 py-6 text-base font-medium transition-colors flex items-center gap-2">Contact Sales <ArrowRight className="w-4 h-4" /></button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-16 bg-[#050505] border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div><h3 className="text-xl font-semibold text-white mb-3">Accelerated Analytics</h3><p className="text-white/60 text-sm leading-relaxed">Improve the speed and accuracy of analysing medical imaging and other clinical data, helping reduce wait times and support faster clinical insights.</p></div>
            <div><h3 className="text-xl font-semibold text-white mb-3">Enhanced AI Applications</h3><p className="text-white/60 text-sm leading-relaxed">Boost the performance of training and running AI models for advanced healthcare use cases, making solutions more effective and responsive.</p></div>
            <div><h3 className="text-xl font-semibold text-white mb-3">Scalability and Cost Efficiency</h3><p className="text-white/60 text-sm leading-relaxed">On-demand access to flexible and powerful compute resources removes the need for costly local hardware and lets teams scale effortlessly with demand.</p></div>
          </div>
        </div>
      </section>

      {/* EXAMPLE USES */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-blue-400 text-sm font-medium mb-3 uppercase tracking-wider">FOSTERING COLLABORATION AND INNOVATION</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Enhancing Efficiency in Healthcare</h2>
            <p className="text-base text-white/60 max-w-3xl">The convergence of cloud technologies and GPU-powered computing is transforming healthcare fields such as bioinformatics, genomics, drug discovery, personalised medicine, and multi-omics research. These capabilities streamline workflows, enhance diagnostic accuracy, and foster collaboration and innovation.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="border-l-2 border-blue-500 pl-6"><h3 className="text-lg font-semibold text-blue-400 mb-2">Drug Discovery</h3><p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Build superior AI models</p><p className="text-white/60 text-sm leading-relaxed">Use high-performance GPU computing to accelerate training of large-scale AI models that can predict protein structures and expedite the development of new treatments.</p></div>
            <div className="border-l-2 border-blue-500 pl-6"><h3 className="text-lg font-semibold text-blue-400 mb-2">Life Sciences</h3><p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Accelerated Simulations</p><p className="text-white/60 text-sm leading-relaxed">Run complex biological and chemical simulations much faster using GPU-powered infrastructure, enabling deeper investigation and faster results.</p></div>
            <div className="border-l-2 border-blue-500 pl-6"><h3 className="text-lg font-semibold text-blue-400 mb-2">Genomics</h3><p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Personalised medicine</p><p className="text-white/60 text-sm leading-relaxed">Analyse vast sets of genomic data to support personalised medicine, helping researchers uncover insights that drive tailored healthcare solutions.</p></div>
            <div className="border-l-2 border-blue-500 pl-6"><h3 className="text-lg font-semibold text-blue-400 mb-2">Bioinformatics</h3><p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Scalable Storage</p><p className="text-white/60 text-sm leading-relaxed">Scale storage and computing for the large, complex datasets common in bioinformatics, making data easier to access, process, and secure for research purposes.</p></div>
          </div>
        </div>
      </section>

      {/* KEY SERVICES */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12">Key Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors"><div className="mb-6"><div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center"><Zap className="w-7 h-7 text-blue-400" /></div></div><h3 className="text-xl font-bold text-white mb-2">AI Compute</h3><p className="text-blue-400 text-sm mb-4">Training</p><p className="text-white/60 text-sm leading-relaxed">A flexible and performance-optimised compute environment designed to shorten training times and increase productivity for data-intensive workloads.</p></div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors"><div className="mb-6"><div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 rounded-xl flex items-center justify-center"><Cpu className="w-7 h-7 text-blue-400" /></div></div><h3 className="text-xl font-bold text-white mb-2">AI Compute</h3><p className="text-blue-400 text-sm mb-4">Inference</p><p className="text-white/60 text-sm leading-relaxed"> A high-efficiency inference platform built to run production-level AI workloads with strong performance and reliability.</p></div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors"><div className="mb-6"><div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-purple-600/20 rounded-xl flex items-center justify-center"><LayoutGrid className="w-7 h-7 text-blue-400" /></div></div><h3 className="text-xl font-bold text-white mb-2">AI Marketplace</h3><p className="text-blue-400 text-sm mb-4">Marketplace</p><p className="text-white/60 text-sm leading-relaxed">An ecosystem of tools and frameworks that support building, deploying, and scaling AI applications using Blubrg’s services and popular AI/ML technologies.</p></div>
          </div>
        </div>
      </section>

      {/* MORE SOLUTIONS */}
     
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

      {/* BOTTOM CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0066FF] to-[#0055DD]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-8 leading-tight">Access thousands of GPUs tailored to your requirements.</h2>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact"><Button size="lg" className="bg-white hover:bg-white/90 text-[#0066FF] px-10 py-6 text-base font-medium rounded-md">Reserve GPUs</Button></Link>
              <Link to="/contact"><button className="text-white hover:text-white/80 px-6 py-6 text-base font-medium transition-colors flex items-center gap-2">Contact Sales <ArrowRight className="w-4 h-4" /></button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Healthcare;
