import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import AiConsulting from '../AiConsulting';
import './Consulting16.css';

/* /consulting-16 — dotted particle-wave hero on top of the unchanged /consulting enquiry content. */

const PALETTE = [[38, 92, 206], [96, 150, 226], [152, 154, 228], [202, 130, 192], [230, 148, 182]];
const colorAt = x => {
  const i = Math.min(PALETTE.length - 2, Math.floor(x * (PALETTE.length - 1)));
  const f = x * (PALETTE.length - 1) - i;
  const a = PALETTE[i]; const b = PALETTE[i + 1];
  return [a[0] + (b[0] - a[0]) * f | 0, a[1] + (b[1] - a[1]) * f | 0, a[2] + (b[2] - a[2]) * f | 0];
};
const height = (x, z) => 0.17 * Math.sin(1.25 * x + 0.9 * z) + 0.09 * Math.sin(0.8 * x - 1.4 * z + 1.3) + 0.05 * Math.sin(2.1 * x + 0.5 * z + 2.2);

function drawWave(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);
  const narrow = w < 720;
  const focal = Math.max(620, 0.54 * w);
  const cx = 0.5 * w;
  const top = 0.02 * h;
  const rows = narrow ? 76 : 132;
  const cols = narrow ? 460 : 920;
  const step = 17.2 / cols;
  for (let m = 0; m < rows; m++) {
    const t = m / (rows - 1);
    const depth = 8.5 * Math.pow(3 / 8.5, t);
    const scale = focal / depth;
    const r = Math.min(2.3, Math.max(0.65, 0.0065 * scale));
    const base = 0.34 + 0.62 * t;
    for (let k = 0; k <= cols; k++) {
      const x = k * step - 8.6;
      const px = cx + x * scale;
      if (px < -4 || px > w + 4) continue;
      const y = height(x, depth);
      const py = top + scale * (2.1 - y);
      if (py < -4 || py > h + 4) continue;
      const nx = px / w;
      let alpha = base * (0.7 + (y / 0.31) * 0.42) * Math.min(1, Math.min(nx, 1 - nx) / 0.035);
      if (alpha <= 0.015) continue;
      if (alpha > 0.95) alpha = 0.95;
      const c = colorAt(nx);
      ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, 6.2832);
      ctx.fill();
    }
  }
}

function WaveCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth; const h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr)); canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawWave(ctx, w, h);
    };
    render();
    const ro = new ResizeObserver(render);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);
  return <canvas ref={ref} className="c16-hero-canvas" data-testid="c16-hero-canvas" />;
}

export default function Consulting16() {
  const toForm = () => {
    const target = document.querySelector('[data-testid="aic-eyebrow"]')?.closest('header') || document.querySelector('[data-testid="aic-form"]');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => document.querySelector('[data-testid="aic-form"] input, [data-testid="aic-form"] button')?.focus({ preventScroll: true }), 700);
  };
  return <div className="c16-page" data-testid="consulting16-page">
    <section className="c16-hero" data-testid="c16-hero">
      <div className="c16-hero-bg" aria-hidden="true"><WaveCanvas /></div>
      <p className="c16-hero-eyebrow" data-testid="c16-hero-eyebrow">ENTERPRISE AI CONSULTING</p>
      <p className="c16-hero-title" role="heading" aria-level="2" data-testid="c16-hero-title">AI Consulting <span className="c16-accent">Services</span></p>
      <span className="c16-hero-rule" aria-hidden="true" />
      <p className="c16-hero-desc" data-testid="c16-hero-desc">BluBridge’s AI consulting services help enterprises identify high-value AI opportunities, build implementation roadmaps, and set up governance frameworks. From initial assessment to post-deployment support, we bring structure and clarity to every AI initiative we take on.</p>
      <button type="button" className="c16-hero-cta" onClick={toForm} data-testid="c16-hero-cta">Consult Our AI Experts <ArrowRight size={18} aria-hidden="true" /></button>
    </section>
    <div id="c16-enquiry" className="c16-enquiry"><AiConsulting /></div>
  </div>;
}
