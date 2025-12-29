import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid, Cpu } from 'lucide-react';

const FinanceInsurance = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Animated parallax for hero section
  useEffect(() => {
    let animationFrame;
    let time = 0;

    const animate = () => {
      time += 0.008;
      setOffset({
        x: Math.sin(time) * 15,
        y: Math.cos(time * 0.7) * 10
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Canvas animation for financial data visualization
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

    const drawFinanceChart = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Draw animated grid lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 10; i++) {
        const y = (height / 10) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw moving candlestick-like bars
      for (let i = 0; i < 15; i++) {
        const x = (width / 15) * i + 20;
        const baseHeight = Math.sin(time + i * 0.5) * 50 + 100;
        const barHeight = baseHeight + Math.random() * 20;
        
        // Bar body
        ctx.fillStyle = `rgba(59, 130, 246, ${0.3 + Math.sin(time + i) * 0.1})`;
        ctx.fillRect(x, height - barHeight, 15, barHeight * 0.6);
        
        // Bar wick
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
        ctx.beginPath();
        ctx.moveTo(x + 7.5, height - barHeight);
        ctx.lineTo(x + 7.5, height - barHeight - 20);
        ctx.stroke();
      }

      // Draw flowing line chart
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.6)';
      ctx.lineWidth = 2;
      for (let i = 0; i <= width; i += 5) {
        const y = height / 2 + Math.sin((i + time * 50) * 0.02) * 60 + Math.sin((i + time * 30) * 0.05) * 30;
        if (i === 0) {
          ctx.moveTo(i, y);
        } else {
          ctx.lineTo(i, y);
        }
      }
      ctx.stroke();

      // Draw glowing data points
      for (let i = 0; i < 8; i++) {
        const x = (width / 8) * i + width / 16;
        const y = height / 2 + Math.sin((x + time * 50) * 0.02) * 60;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 197, 253, 0.9)';
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(drawFinanceChart);
    };

    resize();
    drawFinanceChart();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useDocumentTitle('Enhancing Finance and Insurance Services with Cloud GPUs | BluBrg');

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* ANIMATED HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050810] via-[#030508] to-[#000000]" />
        
        {/* Animated financial data canvas */}
        <canvas 
          ref={canvasRef}
          className="absolute right-0 top-0 w-[55%] h-full opacity-60"
          style={{ pointerEvents: 'none' }}
        />

        {/* Parallax cityscape silhouette effect */}
        <div 
          className="absolute right-0 bottom-0 w-[50%] h-[60%] opacity-20"
          style={{ 
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-t from-blue-900/30 to-transparent" />
          {/* Stylized building silhouettes */}
          <svg viewBox="0 0 400 300" className="absolute bottom-0 right-0 w-full h-full opacity-50">
            <defs>
              <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
              </linearGradient>
            </defs>
            <rect x="20" y="150" width="40" height="150" fill="url(#buildingGrad)" />
            <rect x="70" y="100" width="50" height="200" fill="url(#buildingGrad)" />
            <rect x="130" y="80" width="35" height="220" fill="url(#buildingGrad)" />
            <rect x="175" y="120" width="45" height="180" fill="url(#buildingGrad)" />
            <rect x="230" y="60" width="55" height="240" fill="url(#buildingGrad)" />
            <rect x="295" y="90" width="40" height="210" fill="url(#buildingGrad)" />
            <rect x="345" y="130" width="50" height="170" fill="url(#buildingGrad)" />
          </svg>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full filter blur-[120px] animate-pulse" style={{ animationDuration: '5s' }} />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              FINANCE & INSURANCE
            </h1>
            <p className="text-lg lg:text-xl text-[#243447] mb-10 leading-relaxed max-w-2xl">
              At Blubrg, we provide GPU cloud computing solutions designed to strengthen the computational capabilities of finance and insurance organisations. Our platform helps teams deliver innovative services faster while improving efficiency, security, and performance across data-intensive operations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact/sales">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#050810] px-10 py-6 text-base font-medium rounded-md">
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

      {/* 3-Column Value Pillars */}
      <section className="py-16 bg-[#050505] border-t border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Support Computational Needs</h3>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
              Run demanding workloads such as financial modelling, risk assessment, and large-scale analytics using powerful GPU-accelerated infrastructure built for high performance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Accelerate Data Analysis</h3>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                Process vast datasets at speed to generate real-time insights that support informed, time-critical decision-making across financial operations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Scale on demand</h3>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
              Adapt compute capacity seamlessly as workloads change, ensuring peak performance during high-demand periods while maintaining cost efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Uses Section */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-[#328CC1] text-sm font-medium mb-3 uppercase tracking-wider">GAIN A COMPETITIVE EDGE</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Example uses</h2>
            <p className="text-base text-[#5B6B7A] max-w-3xl">
              Financial and insurance organisations that leverage GPU cloud technologies gain competitive advantages through faster insights, improved efficiency, and enhanced customer engagement.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Financial Modelling */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Financial Modelling</h3>
              <p className="text-[#5B6B7A] text-xs font-medium mb-2 uppercase tracking-wider">Accelerated development</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                Speed up the development and evaluation of complex financial models by using GPU resources that allow quicker iteration and deeper analysis.
              </p>
            </div>

            {/* Fraud Detection */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Fraud Detection</h3>
              <p className="text-[#5B6B7A] text-xs font-medium mb-2 uppercase tracking-wider">Real-time Analysis</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
              Apply GPU-accelerated processing to detect anomalies in real time, helping identify fraudulent activity and reduce financial risk.
              </p>
            </div>

            {/* Monte Carlo Simulations */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Monte Carlo Simulations</h3>
              <p className="text-[#5B6B7A] text-xs font-medium mb-2 uppercase tracking-wider">Reduced time to insights</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                Execute Monte Carlo simulations more rapidly to support derivative pricing, portfolio optimisation, and advanced risk calculations.
              </p>
            </div>

            {/* Customer Service */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Customer Service</h3>
              <p className="text-[#5B6B7A] text-xs font-medium mb-2 uppercase tracking-wider">Powered by AI Cloud</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
              Deploy AI-powered chatbots and virtual assistants to manage customer interactions efficiently, improving response times and service quality.
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
            <div className="bg-[#0a0a0a] border border-[#D6DEC3] rounded-xl p-8 hover:border-blue-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-[#328CC1]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-[#328CC1] text-sm mb-4">Training</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                A scalable compute environment optimised to reduce training time and increase productivity for machine learning and data science teams.              </p>
            </div>

            {/* AI Compute Inference Card */}
            <div className="bg-[#0a0a0a] border border-[#D6DEC3] rounded-xl p-8 hover:border-blue-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 rounded-xl flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-[#328CC1]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-[#328CC1] text-sm mb-4">Inference</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                A performance-optimised platform designed to run inference workloads efficiently at scale for production AI applications.
              </p>
            </div>

            {/* AI Marketplace Card */}
            <div className="bg-[#0a0a0a] border border-[#D6DEC3] rounded-xl p-8 hover:border-blue-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-[#328CC1]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Marketplace</h3>
              <p className="text-[#328CC1] text-sm mb-4">Marketplace</p>
              <p className="text-[#5B6B7A] text-sm leading-relaxed">
                A collection of tools and services that support building, deploying, and scaling AI solutions using both Blubrg offerings and widely used AI frameworks.
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
                  <span className="text-white font-semibold text-2xl">TRAINING</span>
                </div>
              </div>
            </Link>

            {/* AI & ML Inference Card - Blue Angular */}
            <Link to="/solutions/inference">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/2qvmu3rl_INFERENCE.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">INFERENCE</span>
                </div>
              </div>
            </Link>

            {/* AI Development Card - Orange/Bronze Wave */}
            <Link to="/solutions/ai-development">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/u12c3np1_AI%20Development.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">AI DEVELOPMENT</span>
                </div>
              </div>
            </Link>

            {/* Model Fine-Tuning Card - Green Wave */}
            <Link to="/solutions/fine-tuning">
              <div className="relative h-52 border border-[#D6DEC3] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/zsuql6xm_Finetuning.avif')` }} />
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
                question: "What makes BluBrg's GPU Cloud suitable for financial services?",
                answer: "BluBrg provides enterprise-grade security with SOC 2 and ISO 27001 compliance, sub-millisecond latency for real-time trading applications, and the computational power needed for complex financial modelling, risk analysis, and fraud detection at scale."
              },
              {
                question: "How does BluBrg handle regulatory compliance?",
                answer: "Our infrastructure is built with compliance in mind, supporting GDPR, CCPA, and PCI DSS requirements. We provide comprehensive audit logging, data residency controls, and real-time compliance monitoring to meet financial regulatory standards."
              },
              {
                question: "Can BluBrg support high-frequency trading workloads?",
                answer: "Yes, BluBrg's infrastructure delivers sub-millisecond latency and can process millions of transactions per second. Our GPU-accelerated platform is optimised for algorithmic trading, market analysis, and real-time risk calculations."
              },
              {
                question: "What security measures protect financial data on BluBrg?",
                answer: "We implement end-to-end encryption, private VPC deployments, role-based access control, and comprehensive audit logging. Our data centres undergo regular penetration testing and maintain 99.99% uptime SLA for financial-grade reliability."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#D6DEC3]">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-[#328CC1] transition-colors"
                >
                  <span className="text-base font-medium text-white pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-[#328CC1]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#328CC1]" />
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

export default FinanceInsurance;
