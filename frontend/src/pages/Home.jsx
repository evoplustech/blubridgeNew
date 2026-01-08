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

  // Research Teams with custom SVG icons
  const researchTeams = [
    // INNER ring: Data
    { ring: 1, angle: 270, label: 'Data', color: '#3b82f6', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
          <path d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
        </svg>
      )
    },
    // INNER ring: Compiler  
    { ring: 1, angle: 90, label: 'Compiler', color: '#3b82f6',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
        </svg>
      )
    },
    // MIDDLE ring: Tensor & Operations
    { ring: 2, angle: 315, label: 'Tensor & Operations', color: '#06b6d4',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      )
    },
    // MIDDLE ring: CGAD
    { ring: 2, angle: 180, label: 'CGAD', color: '#3b82f6',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M12 3L2 9l10 6 10-6-10-6z"/>
          <path d="M2 17l10 6 10-6M2 13l10 6 10-6"/>
        </svg>
      )
    },
    // OUTER ring: Tokenizer
    { ring: 3, angle: 45, label: 'Tokenizer', color: '#f59e0b',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
          <rect x="9" y="3" width="6" height="4" rx="1"/>
          <path d="M9 12h6M9 16h6"/>
        </svg>
      )
    },
    // OUTER ring: Distributed Training
    { ring: 3, angle: 225, label: 'Distributed Training', color: '#f59e0b',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <circle cx="12" cy="5" r="3"/>
          <circle cx="5" cy="19" r="3"/>
          <circle cx="19" cy="19" r="3"/>
          <path d="M12 8v4m-4.5 3.5L10 13m7 2.5L14 13"/>
        </svg>
      )
    }
  ];

  // Dummy dots for visual interest
  const dummyDots = [
    { ring: 1, angle: 180, color: '#3b82f6' },
    { ring: 2, angle: 45, color: '#f59e0b' },
    { ring: 2, angle: 270, color: '#06b6d4' },
    { ring: 3, angle: 135, color: '#3b82f6' },
    { ring: 3, angle: 315, color: '#f59e0b' }
  ];

  return (
    <div className="orbit-container relative w-[520px] h-[520px]">
      {/* SVG tracks */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520" aria-hidden="true">
        <circle className="track" cx="260" cy="260" r="105" />
        <circle className="track" cx="260" cy="260" r="155" />
        <circle className="track" cx="260" cy="260" r="212" />
      </svg>

      {/* Center badge with B logo */}
      <div className="center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#DBD6C4]">
        <span className="text-white text-xs font-medium text-center leading-tight">
          <img width="30px" src="/images/b-center.png" alt="BluBridge"/>
        </span>
      </div>

      {/* Rings with research team bubbles */}
      {rings.map((ring) => (
        <div key={ring.key} className={`orbit ${ring.className}`} style={{ '--radius': ring.radius }}>
          {/* Research Team Bubbles */}
          {researchTeams
            .filter((team) => team.ring === ring.key)
            .map((team, idx) => {
              const styleVars = { '--angle': `${team.angle}deg`, '--angleNeg': `${-team.angle}deg` };
              return (
                <div key={idx} className="atom atom--research" style={styleVars}>
                  <div className="atom-anchor">
                    <div className="atom-angle-fix">
                      <div className="atom-spin-fix">
                        <div className="atom-content-research" style={{ borderColor: team.color }}>
                          <div className="atom-icon-research" style={{ color: team.color }}>
                            {team.icon}
                          </div>
                          <div className="atom-label-research">{team.label}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          
          {/* Dummy dots */}
          {dummyDots
            .filter((dot) => dot.ring === ring.key)
            .map((dot, idx) => {
              const styleVars = { '--angle': `${dot.angle}deg`, '--angleNeg': `${-dot.angle}deg` };
              return (
                <div
                  key={`dot-${idx}`}
                  className="atom dummy"
                  style={styleVars}
                  aria-hidden="true"
                >
                  <div className="atom-anchor">
                    <div className="dummy-dot" style={{ backgroundColor: dot.color }} />
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

  // Neural Network Canvas Initialization - Dark nodes on warm background
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
    
    // Neural network nodes - dark charcoal on warm background
    const nodes = [];
    const nodeCount = 45;
    
    // Initialize nodes with random positions (less dense on left 1/3)
    for (let i = 0; i < nodeCount; i++) {
      // Weight distribution toward right side
      const xWeight = Math.random();
      const x = xWeight < 0.3 ? (Math.random() * canvas.width * 0.35) : (canvas.width * 0.35 + Math.random() * canvas.width * 0.65);
      
      const rand = Math.random();
      let radius;
      if (rand < 0.75) radius = 3 + Math.random(); // 75% standard (3-4px)
      else if (rand < 0.95) radius = 5 + Math.random(); // 20% hub (5-6px)
      else radius = 2; // 5% small (2px)
      
      nodes.push({
        x: x,
        y: Math.random() * canvas.height,
        radius: radius,
        baseOpacity: 0.30 + Math.random() * 0.05, // Default 30-35% opacity
        currentOpacity: 0.30 + Math.random() * 0.05, // Current animated opacity
        targetOpacity: 0.30 + Math.random() * 0.05, // Target opacity for smooth transition
        pulsePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.6, // Increased movement speed (3x faster)
        vy: (Math.random() - 0.5) * 0.6  // Increased movement speed (3x faster)
      });
    }
    
    // Mouse position
    let mouseX = -1000;
    let mouseY = -1000;
    const hoverRadius = 150;
    
    // Generate ambient/static connections that are always visible
    const generateAmbientConnections = () => {
      const connections = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          // Wider distance range and more connections for better visibility
          if (dist > 80 && dist < 200 && connections.length < 30) {
            connections.push({ i, j, dist });
          }
        }
      }
      return connections;
    };
    
    let ambientConnections = generateAmbientConnections();
    
    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update node positions (faster drift)
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += 0.015;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
        
        // Smooth opacity interpolation (0.15 ease)
        const opacityDiff = node.targetOpacity - node.currentOpacity;
        node.currentOpacity += opacityDiff * 0.15;
      });
      
      // Draw ambient/static connections - more visible (always on)
      ambientConnections.forEach(conn => {
        const node1 = nodes[conn.i];
        const node2 = nodes[conn.j];
        // Increased opacity for always-visible static connections
        ctx.strokeStyle = 'rgba(80, 70, 60, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(node1.x, node1.y);
        ctx.lineTo(node2.x, node2.y);
        ctx.stroke();
      });
      
      // Draw hover connections and update node target opacity
      nodes.forEach(node => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < hoverRadius) {
          const opacity = 0.6 * (1 - dist / hoverRadius);
          
          // Draw connection line - dark brown/charcoal
          ctx.strokeStyle = `rgba(60, 50, 40, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
          
          // Set target opacity to hover state (65-75%)
          node.targetOpacity = 0.65 + Math.random() * 0.10;
        } else {
          // Return to default opacity (30-35%)
          node.targetOpacity = node.baseOpacity;
        }
      });
      
      // Draw cursor dot when hovering
      if (mouseX > 0 && mouseY > 0) {
        ctx.fillStyle = 'rgba(42, 37, 32, 0.7)';
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw nodes - dark charcoal color with animated opacity
      nodes.forEach(node => {
        const pulse = Math.sin(node.pulsePhase) * 0.08 + 1;
        
        // Subtle shadow
        ctx.shadowColor = 'rgba(42, 42, 42, 0.25)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        // Node fill - dark charcoal with smooth animated opacity
        ctx.fillStyle = `rgba(42, 42, 42, ${node.currentOpacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
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
    
    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
      canvas.style.cursor = 'crosshair';
    }
    
    // Regenerate connections periodically
    const connectionInterval = setInterval(() => {
      ambientConnections = generateAmbientConnections();
    }, 10000);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
      clearInterval(connectionInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fffdf7] text-[#0B1F3B] font-['DM_Sans']">
      {/* Hero Section - Section 1 (ODD) - Warm Sandy Background with Neural Network */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-neural-section">
        {/* LAYER 0: Warm Sandy/Beige Background Gradient (KEEP AS-IS) */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 100% at 20% 20%, rgba(235, 220, 195, 0.95) 0%, transparent 50%),
              radial-gradient(ellipse 100% 80% at 80% 80%, rgba(180, 140, 100, 0.4) 0%, transparent 60%),
              linear-gradient(135deg, #e8dcc8 0%, #d4c4a8 20%, #c9b08a 40%, #bfa070 60%, #b89860 80%, #a88855 100%)
            `
          }}
        />
        
        {/* LAYER 1: Soft Atmospheric Haze */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 30% 30%, rgba(255, 250, 240, 0.4) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 70% 60%, rgba(210, 180, 140, 0.25) 0%, transparent 45%)
            `
          }}
        />
        
        {/* LAYER 2: Neural Network Canvas (Interactive) */}
        <canvas id="neural-network-canvas" className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }} />
        
        {/* LAYER 3: Content (100% STATIC - Always on top) */}
        <div className="container-custom relative py-24" style={{ zIndex: 100 }}>
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-[#2a2520] drop-shadow-sm">
              Beyond the Horizon<br></br>
            </h1>
            <p className="text-[#3d3530] text-lg font-light leading-relaxed max-w-md">A complete, scalable, and sustainable AI platform.</p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/contact">
                <Button className="bg-[#2a2520] text-white hover:bg-[#3d3530] px-8 py-3 rounded font-medium text-base">
                  Reserve GPUs
                </Button>
              </Link>
              <Link to="/contact" className="flex items-center gap-2 text-[#2a2520] hover:text-[#5a4a40] transition-colors font-medium">
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
     
      {/* Who We Are & What We Aim To Do Section - NEW */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="mx-auto px-6" style={{ maxWidth: '1261px' }}>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Card - Who We Are? */}
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#e8eaed]">
              {/* Lightbulb Icon */}
              <div className="mb-5">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4C17.373 4 12 9.373 12 16c0 4.127 2.053 7.778 5.2 10 .897.635 1.8 1.56 1.8 2.667V32h10v-3.333c0-1.107.903-2.032 1.8-2.667C33.947 23.778 36 20.127 36 16c0-6.627-5.373-12-12-12z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 32v2a5 5 0 0 0 10 0v-2" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 36h10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 4v-2M4 16H2M8 8L6 6M40 8l2-2M44 16h2" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {/* Heading */}
              <h3 className="text-2xl font-bold text-[#0f172a] mb-5 font-['Inter']">
                Who We Are?
              </h3>
              
              {/* Body Text */}
              <p className="text-[#4b5563] leading-relaxed text-base">
                BluBridge is an early-stage AI research company focused on advancing probabilistic and predictive modeling—building next-generation Artificial Intelligence from the ground up. We are assembling a team of passionate, driven researchers and engineers committed to pushing the boundaries of machine learning.
              </p>
            </div>
            
            {/* Right Card - What We Aim to Do? */}
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#e8eaed]">
              {/* Microscope/Telescope Icon */}
              <div className="mb-5">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 44h16M28 44V28" stroke="#1e3a5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M28 28c5.523 0 10-4.477 10-10V8l-4-4-14 14v4c0 5.523 4.477 10 8 10z" stroke="#1e3a5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 18l-8 8M16 14l-4 4" stroke="#1e3a5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="34" cy="8" r="2" stroke="#60a5fa" strokeWidth="2"/>
                  <path d="M8 40l8-8" stroke="#1e3a5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="6" cy="42" r="4" stroke="#1e3a5f" strokeWidth="2"/>
                </svg>
              </div>
              
              {/* Heading */}
              <h3 className="text-2xl font-bold text-[#0f172a] mb-5 font-['Inter']">
                What We Aim to Do?
              </h3>
              
              {/* Body Text */}
              <p className="text-[#4b5563] leading-relaxed text-base">
                Our immediate goal is to develop a state-of-the-art 70-billion-parameter (dense) Large Language Model, establishing a strong foundation for future innovations in AI systems, its applications, and research.
              </p>
            </div>
          </div>
        </div>
      </section>

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
