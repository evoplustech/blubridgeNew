import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Radio, ShieldCheck, GraduationCap, Code2, Factory, Landmark, HeartPulse,
  Scale, ShoppingCart, Home as HomeIcon
} from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';

/* ==================== HERO — BESPOKE PIPELINE DIAGRAM ==================== */
const PipelineDiagram = () => {
  return (
    <div className="relative w-full aspect-[5/6] max-w-[560px] mx-auto" data-testid="hero-pipeline-visual">
      <svg viewBox="0 0 500 600" className="w-full h-full" aria-hidden="true">
        {/* Coordinate grid */}
        <defs>
          <pattern id="bbgrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#d4d8e8" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="bbFade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#f0f1f9" stopOpacity="1" />
            <stop offset="0.5" stopColor="#f0f1f9" stopOpacity="0" />
            <stop offset="1" stopColor="#f0f1f9" stopOpacity="1" />
          </linearGradient>
        </defs>

        <rect width="500" height="600" fill="url(#bbgrid)" opacity="0.55" />
        <rect width="500" height="600" fill="url(#bbFade)" />

        {/* Vertical spine */}
        <line x1="250" y1="70" x2="250" y2="540" stroke="#b8bfd6" strokeWidth="1" className="bb-line-draw" style={{ animationDelay: '400ms' }} />

        {/* Nodes */}
        {[
          { y: 110, label: 'DATA' },
          { y: 200, label: 'TOKENIZER' },
          { y: 290, label: 'PRE-TRAINING' },
          { y: 380, label: 'POST-TRAINING' },
          { y: 470, label: 'INFERENCE' },
        ].map((node, i) => (
          <g key={node.label} style={{ animation: `bbFadeIn 500ms ease ${600 + i * 180}ms forwards`, opacity: 0 }}>
            {/* Left extension */}
            <line x1="90" y1={node.y} x2="240" y2={node.y} stroke="#b8bfd6" strokeWidth="0.8" />
            {/* Right extension */}
            <line x1="260" y1={node.y} x2="410" y2={node.y} stroke="#b8bfd6" strokeWidth="0.8" />
            {/* Central node */}
            <circle cx="250" cy={node.y} r="6" fill="#f0f1f9" stroke="#0a1230" strokeWidth="1.4" className="bb-pulse-node" style={{ animationDelay: `${i * 400}ms` }} />
            {/* Right label */}
            <text x="290" y={node.y + 3} fontFamily="IBM Plex Mono" fontSize="10" fill="#0a1230" letterSpacing="1.5">{node.label}</text>
            {/* Tick marks */}
            <line x1="248" y1={node.y - 2} x2="252" y2={node.y - 2} stroke="#0a1230" strokeWidth="0.8" />
            <line x1="248" y1={node.y + 2} x2="252" y2={node.y + 2} stroke="#0a1230" strokeWidth="0.8" />
          </g>
        ))}

        {/* Animated data flow lines (side branches) */}
        <path d="M 90 110 Q 40 200 90 290" fill="none" stroke="#2b4c8c" strokeWidth="0.8" opacity="0.55" className="bb-flow-line" />
        <path d="M 410 200 Q 460 290 410 380" fill="none" stroke="#2b4c8c" strokeWidth="0.8" opacity="0.55" className="bb-flow-line" />
        <path d="M 90 380 Q 40 460 90 470" fill="none" stroke="#2b4c8c" strokeWidth="0.8" opacity="0.55" className="bb-flow-line" />

        {/* Corner brackets — small, offset to avoid label collision */}
        <path d="M 12 22 L 12 12 L 22 12" fill="none" stroke="#0a1230" strokeWidth="1" />
        <path d="M 488 22 L 488 12 L 478 12" fill="none" stroke="#0a1230" strokeWidth="1" />
        <path d="M 12 578 L 12 588 L 22 588" fill="none" stroke="#0a1230" strokeWidth="1" />
        <path d="M 488 578 L 488 588 L 478 588" fill="none" stroke="#0a1230" strokeWidth="1" />
      </svg>
    </div>
  );
};

/* ==================== EXPERTISE — INDUSTRY SPOTLIGHT ==================== */
const industries = [
  { Icon: Radio,          title: 'Telco' },
  { Icon: ShieldCheck,    title: 'Finance & Insurance' },
  { Icon: GraduationCap,  title: 'Education' },
  { Icon: Scale,          title: 'Legal' },
  { Icon: Code2,          title: 'Software & Technology' },
  { Icon: Factory,        title: 'Manufacturing' },
  { Icon: Landmark,       title: 'Government' },
  { Icon: HeartPulse,     title: 'Healthcare' },
  { Icon: ShoppingCart,   title: 'Oil & Gas' },
  { Icon: HomeIcon,       title: 'Construction & Infra' },
];

const ExpertiseSection = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);

  return (
    <section className="relative pt-24 pb-24 overflow-hidden" style={{ background: '#e8eaf3' }} data-testid="expertise-section">
      <div className="bb-container">
        {/* Masthead */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <h2 className="bb-h2 capitalize" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
            Our Frontier AI Expertise
          </h2>
          <div className="flex flex-col md:items-end gap-1">
            <span
              className="inline-flex items-center gap-3"
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 'clamp(15px, 1.15vw, 18px)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#0a1230',
                fontWeight: 500,
              }}
            >
              <span style={{ width: '36px', height: '2px', background: '#0a1230', display: 'inline-block' }} />
              By Industry
            </span>
          </div>
        </div>

        {/* ------ COMPRESSED FOCAL LIST ------
            Every industry lives in the same vertical stack. The active
            row swells into a display-scale title and reveals a small
            "Frontier AI Focus" eyebrow with an inline icon glyph. All
            other rows collapse to a compact single-line label. There is
            no split, no side-panel, no separate hero. */}
        <div
          className="relative"
          role="tablist"
          data-testid="industry-focal-list"
          style={{ borderTop: '1px solid #d4d8e8' }}
        >
          {industries.map((ind, i) => {
            const active = activeIndustry === i;
            return (
              <button
                key={ind.title}
                onClick={() => setActiveIndustry(i)}
                onMouseEnter={() => setActiveIndustry(i)}
                data-testid={`industry-item-${ind.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                role="tab"
                aria-selected={active}
                className="w-full text-left block transition-colors group"
                style={{
                  borderBottom: '1px solid #d4d8e8',
                  padding: active ? 'clamp(28px, 4vw, 56px) 0' : '18px 0',
                  cursor: 'pointer',
                  background: 'transparent',
                }}
              >
                {active && (
                  <div className="mb-4" style={{ animation: 'bbFadeIn 300ms ease forwards' }} />
                )}
                <span
                  data-testid={active ? 'industry-spotlight-title' : undefined}
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    fontWeight: 500,
                    letterSpacing: active ? '-0.05em' : '-0.02em',
                    lineHeight: 1,
                    color: active ? '#0a1230' : '#7c86a2',
                    fontSize: active ? 'clamp(46px, 7.4vw, 116px)' : 'clamp(15px, 1.15vw, 17px)',
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'clip',
                    transition: 'color 200ms ease, letter-spacing 250ms ease',
                  }}
                >
                  {ind.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ==================== CAPABILITIES — ACCORDION ==================== */
const capabilities = [
  {
    title: 'Smart Agents',
    heading: 'Automate tasks with AI agents connected to your apps and workflows.',
    description: 'Build intelligent workflows with AI agents that connect directly to your tools, platforms, and data. We design adaptive systems that work within your existing ecosystem, automating complex tasks while understanding your operational context to drive real, scalable impact.'
  },
  {
    title: 'AI Driven Search',
    heading: 'Deep research capabilities powered by advanced language models.',
    description: 'Safely link your organization’s proprietary knowledge into one intelligent layer and surface insights you can trust. Our AI agents retrieve the most accurate, context-aware answers, ensuring every response is relevant, reliable, and aligned with your enterprise data.'
  },
  {
    title: 'In-Depth Research',
    heading: 'Build and deploy purpose-built AI models for your specific needs.',
    description: 'Access insights that are thoroughly researched and distilled from rich, wide-ranging sources. Our AI agents synthesize complex information into clear, actionable summaries, giving you depth, accuracy, and clarity in every result.'
  },
  {
    title: 'Developer APIs',
    heading: 'Build and deploy purpose-built AI models for your specific needs.',
    description: 'Create intelligent applications and products on top of our foundation models. Embed advanced reasoning, generation, and automation into your workflows. Move from concept to production with models engineered for reliability, performance, and real-world impact across enterprise and developer ecosystems.'
  },
  {
    title: 'Custom AI Deployments',
    heading: 'Build and deploy purpose-built AI models for your specific needs.',
    description: 'Shape a truly personalized AI experience through tailored integrations with your enterprise data, platforms, and custom model capabilities, ensuring every system aligns precisely with your operational needs and business objectives.'
  }
];

const CapabilitiesAccordion = () => {
  const [activeCap, setActiveCap] = useState(0);
  const cap = capabilities[activeCap];

  return (
    <section style={{ background: '#f0f1f9', paddingTop: '112px', paddingBottom: '128px' }} data-testid="capabilities-index">
      <div className="bb-container">
        <h2
          data-testid="capabilities-heading"
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            fontWeight: 500,
            color: '#0a1230',
            margin: 0,
            maxWidth: '780px',
          }}
        >
          What we can do for you
        </h2>

        {/* Inline contents line — flowing selector of capability titles */}
        <div
          className="flex flex-wrap items-baseline"
          role="tablist"
          data-testid="capabilities-selector"
          style={{ marginTop: '56px', columnGap: 'clamp(28px, 4vw, 64px)', rowGap: '14px' }}
        >
          {capabilities.map((c, i) => {
            const active = activeCap === i;
            return (
              <button
                key={c.title}
                role="tab"
                aria-selected={active}
                data-testid={`capability-toggle-${i}`}
                onClick={() => setActiveCap(i)}
                style={{
                  fontFamily: 'Geist, sans-serif',
                  fontSize: 'clamp(17px, 1.6vw, 21px)',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: active ? '#0a1230' : '#7c86a2',
                  background: 'transparent',
                  padding: '6px 0',
                  borderBottom: active ? '1px solid #0a1230' : '1px solid transparent',
                  transition: 'color 200ms ease, border-color 200ms ease',
                  cursor: 'pointer',
                }}
              >
                {c.title}
              </button>
            );
          })}
        </div>

        {/* Reading stage — indented editorial passage for the active capability */}
        <div
          key={activeCap}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-8"
          data-testid="capability-stage"
          style={{ marginTop: 'clamp(48px, 6vw, 88px)', animation: 'bbFadeIn 350ms ease forwards' }}
        >
          <div className="lg:col-span-9 lg:col-start-4">
            <h3
              data-testid="capability-active-heading"
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: 'clamp(26px, 3.4vw, 46px)',
                fontWeight: 500,
                letterSpacing: '-0.025em',
                lineHeight: 1.12,
                color: '#0a1230',
                margin: 0,
                maxWidth: '760px',
              }}
            >
              {cap.heading}
            </h3>
          </div>
          <div className="lg:col-span-7 lg:col-start-5">
            <p
              data-testid="capability-active-description"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16.5px',
                lineHeight: 1.8,
                color: '#2a3352',
                margin: 0,
                maxWidth: '640px',
              }}
            >
              {cap.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==================== HOME PAGE ==================== */
const Home = () => {
  const [activeInfraTab, setActiveInfraTab] = useState(0);

  const infraTabs = [
    { name: "Data",                     title: "Data",                     description: "We help you design & build custom datasets for your bespoke requirement.", features: ["Efficient Data Pipeline", "Multimodal & Multilinguistic Dataset", "Synthetic data generation", "Domain Specific Dataset curation"], link: '/research' },
    { name: "Pre-training",             title: "Pre-training",             description: "We are building a series of pre-trained models uniquely suited for different work loads.", features: ["Natural Language Processing", "Speech Recognition & Generation", "Sequence Models & Visual Models", "Recommender Systems"], link: '/research' },
    { name: "Mid-training",             title: "Mid-training",             description: "A custom mid-training for domain specific requirement.", features: ["Curriculum-based refinement", "Domain-specific mid-training", "Stability and bias control", "Performance shaping"], link: '/research' },
    { name: "Post-training",            title: "Post-training",            description: "Enhanced model readiness through targeted refinement, evaluation, and optimization for real-world performance.", features: ["Fine-tuning for accuracy", "Safety and quality checks", "Inference optimization", "Production readiness"], link: '/research' },
    { name: "Agent Build",              title: "Agent Build",              description: "Design intelligent agents that reason, act, and adapt across real workflows, turning models into autonomous systems.", features: ["Task-aware agent design", "Tool and API integration", "Multi-step reasoning flows", "Production-grade orchestration"], link: '/research' },
    { name: "Inference Optimization",   title: "Inference Optimization",   description: "Optimizing models for fast, reliable, and cost-efficient execution in real-world environments.", features: ["Low-latency execution", "Memory-efficient serving", "Hardware-level tuning", "Scalable inference pipelines"], link: '/research' },
    { name: "Infrastructure Scaling",   title: "Infrastructure Scaling",   description: "Expanding AI systems seamlessly, ensuring performance is remaining consistent as demand and complexity grow.", features: ["Elastic compute expansion", "High-throughput orchestration", "Load-aware resource scaling", "Production-grade resilience"], link: '/research' }
  ];

  const services = [
    {
      title: 'Model Customization',
      link: '/solutions#model-customization',
      body: 'Research-driven model adaptation using domain data, structured training workflows, and controlled specialization methods. We focus on reproducible training pipelines, evaluation rigor, and system-level correctness.',
      testid: 'solution-model-customization'
    },
    {
      title: 'Value Realization',
      link: '/solutions#value-realization',
      body: 'From use-case validation to engineering prototypes, we help translate AI experimentation into measurable technical outcomes and deployment-ready system designs.',
      testid: 'solution-value-realization'
    },
    {
      title: 'Deployment',
      link: '/solutions#deployment',
      body: 'Engineering-led deployment architectures across cloud, private, and controlled infrastructure environments, with focus on reliability, performance, and operational constraints.',
      testid: 'solution-deployment'
    }
  ];

  useDocumentTitle('Frontier AI Research and Enterprise Solutions | Blubridge');
  useMetaDescription('Blubridge is an independent AI research lab engineering deep learning systems from first principles and delivering enterprise-grade AI models, infrastructure, and deployment solutions.');

  return (
    <div style={{ background: '#f0f1f9' }} className="min-h-screen text-bb-ink" data-testid="home-page">

      {/* ============================================================
          SECTION 1 — HERO (#f0f1f9)
          ============================================================ */}
      <section className="relative overflow-hidden" data-testid="hero-section" style={{ paddingTop: '48px', paddingBottom: '96px', background: '#f0f1f9' }}>
        {/* Faint diagonal grid backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(10,18,48,0.04) 1px, transparent 1px), linear-gradient(rgba(10,18,48,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
          }}
        />

        <div className="bb-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-16 lg:pt-20 items-center">
            {/* LEFT — editorial copy (asymmetric 7 cols) */}
            <div className="lg:col-span-7 lg:pr-6 flex flex-col justify-center">
              <h1
                className="bb-display bb-reveal bb-reveal-2"
                style={{ fontSize: 'clamp(48px, 8vw, 118px)', lineHeight: 0.95 }}
                data-testid="hero-heading"
              >
                <span className="block">Beyond</span>
                <span className="block" style={{ color: 'var(--bb-ink-2)', fontWeight: 400 }}>the Horizon</span>
              </h1>

              <div className="mt-10 max-w-[520px] bb-reveal bb-reveal-3">
                <p
                  data-testid="hero-subtitle"
                  className="text-[19px] leading-[1.6] text-bb-ink"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Frontier AI Research Lab
                </p>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-4 bb-reveal bb-reveal-4">
                <Link to="/research" className="bb-btn-primary" data-testid="hero-research-cta">
                  Explore Research <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
                </Link>
                <Link to="/contact" className="bb-btn-ghost" data-testid="hero-contact-cta">
                  Talk to us
                </Link>
              </div>
            </div>

            {/* RIGHT — bespoke pipeline diagram (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center bb-reveal bb-reveal-3">
              <PipelineDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — OUR FRONTIER AI EXPERTISE (#e8eaf3)
          ============================================================ */}
      <ExpertiseSection />

      {/* ============================================================
          SECTION 3 — BY SERVICES  (warm #f5f3e9)
          Editorial vertical stack: narrow title / wider prose per row,
          hairline separators, closing action at the right.
          ============================================================ */}
      <section style={{ background: '#f0f1f9', paddingTop: '112px', paddingBottom: '128px' }} data-testid="services-section">
        <div className="bb-container">
          <p className="bb-eyebrow" style={{ color: '#0a1230' }}>By Services</p>

          <div className="mt-14" style={{ borderTop: '1px solid #d4d8e8' }}>
            {services.map((s, i) => (
              <div
                key={s.title}
                data-testid={s.testid}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-14"
                style={{ borderBottom: '1px solid #d4d8e8' }}
              >
                <div className="lg:col-span-4">
                  <h3
                    style={{
                      fontFamily: 'Geist, sans-serif',
                      fontSize: 'clamp(28px, 3.2vw, 44px)',
                      fontWeight: 500,
                      letterSpacing: '-0.025em',
                      lineHeight: 1.05,
                      color: '#0a1230',
                      margin: 0,
                      maxWidth: '320px',
                    }}
                  >
                    {s.title}
                  </h3>
                </div>
                <div className="lg:col-span-8">
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      lineHeight: 1.75,
                      color: '#2a3352',
                      margin: 0,
                      maxWidth: '640px',
                    }}
                  >
                    {s.body}
                  </p>
                  <div className="mt-8">
                    <Link
                      to={s.link}
                      data-testid={`${s.testid}-learn-more`}
                      className="inline-flex items-center gap-2 group"
                      style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '11.5px',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#0a1230',
                        borderBottom: '1px solid #0a1230',
                        paddingBottom: '3px',
                        textDecoration: 'none',
                      }}
                    >
                      Learn More
                      <span
                        aria-hidden
                        style={{ transition: 'transform 200ms ease' }}
                        className="inline-block group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-end">
            <Link
              to="/contact"
              data-testid="support-talk-to-us-btn"
              className="inline-flex items-center gap-3 group"
              style={{
                background: '#0a1230',
                color: '#ffffff',
                fontFamily: 'Geist, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                padding: '14px 28px',
                borderRadius: '999px',
                textDecoration: 'none',
              }}
            >
              Talk To Us
              <span aria-hidden style={{ fontFamily: 'IBM Plex Mono', transition: 'transform 200ms ease' }} className="inline-block group-hover:translate-x-1">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — INFRASTRUCTURE  (warm #f5f3e9)
          Big title (col 1-7) with tab index on the right (col 8-12).
          Below, full-width content: description spanning wide, features
          arranged as a 2-column typographic matrix.
          ============================================================ */}
      <section style={{ background: '#e8eaf3', paddingTop: '112px', paddingBottom: '128px' }} data-testid="infrastructure-section">
        <div className="bb-container">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <h2
                style={{
                  fontFamily: 'Geist, sans-serif',
                  fontSize: 'clamp(34px, 4.4vw, 60px)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.03em',
                  fontWeight: 500,
                  color: '#0a1230',
                  margin: 0,
                  maxWidth: '760px',
                }}
              >
                BluBridge Infrastructure for custom AI deployment Solutions
              </h2>
            </div>
            <div className="lg:col-span-5">
              <div
                className="flex flex-col"
                role="tablist"
                style={{ borderTop: '1px solid #d4d8e8' }}
              >
                {infraTabs.map((tab, index) => {
                  const active = activeInfraTab === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveInfraTab(index)}
                      data-testid={`infra-tab-${tab.name.toLowerCase().replace(/\s+/g, '-')}`}
                      role="tab"
                      aria-selected={active}
                      className="flex items-center justify-between gap-4 py-3 transition-colors text-left"
                      style={{
                        borderBottom: '1px solid #d4d8e8',
                        fontFamily: 'Geist, sans-serif',
                        fontSize: '14.5px',
                        color: active ? '#0a1230' : '#7c86a2',
                        fontWeight: active ? 500 : 400,
                      }}
                    >
                      <span>{tab.name}</span>
                      <span
                        aria-hidden
                        style={{
                          fontFamily: 'IBM Plex Mono, monospace',
                          fontSize: '13px',
                          color: active ? '#0a1230' : 'transparent',
                          transition: 'color 200ms ease',
                        }}
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active tab content — full-width composition */}
          <div className="mt-20" data-testid="infra-content-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-baseline">
              <div className="lg:col-span-4">
                <h3
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    fontSize: 'clamp(32px, 3.8vw, 52px)',
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    color: '#0a1230',
                    margin: 0,
                  }}
                >
                  {infraTabs[activeInfraTab].title}
                </h3>
              </div>
              <div className="lg:col-span-8">
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16.5px',
                    lineHeight: 1.75,
                    color: '#2a3352',
                    margin: 0,
                    maxWidth: '680px',
                  }}
                >
                  {infraTabs[activeInfraTab].description}
                </p>
              </div>
            </div>

            {/* Features matrix — 2-column typographic list */}
            <div
              className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-x-16"
              style={{ borderTop: '1px solid #d4d8e8', paddingTop: '24px' }}
            >
              {infraTabs[activeInfraTab].features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-baseline gap-5 py-4"
                  style={{ borderBottom: i < infraTabs[activeInfraTab].features.length - 1 && i !== 0 ? 'none' : 'none' }}
                >
                  <span
                    aria-hidden
                    style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: '#7c86a2', letterSpacing: '0.14em' }}
                  >
                    ——
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15.5px',
                      lineHeight: 1.55,
                      color: '#0a1230',
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5 — WHAT WE CAN DO FOR YOU (#f0f1f9)
          ============================================================ */}
      <CapabilitiesAccordion />

      {/* ============================================================
          SECTION 6 — WORK WITH BLUBRIDGE  (warm #f5f3e9)
          Full-width photograph on top, then 3-part text row below:
          title (col 1-4) / description (col 5-9) / action (col 10-12).
          No card frame, no shadow, no cropping.
          ============================================================ */}
      <section style={{ background: '#e8eaf3', paddingTop: '112px', paddingBottom: '128px' }} data-testid="work-with-blubridge">
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-center">
            <div className="lg:col-span-5">
              <h2
                style={{
                  fontFamily: 'Geist, sans-serif',
                  fontSize: 'clamp(34px, 4.6vw, 60px)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  fontWeight: 500,
                  color: '#0a1230',
                  margin: 0,
                }}
              >
                Work with BluBridge
              </h2>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: '#2a3352',
                  margin: '32px 0 0',
                  maxWidth: '460px',
                }}
              >
                We are a small creative group driven by rigorous scientific thinking. Our work blends deep research with real-world execution, building AI models that are efficient, practical, and powerful, guided by both academic excellence and an agile, business-ready approach.
              </p>
              <div style={{ marginTop: '40px' }}>
                <Link
                  to="/careers"
                  data-testid="work-join-cta"
                  className="inline-flex items-center gap-3 group"
                  style={{
                    background: '#0a1230',
                    color: '#ffffff',
                    fontFamily: 'Geist, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '14px 28px',
                    borderRadius: '999px',
                    textDecoration: 'none',
                  }}
                >
                  Join us
                  <span aria-hidden style={{ fontFamily: 'IBM Plex Mono', transition: 'transform 200ms ease' }} className="inline-block group-hover:translate-x-1">↗</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div style={{ overflow: 'hidden', borderRadius: '2px' }}>
                <img
                  src="/images/blubridge-team-photo.png"
                  alt="BluBridge Team"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA — Know more about our Research
          ============================================================ */}
      <section className="py-24" style={{ background: '#0a1230' }} data-testid="final-cta">
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h2
                className="text-white"
                style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(40px, 6vw, 88px)', letterSpacing: '-0.03em', lineHeight: 0.98, fontWeight: 500 }}
              >
                Know more about our Research
              </h2>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                to="/research"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-bb-ink rounded-md text-[14px] font-medium hover:bg-bb-bg-subtle transition-colors"
                data-testid="final-cta-explore"
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

export default Home;
