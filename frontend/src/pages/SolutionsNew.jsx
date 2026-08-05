import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';
import { Database, Sparkles, Zap, Check, TrendingUp, PenTool, Users } from 'lucide-react';

/* ------------------------------------------------------------------
   SOLUTIONS — Editorial Redesign (light theme #f0f1f9)
   Content preserved verbatim from previous SolutionsNew.jsx:
   • Hero H1, paragraph, "Talk to our Experts" CTA
   • Section /01 Model Customization: heading, paragraph,
     three cards (Custom Pre-Training, Specialized Model Capabilities,
     Inference & Deployment Optimization) with all bullet items,
     "Customization Stack" table (DATA / PLATFORM / INFRASTRUCTURE
     with 5 rows), "Customize Your Model" CTA
   • Section /02 Value Realization: heading, paragraph,
     "Request Assessment" CTA, three cards (Proof of Value,
     Custom Training, Deployment Engineering)
   • Section /03 Deployment: heading, 3 tabs (Deployment Tooling,
     Serving Frameworks, Infrastructure Tracks) with paragraphs,
     "Talk to Us" CTA
   • Final CTA: "Research & Publications" + "Explore"
   ------------------------------------------------------------------ */

const customizationCards = [
  {
    icon: Database,
    title: 'Custom Pre-Training',
    intro: 'We are building and validating domain oriented pre-training and continued training pipelines using customized datasets and controlled training configurations. Current capability development includes:',
    bullets: [
      'Full pre-training workflows using curated domain data mixtures and custom training recipes',
      'Continued pre-training from open or internal checkpoints using domain corpora',
      'Tokenization and dataset strategy design for domain signal preservation',
      'Training evaluation and regression tracking frameworks',
    ],
  },
  {
    icon: Sparkles,
    title: 'Specialized Model Capabilities',
    intro: 'Specialization workflows are in prototype and validation stages to adapt model behavior and task performance through structured fine-tuning and alignment methods. Current engineering directions include:',
    bullets: [
      'Supervised fine-tuning pipelines for task-specific adaptation',
      'Preference and behavior alignment methods under controlled evaluation',
      'Synthetic data generation for robustness and edge-case coverage',
      'Retrieval-grounded model workflows under prototype validation',
      'Prompt and tool orchestration layers for bounded enterprise tasks',
    ],
  },
  {
    icon: Zap,
    title: 'Inference & Deployment Optimization',
    intro: 'Inference and deployment optimization capabilities are under development to support efficient and reliable model serving. Active workstreams include:',
    bullets: [
      'Inference profiling and performance characterization',
      'Quantization and efficiency experiments',
      'Runtime and batching strategy evaluation',
      'Containerized inference deployment patterns under internal testing',
      'Observability hooks for latency, throughput, and drift measurement',
    ],
  },
];

const stackRows = [
  ['Instruction Datasets', 'Training Pipelines',   'Distributed Training'],
  ['Domain Corpora',       'Experiment Manager',   'GPU Orchestration'],
  ['Prompt Templates',     'Hyperparameter Tuning','NVIDIA H100 / A100'],
  ['Alignment Packs',      'Model Versioning',     'High-Speed Storage'],
  ['Fine-Tuning Kits',     'Adapter Management',   'High-Speed Networking'],
];

const valueCards = [
  { icon: TrendingUp, title: 'Proof of Value',        body: 'Find pain points that can be AI adopted in your business & help you build use case exclusively based on your organization type, business goals and data.' },
  { icon: PenTool,    title: 'Custom Training',       body: 'Build domain-customized models developed using your proprietary datasets through training workflows and structured fine-tuning aligned with defined business success metrics.' },
  { icon: Users,      title: 'Deployment Engineering', body: 'Model deployment architectures designed and implemented across managed cloud platforms (including hyperscalers), private infrastructure, and controlled on-prem environments based on performance, security, and operational constraints.' },
];

const deploymentTabs = [
  {
    id: 'deployment-tooling',
    label: 'Deployment Tooling',
    heading: 'Self-Deployment Tooling',
    body: 'Deployment enablement tooling is under development to support controlled self-hosted and private infrastructure model deployments. This track focuses on packaging patterns, environment configuration templates, dependency controls, and reproducible deployment setup so that models can be installed and executed consistently across approved environments. These capabilities are in engineering development stages and are not yet available as packaged external releases.',
  },
  {
    id: 'serving-frameworks',
    label: 'Serving Frameworks',
    heading: 'Serving Frameworks',
    body: 'Model serving frameworks are being engineered to control how models execute at runtime across inference environments. This work focuses on request handling behavior, batching strategies, concurrency controls, runtime parameter management, and inference observability so that model execution characteristics can be measured and tuned reliably. These frameworks remain in internal experiment and pilot stages and are not yet released as external serving stacks.',
  },
  {
    id: 'infrastructure-tracks',
    label: 'Infrastructure Tracks',
    heading: 'Infrastructure Tracks',
    body: 'Infrastructure engineering tracks study how AI training and inference systems are provisioned and operated across compute environments. Current work includes GPU workload profiling, compute topology patterns, storage and data pipeline behavior, and system-level observability baselines required for stable AI system operation. These tracks are part of internal engineering programs and are not yet external infrastructure offerings.',
  },
];

const SolutionsNew = () => {
  useDocumentTitle('Applied AI Solutions - For your Use Case | Blubridge');
  useMetaDescription('Research-driven AI model customization and deployment engineering solutions for enterprise systems, from domain training to production-grade infrastructure.');
  const location = useLocation();
  const [activeDeploymentTab, setActiveDeploymentTab] = useState('deployment-tooling');

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 120;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const activeTab = deploymentTabs.find((t) => t.id === activeDeploymentTab) || deploymentTabs[0];

  return (
    <div style={{ background: '#f0f1f9' }} className="min-h-screen text-bb-ink" data-testid="solutions-page">

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="relative overflow-hidden" style={{ paddingTop: '48px', paddingBottom: '96px' }}>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(10,18,48,0.04) 1px, transparent 1px), linear-gradient(rgba(10,18,48,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
          }}
        />

        <div className="bb-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-10 lg:pt-12 items-center">
            <div className="lg:col-span-8">
              <h1 className="bb-display bb-reveal bb-reveal-1" style={{ fontSize: 'clamp(40px, 6vw, 92px)', lineHeight: 1.02 }}>
                <span className="block">Engineering</span>
                <span className="block">AI-Native Systems</span>
                <span className="block" style={{ color: 'var(--bb-ink-2)', fontWeight: 400, fontStyle: 'italic' }}>for Enterprise Frontiers</span>
              </h1>
            </div>
            <div className="lg:col-span-4 bb-reveal bb-reveal-2">
              <div className="pl-6 border-l border-bb-line-strong space-y-6">
                <p className="text-bb-ink text-[16px] leading-[1.75]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Partnering with ambitious organizations from model development to production grade deployment through research-driven, system-level AI engineering.
                </p>
                <Link to="/contact" className="bb-btn-primary" data-testid="hero-talk-cta">
                  Talk to our Experts <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Stepped node path */}
          <div className="mt-16 lg:mt-20 bb-reveal bb-reveal-3" aria-hidden>
            <svg viewBox="0 0 1200 130" className="w-full h-auto" fill="none">
              <path
                d="M 12 22 H 540 L 585 62 H 930 L 972 100 H 1195"
                stroke="#c9cde0"
                strokeWidth="1.2"
              />
              <line x1="30" y1="52" x2="380" y2="52" stroke="#dde0ec" strokeWidth="1" />
              {[
                { cx: 12,  cy: 22 },
                { cx: 540, cy: 22 },
                { cx: 585, cy: 62 },
                { cx: 930, cy: 62 },
                { cx: 972, cy: 100 },
                { cx: 1195, cy: 100 },
              ].map((n, i) => (
                <circle key={i} cx={n.cx} cy={n.cy} r="5" fill="#f0f1f9" stroke="#0a1230" strokeWidth="1.3" />
              ))}
              <circle cx="100" cy="22" r="3.5" fill="#2b4c8c" />
            </svg>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION /01 — MODEL CUSTOMIZATION
          ============================================================ */}
      <section id="model-customization" className="py-24" style={{ background: '#e8eaf3' }}>
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-6">
              <p className="bb-eyebrow mb-4">Model Customization</p>
              <h2 className="bb-h2" style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}>
                Domain-Specialized Models, Engineered on Proprietary Data
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pl-8">
              <p className="text-bb-ink-2 text-[16px] leading-[1.75]">
                Adapt general-purpose foundation models into domain-aligned systems through research-driven training and controlled model engineering. Model customization capabilities are under active development across training, specialization, and inference optimization workflows. This track focuses on repeatable training discipline, evaluation rigor, and system-level correctness.
              </p>
            </div>
          </div>

          {/* Method chapters — full-width editorial spread, no cards */}
          <div className="border-t border-bb-line">
            {customizationCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <article
                  key={i}
                  data-testid={`customization-card-${i}`}
                  className="group relative py-14 lg:py-16 border-b border-bb-line last:border-b-0 transition-colors hover:bg-white/40"
                  style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.35)' : 'transparent' }}
                >
                  <div className="grid grid-cols-12 gap-6 lg:gap-10">
                    {/* LEFT — Icon + Title */}
                    <div className="col-span-12 lg:col-span-5 lg:pr-6 lg:border-r lg:border-bb-line">
                      <div className="flex items-start gap-5">
                        <div className="pt-2">
                          <div
                            className="w-11 h-11 rounded-md flex items-center justify-center mb-5"
                            style={{ background: '#0a1230' }}
                          >
                            <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                          </div>
                          <h3
                            className="text-bb-ink"
                            style={{
                              fontFamily: 'Geist, sans-serif',
                              fontSize: 'clamp(22px, 2.6vw, 30px)',
                              fontWeight: 500,
                              letterSpacing: '-0.02em',
                              lineHeight: 1.15,
                            }}
                          >
                            {card.title}
                          </h3>
                          <span
                            aria-hidden
                            className="block mt-4 h-px bg-bb-ink transition-all duration-500 group-hover:w-16"
                            style={{ width: 28 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* RIGHT — Intro + method list */}
                    <div className="col-span-12 lg:col-span-7">
                      <p className="text-bb-ink text-[16px] lg:text-[17px] leading-[1.75] mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {card.intro}
                      </p>

                      <ul className="divide-y divide-bb-line border-t border-bb-line">
                        {card.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-4 py-3 group/item hover:pl-1 transition-all">
                            <span
                              className="block w-2 h-2 mt-[10px] flex-shrink-0 rounded-none rotate-45 border border-bb-ink group-hover/item:bg-bb-ink transition-colors"
                            />
                            <span className="text-bb-ink text-[14.5px] leading-[1.65] pt-[2px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Customization Stack table */}
          <div className="mt-20">
            <div className="mb-8 max-w-3xl">
              <h3 className="text-bb-ink mb-3" style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: 500, letterSpacing: '-0.02em' }}>
                Customization Stack
              </h3>
              <p className="text-bb-ink-2 text-[15px] leading-[1.7]">
                Our comprehensive customization stack gives you full control from data to deployment, with flexibility at every layer
              </p>
            </div>

            <div className="border border-bb-line rounded-md overflow-hidden bg-white">
              {/* Header */}
              <div className="grid grid-cols-3" style={{ background: '#0a1230' }}>
                {['DATA', 'PLATFORM', 'INFRASTRUCTURE & HARDWARE'].map((col, i) => (
                  <div key={i} className="px-6 py-4 border-r border-white/10 last:border-r-0">
                    <span className="text-white font-mono text-[11px] tracking-[0.18em]">{col}</span>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {stackRows.map((row, r) => (
                <div key={r} className="grid grid-cols-3 border-t border-bb-line" data-testid={`stack-row-${r}`}>
                  {row.map((cell, c) => (
                    <div key={c} className="px-6 py-4 flex items-center gap-3 border-r border-bb-line last:border-r-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-bb-accent flex-shrink-0" />
                      <span className="text-bb-ink text-[14px]">{cell}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Link to="/contact" className="bb-btn-primary" data-testid="customize-model-cta">
                Customize Your Model <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION /02 — VALUE REALIZATION
          ============================================================ */}
      <section id="value-realization" className="py-24" style={{ background: '#f0f1f9' }}>
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="bb-eyebrow mb-4">Value Realization</p>
              <h2 className="bb-h2" style={{ fontSize: 'clamp(28px, 3.8vw, 44px)' }}>
                We start from your current AI maturity and engineer toward deployable systems.
              </h2>
              <p className="text-bb-ink-2 text-[16px] leading-[1.75] mt-8">
                From use-case discovery through model development and deployment validation, our engineering teams remain directly engaged across the full lifecycle.
              </p>
              <div className="mt-10">
                <Link to="/contact" className="bb-btn-primary" data-testid="request-assessment-cta">
                  Request Assessment <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {valueCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div key={i} className="bb-panel p-6 flex items-start gap-5" data-testid={`value-card-${i}`}>
                    <div className="w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: '#0a1230' }}>
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3 className="text-bb-ink" style={{ fontFamily: 'Geist, sans-serif', fontSize: '18px', fontWeight: 500 }}>
                          {card.title}
                        </h3>
                      </div>
                      <p className="text-bb-ink-2 text-[14px] leading-[1.7]">{card.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION /03 — DEPLOYMENT
          ============================================================ */}
      <section id="deployment" className="py-24" style={{ background: '#e8eaf3' }}>
        <div className="bb-container">
          <div className="mb-14 max-w-4xl">
            <p className="bb-eyebrow mb-4">Deployment</p>
            <h2 className="bb-h2" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)' }}>
              What self-deployment capabilities are under development?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Tab list */}
            <div className="lg:col-span-4">
              <div className="border-t border-bb-line">
                {deploymentTabs.map((tab, i) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDeploymentTab(tab.id)}
                    data-testid={`deployment-tab-${tab.id.split('-')[0]}`}
                    className={`w-full text-left flex items-center justify-between gap-4 py-4 px-2 border-b border-bb-line transition-colors ${
                      activeDeploymentTab === tab.id ? 'bg-white' : 'hover:bg-white/60'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`text-[15px] ${activeDeploymentTab === tab.id ? 'text-bb-ink font-medium' : 'text-bb-ink-2'}`}
                        style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        {tab.label}
                      </span>
                    </span>
                    {activeDeploymentTab === tab.id && <span className="font-mono text-[11px] text-bb-accent">●</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-8">
              <div className="bb-panel p-8 lg:p-10 min-h-[320px]" data-testid={`deployment-content-${activeTab.id.split('-')[0]}`}>
                <h3
                  className="mb-6 text-bb-ink"
                  style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 500, letterSpacing: '-0.02em' }}
                >
                  {activeTab.heading}
                </h3>
                <p className="text-bb-ink-2 text-[16px] leading-[1.75]">{activeTab.body}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link to="/contact" className="bb-btn-primary" data-testid="deployment-talk-cta">
              Talk to Us <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA — Research & Publications
          ============================================================ */}
      <section className="py-24" style={{ background: '#0a1230' }}>
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h2
                className="text-white"
                style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(36px, 5.5vw, 84px)', letterSpacing: '-0.03em', lineHeight: 0.98, fontWeight: 500 }}
              >
                Research &amp; Publications
              </h2>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                to="/research"
                data-testid="research-explore-cta"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-bb-ink rounded-md text-[14px] font-medium hover:bg-bb-bg-subtle transition-colors"
              >
                Explore
                <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsNew;
