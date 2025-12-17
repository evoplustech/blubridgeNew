import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, ArrowLeft, Plus, Minus, Check, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeInfraTab, setActiveInfraTab] = useState(0);
  const canvasRef = useRef(null);

  // Animated 3D curved form for hero
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

    const draw3DForm = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Draw multiple rotating curved forms
      for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.translate(centerX, centerY);
        
        const offset = i * Math.PI * 0.5;
        const rotationX = time * 0.3 + offset;
        const rotationY = time * 0.5 + offset;
        const scale = 1 - i * 0.15;
        
        ctx.rotate(rotationX);
        ctx.scale(scale, scale);

        // Create curved ribbon shape
        const ribbonWidth = Math.min(width, height) * 0.35;
        const ribbonHeight = Math.min(width, height) * 0.15;
        
        // Gradient for 3D effect
        const gradient = ctx.createLinearGradient(-ribbonWidth, -ribbonHeight, ribbonWidth, ribbonHeight);
        gradient.addColorStop(0, `rgba(10, 80, 180, ${0.7 - i * 0.15})`);
        gradient.addColorStop(0.3, `rgba(30, 120, 220, ${0.8 - i * 0.15})`);
        gradient.addColorStop(0.6, `rgba(20, 100, 200, ${0.6 - i * 0.15})`);
        gradient.addColorStop(1, `rgba(5, 40, 100, ${0.4 - i * 0.1})`);

        ctx.beginPath();
        // Top curve
        ctx.moveTo(-ribbonWidth, 0);
        ctx.bezierCurveTo(
          -ribbonWidth, -ribbonHeight * (1 + Math.sin(time + i) * 0.3),
          ribbonWidth, -ribbonHeight * (1 + Math.cos(time + i) * 0.3),
          ribbonWidth, 0
        );
        // Bottom curve
        ctx.bezierCurveTo(
          ribbonWidth, ribbonHeight * (1 + Math.sin(time + i) * 0.2),
          -ribbonWidth, ribbonHeight * (1 + Math.cos(time + i) * 0.2),
          -ribbonWidth, 0
        );
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.fill();

        // Edge highlight
        ctx.strokeStyle = `rgba(100, 180, 255, ${0.3 - i * 0.05})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }

      // Add subtle glow particles
      for (let i = 0; i < 15; i++) {
        const px = centerX + Math.sin(time + i * 0.8) * (width * 0.25);
        const py = centerY + Math.cos(time * 0.6 + i * 0.5) * (height * 0.2);
        const size = 2 + Math.sin(time * 2 + i) * 1;
        
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80, 160, 255, ${0.3 + Math.sin(time + i) * 0.15})`;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(draw3DForm);
    };

    resize();
    window.addEventListener('resize', resize);
    draw3DForm();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const newsItems = [
    {
      date: "01 June, 2025",
      title: "BluBrg Closes Oversubscribed $500M Series B to Scale AI Infrastructure",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80"
    },
    {
      date: "21 May, 2025",
      title: "BluBrg Expands European Operations with New Data Center in Norway",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80"
    },
    {
      date: "15 May, 2025",
      title: "BluBrg Named NVIDIA Preferred Partner for AI Cloud Infrastructure",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&q=80"
    }
  ];

  const infraTabs = [
    {
      name: "Datacenters",
      title: "Purpose-built for AI",
      description: "BluBrg's Arctic data centers are engineered specifically for the intensive energy demands of GPU-based AI computing, utilizing 100% renewable hydroelectric power.",
      features: ["100% Renewable Energy", "Arctic cooling advantage", "Scalable infrastructure", "Sovereign data hosting"]
    },
    {
      name: "GPU Nodes",
      title: "High-performance compute",
      description: "Access the latest NVIDIA GPUs including H100, H200, and GB200 NVL72, optimized for AI training and inference workloads.",
      features: ["NVIDIA Grace Blackwell", "On-demand access", "Optimized for AI/HPC", "Bare-metal performance"]
    },
    {
      name: "Networking",
      title: "GPU fabric optimized for AI",
      description: "High-bandwidth, low-latency networking built for distributed AI training and inference at scale.",
      features: ["RoCE enabled", "Non-blocking design", "400Gbps InfiniBand", "Built for AI scale"]
    },
    {
      name: "Storage",
      title: "Fast storage for AI workloads",
      description: "High-performance parallel filesystems ensure GPUs are kept busy and fully utilized during training and inference.",
      features: ["RDMA enabled", "Parallel filesystems", "AI storage platform", "Fast checkpointing"]
    },
    {
      name: "Kubernetes",
      title: "Container orchestration at scale",
      description: "Robust Kubernetes infrastructure for deploying, managing, and scaling containerized AI workloads efficiently.",
      features: ["Bare metal performance", "Auto-scale to 1000s GPUs", "Fully managed", "Native GPU support"]
    }
  ];

  const testimonials = [
    {
      quote: "AI is transforming the global economy and reshaping the role of renewable energy. With BluBrg, we are supporting infrastructure that is sovereign, scalable, and purpose-built to drive this shift forward.",
      name: "Øyvind Eriksen",
      role: "President & CEO",
      company: "Aker ASA"
    },
    {
      quote: "In just a few months, BluBrg has advanced with clear focus and speed, transforming bold plans into real production capacity and achieving meaningful relevance quickly.",
      name: "Larry Aschebrook",
      role: "Founder & Managing Partner",
      company: "G Squared"
    },
    {
      quote: "BluBrg's full-stack approach to AI infrastructure provides exactly what enterprises need - reliable, scalable, and sustainable compute power built specifically for AI workloads.",
      name: "Sarah Mitchell",
      role: "CTO",
      company: "TechForward Inc"
    }
  ];

  const useCases = [
    {
      title: "TRAINING",
      metrics: [{ value: "80%", label: "Lower Cost" }, { value: "30%", label: "Faster" }],
      gradient: "from-purple-800/60 via-violet-900/50 to-indigo-900/60",
      link: "/solutions/training"
    },
    {
      title: "INFERENCE",
      metrics: [{ value: "7.2X", label: "Performance" }, { value: "+40%", label: "Efficiency" }],
      gradient: "from-slate-800/60 via-gray-900/50 to-zinc-900/60",
      link: "/solutions/inference"
    },
    {
      title: "FINE-TUNING",
      metrics: [{ value: "+40%", label: "Efficiency" }, { value: "30%", label: "Faster" }],
      gradient: "from-emerald-800/60 via-teal-900/50 to-green-900/60",
      link: "/solutions/fine-tuning"
    },
    {
      title: "AI DEVELOPMENT",
      metrics: [{ value: "80%", label: "Lower Cost" }, { value: "30%", label: "Faster" }],
      gradient: "from-amber-800/60 via-orange-900/50 to-yellow-900/60",
      link: "/solutions/ai-development"
    }
  ];

  const faqs = [
    {
      question: "What makes BluBrg different from other cloud providers?",
      answer: "BluBrg is purpose-built for AI from the ground up. Unlike general-purpose cloud providers, our infrastructure is optimized specifically for AI workloads with latest NVIDIA GPUs, high-bandwidth networking, and 100% renewable energy. We offer up to 80% cost savings and zero rate limits."
    },
    {
      question: "What GPU options are available?",
      answer: "We offer the latest NVIDIA GPUs including H100, H200, and the new GB200 NVL72 Blackwell architecture. All GPUs are available on-demand with bare-metal performance and can scale from single GPUs to thousands of nodes."
    },
    {
      question: "How does BluBrg ensure sustainability?",
      answer: "All our data centers are powered by 100% renewable hydroelectric energy in Norway. Our Arctic location provides natural cooling advantages, significantly reducing our environmental footprint compared to traditional data centers."
    },
    {
      question: "What support is available for enterprise customers?",
      answer: "Enterprise customers receive dedicated support including 24/7 technical assistance, dedicated account management, custom SLAs, and access to our AI solutions architects for architecture review and optimization."
    },
    {
      question: "Can I try BluBrg before committing?",
      answer: "Yes! We offer free trials and proof-of-concept deployments. Contact our sales team to discuss your specific requirements and get started with a customized evaluation plan."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-['DM_Sans']">
      {/* Hero Section with Animated 3D Form */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e6d] via-[#0b3c8f] to-[#061a44]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6" style={{ animation: 'fadeInUp 1s ease-out' }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight">
                The hyperscaler<br />engineered for AI
              </h1>
              
              <p className="text-xl text-white/80 font-light leading-relaxed max-w-lg">
                A full-stack, scalable, and sustainable AI cloud platform.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact">
                  <Button className="bg-white text-[#0a2e6d] hover:bg-white/90 px-8 py-3 rounded font-medium text-base">
                    Reserve GPUs
                  </Button>
                </Link>
                <Link to="/contact" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium px-4 py-3">
                  Request Briefing <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Partner Logos */}
              <div className="flex items-center gap-8 pt-8 opacity-40">
                <span className="text-white text-sm font-bold tracking-wider">NVIDIA</span>
                <span className="text-white text-sm font-light">Computacenter</span>
                <span className="text-white text-sm">NOKIA</span>
                <span className="text-white text-sm font-light">Aker</span>
              </div>
            </div>
            
            {/* Right - Animated 3D Visual */}
            <div className="relative h-[400px] lg:h-[500px]">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full"
                style={{ background: 'transparent' }}
              />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* News/Updates Strip */}
      <section className="py-12 bg-[#0a0a0f] border-t border-slate-800/50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-medium">Latest News</h3>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-video rounded-xl overflow-hidden mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <h4 className="text-white font-medium group-hover:text-blue-400 transition-colors">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated AI Platform Section */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom">
          {/* <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
              A fully integrated suite of AI services and compute
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Cut costs, increase revenue, and operate your AI workloads more efficiently with a fully integrated platform. Our platform simplifies the transition from development to production.
            </p>
          </div> */}

          {/* Stacked Feature Blocks */}
          <div className="space-y-24">
            {[
              {
                title: "A fully integrated suite of AI services and compute",
                desc: " Cut costs, increase revenue, and operate your AI workloads more efficiently with a fully integrated platform. Our platform simplifies the transition from development to production.",
                align: "right"
              },
              {
                title: "Serverless model endpoints for inference",
                desc: "Serverless enables smooth, scalable AI inference without the burden of managing infrastructure. It automatically adjusts to demand, delivering low-latency, cost-efficient inference.",
                align: "left"
              },
              {
                title: "Dedicated training clusters ready to go",
                desc: "BluBrg's optimized GPU clusters are built to shorten model training times and improve productivity. Leverage Slurm and Kubernetes for robust infrastructure management.",
                align: "right"
              },
              {
                title: "Setting a new standard for inference",
                desc: "Access high-performance, cost-effective, and auto-scaling infrastructure for AI inference. Every layer of the stack is optimized for both batch and streaming workloads.",
                align: "left"
              },
              {
                title: "Scalable, flexible AI Compute",
                desc: "BluBrg's GPU Nodes provide powerful computing performance designed for AI and high-performance computing workloads, backed by advanced cooling technology.",
                align: "right"
              },           
              {
                title: "Turnkey AI development and deployment",
                desc: "The BluBrg Marketplace provides users with a wide range of AI/ML tools and resources, supporting efficient, scalable model development and seamless deployment.",
                align: "left"
              }
            ].map((block, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${block.align === 'right' ? '' : 'lg:flex-row-reverse'}`}>
                {block.align === 'left' && <div />}
                <div className={block.align === 'left' ? 'lg:text-right' : ''}>
                  <h3 className="text-3xl font-light text-white mb-4">{block.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{block.desc}</p>
                </div>
                {block.align === 'right' && <div />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BluBrg Infrastructure Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Text and Tabs */}
            <div>
              <h2 className="text-4xl font-light mb-6">BluBrg's Infrastructure</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                BluBrg manages the full AI infrastructure stack, from energy-efficient data centres in Norway to advanced compute clusters.
              </p>
              
              {/* Tab Buttons */}
              <div className="flex flex-wrap gap-2 mb-8">
                {infraTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveInfraTab(index)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeInfraTab === index 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
              
              {/* Active Tab Content */}
              <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-medium mb-3">{infraTabs[activeInfraTab].title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{infraTabs[activeInfraTab].description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {infraTabs[activeInfraTab].features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/products/gpu-nodes" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mt-4 text-sm">
                  See More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Right - Empty for background image */}
            <div />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom">
          <h2 className="text-3xl font-light mb-12">Testimonials</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <div key={index} className="border-l-2 border-slate-700 pl-6">
                <p className="text-gray-300 italic mb-6 leading-relaxed text-sm">"{item.quote}"</p>
                <div className="text-white font-medium">{item.name}</div>
                <div className="text-gray-500 text-sm">{item.role}</div>
                <div className="text-gray-600 text-sm">{item.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-light mb-4">Use cases</h2>
            <p className="text-gray-400 max-w-2xl">
              End-to-end AI solutions covering model training, fine-tuning, inference, and development—all built to accelerate your AI initiatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((item, index) => (
              <Link key={index} to={item.link}>
                <div className={`relative h-80 bg-gradient-to-br ${item.gradient} rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-3xl font-light tracking-wider mb-4">{item.title}</h3>
                    <div className="flex gap-3">
                      {item.metrics.map((metric, i) => (
                        <div key={i} className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                          <span className="text-white font-bold">{metric.value}</span>
                          <span className="text-gray-400 text-sm ml-1">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-blue-500/50 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NVIDIA Partner Strip */}
      <section className="py-16 bg-[#0d1117] border-t border-b border-slate-800/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light mb-4">
                BluBrg is now an NVIDIA Preferred Partner
              </h2>
              <p className="text-gray-400 mb-6">
                Access thousands of GPUs tailored to your requirements.
              </p>
              <div className="flex gap-4">
                <Link to="/contact">
                  <Button className="bg-white text-[#0a0a0f] hover:bg-white/90 px-6 py-3">
                    Reserve GPUs
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-6 py-3">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end gap-8">
              <span className="text-5xl font-bold text-white/20 tracking-tight">NVIDIA</span>
              <div className="text-sm text-gray-500">Preferred Partner</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom">
          <h2 className="text-3xl font-light mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border-b border-slate-700/50"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-5 text-left hover:text-blue-400 transition-colors"
                >
                  <span className="text-lg font-medium pr-8">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-8">
            Access thousands of GPUs tailored to your requirements.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors font-medium px-6 py-3">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
