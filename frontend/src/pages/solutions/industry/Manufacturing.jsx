import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid, Cpu } from 'lucide-react';

const Manufacturing = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Animated parallax for hero section
  useEffect(() => {
    let animationFrame;
    let time = 0;

    const animate = () => {
      time += 0.005;
      setOffset({
        x: Math.sin(time) * 10,
        y: Math.cos(time * 0.7) * 8
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Canvas animation for industrial/manufacturing forms
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrame;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const drawManufacturingForms = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width * 0.5;
      const centerY = height * 0.45;

      // Draw robotic arm base
      const baseX = centerX;
      const baseY = height * 0.75;
      const armAngle = Math.sin(time * 0.5) * 0.3;

      // Base platform
      ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
      ctx.beginPath();
      ctx.ellipse(baseX, baseY, 60, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Arm segments
      const segment1Length = 100;
      const segment2Length = 80;
      const segment1Angle = -Math.PI / 3 + armAngle;
      const segment2Angle = segment1Angle + Math.PI / 4 + Math.sin(time * 0.7) * 0.2;

      const joint1X = baseX + Math.cos(segment1Angle) * segment1Length;
      const joint1Y = baseY + Math.sin(segment1Angle) * segment1Length;
      const joint2X = joint1X + Math.cos(segment2Angle) * segment2Length;
      const joint2Y = joint1Y + Math.sin(segment2Angle) * segment2Length;

      // Draw arm segment 1
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(baseX, baseY - 10);
      ctx.lineTo(joint1X, joint1Y);
      ctx.stroke();

      // Draw arm segment 2
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(joint1X, joint1Y);
      ctx.lineTo(joint2X, joint2Y);
      ctx.stroke();

      // Joints
      ctx.fillStyle = 'rgba(251, 191, 36, 0.6)';
      ctx.beginPath();
      ctx.arc(baseX, baseY - 10, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(joint1X, joint1Y, 10, 0, Math.PI * 2);
      ctx.fill();

      // End effector / gripper
      const gripperOpen = Math.sin(time * 2) * 5 + 10;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(joint2X, joint2Y);
      ctx.lineTo(joint2X - gripperOpen, joint2Y + 20);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(joint2X, joint2Y);
      ctx.lineTo(joint2X + gripperOpen, joint2Y + 20);
      ctx.stroke();

      // Draw conveyor belt
      const conveyorY = height * 0.85;
      ctx.fillStyle = 'rgba(107, 114, 128, 0.3)';
      ctx.fillRect(0, conveyorY, width, 20);
      
      // Conveyor belt segments
      const beltSegments = 12;
      for (let i = 0; i < beltSegments; i++) {
        const segX = ((time * 50 + i * (width / beltSegments)) % width);
        ctx.fillStyle = 'rgba(156, 163, 175, 0.4)';
        ctx.fillRect(segX, conveyorY + 2, 8, 16);
      }

      // Draw floating factory elements
      const factoryElements = [
        { x: centerX - 120, y: centerY - 100, type: 'gear' },
        { x: centerX + 100, y: centerY - 60, type: 'box' },
        { x: centerX - 80, y: centerY + 30, type: 'sensor' },
        { x: centerX + 80, y: centerY + 50, type: 'gear' }
      ];

      factoryElements.forEach((elem, i) => {
        const floatOffset = Math.sin(time + i * 1.5) * 12;
        const elemX = elem.x;
        const elemY = elem.y + floatOffset;

        if (elem.type === 'gear') {
          // Draw gear
          const gearRadius = 20;
          const teeth = 8;
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(elemX, elemY, gearRadius - 5, 0, Math.PI * 2);
          ctx.stroke();
          
          // Gear teeth
          for (let t = 0; t < teeth; t++) {
            const angle = (t / teeth) * Math.PI * 2 + time;
            ctx.beginPath();
            ctx.moveTo(
              elemX + Math.cos(angle) * (gearRadius - 5),
              elemY + Math.sin(angle) * (gearRadius - 5)
            );
            ctx.lineTo(
              elemX + Math.cos(angle) * (gearRadius + 5),
              elemY + Math.sin(angle) * (gearRadius + 5)
            );
            ctx.stroke();
          }
        } else if (elem.type === 'box') {
          // Draw product box
          ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(elemX - 15, elemY - 15, 30, 30, 4);
          ctx.fill();
          ctx.stroke();
        } else if (elem.type === 'sensor') {
          // Draw sensor/camera
          ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
          ctx.beginPath();
          ctx.arc(elemX, elemY, 12, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
          ctx.stroke();
          
          // Sensor beam
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 + Math.sin(time * 3) * 0.1})`;
          ctx.beginPath();
          ctx.moveTo(elemX, elemY + 12);
          ctx.lineTo(elemX - 30, elemY + 50);
          ctx.lineTo(elemX + 30, elemY + 50);
          ctx.closePath();
          ctx.stroke();
        }
      });

      // Draw data particles
      for (let i = 0; i < 15; i++) {
        const particleX = (Math.sin(time * 0.4 + i * 2.5) + 1) * width * 0.5;
        const particleY = (Math.cos(time * 0.3 + i * 1.8) + 1) * height * 0.35 + height * 0.1;
        const size = 2 + Math.sin(time + i) * 1;
        
        ctx.beginPath();
        ctx.arc(particleX, particleY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${0.3 + Math.sin(time * 2 + i) * 0.2})`;
        ctx.fill();
      }

      // Draw grid lines
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const gridY = height * 0.2 + i * height * 0.12;
        ctx.beginPath();
        ctx.moveTo(0, gridY);
        ctx.lineTo(width, gridY);
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(drawManufacturingForms);
    };

    resize();
    drawManufacturingForms();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* ANIMATED HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0805] via-[#080604] to-[#000000]" />
        
        {/* Animated manufacturing forms canvas */}
        <canvas 
          ref={canvasRef}
          className="absolute right-0 top-0 w-[55%] h-full opacity-80"
          style={{ 
            pointerEvents: 'none',
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />

        {/* Ambient glow */}
        <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-amber-500/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDuration: '5s' }} />

        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              MANUFACTURING
            </h1>
            <p className="text-lg lg:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
              BluBrg empowers manufacturers with GPU-accelerated AI solutions for simulation, predictive maintenance, quality control, and process optimisation. Our platform enables smarter factories with real-time analytics, digital twins, and intelligent automation that drive operational excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#0a0805] px-10 py-6 text-base font-medium rounded-md">
                  Get Started
                </Button>
              </Link>
              <Link to="/contact">
                <button className="text-white hover:text-white/80 px-6 py-6 text-base font-medium transition-colors flex items-center gap-2">
                  Contact Sales <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Value Propositions */}
      <section className="py-16 bg-[#050505] border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Enhanced Simulation</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Leverage faster and more accurate simulations for manufacturing processes, such as finite element analysis (FEA), computational fluid dynamics (CFD), and digital twin modelling.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Improved Predictive Maintenance</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                By leveraging GPU-powered AI and machine learning, manufacturers can analyse vast amounts of sensor data in real-time to predict and prevent equipment failures.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Streamlined Automation</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                BluBrg supports advanced AI algorithms for robotics and automation, enabling smarter and more efficient manufacturing processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Uses Section */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-amber-500 text-sm font-medium mb-3 uppercase tracking-wider">STREAMLINE OPERATIONS</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Example uses</h2>
            <p className="text-base text-white/60 max-w-3xl">
              Discover how manufacturers leverage BluBrg's GPU infrastructure to transform production, reduce downtime, and achieve operational excellence through AI-powered solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Predictive Maintenance Models */}
            <div className="border-l-2 border-amber-500 pl-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Predictive Maintenance Models</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Equipment Health Monitoring</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Deploy AI models that analyse sensor data in real-time to predict equipment failures before they occur. Reduce unplanned downtime by up to 50% and extend asset lifespan.
              </p>
            </div>

            {/* Supply Chain Logistics Optimisation */}
            <div className="border-l-2 border-amber-500 pl-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Supply Chain Logistics Optimisation</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Demand Forecasting & Inventory</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Use AI to forecast demand, optimise inventory levels, and streamline logistics operations. Reduce stockouts, minimise carrying costs, and improve delivery performance.
              </p>
            </div>

            {/* Quality Control and Defect Detection */}
            <div className="border-l-2 border-amber-500 pl-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Quality Control and Defect Detection</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Computer Vision Inspection</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Implement GPU-accelerated computer vision systems that inspect products at production speed, detecting surface defects and dimensional errors with 99.8% accuracy.
              </p>
            </div>

            {/* Design and Simulation */}
            <div className="border-l-2 border-amber-500 pl-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Design and Simulation</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Digital Twin & CFD/FEA</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Run complex simulations and digital twin models at unprecedented speed. Accelerate product development cycles and validate designs before physical prototyping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12">Key Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Compute Training Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-amber-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500/30 to-orange-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-amber-400 text-sm mb-4">Training</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A highly scalable, performance-optimised architecture that significantly reduces training times for manufacturing AI models.
              </p>
            </div>

            {/* AI Compute Inference Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-amber-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500/30 to-yellow-600/20 rounded-xl flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Compute</h3>
              <p className="text-amber-400 text-sm mb-4">Inference</p>
              <p className="text-white/60 text-sm leading-relaxed">
                A highly optimised, scalable platform for real-time inference workloads on the factory floor with sub-10ms latency.
              </p>
            </div>

            {/* AI Marketplace Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-amber-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500/30 to-red-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Marketplace</h3>
              <p className="text-amber-400 text-sm mb-4">Marketplace</p>
              <p className="text-white/60 text-sm leading-relaxed">
                An ecosystem of services for developing and deploying manufacturing AI applications with pre-built industrial templates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Solutions */}
      <section className="py-24 bg-[#000000]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">More solutions</h2>
          <p className="text-base text-white/60 mb-12 max-w-2xl">
            BluBrg accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Training Card */}
            <Link to="/solutions/training" className="group">
              <div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/60 via-indigo-900/50 to-violet-900/60">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                  backgroundSize: '30px 30px'
                }}></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">Training</h3>
                  <div className="flex gap-4">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">80%</span>
                      <span className="text-white/60 text-xs ml-2">Lower Cost</span>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">+40%</span>
                      <span className="text-white/60 text-xs ml-2">Efficiency</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-purple-500/50 transition-colors" />
              </div>
            </Link>

            {/* Inference Card */}
            <Link to="/solutions/inference" className="group">
              <div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/60 via-gray-900/50 to-slate-900/60">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                  backgroundSize: '30px 30px'
                }}></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">Inference</h3>
                  <div className="flex gap-4">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">7.2X</span>
                      <span className="text-white/60 text-xs ml-2">Performance</span>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">+40%</span>
                      <span className="text-white/60 text-xs ml-2">Efficiency</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-gray-500/50 transition-colors" />
              </div>
            </Link>

            {/* Fine Tuning Card */}
            <Link to="/solutions/fine-tuning" className="group">
              <div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900/50 via-teal-900/40 to-green-900/50">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                  backgroundSize: '30px 30px'
                }}></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">Fine Tuning</h3>
                  <div className="flex gap-4">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">+40%</span>
                      <span className="text-white/60 text-xs ml-2">Efficiency</span>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">30%</span>
                      <span className="text-white/60 text-xs ml-2">Faster</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-emerald-500/50 transition-colors" />
              </div>
            </Link>

            {/* AI Development Card */}
            <Link to="/solutions/ai-development" className="group">
              <div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-900/50 via-orange-900/40 to-yellow-900/50">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                  backgroundSize: '30px 30px'
                }}></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">AI Development</h3>
                  <div className="flex gap-4">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">80%</span>
                      <span className="text-white/60 text-xs ml-2">Lower Cost</span>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                      <span className="text-white text-sm">30%</span>
                      <span className="text-white/60 text-xs ml-2">Faster</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-amber-500/50 transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-[#050505]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12">FAQs</h2>
          <div className="max-w-4xl space-y-3">
            {[
              {
                question: "How can GPU computing improve manufacturing operations?",
                answer: "GPU computing enables real-time AI inference for quality control, predictive maintenance models that analyse thousands of sensor inputs simultaneously, and complex simulations like CFD and FEA that run 10-50x faster than CPU-based alternatives."
              },
              {
                question: "What types of manufacturing simulations can BluBrg accelerate?",
                answer: "BluBrg accelerates a wide range of simulations including finite element analysis (FEA), computational fluid dynamics (CFD), digital twin modelling, discrete event simulation, and multi-physics simulations for product design and process optimisation."
              },
              {
                question: "How does predictive maintenance work with BluBrg?",
                answer: "Our platform processes real-time sensor data from equipment using AI models that identify patterns indicating potential failures. Manufacturers can deploy models that predict failures days or weeks in advance, enabling scheduled maintenance that reduces downtime by up to 50%."
              },
              {
                question: "Can BluBrg support edge deployment for factory floor applications?",
                answer: "Yes, BluBrg supports both cloud and edge deployment scenarios. Our inference platform delivers sub-10ms latency for real-time applications like visual inspection and robotic control, critical for factory floor operations."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/10">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-amber-400 transition-colors"
                >
                  <span className="text-base font-medium text-white pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-amber-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                </button>
                {openFaq === i && (
                  <div className="pb-6">
                    <p className="text-white/60 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0066FF] to-[#0055DD]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-8 leading-tight">
              Access thousands of GPUs tailored to your requirements.
            </h2>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#0066FF] px-10 py-6 text-base font-medium rounded-md">
                  Reserve GPUs
                </Button>
              </Link>
              <Link to="/contact">
                <button className="text-white hover:text-white/80 px-6 py-6 text-base font-medium transition-colors flex items-center gap-2">
                  Contact Sales <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manufacturing;
