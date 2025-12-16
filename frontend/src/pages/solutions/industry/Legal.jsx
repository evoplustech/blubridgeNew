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
              BluBrg empowers legal professionals with GPU-accelerated AI solutions for document analysis, case research, contract management, and predictive analytics. Our platform enables law firms to process vast amounts of legal data efficiently and make data-driven decisions faster.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#08050d] px-10 py-6 text-base font-medium rounded-md">
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

      {/* 3-Column Value Highlights */}
      <section className="py-16 bg-[#050505] border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Enhanced Document Analysis</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Process and analyse thousands of legal documents in minutes using GPU-accelerated AI models for comprehensive contract review and due diligence.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Improved Predictive Analytics</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Leverage AI to predict case outcomes, assess litigation risks, and provide data-driven legal strategies backed by historical precedent analysis.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Cost Efficiency and Scalability</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Scale your legal AI workloads on demand with pay-as-you-go pricing. Reduce operational costs while maintaining the highest standards of accuracy.
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
              Discover how law firms and legal departments leverage BluBrg's GPU infrastructure to streamline operations, enhance compliance, and deliver superior client outcomes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Automated Analysis */}
            <div className="border-l-2 border-violet-500 pl-6">
              <h3 className="text-lg font-semibold text-violet-400 mb-2">Automated Analysis</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">AI-Powered Document Processing</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Deploy advanced NLP models to automatically extract key information from contracts, briefs, and legal filings. Reduce review time by up to 90% while maintaining accuracy.
              </p>
            </div>

            {/* Regulatory Adherence */}
            <div className="border-l-2 border-violet-500 pl-6">
              <h3 className="text-lg font-semibold text-violet-400 mb-2">Regulatory Adherence</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Compliance Monitoring</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Use AI to continuously monitor regulatory changes and assess compliance across your document portfolio. Stay ahead of evolving legal requirements automatically.
              </p>
            </div>

            {/* Case Strategy */}
            <div className="border-l-2 border-violet-500 pl-6">
              <h3 className="text-lg font-semibold text-violet-400 mb-2">Case Strategy</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Predictive Legal Intelligence</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Analyse historical case data and judicial patterns to predict outcomes and inform litigation strategy. Make data-driven decisions with confidence.
              </p>
            </div>

            {/* Contract Management */}
            <div className="border-l-2 border-violet-500 pl-6">
              <h3 className="text-lg font-semibold text-violet-400 mb-2">Contract Management</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Intelligent Contract Lifecycle</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Automate contract creation, review, and management with AI that identifies risks, suggests clauses, and ensures consistency across your organisation.
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
                A highly scalable, performance-optimised architecture that significantly reduces training times for legal AI models.
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
                A highly optimised, scalable platform for inference workloads with best performance at low cost for real-time legal analysis.
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
                An ecosystem of services for developing and deploying legal AI applications built using BluBrg's tools and popular frameworks.
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

export default Legal;
