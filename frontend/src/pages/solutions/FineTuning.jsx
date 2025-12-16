import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid } from 'lucide-react';

const FineTuning = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [animationOffset, setAnimationOffset] = useState({ x: 0, y: 0 });

  // Smooth animation for hero background
  useEffect(() => {
    let animationFrame;
    let time = 0;
    
    const animate = () => {
      time += 0.005;
      setAnimationOffset({
        x: Math.sin(time) * 20,
        y: Math.cos(time * 0.8) * 15
      });
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* ANIMATED HERO SECTION - Green gradient with motion */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Animated green gradient background with 3D shard effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#051a0d] via-[#030f08] to-[#000000]">
          {/* Animated abstract green shards/ribbons */}
          <div 
            className="absolute top-0 right-0 w-[80%] h-full transition-transform duration-1000 ease-out"
            style={{ 
              transform: `translate(${animationOffset.x}px, ${animationOffset.y}px)` 
            }}
          >
            {/* Primary flowing ribbon */}
            <div 
              className="absolute top-[5%] right-[5%] w-[500px] h-[600px] opacity-70"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(5, 150, 105, 0.3) 30%, rgba(4, 120, 87, 0.2) 60%, transparent 100%)',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                filter: 'blur(40px)',
                transform: `rotate(${15 + animationOffset.x * 0.3}deg)`,
                animation: 'morphShape 8s ease-in-out infinite'
              }}
            />
            {/* Secondary ribbon */}
            <div 
              className="absolute top-[15%] right-[15%] w-[400px] h-[500px] opacity-60"
              style={{
                background: 'linear-gradient(160deg, rgba(34, 197, 94, 0.35) 0%, rgba(22, 163, 74, 0.25) 40%, transparent 100%)',
                borderRadius: '70% 30% 30% 70% / 60% 40% 60% 40%',
                filter: 'blur(50px)',
                transform: `rotate(${-10 + animationOffset.y * 0.4}deg) scale(${1 + animationOffset.x * 0.005})`,
                animation: 'morphShape 10s ease-in-out infinite reverse'
              }}
            />
            {/* Tertiary accent */}
            <div 
              className="absolute top-[30%] right-[25%] w-[350px] h-[400px] opacity-50"
              style={{
                background: 'linear-gradient(200deg, rgba(74, 222, 128, 0.3) 0%, rgba(34, 197, 94, 0.2) 50%, transparent 100%)',
                borderRadius: '50% 50% 30% 70% / 40% 60% 40% 60%',
                filter: 'blur(60px)',
                transform: `rotate(${25 + animationOffset.x * 0.2}deg)`,
                animation: 'morphShape 12s ease-in-out infinite'
              }}
            />
            {/* Bright highlight */}
            <div 
              className="absolute top-[10%] right-[10%] w-[250px] h-[300px] opacity-40"
              style={{
                background: 'linear-gradient(180deg, rgba(134, 239, 172, 0.4) 0%, rgba(74, 222, 128, 0.2) 100%)',
                borderRadius: '60% 40% 50% 50% / 50% 50% 50% 50%',
                filter: 'blur(30px)',
                transform: `translate(${animationOffset.x * 0.5}px, ${animationOffset.y * 0.5}px)`,
                animation: 'pulse 4s ease-in-out infinite'
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes morphShape {
            0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
            25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
            50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
            75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
        `}</style>

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              MODEL FINE-TUNING
            </h1>
            <p className="text-lg lg:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
              At Blubrg, we provide GPU cloud computing solutions that help you fine-tune your AI models for optimal performance. Our infrastructure and expert support teams ensure your models are enhanced for accuracy, efficiency, and scalability, helping you reach production readiness faster.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#051a0d] px-10 py-6 text-base font-medium rounded-md">
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

      {/* Value Highlights - 3 Column Strip */}
      <section className="py-16 bg-[#050505] border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Optimise for Performance</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Unlock the full potential of your AI models and fine-tune to achieve peak performance on your specific datasets and tasks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Accelerate Time to Market</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Reduce the time it takes to prepare and deploy your AI solutions. With streamlined fine-tuning processes, you can iterate and refine your models more quickly, allowing innovations to reach users sooner.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Cost-Effective Scalability</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Easily grow your AI operations without excessive costs. Blubrg’s GPU cloud solutions are built to scale smoothly and offer flexible pricing that adapts to your resource needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fast, Efficient Model Fine-tuning Section */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-emerald-500 text-sm font-medium mb-3 uppercase tracking-wider">LEVERAGE ADVANCED GPU CLOUD INFRASTRUCTURE</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Fast, efficient model fine-tuning
              </h2>
              <p className="text-base text-white/65 leading-relaxed mb-10">
                Our platform leverages the latest in GPU technology to provide exceptional performance, efficiency, and scalability. This ensures your AI models are fine-tuned to deliver strong value while meeting the demands of real-world use cases.
              </p>

              {/* <div className="space-y-8">
                <div className="border-l-2 border-emerald-500 pl-5">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">30% Faster Time to Value for Your AI Projects</h3>
                  <p className="text-white/50 text-xs font-medium mb-2">Accelerate the time to actionable results with an AI stack optimised for rapid experimentation and tuning.</p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    We own the infrastructure so you can focus on the innovation.
                  </p>
                </div>

                <div className="border-l-2 border-emerald-500 pl-5">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">40% Efficiency Improvement</h3>
                  <p className="text-white/50 text-xs font-medium mb-2">Optimised Resource Utilisation</p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Increase the effectiveness of compute resources with improved hardware utilisation.
                  </p>
                </div>
              </div> */}
            </div>

            {/* Right side - Stacked system cards */}
            <div className="space-y-4">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/30 to-green-600/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">AI Marketplace</h4>
                    <p className="text-white/50 text-sm">Pre-built fine-tuning templates</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                    <LayoutGrid className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Training Compute</h4>
                    <p className="text-white/50 text-sm">Scalable GPU clusters</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-violet-600/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Inference & Deployment</h4>
                    <p className="text-white/50 text-sm">One-click model serving</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fine-Tuning Stack - Two column layout */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Fine-Tuning Stack</h2>
            <p className="text-base text-white/60 max-w-2xl">
              BluBrg provides a complete technology stack for running intensive fine-tuning workloads in the most efficient and high-performing way possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Stacked categories */}
            <div className="space-y-4">
              {/* Marketplace */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wider">MARKETPLACE</h3>
                <div className="flex flex-wrap gap-2">
                  {['Jupyter Notebook', 'TensorFlow', 'PyTorch'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1.5 text-white text-xs">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wider">PLATFORM</h3>
                <div className="flex flex-wrap gap-2">
                  {['Virtual Machines', 'Managed Kubernetes'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-3 py-1.5 text-white text-xs">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wider">INFRASTRUCTURE</h3>
                <div className="flex flex-wrap gap-2">
                  {['GPU Compute', 'Storage', 'Networking'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1.5 text-white text-xs">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hardware */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wider">HARDWARE</h3>
                <div className="flex flex-wrap gap-2">
                  {['AMD MI300X', 'AMD MI250X', 'NVDA GB200', 'H100', '...'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1.5 text-white text-xs">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - User Experience & Data Centre */}
            <div className="space-y-4">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 h-[calc(50%-8px)]">
                <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wider">USER EXPERIENCE</h3>
                <div className="space-y-3">
                  {['Web Console', 'API', 'CLI'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 h-[calc(50%-8px)]">
                <h3 className="text-sm font-bold text-white/80 mb-4 tracking-wider">DATA CENTRE</h3>
                <div className="space-y-3">
                  {['Renewable Energy', 'Low-latency Fibre'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics - 4 Column */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-16">Performance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                metric: '30%', 
                label: 'FASTER INSIGHTS', 
                sublabel: 'Accelerate Time to Value',
                desc: 'Accelerate the time to actionable results with an AI stack optimised for rapid experimentation and tuning.',
                link: 'Learn More',
                linkTo: '/about'
              },
              { 
                metric: '80%', 
                label: 'LOWER COST', 
                sublabel: 'More performance for less.',
                desc: ' Reduce costly cloud compute expenses while maintaining powerful performance.',
                link: 'Our Data Centres',
                linkTo: '/products/glomfjord'
              },
              { 
                metric: '40%', 
                label: 'MORE EFFICIENT', 
                sublabel: 'Improved Resource Utilisation',
                desc: ' Increase the effectiveness of compute resources with improved hardware utilisation.',
                link: 'See GPU Nodes',
                linkTo: '/products/gpu-nodes'
              },
              { 
                metric: '7.2X', 
                label: 'FASTER INFERENCE', 
                sublabel: 'Accelerate time to insights',
                desc: 'Experience marked improvements in throughput and responsiveness thanks to GPU tuning and system-level optimisation.',
                link: 'Blog Post',
                linkTo: '/blog'
              }
            ].map((item, i) => (
              <div key={i} className="border-l border-white/20 pl-6">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-1">{item.metric}</div>
                <div className="text-white text-sm font-semibold mb-2 uppercase tracking-wide">{item.label}</div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{item.desc}</p>
                <Link to={item.linkTo} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1">
                  {item.link} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12">Key Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Training Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-emerald-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/30 to-green-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-emerald-400 text-sm mb-4">Training</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A highly scalable and performance-optimised compute framework that shortens model training cycles and boosts productivity.
              </p>
            </div>

            {/* Marketplace Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-emerald-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Marketplace</h3>
              <p className="text-blue-400 text-sm mb-4">Marketplace</p>
              <p className="text-white/60 text-sm leading-relaxed">
                An ecosystem of services and tools that support the entire model lifecycle, enabling development and deployment using both Blubrg offerings and popular AI/ML technologies.
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
            Blubrg accelerates the full journey from initial development to deployment, helping teams achieve quicker productivity gains in their AI initiatives.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Training Card */}
            <Link to="/solutions/training" className="group">
              <div className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/60 via-indigo-900/50 to-violet-900/60">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                  backgroundSize: '30px 30px'
                }}></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-light text-white mb-6 tracking-wider uppercase">Training</h3>
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
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-purple-500/50 transition-colors" />
              </div>
            </Link>

            {/* Inference / AI Development Combined Column */}
            <div className="space-y-4">
              <Link to="/solutions/inference" className="group block">
                <div className="relative h-[calc(160px-8px)] rounded-xl overflow-hidden bg-gradient-to-br from-slate-800/60 via-gray-900/50 to-slate-900/60">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-lg font-light text-white mb-3 tracking-wider uppercase">Inference</h3>
                    <div className="flex gap-3">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded px-3 py-1">
                        <span className="text-white text-xs">7.2X</span>
                        <span className="text-white/60 text-xs ml-1">Performance</span>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded px-3 py-1">
                        <span className="text-white text-xs">+40%</span>
                        <span className="text-white/60 text-xs ml-1">Efficiency</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-gray-500/50 transition-colors" />
                </div>
              </Link>

              <Link to="/solutions/ai-development" className="group block">
                <div className="relative h-[calc(160px-8px)] rounded-xl overflow-hidden bg-gradient-to-br from-amber-900/50 via-orange-900/40 to-yellow-900/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-lg font-light text-white mb-3 tracking-wider uppercase">AI Development</h3>
                    <div className="flex gap-3">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded px-3 py-1">
                        <span className="text-white text-xs">80%</span>
                        <span className="text-white/60 text-xs ml-1">Lower Cost</span>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded px-3 py-1">
                        <span className="text-white text-xs">30%</span>
                        <span className="text-white/60 text-xs ml-1">Faster</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-amber-500/50 transition-colors" />
                </div>
              </Link>
            </div>
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
                answer: "Blubrg owns and operates the entire infrastructure stack, from physical data centres to orchestration software, allowing the company to tune every layer for performance, efficiency, and scalability. This integrated approach delivers superior compute power and expert support for complex AI workloads."
              },
              {
                question: "What types of GPUs does BluBrg offer?",
                answer: "A range of high-performance NVIDIA GPUs are available to support different fine-tuning workloads, giving you flexibility in choosing the right hardware for your model size and performance needs."
              },
              {
                question: "What industries can benefit from Fine-Tuning?",
                answer: "Fine-tuning is valuable across multiple sectors, including:Artificial intelligence and machine learning research and development,Gaming and entertainment for graphics and interactive applications,Healthcare for clinical analysis and advanced imaging,Finance for modelling and predictive analytics,Automotive industries for autonomous and simulation tasks,Aerospace and engineering for simulation and design optimisation"
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/10">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-emerald-400 transition-colors"
                >
                  <span className="text-base font-medium text-white pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-emerald-400" />
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

export default FineTuning;
