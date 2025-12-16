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
        <div className="absolute bottom-20 left-0 right-0 z-10">
          <div className="container-custom">
            <div className="flex items-center justify-start gap-16 opacity-30">
              <div className="text-white text-3xl font-bold tracking-tight">NVIDIA</div>
              <div className="text-white text-2xl font-light">Computacenter</div>
              <div className="text-white text-2xl tracking-wide">NOKIA</div>
              <div className="text-white text-2xl font-light">Lightning AI</div>
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
                Cut costs, increase revenue, and operate your AI workloads more efficiently with a fully integrated platform. Whether you use Blubrg’s native AI/ML tools or your own solutions, the platform is built to simplify the transition from development to production.
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
               Turnkey AI development and deployment
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                The Blubrg Marketplace provides users with a wide range of AI/ML tools and resources, supporting efficient, scalable model development and seamless deployment.
              </p>
               <Link to="/products/">
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  Start with Marketplace
                </Button>
              </Link>
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
                Serverless model endpoints for inference
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Serverless enables smooth, scalable AI inference without the burden of managing infrastructure. It automatically adjusts to demand, delivering low-latency, cost-efficient inference for widely used Generative AI models.
              </p>
  
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
                Dedicated training clusters ready to go
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Blubrg’s optimized GPU clusters are built to shorten model training times and improve productivity. Leverage Slurm and Kubernetes to create a robust infrastructure that simplifies deploying, managing, and scaling containerized workloads.
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
                Setting a new standard for inference
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Access high-performance, cost-effective, and auto-scaling infrastructure for AI inference. Blubrg has optimized every layer of the stack for both batch and streaming workloads, using high-speed GPUs and advanced orchestration tools to scale inference operations while sustaining peak performance.
              </p>
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
                Scalable, flexible AI Compute
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Blubrg’s GPU Nodes provide powerful computing performance designed for AI and high-performance computing (HPC) workloads, backed by advanced cooling technology.
              </p>
            </div>
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
              Blubrg manages the full AI infrastructure stack, from energy-efficient data centres in Norway to advanced compute clusters and software setups. Every component is thoughtfully chosen and engineered to support the demanding requirements of AI.
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
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                quote: 'AI is transforming the global economy and reshaping the role of renewable energy. With Blubrg, we are supporting infrastructure that is sovereign, scalable, and purpose-built to drive this shift forward. Blubrg’s full-stack, GPU-first approach provides a clear execution advantage. The scale and quality of this Series B round reflect Blubrg’s strong vision, growing momentum, and the depth of our partnership. Through both our Series B investment and joint venture, we are making a meaningful, long-term commitment to building industrial relevance in the era of AI.',
                name: 'Øyvind Eriksen',
                role: 'President & CEO - Aker ASA'
              },
              {
                quote: 'In just a few months, Blubrg has advanced with clear focus and speed, transforming bold plans into real production capacity and achieving meaningful relevance quickly. The team is developing large-scale, sovereign infrastructure that enterprises and governments can truly use, delivering reliability, efficiency, and proximity to their data. We’re excited to support [Josh and the] Blubrg [team] as they scale thoughtfully, empower builders with the right infrastructure, and lay a strong foundation for national AI leadership.',
                name: 'Larry Aschebrook',
                role: 'Founder & Managing Partner - G Squared'
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
              End-to-end AI solutions, covering model training and fine-tuning through to inference and development, all built to accelerate your AI initiatives.
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
                Access thousands of GPUs tailored to your requirements.
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
