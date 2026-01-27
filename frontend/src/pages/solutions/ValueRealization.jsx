import React, { useState,useEffect,useRef } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Zap, LayoutGrid, Play } from 'lucide-react';

const ValueRealization = () => {
  const [openFaq, setOpenFaq] = useState(null);

   const canvasRef = useRef(null);
  const heroRef = useRef(null);

    // Animated flowing orange 3D background for hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    // let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const drawFlowingBackground = () => {
      time += 0.006;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Create flowing fabric/wave effect with orange tones
      for (let layer = 0; layer < 6; layer++) {
        const layerOffset = layer * 0.15;
        const amplitude = 80 + layer * 20;
        const frequency = 0.003 + layer * 0.001;
        
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        for (let x = 0; x <= width; x += 3) {
          const wave1 = Math.sin(x * frequency + time + layerOffset) * amplitude;
          const wave2 = Math.sin(x * frequency * 1.5 + time * 0.8 + layerOffset) * (amplitude * 0.5);
          const wave3 = Math.cos(x * frequency * 0.5 + time * 1.2 + layerOffset) * (amplitude * 0.3);
          const y = height * 0.4 + wave1 + wave2 + wave3 - layer * 30;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        // Orange gradient for each layer
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        const alpha = 0.15 - layer * 0.02;
        gradient.addColorStop(0, `rgba(180, 80, 20, ${alpha})`);
        gradient.addColorStop(0.3, `rgba(200, 100, 40, ${alpha + 0.05})`);
        gradient.addColorStop(0.6, `rgba(160, 60, 15, ${alpha})`);
        gradient.addColorStop(1, `rgba(120, 40, 10, ${alpha - 0.03})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Add folded/twisted ribbon shapes
      for (let i = 0; i < 3; i++) {
        const ribbonX = width * (0.6 + i * 0.15);
        const ribbonY = height * 0.3;
        const ribbonSize = 100 + i * 40;
        
        ctx.save();
        ctx.translate(ribbonX, ribbonY);
        ctx.rotate(time * 0.2 + i * 0.5);
        
        const ribbonGradient = ctx.createLinearGradient(-ribbonSize, -ribbonSize, ribbonSize, ribbonSize);
        ribbonGradient.addColorStop(0, `rgba(200, 100, 30, ${0.3 - i * 0.08})`);
        ribbonGradient.addColorStop(0.5, `rgba(220, 120, 50, ${0.4 - i * 0.1})`);
        ribbonGradient.addColorStop(1, `rgba(150, 60, 20, ${0.2 - i * 0.05})`);
        
        ctx.beginPath();
        ctx.moveTo(-ribbonSize, 0);
        ctx.bezierCurveTo(
          -ribbonSize * 0.5, -ribbonSize * (0.8 + Math.sin(time + i) * 0.3),
          ribbonSize * 0.5, ribbonSize * (0.6 + Math.cos(time + i) * 0.3),
          ribbonSize, 0
        );
        ctx.bezierCurveTo(
          ribbonSize * 0.5, ribbonSize * (0.4 + Math.sin(time + i) * 0.2),
          -ribbonSize * 0.5, -ribbonSize * (0.3 + Math.cos(time + i) * 0.2),
          -ribbonSize, 0
        );
        ctx.closePath();
        ctx.fillStyle = ribbonGradient;
        ctx.fill();
        
        ctx.restore();
      }

      // Floating particles
      for (let i = 0; i < 20; i++) {
        const px = (Math.sin(time * 0.4 + i * 0.6) + 1) * width * 0.3 + width * 0.5;
        const py = (Math.cos(time * 0.3 + i * 0.7) + 1) * height * 0.4;
        const size = 2 + Math.sin(time + i) * 1.5;
        
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 150, 80, ${0.3 + Math.sin(time + i) * 0.15})`;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(drawFlowingBackground);
    };

    resize();
    window.addEventListener('resize', resize);
    drawFlowingBackground();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

    // Animated line graph for hero right side
  const GraphVisualization = () => {
    const graphCanvasRef = useRef(null);
    
    useEffect(() => {
      const canvas = graphCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let animationFrame;
      // let time = 0;

      const resize = () => {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      };

      // const drawGraph = () => {
      //   // time += 0.02;
      //   ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      //   const width = canvas.offsetWidth;
      //   const height = canvas.offsetHeight;
      //   const padding = 40;

      //   // Background grid
      //   ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      //   ctx.lineWidth = 1;
      //   for (let i = 0; i <= 5; i++) {
      //     const y = padding + (height - padding * 2) * (i / 5);
      //     ctx.beginPath();
      //     ctx.moveTo(padding, y);
      //     ctx.lineTo(width - padding, y);
      //     ctx.stroke();
      //   }

      //   // Animated line chart
      //   const points = [];
      //   for (let i = 0; i <= 20; i++) {
      //     const x = padding + (width - padding * 2) * (i / 20);

      //     const startLevel = 0.15;   // lower start (near bottom)
      //     const endLevel = 1.25;     // higher end (near top)
      //     const progress = i / 20;  // normalize 0 → 1
      //     const baseY =  height -  padding - (height - padding * 2) * (startLevel + (endLevel - startLevel) * progress);
      //     // const baseY = height - padding - (height - padding * 2) * (0.3 + i * 0.025);
      //     // const wave = Math.sin(time + i * 0.3) * 10;
      //     const isEdge = i === 0 || i === 20;
      //     // const wave = isEdge ? 0 : Math.sin(time + i * 0.3) * 10;
      //     const wave = 0;
      //     const y = baseY + wave;
      //     points.push({ x, y });
      //   }

      //   // Fill area under curve
      //   const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
      //   gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
      //   gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
      //   ctx.beginPath();
      //   ctx.moveTo(points[0].x, height - padding);
      //   points.forEach(p => ctx.lineTo(p.x, p.y));
      //   ctx.lineTo(points[points.length - 1].x, height - padding);
      //   ctx.closePath();
      //   ctx.fillStyle = gradient;
      //   ctx.fill();

      //   // Draw line
      //   ctx.beginPath();
      //   ctx.moveTo(points[0].x, points[0].y);
      //   points.forEach(p => ctx.lineTo(p.x, p.y));
      //   ctx.strokeStyle = '#3b82f6';
      //   ctx.lineWidth = 2;
      //   ctx.stroke();

      //   // Draw points
      //   points.forEach((p, i) => {
      //     if (i % 4 === 0) {
      //       ctx.beginPath();
      //       ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      //       ctx.fillStyle = '#3b82f6';
      //       ctx.fill();
      //       ctx.beginPath();
      //       ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      //       ctx.fillStyle = '#fff';
      //       ctx.fill();
      //     }
      //   });

      //   // animationFrame = requestAnimationFrame(drawGraph);
      // };

      const drawGraph = () => {
  ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  const padding = 40;

  // Background grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const y = padding + (height - padding * 2) * (i / 5);
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  // ---------- FIXED CURVY DATA ----------
  const points = [];
const totalPoints = 20;

// 🔒 FIXED START & END POSITIONS
const startY = height - padding - 20;   // VERY LOW (bottom)
// const endY = padding + 20;              // VERY HIGH (top)
const endY = padding - 30;     // peak high (safe limit)

for (let i = 0; i <= totalPoints; i++) {
  const x = padding + (width - padding * 2) * (i / totalPoints);

  const t = i / totalPoints;

  // Smooth curve easing
  // const eased = t * t * (3 - 2 * t); // smoothstep
  // const eased = Math.pow(t, 1.5); // faster rise
const eased = t * t * t; // slow start, strong finish
  const y = startY - (startY - endY) * eased;

  points.push({ x, y });
}

  // ---------- FILL AREA ----------
  const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
  gradient.addColorStop(0, 'rgba(59, 130, 246, 0.25)');
  gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, height - padding);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, height - padding);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // ---------- SMOOTH CURVE ----------
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }

  // Final segment
  const last = points.length - 1;
  ctx.quadraticCurveTo(
    points[last - 1].x,
    points[last - 1].y,
    points[last].x,
    points[last].y
  );

  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  ctx.stroke();

  // ---------- OPTIONAL DOTS ----------
  points.forEach((p, i) => {
    if (i % 5 === 0) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();
    }
  });
};


      resize();
      window.addEventListener('resize', resize);
      drawGraph();

      return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrame);
      };
    }, []);

    return (
      <div className="relative bg-white rounded-xl border border-[#D6DEC3] p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[#2F3A4A]">Value Growth</span>
          <span className="text-xs text-[#2F3A4A]">Real-Time Impact</span>
        </div>
        <canvas ref={graphCanvasRef} className="w-full h-[200px]" />
        <div className="flex justify-between mt-2 text-xs text-[#6B7280]">
          <span>Initial ROI</span>
          <span>Peak ROI</span>
        </div>
      </div>
    );
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useDocumentTitle('AI Value Realization Solutions & Measurable ROI | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      {/* SECTION 1: Hero Section */}
      <section className="relative flex flex-col overflow-hidden">
        {/* Background - Horizontal Gradient */}
        <div 
          className="absolute inset-0 overflow-hidden" 
          style={{
            background: '#fffdf7'
          }}
        />

        {/* Hero content - Two column layout */}
        <div className="container-custom relative z-10 flex-1 flex items-center mt-6 mb-4 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1F3B] mb-8 leading-tight tracking-tight">
                Value Realization
              </h1>
              <p className="text-lg lg:text-xl text-[#0B1F3B] mb-10 leading-relaxed">
                Turn AI investments into measurable business impact. BluBridge helps you convert experimentation into outcomes, accelerating adoption, reducing friction, and ensuring every model delivers tangible value across operations, products, and decision-making.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-7 py-3 rounded-md font-medium text-base">
                    Get Started
                  </Button>
                </Link>
                {/* <Link to="/contact" className="flex items-center gap-2 px-6 py-3 text-[#0B1F3B] hover:text-[#328CC1] transition-colors font-medium">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link> */}
              </div>
            </div>
            {/* Right - Animated Graph Visual */}
            <div className="relative" style={{ animation: 'fadeInRight 1s ease-out 0.4s both' }}>
              <GraphVisualization />
            </div>
            {/* Right - Premium Value Realization Visual */}
            {/* <div className="relative h-[450px] lg:h-[520px] flex items-center justify-center">
              <div className="relative w-full max-w-[520px] h-full">
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl" />
                
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div 
                    className="relative w-32 h-32 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #0B1F3B 0%, #1a3a5f 100%)',
                      boxShadow: '0 0 60px rgba(11, 31, 59, 0.4), 0 0 100px rgba(50, 140, 193, 0.2), inset 0 2px 20px rgba(255,255,255,0.1)'
                    }}
                  >
                    <div className="text-center">
                      <div className="text-white text-2xl font-bold" style={{ animation: 'countUp 2s ease-out forwards' }}>ROI</div>
                      <div className="text-[#32CD32] text-sm font-semibold">+247%</div>
                    </div>
                   
                    <div 
                      className="absolute inset-[-12px] rounded-full border-2 border-dashed border-[#328CC1]/40"
                      style={{ animation: 'spin 25s linear infinite' }}
                    />
                    
                    <div 
                      className="absolute inset-[-4px] rounded-full border border-[#32CD32]/30"
                      style={{ animation: 'pulse 2s ease-in-out infinite' }}
                    />
                  </div>
                </div>
                
               
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520">
                  <ellipse cx="260" cy="260" rx="180" ry="180" fill="none" stroke="url(#valueOrbit)" strokeWidth="1" strokeDasharray="8 4" opacity="0.3">
                    <animateTransform attributeName="transform" type="rotate" from="0 260 260" to="360 260 260" dur="60s" repeatCount="indefinite"/>
                  </ellipse>
                  <ellipse cx="260" cy="260" rx="130" ry="130" fill="none" stroke="url(#valueOrbit)" strokeWidth="1" opacity="0.2"/>
                  
                  <defs>
                    <linearGradient id="valueOrbit" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#328CC1" stopOpacity="0.6"/>
                      <stop offset="50%" stopColor="#32CD32" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#328CC1" stopOpacity="0.6"/>
                    </linearGradient>
                  </defs>
                </svg>
                
                
                <div className="absolute top-4 left-1/2 -translate-x-1/2" style={{ animation: 'floatMetric1 5s ease-in-out infinite' }}>
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-[#E5E7EB] min-w-[140px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                        </svg>
                      </div>
                      <span className="text-xs text-[#6B7280] font-medium">Efficiency</span>
                    </div>
                    <div className="text-xl font-bold text-[#0B1F3B]">+42%</div>
                    <div className="w-full h-1 bg-[#E5E7EB] rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%', animation: 'growBar 2s ease-out forwards' }}/>
                    </div>
                  </div>
                </div>
                
                
                <div className="absolute top-1/2 -translate-y-1/2 right-0" style={{ animation: 'floatMetric2 6s ease-in-out infinite' }}>
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-[#E5E7EB] min-w-[140px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <span className="text-xs text-[#6B7280] font-medium">Revenue</span>
                    </div>
                    <div className="text-xl font-bold text-[#0B1F3B]">$2.4M</div>
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-xs text-green-500 font-medium">+18%</span>
                    </div>
                  </div>
                </div>
                
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2" style={{ animation: 'floatMetric3 5.5s ease-in-out infinite' }}>
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-[#E5E7EB] min-w-[140px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                      </div>
                      <span className="text-xs text-[#6B7280] font-medium">Adoption</span>
                    </div>
                    <div className="text-xl font-bold text-[#0B1F3B]">89%</div>
                    <div className="flex gap-1 mt-2">
                      {[1,2,3,4,5].map((i) => (
                        <div key={i} className={`w-6 h-1.5 rounded-full ${i <= 4 ? 'bg-purple-500' : 'bg-[#E5E7EB]'}`} style={{ animation: `fadeIn ${0.2 * i}s ease-out forwards` }}/>
                      ))}
                    </div>
                  </div>
                </div>
                
                
                <div className="absolute top-1/2 -translate-y-1/2 left-0" style={{ animation: 'floatMetric4 6.5s ease-in-out infinite' }}>
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-[#E5E7EB] min-w-[140px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                      </div>
                      <span className="text-xs text-[#6B7280] font-medium">Savings</span>
                    </div>
                    <div className="text-xl font-bold text-[#0B1F3B]">$840K</div>
                    <div className="text-xs text-teal-500 mt-1">Annual Cost Reduction</div>
                  </div>
                </div>
                
                
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: `${3 + (i % 3)}px`,
                        height: `${3 + (i % 3)}px`,
                        background: i % 2 === 0 ? '#328CC1' : '#32CD32',
                        left: `${15 + (i * 5)}%`,
                        top: `${20 + ((i % 4) * 18)}%`,
                        opacity: 0.4,
                        animation: `particleFloat${i % 4} ${4 + (i % 3)}s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`
                      }}
                    />
                  ))}
                </div>
              </div>
              
              
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                  0%, 100% { transform: scale(1); opacity: 0.3; }
                  50% { transform: scale(1.1); opacity: 0.6; }
                }
                @keyframes floatMetric1 {
                  0%, 100% { transform: translateX(-50%) translateY(0); }
                  50% { transform: translateX(-50%) translateY(-8px); }
                }
                @keyframes floatMetric2 {
                  0%, 100% { transform: translateY(-50%) translateX(0); }
                  50% { transform: translateY(-50%) translateX(-8px); }
                }
                @keyframes floatMetric3 {
                  0%, 100% { transform: translateX(-50%) translateY(0); }
                  50% { transform: translateX(-50%) translateY(8px); }
                }
                @keyframes floatMetric4 {
                  0%, 100% { transform: translateY(-50%) translateX(0); }
                  50% { transform: translateY(-50%) translateX(8px); }
                }
                @keyframes growBar {
                  from { width: 0%; }
                  to { width: 75%; }
                }
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                @keyframes particleFloat0 {
                  0% { transform: translate(0, 0); opacity: 0.3; }
                  50% { transform: translate(15px, -20px); opacity: 0.6; }
                  100% { transform: translate(0, 0); opacity: 0.3; }
                }
                @keyframes particleFloat1 {
                  0% { transform: translate(0, 0); opacity: 0.4; }
                  50% { transform: translate(-20px, 15px); opacity: 0.7; }
                  100% { transform: translate(0, 0); opacity: 0.4; }
                }
                @keyframes particleFloat2 {
                  0% { transform: translate(0, 0); opacity: 0.3; }
                  50% { transform: translate(20px, 20px); opacity: 0.5; }
                  100% { transform: translate(0, 0); opacity: 0.3; }
                }
                @keyframes particleFloat3 {
                  0% { transform: translate(0, 0); opacity: 0.5; }
                  50% { transform: translate(-15px, -15px); opacity: 0.7; }
                  100% { transform: translate(0, 0); opacity: 0.5; }
                }
              `}</style>
            </div> */}
          </div>
        </div>
      </section>

      {/* SECTION 2: Value Highlights - 3 Column Strip */}
      <section className="py-16 bg-[#efede5] border-t border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Optimised Business Impact</h3>
              <p className="text-[#4B5563] text-md leading-relaxed">
                Align models with real-world goals, ensuring every deployment drives operational or revenue outcomes.
              </p>
            </div>
            <div className="border-l border-[#D6DEC3] pl-12">
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Simplified Execution</h3>
              <p className="text-[#4B5563] text-md leading-relaxed">
                Streamline the journey from proof-of-concept to production with guided workflows and built-in best practices.
              </p>
            </div>
            <div className="border-l border-[#D6DEC3] pl-12">
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Versatile Platform</h3>
              <p className="text-[#4B5563] text-md leading-relaxed">
                Apply AI across teams, products, and industries using a flexible foundation that adapts to evolving needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Statistics Section */}
      
      {/* SECTION 3: Speed up time-to-value Section */}
      <section className="bg-[#fffdf7] py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#328CC1] text-sm font-medium mb-3 uppercase tracking-wider">BLUBRIDGE PLATFORM</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-6 leading-tight">
                Speed up time-to-value
              </h2>
              <p className="text-base text-[#2F3A4A] leading-relaxed mb-6">
                Value is realized only when models are adopted, trusted, and embedded into workflows. BluBridge bridges the gap between innovation and impact by unifying experimentation, deployment, and measurement in one platform.
              </p>
              <p className="text-base text-[#2F3A4A] leading-relaxed mb-6">
                Teams can validate use cases quickly, integrate models into real processes, and track performance against business goals. Built-in tooling ensures every iteration moves closer to outcomes, whether improving efficiency, accuracy, or customer experience.
              </p>
              <p className="text-base text-[#2F3A4A] leading-relaxed mb-8">
                From first pilot to enterprise rollout, BluBridge transforms AI into a dependable growth engine.
              </p>

              
            </div>

            {/* Right side - Grid Labels */}
            <div className="flex items-start justify-center lg:pt-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                {['Use Case', 'Workflow', 'Decision', 'Insight', 'Impact', 'Outcome', 'Metric', 'ROI', 'Value', 'Analytics', 'Strategy', 'Growth'].map((label, i) => {
                  const colors = [
                    'bg-purple-100 text-purple-700',
                    'bg-orange-100 text-orange-700',
                    'bg-teal-100 text-teal-700',
                    'bg-pink-100 text-pink-700',
                    'bg-yellow-100 text-yellow-700',
                    'bg-blue-100 text-blue-700',
                    'bg-gray-100 text-gray-700',
                    'bg-green-100 text-green-700',
                    'bg-indigo-100 text-indigo-700',
                    'bg-cyan-100 text-cyan-700',
                    'bg-rose-100 text-rose-700',
                    'bg-emerald-100 text-emerald-700'
                  ];
                  return (
                    <div 
                      key={i} 
                      className={`${colors[i]} rounded-lg px-4 py-6 text-center font-semibold text-sm`}
                    >
                      {label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Value Stack - Table Format */}
      <section className="py-20 bg-[#efede5]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0B1F3B]">
            Value Stack
          </h2>
          <p className="text-[#4B5563] mb-12 max-w-5xl">
            BluBridge provides a complete technology stack for delivering measurable AI value across your organization.
          </p>
          
          {/* Table Format Layout - 4 Columns */}
          <div className="rounded-xl overflow-hidden border border-[#E5E7EB]">
            {/* Horizontal scroll wrapper for mobile */}
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Header Row - Dark Background */}
                <div className="bg-[#0B1F3B] grid grid-cols-4">
                  <div className="px-5 py-4 text-white text-xs font-bold uppercase tracking-wider border-r border-[#1a3a5f]">
                    OBSERVABILITY
                  </div>
                  <div className="px-5 py-4 text-white text-xs font-bold uppercase tracking-wider border-r border-[#1a3a5f]">
                    MONITORING
                  </div>
                  <div className="px-5 py-4 text-white text-xs font-bold uppercase tracking-wider border-r border-[#1a3a5f]">
                    DEPLOYMENT INSIGHTS
                  </div>
                  <div className="px-5 py-4 text-white text-[10px] font-bold uppercase tracking-wider">
                    INFERENCE ANALYTICS & AUTOMATION
                  </div>
                </div>
                
                {/* Data Rows - White Background */}
                {[
                  ['Training Metrics', 'Model Performance', 'Model Serving Metrics', 'Data Feedback Loops'],
                  ['Evaluation Metrics', 'Drift Detection', 'Inference Latency Tracking', 'Cost Monitoring'],
                  ['Logs & Traces', 'Error Analysis', 'Throughput Analytics', 'Performance Dashboards'],
                  ['Dashboard Analytics', 'A/B Testing', 'Resource Utilization', 'Alerts & Auto-Remediation'],
                  ['Data Lineage', 'Bias & Fairness Tracking', 'SLA Monitoring', 'Continuous Improvement Pipelines']
                ].map((row, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-4 bg-white border-b border-[#E5E7EB] last:border-b-0">
                    {row.map((cell, cellIndex) => (
                      <div 
                        key={cellIndex} 
                        className={`px-5 py-3 text-[#212529] text-sm ${cellIndex < 3 ? 'border-r border-[#E5E7EB]' : ''}`}
                      >
                        {cell && (
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-[#32CD32] rounded-full flex-shrink-0" />
                            <span className="text-xs">{cell}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Performance Metrics */}
{/* <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="text-center p-8 bg-[#efede5] rounded-xl">
              <div className="text-5xl lg:text-6xl font-bold text-[#0B1F3B] mb-4">3.7×</div>
              <h3 className="text-lg font-semibold text-[#328CC1] mb-3 uppercase tracking-wider">ROI Per Dollar</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Enterprises report an average 3.7× return on every dollar invested in AI, with top adopters exceeding 10× ROI.
              </p>
            </div>
            
           
            <div className="text-center p-8 bg-[#efede5] rounded-xl">
              <div className="text-5xl lg:text-6xl font-bold text-[#0B1F3B] mb-4">60%</div>
              <h3 className="text-lg font-semibold text-[#328CC1] mb-3 uppercase tracking-wider">ROI & Efficiency Boost</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                In a 2025 PwC survey, 60% of executives say AI boosts ROI and operational efficiency.
              </p>
            </div>
            
            
            <div className="text-center p-8 bg-[#efede5] rounded-xl">
              <div className="text-5xl lg:text-6xl font-bold text-[#0B1F3B] mb-4">72%</div>
              <h3 className="text-lg font-semibold text-[#328CC1] mb-3 uppercase tracking-wider">Formal ROI Tracking</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Nearly three-quarters of business leaders formally measure ROI for generative AI, focusing on productivity and profitability.
              </p>
            </div>
            
           
            <div className="text-center p-8 bg-[#efede5] rounded-xl">
              <div className="text-5xl lg:text-6xl font-bold text-[#0B1F3B] mb-4">67%</div>
              <h3 className="text-lg font-semibold text-[#328CC1] mb-3 uppercase tracking-wider">Positive AI ROI</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                In IT-centric studies, 67% of respondents report positive ROI from AI initiatives, with only 3% negative.
              </p>
            </div>
          </div>
        </div>
      </section> */}



      {/* <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#000000] mb-16">Measurable Impact AI at Scale</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="border-l border-[#D6DEC3] pl-6">
              <div className="text-4xl lg:text-5xl font-bold text-[#000000] mb-1">3.7×</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">ROI PER DOLLAR</div>
             <p className="text-[#000000] text-sm leading-relaxed">  Enterprises report an average 3.7× return on every dollar invested in AI, with top adopters exceeding 10× ROI.</p> 
            </div>
            <div className="border-l border-[#D6DEC3] pl-6">
              <div className="text-4xl lg:text-5xl font-bold text-[#000000] mb-1">60%</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">ROI & EFFICIENCY BOOST</div>
            <p className="text-[#000000] text-sm leading-relaxed">In a 2025 PwC survey, 60% of executives say AI boosts ROI and operational efficiency. </p>
            </div>
            <div className="border-l border-[#D6DEC3] pl-6">
              <div className="text-4xl lg:text-5xl font-bold text-[#000000] mb-1">72%</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">FORMAL ROI TRACKING</div>
            <p className="text-[#000000] text-sm leading-relaxed">FORMAL ROI TRACKING</p>
            </div>
           <div className="border-l border-[#D6DEC3] pl-6">
              <div className="text-4xl lg:text-5xl font-bold text-[#000000] mb-1">67%</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">POSITIVE AI ROI</div>
             <p className="text-[#000000] text-sm leading-relaxed">In IT-centric studies, 67% of respondents report positive ROI from AI initiatives, with only 3% negative.</p> 
            </div>
          </div>
        </div>
      </section> */}


      {/* SECTION 7: More Solutions */}
      {/* <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-light mb-4 text-[#0B1F3B]">More Solutions</h2>
            <p className="text-[#2F3A4A] max-w-2xl">
              BluBridge accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5">
          
            <Link to="/solutions/training">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/tbqd1w9m_Training.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-md">TRAINING</span>
                </div>
              </div>
            </Link>

          
            <Link to="/solutions/ai-development">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/u12c3np1_AI%20Development.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-md">AI DEVELOPMENT</span>
                </div>
              </div>
            </Link>

          
            <Link to="/solutions/fine-tuning">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/2qvmu3rl_INFERENCE.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-md">FINE-TUNING</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section> */}

      {/* SECTION 8: FAQs */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">FAQs</h2>
          <div className="max-w-4xl space-y-3">
            {[
              {
                question: "What makes BluBridge's Value Realization approach different?",
                answer: "BluBridge focuses on business outcomes rather than just technical metrics. Our platform unifies experimentation, deployment, and measurement, ensuring every AI initiative is tied to measurable impact across operations, revenue, and customer experience."
              },
              {
                question: "How does BluBridge accelerate time-to-value?",
                answer: "Through pre-built use-case blueprints, guided workflows, and built-in best practices, BluBridge reduces the time from proof-of-concept to production. Teams can validate use cases quickly and track performance against business goals in real-time."
              },
              {
                question: "What industries benefit from Value Realization?",
                answer: "Value Realization is applicable across all sectors including finance, healthcare, manufacturing, retail, and technology. Any organization looking to convert AI experimentation into measurable business outcomes can benefit from our platform."
              },
              {
                question: "How do you measure AI value?",
                answer: "BluBridge provides comprehensive outcome tracking with customizable metrics tied to your business goals. Whether measuring efficiency gains, cost reductions, revenue impact, or customer satisfaction improvements, our platform provides clear visibility into AI ROI."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#D6DEC3]">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-emerald-400 transition-colors"
                >
                  <span className="text-base font-medium text-[#0B1F3B] pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <Minus className="w-4 h-4 text-gray-700" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-700" />
                    )}
                  </div>
                </button>
                {openFaq === i && (
                  <div className="pb-6">
                    <p className="text-[#6B7280] text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Bottom CTA */}
      <section className="py-16 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white">
            {/* Access thousands of GPUs tailored to your requirements. */}
            Know more about our Research 
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/research">
              <Button className="bg-white text-[#0B1F3B] hover:bg-[#f3f1e9] px-4 py-3 rounded font-medium">
                Explore
              </Button>
            </Link>
            {/* <Link to="/contact">
              <Button className="bg-white text-[#0B1F3B] hover:bg-[#f3f1e9] px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium px-6 py-0">
              Contact <ArrowRight className="w-4 h-4" />
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ValueRealization;
