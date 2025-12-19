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
              Blubrg provides telecommunications providers with the infrastructure and expertise to support a wide range of AI-based services and solutions. With high-performance GPU clusters and scalable architecture, telco companies can enhance network performance, improve customer experience, and deploy advanced automation tools powered by artificial intelligence. The infrastructure also supports modern telecom needs such as 5G and edge computing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact/sales">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#050a15] px-10 py-6 text-base font-medium rounded-md">
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

      {/* 3-Column Highlights Strip */}
      <section className="py-16 bg-[#050505] border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Increased Performance</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Handle demanding telco workloads, including real-time traffic processing and deep learning models used for network analytics and optimisation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Scale Effortlessly</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Support dynamic scaling of AI applications for modern telecom requirements like 5G, Internet of Things (IoT) workloads, and distributed edge networks without compromising performance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Improve Operability</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Operate energy-efficient infrastructure that reduces overall carbon impact while supporting advanced telco processes and data operations.
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
              Explore the different ways telecommunications companies can use Blubrg’s GPU infrastructure to deliver smarter AI services, optimise next-generation networks, and drive innovation across the industry.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Descriptive content */}
            <div className="space-y-8">
              <div className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">White-label BluBrg's end-to-end Cloud Platform</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Telcos can build their own branded cloud services using Blubrg’s complete cloud platform, giving them the ability to offer AI-powered solutions and services without heavy upfront investment.
                </p>
              </div>

              <div className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Deliver Advanced AI Services</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Telecom operators can launch AI capabilities such as intelligent chatbots, automated support systems, and virtual assistants faster, improving customer service, reducing churn, and increasing loyalty.
                 </p>
              </div>
            </div>

            {/* Right Column - More use cases */}
            <div className="space-y-8">
              <div className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Enhance Customer Experience</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Use AI-driven analytics and automation to personalise interactions, proactively address service issues, and deliver seamless experiences that improve overall customer satisfaction.
                </p>
              </div>

              <div className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Operate More Sustainably</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Deploy AI models closer to users with ultra-low latency while using energy-efficient infrastructure that helps lower power consumption and supports greener network operations.
                </p>
              </div>
              {/* <div className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Streamline Operations with AI</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Automate repetitive network tasks, such as user provisioning or traffic management, to reduce manual effort, minimise errors, and improve operational efficiency.
                </p>
              </div> */}
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
                 A scalable, performance-tuned compute architecture that reduces training times and boosts team productivity.
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
                High-performance GPU clusters with advanced networking, storage, and cooling to support AI, machine learning, and high-performance workloads.
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

export default Telco;
