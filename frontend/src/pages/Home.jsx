import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Check } from 'lucide-react';

const Home = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      time += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width * 0.65;
      const centerY = canvas.height * 0.5;

      for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.translate(centerX, centerY);

        const offset = i * Math.PI * 0.5;
        const xPos = Math.sin(time + offset) * 120;
        const yPos = Math.cos(time * 0.6 + offset) * 60;
        const rotation = time * 0.4 + offset;

        ctx.translate(xPos, yPos);
        ctx.rotate(rotation);

        const gradient = ctx.createLinearGradient(-180, -90, 180, 90);
        gradient.addColorStop(0, `rgba(10, 46, 109, ${0.5 - i * 0.1})`);
        gradient.addColorStop(0.5, `rgba(11, 60, 143, ${0.7 - i * 0.1})`);
        gradient.addColorStop(1, `rgba(6, 26, 68, ${0.4 - i * 0.1})`);

        ctx.beginPath();
        ctx.moveTo(-200, 0);
        ctx.bezierCurveTo(-200, -100, 200, -100, 200, 0);
        ctx.bezierCurveTo(200, 100, -200, 100, -200, 0);
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = `rgba(80, 130, 235, ${0.2 - i * 0.05})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2E6D] via-[#0B3C8F] to-[#061A44]" />
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ opacity: 0.5 }}
        />

        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <div className="container-custom relative z-10 py-32">
          <div className="max-w-2xl">
            <h1 className="text-7xl font-light text-white mb-8 leading-[1.1] tracking-tight">
              The hyperscaler<br />engineered for AI
            </h1>
            <p className="text-xl text-white/80 mb-12 font-light leading-relaxed">
              A full-stack, scalable, and sustainable AI cloud platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#0A2E6D] px-10 py-6 text-base font-medium rounded-md">
                  Reserve GPUs
                </Button>
              </Link>
              <Link to="/products/serverless">
                <button className="text-white hover:text-white/80 px-10 py-6 text-base font-medium transition-colors flex items-center gap-2">
                  Start Building <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="absolute bottom-[480px] left-0 right-0 z-10">
          <div className="container-custom">
            <div className="flex items-center justify-start gap-16 opacity-30">
              <div className="text-white text-3xl font-bold tracking-tight">NVIDIA</div>
              <div className="text-white text-2xl font-light">Computacenter</div>
              <div className="text-white text-2xl tracking-wide">NOKIA</div>
              <div className="text-white text-2xl font-light">Lightning AI</div>
            </div>
          </div>
        </div>

        {/* Executive Announcement Carousel */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 pointer-events-none" />
          
          <div className="container-custom relative">
            <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
              <div className="flex-shrink-0 w-8" />
              
              {[
                {
                  name: 'LUCAS MARTIN',
                  role: 'Chief Executive Officer',
                  date: '14th Dec 2024',
                  headline: 'BluBrg announces $500M Series B funding to accelerate AI infrastructure expansion',
                  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces'
                },
                {
                  name: 'SARAH CHEN',
                  role: 'Chief Technology Officer',
                  date: '12th Dec 2024',
                  headline: 'New data center operations launching in three strategic global locations',
                  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces'
                },
                {
                  name: 'PARTNERSHIP',
                  role: 'Strategic Alliance',
                  date: '10th Dec 2024',
                  headline: 'BluBrg partners with leading AI research institutions for advanced computing initiatives',
                  image: null
                }
              ].map((announcement, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[420px] h-[400px] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'rgba(20, 25, 35, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <div className="relative h-full p-8 flex flex-col">
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }} />
                    
                    <div className="relative flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-auto">
                        <div className="flex-1">
                          <div className="inline-block px-4 py-2 rounded-full mb-2" style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(10px)'
                          }}>
                            <div className="text-white text-sm font-semibold tracking-wider">{announcement.name}</div>
                          </div>
                          <div className="text-white/50 text-sm font-light">{announcement.role}</div>
                        </div>
                        
                        {announcement.image ? (
                          <div className="w-28 h-28 rounded-full overflow-hidden ml-4 flex-shrink-0 ring-1 ring-white/10">
                            <img 
                              src={announcement.image} 
                              alt={announcement.name}
                              className="w-full h-full object-cover grayscale"
                            />
                          </div>
                        ) : (
                          <div className="w-28 h-28 rounded-full overflow-hidden ml-4 flex-shrink-0 bg-gradient-to-br from-[#0066FF]/20 to-[#0052CC]/20 flex items-center justify-center">
                            <div className="text-white/30 text-xs text-center px-2">
                              <div className="text-2xl mb-1">🤝</div>
                              <div className="text-[10px]">Partnership</div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-8">
                        <div className="text-white/40 text-xs font-light mb-3 uppercase tracking-wider">{announcement.date}</div>
                        <h3 className="text-white text-xl font-medium leading-snug group-hover:text-white/90 transition-colors">
                          {announcement.headline}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex-shrink-0 w-8" />
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-8">
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* A fully integrated suite section */}
      <section className="py-32 bg-[#0D0D0D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-light text-white mb-8 leading-tight">
                A fully integrated suite of AI services and compute
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                BluBrg offers an end-to-end AI platform with managed services, customizable infrastructure, and seamless integration across every layer of the stack. From model training to production deployment, access the tools and compute you need without vendor lock-in.
              </p>
            </div>
            {/* <div className="bg-white/5 border border-white/10 rounded-2xl p-12 aspect-square flex items-center justify-center">
              <div className="text-center text-white/40 text-lg">AI Services Diagram</div>
            </div> */}
          </div>
        </div>
      </section>

       <section className="py-32 bg-[#0D0D0D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div />
            <div>
              <h2 className="text-5xl font-light text-white mb-8 leading-tight">
                Serverless model endpoints for inference
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Deploy ML models as serverless APIs in seconds. Pay only for compute time used with automatic scaling from zero to thousands of requests per second. Sub-100ms cold start times ensure responsive applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Turnkey AI development */}
      <section className="py-32 bg-[#0D0D0D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-light text-white mb-8 leading-tight">
                Turnkey AI development and deployment
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Launch pre-configured development environments with popular frameworks, libraries, and tools already installed. Deploy models instantly with serverless endpoints that auto-scale based on demand.
              </p>
              <Link to="/products/serverless">
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  Start with Marketplace
                </Button>
              </Link>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Serverless model endpoints */}
      <section className="py-32 bg-[#0D0D0D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div />
            <div>
              <h2 className="text-5xl font-light text-white mb-8 leading-tight">
                Serverless model endpoints for inference
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Deploy ML models as serverless APIs in seconds. Pay only for compute time used with automatic scaling from zero to thousands of requests per second. Sub-100ms cold start times ensure responsive applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated training clusters */}
      <section className="py-32 bg-[#0D0D0D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-light text-white mb-8 leading-tight">
                Dedicated training clusters ready to go
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Access clusters of NVIDIA H100, A100, and other premium GPUs configured for large-scale model training. Pre-installed frameworks, distributed training support, and high-bandwidth networking included.
              </p>
              <Link to="/products/training">
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  Start with Training
                </Button>
              </Link>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Setting a new standard */}
      <section className="py-32 bg-[#0D0D0D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div />
            <div>
              <h2 className="text-5xl font-light text-white mb-8 leading-tight">
                Setting a new standard for inference
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Achieve industry-leading inference performance with optimized runtimes, tensor compilation, and hardware acceleration. Support for ONNX, TensorRT, and custom model formats at production scale.
              </p>
              <Link to="/products/inference">
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  Start with Inference
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scalable flexible AI Compute */}
      <section className="py-32 bg-[#0D0D0D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-light text-white mb-8 leading-tight">
                Scalable, flexible AI Compute
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Deploy bare-metal GPU nodes with full root access and complete control over your environment. Choose from on-demand, reserved, or spot instances to optimize for performance and cost.
              </p>
              <Link to="/products/gpu-nodes">
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  Start with GPU Nodes
                </Button>
              </Link>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* BluBrg's Infrastructure */}
      <section className="py-32 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/10 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mb-16">
            <h2 className="text-5xl font-light text-white mb-8">BluBrg's Infrastructure</h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Purpose-built data centers powered by 100% renewable energy, optimized networking for GPU workloads, and enterprise-grade storage systems. Every layer of our stack is engineered for AI at scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Data Centres',
                desc: 'Purpose built for AI and the intensive energy demands of GPU-based compute.',
                features: ['100% Renewable Energy', 'Located in optimal climates', 'Scalable infrastructure']
              },
              {
                title: 'GPU Nodes',
                desc: 'High-performance NVIDIA GPU options for AI and HPC workloads.',
                features: ['On demand access', 'NVIDIA Grace Blackwell', 'Optimised for AI']
              },
              {
                title: 'Networking',
                desc: 'GPU fabric optimised for low latency and high bandwidth delivery.',
                features: ['RoCE enabled', 'Non-blocking design', 'Built for AI at scale']
              },
              {
                title: 'Storage',
                desc: 'Fast storage ensures GPUs are kept busy and fully utilised.',
                features: ['RDMA enabled', 'Parallel filesystems', 'AI storage platform']
              },
              {
                title: 'Kubernetes',
                desc: 'Robust infrastructure for deploying and scaling containerised workloads.',
                features: ['Bare metal performance', 'Auto-scale to 1000s GPUs', 'Fully managed'],
                highlight: true
              },
              {
                title: 'SLURM',
                desc: 'Advanced job scheduling and workload management for optimal performance.',
                features: ['Advanced scheduling', 'Optimal management', 'Effective utilisation']
              }
            ].map((item, i) => (
              <Card key={i} className={`${item.highlight ? 'bg-gradient-to-br from-[#0066FF]/20 to-[#0066FF]/5 border-[#0066FF]' : 'bg-white/5 border-white/10'} hover:scale-105 transition-all duration-300`}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-medium text-white mb-4">{item.title}</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">{item.desc}</p>
                  <div className="space-y-2">
                    {item.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-[#0D0D0D]">
        <div className="container-custom">
          <h2 className="text-4xl font-light text-white mb-20 text-center">Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                quote: 'BluBrg infrastructure enabled us to scale our training by 10x while reducing costs significantly. The platform abstraction saved our team months of work.',
                name: 'Sarah Chen',
                role: 'ML Director, Tech Startup'
              },
              {
                quote: 'The combination of performance, reliability, and support has been exceptional. We moved our entire inference workload and saw immediate improvements.',
                name: 'Marcus Rodriguez',
                role: 'VP Engineering, Enterprise SaaS'
              },
              {
                quote: 'Access to cutting-edge hardware with enterprise support gave us confidence to deploy production AI at scale. Best infrastructure decision we made.',
                name: 'Dr. Aisha Patel',
                role: 'Research Lead, AI Lab'
              }
            ].map((item, i) => (
              <div key={i} className="border-l-2 border-white/20 pl-8">
                <p className="text-white/80 italic mb-8 text-lg leading-relaxed">"{item.quote}"</p>
                <div className="text-white font-medium text-lg">{item.name}</div>
                <div className="text-white/50 mt-1">{item.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-32 bg-[#0D0D0D]">
        <div className="container-custom">
          <div className="mb-16">
            <h2 className="text-4xl font-light text-white mb-6">Use cases</h2>
            <p className="text-lg text-white/60 max-w-3xl">
              From model training to production deployment, BluBrg supports every phase of your AI journey with purpose-built infrastructure and tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'TRAINING',
                metrics: ['80% Lower Cost', '30% Faster'],
                gradient: 'from-purple-900/50 via-indigo-900/40 to-violet-900/50',
                pattern: 'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)',
                link: '/solutions/training'
              },
              {
                title: 'INFERENCE',
                metrics: ['7.2X Performance', '+40% Efficiency'],
                gradient: 'from-blue-900/50 via-cyan-900/40 to-sky-900/50',
                pattern: 'radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)',
                link: '/solutions/inference'
              },
              {
                title: 'FINE-TUNING',
                metrics: ['+40% Efficiency', '30% Faster'],
                gradient: 'from-orange-900/50 via-amber-900/40 to-yellow-900/50',
                pattern: 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 50%)',
                link: '/solutions/fine-tuning'
              },
              {
                title: 'AI DEVELOPMENT',
                metrics: ['80% Lower Cost', '30% Faster'],
                gradient: 'from-emerald-900/50 via-teal-900/40 to-green-900/50',
                pattern: 'radial-gradient(circle at 30% 70%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)',
                link: '/solutions/ai-development'
              }
            ].map((item, i) => (
              <Link key={i} to={item.link}>
                <div className={`relative h-96 bg-gradient-to-br ${item.gradient} rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300`}>
                  <div className="absolute inset-0 opacity-70" style={{ background: item.pattern }} />
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(30deg, rgba(255,255,255,0.03) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.03) 87.5%)',
                    backgroundSize: '80px 140px'
                  }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-10">
                    <h3 className="text-4xl font-light text-white mb-6 tracking-wider">{item.title}</h3>
                    <div className="space-y-2">
                      {item.metrics.map((metric, j) => (
                        <div key={j} className="text-white/90 text-lg font-light">{metric}</div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-white/10 rounded-2xl group-hover:border-[#0066FF]/60 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NVIDIA Partnership */}
      <section className="py-24 bg-[#0D0D0D] border-y border-white/10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-white mb-6">
                BluBrg is now an NVIDIA Preferred Partner
              </h2>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                As an NVIDIA Preferred Partner, BluBrg delivers certified infrastructure optimized for NVIDIA GPUs, with access to the latest hardware and technical support direct from NVIDIA engineering teams.
              </p>
              <div className="flex gap-4">
                <Link to="/contact">
                  <Button className="bg-white hover:bg-white/90 text-[#0A1F3D] px-8 py-6">
                    Reserve GPUs
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="text-8xl font-bold text-white/10 tracking-tight">NVIDIA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-r from-[#0066FF] to-[#0052CC]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-light text-white mb-8 max-w-4xl mx-auto leading-tight">
            Access thousands of GPUs tailored to your requirements
          </h2>
          <div className="flex gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white hover:bg-white/90 text-[#0066FF] px-10 py-7 text-lg font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-7 text-lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
