import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const partners = [
    'NVIDIA', 'OpenAI', 'Microsoft', 'AMD', 'Lenovo', 
    'Dell', 'HPE', 'Nokia', 'Intel', 'IBM',
    'Google', 'AWS', 'Oracle', 'Cisco', 'VMware'
  ];

  const useCases = [
    {
      title: 'Training',
      stats: ['80% Lower Cost', '30% Faster'],
      image: 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4',
      link: '/solutions/training'
    },
    {
      title: 'Fine-tuning',
      stats: ['+40% Efficiency', '30% Faster'],
      image: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf',
      link: '/solutions/fine-tuning'
    },
    {
      title: 'Inference',
      stats: ['7.2X Performance', '+40% Efficiency'],
      image: 'https://images.unsplash.com/photo-1624701928517-44c8ac49d93c',
      link: '/solutions/inference'
    },
    {
      title: 'AI Development',
      stats: ['80% Lower Cost', '30% Faster'],
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f',
      link: '/solutions/ai-development'
    }
  ];

  const infrastructureFeatures = [
    {
      title: 'Data Centres',
      description: 'Purpose built for AI and the intensive energy demands of GPU-based compute.',
      features: ['100% Renewable Energy', 'Located in optimal climates', 'Scalable infrastructure'],
      link: '/products/ai-factories'
    },
    {
      title: 'GPU Nodes',
      description: 'High-performance NVIDIA GPU options for AI and HPC workloads.',
      features: ['On demand access', 'NVIDIA Grace Blackwell', 'Optimised for AI'],
      link: '/products/gpu-nodes'
    },
    {
      title: 'Networking',
      description: 'GPU fabric optimised for low latency and high bandwidth delivery.',
      features: ['RoCE enabled', 'Non-blocking design', 'Built for AI at scale'],
      link: '/products/gpu-infrastructure'
    },
    {
      title: 'Storage',
      description: 'Fast storage ensures GPUs are kept busy and fully utilised.',
      features: ['RDMA enabled', 'Parallel filesystems', 'AI storage platform'],
      link: '/products/gpu-nodes'
    },
    {
      title: 'Kubernetes',
      description: 'Robust infrastructure for deploying and scaling containerised workloads.',
      features: ['Bare metal performance', 'Auto-scale to 1000s GPUs', 'Fully managed'],
      link: '/products/training'
    },
    {
      title: 'SLURM',
      description: 'Advanced job scheduling and workload management for optimal performance.',
      features: ['Advanced scheduling', 'Optimal management', 'Effective utilisation'],
      link: '/solutions/inference'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F3D] via-[#0D2847] to-[#0A1F3D]" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0066FF] rounded-full filter blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#0052CC] rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Centered content */}
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              The hyperscaler engineered for AI
            </h1>
            <p className="text-xl text-white/80 mb-8">
              A full-stack, scalable, and sustainable AI cloud platform.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-white text-[#0A1F3D] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                  Reserve GPUs
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Start Building →
                </Button>
              </Link>
            </div>
          </div>

          {/* Partner logos marquee */}
          <div className="mt-24 overflow-hidden">
            <div className="flex space-x-12 animate-scroll">
              {[...partners, ...partners].map((partner, idx) => (
                <div key={idx} className="flex-shrink-0 text-white/40 font-bold text-2xl">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-[#0A1F3D] to-[#0D2847]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              A fully integrated suite of AI services and compute
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Reduce costs, grow revenue, and run your AI workloads more efficiently on a fully integrated platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Turnkey AI development',
                description: 'The BluBrg Marketplace offers access to various AI/ML tools and resources for efficient model development.',
                link: '/products/marketplace'
              },
              {
                title: 'Serverless model endpoints',
                description: 'Seamless, scalable AI inference without infrastructure management. Auto-scales to meet demand.',
                link: '/products/serverless'
              },
              {
                title: 'Dedicated training clusters',
                description: 'Optimised GPU clusters designed to reduce training times and boost productivity.',
                link: '/products/training'
              },
              {
                title: 'High-performance inference',
                description: 'Fast, affordable, auto-scaling infrastructure optimised for batch and streaming workloads.',
                link: '/products/inference'
              },
              {
                title: 'Scalable GPU Compute',
                description: 'High-performance computing power tailored for AI and HPC tasks with advanced cooling.',
                link: '/products/gpu-nodes'
              },
              {
                title: 'AI Factories',
                description: 'Purpose-built data centres powered by renewable energy in optimal locations.',
                link: '/products/ai-factories'
              }
            ].map((service, idx) => (
              <Card key={idx} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-white/70 mb-4">{service.description}</p>
                  <Link to={service.link} className="text-[#0066FF] hover:text-[#0052CC] flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              BluBrg's Infrastructure
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              We manage every aspect of AI infrastructure—from energy-efficient data centres to cutting-edge compute clusters.
            </p>
            <Link to="/products/ai-factories">
              <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-6">
                Our Infrastructure →
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {infrastructureFeatures.map((feature, idx) => (
              <Card key={idx} className="bg-white/5 border-white/10 hover:border-[#0066FF]/50 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 mb-6">{feature.description}</p>
                  <div className="space-y-2 mb-6">
                    {feature.features.map((item, i) => (
                      <div key={i} className="flex items-center space-x-2 text-white/80">
                        <Check className="w-5 h-5 text-[#0066FF]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={feature.link} className="text-[#0066FF] hover:text-[#0052CC] flex items-center space-x-2">
                    <span>See More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-gradient-to-b from-[#0D2847] to-[#0A1F3D]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Use cases
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Comprehensive AI solutions designed to accelerate your AI initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, idx) => (
              <Link key={idx} to={useCase.link}>
                <Card className="bg-white/5 border-white/10 overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="h-48 overflow-hidden">
                    <img src={useCase.image} alt={useCase.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4 uppercase">{useCase.title}</h3>
                    {useCase.stats.map((stat, i) => (
                      <div key={i} className="text-[#0066FF] font-semibold mb-1">{stat}</div>
                    ))}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <p className="text-white/80 italic mb-6">
                  "AI is reshaping the global economy. With BluBrg, we're backing infrastructure that's sovereign, scalable and purpose-built. The scale and quality are testament to BluBrg's vision and momentum."
                </p>
                <p className="text-white font-semibold">— Technology Leader, Fortune 500</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <p className="text-white/80 italic mb-6">
                  "BluBrg has moved with focus and velocity. The team is building massive-scale, sovereign infrastructure that enterprises can actually consume – reliable, efficient, and close to their data."
                </p>
                <p className="text-white font-semibold">— AI Research Director</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#0066FF] to-[#0052CC] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full filter blur-[100px]" />
        </div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6">
            Access thousands of GPUs tailored to your requirements
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/contact">
              <Button className="bg-white text-[#0066FF] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                Reserve GPUs
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;