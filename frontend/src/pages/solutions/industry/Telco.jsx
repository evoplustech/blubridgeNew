import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid } from 'lucide-react';

const Telco = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const canvasRef = useRef(null);

  // Animated network mesh visualization for hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrame;
    let nodes = [];
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initNodes = () => {
      nodes = [];
      const nodeCount = 60;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          pulse: Math.random() * Math.PI * 2
        });
      }
    };

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position with subtle movement
        node.x += node.vx + Math.sin(time + node.pulse) * 0.2;
        node.y += node.vy + Math.cos(time + node.pulse) * 0.2;

        // Wrap around edges
        if (node.x < 0) node.x = canvas.offsetWidth;
        if (node.x > canvas.offsetWidth) node.x = 0;
        if (node.y < 0) node.y = canvas.offsetHeight;
        if (node.y > canvas.offsetHeight) node.y = 0;

        // Draw connections to nearby nodes
        nodes.forEach((other, j) => {
          if (i === j) return;
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        // Draw node with pulse effect
        const pulseSize = Math.sin(time * 2 + node.pulse) * 0.5 + 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.6 + Math.sin(time + node.pulse) * 0.2})`;
        ctx.fill();

        // Draw glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 4);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw moving signal lines
      for (let i = 0; i < 3; i++) {
        const progress = ((time * 0.5 + i * 0.33) % 1);
        const startNode = nodes[i * 10 % nodes.length];
        const endNode = nodes[(i * 10 + 5) % nodes.length];
        if (startNode && endNode) {
          const x = startNode.x + (endNode.x - startNode.x) * progress;
          const y = startNode.y + (endNode.y - startNode.y) * progress;
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(96, 165, 250, 0.8)';
          ctx.fill();
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    resize();
    initNodes();
    animate();

    window.addEventListener('resize', () => {
      resize();
      initNodes();
    });

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
      {/* ANIMATED HERO SECTION - Network mesh visualization */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050a15] via-[#030810] to-[#000000]" />
        
        {/* Animated canvas for network visualization */}
        <canvas 
          ref={canvasRef}
          className="absolute right-0 top-0 w-[60%] h-full opacity-70"
          style={{ pointerEvents: 'none' }}
        />

        {/* Additional ambient glow */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              TELCO
            </h1>
            <p className="text-lg lg:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
              BluBrg empowers Telcos to accelerate AI adoption by providing sustainable, high-performance GPU infrastructure. From network optimisation and predictive maintenance to AI-driven customer analytics, our platform supports the entire AI lifecycle for telecommunications providers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#050a15] px-10 py-6 text-base font-medium rounded-md">
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

      {/* 3-Column Highlights Strip */}
      <section className="py-16 bg-[#050505] border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Increased Performance</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Handle large-scale telco workloads, including real-time traffic analysis and deep learning models.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Scale Effortlessly</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Gain support for dynamic scaling of AI applications for 5G, edge, and large networks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Improve Operability</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Run energy-efficient telco data centres to lower carbon footprint in telco network operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Telco AI Use Cases Section */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Telco AI Use Cases</h2>
            <p className="text-base text-white/60 max-w-3xl">
              Discover how Telco companies can leverage BluBrg's GPU infrastructure to deliver AI services, optimise 5G networks, support advanced AI analytics, and drive next-generation telecommunications innovations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Descriptive content */}
            <div className="space-y-8">
              <div className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">White-label BluBrg's end-to-end Cloud Platform</h3>
                <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Deliver Advanced AI Services</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Launch AI services such as AI-powered chatbots and voice assistants or automated support ticket resolutions faster, thanks to the agility of BluBrg's cloud platform, allowing Telcos to advance customer service delivery to reduce customer churn and maximise customer retention.
                </p>
              </div>

              <div className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Analytics and automation to improve satisfaction</h3>
                <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Enhance Customer Experience</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Deploy AI-driven solutions to personalise customer experiences, automate network management, and proactively improve service delivery, powered by BluBrg's scalable GPU clusters.
                </p>
              </div>
            </div>

            {/* Right Column - More use cases */}
            <div className="space-y-8">
              <div className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Optimise Power Consumption</h3>
                <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Operate more sustainably</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Utilise BluBrg's sustainable AI data centres to optimise power consumption in telco infrastructure and deploy AI models closer to the user for ultra-low latency applications.
                </p>
              </div>

              <div className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Drive operational efficiency</h3>
                <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Streamline Operations with AI</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Automate routine workflows, such as provisioning new users or managing network traffic, saving time and reducing errors.
                </p>
              </div>
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

            {/* AI Compute GPU Nodes Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-blue-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-blue-400 text-sm mb-4">GPU Nodes</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Access GPU accelerators with best-in-class networking, storage and advanced cooling technology, for AI, ML, and HPC workloads.
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
                question: "What makes BluBrg's GPU Cloud different from others?",
                answer: "BluBrg owns and operates the full AI stack – from its data centre to the sophisticated orchestration layer – and this allows BluBrg to optimise each layer of the stack to deliver high-performance computing for telco workloads, maximise utilisation, and ensure scalability."
              },
              {
                question: "How can Telcos benefit from BluBrg's infrastructure?",
                answer: "Telcos can leverage BluBrg's GPU infrastructure for network optimisation, predictive maintenance, 5G enhancement, customer analytics, and AI-powered services. Our platform enables faster deployment of AI models while reducing operational costs."
              },
              {
                question: "Does BluBrg support edge computing for Telcos?",
                answer: "Yes, BluBrg's infrastructure supports edge deployment scenarios, enabling telcos to run AI models closer to end users for ultra-low latency applications. This is critical for 5G services, autonomous vehicles, and IoT ecosystems."
              },
              {
                question: "What security and compliance certifications does BluBrg have?",
                answer: "BluBrg maintains enterprise-grade security with SOC 2 and ISO compliance certifications. Our infrastructure is designed to meet the stringent security requirements of telecommunications providers handling sensitive customer data."
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

export default Telco;
