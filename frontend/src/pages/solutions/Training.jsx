import React, { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowRight, ChevronDown, ChevronUp, Zap, ShoppingCart } from 'lucide-react';

const Training = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useDocumentTitle('AI Compute for Training LLMs | BluBridge');

  return (
    <div className="min-h-screen bg-[#f3f6e8]">
      {/* Hero Section - Model Training Background with Wave Animation */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        {/* Animated Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%]"
            style={{
              backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/grf8ceph_Model%20Training.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              animation: 'heroWaveTraining 12s ease-in-out infinite'
            }}
          />
        </div>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f051d] via-[#0f051d]/50 to-transparent pointer-events-none" />

        {/* Hero Content */}
        <div className="container-custom relative z-10 flex-1 flex items-center py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              MODEL TRAINING
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              BluBridge&apos;s GPU Cloud offers a highly scalable, performance-optimised architecture that significantly reduces training times and boosts productivity, enabling you to achieve your AI goals easier, faster, and more cost-effectively than alternative Cloud platforms.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white hover:bg-white/90 text-[#2a0e47] px-10 py-6 text-base font-medium rounded-md">
                  Get Started
                </Button>
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 text-white hover:text-blue-300 transition-colors font-medium">
                Contact <ArrowRight className="w-4 h-4" />
</Link>
            </div>
          </div>
        </div>

        {/* CSS Animation Keyframes */}
        <style>{`
          @keyframes heroWaveTraining {
            0%, 100% {
              transform: translate(0, 0) scale(1.05);
            }
            25% {
              transform: translate(-1.5%, 1%) scale(1.05);
            }
            50% {
              transform: translate(-0.5%, -1%) scale(1.05);
            }
            75% {
              transform: translate(1%, 0.5%) scale(1.05);
            }
          }
        `}</style>
      </section>

      {/* Value Proposition Strip */}
      <section className="py-20 bg-[#f3f6e8]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Highly Scalable Architecture',
                desc: 'Easily scale compute resources to match the size and complexity of AI projects, supporting everything from experimentation to large-scale production training.'
              },
              {
                title: 'Reduced Training Times',
                desc: 'Industry-leading GPUs optimised for training workloads accelerate development cycles and enable faster iteration.'
              },
              {
                title: 'Increased Productivity',
                desc: 'Automation and intelligent scheduling reduce operational overhead, allowing teams to focus on innovation rather than infrastructure.'
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <h3 className="text-2xl font-bold text-[#0B1F3B] mb-4">{item.title}</h3>
                <p className="text-[#2F3A4A] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accelerated Model Training */}
      <section className="py-32 bg-[#f3f6e8]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-bold text-[#0B1F3B] mb-8">Accelerated Model Training</h2>
              <p className="text-lg text-[#2F3A4A] leading-relaxed mb-6">
                Training advanced AI models requires flexible, reliable, and cost-efficient
                infrastructure. Blubrg simplifies this by delivering purpose-built systems
                designed specifically for AI workloads.
              </p>
              <p className="text-lg text-[#2F3A4A] leading-relaxed mb-6">
                Integrated Slurm and Kubernetes orchestration enables efficient job scheduling
                and workload management across distributed GPU clusters with minimal setup.
              </p>
              <p className="text-lg text-[#2F3A4A] leading-relaxed">
                High-performance bare-metal GPU nodes ensure consistent, predictable performance
                for large-scale training and fine-tuning workloads.
              </p>
            </div>
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-2xl p-12 text-center">
                <div className="text-purple-400 text-sm font-semibold mb-4">AI-IN-A-BOX</div>
                <div className="text-4xl font-bold text-[#0B1F3B] mb-2">Pre-configured</div>
                <div className="text-[#6B7280]">Training Environments</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border border-indigo-500/30 rounded-2xl p-12 text-center">
                <div className="text-indigo-400 text-sm font-semibold mb-4">TRAINING COMPUTE</div>
                <div className="text-4xl font-bold text-[#0B1F3B] mb-2">Scalable</div>
                <div className="text-[#6B7280]">GPU Clusters</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Stack */}
      <section className="py-32 bg-[#f3f6e8]">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-bold text-[#0B1F3B] mb-8">Training Stack</h2>
            <p className="text-lg text-[#2F3A4A] mb-16 max-w-3xl">
              Our comprehensive training stack provides everything you need from hardware to
              applications, with full flexibility to customise at every layer.
            </p>

            <div className="space-y-8">
              <div className="bg-[#121212] border border-[#D6DEC3] rounded-xl p-8">
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

              <div className="bg-[#121212] border border-[#D6DEC3] rounded-xl p-8">
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

              <div className="bg-[#121212] border border-[#D6DEC3] rounded-xl p-8">
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

              <div className="bg-[#121212] border border-[#D6DEC3] rounded-xl p-8">
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

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#121212] border border-[#D6DEC3] rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">USER EXPERIENCE</h3>
                  <div className="space-y-3">
                    {['Web Console', 'API', 'CLI'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                        <span className="text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#121212] border border-[#D6DEC3] rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">DATA CENTRE</h3>
                  <div className="space-y-3">
                    {['Renewable Energy', 'Low-latency Fibre'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        <span className="text-white/90">{item}</span>
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
      <section className="py-32 bg-[#f3f6e8]">
        <div className="container-custom">
          <h2 className="text-5xl font-bold text-[#0B1F3B] mb-20 text-center">Performance</h2>
          <div className="grid md:grid-cols-4 gap-3 max-w-6xl mx-auto">
            {[
              { metric: '30%', label: 'FASTER INSIGHTS', desc: 'Shorten development cycles and accelerate feedback loops with an AI-optimised training platform.' },
              { metric: '80%', label: 'LOWER COST', desc: 'Reduce training costs significantly while maintaining high performance.' },
              { metric: '40%', label: 'MORE EFFICIENT', desc: 'Increase utilisation and efficiency across GPU training workloads.' },
              { metric: 'UP TO 7.2X', label: 'FASTER INFERENCE', desc: 'Optimised infrastructure enables faster deployment and inference throughput.' }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#D6DEC3] rounded-2xl p-10">
                <div className="text-6xl font-bold text-[#0B1F3B] mb-2">{item.metric}</div>
                <div className="text-[#0B1F3B] text-lg font-semibold mb-4">{item.label}</div>
                <p className="text-[#6B7280] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-32 bg-[#f3f6e8]">
        <div className="container-custom">
          <h2 className="text-5xl font-bold text-[#0B1F3B] mb-20">Key Services</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: <Zap className="w-16 h-16 text-purple-400" />,
                title: 'AI Compute – Training',
                desc: 'A scalable, performance-optimised compute layer purpose-built for large-scale AI model training.'
              },
              {
                icon: <ShoppingCart className="w-16 h-16 text-cyan-400" />,
                title: 'AI Marketplace',
                desc: 'A curated ecosystem of tools and frameworks to accelerate AI development and deployment.'
              }
            ].map((item, i) => (
              <Card key={i} className="bg-[#121212] border-[#D6DEC3] hover:border-purple-500/50 transition-all">
                <CardContent className="p-12">
                  <div className="mb-8">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/80 leading-relaxed text-lg">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f3f6e8]">
        <div className="container-custom">
         <div className="mb-12">
            <h2 className="text-3xl font-light mb-4 text-[#0B1F3B]">More Solutions</h2>
            <p className="text-[#2F3A4A] max-w-2xl">
              BluBridge accelerates the journey from development to deployment, delivering faster time to productivity for your AI initiatives..
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5">
            {/* AI & ML Inference Card - Blue Angular */}
            <Link to="/solutions/inference">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/2qvmu3rl_INFERENCE.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-md">INFERENCE</span>
                </div>
              </div>
            </Link>

            {/* AI Development Card - Orange/Bronze Wave */}
            <Link to="/solutions/ai-development">
              <div className="relative border border-[#D6DEC3] h-52 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/u12c3np1_AI%20Development.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-md">AI DEVELOPMENT</span>
                </div>
              </div>
            </Link>

            {/* Model Fine-Tuning Card - Green Wave */}
            <Link to="/solutions/fine-tuning">
              <div className="relative h-52 border border-[#D6DEC3] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl" style={{ background: '#000' }}>
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.07]" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/zsuql6xm_Finetuning.avif')` }} />
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white font-semibold text-2xl drop-shadow-md">FINE-TUNING</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* Faq */}
      <section className="py-24 bg-[#f3f6e8]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-12">FAQs</h2>
          <div className="max-w-4xl space-y-3">
            {[
              {
                question: "What makes Nscale’s GPU Cloud different from others?",
                answer: "BluBridge controls the entire stack from data centre infrastructure to orchestration software, enabling deep optimisation across every layer. This integrated approach delivers exceptional performance, efficiency, and support for scaling AI workloads."
              },
              {
                question: "What types of GPUs does BluBridge offer?",
                answer: "A range of NVIDIA GPU models are available to support different AI development tasks, including GPUs designed for training, inferencing, and other compute-intensive workloads."
              },
              {
                question: "How does BluBridge support sustainability?",
                answer: "Environmental responsibility is a priority, with the company operating on renewable energy sources and adopting sustainable computing practices to help reduce carbon impact."
              },
              {
                question: "How does BluBridge accelerate AI development?",
                answer: "By simplifying orchestration and workload management through technologies like Kubernetes and SLURM, the platform makes managing GPU resources easier and more responsive to changing demands."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#D6DEC3]">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left hover:text-amber-400 transition-colors"
                >
                  <span className="text-base font-medium text-[#0B1F3B] pr-8">{faq.question}</span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-amber-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                </button>
                {openFaq === i && (
                  <div className="pb-6">
                    <p className="text-[#6B7280] text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Bottom CTA */}
      <section className="py-20 bg-[#0B1F3B] from-blue-600 via-blue-700 to-indigo-800">
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
              Contact <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;