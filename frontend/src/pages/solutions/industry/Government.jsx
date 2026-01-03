import React, { useState } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid, Cpu } from 'lucide-react';

const Government = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useDocumentTitle('Drive Innovation in Public Services | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      {/* HERO SECTION with Background Image */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://customer-assets.emergentagent.com/job_visual-swap-4/artifacts/glxuqiod_b5.png)'
          }}
        />
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3B]/85 via-[#0B1F3B]/60 to-transparent" />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              GOVERNMENT
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              BluBridge provides secure, scalable GPU cloud infrastructure designed to help government organisations modernise operations, drive data-informed decision making, and support digital transformation initiatives across public services.
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

      {/* 3-Column Value Propositions */}
      <section className="py-16 bg-[#f3f1e9] border-t border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Enhanced Data Processing</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Enable government teams to handle and interpret large volumes of data quickly, supporting advanced analytics, real-time monitoring, and AI-based insights that improve operational effectiveness.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Accelerated AI Development</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Deploy and adopt advanced AI technologies more rapidly, enabling capabilities such as enhanced security monitoring, automated services for citizens, and tools for reducing fraud, all while improving service delivery.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Cost Efficiency and Scalability</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Benefit from infrastructure that scales based on demand, allowing agencies to optimise compute resources and control costs without investing in and maintaining large physical hardware fleets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Uses Section */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-[#328CC1] text-sm font-medium mb-3 uppercase tracking-wider">BUILD A MODERN, DIGITAL PUBLIC SECTOR</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4">Example uses</h2>
            <p className="text-base text-[#6B7280] max-w-3xl">
              BluBridge's GPU cloud helps public sector organisations enhance efficiency, improve service quality, and introduce innovative AI-driven solutions across various government functions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Predictive Analytics in Healthcare */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Predictive Analytics in Healthcare</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Improved health outcomes</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Improve public health planning and forecasting by using AI to analyse health data, helping anticipate disease outbreaks and manage medical resources more effectively.
              </p>
            </div>

            {/* Environmental Monitoring */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Environmental Monitoring</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Protect Natural Resources</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Accelerate complex simulations and analytics to assess climate conditions, track natural resources, and support planning for sustainable infrastructure and environmental policies.
              </p>
            </div>

            {/* Public Service Automation */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Public Service Automation</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Increase productivity</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Use AI-powered tools to handle common citizen requests and administrative tasks, increasing productivity and freeing up staff to focus on more complex work.
              </p>
            </div>

            {/* Public Safety and Security */}
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Public Safety and Security</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Maximise productivity</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Provide real-time data analysis and pattern detection that support emergency response coordination, crime prediction, and safety initiatives across communities.
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
            <Link className="" to="/products/training">
            <div className="hover:bg-[#f5f4f1] min-h-[310px] hover:text-[#328CC1] bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-blue-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-[#328CC1]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-[#328CC1] text-sm mb-4">Training</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              A scalable compute platform optimised to reduce training times and help teams rapidly build and refine machine learning models.
              </p>
            </div>
            </Link>
            {/* AI Compute Inference Card */}
            <Link className="" to="/products/inference">
            <div className="hover:bg-[#f5f4f1] min-h-[310px] hover:text-[#328CC1] bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-blue-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 rounded-xl flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-[#328CC1]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-[#328CC1] text-sm mb-4">Inference</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              A performance-tuned environment designed to run inference workloads efficiently, enabling real-time AI applications in production.
              </p>
            </div>
            </Link>

            {/* AI Marketplace Card */}
            <Link className="" to="/products/marketplace">
            <div className="hover:bg-[#f5f4f1] hover:text-[#328CC1] bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-blue-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-[#328CC1]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Marketplace</h3>
              <p className="text-[#328CC1] text-sm mb-4">Marketplace</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              A suite of tools and frameworks that assist government organisations in developing, deploying, and scaling AI models in a structured and consistent way.
              </p>
            </div>
            </Link>
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
                question: "How does AI support public sector modernisation?",
                answer: "AI enables government agencies to automate routine tasks, analyse vast amounts of data for better decision-making, improve citizen services through chatbots and personalisation, and enhance security through advanced threat detection. BluBridge's GPU infrastructure provides the computational power needed to train and deploy these AI solutions at scale."
              },
              {
                question: "What security and compliance certifications does BluBridge support?",
                answer: "BluBridge maintains enterprise-grade security with certifications including SOC 2 Type II, ISO 27001, and supports compliance with government-specific requirements. Our infrastructure includes end-to-end encryption, private VPC deployments, comprehensive audit logging, and data sovereignty options for sensitive government workloads."
              },
              {
                question: "Can BluBridge scale to meet government workload demands?",
                answer: "Yes, BluBridge's infrastructure is designed for elastic scalability. Government agencies can scale from development workloads to production deployments serving millions of citizens. Our platform automatically adjusts resources based on demand, ensuring optimal performance during peak periods without over-provisioning."
              },
              {
                question: "How does BluBridge help optimise costs for public agencies?",
                answer: "BluBridge delivers up to 80% cost savings compared to traditional cloud providers through efficient GPU utilisation, pay-as-you-go pricing, and optimised infrastructure. Agencies only pay for the resources they use, eliminating waste from over-provisioning and reducing the total cost of AI initiatives."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#D6DEC3]">
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

export default Government;
