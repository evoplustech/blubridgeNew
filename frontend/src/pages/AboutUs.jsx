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
              Building the Next Frontier for AI
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
      <section className="py-24 bg-[#f3f1e9]">
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
              <Link 
                to="/research" 
                className="inline-block px-8 py-3 bg-[#0B1F3B] text-white rounded-md font-medium hover:bg-[#162B4D] transition-colors text-base"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                data-testid="our-mission-read-more-btn"
              >
                Read more
              </Link>
            </div>
            
            {/* Right - Eagle Illustration - max-width 250px */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end" style={{ maxWidth: '250px', width: '100%' }}>
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

       <section className="py-20 bg-[#efede5]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left - Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">Work with BluBridge</h2>
              <p className="text-black leading-relaxed mb-8">
                We are a small creative group driven by rigorous scientific thinking. Our work blends deep research with real-world execution, building AI models that are efficient, practical, and powerful, guided by both academic excellence and an agile, business-ready approach.
              </p>
              <Link to="/careers">
                <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-8 py-3 rounded-md font-medium">
                  Join us
                </Button>
              </Link>
            </div>
            
            {/* Right - Team Image */}
            <div className="rounded-2xl overflow-hidden">
              <img 
                src="https://customer-assets.emergentagent.com/job_web-redesign-22/artifacts/h3z2nkmb_img-right.png" 
                alt="BluBridge Team" 
                className="w-full h-auto object-cover rounded-2xl"
              />
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
