import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { ArrowRight, GraduationCap, BookOpen, Users, Brain, Sparkles, TrendingUp } from 'lucide-react';

const Education = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero - Centered with Floating Cards */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F3D] via-[#1a2f4d] to-[#0A1F3D]" />
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-indigo-500/20 rounded-full filter blur-[180px] animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-pink-500/20 rounded-full filter blur-[180px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
        
        <div className="container-custom relative z-10 text-center py-20">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-6 py-3 mb-8">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-400 font-semibold">Education</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.05] max-w-5xl mx-auto">
            AI-powered learning for the next generation
          </h1>
          <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto">
            From personalized learning and intelligent tutoring to research acceleration and administrative automation, BluBrg empowers educational institutions to transform student outcomes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-20">
            <Link to="/products/serverless">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-7 text-lg">
                Explore Solutions <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
                Contact Sales
              </Button>
            </Link>
          </div>

          {/* Floating Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: <Brain className="w-6 h-6" />, title: 'Personalized Learning', value: '3x engagement' },
              { icon: <Sparkles className="w-6 h-6" />, title: 'AI Tutoring', value: '24/7 support' },
              { icon: <TrendingUp className="w-6 h-6" />, title: 'Better Outcomes', value: '40% improvement' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-4 mx-auto">
                  {item.icon}
                </div>
                <div className="text-white font-semibold mb-1">{item.title}</div>
                <div className="text-indigo-400 text-sm font-bold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Challenges */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Transforming education with AI</h2>
            <p className="text-lg text-white/60">Modern education faces unique challenges that AI can solve.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Diverse Learning Styles', desc: 'Every student learns differently. One-size-fits-all approaches leave many behind.' },
              { title: 'Teacher Workload', desc: 'Educators spend 50% of time on admin tasks instead of teaching and mentoring.' },
              { title: 'Research Barriers', desc: 'Advanced research requires compute resources most institutions cannot afford.' },
              { title: 'Accessibility Gaps', desc: 'Quality education remains inaccessible to students in remote or underserved areas.' }
            ].map((item, i) => (
              <Card key={i} className="bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-indigo-500/50 transition-all">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases - Mixed Layout */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16">AI applications in education</h2>

          <div className="space-y-12">
            {/* Use Case 1 - Left */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-5 py-2 mb-6">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  <span className="text-indigo-400 font-semibold text-sm">Adaptive Learning</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Personalized Learning Paths</h3>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  AI analyzes each student's learning patterns, strengths, and weaknesses to create customized curricula. Adaptive systems adjust difficulty in real-time, ensuring optimal challenge levels and preventing students from falling behind or becoming bored.
                </p>
                <div className="space-y-3">
                  {[
                    'Real-time performance tracking and insights',
                    'Automated curriculum adjustment based on progress',
                    'Early intervention for struggling students',
                    'Accelerated paths for advanced learners'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/30 rounded-3xl p-12">
                <div className="space-y-8">
                  <div>
                    <div className="text-5xl font-bold text-white mb-2">3x</div>
                    <div className="text-white/60">Higher student engagement</div>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-white mb-2">40%</div>
                    <div className="text-white/60">Improvement in test scores</div>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-white mb-2">85%</div>
                    <div className="text-white/60">Student satisfaction rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Use Case 2 - Right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/30 rounded-3xl p-12">
                <div className="space-y-6">
                  {[
                    { label: 'Instant answers', value: '24/7 availability' },
                    { label: 'Multi-language support', value: '100+ languages' },
                    { label: 'Concept explanation', value: 'Step-by-step guidance' },
                    { label: 'Practice problems', value: 'Unlimited generation' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <span className="text-white font-semibold">{item.label}</span>
                      <span className="text-pink-400 font-bold text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/30 rounded-full px-5 py-2 mb-6">
                  <Brain className="w-5 h-5 text-pink-400" />
                  <span className="text-pink-400 font-semibold text-sm">AI Tutoring</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Intelligent Tutoring Systems</h3>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  AI tutors provide instant, personalized support to students anytime, anywhere. Natural language processing enables conversational learning, while computer vision can analyze handwritten work and provide feedback just like a human tutor.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-white/60 text-sm mb-3">Student Success Impact:</div>
                  <div className="text-2xl font-bold text-white mb-1">"AI tutoring helped me improve from a C to an A in calculus"</div>
                  <div className="text-white/60 text-sm">- University Student</div>
                </div>
              </div>
            </div>

            {/* Use Case 3 - Full Width */}
            <div className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-3xl p-12">
              <div className="flex items-start gap-8">
                <div className="w-20 h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 flex-shrink-0">
                  <Users className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-6">Research & Academic Computing</h3>
                  <p className="text-white/70 text-lg leading-relaxed mb-8">
                    Enable groundbreaking research with accessible AI infrastructure. From training large language models for NLP research to running complex simulations in physics, chemistry, and biology, BluBrg democratizes access to enterprise-grade compute for academic institutions.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { title: 'Academic Pricing', desc: 'Special rates for universities and research institutions' },
                      { title: 'Collaboration Tools', desc: 'Multi-user environments for research teams' },
                      { title: 'Publication Support', desc: 'Reproducible research with saved configurations' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h4 className="text-white font-bold mb-2">{item.title}</h4>
                        <p className="text-white/60 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Administrative Benefits */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Reduce administrative burden</h2>
            <p className="text-lg text-white/60">Free up educators to focus on what matters most: teaching.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Automated Grading', desc: 'AI-powered assessment of essays, code, and problem sets', time: '70% time saved' },
              { title: 'Attendance Tracking', desc: 'Computer vision-based automated attendance systems', time: '100% accuracy' },
              { title: 'Student Analytics', desc: 'Predictive models to identify at-risk students early', time: 'Early intervention' },
              { title: 'Content Generation', desc: 'AI-assisted creation of lesson plans and materials', time: '50% faster' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-indigo-500/50 transition-all">
                <div className="text-indigo-400 font-bold text-sm mb-4">{item.time}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-indigo-500/10 via-pink-500/10 to-purple-500/10 border-2 border-indigo-500/30 rounded-3xl p-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Transform education with AI</h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Join leading educational institutions using BluBrg to personalize learning, accelerate research, and improve student outcomes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-7 text-lg">
                  Request Academic Pricing
                </Button>
              </Link>
              <Link to="/products/serverless">
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
                  View Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;