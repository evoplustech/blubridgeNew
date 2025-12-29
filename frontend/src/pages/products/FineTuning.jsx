import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Play } from 'lucide-react';

const FineTuning = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  // Animated flowing orange 3D background for hero
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

    const drawFlowingBackground = () => {
      time += 0.006;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Create flowing fabric/wave effect with orange tones
      for (let layer = 0; layer < 6; layer++) {
        const layerOffset = layer * 0.15;
        const amplitude = 80 + layer * 20;
        const frequency = 0.003 + layer * 0.001;
        
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        for (let x = 0; x <= width; x += 3) {
          const wave1 = Math.sin(x * frequency + time + layerOffset) * amplitude;
          const wave2 = Math.sin(x * frequency * 1.5 + time * 0.8 + layerOffset) * (amplitude * 0.5);
          const wave3 = Math.cos(x * frequency * 0.5 + time * 1.2 + layerOffset) * (amplitude * 0.3);
          const y = height * 0.4 + wave1 + wave2 + wave3 - layer * 30;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        // Orange gradient for each layer
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        const alpha = 0.15 - layer * 0.02;
        gradient.addColorStop(0, `rgba(180, 80, 20, ${alpha})`);
        gradient.addColorStop(0.3, `rgba(200, 100, 40, ${alpha + 0.05})`);
        gradient.addColorStop(0.6, `rgba(160, 60, 15, ${alpha})`);
        gradient.addColorStop(1, `rgba(120, 40, 10, ${alpha - 0.03})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Add folded/twisted ribbon shapes
      for (let i = 0; i < 3; i++) {
        const ribbonX = width * (0.6 + i * 0.15);
        const ribbonY = height * 0.3;
        const ribbonSize = 100 + i * 40;
        
        ctx.save();
        ctx.translate(ribbonX, ribbonY);
        ctx.rotate(time * 0.2 + i * 0.5);
        
        const ribbonGradient = ctx.createLinearGradient(-ribbonSize, -ribbonSize, ribbonSize, ribbonSize);
        ribbonGradient.addColorStop(0, `rgba(200, 100, 30, ${0.3 - i * 0.08})`);
        ribbonGradient.addColorStop(0.5, `rgba(220, 120, 50, ${0.4 - i * 0.1})`);
        ribbonGradient.addColorStop(1, `rgba(150, 60, 20, ${0.2 - i * 0.05})`);
        
        ctx.beginPath();
        ctx.moveTo(-ribbonSize, 0);
        ctx.bezierCurveTo(
          -ribbonSize * 0.5, -ribbonSize * (0.8 + Math.sin(time + i) * 0.3),
          ribbonSize * 0.5, ribbonSize * (0.6 + Math.cos(time + i) * 0.3),
          ribbonSize, 0
        );
        ctx.bezierCurveTo(
          ribbonSize * 0.5, ribbonSize * (0.4 + Math.sin(time + i) * 0.2),
          -ribbonSize * 0.5, -ribbonSize * (0.3 + Math.cos(time + i) * 0.2),
          -ribbonSize, 0
        );
        ctx.closePath();
        ctx.fillStyle = ribbonGradient;
        ctx.fill();
        
        ctx.restore();
      }

      // Floating particles
      for (let i = 0; i < 20; i++) {
        const px = (Math.sin(time * 0.4 + i * 0.6) + 1) * width * 0.3 + width * 0.5;
        const py = (Math.cos(time * 0.3 + i * 0.7) + 1) * height * 0.4;
        const size = 2 + Math.sin(time + i) * 1.5;
        
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 150, 80, ${0.3 + Math.sin(time + i) * 0.15})`;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(drawFlowingBackground);
    };

    resize();
    window.addEventListener('resize', resize);
    drawFlowingBackground();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Animated line graph for hero right side
  const GraphVisualization = () => {
    const graphCanvasRef = useRef(null);
    
    useEffect(() => {
      const canvas = graphCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let animationFrame;
      let time = 0;

      const resize = () => {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      };

      const drawGraph = () => {
        time += 0.02;
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        const padding = 40;

        // Background grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
          const y = padding + (height - padding * 2) * (i / 5);
          ctx.beginPath();
          ctx.moveTo(padding, y);
          ctx.lineTo(width - padding, y);
          ctx.stroke();
        }

        // Animated line chart
        const points = [];
        for (let i = 0; i <= 20; i++) {
          const x = padding + (width - padding * 2) * (i / 20);
          const baseY = height - padding - (height - padding * 2) * (0.3 + i * 0.025);
          const wave = Math.sin(time + i * 0.3) * 10;
          const y = baseY + wave;
          points.push({ x, y });
        }

        // Fill area under curve
        const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.beginPath();
        ctx.moveTo(points[0].x, height - padding);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, height - padding);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw line
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw points
        points.forEach((p, i) => {
          if (i % 4 === 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#3b82f6';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
          }
        });

        animationFrame = requestAnimationFrame(drawGraph);
      };

      resize();
      window.addEventListener('resize', resize);
      drawGraph();

      return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrame);
      };
    }, []);

    return (
      <div className="relative bg-white rounded-xl border border-[#D6DEC3] p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[#2F3A4A]">Training Progress</span>
          <span className="text-xs text-[#328CC1]">Live</span>
        </div>
        <canvas ref={graphCanvasRef} className="w-full h-[200px]" />
        <div className="flex justify-between mt-2 text-xs text-[#6B7280]">
          <span>Epoch 1</span>
          <span>Epoch 10</span>
        </div>
      </div>
    );
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Supported Models Data
  const supportedModels = [
    { name: 'Mixtral 8x Instruct v0.1', author: 'mistral', type: 'Text to Text', context: '32k', size: 'base' },
    { name: 'Qwen 2.5 32B Instruct', author: 'Qwen', type: 'Text to Text', context: '128k', size: '$180' },
    { name: 'Qwen 2.5 72B Instruct', author: 'Qwen', type: 'Text to Text', context: '128k', size: '$380' },
    { name: 'Deepseek R1 0528 Qwen 32B', author: 'Deepseek', type: 'Text/Think', context: '16k', size: '$195' },
    { name: 'Deepseek R1 Distill Qwen 14B', author: 'Deepseek', type: 'Text/Think', context: '16k', size: '$145' },
    { name: 'Mixtral 8x Instruct v0.1', author: 'mistral', type: 'Text to Text', context: '32k', size: 'base' },
    { name: 'Qwen 2.5 14B Instruct', author: 'Qwen', type: 'Text to Text', context: '128k', size: '$145' },
    { name: 'Meta Llama Guard 3 8B', author: 'meta', type: 'Text Safety', context: '8k', size: '$110' },
  ];

  // FAQ Data
  const faqs = [
    {
      question: "Do I need ML experience to fine-tune a model with BluBrg?",
      answer: "No, Blubrg Fine-tuning was created to be straightforward and approachable, revealing advanced options and controls only when required. The offering removes the need for machine learning expertise or platform operations and can be launched by any developer with just $2 in credit."
    },
    {
      question: "What happens if my job fails or I cancel it partway through?",
      answer: "When an execution stops early or is terminated, charges apply only to the tokens consumed until that moment where there are no complete-run fees or unexpected extras. A transparent summary appears in the activity log, showing progress reached and token usage. You can duplicate the run or restart it later to continue from the same stage."
    },
    {
      question: "Is my data secure during fine-tuning?",
      answer: "Yes, every organisation is provided with dedicated, segregated cloud storage. Information is never distributed to other organisations or external model vendors."
    },
    {
      question: "Can I run multiple fine-tuning jobs at once?",
      answer: "Yes, as long as sufficient credit is available, several tasks can be initiated. These tasks are placed into a queue and begin execution when the resources are available."
    }
  ];

  // How it Works Steps
  const howItWorksSteps = [
    {
      number: '01',
      title: 'UPLOAD YOUR DATA',
      subtitle: 'Drop in a CSV file',
      description: 'Build and control both learning and evaluation data collections straight from the interface.'
    },
    {
      number: '02',
      title: 'CONFIGURE YOUR JOB',
      subtitle: 'Tweak settings—or rely on smart defaults',
      description: 'Apply LoRa to enable resource-efficient model adaptation, set epoch counts, and fine-adjust parameters such as learning rate, weight decay, and additional training controls.'
    },
    {
      number: '03',
      title: 'MONITOR & EVALUATE',
      subtitle: 'Real-time metrics at a glance',
      description: 'Observe optimization and evaluation metrics, including loss values, perplexity, and precision, while the process executes. Refine and repeat cycles until results meet your expectations.'
    },
    {
      number: '04',
      title: 'EXPORT YOUR MODEL',
      subtitle: 'Download or push to Hugging Face',
      description: 'Download the tuned model in PyTorch or ONNX format, or publish it directly to Hugging Face with minimal effort.'
    }
  ];

  // Model Ecosystem
  const modelEcosystem = [
    { name: 'LLAMA 3', size: '70B INSTRUCT', author: 'META' },
    { name: 'LLAMA 3', size: '70B INSTRUCT', author: 'AMD' },
    { name: 'MISTRAL', size: '8x7B INSTRUCT', author: 'MISTRAL' },
    { name: 'GEMMA 2', size: '27B', author: 'META' },
    { name: 'DEEPSEEK', size: 'R1 DISTILL', author: 'DEEPSEEK' },
    { name: 'STABLE', size: 'DIFFUSION XL', author: 'STABILITY' },
  ];

  useDocumentTitle('AI Model Fine-tuning | BluBrg');

  return (
    <div className="min-h-screen bg-[#F3F1E9] font-['DM_Sans']">      {/* SECTION 1: Hero Section with Animated Orange Background */}
      <section ref={heroRef} className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Animated Canvas Background - Light theme */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
          style={{ background: 'linear-gradient(135deg, #F3F6E8 0%, #E8EDD8 50%, #F3F6E8 100%)' }}
        />
        
        {/* Light overlay for visual depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F3F6E8]/90 via-[#F3F6E8]/70 to-transparent" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content with Animation */}
            <div className="space-y-6" style={{ animation: 'fadeInUp 1s ease-out' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/30">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-orange-600 text-sm font-medium">FINE-TUNING</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#0B1F3B]" style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}>
                Fine-tune open-<br />source models<br />directly in your<br />browser
              </h1>
              
              <p className="text-[#2F3A4A] text-lg max-w-xl leading-relaxed" style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}>
                Serverless, usage-based fine-tuning that keeps you fully in control. Zero configuration, friction-free execution, and uncompromised performance throughout.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4" style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
                <Link to="/contact/sales">
                  <Button className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-6 py-3 rounded font-medium">
                    Start Building
                  </Button>
                </Link>
                 <Link to="/contact/sales" className="flex items-center gap-2 text-[#328CC1] hover:text-[#0B1F3B] transition-colors font-medium">
                  Contact Sales <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Right - Animated Graph Visual */}
            <div className="relative" style={{ animation: 'fadeInRight 1s ease-out 0.4s both' }}>
              <GraphVisualization />
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

      {/* SECTION 2: Value Proposition Strip */}
      <section className="py-12 bg-[#F3F1E9] border-t border-b border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Built for builders', desc: 'Fine-tuning models without dealing with backend operations.', cta: 'Start fine-tuning' },
              { title: 'Performance first', desc: 'Track optimization progress live and refine cycles rapidly with assurance.', cta: 'Customise a model' },
              { title: 'Clear economics', desc: 'Spend only on actual training usage through a straightforward pricing approach based on tokens, eliminating charges for unused GPU capacity.', cta: 'Create your account' },
              { title: 'Fully serverless', desc: 'Begin instantly, expand effortlessly, and dedicate all attention to creation.', cta: 'Claim $5 free credits' }
            ].map((item, i) => (
              <div key={i} className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-[#0B1F3B] mb-2">{item.title}</h3>
                <p className="text-[#2F3A4A] text-sm mb-3">{item.desc}</p>
                <Link to="/contact" className="text-orange-400 text-sm hover:text-orange-300 flex items-center gap-1 justify-center md:justify-start">
                  {item.cta} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Supported Models Table */}
      <section className="py-20 bg-[#F3F1E9]">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Supported Models</h2>
            <p className="text-[#2F3A4A] max-w-2xl">
             Adapt top open-source models such as Qwen2.5 and Deepseek R1 to your needs. We continuously review and introduce additional options to ensure you always have a strong and up-to-date starting point.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-[#328CC1] text-sm mt-4 hover:text-blue-300">
              Request Access <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Models Table */}
          <div className="bg-slate-900/50 rounded-xl border border-[#D6DEC3] overflow-hidden">
            <div className="overflow-x-auto max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
              <table className="w-full">
                <thead className="sticky top-0 bg-slate-900 z-10">
                  <tr className="border-b border-[#D6DEC3]">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-[#2F3A4A]">Supported Model Name</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-[#2F3A4A]">Author</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-[#2F3A4A]">Type</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-[#2F3A4A]">Context</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-[#2F3A4A]">Model Size</th>
                  </tr>
                </thead>
                <tbody>
                  {supportedModels.map((model, index) => (
                    <tr key={index} className="border-b border-[#D6DEC3] hover:bg-[#EEF2DC]/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-white">{model.name}</td>
                      <td className="px-6 py-4 text-sm text-[#2F3A4A]">{model.author}</td>
                      <td className="px-6 py-4 text-sm text-[#2F3A4A]">{model.type}</td>
                      <td className="px-6 py-4 text-sm text-[#2F3A4A]">{model.context}</td>
                      <td className="px-6 py-4 text-sm text-[#2F3A4A] text-right">{model.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fine-tune Pricing Note */}
          <div className="mt-8 p-6 bg-slate-900/30 rounded-xl border border-[#D6DEC3]/30">
            <h3 className="text-xl font-semibold text-orange-400 mb-2">Fine-tune Pricing</h3>
            <p className="text-[#2F3A4A] text-sm">
              Costs are determined by model scale and computed using the full volume of tokens handled, covering training data across every epoch along with any validation runs performed during evaluation.
            </p>
          </div>

          {/* Need dedicated infrastructure link */}
          <div className="mt-6 text-center">
            <Link to="/products/gpu-nodes" className="text-[#2F3A4A] hover:text-white text-sm inline-flex items-center gap-2">
              Need dedicated infrastructure? <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: All Designed for Speed & Simplicity */}
      {/* <section className="py-20 bg-[#F3F1E9]">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              All designed for speed<br />and simplicity
            </h2>
            <p className="text-[#2F3A4A] max-w-2xl mx-auto">
              → Maintain complete transparency across fine-tuning pipelines through simple task monitoring, organised data handling, and intuitive outcome visualisation.
            </p>
          </div>

          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-slate-900/50 rounded-xl border border-[#D6DEC3] overflow-hidden aspect-video">
             
              <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-slate-700 rounded px-3 py-1 text-xs text-[#2F3A4A] max-w-md">
                    Introducing BluBrg's fine-tuning service | AI models without the complexity
                  </div>
                </div>
              </div>
              
             
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center aspect-video">
                <div className="absolute inset-0 flex">
                 
                  <div className="w-1/2 p-4 border-r border-[#D6DEC3]">
                    <div className="bg-[#EEF2DC] rounded p-3 space-y-2">
                      <div className="h-2 bg-blue-500/30 rounded w-3/4" />
                      <div className="h-2 bg-slate-600/50 rounded w-full" />
                      <div className="h-2 bg-slate-600/50 rounded w-5/6" />
                      <div className="h-2 bg-orange-500/30 rounded w-2/3" />
                    </div>
                  </div>
                  
                  <div className="w-1/2 p-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-slate-700 mx-auto mb-3 flex items-center justify-center">
                        <Play className="w-8 h-8 text-[#2F3A4A]" />
                      </div>
                      <p className="text-[#6B7280] text-sm">Product Demo</p>
                    </div>
                  </div>
                </div>
                
                
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer hover:bg-black/20 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              </div>

              
              <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
                <span className="text-xs text-[#2F3A4A]">Watch on</span>
                <span className="text-xs text-red-500 font-semibold">▶ YouTube</span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* SECTION 5: How it Works */}
      <section className="py-20 bg-[#F3F1E9]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How it works</h2>
          
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-orange-500/50 via-orange-500/30 to-orange-500/50" />
            
            {howItWorksSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-orange-500 text-sm font-bold mb-2">{step.number}</div>
                <h3 className="text-orange-400 text-sm font-bold tracking-wider mb-1">{step.title}</h3>
                <p className="text-[#0B1F3B] text-base font-medium mb-2">{step.subtitle}</p>
                <p className="text-[#2F3A4A] text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Model Ecosystem Strip */}
      <section className="py-16 bg-[#F3F1E9]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {modelEcosystem.map((model, i) => (
              <div key={i} className="bg-[#EEF2DC] rounded-xl p-4 border border-[#D6DEC3] hover:border-[#D6DEC3]/50 transition-colors">
                <div className="text-xs text-[#6B7280] mb-1">TEXT GENERATION</div>
                <div className="text-[#0B1F3B] font-bold text-sm">{model.name}</div>
                <div className="text-[#2F3A4A] text-xs">{model.size}</div>
                <div className="text-orange-400 text-xs mt-2">{model.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Savings by Design */}
      <section className="py-20 bg-[#F3F1E9]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="grid grid-cols-3 gap-4">
                {['LLaMA', 'Claude', 'Hermes', 'Qwen', 'GPT Plus', 'Mistral'].map((name, i) => (
                  <div key={i} className="bg-[#EEF2DC] rounded-xl p-4 text-center border border-[#D6DEC3]">
                    <div className="w-10 h-10 bg-slate-700 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs text-[#2F3A4A]">{name.slice(0, 2)}</span>
                    </div>
                    <p className="text-[#0B1F3B] text-xs font-medium">{name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Savings by design,<br />not compromise
              </h2>
              <p className="text-[#2F3A4A] mb-6 leading-relaxed">
                Each tier of our vertically unified platform is carefully refined, spanning physical components through coordination layers, reducing processing expenses while maintaining stable output. The outcome is tangible cost reduction delivered straight to users, achieved without compromising velocity, capacity, or protection.
              </p>
              <Link to="/contact" className="text-orange-400 hover:text-orange-300 inline-flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Serverless without Trade-offs */}
      <section className="py-20 bg-[#F3F1E9]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Serverless without<br />trade-offs
              </h2>
              <p className="text-[#2F3A4A] mb-6 leading-relaxed">
                Serverless with no trade-offs. Ownership of models stays entirely with you, and information is never recycled or used again for learning. Benefit from complete workload separation, embedded regulatory controls, and powerful computing resources which are ss
              </p>
              <Link to="/gpu-nodes" className="text-orange-400 hover:text-orange-300 inline-flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="relative">
              {/* GPU/Hardware Image */}
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/dzdppu4v_Nvidia-GB200.avif" 
                  alt="Enterprise GPU Infrastructure"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQs */}
      <section className="py-20 bg-[#F3F1E9]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">FAQs</h2>
          
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
                  <span className="text-[#0B1F3B] text-lg pr-4">
                    {faq.question.includes('BluBrg') ? (
                      <>
                        {faq.question.split('BluBrg')[0]}
                        <span>BluBrg</span>
                        {faq.question.split('BluBrg')[1]}
                      </>
                    ) : faq.question}
                  </span>
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

      {/* SECTION 10: Final CTA Strip */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white">
            Access thousands of GPUs tailored to your requirements.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact/sales">
              <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact/sales" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors font-medium px-6 py-0">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FineTuning;
