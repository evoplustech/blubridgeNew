import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, Plus, Minus } from 'lucide-react';

const Marketplace = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const canvasRef = useRef(null);

  // Animated hero canvas effect - stylized "M" logo with glow
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

    const drawMarketplaceAnimation = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Outer glow ring
      const glowGradient = ctx.createRadialGradient(centerX, centerY, 60, centerX, centerY, 180);
      glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
      glowGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.15)');
      glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.beginPath();
      ctx.arc(centerX, centerY, 180, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Pulsing ring
      const pulseRadius = 100 + Math.sin(time * 2) * 10;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 + Math.sin(time * 2) * 0.1})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner circle background
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      const circleGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80);
      circleGradient.addColorStop(0, 'rgba(37, 99, 235, 0.8)');
      circleGradient.addColorStop(1, 'rgba(30, 58, 138, 0.9)');
      ctx.fillStyle = circleGradient;
      ctx.fill();

      // Draw "M" letter
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 72px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('M', 0, 4);
      ctx.restore();

      // Orbiting framework icons (simplified as dots)
      const orbitRadius = 140;
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + time * 0.3;
        const x = centerX + Math.cos(angle) * orbitRadius;
        const y = centerY + Math.sin(angle) * orbitRadius * 0.6;
        
        // Icon background circle
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Connection line to center
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(centerX, centerY);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animationFrame = requestAnimationFrame(drawMarketplaceAnimation);
    };

    resize();
    window.addEventListener('resize', resize);
    drawMarketplaceAnimation();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const faqs = [
    {
      question: "What AI/ML tools are available in the BluBrg AI Marketplace?",
      answer: "The Blubrg AI Marketplace provides a broad selection of leading AI/ML tools, including widely used frameworks such as PyTorch and TensorFlow, all optimized for seamless integration with our platform."
    },
    {
      question: "How can I access pre-trained models in the AI Marketplace?",
      answer: "As a customer, you can explore and access a large library of pre-trained models directly through our AI Marketplace. These models support a wide range of applications and industries, helping you accelerate your AI projects with ease."
    },
    {
      question: "Are the hardware resources in the AI Marketplace optimised for specific use cases?",
      answer: "Yes, our hardware resources are tailored and optimized for specific AI use cases, ensuring peak performance and efficiency without the complexity of managing infrastructure setup."
    },
    {
      question: "Can I integrate my existing workflows with the tools and models in the AI Marketplace?",
      answer: "The AI Marketplace is built to integrate smoothly with your existing workflows, enabling you to use our tools and models without interrupting your current processes."
    }
  ];

  const modelCards = [
    { type: 'TEXT GENERATION', name: 'LLAMA 3 8B', provider: 'META' },
    { type: 'TEXT GENERATION', name: 'LLAMA 3 70B INSTRUCT', provider: 'META' },
    { type: 'IMAGE GENERATION', name: 'FLORENCE 2 LARGE', provider: 'MICROSOFT' },
    { type: 'IMAGE GENERATION', name: 'STABLE DIFFUSION 3 MEDIUM', provider: 'STABILITY AI' },
    { type: 'TEXT GENERATION', name: 'MIXTRAL 8X7B INSTRUCT', provider: 'MISTRAL AI' },
    { type: 'TEXT GENERATION', name: 'PHI 3', provider: 'MICROSOFT' }
  ];

  useDocumentTitle('AI Marketplace | BluBrg');

  return (
    <div className="min-h-screen bg-[#0a0a0f]">      {/* Hero Section */}
      <section className="pt-16 pb-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-blue-400 text-sm font-medium tracking-wider uppercase">MARKETPLACE</span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                Turnkey AI development and deployment
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                Access ready-to-go AI & ML tools and resources, enabling efficient and scalable model development and deployment.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link to="/contact/sales">
                  <Button className="bg-white hover:bg-gray-100 text-black px-8 py-6 text-base font-medium rounded-lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/contact/sales" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors font-medium">
                  Contact Sales <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right - Animated Visual */}
            <div className="relative flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Three-Column Highlights Strip */}
      <section className="py-16 border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Access Leading Tools */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Access Leading Tools</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Develop with leading AI/ML frameworks such as PyTorch and TensorFlow to simplify and accelerate your development workflow.
              </p>
              <Link to="/contact/sales" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                Contact Sales <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Extensive Model Library */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Extensive Model Library</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Explore our collection of open-source models, enhanced with proprietary optimizations running on NVIDIA GPUs.
              </p>
              <Link to="/contact/sales" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Tailored Resources */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Tailored Resources</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Choose from preconfigured templates and customizable tools tailored to suit your specific AI use case.
              </p>
             <Link to="/contact/sales" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools & Frameworks Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Text */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
                Quickly deploy the best AI tools and frameworks
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                Our AI Marketplace offers a curated selection of top AI/ML tools like PyTorch and TensorFlow, optimised for our infrastructure stack. Enhance developer productivity with the best tools available in the industry.
              </p>
              <Link to="/contact">
                <Button className="bg-[#141418] hover:bg-[#1a1a20] text-white border border-white/10 px-6 py-3 text-sm font-medium rounded-lg inline-flex items-center gap-2 mt-4">
                  Get in Touch <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Right - Framework Icons Visual */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-4">
                {/* Central M logo */}
                <div className="col-span-3 flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">M</span>
                  </div>
                </div>
                
                {/* Framework icons */}
                {['PyTorch', 'TensorFlow', 'Kubeflow', 'ONNX', 'HuggingFace', 'vLLM'].map((framework, idx) => (
                  <div key={idx} className="bg-[#141418] border border-white/10 rounded-xl p-4 text-center hover:border-blue-500/30 transition-colors">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-white text-xs font-medium">{framework}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-20 bg-[#0d0d12]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Text */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
                Accelerate development with access to leading models
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                Select from a library of open-source and custom LLM models optimized with Blubrg’s proprietary software. Speed up development and deployment using models built to support a broad range of applications and industries.
              </p>
              <Link to="/contact/sales" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Find Out More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right - Model Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {modelCards.map((model, idx) => (
                <div key={idx} className="bg-[#141418] border border-white/10 rounded-lg p-4 hover:border-blue-500/30 transition-colors">
                  <span className="text-gray-500 text-[10px] uppercase tracking-wider">{model.type}</span>
                  <h4 className="text-white text-sm font-semibold mt-1 leading-tight">{model.name}</h4>
                  <span className="text-gray-500 text-xs mt-1 block">{model.provider}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Options Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Text */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
                Preconfigured hardware options for ease and efficiency
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                Our ready-to-deploy hardware resources are tailored for specific AI use cases, delivering peak performance and efficiency without the complexity of setup.
              </p>
              <Link to="/contact/sales" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right - Hardware Cards */}
            <div className="space-y-4">
              {/* AI-in-a-Box */}
              <div className="bg-[#141418] border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-base">AI-in-a-Box</h4>
                    <p className="text-gray-400 text-sm mt-1">Development environment using GPU Nodes.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Model Development</span>
                      <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Drivers</span>
                      <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Optimised</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Training Compute */}
              <div className="bg-[#141418] border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-base">Training Compute</h4>
                    <p className="text-gray-400 text-sm mt-1">Optimised Kubernetes environment for setting up and training LLM models.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Model Training</span>
                      <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Kubernetes</span>
                      <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Mi300X</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inference Compute */}
              <div className="bg-[#141418] border border-white/10 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-base">Inference Compute</h4>
                    <p className="text-gray-400 text-sm mt-1">Optimised CI/NK clusters with a specialized scheduler for inference jobs.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Autoscaling</span>
                      <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Inference</span>
                      <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Kubernetes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 border-t border-white/5">
        <div className="container-custom">
          <h2 className="text-2xl font-light text-white mb-10">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quick Deployment */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">QUICK DEPLOYMENT</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
               Deploy a broad range of software and hardware resources in just a few clicks.
              </p>
            </div>

            {/* 80% Lower Cost */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">80% LOWER COST</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Blubrg delivers an average cost saving of up to 80% compared to hyperscalers.
              </p>
            </div>

            {/* Tailored for AI */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">TAILORED FOR AI</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                All applications, software, and hardware are fully integrated and purpose-built for AI.
              </p>
            </div>

            {/* Up to 30% */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">UP TO 30%</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We own the infrastructure, so you can focus on innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Services Integration Section */}
      <section className="py-20 bg-[#0d0d12]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left - Text */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">
                Get access to a fully integrated suite of AI services and compute
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
               Lower costs, increase revenue, and operate your AI workloads more efficiently on a fully integrated platform. Whether you use Blubrg’s built-in AI/ML tools or your own, the platform is designed to simplify the path from development to production.
              </p>
            </div>

            {/* Right - Services Grid with Infrastructure */}
            <div className="space-y-6">
              {/* Services Icons Grid */}
              <div className="grid grid-cols-3 gap-3">
                {/* Serverless */}
                <div className="bg-[#141418] border border-white/10 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">Serverless</span>
                </div>

                {/* Marketplace */}
                <div className="bg-[#141418] border border-white/10 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">Marketplace</span>
                </div>

                {/* Inference */}
                <div className="bg-[#141418] border border-white/10 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">Inference</span>
                </div>

                {/* Training */}
                <div className="bg-[#141418] border border-white/10 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">Training</span>
                </div>

                {/* GPU nodes */}
                <div className="bg-[#141418] border border-white/10 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">GPU nodes</span>
                </div>

                {/* LLM Library */}
                <div className="bg-[#141418] border border-white/10 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-medium">LLM Library</span>
                </div>
              </div>

              {/* Data Center Card */}
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">BluBrg's Data centers</h4>
                    <p className="text-gray-400 text-xs">Powered by renewable energy</p>
                  </div>
                </div>
              </div>

              {/* Feature List */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Pre-configured Software',
                  'Pre-configured Infrastructure',
                  'Job Management',
                  'Job Scheduling',
                  'Container Orchestration',
                  'Optimised Libraries',
                  'Optimised Compilers and Tools',
                  'Optimised Runtime'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-gray-400 text-xs">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-10">FAQs</h2>
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10">
                <button
                  className="w-full flex items-center justify-between py-5 text-left hover:text-blue-400 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-white text-lg pr-8">{faq.question}</span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-blue-600/80">
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-blue-400" />
                    )}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="pb-5">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white">
            Access thousands of GPUs tailored to your requirements.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact/sales">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded font-medium">
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

export default Marketplace;
