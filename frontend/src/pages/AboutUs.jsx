import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Target, Users, Zap, Shield } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F3D] via-[#0D2847] to-[#0A1F3D]" />
        <div className="absolute top-1/4 right-1/3 w-[700px] h-[700px] bg-[#0066FF]/15 rounded-full filter blur-[250px]" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <div className="text-[#0066FF] font-semibold text-sm uppercase tracking-wider mb-6">ABOUT US</div>
            <h1 className="text-6xl sm:text-7xl font-bold text-white mb-8 leading-[1.05]">
              Advancing the infrastructure for intelligent systems
            </h1>
            <p className="text-2xl text-white/80 mb-12 leading-relaxed">
              Artificial intelligence is transforming how we solve problems, create value, and understand our world. BluBrg delivers the foundational infrastructure, platforms, and solutions that enable researchers, businesses, and institutions worldwide to develop, deploy, and scale their most ambitious AI initiatives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-10 py-7 text-lg">
                  Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="grid lg:grid-col gap-16 items-center">
            {/* <div className="relative aspect-video rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 to-[#0D2847]/20 flex items-center justify-center">
                <div className="text-white/40 text-xl">Image Placeholder</div>
              </div>
            </div> */}
            
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Who we are</h2>
              <p className="text-xl text-white/70 leading-relaxed mb-6">
                We're engineers and innovators committed to shaping the future of computational infrastructure—and the way we build reflects our values.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: 'Innovate Without Limits',
                    desc: 'We challenge conventional thinking and create technology that drives real progress.'
                  },
                  {
                    title: 'Deliver with Accountability',
                    desc: 'We maintain exceptional standards and complete what we start with urgency and precision.'
                  },
                  {
                    title: 'Act Fast, Learn Constantly',
                    desc: 'We prioritize velocity while remaining open to new insights—no pride, only advancement.'
                  },
                  {
                    title: 'Earn Confidence Through Transparency',
                    desc: 'We communicate clearly and deliver consistently, building lasting relationships through reliability.'
                  }
                ].map((value, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                    <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-white/60">{value.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link to="/careers">
                  <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white">
                    Join Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Our Leadership</h2>
            <p className="text-xl text-white/70">
              BluBrg is led by experienced technologists, operators, and strategists with proven track records in cloud computing, high-performance systems, and AI platform development. Our team combines technical depth with commercial expertise to deliver infrastructure that scales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Chen', role: 'Chief Executive Officer', initial: 'SC' },
              { name: 'Michael Torres', role: 'Chief Technology Officer', initial: 'MT' },
              { name: 'Aisha Patel', role: 'Chief Operating Officer', initial: 'AP' },
              { name: 'David Kim', role: 'Chief Financial Officer', initial: 'DK' },
              { name: 'Elena Rodriguez', role: 'VP of Engineering', initial: 'ER' },
              { name: 'James Wilson', role: 'VP of Product', initial: 'JW' },
              { name: 'Priya Sharma', role: 'VP of Sales', initial: 'PS' },
              { name: 'Marcus Johnson', role: 'VP of Operations', initial: 'MJ' }
            ].map((leader, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-[#0066FF]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-[#0066FF] font-bold text-xl">{leader.initial}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white text-center mb-2">{leader.name}</h3>
                  <p className="text-white/60 text-sm text-center">{leader.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">What our partners say</h2>
            
            <div className="space-y-8">
              {[
                {
                  quote: 'AI infrastructure is becoming a critical competitive advantage. BluBrg has delivered scalable, reliable compute resources that enable us to iterate faster and deploy models with confidence.',
                  author: 'Tech Industry Executive',
                  company: 'Leading AI Research Organization'
                },
                {
                  quote: 'Working with BluBrg has been transformative for our AI initiatives. Their platform reduced our deployment complexity while improving performance and cost efficiency significantly.',
                  author: 'Chief Data Officer',
                  company: 'Global Financial Services Firm'
                },
                {
                  quote: 'The infrastructure layer is where many AI projects stall. BluBrg solved that bottleneck for us, providing the computational foundation we needed to move from research to production rapidly.',
                  author: 'VP of Engineering',
                  company: 'Enterprise Software Company'
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-2xl p-10">
                  <p className="text-xl text-white/80 italic leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0066FF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-[#0066FF]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.author}</div>
                      <div className="text-white/60 text-sm">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Strategic partnerships</h2>
            <p className="text-xl text-white/70">
              We collaborate with technology leaders, research institutions, and infrastructure providers to deliver comprehensive AI solutions across industries and geographies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { name: 'Technology Partners', icon: <Zap className="w-8 h-8" /> },
              { name: 'Research Institutions', icon: <Target className="w-8 h-8" /> },
              { name: 'Enterprise Clients', icon: <Users className="w-8 h-8" /> },
              { name: 'Infrastructure Providers', icon: <Shield className="w-8 h-8" /> }
            ].map((category, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#0066FF]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0066FF]">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-2xl p-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Interested in partnership opportunities?</h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              We're actively building strategic relationships with organizations that share our commitment to advancing AI infrastructure. Let's explore how we can collaborate.
            </p>
            <Link to="/contact">
              <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white">
                Contact Partnerships Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-[#0066FF]/10 to-transparent border-2 border-[#0066FF]/30 rounded-3xl p-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
              Access GPU infrastructure tailored to your requirements
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/products/training">
                <Button size="lg" className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-10 py-7 text-lg">
                  Reserve GPUs
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
