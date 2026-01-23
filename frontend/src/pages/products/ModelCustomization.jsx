import React, { useState,useEffect,useRef } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Check, Cpu, Box } from 'lucide-react';
import ModelGraphCanvas from './ModelGraphCanvas';

const ModelCustomization = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const canvasRef = useRef(null);

  // Animated model graph visualization for hero
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

    // Models in the exact sequential order for the pipeline
    const models = [
      { name: 'Data', x: 0.2, y: 0.2, color: '#3b82f6' },           // 0
      { name: 'Adapters', x: 0.5, y: 0.15, color: '#8b5cf6' },      // 1
      { name: 'Tuning', x: 0.8, y: 0.25, color: '#ec4899' },        // 2
      { name: 'Prompts', x: 0.15, y: 0.5, color: '#06b6d4' },       // 3
      { name: 'Embeddings', x: 0.4, y: 0.45, color: '#f97316' },    // 4
      { name: 'Alignment', x: 0.65, y: 0.4, color: '#22c55e' },     // 5
      { name: 'Evaluation', x: 0.85, y: 0.55, color: '#eab308' },   // 6
      { name: 'Compression', x: 0.25, y: 0.75, color: '#ef4444' },  // 7
      { name: 'Behavior', x: 0.55, y: 0.7, color: '#a855f7' },      // 8
      { name: 'Guardrails', x: 0.75, y: 0.8, color: '#14b8a6' }     // 9
    ];

    // Sequential connection order: Data → Adapters → Tuning → Prompts → Embeddings → Alignment → Evaluation → Compression → Behavior → Guardrails
    const connectionSequence = [
      [0, 1], // Data → Adapters
      [1, 2], // Adapters → Tuning
      [2, 3], // Tuning → Prompts
      [3, 4], // Prompts → Embeddings
      [4, 5], // Embeddings → Alignment
      [5, 6], // Alignment → Evaluation
      [6, 7], // Evaluation → Compression
      [7, 8], // Compression → Behavior
      [8, 9]  // Behavior → Guardrails
    ];

    const drawModelGraph = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Calculate which connection is currently active (one at a time, sequential)
      const cycleDuration = 2.5; // seconds per connection
      const totalCycleTime = connectionSequence.length * cycleDuration;
      const currentCycleTime = (time * 0.5) % totalCycleTime;
      const activeConnectionIndex = Math.floor(currentCycleTime / cycleDuration);
      const connectionProgress = (currentCycleTime % cycleDuration) / cycleDuration;

      // Draw all static connection paths (very faint)
      connectionSequence.forEach(([fromIdx, toIdx]) => {
        const model1 = models[fromIdx];
        const model2 = models[toIdx];
        const x1 = model1.x * width;
        const y1 = model1.y * height;
        const x2 = model2.x * width;
        const y2 = model2.y * height;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(100, 120, 150, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw the active connection with animated pulse
      if (activeConnectionIndex < connectionSequence.length) {
        const [fromIdx, toIdx] = connectionSequence[activeConnectionIndex];
        const model1 = models[fromIdx];
        const model2 = models[toIdx];
        const x1 = model1.x * width;
        const y1 = model1.y * height;
        const x2 = model2.x * width;
        const y2 = model2.y * height;

        // Animate the line drawing from start to end
        const animatedX2 = x1 + (x2 - x1) * Math.min(connectionProgress * 1.5, 1);
        const animatedY2 = y1 + (y2 - y1) * Math.min(connectionProgress * 1.5, 1);

        // Gradient for the active connection
        const gradient = ctx.createLinearGradient(x1, y1, animatedX2, animatedY2);
        gradient.addColorStop(0, model1.color + 'cc');
        gradient.addColorStop(1, model2.color + 'cc');

        // Draw glowing active connection
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(animatedX2, animatedY2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Add subtle glow effect
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(animatedX2, animatedY2);
        ctx.strokeStyle = model1.color + '40';
        ctx.lineWidth = 6;
        ctx.stroke();

        // Draw a traveling pulse dot along the line
        if (connectionProgress < 0.8) {
          const pulseProgress = connectionProgress * 1.25;
          const pulseX = x1 + (x2 - x1) * pulseProgress;
          const pulseY = y1 + (y2 - y1) * pulseProgress;
          
          // Pulse glow
          const pulseGradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 12);
          pulseGradient.addColorStop(0, model1.color + '80');
          pulseGradient.addColorStop(1, model1.color + '00');
          ctx.fillStyle = pulseGradient;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 12, 0, Math.PI * 2);
          ctx.fill();

          // Pulse core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw model nodes with subtle floating motion
      models.forEach((model, i) => {
        const x = model.x * width + Math.sin(time + i * 0.5) * 4;
        const y = model.y * height + Math.cos(time + i * 0.3) * 4;
        const pulseSize = 30 + Math.sin(time * 1.5 + i) * 3;

        // Check if this node is part of the active connection
        const isActiveFrom = connectionSequence[activeConnectionIndex] && connectionSequence[activeConnectionIndex][0] === i;
        const isActiveTo = connectionSequence[activeConnectionIndex] && connectionSequence[activeConnectionIndex][1] === i;
        const isActive = isActiveFrom || isActiveTo;

        // Glow effect (stronger for active nodes)
        const glowOpacity = isActive ? '60' : '30';
        const glowSize = isActive ? pulseSize * 2.5 : pulseSize * 1.8;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        gradient.addColorStop(0, model.color + glowOpacity);
        gradient.addColorStop(1, model.color + '00');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Main node (slightly larger for active nodes)
        const nodeSize = isActive ? pulseSize * 0.5 : pulseSize * 0.4;
        ctx.fillStyle = model.color;
        ctx.beginPath();
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
        ctx.fill();

        // Node label
        ctx.fillStyle = 'rgba(26, 26, 26, 0.85)';
        ctx.font = '11px DM Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(model.name, x, y + pulseSize * 0.7);
      });

      // Draw subtle floating data particles (reduced)
      for (let i = 0; i < 15; i++) {
        const px = (Math.sin(time * 0.3 + i * 0.5) + 1) * width * 0.5;
        const py = (Math.cos(time * 0.2 + i * 0.6) + 1) * height * 0.5;
        const size = 1.5 + Math.sin(time + i) * 0.5;
        
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.15 + Math.sin(time + i) * 0.05})`;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(drawModelGraph);
    };

    resize();
    window.addEventListener('resize', resize);
    drawModelGraph();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: "What makes BluBridge's Model Customization different from others?",
      answer: "BluBridge provides a unified environment for adapting models at scale with full control over behavior, tone, and reasoning patterns. Our platform supports parameter-efficient tuning, instruction alignment, and domain-specific adaptation with built-in orchestration for reproducible, scalable experiments."
    },
    {
      question: "What types of customization does BluBridge support?",
      answer: "We support instruction fine-tuning, domain adaptation, behavioral alignment, parameter-efficient methods (LoRA, QLoRA), and full fine-tuning across distributed GPU clusters. Our platform handles everything from lightweight adapters to full model retraining."
    },
    {
      question: "How does BluBridge ensure customization quality?",
      answer: "Our platform includes built-in evaluation frameworks, A/B testing capabilities, and continuous monitoring. Every customization experiment is versioned, reproducible, and can be rolled back if needed. We also provide alignment packs and domain-specific evaluation sets."
    },
    {
      question: "How does BluBridge accelerate AI development?",
      answer: "BluBridge reduces customization cycles from weeks to days through streamlined pipelines, pre-configured environments, and distributed training infrastructure. Our experiment manager tracks all iterations, making it easy to identify winning configurations quickly."
    }
  ];

  useDocumentTitle('Model Customization | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      
      {/* SECTION 1: Hero Section - Light cream background like reference */}
      <section className="relative min-h-[580px] overflow-hidden">
        {/* Background - Light cream/off-white */}
        <div 
          className="absolute inset-0"
          style={{
            background: '#F9F9F7'
          }}
        />
        {/* Subtle gradient overlay */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: '#fffdf7'
          }}
        />
        
        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight text-[#0B1F3B] tracking-tight">
                Model Customization
              </h1>
              
              <p className="text-[#2F3A4A] text-lg max-w-xl leading-relaxed">
                BluBridge Model Customization enables you to adapt, refine, and specialize foundation models for your exact use cases. From domain alignment to behavioral tuning, our platform gives you full control over how your models think, respond, and perform - without the overhead of managing complex infrastructure.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact">
                  <Button className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-7 py-3 rounded-md font-medium text-base">
                    Start Customizing
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right - Model Customization Network - Unique Design */}
           {/* <ModelGraphCanvas></ModelGraphCanvas> */}
           {/* Right - Animated Model Graph */}
            <div className="relative h-[400px] lg:h-[450px]">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full"
                style={{ background: 'transparent' }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 2: Value Highlights - 3 Cards */}
      <section className="py-16 bg-[#f3f1e9] border-b border-t border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Domain-Aligned Models</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Tailor models to your industry, data, and workflows, ensuring outputs reflect your domain knowledge and business context.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="border-l border-[#D6DEC3] pl-8">
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Faster Adaptation Cycles</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Iterate rapidly with streamlined fine-tuning pipelines that reduce experimentation time and accelerate deployment.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="border-l border-[#D6DEC3] pl-8">
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Production-Ready Outputs</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Deliver models that are optimized for real-world usage, with consistent behavior, reliability, and performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Accelerated Model Customization - Redesigned */}
      <section className="py-24 bg-[#fffdf7] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1F3B]/10 rounded-full mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[#6B7280] text-sm font-medium">Enterprise Ready</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black leading-tight">
                Accelerated Model Customization
              </h2>
              
              <p className="text-[#4B5563] mb-6 leading-relaxed">
               Model customization is more than fine-tuning, it is about shaping how a model thinks, responds, and performs in real-world environments. BluBridge provides a unified platform to adapt foundation models with precision, consistency, and full operational control.
              </p>
              
              <p className="text-[#6B7280] mb-8 leading-relaxed">
                Our stack enables parameter-efficient tuning, instruction alignment, and domain-specific adaptation across distributed GPU clusters. Every experiment is reproducible, every change is measurable, and every customized model is production-ready from day one.
              </p>
              
              {/* Stats row */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#E5E7EB]">
                <div>
                  <div className="text-3xl font-bold text-black mb-1">10x</div>
                  <div className="text-[#6B7280] text-sm">Faster Adaptation</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-black mb-1">99.9%</div>
                  <div className="text-[#6B7280] text-sm">Platform Uptime</div>
                </div>
                
              </div>
            </div>
            
            {/* Right - Feature Cards Stack */}
            <div className="relative">
              {/* Decorative rings */}
              
              
              <div className="space-y-5">
                {/* Pre-configured Card */}
                <div 
                  className="relative bg-[#f3f1e9] rounded-2xl p-8 border border-[#E5E7EB] group hover:border-blue-400/50 transition-all duration-300"
                  style={{ animation: 'cardFloat1 6s ease-in-out infinite' }}
                >
                  <div className="absolute top-6 right-6 w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <p className="text-blue-600 text-sm font-semibold mb-2 uppercase tracking-wider">Ready-to-use Environments</p>
                  <h3 className="text-3xl font-bold text-black mb-3">Pre-configured</h3>
                  <p className="text-[#6B7280]">Fine-tuning and alignment environments ready for immediate use with zero setup time.</p>
                </div>
                
                {/* Scalable Card */}
                <div 
                  className="relative bg-[#f3f1e9] rounded-2xl p-8 border border-[#E5E7EB] group hover:border-purple-400/50 transition-all duration-300"
                  style={{ animation: 'cardFloat2 5s ease-in-out infinite' }}
                >
                  <div className="absolute top-6 right-6 w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <p className="text-purple-600 text-sm font-semibold mb-2 uppercase tracking-wider">Distributed GPU Clusters</p>
                  <h3 className="text-3xl font-bold text-black mb-3">Scalable</h3>
                  <p className="text-[#6B7280]">Large-scale adaptation across high-performance infrastructure with automatic scaling.</p>
                </div>
                
                {/* Secure Card */}
                <div 
                  className="relative bg-[#f3f1e9] rounded-2xl p-8 border border-[#E5E7EB] group hover:border-teal-400/50 transition-all duration-300"
                  style={{ animation: 'cardFloat3 7s ease-in-out infinite' }}
                >
                  <div className="absolute top-6 right-6 w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-teal-600 text-sm font-semibold mb-2 uppercase tracking-wider">Enterprise Security</p>
                  <h3 className="text-3xl font-bold text-black mb-3">Secure</h3>
                  <p className="text-[#6B7280]">SOC 2 compliant with end-to-end encryption and isolated training environments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animation styles */}
        <style>{`
          @keyframes cardFloat1 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes cardFloat2 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes cardFloat3 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </section>

      {/* SECTION 4: Customization Stack - Table Format */}
      <section className="py-20 bg-[#f3f1e9]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0B1F3B]">
            Customization Stack
          </h2>
          <p className="text-[#4B5563] mb-12 max-w-6xl">
            Our comprehensive customization stack provides everything you need from hardware to application, with full flexibility to customize at every layer.
          </p>
          
          {/* Table Format Layout */}
          <div className="rounded-xl overflow-hidden border border-[#E5E7EB]">
            {/* Header Row - Dark Background */}
            <div className="bg-[#0B1F3B] grid grid-cols-3">
              <div className="px-6 py-4 text-white text-sm font-bold uppercase tracking-wider border-r border-[#1a3a5f]">
                DATA
              </div>
              <div className="px-6 py-4 text-white text-sm font-bold uppercase tracking-wider border-r border-[#1a3a5f]">
                PLATFORM
              </div>
              <div className="px-6 py-4 text-white text-sm font-bold uppercase tracking-wider">
                INFRASTRUCTURE & HARDWARE
              </div>
            </div>
            
            {/* Data Rows - White Background */}
            {[
              ['Instruction Datasets', 'Training Pipelines', 'Distributed Training'],
              ['Domain Corpora', 'Experiment Manager', 'GPU Orchestration'],
              ['Prompt Templates', 'Hyperparameter Tuning', 'NVIDIA H100 / A100'],
              ['Alignment Packs', 'Model Versioning', 'High-Speed Storage'],
              ['Fine-Tuning Kits', 'Adapter Management', 'High-Speed Networking']            
            ].map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-3 bg-white border-b border-[#E5E7EB] last:border-b-0">
                {row.map((cell, cellIndex) => (
                  <div 
                    key={cellIndex} 
                    className={`px-6 py-3 text-[#212529] text-sm ${cellIndex < 2 ? 'border-r border-[#E5E7EB]' : ''}`}
                  >
                    {cell && (
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#32CD32] rounded-full flex-shrink-0" />
                        <span>{cell}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Performance Metrics - 4 Column */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#000000] mb-16">Performance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                metric: '30%', 
                label: 'Faster Iterations', 
                sublabel: 'Accelerate Time to Value',
                desc: 'Shorter development feedback loops with streamlined training pipelines.',
                link: 'Learn More',
                linkTo: '/about'
              },
              { 
                metric: '80%', 
                label: 'Lower Cost', 
                sublabel: 'More performance for less.',
                desc: 'Reduce training costs while maintaining high performance standards.',
                link: 'Our Data Centres',
                linkTo: '/products/glomfjord'
              },
              { 
                metric: '40%', 
                label: 'More Efficient', 
                sublabel: 'Improved Resource Utilisation',
                desc: ' Improved utilization and training workload optimization.',
                link: 'See GPU Nodes',
                linkTo: '/products/gpu-nodes'
              },
              { 
                metric: '7.2X', 
                label: 'Faster Inference', 
                sublabel: 'Accelerate time to insights',
                desc: 'Optimized infrastructure deployment and inference throughput.',
                link: 'Blog Post',
                linkTo: '/blog'
              }
            ].map((item, i) => (
              <div key={i} className="border-l border-[#D6DEC3] pl-6">
                <div className="text-4xl lg:text-5xl font-bold text-[#000000] mb-1">{item.metric}</div>
                <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">{item.label}</div>
                <p className="text-[#000000] text-sm leading-relaxed mb-4">{item.desc}</p>
                {/* <Link to={item.linkTo} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1">
                  {item.link} <ArrowRight className="w-3 h-3" />
                </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Performance Metrics */}
      {/* <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#0B1F3B]">
            Performance
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
           
            <div className="text-center p-6 border border-[#E5E7EB] rounded-xl bg-white">
              <div className="text-4xl md:text-5xl font-bold text-[#0B1F3B] mb-2">30%</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">Faster Iterations</div>
              <p className="text-[#4B5563] text-sm">Shorter development feedback loops with streamlined training pipelines.</p>
            </div>
            
            
            <div className="text-center p-6 border border-[#E5E7EB] rounded-xl bg-white">
              <div className="text-4xl md:text-5xl font-bold text-[#0B1F3B] mb-2">80%</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">Lower Cost</div>
              <p className="text-[#4B5563] text-sm">Reduce training costs while maintaining high performance standards.</p>
            </div>
            
            
            <div className="text-center p-6 border border-[#E5E7EB] rounded-xl bg-white">
              <div className="text-4xl md:text-5xl font-bold text-[#0B1F3B] mb-2">40%</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">More Efficient</div>
              <p className="text-[#4B5563] text-sm">Improved utilization and training workload optimization.</p>
            </div>
            
            
            <div className="text-center p-6 border border-[#E5E7EB] rounded-xl bg-white">
              <div className="text-4xl md:text-5xl font-bold text-[#0B1F3B] mb-2">UP TO</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">7X Faster Inference</div>
              <p className="text-[#4B5563] text-sm">Optimized infrastructure deployment and inference throughput.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* SECTION 6: Key Services */}
      {/* <section className="py-20 bg-[#f3f1e9]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#0B1F3B]">
            Key Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
           
            <div className="bg-white rounded-xl p-8 border border-[#E5E7EB]">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#328CC1]/10 rounded-full mb-4">
                <Cpu className="w-4 h-4 text-[#328CC1]" />
                <span className="text-[#328CC1] text-sm font-medium">GPU</span>
              </div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">AI Compute</h3>
              <p className="text-[#4B5563] leading-relaxed">
                A powerful and comprehensive compute layer designed for model training, fine-tuning, and large-scale experiment orchestration.
              </p>
            </div>
            
            
            <div className="bg-white rounded-xl p-8 border border-[#E5E7EB]">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#dc2626]/10 rounded-full mb-4">
                <Box className="w-4 h-4 text-[#dc2626]" />
                <span className="text-[#dc2626] text-sm font-medium">API</span>
              </div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">AI Marketplace</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Access adapters, datasets, and tools that support application development and deployment - compatible with both BluBridge offerings and popular APIs.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* SECTION 7: More Solutions */}
      {/* <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0B1F3B]">
            More Solutions
          </h2>
          <p className="text-[#4B5563] mb-12 max-w-2xl">
            BluBridge accelerates the journey from development to deployment, delivering faster time to production for your AI initiatives.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
           
            <Link to="/products/inference" className="group relative h-[200px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] to-[#0B1F3B]" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-xl font-semibold">INFERENCE</h3>
              </div>
            </Link>
            
           
            <Link to="/solutions/ai-development" className="group relative h-[200px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#328CC1] to-[#1e5f8a]" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-xl font-semibold">AI DEVELOPMENT</h3>
              </div>
            </Link>
            
          
            <Link to="/products/fine-tuning" className="group relative h-[200px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#065f46] to-[#064e3b]" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-xl font-semibold">FINE-TUNING</h3>
              </div>
            </Link>
          </div>
        </div>
      </section> */}

      {/* SECTION 8: FAQs */}
      <section className="py-20 bg-[#f3f1e9]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl  font-bold mb-12 text-[#0B1F3B]">
            FAQs
          </h2>
          <div className="max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[#D6DEC3]">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full py-6 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-[#0B1F3B] text-lg pr-8">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === i ? 'bg-[#0B1F3B] text-white' : 'bg-[#0B1F3B]/10 text-[#0B1F3B]'}`}>
                    {openFaq === i ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>
                {openFaq === i && (
                  <div className="pb-6 text-[#4B5563] leading-relaxed pr-12">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Final CTA */}
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

export default ModelCustomization;
