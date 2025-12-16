import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Server, Layers, Cpu } from 'lucide-react';

const Training = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const canvasRef = useRef(null);

  // Animated 3D geometric shape for hero
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

    const draw3DGeometric = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Draw rotating abstract geometric shape
      ctx.save();
      ctx.translate(centerX, centerY);

      // Create multiple layers of rotating polygons
      for (let layer = 0; layer < 5; layer++) {
        const layerTime = time + layer * 0.3;
        const scale = 1 - layer * 0.15;
        const rotation = layerTime * (layer % 2 === 0 ? 0.3 : -0.2);
        const alpha = 0.6 - layer * 0.1;
        
        ctx.save();
        ctx.rotate(rotation);
        ctx.scale(scale, scale);

        // Draw angular shape
        const sides = 6;
        const radius = Math.min(width, height) * 0.35;
        const breathe = Math.sin(time * 1.5 + layer) * 10;

        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
          const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
          const r = radius + breathe + (i % 2 === 0 ? 20 : 0);
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        // Gradient fill
        const gradient = ctx.createLinearGradient(-radius, -radius, radius, radius);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha * 0.3})`);
        gradient.addColorStop(0.5, `rgba(99, 160, 255, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, ${alpha * 0.2})`);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Edge glow
        ctx.strokeStyle = `rgba(100, 180, 255, ${alpha * 0.8})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      }

      // Add inner geometric details
      for (let i = 0; i < 3; i++) {
        const detailRadius = 40 + i * 30;
        const detailTime = time * 0.5 + i;
        
        ctx.beginPath();
        ctx.arc(
          Math.cos(detailTime) * 30,
          Math.sin(detailTime) * 30,
          detailRadius,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 - i * 0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Floating particles
      for (let i = 0; i < 15; i++) {
        const angle = time + i * (Math.PI * 2 / 15);
        const dist = 80 + Math.sin(time * 2 + i) * 30;
        const px = Math.cos(angle) * dist;
        const py = Math.sin(angle) * dist;
        const size = 2 + Math.sin(time + i) * 1;
        
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 180, 255, ${0.5 + Math.sin(time + i) * 0.2})`;
        ctx.fill();
      }

      ctx.restore();

      animationFrame = requestAnimationFrame(draw3DGeometric);
    };

    resize();
    window.addEventListener('resize', resize);
    draw3DGeometric();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Performance metrics data
  const performanceMetrics = [
    {
      metric: '+40%',
      label: 'EFFICIENCY',
      title: 'Improved resource utilisation',
      description: 'Up to 40% improvement on efficiency.',
      link: '/products/training'
    },
    {
      metric: '7.2X',
      label: 'FASTER',
      title: 'On throughput and latency',
      description: 'AMD MI300X GPUs with GEMM tuning improves throughput and latency by up to 7.2x.',
      link: '/products/gpu-nodes'
    },
    {
      metric: '80%',
      label: 'LOWER COST',
      title: 'More performance for less',
      description: 'BluBrg delivers on average 80% cost-saving in comparison to hyperscalers.',
      link: '/pricing'
    },
    {
      metric: '30%',
      label: 'FASTER',
      title: 'On time to insights',
      description: 'BluBrg Cloud accelerates time to insights by up to 30% thanks to its AI-optimised stack.',
      link: '/products/inference'
    }
  ];

  // Feature strip data
  const features = [
    {
      icon: Layers,
      title: 'Managed Kubernetes',
      description: 'Simplify AI training with our managed Kubernetes service. We handle infrastructure and scaling, so you can focus on developing your models.'
    },
    {
      icon: Server,
      title: 'Advanced Scheduling',
      description: 'Use Slurm on Kubernetes (SLONK) for advanced job scheduling and resource allocation. Enhance efficiency and performance of complex AI workloads.'
    },
    {
      icon: Cpu,
      title: 'Purpose Built GPU Compute',
      description: 'Scalable GPU clusters built for training LLMs. Ideal for all project sizes and model fine-tuning, utilising our high performing, flexible hardware.'
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "What is our Managed Kubernetes service for AI training?",
      answer: "Our Managed Kubernetes service is purpose-built for AI training workloads. It provides automated scaling, orchestration, and seamless integration with your workflows. We handle all infrastructure management, so you can focus entirely on model development and innovation."
    },
    {
      question: "How does SLONK enhance AI workload management?",
      answer: "SLONK (Slurm on Kubernetes) combines the best of both worlds - Slurm's advanced job scheduling with Kubernetes' container orchestration. It provides sophisticated queue management, resource allocation, and workload prioritization specifically designed for LLM training."
    },
    {
      question: "Can I scale my AI training projects with your GPU clusters?",
      answer: "Absolutely. Our GPU clusters are designed to scale seamlessly from small experiments to large-scale production training. Whether you need a few GPUs for fine-tuning or thousands for training foundation models, our infrastructure adapts to your needs."
    },
    {
      question: "What types of AI workloads are supported by your services?",
      answer: "We support a wide range of AI workloads including LLM pre-training and fine-tuning, computer vision model training, reinforcement learning, multi-modal model development, and more. Our infrastructure is optimized for both research and production workloads."
    }
  ];

  // Infrastructure services for diagram
  const infrastructureServices = [
    { name: 'Serverless', type: 'service' },
    { name: 'Marketplace', type: 'service' },
    { name: 'Inference', type: 'compute' },
    { name: 'Training', type: 'compute' },
    { name: 'LLM Library', type: 'tool' },
    { name: 'Job Management', type: 'tool' },
    { name: 'Container Orchestration', type: 'tool' },
    { name: 'Optimised Libraries', type: 'tool' },
    { name: 'GPU nodes', type: 'hardware' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-['DM_Sans']">
      {/* SECTION 1: Hero Section with Animated 3D Geometric Visual */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Background gradient with subtle animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d1420] to-[#0a0a0f]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[120px] animate-pulse" />
        </div>
        
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content with Animation */}
            <div className="space-y-6" style={{ animation: 'fadeInUp 1s ease-out' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 rounded-full border border-blue-600/30">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-blue-400 text-sm font-medium">TRAINING</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}>
                Compute purpose-<br />built for AI<br />workloads
              </h1>
              
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed" style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}>
                Train LLMs and other AI models on high-performance GPU clusters. Our Managed Kubernetes and Slurm orchestration options allow for easy management and complete utilisation of your compute.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4" style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
                <Link to="/contact">
                  <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded font-medium">
                    Get Started
                  </Button>
                </Link>
                <Link to="/contact" className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors font-medium">
                  Contact Sales <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Right - Animated 3D Geometric Visual */}
            <div className="relative h-[400px] lg:h-[450px]" style={{ animation: 'fadeInRight 1s ease-out 0.4s both' }}>
              <div className="absolute inset-0 bg-slate-900/50 rounded-2xl border border-slate-700/30 overflow-hidden">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full"
                  style={{ background: 'transparent' }}
                />
              </div>
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

      {/* SECTION 2: Performance Metrics Strip */}
      <section className="py-16 bg-[#0a0a0f] border-t border-b border-slate-800/50">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-4 gap-8">
            {performanceMetrics.map((item, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {item.metric} <span className="text-lg font-medium">{item.label}</span>
                </div>
                <p className="text-white font-medium mb-1">{item.title}</p>
                <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                <Link to={item.link} className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1 justify-center md:justify-start">
                  Learn More <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Dynamic Workload Management */}
      <section className="py-20 bg-[#0d1117]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Dynamically manage AI<br />workloads and resources
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our Managed Kubernetes service was built for training LLMs. BluBrg handles the infrastructure, so you can focus on innovation. Benefit from automated scaling, orchestration, and seamless integration with your workflows.
              </p>
              <Link to="/contact">
                <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded font-medium">
                  Get Started <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </Link>
            </div>
            
            {/* Workload Management UI Visual */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center gap-4 mb-4">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg">Queues (3)</button>
                <button className="px-4 py-2 text-gray-400 text-sm hover:text-white transition-colors">Nodes</button>
              </div>
              
              {/* Queue Items */}
              <div className="space-y-3">
                {['xl-70b-queue-1', 'xl-70b-queue-2'].map((queue, i) => (
                  <div key={i} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{queue}</span>
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Active</span>
                    </div>
                    <div className="text-xs text-gray-500">Nodeset: compute-nodes-{i + 1}</div>
                  </div>
                ))}
              </div>
              
              {/* Nodes Info */}
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <div className="text-xs text-gray-500 mb-2">Nodes (4)</div>
                <div className="grid grid-cols-2 gap-2">
                  {['328241', '328244', '328247', '328255'].map((nodeId, i) => (
                    <div key={i} className="bg-slate-800/30 rounded px-3 py-2 text-xs">
                      <span className="text-gray-400">Node ID:</span> <span className="text-blue-400">{nodeId}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Advanced Scheduling */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Node Diagram Visual */}
            <div className="bg-slate-900/30 rounded-xl border border-slate-700/30 p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded">COMPUTE</span>
                <span className="text-gray-400 text-sm">Node allocation</span>
              </div>
              
              {/* Node Grid */}
              <div className="grid grid-cols-4 gap-3">
                {['328241', '328244', '328247', '328255', '328258', '328261', '328264', '328267'].map((id, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-lg text-center ${i < 4 ? 'bg-blue-600/30 border border-blue-500/50' : 'bg-slate-800/50 border border-slate-700/30'}`}
                  >
                    <div className={`text-xs font-mono ${i < 4 ? 'text-blue-300' : 'text-gray-500'}`}>{id}</div>
                  </div>
                ))}
              </div>
              
              {/* Connecting lines animation placeholder */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full opacity-20">
                  <line x1="25%" y1="50%" x2="75%" y2="50%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5,5" />
                </svg>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                with our advanced<br />scheduler
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Get the best of both worlds with our Slurm on Kubernetes (SLONK) service. Enjoy advanced job scheduling, resource allocation, and efficient workload management when training LLMs.
              </p>
              <Link to="/docs">
                <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded font-medium">
                  Learn More <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Industry-leading GPU Clusters */}
      <section className="py-20 bg-[#0d1117]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Industry leading GPU<br />clusters at all scales
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our GPU clusters are flexible and scalable to meet training needs of all types and sizes. Whether you're scaling up for large projects or fine-tuning models, our clusters provide the power and efficiency required.
              </p>
              <Link to="/products/gpu-nodes">
                <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded font-medium">
                  Reserve GPUs <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </Link>
            </div>
            
            {/* GPU Server Rack Visual */}
            <div className="relative">
              <div className="bg-slate-900/50 rounded-xl border border-slate-700/30 p-6 aspect-video flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  {/* Stylized server rack representation */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="h-8 bg-slate-700/50 rounded border border-slate-600/30 flex items-center justify-center">
                        <div className="flex gap-0.5">
                          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                          <div className="w-1 h-1 rounded-full bg-blue-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm">NVIDIA H100 • H200 • GB200 NVL72</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Feature Strip (Three Columns) */}
      <section className="py-16 bg-[#0a0a0f] border-t border-b border-slate-800/50">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="text-center md:text-left">
                <feature.icon className="w-10 h-10 text-blue-500 mb-4 mx-auto md:mx-0" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Fully Integrated AI Infrastructure */}
      <section className="py-20 bg-[#0d1117]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get access to a fully<br />integrated suite of AI<br />services and compute
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Reduce costs, grow revenue, and run your AI workloads more efficiently on a fully integrated platform. Whether you're using <Link to="/" className="text-blue-400 hover:underline">BluBrg</Link>'s built-in AI/ML tools or your own, our platform is designed to simplify the journey from development to production.
              </p>
            </div>
            
            {/* Infrastructure Diagram */}
            <div className="bg-slate-900/30 rounded-xl border border-slate-700/30 p-6">
              {/* Service Flow Diagram */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700/30">
                  <span className="text-sm text-gray-300">Serverless</span>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700/30">
                  <span className="text-sm text-gray-300">Marketplace</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-600/20 rounded-lg p-3 text-center border border-blue-500/30">
                  <span className="text-sm text-blue-300">Inference</span>
                </div>
                <div className="bg-blue-600/20 rounded-lg p-3 text-center border border-blue-500/30">
                  <span className="text-sm text-blue-300">Training</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                {['LLM Library', 'Job Management', 'Container Orchestration', 'Optimised Libraries'].map((item, i) => (
                  <div key={i} className="bg-slate-800/30 rounded-lg p-2 text-center border border-slate-700/20">
                    <span className="text-xs text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700/30 mb-4">
                <span className="text-sm text-gray-300">GPU nodes</span>
              </div>
              
              {/* Data Center Badge */}
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Server className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">BluBrg's Data centers</div>
                    <div className="text-xs text-gray-500">Powered by renewable energy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQs */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">FAQs</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border-b border-slate-700/50 pb-4"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left py-3 group"
                >
                  <span className="text-white text-lg pr-4">{faq.question}</span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-blue-600 rotate-180' : 'bg-blue-600/80'}`}>
                    {openFaq === index ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-400 pb-4 pr-12">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Final CTA Strip */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Access thousands of GPUs tailored to your<br />requirements.
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/products/gpu-nodes">
              <Button className="bg-slate-900 text-white hover:bg-slate-800 px-6 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors font-medium">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;
