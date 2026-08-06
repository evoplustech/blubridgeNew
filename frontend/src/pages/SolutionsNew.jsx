import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Database, Sparkles, Zap, TrendingUp, PenTool, Users, Check } from 'lucide-react';

const customizationCards = [
  {
    Icon: Database,
    title: 'Custom Pre-Training',
    intro: 'We are building and validating domain oriented pre-training and continued training pipelines using customized datasets and controlled training configurations. Current capability development includes:',
    items: [
      'Full pre-training workflows using curated domain data mixtures and custom training recipes',
      'Continued pre-training from open or internal checkpoints using domain corpora',
      'Tokenization and dataset strategy design for domain signal preservation',
      'Training evaluation and regression tracking frameworks',
    ],
  },
  {
    Icon: Sparkles,
    title: 'Specialized Model Capabilities',
    intro: 'Specialization workflows are in prototype and validation stages to adapt model behavior and task performance through structured fine-tuning and alignment methods. Current engineering directions include:',
    items: [
      'Supervised fine-tuning pipelines for task-specific adaptation',
      'Preference and behavior alignment methods under controlled evaluation',
      'Synthetic data generation for robustness and edge-case coverage',
      'Retrieval-grounded model workflows under prototype validation',
      'Prompt and tool orchestration layers for bounded enterprise tasks',
    ],
  },
  {
    Icon: Zap,
    title: 'Inference & Deployment Optimization',
    intro: 'Inference and deployment optimization capabilities are under development to support efficient and reliable model serving. Active workstreams include:',
    items: [
      'Inference profiling and performance characterization',
      'Quantization and efficiency experiments',
      'Runtime and batching strategy evaluation',
      'Containerized inference deployment patterns under internal testing',
      'Observability hooks for latency, throughput, and drift measurement',
    ],
  },
];

const stackRows = [
  ['Instruction Datasets', 'Training Pipelines', 'Distributed Training'],
  ['Domain Corpora', 'Experiment Manager', 'GPU Orchestration'],
  ['Prompt Templates', 'Hyperparameter Tuning', 'NVIDIA H100 / A100'],
  ['Alignment Packs', 'Model Versioning', 'High-Speed Storage'],
  ['Fine-Tuning Kits', 'Adapter Management', 'High-Speed Networking'],
];

const stackCols = ['DATA', 'PLATFORM', 'INFRASTRUCTURE & HARDWARE'];

const valueItems = [
  {
    Icon: TrendingUp,
    title: 'Proof of Value',
    body: 'Find pain points that can be AI adopted in your business & help you build use case exclusively based on your organization type, business goals and data.',
  },
  {
    Icon: PenTool,
    title: 'Custom Training',
    body: 'Build domain-customized models developed using your proprietary datasets through training workflows and structured fine-tuning aligned with defined business success metrics.',
  },
  {
    Icon: Users,
    title: 'Deployment Engineering',
    body: 'Model deployment architectures designed and implemented across managed cloud platforms (including hyperscalers), private infrastructure, and controlled on-prem environments based on performance, security, and operational constraints.',
  },
];

const deploymentTabs = [
  {
    id: 'deployment',
    label: 'Deployment Tooling',
    title: 'Self-Deployment Tooling',
    body: 'Deployment enablement tooling is under development to support controlled self-hosted and private infrastructure model deployments. This track focuses on packaging patterns, environment configuration templates, dependency controls, and reproducible deployment setup so that models can be installed and executed consistently across approved environments. These capabilities are in engineering development stages and are not yet available as packaged external releases.',
  },
  {
    id: 'serving',
    label: 'Serving Frameworks',
    title: 'Serving Frameworks',
    body: 'Model serving frameworks are being engineered to control how models execute at runtime across inference environments. This work focuses on request handling behavior, batching strategies, concurrency controls, runtime parameter management, and inference observability so that model execution characteristics can be measured and tuned reliably. These frameworks remain in internal experiment and pilot stages and are not yet released as external serving stacks.',
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure Tracks',
    title: 'Infrastructure Tracks',
    body: 'Infrastructure engineering tracks study how AI training and inference systems are provisioned and operated across compute environments. Current work includes GPU workload profiling, compute topology patterns, storage and data pipeline behavior, and system-level observability baselines required for stable AI system operation. These tracks are part of internal engineering programs and are not yet external infrastructure offerings.',
  },
];

const heroNodes = [
  { cx: 20, cy: 30, delay: '1300ms' },
  { cx: 520, cy: 30, delay: '1500ms' },
  { cx: 560, cy: 78, delay: '1650ms' },
  { cx: 900, cy: 78, delay: '1800ms' },
  { cx: 940, cy: 118, delay: '1950ms' },
  { cx: 1180, cy: 118, delay: '2100ms' },
];

export default function SolutionsNew() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const tab = deploymentTabs[activeTab];

  return (
    <div className="internal-site min-h-screen text-bb-ink" data-testid="solutions-page">

      {/* ===== HERO ===== */}
      <section className="sxh-section" data-testid="solutions-hero">
        <div className="sxh-bg" aria-hidden="true">
          <div className="sxh-bg-grid"></div>
          <div className="sxh-glow-left"></div>
          <div className="sxh-glow-right"></div>
        </div>
        <div className="bb-container sxh-inner">
          <div className="sxh-meta"><span className="sxh-meta-rule" aria-hidden="true"></span></div>
          <div className="sxh-grid">
            <div className="sxh-hmask">
              <h1 className="sxh-heading sxh-hinner">Engineering <span style={{ whiteSpace: 'nowrap' }}>AI-Native</span> Systems <span className="sxh-heading-soft">for Enterprise Frontiers</span></h1>
            </div>
            <div className="sxh-right">
              <span className="sxh-right-rule" aria-hidden="true"></span>
              <p className="sxh-para">Partnering with ambitious organizations from model development to production grade deployment through research-driven, system-level AI engineering.</p>
              <Link className="sxh-cta" data-testid="hero-talk-cta" to="/contact">Talk to our Experts <span aria-hidden="true" className="sxh-cta-arrow" style={{ fontFamily: '"IBM Plex Mono"' }}>↗</span></Link>
            </div>
          </div>
          <div className="sxh-visual" aria-hidden="true">
            <svg viewBox="0 0 1200 140" preserveAspectRatio="none" style={{ maxHeight: '120px' }}>
              <path d="M 20 30 H 520 L 560 78 H 900 L 940 118 H 1180" fill="none" stroke="#2b4c8c" strokeOpacity="0.3" strokeWidth="1.1" className="sxh-path"></path>
              <path d="M 20 62 H 360" fill="none" stroke="#2b4c8c" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="3 7" className="sxh-path" style={{ animationDelay: '1250ms' }}></path>
              {heroNodes.map((n, i) => (
                <g key={i} className="sxh-node" style={{ animationDelay: n.delay }}>
                  <circle cx={n.cx} cy={n.cy} r="7" fill="none" stroke="rgba(43,76,140,0.25)" strokeWidth="1"></circle>
                  <circle cx={n.cx} cy={n.cy} r="3" fill="#f1f2fa" stroke="#0a1230" strokeWidth="1.2"></circle>
                </g>
              ))}
              <circle r="3.2" fill="#2b4c8c" className="sxh-signal"></circle>
            </svg>
          </div>
        </div>
        <div className="sxh-end" aria-hidden="true"></div>
      </section>

      {/* ===== S1 — MODEL CUSTOMIZATION ===== */}
      <section id="model-customization" className="sxp-s1" ref={(el) => (sectionRefs.current[0] = el)}>
        <div className="sxp-s1-bg" aria-hidden="true"></div>
        <div className="bb-container relative">
          <div className="sxp-head">
            <div className="sxp-reveal sxp-d1">
              <h2 className="sxp-h2">Domain-Specialized Models, Engineered on Proprietary Data</h2>
            </div>
            <div className="sxp-head-right sxp-reveal sxp-d2">
              <span className="sxp-head-rule" aria-hidden="true"></span>
              <p className="sxp-lead">Adapt general-purpose foundation models into domain-aligned systems through research-driven training and controlled model engineering. Model customization capabilities are under active development across training, specialization, and inference optimization workflows. This track focuses on repeatable training discipline, evaluation rigor, and system-level correctness.</p>
            </div>
          </div>
          <div className="sxp-cards3">
            {customizationCards.map((card, i) => (
              <article key={card.title} className="sxp-card" data-testid={`customization-card-${i}`} style={{ '--i': i }}>
                <div className="sxp-card-top">
                  <span className="sxp-icon" aria-hidden="true"><card.Icon strokeWidth={1.5} /></span>
                </div>
                <h3 className="sxp-card-title">{card.title}</h3>
                <p className="sxp-card-intro">{card.intro}</p>
                <ul className="sxp-list">
                  {card.items.map((item) => (
                    <li key={item} className="sxp-list-item">
                      <span className="sxp-check" aria-hidden="true"><Check strokeWidth={2} /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="sxp-stack">
            <div className="sxp-stack-head sxp-reveal sxp-d2">
              <h3 className="sxp-h3">Customization Stack</h3>
              <p className="sxp-sub">Our comprehensive customization stack gives you full control from data to deployment, with flexibility at every layer</p>
            </div>
            <div className="sxp-table sxp-reveal sxp-d3">
              <div className="sxp-table-header">
                {stackCols.map((c) => (<div key={c}><span>{c}</span></div>))}
              </div>
              {stackRows.map((row, i) => (
                <div key={i} className="sxp-table-row" data-testid={`stack-row-${i}`}>
                  {row.map((cell) => (
                    <div key={cell} className="sxp-table-cell">
                      <span className="sxp-cell-dot" aria-hidden="true"></span>
                      <span className="sxp-cell-text">{cell}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="sxp-table-mobile sxp-reveal sxp-d3" aria-hidden="false">
              {stackCols.map((c, ci) => (
                <div key={c} className="sxp-mcol">
                  <div className="sxp-mcol-head"><span>{c}</span></div>
                  {stackRows.map((row) => (
                    <div key={row[ci]} className="sxp-mcol-item">
                      <span className="sxp-cell-dot" aria-hidden="true"></span>
                      <span className="sxp-cell-text">{row[ci]}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="sxp-foot sxp-reveal sxp-d3">
              <span className="sxp-foot-rule" aria-hidden="true"></span>
              <Link className="sxh-cta" data-testid="customize-model-cta" to="/contact">Customize Your Model <span aria-hidden="true" className="sxh-cta-arrow" style={{ fontFamily: '"IBM Plex Mono"' }}>↗</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== S2 — VALUE REALIZATION ===== */}
      <section id="value-realization" className="sxp-s2" ref={(el) => (sectionRefs.current[1] = el)}>
        <div className="sxp-s2-glow" aria-hidden="true"></div>
        <div className="bb-container">
          <div className="sxp-s2-grid">
            <div className="sxp-reveal sxp-d1">
              <h2 className="sxp-h2">We start from your current AI maturity and engineer toward deployable systems.</h2>
              <p className="text-bb-ink-2 text-[16px] leading-[1.75] mt-8" style={{ maxWidth: '48ch' }}>From use-case discovery through model development and deployment validation, our engineering teams remain directly engaged across the full lifecycle.</p>
              <div className="mt-10">
                <Link className="sxh-cta" data-testid="request-assessment-cta" to="/contact">Request Assessment <span aria-hidden="true" className="sxh-cta-arrow" style={{ fontFamily: '"IBM Plex Mono"' }}>↗</span></Link>
              </div>
            </div>
            <div className="sxp-vlist">
              {valueItems.map((v, i) => (
                <div key={v.title} className="sxp-vitem" data-testid={`value-card-${i}`} style={{ '--i': i }}>
                  <span className="sxp-vicon" aria-hidden="true"><v.Icon strokeWidth={1.5} /></span>
                  <div>
                    <div className="sxp-vhead"><h3 className="sxp-vtitle">{v.title}</h3></div>
                    <p className="sxp-vbody">{v.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== S3 — DEPLOYMENT ===== */}
      <section id="deployment" className="sxp-s3" ref={(el) => (sectionRefs.current[2] = el)}>
        <div className="sxp-s3-bg" aria-hidden="true"></div>
        <div className="bb-container relative">
          <div className="sxp-s3-head sxp-reveal sxp-d1">
            <h2 className="sxp-h2" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)' }}>What self-deployment capabilities are under development?</h2>
          </div>
          <div className="sxp-s3-grid">
            <div className="sxp-tabs sxp-reveal sxp-d2" role="group" aria-label="Deployment" style={{ '--active': activeTab }}>
              <span className="sxp-tabs-indicator" aria-hidden="true"></span>
              {deploymentTabs.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={activeTab === i}
                  data-testid={`deployment-tab-${t.id}`}
                  className={`sxp-tab ${activeTab === i ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(i)}
                >
                  <span className="sxp-tab-label">{t.label}</span>
                  <span className="sxp-tab-marker" aria-hidden="true"></span>
                </button>
              ))}
            </div>
            <div className="sxp-panel sxp-reveal sxp-d3" data-testid={`deployment-content-${tab.id}`}>
              <div className="sxp-panel-texture" aria-hidden="true"></div>
              <div key={tab.id} className="sxp-panel-body">
                <div className="sxp-panel-meta"><span className="sxp-panel-rule" aria-hidden="true"></span></div>
                <h3 className="sxp-panel-title">{tab.title}</h3>
                <p>{tab.body}</p>
              </div>
            </div>
          </div>
          <div className="sxp-foot sxp-reveal sxp-d3">
            <span className="sxp-foot-rule" aria-hidden="true"></span>
            <Link className="sxh-cta" data-testid="deployment-talk-cta" to="/contact">Talk to Us <span aria-hidden="true" className="sxh-cta-arrow" style={{ fontFamily: '"IBM Plex Mono"' }}>↗</span></Link>
          </div>
        </div>
      </section>

      {/* ===== S4 — RESEARCH CTA ===== */}
      <section className="sxp-s4" ref={(el) => (sectionRefs.current[3] = el)}>
        <div className="sxp-s4-bg" aria-hidden="true"></div>
        <div className="bb-container">
          <div className="sxp-s4-grid">
            <div>
              <h2 className="sxp-s4-h sxp-reveal sxp-d2">Research & Publications</h2>
            </div>
            <div className="sxp-s4-cta-wrap sxp-reveal sxp-d3">
              <Link data-testid="research-explore-cta" className="sxp-s4-cta" to="/research">Explore<span aria-hidden="true" className="sxp-s4-arrow" style={{ fontFamily: '"IBM Plex Mono"' }}>↗</span></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
