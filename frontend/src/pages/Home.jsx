import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, ArrowLeft, Plus, Minus, Check, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeInfraTab, setActiveInfraTab] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const newsItems = [
    {
      date: "01 June, 2025",
      title: "BluBrg Closes Oversubscribed $500M Series B to Scale AI Infrastructure",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80"
    },
    {
      date: "21 May, 2025",
      title: "BluBrg Expands European Operations with New Data Center in Norway",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80"
    },
    {
      date: "15 May, 2025",
      title: "BluBrg Named NVIDIA Preferred Partner for AI Cloud Infrastructure",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&q=80"
    }
  ];

  const infraTabs = [
    {
      name: "Datacenters",
      title: "Purpose-built for AI",
      description: "BluBrg's Arctic data centers are engineered specifically for the intensive energy demands of GPU-based AI computing, utilizing 100% renewable hydroelectric power.",
      features: ["100% Renewable Energy", "Arctic cooling advantage", "Scalable infrastructure", "Sovereign data hosting"],
      link : '/products/glomfjord'
    },
    {
      name: "GPU Nodes",
      title: "High-performance compute",
      description: "Access the latest NVIDIA GPUs including H100, H200, and GB200 NVL72, optimized for AI training and inference workloads.",
      features: ["NVIDIA Grace Blackwell", "On-demand access", "Optimized for AI/HPC", "Bare-metal performance"],
      link : '/products/gpu-nodes'
    },
    {
      name: "Networking",
      title: "GPU fabric optimized for AI",
      description: "High-bandwidth, low-latency networking built for distributed AI training and inference at scale.",
      features: ["RoCE enabled", "Non-blocking design", "400Gbps InfiniBand", "Built for AI scale"],
      link : '/products/gpu-nodes'
    },
    {
      name: "Storage",
      title: "Fast storage for AI workloads",
      description: "High-performance parallel filesystems ensure GPUs are kept busy and fully utilized during training and inference.",
      features: ["RDMA enabled", "Parallel filesystems", "AI storage platform", "Fast checkpointing"],
      link : '/products/gpu-nodes'
    },
    {
      name: "Kubernetes",
      title: "Container orchestration at scale",
      description: "Robust Kubernetes infrastructure for deploying, managing, and scaling containerized AI workloads efficiently.",
      features: ["Bare metal performance", "Auto-scale to 1000s GPUs", "Fully managed", "Native GPU support"],
      link : '/products/training'
    }
  ];

  const testimonials = [
    {
      quote: "AI is transforming the global economy and reshaping the role of renewable energy. With Blubrg, we are supporting infrastructure that is sovereign, scalable, and purpose-built to drive this shift forward. Blubrg’s full-stack, GPU-first approach provides a clear execution advantage. The scale and quality of this Series B round reflect Blubrg’s strong vision, growing momentum, and the depth of our partnership. Through both our Series B investment and joint venture, we are making a meaningful, long-term commitment to building industrial relevance in the era of AI.",
      name: "Øyvind Eriksen",
      role: "President & CEO",
      company: "Aker ASA"
    },
    {
      quote: "In just a few months, Blubrg has advanced with clear focus and speed, transforming bold plans into real production capacity and achieving meaningful relevance quickly. The team is developing large-scale, sovereign infrastructure that enterprises and governments can truly use, delivering reliability, efficiency, and proximity to their data. We’re excited to support [Josh and the] Blubrg [team] as they scale thoughtfully, empower builders with the right infrastructure, and lay a strong foundation for national AI leadership.",
      name: "Larry Aschebrook",
      role: "Founder & Managing Partner",
      company: "G Squared"
    }
  ];

  const useCases = [
    {
      title: "TRAINING",
      metrics: [{ value: "80%", label: "Lower Cost" }, { value: "30%", label: "Faster" }],
      gradient: "from-purple-800/60 via-violet-900/50 to-indigo-900/60",
      link: "/solutions/training"
    },
    {
      title: "INFERENCE",
      metrics: [{ value: "7.2X", label: "Performance" }, { value: "+40%", label: "Efficiency" }],
      gradient: "from-slate-800/60 via-gray-900/50 to-zinc-900/60",
      link: "/solutions/inference"
    },
    {
      title: "FINE-TUNING",
      metrics: [{ value: "+40%", label: "Efficiency" }, { value: "30%", label: "Faster" }],
      gradient: "from-emerald-800/60 via-teal-900/50 to-green-900/60",
      link: "/solutions/fine-tuning"
    },
    {
      title: "AI DEVELOPMENT",
      metrics: [{ value: "80%", label: "Lower Cost" }, { value: "30%", label: "Faster" }],
      gradient: "from-amber-800/60 via-orange-900/50 to-yellow-900/60",
      link: "/solutions/ai-development"
    }
  ];

  const faqs = [
    {
      question: "What makes BluBrg different from other cloud providers?",
      answer: "BluBrg is purpose-built for AI from the ground up. Unlike general-purpose cloud providers, our infrastructure is optimized specifically for AI workloads with latest NVIDIA GPUs, high-bandwidth networking, and 100% renewable energy. We offer up to 80% cost savings and zero rate limits."
    },
    {
      question: "What GPU options are available?",
      answer: "We offer the latest NVIDIA GPUs including H100, H200, and the new GB200 NVL72 Blackwell architecture. All GPUs are available on-demand with bare-metal performance and can scale from single GPUs to thousands of nodes."
    },
    {
      question: "How does BluBrg ensure sustainability?",
      answer: "All our data centers are powered by 100% renewable hydroelectric energy in Norway. Our Arctic location provides natural cooling advantages, significantly reducing our environmental footprint compared to traditional data centers."
    },
    {
      question: "What support is available for enterprise customers?",
      answer: "Enterprise customers receive dedicated support including 24/7 technical assistance, dedicated account management, custom SLAs, and access to our AI solutions architects for architecture review and optimization."
    },
    {
      question: "Can I try BluBrg before committing?",
      answer: "Yes! We offer free trials and proof-of-concept deployments. Contact our sales team to discuss your specific requirements and get started with a customized evaluation plan."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-['DM_Sans']">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://customer-assets.emergentagent.com/job_blubrg-webdev/artifacts/pm500cgm_Banner%20Background.avif)',
            backgroundSize: '115% 115%',
            backgroundPosition: 'center',
            animation: 'heroWave 10s ease-in-out infinite'
          }}
        />
        <style>{`
          @keyframes heroWave {
            0%, 100% { 
              transform: scale(1.03) translate(0%, 0%);
            }
            25% { 
              transform: scale(1.05) translate(-1.2%, 0.8%);
            }
            50% { 
              transform: scale(1.03) translate(0%, 1.2%);
            }
            75% { 
              transform: scale(1.05) translate(1.2%, 0.6%);
            }
          }
        `}</style>
        <div className="container-custom relative z-10">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight text-white">
              The hyperscaler<br />engineered for AI
            </h1>
            
            <p className="text-xl text-white/70 font-light leading-relaxed max-w-md">
              A full-stack, scalable, and sustainable AI cloud platform.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/contact/sales">
                <Button className="bg-white text-[#0a1d54] hover:bg-white/90 px-8 py-3 rounded font-medium text-base">
                  Reserve GPUs
                </Button>
              </Link>
              <Link to="/contact" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium">
                Start Building <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Partner Logos */}
            <div className="flex flex-wrap items-center gap-6 pt-10">
              <span className="text-white/50 text-xs font-medium tracking-wider">Hewlett Packard Enterprise</span>
              <span className="text-white/50 text-xs font-medium tracking-wider">Computacenter</span>
              <span className="text-white/50 text-xs font-medium tracking-wider">Antler</span>
              <span className="text-white/50 text-xs font-medium tracking-wider">Open Innovation</span>
            </div>
          </div>
        </div>
      </section>

      {/* News/Updates Strip */}
      {/* <section className="py-12 bg-[#0a0a0f] border-t border-slate-800/50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-medium">Latest News</h3>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-video rounded-xl overflow-hidden mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <h4 className="text-white font-medium group-hover:text-blue-400 transition-colors">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Integrated AI Platform Section */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom">
          <div className="space-y-16">
            {/* Row 1: Text Left, Marketplace Card Right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-light text-white mb-4">A fully integrated suite of AI services and compute</h3>
                <p className="text-gray-400 leading-relaxed">Cut costs, increase revenue, and operate your AI workloads more efficiently with a fully integrated platform. Our platform simplifies the transition from development to production.</p>
              </div>
              <div className="flex justify-end">
                <Link to="/products/marketplace" className="block">
                  <div className="w-48 h-48 bg-[#111318] border border-[#252830] rounded-2xl flex flex-col items-center justify-center hover:border-blue-500/30 transition-colors cursor-pointer">
                   <div class="w-16 h-16 rounded-xl bg-[#1a1f28] border border-[#252830] flex items-center justify-center mb-4">
  <svg class="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
      d="M3 7h18M5 7l1 10a2 2 0 002 2h8a2 2 0 002-2l1-10M9 21v-6h6v6M9 7V5a3 3 0 016 0v2" />
  </svg>
</div>

                    <span className="text-white text-sm font-medium">Marketplace</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Row 2: Serverless Card Left, Text Right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-start">
                <Link to="/products/serverless" className="block">
                  <div className="w-48 h-48 bg-[#111318] border border-[#252830] rounded-2xl flex flex-col items-center justify-center hover:border-blue-500/30 transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-xl bg-[#1a1f28] border border-[#252830] flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <span className="text-white text-sm font-medium">Serverless</span>
                  </div>
                </Link>
              </div>
              <div className="lg:text-right">
                <h3 className="text-3xl font-light text-white mb-4">Serverless model endpoints for inference</h3>
                <p className="text-gray-400 leading-relaxed">Serverless enables smooth, scalable AI inference without the burden of managing infrastructure. It automatically adjusts to demand, delivering low-latency, cost-efficient inference.</p>
              </div>
            </div>

            {/* Row 3: Text Left, Training Card Right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Dedicated training clusters ready to go</h3>
                <p className="text-gray-400 leading-relaxed">BluBrg's optimized GPU clusters are built to shorten model training times and improve productivity. Leverage Slurm and Kubernetes for robust infrastructure management.</p>
              </div>
              <div className="flex justify-end">
                <Link to="/products/training" className="block">
                  <div className="w-48 h-48 bg-[#111318] border border-[#252830] rounded-2xl flex flex-col items-center justify-center hover:border-blue-500/30 transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-xl bg-[#1a1f28] border border-[#252830] flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <span className="text-white text-sm font-medium">Training</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Row 4: Inference Card Left, Text Right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-start">
                <Link to="/products/inference" className="block">
                  <div className="w-48 h-48 bg-[#111318] border border-[#252830] rounded-2xl flex flex-col items-center justify-center hover:border-blue-500/30 transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-xl bg-[#1a1f28] border border-[#252830] flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-white text-sm font-medium">Inference</span>
                  </div>
                </Link>
              </div>
              <div className="lg:text-right">
                <h3 className="text-3xl font-light text-white mb-4">Setting a new standard for inference</h3>
                <p className="text-gray-400 leading-relaxed">Access high-performance, cost-effective, and auto-scaling infrastructure for AI inference. Every layer of the stack is optimized for both batch and streaming workloads.</p>
              </div>
            </div>

            {/* Row 5: Text Left, GPU Nodes Card Right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-light text-white mb-4">Scalable, flexible AI Compute</h3>
                <p className="text-gray-400 leading-relaxed">BluBrg's GPU Nodes provide powerful computing performance designed for AI and high-performance computing workloads, backed by advanced cooling technology.</p>
              </div>
              <div className="flex justify-end">
                <Link to="/products/gpu-nodes" className="block">
                  <div className="w-48 h-48 bg-[#111318] border border-[#252830] rounded-2xl flex flex-col items-center justify-center hover:border-blue-500/30 transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-xl bg-[#1a1f28] border border-[#252830] flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <span className="text-white text-sm font-medium">GPU Nodes</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BluBrg Infrastructure Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols gap-12">
            {/* Left - Text and Tabs */}
            <div>
              <h2 className="text-4xl font-light mb-6">BluBrg's Infrastructure</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Blubrg manages the full AI infrastructure stack, from energy-efficient data centres in Norway to advanced compute clusters and software setups. Every component is thoughtfully chosen and engineered to support the demanding requirements of AI.
              </p>
              
              {/* Tab Buttons */}
              <div className="flex flex-wrap gap-2 mb-8">
                {infraTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveInfraTab(index)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeInfraTab === index 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
              
              {/* Active Tab Content */}
              <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-medium mb-3">{infraTabs[activeInfraTab].title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{infraTabs[activeInfraTab].description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {infraTabs[activeInfraTab].features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to={`${infraTabs[activeInfraTab].link}`} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mt-4 text-sm">
                  See More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Right - Empty for background image */}
            <div />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom">
          <h2 className="text-3xl font-light mb-12">Testimonials</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((item, index) => (
              <div key={index} className="border-l-2 border-slate-700 pl-6">
                <p className="text-gray-300 italic mb-6 leading-relaxed text-sm">"{item.quote}"</p>
                <div className="text-white font-medium">{item.name}</div>
                <div className="text-gray-500 text-sm">{item.role}</div>
                <div className="text-gray-600 text-sm">{item.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl mb-4 font-bold">Use cases</h2>
            <p className="text-gray-400 max-w-2xl">
              End-to-end AI solutions covering model training, fine-tuning, inference, and development, all built to accelerate your AI initiatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            {/* Model Training Card */}
            <Link to="/solutions/training">
              <div 
                className="relative border border-[#353535] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl"
                style={{ 
                  backgroundImage: 'url(https://customer-assets.emergentagent.com/job_blubrg-webdev/artifacts/e3q02b44_Training.avif)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">TRAINING</span>
                </div>
              </div>
            </Link>

            {/* AI & ML Inference Card */}
            <Link to="/solutions/inference">
              <div 
                className="relative border border-[#353535] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl"
                style={{ 
                  backgroundImage: 'url(https://customer-assets.emergentagent.com/job_blubrg-webdev/artifacts/cod8cw4n_INFERENCE.avif)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">INFERENCE</span>
                </div>
              </div>
            </Link>

            {/* AI Development Card */}
            <Link to="/solutions/ai-development">
              <div 
                className="relative border border-[#353535] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl"
                style={{ 
                  backgroundImage: 'url(https://customer-assets.emergentagent.com/job_blubrg-webdev/artifacts/az864l7b_AI%20Development.avif)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">AI DEVELOPMENT</span>
                </div>
              </div>
            </Link>

            {/* Model Fine-Tuning Card */}
            <Link to="/solutions/fine-tuning">
              <div 
                className="relative h-52 border border-[#353535] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl"
                style={{ 
                  backgroundImage: 'url(https://customer-assets.emergentagent.com/job_blubrg-webdev/artifacts/g9zwqz1g_Finetuning.avif)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">FINE-TUNING</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* NVIDIA Partner Strip */}
      <section className="py-16 bg-[#0d1117] border-t border-b border-slate-800/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light mb-4">
                BluBrg is now an NVIDIA Preferred Partner
              </h2>
              <p className="text-gray-400 mb-6">
                Access thousands of GPUs tailored to your requirements.
              </p>
              <div className="flex gap-4">
                <Link to="/contact/sales">
                  <Button className="bg-white text-[#0a0a0f] hover:bg-white/90 px-6 py-3">
                    Reserve GPUs
                  </Button>
                </Link>
                <Link to="/contact/sales">
                  <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-6 py-3">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end gap-8">
              <span className="text-5xl font-bold text-white/20 tracking-tight">NVIDIA</span>
              <div className="text-sm text-gray-500">Preferred Partner</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {/* <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-light mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border-b border-slate-700/50"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-5 text-left hover:text-blue-400 transition-colors"
                >
                  <span className="text-lg font-medium pr-8">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Final CTA Strip */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            Access thousands of GPUs tailored to your requirements.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact/sales">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact/sales" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors font-medium px-6 py-0">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
