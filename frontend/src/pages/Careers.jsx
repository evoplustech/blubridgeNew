import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Plus, Minus } from 'lucide-react';

const Careers = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const canvasRef = useRef(null);

  // Animated flowing lines for hero
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

    const drawFlowingLines = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Draw multiple flowing curves
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const startY = height * 0.3 + i * 40;
        const amplitude = 30 + i * 10;
        const frequency = 0.003 + i * 0.0005;
        const phase = time * (1 + i * 0.2);

        ctx.moveTo(0, startY);
        
        for (let x = 0; x <= width; x += 5) {
          const y = startY + Math.sin(x * frequency + phase) * amplitude + 
                    Math.sin(x * frequency * 2 + phase * 1.5) * (amplitude * 0.5);
          ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
        gradient.addColorStop(0.3, `rgba(59, 130, 246, ${0.3 - i * 0.05})`);
        gradient.addColorStop(0.7, `rgba(59, 130, 246, ${0.4 - i * 0.05})`);
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 - i * 0.2;
        ctx.stroke();
      }

      // Add subtle glow particles
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time + i * 0.5) + 1) * width * 0.5;
        const y = height * 0.2 + (Math.cos(time * 0.5 + i * 0.3) + 1) * height * 0.3;
        const size = 2 + Math.sin(time * 2 + i) * 1;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.2 + Math.sin(time + i) * 0.1})`;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(drawFlowingLines);
    };

    resize();
    window.addEventListener('resize', resize);
    drawFlowingLines();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const values = [
    {
      title: "Relentless Innovation",
      description: "We constantly challenge the status quo and embrace creative problem-solving. Our goal is to build technology that pushes boundaries and sets new standards.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
      imagePosition: "right"
    },
    {
      title: "Openness and Transparency",
      description: "We value honest communication and mutual trust. People here share insights openly, learn from each other, and create systems that are secure, reliable, and effective.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
      imagePosition: "left"
    },
    {
      title: "Sustainability",
      description: "We think about the long-term impacts of the technology we build. Our approach prioritises environmental and societal considerations, ensuring our solutions are both powerful and responsible.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
      imagePosition: "right"
    },
    {
      title: "Ownership and Accountability",
      description: "Every team member takes responsibility for their work and its outcomes. We set high standards and strive for excellence in everything we do.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
      imagePosition: "left"
    },
    {
      title: "Customer-Centric Focus",
      description: "Our customers are at the heart of what we deliver. By deeply understanding their needs and challenges, we aim to exceed expectations through quality products and thoughtful service.",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80",
      imagePosition: "right"
    },
    {
      title: "Full-Speed Collaboration",
      description: "We collaborate efficiently and respectfully to solve problems together. Clear communication and mutual support help us achieve our shared goals.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
      imagePosition: "left"
    }
  ];

  const cultureImages = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80",
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80"
  ];

  const faqs = [
    {
      question: "What roles are currently open?",
      answer: "We're actively hiring across engineering, product, operations, and business functions. Our most in-demand roles include ML Infrastructure Engineers, Backend Engineers, DevOps specialists, and Product Managers. Visit our careers portal for the full list of open positions."
    },
    {
      question: "Do you offer remote or hybrid work?",
      answer: "Yes! We embrace flexible work arrangements. Many of our roles are remote-first, and we also offer hybrid options for those near our offices in Oslo, London, and other key locations. We believe in empowering our team to work where they're most productive."
    },
    {
      question: "What is the hiring process like?",
      answer: "Our hiring process typically includes an initial recruiter screen, followed by technical assessments relevant to the role, team interviews, and a final conversation with leadership. We aim to complete the process within 2-3 weeks and provide timely feedback at each stage."
    },
    {
      question: "What benefits do you offer?",
      answer: "We offer competitive compensation packages including equity, comprehensive health insurance, generous PTO, parental leave, learning and development budgets, home office stipends, and regular team events. We're committed to supporting our team's well-being and growth."
    },
    {
      question: "How can I apply or get in touch?",
      answer: "You can apply directly through our careers page by selecting a role and submitting your application. For general inquiries or if you don't see a suitable role, feel free to send your resume to careers@blubrg.com. We review every application carefully."
    }
  ];

  useDocumentTitle('Careers | BluBrg');

  return (
    <div className="min-h-screen bg-[#F3F6E8] text-white font-['DM_Sans']">      {/* Hero Section with Animated Flowing Lines */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        {/* Dark background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />
        
        {/* Animated canvas for flowing lines */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
          style={{ background: 'transparent' }}
        />
        
        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="max-w-2xl" style={{ animation: 'fadeInUp 1s ease-out' }}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Join the team building<br />next-gen AI infrastructure
            </h1>
            
            <p className="text-[#243447] text-lg leading-relaxed mb-8">
              We are building the first AI-native hyperscaler, a platform engineered for performance, efficiency, and massive scale. Join us in creating infrastructure that enables organisations around the world to advance their AI ambitions.
            </p>
            
            <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded font-medium">
              Open Positions
            </Button>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-[#F3F6E8]">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold max-w-4xl mx-auto leading-tight">Our Mission</h2>
          <p className="text-[#5B6B7A] text-lg mb-4 ">
          Build the first AI-native hyperscaler, empowering innovators with high-performance, scalable infrastructure.
          Our goal is to create a cloud platform purpose-built for AI, one that combines massive computational power with reliability and flexibility. We want to help innovators accelerate their ideas by providing infrastructure that keeps up with the demands of modern AI systems.
          </p>
        </div>
      </section>

      {/* Culture Image Strip */}
      <section className="py-8 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cultureImages.map((img, index) => (
              <div key={index} className="aspect-video rounded-xl overflow-hidden">
                <img 
                  src={img} 
                  alt={`Team culture ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Value Section */}
      <section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What we value</h2>
            <p className="text-[#243447] text-lg max-w-2xl">
              We are a team that moves fast, aims high, and works with purpose, all driven by curiosity, collaboration, and a commitment to excellence.
            </p>
          </div>

          <div className="space-y-20">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  value.imagePosition === 'left' ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {value.imagePosition === 'right' ? (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-1 h-16 bg-blue-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-bold text-[#328CC1] mb-3">{value.title}</h3>
                          <p className="text-[#243447] leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden">
                      <img 
                        src={value.image} 
                        alt={value.title}
                        className="w-full h-[300px] object-cover"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-2xl overflow-hidden order-2 lg:order-1">
                      <img 
                        src={value.image} 
                        alt={value.title}
                        className="w-full h-[300px] object-cover"
                      />
                    </div>
                    <div className="space-y-4 order-1 lg:order-2">
                      <div className="flex items-start gap-3">
                        <div className="w-1 h-16 bg-blue-500 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-bold text-[#328CC1] mb-3">{value.title}</h3>
                          <p className="text-[#243447] leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at BluBrg - Video Section */}
      {/* <section className="py-20 bg-[#EEF2DC]">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Life at BluBrg</h2>
            <p className="text-[#243447] text-lg max-w-2xl">
              Our workplace culture is one where people come together to innovate, learn, and grow. We support each other, work hard, and celebrate what we achieve as a team.
            </p>
          </div>

          
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video max-w-4xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
              title="Life at BluBrg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-[#243447]">
              <span>Watch on</span>
              <span className="text-[#0B1F3B] font-semibold">▶ YouTube</span>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom max-w-4xl">
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
      </section>

      {/* Final CTA Strip */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            Access thousands of GPUs tailored to your requirements.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact/sales">
              <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact/sales" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors font-medium px-6 py-0">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
