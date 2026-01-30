import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { ArrowRight, Wrench, Monitor, Server } from 'lucide-react';

const SolutionsNew = () => {
  useDocumentTitle('Solutions | BluBridge');
  const location = useLocation();
  const [activeDeploymentTab, setActiveDeploymentTab] = useState('deployment-tooling');

  // Smooth scroll to anchor on page load with header offset
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          const headerOffset = 120;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      {/* Hero Section */}
      <section className="py-20 md:py-28 lg:py-36 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1F3B] leading-[1.1] tracking-tight mb-8">
              Engineering AI-Native Systems at the Frontier of Enterprise AI
            </h1>
            
            <p className="text-lg md:text-xl text-[#555555] leading-relaxed max-w-3xl mx-auto mb-10">
              Partnering with technically ambitious enterprises — from model development to production-grade deployment — through research-driven, system-level AI engineering.
            </p>

            {/* CTA Button */}
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0B1F3B] text-white font-medium rounded-lg hover:bg-[#162B4D] transition-colors text-lg"
            >
              <span>Talk to Our Expertise</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Model Customization */}
      <section id="model-customization" className="py-16 md:py-24 bg-[#efede5]">
        <div className="container-custom">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#0B1F3B] mb-6 leading-tight max-w-4xl">
            Domain-Specialized Models, Engineered on Proprietary Data
          </h2>
          
          <p className="text-base md:text-lg text-[#555555] leading-relaxed mb-12 ">
            Adapt general-purpose foundation models into domain-aligned systems through research-driven training and controlled model engineering. BluBridge is actively building model customization capabilities across training, specialization, and inference optimization workflows. This track focuses on repeatable training discipline, evaluation rigor, and system-level correctness — not surface-level tuning.
          </p>

          {/* Three Column Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Custom Pre-Training */}
            <div className="bg-[#fffdf7] rounded-xl p-6 lg:p-8 shadow-sm border border-[#e8e6de]">
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-4">
                Custom Pre-Training
              </h3>
              
              <p className="text-sm text-[#555555] leading-relaxed mb-5">
                We are building and validating domain-oriented pre-training and continued training pipelines using proprietary datasets and controlled training configurations. Current capability development includes:
              </p>
              
              <ul className="space-y-3 mb-5">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] flex-shrink-0 mt-2"></span>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Full pre-training workflows using curated domain data mixtures and custom training recipes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] flex-shrink-0 mt-2"></span>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Continued pre-training from open or internal checkpoints using domain corpora
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] flex-shrink-0 mt-2"></span>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Tokenization and dataset strategy design for domain signal preservation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] flex-shrink-0 mt-2"></span>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Training evaluation and regression tracking frameworks
                  </span>
                </li>
              </ul>
              
              <div className="pt-4 border-t border-[#e8e6de]">
                <span className="text-xs text-[#888888] font-medium uppercase tracking-wide">
                  Status: Training pipeline capability under active development.
                </span>
              </div>
            </div>

            {/* Card 2: Specialized Model Capabilities */}
            <div className="bg-[#fffdf7] rounded-xl p-6 lg:p-8 shadow-sm border border-[#e8e6de]">
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-4">
                Specialized Model Capabilities
              </h3>
              
              <p className="text-sm text-[#555555] leading-relaxed mb-5">
                We are building and testing specialization workflows intended to adapt model behavior and task performance through structured fine-tuning and alignment methods. Current engineering directions include:
              </p>
              
              <ul className="space-y-3 mb-5">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] flex-shrink-0 mt-2"></span>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Supervised fine-tuning pipelines for task-specific adaptation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] flex-shrink-0 mt-2"></span>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Preference and behavior alignment methods under controlled evaluation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] flex-shrink-0 mt-2"></span>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Synthetic data generation for robustness and edge-case coverage
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] flex-shrink-0 mt-2"></span>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Retrieval-grounded model workflows under prototype validation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] flex-shrink-0 mt-2"></span>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Prompt and tool orchestration layers for bounded enterprise tasks
                  </span>
                </li>
              </ul>
              
              <div className="pt-4 border-t border-[#e8e6de]">
                <span className="text-xs text-[#888888] font-medium uppercase tracking-wide">
                  Status: Specialization frameworks in prototype and validation stages.
                </span>
              </div>
            </div>

            {/* Card 3: Inference & Deployment Optimization */}
            <div className="bg-[#fffdf7] rounded-xl p-6 lg:p-8 shadow-sm border border-[#e8e6de]">
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-4">
                Inference & Deployment Optimization
              </h3>
              
              <p className="text-sm text-[#555555] leading-relaxed mb-5">
                We are building and validating inference and deployment optimization capabilities to support efficient and reliable model serving. Active workstreams include:
              </p>
              
              <ul className="space-y-3 mb-5">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] flex-shrink-0 mt-2"></span>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Inference profiling and performance characterization
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] flex-shrink-0 mt-2"></span>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Quantization and efficiency experiments
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] flex-shrink-0 mt-2"></span>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Runtime and batching strategy evaluation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] flex-shrink-0 mt-2"></span>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Containerized inference deployment patterns under internal testing
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B1F3B] flex-shrink-0 mt-2"></span>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Observability hooks for latency, throughput, and drift measurement
                  </span>
                </li>
              </ul>
              
              <p className="text-sm text-[#555555] leading-relaxed mb-5">
                Our focus is on deployment correctness and efficiency engineering before scale claims.
              </p>
              
              <div className="pt-4 border-t border-[#e8e6de]">
                <span className="text-xs text-[#888888] font-medium uppercase tracking-wide">
                  Status: Inference and deployment optimization playbooks under construction
                </span>
              </div>
            </div>
          </div>

          {/* Customization Stack Table Section */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-4">
              Customization Stack
            </h3>
            <p className="text-[#555555] text-base md:text-lg mb-8 max-w-3xl">
              Our comprehensive customization stack gives you full control from data to deployment, with flexibility at every layer
            </p>

            {/* Table */}
            <div className="rounded-xl overflow-hidden shadow-sm">
              {/* Header Row */}
              <div className="grid grid-cols-3 bg-[#0B1F3B]">
                <div className="px-6 py-4">
                  <span className="text-white font-bold text-sm uppercase tracking-wide">DATA</span>
                </div>
                <div className="px-6 py-4">
                  <span className="text-white font-bold text-sm uppercase tracking-wide">PLATFORM</span>
                </div>
                <div className="px-6 py-4">
                  <span className="text-white font-bold text-sm uppercase tracking-wide">INFRASTRUCTURE & HARDWARE</span>
                </div>
              </div>

              {/* Data Rows */}
              <div className="bg-[#fffdf7]">
                {/* Row 1 */}
                <div className="grid grid-cols-3 border-b border-[#e8e6de]">
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">Instruction Datasets</span>
                  </div>
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">Training Pipelines</span>
                  </div>
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">Distributed Training</span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-3 border-b border-[#e8e6de]">
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">Domain Corpora</span>
                  </div>
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">Experiment Manager</span>
                  </div>
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">GPU Orchestration</span>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-3 border-b border-[#e8e6de]">
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">Prompt Templates</span>
                  </div>
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">Hyperparameter Tuning</span>
                  </div>
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">NVIDIA H100 / A100</span>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-3 border-b border-[#e8e6de]">
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">Alignment Packs</span>
                  </div>
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">Model Versioning</span>
                  </div>
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">High-Speed Storage</span>
                  </div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-3">
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">Fine-Tuning Kits</span>
                  </div>
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">Adapter Management</span>
                  </div>
                  <div className="px-6 py-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] flex-shrink-0"></span>
                    <span className="text-[#333333] text-sm">High-Speed Networking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Us Button */}
          <div className="mt-12 text-center">
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0B1F3B] text-white font-medium rounded-lg hover:bg-[#162B4D] transition-colors"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Value Realization */}
      <section id="value-realization" className="py-16 md:py-24 bg-[#fffdf7]">
        <div className="container-custom">
          {/* Two Column Layout: Left Text + Right Cards */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            {/* Left Column: Heading and CTA - Vertically Centered */}
            <div className="lg:w-1/2 lg:pr-8">
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold text-[#0B1F3B] mb-4 leading-tight">
                We start from your current AI maturity and engineer toward deployable systems.
              </h2>
              <p className="text-base md:text-lg text-[#555555] leading-relaxed mb-8">
                From use-case discovery through model development and deployment validation, BluBridge engineering teams remain directly engaged across the full lifecycle.
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3B] text-white font-medium rounded-lg hover:bg-[#162B4D] transition-colors"
              >
                <span>Talk to our experts</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Column: Three Stacked Cards */}
            <div className="lg:w-1/2 space-y-4">
              {/* Card 1: Proof of Value */}
              <div className="bg-[#f9f7f0] rounded-xl p-6 border border-[#e8e6de] flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#0B1F3B] flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 17l-5-5-4 4-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0B1F3B] mb-2">
                    Proof of Value
                  </h3>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    We help define measurable success criteria for AI adoption and validate use cases through feasibility analysis, controlled prototypes, and evaluation against your data, system constraints, and technical objectives.
                  </p>
                </div>
              </div>

              {/* Card 2: Custom Training */}
              <div className="bg-[#f9f7f0] rounded-xl p-6 border border-[#e8e6de] flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#0B1F3B] flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0B1F3B] mb-2">
                    Custom Training
                  </h3>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    We help build domain-customized models using your proprietary data through structured fine-tuning and training workflows aligned with defined technical success criteria.
                  </p>
                </div>
              </div>

              {/* Card 3: Deployment Engineering */}
              <div className="bg-[#f9f7f0] rounded-xl p-6 border border-[#e8e6de] flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#0B1F3B] flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0B1F3B] mb-2">
                    Deployment Engineering
                  </h3>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    We help design and implement model deployment across managed cloud environments (including hyperscalers), private infrastructure, and controlled on-prem environments, with deployment patterns selected based on performance, security, and operational constraints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Deployment - Premium Clean Design */}
      <section id="deployment" className="py-20 md:py-28 bg-[#efede5]">
        <div className="container-custom">
          {/* Section Heading with Premium Accent */}
          <div className="mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0B1F3B] leading-tight max-w-4xl">
              What self-deployment capabilities are under development?
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#F4C430] to-[#D4A420] mt-6 rounded-full"></div>
          </div>

          {/* Premium Tabbed Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Clean Vertical Tab Navigation */}
            <div className="lg:w-[300px] flex-shrink-0">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg">
                <nav className="space-y-2">
                  {/* Tab 1: Deployment Tooling */}
                  <button 
                    onClick={() => setActiveDeploymentTab('deployment-tooling')}
                    data-testid="deployment-tab-tooling"
                    className={`w-full text-left px-5 py-4 flex items-center justify-between transition-all duration-300 rounded-xl ${
                      activeDeploymentTab === 'deployment-tooling' 
                        ? 'bg-white text-[#0B1F3B] shadow-md border border-[#e8e6de]' 
                        : 'text-[#666666] hover:text-[#0B1F3B] hover:bg-white/50'
                    }`}
                  >
                    <span className={`font-medium ${activeDeploymentTab === 'deployment-tooling' ? 'font-semibold' : ''}`}>Deployment Tooling</span>
                    {activeDeploymentTab === 'deployment-tooling' && (
                      <span className="text-[#F4C430] text-xl font-bold">→</span>
                    )}
                  </button>
                  
                  {/* Tab 2: Serving Frameworks */}
                  <button 
                    onClick={() => setActiveDeploymentTab('serving-frameworks')}
                    data-testid="deployment-tab-serving"
                    className={`w-full text-left px-5 py-4 flex items-center justify-between transition-all duration-300 rounded-xl ${
                      activeDeploymentTab === 'serving-frameworks' 
                        ? 'bg-white text-[#0B1F3B] shadow-md border border-[#e8e6de]' 
                        : 'text-[#666666] hover:text-[#0B1F3B] hover:bg-white/50'
                    }`}
                  >
                    <span className={`font-medium ${activeDeploymentTab === 'serving-frameworks' ? 'font-semibold' : ''}`}>Serving Frameworks</span>
                    {activeDeploymentTab === 'serving-frameworks' && (
                      <span className="text-[#F4C430] text-xl font-bold">→</span>
                    )}
                  </button>
                  
                  {/* Tab 3: Infrastructure Tracks */}
                  <button 
                    onClick={() => setActiveDeploymentTab('infrastructure-tracks')}
                    data-testid="deployment-tab-infrastructure"
                    className={`w-full text-left px-5 py-4 flex items-center justify-between transition-all duration-300 rounded-xl ${
                      activeDeploymentTab === 'infrastructure-tracks' 
                        ? 'bg-white text-[#0B1F3B] shadow-md border border-[#e8e6de]' 
                        : 'text-[#666666] hover:text-[#0B1F3B] hover:bg-white/50'
                    }`}
                  >
                    <span className={`font-medium ${activeDeploymentTab === 'infrastructure-tracks' ? 'font-semibold' : ''}`}>Infrastructure Tracks</span>
                    {activeDeploymentTab === 'infrastructure-tracks' && (
                      <span className="text-[#F4C430] text-xl font-bold">→</span>
                    )}
                  </button>
                </nav>
              </div>
            </div>

            {/* Right: Premium Tab Content Panel */}
            <div className="flex-1">
              {/* Deployment Tooling Content */}
              {activeDeploymentTab === 'deployment-tooling' && (
                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-[#e8e6de]/30 min-h-[320px]" data-testid="deployment-content-tooling">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-6">
                    Self-Deployment Tooling
                  </h3>
                  
                  <p className="text-base md:text-lg text-[#555555] leading-[1.8]">
                    BluBridge is building internal deployment tooling and model serving workflows to support controlled self-hosted and private infrastructure model deployments. Current engineering efforts focus on deployment configuration patterns, runtime setup, performance profiling, and validation procedures so that model serving can be executed in reproducible and monitored environments. These self-deployment capabilities are presently in engineering and validation stages and are not yet available as packaged external releases.
                  </p>
                </div>
              )}

              {/* Serving Frameworks Content */}
              {activeDeploymentTab === 'serving-frameworks' && (
                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-[#e8e6de]/30 min-h-[320px]" data-testid="deployment-content-serving">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-6">
                    Serving Frameworks
                  </h3>
                  
                  <p className="text-base md:text-lg text-[#555555] leading-[1.8] mb-6">
                    BluBridge is developing internal model serving frameworks to standardize inference configuration, runtime behavior, and performance measurement across controlled environments. Current engineering work focuses on serving configuration patterns, runtime controls, profiling methods, and observability integration so that model execution can be measured, tuned, and reproduced reliably. These frameworks are presently limited to internal experiments and pilot-stage systems and are not yet released as external tooling.
                  </p>
                  
                  <div className="pt-5 border-t border-[#e8e6de]">
                    <span className="text-sm text-[#888888] font-medium">
                      Availability: Internal use and limited pilot programs.
                    </span>
                  </div>
                </div>
              )}

              {/* Infrastructure Tracks Content */}
              {activeDeploymentTab === 'infrastructure-tracks' && (
                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-[#e8e6de]/30 min-h-[320px]" data-testid="deployment-content-infrastructure">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-6">
                    Infrastructure Tracks
                  </h3>
                  
                  <p className="text-base md:text-lg text-[#555555] leading-[1.8]">
                    BluBridge is developing internal infrastructure tracks to study and standardize how AI model training and inference systems are provisioned, measured, and operated across controlled compute environments. Current work covers compute topology patterns, GPU workload profiling, storage and data pipeline behavior, and observability baselines required for reliable AI system operation. These infrastructure tracks are part of ongoing internal engineering programs and are not yet exposed as external infrastructure offerings.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA Strip */}
      <section className="py-16 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white">
            Know more about our Research 
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/research"
              className="bg-white text-[#0B1F3B] hover:bg-[#f3f1e9] px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsNew;
