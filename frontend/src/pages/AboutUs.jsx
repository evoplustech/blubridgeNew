import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Plus, Minus, Linkedin, Zap, Cpu, LayoutGrid, ChevronLeft, ChevronRight, SlidersHorizontal, TrendingUp, Rocket, Database, Brain, Shield, Lightbulb } from 'lucide-react';
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

// Scroll-triggered animated item component for How We Build section
const ScrollAnimatedItem = ({ children, direction = 'left', delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={isVisible ? (direction === 'left' ? 'slide-left-animate' : 'slide-right-animate') : 'scroll-hidden'}
      style={{ 
        animationDelay: `${delay}ms`,
        opacity: isVisible ? undefined : 0
      }}
    >
      {children}
    </div>
  );
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

// Premium Typing Animation Text Component with Looping Backspace Effect
const PassionTypingText = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const textRef = useRef(null);
  const animationRef = useRef(null);
  
  const staticText = "It's Our ";
  const words = ["Passion.", "Craft."];
  
  // Intersection Observer to trigger animation when text is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (textRef.current) {
      observer.observe(textRef.current);
    }
    
    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [hasStarted]);
  
  // Main looping animation
  useEffect(() => {
    if (!hasStarted) return;
    
    let isCancelled = false;
    
    const delay = (ms) => new Promise(resolve => {
      animationRef.current = setTimeout(resolve, ms);
    });
    
    const typeWord = async (word) => {
      setShowCursor(true); // Show cursor during typing
      for (let i = 0; i <= word.length; i++) {
        if (isCancelled) return;
        setDisplayText(word.slice(0, i));
        await delay(75 + Math.random() * 45);
      }
    };
    
    const backspaceWord = async (word) => {
      setShowCursor(true); // Show cursor during backspace
      for (let i = word.length; i >= 0; i--) {
        if (isCancelled) return;
        setDisplayText(word.slice(0, i));
        await delay(45 + Math.random() * 25);
      }
    };
    
    const runLoop = async () => {
      while (!isCancelled) {
        // Type "Passion"
        await typeWord(words[0]);
        
        // Hold for 2 seconds - hide cursor
        setShowCursor(false);
        await delay(2000);
        
        // Backspace "Passion"
        await backspaceWord(words[0]);
        
        // Small pause before typing next word
        setShowCursor(false);
        await delay(100);
        
        // Type "Craft"
        await typeWord(words[1]);
        
        // Hold for 2 seconds - hide cursor
        setShowCursor(false);
        await delay(2000);
        
        // Backspace "Craft"
        await backspaceWord(words[1]);
        
        // Small pause before looping
        setShowCursor(false);
        await delay(100);
      }
    };
    
    // Start animation with initial delay
    const startTimeout = setTimeout(() => {
      runLoop();
    }, 300);
    
    return () => {
      isCancelled = true;
      clearTimeout(startTimeout);
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [hasStarted]);
  
  return (
    <div 
      ref={textRef}
      className="text-left"
      data-testid="passion-typing-text"
    >
      <h2 
        className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#0B1F3B] leading-tight"
        style={{ 
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: '-0.02em'
        }}
        data-testid="passion-heading"
      >
        <span>{staticText}</span>
        <span className="inline">
          {displayText}
          {showCursor && (
            <span 
              className="inline-block w-[3px] ml-[1px]"
              style={{ 
                height: '0.75em',
                backgroundColor: '#C9A227',
                verticalAlign: 'middle',
                marginBottom: '0.05em'
              }}
            />
          )}
        </span>
      </h2>
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
      description: "We architect and curate high-quality multilingual and multimodal datasets that power cutting-edge deep learning research. Our team specializes in large-scale data processing, quality filtering and evaluation metrics across text, image, and vision-language domains. From raw data to production-ready training datasets, we build the foundational infrastructure that enables breakthrough AI research.",
      xProfile: "https://x.com/Data_team89"
    },
    {
      title: "Tokenizer",
      description: "Our team designs how raw text is broken into machine-understandable units that an LLM can learn from. Our work directly impacts model accuracy, language coverage, and training efficiency. A well-crafted tokenizer ensures the model understands nuance, rare words, and diverse scripts with minimal waste.",
      xProfile: "https://x.com/Tokenizer89"
    },
    {
      title: "Tensor & Operations",
      description: "Creating a efficient tensor library that acts as the core of our Deep Learning framework and model training. Allowing training in multiple GPUs and various Datatypes. Core Storage class that manages memory utilization.",
      xProfile: "https://x.com/Tensorandops"
    },
    {
      title: "Computational Graph",
      description: "Our team focuses on graph capture, intermediate representation (IR), and graph-level optimizations like fusion and scheduling to maximize hardware utilization. We bridge the gap between flexible eager execution and efficient compiled deployment, ensuring models run at peak performance across diverse accelerators.",
      xProfile: "https://x.com/CGautodiff"
    },
    {
      title: "Auto Differentiation",
      description: "We build the mathematical engine that powers model training, delivering a robust and efficient automatic differentiation system. Our team implements precise reverse-mode and forward-mode autodiff mechanisms, ensuring numerical stability and support for complex, dynamic control flows. By abstracting the complexities of gradient computation, we enable researchers to experiment with architectures and loss functions seamlessly.",
      xProfile: "https://x.com/CGautodiff"
    },
    {
      title: "Compiler",
      description: "An MLIR-based compiler and runtime that lowers Machine Learning (ML) models to a unified IR. The compiler transforms high-level operations into executable code for both CPU and GPU targets through a multi-stage lowering and optimization pipeline.",
      xProfile: "https://x.com/Compiler_team"
    },
    {
      title: "Quantization",
      description: "The Quantization team focuses on making large models faster, lighter, and more deployable without sacrificing quality. They compress model weights and activations so LLMs can run efficiently on real-world hardware. Their work enables high-performance inference at lower cost, power, and latency.",
      xProfile: "https://x.com/Quantization89"
    },
    {
      title: "Distributed Training",
      description: "We are building a distributed training framework to train models across multiple nodes by applying different parallelism techniques. We aim to maximize the GPU utilization and speedup model training.",
      xProfile: "https://x.com/Parallelism89"
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
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
          style={{
            backgroundImage: `url('https://customer-assets.emergentagent.com/job_ui-interactive-nav/artifacts/3g9ggy4y_SA7.jpg')`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        {/* Dark gradient overlay for text readability - stronger on left side */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.7) 100%)',
          }} 
        />
        
        <div className="container-custom relative z-10 w-full py-20">
          {/* Left-aligned content */}
          <div 
            className="flex flex-col items-start max-w-2xl"
            data-testid="hero-title"
          >
            {/* "ABOUT US" label */}
            <p 
              className="text-[#c9a57e] uppercase tracking-widest mb-6 font-medium"
              style={{
                fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                letterSpacing: '0.2em',
              }}
            >
              About Us
            </p>
            
            {/* Main Heading */}
            <h1 
              className="text-white font-bold mb-8"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                fontFamily: "'DM Sans', sans-serif",
              }}
              data-testid="hero-heading"
            >
              Building the Next Frontier of AI
            </h1>
            
            {/* Description */}
            <p 
              className="text-white/90 mb-10 leading-relaxed"
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
                lineHeight: 1.8,
                maxWidth: '600px',
              }}
            >
              We are an AI research and consulting company focused on turning intelligence into real-world impact. Our work bridges deep research with practical execution, helping organisations move from ideas to deployed AI systems. By combining scientific rigor with hands-on consulting, we enable businesses to build, scale, and trust AI that delivers measurable outcomes.
            </p>
            
            {/* Get in touch button */}
            <Link to="/contact">
              <button 
                className="bg-white text-[#0B1F3B] px-8 py-4 rounded font-medium text-base hover:bg-gray-100 transition-colors duration-300"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                }}
                data-testid="hero-cta-btn"
              >
                Get in touch
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission Section - Section 2 */}
      <section className="py-24 bg-[#fffdf7]">
        {/* Enhanced Wing Glitter Animation Styles - On Bird Wings Only */}
        <style>{`
          @keyframes softGlow {
            0%, 100% {
              filter: drop-shadow(0 0 8px rgba(100, 180, 255, 0.3)) 
                      drop-shadow(0 0 20px rgba(100, 180, 255, 0.15))
                      drop-shadow(0 0 40px rgba(100, 180, 255, 0.08));
            }
            50% {
              filter: drop-shadow(0 0 12px rgba(100, 180, 255, 0.4)) 
                      drop-shadow(0 0 28px rgba(100, 180, 255, 0.2))
                      drop-shadow(0 0 50px rgba(100, 180, 255, 0.1));
            }
          }
          
          @keyframes wingSparkle {
            0% { opacity: 0; transform: scale(0.3) rotate(0deg); }
            25% { opacity: 1; transform: scale(1.2) rotate(45deg); }
            50% { opacity: 0.8; transform: scale(1) rotate(90deg); }
            75% { opacity: 0.5; transform: scale(0.8) rotate(135deg); }
            100% { opacity: 0; transform: scale(0.3) rotate(180deg); }
          }
          
          @keyframes wingGlitterPulse {
            0%, 100% { 
              opacity: 0.3; 
              transform: scale(0.8);
              box-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
            }
            50% { 
              opacity: 1; 
              transform: scale(1.3);
              box-shadow: 0 0 12px rgba(255, 255, 255, 0.9), 0 0 20px rgba(100, 200, 255, 0.6);
            }
          }
          
          @keyframes wingShimmer {
            0% { 
              opacity: 0;
              transform: translateX(-3px) translateY(2px) scale(0.5);
            }
            30% { 
              opacity: 1;
              transform: translateX(0) translateY(0) scale(1);
            }
            70% { 
              opacity: 0.8;
              transform: translateX(3px) translateY(-2px) scale(1.1);
            }
            100% { 
              opacity: 0;
              transform: translateX(6px) translateY(-4px) scale(0.5);
            }
          }
          
          @keyframes starBurst {
            0%, 100% { 
              opacity: 0.2;
              transform: scale(0.6) rotate(0deg);
            }
            50% { 
              opacity: 1;
              transform: scale(1.4) rotate(180deg);
            }
          }
          
          .bird-glow-container {
            position: relative;
            animation: softGlow 4s ease-in-out infinite;
          }
          
          /* Wing glitter particles - positioned on actual wings */
          .wing-glitter {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
          }
          
          /* Left wing glitter - positioned on the bird's left wing area */
          .wing-l1 { top: 32%; left: 22%; width: 5px; height: 5px; background: radial-gradient(circle, #ffffff 0%, #64d2ff 40%, transparent 70%); animation: wingGlitterPulse 2s ease-in-out infinite 0s; }
          .wing-l2 { top: 38%; left: 26%; width: 4px; height: 4px; background: radial-gradient(circle, #ffffff 0%, #a0e7ff 40%, transparent 70%); animation: wingGlitterPulse 2.3s ease-in-out infinite 0.3s; }
          .wing-l3 { top: 35%; left: 30%; width: 6px; height: 6px; background: radial-gradient(circle, #ffffff 0%, #7dd3fc 40%, transparent 70%); animation: wingSparkle 3s ease-in-out infinite 0.5s; }
          .wing-l4 { top: 42%; left: 28%; width: 4px; height: 4px; background: radial-gradient(circle, #ffffff 0%, #bae6fd 40%, transparent 70%); animation: wingGlitterPulse 1.8s ease-in-out infinite 0.2s; }
          .wing-l5 { top: 30%; left: 34%; width: 5px; height: 5px; background: radial-gradient(circle, #ffffff 0%, #93c5fd 40%, transparent 70%); animation: wingShimmer 2.5s ease-in-out infinite 0.7s; }
          .wing-l6 { top: 45%; left: 32%; width: 5px; height: 5px; background: radial-gradient(circle, #ffffff 0%, #60a5fa 40%, transparent 70%); animation: wingGlitterPulse 2.1s ease-in-out infinite 0.4s; }
          .wing-l7 { top: 28%; left: 28%; width: 4px; height: 4px; background: radial-gradient(circle, #ffffff 0%, #38bdf8 40%, transparent 70%); animation: starBurst 2.8s ease-in-out infinite 0.1s; }
          
          /* Right wing glitter - positioned on the bird's right wing area */
          .wing-r1 { top: 32%; right: 22%; width: 5px; height: 5px; background: radial-gradient(circle, #ffffff 0%, #f0abfc 40%, transparent 70%); animation: wingGlitterPulse 2.2s ease-in-out infinite 0.1s; }
          .wing-r2 { top: 38%; right: 26%; width: 4px; height: 4px; background: radial-gradient(circle, #ffffff 0%, #e879f9 40%, transparent 70%); animation: wingGlitterPulse 1.9s ease-in-out infinite 0.4s; }
          .wing-r3 { top: 35%; right: 30%; width: 6px; height: 6px; background: radial-gradient(circle, #ffffff 0%, #d946ef 40%, transparent 70%); animation: wingSparkle 2.7s ease-in-out infinite 0.6s; }
          .wing-r4 { top: 42%; right: 28%; width: 4px; height: 4px; background: radial-gradient(circle, #ffffff 0%, #c084fc 40%, transparent 70%); animation: wingGlitterPulse 2.4s ease-in-out infinite 0.3s; }
          .wing-r5 { top: 30%; right: 34%; width: 5px; height: 5px; background: radial-gradient(circle, #ffffff 0%, #a855f7 40%, transparent 70%); animation: wingShimmer 2.6s ease-in-out infinite 0.8s; }
          .wing-r6 { top: 45%; right: 32%; width: 5px; height: 5px; background: radial-gradient(circle, #ffffff 0%, #8b5cf6 40%, transparent 70%); animation: wingGlitterPulse 2s ease-in-out infinite 0.5s; }
          .wing-r7 { top: 28%; right: 28%; width: 4px; height: 4px; background: radial-gradient(circle, #ffffff 0%, #fb7185 40%, transparent 70%); animation: starBurst 3s ease-in-out infinite 0.2s; }
          
          /* Wing feather tip glitters */
          .wing-tip1 { top: 25%; left: 35%; width: 4px; height: 4px; background: radial-gradient(circle, #ffffff 0%, #fcd34d 40%, transparent 70%); animation: wingShimmer 3.5s ease-in-out infinite 0s; }
          .wing-tip2 { top: 25%; right: 35%; width: 4px; height: 4px; background: radial-gradient(circle, #ffffff 0%, #fbbf24 40%, transparent 70%); animation: wingShimmer 3.2s ease-in-out infinite 0.4s; }
          .wing-tip3 { top: 48%; left: 35%; width: 4px; height: 4px; background: radial-gradient(circle, #ffffff 0%, #34d399 40%, transparent 70%); animation: wingGlitterPulse 2.5s ease-in-out infinite 0.6s; }
          .wing-tip4 { top: 48%; right: 35%; width: 4px; height: 4px; background: radial-gradient(circle, #ffffff 0%, #2dd4bf 40%, transparent 70%); animation: wingGlitterPulse 2.3s ease-in-out infinite 0.9s; }
        `}</style>
        
        <div style={{ maxWidth: '1261px', margin: '0 auto', padding: '0 24px' }}>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Left Content - Fixed width 940px */}
            <div className="order-2 lg:order-1" style={{ width: '940px', maxWidth: '100%' }}>
              {/* Heading "Our Mission" */}
              <h2 
                className="text-[#0B1F3B]"
                style={{ 
                  fontSize: 'clamp(32px, 5vw, 42px)', 
                  fontWeight: '700', 
                  marginBottom: '24px',
                  letterSpacing: '-0.5px',
                  lineHeight: '1.15',
                  fontFamily: "'DM Sans', sans-serif"
                }}
                data-testid="our-mission-title"
              >
                Our Mission
              </h2>
              
              {/* Description Paragraph */}
              <p 
                style={{ 
                  fontSize: '17px', 
                  lineHeight: '1.75', 
                  color: '#4B5563', 
                  marginBottom: '32px',
                  fontFamily: "'DM Sans', sans-serif"
                }}
                data-testid="our-mission-description"
              >
                We are driven to move AI ahead for both the open ecosystem and enterprise users. Our focus is on building open-weight models that match the performance of closed, proprietary systems. As we continue shaping the future of AI, there is much more innovation on the way.
              </p>
              
              {/* Read More Button - Dark navy background */}
              <Link to="/careers">
                <Button className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-8 py-3 rounded-md font-medium">
                  Join us
                </Button>
              </Link>
            </div>
            
            {/* Right - Eagle Illustration with Wing Glitter Effects */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end" style={{ maxWidth: '250px', width: '100%' }}>
              <div className="bird-glow-container relative">
                {/* Left Wing Glitter Particles - On Wings */}
                <div className="wing-glitter wing-l1" />
                <div className="wing-glitter wing-l2" />
                <div className="wing-glitter wing-l3" />
                <div className="wing-glitter wing-l4" />
                <div className="wing-glitter wing-l5" />
                <div className="wing-glitter wing-l6" />
                <div className="wing-glitter wing-l7" />
                
                {/* Right Wing Glitter Particles - On Wings */}
                <div className="wing-glitter wing-r1" />
                <div className="wing-glitter wing-r2" />
                <div className="wing-glitter wing-r3" />
                <div className="wing-glitter wing-r4" />
                <div className="wing-glitter wing-r5" />
                <div className="wing-glitter wing-r6" />
                <div className="wing-glitter wing-r7" />
                
                {/* Wing Tip Glitters */}
                <div className="wing-glitter wing-tip1" />
                <div className="wing-glitter wing-tip2" />
                <div className="wing-glitter wing-tip3" />
                <div className="wing-glitter wing-tip4" />
                
                {/* Bird Image */}
                <img 
                  src="https://customer-assets.emergentagent.com/job_d48a1dae-4c36-4318-b28c-bedd073aa6d3/artifacts/llrlfhzt_toolfk_a_majestic_eagle_in_.png" 
                  alt="Digital technology eagle representing AI innovation"
                  style={{
                    maxWidth: '250px',
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                  className="hidden sm:block"
                  data-testid="our-mission-eagle-image"
                />
              </div>
            </div>
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

      {/* Research Teams Grid Section */}
           {/* Who We Are Section - Section 2 */}
      {/* <section className="py-20 bg-[#fffdf7]">
        <div style={{ maxWidth: '1261px', margin: '0 auto', padding: '0 24px' }}>
          
          <h2 
            style={{ 
              fontSize: '36px', 
              fontWeight: '700', 
              color: '#1A1A1A', 
              textAlign: 'center', 
              marginBottom: '48px',
              letterSpacing: '-0.5px'
            }}
            data-testid="who-we-are-title"
          >Our Way of Working</h2>
          
         
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
           
            <AnimatedContainer delay={0} direction="left">
              <div 
                data-testid="who-we-are-container-1"
                style={{ 
                  backgroundColor: '#f3f1e9', 
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                  borderLeft: '4px solid rgb(11, 31, 59)',
                  height: '100%'
                }}>
                <p style={{ 
                  fontSize: '16px', 
                  lineHeight: '1.7', 
                  color: '#333333'
                }}>We create high-performance generative models for developers and enterprises worldwide, working with speed, ownership, and a strong culture of collaboration.</p>
              </div>
            </AnimatedContainer>
            
           
            <AnimatedContainer delay={0.15} direction="right">
              <div 
                data-testid="who-we-are-container-2"
                style={{ 
                  backgroundColor: '#f3f1e9', 
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                  borderLeft: '4px solid rgb(11, 31, 59)',
                  height: '100%'
                }}>
                <p style={{ 
                  fontSize: '16px', 
                  lineHeight: '1.7', 
                  color: '#333333'
                }}>We believe openness and precision drive excellence, operating with complete transparency and a disciplined approach to building advanced AI systems.</p>
              </div>
            </AnimatedContainer>
            
           
            <AnimatedContainer delay={0.3} direction="left">
              <div 
                data-testid="who-we-are-container-3"
                style={{ 
                  backgroundColor: '#f3f1e9', 
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                  borderLeft: '4px solid rgb(11, 31, 59)',
                  height: '100%'
                }}>
                <p style={{ 
                  fontSize: '16px', 
                  lineHeight: '1.7', 
                  color: '#333333'
                }}>Innovation is at our core. We continuously explore new paths to unlock efficiency and push the boundaries of what modern models can achieve.</p>
              </div>
            </AnimatedContainer>
            
           
            <AnimatedContainer delay={0.45} direction="right">
              <div 
                data-testid="who-we-are-container-4"
                style={{ 
                  backgroundColor: '#f3f1e9', 
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid #e5e5e5',
                  borderLeft: '4px solid rgb(11, 31, 59)',
                  height: '100%'
                }}>
                <p style={{ 
                  fontSize: '16px', 
                  lineHeight: '1.7', 
                  color: '#333333'
                }}>Our work is grounded in real-world impact, powered by a diverse team whose varied backgrounds and expertise shape AI that truly serves people.</p>
              </div>
            </AnimatedContainer>
          </div>
          
          
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
      </section> */}

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

       {/* How We Build, Innovate, and Lead Section - Premium Redesign */}
      <section className="py-24 bg-[#efede5] overflow-hidden relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #0B1F3B 1px, transparent 0)',
              backgroundSize: '48px 48px'
            }}
          />
        </div>
        
        {/* Animation Keyframes */}
        <style>{`
          @keyframes slideFromLeft {
            0% {
              opacity: 0;
              transform: translateX(-60px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes slideFromRight {
            0% {
              opacity: 0;
              transform: translateX(60px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .slide-left-animate {
            animation: slideFromLeft 0.7s ease-out forwards;
          }
          .slide-right-animate {
            animation: slideFromRight 0.7s ease-out forwards;
          }
          .scroll-hidden {
            opacity: 0;
          }
          .premium-card {
            background: linear-gradient(135deg, #fffdf7 0%, #fafaf5 100%);
            border: 1px solid rgba(11, 31, 59, 0.06);
            transition: all 0.4s ease;
          }
          .premium-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(11, 31, 59, 0.08);
            border-color: rgba(50, 140, 193, 0.15);
          }
          .premium-number {
            font-size: 64px;
            font-weight: 800;
            background: #e3e0d3;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1;
          }
        `}</style>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              {/* <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#328CC1]/40" />
              <span className="text-[#328CC1] text-sm font-semibold uppercase tracking-[0.2em]">Our Philosophy</span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#328CC1]/40" /> */}
            </div>
            <h2 
              className="text-4xl md:text-5xl font-bold text-[#0B1F3B] leading-tight"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              data-testid="how-we-build-heading"
            >
              How We Build, Innovate and Lead
            </h2>
          </div>
          
          {/* Premium 2x2 Grid Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 - Our Purpose */}
            <ScrollAnimatedItem direction="left" delay={0}>
              <div className="premium-card rounded-2xl p-8 h-full">
                <div className="flex items-start gap-5">
                  <span className="premium-number">1</span>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-[#0B1F3B] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Our Purpose
                    </h3>
                    <p className="text-[#4B5563] leading-relaxed">
                      We founded Blubridge to advance AI research and deliver powerful, accessible solutions for real-world needs. Everything we build is application-driven, turning AI innovation into tangible value.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimatedItem>
            
            {/* Card 2 - How We Work */}
            <ScrollAnimatedItem direction="right" delay={100}>
              <div className="premium-card rounded-2xl p-8 h-full">
                <div className="flex items-start gap-5">
                  <span className="premium-number">2</span>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-[#0B1F3B] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      How We Work
                    </h3>
                    <p className="text-[#4B5563] leading-relaxed">
                      Our teams move fast with purpose, combining individual ownership with strong collaboration. We operate with transparency, believing open exchange is key to building better intelligence.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimatedItem>
            
            {/* Card 3 - Excellence */}
            <ScrollAnimatedItem direction="left" delay={200}>
              <div className="premium-card rounded-2xl p-8 h-full">
                <div className="flex items-start gap-5">
                  <span className="premium-number">3</span>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-[#0B1F3B] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Excellence Through Rigor
                    </h3>
                    <p className="text-[#4B5563] leading-relaxed">
                      Rigor defines our research, ensuring every model is grounded in technical excellence. Creativity drives us to discover new paths toward efficiency and performance.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimatedItem>
            
            {/* Card 4 - Our People */}
            <ScrollAnimatedItem direction="right" delay={300}>
              <div className="premium-card rounded-2xl p-8 h-full">
                <div className="flex items-start gap-5">
                  <span className="premium-number">4</span>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-[#0B1F3B] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Our People
                    </h3>
                    <p className="text-[#4B5563] leading-relaxed">
                      We are proud to be a diverse team, bringing together people from many backgrounds and perspectives. We are united by a broad and deep range of expertise across the AI landscape.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimatedItem>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart Section - Clean Minimalist Design */}
      <section className="py-24 md:py-32 bg-white" data-testid="what-sets-us-apart-section">
        <div className="mx-auto px-6" style={{ maxWidth: '1261px' }}>
          {/* Header */}
          <div className="text-center mb-20">
            <h2 
              className="text-4xl md:text-5xl font-bold text-[#0B1F3B] mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.02em' }}
              data-testid="what-sets-us-apart-heading"
            >
              What sets us apart
            </h2>
            <p 
              className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              We're focused on removing friction from work so teams can spend more time on what truly matters.
            </p>
          </div>
          
          {/* Features Grid - 3 columns top, 1 centered bottom */}
          <div className="space-y-16">
            {/* Top Row - 3 Features */}
            <div className="grid md:grid-cols-3 gap-12 md:gap-16">
              {/* Feature 1 - Simple by design */}
              <div className="text-left">
                <h3 
                  className="text-xl md:text-2xl font-bold text-[#0B1F3B] mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Simple by design
                </h3>
                <p className="text-[#4B5563] leading-relaxed text-base md:text-lg">
                  Our enterprise-ready solutions are built to deploy, adapt, and operate with ease. We remove unnecessary complexity, making everyday work smoother and processes more efficient.
                </p>
              </div>
              
              {/* Feature 2 - Fast results */}
              <div className="text-left">
                <h3 
                  className="text-xl md:text-2xl font-bold text-[#0B1F3B] mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Fast results
                </h3>
                <p className="text-[#4B5563] leading-relaxed text-base md:text-lg">
                  Our software delivers real value in days or weeks—not months or years. We help teams move quickly with precision, creating experiences that both customers and employees genuinely appreciate.
                </p>
              </div>
              
              {/* Feature 3 - Human-centered AI */}
              <div className="text-left">
                <h3 
                  className="text-xl md:text-2xl font-bold text-[#0B1F3B] mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Human-centered AI
                </h3>
                <p className="text-[#4B5563] leading-relaxed text-base md:text-lg">
                  Our AI-powered tools amplify human capability, helping people deliver outstanding service. We design everything with users in mind—because people always come first.
                </p>
              </div>
            </div>
            
            {/* Bottom Row - "No hidden catches" on LEFT + "It's Our Passion & Craft." on RIGHT */}
            <div className="grid md:grid-cols-3 gap-14 md:gap-12 items-end">
              {/* Left Side - No hidden catches with gold line */}
              <div className="flex items-start gap-6 w-sm">
                <div className="text-left flex-1">
                  <h3 
                    className="text-xl md:text-2xl font-bold text-[#0B1F3B] mb-4"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    No hidden catches
                  </h3>
                  <p className="text-[#4B5563] leading-relaxed text-base md:text-lg">
                    With dependable products, clear pricing, and straightforward communication, there are no unpleasant surprises. We aim to build trust, not test your tolerance.
                  </p>
                </div>
                {/* Gold decorative line */}
                {/* <div 
                  className="hidden md:block w-[2px] self-stretch"
                  style={{ backgroundColor: '#C9A227', minHeight: '100px' }}
                /> */}
              </div>
              
              {/* Right Side - Typing Animation "It's Our Passion & Craft." */}
              <div className="md:col-span-2">
                <PassionTypingText />
              </div>
            </div>
          </div>
        </div>
      </section>

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
