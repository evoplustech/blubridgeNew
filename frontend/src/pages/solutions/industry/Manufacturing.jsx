import React, { useState } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid, Cpu } from 'lucide-react';

const Manufacturing = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useDocumentTitle('Enabling AI for Manufacturing with High Performance GPUs | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      {/* HERO SECTION with Background Image */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://customer-assets.emergentagent.com/job_visual-swap-4/artifacts/p2erprfm_b4.png)'
          }}
        />
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3B]/85 via-[#0B1F3B]/60 to-transparent" />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              MANUFACTURING
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              BluBridge's cloud platform uses high-performance GPU technology and expert support to help manufacturing organisations speed up simulation workflows and optimise business processes. This enables manufacturers to improve productivity, cut costs, and reduce equipment downtime.
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
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Enhanced Simulation</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Run faster and more precise simulations for manufacturing processes such as finite element analysis, computational fluid dynamics, and digital twin modelling to boost design accuracy and throughput.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Improved Predictive Maintenance</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Analyse large streams of sensor data in real time using GPU-powered AI and machine learning to anticipate equipment failures and schedule maintenance before breakdowns occur.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Streamlined Automation</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Support advanced AI techniques in robotics and automation, helping manufacturing operations become more intelligent, efficient, and adaptable to changing production demands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Uses Section */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-amber-500 text-sm font-medium mb-3 uppercase tracking-wider">STREAMLINE OPERATIONS</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4">Example uses</h2>
            <p className="text-base text-[#6B7280] max-w-3xl">
              BluBridge's AI platform combines industry-leading GPU technology with a fully optimised software stack, enabling manufacturers to improve core activities like supply chain coordination, quality assurance, and product design.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Predictive Maintenance Models */}
            <div className="border-l-2 border-amber-500 pl-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Predictive Maintenance Models</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Equipment Health Monitoring</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Use AI to build and train models that forecast when machines are likely to fail, allowing maintenance teams to act proactively and minimise downtime and repair costs.
              </p>
            </div>

            {/* Supply Chain Logistics Optimisation */}
            <div className="border-l-2 border-amber-500 pl-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Supply Chain Logistics Optimisation</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Demand Forecasting & Inventory</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Quickly analyse complex datasets related to inventory, demand forecasting, and logistics, helping teams make better decisions and streamline supply chain processes.
              </p>
            </div>

            {/* Quality Control and Defect Detection */}
            <div className="border-l-2 border-amber-500 pl-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Quality Control and Defect Detection</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Computer Vision Inspection</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Apply GPU-accelerated systems to monitor production lines in real time, detecting defects quickly and ensuring products consistently meet quality standards.
              </p>
            </div>

            {/* Design and Simulation */}
            <div className="border-l-2 border-amber-500 pl-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Design and Simulation</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Digital Twin & CFD/FEA</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Accelerate design iteration cycles by running complex simulations in the cloud, significantly reducing the time it takes to validate designs, especially in industries like automotive and aerospace where precision is vital.
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
            <div className="hover:bg-[#f5f4f1] hover:text-[#328CC1] bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-amber-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500/30 to-orange-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-amber-400 text-sm mb-4">Training</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                 A scalable compute environment that shortens model training times and increases productivity for data-intensive workloads.
              </p>
            </div>
            </Link>
            {/* AI Compute Inference Card */}
            <Link className="" to="/products/inference">
            <div className="hover:bg-[#f5f4f1] hover:text-[#328CC1] bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-amber-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500/30 to-yellow-600/20 rounded-xl flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-amber-400 text-sm mb-4">Inference</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                A high-performance platform optimised to run inference workloads efficiently and reliably at production scale.

              </p>
            </div>
            </Link>
            {/* AI Marketplace Card */}
            <Link className="" to="/products/marketplace">
            <div className="hover:bg-[#f5f4f1] hover:text-[#328CC1] bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-amber-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500/30 to-red-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Marketplace</h3>
              <p className="text-amber-400 text-sm mb-4">Marketplace</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                 A set of tools and services that help teams develop, deploy, and scale AI applications using both BluBridge infrastructure and commonly used AI/ML frameworks.
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
                question: "How can GPU computing improve manufacturing operations?",
                answer: "GPU computing enables real-time AI inference for quality control, predictive maintenance models that analyse thousands of sensor inputs simultaneously, and complex simulations like CFD and FEA that run 10-50x faster than CPU-based alternatives."
              },
              {
                question: "What types of manufacturing simulations can BluBridge accelerate?",
                answer: "BluBridge accelerates a wide range of simulations including finite element analysis (FEA), computational fluid dynamics (CFD), digital twin modelling, discrete event simulation, and multi-physics simulations for product design and process optimisation."
              },
              {
                question: "How does predictive maintenance work with BluBridge?",
                answer: "Our platform processes real-time sensor data from equipment using AI models that identify patterns indicating potential failures. Manufacturers can deploy models that predict failures days or weeks in advance, enabling scheduled maintenance that reduces downtime by up to 50%."
              },
              {
                question: "Can BluBridge support edge deployment for factory floor applications?",
                answer: "Yes, BluBridge supports both cloud and edge deployment scenarios. Our inference platform delivers sub-10ms latency for real-time applications like visual inspection and robotic control, critical for factory floor operations."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#D6DEC3]">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-amber-400 transition-colors"
                >
                  <span className="text-base font-medium text-[#0B1F3B] pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-amber-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-amber-400" />
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

export default Manufacturing;
