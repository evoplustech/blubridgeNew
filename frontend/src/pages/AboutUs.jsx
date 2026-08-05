import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';

/* ------------------------------------------------------------------
   ABOUT US — Editorial Redesign (light theme #f1f2fa)
   Content preserved verbatim:
   • Eyebrow: "About Us"
   • H1: "Building the Next Frontier of AI"
   • Hero description paragraph
   • "Get in touch" CTA
   • "Our Mission" title + description + "Join us" CTA
   • "How We Build, Engineer and Validate" section
   • "Our Purpose" / "How we Build" / "Innovation Through Rigor" / "Our People"
   • Typing animation: "It's Our " + Hunger. / Precision.
   • Final CTA "Know more about our Research"
   ------------------------------------------------------------------ */

const PassionTypingText = () => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const textRef = useRef(null);
  const animRef = useRef(null);
  const blinkRef = useRef(null);

  const staticText = "It's Our ";
  const words = ["Hunger.", "Precision."];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) setHasStarted(true);
    }, { threshold: 0.3 });
    if (textRef.current) observer.observe(textRef.current);
    return () => textRef.current && observer.unobserve(textRef.current);
  }, [hasStarted]);

  useEffect(() => {
    if (!isAnimating) { setCursorVisible(false); return; }
    setCursorVisible(true);
    blinkRef.current = setInterval(() => setCursorVisible(prev => !prev), 400);
    return () => clearInterval(blinkRef.current);
  }, [isAnimating]);

  useEffect(() => {
    if (!hasStarted) return;
    let cancelled = false;
    const delay = (ms) => new Promise(res => { animRef.current = setTimeout(res, ms); });
    const typeWord = async (w) => {
      setIsAnimating(true);
      for (let i = 0; i <= w.length; i++) {
        if (cancelled) return;
        setDisplayText(w.slice(0, i));
        await delay(70 + Math.random() * 40);
      }
    };
    const back = async (w) => {
      setIsAnimating(true);
      for (let i = w.length; i >= 0; i--) {
        if (cancelled) return;
        setDisplayText(w.slice(0, i));
        await delay(40 + Math.random() * 25);
      }
    };
    const run = async () => {
      while (!cancelled) {
        await typeWord(words[0]); setIsAnimating(false); await delay(2000); await back(words[0]); setIsAnimating(false); await delay(80);
        await typeWord(words[1]); setIsAnimating(false); await delay(2000); await back(words[1]); setIsAnimating(false); await delay(80);
      }
    };
    const t = setTimeout(run, 300);
    return () => { cancelled = true; clearTimeout(t); clearTimeout(animRef.current); clearInterval(blinkRef.current); };
  }, [hasStarted]);

  return (
    <div ref={textRef} data-testid="passion-typing-text">
      <h3
        data-testid="passion-heading"
        style={{
          fontFamily: 'Geist, Inter, sans-serif',
          fontSize: 'clamp(24px, 3vw, 44px)',
          fontWeight: 500,
          letterSpacing: '-0.025em',
          lineHeight: 1.05,
          color: '#0a1230',
          whiteSpace: 'nowrap',
        }}
      >
        <span>{staticText}</span>
        <span style={{ color: '#2b4c8c' }}>
          {displayText}
          <span
            className="inline-block ml-[1px] align-middle"
            style={{
              width: '3px',
              height: '0.72em',
              backgroundColor: '#2b4c8c',
              opacity: cursorVisible ? 1 : 0,
              transition: 'opacity 0.15s ease-in-out',
              marginBottom: '0.05em',
            }}
          />
        </span>
      </h3>
    </div>
  );
};

const AboutUs = () => {
  const location = useLocation();
  useDocumentTitle('About Us | Blubridge');
  useMetaDescription('How Blubridge came to life, what we stand for, and the principles guiding how we build AI from first principles.');

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 200);
    }
  }, [location]);

  return (
    <div style={{ background: '#f1f2fa' }} className="min-h-screen text-bb-ink" data-testid="about-page">

      {/* ============================================================
          HERO — Editorial split with technical annotations
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
          <div className="flex items-center justify-between pb-8 border-b border-bb-line bb-reveal">
            <span className="bb-eyebrow" data-testid="about-eyebrow">About Us</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-14 lg:pt-16 items-center">
            <div className="lg:col-span-8">
              <h1
                data-testid="hero-heading"
                className="bb-display bb-reveal bb-reveal-1"
                style={{ fontSize: 'clamp(44px, 7vw, 112px)' }}
              >
                Building the Next Frontier of AI
              </h1>
            </div>

            <div className="lg:col-span-4 space-y-6 bb-reveal bb-reveal-2">
              <p className="text-bb-ink text-[16px] leading-[1.75]" style={{ fontFamily: 'Inter, sans-serif' }}>
                We are an AI research and engineering company with consulting and applied AI programs, developing advanced machine learning systems from first principles. Our work spans model development, systems engineering, inference optimization, and deployment architecture, with technical rigor and reproducibility treated as core requirements. Model and system capabilities are advanced through disciplined research, controlled experimentation, and engineering-driven validation, translating mature capabilities into production AI solutions.
              </p>
              <Link to="/contact" className="bb-btn-primary" data-testid="hero-cta-btn">
                Get in touch <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
              </Link>
            </div>
          </div>

          {/* Full-bleed editorial image strip (existing hero asset, reframed) */}
          <div className="mt-16 border border-bb-line rounded-md overflow-hidden relative bb-reveal bb-reveal-3">
            <img
              src="https://customer-assets.emergentagent.com/job_ui-interactive-nav/artifacts/3g9ggy4y_SA7.jpg"
              alt="Building the Next Frontier of AI"
              className="w-full object-cover"
              style={{ height: 'clamp(200px, 30vh, 340px)' }}
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          OUR MISSION
          ============================================================ */}
      <section className="py-24" style={{ background: '#e8eaf3' }}>
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <h2 data-testid="our-mission-title" className="bb-h2" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
                Our Mission
              </h2>
            </div>

            <div className="lg:col-span-8">
              <p
                data-testid="our-mission-description"
                className="text-bb-ink text-[19px] leading-[1.75] max-w-[720px]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                We build AI systems for open ecosystems and enterprise environments with emphasis on open-weight models and applied AI capabilities engineered through disciplined training, evaluation rigor, and systems-aware design. Our mission is to advance AI as an engineering discipline grounded in measurable progress, reproducible methods, and technical correctness, with research and applied programs aligned to real-world operating constraints.
              </p>
              <div className="mt-10">
                <Link to="/careers" className="bb-btn-primary">
                  Join us <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW WE BUILD — Editorial four-block grid + typing accent
          ============================================================ */}
      <section className="py-24" style={{ background: '#f1f2fa' }} data-testid="what-sets-us-apart-section">
        <div className="bb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-end">
            <div className="lg:col-span-8">
              <h2 data-testid="what-sets-us-apart-heading" className="bb-h2" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
                How We Build, Engineer and Validate
              </h2>
            </div>
            <div className="lg:col-span-4">
              <PassionTypingText />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-bb-line">
            {[
              {
                num: '01',
                title: 'Our Purpose',
                body: 'BluBridge exists to advance AI research and translate it into deployable systems. Our efforts are application-driven and grounded in real infrastructure, data behavior, and operating constraints.'
              },
              {
                num: '02',
                title: 'How we Build',
                body: 'We build through structured experimentation, measurable evaluation, and system-level engineering. Development follows reproducible workflows, deployment-aware design criteria, and staged productionization.'
              },
              {
                num: '03',
                title: 'Innovation Through Rigor',
                body: 'Research is guided by technical depth, metric-based evaluation, and failure-mode analysis. Models and systems are validated for correctness, efficiency, and operating limits before broader deployment and operational use.'
              },
              {
                num: '04',
                title: 'Our People',
                body: 'We bring together expertise across model research, systems engineering, and AI infrastructure. Work is cross-stack, with end-to-end technical responsibility across training, runtime behavior, deployment systems, and applied AI solution programs.'
              }
            ].map((block, i) => (
              <article
                key={block.num}
                className={`p-8 lg:p-12 border-b border-bb-line ${i % 2 === 0 ? 'md:border-r border-bb-line' : ''}`}
              >
                <h3
                  className="mb-5 text-bb-ink"
                  style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(24px, 2.6vw, 34px)', fontWeight: 500, letterSpacing: '-0.02em' }}
                >
                  {block.title}
                </h3>
                <p className="text-bb-ink-2 text-[16px] leading-[1.75]">{block.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
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
