import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, MapPin, Briefcase, Users, Rocket, Globe, Heart } from 'lucide-react';

const Careers = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F3D] via-[#0D2847] to-[#0A1F3D]" />
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#0066FF]/20 rounded-full filter blur-[200px] animate-pulse" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">Build the future of AI infrastructure</h1>
            <p className="text-xl text-white/70 mb-10 leading-relaxed">
              Join our team of innovators shaping how organizations develop, deploy, and scale artificial intelligence. We're building infrastructure that powers the next generation of intelligent applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-6 text-lg">
                View Open Positions <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Why join BluBrg?</h2>
            <p className="text-lg text-white/60">
              We're creating technology that transforms industries. Be part of a team where your work directly impacts how companies leverage artificial intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#0066FF]/10 rounded-xl flex items-center justify-center mb-6">
                  <Rocket className="w-8 h-8 text-[#0066FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Innovation First</h3>
                <p className="text-white/60 leading-relaxed">
                  Work on cutting-edge problems in distributed systems, machine learning infrastructure, and cloud computing.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#0066FF]/10 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-[#0066FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Collaborative Culture</h3>
                <p className="text-white/60 leading-relaxed">
                  Join a diverse team of engineers, researchers, and product leaders who value knowledge sharing and mutual growth.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#0066FF]/10 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-[#0066FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Global Impact</h3>
                <p className="text-white/60 leading-relaxed">
                  Your contributions enable organizations worldwide to accelerate their AI initiatives and solve complex challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#0066FF]/10 rounded-xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-[#0066FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Comprehensive Benefits</h3>
                <p className="text-white/60 leading-relaxed">
                  Competitive compensation, equity, health coverage, flexible work arrangements, and continuous learning opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12">Open Positions</h2>
            
            <div className="space-y-4">
              {[
                { title: 'Senior Backend Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time' },
                { title: 'ML Infrastructure Engineer', department: 'Engineering', location: 'San Francisco, CA', type: 'Full-time' },
                { title: 'Product Manager - AI Platform', department: 'Product', location: 'New York, NY', type: 'Full-time' },
                { title: 'DevOps Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time' },
                { title: 'Technical Writer', department: 'Documentation', location: 'Remote', type: 'Full-time' },
                { title: 'Customer Success Engineer', department: 'Customer Success', location: 'London, UK', type: 'Full-time' }
              ].map((job, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:border-[#0066FF]/50 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#0066FF] transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-white/60">
                        <span className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="bg-[#0066FF]/10 text-[#0066FF] px-3 py-1 rounded-full text-sm">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-white/60 mb-4">Don't see the right role? We're always looking for talented people.</p>
              <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10">
                Send General Application
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Hiring Process</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Apply', desc: 'Submit your application and resume through our careers portal.' },
                { step: '02', title: 'Screen', desc: 'Initial conversation with our talent team to discuss your background and interests.' },
                { step: '03', title: 'Interview', desc: 'Technical interviews and team discussions to assess fit and expertise.' },
                { step: '04', title: 'Offer', desc: 'Receive your offer and join our team to start making an impact.' }
              ].map((phase, i) => (
                <div key={i} className="relative">
                  <div className="text-6xl font-bold text-white/10 mb-4">{phase.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-white/60 leading-relaxed">{phase.desc}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-white/10">
                      <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-[#0066FF]/10 to-transparent border border-[#0066FF]/30 rounded-3xl p-16 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to shape the future?</h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Join our team and help build the infrastructure that powers tomorrow's AI applications.
            </p>
            <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-10 py-7 text-lg">
              Explore Opportunities
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;