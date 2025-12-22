import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
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

  useDocumentTitle('AI for Manufacturing | BluBrg');

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
              Blubrg’s cloud platform uses high-performance GPU technology and expert support to help manufacturing organisations speed up simulation workflows and optimise business processes. This enables manufacturers to improve productivity, cut costs, and reduce equipment downtime.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact/sales">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#0a0805] px-10 py-6 text-base font-medium rounded-md">
                  Get Started
                </Button>
              </Link>
               <Link to="/contact">
                <button className="text-white hover:text-white/80 px-6 py-3 text-base font-medium transition-colors flex items-center gap-2">
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
              Run faster and more precise simulations for manufacturing processes such as finite element analysis, computational fluid dynamics, and digital twin modelling to boost design accuracy and throughput.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Improved Predictive Maintenance</h3>
              <p className="text-white/60 text-sm leading-relaxed">
              Analyse large streams of sensor data in real time using GPU-powered AI and machine learning to anticipate equipment failures and schedule maintenance before breakdowns occur.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Streamlined Automation</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Support advanced AI techniques in robotics and automation, helping manufacturing operations become more intelligent, efficient, and adaptable to changing production demands.
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
              Blubrg’s AI platform combines industry-leading GPU technology with a fully optimised software stack, enabling manufacturers to improve core activities like supply chain coordination, quality assurance, and product design.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Predictive Maintenance Models */}
            <div className="border-l-2 border-amber-500 pl-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Predictive Maintenance Models</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Equipment Health Monitoring</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Use AI to build and train models that forecast when machines are likely to fail, allowing maintenance teams to act proactively and minimise downtime and repair costs.
              </p>
            </div>

            {/* Supply Chain Logistics Optimisation */}
            <div className="border-l-2 border-amber-500 pl-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Supply Chain Logistics Optimisation</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Demand Forecasting & Inventory</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Quickly analyse complex datasets related to inventory, demand forecasting, and logistics, helping teams make better decisions and streamline supply chain processes.
              </p>
            </div>

            {/* Quality Control and Defect Detection */}
            <div className="border-l-2 border-amber-500 pl-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Quality Control and Defect Detection</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Computer Vision Inspection</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Apply GPU-accelerated systems to monitor production lines in real time, detecting defects quickly and ensuring products consistently meet quality standards.
              </p>
            </div>

            {/* Design and Simulation */}
            <div className="border-l-2 border-amber-500 pl-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Design and Simulation</h3>
              <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">Digital Twin & CFD/FEA</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Accelerate design iteration cycles by running complex simulations in the cloud, significantly reducing the time it takes to validate designs, especially in industries like automotive and aerospace where precision is vital.
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
                 A scalable compute environment that shortens model training times and increases productivity for data-intensive workloads.
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
                A high-performance platform optimised to run inference workloads efficiently and reliably at production scale.

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
                 A set of tools and services that help teams develop, deploy, and scale AI applications using both Blubrg infrastructure and commonly used AI/ML frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Solutions */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">More solutions</h2>
            <p className="text-gray-400 max-w-2xl">
              BluBrg accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            {/* Model Training Card - Purple Wave */}
            <Link to="/solutions/training">
              <div className="relative border border-[#353535] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 208" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="uc-purple-1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2a0040" />
                      <stop offset="30%" stopColor="#6020a0" />
                      <stop offset="50%" stopColor="#c060ff" />
                      <stop offset="70%" stopColor="#ff50c0" />
                      <stop offset="100%" stopColor="#400060" />
                    </linearGradient>
                    <linearGradient id="uc-purple-2" x1="0%" y1="80%" x2="100%" y2="20%">
                      <stop offset="0%" stopColor="#200030" />
                      <stop offset="40%" stopColor="#8040c0" />
                      <stop offset="60%" stopColor="#d080ff" />
                      <stop offset="100%" stopColor="#301050" />
                    </linearGradient>
                  </defs>
                  <path d="M -25 220 Q 75 140, 195 170 Q 315 200, 390 120 Q 440 70, 520 100 L 520 220 Z" fill="url(#uc-purple-1)" opacity="0.7"/>
                  <path d="M 50 230 Q 150 100, 290 140 Q 410 170, 500 80 L 520 230 Z" fill="url(#uc-purple-2)" opacity="0.85"/>
                  <path d="M 120 230 Q 220 90, 365 130 Q 465 160, 530 60 L 530 230 Z" fill="url(#uc-purple-1)"/>
                  <path d="M 120 230 Q 220 90, 365 130 Q 465 160, 530 60" fill="none" stroke="rgba(255,200,255,0.4)" strokeWidth="2"/>
                </svg>
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">TRAINING</span>
                </div>
              </div>
            </Link>

            {/* AI & ML Inference Card - Blue Angular */}
            <Link to="/solutions/inference">
              <div className="relative border border-[#353535] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 208" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="uc-steel-1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0a1020" />
                      <stop offset="30%" stopColor="#1a3050" />
                      <stop offset="60%" stopColor="#4a7090" />
                      <stop offset="100%" stopColor="#0a1525" />
                    </linearGradient>
                    <linearGradient id="uc-steel-2" x1="20%" y1="100%" x2="80%" y2="0%">
                      <stop offset="0%" stopColor="#051015" />
                      <stop offset="40%" stopColor="#2a5070" />
                      <stop offset="70%" stopColor="#5a90b0" />
                      <stop offset="100%" stopColor="#102035" />
                    </linearGradient>
                  </defs>
                  <path d="M 75 230 L 170 80 L 270 160 L 340 60 L 440 120 L 520 50 L 520 230 Z" fill="url(#uc-steel-1)" opacity="0.6"/>
                  <path d="M 150 230 L 220 100 L 320 150 L 410 70 L 520 110 L 520 230 Z" fill="url(#uc-steel-2)" opacity="0.8"/>
                  <path d="M 195 230 L 290 90 L 390 140 L 490 60 L 520 80 L 520 230 Z" fill="url(#uc-steel-1)"/>
                  <path d="M 195 230 L 290 90 L 390 140 L 490 60" fill="none" stroke="rgba(150,180,220,0.35)" strokeWidth="2"/>
                </svg>
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">INFERENCE</span>
                </div>
              </div>
            </Link>

            {/* AI Development Card - Orange/Bronze Wave */}
            <Link to="/solutions/ai-development">
              <div className="relative border border-[#353535] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 208" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="uc-bronze-1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#301505" />
                      <stop offset="30%" stopColor="#804020" />
                      <stop offset="55%" stopColor="#d08040" />
                      <stop offset="80%" stopColor="#ffa050" />
                      <stop offset="100%" stopColor="#503010" />
                    </linearGradient>
                    <linearGradient id="uc-bronze-2" x1="10%" y1="90%" x2="90%" y2="10%">
                      <stop offset="0%" stopColor="#201005" />
                      <stop offset="35%" stopColor="#905025" />
                      <stop offset="65%" stopColor="#c07030" />
                      <stop offset="100%" stopColor="#402010" />
                    </linearGradient>
                  </defs>
                  <path d="M -50 230 Q 100 120, 245 160 Q 365 190, 465 100 Q 510 60, 540 90 L 540 230 Z" fill="url(#uc-bronze-1)" opacity="0.65"/>
                  <path d="M 25 230 Q 150 100, 320 150 Q 440 180, 520 90 L 540 230 Z" fill="url(#uc-bronze-2)" opacity="0.8"/>
                  <path d="M 100 230 Q 220 80, 390 130 Q 490 160, 540 70 L 540 230 Z" fill="url(#uc-bronze-1)"/>
                  <path d="M 100 230 Q 220 80, 390 130 Q 490 160, 540 70" fill="none" stroke="rgba(255,200,150,0.4)" strokeWidth="2"/>
                </svg>
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">AI DEVELOPMENT</span>
                </div>
              </div>
            </Link>

            {/* Model Fine-Tuning Card - Green Wave */}
            <Link to="/solutions/fine-tuning">
              <div className="relative h-52 border border-[#353535] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 208" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="uc-green-1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#051510" />
                      <stop offset="30%" stopColor="#106030" />
                      <stop offset="55%" stopColor="#30a060" />
                      <stop offset="80%" stopColor="#50d080" />
                      <stop offset="100%" stopColor="#083020" />
                    </linearGradient>
                    <linearGradient id="uc-green-2" x1="10%" y1="90%" x2="90%" y2="10%">
                      <stop offset="0%" stopColor="#031008" />
                      <stop offset="40%" stopColor="#208050" />
                      <stop offset="70%" stopColor="#40b070" />
                      <stop offset="100%" stopColor="#0a2515" />
                    </linearGradient>
                  </defs>
                  <path d="M 150 230 Q 195 140, 245 170 Q 320 200, 365 110 Q 410 50, 520 80 L 520 230 Z" fill="url(#uc-green-1)" opacity="0.6"/>
                  <path d="M 220 230 Q 270 110, 340 150 Q 425 180, 490 90 L 520 230 Z" fill="url(#uc-green-2)" opacity="0.8"/>
                  <path d="M 270 230 Q 340 90, 410 130 Q 490 160, 540 70 L 540 230 Z" fill="url(#uc-green-1)"/>
                  <path d="M 270 230 Q 340 90, 410 130 Q 490 160, 540 70" fill="none" stroke="rgba(150,255,180,0.35)" strokeWidth="2"/>
                </svg>
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl">FINE-TUNING</span>
                </div>
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white">
            Access thousands of GPUs tailored to your requirements.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact/sales">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact/sales" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors font-medium px-6 py-1">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manufacturing;
