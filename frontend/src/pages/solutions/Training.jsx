import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowRight, ChevronDown, ChevronUp, Zap, ShoppingCart } from 'lucide-react';

const Training = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-[#1a0a2e] via-[#0f051d] to-[#000000]">
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full filter blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-600/20 rounded-full filter blur-[150px]" />
        </div>

        <div className="container-custom relative z-10 flex-1 flex items-center py-32">
          <div className="max-w-4xl">
            <h1 className="text-6xl sm:text-7xl font-bold text-white mb-8 leading-tight">
              MODEL TRAINING
            </h1>
            <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-3xl">
              BluBrg's GPU Cloud offers a highly scalable, performance-optimized architecture that significantly reduces training times. It boosts productivity, enabling you to achieve your AI goals faster and more cost-effectively than alternative cloud platforms.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-purple-900 px-12 py-7 text-lg font-medium">
                  Get Started
                </Button>
              </Link>
              <Link to="/contact">
                <button className="text-white hover:text-white/80 px-12 py-7 text-lg font-medium transition-colors flex items-center gap-2">
                  Contact Sales <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Strip */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Highly Scalable Architecture',
                desc: 'Infrastructure designed to scale seamlessly from single GPUs to thousands of nodes for the most demanding training workloads.'
              },
              {
                title: 'Reduced Training Times',
                desc: 'Optimized GPU configurations and high-bandwidth networking deliver up to 7.2x faster training compared to standard cloud infrastructure.'
              },
              {
                title: 'Increased Productivity',
                desc: 'Pre-configured frameworks and automated resource management let your team focus on model development instead of infrastructure.'
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accelerated Model Training */}
      <section className="py-32 bg-[#000000]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-bold text-white mb-8">Accelerated Model Training</h2>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                Training large language models and deep neural networks requires massive computational resources and efficient infrastructure. Traditional cloud platforms often fall short with limited GPU availability, slow inter-node communication, and complex setup processes.
              </p>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                BluBrg solves these challenges with purpose-built AI infrastructure featuring the latest NVIDIA and AMD GPUs, ultra-low latency interconnects, and optimized software stacks. Our platform reduces training times by up to 80% while lowering costs by 40% compared to standard cloud offerings.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                Whether you're training foundation models, fine-tuning for specific tasks, or conducting research experiments, BluBrg provides the performance and flexibility you need at a fraction of the cost.
              </p>
            </div>
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-2xl p-12 text-center">
                <div className="text-purple-400 text-sm font-semibold mb-4">AI-IN-A-BOX</div>
                <div className="text-4xl font-bold text-white mb-2">Pre-configured</div>
                <div className="text-white/60">Training Environments</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border border-indigo-500/30 rounded-2xl p-12 text-center">
                <div className="text-indigo-400 text-sm font-semibold mb-4">TRAINING COMPUTE</div>
                <div className="text-4xl font-bold text-white mb-2">Scalable</div>
                <div className="text-white/60">GPU Clusters</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Stack */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-8">Training Stack</h2>
            <p className="text-lg text-white/70 mb-16 max-w-3xl">
              Our comprehensive training stack provides everything you need from hardware to applications, with full flexibility to customize at any layer.
            </p>

            <div className="space-y-8">
              {/* Marketplace */}
              <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">MARKETPLACE</h3>
                <div className="flex flex-wrap gap-4">
                  {['Jupyter Notebook', 'TensorFlow', 'PyTorch', 'HuggingFace', 'MLflow', 'Ray', 'Weights & Biases'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 text-white text-sm">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">PLATFORM</h3>
                <div className="flex flex-wrap gap-4">
                  {['Virtual Machines', 'Managed Kubernetes'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 text-white text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">INFRASTRUCTURE</h3>
                <div className="flex flex-wrap gap-4">
                  {['GPU Compute', 'Storage', 'Networking'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-2 text-white text-sm">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hardware */}
              <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">HARDWARE</h3>
                <div className="flex flex-wrap gap-4">
                  {['AMD MI300X', 'AMD MI250X', 'NVIDIA GB200', 'NVIDIA H100', 'NVIDIA H200', 'NVIDIA A100', '...'].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 text-white text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* User Experience & Data Centre */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">USER EXPERIENCE</h3>
                  <div className="space-y-3">
                    {['Web Console', 'API', 'CLI'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#121212] border border-white/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">DATA CENTRE</h3>
                  <div className="space-y-3">
                    {['Renewable Energy', 'Low-latency Fibre'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance */}
      <section className="py-32 bg-[#000000]">
        <div className="container-custom">
          <h2 className="text-5xl font-bold text-white mb-20 text-center">Performance</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {[
              { metric: '30%', label: 'FASTER INSIGHTS', desc: 'Accelerate your model development cycles and bring AI products to market faster with optimized training infrastructure.' },
              { metric: '80%', label: 'LOWER COST', desc: 'Reduce training expenses significantly compared to major cloud providers through efficient resource utilization and competitive pricing.' },
              { metric: '40%', label: 'MORE EFFICIENT', desc: 'Achieve higher GPU utilization rates and better resource efficiency with our optimized software stack and scheduling.' },
              { metric: 'UP TO 7.2X', label: 'FASTER INFERENCE', desc: 'Deploy trained models with industry-leading inference performance for real-time applications and high-throughput scenarios.' }
            ].map((item, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-10">
                <div className="text-6xl font-bold text-white mb-2">{item.metric}</div>
                <div className="text-white text-lg font-semibold mb-4">{item.label}</div>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container-custom">
          <h2 className="text-5xl font-bold text-white mb-20">Key Services</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: <Zap className="w-16 h-16 text-purple-400" />,
                title: 'AI Compute Training',
                desc: 'Access powerful GPU clusters configured specifically for training large-scale AI models. Scale from single nodes to thousands of GPUs with seamless orchestration and management.'
              },
              {
                icon: <ShoppingCart className="w-16 h-16 text-cyan-400" />,
                title: 'AI Marketplace',
                desc: 'Browse and deploy pre-configured training environments with popular frameworks and tools already set up. Start training immediately without complex configuration or setup time.'
              }
            ].map((item, i) => (
              <Card key={i} className="bg-[#121212] border-white/10 hover:border-purple-500/50 transition-all">
                <CardContent className="p-12">
                  <div className="mb-8">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed text-lg">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* More Solutions */}
      <section className="py-32 bg-[#000000]">
        <div className="container-custom">
          <h2 className="text-5xl font-bold text-white mb-8">More solutions</h2>
          <p className="text-xl text-white/70 mb-16 max-w-3xl">
            Explore our complete suite of AI infrastructure solutions designed to accelerate every phase of your machine learning journey, from development to production deployment.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'FINE-TUNING',
                metrics: ['40% Efficiency', '30% Faster'],
                gradient: 'from-orange-900/50 via-amber-900/40 to-yellow-900/50',
                link: '/solutions/fine-tuning'
              },
              {
                title: 'INFERENCE',
                metrics: ['7.2x Performance', '40% Efficiency'],
                gradient: 'from-blue-900/50 via-cyan-900/40 to-sky-900/50',
                link: '/solutions/inference'
              },
              {
                title: 'AI DEVELOPMENT',
                metrics: ['80% Lower Cost', '30% Faster'],
                gradient: 'from-emerald-900/50 via-teal-900/40 to-green-900/50',
                link: '/solutions/ai-development'
              }
            ].map((item, i) => (
              <Link key={i} to={item.link}>
                <div className={`relative h-96 bg-gradient-to-br ${item.gradient} rounded-2xl overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-10">
                    <h3 className="text-3xl font-light text-white mb-6 tracking-wider">{item.title}</h3>
                    <div className="space-y-2">
                      {item.metrics.map((metric, j) => (
                        <div key={j} className="text-white/90 text-lg font-light">{metric}</div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-white/10 rounded-2xl group-hover:border-purple-500/60 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="container-custom">
          <h2 className="text-5xl font-bold text-white mb-16">FAQs</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "What makes BluBrg's GPU Cloud different from others?",
                answer: "BluBrg offers purpose-built AI infrastructure with the latest NVIDIA and AMD GPUs, ultra-low latency networking, and pre-optimized software stacks. Our platform is designed specifically for AI workloads, delivering up to 7.2x faster training and 80% cost savings compared to general-purpose cloud platforms."
              },
              {
                question: "What types of GPUs does BluBrg offer?",
                answer: "We provide access to the latest high-performance GPUs including NVIDIA GB200, H100, H200, A100, and AMD MI300X, MI250X. All GPU configurations include high-bandwidth networking and optimized drivers for maximum performance."
              },
              {
                question: "How does BluBrg support sustainability?",
                answer: "All BluBrg data centers are powered by 100% renewable energy sources. We optimize infrastructure for maximum energy efficiency and strategically locate facilities in regions with abundant clean energy, ensuring your AI workloads have minimal environmental impact."
              },
              {
                question: "Can I use my own training frameworks and tools?",
                answer: "Yes, BluBrg supports all popular training frameworks including PyTorch, TensorFlow, JAX, and more. You can bring your own containers, use our pre-configured marketplace images, or customize environments to match your specific requirements."
              },
              {
                question: "How quickly can I get started with training?",
                answer: "You can start training within minutes using our marketplace images with pre-installed frameworks. For custom setups, our API and CLI tools enable rapid provisioning and deployment. Our team also provides onboarding support to help you optimize your workflow."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-8 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-xl font-bold text-white pr-8">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-6 h-6 text-white flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-white flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-8">
                    <p className="text-white/70 leading-relaxed text-lg">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 bg-gradient-to-r from-[#0066FF] to-[#0052CC]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-light text-white mb-12 max-w-4xl mx-auto leading-tight">
            Access thousands of GPUs tailored to your requirements
          </h2>
          <div className="flex gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white hover:bg-white/90 text-[#0066FF] px-12 py-7 text-lg font-medium">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-12 py-7 text-lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;
