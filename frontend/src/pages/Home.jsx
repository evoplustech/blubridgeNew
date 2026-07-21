import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  ArrowRight, Check, Radio, ShieldCheck, GraduationCap, Code2, Factory, Landmark, HeartPulse,
  Scale, SlidersHorizontal, TrendingUp, Rocket, ShoppingCart, Home as HomeIcon
} from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';

/* ------------------------------------------------------------------
   HOME — Editorial Redesign
   Content preserved verbatim from previous Home.jsx:
   • Hero: "Beyond the Horizon" heading + "Frontier AI Research Lab"
   • "OUR FRONTIER AI EXPERTISE" section with orbit + industry grid
   • "By Services" cards (Model Customization / Value Realization / Deployment)
   • Infrastructure tabs with 7 items and their descriptions/features
   • Vertical tabs "What we can do for you" (5 tabs)
   • Work with BluBridge team block
   • Final CTA "Know more about our Research"
   ------------------------------------------------------------------ */

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
            <stop offset="0" stopColor="#f1f2fa" stopOpacity="1" />
            <stop offset="0.5" stopColor="#f1f2fa" stopOpacity="0" />
            <stop offset="1" stopColor="#f1f2fa" stopOpacity="1" />
          </linearGradient>
        </defs>

        <rect width="500" height="600" fill="url(#bbgrid)" opacity="0.55" />
        <rect width="500" height="600" fill="url(#bbFade)" />

        {/* Axis labels — positioned inside safe zone, no bracket collision */}
        <text x="20" y="42" fontFamily="IBM Plex Mono" fontSize="9" fill="#7c86a2" letterSpacing="1.5">01 / SYSTEM MAP</text>
        <text x="480" y="42" textAnchor="end" fontFamily="IBM Plex Mono" fontSize="9" fill="#7c86a2" letterSpacing="1.5">FIG. i</text>
        <text x="20" y="574" fontFamily="IBM Plex Mono" fontSize="9" fill="#7c86a2" letterSpacing="1.5">TRAINING → INFERENCE</text>

        {/* Vertical spine */}
        <line x1="250" y1="70" x2="250" y2="540" stroke="#b8bfd6" strokeWidth="1" className="bb-line-draw" style={{ animationDelay: '400ms' }} />

        {/* Nodes */}
        {[
          { y: 110, label: 'DATA',            n: '00' },
          { y: 200, label: 'TOKENIZER',       n: '01' },
          { y: 290, label: 'PRE-TRAINING',    n: '02' },
          { y: 380, label: 'POST-TRAINING',   n: '03' },
          { y: 470, label: 'INFERENCE',       n: '04' },
        ].map((node, i) => (
          <g key={node.label} style={{ animation: `bbFadeIn 500ms ease ${600 + i * 180}ms forwards`, opacity: 0 }}>
            {/* Left extension */}
            <line x1="90" y1={node.y} x2="240" y2={node.y} stroke="#b8bfd6" strokeWidth="0.8" />
            {/* Right extension */}
            <line x1="260" y1={node.y} x2="410" y2={node.y} stroke="#b8bfd6" strokeWidth="0.8" />
            {/* Central node */}
            <circle cx="250" cy={node.y} r="6" fill="#f1f2fa" stroke="#0a1230" strokeWidth="1.4" className="bb-pulse-node" style={{ animationDelay: `${i * 400}ms` }} />
            {/* Left mono index */}
            <text x="60" y={node.y + 3} fontFamily="IBM Plex Mono" fontSize="9" fill="#7c86a2" textAnchor="end">{node.n}</text>
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

/* ==================== INDUSTRY ORBIT (retained visual) ==================== */
const AIExpertiseOrbit = () => {
  const rings = [
    { key: 1, className: 'orbit-1', radius: '105px' },
    { key: 2, className: 'orbit-2', radius: '155px' },
    { key: 3, className: 'orbit-3', radius: '212px' }
  ];
  const atoms = [
    { ring: 1, type: 'feature', sizeClass: 'atom--inner', angle: 255, Icon: Radio, label: 'Telco' },
    { ring: 1, type: 'feature', sizeClass: 'atom--inner', angle: 35,  Icon: ShieldCheck, label: 'Finance' },
    { ring: 1, type: 'dummy', angle: 135, dummyClass: 'dummy-blue' },
    { ring: 2, type: 'feature', sizeClass: 'atom--mid', angle: 100, Icon: ShoppingCart, label: 'Oil & Gas' },
    { ring: 2, type: 'feature', sizeClass: 'atom--mid', angle: 325, Icon: GraduationCap, label: 'Education' },
    { ring: 2, type: 'feature', sizeClass: 'atom--mid', angle: 185, Icon: HeartPulse, label: 'Healthcare' },
    { ring: 2, type: 'dummy', angle: 250, dummyClass: 'dummy-orange' },
    { ring: 3, type: 'feature', sizeClass: 'atom--outer', angle: 60,  Icon: Scale, label: 'Legal' },
    { ring: 3, type: 'feature', sizeClass: 'atom--outer', angle: 140, Icon: Code2, label: 'Software' },
    { ring: 3, type: 'feature', sizeClass: 'atom--outer', angle: 230, Icon: Factory, label: 'Manufacturing' },
    { ring: 3, type: 'feature', sizeClass: 'atom--outer', angle: 280, Icon: HomeIcon, label: <>Construction <br /> & Infra</> },
    { ring: 3, type: 'feature', sizeClass: 'atom--outer', angle: 370, Icon: Landmark, label: 'Government' },
    { ring: 3, type: 'dummy', angle: 30,  dummyClass: 'dummy-blue' },
    { ring: 3, type: 'dummy', angle: 215, dummyClass: 'dummy-orange' }
  ];
  return (
    <div className="orbit-container relative w-[520px] h-[520px]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520" aria-hidden="true">
        <circle className="track" cx="260" cy="260" r="105" />
        <circle className="track" cx="260" cy="260" r="155" />
        <circle className="track" cx="260" cy="260" r="212" />
      </svg>
      <div className="center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20" style={{ background: '#dfe6f5' }}>
        <img width="30px" src="/images/b-center.png" alt="" />
      </div>
      {rings.map((ring) => (
        <div key={ring.key} className={`orbit ${ring.className}`} style={{ '--radius': ring.radius }}>
          {atoms.filter((a) => a.ring === ring.key).map((a, idx) => {
            const styleVars = { '--angle': `${a.angle}deg`, '--angleNeg': `${-a.angle}deg` };
            if (a.type === 'dummy') {
              return (
                <div key={idx} className={`atom dummy ${a.dummyClass}`} style={styleVars} aria-hidden="true">
                  <div className="atom-anchor"><div className="dummy-dot" /></div>
                </div>
              );
            }
            const Icon = a.Icon;
            return (
              <div key={idx} className={`atom ${a.sizeClass}`} style={styleVars}>
                <div className="atom-anchor">
                  <div className="atom-angle-fix">
                    <div className="atom-spin-fix">
                      <div className="atom-content">
                        <div className="atom-icon"><Icon className="atom-icon-svg" strokeWidth={1.5} /></div>
                        <div className="atom-label">{a.label}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/* ==================== CAPABILITIES INDEX (redesigned) ====================
   Editorial "chapter index" — no tabs. All 5 capabilities visible as
   full-width horizontal entries with large outline index numbers.
   ============================================================ */
const VerticalTabsSection = () => {
  const capabilities = [
    {
      title: "Smart Agents",
      tag:  "AGENTS",
      description: "Build intelligent workflows with AI agents that connect directly to your tools, platforms, and data. We design adaptive systems that work within your existing ecosystem, automating complex tasks while understanding your operational context to drive real, scalable impact."
    },
    {
      title: "AI Driven Search",
      tag:  "SEARCH",
      description: "Safely link your organization’s proprietary knowledge into one intelligent layer and surface insights you can trust. Our AI agents retrieve the most accurate, context-aware answers, ensuring every response is relevant, reliable, and aligned with your enterprise data."
    },
    {
      title: "In-Depth Research",
      tag:  "RESEARCH",
      description: "Access insights that are thoroughly researched and distilled from rich, wide-ranging sources. Our AI agents synthesize complex information into clear, actionable summaries, giving you depth, accuracy, and clarity in every result."
    },
    {
      title: "Developer APIs",
      tag:  "APIS",
      description: "Create intelligent applications and products on top of our foundation models. Embed advanced reasoning, generation, and automation into your workflows. Move from concept to production with models engineered for reliability, performance, and real-world impact across enterprise and developer ecosystems."
    },
    {
      title: "Custom AI Deployments",
      tag:  "DEPLOYMENTS",
      description: "Shape a truly personalized AI experience through tailored integrations with your enterprise data, platforms, and custom model capabilities, ensuring every system aligns precisely with your operational needs and business objectives."
    }
  ];

  return (
    <section
      style={{ background: '#eceefa' }}
      className="py-24 relative border-y border-bb-line overflow-hidden"
      data-testid="capabilities-index"
    >
      {/* Faint dot grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(10,18,48,0.06) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
        }}
      />

      <div className="bb-container relative">
        {/* Editorial masthead */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 pb-6 border-b border-bb-line">
          <div>
            <p className="bb-eyebrow mb-4">/ 05 &nbsp;·&nbsp; Capabilities</p>
            <h2 className="bb-h2" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
              What we can do for you
            </h2>
          </div>
          <span className="bb-caption tracking-[0.14em]">/ INDEX · 05 ENTRIES</span>
        </div>

        {/* Chapter entries */}
        <div>
          {capabilities.map((cap, i) => (
            <article
              key={i}
              className="group relative grid grid-cols-12 items-start py-10 md:py-12 border-b border-bb-line last:border-b-0 transition-colors hover:bg-white/60"
              data-testid={`capability-entry-${i}`}
            >
              {/* Huge outline index number */}
              <div className="col-span-3 md:col-span-2 pr-2 md:pr-4">
                <span
                  aria-hidden
                  className="block text-bb-ink transition-transform duration-500 group-hover:translate-x-1"
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    fontWeight: 300,
                    fontSize: 'clamp(56px, 10vw, 144px)',
                    letterSpacing: '-0.05em',
                    lineHeight: 0.85,
                    WebkitTextStroke: '1px #0a1230',
                    color: 'transparent',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title + technical tag */}
              <div className="col-span-9 md:col-span-4 pr-4 flex flex-col gap-4 pt-1">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-bb-ink-3 self-start">
                  <span className="w-6 h-px bg-bb-line-strong" />
                  {cap.tag}
                </span>
                <h3
                  className="text-bb-ink"
                  style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(22px, 2.6vw, 32px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1 }}
                >
                  {cap.title}
                </h3>
                {/* Animated underline on hover */}
                <span
                  aria-hidden
                  className="block h-px bg-bb-ink transition-all duration-500 group-hover:w-16"
                  style={{ width: 24 }}
                />
              </div>

              {/* Description */}
              <div className="col-span-12 md:col-span-6 md:pl-8 mt-6 md:mt-0">
                <p className="bb-caption mb-3" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                  / chapter · 0{i + 1}
                </p>
                <p
                  className="text-bb-ink text-[16px] md:text-[17px]"
                  style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.65 }}
                >
                  {cap.description}
                </p>
              </div>

              {/* Right-edge chapter marker */}
              <span
                aria-hidden
                className="absolute right-0 top-10 md:top-12 flex items-center gap-2 font-mono text-[10px] text-bb-ink-3"
              >
                <span className="hidden md:inline">▸</span>
              </span>
            </article>
          ))}
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
    <div style={{ background: '#f1f2fa' }} className="min-h-screen text-bb-ink" data-testid="home-page">

      {/* ============================================================
          HERO — Editorial asymmetric split with SVG pipeline diagram
          ============================================================ */}
      <section className="relative overflow-hidden" data-testid="hero-section" style={{ paddingTop: '48px', paddingBottom: '96px' }}>
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
          {/* Top meta bar */}
          <div className="flex items-center justify-between pb-10 border-b border-bb-line bb-reveal">
            <span className="bb-eyebrow">Blubridge / Independent AI Research Lab</span>
            <span className="bb-caption hidden sm:block">EST. 2024 · CHENNAI · PRINCETON</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-16 lg:pt-20 items-start">
            {/* LEFT — editorial copy (asymmetric 7 cols) */}
            <div className="lg:col-span-7 lg:pr-6">
              <p className="bb-eyebrow mb-6 bb-reveal bb-reveal-1">/ 00 &nbsp;·&nbsp; Frontier AI</p>

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

              {/* Data strip (uses existing labels only) */}
              <dl className="mt-16 grid grid-cols-3 border-t border-bb-line pt-6 bb-reveal bb-reveal-4">
                {[
                  { k: 'MODE',   v: 'Research' },
                  { k: 'FOCUS',  v: 'Frontier AI' },
                  { k: 'STATE',  v: 'In Progress' },
                ].map((item) => (
                  <div key={item.k}>
                    <dt className="bb-caption">{item.k}</dt>
                    <dd className="text-[15px] mt-1 text-bb-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{item.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* RIGHT — bespoke pipeline diagram (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end bb-reveal bb-reveal-3">
              <PipelineDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 01 — OUR FRONTIER AI EXPERTISE + BY INDUSTRY
          ============================================================ */}
      <section className="relative pt-24 pb-20" style={{ background: '#e8eaf3' }}>
        <div className="bb-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="bb-eyebrow mb-4">/ 01 &nbsp;·&nbsp; Expertise</p>
              <h2 className="bb-h2 capitalize" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                Our Frontier AI Expertise
              </h2>
            </div>
            <p className="max-w-md text-bb-ink-2 text-[15px]">
              <span className="font-mono text-bb-ink-3 text-[12px]">// STATUS </span> In Progress...
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 relative flex items-center justify-center overflow-hidden">
              <AIExpertiseOrbit />
            </div>

            <div className="lg:col-span-6">
              <p className="bb-eyebrow mb-6">By Industry</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Radio, title: "Telco" },
                  { icon: ShieldCheck, title: "Finance & Insurance" },
                  { icon: GraduationCap, title: "Education" },
                  { icon: Scale, title: "Legal" },
                  { icon: Code2, title: "Software & Technology" },
                  { icon: Factory, title: "Manufacturing" },
                  { icon: Landmark, title: "Government" },
                  { icon: HeartPulse, title: "Healthcare" },
                  { icon: ShoppingCart, title: "Oil & Gas" },
                  { icon: HomeIcon, title: "Construction & Infra" }
                ].map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <div
                      key={index}
                      className="group flex items-center gap-3 p-4 bg-white border border-bb-line rounded-md hover:border-bb-line-strong hover:bg-bb-bg-subtle transition-colors"
                      data-testid={`expertise-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span className="font-mono text-[11px] text-bb-ink-3 group-hover:text-bb-accent transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <IconComponent className="w-4 h-4 text-bb-accent" strokeWidth={1.5} />
                      <span className="text-bb-ink text-[14px]" style={{ fontFamily: 'Inter, sans-serif' }}>{service.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 02 — BY SERVICES (Model Customization / Value Realization / Deployment)
          Editorial 3-row layout with technical annotations
          ============================================================ */}
      <section className="py-24 relative" style={{ background: '#f1f2fa' }}>
        <div className="bb-container">
          <div className="mb-16">
            <p className="bb-eyebrow mb-4">/ 02 &nbsp;·&nbsp; Services</p>
            <h2 className="bb-h2" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
              By Services
            </h2>
          </div>

          <div className="space-y-0 border-t border-bb-line">
            {[
              {
                num: '01',
                title: 'Model Customization',
                link: '/solutions#model-customization',
                body: 'Research-driven model adaptation using domain data, structured training workflows, and controlled specialization methods. We focus on reproducible training pipelines, evaluation rigor, and system-level correctness.',
                testid: 'solution-model-customization'
              },
              {
                num: '02',
                title: 'Value Realization',
                link: '/solutions#value-realization',
                body: 'From use-case validation to engineering prototypes, we help translate AI experimentation into measurable technical outcomes and deployment-ready system designs.',
                testid: 'solution-value-realization'
              },
              {
                num: '03',
                title: 'Deployment',
                link: '/solutions#deployment',
                body: 'Engineering-led deployment architectures across cloud, private, and controlled infrastructure environments, with focus on reliability, performance, and operational constraints.',
                testid: 'solution-deployment'
              }
            ].map((s) => (
              <Link
                key={s.num}
                to={s.link}
                data-testid={s.testid}
                className="group block border-b border-bb-line py-10 lg:py-14 hover:bg-white transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  <div className="lg:col-span-1">
                    <span className="bb-caption">/ {s.num}</span>
                  </div>
                  <div className="lg:col-span-5">
                    <h3
                      className="text-bb-ink"
                      style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05 }}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-bb-ink-2 text-[16px] leading-[1.7]">{s.body}</p>
                  </div>
                  <div className="lg:col-span-1 flex lg:justify-end items-center">
                    <span className="inline-flex items-center gap-2 text-bb-ink font-mono text-[12px] group-hover:text-bb-accent transition-colors">
                      OPEN <span className="transition-transform group-hover:translate-x-1">↗</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link to="/contact" className="bb-btn-primary" data-testid="support-talk-to-us-btn">
              Talk To Us <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 03 — INFRASTRUCTURE
          "BluBridge Infrastructure for custom AI deployment Solutions"
          ============================================================ */}
      <section className="py-24 relative" style={{ background: '#eceefa' }} data-testid="infrastructure-section">
        <div className="bb-container">
          <div className="mb-14">
            <p className="bb-eyebrow mb-4">/ 03 &nbsp;·&nbsp; Infrastructure</p>
            <h2 className="bb-h2" style={{ fontSize: 'clamp(32px, 4.2vw, 56px)' }}>
              BluBridge Infrastructure for custom AI deployment Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: tab list */}
            <div className="lg:col-span-4">
              <div className="border-t border-bb-line">
                {infraTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveInfraTab(index)}
                    data-testid={`infra-tab-${tab.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`w-full text-left flex items-center justify-between gap-4 py-4 px-2 border-b border-bb-line transition-colors ${
                      activeInfraTab === index ? 'bg-white' : 'hover:bg-white/60'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className={`font-mono text-[11px] ${activeInfraTab === index ? 'text-bb-accent' : 'text-bb-ink-3'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-[15px] ${activeInfraTab === index ? 'text-bb-ink font-medium' : 'text-bb-ink-2'}`}
                        style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        {tab.name}
                      </span>
                    </span>
                    {activeInfraTab === index && <span className="font-mono text-[11px] text-bb-accent">●</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: content panel */}
            <div className="lg:col-span-8">
              <div className="bb-panel p-8 lg:p-10" data-testid="infra-content-card">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bb-caption">/ 0{activeInfraTab + 1}</span>
                  <div className="flex-1 h-px bg-bb-line" />
                </div>
                <h3
                  className="mb-4 text-bb-ink"
                  style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 500, letterSpacing: '-0.02em' }}
                >
                  {infraTabs[activeInfraTab].title}
                </h3>
                <p className="text-bb-ink-2 text-[16px] leading-[1.7] mb-8">{infraTabs[activeInfraTab].description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {infraTabs[activeInfraTab].features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 py-3 border-t border-bb-line">
                      <Check className="w-4 h-4 text-bb-accent flex-shrink-0" />
                      <span className="text-bb-ink text-[14px]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 04 — Vertical Tabs "What we can do for you"
          ============================================================ */}
      <VerticalTabsSection />

      {/* ============================================================
          SECTION 05 — WORK WITH BLUBRIDGE (team)
          ============================================================ */}
      <section className="py-24" style={{ background: '#f1f2fa' }} data-testid="work-with-blubridge">
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <p className="bb-eyebrow mb-6">/ 06 &nbsp;·&nbsp; Team</p>
              <h2 className="bb-h2 mb-8" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
                Work with BluBridge
              </h2>
              <p className="text-bb-ink-2 text-[17px] leading-[1.75] mb-10 max-w-[540px]">
                We are a small creative group driven by rigorous scientific thinking. Our work blends deep research with real-world execution, building AI models that are efficient, practical, and powerful, guided by both academic excellence and an agile, business-ready approach.
              </p>
              <Link to="/careers" className="bb-btn-primary" data-testid="work-join-cta">
                Join us <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
              </Link>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 relative">
              <div className="relative border border-bb-line rounded-md overflow-hidden bg-white">
                <img
                  src="/images/bluBridge-team.png"
                  alt="BluBridge Team"
                  className="w-full h-auto object-cover block"
                  style={{ filter: 'saturate(0.95) contrast(0.98)' }}
                />
                {/* Editorial caption strip */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/85 backdrop-blur px-2.5 py-1 rounded font-mono text-[10px] text-bb-ink-3">
                  <span>FIG. ii</span>
                  <span className="opacity-40">|</span>
                  <span>BLUBRIDGE / TEAM</span>
                </div>
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
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/50 mb-6">/ 07 · Continue</p>
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
