import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

const TERMS = [
  "Numerical Fidelity.",
  "Training Throughput.",
  "Inference Latency.",
  "Evaluation Benchmarks.",
];
const LONGEST_TERM = "Evaluation Benchmarks.";
const TYPE_MS = 70;
const DELETE_MS = 40;
const HOLD_MS = 1500;
const NEXT_MS = 400;

const PrecisionScanReveal = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing' | 'holding' | 'deleting' | 'pausing'
  const [inView, setInView] = useState(true);
  const [reduce, setReduce] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mq.matches);
    const handler = () => setReduce(mq.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !inView) return;
    const current = TERMS[index];
    let timer;
    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), TYPE_MS);
      } else {
        timer = setTimeout(() => setPhase('holding'), 0);
      }
    } else if (phase === 'holding') {
      timer = setTimeout(() => setPhase('deleting'), HOLD_MS);
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), DELETE_MS);
      } else {
        timer = setTimeout(() => setPhase('pausing'), 0);
      }
    } else if (phase === 'pausing') {
      timer = setTimeout(() => {
        setIndex((i) => (i + 1) % TERMS.length);
        setPhase('typing');
      }, NEXT_MS);
    }
    return () => clearTimeout(timer);
  }, [displayed, phase, index, reduce, inView]);

  if (reduce) {
    return (
      <div className="au-phrase-stage" data-testid="passion-typing-text" ref={wrapRef}>
        <div className="pms-outer">
          <h3 className="au-phrase pms-static" data-testid="passion-heading">
            <span className="pms-line">
              <span className="pms-prefix">It&apos;s our</span>
              <span className="pms-term-static">{TERMS[0]}</span>
            </span>
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="au-phrase-stage" data-testid="passion-typing-text" ref={wrapRef}>
      <div className="pms-outer">
        {/* Invisible sizer: reserves outer height + longest full statement width */}
        <h3 className="au-phrase pms-sizer" aria-hidden="true">
          <span className="pms-prefix">It&apos;s our</span>
          <span>{LONGEST_TERM}</span>
        </h3>
        {/* Screen-reader accessible label (announced once, no re-announcement) */}
        <span className="pms-sr-only">It&apos;s our Numerical Fidelity, Training Throughput, Inference Latency, and Evaluation Benchmarks.</span>
        {/* Active typewriter phrase — only the term types; "It's our" stays fixed */}
        <h3 className="au-phrase pms-active" aria-hidden="true" data-testid="passion-heading">
          <span className="pms-prefix">It&apos;s our</span>
          <span className="pms-term">{displayed}</span>
          <span className="pms-caret" aria-hidden="true" />
        </h3>
      </div>
    </div>
  );
};

const methodCells = [
  {
    title: 'How we Build',
    body: 'We build through structured experimentation, measurable evaluation, and system-level engineering. Development follows reproducible workflows, deployment-aware design criteria, and staged productionization.',
    emphasis: false,
  },
  {
    title: 'Innovation Through Rigor',
    body: 'Research is guided by technical depth, metric-based evaluation, and failure-mode analysis. Models and systems are validated for correctness, efficiency, and operating limits before broader deployment and operational use.',
    emphasis: true,
  },
  {
    title: 'Our People',
    body: 'We bring together expertise across model research, systems engineering, and AI infrastructure. Work is cross-stack, with end-to-end technical responsibility across training, runtime behavior, deployment systems, and applied AI solution programs.',
    emphasis: false,
  },
];

const AboutUs = () => {
  useDocumentTitle('About Us | Blubridge');
  const rootRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    rootRef.current?.querySelectorAll('.in-rev').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="internal-site min-h-screen text-bb-ink au-root" data-testid="about-page" ref={rootRef}>

      {/* ===== HERO ===== */}
      <section className="au-hero" data-testid="about-hero">
        <div className="bb-container au-hero-inner">
          <div aria-hidden="true" className="au-hero-rule au-hero-rule-top"></div>
          <div className="au-hero-row-1">
            <div className="au-hero-heading-block">
              <span className="bb-eyebrow au-hero-eyebrow" data-testid="about-eyebrow">About Us</span>
              <h1 data-testid="hero-heading" className="au-hero-heading bb-reveal bb-reveal-1">Building the Next Frontier of AI</h1>
            </div>
          </div>
          <div className="au-hero-row-2">
            <div className="au-hero-photo-col bb-reveal bb-reveal-2">
              <img alt="The BluBridge team" className="au-hero-photo" data-testid="hero-photo" width="7008" height="4411" src="/images/cdn/183b87_3g9ggy4y_SA7.jpg" />
            </div>
            <div className="au-hero-side-col bb-reveal bb-reveal-3 ">
              <p className="au-hero-para pt-[50px]" data-testid="hero-paragraph" >We are an AI research and engineering company with consulting and applied AI programs, developing advanced machine learning systems from first principles. Our work spans model development, systems engineering, inference optimization, and deployment architecture, with technical rigor and reproducibility treated as core requirements. Model and system capabilities are advanced through disciplined research, controlled experimentation, and engineering-driven validation, translating mature capabilities into production AI solutions.</p>
              <Link className="bb-btn-primary au-hero-cta" data-testid="hero-cta-btn" to="/contact">Get in touch <span aria-hidden="true" style={{ fontFamily: '"IBM Plex Mono"' }}>↗</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR MISSION (3-column editorial row) ===== */}
      <section className="au-mission au-mission-row" data-testid="about-mission">
        <div className="bb-container au-mission-inner">
          <div className="aum-grid">
            <div className="aum-left">
              <h2 data-testid="our-mission-title" className="au-mission-title aum-title">Our Mission</h2>
              <span aria-hidden="true" className="aum-dash"></span>
            </div>
            <div className="aum-mid">
              <p data-testid="our-mission-description" className="aum-statement">We build AI systems for open ecosystems and enterprise environments with emphasis on open-weight models and applied AI capabilities engineered through disciplined training, evaluation rigor, and systems-aware design. Our mission is to advance AI as an engineering discipline grounded in measurable progress, reproducible methods, and technical correctness, with research and applied programs aligned to real-world operating constraints.</p>
            </div>
            <div className="aum-right">
              <Link className="aum-join" data-testid="mission-cta-btn" to="/careers">
                <span aria-hidden="true" className="aum-join-circle"><span className="aum-join-arrow">→</span></span>
                <span className="aum-join-label">Join us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW WE BUILD, ENGINEER AND VALIDATE ===== */}
      <section className="au-method" data-testid="what-sets-us-apart-section">
        <div className="bb-container">
          <h2 data-testid="what-sets-us-apart-heading" className="au-method-heading">How We Build, Engineer and Validate</h2>
          <div className="au-method-upper">
            <article className="in-rev au-method-cell au-method-cell-purpose" data-testid="method-cell-0">
              <h4 className="au-method-cell-title">Our Purpose</h4>
              <p className="au-method-cell-body">BluBridge exists to advance AI research and translate it into deployable systems. Our efforts are application-driven and grounded in real infrastructure, data behavior, and operating constraints.</p>
            </article>
            <div className="au-method-phrase-slot" data-testid="method-phrase-slot">
              <PrecisionScanReveal />
            </div>
          </div>
          <div className="au-method-lower">
            {methodCells.map((cell, i) => (
              <article key={cell.title} className={`in-rev au-method-cell${cell.emphasis ? ' au-method-cell-emphasis' : ''}`} data-testid={`method-cell-${i + 1}`}>
                <h4 className="au-method-cell-title">{cell.title}</h4>
                <p className="au-method-cell-body">{cell.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA (kept from existing page — excluded from copy) ===== */}
      <section className="py-24" style={{ background: '#0a1230' }}>
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

export default AboutUs;
