import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Plus, Minus, Linkedin, Zap, Cpu, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

// Team slug to index mapping
const teamSlugToIndex = {
  'data': 0,
  'tokenizer': 1,
  'tensor-operations': 2,
  'computational-graph': 3,
  'auto-differentiation': 4,
  'compiler': 5,
  'quantization': 6,
  'distributed-training': 7
};

// Scroll-triggered animation hook
const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, ...options }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
};

// Animated Container Component for "Who We Are" section
const AnimatedContainer = ({ children, delay = 0, direction = 'up' }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  const getInitialTransform = () => {
    switch (direction) {
      case 'left': return 'translateX(-40px)';
      case 'right': return 'translateX(40px)';
      case 'up':
      default: return 'translateY(40px)';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : getInitialTransform(),
        transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const AboutUs = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [heroAnimated, setHeroAnimated] = useState(false);
  const heroRef = useRef(null);
  const researchTeamsRef = useRef(null);
  const location = useLocation();
  const hasHandledTeamParam = useRef(false);
  
  // Get initial slide from URL param
  const getInitialSlide = () => {
    const params = new URLSearchParams(location.search);
    const teamParam = params.get('team');
    if (teamParam && teamSlugToIndex[teamParam] !== undefined) {
      return teamSlugToIndex[teamParam];
    }
    return 0;
  };
  
  // Testimonials carousel state
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(getInitialSlide);
  
  // Track slide direction for animation
  const [slideDirection, setSlideDirection] = useState('next');
  const [isAnimating, setIsAnimating] = useState(false);

  // Parallax effect for hero
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger hero animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setHeroAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle URL parameter for team routing - scroll to section
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const teamParam = params.get('team');
    
    if (teamParam && teamSlugToIndex[teamParam] !== undefined && !hasHandledTeamParam.current) {
      hasHandledTeamParam.current = true;
      
      // Scroll to the research teams section after a short delay
      setTimeout(() => {
        if (researchTeamsRef.current) {
          const headerOffset = 100; // Account for fixed header
          const elementPosition = researchTeamsRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, [location.search]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const leadershipTeam = [
    { name: 'Josh Payne', title: 'Chief Executive Officer & Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
    { name: 'Jake Sherr', title: 'Chief Financial Officer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
    { name: 'Navat Power', title: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
    { name: 'Elisabeth Sollar', title: 'Chief Operating Officer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
    { name: 'Philippe Soulin', title: 'VP of Engineering', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face' },
    { name: 'Suneet Aghrera', title: 'VP of Product', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face' },
    { name: 'Patrick Baur', title: 'VP of Sales EMEA', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=face' },
    { name: 'Aina Shibuinaa', title: 'Head of Marketing', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
    { name: 'Tom Burke', title: 'VP of Business Development', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face' },
    { name: 'Phil Stunard', title: 'VP of Operations', image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face' },
    { name: 'Erik Paloni', title: 'Director of Partnerships', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200&h=200&fit=crop&crop=face' },
    { name: 'Lara Eusenbe', title: 'Chief People Officer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face' },
    { name: 'Steve Jack', title: 'VP of Infrastructure', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
    { name: 'Stefan Gravy', title: 'VP Global Engineering', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face' },
    { name: 'Andrew Baad', title: 'Senior Solutions Architect', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
    { name: 'Peter Trevor', title: 'Director of Data Science', image: 'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?w=200&h=200&fit=crop&crop=face' },
    { name: 'Jarod Lloyd', title: 'Principal Engineer', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=face' },
    { name: 'Robert W. Jackson-Hall', title: 'VP of Legal Affairs', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face' },
    { name: 'Lynne Haggner', title: 'Director of Finance', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face' },
    { name: 'Jeffrey Helman', title: 'Head of Investor Relations', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face' },
    { name: 'Yasmil Morold', title: 'VP of Customer Success', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face' }
  ];

  const investors = [
    { name: 'AKER', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Aker_ASA_logo.svg/200px-Aker_ASA_logo.svg.png' },
    { name: 'NVIDIA', logo: 'https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/200px-Nvidia_logo.svg.png' },
    { name: 'NOKIA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nokia_wordmark.svg/200px-Nokia_wordmark.svg.png' },
    { name: 'DELL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/200px-Dell_Logo.svg.png' },
    { name: 'SANDTON', logo: null },
    { name: 'Point72', logo: null },
    { name: 'G SQUARED', logo: null },
    { name: 'Fidelity', logo: null },
    { name: 'BLUE OWL', logo: null },
    { name: 'T', logo: null }
  ];

  const researchAreas = [
    {
      title: "Data",
      description: "We architect and curate high-quality multilingual and multimodal datasets that power cutting-edge deep learning research. Our team specializes in large-scale data processing, quality filtering and evaluation metrics across text, image, and vision-language domains. From raw data to production-ready training datasets, we build the foundational infrastructure that enables breakthrough AI research."
    },
    {
      title: "Tokenizer",
      description: "Our team designs how raw text is broken into machine-understandable units that an LLM can learn from. Our work directly impacts model accuracy, language coverage, and training efficiency. A well-crafted tokenizer ensures the model understands nuance, rare words, and diverse scripts with minimal waste."
    },
    {
      title: "Tensor & Operations",
      description: "Creating a efficient tensor library that acts as the core of our Deep Learning framework and model training. Allowing training in multiple GPUs and various Datatypes. Core Storage class that manages memory utilization."
    },
    {
      title: "Computational Graph",
      description: "Our team focuses on graph capture, intermediate representation (IR), and graph-level optimizations like fusion and scheduling to maximize hardware utilization. We bridge the gap between flexible eager execution and efficient compiled deployment, ensuring models run at peak performance across diverse accelerators."
    },
    {
      title: "Auto Differentiation",
      description: "We build the mathematical engine that powers model training, delivering a robust and efficient automatic differentiation system. Our team implements precise reverse-mode and forward-mode autodiff mechanisms, ensuring numerical stability and support for complex, dynamic control flows. By abstracting the complexities of gradient computation, we enable researchers to experiment with architectures and loss functions seamlessly."
    },
    {
      title: "Compiler",
      description: "An MLIR-based compiler and runtime that lowers Machine Learning (ML) models to a unified IR. The compiler transforms high-level operations into executable code for both CPU and GPU targets through a multi-stage lowering and optimization pipeline."
    },
    {
      title: "Quantization",
      description: "The Quantization team focuses on making large models faster, lighter, and more deployable without sacrificing quality. They compress model weights and activations so LLMs can run efficiently on real-world hardware. Their work enables high-performance inference at lower cost, power, and latency."
    },
    {
      title: "Distributed Training",
      description: "We are building a distributed training framework to train models across multiple nodes by applying different parallelism techniques. We aim to maximize the GPU utilization and speedup model training."
    }
  ];
  
  // Carousel navigation functions - always show 1 slide at a time
  const visibleCount = 1;
  const totalSlides = researchAreas.length;
  
  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('next');
    setCurrentTestimonialIndex(prev => (prev + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('prev');
    setCurrentTestimonialIndex(prev => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const faqs = [
    {
      question: "What does BluBridge do?",
      answer: "BluBridge is a leading AI infrastructure company that provides enterprise-grade GPU compute resources, cloud platforms, and integrated solutions for training, inference, and deploying AI models at scale. We enable organizations worldwide to accelerate their AI initiatives with reliable, high-performance infrastructure."
    },
    {
      question: "What industries does BluBridge serve?",
      answer: "BluBridge serves a diverse range of industries including technology, finance, healthcare, manufacturing, telecommunications, government, education, and research institutions. Our infrastructure solutions are designed to meet the unique computational demands of each sector."
    },
    // {
    //   question: "Where is BluBridge headquartered?",
    //   answer: "BluBridge is headquartered in Oslo, Norway, with data centers strategically located across Europe and expanding globally. Our facilities are powered by renewable energy sources, reflecting our commitment to sustainable AI infrastructure."
    // },
    {
      question: "Who are BluBridge's key investors?",
      answer: "BluBridge is backed by leading global investors including NVIDIA, Aker, Nokia, Dell Technologies, Point72, G Squared, Fidelity, and Blue Owl Capital. This strong investor base reflects confidence in our technology and market position."
    },
    {
      question: "How can partners or customers get in touch?",
      answer: "Partners and customers can reach out through our Contact page or schedule a consultation through our website. Our team is available to discuss your specific AI infrastructure needs and provide tailored solutions."
    }
  ];

  useDocumentTitle('About | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7] font-['DM_Sans']">
      {/* Hero Section with Motion */}
      <section ref={heroRef} className="relative min-h-screen flex items-start overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
          style={{
            backgroundImage: `url('https://customer-assets.emergentagent.com/job_ui-polish-project-4/artifacts/65bq15uf_HomePage-Banner.png')`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        {/* Subtle overlay for better text readability - very light */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }} />
        
        {/* Animated Light Sweep */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, transparent 50%)`,
            animation: 'lightSweep 8s ease-in-out infinite',
          }}
        />
        
        <style>{`
          @keyframes lightSweep {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
          }
          
          /* Natural zoom-in animation from 0% to 100% */
          @keyframes heroZoomIn {
            0% { 
              opacity: 0; 
              transform: scale(0); 
            }
            50% {
              opacity: 0.8;
              transform: scale(0.6);
            }
            80% {
              opacity: 1;
              transform: scale(1.02);
            }
            100% { 
              opacity: 1; 
              transform: scale(1); 
            }
          }
          
          /* Reduced motion preference */
          @media (prefers-reduced-motion: reduce) {
            .hero-content-animated {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
        
        <div className="container-custom relative z-10 w-full pt-6 md:pt-10 lg:pt-12">
          {/* Unified container for "We are" + BLUBRIDGE logo with single zoom animation */}
          <div 
            className="text-center flex flex-col items-center hero-content-animated"
            style={{
              opacity: 0,
              transform: 'scale(0)',
              animation: 'heroZoomIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards',
            }}
            data-testid="hero-title"
          >
            {/* Line 1: "We are" */}
            <p 
              className="text-white font-normal mb-1 md:mb-2"
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                lineHeight: 1.2,
                letterSpacing: '0.02em',
              }}
              data-testid="hero-we-are-text"
            >
              We are
            </p>
            
            {/* Line 2: BLUBRIDGE Logo Image */}
            <div>
              <img 
                src="https://customer-assets.emergentagent.com/job_ui-polish-project-4/artifacts/oy0aec34_Blu-Logo.png"
                alt="BluBridge"
                style={{
                  width: 'clamp(200px, 40vw, 450px)',
                  height: 'auto',
                }}
                data-testid="hero-blubridge-logo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section - Section 2 */}
      <section className="py-20 bg-[#f3f1e9]">
        <div style={{ maxWidth: '1261px', margin: '0 auto', padding: '0 24px' }}>
          {/* Heading */}
          <h2 
            style={{ 
              fontSize: '36px', 
              fontWeight: '700', 
              color: '#1A1A1A', 
              textAlign: 'center', 
              marginBottom: '32px',
              letterSpacing: '-0.5px'
            }}
            data-testid="who-we-are-title"
          >Who we are</h2>
          
          {/* Introductory Paragraph */}
          <p 
            style={{ 
              fontSize: '18px', 
              lineHeight: '1.7', 
              color: '#333333', 
              textAlign: 'center', 
              marginBottom: '48px',
              margin: '0 auto 48px auto'
            }}>
            We are researchers, engineers, and strategists working at the intersection of AI innovation and business application. Our approach blends original research with real-world problem solving. We explore new possibilities in artificial intelligence while partnering closely with organisations to apply those insights responsibly and effectively.
          </p>
              
          {/* Two Column Grid with White Containers - Animated */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
            {/* Container 1 - Research with Purpose */}
            <AnimatedContainer delay={0} direction="left">
              <div 
                data-testid="who-we-are-container-1"
                style={{ 
                  backgroundColor: '#fffdf7', 
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                  borderLeft: '4px solid rgb(11, 31, 59)',
                  height: '100%'
                }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#0b1f3b', 
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <div>
                    <p style={{ 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      color: '#1A1A1A', 
                      marginBottom: '8px',
                      lineHeight: '1.3'
                    }}>Research with Purpose</p>
                    <p style={{ 
                      fontSize: '16px', 
                      lineHeight: '1.6', 
                      color: '#333333'
                    }}>We conduct applied and foundational AI research aimed at solving meaningful problems. Our work advances models, systems, and methodologies that can be translated into real, deployable solutions.</p>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
            
            {/* Container 2 - From Insight to Implementation */}
            <AnimatedContainer delay={0.15} direction="right">
              <div 
                data-testid="who-we-are-container-2"
                style={{ 
                  backgroundColor: '#fffdf7', 
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                  borderLeft: '4px solid rgb(11, 31, 59)',
                  height: '100%'
                }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#0b1f3b', 
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <div>
                    <p style={{ 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      color: '#1A1A1A', 
                      marginBottom: '8px',
                      lineHeight: '1.3'
                    }}>From Insight to Implementation</p>
                    <p style={{ 
                      fontSize: '16px', 
                      lineHeight: '1.6', 
                      color: '#333333'
                    }}>We don&apos;t stop at theory. Our consulting practice transforms research outcomes into production-ready AI systems, guiding clients from strategy and design to deployment and optimisation.</p>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
            
            {/* Container 3 - Build Responsibly, Grow Confidently */}
            <AnimatedContainer delay={0.3} direction="left">
              <div 
                data-testid="who-we-are-container-3"
                style={{ 
                  backgroundColor: '#fffdf7', 
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                  borderLeft: '4px solid rgb(11, 31, 59)',
                  height: '100%'
                }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#0b1f3b', 
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <div>
                    <p style={{ 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      color: '#1A1A1A', 
                      marginBottom: '8px',
                      lineHeight: '1.3'
                    }}>Build Responsibly, Grow Confidently</p>
                    <p style={{ 
                      fontSize: '16px', 
                      lineHeight: '1.6', 
                      color: '#333333'
                    }}>We prioritise robustness, transparency, and ethical use of AI. Every system we design is built to be reliable, explainable, and scalable in real operational environments.</p>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
            
            {/* Container 4 - Own the Impact */}
            <AnimatedContainer delay={0.45} direction="right">
              <div 
                data-testid="who-we-are-container-4"
                style={{ 
                  backgroundColor: '#fffdf7', 
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                  borderLeft: '4px solid rgb(11, 31, 59)',
                  height: '100%'
                }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#0b1f3b', 
                    marginTop: '8px',
                    flexShrink: 0
                  }} />
                  <div>
                    <p style={{ 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      color: '#1A1A1A', 
                      marginBottom: '8px',
                      lineHeight: '1.3'
                    }}>Own the Impact</p>
                    <p style={{ 
                      fontSize: '16px', 
                      lineHeight: '1.6', 
                      color: '#333333'
                    }}>We take responsibility for outcomes, not just deliverables. By working as an extension of our clients&apos; teams, we ensure that AI initiatives create lasting value, not experimental dead ends.</p>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          </div>
          
          {/* Join Us Button - Centered */}
          <div 
            style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link 
              to="/careers" 
              style={{ 
                display: 'inline-block',
                backgroundColor: '#0B1F3B', 
                color: '#FFFFFF', 
                padding: '14px 32px', 
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                textDecoration: 'none',
                letterSpacing: '0.5px'
              }}
            >
              Join Us
            </Link>
          </div>
        </div>
      </section>
      {/* Leadership Team Section */}
      {/* <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-[#6B7280] text-sm uppercase tracking-wider mb-2">OUR TEAM</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-[#2F3A4A] max-w-3xl leading-relaxed">
              BluBridge is led by proven founders, engineers, strategists and builders — diverse perspectives united by a shared mission to build the infrastructure that powers AI innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-2 border-[#D6DEC3] group-hover:border-blue-500 transition-colors"
                  />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{member.name}</h3>
                <p className="text-[#6B7280] text-xs mb-2">{member.title}</p>
                <div className="flex items-center justify-center gap-2">
                  <button className="text-[#328CC1] text-xs hover:text-blue-300 transition-colors flex items-center gap-1">
                    <Linkedin className="w-3 h-3" />
                    Bio <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Ultra-Premium Testimonials Section */}
      <section 
        ref={researchTeamsRef}
        id="current-research-teams"
        className="py-24 relative overflow-hidden" 
        data-testid="testimonials-section"
      >
        {/* Premium Background with layered gradients and subtle texture */}
        <div className="absolute inset-0 bg-[#fffdf7]" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 20% 20%, rgba(11, 31, 59, 0.03) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(201, 165, 126, 0.05) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 70%)
            `,
          }}
        />
        {/* Subtle noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Abstract decorative shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-[#0B1F3B]/5 to-transparent blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-tl from-[#c9a57e]/10 to-transparent blur-3xl" />
        
        {/* Thin accent lines */}
        <div className="absolute top-1/3 left-0 w-32 h-px bg-gradient-to-r from-transparent via-[#0B1F3B]/10 to-transparent" />
        <div className="absolute bottom-1/3 right-0 w-32 h-px bg-gradient-to-l from-transparent via-[#c9a57e]/20 to-transparent" />
        
        <style>{`
          @keyframes slideFromRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideFromLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideToLeft {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(-100%); opacity: 0; }
          }
          @keyframes slideToRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
          }
          .slide-enter-next {
            animation: slideFromRight 0.6s ease-out forwards;
          }
          .slide-enter-prev {
            animation: slideFromLeft 0.6s ease-out forwards;
          }
          .research-nav-arrow {
            transition: color 0.2s ease;
          }
          .research-nav-arrow:hover {
            color: #0B1F3B;
          }
          .capsule-indicator {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}</style>
        
        <div className="container-custom relative z-10">
          {/* Center-aligned Title */}
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-[#0B1F3B] tracking-tight"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '-0.02em',
              }}
              data-testid="research-areas-title"
            >
              Current Research Teams
            </h2>
            <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-[#0B1F3B] via-[#c9a57e] to-[#0B1F3B] rounded-full opacity-60" />
          </div>
          
          {/* Carousel Container */}
          <div className="relative px-4 md:px-16" data-testid="research-carousel">
            {/* Simple Navigation - Previous */}
            <button
              onClick={prevTestimonial}
              className="research-nav-arrow absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 text-[#0B1F3B]/60 flex items-center justify-center"
              aria-label="Previous slide"
              data-testid="research-prev-btn"
            >
              <ChevronLeft className="w-8 h-8" strokeWidth={1.5} />
            </button>
            
            {/* Simple Navigation - Next */}
            <button
              onClick={nextTestimonial}
              className="research-nav-arrow absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 text-[#0B1F3B]/60 flex items-center justify-center"
              aria-label="Next slide"
              data-testid="research-next-btn"
            >
              <ChevronRight className="w-8 h-8" strokeWidth={1.5} />
            </button>
            
            {/* Research Areas Display - No containers */}
            <div className="mx-8 md:mx-24 lg:mx-32 py-4 overflow-hidden">
              <div className="relative min-h-[200px]">
                {researchAreas.map((area, index) => {
                  const isActive = index === currentTestimonialIndex;
                  if (!isActive) return null;
                  
                  return (
                    <div 
                      key={`${index}-${currentTestimonialIndex}`}
                      className={`w-full px-4 md:px-8 ${slideDirection === 'next' ? 'slide-enter-next' : 'slide-enter-prev'}`}
                      data-testid={`research-card-${index}`}
                    >
                      {/* Content without container - directly on background */}
                      <div className="flex flex-col max-w-3xl mx-auto text-center">
                        {/* Title */}
                        <h3 
                          className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-6"
                          style={{ letterSpacing: '-0.02em' }}
                        >
                          {area.title}
                        </h3>
                        
                        {/* Description */}
                        <p 
                          className="text-[#2F3A4A] leading-relaxed"
                          style={{
                            fontSize: 'clamp(1rem, 1.6vw, 1.1rem)',
                            lineHeight: 1.9,
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {area.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Capsule Pagination Indicators */}
            <div className="flex justify-center items-center gap-3 mt-12" data-testid="research-dots">
              {researchAreas.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSlideDirection(index > currentTestimonialIndex ? 'next' : 'prev');
                    setCurrentTestimonialIndex(index);
                  }}
                  className={`capsule-indicator h-2 rounded-full transition-all duration-500 ${
                    currentTestimonialIndex === index 
                      ? 'w-10 bg-gradient-to-r from-[#0B1F3B] to-[#1a3a5c]' 
                      : 'w-2 bg-[#D6DEC3] hover:bg-[#0B1F3B]/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  data-testid={`research-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Investors Section - Section 4 */}
      {/* <section className="py-20 bg-[#f3f1e9]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Investors</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {investors.map((investor, index) => (
              <div 
                key={index}
                className="bg-slate-800/30 rounded-xl p-6 border border-[#D6DEC3] flex items-center justify-center h-24 hover:border-[#D6DEC3]/50 transition-colors"
              >
                {investor.logo ? (
                  <img 
                    src={investor.logo} 
                    alt={investor.name}
                    className="max-h-8 max-w-full object-contain filter brightness-0 invert opacity-70"
                  />
                ) : (
                  <span className="text-[#2F3A4A] font-bold text-lg tracking-wider">{investor.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>  */}
      {/* Investor Relations Section */}
      {/* <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Investor Relations</h2>
              <p className="text-[#2F3A4A] leading-relaxed">
                BluBridge is a growing market and delivering rapid growth to our investors on the 5 billion company. Stay updated with our latest financial news, quarterly reports, and investor presentations.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[#328CC1] hover:text-blue-300 transition-colors">
                Contact IR team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" 
                alt="Data center facility"
                className="w-full h-[300px] object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section - Section 5 */}
      {/* <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border-b border-[#D6DEC3]"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-5 text-left hover:text-[#328CC1] transition-colors"
                >
                  <span className="text-lg font-medium text-[#0B1F3B] pr-8">{faq.question}</span>
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
                  <p className="text-[#2F3A4A] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Final CTA Strip */}
      <section className="py-16 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-3xl text-white md:text-4xl lg:text-5xl font-bold mb-8">
            {/* Access thousands of GPUs tailored to your requirements. */}
            Know more about our Research
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/research">
              <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-4 py-3 rounded font-medium">
                Explore
              </Button>
            </Link>
            {/* <Link to="/contact">
              <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors font-medium px-6 py-0">
              Contact <ArrowRight className="w-4 h-4" />
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
