import React, { useState } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid, Cpu } from 'lucide-react';

const Healthcare = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  useDocumentTitle('GPU Cloud for Healthcare and Biotech | BluBridge');

  return (
    <div className="min-h-screen bg-[#f1f2fa]">
      {/* HERO SECTION with Background Image */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://customer-assets.emergentagent.com/job_visual-swap-4/artifacts/t0yqp3t1_b7.png)'
          }}
        />
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3B]/85 via-[#0B1F3B]/60 to-transparent" />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              HEALTHCARE
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              BluBridge Cloud is offering tailored computing solutions for biotechnology firms and healthcare research organisations. By providing accessible and powerful GPU resources alongside expert AI support, BluBridge is enabling healthcare teams to speed up research efforts and deliver more personalised treatments.
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

      {/* VALUE PROPS */}
      <section className="py-16 bg-[#e8eaf3] border-t border-[#d4d8e8]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Accelerated Analytics</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">Improving the speed and accuracy of analysing medical imaging and other clinical data, helping reduce wait times and support faster clinical insights.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Enhanced AI Applications</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">Boosting the performance of training and running AI models for advanced healthcare use cases, making solutions more effective and responsive.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Scalability and Cost Efficiency</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">On-demand access to flexible and powerful compute resources is removing the need for costly local hardware and letting teams scale effortlessly with demand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXAMPLE USES */}
      <section className="py-24 bg-[#f1f2fa]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-[#328CC1] text-sm font-medium mb-3 uppercase tracking-wider">FOSTERING COLLABORATION AND INNOVATION</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4">Enhancing Efficiency in Healthcare</h2>
            <p className="text-base text-[#6B7280] max-w-3xl">The convergence of cloud technologies and GPU-powered computing is transforming healthcare fields such as bioinformatics, genomics, drug discovery, personalised medicine, and multi-omics research. These capabilities are streamlining workflows, enhancing diagnostic accuracy, and fostering collaboration and innovation.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Drug Discovery</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Build superior AI models</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">Using high-performance GPU computing to accelerate training of large-scale AI models that can predict protein structures and expedite the development of new treatments.</p>
            </div>
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Life Sciences</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Accelerated Simulations</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">Running complex biological and chemical simulations much faster using GPU-powered infrastructure, enabling deeper investigation and faster results.</p>
            </div>
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Genomics</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Personalised medicine</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">Analysing vast sets of genomic data to support personalised medicine, helping researchers uncover insights that are driving tailored healthcare solutions.</p>
            </div>
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-[#328CC1] mb-2">Bioinformatics</h3>
              <p className="text-[#6B7280] text-xs font-medium mb-2 uppercase tracking-wider">Scalable Storage</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">Scaling storage and computing for the large, complex datasets common in bioinformatics, making data easier to access, process, and secure for research purposes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* KEY SERVICES */}
      <section className="py-24 bg-[#f1f2fa]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">Key Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link className="" to="/products/training">
              <div className="hover:bg-[#f5f4f1] min-h-[310px] hover:text-[#328CC1] bg-white border border-[#d4d8e8] rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-7 h-7 text-[#328CC1]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
                <p className="text-[#328CC1] text-sm mb-4">Training</p>
                <p className="text-[#6B7280] text-sm leading-relaxed">A flexible and performance-optimised compute environment designed to shorten training times and increase productivity for data-intensive workloads.</p>
              </div>
            </Link>
            <Link className="" to="/products/inference">
              <div className="hover:bg-[#f5f4f1] min-h-[310px] hover:text-[#328CC1] bg-white border border-[#d4d8e8] rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 rounded-xl flex items-center justify-center">
                    <Cpu className="w-7 h-7 text-[#328CC1]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
                <p className="text-[#328CC1] text-sm mb-4">Inference</p>
                <p className="text-[#6B7280] text-sm leading-relaxed">A high-efficiency inference platform built to run production-level AI workloads with strong performance and reliability.</p>
              </div>
            </Link>
            <Link className="" to="/products/marketplace">
              <div className="hover:bg-[#f5f4f1] hover:text-[#328CC1] bg-white border border-[#d4d8e8] rounded-xl p-8 hover:border-blue-500/30 transition-colors">
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-purple-600/20 rounded-xl flex items-center justify-center">
                    <LayoutGrid className="w-7 h-7 text-[#328CC1]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Marketplace</h3>
                <p className="text-[#328CC1] text-sm mb-4">Marketplace</p>
                <p className="text-[#6B7280] text-sm leading-relaxed">An ecosystem of tools and frameworks that support building, deploying, and scaling AI applications using BluBridge's services and popular AI/ML technologies.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* MORE SOLUTIONS */}
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

      {/* BOTTOM CTA */}
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

export default Healthcare;
