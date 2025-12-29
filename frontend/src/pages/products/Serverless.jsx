import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus, Zap, Server, Cloud, Shield } from 'lucide-react';

const Serverless = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const canvasRef = useRef(null);

  // Animated model graph visualization for hero
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

    const models = [
      { name: 'LLaMA', x: 0.2, y: 0.2, color: '#3b82f6' },
      { name: 'GPT', x: 0.5, y: 0.15, color: '#8b5cf6' },
      { name: 'Claude', x: 0.8, y: 0.25, color: '#ec4899' },
      { name: 'Mistral', x: 0.15, y: 0.5, color: '#06b6d4' },
      { name: 'Flux', x: 0.4, y: 0.45, color: '#f97316' },
      { name: 'SDXL', x: 0.65, y: 0.4, color: '#22c55e' },
      { name: 'Whisper', x: 0.85, y: 0.55, color: '#eab308' },
      { name: 'CLIP', x: 0.25, y: 0.75, color: '#ef4444' },
      { name: 'Qwen', x: 0.55, y: 0.7, color: '#a855f7' },
      { name: 'Gemma', x: 0.75, y: 0.8, color: '#14b8a6' }
    ];

    const drawModelGraph = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Draw connections between models
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.lineWidth = 1;
      models.forEach((model1, i) => {
        models.forEach((model2, j) => {
          if (i < j && Math.random() > 0.7) {
            const x1 = model1.x * width + Math.sin(time + i) * 5;
            const y1 = model1.y * height + Math.cos(time + i) * 5;
            const x2 = model2.x * width + Math.sin(time + j) * 5;
            const y2 = model2.y * height + Math.cos(time + j) * 5;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        });
      });

      // Draw model nodes
      models.forEach((model, i) => {
        const x = model.x * width + Math.sin(time + i * 0.5) * 8;
        const y = model.y * height + Math.cos(time + i * 0.3) * 8;
        const pulseSize = 30 + Math.sin(time * 2 + i) * 5;

        // Glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize * 2);
        gradient.addColorStop(0, model.color + '40');
        gradient.addColorStop(1, model.color + '00');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, pulseSize * 2, 0, Math.PI * 2);
        ctx.fill();

        // Main node
        ctx.fillStyle = model.color;
        ctx.beginPath();
        ctx.arc(x, y, pulseSize * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Node label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '11px DM Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(model.name, x, y + pulseSize * 0.7);
      });

      // Draw floating data particles
      for (let i = 0; i < 30; i++) {
        const px = (Math.sin(time * 0.5 + i * 0.4) + 1) * width * 0.5;
        const py = (Math.cos(time * 0.3 + i * 0.5) + 1) * height * 0.5;
        const size = 2 + Math.sin(time + i) * 1;
        
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.2 + Math.sin(time + i) * 0.1})`;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(drawModelGraph);
    };

    resize();
    window.addEventListener('resize', resize);
    drawModelGraph();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const pricingModels = [
    { model: 'meta-llama/llama-4-maverick', type: 'Text Generation', price: '$0.20 / $0.20 per 1M tokens' },
    { model: 'gpt-4.1-mini', type: 'Text Generation', price: '$0.4 Input / $1.6 Output per 1M tokens' },
    { model: 'Qwen3.5-72B-Instruct', type: 'Text Generation', price: '$0.29 Input / $0.39 Output per 1M tokens' },
    { model: 'Qwen3-32B', type: 'Text Generation', price: '$0.20 / $0.20 per 1M tokens' },
    { model: 'Qwen3-14B-128k-FP8', type: 'Text Generation', price: '$0.07 / $0.07 per 1M tokens' },
    { model: 'Gemma-3-27B-IT', type: 'Text Generation', price: '$0.20 / $0.20 per 1M tokens' },
    { model: 'Llama-4.1-8B-Instruct', type: 'Text Generation', price: '$0.025 / $0.025 per 1M tokens' },
    { model: 'deepseek-ai/DeepSeek-R2', type: 'Text Generation', price: '$0.55 / $2.19 per 1M tokens' },
    { model: 'deepseek-ai/DeepSeek-R2-Lite', type: 'Text Generation', price: '$0.14 / $0.14 per 1M tokens' },
    { model: 'mistralai/Mistral-Small-3.1', type: 'Text Generation', price: '$0.10 / $0.30 per 1M tokens' },
    { model: 'Pixtral-Large-2501-123B', type: 'Image-Text-to-text', price: '$0.30 / $0.90 per 1M tokens' },
    { model: 'Qwen2.5-VL-72B-Instruct', type: 'Image-Text-to-text', price: '$0.40 / $0.40 per 1M tokens' },
    { model: 'flux-1.1-pro', type: 'Text-to-Image', price: '$0.040 per step' },
    { model: 'flux-dev', type: 'Text-to-Image', price: '$0.025 per step' },
    { model: 'ideogram-ai/ideogram-v3', type: 'Text-to-Image', price: '$0.080 per image' },
    { model: 'Recraft-V3', type: 'Text-to-Image', price: '$0.040 per mega-pixel' },
    { model: 'black-forest-labs/FLUX.1-kontext', type: 'Text-to-Image', price: '$0.040 per step' },
    { model: 'nvidia/Llama-3.1-Nemotron-Nano-8B', type: 'Text Generation', price: '$0.15 / $0.15 per 1M tokens' },
    { model: 'Llama-Guard-3-8B', type: 'Text Classification', price: '$0.20 / $0.20 per 1M tokens' },
    { model: 'WhisperV3-large', type: 'Text Generation', price: '$0.33 per 1M tokens' },
    { model: 'bge-m3', type: 'Text Embeddings', price: '$0.015 per 1M tokens' },
    { model: 'bge-large-en-v1.5', type: 'Text Embeddings', price: '$0.015 per 1M tokens' },
    { model: 'gte-reranker-large', type: 'Text Reranking', price: '$0.01 per 1M tokens' }
  ];

  const services = [
    { name: 'Serverless', icon: Cloud },
    { name: 'Marketplace', icon: Zap },
    { name: 'Inference', icon: Server },
    { name: 'Training', icon: Zap },
    { name: 'GPU nodes', icon: Server },
    { name: 'LLM Library', icon: Shield }
  ];

  const faqs = [
    {
      question: "What is BluBrg Serverless Inference?",
      answer: "Blubrg Serverless Inference is a completely managed environment that allows running AI model inference without the burden of handling underlying systems. It delivers immediate availability of leading Generative AI models through a straightforward, usage-based pricing approach."
    },
    {
      question: "Who is this service for?",
      answer: "This offering is built for builders, emerging companies, large organisations, and academic groups seeking to launch AI-driven applications rapidly and economically, without needing to manage the underlying infrastructure."
    },
    {
      question: "What AI models are available?",
      answer: "At launch, Blubrg provides support for widely used open-source models covering text creation, image synthesis, and computer vision use cases. The catalogue is continually broadened in response to customer input."
    },
    {
      question: "How does the pricing work?",
      answer: "Blubrg uses a usage-based, per-call pricing approach:	⇒Text models: Costs are calculated according to tokens processed for prompts and responses.	⇒Image models: Fees are determined by the generated image resolution.	⇒Vision models: Charges vary based on computational workload demands.	⇒New users are granted complimentary credits to try and evaluate the platform."
    },
    {
      question: "What are the key benefits of using BluBrg Serverless?",
      answer: "Infrastructure simplicity: Capacity growth, observability, and resource distribution are fully managed by us.  Budget friendly: A vertically unified architecture significantly reduces processing expenses.→ Elastic and dependable: Built-in elasticity maintains consistent, high-quality operation.→ Protected and confidential: Requests and outputs are neither stored nor reused for learning.→ OpenAI API and SDK alignment: Straightforward connection with existing development ecosystems."
    },
    {
      question: "How does scaling work?",
      answer: "Blubrg dynamically expands or contracts resources in response to live usage patterns. This removes any requirement for hands-on setup, enabling smooth growth of AI services without friction."
    }
  ];

  useDocumentTitle('Serverless Inference | BluBrg');

  return (
    <div className="min-h-screen bg-[#F3F6E8] font-['DM_Sans']">      {/* Hero Section with Animated Model Graph */}
      <section className="relative min-h-[550px] flex items-center overflow-hidden bg-[#F3F6E8]">
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6" style={{ animation: 'fadeInUp 1s ease-out' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#328CC1]/10 rounded-full border border-[#328CC1]/30">
                <span className="text-[#328CC1] text-sm font-medium">SERVERLESS</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#0B1F3B]">
                Most cost-effective AI<br />inference
              </h1>
              
              <p className="text-[#243447] text-lg max-w-xl leading-relaxed">
                Four out of five developers ranked us as the most cost-effective GenAI inferencing provider, offering access to popular models with zero rate limits. 
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact">
                <Button className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-6 py-3 rounded font-medium">
                  Talk to Us
                </Button>
                </Link>
                <Link to="/contact/sales" className="inline-flex items-center px-3 gap-2 text-[#328CC1] hover:text-[#0B1F3B] transition-colors font-medium">
                Contact Sales <ArrowRight className="w-4 h-4" />
              </Link>
              </div>
            </div>
            
            {/* Right - Animated Model Graph */}
            <div className="relative h-[400px] lg:h-[450px]">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full"
                style={{ background: 'transparent' }}
              />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* Value Proposition Strip */}
      <section className="py-12 bg-[#F3F6E8] border-t border-b border-[#D6DEC3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-[#0B1F3B] mb-2">Lower cost, more power</h3>
              <p className="text-[#243447] text-sm">Our fully optimized stack eliminates the inefficiencies you often pay for elsewhere. You get high-performance serverless at a fraction of the typical cost, with those savings passed directly on to you.</p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-[#0B1F3B] mb-2">Engineered for AI workloads</h3>
              <p className="text-[#243447] text-sm">Get the full cost and performance advantages of our fully integrated stack, purpose-built to support AI workloads at any scale.</p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-[#0B1F3B] mb-2">Scale without the overhead</h3>
              <p className="text-[#243447] text-sm">From testing through to production, scale your AI workloads without bottlenecks or setup but just results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Models & Pricing Section */}
      <section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Models & Pricing</h2>
            <p className="text-[#243447] max-w-2xl">
              Pricing applies to every 1 million tokens, covering both prompts and responses for Chat, Multimodal, Language, and Code models. Image models follow a different structure, calculated according to resolution dimensions and processing steps.
            </p>
            <div className="flex gap-4 mt-4">
              <button className="px-4 py-2 bg-slate-800 text-white text-sm rounded-lg">Endpoints</button>
         
            </div>
          </div>

          {/* Pricing Table */}
          <div className="bg-slate-900/50 rounded-xl border border-[#D6DEC3] overflow-hidden">
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-slate-900 z-10">
                  <tr className="border-b border-[#D6DEC3]">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-[#243447]">Serverless Endpoint</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-[#243447]">Type</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-[#243447]">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingModels.map((item, index) => (
                    <tr key={index} className="border-b border-[#D6DEC3] hover:bg-[#EEF2DC]/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-white">{item.model}</td>
                      <td className="px-6 py-4 text-sm text-[#243447]">{item.type}</td>
                      <td className="px-6 py-4 text-sm text-[#243447] text-right">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Savings by Design Section */}
      <section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Model Icons Grid */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-4">
                {['LLaMA', 'Claude', 'Hermes', 'Qwen', 'GPT Plus', 'Mistral', 'Gemma', 'Flux', 'Actions'].map((name, i) => (
                  <div key={i} className="bg-[#EEF2DC] rounded-xl p-4 text-center border border-[#D6DEC3]">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <span className="text-xs text-[#328CC1]">{name.charAt(0)}</span>
                    </div>
                    <p className="text-xs text-[#243447]">{name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right - Text */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Savings by design, not<br />compromise
              </h2>
              <p className="text-[#243447] leading-relaxed">
                Every layer of the vertically integrated platform is finely tuned, spanning physical systems through orchestration, lowering processing expenses while maintaining stable output. The outcome is measurable cost reduction delivered straight to clients, achieved without compromising performance, scalability, or protection.
              </p>
              {/* <Link to="/pricing" className="inline-flex items-center gap-2 text-[#328CC1] hover:text-blue-300 transition-colors">
                See pricing <ArrowRight className="w-4 h-4" />
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0B1F3B]">
                Serverless without<br />trade-offs
              </h2>
              <p className="text-[#243447] mb-6 leading-relaxed">
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

      {/* Serverless Without Trade-offs Section */}
      {/* <section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Serverless without trade-<br />offs
              </h2>
              <p className="text-[#243447] leading-relaxed">
                → Truly uncompromised serverless computing. Your models stay under your ownership, and your data is never repurposed or used for retraining. Benefit from complete tenant separation, integrated compliance, and powerful computing resources which are available instantly, without the burden of infrastructure 
              </p>
              <Link to="/docs" className="inline-flex items-center gap-2 text-[#328CC1] hover:text-blue-300 transition-colors">
                Learn more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
           
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-[#D6DEC3]">
                <div className="aspect-video bg-[#EEF2DC] rounded-xl flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                        <Server className="w-8 h-8 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Performance Metrics */}
      <section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Performance</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-white">80%</p>
              <p className="text-sm font-semibold text-[#243447]">LOWER COST</p>
              <p className="text-sm text-[#5B6B7A]">Blubrg delivers an average cost saving of up to 80% compared to hyperscalers.</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-white">30%</p>
              <p className="text-sm font-semibold text-[#243447]">FASTER</p>
              <p className="text-sm text-[#5B6B7A]">Blubrg Cloud shortens the path to actionable insights by as much as 30%, powered by a stack purpose-built and tuned specifically for AI workloads.</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-white">+40%</p>
              <p className="text-sm font-semibold text-[#243447]">EFFICIENCY</p>
              <p className="text-sm text-[#5B6B7A]">Efficiency gains reaching 40%.</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-white">100%</p>
              <p className="text-sm font-semibold text-[#243447]">RENEWABLE ENERGY</p>
              <p className="text-sm text-[#5B6B7A]">The Serverless Inference platform operates entirely on 100% renewable energy sourced from hydropower dams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Zero Rate Limits Platform Section */}
      {/* <section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
           
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Zero rate limits, maximum<br /><span className="text-[#328CC1]">reliability</span>
              </h2>
              <p className="text-[#243447] leading-relaxed">
                → Unlimited throughput with instant start-up and zero delays, delivering rapid, dependable inference alongside automatic scaling capable of supporting any AI workload. We manage expansion, observability, and day-to-day operations in the background, allowing your team to concentrate fully on creation.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[#328CC1] hover:text-blue-300 transition-colors">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
           
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="bg-[#EEF2DC] rounded-xl p-4 border border-[#D6DEC3] hover:border-blue-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0B1F3B]/20 flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-[#328CC1]" />
                      </div>
                      <span className="font-medium text-sm">{service.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              
            
              <div className="mt-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-4 border border-blue-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#328CC1]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">BluBrg's Data centers</p>
                    <p className="text-xs text-[#243447]">Powered by renewable energy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-20 bg-[#F3F6E8]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">FAQs</h2>
          
          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border-b border-[#D6DEC3]"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-5 text-left hover:text-[#328CC1] transition-colors"
                >
                  <span className="text-lg font-medium text-[#0B1F3B] pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-[#0B1F3B]/80">
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-white" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[#243447] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
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

export default Serverless;
