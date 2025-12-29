import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Check, ChevronRight, Cpu, Database, Zap, Shield, Globe, Server } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

// Home1 Hero Blob Component - Animated 3D organic shape
const Home1HeroBlob = () => {
  const canvasRef = useRef(null);
  
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
    
    resize();
    window.addEventListener('resize', resize);
    
    const drawBlob = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.35;
      
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient
      const gradient = ctx.createRadialGradient(
        centerX - baseRadius * 0.3, 
        centerY - baseRadius * 0.3, 
        0, 
        centerX, 
        centerY, 
        baseRadius * 1.5
      );
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.9)');
      gradient.addColorStop(0.3, 'rgba(59, 130, 246, 0.8)');
      gradient.addColorStop(0.6, 'rgba(16, 185, 129, 0.6)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.3)');
      
      // Draw organic blob shape
      ctx.beginPath();
      const points = 8;
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const wave1 = Math.sin(time * 0.5 + angle * 2) * 20;
        const wave2 = Math.cos(time * 0.3 + angle * 3) * 15;
        const wave3 = Math.sin(time * 0.7 + angle * 4) * 10;
        const radius = baseRadius + wave1 + wave2 + wave3;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevAngle = ((i - 1) / points) * Math.PI * 2;
          const prevWave1 = Math.sin(time * 0.5 + prevAngle * 2) * 20;
          const prevWave2 = Math.cos(time * 0.3 + prevAngle * 3) * 15;
          const prevWave3 = Math.sin(time * 0.7 + prevAngle * 4) * 10;
          const prevRadius = baseRadius + prevWave1 + prevWave2 + prevWave3;
          const prevX = centerX + Math.cos(prevAngle) * prevRadius;
          const prevY = centerY + Math.sin(prevAngle) * prevRadius;
          
          const cpX = (prevX + x) / 2 + Math.sin(time + angle) * 10;
          const cpY = (prevY + y) / 2 + Math.cos(time + angle) * 10;
          ctx.quadraticCurveTo(cpX, cpY, x, y);
        }
      }
      ctx.closePath();
      
      // Add glow effect
      ctx.shadowColor = 'rgba(139, 92, 246, 0.5)';
      ctx.shadowBlur = 60;
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Inner highlight
      ctx.shadowBlur = 0;
      const innerGradient = ctx.createRadialGradient(
        centerX - baseRadius * 0.2, 
        centerY - baseRadius * 0.2, 
        0, 
        centerX, 
        centerY, 
        baseRadius * 0.8
      );
      innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      innerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      innerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const wave1 = Math.sin(time * 0.5 + angle * 2) * 15;
        const wave2 = Math.cos(time * 0.3 + angle * 3) * 10;
        const radius = baseRadius * 0.7 + wave1 + wave2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = innerGradient;
      ctx.fill();
      
      time += 0.015;
      animationFrame = requestAnimationFrame(drawBlob);
    };
    
    drawBlob();
    
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

const Home1 = () => {
  useDocumentTitle('BluBrg - Enterprise AI Infrastructure');
  
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const partnerLogos = [
    { name: 'NVIDIA', opacity: 0.6 },
    { name: 'Microsoft', opacity: 0.6 },
    { name: 'AWS', opacity: 0.6 },
    { name: 'Google Cloud', opacity: 0.6 },
    { name: 'Meta', opacity: 0.6 }
  ];
  
  const solutions = [
    {
      title: 'Model Training',
      description: 'High-performance GPU clusters optimized for training foundation models and custom AI systems at scale.',
      icon: Cpu
    },
    {
      title: 'Enterprise Inference',
      description: 'Deploy and serve AI models with low latency and high throughput for production workloads.',
      icon: Zap
    },
    {
      title: 'Data Infrastructure',
      description: 'Secure, compliant data pipelines and storage solutions designed for enterprise AI workflows.',
      icon: Database
    }
  ];
  
  const agenticSolutions = [
    {
      title: 'AI Solutions for Defense & Intelligence',
      subtitle: 'Public Sector',
      description: 'Secure, sovereign AI infrastructure meeting the highest compliance standards for government and defense applications.',
      features: ['FedRAMP Ready', 'Air-gapped Deployments', 'Classified Workloads']
    },
    {
      title: 'Enterprise AI Transformation',
      subtitle: 'Enterprise',
      description: 'End-to-end AI infrastructure enabling organizations to build, deploy, and scale AI applications across their operations.',
      features: ['Custom Model Training', 'Production Deployment', 'Managed Services']
    }
  ];
  
  const researchAreas = [
    {
      title: 'Performance Benchmarks',
      category: 'Infrastructure',
      description: 'Comprehensive GPU cluster performance evaluation for AI workloads.'
    },
    {
      title: 'Sustainability Metrics',
      category: 'Green Computing',
      description: 'Carbon-neutral AI computing powered by 100% renewable energy.'
    },
    {
      title: 'Security Framework',
      category: 'Compliance',
      description: 'Enterprise-grade security for sensitive AI workloads and data.'
    }
  ];
  
  const caseStudies = [
    {
      category: 'Partnership',
      title: 'BluBrg Partners with NVIDIA for Next-Gen GPU Infrastructure',
      description: 'Strategic collaboration to deliver cutting-edge AI compute capabilities.'
    },
    {
      category: 'Case Study',
      title: 'How Leading Enterprises Scale AI with BluBrg',
      description: 'Real-world implementations driving business transformation.'
    },
    {
      category: 'Research',
      title: 'The Future of Sustainable AI Computing',
      description: 'Our commitment to carbon-neutral AI infrastructure.'
    },
    {
      category: 'Blog',
      title: 'Best Practices for Enterprise AI Deployment',
      description: 'Expert guidance for production AI systems.'
    }
  ];
  
  const certifications = [
    { name: 'ISO 27001', icon: Shield },
    { name: 'SOC 2', icon: Check },
    { name: 'GDPR', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-[#F3F1E9] font-['DM_Sans']">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#F3F1E9]">
        
        {/* Animated blob - right side */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50%] h-[80%] opacity-60">
          <Home1HeroBlob />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-[#0B1F3B]">
              Advanced AI Infrastructure
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                from Cloud to Deployment
              </span>
            </h1>
            <p className="text-xl text-[#243447] mb-10 leading-relaxed max-w-2xl">
              BluBrg provides enterprise-grade GPU infrastructure, enabling organizations to train, fine-tune, and deploy AI models at any scale with unmatched performance and reliability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact/sales">
                <Button size="lg" className="bg-[#0B1F3B] hover:bg-[#162B4D] text-white px-8 py-6 text-base font-semibold rounded-md">
                  Book a Demo
                </Button>
              </Link>
              <Link to="/products/training">
                <Button size="lg" variant="outline" className="border-[#0B1F3B] text-[#0B1F3B] hover:bg-[#0B1F3B]/10 px-8 py-6 text-base font-semibold rounded-md">
                  Explore Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partner Logos Strip */}
      <section className="py-16 border-t border-[#D6DEC3]">
        <div className="container-custom">
          <p className="text-center text-[#5B6B7A] text-sm mb-10">
            Trusted by leading AI companies, government agencies, and enterprises worldwide
          </p>
          <div className="flex justify-center items-center gap-16 flex-wrap">
            {partnerLogos.map((partner, idx) => (
              <div 
                key={idx} 
                className="text-[#5B6B7A] text-xl font-semibold tracking-wider"
                style={{ opacity: partner.opacity }}
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Full-Stack AI Solutions */}
      <section className="py-24 bg-[#F3F1E9]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#0B1F3B]">Full-Stack AI Solutions</h2>
            <p className="text-xl text-[#5B6B7A] max-w-3xl mx-auto">
              Enterprise-ready infrastructure for every stage of the AI lifecycle, from data preparation to production deployment.
            </p>
          </div>
          
          <div className="space-y-12 max-w-4xl mx-auto">
            {solutions.map((solution, idx) => (
              <div key={idx} className="border-b border-[#D6DEC3] pb-12 last:border-0">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-lg bg-[#EEF2DC] flex items-center justify-center flex-shrink-0">
                    <solution.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-[#0B1F3B]">{solution.title}</h3>
                    <p className="text-[#5B6B7A] leading-relaxed">{solution.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Agentic Solutions */}
      <section className="py-24 bg-gradient-to-b from-[#000000] to-[#050510]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">Specialized AI Solutions</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Purpose-built infrastructure solutions for mission-critical AI applications.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {agenticSolutions.map((solution, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
                  {solution.subtitle}
                </span>
                <h3 className="text-2xl font-bold mt-3 mb-4 text-white">{solution.title}</h3>
                <p className="text-white/70 mb-6 leading-relaxed">{solution.description}</p>
                <div className="flex flex-wrap gap-2">
                  {solution.features.map((feature, fidx) => (
                    <span 
                      key={fidx} 
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Research Section */}
      <section className="py-24 bg-[#F3F1E9]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#0B1F3B]">Infrastructure Excellence</h2>
            <p className="text-xl text-[#5B6B7A] max-w-3xl mx-auto">
              Continuous innovation in AI infrastructure, benchmarking, and sustainable computing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {researchAreas.map((area, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-6 border border-[#D6DEC3] hover:border-[#328CC1] transition-all duration-300"
              >
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
                  {area.category}
                </span>
                <h3 className="text-xl font-semibold mt-3 mb-3 text-[#0B1F3B]">{area.title}</h3>
                <p className="text-[#5B6B7A] text-sm leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Powering AI Section */}
      <section className="py-24 bg-gradient-to-b from-[#050510] to-[#000000]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Code/Terminal Window */}
            <div className="bg-[#0a0a0f] rounded-xl border border-white/10 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-4 text-white/40 text-sm">blubrg-cluster.py</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="text-purple-400">from</div>
                <div className="text-white/80 ml-4">blubrg <span className="text-purple-400">import</span> GPUCluster</div>
                <div className="mt-4 text-white/50"># Initialize training cluster</div>
                <div className="text-white/80">cluster = GPUCluster(</div>
                <div className="text-white/70 ml-4">gpus=<span className="text-cyan-400">128</span>,</div>
                <div className="text-white/70 ml-4">type=<span className="text-green-400">"H100"</span>,</div>
                <div className="text-white/70 ml-4">region=<span className="text-green-400">"eu-north-1"</span></div>
                <div className="text-white/80">)</div>
                <div className="mt-4 text-white/50"># Start distributed training</div>
                <div className="text-white/80">cluster.train(model, dataset)</div>
              </div>
            </div>
            
            {/* Content */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
                Powering Next-Generation AI
              </h2>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                World-class infrastructure designed for the most demanding AI workloads. From foundation model training to real-time inference, BluBrg delivers the performance you need.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-white/80">Latest NVIDIA H100 & H200 GPUs</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-white/80">InfiniBand networking for distributed training</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-white/80">100% renewable energy powered</span>
                </div>
              </div>
              <Link to="/products/training">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-24 bg-[#F3F1E9]">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-[#0B1F3B]">
              Trusted by industry leaders transforming their AI capabilities
            </h2>
            <blockquote className="text-2xl lg:text-3xl font-light text-[#243447] leading-relaxed mb-8">
              "BluBrg has been instrumental in accelerating our AI development. Their infrastructure reliability and performance have exceeded our expectations."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
              <div className="text-left">
                <p className="font-semibold text-[#0B1F3B]">Enterprise Customer</p>
                <p className="text-[#5B6B7A] text-sm">Leading Technology Company</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Studies */}
      <section className="py-24 bg-gradient-to-b from-[#000000] to-[#050510]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">Resources & Insights</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Explore our latest partnerships, case studies, and thought leadership.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudies.map((study, idx) => (
              <div 
                key={idx}
                className="bg-white/[0.03] rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
              >
                <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
                  {study.category}
                </span>
                <h3 className="text-lg font-semibold mt-3 mb-3 group-hover:text-purple-300 transition-colors text-white">
                  {study.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{study.description}</p>
                <div className="mt-4 flex items-center text-purple-400 text-sm font-medium">
                  Read More <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Certifications */}
      <section className="py-16 bg-[#F3F1E9] border-t border-[#D6DEC3]">
        <div className="container-custom">
          <p className="text-center text-[#5B6B7A] text-sm mb-8 uppercase tracking-wider">
            Our infrastructure is certified compliant with industry standards
          </p>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[#5B6B7A]">
                <cert.icon className="w-5 h-5" />
                <span className="font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-[#050510] to-[#000000]">
        <div className="container-custom text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight text-white">
            The future of AI infrastructure
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              starts here
            </span>
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Join the world's leading organizations building on BluBrg's enterprise AI platform.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/contact/sales">
              <Button size="lg" className="bg-white hover:bg-white/90 text-black px-8 py-6 text-base font-semibold rounded-md">
                Book a Demo
              </Button>
            </Link>
            <Link to="/products/training">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-md">
                Explore Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home1;
