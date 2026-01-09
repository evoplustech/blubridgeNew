import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Plus, Minus, Linkedin ,Zap,Cpu,LayoutGrid} from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const AboutUs = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  // Parallax effect for hero
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const testimonials = [
    {
      quote: "BluBridge provides secure and reliable cloud computing services, essential for AI and machine learning operations. The infrastructure allows for efficient processing and storage of sensitive data while ensuring robust security and compliance measures.",
      author: "Richard Beckman",
      title: "CEO & Founder",
      company: "Hyperon"
    },
    {
      quote: "The team at BluBridge has been instrumental in helping us scale our AI research capabilities. Their GPU infrastructure is world-class and their support team truly understands the unique challenges of running large-scale machine learning workloads.",
      author: "Maria Santos",
      title: "Chief Technology Officer",
      company: "AI Research Labs"
    },
    {
      quote: "We've been able to accelerate our model training by 10x since partnering with BluBridge. The combination of cutting-edge hardware and intuitive platform tools has transformed how we approach AI development.",
      author: "James Chen",
      title: "VP of Engineering",
      company: "TechForward Inc"
    }
  ];

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
      <section ref={heroRef} className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
          style={{
            backgroundImage: `url('https://customer-assets.emergentagent.com/job_f1ae1432-e69e-4452-8bf4-7695fb1baeb9/artifacts/jfdn1ooz_DSC09568%20%282%29.JPG')`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-black/70" />
        
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
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl" style={{ animation: 'fadeInUp 1s ease-out' }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white/60 text-sm font-medium tracking-wider uppercase">ABOUT US</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              Building the Next Frontier<br />for AI
            </h1>
            
            <p className="text-white/90 text-lg max-w-2xl leading-relaxed mb-8">
              We are an AI research and consulting company focused on turning intelligence into real-world impact.
              Our work bridges deep research with practical execution, helping organisations move from ideas to deployed AI systems. By combining scientific rigor with hands-on consulting, we enable businesses to build, scale, and trust AI that delivers measurable outcomes.
            </p>
            
            <Link to="/contact">
              <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded font-medium">
                Get in touch
              </Button>
            </Link>
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
            }}>Who we are</h2>
          
          {/* Introductory Paragraph */}
          <p 
            style={{ 
              fontSize: '18px', 
              lineHeight: '1.7', 
              color: '#333333', 
              textAlign: 'center', 
              marginBottom: '48px',
              maxWidth: '900px',
              margin: '0 auto 48px auto'
            }}>
            We are researchers, engineers, and strategists working at the intersection of AI innovation and business application. Our approach blends original research with real-world problem solving. We explore new possibilities in artificial intelligence while partnering closely with organisations to apply those insights responsibly and effectively.
          </p>
              
          {/* Two Column Grid with White Containers */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px' }}>
            {/* Container 1 - Research with Purpose */}
            <div 
              style={{ 
                backgroundColor: '#FFFFFF', 
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #e5e5e5',
                borderLeft: '4px solid rgb(11, 31, 59)'
              }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: '#328CC1', 
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
            
            {/* Container 2 - From Insight to Implementation */}
            <div 
              style={{ 
                backgroundColor: '#FFFFFF', 
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #e5e5e5',
                borderLeft: '4px solid rgb(11, 31, 59)'
              }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: '#328CC1', 
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
            
            {/* Container 3 - Build Responsibly, Grow Confidently */}
            <div 
              style={{ 
                backgroundColor: '#FFFFFF', 
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #e5e5e5',
                borderLeft: '4px solid rgb(11, 31, 59)'
              }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: '#328CC1', 
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
            
            {/* Container 4 - Own the Impact */}
            <div 
              style={{ 
                backgroundColor: '#FFFFFF', 
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #e5e5e5',
                borderLeft: '4px solid rgb(11, 31, 59)'
              }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: '#328CC1', 
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

      {/* Testimonials Section - Section 3 */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Testimonials</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#efede5] rounded-2xl p-6 border border-[#D6DEC3]">
                <p className="text-[#2F3A4A] text-sm leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="text-[#0B1F3B] font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-[#6B7280] text-xs">{testimonial.title}</p>
                  <p className="text-[#6B7280] text-xs">{testimonial.company}</p>
                </div>
              </div>
            ))}
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
            <Link to="/contact">
              <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-4 py-3 rounded font-medium">
                Contact Us
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
