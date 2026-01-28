import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Check, ArrowRight, BarChart3, Pencil, RefreshCw } from 'lucide-react';

const SolutionsNew = () => {
  useDocumentTitle('Solutions | BluBridge');
  const location = useLocation();

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
      {/* Section 1: Model Customization - Three Column Cards */}
      <section id="model-customization" className="py-16 md:py-24 bg-[#fffdf7]">
        <div className="container-custom">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1a1a1a] mb-12 leading-tight max-w-3xl">
            Domain-specialized models tailored to your business.
          </h2>

          {/* Three Column Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Custom pre-training */}
            <div className="bg-white/60 rounded-lg p-6 lg:p-8 shadow-sm border border-[#e8e6de]/50">
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
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00B050] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong>Full pre-training:</strong> Build models from scratch using custom data mixtures, pre-training codebases, and tailored training recipes.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00B050] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong>Continued pre-training:</strong> Start from early open model checkpoints (e.g., BluBridge 7B) and retrain with your proprietary data for domain-specific performance.
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 2: Specialized model capabilities */}
            <div className="bg-white/60 rounded-lg p-6 lg:p-8 shadow-sm border border-[#e8e6de]/50">
              {/* Orange Icon Box */}
              <div className="w-12 h-12 rounded-lg bg-[#FF8C00] flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-4">
                Specialized model capabilities.
              </h3>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00B050] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong>Supervised Fine Tuning (SFT):</strong> Adapt models to specific tasks.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00B050] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong>Direct Preference Optimization (DPO):</strong> Align model behavior with specific user expectations.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00B050] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong>Synthetic data generation</strong> for platforms: Enhance model robustness.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00B050] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong>Integrations and agents</strong> for enterprise knowledge bases, connectors, prompt libraries, and AI-in-a-box.
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 3: Optimized inference platform */}
            <div className="bg-white/60 rounded-lg p-6 lg:p-8 shadow-sm border border-[#e8e6de]/50">
              {/* Orange Icon Box */}
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
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00B050] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong>Inference optimization:</strong> Use optimized inference libraries, deployment templates, and quantization stacks.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00B050] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#555555] leading-relaxed">
                    <strong>Platform scaling:</strong> Scalable deployments with plug-and-play data sources. Bespoke observability toolchains and devtools.
                  </span>
                </li>
              </ul>
            </div>
          </div>
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
            <div className="bg-white/80 rounded-lg p-6 lg:p-8 shadow-sm border border-[#e8e6de]/50">
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
            <div className="bg-white/80 rounded-lg p-6 lg:p-8 shadow-sm border border-[#e8e6de]/50">
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
            <div className="bg-white/80 rounded-lg p-6 lg:p-8 shadow-sm border border-[#e8e6de]/50">
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
            backgroundSize: '60px 60px'
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
                <button className="w-full text-left px-4 py-3 text-[#1a1a1a] font-semibold border-b-2 border-[#FF8C00] flex items-center justify-between group">
                  <span>AI Studio</span>
                  <ArrowRight className="w-4 h-4 text-[#FF8C00]" />
                </button>
                <button className="w-full text-left px-4 py-3 text-[#888888] hover:text-[#1a1a1a] transition-colors">
                  Packaged products
                </button>
                <button className="w-full text-left px-4 py-3 text-[#888888] hover:text-[#1a1a1a] transition-colors">
                  Model customization
                </button>
              </nav>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: AI Studio */}
              <div className="bg-white/90 rounded-xl p-6 shadow-sm border border-[#e8e6de]/50">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">AI Studio</h3>
                <p className="text-sm text-[#555555] leading-relaxed mb-4">
                  Deployable on public, private clouds or on your premises with support from our experts.
                </p>
                <code className="text-xs text-[#888888] font-mono block truncate">
                  dd78abb3-30b9-4a9c-8550-d151232f0f77
                </code>
              </div>

              {/* Card 2: Packaged Products with Chat UI */}
              <div className="bg-white/90 rounded-xl p-6 shadow-sm border border-[#e8e6de]/50">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">Packaged products</h3>
                <p className="text-sm text-[#555555] leading-relaxed mb-4">
                  To solve large scale use cases (e.g. internal chat, coding copilot).
                </p>
                
                {/* Mini Chat UI */}
                <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                  {/* Chat Header */}
                  <div className="p-3 border-b border-[#333]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#FF8C00] flex items-center justify-center text-white text-xs font-bold">A</div>
                      <span className="text-white text-xs font-medium">Anastasia</span>
                      <span className="text-[#888] text-xs ml-auto">08:00 AM</span>
                    </div>
                    <p className="text-white/90 text-xs">Any task for today?</p>
                  </div>
                  
                  {/* Chat Message */}
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#FF8C00] flex items-center justify-center text-white text-xs font-bold">J</div>
                      <span className="text-white text-xs font-medium">Johnathan</span>
                      <span className="text-[#888] text-xs ml-auto">3 min ago</span>
                    </div>
                    <p className="text-white/90 text-xs leading-relaxed">Yes, you have 3 meetings and 5 reminders on your calendar</p>
                  </div>
                  
                  {/* Chat Input */}
                  <div className="p-2 border-t border-[#333] flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Type here..." 
                      className="flex-1 bg-[#333] text-white text-xs px-3 py-2 rounded outline-none"
                      readOnly
                    />
                    <button className="bg-[#FF8C00] text-white text-xs px-3 py-2 rounded font-medium">
                      Send
                    </button>
                  </div>
                </div>
                
                {/* B Logo */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-[#FF8C00] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
              </div>

              {/* Card 3: Model Customization with Diagram */}
              <div className="bg-white/90 rounded-xl p-6 shadow-sm border border-[#e8e6de]/50 relative">
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">Model customization</h3>
                <p className="text-sm text-[#555555] leading-relaxed mb-6">
                  Including professional services for model customization up to co-training to tackle the most complex use cases.
                </p>
                
                {/* Connection Diagram */}
                <div className="relative h-48 flex items-center justify-center">
                  {/* Central B Logo */}
                  <div className="w-16 h-16 bg-[#FF8C00] rounded-xl flex items-center justify-center z-10">
                    <span className="text-white font-bold text-2xl">B</span>
                  </div>
                  
                  {/* Connection Nodes */}
                  <div className="absolute top-2 right-4 flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#1a1a1a] rounded"></div>
                    <span className="text-xs text-[#555555]">Pet Owner</span>
                  </div>
                  <div className="absolute top-8 right-8 flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#1a1a1a] rounded"></div>
                    <span className="text-xs text-[#555555]">Billing</span>
                  </div>
                  <div className="absolute top-1/2 left-2 -translate-y-1/2 flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#1a1a1a] rounded"></div>
                    <span className="text-xs text-[#555555]">Employee</span>
                  </div>
                  <div className="absolute bottom-8 left-4 flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#1a1a1a] rounded"></div>
                    <span className="text-xs text-[#555555]">Payment</span>
                  </div>
                  <div className="absolute bottom-2 right-4 flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#1a1a1a] rounded"></div>
                    <span className="text-xs text-[#555555]">Geography</span>
                  </div>
                  
                  {/* Connection Lines - SVG */}
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                    <line x1="50%" y1="50%" x2="85%" y2="15%" stroke="#e8e6de" strokeWidth="1" />
                    <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="#e8e6de" strokeWidth="1" />
                    <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="#e8e6de" strokeWidth="1" />
                    <line x1="50%" y1="50%" x2="20%" y2="75%" stroke="#e8e6de" strokeWidth="1" />
                    <line x1="50%" y1="50%" x2="80%" y2="85%" stroke="#e8e6de" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Have Questions Section */}
      <section className="py-16 md:py-20 bg-[#FFF8E7]">
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
