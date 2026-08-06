import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PHRASE_WORDS = ['Hunger.', 'Precision.'];

const PassionTypingText = () => {
  const [text, setText] = useState('');
  const [caretOn, setCaretOn] = useState(true);
  const stateRef = useRef({ wordIndex: 0, deleting: false });

  useEffect(() => {
    const blink = setInterval(() => setCaretOn((c) => !c), 500);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const s = stateRef.current;
    const word = PHRASE_WORDS[s.wordIndex];
    let delay;
    if (!s.deleting) {
      if (text.length < word.length) delay = 70;
      else { delay = 1500; }
    } else {
      delay = 45;
    }
    const t = setTimeout(() => {
      if (!s.deleting) {
        if (text.length < word.length) setText(word.slice(0, text.length + 1));
        else { s.deleting = true; setText(word.slice(0, text.length - 1)); }
      } else {
        if (text.length > 0) setText(word.slice(0, text.length - 1));
        else { s.deleting = false; s.wordIndex = (s.wordIndex + 1) % PHRASE_WORDS.length; }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text]);

  return (
    <div className="au-phrase-stage" data-testid="passion-typing-text">
      <h3 className="au-phrase" data-testid="passion-heading">
        <span className="au-phrase-static">It's Our </span>
        <span className="au-phrase-anim">{text}<span aria-hidden="true" className="au-phrase-caret" style={{ opacity: caretOn ? 1 : 0 }}></span></span>
      </h3>
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
            <div className="au-hero-side-col bb-reveal bb-reveal-3">
              <p className="au-hero-para" data-testid="hero-paragraph">We are an AI research and engineering company with consulting and applied AI programs, developing advanced machine learning systems from first principles. Our work spans model development, systems engineering, inference optimization, and deployment architecture, with technical rigor and reproducibility treated as core requirements. Model and system capabilities are advanced through disciplined research, controlled experimentation, and engineering-driven validation, translating mature capabilities into production AI solutions.</p>
              <Link className="bb-btn-primary au-hero-cta" data-testid="hero-cta-btn" to="/contact">Get in touch <span aria-hidden="true" style={{ fontFamily: '"IBM Plex Mono"' }}>↗</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR MISSION ===== */}
      <section className="au-mission" data-testid="about-mission">
        <svg aria-hidden="true" className="au-mission-paths" viewBox="0 0 1440 620" preserveAspectRatio="none">
          <defs>
            <linearGradient id="au-mission-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0a1230" stopOpacity="0"></stop>
              <stop offset="60%" stopColor="#0a1230" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#0a1230" stopOpacity="1"></stop>
            </linearGradient>
          </defs>
          <path d="M 0,120 C 380,120 700,420 1180,520" stroke="url(#au-mission-line)" strokeWidth="1" fill="none"></path>
          <path d="M 0,380 C 460,380 820,500 1180,520" stroke="url(#au-mission-line)" strokeWidth="1" fill="none"></path>
          <path d="M 0,600 C 500,600 900,540 1180,520" stroke="url(#au-mission-line)" strokeWidth="1" fill="none"></path>
          <rect x="1176" y="516" width="8" height="8" fill="#0a1230" fillOpacity="0.35"></rect>
        </svg>
        <div className="bb-container au-mission-inner">
          <div className="au-mission-head">
            <h2 data-testid="our-mission-title" className="au-mission-title">Our Mission</h2>
          </div>
          <div className="au-mission-statement-wrap">
            <p data-testid="our-mission-description" className="au-mission-statement">We build AI systems for open ecosystems and enterprise environments with emphasis on open-weight models and applied AI capabilities engineered through disciplined training, evaluation rigor, and systems-aware design. Our mission is to advance AI as an engineering discipline grounded in measurable progress, reproducible methods, and technical correctness, with research and applied programs aligned to real-world operating constraints.</p>
            <div className="au-mission-cta-row">
              <Link className="bb-btn-primary au-mission-cta" data-testid="mission-cta-btn" to="/careers">Join us <span aria-hidden="true" style={{ fontFamily: '"IBM Plex Mono"' }}>↗</span></Link>
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
              <PassionTypingText />
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
