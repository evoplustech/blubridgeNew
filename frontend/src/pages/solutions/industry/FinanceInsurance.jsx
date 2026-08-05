import React, { useState } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid, Cpu } from 'lucide-react';

const FinanceInsurance = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useDocumentTitle('Enhancing Finance and Insurance Services with Cloud GPUs | BluBridge');

  return (
    <div className="min-h-screen bg-[#f0f1f9]">
      {/* HERO SECTION with Background Image */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://customer-assets.emergentagent.com/job_visual-swap-4/artifacts/vuzoogt1_FINANCE.png)'
          }}
        />
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3B]/85 via-[#0B1F3B]/60 to-transparent" />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              FINANCE & INSURANCE
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              At BluBridge, we are providing GPU cloud computing solutions designed to strengthen the computational capabilities of finance and insurance organisations. Our platform is helping teams deliver innovative services faster while improving efficiency, security, and performance across data-intensive operations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-[#0B1F3B] px-10 py-6 text-base font-medium rounded-md">
                  Get Started
                </Button>
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium">
                Contact <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Value Pillars */}
      <section className="py-16 bg-[#e8eaf3] border-t border-[#d4d8e8]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Support Computational Needs</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Running demanding workloads such as financial modelling, risk assessment, and large-scale analytics using powerful GPU-accelerated infrastructure built for high performance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Accelerate Data Analysis</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Processing vast datasets at speed to generate real-time insights that are supporting informed, time-critical decision-making across financial operations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Scale on demand</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Adapting compute capacity seamlessly as workloads change, ensuring peak performance during high-demand periods while maintaining cost efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Uses Section */}
      <section className="py-24 bg-[#f0f1f9]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-[#328CC1] text-sm font-medium mb-3 uppercase tracking-wider">GAIN A COMPETITIVE EDGE</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4">Example uses</h2>
            <p className="text-base text-[#6B7280] max-w-3xl">
              Financial and insurance organisations that leverage GPU cloud technologies gain competitive advantages through faster insights, improved efficiency, and enhanced customer engagement.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Financial Modelling */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Financial Modelling</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Accelerated development</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Speed up the development and evaluation of complex financial models by using GPU resources that allow quicker iteration and deeper analysis.
              </p>
            </div>

            {/* Fraud Detection */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Fraud Detection</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Real-time Analysis</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Apply GPU-accelerated processing to detect anomalies in real time, helping identify fraudulent activity and reduce financial risk.
              </p>
            </div>

            {/* Monte Carlo Simulations */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Monte Carlo Simulations</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Reduced time to insights</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Execute Monte Carlo simulations more rapidly to support derivative pricing, portfolio optimisation, and advanced risk calculations.
              </p>
            </div>

            {/* Customer Service */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Customer Service</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Powered by AI Cloud</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Deploy AI-powered chatbots and virtual assistants to manage customer interactions efficiently, improving response times and service quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-24 bg-[#f0f1f9]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">Key Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Compute Training Card */}
            <Link className="" to="/products/training">
            <div className="hover:bg-[#f5f4f1] min-h-[310px] hover:text-[#328CC1] bg-white border border-[#d4d8e8] rounded-xl p-8 hover:border-blue-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-[#328CC1]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-[#328CC1] text-sm mb-4">Training</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                A scalable compute environment optimised to reduce training time and increase productivity for machine learning and data science teams.              </p>
            </div>
            </Link>
            {/* AI Compute Inference Card */}
            <Link className="" to="/products/inference">
            <div className="hover:bg-[#f5f4f1] min-h-[310px] hover:text-[#328CC1] bg-white border border-[#d4d8e8] rounded-xl p-8 hover:border-blue-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 rounded-xl flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-[#328CC1]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-[#328CC1] text-sm mb-4">Inference</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                A performance-optimised platform designed to run inference workloads efficiently at scale for production AI applications.
              </p>
            </div>
            </Link>
            {/* AI Marketplace Card */}
            <Link className="" to="/products/marketplace">
            <div className="hover:bg-[#f5f4f1] hover:text-[#328CC1] bg-white border border-[#d4d8e8] rounded-xl p-8 hover:border-blue-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-[#328CC1]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Marketplace</h3>
              <p className="text-[#328CC1] text-sm mb-4">Marketplace</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                A collection of tools and services that support building, deploying, and scaling AI solutions using both BluBridge offerings and widely used AI frameworks.
              </p>
            </div>
            </Link>
          </div>
        </div>
      </section>

      {/* More Solutions */}
      <section className="py-20 bg-[#f0f1f9]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#0B1F3B]">More solutions</h2>
            <p className="text-[#2F3A4A] max-w-2xl">
              BluBridge accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            {/* Model Training Card - Purple Wave */}
            <Link to="/solutions/training">
              <div className="relative border border-[#d4d8e8] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/tbqd1w9m_Training.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">TRAINING</span>
                </div>
              </div>
            </Link>

            {/* AI & ML Inference Card - Blue Angular */}
            <Link to="/solutions/inference">
              <div className="relative border border-[#d4d8e8] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/2qvmu3rl_INFERENCE.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">INFERENCE</span>
                </div>
              </div>
            </Link>

            {/* AI Development Card - Orange/Bronze Wave */}
            <Link to="/solutions/ai-development">
              <div className="relative border border-[#d4d8e8] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/u12c3np1_AI%20Development.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">AI DEVELOPMENT</span>
                </div>
              </div>
            </Link>

            {/* Model Fine-Tuning Card - Green Wave */}
            <Link to="/solutions/fine-tuning">
              <div className="relative h-52 border border-[#d4d8e8] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/zsuql6xm_Finetuning.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">FINE-TUNING</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* FAQs */}
      <section className="py-24 bg-[#f0f1f9]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">FAQs</h2>
          <div className="max-w-4xl space-y-3">
            {[
              {
                question: "What makes BluBridge's GPU Cloud suitable for financial services?",
                answer: "BluBridge provides enterprise-grade security with SOC 2 and ISO 27001 compliance, sub-millisecond latency for real-time trading applications, and the computational power needed for complex financial modelling, risk analysis, and fraud detection at scale."
              },
              {
                question: "How does BluBridge handle regulatory compliance?",
                answer: "Our infrastructure is built with compliance in mind, supporting GDPR, CCPA, and PCI DSS requirements. We provide comprehensive audit logging, data residency controls, and real-time compliance monitoring to meet financial regulatory standards."
              },
              {
                question: "Can BluBridge support high-frequency trading workloads?",
                answer: "Yes, BluBridge's infrastructure delivers sub-millisecond latency and can process millions of transactions per second. Our GPU-accelerated platform is optimised for algorithmic trading, market analysis, and real-time risk calculations."
              },
              {
                question: "What security measures protect financial data on BluBridge?",
                answer: "We implement end-to-end encryption, private VPC deployments, role-based access control, and comprehensive audit logging. Our data centres undergo regular penetration testing and maintain 99.99% uptime SLA for financial-grade reliability."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#d4d8e8]">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-[#328CC1] transition-colors"
                >
                  <span className="text-base font-medium text-[#0B1F3B] pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-[#328CC1]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#328CC1]" />
                    )}
                  </div>
                </button>
                {openFaq === i && (
                  <div className="pb-6">
                    <p className="text-[#6B7280] text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white">
            Access thousands of GPUs tailored to your requirements.
          </h2> 
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors font-medium px-6 py-1">
              Contact <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinanceInsurance;
