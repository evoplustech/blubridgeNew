import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Check, Cpu, Box } from 'lucide-react';

const ModelCustomization = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const canvasRef = useRef(null);

  // Animated abstract visual for hero - theme colors
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

    const drawAbstractVisual = () => {
      time += 0.006;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Draw layered hexagonal/geometric shapes with theme colors
      for (let layer = 0; layer < 4; layer++) {
        const offsetY = Math.sin(time + layer * 0.4) * 8;
        const scale = 1 - layer * 0.15;
        
        ctx.save();
        ctx.translate(centerX, centerY + offsetY - layer * 20);
        ctx.scale(scale, scale);
        ctx.rotate(time * 0.1 + layer * 0.2);
        
        // Draw hexagon
        const radius = 100;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        
        // Theme gradient fill (navy to teal)
        const gradient = ctx.createLinearGradient(-radius, -radius, radius, radius);
        const alpha = 0.4 - layer * 0.08;
        gradient.addColorStop(0, `rgba(11, 31, 59, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(50, 140, 193, ${alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(11, 31, 59, ${alpha * 0.6})`);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.strokeStyle = `rgba(50, 140, 193, ${alpha * 0.8})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
      }

      // Inner grid pattern
      ctx.save();
      ctx.translate(centerX, centerY);
      for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
          const x = i * 30;
          const y = j * 30;
          const pulse = Math.sin(time * 2 + i + j) * 0.3 + 0.7;
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(50, 140, 193, ${0.3 * pulse})`;
          ctx.fill();
        }
      }
      ctx.restore();

      // Floating particles
      for (let i = 0; i < 16; i++) {
        const angle = time * 0.4 + i * (Math.PI * 2 / 16);
        const dist = 130 + Math.sin(time * 1.5 + i) * 20;
        const x = centerX + Math.cos(angle) * dist;
        const y = centerY + Math.sin(angle) * dist * 0.7;
        const size = 2 + Math.sin(time + i) * 1;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(50, 140, 193, ${0.5 + Math.sin(time + i) * 0.2})`;
        ctx.fill();
      }

      // Connecting lines
      ctx.strokeStyle = 'rgba(50, 140, 193, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const angle1 = time * 0.2 + i * (Math.PI / 3);
        const angle2 = angle1 + Math.PI / 4;
        const r1 = 50 + Math.sin(time + i) * 15;
        const r2 = 100 + Math.cos(time + i) * 20;
        
        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(angle1) * r1, centerY + Math.sin(angle1) * r1 * 0.7);
        ctx.lineTo(centerX + Math.cos(angle2) * r2, centerY + Math.sin(angle2) * r2 * 0.7);
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(drawAbstractVisual);
    };

    resize();
    window.addEventListener('resize', resize);
    drawAbstractVisual();

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
      
      {/* SECTION 1: Hero Section - Theme Colors */}
      <section className="relative min-h-[580px] overflow-hidden">
        {/* Navy gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0B1F3B 0%, #0d2847 40%, #1a3a5f 70%, #0B1F3B 100%)'
          }}
        />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        
        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full border border-white/20">
                <span className="w-2 h-2 bg-[#328CC1] rounded-full animate-pulse" />
                <span className="text-[#328CC1] text-sm font-medium tracking-wide">MODEL CUSTOMIZATION</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold leading-tight text-white tracking-tight">
                Adapt models to your<br />data, domain, and<br />objectives
              </h1>
              
              <p className="text-white/75 text-lg max-w-xl leading-relaxed">
                BluBridge Model Customization enables you to adapt, refine, and specialize foundation models for your exact use cases. From domain alignment to behavioral tuning, our platform gives you full control over how your models think, respond, and perform—without the overhead of managing complex infrastructure.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact">
                  <Button className="bg-white text-[#0B1F3B] hover:bg-white/90 px-7 py-3 rounded-md font-medium text-base">
                    Start Customizing
                  </Button>
                </Link>
                <Link to="/contact" className="flex items-center gap-2 px-6 py-3 text-white hover:text-[#328CC1] transition-colors font-medium">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Right - Abstract Visual */}
            <div className="relative h-[380px] lg:h-[420px]">
              <canvas 
                ref={canvasRef}
                className="w-full h-full"
                style={{ maxWidth: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Value Highlights - 3 Cards */}
      <section className="py-16 bg-[#fffdf7] border-b border-[#E5E7EB]">
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
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Faster Adaptation Cycles</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Iterate rapidly with streamlined fine-tuning pipelines that reduce experimentation time and accelerate deployment.
              </p>
            </div>
            
            {/* Card 3 */}
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Production-Ready Outputs</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Deliver models that are optimized for real-world usage, with consistent behavior, reliability, and performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Accelerated Model Customization */}
      <section className="py-20 bg-[#f3f1e9]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Accelerated Model<br />Customization
              </h2>
              <p className="text-[#2F3A4A] mb-5 leading-relaxed">
                Model customization requires more than fine-tuning—it demands precision, repeatability, and control. BluBridge provides a unified environment for adapting models at scale, enabling teams to shape behavior, tone, and reasoning patterns with confidence.
              </p>
              <p className="text-[#2F3A4A] mb-5 leading-relaxed">
                Our platform supports parameter-efficient tuning, instruction alignment, and domain-specific adaptation across distributed GPU clusters. Built-in orchestration ensures experiments are reproducible, scalable, and easy to transition into production.
              </p>
              <p className="text-[#2F3A4A] leading-relaxed">
                From enterprise workflows to specialized research models, BluBridge transforms customization into a fast, predictable process.
              </p>
            </div>
            
            {/* Right - Feature Cards */}
            <div className="space-y-5">
              {/* Pre-configured Card */}
              <div className="bg-[#0B1F3B] rounded-xl p-6 text-white">
                <p className="text-white/60 text-sm mb-1">Ready-to-use Environments</p>
                <h3 className="text-2xl font-semibold mb-2">Pre-configured</h3>
                <p className="text-white/70 text-sm">Fine-tuning and alignment environments ready for immediate use</p>
              </div>
              
              {/* Scalable Card */}
              <div className="bg-gradient-to-r from-[#0B1F3B] to-[#1a3a5f] rounded-xl p-6 text-white">
                <p className="text-white/60 text-sm mb-1">Distributed GPU Clusters</p>
                <h3 className="text-2xl font-semibold mb-2">Scalable</h3>
                <p className="text-white/70 text-sm">Large-scale adaptation across high-performance infrastructure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Customization Stack */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0B1F3B]">
            Customization Stack
          </h2>
          <p className="text-[#4B5563] mb-12 max-w-2xl">
            Our comprehensive customization stack provides everything you need from hardware to application, with full flexibility to customize at every layer.
          </p>
          
          {/* Stack Layers */}
          <div className="space-y-4">
            {/* MARKETPLACE Layer */}
            <div className="bg-[#f3f1e9] rounded-lg p-5 border border-[#E5E7EB]">
              <div className="flex items-center gap-4 mb-3">
                <span className="bg-[#6B7280] text-white text-xs font-bold px-3 py-1 rounded">MARKETPLACE</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Instruction Datasets', 'Alignment Packs', 'Domain Corpora', 'Evaluation Sets', 'Adapters', 'Plugins'].map((item, i) => (
                  <span key={i} className="bg-white text-[#4B5563] text-sm px-3 py-1.5 rounded border border-[#E5E7EB] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#6B7280] rounded-full" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            
            {/* PLATFORM Layer */}
            <div className="bg-[#f3f1e9] rounded-lg p-5 border border-[#E5E7EB]">
              <div className="flex items-center gap-4 mb-3">
                <span className="bg-[#6B7280] text-white text-xs font-bold px-3 py-1 rounded">PLATFORM</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Experiment Manager', 'Version Control', 'Training Pipelines', 'Model Registry'].map((item, i) => (
                  <span key={i} className="bg-white text-[#4B5563] text-sm px-3 py-1.5 rounded border border-[#E5E7EB] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#6B7280] rounded-full" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            
            {/* INFRASTRUCTURE Layer */}
            <div className="bg-[#f3f1e9] rounded-lg p-5 border border-[#E5E7EB]">
              <div className="flex items-center gap-4 mb-3">
                <span className="bg-[#6B7280] text-white text-xs font-bold px-3 py-1 rounded">INFRASTRUCTURE</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['GPU Orchestration', 'Distributed Training', 'Secure Storage', 'High-Speed Networking'].map((item, i) => (
                  <span key={i} className="bg-white text-[#4B5563] text-sm px-3 py-1.5 rounded border border-[#E5E7EB] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#6B7280] rounded-full" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* HARDWARE Layer */}
            <div className="bg-[#f3f1e9] rounded-lg p-5 border border-[#E5E7EB]">
              <div className="flex items-center gap-4 mb-3">
                <span className="bg-[#1e5a3d] text-white text-xs font-bold px-3 py-1 rounded">HARDWARE</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['A100 80GB', 'H100 SXM5', 'NVIDIA DGX', 'NVIDIA HGX', 'NVIDIA A100', 'NVIDIA A800'].map((item, i) => (
                  <span key={i} className="bg-[#1e5a3d] text-white text-sm px-3 py-1.5 rounded flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
              <h4 className="font-semibold text-[#0B1F3B] mb-3">USER EXPERIENCE</h4>
              <ul className="space-y-2 text-sm text-[#4B5563]">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#328CC1]" /> Web Console</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#328CC1]" /> API</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#328CC1]" /> CLI</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
              <h4 className="font-semibold text-[#0B1F3B] mb-3">DATA CENTRE</h4>
              <ul className="space-y-2 text-sm text-[#4B5563]">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#328CC1]" /> Renewable Energy</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#328CC1]" /> Low-latency Fabric</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Performance Metrics */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#0B1F3B]">
            Performance
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Metric 1 */}
            <div className="text-center p-6 border border-[#E5E7EB] rounded-xl bg-white">
              <div className="text-4xl md:text-5xl font-bold text-[#0B1F3B] mb-2">30%</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">Faster Iterations</div>
              <p className="text-[#4B5563] text-sm">Shorter development feedback loops with streamlined training pipelines.</p>
            </div>
            
            {/* Metric 2 */}
            <div className="text-center p-6 border border-[#E5E7EB] rounded-xl bg-white">
              <div className="text-4xl md:text-5xl font-bold text-[#0B1F3B] mb-2">80%</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">Lower Cost</div>
              <p className="text-[#4B5563] text-sm">Reduce training costs while maintaining high performance standards.</p>
            </div>
            
            {/* Metric 3 */}
            <div className="text-center p-6 border border-[#E5E7EB] rounded-xl bg-white">
              <div className="text-4xl md:text-5xl font-bold text-[#0B1F3B] mb-2">40%</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">More Efficient</div>
              <p className="text-[#4B5563] text-sm">Improved utilization and training workload optimization.</p>
            </div>
            
            {/* Metric 4 */}
            <div className="text-center p-6 border border-[#E5E7EB] rounded-xl bg-white">
              <div className="text-4xl md:text-5xl font-bold text-[#0B1F3B] mb-2">UP TO</div>
              <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">7X Faster Inference</div>
              <p className="text-[#4B5563] text-sm">Optimized infrastructure deployment and inference throughput.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Key Services */}
      <section className="py-20 bg-[#f3f1e9]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#0B1F3B]">
            Key Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Service 1 */}
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
            
            {/* Service 2 */}
            <div className="bg-white rounded-xl p-8 border border-[#E5E7EB]">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#dc2626]/10 rounded-full mb-4">
                <Box className="w-4 h-4 text-[#dc2626]" />
                <span className="text-[#dc2626] text-sm font-medium">API</span>
              </div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">AI Marketplace</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Access adapters, datasets, and tools that support application development and deployment—compatible with both BluBridge offerings and popular APIs.
              </p>
            </div>
          </div>
        </div>
      </section>

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
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#0B1F3B]">
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
      <section className="py-20 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Access thousands of GPUs tailored to your<br />requirements.
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/products/gpu-nodes">
              <Button className="bg-white text-[#0B1F3B] hover:bg-white/90 px-8 py-3 rounded-md font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 px-6 py-3 text-white hover:text-[#328CC1] transition-colors font-medium">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModelCustomization;
