import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Zap, Shield, Globe, Cpu, Clock, Database } from 'lucide-react';

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
      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width * 0.7;
      const centerY = canvas.height * 0.5;

      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.translate(centerX, centerY);

        const offset = i * Math.PI * 0.66;
        const xPos = Math.sin(time + offset) * 150;
        const yPos = Math.cos(time * 0.7 + offset) * 80;
        const rotation = time * 0.5 + offset;

        ctx.translate(xPos, yPos);
        ctx.rotate(rotation);

        const gradient = ctx.createLinearGradient(-200, -100, 200, 100);
        gradient.addColorStop(0, `rgba(10, 46, 109, ${0.6 - i * 0.15})`);
        gradient.addColorStop(0.5, `rgba(11, 60, 143, ${0.8 - i * 0.15})`);
        gradient.addColorStop(1, `rgba(6, 26, 68, ${0.5 - i * 0.15})`);

        ctx.beginPath();
        ctx.moveTo(-250, 0);
        ctx.bezierCurveTo(-250, -120, 250, -120, 250, 0);
        ctx.bezierCurveTo(250, 120, -250, 120, -250, 0);
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = `rgba(100, 150, 255, ${0.3 - i * 0.1})`;
        ctx.lineWidth = 2;
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
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2E6D] via-[#0B3C8F] to-[#061A44]" />
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ opacity: 0.6 }}
        />

        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <div className="container-custom relative z-10 py-32">
          <div className="max-w-2xl">
            <h1 className="text-7xl font-light text-white mb-8 leading-tight tracking-tight">
              The hyperscaler<br />engineered for AI
            </h1>
            <p className="text-xl text-white/80 mb-12 font-light">
              A full-stack, scalable, and sustainable AI cloud platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#0A2E6D] px-10 py-7 text-lg font-medium rounded-lg">
                  Reserve GPUs
                </Button>
              </Link>
              <Link to="/products/serverless">
                <button className="text-white hover:text-white/80 px-10 py-7 text-lg font-medium transition-colors flex items-center gap-2">
                  Start Building <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 left-0 right-0 z-10">
          <div className="container-custom">
            <div className="flex items-center justify-between gap-12 opacity-40">
              <div className="text-white text-3xl font-bold">AMD</div>
              <div className="text-white text-2xl font-light">rescale</div>
              <div className="text-white text-2xl font-bold tracking-wider">ARKON ENERGY</div>
              <div className="text-white text-3xl font-light">Kog</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0D1117]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                gradient: 'from-purple-900/60 via-blue-900/40 to-indigo-900/60',
                title: 'BluBrg announces $500M Series B funding round',
                pattern: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)'
              },
              { 
                gradient: 'from-blue-900/60 via-cyan-900/40 to-teal-900/60',
                title: 'Expanding infrastructure across three continents',
                pattern: 'radial-gradient(circle at 60% 30%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 70%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)'
              },
              { 
                gradient: 'from-indigo-900/60 via-violet-900/40 to-purple-900/60',
                title: 'New partnership with leading AI research labs',
                pattern: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(109, 40, 217, 0.3) 0%, transparent 50%)'
              }
            ].map((item, i) => (
              <Card key={i} className="bg-[#161B22] border-[#30363D] hover:border-[#0066FF]/50 transition-all duration-300 overflow-hidden group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                  <div 
                    className="absolute inset-0 opacity-60" 
                    style={{ background: item.pattern }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] to-transparent opacity-60" />
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%), linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.02) 75%)',
                    backgroundSize: '60px 60px',
                    backgroundPosition: '0 0, 30px 30px'
                  }} />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-white text-lg font-medium group-hover:text-[#0066FF] transition-colors">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <h2 className="text-5xl font-light text-white mb-8">A full-stack AI cloud</h2>
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                From bare metal to managed services, BluBrg delivers comprehensive infrastructure for every stage of the AI lifecycle. Train massive models, deploy production inference endpoints, and scale effortlessly.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[<Cpu />, <Zap />, <Database />, <Globe />].map((Icon, i) => (
                <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/40">
                  {Icon}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
              {[<Shield />, <Clock />, <Zap />, <Globe />].map((Icon, i) => (
                <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/40">
                  {Icon}
                </div>
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl font-light text-white mb-8">Built for compliance</h2>
              <p className="text-xl text-white/70 leading-relaxed">
                Enterprise-grade security and compliance built into every layer. SOC 2, ISO 27001 certified infrastructure with data sovereignty options and dedicated support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0D1117]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { title: 'Serverless Inference', desc: 'Deploy models instantly' },
              { title: 'Training Clusters', desc: 'Massive scale training' },
              { title: 'GPU Nodes', desc: 'Bare metal performance' },
              { title: 'Private Cloud', desc: 'Dedicated infrastructure', highlight: true }
            ].map((item, i) => (
              <Card key={i} className={`${item.highlight ? 'bg-gradient-to-br from-[#0066FF]/20 to-[#0066FF]/5 border-[#0066FF]' : 'bg-[#161B22] border-[#30363D]'} hover:scale-105 transition-all duration-300`}>
                <CardContent className="p-8">
                  <h3 className="text-white text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl font-light text-white mb-16 text-center">Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { quote: 'BluBrg infrastructure enabled us to scale our training by 10x while reducing costs significantly.', name: 'Sarah Chen', role: 'ML Director' },
              { quote: 'The platform abstraction and automation saved our team months of infrastructure work.', name: 'Marcus Rodriguez', role: 'VP Engineering' },
              { quote: 'Reliable, fast, and the support team understands AI workloads deeply.', name: 'Dr. Aisha Patel', role: 'Research Lead' }
            ].map((item, i) => (
              <div key={i} className="border-l-2 border-white/10 pl-8">
                <p className="text-white/80 italic mb-6 text-lg leading-relaxed">"{item.quote}"</p>
                <div className="text-white font-medium">{item.name}</div>
                <div className="text-white/50 text-sm">{item.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0D1117]">
        <div className="container-custom">
          <h2 className="text-4xl font-light text-white mb-16">Use cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                title: 'Model Training', 
                color: 'from-purple-900/50 via-indigo-900/40 to-violet-900/50', 
                metrics: '10x faster',
                pattern: 'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
                accent: '#8B5CF6'
              },
              { 
                title: 'AI & ML Inference', 
                color: 'from-blue-900/50 via-cyan-900/40 to-sky-900/50', 
                metrics: '<50ms latency',
                pattern: 'radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.4) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)',
                accent: '#06B6D4'
              },
              { 
                title: 'Model Fine-Tuning', 
                color: 'from-orange-900/50 via-amber-900/40 to-yellow-900/50', 
                metrics: 'Serverless',
                pattern: 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.3) 0%, transparent 50%)',
                accent: '#F97316'
              },
              { 
                title: 'AI Development', 
                color: 'from-emerald-900/50 via-teal-900/40 to-green-900/50', 
                metrics: 'Full control',
                pattern: 'radial-gradient(circle at 30% 70%, rgba(16, 185, 129, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)',
                accent: '#10B981'
              }
            ].map((item, i) => (
              <div key={i} className={`relative h-80 bg-gradient-to-br ${item.color} rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-300`}>
                <div 
                  className="absolute inset-0 opacity-70" 
                  style={{ background: item.pattern }}
                />
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(30deg, rgba(255,255,255,0.03) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.03) 87.5%, rgba(255,255,255,0.03)), linear-gradient(150deg, rgba(255,255,255,0.03) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.03) 87.5%, rgba(255,255,255,0.03))',
                  backgroundSize: '80px 140px'
                }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-10">
                  <h3 className="text-3xl font-medium text-white mb-3 group-hover:scale-105 transition-transform duration-300">{item.title}</h3>
                  <div className="inline-block px-4 py-2 rounded-lg font-semibold text-sm" style={{ backgroundColor: `${item.accent}20`, color: item.accent }}>
                    {item.metrics}
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-white/10 rounded-2xl group-hover:border-[#0066FF]/60 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0A1F3D] border-y border-white/10">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-light text-white mb-3">BluBrg is now an NVIDIA Preferred Partner</h2>
              <div className="flex gap-4">
                <Link to="/contact">
                  <Button className="bg-white hover:bg-white/90 text-[#0A1F3D]">Learn More</Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">Follow Us</Button>
                </Link>
              </div>
            </div>
            <div className="text-6xl font-bold text-white/20">NVIDIA</div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-r from-[#0066FF] to-[#0052CC]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-light text-white mb-8">Access thousands of GPUs tailored to your requirements</h2>
          <div className="flex gap-4 justify-center">
            <Link to="/products/training">
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