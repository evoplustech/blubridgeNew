import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Solutions = () => {
  const useCases = [
    {
      title: 'Model Training',
      description: 'Train large language models and deep learning networks efficiently with our optimized GPU clusters.',
      stats: ['80% Lower Cost', '30% Faster Training', '99.9% Uptime'],
      image: 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4',
      link: '/solutions/training'
    },
    {
      title: 'AI & ML Inference',
      description: 'Deploy production-ready inference endpoints with auto-scaling and low latency.',
      stats: ['7.2X Performance', '+40% Efficiency', 'Sub-100ms Latency'],
      image: 'https://images.unsplash.com/photo-1624701928517-44c8ac49d93c',
      link: '/solutions/inference'
    },
    {
      title: 'AI Development',
      description: 'Complete development environment for building, testing, and deploying AI applications.',
      stats: ['80% Lower Cost', '30% Faster', 'Integrated Tools'],
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f',
      link: '/solutions/ai-development'
    },
    {
      title: 'Model Fine-Tuning',
      description: 'Fine-tune pre-trained models on your custom datasets with automated pipelines.',
      stats: ['+40% Efficiency', '30% Faster', 'Custom Datasets'],
      image: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf',
      link: '/solutions/fine-tuning'
    }
  ];

  const industries = [
    { name: 'Telco', icon: '📡', desc: 'Network optimization and predictive maintenance' },
    { name: 'Software & Technology', icon: '💻', desc: 'AI-powered development tools' },
    { name: 'Finance & Insurance', icon: '🏦', desc: 'Risk analysis and fraud detection' },
    { name: 'Manufacturing', icon: '🏭', desc: 'Quality control and automation' },
    { name: 'Education', icon: '🎓', desc: 'Personalized learning platforms' },
    { name: 'Government', icon: '🏛️', desc: 'Secure and sovereign AI solutions' },
    { name: 'Legal', icon: '⚖️', desc: 'Document analysis and research' },
    { name: 'Healthcare', icon: '🏥', desc: 'Medical imaging and diagnostics' }
  ];

  useDocumentTitle('Solutions | BluBrg');

  return (
    <div className="min-h-screen bg-[#F3F6E8]">      {/* Hero */}
      <section className="py-24 bg-[#EEF2DC] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0066FF] rounded-full filter blur-[120px]" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold text-white mb-6">
              AI solutions for every use case
            </h1>
            <p className="text-xl text-[#243447] mb-8">
              Comprehensive AI infrastructure solutions designed to accelerate your innovation across industries.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-[#F3F6E8]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">By Use Case</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, idx) => (
              <Link key={idx} to={useCase.link}>
                <Card className="bg-white/5 border-[#D6DEC3] hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img src={useCase.image} alt={useCase.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{useCase.title}</h3>
                    <p className="text-[#243447] mb-6">{useCase.description}</p>
                    <div className="flex flex-wrap gap-4">
                      {useCase.stats.map((stat, i) => (
                        <span key={i} className="text-[#328CC1] font-semibold text-sm">
                          {stat}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 bg-[#F3F6E8]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">By Industry</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, idx) => (
              <Card key={idx} className="bg-white/5 border-[#D6DEC3] hover:bg-[#EEF2DC] transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{industry.name}</h3>
                  <p className="text-[#5B6B7A] text-sm">{industry.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Let's build your AI solution
          </h2>
          <Link to="/contact">
            <Button className="bg-white text-[#328CC1] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
              Contact Sales
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Solutions;