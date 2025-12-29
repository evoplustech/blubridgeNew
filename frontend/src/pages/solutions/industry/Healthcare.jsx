import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
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

  useDocumentTitle('GPU Cloud for Healthcare and Biotech | BluBrg');

  return (
    <div className="min-h-screen bg-[#f3f6e8]">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f3f6e8] via-[#e9ecdc] to-[#f3f6e8]" />
        <canvas ref={canvasRef} className="absolute right-0 top-0 w-[55%] h-full opacity-80" style={{ pointerEvents: 'none', transform: `translate(${offset.x}px, ${offset.y}px)`, transition: 'transform 0.5s ease-out' }} />
        <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-[#328CC1]/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0B1F3B] mb-8 leading-tight tracking-tight">HEALTHCARE</h1>
            <p className="text-lg lg:text-xl text-[#2F3A4A] mb-10 leading-relaxed max-w-2xl">Blubrg Cloud offers tailored computing solutions for biotechnology firms and healthcare research organisations. By providing accessible and powerful GPU resources alongside expert AI support, Blubrg enables healthcare teams to speed up research efforts and deliver more personalised treatments.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact/sales"><Button size="lg" className="bg-[#0B1F3B] hover:bg-[#162B4D] text-white px-10 py-6 text-base font-medium rounded-md">Get Started</Button></Link>
              <Link to="/contact/sales" className="inline-flex items-center gap-2 text-[#328CC1] hover:text-[#0B1F3B] transition-colors font-medium">
                Contact <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-16 bg-[#e9ecdc] border-t border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div><h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Accelerated Analytics</h3><p className="text-[#6B7280] text-sm leading-relaxed">Improve the speed and accuracy of analysing medical imaging and other clinical data, helping reduce wait times and support faster clinical insights.</p></div>
            <div><h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Enhanced AI Applications</h3><p className="text-[#6B7280] text-sm leading-relaxed">Boost the performance of training and running AI models for advanced healthcare use cases, making solutions more effective and responsive.</p></div>
            <div><h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Scalability and Cost Efficiency</h3><p className="text-[#6B7280] text-sm leading-relaxed">On-demand access to flexible and powerful compute resources removes the need for costly local hardware and lets teams scale effortlessly with demand.</p></div>
          </div>
        </div>
      </section>

      {/* EXAMPLE USES */}
      <section className="py-24 bg-[#f3f6e8]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-[#328CC1] text-sm font-medium mb-3 uppercase tracking-wider">FOSTERING COLLABORATION AND INNOVATION</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4">Enhancing Efficiency in Healthcare</h2>
            <p className="text-base text-[#6B7280] max-w-3xl">The convergence of cloud technologies and GPU-powered computing is transforming healthcare fields such as bioinformatics, genomics, drug discovery, personalised medicine, and multi-omics research. These capabilities streamline workflows, enhance diagnostic accuracy, and foster collaboration and innovation.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="border-l-2 border-blue-500 pl-6"><h3 className="text-lg font-semibold text-[#328CC1] mb-2">Drug Discovery</h3><p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Build superior AI models</p><p className="text-[#6B7280] text-sm leading-relaxed">Use high-performance GPU computing to accelerate training of large-scale AI models that can predict protein structures and expedite the development of new treatments.</p></div>
            <div className="border-l-2 border-blue-500 pl-6"><h3 className="text-lg font-semibold text-[#328CC1] mb-2">Life Sciences</h3><p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Accelerated Simulations</p><p className="text-[#6B7280] text-sm leading-relaxed">Run complex biological and chemical simulations much faster using GPU-powered infrastructure, enabling deeper investigation and faster results.</p></div>
            <div className="border-l-2 border-blue-500 pl-6"><h3 className="text-lg font-semibold text-[#328CC1] mb-2">Genomics</h3><p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Personalised medicine</p><p className="text-[#6B7280] text-sm leading-relaxed">Analyse vast sets of genomic data to support personalised medicine, helping researchers uncover insights that drive tailored healthcare solutions.</p></div>
            <div className="border-l-2 border-blue-500 pl-6"><h3 className="text-lg font-semibold text-[#328CC1] mb-2">Bioinformatics</h3><p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Scalable Storage</p><p className="text-[#6B7280] text-sm leading-relaxed">Scale storage and computing for the large, complex datasets common in bioinformatics, making data easier to access, process, and secure for research purposes.</p></div>
          </div>
        </div>
      </section>

      {/* KEY SERVICES */}
      <section className="py-24 bg-[#f3f6e8]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">Key Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-blue-500/30 transition-colors"><div className="mb-6"><div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center"><Zap className="w-7 h-7 text-[#328CC1]" /></div></div><h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3><p className="text-[#328CC1] text-sm mb-4">Training</p><p className="text-[#6B7280] text-sm leading-relaxed">A flexible and performance-optimised compute environment designed to shorten training times and increase productivity for data-intensive workloads.</p></div>
            <div className="bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-blue-500/30 transition-colors"><div className="mb-6"><div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 rounded-xl flex items-center justify-center"><Cpu className="w-7 h-7 text-[#328CC1]" /></div></div><h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3><p className="text-[#328CC1] text-sm mb-4">Inference</p><p className="text-[#6B7280] text-sm leading-relaxed"> A high-efficiency inference platform built to run production-level AI workloads with strong performance and reliability.</p></div>
            <div className="bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-blue-500/30 transition-colors"><div className="mb-6"><div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-purple-600/20 rounded-xl flex items-center justify-center"><LayoutGrid className="w-7 h-7 text-[#328CC1]" /></div></div><h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Marketplace</h3><p className="text-[#328CC1] text-sm mb-4">Marketplace</p><p className="text-[#6B7280] text-sm leading-relaxed">An ecosystem of tools and frameworks that support building, deploying, and scaling AI applications using Blubrg’s services and popular AI/ML technologies.</p></div>
          </div>
        </div>
      </section>

      {/* MORE SOLUTIONS */}
     
      <section className="py-20 bg-[#f3f6e8]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#0B1F3B]">More solutions</h2>
            <p className="text-[#2F3A4A] max-w-2xl">
              BluBrg accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            {/* Model Training Card - Purple Wave */}
            <Link to="/solutions/training">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/tbqd1w9m_Training.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">TRAINING</span>
                </div>
              </div>
            </Link>

            {/* AI & ML Inference Card - Blue Angular */}
            <Link to="/solutions/inference">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/2qvmu3rl_INFERENCE.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">INFERENCE</span>
                </div>
              </div>
            </Link>

            {/* AI Development Card - Orange/Bronze Wave */}
            <Link to="/solutions/ai-development">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/u12c3np1_AI%20Development.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">AI DEVELOPMENT</span>
                </div>
              </div>
            </Link>

            {/* Model Fine-Tuning Card - Green Wave */}
            <Link to="/solutions/fine-tuning">
              <div className="relative h-52 border border-[#D6DEC3] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/zsuql6xm_Finetuning.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">FINE-TUNING</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white">
            Access thousands of GPUs tailored to your requirements.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact/sales">
              <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact/sales" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors font-medium px-6 py-1">
              Contact <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Healthcare;
