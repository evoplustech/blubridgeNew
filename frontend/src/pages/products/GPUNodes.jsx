import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Zap, Server, Cpu, Database, Cloud, Shield, Settings } from 'lucide-react';

const GPUNodes = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const canvasRef = useRef(null);
  const [activeGpu, setActiveGpu] = useState(0);

  // Animated hero canvas effect
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

    const drawGPUAnimation = () => {
      time += 0.012;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Main GPU shape - rotating cube-like structure
      const cubeSize = Math.min(width, height) * 0.25;
      const rotationX = time * 0.3;
      const rotationY = time * 0.5;

      // Draw data streams flowing into GPU
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time * 0.5;
        const radius = cubeSize * 1.8;
        const startX = centerX + Math.cos(angle) * radius;
        const startY = centerY + Math.sin(angle) * radius * 0.5;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        // Bezier curve to center
        const controlX = centerX + Math.cos(angle + 0.5) * radius * 0.5;
        const controlY = centerY + Math.sin(angle + 0.5) * radius * 0.3;
        ctx.quadraticCurveTo(controlX, controlY, centerX, centerY);
        
        const gradient = ctx.createLinearGradient(startX, startY, centerX, centerY);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.3 + Math.sin(time + i) * 0.2})`);
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.6)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Animated particles along paths
        const particleT = (time * 0.5 + i * 0.125) % 1;
        const px = startX + (centerX - startX) * particleT;
        const py = startY + (centerY - startY) * particleT;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${0.8 - particleT * 0.5})`;
        ctx.fill();
      }

      // Central GPU chip visualization
      const chipSize = cubeSize * 0.8;
      
      // Outer glow
      const glowGradient = ctx.createRadialGradient(centerX, centerY, chipSize * 0.3, centerX, centerY, chipSize * 1.5);
      glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
      glowGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.1)');
      glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.beginPath();
      ctx.arc(centerX, centerY, chipSize * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // GPU chip body - 3D effect
      const perspective = 0.3;
      const offsetX = Math.sin(rotationY) * chipSize * perspective;
      const offsetY = Math.sin(rotationX) * chipSize * perspective * 0.5;

      // Back face
      ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
      ctx.fillRect(centerX - chipSize/2 + offsetX * 0.5, centerY - chipSize/2 + offsetY * 0.5, chipSize, chipSize);

      // Main face
      const mainGradient = ctx.createLinearGradient(centerX - chipSize/2, centerY - chipSize/2, centerX + chipSize/2, centerY + chipSize/2);
      mainGradient.addColorStop(0, 'rgba(30, 58, 138, 0.9)');
      mainGradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.8)');
      mainGradient.addColorStop(1, 'rgba(30, 58, 138, 0.9)');
      ctx.fillStyle = mainGradient;
      ctx.fillRect(centerX - chipSize/2, centerY - chipSize/2, chipSize, chipSize);

      // GPU grid pattern
      const gridSize = 8;
      const cellSize = chipSize / gridSize;
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const cellX = centerX - chipSize/2 + i * cellSize + cellSize * 0.1;
          const cellY = centerY - chipSize/2 + j * cellSize + cellSize * 0.1;
          const brightness = Math.sin(time * 3 + i * 0.5 + j * 0.5) * 0.3 + 0.5;
          ctx.fillStyle = `rgba(96, 165, 250, ${brightness * 0.6})`;
          ctx.fillRect(cellX, cellY, cellSize * 0.8, cellSize * 0.8);
        }
      }

      // Chip border glow
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - chipSize/2, centerY - chipSize/2, chipSize, chipSize);

      // Corner connectors
      const connectorLength = 20;
      const corners = [
        { x: centerX - chipSize/2, y: centerY - chipSize/2 },
        { x: centerX + chipSize/2, y: centerY - chipSize/2 },
        { x: centerX - chipSize/2, y: centerY + chipSize/2 },
        { x: centerX + chipSize/2, y: centerY + chipSize/2 }
      ];

      corners.forEach((corner, idx) => {
        const dirX = idx % 2 === 0 ? -1 : 1;
        const dirY = idx < 2 ? -1 : 1;
        
        ctx.beginPath();
        ctx.moveTo(corner.x, corner.y);
        ctx.lineTo(corner.x + dirX * connectorLength, corner.y);
        ctx.moveTo(corner.x, corner.y);
        ctx.lineTo(corner.x, corner.y + dirY * connectorLength);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
        ctx.lineWidth = 3;
        ctx.stroke();
      });

      // Floating data nodes around GPU
      for (let i = 0; i < 12; i++) {
        const nodeAngle = (i / 12) * Math.PI * 2 + time * 0.3;
        const nodeRadius = chipSize * 1.3 + Math.sin(time + i) * 10;
        const nodeX = centerX + Math.cos(nodeAngle) * nodeRadius;
        const nodeY = centerY + Math.sin(nodeAngle) * nodeRadius * 0.6;
        const nodeSize = 4 + Math.sin(time * 2 + i) * 2;
        
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${0.4 + Math.sin(time + i) * 0.3})`;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(drawGPUAnimation);
    };

    resize();
    window.addEventListener('resize', resize);
    drawGPUAnimation();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const performanceMetrics = [
    {
      metric: "4×",
      title: "FASTER",
      description: "Accelerate AI model training by 4x faster than standard CPU alternatives.",
      link: "Learn More"
    },
    {
      metric: "25×",
      title: "EFFICIENCY",
      description: "Maximize your GPU utilization with intelligent workload distribution.",
      link: "Learn More"
    },
    {
      metric: "30×",
      title: "FASTER",
      description: "Achieve 30x faster model inference with Tensor Core GPUs.",
      link: "Get a quote"
    },
    {
      metric: "10×",
      title: "FASTER",
      description: "Process massive datasets 10x faster with NVLink interconnects.",
      link: "Learn More"
    }
  ];

  const gpuCards = [
    {
      name: "NVIDIA H100",
      description: "Enterprise-grade AI training with 80GB HBM3 memory and 3TB/s bandwidth.",
      highlighted: true,
      color: "from-purple-600/30 to-purple-900/50"
    },
    {
      name: "NVIDIA H200",
      description: "Next-generation inference with 141GB HBM3e memory for large model deployment.",
      highlighted: false,
      color: "from-slate-700/50 to-slate-800/50"
    },
    {
      name: "NVIDIA GB200 NVL72",
      description: "Designed for the next wave of data-center AI computing.",
      highlighted: false,
      color: "from-slate-700/50 to-slate-800/50"
    }
  ];

  const services = [
    { name: "Serverless", icon: Cloud },
    { name: "Marketplace", icon: LayoutGrid },
    { name: "Inference", icon: Zap },
    { name: "Training", icon: Cpu },
    { name: "GPU nodes", icon: Server },
    { name: "LLM Library", icon: Database }
  ];

  const faqs = [
    {
      question: "What is GPU Nodes from BluBrg and how does it work?",
      answer: "GPU Nodes from BluBrg provides dedicated NVIDIA accelerated compute resources for AI workloads. You get bare-metal access to enterprise-grade GPUs with full control over your infrastructure, enabling you to run training, inference, and data processing workloads at scale."
    },
    {
      question: "What types of GPUs does BluBrg offer?",
      answer: "BluBrg offers the latest NVIDIA accelerators including H100, H200, and GB200 NVL72. Each GPU type is optimized for different workloads - from large-scale training to high-throughput inference."
    },
    {
      question: "What are the benefits of using GPU Nodes from BluBrg?",
      answer: "Key benefits include bare-metal performance with no virtualization overhead, flexible scaling from single GPUs to large clusters, enterprise-grade security, 24/7 support, and cost-efficient pricing with no hidden fees."
    },
    {
      question: "What industries can benefit from GPU Nodes?",
      answer: "GPU Nodes serve diverse industries including AI/ML research, healthcare for medical imaging and drug discovery, finance for risk modeling, automotive for autonomous driving development, and entertainment for rendering and content generation."
    },
    {
      question: "How secure is GPU Nodes with BluBrg?",
      answer: "BluBrg implements enterprise-grade security including isolated network environments, encrypted data at rest and in transit, SOC 2 Type II compliance, and dedicated security teams monitoring infrastructure 24/7."
    },
    {
      question: "Can I try GPU Nodes from BluBrg before committing?",
      answer: "Yes, BluBrg offers flexible trial options. Contact our sales team to discuss proof-of-concept deployments and evaluation periods tailored to your specific requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-['DM_Sans']">
      {/* Hero Section with Animation */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />
        
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
                  <Server className="w-3 h-3 text-white" />
                </div>
                <span className="text-blue-400 text-sm font-medium tracking-wide">GPU NODES</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                NVIDIA Accelerated GPU Nodes
              </h1>
              
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                Unlock high-performance AI, ML, and HPC workloads on bare-metal infrastructure. Get enterprise-grade NVIDIA GPUs with predictable pricing, energy efficiency, and fully integrated enterprise solutions.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded font-medium">
                  Get Started
                </Button>
                <Link to="/contact" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Contact Sales <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Right - Animated GPU Visual */}
            <div className="relative h-[400px] lg:h-[500px]">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full"
                style={{ background: 'transparent' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container mx-auto px-6 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-12">Performance</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {performanceMetrics.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-white">{item.metric}</span>
                  <span className="text-lg font-semibold text-white">{item.title}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                <Link to="/contact" className="inline-flex items-center gap-1 text-blue-400 text-sm hover:text-blue-300 transition-colors">
                  {item.link} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No Frills GPU Compute Section */}
      <section className="py-20 bg-[#0d1117]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                No frills, just GPU compute
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                We built our GPU Nodes service for those who want the raw performance and cost advantages of bare metal, with none of the complexity. Focus your team's time and energy on AI innovation.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Get In Touch <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* GPU Nodes Card Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/80 rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Server className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-semibold">GPU Nodes</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>Clusters (1)</span>
                    <span className="ml-4">Running</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Settings className="w-4 h-4" />
                    <span>manifest.toml</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative server image placeholder */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 opacity-40">
                <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg transform rotate-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Server Visual */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 to-transparent rounded-2xl" />
                <div className="grid grid-cols-3 gap-2 p-8">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i} 
                      className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg border border-slate-600/50 flex items-center justify-center"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <Server className="w-8 h-8 text-slate-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Infrastructure that grows<br />
                <span className="text-blue-400">with you</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                Our infrastructure is designed with and built on the same infrastructure you use every day. As your needs change, scale with BluBrg clusters from small to thousands of GPUs - instantly.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Contact Sales <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GPU Accelerators Section */}
      <section className="py-20 bg-[#0d1117] relative overflow-hidden">
        {/* Background server rack image effect */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
          <div className="w-full h-full bg-gradient-to-l from-slate-800/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="mb-12">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">OUR GPUS</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Built with industry leading<br />accelerators
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {gpuCards.map((gpu, index) => (
              <div 
                key={index}
                className={`relative rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                  activeGpu === index 
                    ? 'border-purple-500/50 bg-gradient-to-br ' + gpu.color
                    : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'
                }`}
                onClick={() => setActiveGpu(index)}
              >
                <h3 className="text-xl font-bold mb-3">{gpu.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{gpu.description}</p>
                {activeGpu === index && (
                  <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-purple-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated AI Services Section */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Get access to a fully<br />
                integrated suite of AI<br />
                <span className="text-blue-400">services and compute</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                Reduce costs, grow revenue, and run your AI workloads more efficiently on a fully integrated platform. Our full product suite is designed to simplify the journey from development to production.
              </p>
            </div>
            
            {/* Services Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-blue-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="font-medium text-sm">{service.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Data Center Card */}
              <div className="mt-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-4 border border-blue-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">BluBrg's Data centers</p>
                    <p className="text-xs text-gray-400">Powered by renewable energy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#0d1117]">
        <div className="container mx-auto px-6 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">FAQs</h2>
          
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border-b border-slate-700/50"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-5 text-left hover:text-blue-400 transition-colors"
                >
                  <span className="text-lg font-medium pr-8">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
            Access thousands of GPUs tailored to your requirements.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded font-medium">
              Reserve GPUs
            </Button>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors font-medium px-6 py-3">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Add missing LayoutGrid icon
const LayoutGrid = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

export default GPUNodes;
