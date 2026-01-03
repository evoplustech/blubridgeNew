import React, { useState } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid } from 'lucide-react';

const Education = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useDocumentTitle('Elevate Advanced Research Projects | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      {/* HERO SECTION with Background Image */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://customer-assets.emergentagent.com/job_visual-swap-4/artifacts/30p1f6x8_bann.png)'
          }}
        />
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3B]/85 via-[#0B1F3B]/60 to-transparent" />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              EDUCATION
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              At BluBridge, we provide GPU cloud computing resources that help educational institutions and research organisations enhance teaching, learning, and research outcomes. Our infrastructure gives students, faculty, and researchers access to high-performance computing environments that support advanced computing projects and AI applications.
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
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Enhanced Learning with AI</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Use AI tools and technologies to create personalised educational experiences, adaptive assessments, and intelligent tutoring systems that help students learn more effectively.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Cost-Effective Access to HPC</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Institutions can tap into powerful GPU resources on demand, making high-performance computing affordable and accessible even for smaller schools and departments.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Facilitating Research</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              Our GPU Cloud provides the computational power needed for research in areas such as engineering, biology, data science, and artificial intelligence, helping accelerate discovery and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Empowering Academic Research + Example Uses Section */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-indigo-400 text-sm font-medium mb-3 uppercase tracking-wider">EMPOWERING ACADEMIC RESEARCH</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4">Example uses</h2>
            <p className="text-base text-[#6B7280] max-w-3xl">
              BluBridge’s GPU Cloud Infrastructure transforms how educators and researchers work across multiple disciplines. It enables advanced research projects by supplying scalable and robust computing resources tailored to the needs of academic users.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Foundation Model Training */}
            <div className="border-l-2 border-indigo-500 pl-6">
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Foundation Model Training</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">High-performance Infrastructure</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Researchers can access scalable, high-performance computing for developing and training foundational AI models. This helps accelerate deep learning research and experimentation.
              </p>
            </div>

            {/* Synthetic Biology Research */}
            <div className="border-l-2 border-indigo-500 pl-6">
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Synthetic Biology Research</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Accelerated Discovery</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                GPU computing power enables intricate simulations, large-scale data processing, and computational experiments. These capabilities speed up progress in fields like synthetic biology and other data-intensive sciences.
              </p>
            </div>

            {/* AI-Driven Multidisciplinary Studies */}
            <div className="border-l-2 border-indigo-500 pl-6">
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">AI-Driven Multidisciplinary Studies</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Enabling Collaboration</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Our infrastructure supports complex computational studies that span multiple academic fields. It gives research teams a flexible platform where they can collaborate, test ideas, and run analysis more efficiently.
              </p>
            </div>

            {/* Enhancing STEM Education */}
            <div className="border-l-2 border-indigo-500 pl-6">
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Enhancing STEM Education</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Interactive Learning Environments</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
              STEM educators can use the GPU cloud to build immersive, interactive learning environments that help students explore complex concepts in areas like robotics, physics, and machine learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">Key Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* AI Compute Training Card */}
            <div className="bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-indigo-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/30 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-indigo-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-indigo-400 text-sm mb-4">Training</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                A scalable, performance-optimised compute environment designed to shorten model training cycles and increase productivity for academic researchers and students.
              </p>
            </div>

            {/* AI Marketplace Card */}
            <div className="bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-indigo-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/30 to-blue-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-indigo-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Marketplace</h3>
              <p className="text-indigo-400 text-sm mb-4">Marketplace</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                 A suite of tools and services that help educators and researchers build, deploy, and scale AI applications using both BluBridge offerings and widely used AI/ML frameworks.
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
                question: "What makes BluBridge's GPU Cloud suitable for educational institutions?",
                answer: "BluBridge offers academic pricing, scalable on-demand resources, and pre-configured environments for AI/ML research and teaching. Our platform makes high-performance computing accessible to universities and schools without massive upfront infrastructure investments."
              },
              {
                question: "How can students and researchers access BluBridge resources?",
                answer: "We provide multi-user environments with role-based access control, allowing institutions to easily provision accounts for students, faculty, and research teams. Collaborative tools enable seamless project sharing and resource allocation."
              },
              {
                question: "Does BluBridge support academic research requirements?",
                answer: "Yes, our platform supports reproducible research with saved configurations, version control for experiments, and publication-ready documentation. We also offer special pricing and extended compute allocations for research projects."
              },
              {
                question: "What kind of AI/ML tools are available for education?",
                answer: "BluBridge's AI Marketplace includes popular frameworks like TensorFlow, PyTorch, and Jupyter notebooks, along with pre-configured environments for machine learning courses, data science education, and advanced AI research."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#D6DEC3]">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-indigo-400 transition-colors"
                >
                  <span className="text-base font-medium text-[#0B1F3B] pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-indigo-400" />
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

export default Education;
