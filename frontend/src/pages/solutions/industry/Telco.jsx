import React, { useState } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid } from 'lucide-react';

const Telco = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useDocumentTitle('Scalable AIaaS & AI Data Centers for Telco Providers | BluBridge - Next-Gen GPU Infrastructure');

  return (
    <div className="min-h-screen bg-[#f1f2fa]">
      {/* HERO SECTION with Background Image */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://customer-assets.emergentagent.com/job_visual-swap-4/artifacts/atc1dacp_Telco.png)'
          }}
        />
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3B]/85 via-[#0B1F3B]/60 to-transparent" />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              TELCO
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              BluBridge is providing telecommunications providers with the infrastructure and expertise to support a wide range of AI-based services and solutions. With high-performance GPU clusters and scalable architecture, telco companies can enhance network performance, improve customer experience, and deploy advanced automation tools powered by artificial intelligence. The infrastructure is also supporting modern telecom needs such as 5G and edge computing.
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

      {/* 3-Column Highlights Strip - Section 2 */}
      <section className="py-16 bg-[#e8eaf3] border-t border-[#d4d8e8]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Increased Performance</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Handling demanding telco workloads, including real-time traffic processing and deep learning models used for network analytics and optimisation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Scale Effortlessly</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Supporting dynamic scaling of AI applications for modern telecom requirements like 5G, Internet of Things (IoT) workloads, and distributed edge networks without compromising performance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Improve Operability</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Operating energy-efficient infrastructure that is reducing overall carbon impact while supporting advanced telco processes and data operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Telco AI Use Cases Section - Section 3 */}
      <section className="py-24 bg-[#f1f2fa]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4">Telco AI Use Cases</h2>
            <p className="text-base text-[#6B7280] max-w-3xl">
              Explore the different ways telecommunications companies can use BluBridge’s GPU infrastructure to deliver smarter AI services, optimise next-generation networks, and drive innovation across the industry.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Descriptive content */}
            <div className="space-y-8">
              <div className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-[#328CC1] mb-2">White-label BluBridge's end-to-end Cloud Platform</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  Telcos can build their own branded cloud services using BluBridge’s complete cloud platform, giving them the ability to offer AI-powered solutions and services without heavy upfront investment.
                </p>
              </div>

              <div className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Deliver Advanced AI Services</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  Telecom operators can launch AI capabilities such as intelligent chatbots, automated support systems, and virtual assistants faster, improving customer service, reducing churn, and increasing loyalty.
                 </p>
              </div>
            </div>

            {/* Right Column - More use cases */}
            <div className="space-y-8">
              <div className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Enhance Customer Experience</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  Use AI-driven analytics and automation to personalise interactions, proactively address service issues, and deliver seamless experiences that improve overall customer satisfaction.
                </p>
              </div>

              <div className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Operate More Sustainably</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  Deploy AI models closer to users with ultra-low latency while using energy-efficient infrastructure that helps lower power consumption and supports greener network operations.
                </p>
              </div>
              {/* <div className="border-l-2 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Streamline Operations with AI</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  Automate repetitive network tasks, such as user provisioning or traffic management, to reduce manual effort, minimise errors, and improve operational efficiency.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Key Services - Section 4 */}
      <section className="py-24 bg-[#e8eaf3]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">Key Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
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
                 A scalable, performance-tuned compute architecture that reduces training times and boosts team productivity.
              </p>
            </div>
              </Link>
            {/* AI Compute GPU Nodes Card */}
            <Link className="" to="/products/gpu-nodes">
            <div className="hover:bg-[#f5f4f1] min-h-[310px] hover:text-[#328CC1] bg-white border border-[#d4d8e8] rounded-xl p-8 hover:border-blue-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-[#328CC1]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-[#328CC1] text-sm mb-4">GPU Nodes</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                High-performance GPU clusters with advanced networking, storage, and cooling to support AI, machine learning, and high-performance workloads.
              </p>
            </div>
            </Link>
          </div>
        </div>
      </section>

      {/* More Solutions - Section 5 */}
      <section className="py-20 bg-[#f1f2fa]">
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

      {/* FAQs - Section 6 */}
      <section className="py-24 bg-[#e8eaf3]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">FAQs</h2>
          <div className="max-w-4xl space-y-3">
            {[
              {
                question: "What makes BluBridge's GPU Cloud different from others?",
                answer: "BluBridge owns and operates the full AI stack – from its data centre to the sophisticated orchestration layer – and this allows BluBridge to optimise each layer of the stack to deliver high-performance computing for telco workloads, maximise utilisation, and ensure scalability."
              },
              {
                question: "How can Telcos benefit from BluBridge's infrastructure?",
                answer: "Telcos can leverage BluBridge's GPU infrastructure for network optimisation, predictive maintenance, 5G enhancement, customer analytics, and AI-powered services. Our platform enables faster deployment of AI models while reducing operational costs."
              },
              {
                question: "Does BluBridge support edge computing for Telcos?",
                answer: "Yes, BluBridge's infrastructure supports edge deployment scenarios, enabling telcos to run AI models closer to end users for ultra-low latency applications. This is critical for 5G services, autonomous vehicles, and IoT ecosystems."
              },
              {
                question: "What security and compliance certifications does BluBridge have?",
                answer: "BluBridge maintains enterprise-grade security with SOC 2 and ISO compliance certifications. Our infrastructure is designed to meet the stringent security requirements of telecommunications providers handling sensitive customer data."
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

export default Telco;
