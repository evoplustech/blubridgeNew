import React, { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid } from 'lucide-react';

const Deployment = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useDocumentTitle('AI Cloud Platform for Model Fine-Tuning | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      {/* Hero Section - Model Fine-Tuning Background with Wave Animation */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Animated Background Image */}
        <div className="absolute inset-0 bg-[#d0cbb9] overflow-hidden">
          {/* <div 
            className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%]"
            style={{
              backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/n0x6s7r0_MODEL%20FINE-TUNING.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              animation: 'heroWaveFineTuning 14s ease-in-out infinite'
            }}
          /> */}
        </div>
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0  pointer-events-none" />

        {/* Hero content - left aligned */}
        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0B1F3B] mb-8 leading-tight tracking-tight">
             Deployment
            </h1>
            <p className="text-lg lg:text-xl text-[#0B1F3B] mb-10 leading-relaxed max-w-2xl">
              At BluBridge, we provide production-grade deployment infrastructure built for real-world AI systems. Launch, scale, and operate your models with confidence using high-performance GPU clusters, low-latency networking, and enterprise-ready orchestration, designed to move your models from lab to live environments seamlessly.
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
        </div>

        {/* CSS Animation Keyframes */}
        {/* <style>{`
          @keyframes heroWaveFineTuning {
            0%, 100% {
              transform: translate(0, 0) scale(1.05);
            }
            25% {
              transform: translate(-1.2%, 0.8%) scale(1.05);
            }
            50% {
              transform: translate(-0.4%, -0.8%) scale(1.05);
            }
            75% {
              transform: translate(0.8%, 0.4%) scale(1.05);
            }
          }
        `}</style> */}
      </section>

      {/* Value Highlights - 3 Column Strip */}
      <section className="py-16 bg-[#fffdf7] border-t border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Optimise for Performance</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Deploy models in environments engineered for reliability, consistency, and real-time performance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Accelerate Time to Market</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Move from experimentation to live systems faster with pre-configured pipelines and automated rollout workflows.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Cost-Effective Scalability</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Scale inference dynamically with predictable pricing and resource-aware orchestration across GPU clusters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fast, Efficient Model Fine-tuning Section */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-emerald-500 text-sm font-medium mb-3 uppercase tracking-wider">LEVERAGE ADVANCED GPU CLOUD INFRASTRUCTURE</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-6 leading-tight">
                Fast, reliable Deployment
              </h2>
                <p className="mb-2">Deployment is where models meet reality. BluBridge provides a unified platform for launching and operating AI systems at scale, whether for internal tools, customer-facing products, or enterprise workflows.</p>
                <p className="mb-2">Our deployment layer supports real-time inference, batch processing, traffic routing, version control, and rollback strategies. Models can be promoted directly from training or fine-tuning into production with full observability and governance.</p>
                <p className="mb-2">From pilot environments to global rollouts, BluBridge ensures every deployment is stable, secure, and built for growth.</p>
              {/* <div className="space-y-8">
                <div className="border-l-2 border-emerald-500 pl-5">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">30% Faster Time to Value for Your AI Projects</h3>
                  <p className="text-[#6B7280] text-xs font-medium mb-2">Accelerate the time to actionable results with an AI stack optimised for rapid experimentation and tuning.</p>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    We own the infrastructure so you can focus on the innovation.
                  </p>
                </div>

                <div className="border-l-2 border-emerald-500 pl-5">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">40% Efficiency Improvement</h3>
                  <p className="text-[#6B7280] text-xs font-medium mb-2">Optimised Resource Utilisation</p>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    Increase the effectiveness of compute resources with improved hardware utilisation.
                  </p>
                </div>
              </div> */}
            </div>

            {/* Right side - Stacked system cards */}
            <div className="space-y-4">
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/30 to-green-600/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3B] font-semibold">AI Marketplace</h4>
                    <p className="text-[#6B7280] text-sm">Pre-built deployment templates and services</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                    <LayoutGrid className="w-6 h-6 text-[#328CC1]" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3B] font-semibold">Training Compute</h4>
                    <p className="text-[#6B7280] text-sm">Seamless transition from training to production</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-violet-600/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3B] font-semibold">Inference & Deployment</h4>
                    <p className="text-[#6B7280] text-sm">One-click model rollout and scaling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fine-Tuning Stack - Two column layout */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4">Deployment Stack</h2>
            <p className="text-base text-[#4B5563] max-w-2xl">
              BluBridge provides a complete technology stack for running intensive fine-tuning workloads in the most efficient and high-performing way possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Stacked categories */}
            <div className="space-y-4">
              {/* Marketplace */}
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6">
                <h3 className="text-sm font-bold text-[#2F3A4A] mb-4 tracking-wider">MARKETPLACE</h3>
                <div className="flex flex-wrap gap-2">
                  {['Deployment Templates', 'Inference Services', 'Monitoring Tools','Security Modules'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1.5 text-[#0B1F3B] text-xs">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6">
                <h3 className="text-sm font-bold text-[#2F3A4A] mb-4 tracking-wider">PLATFORM</h3>
                <div className="flex flex-wrap gap-2">
                  {['Model Registry', 'Versioning','Traffic Routing','Rollback Management'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-3 py-1.5 text-[#0B1F3B] text-xs">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6">
                <h3 className="text-sm font-bold text-[#2F3A4A] mb-4 tracking-wider">INFRASTRUCTURE</h3>
                <div className="flex flex-wrap gap-2">
                  {['GPU Orchestration', 'Load Balancing', 'Secure Networking','Auto-Scaling'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1.5 text-[#0B1F3B] text-xs">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hardware */}
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6">
                <h3 className="text-sm font-bold text-[#2F3A4A] mb-4 tracking-wider">HARDWARE</h3>
                <div className="flex flex-wrap gap-2">
                  {['High-Memory GPUs', 'Multi-Node Clusters', ' Low-Latency Interconnects'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1.5 text-[#0B1F3B] text-xs">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - User Experience & Data Centre */}
            <div className="space-y-4">
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6 h-[calc(50%-8px)]">
                <h3 className="text-sm font-bold text-[#2F3A4A] mb-4 tracking-wider">USER EXPERIENCE</h3>
                <div className="space-y-3">
                  {['Web Console', 'CLI', 'API Access'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      <span className="text-[#2F3A4A] text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6 h-[calc(50%-8px)]">
                <h3 className="text-sm font-bold text-[#2F3A4A] mb-4 tracking-wider">DATA CENTRE</h3>
                <div className="space-y-3">
                  {['Renewable Energy', 'Low-Latency Fibre'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <span className="text-[#2F3A4A] text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics - 4 Column */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#000000] mb-16">Performance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                metric: '30%', 
                label: 'FASTER Rollouts', 
                sublabel: 'Accelerate Time to Value',
                desc: 'Reduce deployment cycles with automated pipelines.',
                link: 'Learn More',
                linkTo: '/about'
              },
              { 
                metric: '80%', 
                label: 'Lower Operating Cost', 
                sublabel: 'More performance for less.',
                desc: 'Run inference workloads at a fraction of hyperscaler pricing.',
                link: 'Our Data Centres',
                linkTo: '/products/glomfjord'
              },
              { 
                metric: '40%', 
                label: 'More Stable Systems', 
                sublabel: 'Improved Resource Utilisation',
                desc: ' Improve uptime and consistency across production environments.',
                link: 'See GPU Nodes',
                linkTo: '/products/gpu-nodes'
              },
              { 
                metric: '7.2X', 
                label: 'Faster Inference', 
                sublabel: 'Accelerate time to insights',
                desc: 'Optimized GPU infrastructure delivers higher throughput and lower latency.',
                link: 'Blog Post',
                linkTo: '/blog'
              }
            ].map((item, i) => (
              <div key={i} className="border-l border-[#D6DEC3] pl-6">
                <div className="text-4xl lg:text-5xl font-bold text-[#000000] mb-1">{item.metric}</div>
                <div className="text-[#000000] text-sm font-semibold mb-2 uppercase tracking-wide">{item.label}</div>
                <p className="text-[#000000] text-sm leading-relaxed mb-4">{item.desc}</p>
                {/* <Link to={item.linkTo} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1">
                  {item.link} <ArrowRight className="w-3 h-3" />
                </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Services */}
      {/* <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">Key Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            <Link className="" to="/products/training">
            <div className="hover:bg-[#f5f4f1] min-h-[300px] hover:text-[#328CC1] bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-emerald-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/30 to-green-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-emerald-400 text-sm mb-4">Training</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                A highly scalable and performance-optimised compute framework that shortens model training cycles and boosts productivity.
              </p>
            </div>
            </Link> 
           
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
                An ecosystem of services and tools that support the entire model lifecycle, enabling development and deployment using both BluBridge offerings and popular AI/ML technologies.
              </p>
            </div>
            </Link> 
          </div>
        </div>
      </section> */}

      {/* More Solutions */}
      {/* <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-light mb-4 text-[#0B1F3B]">More Solutions</h2>
            <p className="text-[#2F3A4A] max-w-2xl">
              BluBridge accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives..
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

            
            <Link to="/solutions/inference">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/2qvmu3rl_INFERENCE.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-md">INFERENCE</span>
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

            
            
          </div>
        </div>
      </section> */}

      {/* FAQs */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">FAQs</h2>
          <div className="max-w-4xl space-y-3">
            {[
              {
                question: "What makes BluBridge’s deployment platform different?",
                answer: "It is built specifically for AI production workloads, combining infrastructure, orchestration, and observability in a single environment."
              },
              {
                question: "What types of deployments are supported?",
                answer: "Real-time APIs, batch inference, internal tools, and customer-facing AI services."
              },
              {
                question: "Can I manage multiple model versions in production?",
                answer: "Yes. The platform supports versioning, traffic splitting, and instant rollback."
              },
              {
                question: "How quickly can I go live?",
                answer: "Models can be promoted directly from training or fine-tuning into production within minutes."
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
                      <ChevronUp className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                </button>
                {openFaq === i && (
                  <div className="pb-6 text-[#4B5563] leading-relaxed pr-12">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#0B1F3B] from-blue-600 via-blue-700 to-indigo-800">
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
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Deployment;
