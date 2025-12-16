import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid } from 'lucide-react';

const Education = () => {
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
        y: Math.cos(time * 0.8) * 8
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Canvas animation for abstract vertical academic forms
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

    const drawAcademicForms = () => {
      time += 0.015;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Draw vertical book-like abstract columns
      const columnCount = 8;
      const columnWidth = width / (columnCount + 2);
      
      for (let i = 0; i < columnCount; i++) {
        const x = (i + 1.5) * columnWidth;
        const columnHeight = height * (0.5 + Math.sin(time + i * 0.5) * 0.15);
        const yOffset = Math.sin(time * 0.8 + i * 0.3) * 20;
        
        // Draw column shadow/glow
        const gradient = ctx.createLinearGradient(x, height - columnHeight + yOffset, x, height);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
        gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.2)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.05)');
        
        // Main column
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(
          x - columnWidth * 0.3, 
          height - columnHeight + yOffset, 
          columnWidth * 0.6, 
          columnHeight,
          [8, 8, 0, 0]
        );
        ctx.fill();
        
        // Top highlight
        ctx.fillStyle = `rgba(129, 140, 248, ${0.3 + Math.sin(time + i) * 0.1})`;
        ctx.fillRect(x - columnWidth * 0.3, height - columnHeight + yOffset, columnWidth * 0.6, 4);
        
        // Spine detail
        ctx.fillStyle = 'rgba(165, 180, 252, 0.15)';
        ctx.fillRect(x - columnWidth * 0.28, height - columnHeight + yOffset + 10, 2, columnHeight - 20);
      }

      // Draw floating particles (knowledge dots)
      for (let i = 0; i < 20; i++) {
        const particleX = (Math.sin(time * 0.5 + i * 2) + 1) * width * 0.5;
        const particleY = (Math.cos(time * 0.3 + i * 1.5) + 1) * height * 0.4 + height * 0.1;
        const size = 2 + Math.sin(time + i) * 1;
        
        ctx.beginPath();
        ctx.arc(particleX, particleY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 180, 252, ${0.3 + Math.sin(time * 2 + i) * 0.2})`;
        ctx.fill();
      }

      // Draw connecting lines between some columns (knowledge flow)
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < columnCount - 1; i += 2) {
        const x1 = (i + 1.5) * columnWidth;
        const x2 = (i + 2.5) * columnWidth;
        const y1 = height * 0.3 + Math.sin(time + i) * 30;
        const y2 = height * 0.35 + Math.cos(time + i) * 25;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo((x1 + x2) / 2, y1 - 50, x2, y2);
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(drawAcademicForms);
    };

    resize();
    drawAcademicForms();

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
        <div className="absolute inset-0 bg-gradient-to-br from-[#05050a] via-[#080812] to-[#000000]" />
        
        {/* Animated academic forms canvas */}
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
        <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-indigo-500/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDuration: '5s' }} />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              EDUCATION
            </h1>
            <p className="text-lg lg:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
              At Blubrg, we provide GPU cloud computing resources that help educational institutions and research organisations enhance teaching, learning, and research outcomes. Our infrastructure gives students, faculty, and researchers access to high-performance computing environments that support advanced computing projects and AI applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#05050a] px-10 py-6 text-base font-medium rounded-md">
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
              <h3 className="text-xl font-semibold text-white mb-3">Enhanced Learning with AI</h3>
              <p className="text-white/60 text-sm leading-relaxed">
              Use AI tools and technologies to create personalised educational experiences, adaptive assessments, and intelligent tutoring systems that help students learn more effectively.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Cost-Effective Access to HPC</h3>
              <p className="text-white/60 text-sm leading-relaxed">
              Institutions can tap into powerful GPU resources on demand, making high-performance computing affordable and accessible even for smaller schools and departments.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Facilitating Research</h3>
              <p className="text-white/60 text-sm leading-relaxed">
              Our GPU Cloud provides the computational power needed for research in areas such as engineering, biology, data science, and artificial intelligence, helping accelerate discovery and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Empowering Academic Research + Example Uses Section */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-indigo-400 text-sm font-medium mb-3 uppercase tracking-wider">EMPOWERING ACADEMIC RESEARCH</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Example uses</h2>
            <p className="text-base text-white/60 max-w-3xl">
              Blubrg’s GPU Cloud Infrastructure transforms how educators and researchers work across multiple disciplines. It enables advanced research projects by supplying scalable and robust computing resources tailored to the needs of academic users.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Foundation Model Training */}
            <div className="border-l-2 border-indigo-500 pl-6">
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Foundation Model Training</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">High-performance Infrastructure</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Researchers can access scalable, high-performance computing for developing and training foundational AI models. This helps accelerate deep learning research and experimentation.
              </p>
            </div>

            {/* Synthetic Biology Research */}
            <div className="border-l-2 border-indigo-500 pl-6">
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Synthetic Biology Research</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Accelerated Discovery</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Run complex molecular simulations and protein folding models at scale. BluBrg enables biology researchers to accelerate discoveries in genomics, drug design, and synthetic biology applications.
              </p>
            </div>

            {/* AI-Driven Multidisciplinary Studies */}
            <div className="border-l-2 border-indigo-500 pl-6">
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">AI-Driven Multidisciplinary Studies</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Cross-domain Innovation</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Enable collaborative research across departments by providing shared access to AI infrastructure. Support projects that span computer science, engineering, medicine, and social sciences.
              </p>
            </div>

            {/* Enhancing STEM Education */}
            <div className="border-l-2 border-indigo-500 pl-6">
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Enhancing STEM Education</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Hands-on Learning</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Give students practical experience with real AI tools and GPU computing. Build next-generation curricula that prepare students for careers in machine learning, data science, and AI engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12">Key Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Compute Training Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-indigo-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/30 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-indigo-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-indigo-400 text-sm mb-4">Training</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A highly scalable, performance-optimised architecture that significantly reduces training times and boosts productivity for academic research and student projects.
              </p>
            </div>

            {/* AI Marketplace Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-indigo-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/30 to-blue-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-indigo-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Marketplace</h3>
              <p className="text-indigo-400 text-sm mb-4">Marketplace</p>
              <p className="text-white/60 text-sm leading-relaxed">
                An ecosystem of services for developing and deploying AI applications, providing students and researchers with access to popular AI/ML tools and frameworks.
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
            BluBrg accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Training Card */}
            <Link to="/solutions/training" className="group">
              <div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/60 via-indigo-900/50 to-violet-900/60">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                  backgroundSize: '30px 30px'
                }}></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">Training</h3>
                  <div className="flex gap-4">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">80%</span>
                      <span className="text-white/60 text-xs ml-2">Lower Cost</span>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">+40%</span>
                      <span className="text-white/60 text-xs ml-2">Efficiency</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-purple-500/50 transition-colors" />
              </div>
            </Link>

            {/* Inference Card */}
            <Link to="/solutions/inference" className="group">
              <div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/60 via-gray-900/50 to-slate-900/60">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                  backgroundSize: '30px 30px'
                }}></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">Inference</h3>
                  <div className="flex gap-4">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">7.2X</span>
                      <span className="text-white/60 text-xs ml-2">Performance</span>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">+40%</span>
                      <span className="text-white/60 text-xs ml-2">Efficiency</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-gray-500/50 transition-colors" />
              </div>
            </Link>

            {/* Fine Tuning Card */}
            <Link to="/solutions/fine-tuning" className="group">
              <div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900/50 via-teal-900/40 to-green-900/50">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                  backgroundSize: '30px 30px'
                }}></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">Fine Tuning</h3>
                  <div className="flex gap-4">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">+40%</span>
                      <span className="text-white/60 text-xs ml-2">Efficiency</span>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">30%</span>
                      <span className="text-white/60 text-xs ml-2">Faster</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-emerald-500/50 transition-colors" />
              </div>
            </Link>

            {/* AI Development Card */}
            <Link to="/solutions/ai-development" className="group">
              <div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-900/50 via-orange-900/40 to-yellow-900/50">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                  backgroundSize: '30px 30px'
                }}></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">AI Development</h3>
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
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-amber-500/50 transition-colors" />
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
                question: "What makes BluBrg's GPU Cloud suitable for educational institutions?",
                answer: "BluBrg offers academic pricing, scalable on-demand resources, and pre-configured environments for AI/ML research and teaching. Our platform makes high-performance computing accessible to universities and schools without massive upfront infrastructure investments."
              },
              {
                question: "How can students and researchers access BluBrg resources?",
                answer: "We provide multi-user environments with role-based access control, allowing institutions to easily provision accounts for students, faculty, and research teams. Collaborative tools enable seamless project sharing and resource allocation."
              },
              {
                question: "Does BluBrg support academic research requirements?",
                answer: "Yes, our platform supports reproducible research with saved configurations, version control for experiments, and publication-ready documentation. We also offer special pricing and extended compute allocations for research projects."
              },
              {
                question: "What kind of AI/ML tools are available for education?",
                answer: "BluBrg's AI Marketplace includes popular frameworks like TensorFlow, PyTorch, and Jupyter notebooks, along with pre-configured environments for machine learning courses, data science education, and advanced AI research."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/10">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-indigo-400 transition-colors"
                >
                  <span className="text-base font-medium text-white pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-indigo-400" />
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

export default Education;
