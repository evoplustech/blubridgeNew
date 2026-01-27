import React, { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, ChevronDown, ChevronUp, Zap, LayoutGrid ,Plus, Minus} from 'lucide-react';

const Deployment = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useDocumentTitle('AI Deployment & Scalable Model Production | BluBridge');

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      {/* Hero Section - Deployment */}
      <section className="relative flex flex-col overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#fffdf7] overflow-hidden" />

        {/* Hero content - Two column layout */}
        <div className="container-custom relative z-10 flex-1 flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1F3B] mb-8 leading-tight tracking-tight">
                Deployment
              </h1>
              <p className="text-lg lg:text-xl text-[#0B1F3B] mb-10 leading-relaxed">
                At BluBridge, we are providing production-grade deployment infrastructure built for real-world AI systems.
Launching, scaling, and operating your models with confidence using high-performance GPU clusters, low-
latency networking, and enterprise-ready orchestration designed to move your models from lab to live
environments seamlessly.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/contact">
                  <Button size="lg" className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-7 py-3 rounded-md font-medium text-base">
                    Get Started
                  </Button>
                </Link>
                {/* <Link to="/contact" className="flex items-center gap-2 px-6 py-3 text-[#0B1F3B] hover:text-[#328CC1] transition-colors font-medium">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link> */}
              </div>
            </div>
            
            {/* Right - Premium Deployment Infrastructure Visual */}
            <div className="relative h-[450px] lg:h-[520px] flex items-center justify-center">
              <div className="relative w-full max-w-[520px] h-full">
                {/* Background glow effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl" />
                
                {/* Central Deployment Hub */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div 
                    className="relative w-32 h-32 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #0B1F3B 0%, #1a3a5f 100%)',
                      boxShadow: '0 0 60px rgba(11, 31, 59, 0.4), 0 0 100px rgba(6, 182, 212, 0.2), inset 0 2px 20px rgba(255,255,255,0.1)'
                    }}
                  >
                    <div className="text-center">
                      <svg className="w-8 h-8 text-cyan-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
                      </svg>
                      <div className="text-white text-sm font-bold">DEPLOY</div>
                    </div>
                    {/* Rotating outer ring */}
                    <div 
                      className="absolute inset-[-12px] rounded-full border-2 border-dashed border-cyan-400/40"
                      style={{ animation: 'spinDeploy 25s linear infinite' }}
                    />
                    {/* Inner pulse ring */}
                    <div 
                      className="absolute inset-[-4px] rounded-full border border-cyan-400/30"
                      style={{ animation: 'pulseDeploy 2s ease-in-out infinite' }}
                    />
                  </div>
                </div>
                
                {/* Orbital path */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520">
                  <ellipse cx="260" cy="260" rx="180" ry="180" fill="none" stroke="url(#deployOrbit)" strokeWidth="1" strokeDasharray="8 4" opacity="0.3">
                    <animateTransform attributeName="transform" type="rotate" from="0 260 260" to="360 260 260" dur="60s" repeatCount="indefinite"/>
                  </ellipse>
                  <ellipse cx="260" cy="260" rx="130" ry="130" fill="none" stroke="url(#deployOrbit)" strokeWidth="1" opacity="0.2"/>
                  
                  <defs>
                    <linearGradient id="deployOrbit" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6"/>
                      <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.6"/>
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Deployment Metric Cards - Positioned around center */}
                {/* Top - Uptime */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2" style={{ animation: 'floatDeploy1 5s ease-in-out infinite' }}>
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-[#E5E7EB] min-w-[140px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <span className="text-xs text-[#6B7280] font-medium">Uptime</span>
                    </div>
                    <div className="text-xl font-bold text-[#0B1F3B]">99.99%</div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                      <span className="text-xs text-green-500 font-medium">Live</span>
                    </div>
                  </div>
                </div>
                
                {/* Right - Latency */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0" style={{ animation: 'floatDeploy2 6s ease-in-out infinite' }}>
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-[#E5E7EB] min-w-[140px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                      </div>
                      <span className="text-xs text-[#6B7280] font-medium">Latency</span>
                    </div>
                    <div className="text-xl font-bold text-[#0B1F3B]">12ms</div>
                    <div className="w-full h-1 bg-[#E5E7EB] rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: '15%', animation: 'pulseBar 1.5s ease-in-out infinite' }}/>
                    </div>
                  </div>
                </div>
                
                {/* Bottom - Instances */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2" style={{ animation: 'floatDeploy3 5.5s ease-in-out infinite' }}>
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-[#E5E7EB] min-w-[140px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                      </div>
                      <span className="text-xs text-[#6B7280] font-medium">Instances</span>
                    </div>
                    <div className="text-xl font-bold text-[#0B1F3B]">248</div>
                    <div className="flex gap-1 mt-2">
                      {[1,2,3,4,5,6].map((i) => (
                        <div key={i} className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center">
                          <div className={`w-2 h-2 rounded-sm ${i <= 5 ? 'bg-blue-500' : 'bg-[#E5E7EB]'}`}/>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Left - Regions */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0" style={{ animation: 'floatDeploy4 6.5s ease-in-out infinite' }}>
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-[#E5E7EB] min-w-[140px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <span className="text-xs text-[#6B7280] font-medium">Regions</span>
                    </div>
                    <div className="text-xl font-bold text-[#0B1F3B]">12</div>
                    <div className="text-xs text-purple-500 mt-1">Global Coverage</div>
                  </div>
                </div>
                
                {/* Corner Cards */}
                {/* Top Left - Deployments */}
                <div className="absolute top-16 left-8" style={{ animation: 'floatDeploy5 5s ease-in-out infinite' }}>
                  <div className="bg-white/90 backdrop-blur rounded-lg p-3 shadow-md border border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-green-500/10 flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-[#6B7280]">Deploys/Day</div>
                        <div className="text-sm font-bold text-[#0B1F3B]">847</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Top Right - Success Rate */}
                <div className="absolute top-16 right-8" style={{ animation: 'floatDeploy6 5.5s ease-in-out infinite' }}>
                  <div className="bg-white/90 backdrop-blur rounded-lg p-3 shadow-md border border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-cyan-500/10 flex items-center justify-center">
                        <svg className="w-3 h-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-[#6B7280]">Success</div>
                        <div className="text-sm font-bold text-[#0B1F3B]">99.8%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Left - GPU Utilization */}
                <div className="absolute bottom-16 left-8" style={{ animation: 'floatDeploy7 6s ease-in-out infinite' }}>
                  <div className="bg-white/90 backdrop-blur rounded-lg p-3 shadow-md border border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-orange-500/10 flex items-center justify-center">
                        <svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-[#6B7280]">GPU Load</div>
                        <div className="text-sm font-bold text-[#0B1F3B]">78%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Right - Auto-Scale */}
                <div className="absolute bottom-16 right-8" style={{ animation: 'floatDeploy8 5.2s ease-in-out infinite' }}>
                  <div className="bg-white/90 backdrop-blur rounded-lg p-3 shadow-md border border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center">
                        <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-[#6B7280]">Auto-Scale</div>
                        <div className="text-sm font-bold text-green-500">Active</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating connection particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(18)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: `${3 + (i % 3)}px`,
                        height: `${3 + (i % 3)}px`,
                        background: i % 3 === 0 ? '#06B6D4' : i % 3 === 1 ? '#3B82F6' : '#22C55E',
                        left: `${12 + (i * 4.5)}%`,
                        top: `${18 + ((i % 5) * 16)}%`,
                        opacity: 0.4,
                        animation: `deployParticle${i % 4} ${4 + (i % 3)}s ease-in-out infinite`,
                        animationDelay: `${i * 0.12}s`
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Animation keyframes */}
              <style>{`
                @keyframes spinDeploy {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes pulseDeploy {
                  0%, 100% { transform: scale(1); opacity: 0.3; }
                  50% { transform: scale(1.1); opacity: 0.6; }
                }
                @keyframes pulseBar {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.5; }
                }
                @keyframes floatDeploy1 {
                  0%, 100% { transform: translateX(-50%) translateY(0); }
                  50% { transform: translateX(-50%) translateY(-8px); }
                }
                @keyframes floatDeploy2 {
                  0%, 100% { transform: translateY(-50%) translateX(0); }
                  50% { transform: translateY(-50%) translateX(-8px); }
                }
                @keyframes floatDeploy3 {
                  0%, 100% { transform: translateX(-50%) translateY(0); }
                  50% { transform: translateX(-50%) translateY(8px); }
                }
                @keyframes floatDeploy4 {
                  0%, 100% { transform: translateY(-50%) translateX(0); }
                  50% { transform: translateY(-50%) translateX(8px); }
                }
                @keyframes floatDeploy5 {
                  0%, 100% { transform: translate(0, 0); }
                  50% { transform: translate(5px, -6px); }
                }
                @keyframes floatDeploy6 {
                  0%, 100% { transform: translate(0, 0); }
                  50% { transform: translate(-5px, -6px); }
                }
                @keyframes floatDeploy7 {
                  0%, 100% { transform: translate(0, 0); }
                  50% { transform: translate(5px, 6px); }
                }
                @keyframes floatDeploy8 {
                  0%, 100% { transform: translate(0, 0); }
                  50% { transform: translate(-5px, 6px); }
                }
                @keyframes deployParticle0 {
                  0% { transform: translate(0, 0); opacity: 0.3; }
                  50% { transform: translate(15px, -20px); opacity: 0.6; }
                  100% { transform: translate(0, 0); opacity: 0.3; }
                }
                @keyframes deployParticle1 {
                  0% { transform: translate(0, 0); opacity: 0.4; }
                  50% { transform: translate(-20px, 15px); opacity: 0.7; }
                  100% { transform: translate(0, 0); opacity: 0.4; }
                }
                @keyframes deployParticle2 {
                  0% { transform: translate(0, 0); opacity: 0.3; }
                  50% { transform: translate(20px, 20px); opacity: 0.5; }
                  100% { transform: translate(0, 0); opacity: 0.3; }
                }
                @keyframes deployParticle3 {
                  0% { transform: translate(0, 0); opacity: 0.5; }
                  50% { transform: translate(-15px, -15px); opacity: 0.7; }
                  100% { transform: translate(0, 0); opacity: 0.5; }
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      {/* Value Highlights - 3 Column Strip */}
      <section className="py-16 bg-[#efede5] border-t border-[#D6DEC3]">
        <div className="container-custom">
          <h2 className="text-center mb-10 text-3xl font-bold">What You Get </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Optimise for Performance</h3>
              <p className="text-[#4B5563] leading-relaxed text-md">
                Deploying models in environments engineered for reliability, consistency, and real-time inference at scale.
              </p>
            </div>
            <div className="border-l border-[#D6DEC3] pl-12">
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Accelerate Time to Market</h3>
              <p className="text-[#4B5563] leading-relaxed text-md">
                Moving from experimentation to live systems faster with pre-configured pipelines and automated rollout workflows.
              </p>
            </div>
            <div className="border-l border-[#D6DEC3] pl-12">
              <h3 className="text-xl font-semibold text-[#0B1F3B] mb-3">Cost-Effective Scalability</h3>
              <p className="text-[#4B5563] leading-relaxed text-md">
                Scaling inference dynamically with predictable pricing and resource-aware orchestration across GPU clusters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Deployment Pipeline - Unique Horizontal Flow Design */}
      <section className="py-24 bg-[#fffdf7] relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #0B1F3B 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>
        
        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1F3B]/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              <span className="text-[#6B7280] text-sm font-medium">Production Ready</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black leading-tight max-w-2xl">
              Intelligent Model Deployment
            </h2>
            <p className="text-[#4B5563] leading-relaxed text-lg mb-5">
              Deployment is where AI is becoming operational. BluBridge is delivering a unified deployment layer that is transforming trained models into reliable, real-time systems, ready to serve users, applications, and workflows at scale.
            </p>
            <p className="text-[#4B5563] leading-relaxed text-lg">
              Our platform is supporting low-latency inference, batch execution, traffic orchestration, versioned releases, and instant rollback. Models are moving seamlessly from experimentation into production with full observability, governance, and performance control across environments.
            </p>
          </div>
 
          {/* Horizontal Pipeline Flow */}
          <div className="relative">
            {/* Connection Line */}
              <h3 class="font-bold text-3xl mb-10">From Lab to Live</h3>
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-green-500/20 -translate-y-1/2 z-0" />
          
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {/* Stage 1 - Build */}
              <div 
                className="bg-[#efede5] rounded-2xl p-6 border border-[#E5E7EB] relative group"
                style={{ animation: 'pipelineFloat1 5s ease-in-out infinite' }}
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#efede5] rounded-xl flex items-center justify-center text-[#000000] font-bold shadow-lg">
                  01
                </div>
                {/* Arrow connector (hidden on last item) */}
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#fffdf7] border border-[#E5E7EB] rounded-full items-center justify-center z-20">
                  <ArrowRight className="w-3 h-3 " />
                </div>
                
                <div className="pt-4">
                  <div className="w-14 h-14  rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-[#000000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Package</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">Preparing models with optimized runtime dependencies and hardware-aware configurations for production execution.</p>
                  {/* <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                      Docker + ONNX
                    </div>
                  </div> */}
                </div>
              </div>
              
              {/* Stage 2 - Test */}
              <div 
                className="bg-[#efede5] rounded-2xl p-6 border border-[#E5E7EB] relative group"
                style={{ animation: 'pipelineFloat2 6s ease-in-out infinite' }}
              >
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#efede5] rounded-xl flex items-center justify-center text-[#000000] font-bold shadow-lg">
                  02
                </div>
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6  border border-[#E5E7EB] rounded-full items-center justify-center z-20">
                  <ArrowRight className="w-3 h-3 " />
                </div>
                
                <div className="pt-4">
                  <div className="w-14 h-14  rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-[#000000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Verify</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">Continuously validate behavior, performance, and safety using automated checks and pre-release gates.</p>
                  {/* <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <span className="w-2 h-2 bg-purple-500 rounded-full" />
                      CI/CD Pipeline
                    </div>
                  </div> */}
                </div>
              </div>
              
              {/* Stage 3 - Deploy */}
              <div 
                className="bg-[#efede5] rounded-2xl p-6 border border-[#E5E7EB] relative group"
                style={{ animation: 'pipelineFloat3 5.5s ease-in-out infinite' }}
              >
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#efede5] rounded-xl flex items-center justify-center text-[#000000] font-bold shadow-lg">
                  03
                </div>
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6  border border-[#E5E7EB] rounded-full items-center justify-center z-20">
                  <ArrowRight className="w-3 h-3" />
                </div>
                
                <div className="pt-4">
                  <div className="w-14 h-14  rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-[#000000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Release</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">Ship models into live environments using controlled rollout strategies that ensure zero disruption.</p>
                  {/* <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <span className="w-2 h-2 bg-orange-500 rounded-full" />
                      Zero Downtime
                    </div>
                  </div> */}
                </div>
              </div>
              
              {/* Stage 4 - Scale */}
              <div 
                className="bg-[#efede5] rounded-2xl p-6 border border-[#E5E7EB] relative group"
                style={{ animation: 'pipelineFloat4 6.5s ease-in-out infinite' }}
              >
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#efede5] rounded-xl flex items-center justify-center text-[#000000] font-bold shadow-lg">
                  04
                </div>
                
                <div className="pt-4">
                  <div className="w-14 h-14  rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-[#000000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Operate</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">Scale globally with intelligent routing, live monitoring, and adaptive resource management.</p>
                  {/* <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      12+ Regions
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          {/* <div className="mt-16 bg-[#efede5] rounded-2xl p-8 border border-[#E5E7EB]">
            <div className="grid md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB]">
              <div className="text-center pt-4 md:pt-0">
                <div className="text-4xl font-bold text-black mb-1">99.9%</div>
                <div className="text-[#6B7280] text-sm">Uptime SLA</div>
              </div>
              <div className="text-center pt-4 md:pt-0">
                <div className="text-4xl font-bold text-black mb-1">&lt;12ms</div>
                <div className="text-[#6B7280] text-sm">Avg Latency</div>
              </div>
              <div className="text-center pt-4 md:pt-0">
                <div className="text-4xl font-bold text-black mb-1">847</div>
                <div className="text-[#6B7280] text-sm">Deploys/Day</div>
              </div>
              <div className="text-center pt-4 md:pt-0">
                <div className="text-4xl font-bold text-black mb-1">99.8%</div>
                <div className="text-[#6B7280] text-sm">Success Rate</div>
              </div>
            </div>
          </div> */}
        </div>
        
        {/* Animation styles */}
        <style>{`
          @keyframes pipelineFloat1 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes pipelineFloat2 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes pipelineFloat3 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes pipelineFloat4 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-7px); }
          }
        `}</style>
      </section>

      {/* Fast, Efficient Model Fine-tuning Section */}
      {/* <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-emerald-500 text-sm font-medium mb-3 uppercase tracking-wider">LEVERAGE ADVANCED GPU CLOUD INFRASTRUCTURE</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-6 leading-tight">
                Fast, reliable Deployment
              </h2>
                <p className="mb-2">Deployment is where models meet reality. BluBridge provides a unified platform for launching and operating AI systems at scale, whether for internal tools, customer-facing products, or enterprise workflows.</p>
                <p className="mb-2">Our deployment layer supports real-time inference, batch processing, traffic routing, version control, and rollback strategies. Models can be promoted directly from training or fine-tuning into production with full observability and governance.</p>
                <p className="mb-2">From pilot environments to global rollouts, BluBridge ensures every deployment is stable, secure, and built for growth.</p>
              <div className="space-y-8">
                <div className="border-l-2 border-emerald-500 pl-5">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">30% Faster Time to Value for Your AI Projects</h3>
                  <p className="text-[#6B7280] text-xs font-medium mb-2">Accelerate the time to actionable results with an AI stack optimised for rapid experimentation and tuning.</p>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    We own the infrastructure so you can focus on the innovation.
                  </p>
                </div>

                <div className="border-l-2 border-emerald-500 pl-5">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">40% Efficiency Improvement</h3>
                  <p className="text-[#6B7280] text-xs font-medium mb-2">Optimised Resource Utilisation</p>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    Increase the effectiveness of compute resources with improved hardware utilisation.
                  </p>
                </div>
              </div>
            </div>

            
            <div className="space-y-4">
              <div className="bg-white border border-[#D6DEC3] rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/30 to-green-600/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-[#0B1F3B] font-semibold">AI Marketplace</h4>
                    <p className="text-[#6B7280] text-sm">Pre-built deployment templates and services</p>
                  </div>
                </div>
              </div>
              <div className=" border border-[#D6DEC3] rounded-xl p-6 bg-[#0B1F3B]  text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-400/20 to-slate-900/10 rounded-xl flex items-center justify-center">
                    <LayoutGrid className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Training Compute</h4>
                    <p className="text-white text-sm">Seamless transition from training to production</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0B1F3B]  text-white border border-[#D6DEC3] rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-violet-600/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Inference & Deployment</h4>
                    <p className="text-white text-sm">One-click model rollout and scaling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

            {/* SECTION 4: Deployment Stack - Table Format */}
      <section className="py-20 bg-[#efede5]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0B1F3B]">
            Deployment Stack
          </h2>
          <p className="text-[#4B5563] mb-12 max-w-6xl">
          BluBridge provides a complete technology stack for running high-throughput inference workloads with efficiency and control.
          </p>
          
          {/* Table 1: First 3 columns */}
          <div className="rounded-xl overflow-hidden border border-[#E5E7EB] mb-6">
            {/* Horizontal scroll wrapper for mobile */}
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                {/* Header Row - Dark Background */}
                <div className="bg-[#0B1F3B] grid grid-cols-3">
                  <div className="px-5 py-4 text-white text-xs font-bold uppercase tracking-wider border-r border-[#1a3a5f]">
                    MODEL SERVING
                  </div>
                  <div className="px-5 py-4 text-white text-xs font-bold uppercase tracking-wider border-r border-[#1a3a5f]">
                    RELEASE MANAGEMENT
                  </div>
                  <div className="px-5 py-4 text-white text-xs font-bold uppercase tracking-wider">
                    CONTINUOUS DELIVERY
                  </div>
                </div>
                
                {/* Data Rows - White Background */}
                {[
                  ['REST & Streaming APIs', 'Version Control & Rollbacks', 'Automated CI/CD Pipelines'],
                  ['Real-Time Inference', 'Canary Deployments', 'Zero-Downtime Deployments'],
                  ['Batch Inference Jobs', 'Shadow Deployments', 'Model Validation Gates'],
                  ['Load Balancing', 'Staged Rollouts', 'Configuration Management'],
                  ['Secure Access Controls', 'Environment Promotion', 'Infrastructure as Code']
                ].map((row, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-3 bg-white border-b border-[#E5E7EB] last:border-b-0">
                    {row.map((cell, cellIndex) => (
                      <div 
                        key={cellIndex} 
                        className={`px-5 py-3 text-[#212529] text-sm ${cellIndex < 2 ? 'border-r border-[#E5E7EB]' : ''}`}
                      >
                        {cell && (
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-[#32CD32] rounded-full flex-shrink-0" />
                            <span className="text-xs">{cell}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Table 2: Last 3 columns */}
          <div className="rounded-xl overflow-hidden border border-[#E5E7EB]">
            {/* Horizontal scroll wrapper for mobile */}
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                {/* Header Row - Dark Background */}
                <div className="bg-[#0B1F3B] grid grid-cols-3">
                  <div className="px-5 py-4 text-white text-xs font-bold uppercase tracking-wider border-r border-[#1a3a5f]">
                    AUTO-SCALING
                  </div>
                  <div className="px-5 py-4 text-white text-xs font-bold uppercase tracking-wider border-r border-[#1a3a5f]">
                    MULTI-CLOUD SUPPORT
                  </div>
                  <div className="px-5 py-4 text-white text-xs font-bold uppercase tracking-wider">
                    INFERENCE OPTIMIZATION
                  </div>
                </div>
                
                {/* Data Rows - White Background */}
                {[
                  ['Dynamic Resource Scaling', 'Deploy on AWS, Azure, GCP', 'Quantization & Pruning'],
                  ['Load-Based Auto-Scaling', 'Hybrid Cloud Strategies', 'Batching & Caching'],
                  ['Horizontal & Vertical Scaling', 'Cross-Cloud Load Balancing', 'Model Acceleration (TensorRT, ONNX)'],
                  ['Traffic-Aware Policies', 'Failover & Redundancy', 'Automated Hardware Selection'],
                  ['On-Demand Node Provisioning', 'Cost Optimization Across Clouds', 'Optimized Runtime Environments']
                ].map((row, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-3 bg-white border-b border-[#E5E7EB] last:border-b-0">
                    {row.map((cell, cellIndex) => (
                      <div 
                        key={cellIndex} 
                        className={`px-5 py-3 text-[#212529] text-sm ${cellIndex < 2 ? 'border-r border-[#E5E7EB]' : ''}`}
                      >
                        {cell && (
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-[#32CD32] rounded-full flex-shrink-0" />
                            <span className="text-xs">{cell}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>    

      {/* Deployment Statistics Section */}
      {/* <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-16">Deployment Patterns</h2>
          <div className="grid md:grid-cols-3 gap-8">
           
            <div className="text-center p-8 bg-[#efede5] rounded-xl">
              <div className="text-5xl lg:text-6xl font-bold text-[#0B1F3B] mb-4">210%</div>
              <h3 className="text-lg font-semibold text-[#328CC1] mb-3 uppercase tracking-wider">Faster to Production</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Organizations registering AI models for production grew by over two times in a single year.
              </p>
            </div>
            
            
            <div className="text-center p-8 bg-[#efede5] rounded-xl">
              <div className="text-5xl lg:text-6xl font-bold text-[#0B1F3B] mb-4">88%</div>
              <h3 className="text-lg font-semibold text-[#328CC1] mb-3 uppercase tracking-wider">Enterprise Deployment</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Nearly nine in ten companies now run AI in at least one core business function.
              </p>
            </div>
            
          
            <div className="text-center p-8 bg-[#efede5] rounded-xl">
              <div className="text-5xl lg:text-6xl font-bold text-[#0B1F3B] mb-4">50%</div>
              <h3 className="text-lg font-semibold text-[#328CC1] mb-3 uppercase tracking-wider">Workforce Reach</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                Employee access to AI tools increased by half in one year, accelerating real-world rollout.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Performance Metrics - 4 Column */}
      {/* <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                metric: '210%', 
                label: 'FASTER TO PRODUCTION', 
                sublabel: 'Accelerate Time to Value',
                desc: 'Organizations registering AI models for production grew by over two times in a single year.',
                link: 'Learn More',
                linkTo: '/about-us'
              },
              { 
                metric: '88%', 
                label: 'ENTERPRISE DEPLOYMENT', 
                sublabel: 'More performance for less.',
                desc: 'Nearly nine in ten companies now run AI in at least one core business function.',
                link: 'Our Data Centres',
                linkTo: '/products/glomfjord'
              },
              { 
                metric: '50%', 
                label: 'WORKFORCE REACH', 
                sublabel: 'Improved Resource Utilisation',
                desc: 'Employee access to AI tools increased by half in one year, accelerating real-world rollout.',
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
      </section>  */}

      {/* Key Services */}
      {/* <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">Key Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            <Link className="" to="/products/training">
            <div className="hover:bg-[#f5f4f1] min-h-[300px] hover:text-[#328CC1] bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-emerald-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/30 to-green-600/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Compute</h3>
              <p className="text-emerald-400 text-sm mb-4">Training</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                A highly scalable and performance-optimised compute framework that shortens model training cycles and boosts productivity.
              </p>
            </div>
            </Link> 
           
            <Link className="" to="/products/marketplace">
            <div className="hover:bg-[#f5f4f1] min-h-[300px] hover:text-[#328CC1] bg-white border border-[#D6DEC3] rounded-xl p-8 hover:border-emerald-500/30 transition-colors">
              <div className="mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 rounded-xl flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-[#328CC1]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">AI Marketplace</h3>
              <p className="text-[#328CC1] text-sm mb-4">Marketplace</p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                An ecosystem of services and tools that support the entire model lifecycle, enabling development and deployment using both BluBridge offerings and popular AI/ML technologies.
              </p>
            </div>
            </Link> 
          </div>
        </div>
      </section> */}

      {/* More Solutions */}
      {/* <section className="py-20 bg-[#fffdf7]">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-light mb-4 text-[#0B1F3B]">More Solutions</h2>
            <p className="text-[#2F3A4A] max-w-2xl">
              BluBridge accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives..
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5">
            
            <Link to="/solutions/training">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/tbqd1w9m_Training.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-md">TRAINING</span>
                </div>
              </div>
            </Link>

            
            <Link to="/solutions/inference">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/2qvmu3rl_INFERENCE.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-md">INFERENCE</span>
                </div>
              </div>
            </Link>

            
            <Link to="/solutions/ai-development">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/u12c3np1_AI%20Development.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-md">AI DEVELOPMENT</span>
                </div>
              </div>
            </Link>

            
            
          </div>
        </div>
      </section> */}

      {/* FAQs */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">FAQs</h2>
          <div className="max-w-4xl space-y-3">
            {[
              {
                question: "What makes BluBridge’s deployment platform different?",
                answer: "BluBridge is built specifically for AI workloads. It combines high-performance inference, versioned releases, and enterprise-grade orchestration into a single, production-ready layer."
              },
              {
                question: "What types of deployments are supported?",
                answer: "We support real-time APIs, batch inference, streaming workloads, internal services, and edge-style deployments across cloud and hybrid environments."
              },
              {
                question: "Can I manage multiple model versions in production?",
                answer: "Yes. You can run multiple versions simultaneously, route traffic dynamically, perform canary releases, and roll back instantly if needed."
              },
              {
                question: "How quickly can I go live?",
                answer: "With pre-configured pipelines and automated workflows, teams typically move from a trained model to production in days, not months."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#D6DEC3]">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-emerald-400 transition-colors"
                >
                  <span className="text-base font-medium text-[#0B1F3B] pr-8">{faq.question}</span>
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

      {/* Bottom CTA */}
      {/* <section className="py-20 bg-[#0B1F3B] from-blue-600 via-blue-700 to-indigo-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Access thousands of GPUs tailored to your<br />requirements.
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/contact">
              <Button className="bg-white text-[#0B1F3B] hover:bg-gray-100 px-8 py-3 rounded font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors font-medium">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Deployment;
