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
      
      {/* SECTION 1: Hero Section - Light cream background with Neural Network Visual */}
      <section className="relative min-h-[580px] overflow-hidden">
        {/* Background - Light beige/cream */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #d4cfbc 0%, #c8c3b0 50%, #d0cbb9 100%)'
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
            
            {/* Right - Neural Network with Functional Icons */}
            <div className="relative h-[420px] lg:h-[480px] flex items-center justify-center">
              <div className="relative w-full max-w-[450px] h-full flex items-center justify-center">
                {/* Central Neural Network Cluster */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-56 md:h-56" style={{ animation: 'pulse 4s ease-in-out infinite' }}>
                    <defs>
                      <radialGradient id="clusterGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9"/>
                        <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6"/>
                        <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.3"/>
                      </radialGradient>
                      <filter id="blur">
                        <feGaussianBlur stdDeviation="2"/>
                      </filter>
                    </defs>
                    {/* Outer glow */}
                    <circle cx="100" cy="100" r="90" fill="url(#clusterGlow)" filter="url(#blur)" opacity="0.5"/>
                    {/* Main cluster sphere */}
                    <circle cx="100" cy="100" r="70" fill="url(#clusterGlow)"/>
                    {/* Inner network dots */}
                    {[...Array(40)].map((_, i) => {
                      const angle = (i / 40) * Math.PI * 2;
                      const radius = 20 + Math.random() * 40;
                      const cx = 100 + Math.cos(angle) * radius;
                      const cy = 100 + Math.sin(angle) * radius;
                      return (
                        <circle key={i} cx={cx} cy={cy} r={1 + Math.random() * 2} fill="white" opacity={0.5 + Math.random() * 0.5}>
                          <animate attributeName="opacity" values={`${0.3 + Math.random() * 0.3};${0.7 + Math.random() * 0.3};${0.3 + Math.random() * 0.3}`} dur={`${2 + Math.random() * 2}s`} repeatCount="indefinite"/>
                        </circle>
                      );
                    })}
                    {/* Central bright core */}
                    <circle cx="100" cy="100" r="25" fill="white" opacity="0.3"/>
                    <circle cx="100" cy="100" r="15" fill="white" opacity="0.5"/>
                  </svg>
                </div>
                
                {/* Connecting Lines to Icons */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 450 480">
                  {/* Lines from center to each icon */}
                  <line x1="225" y1="240" x2="70" y2="100" stroke="#3B82F6" strokeWidth="1.5" opacity="0.4">
                    <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite"/>
                  </line>
                  <line x1="225" y1="240" x2="380" y2="80" stroke="#3B82F6" strokeWidth="1.5" opacity="0.4">
                    <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" repeatCount="indefinite"/>
                  </line>
                  <line x1="225" y1="240" x2="410" y2="240" stroke="#3B82F6" strokeWidth="1.5" opacity="0.4">
                    <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.2s" repeatCount="indefinite"/>
                  </line>
                  <line x1="225" y1="240" x2="380" y2="400" stroke="#3B82F6" strokeWidth="1.5" opacity="0.4">
                    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2.8s" repeatCount="indefinite"/>
                  </line>
                  <line x1="225" y1="240" x2="70" y2="380" stroke="#3B82F6" strokeWidth="1.5" opacity="0.4">
                    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.5s" repeatCount="indefinite"/>
                  </line>
                  <line x1="225" y1="240" x2="40" y2="240" stroke="#3B82F6" strokeWidth="1.5" opacity="0.4">
                    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2.6s" repeatCount="indefinite"/>
                  </line>
                </svg>
                
                {/* Floating Icon Modules */}
                {/* Top Left - Gear/Settings Icon */}
                <div className="absolute top-8 left-4 w-14 h-14 bg-[#0B1F3B] rounded-lg flex items-center justify-center shadow-lg" style={{ animation: 'floatIcon1 5s ease-in-out infinite' }}>
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                  </svg>
                </div>
                
                {/* Top Right - Tree/Network Structure Icon */}
                <div className="absolute top-4 right-8 w-14 h-14 bg-[#0B1F3B] rounded-lg flex items-center justify-center shadow-lg" style={{ animation: 'floatIcon2 4.5s ease-in-out infinite' }}>
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M12 3v18"/>
                    <path d="M12 7l-4-4"/>
                    <path d="M12 7l4-4"/>
                    <path d="M12 13l-6-3"/>
                    <path d="M12 13l6-3"/>
                    <path d="M12 19l-4 2"/>
                    <path d="M12 19l4 2"/>
                  </svg>
                </div>
                
                {/* Right - Layers/Stack Icon */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-14 h-14 bg-[#0B1F3B] rounded-lg flex items-center justify-center shadow-lg" style={{ animation: 'floatIcon3 5.5s ease-in-out infinite' }}>
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                
                {/* Bottom Right - Brain/AI Icon */}
                <div className="absolute bottom-12 right-8 w-14 h-14 bg-[#0B1F3B] rounded-lg flex items-center justify-center shadow-lg" style={{ animation: 'floatIcon4 4s ease-in-out infinite' }}>
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M12 2a4 4 0 014 4v1a4 4 0 01-4 4 4 4 0 01-4-4V6a4 4 0 014-4z"/>
                    <path d="M6 11a6 6 0 0012 0"/>
                    <path d="M12 22v-5"/>
                    <path d="M9 17l3 5 3-5"/>
                    <circle cx="9" cy="6" r="1"/>
                    <circle cx="15" cy="6" r="1"/>
                  </svg>
                </div>
                
                {/* Bottom Left - Analytics/Chart Icon */}
                <div className="absolute bottom-8 left-4 w-14 h-14 bg-[#0B1F3B] rounded-lg flex items-center justify-center shadow-lg" style={{ animation: 'floatIcon5 5s ease-in-out infinite' }}>
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M18 20V10"/>
                    <path d="M12 20V4"/>
                    <path d="M6 20v-6"/>
                    <circle cx="12" cy="4" r="2"/>
                  </svg>
                </div>
                
                {/* Left - Data/User Icon */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-14 h-14 bg-[#0B1F3B] rounded-lg flex items-center justify-center shadow-lg" style={{ animation: 'floatIcon6 4.8s ease-in-out infinite' }}>
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="white" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M3 9h18"/>
                    <path d="M3 15h18"/>
                    <path d="M9 3v18"/>
                    <path d="M15 3v18"/>
                  </svg>
                </div>
              </div>
              
              {/* Animation keyframes */}
              <style>{`
                @keyframes pulse {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.05); }
                }
                @keyframes floatIcon1 {
                  0%, 100% { transform: translate(0, 0); }
                  50% { transform: translate(5px, -8px); }
                }
                @keyframes floatIcon2 {
                  0%, 100% { transform: translate(0, 0); }
                  50% { transform: translate(-6px, -6px); }
                }
                @keyframes floatIcon3 {
                  0%, 100% { transform: translateY(-50%); }
                  50% { transform: translateY(calc(-50% - 10px)); }
                }
                @keyframes floatIcon4 {
                  0%, 100% { transform: translate(0, 0); }
                  50% { transform: translate(-5px, 8px); }
                }
                @keyframes floatIcon5 {
                  0%, 100% { transform: translate(0, 0); }
                  50% { transform: translate(6px, 6px); }
                }
                @keyframes floatIcon6 {
                  0%, 100% { transform: translateY(-50%); }
                  50% { transform: translateY(calc(-50% + 8px)); }
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>
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
      <section className="py-16 bg-[#f3f1e9] border-b border-[#f3f1e9]">
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
      <section className="py-20 bg-[#fffdf7]">
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
