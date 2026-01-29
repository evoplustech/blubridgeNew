import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Check, ArrowRight, BarChart3, Pencil, RefreshCw, Plus, ArrowUp } from 'lucide-react';

const SolutionsNew = () => {
  useDocumentTitle('Solutions | BluBridge');
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('ai-studio');

  // Smooth scroll to anchor on page load
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#fffdf7] relative overflow-hidden">
        <div className="container-custom">
          {/* Hero Text Content */}
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[72px] font-bold text-[#1a1a1a] leading-[1.1] tracking-tight mb-6">
              Partnering with ambitious enterprises
              <br />
              <span className="ml-8 md:ml-16">at the frontier.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#555555] max-w-2xl mx-auto mb-8">
              From model creation to scalable deployment, we deliver tailored solutions for your business needs.
            </p>
            
            <div className="flex items-center justify-center gap-6 md:gap-8">
              <Link 
                to="/research" 
                className="text-[#1a1a1a] font-medium underline underline-offset-4 hover:text-[#FF8C00] transition-colors"
              >
                Try le Chat
              </Link>
              <Link 
                to="/contact" 
                className="text-[#1a1a1a] font-medium underline underline-offset-4 hover:text-[#FF8C00] transition-colors"
              >
                Contact sales
              </Link>
            </div>
          </div>

          {/* Hero Visual - Code Snippets and Workflow Diagram */}
          <div className="relative max-w-6xl mx-auto h-[400px] md:h-[500px]">
            {/* Left Code Snippet */}
            <div className="absolute left-0 top-0 w-[280px] md:w-[320px] bg-[#151515] rounded-xl p-4 shadow-xl z-10">
              {/* Orange Icon */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#FF8C00] rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              
              <pre className="text-xs font-mono overflow-hidden">
                <code>
                  <span className="text-[#FFC885]">from</span> <span className="text-[#C8E8C8]">mistralai.client</span> <span className="text-[#FFC885]">import</span> <span className="text-white">MistralClient</span>{'\n'}
                  <span className="text-[#FFC885]">import</span> <span className="text-[#C8E8C8]">os</span>{'\n'}
                  {'\n'}
                  <span className="text-white">api_key</span> <span className="text-[#888]">=</span> <span className="text-white">os</span><span className="text-[#888]">.</span><span className="text-white">env</span><span className="text-[#888]">[</span><span className="text-[#C8E8C8]">'MISTRAL_API_KEY'</span><span className="text-[#888]">]</span>{'\n'}
                  <span className="text-white">model</span> <span className="text-[#888]">=</span> <span className="text-[#C8E8C8]">'mistral-tiny'</span>{'\n'}
                  {'\n'}
                  <span className="text-white">client</span> <span className="text-[#888]">=</span> <span className="text-white">MistralClient</span><span className="text-[#888]">(</span><span className="text-white">api_key</span><span className="text-[#888]">)</span>{'\n'}
                  {'\n'}
                  <span className="text-white">messages</span> <span className="text-[#888]">=</span> <span className="text-[#888]">[</span>{'\n'}
                  {'  '}<span className="text-white">ChatMessage</span><span className="text-[#888]">(</span>{'\n'}
                  {'    '}<span className="text-white">role</span><span className="text-[#888]">=</span><span className="text-[#C8E8C8]">'user'</span><span className="text-[#888]">,</span>{'\n'}
                  {'    '}<span className="text-white">content</span><span className="text-[#888]">=</span><span className="text-[#C8E8C8]">'Who is the most</span>{'\n'}
                  {'    '}<span className="text-[#C8E8C8]">renowned French painter?'</span>{'\n'}
                  {'  '}<span className="text-[#888]">)</span>{'\n'}
                  <span className="text-[#888]">]</span>
                </code>
              </pre>
            </div>

            {/* Small Orange/Yellow Gradient Rectangles */}
            <div className="absolute left-[60px] top-[240px] md:top-[280px] flex gap-2">
              <div className="w-16 h-8 bg-gradient-to-r from-[#FFB347] to-[#FFCC33] rounded-md flex items-center justify-center">
                <span className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">×</span>
                </span>
              </div>
              <div className="w-16 h-8 bg-gradient-to-r from-[#FFB347] to-[#FFCC33] rounded-md flex items-center justify-center">
                <span className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">×</span>
                </span>
              </div>
            </div>

            {/* Task Description Box */}
            <div className="absolute left-[40px] bottom-[20px] md:bottom-[40px] w-[200px] bg-[#151515] rounded-lg p-3 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-[#333] rounded flex items-center justify-center">
                    <Plus className="w-3 h-3 text-white" />
                  </div>
                  <div className="w-6 h-6 bg-[#333] rounded flex items-center justify-center">
                    <ArrowUp className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-xs leading-relaxed">
                Create a task that will help me organize my schedule
              </p>
            </div>

            {/* Center B Logo - Using Image */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <img 
                src="https://customer-assets.emergentagent.com/job_text-tune/artifacts/0c9qmaew_b-center.png"
                alt="BluBridge"
                className="w-20 h-20 md:w-24 md:h-24 object-contain"
              />
            </div>

            {/* Right Code Snippet */}
            <div className="absolute right-0 top-[40px] w-[300px] md:w-[380px] bg-[#151515] rounded-xl p-4 shadow-xl z-10">
              {/* Orange Icon */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#FF8C00] rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M9 9h6M9 12h6M9 15h4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              
              <pre className="text-xs font-mono overflow-hidden">
                <code>
                  <span className="text-[#FFC885]">def</span> <span className="text-white">distill_model</span><span className="text-[#888]">(</span><span className="text-white">teacher_model</span><span className="text-[#888]">,</span>{'\n'}
                  {'                '}<span className="text-white">student_model</span><span className="text-[#888]">):</span>{'\n'}
                  {'  '}<span className="text-[#FFC885]">def</span> <span className="text-white">preprocess_function</span><span className="text-[#888]">(</span><span className="text-white">examples</span><span className="text-[#888]">):</span>{'\n'}
                  {'    '}<span className="text-[#FFC885]">return</span> <span className="text-white">tokenizer</span><span className="text-[#888]">(</span>{'\n'}
                  {'      '}<span className="text-white">examples</span><span className="text-[#888]">[</span><span className="text-[#C8E8C8]">'text'</span><span className="text-[#888]">],</span>{'\n'}
                  {'    '}<span className="text-[#888]">)</span>{'\n'}
                  {'\n'}
                  {'  '}<span className="text-white">encoded_dataset</span> <span className="text-[#888]">=</span> <span className="text-white">dataset</span><span className="text-[#888]">.</span><span className="text-white">map</span><span className="text-[#888]">(</span>{'\n'}
                  {'    '}<span className="text-white">preprocess_function</span><span className="text-[#888]">)</span>{'\n'}
                  {'\n'}
                  {'  '}<span className="text-white">training_args</span> <span className="text-[#888]">=</span> <span className="text-white">TrainingArguments</span><span className="text-[#888]">(</span>{'\n'}
                  {'    '}<span className="text-white">output_dir</span><span className="text-[#888]">=</span><span className="text-[#C8E8C8]">'./results'</span><span className="text-[#888]">,</span>{'\n'}
                  {'    '}<span className="text-white">evaluation_strategy</span><span className="text-[#888]">=</span><span className="text-[#C8E8C8]">'epoch'</span><span className="text-[#888]">,</span>{'\n'}
                  {'    '}<span className="text-white">learning_rate</span><span className="text-[#888]">=</span><span className="text-[#C8E8C8]">2e-5</span><span className="text-[#888]">,</span>{'\n'}
                  {'  '}<span className="text-[#888]">)</span>{'\n'}
                  {'\n'}
                  {'  '}<span className="text-white">trainer</span> <span className="text-[#888]">=</span> <span className="text-white">Trainer</span><span className="text-[#888]">()</span>
                </code>
              </pre>
            </div>

            {/* Connecting Lines - SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              {/* Line from left code to center B */}
              <line x1="320" y1="120" x2="calc(50% - 48px)" y2="calc(50%)" stroke="#e8e6de" strokeWidth="1.5" strokeDasharray="4,4" />
              {/* Line from center B to right code */}
              <line x1="calc(50% + 48px)" y1="calc(50%)" x2="calc(100% - 380px)" y2="140" stroke="#e8e6de" strokeWidth="1.5" strokeDasharray="4,4" />
              {/* Line from left code to bottom task box */}
              <line x1="160" y1="200" x2="140" y2="calc(100% - 100px)" stroke="#e8e6de" strokeWidth="1.5" strokeDasharray="4,4" />
            </svg>
          </div>
        </div>
      </section>

      {/* Section 1: Model Customization - Three Column Cards */}
      <section id="model-customization" className="py-16 md:py-24 bg-[#efede5]">
        <div className="container-custom">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1a1a1a] mb-12 leading-tight max-w-3xl">
            Domain-specialized models tailored to your business.
          </h2>

          {/* Three Column Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {/* Card 1: Custom pre-training */}
            <div className="bg-[#fffdf7] rounded-xl p-6 lg:p-8 shadow-md">
              {/* Orange Icon Box */}
              <div className="w-12 h-12 rounded-lg bg-[#FF8C00] flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 15h6M9 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-4">
                Custom pre-training.
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#1a1a1a] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong className="text-[#1a1a1a]">Full pre-training:</strong> Build models from scratch using custom data mixtures, pre-training codebases, and tailored training recipes.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#1a1a1a] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong className="text-[#1a1a1a]">Continued pre-training:</strong> Start from early open model checkpoints (e.g., BluBridge 7B) and retrain with your proprietary data for domain-specific performance.
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 2: Specialized model capabilities */}
            <div className="bg-[#fffdf7] rounded-xl p-6 lg:p-8 shadow-md">
              {/* Orange Icon Box - Rabbit/Bunny Icon */}
              <div className="w-12 h-12 rounded-lg bg-[#FF8C00] flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M18 8c0-2.21-1.79-4-4-4-.55 0-1.08.11-1.56.31C11.56 2.91 10.11 2 8.5 2 6.01 2 4 4.01 4 6.5c0 .88.25 1.71.69 2.41C3.06 10.05 2 11.91 2 14c0 3.31 2.69 6 6 6h8c3.31 0 6-2.69 6-6 0-2.09-1.06-3.95-2.69-5.09.44-.7.69-1.53.69-2.41 0-.2-.02-.39-.04-.58C19.43 8.62 18.76 9 18 9c-1.1 0-2-.9-2-2 0-.55.22-1.05.58-1.41C17.21 5.21 18 5.9 18 8z"/>
                </svg>
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-4">
                Specialized model capabilities.
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#1a1a1a] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong className="text-[#1a1a1a]">Supervised Fine Tuning (SFT):</strong> Adapt models to specific tasks.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#1a1a1a] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong className="text-[#1a1a1a]">Direct Preference Optimization (DPO):</strong> Align model behavior with specific user expectations.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#1a1a1a] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong className="text-[#1a1a1a]">Synthetic data generation and evaluation platforms:</strong> Enhance model relevance and robustness.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#1a1a1a] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong className="text-[#1a1a1a]">Integrations and agents building:</strong> Leverage your enterprise knowledge base with custom connectors, prompt libraries, and tools like "rag-in-a-box."
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 3: Optimized inference platform */}
            <div className="bg-[#fffdf7] rounded-xl p-6 lg:p-8 shadow-md">
              {/* Orange Icon Box - Monitor Icon */}
              <div className="w-12 h-12 rounded-lg bg-[#FF8C00] flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-4">
                Optimized inference platform.
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#1a1a1a] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong className="text-[#1a1a1a]">Inference optimization:</strong> Use optimized inference libraries, deployment templates, and quantization stacks.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#1a1a1a] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong className="text-[#1a1a1a]">Platform scaling:</strong> Scalable deployments with plug-and-play data sources. Bespoke observability toolchains and devtools.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section: Two Panels with Left Gradient Bar */}
          {/* <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
           
            <div className="rounded-2xl overflow-hidden flex bg-[#FFF9E6]">
             
              <div className="w-2 flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #FFD700 0%, #FF8C00 50%, #DC143C 100%)' }}></div>
              
              <div className="p-8 lg:p-10 flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-[#555555] mb-4">
                  Codestral story
                </h3>
                <p className="text-[#333333] text-sm md:text-base leading-relaxed mb-6">
                  We customized BluBridge Small (22B parameters) on coding tasks with our proprietary dataset, resulting in turbocharged performance on coding:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 pb-4 border-b border-[#e8e6de]">
                    <Check className="w-5 h-5 text-[#333333] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-sm md:text-base text-[#333333] leading-relaxed">
                      <span className="text-[#FF8C00] font-semibold">+23 points</span> higher accuracy compared to state-of-the-art LLMs
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#333333] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-sm md:text-base text-[#333333] leading-relaxed">
                      <span className="text-[#FF8C00] font-semibold">+19 points</span> higher accuracy than other competing solution
                    </span>
                  </li>
                </ul>
              </div>
            </div>

          
            <div className="rounded-2xl overflow-hidden flex bg-[#FFF9E6]">
             
              <div className="w-2 flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #FFD700 0%, #FF8C00 50%, #DC143C 100%)' }}></div>
              
              <div className="p-8 lg:p-10 flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-[#555555] mb-4">
                  Real-world benefits
                </h3>
                <p className="text-[#333333] text-sm md:text-base leading-relaxed mb-6">
                  Customers that have co-trained models with BluBridge AI solutions team have achieved:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 pb-4 border-b border-[#e8e6de]">
                    <Check className="w-5 h-5 text-[#333333] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-sm md:text-base text-[#333333] leading-relaxed">
                      <span className="text-[#FF8C00] font-semibold">94%</span> reduction in cost per token
                    </span>
                  </li>
                  <li className="flex items-start gap-3 pb-4 border-b border-[#e8e6de]">
                    <Check className="w-5 h-5 text-[#333333] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-sm md:text-base text-[#333333] leading-relaxed">
                      <span className="text-[#FF8C00] font-semibold">70%</span> improvement in latency
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#333333] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-sm md:text-base text-[#333333] leading-relaxed">
                      <span className="text-[#FF8C00] font-semibold">Optimized for processing</span> billions of queries weekly
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Section 2: Value Realization - Three Column Cards */}
      <section id="value-realization" className="py-16 md:py-24 bg-[#f9f7f0]">
        <div className="container-custom">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1a1a1a] mb-12 leading-tight max-w-4xl">
            We meet you where you are, and get you to where you should be.
          </h2>

          {/* Three Column Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Proof of value */}
            <div className="bg-[#fffdf7] rounded-lg p-6 lg:p-8 shadow-sm border border-[#e8e6de]/50">
              <div className="w-12 h-12 rounded-lg bg-[#f3f1e9] flex items-center justify-center mb-5">
                <BarChart3 className="w-6 h-6 text-[#0B1F3B]" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-4">
                Proof of value
              </h3>
              
              <p className="text-sm text-[#555555] leading-relaxed mb-6">
                We help you define success criteria for AI adoption and help you build use cases based on your organization, business goals, and data platforms.
              </p>

              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 text-[#007AFF] font-medium text-sm hover:underline group"
              >
                <span>Talk to an expert</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Card 2: Custom training */}
            <div className="bg-[#fffdf7] rounded-lg p-6 lg:p-8 shadow-sm border border-[#e8e6de]/50">
              <div className="w-12 h-12 rounded-lg bg-[#f3f1e9] flex items-center justify-center mb-5">
                <Pencil className="w-6 h-6 text-[#0B1F3B]" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-4">
                Custom training
              </h3>
              
              <p className="text-sm text-[#555555] leading-relaxed">
                We help you build custom models with your success criteria and proprietary data.
              </p>
            </div>

            {/* Card 3: Deployment services */}
            <div className="bg-[#fffdf7] rounded-lg p-6 lg:p-8 shadow-sm border border-[#e8e6de]/50">
              <div className="w-12 h-12 rounded-lg bg-[#f3f1e9] flex items-center justify-center mb-5">
                <RefreshCw className="w-6 h-6 text-[#0B1F3B]" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-4">
                Deployment services
              </h3>
              
              <p className="text-sm text-[#555555] leading-relaxed">
                We help you deploy BluBridge models anywhere. Multiple options are available from managed deployment (including hyperscalers), to self-deployment and edge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Our Frontier Models - Below Value Realization */}
      <section className="pb-20 md:pb-32 bg-[#f9f7f0]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            {/* Pixelated Hot Air Balloon Icon */}
            <div className="flex justify-center">
              <svg width="80" height="100" viewBox="0 0 80 100" className="w-16 h-20 md:w-20 md:h-24">
                {/* Balloon body - pixelated multi-color segments */}
                {/* Red segment */}
                <rect x="30" y="5" width="5" height="5" fill="#E53935"/>
                <rect x="35" y="5" width="5" height="5" fill="#E53935"/>
                <rect x="40" y="5" width="5" height="5" fill="#E53935"/>
                <rect x="25" y="10" width="5" height="5" fill="#E53935"/>
                <rect x="30" y="10" width="5" height="5" fill="#E53935"/>
                <rect x="45" y="10" width="5" height="5" fill="#E53935"/>
                <rect x="50" y="10" width="5" height="5" fill="#E53935"/>
                
                {/* Orange segment */}
                <rect x="35" y="10" width="5" height="5" fill="#FF9800"/>
                <rect x="40" y="10" width="5" height="5" fill="#FF9800"/>
                <rect x="20" y="15" width="5" height="5" fill="#FF9800"/>
                <rect x="25" y="15" width="5" height="5" fill="#FF9800"/>
                <rect x="50" y="15" width="5" height="5" fill="#FF9800"/>
                <rect x="55" y="15" width="5" height="5" fill="#FF9800"/>
                <rect x="30" y="15" width="5" height="5" fill="#FF9800"/>
                <rect x="45" y="15" width="5" height="5" fill="#FF9800"/>
                
                {/* Yellow segment */}
                <rect x="35" y="15" width="5" height="5" fill="#FFEB3B"/>
                <rect x="40" y="15" width="5" height="5" fill="#FFEB3B"/>
                <rect x="20" y="20" width="5" height="5" fill="#FFEB3B"/>
                <rect x="55" y="20" width="5" height="5" fill="#FFEB3B"/>
                <rect x="25" y="20" width="5" height="5" fill="#FFEB3B"/>
                <rect x="50" y="20" width="5" height="5" fill="#FFEB3B"/>
                
                {/* Green segment */}
                <rect x="30" y="20" width="5" height="5" fill="#4CAF50"/>
                <rect x="35" y="20" width="5" height="5" fill="#4CAF50"/>
                <rect x="40" y="20" width="5" height="5" fill="#4CAF50"/>
                <rect x="45" y="20" width="5" height="5" fill="#4CAF50"/>
                <rect x="20" y="25" width="5" height="5" fill="#4CAF50"/>
                <rect x="25" y="25" width="5" height="5" fill="#4CAF50"/>
                <rect x="50" y="25" width="5" height="5" fill="#4CAF50"/>
                <rect x="55" y="25" width="5" height="5" fill="#4CAF50"/>
                
                {/* Blue segment */}
                <rect x="30" y="25" width="5" height="5" fill="#2196F3"/>
                <rect x="35" y="25" width="5" height="5" fill="#2196F3"/>
                <rect x="40" y="25" width="5" height="5" fill="#2196F3"/>
                <rect x="45" y="25" width="5" height="5" fill="#2196F3"/>
                <rect x="25" y="30" width="5" height="5" fill="#2196F3"/>
                <rect x="30" y="30" width="5" height="5" fill="#2196F3"/>
                <rect x="35" y="30" width="5" height="5" fill="#2196F3"/>
                <rect x="40" y="30" width="5" height="5" fill="#2196F3"/>
                <rect x="45" y="30" width="5" height="5" fill="#2196F3"/>
                <rect x="50" y="30" width="5" height="5" fill="#2196F3"/>
                
                {/* Bottom of balloon */}
                <rect x="30" y="35" width="5" height="5" fill="#1976D2"/>
                <rect x="35" y="35" width="5" height="5" fill="#1976D2"/>
                <rect x="40" y="35" width="5" height="5" fill="#1976D2"/>
                <rect x="45" y="35" width="5" height="5" fill="#1976D2"/>
                <rect x="35" y="40" width="5" height="5" fill="#1565C0"/>
                <rect x="40" y="40" width="5" height="5" fill="#1565C0"/>
                
                {/* Strings */}
                <rect x="35" y="45" width="2" height="10" fill="#8B7355"/>
                <rect x="43" y="45" width="2" height="10" fill="#8B7355"/>
                
                {/* Basket */}
                <rect x="30" y="55" width="5" height="5" fill="#8B7355"/>
                <rect x="35" y="55" width="5" height="5" fill="#A0522D"/>
                <rect x="40" y="55" width="5" height="5" fill="#8B7355"/>
                <rect x="45" y="55" width="5" height="5" fill="#A0522D"/>
                <rect x="30" y="60" width="5" height="5" fill="#A0522D"/>
                <rect x="35" y="60" width="5" height="5" fill="#8B7355"/>
                <rect x="40" y="60" width="5" height="5" fill="#A0522D"/>
                <rect x="45" y="60" width="5" height="5" fill="#8B7355"/>
              </svg>
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-2 leading-tight">
              Our frontier models + Your proprietary data =
            </h2>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-8 leading-tight">
              Your unique models
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-[#555555] leading-relaxed mb-8 max-w-2xl mx-auto">
              We are bringing our expertise of building world class models and managing hyper-scale AI infrastructure to you. We are externalizing our science, technology, and solutions, from GPU to interfaces, so that you can in-house your AI systems.
            </p>

            {/* CTA Link */}
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 text-[#1a1a1a] font-medium text-base md:text-lg underline underline-offset-4 decoration-[#1a1a1a] hover:text-[#FF8C00] hover:decoration-[#FF8C00] transition-colors group"
            >
              <span>Start building with BluBridge AI</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Deployment - What's available for self-deployment? */}
      <section id="deployment" className="py-16 md:py-24 bg-[#fffdf7] relative">
        {/* Grid Background Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, #F4C430 1px, transparent 1px),
              linear-gradient(to bottom, #F4C430 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="container-custom relative z-10">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1a1a1a] mb-12 leading-tight">
            What's available for self-deployment?
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left Navigation Tabs */}
            <div className="lg:w-64 flex-shrink-0">
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveTab('ai-studio')}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all ${
                    activeTab === 'ai-studio' 
                      ? 'text-[#1a1a1a] font-semibold border-b-2 border-[#FF8C00]' 
                      : 'text-[#888888] hover:text-[#1a1a1a] border-b-2 border-transparent'
                  }`}
                >
                  <span>AI Studio</span>
                  {activeTab === 'ai-studio' && <ArrowRight className="w-4 h-4 text-[#FF8C00]" />}
                </button>
                <button 
                  onClick={() => setActiveTab('packaged-products')}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all ${
                    activeTab === 'packaged-products' 
                      ? 'text-[#1a1a1a] font-semibold border-b-2 border-[#FF8C00]' 
                      : 'text-[#888888] hover:text-[#1a1a1a] border-b-2 border-transparent'
                  }`}
                >
                  <span>Packaged products</span>
                  {activeTab === 'packaged-products' && <ArrowRight className="w-4 h-4 text-[#FF8C00]" />}
                </button>
                <button 
                  onClick={() => setActiveTab('model-customization')}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all ${
                    activeTab === 'model-customization' 
                      ? 'text-[#1a1a1a] font-semibold border-b-2 border-[#FF8C00]' 
                      : 'text-[#888888] hover:text-[#1a1a1a] border-b-2 border-transparent'
                  }`}
                >
                  <span>Model customization</span>
                  {activeTab === 'model-customization' && <ArrowRight className="w-4 h-4 text-[#FF8C00]" />}
                </button>
              </nav>
            </div>

            {/* Right Content Area - Tab Content */}
            <div className="flex-1">
              {/* AI Studio Content */}
              {activeTab === 'ai-studio' && (
                <div className="bg-[#fffdf7] rounded-2xl shadow-md min-h-[350px] p-8 border-[#efede5] border-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">AI Studio</h3>
                    <code className="text-xs text-[#888888] font-mono">
                      dd78abb3-30b9-4a9c-8550-d151232f0f77
                    </code>
                  </div>
                  <p className="text-[#555555] text-base md:text-lg leading-relaxed">
                    Deployable on public, private clouds or on your premises with support from our experts.
                  </p>
                </div>
              )}

              {/* Packaged Products Content */}
              {activeTab === 'packaged-products' && (
                <div className="bg-[#fffdf7] rounded-2xl p-8 shadow-md">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">Packaged products</h3>
                      <p className="text-[#555555] text-base md:text-lg leading-relaxed">
                        To solve large scale use cases (e.g internal chat, coding copilot).
                      </p>
                    </div>
                    
                    {/* Chat UI Simulation */}
                    <div className="lg:w-80 relative">
                      {/* B Logo */}
                      <div className="absolute -top-4 -right-4 w-14 h-14 bg-[#FF8C00] rounded-xl border-2 border-[#1a1a1a] flex items-center justify-center z-20 shadow-lg">
                        <span className="text-[#1a1a1a] font-bold text-2xl" style={{ WebkitTextStroke: '1px white' }}>B</span>
                      </div>
                      
                      <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg">
                        {/* Chat Message 1 */}
                        <div className="p-4 border-b border-[#333]">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full border-2 border-[#FF8C00] bg-[#333] flex items-center justify-center">
                              <span className="text-white text-xs font-bold">A</span>
                            </div>
                            <span className="text-white text-sm font-medium">Anastasia</span>
                            <span className="text-[#888] text-xs ml-auto">08:00 AM</span>
                          </div>
                          <p className="text-white/90 text-sm ml-11">Any task for today?</p>
                        </div>
                        
                        {/* Chat Message 2 */}
                        <div className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full border-2 border-[#FF8C00] bg-[#333] flex items-center justify-center">
                              <span className="text-white text-xs font-bold">J</span>
                            </div>
                            <span className="text-white text-sm font-medium">Johnathan</span>
                            <span className="text-[#888] text-xs ml-auto">3 minutes ago</span>
                          </div>
                          <p className="text-white/90 text-sm ml-11 leading-relaxed">
                            Yes, you have 3 meetings and 5 reminders on your Google calendar and Slack
                          </p>
                        </div>
                        
                        {/* Chat Input */}
                        <div className="p-3 border-t border-[#333] flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Type here..." 
                            className="flex-1 bg-[#333] text-white text-sm px-4 py-2.5 rounded-lg outline-none"
                            readOnly
                          />
                          <button className="bg-[#FF8C00] text-white text-sm px-4 py-2.5 rounded-lg font-medium hover:bg-[#e67e00] transition-colors">
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Model Customization Content */}
              {activeTab === 'model-customization' && (
                <div className="bg-[#fffdf7] rounded-2xl p-8 shadow-md">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">Model customization</h3>
                      <p className="text-[#555555] text-base md:text-lg leading-relaxed">
                        Including professional services for model customization up to co-training to tackle the most complex use cases.
                      </p>
                    </div>
                    
                    {/* Connection Diagram */}
                    <div className="lg:w-80 relative h-64 flex items-center justify-center">
                      {/* Central B Logo */}
                      <div className="w-20 h-20 bg-[#FF8C00] rounded-xl border-2 border-[#1a1a1a] flex items-center justify-center z-10 shadow-lg">
                        <span className="text-[#1a1a1a] font-bold text-3xl" style={{ WebkitTextStroke: '1px white' }}>B</span>
                      </div>
                      
                      {/* Connection Nodes */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                        <span className="text-xs text-[#555555] font-medium">Pet Owner</span>
                        <div className="w-5 h-5 bg-[#1a1a1a] rounded"></div>
                      </div>
                      <div className="absolute top-4 right-4 flex flex-col items-center gap-1">
                        <span className="text-xs text-[#555555] font-medium">Billing</span>
                        <div className="w-5 h-5 bg-[#1a1a1a] rounded"></div>
                      </div>
                      
                      <div className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center gap-1">
                      <span className="text-xs text-[#555555] font-medium">Employee</span>
                        <div className="w-5 h-5 bg-[#1a1a1a] rounded"></div>
                      </div>
                      
                      <div className="absolute bottom-4 left-4 flex flex-col items-center gap-1">
                        <div className="w-5 h-5 bg-[#1a1a1a] rounded"></div>
                        <span className="text-xs text-[#555555] font-medium">Payment</span>
                      </div>
                      <div className="absolute bottom-4 right-4 flex flex-col items-center gap-1">
                        <div className="w-5 h-5 bg-[#1a1a1a] rounded"></div>
                        <span className="text-xs text-[#555555] font-medium">Geography</span>
                      </div>
                      
                      {/* Connection Lines - SVG */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                        <line x1="50%" y1="50%" x2="50%" y2="12%" stroke="#1a1a1a" strokeWidth="1" />
                        <line x1="50%" y1="50%" x2="85%" y2="20%" stroke="#1a1a1a" strokeWidth="1" />
                        <line x1="50%" y1="50%" x2="25%" y2="50%" stroke="#1a1a1a" strokeWidth="1" />
                        <line x1="50%" y1="50%" x2="18%" y2="82%" stroke="#1a1a1a" strokeWidth="1" />
                        <line x1="50%" y1="50%" x2="82%" y2="82%" stroke="#1a1a1a" strokeWidth="1" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Have Questions Section */}
      <section className="py-16 md:py-20 bg-[#efede5]">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">
              Have questions?
            </h2>
            <p className="text-[#555555] mb-8">
              Our team is ready to help you navigate your AI journey and unlock new opportunities for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0B1F3B] text-white font-medium rounded-lg hover:bg-[#162B4D] transition-colors"
              >
                <span>Talk to sales</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/research"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0B1F3B] font-medium rounded-lg border border-[#e8e6de] hover:bg-[#f3f1e9] transition-colors"
              >
                <span>Try Le Chat</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsNew;
