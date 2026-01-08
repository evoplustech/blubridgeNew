import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, ArrowLeft, Plus, Minus, Check, ChevronLeft, ChevronRight, Star, Radio, ShieldCheck, GraduationCap, Scale, Code2, Factory, Landmark, HeartPulse } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useEmblaCarousel from 'embla-carousel-react';

// Testimonials Carousel Component
const TestimonialsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    skipSnaps: false,
    containScroll: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const clientTestimonials = [
    {
      name: "Brent McCarthy",
      title: "CEO & Co-Founder",
      company: "Myka LLC",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      text: "Not only is the team fully capable of delivering exactly what we needed, but they also execute with impressive speed. They resolved critical issues left by previous vendors and implemented a custom AI-driven solution that transformed our product into a scalable, market-ready platform within months."
    },
    {
      name: "Ananya Rao",
      title: "Head of Digital Transformation",
      company: "FinAxis Technologies",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      text: "Their technical depth and clarity in execution stood out from day one. From architecture decisions to final deployment, everything was handled with precision. The AI infrastructure they built significantly reduced our processing time and operational costs."
    },
    {
      name: "Michael Turner",
      title: "Director of Engineering",
      company: "CloudNova Systems",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      text: "We partnered with them for a high-performance AI workload deployment, and the results exceeded expectations. The solution was stable, secure, and future-proof. Their team communicates clearly and delivers without delays."
    },
    {
      name: "Priya Mehta",
      title: "Product Lead",
      company: "DataSpring Labs",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      text: "What impressed us most was their ability to understand our business problem and translate it into a reliable AI solution. The final output was not only technically sound but also aligned perfectly with our product roadmap."
    },
    {
      name: "Daniel Foster",
      title: "VP of Innovation",
      company: "NexaCore Solutions",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      text: "The team brought structure, scalability, and performance to our AI initiatives. Their approach to deployment and optimization helped us launch faster while maintaining enterprise-grade reliability."
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 overflow-hidden bg-[#fffdf7]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0B1F3B] mb-16">
          Let Our Clients Do the Talking
        </h2>
        
        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button 
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden mx-12" ref={emblaRef}>
            <div className="flex">
              {clientTestimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_40%] px-4"
                >
                  <div 
                    className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 h-full ${
                      selectedIndex === index ? 'scale-100 opacity-100' : 'scale-95 opacity-60'
                    }`}
                  >
                    {/* Header with Avatar and Clutch Badge */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-[#0B1F3B] text-lg">{testimonial.name}</h4>
                          <p className="text-gray-500 text-sm">{testimonial.title}, {testimonial.company}</p>
                        </div>
                      </div>
                      
                      {/* Clutch Badge */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Reviewed on</p>
                        <p className="font-bold text-[#0B1F3B] text-xl tracking-tight" style={{ fontFamily: 'serif' }}>Clutch</p>
                        <div className="flex gap-0.5 justify-end mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#FF5A36] text-[#FF5A36]" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Testimonial Text */}
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                      {testimonial.text}
                    </p>
                    
                    {/* Quote Mark */}
                    <div className="flex justify-end mt-6">
                      <span className="text-6xl text-gray-200 font-serif leading-none">"</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedIndex === index 
                    ? 'bg-[#328CC1] w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AIExpertiseOrbit = () => {
  const rings = [
    { key: 1, className: 'orbit-1', radius: '105px' },
    { key: 2, className: 'orbit-2', radius: '155px' },
    { key: 3, className: 'orbit-3', radius: '212px' }
  ];

  const atoms = [
    // INNER ring: 2 features + 1 dummy
    { ring: 1, type: 'feature', sizeClass: 'atom--inner', angle: 225, Icon: Radio, label: 'Telco' },
    { ring: 1, type: 'feature', sizeClass: 'atom--inner', angle: 35, Icon: ShieldCheck, label: 'Finance' },
    { ring: 1, type: 'dummy', angle: 135, dummyClass: 'dummy-blue' },

    // MIDDLE ring: 2 features + 1 dummy
    { ring: 2, type: 'feature', sizeClass: 'atom--mid', angle: 310, Icon: GraduationCap, label: 'Education' },
    { ring: 2, type: 'feature', sizeClass: 'atom--mid', angle: 190, Icon: HeartPulse, label: 'Healthcare' },
    { ring: 2, type: 'dummy', angle: 230, dummyClass: 'dummy-orange' },

    // OUTER ring: 4 features + 2 dummies
    { ring: 3, type: 'feature', sizeClass: 'atom--outer', angle: 70, Icon: Scale, label: 'Legal' },
    { ring: 3, type: 'feature', sizeClass: 'atom--outer', angle: 140, Icon: Code2, label: 'Software' },
    { ring: 3, type: 'feature', sizeClass: 'atom--outer', angle: 260, Icon: Factory, label: 'Manufacturing' },
    { ring: 3, type: 'feature', sizeClass: 'atom--outer', angle: 350, Icon: Landmark, label: 'Government' },
    { ring: 3, type: 'dummy', angle: 30, dummyClass: 'dummy-blue' },
    { ring: 3, type: 'dummy', angle: 215, dummyClass: 'dummy-orange' }
  ];

  return (
    <div className="orbit-container relative w-[520px] h-[520px]">
      {/* SVG tracks (must match 520x520 viewBox to avoid drift) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520" aria-hidden="true">
        <circle className="track" cx="260" cy="260" r="105" />
        <circle className="track" cx="260" cy="260" r="155" />
        <circle className="track" cx="260" cy="260" r="212" />
      </svg>

      {/* Center badge */}
      <div className="center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#DBD6C4]">
        <span className="text-white text-xs font-medium text-center leading-tight">
        <img width="30px" src="/images/b-center.png"/>
        </span>
      </div>

      {/* Rings + atoms */}
      {rings.map((ring) => (
        <div key={ring.key} className={`orbit ${ring.className}`} style={{ '--radius': ring.radius }}>
          {atoms
            .filter((a) => a.ring === ring.key)
            .map((a, idx) => {
              const styleVars = { '--angle': `${a.angle}deg`, '--angleNeg': `${-a.angle}deg` };

              if (a.type === 'dummy') {
                return (
                  <div
                    key={idx}
                    className={`atom dummy ${a.dummyClass}`}
                    style={styleVars}
                    aria-hidden="true"
                  >
                    <div className="atom-anchor">
                      <div className="dummy-dot" />
                    </div>
                  </div>
                );
              }

              const Icon = a.Icon;
              return (
                <div key={idx} className={`atom ${a.sizeClass}`} style={styleVars}>
                  <div className="atom-anchor">
                    <div className="atom-angle-fix">
                      {/* This inner node counter-rotates via CSS so labels stay upright */}
                      <div className="atom-spin-fix">
                        <div className="atom-content">
                          <div className="atom-icon">
                            <Icon className="atom-icon-svg" strokeWidth={1.5} />
                          </div>
                          <div className="atom-label">{a.label}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeInfraTab, setActiveInfraTab] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const newsItems = [
    {
      date: "01 June, 2025",
      title: "BluBridge Closes Oversubscribed $500M Series B to Scale AI Infrastructure",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80"
    },
    {
      date: "21 May, 2025",
      title: "BluBridge Expands European Operations with New Data Center in Norway",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80"
    },
    {
      date: "15 May, 2025",
      title: "BluBridge Named NVIDIA Preferred Partner for AI Cloud Infrastructure",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&q=80"
    }
  ];

  const infraTabs = [
    {
      name: "Datacenters",
      title: "Purpose-built for AI",
      description: "BluBridge's Arctic data centers are engineered specifically for the intensive energy demands of GPU-based AI computing, utilizing 100% renewable hydroelectric power.",
      features: ["100% Renewable Energy", "Arctic cooling advantage", "Scalable infrastructure", "Sovereign data hosting"],
      link : '/products/glomfjord'
    },
    {
      name: "GPU Nodes",
      title: "High-performance compute",
      description: "Access the latest NVIDIA GPUs including H100, H200, and GB200 NVL72, optimized for AI training and inference workloads.",
      features: ["NVIDIA Grace Blackwell", "On-demand access", "Optimized for AI/HPC", "Bare-metal performance"],
      link : '/products/gpu-nodes'
    },
    {
      name: "Networking",
      title: "GPU fabric optimized for AI",
      description: "High-bandwidth, low-latency networking built for distributed AI training and inference at scale.",
      features: ["RoCE enabled", "Non-blocking design", "400Gbps InfiniBand", "Built for AI scale"],
      link : '/products/gpu-nodes'
    },
    {
      name: "Storage",
      title: "Fast storage for AI workloads",
      description: "High-performance parallel filesystems ensure GPUs are kept busy and fully utilized during training and inference.",
      features: ["RDMA enabled", "Parallel filesystems", "AI storage platform", "Fast checkpointing"],
      link : '/products/gpu-nodes'
    },
    {
      name: "Kubernetes",
      title: "Container orchestration at scale",
      description: "Robust Kubernetes infrastructure for deploying, managing, and scaling containerized AI workloads efficiently.",
      features: ["Bare metal performance", "Auto-scale to 1000s GPUs", "Fully managed", "Native GPU support"],
      link : '/products/training'
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
      question: "What makes BluBridge different from other cloud providers?",
      answer: "BluBridge is purpose-built for AI from the ground up. Unlike general-purpose cloud providers, our infrastructure is optimized specifically for AI workloads with latest NVIDIA GPUs, high-bandwidth networking, and 100% renewable energy. We offer up to 80% cost savings and zero rate limits."
    },
    {
      question: "What GPU options are available?",
      answer: "We offer the latest NVIDIA GPUs including H100, H200, and the new GB200 NVL72 Blackwell architecture. All GPUs are available on-demand with bare-metal performance and can scale from single GPUs to thousands of nodes."
    },
    {
      question: "How does BluBridge ensure sustainability?",
      answer: "All our data centers are powered by 100% renewable hydroelectric energy in Norway. Our Arctic location provides natural cooling advantages, significantly reducing our environmental footprint compared to traditional data centers."
    },
    {
      question: "What support is available for enterprise customers?",
      answer: "Enterprise customers receive dedicated support including 24/7 technical assistance, dedicated account management, custom SLAs, and access to our AI solutions architects for architecture review and optimization."
    },
    {
      question: "Can I try BluBridge before committing?",
      answer: "Yes! We offer free trials and proof-of-concept deployments. Contact our sales team to discuss your specific requirements and get started with a customized evaluation plan."
    }
  ];

  useDocumentTitle('Beyond the Horizon | BluBridge');

  // Neural Network Canvas Initialization
  useEffect(() => {
    const canvas = document.getElementById('neural-network-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const section = canvas.parentElement;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Neural network nodes
    const nodes = [];
    const nodeCount = 40;
    
    // Initialize nodes with random positions
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() < 0.8 ? (3 + Math.random()) : (5 + Math.random()), // 80% small, 20% hub
        opacity: 0.5 + Math.random() * 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.3, // Slow drift
        vy: (Math.random() - 0.5) * 0.3
      });
    }
    
    // Mouse position
    let mouseX = -1000;
    let mouseY = -1000;
    const hoverRadius = 150;
    
    // Ambient connections (static)
    const ambientConnections = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && ambientConnections.length < 12) {
          ambientConnections.push({ i, j });
        }
      }
    }
    
    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update node positions (slow drift)
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += 0.02;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });
      
      // Draw ambient connections (faint)
      ctx.strokeStyle = 'rgba(208, 208, 208, 0.18)';
      ctx.lineWidth = 0.5;
      ambientConnections.forEach(conn => {
        ctx.beginPath();
        ctx.moveTo(nodes[conn.i].x, nodes[conn.i].y);
        ctx.lineTo(nodes[conn.j].x, nodes[conn.j].y);
        ctx.stroke();
      });
      
      // Draw hover connections (bright blue)
      nodes.forEach(node => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < hoverRadius) {
          const opacity = 0.5 * (1 - dist / hoverRadius);
          ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = 'rgba(59, 130, 246, 0.35)';
          ctx.shadowBlur = 3;
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
          ctx.shadowBlur = 0;
          
          // Brighten node on hover
          node.hoverBrightness = 1;
        } else {
          node.hoverBrightness = Math.max(0, (node.hoverBrightness || 0) - 0.05);
        }
      });
      
      // Draw nodes
      nodes.forEach(node => {
        const pulse = Math.sin(node.pulsePhase) * 0.1 + 1;
        const brightness = node.opacity + (node.hoverBrightness || 0) * 0.4;
        
        // Glow effect
        ctx.shadowColor = `rgba(255, 255, 255, ${brightness * 0.3})`;
        ctx.shadowBlur = 4;
        
        ctx.fillStyle = `rgba(224, 224, 224, ${brightness})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Mouse event handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fffdf7] text-[#0B1F3B] font-['DM_Sans']">
      {/* Hero Section - Section 1 (ODD) - Dark Space Theme with Parallelograms & Neural Network */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-neural-section">
        {/* LAYER 0: Dark Space Background (KEEP AS-IS - DO NOT MODIFY) */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 85% 85% at 15% 95%, rgba(30, 25, 70, 0.95) 0%, transparent 55%),
              radial-gradient(ellipse 75% 70% at 50% 50%, rgba(60, 45, 100, 0.65) 0%, transparent 60%),
              radial-gradient(ellipse 55% 45% at 88% 12%, rgba(180, 100, 55, 0.4) 0%, transparent 50%),
              linear-gradient(140deg, #0f0d1a 0%, #1a1535 25%, #251850 45%, #2a1a48 65%, #1f1530 85%, #12101d 100%)
            `
          }}
        />
        
        {/* LAYER 1: Neural Network Canvas (Interactive) */}
        <canvas id="neural-network-canvas" className="absolute inset-0 w-full h-full pointer-events-auto" style={{ zIndex: 20 }} />
        
        {/* LAYER 2: FAR DEPTH Parallelograms (Background - Blurred, Low Opacity) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
          <div className="hero-para-far-1 absolute" style={{
            right: '5%', top: '15%',
            width: '200px', height: '120px',
            border: '1.5px solid rgba(201, 160, 107, 0.3)',
            transform: 'perspective(500px) rotateY(-25deg) rotateZ(8deg)',
            filter: 'blur(1.5px)'
          }} />
          <div className="hero-para-far-2 absolute" style={{
            right: '-5%', top: '55%',
            width: '180px', height: '110px',
            border: '1.5px solid rgba(201, 160, 107, 0.28)',
            transform: 'perspective(500px) rotateY(30deg) rotateZ(-5deg)',
            filter: 'blur(1px)'
          }} />
          <div className="hero-para-far-3 absolute" style={{
            right: '25%', top: '-8%',
            width: '220px', height: '130px',
            border: '1.5px solid rgba(201, 160, 107, 0.25)',
            transform: 'perspective(500px) rotateY(-35deg) rotateZ(12deg)',
            filter: 'blur(2px)'
          }} />
        </div>
        
        {/* LAYER 3: MID DEPTH Parallelograms (Medium Opacity) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 10 }}>
          <div className="hero-para-mid-1 absolute" style={{
            right: '15%', top: '25%',
            width: '400px', height: '250px',
            border: '1.5px solid rgba(212, 165, 116, 0.5)',
            transform: 'perspective(600px) rotateY(-30deg) rotateZ(6deg)',
            boxShadow: '0 0 20px rgba(201, 160, 107, 0.1)'
          }} />
          <div className="hero-para-mid-2 absolute" style={{
            right: '-10%', top: '35%',
            width: '350px', height: '220px',
            border: '1.5px solid rgba(212, 165, 116, 0.45)',
            transform: 'perspective(600px) rotateY(25deg) rotateZ(-8deg)',
            boxShadow: '0 0 15px rgba(201, 160, 107, 0.08)'
          }} />
          <div className="hero-para-mid-3 absolute" style={{
            right: '30%', top: '60%',
            width: '320px', height: '200px',
            border: '1.5px solid rgba(212, 165, 116, 0.4)',
            transform: 'perspective(600px) rotateY(-20deg) rotateZ(10deg)'
          }} />
          <div className="hero-para-mid-4 absolute" style={{
            right: '5%', top: '75%',
            width: '380px', height: '240px',
            border: '1.5px solid rgba(212, 165, 116, 0.42)',
            transform: 'perspective(600px) rotateY(35deg) rotateZ(-4deg)'
          }} />
        </div>
        
        {/* LAYER 4: NEAR DEPTH Parallelograms (Foreground - High Opacity) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 30 }}>
          <div className="hero-para-near-1 absolute" style={{
            right: '8%', top: '10%',
            width: '650px', height: '400px',
            border: '2px solid rgba(212, 165, 116, 0.65)',
            transform: 'perspective(800px) rotateY(-28deg) rotateZ(5deg)',
            boxShadow: '0 0 30px rgba(201, 160, 107, 0.15)'
          }} />
          <div className="hero-para-near-2 absolute" style={{
            right: '-15%', top: '45%',
            width: '550px', height: '350px',
            border: '2px solid rgba(212, 165, 116, 0.6)',
            transform: 'perspective(800px) rotateY(32deg) rotateZ(-7deg)',
            boxShadow: '0 0 25px rgba(201, 160, 107, 0.12)'
          }} />
          <div className="hero-para-near-3 absolute" style={{
            right: '20%', top: '70%',
            width: '500px', height: '320px',
            border: '2px solid rgba(212, 165, 116, 0.55)',
            transform: 'perspective(800px) rotateY(-22deg) rotateZ(9deg)'
          }} />
        </div>
        
        {/* LAYER 5: Accent Parallelograms */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 8 }}>
          <div className="hero-para-accent-1 absolute" style={{
            right: '45%', top: '5%',
            width: '280px', height: '170px',
            border: '1.5px solid rgba(201, 160, 107, 0.35)',
            transform: 'perspective(550px) rotateY(28deg) rotateZ(-10deg)',
            filter: 'blur(0.5px)'
          }} />
          <div className="hero-para-accent-2 absolute" style={{
            right: '55%', top: '80%',
            width: '250px', height: '150px',
            border: '1.5px solid rgba(201, 160, 107, 0.32)',
            transform: 'perspective(550px) rotateY(-32deg) rotateZ(6deg)',
            filter: 'blur(1px)'
          }} />
        </div>
        
        {/* LAYER 6: Content (100% STATIC - Always on top) */}
        <div className="container-custom relative py-24" style={{ zIndex: 100 }}>
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-white drop-shadow-lg">
              Beyond the Horizon<br></br>
            </h1>
            <p className="text-white/90 text-lg font-light leading-relaxed max-w-md drop-shadow-md">A complete, scalable, and sustainable AI platform.</p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/contact">
                <Button className="bg-white text-[#0B1F3B] hover:bg-white/90 px-8 py-3 rounded font-medium text-base">
                  Reserve GPUs
                </Button>
              </Link>
              <Link to="/contact" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium drop-shadow-md">
                Start Building <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 360° Rotating Circular Expertise Section - Below Hero */}
    
        
        <style>{`
          .rotating-expertise-ring {
            animation: rotateExpertiseRing 50s linear infinite;
          }
          
          @keyframes rotateExpertiseRing {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          /* Counter-rotate labels to keep them upright */
          .rotating-expertise-label {
            animation: counterRotateLabel 50s linear infinite;
          }
          
          @keyframes counterRotateLabel {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(-360deg);
            }
          }
        `}</style>
     
      {/* News/Updates Strip (commented out)
        <section className="py-12 bg-[#fffdf7] border-t border-[#D6DEC3]">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-medium text-[#0B1F3B]">Latest News</h3>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-[#D6DEC3] flex items-center justify-center hover:bg-[#f3f1e9] transition-colors">
                <ChevronLeft className="w-5 h-5 text-[#0B1F3B]" />
              </button>
              <button className="w-10 h-10 rounded-full border border-[#D6DEC3] flex items-center justify-center hover:bg-[#f3f1e9] transition-colors">
                <ChevronRight className="w-5 h-5 text-[#0B1F3B]" />
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
                <p className="text-sm text-[#5B6B7A] mb-2">{item.date}</p>
                <h4 className="text-[#0B1F3B] font-medium group-hover:text-[#328CC1] transition-colors">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section> */}
     
       
      
      {/* Our AI Expertise Section - Section 2 (EVEN) */}
      <section className="py-20 bg-[#f3f1e9]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Circular Diagram */}
            <div className="relative flex items-center justify-center">
              <AIExpertiseOrbit />    
            </div>
            
            {/* Right - Services Grid */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-8">Our AI Expertise</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Radio, title: "Telco", link: "/solutions/industry/telco" },
                  { icon: ShieldCheck, title: "Finance & Insurance", link: "/solutions/industry/finance-insurance" },
                  { icon: GraduationCap, title: "Education", link: "/solutions/industry/education" },
                  { icon: Scale, title: "Legal", link: "/solutions/industry/legal" },
                  { icon: Code2, title: "Software & Technology", link: "/solutions/industry/software-technology" },
                  { icon: Factory, title: "Manufacturing", link: "/solutions/industry/manufacturing" },
                  { icon: Landmark, title: "Government", link: "/solutions/industry/government" },
                  { icon: HeartPulse, title: "Healthcare", link: "/solutions/industry/healthcare" }
                ].map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                  <Link 
                    to={service.link}
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#D6DEC3] hover:border-[#328CC1] hover:shadow-md transition-all"
                  >
                    <IconComponent className="w-6 h-6 text-[#0B1F3B]" strokeWidth={1.5} />
                    <span className="text-[#0B1F3B] font-medium text-sm">{service.title}</span>
                  </Link>
                )})}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Can Help You Section - Section 3 (ODD) */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-4">How we support you</h2>
            <p className="text-[#243447] max-w-3xl mx-auto leading-relaxed">
                We’re always open to collaborating with diverse teams on projects of any scale or complexity. Through close partnership, we help create innovative systems, solutions, and products that set you apart from the competition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "💡",
                title: "AI consulting",
                description: "Have a project idea and need support bringing it to life? We’re here to guide you with expert consultation and shared insights, helping you steer clear of unnecessary challenges along the way."
              },
              {
                icon: "🔬",
                title: "PoC of AI Solutions",
                description: "A proof of concept is a critical step before implementing any AI solution. If you have a project idea, our data science consultants will assess its feasibility and validate its potential."
              },
              {
                icon: "🚀",
                title: "AI Product",
                description: "Looking to build a breakthrough AI product? We can kick things off with a lean, feature-focused version designed to engage early users and gather valuable feedback to guide future development."
              },
              {
                icon: "⚡",
                title: "Custom Model Development",
                description: "We can design and train custom models tailored to your business requirements, or fine-tune your existing models, both open-source and proprietary, which is to improve performance, efficiency, and scalability."
              },
              {
                icon: "💻",
                title: "Software Development",
                description: "Whether you’re building an innovative web application from the ground up or enhancing an existing one with AI capabilities, our experts are here to support you."
              },
              {
                icon: "📱",
                title: "AI based Application Development",
                description: "Our specialists can help you create an innovative mobile app from the ground up and enhance it with AI features your users will truly appreciate."
              }
            ].map((card, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 border border-[#D6DEC3] hover:border-[#328CC1] hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f3f1e9] flex items-center justify-center mb-4">
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#0B1F3B] mb-3">{card.title}</h3>
                <p className="text-[#243447] text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="text-center">
            <Link to="/contact">
              <Button className="bg-[#0B1F3B] hover:bg-[#162B4D] text-white px-6 py-4 text-base font-medium rounded-lg">
                Talk To Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* BluBridge Infrastructure Section - Section 4 (EVEN) */}
      <section className="py-20 relative overflow-hidden bg-[#f3f1e9]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f3f1e9]/95 via-[#f3f1e9]/80 to-[#f3f1e9]/60" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols gap-12">
            {/* Left - Text and Tabs */}
            <div>
              <h2 className="text-4xl font-light mb-6 text-[#0B1F3B]">BluBridge's Infrastructure</h2>
              <p className="text-[#243447] mb-8 leading-relaxed">
                BluBridge manages the full AI infrastructure stack, from energy-efficient data centres in Norway to advanced compute clusters and software setups. Every component is thoughtfully chosen and engineered to support the demanding requirements of AI.
              </p>
              
              {/* Tab Buttons */}
              <div className="flex flex-wrap gap-2 mb-8">
                {infraTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveInfraTab(index)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeInfraTab === index 
                        ? 'bg-[#0B1F3B] text-white' 
                        : 'bg-white/80 text-[#243447] border border-[#D6DEC3] hover:bg-[#f3f1e9]'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
              
              {/* Active Tab Content */}
              <div className="bg-white rounded-xl p-6 border border-[#D6DEC3] shadow-sm">
                <h3 className="text-xl font-medium mb-3 text-[#0B1F3B]">{infraTabs[activeInfraTab].title}</h3>
                <p className="text-[#243447] mb-4 text-sm leading-relaxed">{infraTabs[activeInfraTab].description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {infraTabs[activeInfraTab].features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#328CC1] flex-shrink-0" />
                      <span className="text-[#243447]">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to={`${infraTabs[activeInfraTab].link}`} className="inline-flex items-center gap-2 text-[#328CC1] hover:text-[#0B3C5D] mt-4 text-sm">
                  See More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Right - Empty for background image */}
            <div />
          </div>
        </div>
      </section>

      {/* New Testimonials Carousel Section */}
      <TestimonialsCarousel />

      {/* Use Cases Grid */}
      {/* <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl mb-4 font-bold text-[#0B1F3B]">Use cases</h2>
            <p className="text-[#243447] max-w-2xl">
              End-to-end AI solutions covering model training, fine-tuning, inference, and development, all built to accelerate your AI initiatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            
            <Link to="/solutions/training">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl">
                <div 
                  className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.07]"
                  style={{ 
                    backgroundImage: 'url(https://customer-assets.emergentagent.com/job_blubrg-webdev/artifacts/e3q02b44_Training.avif)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">TRAINING</span>
                </div>
              </div>
            </Link>

            
            <Link to="/solutions/inference">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl">
                <div 
                  className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.07]"
                  style={{ 
                    backgroundImage: 'url(https://customer-assets.emergentagent.com/job_blubrg-webdev/artifacts/cod8cw4n_INFERENCE.avif)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">INFERENCE</span>
                </div>
              </div>
            </Link>

            
            <Link to="/solutions/ai-development">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl">
                <div 
                  className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.07]"
                  style={{ 
                    backgroundImage: 'url(https://customer-assets.emergentagent.com/job_blubrg-webdev/artifacts/az864l7b_AI%20Development.avif)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">AI DEVELOPMENT</span>
                </div>
              </div>
            </Link>

            
            <Link to="/solutions/fine-tuning">
              <div className="relative h-52 border border-[#D6DEC3] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl">
                <div 
                  className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.07]"
                  style={{ 
                    backgroundImage: 'url(https://customer-assets.emergentagent.com/job_blubrg-webdev/artifacts/g9zwqz1g_Finetuning.avif)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">FINE-TUNING</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section> */}

      {/* NVIDIA Partner Strip - Section 6 (EVEN) */}
      <section className="py-16 bg-[#f3f1e9] border-t border-b border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light mb-4 text-[#0B1F3B]">
                BluBridge is now an NVIDIA Preferred Partner
              </h2>
              <p className="text-[#243447] mb-6">
                Access thousands of GPUs tailored to your requirements.
              </p>
              <div className="flex gap-4">
                <Link to="/contact">
                  <Button className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-6 py-3">
                    Reserve GPUs
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-[#0B1F3B] text-[#0B1F3B] hover:bg-[#f3f1e9] px-6 py-3">
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end gap-8">
              <span className="text-5xl font-bold text-[#0B1F3B]/20 tracking-tight">NVIDIA</span>
              <div className="text-sm text-[#5B6B7A]">Preferred Partner</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {/* <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-light mb-12 text-[#0B1F3B]">Frequently Asked Questions</h2>
          
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border-b border-[#D6DEC3]"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-5 text-left text-[#0B1F3B] hover:text-[#328CC1] transition-colors"
                >
                  <span className="text-lg font-medium pr-8">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-[#328CC1]" />
                    ) : (
                      <Plus className="w-5 h-5 text-[#328CC1]" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[#243447] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Final CTA Strip */}
      <section className="py-16 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white">
            Access thousands of GPUs tailored to your requirements.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-[#0B1F3B] hover:bg-[#f3f1e9] px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium px-6 py-0">
              Contact <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
