import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
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

  useDocumentTitle('Scalable AIaaS & AI Data Centers for Telco Providers | BluBrg - Next-Gen GPU Infrastructure');

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
      <section className="py-20 bg-[#F3F6E8]">
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
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/tbqd1w9m_Training.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">TRAINING</span>
                </div>
              </div>
            </Link>

            {/* AI & ML Inference Card - Blue Angular */}
            <Link to="/solutions/inference">
              <div className="relative border border-[#353535] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/2qvmu3rl_INFERENCE.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">INFERENCE</span>
                </div>
              </div>
            </Link>

            {/* AI Development Card - Orange/Bronze Wave */}
            <Link to="/solutions/ai-development">
              <div className="relative border border-[#353535] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/u12c3np1_AI%20Development.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">AI DEVELOPMENT</span>
                </div>
              </div>
            </Link>

            {/* Model Fine-Tuning Card - Green Wave */}
            <Link to="/solutions/fine-tuning">
              <div className="relative h-52 border border-[#353535] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
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
