import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { ArrowRight } from 'lucide-react';

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
            
            <p className="text-lg md:text-xl text-[#555555] leading-relaxed max-w-3xl mx-auto">
              Partnering with technically ambitious enterprises — from model development to production-grade deployment — through research-driven, system-level AI engineering.
            </p>
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
        </div>
      </section>

      {/* Section: Value Realization */}
      <section id="value-realization" className="py-16 md:py-24 bg-[#fffdf7]">
        <div className="container-custom">
          {/* Section Heading */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold text-[#0B1F3B] mb-3 leading-tight max-w-4xl">
              We start from your current AI maturity and engineer toward deployable systems. 
            </h2>
            <p clasName="text-xl">From use-case discovery through model development and deployment validation, BluBridge engineering teams remain directly engaged across the full lifecycle.</p>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3B] mt-6 text-white font-medium rounded-lg hover:bg-[#162B4D] transition-colors"
            >
              <span>Talk to our experts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Three Column Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Proof of Value */}
            <div className="bg-[#f9f7f0] rounded-xl p-6 lg:p-8 border border-[#e8e6de]">
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-4">
                Proof of Value
              </h3>
              
              <p className="text-sm text-[#555555] leading-relaxed">
                We help define measurable success criteria for AI adoption and validate use cases through feasibility analysis, controlled prototypes, and evaluation against your data, system constraints, and technical objectives.
              </p>
            </div>

            {/* Card 2: Custom Training */}
            <div className="bg-[#f9f7f0] rounded-xl p-6 lg:p-8 border border-[#e8e6de]">
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-4">
                Custom Training
              </h3>
              
              <p className="text-sm text-[#555555] leading-relaxed">
                We help build domain-customized models using your proprietary data through structured fine-tuning and training workflows aligned with defined technical success criteria.
              </p>
            </div>

            {/* Card 3: Deployment Engineering */}
            <div className="bg-[#f9f7f0] rounded-xl p-6 lg:p-8 border border-[#e8e6de]">
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-4">
                Deployment Engineering
              </h3>
              
              <p className="text-sm text-[#555555] leading-relaxed">
                We help design and implement model deployment across managed cloud environments (including hyperscalers), private infrastructure, and controlled on-prem environments, with deployment patterns selected based on performance, security, and operational constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Deployment */}
      <section id="deployment" className="py-16 md:py-24 bg-[#efede5]">
        <div className="container-custom">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#0B1F3B] mb-12 leading-tight max-w-4xl">
            Deployment Tooling → Serving Frameworks Infrastructure Tracks
          </h2>

          {/* Tabbed Layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left: Vertical Tab Navigation */}
            <div className="lg:w-72 flex-shrink-0">
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveDeploymentTab('deployment-tooling')}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all rounded-lg ${
                    activeDeploymentTab === 'deployment-tooling' 
                      ? 'text-[#0B1F3B] font-semibold bg-[#fffdf7]' 
                      : 'text-[#888888] hover:text-[#0B1F3B] hover:bg-[#f5f3eb]'
                  }`}
                >
                  <span>Deployment Tooling</span>
                  {activeDeploymentTab === 'deployment-tooling' && (
                    <span className="text-[#F4C430] font-bold">→</span>
                  )}
                </button>
                <button 
                  onClick={() => setActiveDeploymentTab('serving-frameworks')}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all rounded-lg ${
                    activeDeploymentTab === 'serving-frameworks' 
                      ? 'text-[#0B1F3B] font-semibold bg-[#fffdf7]' 
                      : 'text-[#888888] hover:text-[#0B1F3B] hover:bg-[#f5f3eb]'
                  }`}
                >
                  <span>Serving Frameworks</span>
                  {activeDeploymentTab === 'serving-frameworks' && (
                    <span className="text-[#F4C430] font-bold">→</span>
                  )}
                </button>
                <button 
                  onClick={() => setActiveDeploymentTab('infrastructure-tracks')}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all rounded-lg ${
                    activeDeploymentTab === 'infrastructure-tracks' 
                      ? 'text-[#0B1F3B] font-semibold bg-[#fffdf7]' 
                      : 'text-[#888888] hover:text-[#0B1F3B] hover:bg-[#f5f3eb]'
                  }`}
                >
                  <span>Infrastructure Tracks</span>
                  {activeDeploymentTab === 'infrastructure-tracks' && (
                    <span className="text-[#F4C430] font-bold">→</span>
                  )}
                </button>
              </nav>
            </div>

            {/* Right: Tab Content */}
            <div className="flex-1">
              {/* Deployment Tooling Content */}
              {activeDeploymentTab === 'deployment-tooling' && (
                <div className="bg-[#fffdf7] rounded-xl p-8 lg:p-10 shadow-sm border border-[#e8e6de]">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-6">
                    Self-Deployment Capability — Under Active Development
                  </h3>
                  
                  <p className="text-base text-[#555555] leading-relaxed">
                    BluBridge is building internal deployment tooling and model serving workflows to support controlled self-hosted and private infrastructure model deployments. Current engineering efforts focus on deployment configuration patterns, runtime setup, performance profiling, and validation procedures so that model serving can be executed in reproducible and monitored environments. These self-deployment capabilities are presently in engineering and validation stages and are not yet available as packaged external releases.
                  </p>
                </div>
              )}

              {/* Serving Frameworks Content */}
              {activeDeploymentTab === 'serving-frameworks' && (
                <div className="bg-[#fffdf7] rounded-xl p-8 lg:p-10 shadow-sm border border-[#e8e6de]">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-6">
                    Serving Frameworks — In Development
                  </h3>
                  
                  <p className="text-base text-[#555555] leading-relaxed mb-6">
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
                <div className="bg-[#fffdf7] rounded-xl p-8 lg:p-10 shadow-sm border border-[#e8e6de]">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1F3B] mb-6">
                    Infrastructure Tracks — Under Engineering
                  </h3>
                  
                  <p className="text-base text-[#555555] leading-relaxed">
                    BluBridge is developing internal infrastructure tracks to study and standardize how AI model training and inference systems are provisioned, measured, and operated across controlled compute environments. Current work covers compute topology patterns, GPU workload profiling, storage and data pipeline behavior, and observability baselines required for reliable AI system operation. These infrastructure tracks are part of ongoing internal engineering programs and are not yet exposed as external infrastructure offerings.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsNew;
