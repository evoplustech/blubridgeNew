import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { SlidersHorizontal, TrendingUp, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';

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

  const solutions = [
    {
      id: 'model-customization',
      title: 'Model Customization',
      subtitle: 'Adapt AI models to your unique business needs',
      icon: SlidersHorizontal,
      description: 'We are providing enterprise-grade model customization services that are transforming how businesses leverage AI. Our team is working closely with you to fine-tune and adapt foundation models to your specific domain, ensuring optimal performance for your use cases.',
      features: [
        'Domain-specific fine-tuning with your proprietary data',
        'Custom model architecture modifications',
        'Performance optimization for your infrastructure',
        'Continuous model improvement and monitoring'
      ],
      stats: [
        { value: '40%', label: 'Accuracy Improvement' },
        { value: '3x', label: 'Faster Deployment' },
        { value: '60%', label: 'Cost Reduction' }
      ],
      ctaLink: '/solutions/model-customization'
    },
    {
      id: 'value-realization',
      title: 'Value Realization',
      subtitle: 'Maximize ROI from your AI investments',
      icon: TrendingUp,
      description: 'We are helping organizations unlock the full potential of their AI investments through our comprehensive value realization framework. Our experts are guiding you from strategy to implementation, ensuring measurable business outcomes.',
      features: [
        'AI readiness assessment and roadmap planning',
        'Implementation strategy and change management',
        'Performance tracking and ROI measurement',
        'Ongoing optimization and scaling support'
      ],
      stats: [
        { value: '85%', label: 'Projects Delivered on Time' },
        { value: '2.5x', label: 'Average ROI' },
        { value: '90%', label: 'Client Satisfaction' }
      ],
      ctaLink: '/solutions/value-realization'
    },
    {
      id: 'deployment',
      title: 'Deployment',
      subtitle: 'Enterprise-ready AI deployment solutions',
      icon: Rocket,
      description: 'We are offering end-to-end deployment services that are bringing your AI models from development to production seamlessly. Our infrastructure is supporting diverse deployment scenarios while maintaining security, scalability, and reliability.',
      features: [
        'Cloud, on-premise, and hybrid deployment options',
        'Auto-scaling infrastructure for varying workloads',
        'Enterprise security and compliance standards',
        '24/7 monitoring and support'
      ],
      stats: [
        { value: '99.9%', label: 'Uptime SLA' },
        { value: '<100ms', label: 'Latency' },
        { value: '10x', label: 'Scalability' }
      ],
      ctaLink: '/solutions/deployment'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fffdf7]">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#efede5] to-[#fffdf7] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#F4C430] rounded-full filter blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#328CC1] rounded-full filter blur-[150px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <img 
                src="https://customer-assets.emergentagent.com/job_text-tune/artifacts/nfrmzez2_b-center.png"
                alt="BluBridge Solutions"
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1F3B] mb-6 leading-tight">
              Enterprise AI Solutions
            </h1>
            <p className="text-lg md:text-xl text-[#2F3A4A] max-w-2xl mx-auto">
              We are delivering comprehensive AI solutions that are transforming how enterprises build, deploy, and scale their AI capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Sections */}
      {solutions.map((solution, index) => (
        <section 
          key={solution.id}
          id={solution.id}
          className={`py-20 md:py-28 ${index % 2 === 0 ? 'bg-[#fffdf7]' : 'bg-[#f7f5ed]'}`}
        >
          <div className="container-custom">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Content Side */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F4C430]/20 flex items-center justify-center">
                    <solution.icon className="w-5 h-5 text-[#0B1F3B]" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-[#6B7280] uppercase tracking-wide">
                    {solution.subtitle}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3B] mb-6">
                  {solution.title}
                </h2>
                
                <p className="text-[#2F3A4A] text-base md:text-lg mb-8 leading-relaxed">
                  {solution.description}
                </p>

                <ul className="space-y-4 mb-8">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#328CC1] flex-shrink-0 mt-0.5" />
                      <span className="text-[#2F3A4A]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to={solution.ctaLink}
                  className="inline-flex items-center gap-2 text-[#0B1F3B] font-medium hover:text-[#F4C430] transition-colors group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Stats Side */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="bg-[#0B1F3B] rounded-2xl p-8 md:p-10">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {solution.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-[#F4C430] mb-2">
                          {stat.value}
                        </div>
                        <div className="text-sm text-white/80">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#0B1F3B]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to transform your AI capabilities?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Our team is ready to help you navigate your AI journey and unlock new opportunities for your business.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F4C430] text-[#0B1F3B] font-semibold rounded-lg hover:bg-[#e5b62e] transition-colors"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsNew;
