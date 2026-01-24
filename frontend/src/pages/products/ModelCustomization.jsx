import React, { useState, useEffect } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Check, Cpu, Box, ChevronDown } from 'lucide-react';

// Animated Vertical Flow Component for Hero Section
const VerticalFlowAnimation = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [cycleKey, setCycleKey] = useState(0);
  
  const flowItems = [
    { name: 'Pre-Training', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' },
    { name: 'Fine-Tuning', color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.1)' },
    { name: 'Efficient', color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.1)' },
    { name: 'Evaluation', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' },
    { name: 'Inference', color: '#ec4899', bgColor: 'rgba(236, 72, 153, 0.1)' },
    { name: 'Applications', color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)' }
  ];

  useEffect(() => {
    setVisibleItems([]);
    
    // Stagger the appearance of each item
    flowItems.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, index * 600); // 600ms delay between each item
    });

    // After all items are shown, wait and restart
    const totalDuration = flowItems.length * 600 + 2500; // All items + 2.5s pause
    const resetTimer = setTimeout(() => {
      setCycleKey(prev => prev + 1);
    }, totalDuration);

    return () => clearTimeout(resetTimer);
  }, [cycleKey]);

  return (
    <div className="relative flex flex-col items-center justify-center h-full py-6">
      <style>{`
        @keyframes flowItemFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes connectorGrow {
          0% {
            height: 0;
            opacity: 0;
          }
          100% {
            height: 24px;
            opacity: 1;
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.4);
          }
        }
        @keyframes arrowBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(3px);
          }
        }
        .flow-item-enter {
          animation: flowItemFadeIn 0.5s ease-out forwards;
        }
        .connector-enter {
          animation: connectorGrow 0.4s ease-out forwards;
        }
        .flow-card {
          animation: pulseGlow 3s ease-in-out infinite;
        }
        .flow-arrow {
          animation: arrowBounce 1.5s ease-in-out infinite;
        }
      `}</style>
      
      {flowItems.map((item, index) => (
        <div key={`${cycleKey}-${index}`} className="flex flex-col items-center">
          {/* Flow Item Card */}
          <div
            className={`flow-card relative px-8 py-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
              visibleItems.includes(index) ? 'flow-item-enter' : 'opacity-0'
            }`}
            style={{
              backgroundColor: item.bgColor,
              borderColor: item.color + '40',
              boxShadow: visibleItems.includes(index) 
                ? `0 4px 20px ${item.color}20, 0 0 40px ${item.color}10` 
                : 'none',
              transitionDelay: `${index * 100}ms`
            }}
          >
            {/* Subtle glow effect */}
            <div 
              className="absolute inset-0 rounded-xl opacity-30"
              style={{
                background: `radial-gradient(ellipse at center, ${item.color}20 0%, transparent 70%)`
              }}
            />
            
            {/* Icon indicator */}
            <div 
              className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            
            <span 
              className="relative text-base font-semibold tracking-wide"
              style={{ color: item.color }}
            >
              {item.name}
            </span>
          </div>
          
          {/* Connector Arrow (not after last item) */}
          {index < flowItems.length - 1 && (
            <div 
              className={`flex flex-col items-center my-1 ${
                visibleItems.includes(index) ? 'connector-enter' : 'opacity-0 h-0'
              }`}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
            >
              {/* Vertical line */}
              <div 
                className="w-0.5 h-4 rounded-full"
                style={{ 
                  background: `linear-gradient(to bottom, ${item.color}60, ${flowItems[index + 1]?.color}60)` 
                }}
              />
              {/* Arrow icon */}
              <ChevronDown 
                className="flow-arrow w-4 h-4 -mt-1"
                style={{ color: flowItems[index + 1]?.color || item.color }}
                strokeWidth={2.5}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ModelCustomization = () => {
  const [openFaq, setOpenFaq] = useState(null);



  useDocumentTitle('Model Customization | BluBridge');

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
            
            {/* Right - Animated Vertical Flow */}
            <div className="relative h-[400px] lg:h-[480px] flex items-center justify-center">
              <VerticalFlowAnimation />
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
      {/* <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#000000] mb-16">Customizing brings Efficiency and more</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                metric: '11×', 
                label: 'MODELS IN PRODUCTION', 
                sublabel: 'Accelerate Time to Value',
                desc: 'Enterprises deployed eleven times more AI models this year than last, marking a decisive shift toward real, customized systems in production.',
                link: 'Learn More',
                linkTo: '/about'
              },
              { 
                metric: '70%', 
                label: 'TAILORED INTELLIGENCE', 
                sublabel: 'More performance for less.',
                desc: 'Most organizations now adapt base models with their own data, replacing generic outputs with domain-specific understanding.',
                link: 'Our Data Centres',
                linkTo: '/products/glomfjord'
              },
              { 
                metric: '76%', 
                label: 'BUILT FOR CONTROL', 
                sublabel: 'Improved Resource Utilisation',
                desc: ' A clear majority choose open models to enable fine-tuning, governance, and task-level optimization.',
                link: 'See GPU Nodes',
                linkTo: '/products/gpu-nodes'
              }
            ].map((item, i) => (
              <div key={i} className="border-l border-[#D6DEC3] pl-6">
                <div className="text-4xl lg:text-5xl font-bold text-[#000000] mb-1">{item.metric}</div>
                <div className="text-sm font-semibold text-[#328CC1] uppercase tracking-wider mb-2">{item.label}</div>
                <p className="text-[#000000] text-sm leading-relaxed mb-4">{item.desc}</p>
                 
              </div>
            ))}
          </div>
        </div>
      </section> */}

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
