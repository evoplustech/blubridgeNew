import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const About = () => {
  const values = [
    {
      title: 'Performance First',
      description: 'Engineering every layer of our infrastructure for maximum GPU utilization and minimum latency in AI workloads.'
    },
    {
      title: 'Sustainable Computing',
      description: 'Operating energy-efficient data centers with renewable power sources and advanced liquid cooling technology.'
    },
    {
      title: 'Open Ecosystem',
      description: 'Supporting open standards, open-source frameworks, and seamless integration with existing AI toolchains.'
    },
    {
      title: 'Customer Success',
      description: 'Empowering research teams and enterprises with responsive support and expert guidance for AI deployment.'
    }
  ];

  const team = [
    { name: 'Dr. Alexandra Kim', role: 'Chief Executive Officer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2' },
    { name: 'Marcus Thompson', role: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
    { name: 'Priya Sharma', role: 'VP of Engineering', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956' },
    { name: 'James O\'Connor', role: 'Head of Infrastructure', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef' }
  ];

  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero */}
      <section className="py-32 bg-gradient-to-br from-[#0A1F3D] via-[#0D2847] to-[#0A1F3D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0066FF] rounded-full filter blur-[120px]" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Powering the next generation of artificial intelligence
            </h1>
            <p className="text-xl text-white/80 max-w-3xl">
              BluBrg builds hyperscale AI infrastructure that enables researchers and enterprises to train, fine-tune, and deploy breakthrough models with unprecedented speed and efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-white/70 text-lg">
                <p>
                  Founded in 2023 by AI researchers and infrastructure engineers, BluBrg emerged from a simple observation: the compute demands of modern AI far exceed what traditional cloud providers can efficiently deliver.
                </p>
                <p>
                  We set out to build purpose-designed infrastructure from the ground up—optimizing every layer from data center cooling to GPU interconnects specifically for AI training and inference workloads.
                </p>
                <p>
                  Today, BluBrg powers breakthrough AI research at leading institutions and enables enterprises to deploy production AI systems at scale. Our platform processes billions of AI requests daily across text, vision, audio, and multimodal applications.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '50,000+', label: 'GPUs Deployed' },
                { value: '15', label: 'Data Centers' },
                { value: '100%', label: 'Renewable Energy' },
                { value: '200+', label: 'Enterprise Customers' }
              ].map((stat, i) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-[#0066FF] mb-2">{stat.value}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <Card key={idx} className="bg-white/5 border-white/10">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-white/70">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <Card key={idx} className="bg-white/5 border-white/10 overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-white/60">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Technology Leadership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Advanced Cooling',
                description: 'Direct-to-chip liquid cooling enables 3X higher GPU density while reducing energy consumption by 40% compared to air-cooled systems.'
              },
              {
                title: 'High-Speed Fabric',
                description: 'Custom-designed GPU interconnects with RDMA support deliver 400 Gbps bandwidth for efficient distributed training at massive scale.'
              },
              {
                title: 'Smart Orchestration',
                description: 'AI-driven workload scheduling maximizes GPU utilization, automatically optimizing for training speed, cost, or energy efficiency.'
              }
            ].map((tech, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-3">{tech.title}</h3>
                  <p className="text-white/70">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0066FF] to-[#0052CC]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Join us in shaping the future
          </h2>
          <div className="flex justify-center gap-4">
            <Link to="/company/careers">
              <Button className="bg-white text-[#0066FF] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                View Careers
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;