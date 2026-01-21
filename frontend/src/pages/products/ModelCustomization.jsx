import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Check, Cpu, Box } from 'lucide-react';

const ModelCustomization = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const canvasRef = useRef(null);

  // Animated abstract visual for hero - new shining design
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
      time += 0.008;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Draw layered 3D cube/block structures
      for (let layer = 0; layer < 5; layer++) {
        const offsetY = Math.sin(time * 0.8 + layer * 0.3) * 12;
        const offsetX = Math.cos(time * 0.6 + layer * 0.4) * 8;
        const layerScale = 1 - layer * 0.12;
        
        ctx.save();
        ctx.translate(centerX + offsetX, centerY + offsetY - layer * 30);
        ctx.scale(layerScale, layerScale);
        
        // Draw 3D isometric cube face
        const size = 80;
        
        // Top face
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.5);
        ctx.lineTo(size * 0.8, -size * 0.2);
        ctx.lineTo(0, size * 0.1);
        ctx.lineTo(-size * 0.8, -size * 0.2);
        ctx.closePath();
        
        const alpha = 0.5 - layer * 0.08;
        const gradient = ctx.createLinearGradient(-size, -size, size, size);
        gradient.addColorStop(0, `rgba(11, 31, 59, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(50, 140, 193, ${alpha * 0.7})`);
        gradient.addColorStop(1, `rgba(11, 31, 59, ${alpha * 0.5})`);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = `rgba(50, 140, 193, ${alpha * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Left face
        ctx.beginPath();
        ctx.moveTo(-size * 0.8, -size * 0.2);
        ctx.lineTo(0, size * 0.1);
        ctx.lineTo(0, size * 0.7);
        ctx.lineTo(-size * 0.8, size * 0.4);
        ctx.closePath();
        ctx.fillStyle = `rgba(11, 31, 59, ${alpha * 0.8})`;
        ctx.fill();
        ctx.stroke();
        
        // Right face
        ctx.beginPath();
        ctx.moveTo(size * 0.8, -size * 0.2);
        ctx.lineTo(0, size * 0.1);
        ctx.lineTo(0, size * 0.7);
        ctx.lineTo(size * 0.8, size * 0.4);
        ctx.closePath();
        ctx.fillStyle = `rgba(50, 140, 193, ${alpha * 0.4})`;
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();
      }

      // Shining particles around
      for (let i = 0; i < 20; i++) {
        const angle = time * 0.5 + i * (Math.PI * 2 / 20);
        const dist = 120 + Math.sin(time * 1.2 + i * 0.5) * 40;
        const x = centerX + Math.cos(angle) * dist;
        const y = centerY + Math.sin(angle) * dist * 0.6;
        const size = 2 + Math.sin(time * 2 + i) * 1.5;
        const brightness = 0.4 + Math.sin(time * 3 + i) * 0.3;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(50, 140, 193, ${brightness})`;
        ctx.fill();
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(50, 140, 193, ${brightness * 0.2})`;
        ctx.fill();
      }

      // Connecting lines with shimmer
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const angle1 = time * 0.3 + i * (Math.PI / 4);
        const angle2 = angle1 + Math.PI / 5;
        const r1 = 60 + Math.sin(time + i) * 20;
        const r2 = 110 + Math.cos(time + i) * 25;
        const shimmer = 0.1 + Math.sin(time * 2 + i) * 0.08;
        
        ctx.strokeStyle = `rgba(50, 140, 193, ${shimmer})`;
        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(angle1) * r1, centerY + Math.sin(angle1) * r1 * 0.6);
        ctx.lineTo(centerX + Math.cos(angle2) * r2, centerY + Math.sin(angle2) * r2 * 0.6);
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
      
      {/* SECTION 1: Hero Section - Theme Color #c0bba5 with shining effect */}
      <section className="relative min-h-[580px] overflow-hidden">
        {/* Background color with shine effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #c0bba5 0%, #d4cfbc 30%, #c0bba5 60%, #b8b39e 100%)'
          }}
        />
        {/* Shining overlay effect */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.5) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 40%)'
          }}
        />
        {/* Subtle shimmer animation */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
            animation: 'shimmer 3s ease-in-out infinite'
          }}
        />
        
        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
        
        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight text-[#0B1F3B] tracking-tight">
                Model Customization
              </h1>
              
              <p className="text-[#2F3A4A] text-lg max-w-xl leading-relaxed">
                BluBridge Model Customization enables you to adapt, refine, and specialize foundation models for your exact use cases. From domain alignment to behavioral tuning, our platform gives you full control over how your models think, respond, and perform—without the overhead of managing complex infrastructure.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact">
                  <Button className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-7 py-3 rounded-md font-medium text-base">
                    Start Customizing
                  </Button>
                </Link>
                <Link to="/contact" className="flex items-center gap-2 px-6 py-3 text-[#0B1F3B] hover:text-[#328CC1] transition-colors font-medium">
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
            <div className="space-y-5 my-20">
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
          
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Left Column - Stack Layers */}
            <div className="lg:col-span-2 space-y-4">
              {/* MARKETPLACE Layer */}
              <div className="bg-[#0a1628] rounded-xl p-6">
                <div className="mb-4">
                  <span className="bg-[#1a2d47] text-white text-xs font-bold px-3 py-1.5 rounded tracking-wider">MARKETPLACE</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Instruction Datasets', 'Evaluation Tools', 'Adapters', 'Plugins'].map((item, i) => (
                    <span key={i} className="bg-[#1a2d47] text-white/90 text-sm px-4 py-2 rounded-lg flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* PLATFORM Layer */}
              <div className="bg-[#0a1628] rounded-xl p-6">
                <div className="mb-4">
                  <span className="bg-[#1a2d47] text-white text-xs font-bold px-3 py-1.5 rounded tracking-wider">PLATFORM</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Experiment Manager', 'Version Control', 'Pipelines', 'Model Registry'].map((item, i) => (
                    <span key={i} className="bg-[#1a2d47] text-white/90 text-sm px-4 py-2 rounded-lg flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* INFRASTRUCTURE Layer */}
              <div className="bg-[#0a1628] rounded-xl p-6">
                <div className="mb-4">
                  <span className="bg-[#1a2d47] text-white text-xs font-bold px-3 py-1.5 rounded tracking-wider">INFRASTRUCTURE</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['GPU Orchestration', 'Distributed Training', 'Networking', 'Storage'].map((item, i) => (
                    <span key={i} className="bg-[#1a2d47] text-white/90 text-sm px-4 py-2 rounded-lg flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* HARDWARE Layer */}
              <div className="bg-[#0a1628] rounded-xl p-6">
                <div className="mb-4">
                  <span className="bg-[#1a2d47] text-white text-xs font-bold px-3 py-1.5 rounded tracking-wider">HARDWARE</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['NVIDIA A100', 'NVIDIA H100', 'AMD MI300X', 'NVIDIA DGX'].map((item, i) => (
                    <span key={i} className="bg-[#c8e6c9] text-[#1a2d47] text-sm px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 bg-[#2e7d32] rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - User Experience & Data Centre */}
            <div className="space-y-4">
              {/* USER EXPERIENCE Card */}
              <div className="bg-[#0a1628] rounded-xl p-6 h-[calc(50%-8px)]">
                <div className="mb-4">
                  <span className="bg-[#1a2d47] text-white text-xs font-bold px-3 py-1.5 rounded tracking-wider">USER EXPERIENCE</span>
                </div>
                <div className="space-y-3">
                  {['Web Console', 'API', 'CLI'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      <span className="text-white/90 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DATA CENTRE Card */}
              <div className="bg-[#0a1628] rounded-xl p-6 h-[calc(50%-8px)]">
                <div className="mb-4">
                  <span className="bg-[#1a2d47] text-white text-xs font-bold px-3 py-1.5 rounded tracking-wider">DATA CENTRE</span>
                </div>
                <div className="space-y-3">
                  {['Renewable Energy', 'Low-latency Fibre'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      <span className="text-white/90 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
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
      <section className="py-20 bg-[#c0bba5]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0B1F3B]">
            Ready to customize your AI models?
          </h2>
          <p className="text-[#2F3A4A] mb-8 max-w-2xl mx-auto">
            Get started with BluBridge Model Customization and transform generic models into purpose-built solutions for your specific needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-8 py-3 rounded-md font-medium">
                Start Customizing
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 px-6 py-3 text-[#0B1F3B] hover:text-[#328CC1] transition-colors font-medium border border-[#0B1F3B] rounded-md">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModelCustomization;
