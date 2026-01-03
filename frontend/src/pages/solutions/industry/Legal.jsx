import React, { useState } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid, Cpu } from 'lucide-react';

const Legal = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useDocumentTitle('Transform the Practise of Law | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      {/* HERO SECTION with Background Image */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://customer-assets.emergentagent.com/job_visual-swap-4/artifacts/98b6i769_b1.png)'
          }}
        />
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3B]/85 via-[#0B1F3B]/60 to-transparent" />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              LEGAL
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              At BluBridge, we offer GPU cluster computing solutions designed to elevate your organisation's computing capabilities. Our infrastructure supports advanced legal analytics, accelerates case research, and helps legal teams deliver more efficient and impactful services.
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

      {/* 3-Column Value Highlights */}
      <section className="py-16 bg-[#f3f1e9] border-t border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Enhanced Document Analysis</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Use powerful AI tools to quickly process and interpret large volumes of legal documents, speeding up tasks such as reviewing case files, contracts, and evidence with greater accuracy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Improved Predictive Analytics</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Apply machine learning techniques to forecast case trends, assess litigation risk, and uncover patterns across historical data, enabling more informed decision-making.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Cost Efficiency and Scalability</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Adopt robust GPU computing resources that adjust to workload demands, helping legal teams increase productivity while managing costs as requirements grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Uses Section */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-violet-400 text-sm font-medium mb-3 uppercase tracking-wider">TRANSFORMING LEGAL WORKFLOWS</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4">Example uses</h2>
            <p className="text-base text-[#6B7280] max-w-3xl">
            Explore how legal organisations use high-performance GPU infrastructure to improve workflows, support critical tasks, and drive innovation across core legal operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Automated Analysis */}
            <div className="border-l-2 border-violet-500 pl-6">
              <h3 className="text-lg font-semibold text-violet-400 mb-2">Automated Analysis</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">AI-Powered Document Processing</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Reduce preparation time by automating the review and interpretation of large datasets, allowing legal professionals to focus on strategy and judgement.
              </p>
            </div>

            {/* Regulatory Adherence */}
            <div className="border-l-2 border-violet-500 pl-6">
              <h3 className="text-lg font-semibold text-violet-400 mb-2">Regulatory Adherence</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Compliance Monitoring</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Use AI-driven solutions to track and maintain compliance with evolving legal standards, helping reduce regulatory risk and potential penalties.
              </p>
            </div>

            {/* Case Strategy */}
            <div className="border-l-2 border-violet-500 pl-6">
              <h3 className="text-lg font-semibold text-violet-400 mb-2">Case Strategy</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Predictive Legal Intelligence</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Leverage historical insights and predictive modelling to inform litigation strategies, enabling stronger planning and more effective tactical decisions.
              </p>
            </div>

            {/* Contract Management */}
            <div className="border-l-2 border-violet-500 pl-6">
              <h3 className="text-lg font-semibold text-violet-400 mb-2">Contract Management</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Intelligent Contract Lifecycle</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Improve contract workflows by automatically identifying key clauses, potential risks, and important details, ensuring consistency and reducing manual effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">Key Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Compute Training Card */}
            <div className="bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-violet-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500/30 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-violet-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-violet-400 text-sm mb-4">Training</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                A scalable compute environment optimised to shorten model training cycles and increase productivity for legal AI workloads.
              </p>
            </div>

            {/* AI Compute Inference Card */}
            <div className="bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-violet-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-violet-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-violet-400 text-sm mb-4">Inference</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
               A high-performance platform designed to efficiently run inference workloads for production-level AI applications used in legal processes.
              </p>
            </div>

            {/* AI Marketplace Card */}
            <div className="bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-violet-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500/30 to-blue-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-violet-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Marketplace</h3>
              <p className="text-violet-400 text-sm mb-4">Marketplace</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                A collection of tools and frameworks that support the development, deployment, and scaling of AI applications tailored to legal use cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Solutions */}
      <section className="py-20 bg-[#fffdf7]">
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
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/tbqd1w9m_Training.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">TRAINING</span>
                </div>
              </div>
            </Link>

            {/* AI & ML Inference Card - Blue Angular */}
            <Link to="/solutions/inference">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/2qvmu3rl_INFERENCE.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">INFERENCE</span>
                </div>
              </div>
            </Link>

            {/* AI Development Card - Orange/Bronze Wave */}
            <Link to="/solutions/ai-development">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/u12c3np1_AI%20Development.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-lg">AI DEVELOPMENT</span>
                </div>
              </div>
            </Link>

            {/* Model Fine-Tuning Card - Green Wave */}
            <Link to="/solutions/fine-tuning">
              <div className="relative h-52 border border-[#D6DEC3] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
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
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">FAQs</h2>
          <div className="max-w-4xl space-y-3">
            {[
              {
                question: "How can AI improve legal document review?",
                answer: "AI-powered document review uses natural language processing to analyse contracts, briefs, and legal filings at scale. Our GPU-accelerated platform can process thousands of documents in minutes, identifying key clauses, risks, and inconsistencies with up to 95% accuracy."
              },
              {
                question: "Is BluBridge's platform secure for confidential legal data?",
                answer: "Yes, BluBridge maintains enterprise-grade security with SOC 2 Type II certification, end-to-end encryption, and private VPC deployments. We understand attorney-client privilege requirements and have designed our infrastructure to meet the highest standards of legal confidentiality."
              },
              {
                question: "Can BluBridge help with legal research and case prediction?",
                answer: "Absolutely. Our platform enables AI models that can analyse millions of case precedents, predict litigation outcomes, and identify relevant legal arguments. Law firms using our infrastructure report 90% time savings in legal research tasks."
              },
              {
                question: "What types of legal AI applications can run on BluBridge?",
                answer: "BluBridge supports a wide range of legal AI applications including contract analysis, e-discovery, due diligence automation, compliance monitoring, legal chatbots, and predictive analytics for case outcomes. Our marketplace includes pre-built legal AI tools and frameworks."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#D6DEC3]">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-violet-400 transition-colors"
                >
                  <span className="text-base font-medium text-[#0B1F3B] pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-violet-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-violet-400" />
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

export default Legal;
