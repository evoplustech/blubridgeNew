import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Server, Layers, Cpu,Zap,  Database, Cloud, Shield, Settings,SlidersHorizontal } from 'lucide-react';



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
      description: 'Efficiency gains reaching 40%',
      link: '/products/training'
    },
    {
      metric: '7.2X',
      label: 'FASTER',
      title: 'On throughput and latency',
      description: 'Using AMD MI300X GPUs combined with GEMM tuning delivers throughput and latency enhancements of up to 7.2×.',
      link: '/products/gpu-nodes'
    },
    {
      metric: '80%',
      label: 'LOWER COST',
      title: 'More performance for less',
      description: 'BluBridge delivers an average cost saving of up to 80% compared to hyperscalers.',
      link: '/pricing'
    },
    {
      metric: '30%',
      label: 'FASTER',
      title: 'On time to insights',
      description: 'BluBridge Cloud shortens the path to actionable insights by as much as 30%, powered by a stack purpose-built and tuned specifically for AI workloads.',
      link: '/products/inference'
    }
  ];

  // Feature strip data
  const features = [
    {
      icon: Layers,
      title: 'Managed Kubernetes',
      description: 'Streamline AI training through our managed Kubernetes offering. Platform operations and capacity growth are handled for you, allowing full attention on creating and improving models.'
    },
    {
      icon: Server,
      title: 'Advanced Scheduling',
      description: 'Leverage Slurm on Kubernetes (SLONK) to enable sophisticated task queuing and compute governance. Achieve greater effectiveness and stronger output across demanding AI workloads.'
    },
    {
      icon: Cpu,
      title: 'Purpose Built GPU Compute',
      description: 'Expandable GPU clusters purpose-built for LLM training. Suitable for projects of any scale and model refinement, powered by adaptable, high-efficiency hardware designed for demanding workloads.'
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "What is our Managed Kubernetes service for AI training?",
      answer: "The managed Kubernetes offering takes care of platform operations and elastic capacity for AI training workloads, enabling full attention on building, refining, and improving models rather than maintaining systems."
    },
    {
      question: "How does SLONK enhance AI workload management?",
      answer: "SLONK (Slurm on Kubernetes) delivers sophisticated task queuing and compute control, enhancing effectiveness and output across demanding, large-scale artificial intelligence workloads."
    },
    {
      question: "Can I scale my AI training projects with your GPU clusters?",
      answer: "Yes, the GPU cluster architecture is built to adapt and expand, supporting both modest and large LLM training initiatives as well as specialised model refinement needs."
    },
    {
      question: "What types of AI workloads are supported by your services?",
      answer: "The offerings accommodate diverse artificial intelligence use cases, spanning training processes, refinement stages, and runtime prediction tasks. The underlying platform is engineered to deliver strong throughput and operational efficiency across every capability."
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

  const LayoutGrid = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

 const services = [
    { name: "Serverless", icon: Cloud ,link:"/products/serverless"},
    { name: "Marketplace", icon: LayoutGrid,link:"/products/marketplace" },
    { name: "Inference", icon: Zap ,link:"/products/inference"},
    { name: "Training", icon: Cpu ,link:"/products/training"},
    { name: "GPU nodes", icon: Server ,link:"/products/gpu-nodes"},
    { name: "Fine-Tuning", icon: SlidersHorizontal ,link:"/products/fine-tuning"}
  ];

  // Add missing LayoutGrid icon


  useDocumentTitle('GPU Clusters for Training AI Models | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7] font-['DM_Sans']">      {/* SECTION 1: Hero Section with Animated 3D Geometric Visual */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden bg-[#fffdf7]">
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content with Animation */}
            <div className="space-y-6" style={{ animation: 'fadeInUp 1s ease-out' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#328CC1]/10 rounded-full border border-[#328CC1]/30">
                <span className="w-2 h-2 bg-[#328CC1] rounded-full animate-pulse" />
                <span className="text-[#328CC1] text-sm font-medium">TRAINING</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#0B1F3B]" style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}>
                Compute purpose-<br />built for AI<br />workloads
              </h1>
              
              <p className="text-[#2F3A4A] text-lg max-w-xl leading-relaxed" style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}>
                Develop LLMs along with additional AI systems using powerful GPU-based clusters. Managed Kubernetes and Slurm orchestration choices simplify administration while ensuring maximum usage of available computing resources.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4" style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
                <Link to="/contact">
                  <Button className="bg-white text-[#0B1F3B] border border-[#0B1F3B] hover:bg-[#f3f1e9] px-6 py-3 rounded font-medium">
                    Get Started
                  </Button>
                </Link>
                <Link to="/contact" className="flex items-center gap-2 text-[#328CC1] hover:text-[#0B1F3B] transition-colors font-medium">
                  Contact <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Right - Training Cluster with Ultra-Realistic Motion */}
            <div className="relative h-[400px] lg:h-[450px]" style={{ animation: 'fadeInRight 1s ease-out 0.4s both' }}>
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                {/* Main cluster image with micro-floating motion */}
                <div className="relative w-full h-full training-cluster-float">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_logo-update-17/artifacts/d2sd6azc_Training%20Cluster.png"
                    alt="AI training cluster visualization"
                    className="w-full h-full object-contain"
                    style={{
                      filter: 'drop-shadow(0 0 60px rgba(59, 130, 246, 0.25))',
                      maskImage: 'radial-gradient(ellipse 92% 88% at 50% 50%, black 70%, transparent 100%)',
                      WebkitMaskImage: 'radial-gradient(ellipse 92% 88% at 50% 50%, black 70%, transparent 100%)'
                    }}
                  />
                  
                  {/* Overlay for internal light pulsing effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Central core glow pulse */}
                    <div className="training-core-pulse absolute" style={{ left: '50%', top: '50%', width: '120px', height: '120px' }} />
                    
                    {/* Outer sphere drift indicators - subtle glow points */}
                    <div className="training-sphere-drift absolute" style={{ left: '30%', top: '35%', animationDelay: '0s' }} />
                    <div className="training-sphere-drift absolute" style={{ left: '70%', top: '35%', animationDelay: '1.5s' }} />
                    <div className="training-sphere-drift absolute" style={{ left: '25%', top: '60%', animationDelay: '3s' }} />
                    <div className="training-sphere-drift absolute" style={{ left: '75%', top: '60%', animationDelay: '4.5s' }} />
                    <div className="training-sphere-drift absolute" style={{ left: '50%', top: '25%', animationDelay: '2s' }} />
                    <div className="training-sphere-drift absolute" style={{ left: '50%', top: '75%', animationDelay: '5s' }} />
                    
                    {/* Connection line shimmer effects */}
                    <div className="training-line-shimmer absolute" style={{ left: '35%', top: '45%', width: '80px', transform: 'rotate(-25deg)', animationDelay: '0s' }} />
                    <div className="training-line-shimmer absolute" style={{ left: '55%', top: '45%', width: '80px', transform: 'rotate(25deg)', animationDelay: '2s' }} />
                    <div className="training-line-shimmer absolute" style={{ left: '40%', top: '55%', width: '60px', transform: 'rotate(45deg)', animationDelay: '4s' }} />
                    <div className="training-line-shimmer absolute" style={{ left: '55%', top: '55%', width: '60px', transform: 'rotate(-45deg)', animationDelay: '6s' }} />
                  </div>
                </div>
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
          
          /* Ultra-smooth micro-floating for entire cluster - cinematic feel */
          @keyframes trainingClusterFloat {
            0% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-4px) translateX(2px); }
            50% { transform: translateY(-6px) translateX(0px); }
            75% { transform: translateY(-3px) translateX(-2px); }
            100% { transform: translateY(0px) translateX(0px); }
          }
          .training-cluster-float {
            animation: trainingClusterFloat 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          
          /* Central core gentle pulsing - breathing effect */
          @keyframes trainingCorePulse {
            0%, 100% { 
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.85);
              box-shadow: 0 0 30px 15px rgba(59, 130, 246, 0);
            }
            50% { 
              opacity: 0.35;
              transform: translate(-50%, -50%) scale(1.1);
              box-shadow: 0 0 50px 25px rgba(59, 130, 246, 0.15);
            }
          }
          .training-core-pulse {
            border-radius: 50%;
            background: radial-gradient(circle, rgba(100, 180, 255, 0.25) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%);
            animation: trainingCorePulse 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            transform: translate(-50%, -50%);
          }
          
          /* Outer sphere subtle independent drift - physics-like */
          @keyframes trainingSphereGlow {
            0%, 100% { 
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.8);
            }
            30% { 
              opacity: 0.5;
              transform: translate(-50%, -50%) scale(1);
            }
            70% { 
              opacity: 0.3;
              transform: translate(-50%, -50%) scale(1.15);
            }
          }
          .training-sphere-drift {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(100, 180, 255, 0.5) 0%, transparent 70%);
            animation: trainingSphereGlow 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            transform: translate(-50%, -50%);
          }
          
          /* Connection line shimmer - subtle energy flow */
          @keyframes trainingLineShimmer {
            0%, 100% { 
              opacity: 0;
              background: linear-gradient(90deg, transparent, transparent);
            }
            40% { 
              opacity: 0.6;
              background: linear-gradient(90deg, transparent, rgba(100, 180, 255, 0.4), rgba(150, 200, 255, 0.6), rgba(100, 180, 255, 0.4), transparent);
            }
            60% { 
              opacity: 0.4;
              background: linear-gradient(90deg, transparent, rgba(100, 180, 255, 0.3), rgba(150, 200, 255, 0.5), rgba(100, 180, 255, 0.3), transparent);
            }
          }
          .training-line-shimmer {
            height: 2px;
            border-radius: 1px;
            animation: trainingLineShimmer 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            filter: blur(0.5px);
          }
        `}</style>
      </section>

      {/* SECTION 2: Performance Metrics Strip */}
      <section className="py-16 bg-[#f3f1e9] border-t border-b border-[#D6DEC3]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#000000]">Performance</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {performanceMetrics.map((item, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-[#000000] mb-1">
                  {item.metric} <span className="text-lg font-medium text-[#000000]">{item.label}</span>
                </div>
                <p className="text-[#000000] font-medium mb-1">{item.title}</p>
                <p className="text-[#000000] text-sm mb-3">{item.description}</p>
                {/* <Link to={item.link} className="text-[#328CC1] text-sm hover:text-blue-300 flex items-center gap-1 justify-center md:justify-start">
                  Learn More <ArrowRight className="w-3 h-3" />
                </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Dynamic Workload Management */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Dynamically manage AI<br />workloads and resources
              </h2>
              <p className="text-[#2F3A4A] mb-6 leading-relaxed">
                Our Managed Kubernetes offering is purpose-built to support LLM training. BluBridge takes care of the underlying platform, allowing teams to concentrate on innovation. Take advantage of automatic capacity adjustment, coordinated workloads, and smooth alignment with existing processes.
              </p>
              <Link to="/contact">
                <Button className="bg-white text-[#0B1F3B] border border-[#0B1F3B] hover:bg-[#f3f1e9] px-6 py-3 rounded font-medium">
                  Get Started <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </Link>
            </div>
            
            {/* Workload Management UI Visual */}
            <div className="bg-[#0a0a0f] rounded-xl border border-[#D6DEC3] p-6">
              <div className="flex items-center gap-4 mb-4">
                <button className="px-4 py-2 bg-[#0B1F3B] text-white text-sm rounded-lg">Queues (3)</button>
                {/* <button className="px-4 py-2 text-[#2F3A4A] text-sm hover:text-white transition-colors">Nodes</button> */}
              </div>
              
              {/* Queue Items */}
              <div className="space-y-3">
                {['xl-70b-queue-1', 'xl-70b-queue-2'].map((queue, i) => (
                  <div key={i} className="bg-[#1a1a2e] rounded-lg p-4 border border-[#333]/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{queue}</span>
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Active</span>
                    </div>
                    <div className="text-xs text-white/60">Nodeset: compute-nodes-{i + 1}</div>
                  </div>
                ))}
              </div>
              
              {/* Nodes Info */}
              <div className="mt-4 pt-4 border-t border-[#333]">
                <div className="text-xs text-white/60 mb-2">Nodes (4)</div>
                <div className="grid grid-cols-2 gap-2">
                  {['328241', '328244', '328247', '328255'].map((nodeId, i) => (
                    <div key={i} className="bg-[#1a1a2e] rounded px-3 py-2 text-xs">
                      <span className="text-white/70">Node ID:</span> <span className="text-[#328CC1]">{nodeId}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Advanced Scheduling */}
      <section className="py-20 bg-[#f3f1e9]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Node Diagram Visual */}
            <div className="bg-[#0a0a0f] rounded-xl border border-[#D6DEC3]/30 p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-[#0B1F3B] text-white text-xs rounded">COMPUTE</span>
                {/* <span className="text-[#2F3A4A] text-sm">Node allocation</span> */}
              </div>
              
              {/* Node Grid */}
              <div className="grid grid-cols-4 gap-3">
                {['328241', '328244', '328247', '328255', '328258', '328261', '328264', '328267'].map((id, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-lg text-center ${i < 4 ? 'bg-[#0B1F3B]/50 border border-blue-500/50' : 'bg-[#1a1a2e] border border-[#333]/50'}`}
                  >
                    <div className={`text-xs font-mono ${i < 4 ? 'text-blue-300' : 'text-white/60'}`}>{id}</div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                With our advanced<br />scheduler
              </h2>
              <p className="text-[#2F3A4A] mb-6 leading-relaxed">
                Get the best of both worlds with our Slurm on Kubernetes (SLONK) service. Enjoy advanced job scheduling, resource allocation, and efficient workload management when training LLMs.
              </p>
              {/* <Link to="/docs">
                <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded font-medium">
                  Learn More <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Industry-leading GPU Clusters */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Industry leading GPU<br />clusters at all scales
              </h2>
              <p className="text-[#2F3A4A] mb-6 leading-relaxed">
                Our GPU clusters offer adaptability and growth to support training demands across every scale and workload type. From expanding capacity for major initiatives to refining individual models, the clusters deliver the performance and efficiency needed throughout.
              </p>
              <Link to="/contact">
                <Button className="bg-white text-[#0B1F3B] border border-[#0B1F3B] hover:bg-[#f3f1e9] px-6 py-3 rounded font-medium">
                  Reserve GPUs <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </Link>
            </div>
            
            {/* GPU Server Rack Visual */}
            <div className="relative">
              <div className=" rounded-xl  p-6 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <img
                      src="/images/gpu.png"
                      alt="Modern GPU Server Racks"
                      className="w-full h-full object-contain"
                    />
                  {/* Stylized server rack representation */}
                  {/* <div className="grid grid-cols-4 gap-2 mb-4">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="h-8 bg-[#1a1a2e] rounded border border-[#333]/50 flex items-center justify-center">
                        <div className="flex gap-0.5">
                          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                          <div className="w-1 h-1 rounded-full bg-blue-500" />
                        </div>
                      </div>
                    ))}
                  </div> */}
                  {/* <p className="text-white/70 text-sm">NVIDIA H100 • H200 • GB200 NVL72</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Feature Strip (Three Columns) */}
      <section className="py-16 bg-[#f3f1e9] border-t border-b border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="text-center md:text-left">
                <feature.icon className="w-10 h-10 text-blue-500 mb-4 mx-auto md:mx-0" />
                <h3 className="text-xl font-bold text-[#0B1F3B] mb-3">{feature.title}</h3>
                <p className="text-[#2F3A4A] text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Fully Integrated AI Infrastructure */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Get access to a fully<br />integrated suite of AI<br />services and compute
              </h2>
              <p className="text-[#2F3A4A] mb-6 leading-relaxed">
                Lower spending, increase income, and operate artificial intelligence workloads with greater effectiveness through a completely unified environment. Whether leveraging BluBridge AI/ML capabilities or integrating external solutions, this platform streamlines progression from creation stages into live deployment.
              </p>
            </div>
            {/* Services Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 ">
                {services.map((service, index) => (
                 <Link className="block text-[#243447] hover:text-[#328CC1] transition-colors text-sm" to={service.link}> <div 
                    key={index}
                    className="hover:bg-[#e8e6de] bg-[#f3f1e9] rounded-xl p-4 border border-[#D6DEC3] hover:border-blue-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 ">
                      <div className="w-10 h-10 rounded-lg bg-[#0B1F3B]/20 flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-[#328CC1]" />
                      </div>
                      <span className=" font-medium text-sm">{service.name}</span>
                    </div>
                  </div>
                  </Link>
                ))}
              </div>
              
              {/* Data Center Card */}
              <div className="mt-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-4 border border-blue-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#328CC1]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">BluBridge's Data centers</p>
                    <p className="text-xs text-[#2F3A4A]">Powered by renewable energy</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Infrastructure Diagram */}
            {/* <div className="bg-[#0a0a0f] rounded-xl border border-[#D6DEC3]/30 p-6"> */}
              {/* Service Flow Diagram */}
              {/* <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#1a1a2e] rounded-lg p-3 text-center border border-[#333]/50">
                  <span className="text-sm text-white/80">Serverless</span>
                </div>
                <div className="bg-[#1a1a2e] rounded-lg p-3 text-center border border-[#333]/50">
                  <span className="text-sm text-white/80">Marketplace</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#0B1F3B]/50 rounded-lg p-3 text-center border border-blue-500/30">
                  <span className="text-sm text-blue-300">Inference</span>
                </div>
                <div className="bg-[#0B1F3B]/50 rounded-lg p-3 text-center border border-blue-500/30">
                  <span className="text-sm text-blue-300">Training</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                {['LLM Library', 'Job Management', 'Container Orchestration', 'Optimised Libraries'].map((item, i) => (
                  <div key={i} className="bg-[#1a1a2e] rounded-lg p-2 text-center border border-[#333]/30">
                    <span className="text-xs text-white/70">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-[#1a1a2e] rounded-lg p-3 text-center border border-[#333]/50 mb-4">
                <span className="text-sm text-white/80">GPU nodes</span>
              </div> */}
              
              {/* Data Center Badge */}
              {/* <div className="bg-[#0B1F3B] rounded-lg p-4 border border-blue-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <Server className="w-4 h-4 text-[#328CC1]" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">BluBridge's Data centers</div>
                    <div className="text-xs text-white/60">Powered by renewable energy</div>
                  </div>
                </div>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQs */}
      <section className="py-20 bg-[#f3f1e9]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#0B1F3B]">FAQs</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border-b border-[#D6DEC3] pb-4"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left py-3 group"
                >
                  <span className="text-[#0B1F3B] text-lg pr-4">{faq.question}</span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-[#0B1F3B] rotate-180' : 'bg-[#0B1F3B]/80'}`}>
                    {openFaq === index ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-[#2F3A4A] pb-4 pr-12">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: Final CTA Strip */}
      <section className="py-20 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Access thousands of GPUs tailored to your<br />requirements.
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/contact">
              <Button className="bg-white text-[#0B1F3B] hover:bg-[#f3f1e9] px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium">
              Contact <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;
