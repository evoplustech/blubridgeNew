import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Plus, Minus } from 'lucide-react';

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const contactCards = [
    {
      title: "SALES",
      description: "Speak to our sales team about pricing, products and solutions.",
      buttonText: "Talk to Sales",
      link: "/contact/sales"
    },
    {
      title: "GENERAL",
      description: "For other queries, please get in touch with us via our general form.",
      buttonText: "Get in Touch",
      link: "/contact/general"
    }
  ];

  const faqs = [
    {
      question: "What is AI Compute offered by BluBrg?",
      answer: "BluBrg provides enterprise-grade AI compute infrastructure including GPU clusters, serverless inference, and dedicated training environments. Our platform is optimized for demanding AI workloads with access to the latest NVIDIA GPUs including H100, H200, and GB200 NVL72."
    },
    {
      question: "What industries can benefit from BluBrg?",
      answer: "BluBrg serves a wide range of industries including healthcare, finance, autonomous vehicles, research institutions, and technology companies. Any organization working with AI/ML models, large language models, or compute-intensive workloads can benefit from our infrastructure."
    },
    {
      question: "Can I try services from BluBrg before committing?",
      answer: "Yes, we offer trial periods and proof-of-concept engagements for qualified customers. Contact our sales team to discuss your requirements and learn about our trial programs designed to help you evaluate our platform before making a commitment."
    },
    {
      question: "What GPU options are available?",
      answer: "We offer the latest NVIDIA GPUs including H100, H200, and the new GB200 NVL72 Blackwell architecture. All GPUs are available on-demand with bare-metal performance and can scale from single GPUs to thousands of nodes."
    },
    {
      question: "How does BluBrg ensure data security?",
      answer: "BluBrg implements enterprise-grade security measures including end-to-end encryption, isolated environments, SOC 2 Type II compliance, and GDPR compliance. Our sovereign cloud options provide additional data residency controls for organizations with specific regulatory requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Page Heading Section */}
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <h1 className="text-5xl sm:text-6xl font-light text-white">Contact</h1>
        </div>
      </section>

      {/* Three Contact Cards */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6">
            {contactCards.map((card, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-[#141418] to-[#0d0d10] rounded-xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-4 tracking-wide">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">{card.description}</p>
                <Link to={card.link}>
                  <button className="flex items-center gap-2 text-white text-sm font-medium px-5 py-3 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group">
                    {card.buttonText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Relations Section */}
      {/* <section className="py-20 bg-[#0d0d12]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
           
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-light text-white mb-6">Investor Relations</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Interested in exploring investment opportunities with BluBrg? We're committed to building strong partnerships and offering unique investment opportunities that align with your goals. Our experienced Investor Relations team are happy to help.
              </p>
              <Link to="/contact/investors">
                <button className="flex items-center gap-2 text-white text-sm font-medium px-6 py-3 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group">
                  Contact IR Team
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
            
         
            <div className="order-1 lg:order-2">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80"
                  alt="BluBrg Data Center"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-light text-white mb-12">FAQs</h2>
          
          <div className="max-w-4xl">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border-b border-white/10"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-white text-lg font-light pr-8">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaq === index ? 'bg-white/10 rotate-180' : 'group-hover:border-white/40'}`}>
                    {openFaq === index ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-400 leading-relaxed pr-16">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blue CTA Banner */}
      <section className="relative py-20 overflow-hidden">
        {/* Abstract Blue Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a3a7a] via-[#0055cc] to-[#0066ff]">
          <svg viewBox="0 0 1920 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="ctaWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0077ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0055cc" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="ctaWave2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0088ff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0044aa" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M0,200 Q300,100 600,200 Q900,300 1200,200 Q1500,100 1920,200 L1920,400 L0,400 Z" fill="url(#ctaWave1)" />
            <path d="M0,250 Q400,150 800,250 Q1200,350 1600,250 Q1800,200 1920,250 L1920,400 L0,400 Z" fill="url(#ctaWave2)" />
          </svg>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <h2 className="text-3xl lg:text-4xl font-light text-white max-w-xl">
              Access thousands of GPUs tailored to your requirements.
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/contact/sales">
                <Button className="bg-white text-[#0055cc] hover:bg-white/90 px-8 py-6 text-base font-medium rounded-lg">
                  Reserve GPUs
                </Button>
              </Link>
              <Link to="/contact/sales">
                <button className="flex items-center gap-2 text-white text-base font-medium px-6 py-3 hover:underline transition-all group">
                  Contact Sales
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
