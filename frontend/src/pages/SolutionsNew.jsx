import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';


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
  { title: 'Proof of Value',        body: 'Find pain points that can be AI adopted in your business & help you build use case exclusively based on your organization type, business goals and data.' },
  { title: 'Custom Training',       body: 'Build domain-customized models developed using your proprietary datasets through training workflows and structured fine-tuning aligned with defined business success metrics.' },
  { title: 'Deployment Engineering', body: 'Model deployment architectures designed and implemented across managed cloud platforms (including hyperscalers), private infrastructure, and controlled on-prem environments based on performance, security, and operational constraints.' },
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
          SECTION 01 — MODEL CUSTOMIZATION
          Editorial reading intro → Vertical capability blocks →
          Open technical matrix (no table chrome)
          ============================================================ */}
      <section id="model-customization" style={{ background: '#f5f3e9', paddingTop: '128px', paddingBottom: '112px' }}>
        <div className="bb-container">

          {/* Editorial reading — narrow heading / wide reading column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="bb-eyebrow" style={{ color: '#0a1230' }}>Model Customization</p>
              <h2
                className="mt-6"
                style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(32px, 4.2vw, 60px)', lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 500, color: '#0a1230', maxWidth: '520px' }}
              >
                Domain-Specialized Models, Engineered on Proprietary Data
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-4">
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', lineHeight: 1.75, color: '#2a3352', maxWidth: '640px' }}>
                Adapt general-purpose foundation models into domain-aligned systems through research-driven training and controlled model engineering. Model customization capabilities are under active development across training, specialization, and inference optimization workflows. This track focuses on repeatable training discipline, evaluation rigor, and system-level correctness.
              </p>
            </div>
          </div>

          {/* Vertical capability blocks — no cards, hairline separators, staggered typography */}
          <div className="mt-28" style={{ borderTop: '1px solid #d8d5ca' }}>
            {customizationCards.map((card, i) => (
              <article
                key={i}
                data-testid={`customization-card-${i}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-16"
                style={i < customizationCards.length - 1 ? { borderBottom: '1px solid #d8d5ca' } : {}}
              >
                <div className="lg:col-span-4">
                  <h3
                    style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(24px, 2.6vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em', fontWeight: 500, color: '#0a1230', maxWidth: '320px' }}
                  >
                    {card.title}
                  </h3>
                </div>
                <div className="lg:col-span-8">
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', lineHeight: 1.75, color: '#2a3352', maxWidth: '680px' }}>
                    {card.intro}
                  </p>
                  <ul className="mt-8 space-y-4">
                    {card.bullets.map((b, j) => (
                      <li key={j} className="flex gap-5" style={{ maxWidth: '700px' }}>
                        <span aria-hidden style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', color: '#8a8471', paddingTop: '2px', flexShrink: 0 }}>—</span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.7, color: '#0a1230' }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {/* Open technical matrix — Customization Stack (no header bar, no stripes) */}
          <div className="mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline">
              <div className="lg:col-span-5">
                <h3 style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(26px, 2.8vw, 36px)', letterSpacing: '-0.025em', lineHeight: 1.05, fontWeight: 500, color: '#0a1230' }}>
                  Customization Stack
                </h3>
              </div>
              <div className="lg:col-span-7">
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', lineHeight: 1.75, color: '#2a3352', maxWidth: '600px' }}>
                  Our comprehensive customization stack gives you full control from data to deployment, with flexibility at every layer
                </p>
              </div>
            </div>

            <div
              className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12"
              style={{ borderTop: '1px solid #d8d5ca', paddingTop: '32px' }}
            >
              {['DATA', 'PLATFORM', 'INFRASTRUCTURE & HARDWARE'].map((col, ci) => (
                <div key={ci}>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', letterSpacing: '0.22em', color: '#8a8471' }}>{col}</span>
                  <ul className="mt-6 space-y-4">
                    {stackRows.map((row, ri) => (
                      <li
                        key={ri}
                        data-testid={ci === 0 ? `stack-row-${ri}` : undefined}
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', lineHeight: 1.5, color: '#0a1230' }}
                      >
                        {row[ci]}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <Link
                to="/contact"
                data-testid="customize-model-cta"
                className="inline-flex items-center gap-2.5 group"
                style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', fontWeight: 500, color: '#0a1230', borderBottom: '1px solid #0a1230', paddingBottom: '4px' }}
              >
                Customize Your Model
                <span aria-hidden style={{ fontFamily: 'IBM Plex Mono', transition: 'transform 200ms ease' }} className="inline-block group-hover:translate-x-1">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 02 — VALUE REALIZATION
          Process progression — asymmetric staggered stack, no icons
          ============================================================ */}
      <section id="value-realization" style={{ background: '#f5f3e9', paddingTop: '96px', paddingBottom: '128px' }}>
        <div className="bb-container">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <p className="bb-eyebrow" style={{ color: '#0a1230' }}>Value Realization</p>
              <h2
                className="mt-6"
                style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(32px, 4.6vw, 64px)', lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 500, color: '#0a1230', maxWidth: '820px' }}
              >
                We start from your current AI maturity and engineer toward deployable systems.
              </h2>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                to="/contact"
                data-testid="request-assessment-cta"
                className="inline-flex items-center gap-2.5 group"
                style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', fontWeight: 500, color: '#0a1230', borderBottom: '1px solid #0a1230', paddingBottom: '4px' }}
              >
                Request Assessment
                <span aria-hidden style={{ fontFamily: 'IBM Plex Mono', transition: 'transform 200ms ease' }} className="inline-block group-hover:translate-x-1">↗</span>
              </Link>
            </div>
          </div>

          <p
            className="mt-10"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', lineHeight: 1.7, color: '#2a3352', maxWidth: '640px' }}
          >
            From use-case discovery through model development and deployment validation, our engineering teams remain directly engaged across the full lifecycle.
          </p>

          {/* Staggered progression — each block indented deeper than the last */}
          <div className="mt-24" style={{ borderTop: '1px solid #d8d5ca', paddingTop: '56px' }}>
            <div className="space-y-20">
              {valueCards.map((card, i) => {
                const stagger = i === 0 ? '' : i === 1 ? 'lg:ml-[16%]' : 'lg:ml-[32%]';
                return (
                  <div
                    key={i}
                    data-testid={`value-card-${i}`}
                    className={stagger}
                    style={{ maxWidth: '640px' }}
                  >
                    <h3
                      style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(24px, 2.8vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em', fontWeight: 500, color: '#0a1230' }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="mt-5"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', lineHeight: 1.75, color: '#2a3352' }}
                    >
                      {card.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 03 — DEPLOYMENT
          Vertical left-nav tabs + reading pane (preserves tab interaction)
          ============================================================ */}
      <section id="deployment" style={{ background: '#f5f3e9', paddingTop: '112px', paddingBottom: '128px' }}>
        <div className="bb-container">
          <div className="max-w-4xl">
            <p className="bb-eyebrow" style={{ color: '#0a1230' }}>Deployment</p>
            <h2
              className="mt-6"
              style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 500, color: '#0a1230' }}
            >
              What self-deployment capabilities are under development?
            </h2>
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Vertical tab list */}
            <div className="lg:col-span-4" role="tablist">
              <div style={{ borderTop: '1px solid #d8d5ca' }}>
                {deploymentTabs.map((tab) => {
                  const active = activeDeploymentTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDeploymentTab(tab.id)}
                      data-testid={`deployment-tab-${tab.id.split('-')[0]}`}
                      role="tab"
                      aria-selected={active}
                      className="w-full text-left flex items-center gap-4 transition-colors"
                      style={{
                        borderBottom: '1px solid #d8d5ca',
                        paddingTop: '20px',
                        paddingBottom: '20px',
                        fontFamily: 'Geist, sans-serif',
                        fontSize: '17px',
                        letterSpacing: '-0.01em',
                        color: active ? '#0a1230' : '#6b6a5c',
                        fontWeight: active ? 500 : 400,
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          width: '9px',
                          height: '9px',
                          borderRadius: '999px',
                          background: active ? '#0a1230' : 'transparent',
                          border: active ? 'none' : '1px solid #b8b3a3',
                          display: 'inline-block',
                          flexShrink: 0,
                        }}
                      />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reading pane */}
            <div
              className="lg:col-span-8"
              data-testid={`deployment-content-${activeTab.id.split('-')[0]}`}
              role="tabpanel"
            >
              <h3
                style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(26px, 3.2vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.025em', fontWeight: 500, color: '#0a1230' }}
              >
                {activeTab.heading}
              </h3>
              <p
                className="mt-6"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', lineHeight: 1.8, color: '#2a3352', maxWidth: '680px' }}
              >
                {activeTab.body}
              </p>
              <div className="mt-12">
                <Link
                  to="/contact"
                  data-testid="deployment-talk-cta"
                  className="inline-flex items-center gap-2.5 group"
                  style={{ fontFamily: 'Geist, sans-serif', fontSize: '15px', fontWeight: 500, color: '#0a1230', borderBottom: '1px solid #0a1230', paddingBottom: '4px' }}
                >
                  Talk to Us
                  <span aria-hidden style={{ fontFamily: 'IBM Plex Mono', transition: 'transform 200ms ease' }} className="inline-block group-hover:translate-x-1">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 04 — CLOSING TRANSITION
          Oversized restrained typography, no dark block, no decorative art
          ============================================================ */}
      <section style={{ background: '#f5f3e9', paddingTop: '96px', paddingBottom: '160px', borderTop: '1px solid #d8d5ca' }}>
        <div className="bb-container">
          <h2
            style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(46px, 9vw, 148px)', lineHeight: 0.94, letterSpacing: '-0.045em', fontWeight: 500, color: '#0a1230' }}
          >
            Research &amp; Publications
          </h2>
          <div className="mt-12">
            <Link
              to="/research"
              data-testid="research-explore-cta"
              className="inline-flex items-center gap-3 group"
              style={{ fontFamily: 'Geist, sans-serif', fontSize: '18px', fontWeight: 500, color: '#0a1230', borderBottom: '1px solid #0a1230', paddingBottom: '6px' }}
            >
              Explore
              <span aria-hidden style={{ fontFamily: 'IBM Plex Mono', transition: 'transform 200ms ease' }} className="inline-block group-hover:translate-x-1">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsNew;
