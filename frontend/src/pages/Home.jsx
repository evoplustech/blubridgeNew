import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, ArrowLeft, Plus, Minus, Check, ChevronLeft, ChevronRight, Star, Radio, ShieldCheck, GraduationCap, GitBranch, Code2, Factory, Landmark, HeartPulse, Database, Shield, Layers, Terminal, Network, CheckCircle, TrendingUp, Users, Brain, Zap } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useEmblaCarousel from 'embla-carousel-react';
import NodeConnections2 from './NodeConnections2';

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
                    
                   
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                      {testimonial.text}
                    </p>
                    
                    
                    <div className="flex justify-end mt-6">
                      <span className="text-6xl text-gray-200 font-serif leading-none">"</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
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
    // INNER ring: Data (9 o'clock position)
    { ring: 1, type: 'feature', sizeClass: 'atom--inner', angle: 180, Icon: Database, label: 'Data' },
    { ring: 1, type: 'dummy', angle: 0, dummyClass: 'dummy-blue' },

    // MIDDLE ring: Distributed Training, CGAD, Compiler
    { ring: 2, type: 'feature', sizeClass: 'atom--mid', angle: 315, Icon: Network, label: 'Distributed Training' },
    { ring: 2, type: 'feature', sizeClass: 'atom--mid', angle: 135, Icon: GitBranch, label: 'CGAD' },
    { ring: 2, type: 'feature', sizeClass: 'atom--mid', angle: 210, Icon: Terminal, label: 'Compiler' },
    { ring: 2, type: 'dummy', angle: 45, dummyClass: 'dummy-orange' },

    // OUTER ring: Tokenizer, Tensor & Operations
    { ring: 3, type: 'feature', sizeClass: 'atom--outer', angle: 240, Icon: CheckCircle, label: 'Tokenizer' },
    { ring: 3, type: 'feature', sizeClass: 'atom--outer', angle: 280, Icon: Layers, label: 'Tensor & Operations' },
    { ring: 3, type: 'dummy', angle: 30, dummyClass: 'dummy-blue' },
    { ring: 3, type: 'dummy', angle: 120, dummyClass: 'dummy-orange' }
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
      title: "BluBridge Named NVIDIA Inception Partner for AI Cloud Infrastructure",
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

  // BluBridge Neural Intelligence Background - Fully Connected Network
  // Reference: BluBridge.ai hero background - warm gradient with connected neural nodes
  useEffect(() => {
    const canvas = document.getElementById('neural-network-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const section = canvas.parentElement;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
      initializeNetwork();
    };
    
    // ==============================================
    // NEURAL NETWORK CONFIGURATION
    // ==============================================
    const nodeCount = 55; // Enough nodes for full coverage
    const connectionDistance = 220; // Max distance for connections
    const minConnections = 2; // Every node must have at least 2 connections
    
    // Node appearance
    const nodeColor = { r: 140, g: 115, b: 85 }; // Warm brown-gold tone
    const lineColor = { r: 160, g: 130, b: 95 }; // Slightly lighter warm tone
    
    // Animation speeds (varied for organic feel)
    const baseSpeed = 0.35; // Noticeable but calm movement
    
    let nodes = [];
    let connections = [];
    
    // Mouse tracking
    let mouseX = -1000;
    let mouseY = -1000;
    const hoverRadius = 180;
    
    // ==============================================
    // INITIALIZE FULLY CONNECTED NETWORK
    // ==============================================
    const initializeNetwork = () => {
      nodes = [];
      connections = [];
      
      const w = canvas.width;
      const h = canvas.height;
      const padding = 50;
      
      // Create nodes with unique sizes and organic placement
      for (let i = 0; i < nodeCount; i++) {
        // Organic distribution - avoid grid patterns
        const angle = Math.random() * Math.PI * 2;
        const radiusFromCenter = Math.random() * Math.min(w, h) * 0.45;
        const centerX = w / 2 + (Math.random() - 0.5) * w * 0.3;
        const centerY = h / 2 + (Math.random() - 0.5) * h * 0.2;
        
        let x = centerX + Math.cos(angle) * radiusFromCenter + (Math.random() - 0.5) * 150;
        let y = centerY + Math.sin(angle) * radiusFromCenter + (Math.random() - 0.5) * 100;
        
        // Keep within bounds
        x = Math.max(padding, Math.min(w - padding, x));
        y = Math.max(padding, Math.min(h - padding, y));
        
        // Unique node sizes (small, medium, few larger)
        let radius;
        const sizeRand = Math.random();
        if (sizeRand < 0.5) radius = 1.8 + Math.random() * 0.8; // Small (1.8-2.6)
        else if (sizeRand < 0.85) radius = 2.8 + Math.random() * 1.2; // Medium (2.8-4.0)
        else radius = 4.2 + Math.random() * 1.5; // Larger (4.2-5.7)
        
        // Varied movement directions and speeds
        const moveAngle = Math.random() * Math.PI * 2;
        const speed = baseSpeed * (0.6 + Math.random() * 0.8); // 60%-140% of base
        
        nodes.push({
          x, y,
          radius,
          baseRadius: radius,
          // Movement
          vx: Math.cos(moveAngle) * speed,
          vy: Math.sin(moveAngle) * speed,
          // Opacity
          baseOpacity: 0.35 + Math.random() * 0.15,
          currentOpacity: 0.35,
          targetOpacity: 0.35,
          // For organic motion variation
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          driftSpeed: 0.005 + Math.random() * 0.01
        });
      }
      
      // ==============================================
      // BUILD FULLY CONNECTED NETWORK - NO ISOLATED NODES
      // ==============================================
      buildConnections();
    };
    
    const buildConnections = () => {
      connections = [];
      const nodeConnCount = new Array(nodes.length).fill(0);
      
      // First pass: Connect nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < connectionDistance) {
            connections.push({ i, j, dist, baseOpacity: 0.15 + (1 - dist / connectionDistance) * 0.12 });
            nodeConnCount[i]++;
            nodeConnCount[j]++;
          }
        }
      }
      
      // Second pass: Ensure EVERY node has at least minConnections
      for (let i = 0; i < nodes.length; i++) {
        while (nodeConnCount[i] < minConnections) {
          // Find nearest unconnected node
          let nearestIdx = -1;
          let nearestDist = Infinity;
          
          for (let j = 0; j < nodes.length; j++) {
            if (i === j) continue;
            
            // Check if already connected
            const alreadyConnected = connections.some(
              c => (c.i === i && c.j === j) || (c.i === j && c.j === i)
            );
            if (alreadyConnected) continue;
            
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < nearestDist) {
              nearestDist = dist;
              nearestIdx = j;
            }
          }
          
          if (nearestIdx !== -1) {
            const minI = Math.min(i, nearestIdx);
            const maxI = Math.max(i, nearestIdx);
            connections.push({ 
              i: minI, 
              j: maxI, 
              dist: nearestDist,
              baseOpacity: Math.max(0.08, 0.2 - nearestDist / 800)
            });
            nodeConnCount[i]++;
            nodeConnCount[nearestIdx]++;
          } else {
            break; // No more nodes to connect
          }
        }
      }
    };
    
    // ==============================================
    // ANIMATION LOOP - CINEMATIC MOTION
    // ==============================================
    let animationId;
    let frameCount = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;
      
      // Update node positions - continuous drift with organic variation
      nodes.forEach((node, idx) => {
        // Add subtle sine wave drift for organic feel
        node.phaseX += node.driftSpeed;
        node.phaseY += node.driftSpeed * 1.3;
        
        const driftX = Math.sin(node.phaseX) * 0.15;
        const driftY = Math.cos(node.phaseY) * 0.12;
        
        node.x += node.vx + driftX;
        node.y += node.vy + driftY;
        
        // Smooth edge wrapping (no harsh bounces)
        const margin = 30;
        if (node.x < -margin) node.x = canvas.width + margin;
        if (node.x > canvas.width + margin) node.x = -margin;
        if (node.y < -margin) node.y = canvas.height + margin;
        if (node.y > canvas.height + margin) node.y = -margin;
        
        // Smooth opacity transition
        const opacityDiff = node.targetOpacity - node.currentOpacity;
        node.currentOpacity += opacityDiff * 0.08;
      });
      
      // Rebuild connections periodically (every ~3 seconds) as nodes move
      if (frameCount % 180 === 0) {
        buildConnections();
      }
      
      // ==============================================
      // DRAW CONNECTIONS - All nodes must be connected
      // ==============================================
      ctx.lineCap = 'round';
      
      connections.forEach(conn => {
        const n1 = nodes[conn.i];
        const n2 = nodes[conn.j];
        
        // Calculate current distance for dynamic opacity
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const currentDist = Math.sqrt(dx * dx + dy * dy);
        
        // Check if either node is being hovered
        const d1 = Math.sqrt((n1.x - mouseX) ** 2 + (n1.y - mouseY) ** 2);
        const d2 = Math.sqrt((n2.x - mouseX) ** 2 + (n2.y - mouseY) ** 2);
        const isHovered = (d1 < hoverRadius || d2 < hoverRadius) && mouseX > 0;
        
        // Line opacity and color - DARKEN when hovered
        let lineOpacity = conn.baseOpacity * (1 - currentDist / 400);
        lineOpacity = Math.max(0.06, Math.min(0.28, lineOpacity));
        
        // Darker lines on hover
        let lineR = lineColor.r;
        let lineG = lineColor.g;
        let lineB = lineColor.b;
        
        if (isHovered) {
          lineOpacity = Math.min(0.55, lineOpacity * 2.5);
          // Darken line color
          lineR = Math.max(50, lineColor.r - 70);
          lineG = Math.max(40, lineColor.g - 60);
          lineB = Math.max(35, lineColor.b - 50);
        }
        
        ctx.strokeStyle = `rgba(${lineR}, ${lineG}, ${lineB}, ${lineOpacity})`;
        ctx.lineWidth = isHovered ? 1.4 : 0.8;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
      });
      
      // ==============================================
      // HOVER INTERACTION - Local DARKENING
      // ==============================================
      nodes.forEach(node => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < hoverRadius && mouseX > 0) {
          const proximity = 1 - dist / hoverRadius;
          // DARKEN on hover - increase opacity significantly for darker appearance
          node.targetOpacity = Math.min(0.85, node.baseOpacity + proximity * 0.5);
          // Also slightly increase node size on hover for emphasis
          node.hoverScale = 1 + proximity * 0.15;
        } else {
          node.targetOpacity = node.baseOpacity;
          node.hoverScale = 1;
        }
      });
      
      // ==============================================
      // DRAW NODES - Warm, blended with background (DARKEN on hover)
      // ==============================================
      nodes.forEach(node => {
        // Subtle size pulse for life
        const pulse = 1 + Math.sin(frameCount * 0.02 + node.phaseX) * 0.05;
        const hoverScale = node.hoverScale || 1;
        const displayRadius = node.baseRadius * pulse * hoverScale;
        
        // Use darker color when hovered (lower RGB values = darker)
        const isHovered = node.currentOpacity > node.baseOpacity + 0.1;
        const r = isHovered ? Math.max(40, nodeColor.r - 60) : nodeColor.r;
        const g = isHovered ? Math.max(35, nodeColor.g - 50) : nodeColor.g;
        const b = isHovered ? Math.max(30, nodeColor.b - 40) : nodeColor.b;
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${node.currentOpacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, displayRadius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Initialize and start
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
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
    
    // Desktop only - no hover on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fffdf7] text-[#0B1F3B] font-['DM_Sans']">
      {/* Hero Section - Section 1 (ODD) - Warm Sandy Background with Neural Network */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-neural-section ">
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
        {/* <NodeConnections2></NodeConnections2> */}
        {/* LAYER 3: Content (100% STATIC - Always on top) */}
        <div className="container-custom relative py-24 z-10" >
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-[#2a2520] drop-shadow-sm">
              Beyond the Horizon<br></br>
            </h1>
            <p className="text-[#3d3530] text-lg font-light leading-relaxed max-w-md">An Independent AI Research Lab.</p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/contact">
                {/* <Button className="bg-[#2a2520] text-white hover:bg-[#3d3530] px-8 py-3 rounded font-medium text-base">
                  Reserve GPUs
                </Button> */}
                <Button className="bg-[#2a2520] text-white hover:bg-[#3d3530] px-4 py-3 rounded font-medium text-base">
                  Contact Us
                </Button>
              </Link>
              {/* <Link to="/contact" className="flex items-center gap-2 text-[#2a2520] hover:text-[#5a4a40] transition-colors font-medium">
                Start Building <ArrowRight className="w-4 h-4" />
              </Link> */}
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
             
              
              {/* Heading */}
              <h3 className="text-2xl text-[#0f172a] mb-5 font-['Inter']">
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
             
              
              {/* Heading */}
              <h3 className="text-2xl text-[#0f172a] mb-5 font-['Inter']">
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
            
            {/* Right - Research Teams Grid (6 tabs, static, no links) */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-8">Our Research Teams</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Database, title: "Data" },
                  { icon: CheckCircle, title: "Tokenizer" },
                  { icon: Layers, title: "Tensor & Operations" },
                  { icon: GitBranch, title: "CGAD" },
                  { icon: Terminal, title: "Compiler" },
                  { icon: Network, title: "Distributed Training" }
                ].map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#D6DEC3] hover:border-[#328CC1] hover:shadow-md transition-all"
                  >
                    <IconComponent className="w-6 h-6 text-[#0B1F3B]" strokeWidth={1.5} />
                    <span className="text-[#0B1F3B] font-medium text-sm">{service.title}</span>
                  </div>
                )})}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Primary Areas of Research and Engineering Section - Section 3 (ODD) */}
      <section className="py-20" style={{ backgroundColor: '#FAFAF7' }}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-4">Our Primary Areas of Research and Engineering</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                image: "https://customer-assets.emergentagent.com/job_a6e87c37-8b79-4764-8332-87fbbbf97ef0/artifacts/z0syfeo4_icon1.png",
                title: "Scaling Laws"
              },
              {
                image: "https://customer-assets.emergentagent.com/job_a6e87c37-8b79-4764-8332-87fbbbf97ef0/artifacts/gpekkfp1_icon2.png",
                title: "Human Work Optimization"
              },
              {
                image: "https://customer-assets.emergentagent.com/job_a6e87c37-8b79-4764-8332-87fbbbf97ef0/artifacts/no96kn3y_icon3.png",
                title: "Multimodal Agents"
              },
              {
                image: "https://customer-assets.emergentagent.com/job_a6e87c37-8b79-4764-8332-87fbbbf97ef0/artifacts/d9mbefc0_icon4.png",
                title: "Reinforcement Learning"
              }
            ].map((card, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 border border-[#e8e8e8] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 mb-6 flex items-center justify-center">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-base font-semibold text-[#0B1F3B]">{card.title}</h3>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          {/* <div className="text-center">
            <Link to="/contact">
              <Button className="bg-[#0B1F3B] hover:bg-[#162B4D] text-white px-6 py-4 text-base font-medium rounded-lg">
                Talk To Us
              </Button>
            </Link>
          </div> */}
        </div>
      </section>

      {/* BluBridge Infrastructure Section - Section 4 (EVEN) */}
      {/* <section className="py-20 relative overflow-hidden bg-[#f3f1e9]">
       
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f3f1e9]/95 via-[#f3f1e9]/80 to-[#f3f1e9]/60" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols gap-12">
           
            <div>
              <h2 className="text-4xl font-light mb-6 text-[#0B1F3B]">BluBridge's Infrastructure</h2>
              <p className="text-[#243447] mb-8 leading-relaxed">
                BluBridge manages the full AI infrastructure stack, from energy-efficient data centres in Norway to advanced compute clusters and software setups. Every component is thoughtfully chosen and engineered to support the demanding requirements of AI.
              </p>
              
            
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
            
            
            <div />
          </div>
        </div>
      </section> */}

      {/* New Testimonials Carousel Section - HIDDEN */}
      {/* <TestimonialsCarousel /> */}

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
                BluBridge is now an NVIDIA Inception Partner
              </h2>
              <p className="text-[#243447] mb-6">
                {/* Access thousands of GPUs tailored to your requirements. */}
                Know more about our Research
              </p>
              <div className="flex gap-4">
                <Link to="/contact">
                  <Button className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-4 py-3">
                    Contact Us
                  </Button>
                </Link>
                {/* <Link to="/contact">
                  <Button className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-6 py-3">
                    Reserve GPUs
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-[#0B1F3B] text-[#0B1F3B] hover:bg-[#f3f1e9] px-6 py-3">
                    Contact
                  </Button>
                </Link> */}
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end gap-8">
              <span className="text-5xl font-bold text-[#0B1F3B]/20 tracking-tight">NVIDIA</span>
              <div className="text-sm text-[#5B6B7A]">Inception Partner</div>
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
            {/* Access thousands of GPUs tailored to your requirements. */}
            Know more about our Research 
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-[#0B1F3B] hover:bg-[#f3f1e9] px-4 py-3 rounded font-medium">
                Contact Us
              </Button>
            </Link>
            {/* <Link to="/contact">
              <Button className="bg-white text-[#0B1F3B] hover:bg-[#f3f1e9] px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium px-6 py-0">
              Contact <ArrowRight className="w-4 h-4" />
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
