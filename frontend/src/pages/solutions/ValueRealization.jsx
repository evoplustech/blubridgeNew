import React, { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Zap, LayoutGrid } from 'lucide-react';

const ValueRealization = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useDocumentTitle('Value Realization | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      {/* SECTION 1: Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#c9c4b8] overflow-hidden" />

        {/* Hero content - Two column layout */}
        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1F3B] mb-8 leading-tight tracking-tight">
                Value Realization
              </h1>
              <p className="text-lg lg:text-xl text-[#0B1F3B] mb-10 leading-relaxed">
                Turn AI investments into measurable business impact. BluBridge helps you convert experimentation into outcomes, accelerating adoption, reducing friction, and ensuring every model delivers tangible value across operations, products, and decision-making.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-7 py-3 rounded-md font-medium text-base">
                    Get Started
                  </Button>
                </Link>
                <Link to="/contact" className="flex items-center gap-2 px-6 py-3 text-[#0B1F3B] hover:text-[#328CC1] transition-colors font-medium">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Right - Value Realization Flow Diagram */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative">
                {/* Main image with floating animation */}
                <img 
                  src="https://customer-assets.emergentagent.com/job_web-redesign-22/artifacts/mqgt2jvy_Gemini_Generated_Image_zeuxebzeuxebzeux-Photoroom.png" 
                  alt="Value Realization Flow Diagram" 
                  className="w-full max-w-[850px] h-auto object-contain relative z-10"
                  style={{
                    animation: 'floatImage 6s ease-in-out infinite'
                  }}
                />
              </div>
              
              {/* Animation keyframes */}
              <style>{`
                @keyframes floatImage {
                  0%, 100% {
                    transform: translateY(0px);
                  }
                  50% {
                    transform: translateY(-15px);
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Value Highlights - 3 Column Strip */}
      <section className="py-16 bg-[#fffdf7] border-t border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Optimised Business Impact</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Align models with real-world goals, ensuring every deployment drives operational or revenue outcomes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Simplified Execution</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Streamline the journey from proof-of-concept to production with guided workflows and built-in best practices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Versatile Platform</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Apply AI across teams, products, and industries using a flexible foundation that adapts to evolving needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Speed up time-to-value Section */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#328CC1] text-sm font-medium mb-3 uppercase tracking-wider">BLUBRIDGE PLATFORM</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-6 leading-tight">
                Speed up time-to-value
              </h2>
              <p className="text-base text-[#2F3A4A] leading-relaxed mb-6">
                Value is realized only when models are adopted, trusted, and embedded into workflows. BluBridge bridges the gap between innovation and impact by unifying experimentation, deployment, and measurement in one platform.
              </p>
              <p className="text-base text-[#2F3A4A] leading-relaxed mb-6">
                Teams can validate use cases quickly, integrate models into real processes, and track performance against business goals. Built-in tooling ensures every iteration moves closer to outcomes, whether improving efficiency, accuracy, or customer experience.
              </p>
              <p className="text-base text-[#2F3A4A] leading-relaxed mb-8">
                From first pilot to enterprise rollout, BluBridge transforms AI into a dependable growth engine.
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-[#328CC1] pl-5">
                  <h3 className="text-lg font-semibold text-[#328CC1] mb-2">AI & ML Tools</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    Pre-built pipelines, evaluation frameworks, and integration layers for real-world adoption.
                  </p>
                </div>

                <div className="border-l-4 border-[#328CC1] pl-5">
                  <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Simplified Orchestration and Management</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    Unified controls to coordinate teams, models, and environments.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Grid Labels */}
            <div className="flex items-start justify-center lg:pt-8">
              <div className="grid grid-cols-3 gap-4 w-full">
                {['Use Case', 'Workflow', 'Decision', 'Insight', 'Impact', 'Outcome', 'Metric', 'ROI', 'Value'].map((label, i) => {
                  const colors = [
                    'bg-purple-100 text-purple-700',
                    'bg-orange-100 text-orange-700',
                    'bg-teal-100 text-teal-700',
                    'bg-pink-100 text-pink-700',
                    'bg-yellow-100 text-yellow-700',
                    'bg-blue-100 text-blue-700',
                    'bg-gray-100 text-gray-700',
                    'bg-green-100 text-green-700',
                    'bg-indigo-100 text-indigo-700'
                  ];
                  return (
                    <div 
                      key={i} 
                      className={`${colors[i]} rounded-lg px-4 py-3 text-center font-semibold text-sm`}
                    >
                      {label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Value Stack */}
      <section className="py-20 bg-[#F8F7F5]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0B1F3B]">
            Value Stack
          </h2>
          <p className="text-[#4B5563] mb-12 max-w-2xl">
            BluBridge provides a complete technology stack for delivering measurable AI value across your organization.
          </p>
          
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Left Column - Stack Layers */}
            <div className="lg:col-span-2 space-y-4">
              {/* MARKETPLACE Layer */}
              <div className="bg-[#1A2940] rounded-xl p-6">
                <div className="mb-4">
                  <span className="bg-[#5A6B83] text-[#E0E0E0] text-xs font-bold px-3 py-1.5 rounded tracking-wider">MARKETPLACE</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Use-Case Blueprints', 'Evaluation Templates', 'Industry Packs'].map((item, i) => (
                    <span key={i} className="bg-white text-[#212529] text-sm px-4 py-2 rounded-lg flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#32CD32] rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* PLATFORM Layer */}
              <div className="bg-[#1A2940] rounded-xl p-6">
                <div className="mb-4">
                  <span className="bg-[#5A6B83] text-[#E0E0E0] text-xs font-bold px-3 py-1.5 rounded tracking-wider">PLATFORM</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Workflow Orchestration', 'Outcome Tracking', 'Experiment Management'].map((item, i) => (
                    <span key={i} className="bg-white text-[#212529] text-sm px-4 py-2 rounded-lg flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#32CD32] rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* INFRASTRUCTURE Layer */}
              <div className="bg-[#1A2940] rounded-xl p-6">
                <div className="mb-4">
                  <span className="bg-[#5A6B83] text-[#E0E0E0] text-xs font-bold px-3 py-1.5 rounded tracking-wider">INFRASTRUCTURE</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Scalable Compute', 'Secure Pipelines', 'Data Connectivity'].map((item, i) => (
                    <span key={i} className="bg-white text-[#212529] text-sm px-4 py-2 rounded-lg flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#32CD32] rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* HARDWARE Layer */}
              <div className="bg-[#1A2940] rounded-xl p-6">
                <div className="mb-4">
                  <span className="bg-[#5A6B83] text-[#E0E0E0] text-xs font-bold px-3 py-1.5 rounded tracking-wider">HARDWARE</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['High-Performance GPUs', 'Multi-Node Systems'].map((item, i) => (
                    <span key={i} className="bg-white text-[#212529] text-sm px-4 py-2 rounded-lg flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#32CD32] rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - User Experience & Data Centre */}
            <div className="space-y-4">
              {/* USER EXPERIENCE Card */}
              <div className="bg-[#1A2940] rounded-xl p-6 h-[calc(50%-8px)]">
                <div className="mb-4">
                  <span className="bg-[#5A6B83] text-[#E0E0E0] text-xs font-bold px-3 py-1.5 rounded tracking-wider">USER EXPERIENCE</span>
                </div>
                <div className="space-y-3">
                  {['Web Console', 'CLI', 'API Access'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-[#32CD32] rounded-full" />
                      <span className="text-[#E0E0E0] text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DATA CENTRES Card */}
              <div className="bg-[#1A2940] rounded-xl p-6 h-[calc(50%-8px)]">
                <div className="mb-4">
                  <span className="bg-[#5A6B83] text-[#E0E0E0] text-xs font-bold px-3 py-1.5 rounded tracking-wider">DATA CENTRES</span>
                </div>
                <div className="space-y-3">
                  {['Renewable Energy', 'Low-Latency Fibre'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-[#32CD32] rounded-full" />
                      <span className="text-[#E0E0E0] text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Performance Metrics */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#000000] mb-16">Performance</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-l border-[#D6DEC3] pl-6">
              <div className="text-4xl lg:text-5xl font-bold text-[#000000] mb-1">40%</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">FASTER ADOPTION</div>
              <p className="text-[#000000] text-sm leading-relaxed">Reduce time from prototype to production-ready use.</p>
            </div>
            <div className="border-l border-[#D6DEC3] pl-6">
              <div className="text-4xl lg:text-5xl font-bold text-[#000000] mb-1">7.2X</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">FASTER EXECUTION</div>
              <p className="text-[#000000] text-sm leading-relaxed">Accelerate real-world AI workflows with optimized infrastructure.</p>
            </div>
            <div className="border-l border-[#D6DEC3] pl-6">
              <div className="text-4xl lg:text-5xl font-bold text-[#000000] mb-1">80%</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">LOWER TOTAL COST</div>
              <p className="text-[#000000] text-sm leading-relaxed">Achieve business impact at a fraction of traditional platform spend.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Key Services */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">Key Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Compute Card */}
            <Link className="" to="/products/training">
              <div className="hover:bg-[#f5f4f1] min-h-[300px] hover:text-[#328CC1] bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-emerald-500/30 transition-colors">
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/30 to-green-600/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-7 h-7 text-emerald-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
                <p className="text-emerald-400 text-sm mb-4">Value Optimization</p>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  Dedicated GPU compute optimized for delivering business outcomes, reducing waste while maximizing inference efficiency at scale.
                </p>
              </div>
            </Link>
            {/* AI Marketplace Card */}
            <Link className="" to="/products/marketplace">
              <div className="hover:bg-[#f5f4f1] min-h-[300px] hover:text-[#328CC1] bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-emerald-500/30 transition-colors">
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                    <LayoutGrid className="w-7 h-7 text-[#328CC1]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Marketplace</h3>
                <p className="text-[#328CC1] text-sm mb-4">Marketplace</p>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  A collection of tools and services that support the development, deployment, and scaling of inference pipelines using both BluBridge and popular AI frameworks.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: More Solutions */}
      {/* <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-light mb-4 text-[#0B1F3B]">More Solutions</h2>
            <p className="text-[#2F3A4A] max-w-2xl">
              BluBridge accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5">
          
            <Link to="/solutions/training">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/tbqd1w9m_Training.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-md">TRAINING</span>
                </div>
              </div>
            </Link>

          
            <Link to="/solutions/ai-development">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/u12c3np1_AI%20Development.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-md">AI DEVELOPMENT</span>
                </div>
              </div>
            </Link>

          
            <Link to="/solutions/fine-tuning">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/2qvmu3rl_INFERENCE.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-md">FINE-TUNING</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section> */}

      {/* SECTION 8: FAQs */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">FAQs</h2>
          <div className="max-w-4xl space-y-3">
            {[
              {
                question: "What makes BluBridge's Value Realization approach different?",
                answer: "BluBridge focuses on business outcomes rather than just technical metrics. Our platform unifies experimentation, deployment, and measurement, ensuring every AI initiative is tied to measurable impact across operations, revenue, and customer experience."
              },
              {
                question: "How does BluBridge accelerate time-to-value?",
                answer: "Through pre-built use-case blueprints, guided workflows, and built-in best practices, BluBridge reduces the time from proof-of-concept to production. Teams can validate use cases quickly and track performance against business goals in real-time."
              },
              {
                question: "What industries benefit from Value Realization?",
                answer: "Value Realization is applicable across all sectors including finance, healthcare, manufacturing, retail, and technology. Any organization looking to convert AI experimentation into measurable business outcomes can benefit from our platform."
              },
              {
                question: "How do you measure AI value?",
                answer: "BluBridge provides comprehensive outcome tracking with customizable metrics tied to your business goals. Whether measuring efficiency gains, cost reductions, revenue impact, or customer satisfaction improvements, our platform provides clear visibility into AI ROI."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#D6DEC3]">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-emerald-400 transition-colors"
                >
                  <span className="text-base font-medium text-[#0B1F3B] pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <Minus className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Plus className="w-4 h-4 text-emerald-400" />
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

      {/* SECTION 9: Bottom CTA */}
      <section className="py-20 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Access thousands of GPUs tailored to your<br />requirements.
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/contact">
              <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors font-medium">
              Contact <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ValueRealization;
