import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Check } from 'lucide-react';

const ModelCustomization = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const canvasRef = useRef(null);

  // Animated abstract visual for hero
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

      ctx.save();
      ctx.translate(centerX, centerY);

      // Modular flowing layers
      for (let layer = 0; layer < 6; layer++) {
        const layerTime = time + layer * 0.25;
        const scale = 1 - layer * 0.12;
        const rotation = layerTime * (layer % 2 === 0 ? 0.15 : -0.1);
        const alpha = 0.5 - layer * 0.07;
        
        ctx.save();
        ctx.rotate(rotation);
        ctx.scale(scale, scale);

        // Draw flowing curved shape
        const radius = Math.min(width, height) * 0.32;
        const wave = Math.sin(time * 1.2 + layer) * 15;

        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
          const angle = (i / 60) * Math.PI * 2;
          const wobble = Math.sin(angle * 3 + time * 2 + layer) * 12;
          const r = radius + wave + wobble;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r * 0.85;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        // Gradient fill with purple/violet tones
        const gradient = ctx.createLinearGradient(-radius, -radius, radius, radius);
        gradient.addColorStop(0, `rgba(139, 92, 246, ${alpha * 0.35})`);
        gradient.addColorStop(0.5, `rgba(167, 139, 250, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(124, 58, 237, ${alpha * 0.25})`);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Edge glow
        ctx.strokeStyle = `rgba(167, 139, 250, ${alpha * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }

      // Inner modular grid pattern
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const gridX = (i - 1.5) * 35;
          const gridY = (j - 1.5) * 35;
          const pulse = Math.sin(time * 2 + i + j) * 0.3 + 0.7;
          
          ctx.beginPath();
          ctx.rect(gridX - 8, gridY - 8, 16, 16);
          ctx.strokeStyle = `rgba(167, 139, 250, ${0.2 * pulse})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Floating particles
      for (let i = 0; i < 12; i++) {
        const angle = time * 0.5 + i * (Math.PI * 2 / 12);
        const dist = 70 + Math.sin(time * 1.5 + i) * 25;
        const px = Math.cos(angle) * dist;
        const py = Math.sin(angle) * dist;
        const size = 2.5 + Math.sin(time + i) * 1;
        
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${0.5 + Math.sin(time + i) * 0.2})`;
        ctx.fill();
      }

      ctx.restore();

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

  // Performance metrics
  const performanceMetrics = [
    {
      metric: '+35%',
      label: 'ACCURACY',
      title: 'Domain-specific precision',
      description: 'Average accuracy improvements after model customization for specialized tasks.'
    },
    {
      metric: '4.5X',
      label: 'FASTER',
      title: 'Iteration cycles',
      description: 'Reduced time from concept to production-ready custom models.'
    },
    {
      metric: '60%',
      label: 'LOWER COST',
      title: 'Inference optimization',
      description: 'Reduced inference costs through targeted architecture refinement.'
    },
    {
      metric: '99.2%',
      label: 'STABILITY',
      title: 'Production reliability',
      description: 'Consistent performance across diverse production environments.'
    }
  ];

  // Customization dimensions
  const customizationDimensions = [
    {
      title: 'Data & Domain Adaptation',
      description: 'Align model behavior with your specific data distributions, domain terminology, and contextual requirements.'
    },
    {
      title: 'Model Architecture Refinement',
      description: 'Optimize model structure, layer configurations, and parameter distributions for your use case.'
    },
    {
      title: 'Training Strategy Design',
      description: 'Custom training regimens, curriculum learning, and optimization schedules tailored to objectives.'
    },
    {
      title: 'Inference & Deployment Optimization',
      description: 'Performance tuning for latency, throughput, and resource efficiency in production environments.'
    }
  ];

  // Workflow stages
  const workflowStages = [
    {
      stage: '01',
      title: 'Problem Understanding',
      description: 'Deep analysis of your domain, data characteristics, and performance requirements.'
    },
    {
      stage: '02',
      title: 'Model Adaptation',
      description: 'Architecture selection, parameter optimization, and domain-specific training strategies.'
    },
    {
      stage: '03',
      title: 'Evaluation & Validation',
      description: 'Rigorous testing against benchmarks, edge cases, and production-realistic scenarios.'
    },
    {
      stage: '04',
      title: 'Production Deployment',
      description: 'Seamless integration with monitoring, scaling, and continuous improvement pipelines.'
    }
  ];

  // Target audiences
  const audiences = [
    { title: 'Enterprises', description: 'Organizations requiring AI systems aligned with proprietary data and processes.' },
    { title: 'Research Teams', description: 'Academic and industrial researchers pushing model boundaries.' },
    { title: 'Product Teams', description: 'Builders creating AI-powered products for specific markets.' },
    { title: 'AI-Native Companies', description: 'Teams scaling from prototype to production-grade AI systems.' }
  ];

  // FAQ data
  const faqs = [
    {
      question: "What is model customization?",
      answer: "Model customization is the process of adapting foundation models to specific domains, data distributions, and performance objectives. Unlike generic fine-tuning, it involves comprehensive architectural, training, and deployment optimizations tailored to your exact requirements."
    },
    {
      question: "How is this different from fine-tuning?",
      answer: "Fine-tuning typically involves training a pre-existing model on new data with minimal architectural changes. Model customization goes further—it includes architecture modifications, training strategy design, inference optimization, and deployment configuration to achieve optimal performance for your specific use case."
    },
    {
      question: "Can existing models be customized?",
      answer: "Yes, we work with both open-weight foundation models and proprietary architectures. Our team assesses your current models and determines the most effective customization approach based on your performance targets and constraints."
    },
    {
      question: "How long does customization take?",
      answer: "Timelines vary based on complexity. Initial assessments typically complete within 2-3 weeks. Full customization projects range from 4-12 weeks depending on scope, data requirements, and target performance levels."
    },
    {
      question: "What data is required for customization?",
      answer: "Requirements depend on your objectives. We work with your existing datasets, help curate new training data, and implement data augmentation strategies. All data handling follows strict security and privacy protocols."
    }
  ];

  useDocumentTitle('Model Customization | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7] font-['DM_Sans']">
      
      {/* SECTION 1: Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden bg-[#fffdf7]">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6" style={{ animation: 'fadeInUp 1s ease-out' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B5CF6]/10 rounded-full border border-[#8B5CF6]/30">
                <span className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-pulse" />
                <span className="text-[#8B5CF6] text-sm font-medium uppercase tracking-wider">MODEL CUSTOMIZATION</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#0B1F3B]" style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}>
                Adapt models to<br />your data, domain,<br />and objectives
              </h1>
              
              <p className="text-[#2F3A4A] text-lg max-w-xl leading-relaxed" style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}>
                Transform generic AI systems into purpose-built solutions. We refine architecture, training strategies, and deployment configurations to deliver models that perform precisely for your requirements.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4" style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
                <Link to="/contact">
                  <Button className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-6 py-3 rounded font-medium">
                    Start Customization
                  </Button>
                </Link>
                <Link to="/contact" className="flex items-center gap-2 px-6 py-3 border border-[#0B1F3B] text-[#0B1F3B] rounded hover:bg-[#f3f1e9] transition-colors font-medium">
                  Schedule Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Right - Abstract Visual */}
            <div className="relative h-[400px] lg:h-[450px]" style={{ animation: 'fadeInRight 1s ease-out 0.4s both' }}>
              <canvas 
                ref={canvasRef}
                className="w-full h-full"
                style={{ maxWidth: '100%' }}
              />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </section>

      {/* SECTION 2: Performance Metrics */}
      <section className="py-16 bg-[#f3f1e9] border-t border-b border-[#D6DEC3]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#0B1F3B]">Performance & Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {performanceMetrics.map((item, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-1">
                  {item.metric} <span className="text-lg font-medium text-[#0B1F3B]">{item.label}</span>
                </div>
                <p className="text-[#0B1F3B] font-medium mb-1">{item.title}</p>
                <p className="text-[#4B5563] text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Customization Capabilities */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Deep customization<br />across every layer
              </h2>
              <p className="text-[#2F3A4A] mb-6 leading-relaxed">
                Our approach goes beyond surface-level adjustments. We analyze your data characteristics, domain requirements, and performance objectives to implement targeted modifications at every level of the model stack.
              </p>
              <p className="text-[#2F3A4A] mb-8 leading-relaxed">
                From architecture selection to inference optimization, each decision is guided by your specific constraints and goals—delivering models that perform precisely where generic solutions fall short.
              </p>
              <Link to="/contact">
                <Button className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-6 py-3 rounded font-medium">
                  Discuss Your Requirements <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </Link>
            </div>
            
            {/* Capability Cards */}
            <div className="space-y-4">
              {[
                { title: 'Data Alignment', desc: 'Match model behavior to your data distributions and domain vocabulary.' },
                { title: 'Architecture Tuning', desc: 'Optimize layer configurations, attention mechanisms, and parameter efficiency.' },
                { title: 'Objective Optimization', desc: 'Custom loss functions and training objectives aligned with business metrics.' },
                { title: 'Deployment Constraints', desc: 'Latency, memory, and throughput optimization for production requirements.' }
              ].map((item, i) => (
                <div key={i} className="bg-[#f3f1e9] rounded-lg p-5 border border-[#E5E7EB]">
                  <h4 className="font-semibold text-[#0B1F3B] mb-2">{item.title}</h4>
                  <p className="text-[#4B5563] text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Customization Dimensions */}
      <section className="py-20 bg-[#f3f1e9]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0B1F3B]">Customization Dimensions</h2>
          <p className="text-[#4B5563] mb-12 max-w-2xl">
            Every customization project addresses multiple dimensions to ensure comprehensive alignment with your requirements.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customizationDimensions.map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-[#8B5CF6] font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-semibold text-[#0B1F3B] mb-3">{item.title}</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Customization Workflow */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0B1F3B]">Customization Workflow</h2>
          <p className="text-[#4B5563] mb-12 max-w-2xl">
            A structured approach that moves efficiently from understanding to deployment.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowStages.map((item, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-bold text-[#E5E7EB] mb-4">{item.stage}</div>
                <h3 className="font-semibold text-[#0B1F3B] mb-2 text-lg">{item.title}</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Who It's Built For */}
      <section className="py-20 bg-[#f3f1e9]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0B1F3B]">Who It's Built For</h2>
          <p className="text-[#4B5563] mb-12 max-w-2xl">
            Model customization serves teams that require AI systems aligned precisely with their context.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-[#E5E7EB]">
                <h3 className="font-semibold text-[#0B1F3B] mb-2">{item.title}</h3>
                <p className="text-[#4B5563] text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQs */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#0B1F3B]">Frequently Asked Questions</h2>
          <div className="max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[#E5E7EB]">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full py-6 flex items-center justify-between text-left hover:text-[#8B5CF6] transition-colors"
                >
                  <span className="font-medium text-[#0B1F3B] text-lg pr-8">{faq.question}</span>
                  {openFaq === i ? (
                    <Minus className="w-5 h-5 text-[#8B5CF6] flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-[#4B5563] flex-shrink-0" />
                  )}
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

      {/* SECTION 8: Final CTA */}
      <section className="py-20 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to build models that perform<br />precisely for your requirements?
          </h2>
          <p className="text-[#94A3B8] mb-8 max-w-2xl mx-auto">
            Our team is ready to understand your domain, analyze your data, and deliver customized models that exceed generic alternatives.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-[#0B1F3B] hover:bg-[#f3f1e9] px-8 py-3 rounded font-medium">
                Start Your Project
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded hover:bg-white/10 transition-colors font-medium">
              Schedule a Call <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModelCustomization;
