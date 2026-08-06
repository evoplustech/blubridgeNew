import React, { useState, useRef, useEffect } from 'react';
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
                fontSize: '24px',
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
          style={{ borderTop: '1px solid #8b93ad' }}
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
                  borderBottom: '1px solid #8b93ad',
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
                    fontSize: active ? 'clamp(46px, 7.4vw, 116px)' : 'clamp(18px, 1.4vw, 22px)',
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

/* ==================== CAPABILITIES — EDITORIAL INDEX BAR + JOURNAL SPREAD ==================== */
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
  const tabRefs = useRef([]);

  const onTablistKeyDown = (e) => {
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (activeCap + 1) % capabilities.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (activeCap - 1 + capabilities.length) % capabilities.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = capabilities.length - 1;
    if (next !== null) {
      e.preventDefault();
      setActiveCap(next);
      tabRefs.current[next]?.focus();
    }
  };

  const cap = capabilities[activeCap];
  const INK = '#0a1230';
  const MUTE = '#7a8299';
  const RULE = 'rgba(10, 18, 48, 0.14)';

  return (
    <section
      style={{ background: '#f0f1f9', paddingTop: '110px', paddingBottom: '120px' }}
      data-testid="capabilities-index"
    >
      <div
        style={{ maxWidth: '1320px', width: 'calc(100% - 44px)', margin: '0 auto' }}
        className="lg:!w-[calc(100%-96px)]"
      >
        {/* --- HEADER: title left-anchored, hairline continues right --- */}
        <div className="flex items-end gap-8">
          <h2
            data-testid="capabilities-heading"
            style={{
              fontFamily: 'Geist, sans-serif',
              fontSize: 'clamp(44px, 6vw, 92px)',
              letterSpacing: '-0.035em',
              lineHeight: 0.98,
              fontWeight: 500,
              color: INK,
              margin: 0,
              maxWidth: '780px',
              flexShrink: 0,
            }}
          >
            What we can do <br className="hidden sm:block" /> for you
          </h2>
          <div
            aria-hidden="true"
            className="hidden lg:block"
            style={{ flex: 1, height: '1px', background: RULE, marginBottom: '18px' }}
          />
        </div>

        {/* --- INDEX BAR: 5 titles in a single row, thin vertical hairline separators --- */}
        <div
          role="tablist"
          aria-label="What we can do for you"
          data-testid="capabilities-selector"
          onKeyDown={onTablistKeyDown}
          style={{
            marginTop: 'clamp(56px, 6vw, 90px)',
            borderTop: `1px solid ${RULE}`,
            borderBottom: `1px solid ${RULE}`,
          }}
          className="grid grid-cols-2 md:grid-cols-5"
        >
          {capabilities.map((c, i) => {
            const active = activeCap === i;
            return (
              <button
                key={c.title}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`capability-tab-${i}`}
                aria-selected={active}
                aria-controls="capability-panel"
                tabIndex={active ? 0 : -1}
                data-testid={`capability-toggle-${i}`}
                onClick={() => setActiveCap(i)}
                className="bb-cap-cell text-left"
                style={{
                  position: 'relative',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: '22px 22px 22px 0',
                  minHeight: '78px',
                  color: active ? INK : MUTE,
                  transition: 'color 200ms ease',
                }}
              >
                {/* vertical hairline separator (all except last) */}
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '18%',
                      bottom: '18%',
                      width: '1px',
                      background: RULE,
                    }}
                    className="hidden md:block"
                  />
                )}
                <span
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    fontSize: '15px',
                    fontWeight: active ? 600 : 500,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.3,
                    color: 'inherit',
                    display: 'block',
                    paddingLeft: 'clamp(14px, 1.4vw, 22px)',
                  }}
                >
                  {c.title}
                </span>
                {/* Active solid underline block bleeding to the bottom rule */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 'clamp(14px, 1.4vw, 22px)',
                    right: '22px',
                    bottom: '-1px',
                    height: '3px',
                    background: INK,
                    transformOrigin: 'left center',
                    transform: active ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 260ms cubic-bezier(0.22, 0.61, 0.36, 1)',
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* --- JOURNAL SPREAD: active heading (left, extra large) + description (right, generous leading) --- */}
        <div
          key={activeCap}
          role="tabpanel"
          id="capability-panel"
          aria-labelledby={`capability-tab-${activeCap}`}
          data-testid="capability-stage"
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-10"
          style={{
            marginTop: 'clamp(56px, 6vw, 92px)',
            animation: 'bbCapReveal 220ms ease forwards',
          }}
        >
          <div className="lg:col-span-7">
            <h3
              data-testid="capability-active-heading"
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: 'clamp(30px, 3.6vw, 52px)',
                fontWeight: 500,
                letterSpacing: '-0.028em',
                lineHeight: 1.08,
                color: INK,
                margin: 0,
                maxWidth: '640px',
              }}
            >
              {cap.heading}
            </h3>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <div
              aria-hidden="true"
              style={{ width: '44px', height: '2px', background: INK, marginBottom: '24px' }}
              className="hidden lg:block"
            />
            <p
              data-testid="capability-active-description"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16.5px',
                lineHeight: 1.72,
                color: '#3f4966',
                margin: 0,
                maxWidth: '520px',
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
          SECTION 3 — BY SERVICES
          Three columns, each framed by a corner-bracket hairline
          motif (top rule + left drop-line past the title).
          ============================================================ */}
      <section style={{ background: '#f0f1f9', paddingTop: '104px', paddingBottom: '120px' }} data-testid="services-section">
        <div className="bb-container">

          {/* Section anchor */}
          <div>
            <h2
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: 'clamp(44px, 6vw, 92px)',
                fontWeight: 500,
                letterSpacing: '-0.035em',
                lineHeight: 0.98,
                color: '#0a1230',
                margin: 0,
              }}
            >
              By Services
            </h2>
          </div>

          {(() => {
            const services = [
              {
                title: 'Model Customization',
                link: '/solutions#model-customization',
                body: 'Research-driven model adaptation using domain data, structured training workflows, and controlled specialization methods. We focus on reproducible training pipelines, evaluation rigor, and system-level correctness.',
                testid: 'solution-model-customization',
              },
              {
                title: 'Value Realization',
                link: '/solutions#value-realization',
                body: 'From use-case validation to engineering prototypes, we help translate AI experimentation into measurable technical outcomes and deployment-ready system designs.',
                testid: 'solution-value-realization',
              },
              {
                title: 'Deployment',
                link: '/solutions#deployment',
                body: 'Engineering-led deployment architectures across cloud, private, and controlled infrastructure environments, with focus on reliability, performance, and operational constraints.',
                testid: 'solution-deployment',
              },
            ];
            const INK = '#0a1230';
            const RULE = '#8b93ad';
            return (
              <div
                className="mt-12 lg:mt-16"
                style={{ borderTop: `1px solid ${RULE}` }}
                data-testid="services-list"
              >
                {services.map((s) => (
                  <Link
                    key={s.title}
                    to={s.link}
                    data-testid={s.testid}
                    className="group block relative no-underline"
                    style={{
                      borderBottom: `1px solid ${RULE}`,
                      padding: 'clamp(36px, 4.6vw, 68px) 0',
                      color: INK,
                      textDecoration: 'none',
                    }}
                  >
                    <div className="grid grid-cols-12 gap-6 lg:gap-10 items-start">
                      {/* Heading — left half */}
                      <h3
                        className="col-span-12 lg:col-span-6"
                        style={{
                          fontFamily: 'Geist, sans-serif',
                          fontSize: 'clamp(36px, 4.2vw, 64px)',
                          fontWeight: 500,
                          letterSpacing: '-0.03em',
                          lineHeight: 1,
                          color: INK,
                          margin: 0,
                          transition: 'transform 260ms cubic-bezier(0.22, 0.61, 0.36, 1)',
                        }}
                      >
                        <span
                          className="inline-block group-hover:translate-x-2"
                          style={{ transition: 'transform 260ms cubic-bezier(0.22, 0.61, 0.36, 1)' }}
                        >
                          {s.title}
                        </span>
                      </h3>

                      {/* Body — right column */}
                      <p
                        className="col-span-11 lg:col-span-5 lg:pt-2"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '15.5px',
                          lineHeight: 1.7,
                          color: '#3f4966',
                          margin: 0,
                          maxWidth: '440px',
                        }}
                      >
                        {s.body}
                      </p>

                      {/* Arrow — far right */}
                      <div className="col-span-1 flex justify-end lg:pt-2" aria-hidden>
                        <span
                          className="inline-block group-hover:translate-x-1 group-hover:-translate-y-1"
                          style={{
                            fontFamily: 'Geist, sans-serif',
                            fontSize: '22px',
                            lineHeight: 1,
                            color: INK,
                            transition: 'transform 260ms cubic-bezier(0.22, 0.61, 0.36, 1)',
                          }}
                        >
                          ↗
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            );
          })()}

          <div className="mt-16 lg:mt-20 flex justify-end">
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
                padding: '15px 30px',
                borderRadius: '3px',
                textDecoration: 'none',
                minHeight: '48px',
              }}
            >
              Talk To Us
              <span aria-hidden style={{ fontFamily: 'IBM Plex Mono', transition: 'transform 180ms ease' }} className="inline-block group-hover:translate-x-1">↗</span>
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

          <h2
            style={{
              fontFamily: 'Geist, sans-serif',
              fontSize: 'clamp(32px, 3.4vw, 44px)',
              lineHeight: 1.14,
              letterSpacing: '-0.025em',
              fontWeight: 600,
              color: '#0a1230',
              margin: 0,
              maxWidth: '520px',
            }}
          >
            BluBridge Infrastructure for custom AI deployment Solutions
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 mt-14 lg:mt-16 items-start">

            {/* Left — vertical tab list with dot indicators */}
            <div className="lg:col-span-4" role="tablist">
              {infraTabs.map((tab, index) => {
                const active = activeInfraTab === index;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveInfraTab(index)}
                    data-testid={`infra-tab-${tab.name.toLowerCase().replace(/\s+/g, '-')}`}
                    role="tab"
                    aria-selected={active}
                    className="flex items-center gap-4 w-full text-left transition-colors"
                    style={{
                      padding: '13px 18px',
                      borderRadius: '6px',
                      background: active ? 'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.55) 72%, rgba(255,255,255,0) 100%)' : 'transparent',
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        flexShrink: 0,
                        background: active ? '#0a1230' : 'transparent',
                        border: active ? '1px solid #0a1230' : '1px solid #a9b0c6',
                        transition: 'background-color 180ms ease, border-color 180ms ease',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'Geist, sans-serif',
                        fontSize: '14.5px',
                        fontWeight: active ? 600 : 400,
                        color: active ? '#0a1230' : '#5d6580',
                      }}
                    >
                      {tab.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right — elevated detail card */}
            <div className="lg:col-span-7 lg:col-start-5">
              <div
                data-testid="infra-content-card"
                style={{
                  background: '#fbfbfd',
                  borderRadius: '14px',
                  padding: 'clamp(28px, 3.4vw, 48px)',
                  boxShadow: '0 18px 44px rgba(10, 18, 48, 0.07), 0 2px 8px rgba(10, 18, 48, 0.04)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    fontSize: 'clamp(24px, 2.2vw, 30px)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    color: '#0a1230',
                    margin: 0,
                  }}
                >
                  {infraTabs[activeInfraTab].title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: '#3f4966',
                    margin: '14px 0 0',
                    maxWidth: '520px',
                  }}
                >
                  {infraTabs[activeInfraTab].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10" style={{ marginTop: '38px' }}>
                  {infraTabs[activeInfraTab].features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                      style={{ borderTop: '1px solid #dfe2ee', padding: '15px 0' }}
                    >
                      <span
                        aria-hidden
                        className="flex items-center justify-center flex-shrink-0"
                        style={{ width: '19px', height: '19px', borderRadius: '50%', background: '#e9ebf4' }}
                      >
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5.2L4 7.6L8.5 2.4" stroke="#6a7390" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14.5px',
                          lineHeight: 1.5,
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
