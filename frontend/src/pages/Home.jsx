import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, ArrowLeft, Plus, Minus, Check, ChevronLeft, ChevronRight, Star, Radio, ShieldCheck, GraduationCap, GitBranch, Code2, Factory, Landmark, HeartPulse, Database, Shield, Layers, Terminal, Network, CheckCircle, TrendingUp, Users, Brain, Zap, Scale, Server, SlidersHorizontal, Lightbulb, FlaskConical, Rocket, Smartphone, Laptop } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useEmblaCarousel from 'embla-carousel-react';
import NodeConnections2 from './NodeConnections2';
import NeuralBackground from '../components/NeuralBackground';

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

// const AIExpertiseOrbit = () => {
//   const rings = [
//     { key: 1, className: 'orbit-1', radius: '105px' },
//     { key: 2, className: 'orbit-2', radius: '155px' },
//     { key: 3, className: 'orbit-3', radius: '212px' }
//   ];

//   const atoms = [
//     // INNER ring: Data (9 o'clock position)
//     { ring: 1, type: 'feature', sizeClass: 'atom--inner', angle: 180, Icon: Database, label: 'Data' },
//     { ring: 1, type: 'dummy', angle: 0, dummyClass: 'dummy-blue' },

//     // MIDDLE ring: Distributed Training, CGAD, Compiler
//     { ring: 2, type: 'feature', sizeClass: 'atom--mid', angle: 315, Icon: Network, label: 'Distributed Training' },
//     { ring: 2, type: 'feature', sizeClass: 'atom--mid', angle: 135, Icon: GitBranch, label: 'CGAD' },
//     { ring: 2, type: 'feature', sizeClass: 'atom--mid', angle: 210, Icon: Terminal, label: 'Compiler' },
//     { ring: 2, type: 'dummy', angle: 45, dummyClass: 'dummy-orange' },

//     // OUTER ring: Tokenizer, Tensor & Operations
//     { ring: 3, type: 'feature', sizeClass: 'atom--outer', angle: 240, Icon: CheckCircle, label: 'Tokenizer' },
//     { ring: 3, type: 'feature', sizeClass: 'atom--outer', angle: 280, Icon: Layers, label: 'Tensor & Operations' },
//     { ring: 3, type: 'dummy', angle: 30, dummyClass: 'dummy-blue' },
//     { ring: 3, type: 'dummy', angle: 120, dummyClass: 'dummy-orange' }
//   ];

//   return (
//     <div className="orbit-container relative w-[520px] h-[520px]">
//       {/* SVG tracks (must match 520x520 viewBox to avoid drift) */}
//       <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520" aria-hidden="true">
//         <circle className="track" cx="260" cy="260" r="105" />
//         <circle className="track" cx="260" cy="260" r="155" />
//         <circle className="track" cx="260" cy="260" r="212" />
//       </svg>

//       {/* Center badge */}
//       <div className="center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#DBD6C4]">
//         <span className="text-white text-xs font-medium text-center leading-tight">
//         <img width="30px" src="/images/b-center.png"/>
//         </span>
//       </div>

//       {/* Rings + atoms */}
//       {rings.map((ring) => (
//         <div key={ring.key} className={`orbit ${ring.className}`} style={{ '--radius': ring.radius }}>
//           {atoms
//             .filter((a) => a.ring === ring.key)
//             .map((a, idx) => {
//               const styleVars = { '--angle': `${a.angle}deg`, '--angleNeg': `${-a.angle}deg` };

//               if (a.type === 'dummy') {
//                 return (
//                   <div
//                     key={idx}
//                     className={`atom dummy ${a.dummyClass}`}
//                     style={styleVars}
//                     aria-hidden="true"
//                   >
//                     <div className="atom-anchor">
//                       <div className="dummy-dot" />
//                     </div>
//                   </div>
//                 );
//               }

//               const Icon = a.Icon;
//               return (
//                 <div key={idx} className={`atom ${a.sizeClass}`} style={styleVars}>
//                   <div className="atom-anchor">
//                     <div className="atom-angle-fix">
//                       {/* This inner node counter-rotates via CSS so labels stay upright */}
//                       <div className="atom-spin-fix">
//                         <div className="atom-content">
//                           <div className="atom-icon">
//                             <Icon className="atom-icon-svg" strokeWidth={1.5} />
//                           </div>
//                           <div className="atom-label">{a.label}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//         </div>
//       ))}
//     </div>
//   );
// };

const Home = () => {
   const [openFaq, setOpenFaq] = useState(null);
  const [activeInfraTab, setActiveInfraTab] = useState(0);
  const [expandedAboutCards, setExpandedAboutCards] = useState({
    whoWeAre: false,
    whatWeAim: false
  });

  const toggleAboutCard = (cardId) => {
    setExpandedAboutCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

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
      name: "Data",
      title: "Data",
      description: "We prepare and structure data to fuel accurate, scalable AI systems across research and production.",
      features: ["Secure data pipelines", "AI-ready data refinement", "Scalable storage layers", "Privacy-first governance"],
      link : '/research'
    },
    {
      name: "Pre-training",
      title: "Pre-training",
      description: "We build strong model foundations by training on large-scale, high-quality datasets designed for deep learning performance.",
      features: ["Large-scale dataset curation", "Optimized training pipelines", "Foundation model development", "Compute-efficient workflows"],
      link : '/research'
    },
    {
      name: "Mid-training",
      title: "Mid-training",
      description: "We refine model behavior during training, improving alignment, stability, and domain understanding at scale.",
      features: ["Curriculum-based refinement", "Domain-specific tuning", "Stability and bias control", "Performance shaping"],
      link : '/research'
    },
    {
      name: "Post-training",
      title: "Post-training",
      description: "We enhance model readiness through targeted refinement, evaluation, and optimization for real-world performance.",
      features: ["Fine-tuning for accuracy", "Safety and quality checks", "Inference optimization", "Production readiness"],
      link : '/research'
    },
    {
      name: "Agent Build",
      title: "Agent Build",
      description: "We design intelligent agents that reason, act, and adapt across real workflows, turning models into autonomous systems.",
      features: ["Task-aware agent design", "Tool and API integration", "Multi-step reasoning flows", "Production-grade orchestration"],
      link : '/research'
    },
    {
      name: "Inference Optimization",
      title: "Inference Optimization",
      description: "We optimize models for fast, reliable, and cost-efficient execution in real-world environments.",
      features: ["Low-latency execution", "Memory-efficient serving", "Hardware-level tuning", "Scalable inference pipelines"],
      link : '/research'
    },
    {
      name: "Infrastructure Scaling",
      title: "Infrastructure Scaling",
      description: "We expand AI systems seamlessly, ensuring performance remains consistent as demand and complexity grow.",
      features: ["Elastic compute expansion", "High-throughput orchestration", "Load-aware resource scaling", "Production-grade resilience"],
      link : '/research'
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

  return (
    <div className="min-h-screen bg-[#fffdf7] text-[#0B1F3B] font-['DM_Sans']">
      {/* Hero Section - Neural Network Background */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-neural-section" data-testid="hero-section" style={{ zIndex: 100 }}>
        {/* LAYER 0: Neural Network Animation Background */}
        <NeuralBackground />
        
        {/* Luxury letter-by-letter zoom animation - no blur, slow & refined, no layout shift */}
        <style>{`
          @keyframes heroLetterZoom {
            0% {
              opacity: 0;
              transform: scale(1);
            }
            20% {
              opacity: 1;
              transform: scale(1.22);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .hero-letter {
            display: inline-block;
            opacity: 0;
            transform-origin: center bottom;
            animation: heroLetterZoom 0.9s cubic-bezier(0.33, 1, 0.68, 1) forwards;
            animation-iteration-count: 1;
          }
          
          .hero-space {
            display: inline-block;
            width: 0.3em;
          }
          
          /* Collapsed-to-Rejoin animation for subheading */
          @keyframes subheadingExpand {
            0% {
              opacity: 0;
              letter-spacing: -0.4em;
              transform: scaleX(0.7);
            }
            30% {
              opacity: 1;
            }
            100% {
              opacity: 1;
              letter-spacing: 0.02em;
              transform: scaleX(1);
            }
          }
          
          .hero-subheading {
            opacity: 0;
            display: inline-block;
            animation: subheadingExpand 2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            animation-delay: 2.2s;
            animation-iteration-count: 1;
          }
        `}</style>
        
        {/* LAYER 1: Content (Always on top) */}
        <div className="container-custom relative my-24 z-10 flex items-center justify-center w-full">
          <div className="space-y-6 text-center">
            <h1 className="leading-[1.08] tracking-tight text-[#000] flex items-baseline justify-center" style={{ fontSize: '4.5rem', fontWeight: 260 }}>
              {/* "Beyond the Horizon" - Letter by letter zoom animation */}
              <span className="hero-letter" style={{ animationDelay: '0ms' }}>
                <img 
                  src="https://customer-assets.emergentagent.com/job_ui-interactive-nav/artifacts/g6niy0el_Beyond-B.jpg" 
                  alt="B" 
                  style={{ 
                  position:'relative',
                    width: 'auto', 
                    display: 'inline-block',
                    verticalAlign: 'baseline',
                    marginRight: '0em',
                    top:'6px'
                  }} 
                />
              </span>
              <span className="hero-letter" style={{ animationDelay: '120ms' }}>e</span>
              <span className="hero-letter" style={{ animationDelay: '240ms' }}>y</span>
              <span className="hero-letter" style={{ animationDelay: '360ms' }}>o</span>
              <span className="hero-letter" style={{ animationDelay: '480ms' }}>n</span>
              <span className="hero-letter" style={{ animationDelay: '600ms' }}>d</span>
              <span className="hero-space"></span>
              <span className="hero-letter" style={{ animationDelay: '780ms' }}>t</span>
              <span className="hero-letter" style={{ animationDelay: '900ms' }}>h</span>
              <span className="hero-letter" style={{ animationDelay: '1020ms' }}>e</span>
              <span className="hero-space"></span>
              <span className="hero-letter" style={{ animationDelay: '1200ms' }}>H</span>
              <span className="hero-letter" style={{ animationDelay: '1320ms' }}>o</span>
              <span className="hero-letter" style={{ animationDelay: '1440ms' }}>r</span>
              <span className="hero-letter" style={{ animationDelay: '1560ms' }}>i</span>
              <span className="hero-letter" style={{ animationDelay: '1680ms' }}>z</span>
              <span className="hero-letter" style={{ animationDelay: '1800ms' }}>o</span>
              <span className="hero-letter" style={{ animationDelay: '1920ms' }}>n</span>
            </h1>
            <p className="text-[#0B1F3B]/80 font-light leading-relaxed mx-auto" style={{ fontSize: '1.5rem' }}>
              <span className="hero-subheading">An Independent AI Research Lab.</span>
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link to="/contact">
                <Button className="bg-[#0B1F3B] text-white hover:bg-[#0B1F3B]/90 px-8 rounded font-medium text-lg" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }} data-testid="hero-contact-btn">
                  Contact Us
                </Button>
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
{/* Who We Are & What We Aim To Do Section - Interactive Collapsible */}
      {/* <section className="py-20 bg-[#fffdf7]">
        <div className="mx-auto px-6" style={{ maxWidth: '1261px' }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
          
            <div 
              className="bg-[#f3f1e9] rounded-2xl shadow-sm border overflow-hidden transition-all duration-400"
              data-testid="who-we-are-card"
            >
              
              <button
                onClick={() => toggleAboutCard('whoWeAre')}
                className="w-full p-12 text-left cursor-pointer group transition-all duration-300 hover:bg-[#eae8e0]"
                data-testid="who-we-are-trigger"
              >
                <h3 className="text-2xl text-[#0f172a] font-['Inter'] flex items-center justify-between group-hover:text-[#0b1f3b] transition-colors duration-300">
                  <span className="relative">
                    Who We Are?
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0b1f3b] group-hover:w-full transition-all duration-300"></span>
                  </span>
                  <span 
                    className={`transform transition-transform duration-300 text-[#6b7280] group-hover:text-[#1e40af] ${
                      expandedAboutCards.whoWeAre ? 'rotate-180' : ''
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </h3>
              </button>
              
              
              <div 
                className={`overflow-hidden transition-all duration-400 ease-out ${
                  expandedAboutCards.whoWeAre 
                    ? 'min-h-[200px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
                data-testid="who-we-are-content"
              >
                <div className="px-12 pb-12 transform transition-all duration-400">
                  <p className="text-[#4b5563] leading-relaxed text-base">
                    BluBridge is an early-stage AI research company focused on advancing probabilistic and predictive modeling—building next-generation Artificial Intelligence from the ground up. We are assembling a team of passionate, driven researchers and engineers committed to pushing the boundaries of machine learning.
                  </p>
                </div>
              </div>
            </div>
            
           
            <div 
              className="bg-[#f3f1e9] rounded-2xl shadow-sm border overflow-hidden transition-all duration-400"
              data-testid="what-we-aim-card"
            >
             
              <button
                onClick={() => toggleAboutCard('whatWeAim')}
                className="w-full p-12 text-left cursor-pointer group transition-all duration-300 hover:bg-[#eae8e0]"
                data-testid="what-we-aim-trigger"
              >
                <h3 className="text-2xl text-[#0f172a] font-['Inter'] flex items-center justify-between group-hover:text-[#0b1f3b] transition-colors duration-300">
                  <span className="relative">
                    What We Aim to Do?
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0b1f3b] group-hover:w-full transition-all duration-300"></span>
                  </span>
                  <span 
                    className={`transform transition-transform duration-300 text-[#6b7280] group-hover:text-[#1e40af] ${
                      expandedAboutCards.whatWeAim ? 'rotate-180' : ''
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </h3>
              </button>
              
              
              <div 
                className={`overflow-hidden transition-all duration-400 ease-out ${
                  expandedAboutCards.whatWeAim 
                    ? 'min-h-[204px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
                data-testid="what-we-aim-content"
              >
                <div className="px-12 pb-12 transform transition-all duration-400">
                  <p className="text-[#4b5563] leading-relaxed text-base">
                    Our immediate goal is to develop a state-of-the-art 70-billion-parameter (dense) Large Language Model, establishing a strong foundation for future innovations in AI systems, its applications, and research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

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
          <div class="text-center mb-16"><h2 class="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-4">Our Frontier AI Expertise</h2></div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
              
            {/* Left - Circular Diagram */}
            <div className="relative flex items-center justify-center">
              <AIExpertiseOrbit />    
            </div>
            
            {/* Right - AI Expertise Grid (8 tabs) */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-8 text-center">By Industry</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Radio, title: "Telco" },
                  { icon: ShieldCheck, title: "Finance & Insurance" },
                  { icon: GraduationCap, title: "Education" },
                  { icon: Scale, title: "Legal" },
                  { icon: Code2, title: "Software & Technology" },
                  { icon: Factory, title: "Manufacturing" },
                  { icon: Landmark, title: "Government" },
                  { icon: HeartPulse, title: "Healthcare" }
                ].map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#E8E4D9] shadow-sm"
                    data-testid={`expertise-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <IconComponent className="w-6 h-6 text-[#328CC1]" strokeWidth={1.5} />
                    <span className="text-[#0B1F3B] font-medium text-sm">{service.title}</span>
                  </div>
                )})}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section - Model Customization, Value Realization, Deployment */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              By Solutions
            </h2>
           
          </div>
          
          {/* 3 Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Model Customization */}
            <div 
              className="bg-[#f3f1e9] rounded-2xl p-8 border border-[#E8E4D9] hover:shadow-lg transition-shadow"
              data-testid="solution-model-customization"
            >
              <div className="w-14 h-14 rounded-xl bg-[#0B1F3B] flex items-center justify-center mb-6">
                <SlidersHorizontal className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Model Customization
              </h3>
              <p className="text-[#4b5563] leading-relaxed text-base">
                We adapt AI models to fit your data, domain, and goals, turning generic systems into purpose-built solutions. Each model is refined to deliver accurate, reliable, and context-aware intelligence for real-world use.
              </p>
            </div>

            {/* Card 2: Value Realization */}
            <div 
              className="bg-[#f3f1e9] rounded-2xl p-8 border border-[#E8E4D9] hover:shadow-lg transition-shadow"
              data-testid="solution-value-realization"
            >
              <div className="w-14 h-14 rounded-xl bg-[#0B1F3B] flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Value Realization
              </h3>
              <p className="text-[#4b5563] leading-relaxed text-base">
                We translate AI potential into measurable business outcomes by aligning research with real operational goals. Every deployment is focused on driving efficiency, impact, and long-term value across your organization.
              </p>
            </div>

            {/* Card 3: Deployment */}
            <div 
              className="bg-[#f3f1e9] rounded-2xl p-8 border border-[#E8E4D9] hover:shadow-lg transition-shadow"
              data-testid="solution-deployment"
            >
              <div className="w-14 h-14 rounded-xl bg-[#0B1F3B] flex items-center justify-center mb-6">
                <Rocket className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Deployment
              </h3>
              <p className="text-[#4b5563] leading-relaxed text-base">
                We move AI from lab to production with secure, scalable, and performance-optimized deployments. Each model is engineered to run reliably in real environments, ensuring seamless integration and sustained impact.
              </p>
            </div>
          </div>
          
        </div>
         {/* Talk To Us Button */}
          <div className="text-center">
            <Link to="/contact">
              <Button className="bg-[#0B1F3B] hover:bg-[#162B4D] text-white px-8 py-6 mt-20 text-base font-medium rounded-lg" data-testid="support-talk-to-us-btn">
                Talk To Us
              </Button>
            </Link>
          </div>
      </section>

      {/* Our Primary Areas of Research and Engineering Section - Section 3 (ODD) */}
       {/* <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-4">Our Primary Areas of Research and Engineering</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                image: "https://customer-assets.emergentagent.com/job_a6e87c37-8b79-4764-8332-87fbbbf97ef0/artifacts/d9mbefc0_icon4.png",
                title: "Scaling Laws"
              },
              {
                image: "https://customer-assets.emergentagent.com/job_a6e87c37-8b79-4764-8332-87fbbbf97ef0/artifacts/no96kn3y_icon3.png",
                title: "Human Work Optimization"
              },
              {
                image: "https://customer-assets.emergentagent.com/job_a6e87c37-8b79-4764-8332-87fbbbf97ef0/artifacts/gpekkfp1_icon2.png",
                title: "Multimodal Agents"
              },
              {
                image: "https://customer-assets.emergentagent.com/job_a6e87c37-8b79-4764-8332-87fbbbf97ef0/artifacts/z0syfeo4_icon1.png",
                title: "Reinforcement Learning"
              }
            ].map((card, index) => (
              <div 
                key={index}
                className="bg-[#f3f1e9] rounded-2xl p-8 border border-[#e8e8e8] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
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
          
           CTA Button 
           <div className="text-center">
            <Link to="/contact">
              <Button className="bg-[#0B1F3B] hover:bg-[#162B4D] text-white px-6 py-4 text-base font-medium rounded-lg">
                Talk To Us
              </Button>
            </Link>
          </div> 
        </div>
      </section>  */}

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


      {/* BluBridge's Infrastructure Section - Arctic Background */}
      <section className="py-20 relative overflow-hidden min-h-[700px]" data-testid="infrastructure-section">
        {/* Arctic Mountain Background Image with 0.3 opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80')`,
          }}
        />
        {/* Base background color visible through the semi-transparent image */}
        <div className="absolute inset-0 bg-[#fffdf7] -z-10" />
        
        <div className="container-custom relative z-10">
          {/* Section Title & Description */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-[#0B1F3B]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Blubridge Infrastructure for custom AI deployment Solutions
            </h2>
            <p className="text-[#243447] max-w-4xl leading-relaxed text-lg">
              Blubridge provides a secure, scalable foundation to run bespoke AI systems in real-world environments. It bridges research and production by delivering performance-optimized, sovereign, and enterprise-ready AI infrastructure.
            </p>
          </div>
          
          {/* Infrastructure Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {infraTabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveInfraTab(index)}
                className={`px-5 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeInfraTab === index 
                    ? 'bg-[#0B1F3B] text-white shadow-lg' 
                    : 'bg-white/90 text-[#243447] border border-[#D6DEC3] hover:bg-white hover:shadow-md'
                }`}
                data-testid={`infra-tab-${tab.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          
          {/* Tab Content Card */}
          <div className="bg-white rounded-2xl p-8 border border-[#E8E4D9] shadow-lg max-w-5xl" data-testid="infra-content-card">
            <h3 className="text-2xl font-medium mb-4 text-[#0B1F3B]">{infraTabs[activeInfraTab].title}</h3>
            <p className="text-[#243447] mb-6 leading-relaxed">{infraTabs[activeInfraTab].description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {infraTabs[activeInfraTab].features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#328CC1] flex-shrink-0" />
                  <span className="text-[#243447]">{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`${infraTabs[activeInfraTab].link}`} className="inline-flex items-center gap-2 text-[#328CC1] hover:text-[#0B3C5D] font-medium transition-colors">
              See More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <TestimonialsCarousel />

      {/* NVIDIA Partner Strip - Section 6 (EVEN) */}
      <section className="py-16 bg-[#fffdf7] border-t border-b border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light mb-4 text-[#0B1F3B]">
                BluBridge is now an NVIDIA Inception Partner
              </h2>
              {/*<p className="text-[#243447] mb-6">
                 Access thousands of GPUs tailored to your requirements. 
                Know more about our Research
              </p>*/}
             {/* <div className="flex gap-4">
                <Link to="/contact">
                  <Button className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-4 py-3">
                    Contact Us
                  </Button>
                </Link>
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
              </div>*/}
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
            <Link to="/research">
              <Button className="bg-white text-[#0B1F3B] hover:bg-[#f3f1e9] px-4 py-3 rounded font-medium">
                Explore
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
