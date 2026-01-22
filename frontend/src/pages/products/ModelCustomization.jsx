import React, { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Check, Cpu, Box } from 'lucide-react';

const ModelCustomization = () => {
  const [openFaq, setOpenFaq] = useState(null);

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
            background: 'radial-gradient(ellipse at 70% 50%, rgba(200, 220, 255, 0.15) 0%, transparent 60%)'
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
            
            {/* Right - AI Model Network Visual */}
            <div className="relative h-[420px] lg:h-[480px] flex items-center justify-center">
              {/* SVG Network Visualization */}
              <svg viewBox="0 0 500 500" className="w-full h-full max-w-[500px]">
                {/* Definitions for gradients and filters */}
                <defs>
                  {/* Glow filter */}
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  
                  {/* Node gradients */}
                  <radialGradient id="purpleGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#A855F7" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.6"/>
                  </radialGradient>
                  <radialGradient id="tealGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#0D9488" stopOpacity="0.6"/>
                  </radialGradient>
                  <radialGradient id="orangeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#EA580C" stopOpacity="0.6"/>
                  </radialGradient>
                  <radialGradient id="pinkGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#EC4899" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#DB2777" stopOpacity="0.6"/>
                  </radialGradient>
                  <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.6"/>
                  </radialGradient>
                  <radialGradient id="greenGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#16A34A" stopOpacity="0.6"/>
                  </radialGradient>
                  <radialGradient id="yellowGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#EAB308" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#CA8A04" stopOpacity="0.6"/>
                  </radialGradient>
                  <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#0891B2" stopOpacity="0.6"/>
                  </radialGradient>
                </defs>
                
                {/* Connection lines with animation */}
                <g className="connection-lines" opacity="0.4">
                  <line x1="250" y1="250" x2="120" y2="120" stroke="#94A3B8" strokeWidth="1">
                    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite"/>
                  </line>
                  <line x1="250" y1="250" x2="380" y2="100" stroke="#94A3B8" strokeWidth="1">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite"/>
                  </line>
                  <line x1="250" y1="250" x2="420" y2="250" stroke="#94A3B8" strokeWidth="1">
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite"/>
                  </line>
                  <line x1="250" y1="250" x2="380" y2="400" stroke="#94A3B8" strokeWidth="1">
                    <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.5s" repeatCount="indefinite"/>
                  </line>
                  <line x1="250" y1="250" x2="120" y2="380" stroke="#94A3B8" strokeWidth="1">
                    <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.8s" repeatCount="indefinite"/>
                  </line>
                  <line x1="250" y1="250" x2="80" y2="250" stroke="#94A3B8" strokeWidth="1">
                    <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3.2s" repeatCount="indefinite"/>
                  </line>
                  <line x1="250" y1="250" x2="180" y2="60" stroke="#94A3B8" strokeWidth="1">
                    <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4.2s" repeatCount="indefinite"/>
                  </line>
                  <line x1="250" y1="250" x2="320" y2="440" stroke="#94A3B8" strokeWidth="1">
                    <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.8s" repeatCount="indefinite"/>
                  </line>
                </g>
                
                {/* Central hub node */}
                <g filter="url(#glow)">
                  <circle cx="250" cy="250" r="50" fill="url(#blueGlow)">
                    <animate attributeName="r" values="48;52;48" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <text x="250" y="255" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">BluBridge</text>
                </g>
                
                {/* Outer model nodes */}
                <g filter="url(#glow)">
                  {/* LLaMA - Top left */}
                  <circle cx="120" cy="120" r="35" fill="url(#tealGlow)">
                    <animate attributeName="r" values="33;37;33" dur="4s" repeatCount="indefinite"/>
                  </circle>
                  <text x="120" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">LLaMA</text>
                  
                  {/* GPT - Top right */}
                  <circle cx="380" cy="100" r="38" fill="url(#purpleGlow)">
                    <animate attributeName="r" values="36;40;36" dur="3.5s" repeatCount="indefinite"/>
                  </circle>
                  <text x="380" y="105" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">GPT</text>
                  
                  {/* Mistral - Right */}
                  <circle cx="420" cy="250" r="32" fill="url(#orangeGlow)">
                    <animate attributeName="r" values="30;34;30" dur="4.5s" repeatCount="indefinite"/>
                  </circle>
                  <text x="420" y="255" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">Mistral</text>
                  
                  {/* Claude - Bottom right */}
                  <circle cx="380" cy="400" r="36" fill="url(#pinkGlow)">
                    <animate attributeName="r" values="34;38;34" dur="3.8s" repeatCount="indefinite"/>
                  </circle>
                  <text x="380" y="405" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">Claude</text>
                  
                  {/* Gemini - Bottom left */}
                  <circle cx="120" cy="380" r="34" fill="url(#greenGlow)">
                    <animate attributeName="r" values="32;36;32" dur="4.2s" repeatCount="indefinite"/>
                  </circle>
                  <text x="120" y="385" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">Gemini</text>
                  
                  {/* Whisper - Left */}
                  <circle cx="80" cy="250" r="30" fill="url(#yellowGlow)">
                    <animate attributeName="r" values="28;32;28" dur="3.2s" repeatCount="indefinite"/>
                  </circle>
                  <text x="80" y="255" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">Whisper</text>
                  
                  {/* Qwen - Top */}
                  <circle cx="180" cy="60" r="28" fill="url(#cyanGlow)">
                    <animate attributeName="r" values="26;30;26" dur="3.6s" repeatCount="indefinite"/>
                  </circle>
                  <text x="180" y="65" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">Qwen</text>
                  
                  {/* SDXL - Bottom */}
                  <circle cx="320" cy="440" r="30" fill="url(#tealGlow)">
                    <animate attributeName="r" values="28;32;28" dur="4s" repeatCount="indefinite"/>
                  </circle>
                  <text x="320" y="445" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">SDXL</text>
                </g>
                
                {/* Floating particles */}
                <g opacity="0.3">
                  {[...Array(20)].map((_, i) => (
                    <circle 
                      key={i}
                      cx={50 + Math.random() * 400} 
                      cy={50 + Math.random() * 400} 
                      r="2" 
                      fill="#94A3B8"
                    >
                      <animate 
                        attributeName="opacity" 
                        values="0.2;0.6;0.2" 
                        dur={`${2 + Math.random() * 3}s`} 
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}
                </g>
              </svg>
              
              {/* Additional floating animation for the entire SVG */}
              <style>{`
                @keyframes networkFloat {
                  0%, 100% {
                    transform: translateY(0px);
                  }
                  50% {
                    transform: translateY(-10px);
                  }
                }
                svg {
                  animation: networkFloat 6s ease-in-out infinite;
                }
              `}</style>
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
                Model customization requires more than fine-tuning - it demands precision, repeatability, and control. BluBridge provides a unified environment for adapting models at scale, enabling teams to shape behavior, tone, and reasoning patterns with confidence.
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

      {/* SECTION 4: Customization Stack - Table Format */}
      <section className="py-20 bg-[#fffdf7]">
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
      <section className="py-24 bg-[#f3f1e9]">
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
      <section className="py-20 bg-[#fffdf7]">
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
