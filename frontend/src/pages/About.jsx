import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const About = () => {
  const values = [
    {
      title: 'Innovation',
      description: 'Pushing the boundaries of AI infrastructure with cutting-edge technology.'
    },
    {
      title: 'Sustainability',
      description: 'Building environmentally responsible data centres powered by 100% renewable energy.'
    },
    {
      title: 'Sovereignty',
      description: 'Providing secure, compliant infrastructure with data sovereignty guarantees.'
    },
    {
      title: 'Performance',
      description: 'Delivering the highest performance AI compute available in the market.'
    }
  ];

  const team = [
    { name: 'Sarah Chen', role: 'CEO & Co-Founder', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1' },
    { name: 'Michael Rodriguez', role: 'CTO & Co-Founder', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b' },
    { name: 'Emily Watson', role: 'Chief Infrastructure Officer', image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg' },
    { name: 'David Kumar', role: 'VP of Engineering', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg' }
  ];

  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#0A1F3D] via-[#0D2847] to-[#0A1F3D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0066FF] rounded-full filter blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-white mb-6">
              Building the future of AI infrastructure
            </h1>
            <p className="text-xl text-white/80">
              BluBrg is revolutionizing AI computing with sustainable, sovereign, and high-performance infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-white/80 leading-relaxed">
              To democratize access to world-class AI infrastructure while maintaining environmental responsibility and data sovereignty. We believe that the future of AI should be sustainable, secure, and accessible to organizations of all sizes.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container mx-auto px-6">
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
        <div className="container mx-auto px-6">
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

      {/* Stats */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '200,000+', label: 'GPU Capacity' },
              { value: '100%', label: 'Renewable Energy' },
              { value: '15+', label: 'Data Centers' },
              { value: '50+', label: 'Enterprise Clients' }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl font-bold text-[#0066FF] mb-2">{stat.value}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0066FF] to-[#0052CC]">
        <div className="container mx-auto px-6 text-center">
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