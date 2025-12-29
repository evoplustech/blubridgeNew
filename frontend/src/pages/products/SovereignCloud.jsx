import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Server, Play } from 'lucide-react';

const SovereignCloud = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeCard, setActiveCard] = useState(2); // Scalability is highlighted by default
  const heroRef = useRef(null);
  const [heroOffset, setHeroOffset] = useState(0);

  // Parallax effect for hero background
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const heroHeight = heroRef.current.offsetHeight;
        if (scrollY < heroHeight) {
          setHeroOffset(scrollY * 0.3);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Value Pillars Data (5 cards)
  const valuePillars = [
    {
      id: 0,
      title: 'DATA SECURITY',
      description: 'The platform operates under UK and European regulations and is managed by local teams. Its architecture is designed to minimise external exposure and safeguard sensitive information through strong governance and access controls.',
      bgColor: 'bg-blue-900/80'
    },
    {
      id: 1,
      title: 'ECONOMIC',
      description: 'AI that powers local prosperity A sovereign cloud model ensures that the economic benefits of AI such as revenue generation, talent development, and innovation remain within national borders, reinforcing long-term economic resilience.',
      bgColor: 'bg-slate-900'
    },
    {
      id: 2,
      title: 'SCALABILITY',
      description: 'Blubrg is built to scale Blubrg Cloud delivers hyperscaler-level performance while maintaining the control and governance required by sovereign organisations. The infrastructure can expand seamlessly to meet growing workload demands.',
      bgColor: 'bg-[#0B1F3B]',
      hasLink: true
    },
    {
      id: 3,
      title: 'MODULARITY',
      description: 'Infrastructure where you need it Through modular private cloud deployments, Blubrg offers flexible infrastructure that can be upgraded and adapted over time, making it well suited for distributed deployment across European data centres.',
      bgColor: 'bg-slate-900'
    },
    {
      id: 4,
      title: 'SUSTAINABILITY',
      description: 'Eco-aware cloud performance By using renewable energy sources and optimised data-centre designs, Blubrg provides environmentally responsible cloud services without compromising performance, control, or reliability.',
      bgColor: 'bg-slate-900'
    }
  ];

  // Related Content Data
  const relatedContent = [
    {
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&q=80',
      date: 'June 5, 2025',
      category: 'ANNOUNCEMENT',
      title: 'European business leaders agree sovereign AI infrastructure is essential',
      excerpt: '74% of European enterprises and AI businesses are concerned about the impact of non-EU data laws'
    },
    {
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
      date: 'June 3, 2025',
      category: 'NEWS/BLOG POST',
      title: 'Data sovereignty vs. data residency',
      excerpt: 'What\'s the difference?'
    },
    {
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
      date: 'May 28, 2025',
      category: 'NEWS/BLOG POST',
      title: 'The importance of sovereign cloud in an AI era',
      excerpt: 'Why organisations need sovereign infrastructure'
    },
    {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
      date: 'May 21, 2025',
      category: 'ANNOUNCEMENT',
      title: 'AI hyperscaler BluBrg launches Serverless Inference Platform',
      excerpt: 'New platform for scalable AI inference'
    }
  ];

  // FAQ Data
  const faqs = [
    {
      question: "Why is sovereignty important for AI workloads?",
      answer: "AI systems often process sensitive and mission-critical data. Hosting them on sovereign infrastructure ensures compliance with data residency regulations, reduces dependence on foreign cloud providers, and enhances organisational and national security."
    },
    {
      question: "Can BluBrg support both public and private sector workloads?",
      answer: "Yes. Blubrg can be deployed as dedicated or air-gapped environments suitable for government bodies, defence organisations, research institutions, and enterprises, offering scalable compute tailored to diverse requirements."
    },
    {
      question: "How is BluBrg different from other cloud providers?",
      answer: "Unlike traditional hyperscalers, Blubrg focuses on AI-optimised infrastructure delivered through sovereign hosting, combining high-performance GPU compute with strong governance and control."
    },
    {
      question: "What GPUs and compute resources are available?",
      answer: "Blubrg offers clusters built on NVIDIA H100, H200, and GB200 GPUs, with flexible deployment options including bare-metal and virtualised environments, supported by orchestration tools such as SLURM and Kubernetes."
    },
    {
      question: "How can I speak with someone about my organisation's sovereign AI needs?",
      answer: "You can connect with the Blubrg team to discuss solutions tailored to your specific technical and regulatory requirements."
    }
  ];

  // Infrastructure services for diagram
  const infrastructureServices = [
    { name: 'Serverless', type: 'top' },
    { name: 'Marketplace', type: 'top' },
    { name: 'Inference', type: 'middle' },
    { name: 'Training', type: 'middle' },
    { name: 'GPU nodes', type: 'bottom' }
  ];

  const infrastructureTools = [
    'LLM Library',
    'Job Scheduling',
    'Container Orchestration',
    'Optimised Libraries',
    'Optimised Compilers and Tools',
    'Optimised Runtime'
  ];

  useDocumentTitle('Sovereign AI Cloud made for Europe, by Europe | BluBrg');

  return (
    <div className="min-h-screen bg-[#F3F1E9] font-['DM_Sans']">      {/* SECTION 1: Hero Section with Landscape Background and Parallax */}
      <section ref={heroRef} className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Background Landscape Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`,
            transform: `translateY(${heroOffset}px) scale(1.1)`
          }}
        />
        
        {/* Light Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F3F6E8]/90 via-[#F3F6E8]/70 to-[#F3F6E8]/50" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl" style={{ animation: 'fadeInUp 1s ease-out' }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#0B1F3B]" style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}>
              YOUR AI.<br />
              YOUR HOME ADVANTAGE.
            </h1>
            
            <p className="text-[#243447] text-lg max-w-2xl leading-relaxed mb-8" style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}>
              Blubrg’s Sovereign AI Cloud is purpose-built for Europe, delivering strong data protection, operational control, and scalable infrastructure while supporting regional economic development and sustainability objectives.
            </p>
            
            <div style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
              <Link to="/contact/sales">
                <Button className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-8 py-3 rounded font-medium">
                  Get In Touch
                </Button>
              </Link>
              <Link to="/contact/sales" className="inline-flex items-center px-3 gap-2 text-[#328CC1] hover:text-[#0B1F3B] transition-colors font-medium">
                Contact Sales <ArrowRight className="w-4 h-4" />
              </Link>
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

      {/* SECTION 2: Sovereign AI Cloud Intro */}
      <section className="py-20 bg-[#F3F1E9]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#243447] text-sm uppercase tracking-wider mb-2">THE ADVANTAGES OF A</p>
              <h2 className="text-4xl md:text-5xl font-bold">
                Sovereign AI Cloud
              </h2>
            </div>
            
            <div>
              <p className="text-[#243447] leading-relaxed">
                Blubrg empowers European organisations to design, deploy, and manage AI systems using their own infrastructure, data, teams, and networks. This approach ensures independence from external providers while keeping data ownership and innovation within local jurisdictions. By retaining intellectual property and skills domestically, organisations can create jobs, strengthen economies, and reduce reliance on foreign legal systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Value Pillars Card Grid (5 Cards) */}
      <section className="py-12 bg-[#F3F1E9]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {valuePillars.map((pillar, i) => (
              <div className={`p-6 rounded-xl transition-all duration-300 cursor-pointer bg-slate-900`}>
                <h3 className="text-sm font-bold text-[#0B1F3B] mb-3 tracking-wider">{pillar.title}</h3>
                <p className="text-[#243447] text-xs leading-relaxed">{pillar.description}</p>
                {/* {pillar.hasLink && activeCard === i && ( */}
                  <Link to="/contact/sales" className="text-[#0B1F3B] text-xs mt-4 inline-flex items-center gap-1 hover:underline">
                    Contact Sales <ArrowRight className="w-3 h-3" />
                  </Link>
                {/* )} */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: What We Offer with Video Embed */}
      {/* <section className="py-20 bg-[#F3F1E9]">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What we offer</h2>
            <p className="text-[#243447] max-w-2xl mx-auto">
              Blubrg provides a complete AI-ready platform engineered to deliver cost-effective, high-performance compute for demanding workloads.
            </p>
          </div>

         
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-slate-900/50 rounded-xl border border-[#D6DEC3] overflow-hidden aspect-video">
             
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl md:text-8xl font-bold text-white/10 mb-4">model</div>
                </div>
              </div>
              
             
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer hover:bg-black/20 transition-colors">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>

           
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded">
                <span className="text-xs text-white">Watch on</span>
                <span className="text-xs text-red-500 font-semibold">▶ YouTube</span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* SECTION 5: Related Content */}
      {/* <section className="py-20 bg-[#F3F1E9]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Related Content</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {relatedContent.map((article, i) => (
              <div key={i} className="bg-slate-900/50 rounded-xl border border-[#D6DEC3]/30 overflow-hidden hover:border-[#D6DEC3]/50 transition-colors cursor-pointer">
                <div className="aspect-video bg-slate-800 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-[#5B6B7A]">{article.date}</span>
                    <span className="text-xs text-[#328CC1] uppercase">{article.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#0B1F3B] mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-xs text-[#243447] line-clamp-2">{article.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* SECTION 6: Fully Integrated AI Infrastructure */}
      <section className="py-20 bg-[#F3F1E9]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Get access to a fully<br />integrated suite of AI<br />services and compute
              </h2>
              <p className="text-[#243447] mb-6 leading-relaxed">
                Run AI workloads more efficiently on a unified platform designed to reduce complexity and operational overhead. Whether using Blubrg’s built-in AI and machine learning tools or integrating your own stack, the platform supports a smooth transition from experimentation to production.
              </p>
            </div>
            
            {/* Infrastructure Diagram */}
            <div className="bg-slate-900/30 rounded-xl border border-[#D6DEC3]/30 p-6">
              {/* Service Flow */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#EEF2DC] rounded-lg p-3 text-center border border-[#D6DEC3]/30">
                  <span className="text-sm text-[#243447]">Serverless Marketplace Training Inference GPU nodes</span>
                </div>
                <div className="bg-[#EEF2DC] rounded-lg p-3 text-center border border-[#D6DEC3]/30">
                  <span className="text-sm text-[#243447]">Marketplace</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#0B1F3B]/20 rounded-lg p-3 text-center border border-blue-500/30">
                  <span className="text-sm text-blue-300">Inference</span>
                </div>
                <div className="bg-[#0B1F3B]/20 rounded-lg p-3 text-center border border-blue-500/30">
                  <span className="text-sm text-blue-300">Training</span>
                </div>
              </div>
              
              {/* Tools Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {infrastructureTools.map((tool, i) => (
                  <div key={i} className="bg-slate-800/30 rounded-lg p-2 text-center border border-[#D6DEC3]/20">
                    <span className="text-xs text-[#243447]">{tool}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-[#EEF2DC] rounded-lg p-3 text-center border border-[#D6DEC3]/30 mb-4">
                <span className="text-sm text-[#243447]">GPU nodes</span>
              </div>
              
              {/* Data Center Badge */}
              <div className="bg-slate-900 rounded-lg p-4 border border-[#D6DEC3]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0B1F3B]/20 rounded-lg flex items-center justify-center">
                    <Server className="w-4 h-4 text-[#328CC1]" />
                  </div>
                  <div>
                    <div className="text-[#0B1F3B] text-sm font-medium">BluBrg's Data centers</div>
                    <div className="text-xs text-[#5B6B7A]">Powered by renewable energy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQs */}
      <section className="py-20 bg-[#F3F1E9]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">FAQs</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border-b border-[#D6DEC3] pb-4"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left py-3 group"
                >
                  <span className="text-[#0B1F3B] text-lg pr-4">{faq.question}</span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-[#0B1F3B] rotate-180' : 'bg-[#0B1F3B]/80'}`}>
                    {openFaq === index ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-[#243447] pb-4 pr-12">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Final CTA Strip */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#0B1F3B]">
            Access thousands of GPUs tailored to your<br />requirements.
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/contact/sales">
              <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact/sales" className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors font-medium">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SovereignCloud;
