import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Radio, ShieldCheck, GraduationCap, Code2, Factory, Landmark, HeartPulse,
  Scale, ShoppingCart, Home as HomeIcon, Plus, Minus
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
  const Active = industries[activeIndustry].Icon;

  return (
    <section className="relative pt-24 pb-24 overflow-hidden" style={{ background: '#e8eaf3' }} data-testid="expertise-section">
      <div className="bb-container">
        {/* Masthead */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <h2 className="bb-h2 capitalize" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
            Our Frontier AI Expertise
          </h2>
          <div className="flex flex-col md:items-end gap-1">
            <span className="bb-caption inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bb-accent animate-pulse" />
              In Progress...
            </span>
            <span className="bb-caption">By Industry</span>
          </div>
        </div>

        {/* ------ HERO DISPLAY ------
            Small "Frontier AI Focus" eyebrow with icon-as-glyph, followed by
            a monster editorial display of the active industry. No cards. */}
        <div
          className="relative pt-10 pb-8"
          style={{ borderTop: '1px solid #a8b0c8' }}
          data-testid="industry-spotlight"
        >
          <div className="flex items-center gap-4 mb-8">
            <span
              key={`icon-${activeIndustry}`}
              aria-hidden
              className="inline-flex"
              style={{ animation: 'bbFadeIn 400ms ease forwards', color: '#0a1230' }}
            >
              <Active style={{ width: '20px', height: '20px' }} strokeWidth={1.5} />
            </span>
            <p className="bb-caption" style={{ margin: 0 }}>Frontier AI Focus</p>
          </div>

          <h3
            key={`title-${activeIndustry}`}
            data-testid="industry-spotlight-title"
            className="text-bb-ink"
            style={{
              fontFamily: 'Geist, sans-serif',
              fontSize: 'clamp(40px, 7vw, 110px)',
              fontWeight: 500,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              animation: 'bbFadeIn 450ms ease forwards',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'clip',
              margin: 0,
            }}
          >
            {industries[activeIndustry].title}
          </h3>
        </div>

        {/* ------ INDEX RAIL ------
            Full-width horizontal wrapping list of every industry with a
            leading arrow revealed only on the active item. Underline the active
            label. Hover / click to switch. */}
        <div
          className="mt-10 flex flex-wrap items-baseline"
          role="tablist"
          style={{ borderTop: '1px solid #d3d7e6', paddingTop: '18px', columnGap: '22px', rowGap: '6px' }}
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
                className="inline-flex items-baseline gap-2 py-2 transition-colors whitespace-nowrap"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14.5px',
                  lineHeight: 1.2,
                  color: active ? '#0a1230' : '#5f6a89',
                  fontWeight: active ? 500 : 400,
                  borderBottom: active ? '2px solid #0a1230' : '2px solid transparent',
                  cursor: 'pointer',
                  background: 'transparent',
                  padding: '6px 0',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '13px',
                    color: '#0a1230',
                    width: active ? '14px' : '0px',
                    overflow: 'hidden',
                    display: 'inline-block',
                    transition: 'width 200ms ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  →
                </span>
                {ind.title}
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
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section style={{ background: '#f0f1f9' }} className="py-24 relative" data-testid="capabilities-index">
      <div className="bb-container">
        <div className="mb-10 pb-8 border-b border-bb-line">
          <h2 className="bb-h2" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            What we can do for you
          </h2>
        </div>

        <div>
          {capabilities.map((cap, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={cap.title} className="border-b border-bb-line" data-testid={`capability-entry-${i}`}>
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  data-testid={`capability-toggle-${i}`}
                  className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                >
                  <span
                    className="text-bb-ink"
                    style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(20px, 2.4vw, 28px)', fontWeight: 500, letterSpacing: '-0.02em' }}
                  >
                    {cap.title}
                  </span>
                  <span className="flex-shrink-0 text-bb-ink-2 group-hover:text-bb-ink transition-colors">
                    {isOpen ? <Minus className="w-5 h-5" strokeWidth={1.5} /> : <Plus className="w-5 h-5" strokeWidth={1.5} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-10 md:pl-[28%] max-w-3xl" style={{ animation: 'bbFadeIn 350ms ease forwards' }}>
                    <h3
                      className="text-bb-ink mb-5"
                      style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.25 }}
                    >
                      {cap.heading}
                    </h3>
                    <p className="text-bb-ink-2 text-[15.5px] leading-[1.75]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {cap.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-16 lg:pt-20 items-start">
            {/* LEFT — editorial copy (asymmetric 7 cols) */}
            <div className="lg:col-span-7 lg:pr-6">
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
            <div className="lg:col-span-5 flex justify-center lg:justify-end bb-reveal bb-reveal-3">
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
          SECTION 3 — BY SERVICES (#f0f1f9)
          ============================================================ */}
      <section className="py-24 relative" style={{ background: '#f0f1f9' }} data-testid="services-section">
        <div className="bb-container">
          <p className="bb-eyebrow mb-12">By Services</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 border-t border-bb-line pt-12">
            {services.map((s) => (
              <div key={s.title} data-testid={s.testid}>
                <h3
                  className="text-bb-ink mb-5"
                  style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(22px, 2.4vw, 28px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15 }}
                >
                  {s.title}
                </h3>
                <p className="text-bb-ink-2 text-[14.5px] leading-[1.75] mb-7" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {s.body}
                </p>
                <Link
                  to={s.link}
                  className="inline-flex items-center gap-2 font-mono text-[11.5px] tracking-[0.14em] uppercase text-bb-ink hover:text-bb-accent transition-colors group"
                  data-testid={`${s.testid}-learn-more`}
                >
                  Learn More <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-end">
            <Link to="/contact" className="bb-btn-primary" data-testid="support-talk-to-us-btn">
              Talk To Us <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — INFRASTRUCTURE (#e8eaf3)
          ============================================================ */}
      <section className="py-24 relative" style={{ background: '#e8eaf3' }} data-testid="infrastructure-section">
        <div className="bb-container">
          <div className="mb-12">
            <h2 className="bb-h2 max-w-3xl" style={{ fontSize: 'clamp(32px, 4.2vw, 56px)' }}>
              BluBridge Infrastructure for custom AI deployment Solutions
            </h2>
          </div>

          {/* Horizontal tab bar */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-bb-line" role="tablist">
            {infraTabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveInfraTab(index)}
                data-testid={`infra-tab-${tab.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`pb-3 -mb-px text-[14px] transition-colors border-b-2 ${
                  activeInfraTab === index
                    ? 'border-bb-ink text-bb-ink font-medium'
                    : 'border-transparent text-bb-ink-2 hover:text-bb-ink'
                }`}
                style={{ fontFamily: 'Geist, sans-serif' }}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-12" data-testid="infra-content-card">
            <div className="lg:col-span-4">
              <h3
                className="text-bb-ink"
                style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05 }}
              >
                {infraTabs[activeInfraTab].title}
              </h3>
            </div>
            <div className="lg:col-span-8">
              <p className="text-bb-ink text-[16px] leading-[1.7] mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                {infraTabs[activeInfraTab].description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                {infraTabs[activeInfraTab].features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 py-3.5 border-b border-bb-line">
                    <span aria-hidden className="font-mono text-bb-ink-3 text-[13px]">—</span>
                    <span className="text-bb-ink text-[14px]" style={{ fontFamily: 'Inter, sans-serif' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5 — WHAT WE CAN DO FOR YOU (#f0f1f9)
          ============================================================ */}
      <CapabilitiesAccordion />

      {/* ============================================================
          SECTION 6 — WORK WITH BLUBRIDGE (#e8eaf3)
          ============================================================ */}
      <section className="py-24" style={{ background: '#e8eaf3' }} data-testid="work-with-blubridge">
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h2 className="bb-h2 mb-8" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
                Work with BluBridge
              </h2>
              <p className="text-bb-ink-2 text-[16px] leading-[1.75] mb-10 max-w-[480px]">
                We are a small creative group driven by rigorous scientific thinking. Our work blends deep research with real-world execution, building AI models that are efficient, practical, and powerful, guided by both academic excellence and an agile, business-ready approach.
              </p>
              <Link to="/careers" className="bb-btn-primary" data-testid="work-join-cta">
                Join us <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
              </Link>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="bg-white p-3 border border-bb-line rounded-sm" style={{ boxShadow: '0 18px 48px -18px rgba(10, 18, 48, 0.18)' }}>
                <img
                  src="/images/bluBridge-team.png"
                  alt="BluBridge Team"
                  className="w-full h-auto object-cover block"
                  style={{ filter: 'saturate(0.95) contrast(0.98)' }}
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
