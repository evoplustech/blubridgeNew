import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const contactCards = [
    {
      title: "SALES",
      description: "Get in touch with our sales team to discuss pricing, product options, and tailored solutions that fit your organisation’s needs.",
      buttonText: "Talk to Sales",
      link: "/contact/sales"
    },
    {
      title: "GENERAL",
      description: "For questions that aren’t related to sales such as general enquiries or requests for information, please use our contact form to reach out to us.",
      buttonText: "Get in Touch",
      link: "/contact/general-enquiry"
    }
  ];

  const faqs = [
    {
      question: "What is AI Compute offered by BluBrg?",
      answer: "AI Compute provides on-demand access to powerful GPU resources that allow businesses and developers to run intensive computational tasks such as training AI models, performing data analytics, and executing complex simulations, all without needing to buy expensive hardware upfront."
    },
    {
      question: "What industries can benefit from BluBrg?",
      answer: "A wide range of industries can use Blubrg’s infrastructure, including artificial intelligence and machine learning research, gaming and entertainment for graphics and simulation, healthcare for imaging and data analysis, finance for modelling and risk analysis, automotive for autonomous systems, and aerospace for engineering simulations."
    },
    {
      question: "Can I try services from BluBrg before committing?",
      answer: "Yes, there is an option to try the platform before making a longer-term commitment. During the trial period, you can access GPU resources, run workloads, and test performance to ensure the platform meets your needs."
    }
  ];

  useDocumentTitle('Contact | BluBrg');

  return (
    <div className="min-h-screen bg-[#F3F6E8]">
      {/* Page Heading Section */}
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <h1 className="text-5xl sm:text-6xl font-light text-[#0B1F3B]">Contact</h1>
        </div>
      </section>

      {/* Three Contact Cards */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6">
            {contactCards.map((card, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 border border-[#D6DEC3] hover:border-[#328CC1] hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-[#0B1F3B] mb-4 tracking-wide">{card.title}</h3>
                <p className="text-[#243447] text-sm leading-relaxed mb-8">{card.description}</p>
                <Link to={card.link}>
                  <button className="flex items-center gap-2 text-[#0B1F3B] text-sm font-medium px-5 py-3 rounded-lg border border-[#D6DEC3] hover:border-[#0B1F3B] hover:bg-[#EEF2DC] transition-all duration-300 group">
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
      {/* <section className="py-20 bg-[#EEF2DC]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
           
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-light text-[#0B1F3B] mb-6">Investor Relations</h2>
              <p className="text-[#243447] leading-relaxed mb-8">
                Interested in exploring investment opportunities with BluBrg? We're committed to building strong partnerships and offering unique investment opportunities that align with your goals. Our experienced Investor Relations team are happy to help.
              </p>
              <Link to="/contact/investors">
                <button className="flex items-center gap-2 text-[#0B1F3B] text-sm font-medium px-6 py-3 rounded-lg border border-[#D6DEC3] hover:border-[#0B1F3B] hover:bg-[#EEF2DC] transition-all duration-300 group">
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
      <section className="py-20 bg-[#EEF2DC]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-light text-[#0B1F3B] mb-12">FAQs</h2>
          
          <div className="max-w-4xl">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border-b border-[#D6DEC3]"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-[#0B1F3B] text-lg font-light pr-8">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full border border-[#D6DEC3] flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaq === index ? 'bg-[#EEF2DC] rotate-180' : 'group-hover:border-[#0B1F3B]'}`}>
                    {openFaq === index ? (
                      <Minus className="w-4 h-4 text-[#0B1F3B]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#0B1F3B]" />
                    )}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[#243447] leading-relaxed pr-16">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 overflow-hidden bg-[#0B1F3B]">
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <h2 className="text-3xl lg:text-4xl font-light text-white max-w-xl">
              Access thousands of GPUs tailored to your requirements.
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/contact/sales">
                <Button className="bg-white text-[#0B1F3B] hover:bg-[#EEF2DC] px-8 py-6 text-base font-medium rounded-lg">
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
