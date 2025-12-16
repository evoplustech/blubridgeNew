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
            <p className="text-base text-white/60 max-w-3xl">The fusion of cloud technology and GPUs is revolutionising healthcare, impacting areas like bioinformatics, genomics, drug discovery, medical imaging, and clinical research. These technologies improve the efficiency and accuracy of research and diagnosis and promote collaboration and innovation.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="border-l-2 border-blue-500 pl-6"><h3 className="text-lg font-semibold text-blue-400 mb-2">Drug Discovery</h3><p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Build superior AI models</p><p className="text-white/60 text-sm leading-relaxed">BluBrg Cloud's GPU infrastructure is optimised for training large-scale AI models that can accelerate protein structure predictions, enabling faster drug discovery and development processes.</p></div>
            <div className="border-l-2 border-blue-500 pl-6"><h3 className="text-lg font-semibold text-blue-400 mb-2">Life Sciences</h3><p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Accelerated Simulations</p><p className="text-white/60 text-sm leading-relaxed">Powerful and numerous GPUs enable high-speed processing of complex biological and chemical simulations, leading to faster insights in life sciences research and innovation.</p></div>
            <div className="border-l-2 border-blue-500 pl-6"><h3 className="text-lg font-semibold text-blue-400 mb-2">Genomics</h3><p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Personalised medicine</p><p className="text-white/60 text-sm leading-relaxed">Analyse vast amounts of genomic data paving the way for genomics research. Our GPU clusters enable high-performance computing, delivering fast, actionable insights that drive innovation in personalised medicine.</p></div>
            <div className="border-l-2 border-blue-500 pl-6"><h3 className="text-lg font-semibold text-blue-400 mb-2">Bioinformatics</h3><p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Scalable Storage</p><p className="text-white/60 text-sm leading-relaxed">BluBrg Cloud provides scalable storage solutions for the massive datasets generated in bioinformatics, ensuring that data is readily available when needed.</p></div>
          </div>
        </div>
      </section>

      {/* KEY SERVICES */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12">Key Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors"><div className="mb-6"><div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center"><Zap className="w-7 h-7 text-blue-400" /></div></div><h3 className="text-xl font-bold text-white mb-2">AI Compute</h3><p className="text-blue-400 text-sm mb-4">Training</p><p className="text-white/60 text-sm leading-relaxed">A highly scalable, performance-optimised architecture that significantly reduces training times and boosts productivity.</p></div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors"><div className="mb-6"><div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 rounded-xl flex items-center justify-center"><Cpu className="w-7 h-7 text-blue-400" /></div></div><h3 className="text-xl font-bold text-white mb-2">AI Compute</h3><p className="text-blue-400 text-sm mb-4">Inference</p><p className="text-white/60 text-sm leading-relaxed">A highly optimised, scalable platform for inference workloads with best performance at low cost.</p></div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors"><div className="mb-6"><div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-purple-600/20 rounded-xl flex items-center justify-center"><LayoutGrid className="w-7 h-7 text-blue-400" /></div></div><h3 className="text-xl font-bold text-white mb-2">AI Marketplace</h3><p className="text-blue-400 text-sm mb-4">Marketplace</p><p className="text-white/60 text-sm leading-relaxed">An ecosystem of services for developing and deploying AI applications built using BluBrg's tools and other popular AI/ML software.</p></div>
          </div>
        </div>
      </section>

      {/* MORE SOLUTIONS */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">More solutions</h2>
          <p className="text-base text-white/60 mb-12 max-w-2xl">BluBrg accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/solutions/training" className="group"><div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/60 via-indigo-900/50 to-violet-900/60"><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /><div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '30px 30px' }}></div><div className="absolute bottom-0 left-0 p-8 w-full"><h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">Training</h3><div className="flex gap-4"><div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2"><span className="text-white text-sm">80%</span><span className="text-white/60 text-xs ml-2">Lower Cost</span></div><div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2"><span className="text-white text-sm">+40%</span><span className="text-white/60 text-xs ml-2">Efficiency</span></div></div></div><div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-purple-500/50 transition-colors" /></div></Link>
            <Link to="/solutions/inference" className="group"><div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/60 via-gray-900/50 to-slate-900/60"><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /><div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '30px 30px' }}></div><div className="absolute bottom-0 left-0 p-8 w-full"><h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">Inference</h3><div className="flex gap-4"><div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2"><span className="text-white text-sm">7.2X</span><span className="text-white/60 text-xs ml-2">Performance</span></div><div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2"><span className="text-white text-sm">+40%</span><span className="text-white/60 text-xs ml-2">Efficiency</span></div></div></div><div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-gray-500/50 transition-colors" /></div></Link>
            <Link to="/solutions/fine-tuning" className="group"><div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900/50 via-teal-900/40 to-green-900/50"><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /><div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '30px 30px' }}></div><div className="absolute bottom-0 left-0 p-8 w-full"><h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">Fine-Tuning</h3><div className="flex gap-4"><div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2"><span className="text-white text-sm">+40%</span><span className="text-white/60 text-xs ml-2">Efficiency</span></div><div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2"><span className="text-white text-sm">30%</span><span className="text-white/60 text-xs ml-2">Faster</span></div></div></div><div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-emerald-500/50 transition-colors" /></div></Link>
            <Link to="/solutions/ai-development" className="group"><div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-900/50 via-orange-900/40 to-yellow-900/50"><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /><div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '30px 30px' }}></div><div className="absolute bottom-0 left-0 p-8 w-full"><h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">AI Development</h3><div className="flex gap-4"><div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2"><span className="text-white text-sm">80%</span><span className="text-white/60 text-xs ml-2">Lower Cost</span></div><div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2"><span className="text-white text-sm">30%</span><span className="text-white/60 text-xs ml-2">Faster</span></div></div></div><div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-amber-500/50 transition-colors" /></div></Link>
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
