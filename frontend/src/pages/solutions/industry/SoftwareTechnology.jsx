import React, { useState } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid, Cpu } from 'lucide-react';

const SoftwareTechnology = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useDocumentTitle('Enhancing Tech with GPU Cluster Solutions | BluBridge');

  return (
    <div className="min-h-screen bg-[#f0f1f9]">
      {/* HERO SECTION with Background Image */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://customer-assets.emergentagent.com/job_visual-swap-4/artifacts/kpfcfp5n_b2.png)'
          }}
        />
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3B]/85 via-[#0B1F3B]/60 to-transparent" />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              SOFTWARE & TECHNOLOGY
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              At BluBridge, we are providing GPU cluster computing solutions that are supporting software and technology companies in powering their compute-intensive tasks. With high-performance infrastructure and scalable cloud capabilities, technology teams can build, deploy, and scale advanced products more quickly and reliably.
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
      <section className="py-16 bg-[#e8eaf3] border-t border-[#d4d8e8]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Accelerated Processing</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Our GPU clusters are delivering substantial computational performance, enabling faster processing for tasks such as machine learning, AI model training, and large-scale data analytics, which is significantly shortening development timelines.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Simplified AI Deployment</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              By using scalable GPU clusters tailored to your needs, you can streamline the process of training and deploying AI models. This is helping reduce time-to-market for intelligent features and improving overall deployment efficiency.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Enhanced Collaboration</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              High-performance computing resources are accessible remotely, supporting teams working across different locations and helping streamline collaboration, resource allocation, and project workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Uses Section */}
      <section className="py-24 bg-[#f0f1f9]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-purple-400 text-sm font-medium mb-3 uppercase tracking-wider">ADVANCING TECH SERVICES</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4">Example uses</h2>
            <p className="text-base text-[#6B7280] max-w-3xl">
              Discover how software and technology companies use GPU cloud infrastructure to improve development, support crucial operational needs, and drive innovation in their product offerings.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Building Your Own Large Language Model */}
            <div className="border-l-2 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Building Your Own Large Language Model</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Custom LLM Development</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Use powerful GPU clusters to train your own large language models, enabling capabilities like natural language understanding, custom text generation, and domain-specific AI solutions.
              </p>
            </div>

            {/* Accelerating Drug Discovery */}
            <div className="border-l-2 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Accelerating Drug Discovery</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Healthcare & Biotech</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Perform complex simulations and analyses that help speed up research in areas like bioinformatics and pharmaceutical development by leveraging parallel processing and high throughput.
              </p>
            </div>

            {/* Advanced Computer Vision */}
            <div className="border-l-2 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Advanced Computer Vision</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Image and Video Analysis</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Accelerate the development of computer vision applications by including image and video analysis, autonomous systems, and security applications by using GPU-optimized computing.
              </p>
            </div>

            {/* Enhancing Cybersecurity */}
            <div className="border-l-2 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Enhancing Cybersecurity</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Threat Detection & Response</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Improve threat detection and response capabilities with GPU-powered systems that analyse large volumes of data in real time to surface patterns and anomalies that indicate risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-24 bg-[#f0f1f9]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">Key Services</h2>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* AI Compute Training Card */}
            <Link className="h-full" to="/products/training">
            <div className="hover:bg-[#f5f4f1] min-h-[310px] hover:text-[#328CC1] bg-white border border-[#d4d8e8] rounded-xl p-8 hover:border-purple-500/30 transition-colorsh-full flex flex-col hover:bg-[#f5f4f1] hover:text-[#328CC1] bg-white border border-[#d4d8e8] rounded-xl p-8 hover:border-purple-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-purple-400 text-sm mb-4">Training</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                A flexible compute environment built to speed up model training and support demanding software workload demands.
              </p>
            </div>
            </Link>
            {/* AI Compute Inference Card */}
            <Link className="h-full" to="/products/gpu-nodes">
            <div className="hover:bg-[#f5f4f1] min-h-[310px] hover:text-[#328CC1] bg-white border border-[#d4d8e8] rounded-xl p-8 hover:border-purple-500/30 transition-colorsh-full flex flex-col hover:bg-[#f5f4f1] hover:text-[#328CC1] bg-white border border-[#d4d8e8] rounded-xl p-8 hover:border-purple-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/30 to-blue-600/20 rounded-xl flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-purple-400 text-sm mb-4">GPU Nodes</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Dedicated GPU clusters designed to handle compute-intensive applications, AI workloads, and data processing with reliability and performance.
              </p>
            </div>
            </Link>
            {/* AI Marketplace Card */}
            <Link className="h-full" to="/products/marketplace">
            <div className="hover:bg-[#f5f4f1] hover:text-[#328CC1] bg-white border border-[#d4d8e8] rounded-xl p-8 hover:border-purple-500/30 transition-colorsh-full flex flex-col hover:bg-[#f5f4f1] hover:text-[#328CC1] bg-white border border-[#d4d8e8] rounded-xl p-8 hover:border-purple-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/30 to-violet-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Marketplace</h3>
              <p className="text-purple-400 text-sm mb-4">Marketplace</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                An ecosystem of services for developing and deploying AI applications built using BluBridge's tools and popular AI/ML software.
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
                question: "How does BluBridge help software teams deploy AI faster?",
                answer: "BluBridge provides pre-configured GPU environments with popular ML frameworks, simple APIs for deployment, and auto-scaling infrastructure. Teams can go from model training to production deployment in minutes instead of weeks, without managing complex infrastructure."
              },
              {
                question: "What security measures protect our code and data?",
                answer: "BluBridge implements enterprise-grade security including SOC 2 Type II certification, end-to-end encryption, private VPC deployments, and isolated compute environments. Your code and data never leave your control, and we maintain comprehensive audit logging."
              },
              {
                question: "Can BluBridge handle variable compute demands?",
                answer: "Yes, our platform auto-scales from zero to thousands of GPUs based on demand. You only pay for what you use, and our infrastructure handles traffic spikes seamlessly without manual intervention or performance degradation."
              },
              {
                question: "Which ML frameworks and tools are supported?",
                answer: "BluBridge supports all major frameworks including PyTorch, TensorFlow, JAX, and Hugging Face. Our marketplace includes pre-configured environments, popular libraries, and one-click deployment templates for common AI applications."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#d4d8e8]">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-purple-400 transition-colors"
                >
                  <span className="text-base font-medium text-[#0B1F3B] pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-purple-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-purple-400" />
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

export default SoftwareTechnology;
