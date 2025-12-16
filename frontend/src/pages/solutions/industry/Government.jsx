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
              At BluBrg, we offer GPU cluster computing solutions designed to elevate your computational capabilities. Our infrastructure supports critical public sector services, accelerates innovation, and helps you deliver more efficient and effective government operations.
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
                Process and analyse massive datasets at high speeds required for government decision-making with AI-driven decision making.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Accelerated AI Development</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Deploy advanced technologies for tasks like fraud detection, cybersecurity, and automated public services with enhanced agility and efficiency.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Cost Efficiency and Scalability</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                BluBrg Cloud's scalability allows agencies to adjust resources based on demand without costly over-provisioning, ensuring cost-effective operations.
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
              BluBrg's GPU Cloud infrastructure is transforming how governments operate and serve citizens. Our platform enables the public sector to develop and implement advanced AI models, improve data-driven decision making, and drive innovation across various government departments, ultimately leading to more efficient and effective governance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Predictive Analytics in Healthcare */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Predictive Analytics in Healthcare</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Improved health outcomes</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Utilise AI to analyse large datasets in the healthcare industry to predict disease outbreaks, improve patient outcomes, and help public health agencies allocate resources effectively.
              </p>
            </div>

            {/* Environmental Monitoring */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Environmental Monitoring</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Protect Natural Resources</p>
              <p className="text-white/60 text-sm leading-relaxed">
                BluBrg can support and accelerate advanced simulations to predict climate changes, manage natural resources, and respond to environmental emergencies more effectively.
              </p>
            </div>

            {/* Public Service Automation */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Public Service Automation</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Increase productivity</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Automate services using AI-powered chatbots to handle citizen inquiries, provide 24/7 assistance and reducing the workload on human staff.
              </p>
            </div>

            {/* Public Safety and Security */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Public Safety and Security</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Maximise productivity</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Leverage BluBrg's GPU cloud platform for real-time surveillance, crime pattern analysis, and emergency response coordination to enhance public safety.
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
                A highly scalable, performance-optimised architecture that significantly reduces training times and boosts productivity.
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
                A highly optimised, scalable platform for inference workloads with best performance at low cost.
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
                An ecosystem of services for developing and deploying AI applications built using BluBrg's tools and other popular AI/ML software.
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
                  <h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">Fine-Tuning</h3>
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
