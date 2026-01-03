import React, { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Server, Layers, Cpu,Zap,  Database, Cloud, Shield, Settings,SlidersHorizontal } from 'lucide-react';

const Marketplace = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "What AI/ML tools are available in the BluBridge AI Marketplace?",
      answer: "The BluBridge AI Marketplace provides a broad selection of leading AI/ML tools, including widely used frameworks such as PyTorch and TensorFlow, all optimized for seamless integration with our platform."
    },
    {
      question: "How can I access pre-trained models in the AI Marketplace?",
      answer: "As a customer, you can explore and access a large library of pre-trained models directly through our AI Marketplace. These models support a wide range of applications and industries, helping you accelerate your AI projects with ease."
    },
    {
      question: "Are the hardware resources in the AI Marketplace optimised for specific use cases?",
      answer: "Yes, our hardware resources are tailored and optimized for specific AI use cases, ensuring peak performance and efficiency without the complexity of managing infrastructure setup."
    },
    {
      question: "Can I integrate my existing workflows with the tools and models in the AI Marketplace?",
      answer: "The AI Marketplace is built to integrate smoothly with your existing workflows, enabling you to use our tools and models without interrupting your current processes."
    }
  ];

  const modelCards = [
    { type: 'TEXT GENERATION', name: 'LLAMA 3 8B', provider: 'META' },
    { type: 'TEXT GENERATION', name: 'LLAMA 3 70B INSTRUCT', provider: 'META' },
    { type: 'IMAGE GENERATION', name: 'FLORENCE 2 LARGE', provider: 'MICROSOFT' },
    { type: 'IMAGE GENERATION', name: 'STABLE DIFFUSION 3 MEDIUM', provider: 'STABILITY AI' },
    { type: 'TEXT GENERATION', name: 'MIXTRAL 8X7B INSTRUCT', provider: 'MISTRAL AI' },
    { type: 'TEXT GENERATION', name: 'PHI 3', provider: 'MICROSOFT' }
  ];

    const LayoutGrid = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

    const services = [
    { name: "Serverless", icon: Cloud ,link:"/products/serverless"},
    { name: "Marketplace", icon: LayoutGrid,link:"/products/marketplace" },
    { name: "Inference", icon: Zap ,link:"/products/inference"},
    { name: "Training", icon: Cpu ,link:"/products/training"},
    { name: "GPU nodes", icon: Server ,link:"/products/gpu-nodes"},
    { name: "Fine-Tuning", icon: SlidersHorizontal ,link:"/products/fine-tuning"}
  ];

  useDocumentTitle('AI Marketplace | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7]">      {/* Hero Section */}
      <section className="pt-16 pb-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-[#328CC1] text-sm font-medium tracking-wider uppercase">MARKETPLACE</span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#0B1F3B] leading-tight">
                Turnkey AI development and deployment
              </h1>
              <p className="text-[#2F3A4A] text-lg leading-relaxed max-w-xl">
                Access ready-to-go AI & ML tools and resources, enabling efficient and scalable model development and deployment.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link to="/contact">
                  <Button className="bg-[#0B1F3B] hover:bg-[#162B4D] text-white px-8 py-6 text-base font-medium rounded-lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/contact" className="flex items-center gap-2 text-[#0B3C5D] hover:text-[#328CC1] transition-colors font-medium">
                  Contact <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="relative flex items-center justify-center">
              <img
                src="https://customer-assets.emergentagent.com/job_visual-swap-4/artifacts/jrfpxs8e_market.png"
                alt="AI Solutions Marketplace - Turnkey AI Development & Deployment"
                className="w-full h-auto max-h-[500px] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Three-Column Highlights Strip */}
      <section className="py-16 border-t border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Access Leading Tools */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#0B1F3B]">Access Leading Tools</h3>
              <p className="text-[#2F3A4A] text-sm leading-relaxed">
                Develop with leading AI/ML frameworks such as PyTorch and TensorFlow to simplify and accelerate your development workflow.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[#328CC1] hover:text-[#0B3C5D] transition-colors text-sm font-medium">
                Contact <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Extensive Model Library */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#0B1F3B]">Extensive Model Library</h3>
              <p className="text-[#2F3A4A] text-sm leading-relaxed">
                Explore our collection of open-source models, enhanced with proprietary optimizations running on NVIDIA GPUs.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[#328CC1] hover:text-[#0B3C5D] transition-colors text-sm font-medium">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Tailored Resources */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#0B1F3B]">Tailored Resources</h3>
              <p className="text-[#2F3A4A] text-sm leading-relaxed">
                Choose from preconfigured templates and customizable tools tailored to suit your specific AI use case.
              </p>
             <Link to="/contact" className="inline-flex items-center gap-2 text-[#328CC1] hover:text-[#0B3C5D] transition-colors text-sm font-medium">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools & Frameworks Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Text */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-[#0B1F3B] leading-tight italic">
                Quickly deploy the best AI tools and frameworks
              </h2>
              <p className="text-[#2F3A4A] text-base leading-relaxed">
                Our AI Marketplace offers a curated selection of top AI/ML tools like PyTorch and TensorFlow, optimised for our infrastructure stack. Enhance developer productivity with the best tools available in the industry.
              </p>
              <Link to="/contact">
                <Button className="bg-[#0B1F3B] hover:bg-[#162B4D] text-white border border-[#D6DEC3] px-6 py-3 text-sm font-medium rounded-lg inline-flex items-center gap-2 mt-4">
                  Get in Touch <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Right - Marketplace Visual */}
            <div className="relative flex items-center justify-center">
              <img
                src="https://customer-assets.emergentagent.com/job_visual-swap-4/artifacts/sw4huahq_Market-place.png"
                alt="AI Solutions Marketplace with framework integrations"
                className="w-full h-auto max-h-[550px] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Text */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {modelCards.map((model, idx) => (
                <div key={idx} className="bg-white border border-[#D6DEC3] rounded-lg p-4 hover:border-blue-500/30 transition-colors">
                  <span className="text-[#6B7280] text-[10px] uppercase tracking-wider">{model.type}</span>
                  <h4 className="text-[#0B1F3B] text-sm font-semibold mt-1 leading-tight">{model.name}</h4>
                  <span className="text-[#6B7280] text-xs mt-1 block">{model.provider}</span>
                </div>
              ))}
            </div>
            {/* Right - Model Cards Grid */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light  leading-tight">
                Accelerate development with access to leading models
              </h2>
              <p className="text-[#2F3A4A] text-base leading-relaxed">
                Select from a library of open-source and custom LLM models optimized with BluBridge’s proprietary software. Speed up development and deployment using models built to support a broad range of applications and industries.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[#328CC1] hover:text-blue-300 transition-colors font-medium">
                Find Out More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Options Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Text */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light  leading-tight">
                Preconfigured hardware options for ease and efficiency
              </h2>
              <p className="text-[#2F3A4A] text-base leading-relaxed">
                Our ready-to-deploy hardware resources are tailored for specific AI use cases, delivering peak performance and efficiency without the complexity of setup.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[#328CC1] hover:text-blue-300 transition-colors font-medium">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right - Hardware Cards */}
            <div className="space-y-4">
              {/* AI-in-a-Box */}
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#328CC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#0B1F3B] font-semibold text-base">AI-in-a-Box</h4>
                    <p className="text-[#2F3A4A] text-sm mt-1">Development environment using GPU Nodes.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs text-[#328CC1] bg-blue-500/10 px-2 py-1 rounded">Model Development</span>
                      <span className="text-xs text-[#328CC1] bg-blue-500/10 px-2 py-1 rounded">Drivers</span>
                      <span className="text-xs text-[#328CC1] bg-blue-500/10 px-2 py-1 rounded">Optimised</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Training Compute */}
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#328CC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#0B1F3B] font-semibold text-base">Training Compute</h4>
                    <p className="text-[#2F3A4A] text-sm mt-1">Optimised Kubernetes environment for setting up and training LLM models.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs text-[#328CC1] bg-blue-500/10 px-2 py-1 rounded">Model Training</span>
                      <span className="text-xs text-[#328CC1] bg-blue-500/10 px-2 py-1 rounded">Kubernetes</span>
                      <span className="text-xs text-[#328CC1] bg-blue-500/10 px-2 py-1 rounded">Mi300X</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inference Compute */}
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#328CC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#0B1F3B] font-semibold text-base">Inference Compute</h4>
                    <p className="text-[#2F3A4A] text-sm mt-1">Optimised CI/NK clusters with a specialized scheduler for inference jobs.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs text-[#328CC1] bg-blue-500/10 px-2 py-1 rounded">Autoscaling</span>
                      <span className="text-xs text-[#328CC1] bg-blue-500/10 px-2 py-1 rounded">Inference</span>
                      <span className="text-xs text-[#328CC1] bg-blue-500/10 px-2 py-1 rounded">Kubernetes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 border-t border-[#D6DEC3]">
        <div className="container-custom">
          <h2 className="text-2xl font-light text-[#0B1F3B] mb-10">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quick Deployment */}
            <div className="space-y-3">
              <h3 className="text-[#0B1F3B] font-semibold text-sm uppercase tracking-wider">QUICK DEPLOYMENT</h3>
              <p className="text-[#2F3A4A] text-sm leading-relaxed">
               Deploy a broad range of software and hardware resources in just a few clicks.
              </p>
            </div>

            {/* 80% Lower Cost */}
            <div className="space-y-3">
              <h3 className="text-[#0B1F3B] font-semibold text-sm uppercase tracking-wider">80% LOWER COST</h3>
              <p className="text-[#2F3A4A] text-sm leading-relaxed">
                BluBridge delivers an average cost saving of up to 80% compared to hyperscalers.
              </p>
            </div>

            {/* Tailored for AI */}
            <div className="space-y-3">
              <h3 className="text-[#0B1F3B] font-semibold text-sm uppercase tracking-wider">TAILORED FOR AI</h3>
              <p className="text-[#2F3A4A] text-sm leading-relaxed">
                All applications, software, and hardware are fully integrated and purpose-built for AI.
              </p>
            </div>

            {/* Up to 30% */}
            <div className="space-y-3">
              <h3 className="text-[#0B1F3B] font-semibold text-sm uppercase tracking-wider">UP TO 30%</h3>
              <p className="text-[#2F3A4A] text-sm leading-relaxed">
                We own the infrastructure, so you can focus on innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Services Integration Section */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Text */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light leading-tight">
                Get access to a fully integrated suite of AI services and compute
              </h2>
              <p className="text-[#2F3A4A] text-base leading-relaxed">
               Lower costs, increase revenue, and operate your AI workloads more efficiently on a fully integrated platform. Whether you use BluBridge’s built-in AI/ML tools or your own, the platform is designed to simplify the path from development to production.
              </p>
            </div>

            {/* Right - Services Grid with Infrastructure */}
            
            {/* Start  */}
              <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="bg-[#f3f1e9] rounded-xl p-4 border border-[#D6DEC3] hover:border-blue-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0B1F3B]/20 flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-[#328CC1]" />
                      </div>
                      <Link to={service.link}><span className="font-medium text-sm">{service.name}</span></Link>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Data Center Card */}
              <div className="mt-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-4 border border-blue-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#328CC1]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">BluBridge's Data centers</p>
                    <p className="text-xs text-[#2F3A4A]">Powered by renewable energy</p>
                  </div>
                </div>
              </div>
            </div>
            {/* End */}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-[#0B1F3B] mb-10">FAQs</h2>
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#D6DEC3]">
                <button
                  className="w-full flex items-center justify-between py-5 text-left hover:text-[#328CC1] transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-[#0B1F3B] text-lg pr-8">{faq.question}</span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-[#0B1F3B]/80">
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-[#328CC1]" />
                    ) : (
                      <Plus className="w-5 h-5 text-[#328CC1]" />
                    )}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="pb-5">
                    <p className="text-[#2F3A4A] text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
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
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors font-medium px-6 py-0">
              Contact <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
