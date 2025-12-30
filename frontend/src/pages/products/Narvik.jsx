import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Check, Thermometer, Zap, Building2, Leaf } from 'lucide-react';

const Narvik = () => {
  useDocumentTitle('Narvik AI Data Centre | BluBridge');

  return (
    <div className="min-h-screen bg-[#f3f6e8]">      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7" 
            alt="Arctic landscape"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F3D] via-[#0A1F3D]/80 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-[#328CC1]/20 rounded-full text-[#328CC1] text-sm font-semibold mb-6">FLAGSHIP LOCATION</div>
            <h1 className="text-6xl font-bold text-[#0B1F3B] mb-6 leading-tight">
              Narvik: Arctic AI Infrastructure Hub
            </h1>
            <p className="text-xl text-[#0B1F3B] mb-8">
              A next-generation hyperscale campus above the Arctic Circle. Powered entirely by renewable hydroelectric energy with natural cooling advantages and unlimited expansion capacity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button className="bg-white text-[#0A1F3D] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                  Reserve Capacity
                </Button>
              </Link>
              <Link to="/products/sovereign-cloud">
                <Button variant="outline" className="border-white text-white hover:bg-[#f3f1e9] px-8 py-6 text-lg">
                  Explore Sovereign Options →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Advantages */}
      <section className="py-24 bg-[#e9ecdc]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-[#0B1F3B] mb-4 text-center">Why Narvik</h2>
          <p className="text-[#2F3A4A] text-center mb-12 max-w-2xl mx-auto">
            Strategic location combining abundant clean energy, extreme cooling efficiency, and enterprise connectivity.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf className="w-10 h-10" />,
                stat: '100%',
                label: 'Renewable Energy',
                description: 'Powered by Norwegian hydroelectric generation with zero carbon emissions'
              },
              {
                icon: <Thermometer className="w-10 h-10" />,
                stat: '5°C',
                label: 'Average Temperature',
                description: 'Arctic climate enables natural cooling and superior PUE ratings'
              },
              {
                icon: <Zap className="w-10 h-10" />,
                stat: '500+ MW',
                label: 'Power Capacity',
                description: 'Abundant grid capacity with room for unlimited expansion'
              },
              {
                icon: <Building2 className="w-10 h-10" />,
                stat: '200,000+',
                label: 'GPU Capacity',
                description: 'Designed to host the world\'s largest AI training clusters'
              }
            ].map((item, i) => (
              <Card key={i} className="bg-white/5 border-[#D6DEC3]">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center text-[#328CC1] mb-4">{item.icon}</div>
                  <div className="text-4xl font-bold text-[#0B1F3B] mb-2">{item.stat}</div>
                  <div className="text-[#328CC1] font-semibold mb-3">{item.label}</div>
                  <p className="text-[#6B7280] text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Overview */}
      <section className="py-24 bg-[#f3f6e8]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#0B1F3B] mb-6">World-Class Infrastructure</h2>
              <p className="text-[#2F3A4A] text-lg mb-8">
                Narvik's campus features purpose-built facilities optimized for high-density GPU deployments. Every system is engineered for maximum efficiency and reliability.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: 'Advanced Cooling Systems',
                    description: 'Direct liquid cooling with heat recovery capabilities. Arctic ambient air provides free cooling year-round, achieving industry-leading PUE below 1.15.'
                  },
                  {
                    title: 'High-Speed Connectivity',
                    description: 'Multiple redundant fiber routes to European metros. Low-latency connections to Oslo, Stockholm, and Frankfurt with 400G+ backbone capacity.'
                  },
                  {
                    title: 'Secure & Compliant',
                    description: 'Physical security with biometric access controls, 24/7 monitoring, and full compliance with EU data residency requirements for sovereign deployments.'
                  }
                ].map((feature, i) => (
                  <div key={i}>
                    <h3 className="text-xl font-semibold text-[#0B1F3B] mb-2">{feature.title}</h3>
                    <p className="text-[#2F3A4A]">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border-[#D6DEC3]">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#0B1F3B] mb-6">Technical Specifications</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Total Power Capacity', value: '500+ MW' },
                      { label: 'GPU Count (Phase 1)', value: '100,000 units' },
                      { label: 'Cooling Method', value: 'Direct liquid + ambient' },
                      { label: 'PUE Target', value: '< 1.15' },
                      { label: 'Network Bandwidth', value: '400 Gbps+' },
                      { label: 'Redundancy', value: 'N+1 power, 2N cooling' },
                      { label: 'Security', value: 'Tier III+ certified' },
                      { label: 'Expansion Timeline', value: 'Modular, phased' }
                    ].map((spec, i) => (
                      <div key={i} className="flex justify-between items-center pb-3 border-b border-[#D6DEC3] last:border-0">
                        <span className="text-[#2F3A4A] text-sm">{spec.label}</span>
                        <span className="text-[#0B1F3B] font-semibold text-sm">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-24 bg-[#f3f6e8]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-[#0B1F3B] mb-6 text-center">Sustainable by Design</h2>
            <p className="text-[#2F3A4A] text-center mb-12">
              Narvik demonstrates that hyperscale AI infrastructure can be both powerful and environmentally responsible.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Zero Carbon Power',
                  description: 'All electricity sourced from Norwegian hydroelectric dams with guaranteed renewable certificates.',
                  icon: '💧'
                },
                {
                  title: 'Waste Heat Recovery',
                  description: 'Captured thermal energy supplies district heating to local communities and industrial facilities.',
                  icon: '♨️'
                },
                {
                  title: 'Circular Design',
                  description: 'Modular construction with recyclable materials and equipment designed for long service life.',
                  icon: '♻️'
                }
              ].map((item, i) => (
                <Card key={i} className="bg-white/5 border-[#D6DEC3]">
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-[#0B1F3B] mb-3">{item.title}</h3>
                    <p className="text-[#2F3A4A] text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Options */}
      <section className="py-24 bg-[#f3f6e8]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-[#0B1F3B] mb-12 text-center">Flexible Deployment Models</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Colocation',
                description: 'Deploy your own hardware in our managed facility. Full access to power, cooling, and network infrastructure.',
                features: ['Bring your own equipment', 'Dedicated cage or suite', 'Custom power allocations', 'Hands-on access 24/7']
              },
              {
                title: 'Managed Capacity',
                description: 'Reserve GPU clusters managed by BluBridge. We handle operations, monitoring, and maintenance.',
                features: ['Pre-configured clusters', 'Kubernetes or SLURM', 'Automatic scaling', 'Included support']
              }
            ].map((model, i) => (
              <Card key={i} className="bg-white/5 border-[#D6DEC3] hover:border-[#0066FF]/50 transition-all">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#0B1F3B] mb-3">{model.title}</h3>
                  <p className="text-[#2F3A4A] mb-6">{model.description}</p>
                  <ul className="space-y-3">
                    {model.features.map((feature, j) => (
                      <li key={j} className="flex items-center space-x-3 text-[#2F3A4A]">
                        <Check className="w-5 h-5 text-[#328CC1]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0B1F3B] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5" 
            alt="Northern lights"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-5xl font-bold text-[#0B1F3B] mb-6">
            Power your AI from the Arctic
          </h2>
          <p className="text-xl text-[#0B1F3B] mb-8 max-w-2xl mx-auto">
            Join leading enterprises and research institutions building the future of AI at Narvik.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-[#328CC1] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                Schedule Site Visit
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="outline" className="border-white text-white hover:bg-[#f3f1e9] px-8 py-6 text-lg">
                Download Facility Overview
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Narvik;