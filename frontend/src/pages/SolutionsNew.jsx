import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { ArrowRight, Database, Sparkles, Zap, Check } from 'lucide-react';

const SolutionsNew = () => {
  useDocumentTitle('Applied AI Solutions - For your Use Case | Blubridge');
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
      <section 
        className="py-20 md:py-28 lg:py-36 relative"
        style={{
          backgroundColor: '#fffdf7'
        }}
      >
        {/* Background lines with fade effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #e8e8ef 0px, #e8e8ef 1px, transparent 1px, transparent 3px)',
            backgroundSize: '4px 4px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)'
          }}
        />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1F3B] leading-[1.1] tracking-tight mb-8">
              Engineering AI-Native Systems for Enterprise Frontiers
            </h1>
            
            <p className="text-lg md:text-xl text-[#555555] leading-relaxed max-w-3xl mx-auto mb-10">
             Partnering with ambitious organizations from model development to production grade deployment through research-driven, system-level AI engineering.
            </p>

            {/* CTA Button */}
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0B1F3B] text-white font-medium rounded-lg hover:bg-[#162B4D] transition-colors text-lg"
            >
              <span>Talk to our Experts</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Model Customization - Premium Design */}
      <section id="model-customization" className="py-20 md:py-28 bg-[#efede5]">
        <div className="container-custom">
          {/* Section Header with Accent */}
          <div className="mb-14">
            <h2 className="leading-10 text-2xl lg:text-[44px] font-bold text-[#0B1F3B] mb-6 ">
              Domain-Specialized Models,<br></br> Engineered on Proprietary Data
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#328CC1] to-[#1a5a8c] rounded-full mb-8"></div>
            <p className="text-base md:text-lg text-[#555555] leading-relaxed max-w-4xl">
              Adapt general-purpose foundation models into domain-aligned systems through research-driven training and controlled model engineering. Model customization capabilities are under active development across training, specialization, and inference optimization workflows. This track focuses on repeatable training discipline, evaluation rigor, and system-level correctness.
            </p>
          </div>

          {/* Premium Three Column Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Custom Pre-Training */}
            <div className="group bg-[#fffdf7] rounded-2xl p-8 shadow-lg border border-[#e8e6de]/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Card Number Badge */}
              {/* <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-[#328CC1] to-[#1a5a8c] flex items-center justify-center text-white font-bold text-sm shadow-md">
                01
              </div> */}
              
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#328CC1]/10 to-[#328CC1]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Database className="w-7 h-7 text-[#328CC1]" />
              </div>
              
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-4">
                Custom Pre-Training
              </h3>
              
              <p className="text-sm text-[#555555] leading-relaxed mb-6">
                We are building and validating domain oriented pre-training and continued training pipelines using customized datasets and controlled training configurations. Current capability development includes:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#328CC1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#328CC1]" />
                  </div>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Full pre-training workflows using curated domain data mixtures and custom training recipes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#328CC1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#328CC1]" />
                  </div>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Continued pre-training from open or internal checkpoints using domain corpora
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#328CC1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#328CC1]" />
                  </div>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Tokenization and dataset strategy design for domain signal preservation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#328CC1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#328CC1]" />
                  </div>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Training evaluation and regression tracking frameworks
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 2: Specialized Model Capabilities */}
            <div className="group  bg-[#fffdf7] rounded-2xl p-8 shadow-lg border border-[#e8e6de]/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Card Number Badge */}
              {/* <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-[#328CC1] to-[#1a5a8c] flex items-center justify-center text-white font-bold text-sm shadow-md">
                02
              </div> */}
              
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#328CC1]/10 to-[#328CC1]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-7 h-7 text-[#328CC1]" />
              </div>
              
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-4">
                Specialized Model Capabilities
              </h3>
              
              <p className="text-sm text-[#555555] leading-relaxed mb-6">
                Specialization workflows are in prototype and validation stages to adapt model behavior and task performance through structured fine-tuning and alignment methods. Current engineering directions include:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#328CC1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#328CC1]" />
                  </div>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Supervised fine-tuning pipelines for task-specific adaptation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#328CC1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#328CC1]" />
                  </div>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Preference and behavior alignment methods under controlled evaluation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#328CC1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#328CC1]" />
                  </div>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Synthetic data generation for robustness and edge-case coverage
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#328CC1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#328CC1]" />
                  </div>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Retrieval-grounded model workflows under prototype validation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#328CC1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#328CC1]" />
                  </div>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Prompt and tool orchestration layers for bounded enterprise tasks
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 3: Inference & Deployment Optimization */}
            <div className="group bg-[#fffdf7] rounded-2xl p-8 shadow-lg border border-[#e8e6de]/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Card Number Badge */}
              {/* <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-[#328CC1] to-[#1a5a8c] flex items-center justify-center text-white font-bold text-sm shadow-md">
                03
              </div> */}
              
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#328CC1]/10 to-[#328CC1]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-7 h-7 text-[#328CC1]" />
              </div>
              
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-4">
                Inference & Deployment Optimization
              </h3>
              
              <p className="text-sm text-[#555555] leading-relaxed mb-6">
                Inference and deployment optimization capabilities are under development to support efficient and reliable model serving. Active workstreams include:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#328CC1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#328CC1]" />
                  </div>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Inference profiling and performance characterization
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#328CC1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#328CC1]" />
                  </div>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Quantization and efficiency experiments
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#328CC1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#328CC1]" />
                  </div>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Runtime and batching strategy evaluation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#328CC1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#328CC1]" />
                  </div>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Containerized inference deployment patterns under internal testing
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#328CC1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#328CC1]" />
                  </div>
                  <span className="text-sm text-[#555555] leading-relaxed">
                    Observability hooks for latency, throughput, and drift measurement
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Customization Stack Table Section */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-4 text-center">
              Customization Stack
            </h3>
            <p className="text-[#555555] text-base md:text-lg mb-8 text-center">
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

          {/* Customize Your Model Button */}
          <div className="mt-12 text-center">
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0B1F3B] text-white font-medium rounded-lg hover:bg-[#162B4D] transition-colors"
            >
              <span>Customize Your Model</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Value Realization */}
      <section id="value-realization" className="py-16 md:py-24 bg-[#fffdf7]">
        <div className="container-custom">
          {/* Two Column Layout: Left Text + Right Cards */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Column: Heading and CTA - Vertically Centered */}
            <div className="lg:w-1/2 lg:pr-8 mt-10">
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold text-[#0B1F3B] mb-4 leading-tight">
                We start from your current AI maturity and engineer toward deployable systems.
              </h2>
              <p className="text-base md:text-lg text-[#555555] leading-relaxed mb-10 mt-10">
                From use-case discovery through model development and deployment validation, our engineering teams remain directly engaged across the full lifecycle.
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3B] text-white font-medium rounded-lg hover:bg-[#162B4D] transition-colors"
              >
                <span>Request Assessment</span>
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
                   Find pain points that can be AI adopted in your business & help you build use case exclusively based on your organization type, business goals and data.
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
                    Build domain-customized models developed using your proprietary datasets through training workflows and structured fine-tuning aligned with defined business success metrics.
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
                   Model deployment architectures designed and implemented across managed cloud platforms (including hyperscalers), private infrastructure, and controlled on-prem environments based on performance, security, and operational constraints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Deployment - Premium Clean Design with Grid Background */}
      <section 
        id="deployment" 
        className="py-20 md:py-28 relative"
        style={{
          backgroundColor: '#efede5',
          backgroundImage: 'linear-gradient(to right, #e6e2d4 1px, transparent 1px), linear-gradient( #e6e2d4 1px, transparent 1px)',
          backgroundSize: '37px 37px'
        }}
      >
        <div className="container-custom relative z-10">
          {/* Section Heading with Premium Accent */}
          <div className="mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0B1F3B] leading-tight max-w-4xl">
              What self-deployment <br></br>capabilities are under development?
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#F4C430] to-[#D4A420] mt-6 rounded-full"></div>
          </div>

          {/* Premium Tabbed Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Clean Vertical Tab Navigation */}
            <div className="lg:w-[300px] flex-shrink-0">
              <div className="bg-[#fffdf7] backdrop-blur-sm rounded-2xl p-5 shadow-lg">
                <nav className="space-y-2">
                  {/* Tab 1: Deployment Tooling */}
                  <button 
                    onClick={() => setActiveDeploymentTab('deployment-tooling')}
                    data-testid="deployment-tab-tooling"
                    className={`w-full text-left px-5 py-4 flex items-center justify-between transition-all duration-300 rounded-xl ${
                      activeDeploymentTab === 'deployment-tooling' 
                        ? 'bg-[#fffdf7] text-[#0B1F3B] shadow-md border border-[#e8e6de]' 
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
                        ? 'bg-[#fffdf7] text-[#0B1F3B] shadow-md border border-[#e8e6de]' 
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
                        ? 'bg-[#fffdf7] text-[#0B1F3B] shadow-md border border-[#e8e6de]' 
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
                <div className="bg-[#fffdf7] rounded-2xl p-8 lg:p-10 shadow-lg border border-[#e8e6de]/30 min-h-[320px]" data-testid="deployment-content-tooling">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-6">
                    Self-Deployment Tooling
                  </h3>
                  
                  <p className="text-base md:text-lg text-[#555555] leading-[1.8]">
                    Deployment enablement tooling is under development to support controlled self-hosted and private infrastructure model deployments. This track focuses on packaging patterns, environment configuration templates, dependency controls, and reproducible deployment setup so that models can be installed and executed consistently across approved environments. These capabilities are in engineering development stages and are not yet available as packaged external releases.
                  </p>
                </div>
              )}

              {/* Serving Frameworks Content */}
              {activeDeploymentTab === 'serving-frameworks' && (
                <div className="bg-[#fffdf7] rounded-2xl p-8 lg:p-10 shadow-lg border border-[#e8e6de]/30 min-h-[320px]" data-testid="deployment-content-serving">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-6">
                    Serving Frameworks
                  </h3>
                  
                  <p className="text-base md:text-lg text-[#555555] leading-[1.8] mb-6">
                    Model serving frameworks are being engineered to control how models execute at runtime across inference environments. This work focuses on request handling behavior, batching strategies, concurrency controls, runtime parameter management, and inference observability so that model execution characteristics can be measured and tuned reliably. These frameworks remain in internal experiment and pilot stages and are not yet released as external serving stacks.
                  </p>
                  
                  {/* <div className="pt-5 border-t border-[#e8e6de]">
                    <span className="text-sm text-[#888888] font-medium">
                      Availability: Internal use and limited pilot programs.
                    </span>
                  </div> */}
                </div>
              )}

              {/* Infrastructure Tracks Content */}
              {activeDeploymentTab === 'infrastructure-tracks' && (
                <div className="bg-[#fffdf7] rounded-2xl p-8 lg:p-10 shadow-lg border border-[#e8e6de]/30 min-h-[320px]" data-testid="deployment-content-infrastructure">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-6">
                    Infrastructure Tracks
                  </h3>
                  
                  <p className="text-base md:text-lg text-[#555555] leading-[1.8]">
                    Infrastructure engineering tracks study how AI training and inference systems are provisioned and operated across compute environments. Current work includes GPU workload profiling, compute topology patterns, storage and data pipeline behavior, and system-level observability baselines required for stable AI system operation. These tracks are part of internal engineering programs and are not yet external infrastructure offerings.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Talk to Us Button */}
          <div className="mt-12 text-center">
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0B1F3B] text-white font-medium rounded-lg hover:bg-[#162B4D] transition-colors"
            >
              <span>Talk to Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      {/* Final CTA Strip */}
      <section className="py-16 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white">
            Research & Publications
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
