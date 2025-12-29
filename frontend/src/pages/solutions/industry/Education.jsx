import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
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

  useDocumentTitle('Elevate Advanced Research Projects | BluBrg');

  return (
    <div className="min-h-screen bg-[#F3F6E8]">
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
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0B1F3B] mb-8 leading-tight tracking-tight">
              EDUCATION
            </h1>
            <p className="text-lg lg:text-xl text-[#243447] mb-10 leading-relaxed max-w-2xl">
              At Blubrg, we provide GPU cloud computing resources that help educational institutions and research organisations enhance teaching, learning, and research outcomes. Our infrastructure gives students, faculty, and researchers access to high-performance computing environments that support advanced computing projects and AI applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact/sales">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#05050a] px-10 py-6 text-base font-medium rounded-md">
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
      <section className="py-16 bg-[#EEF2DC] border-t border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Enhanced Learning with AI</h3>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
              Use AI tools and technologies to create personalised educational experiences, adaptive assessments, and intelligent tutoring systems that help students learn more effectively.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Cost-Effective Access to HPC</h3>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
              Institutions can tap into powerful GPU resources on demand, making high-performance computing affordable and accessible even for smaller schools and departments.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Facilitating Research</h3>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
              Our GPU Cloud provides the computational power needed for research in areas such as engineering, biology, data science, and artificial intelligence, helping accelerate discovery and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Empowering Academic Research + Example Uses Section */}
      <section className="py-24 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-indigo-400 text-sm font-medium mb-3 uppercase tracking-wider">EMPOWERING ACADEMIC RESEARCH</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4">Example uses</h2>
            <p className="text-base text-[#5B6B7A] max-w-3xl">
              Blubrg’s GPU Cloud Infrastructure transforms how educators and researchers work across multiple disciplines. It enables advanced research projects by supplying scalable and robust computing resources tailored to the needs of academic users.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Foundation Model Training */}
            <div className="border-l-2 border-indigo-500 pl-6">
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Foundation Model Training</h3>
              <p className="text-[#5B6B7A] text-xs font-medium mb-2 uppercase tracking-wider">High-performance Infrastructure</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                Researchers can access scalable, high-performance computing for developing and training foundational AI models. This helps accelerate deep learning research and experimentation.
              </p>
            </div>

            {/* Synthetic Biology Research */}
            <div className="border-l-2 border-indigo-500 pl-6">
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Synthetic Biology Research</h3>
              <p className="text-[#5B6B7A] text-xs font-medium mb-2 uppercase tracking-wider">Accelerated Discovery</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                GPU computing power enables intricate simulations, large-scale data processing, and computational experiments. These capabilities speed up progress in fields like synthetic biology and other data-intensive sciences.
              </p>
            </div>

            {/* AI-Driven Multidisciplinary Studies */}
            <div className="border-l-2 border-indigo-500 pl-6">
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">AI-Driven Multidisciplinary Studies</h3>
              <p className="text-[#5B6B7A] text-xs font-medium mb-2 uppercase tracking-wider">Enabling Collaboration</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                Our infrastructure supports complex computational studies that span multiple academic fields. It gives research teams a flexible platform where they can collaborate, test ideas, and run analysis more efficiently.
              </p>
            </div>

            {/* Enhancing STEM Education */}
            <div className="border-l-2 border-indigo-500 pl-6">
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Enhancing STEM Education</h3>
              <p className="text-[#5B6B7A] text-xs font-medium mb-2 uppercase tracking-wider">Interactive Learning Environments</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
              STEM educators can use the GPU cloud to build immersive, interactive learning environments that help students explore complex concepts in areas like robotics, physics, and machine learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-24 bg-[#EEF2DC]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">Key Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Compute Training Card */}
            <div className="bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-indigo-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/30 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-indigo-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-indigo-400 text-sm mb-4">Training</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                A scalable, performance-optimised compute environment designed to shorten model training cycles and increase productivity for academic researchers and students.
              </p>
            </div>

            {/* AI Marketplace Card */}
            <div className="bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-indigo-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/30 to-blue-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-indigo-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Marketplace</h3>
              <p className="text-indigo-400 text-sm mb-4">Marketplace</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                 A suite of tools and services that help educators and researchers build, deploy, and scale AI applications using both Blubrg offerings and widely used AI/ML frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Solutions */}
      
<section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">More solutions</h2>
            <p className="text-[#243447] max-w-2xl">
              BluBrg accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            {/* Model Training Card - Purple Wave */}
            <Link to="/solutions/training">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/tbqd1w9m_Training.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-[#0B1F3B] font-semibold text-2xl">TRAINING</span>
                </div>
              </div>
            </Link>

            {/* AI & ML Inference Card - Blue Angular */}
            <Link to="/solutions/inference">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/2qvmu3rl_INFERENCE.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-[#0B1F3B] font-semibold text-2xl">INFERENCE</span>
                </div>
              </div>
            </Link>

            {/* AI Development Card - Orange/Bronze Wave */}
            <Link to="/solutions/ai-development">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/u12c3np1_AI%20Development.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-[#0B1F3B] font-semibold text-2xl">AI DEVELOPMENT</span>
                </div>
              </div>
            </Link>

            {/* Model Fine-Tuning Card - Green Wave */}
            <Link to="/solutions/fine-tuning">
              <div className="relative h-52 border border-[#D6DEC3] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/zsuql6xm_Finetuning.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-[#0B1F3B] font-semibold text-2xl">FINE-TUNING</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* FAQs */}
      <section className="py-24 bg-[#EEF2DC]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">FAQs</h2>
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
              <div key={i} className="border-b border-[#D6DEC3]">
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
                    <p className="text-[#5B6B7A] text-sm leading-relaxed">{faq.answer}</p>
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
              <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-8 py-3 rounded font-medium">
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

export default Education;
