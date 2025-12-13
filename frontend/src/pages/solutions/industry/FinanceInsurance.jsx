import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { ArrowRight, DollarSign, Shield, TrendingUp, Lock, Activity, AlertCircle } from 'lucide-react';

const FinanceInsurance = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero - Asymmetric Layout */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1F3D] via-[#0F2847] to-[#1a3a5c]" />
          <div className="absolute inset-0">
            <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-emerald-500/20 rounded-full filter blur-[200px] animate-pulse" />
          </div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-6 py-3 mb-8">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Finance & Insurance</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.05]">
                AI infrastructure for financial services
              </h1>
              <p className="text-xl text-white/70 mb-10 leading-relaxed">
                From algorithmic trading and risk management to fraud detection and customer insights, BluBrg delivers secure, compliant AI infrastructure that financial institutions trust.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products/training">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-7 text-lg">
                    Explore Solutions <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Side Stats Panel */}
            <div className="lg:col-span-5">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 space-y-8">
                {[
                  { icon: <Shield className="w-8 h-8" />, label: 'SOC 2 & ISO 27001', sublabel: 'Enterprise-grade security' },
                  { icon: <Lock className="w-8 h-8" />, label: 'End-to-end encryption', sublabel: 'Data protection by default' },
                  { icon: <Activity className="w-8 h-8" />, label: '99.99% uptime SLA', sublabel: 'Financial-grade reliability' },
                  { icon: <AlertCircle className="w-8 h-8" />, label: 'Real-time compliance', sublabel: 'Regulatory reporting ready' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">{item.label}</div>
                      <div className="text-white/60 text-sm">{item.sublabel}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial AI Use Cases - Tabbed Layout */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">AI-powered financial services</h2>
            <p className="text-lg text-white/60">Transform operations across trading, risk, fraud, and customer experience.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: 'Algorithmic Trading & Market Analysis',
                desc: 'Deploy high-frequency trading algorithms and predictive models that analyze market sentiment, news, and historical data in real-time. Process millions of data points per second for split-second trading decisions.',
                metrics: ['Sub-millisecond execution', 'Real-time signals', 'Market predictions'],
                icon: <TrendingUp className="w-8 h-8" />,
                color: 'border-emerald-500/30'
              },
              {
                title: 'Risk Assessment & Portfolio Management',
                desc: 'Use AI to model complex risk scenarios, optimize portfolio allocation, and predict market volatility. Run Monte Carlo simulations with thousands of variables to stress-test investment strategies.',
                metrics: ['Advanced risk modeling', 'Portfolio optimization', 'Stress testing'],
                icon: <Activity className="w-8 h-8" />,
                color: 'border-blue-500/30'
              },
              {
                title: 'Fraud Detection & AML Compliance',
                desc: 'Real-time transaction monitoring using ML models that detect anomalies, prevent fraud, and ensure anti-money laundering compliance. Analyze transaction patterns across millions of accounts simultaneously.',
                metrics: ['99.7% fraud detection', 'Real-time monitoring', 'AML compliance'],
                icon: <Shield className="w-8 h-8" />,
                color: 'border-red-500/30'
              },
              {
                title: 'Customer Analytics & Personalization',
                desc: 'Build 360-degree customer profiles using NLP and predictive analytics. Personalize product recommendations, optimize pricing, predict churn, and automate customer support with AI assistants.',
                metrics: ['35% higher conversion', 'Personalized offers', 'AI support'],
                icon: <DollarSign className="w-8 h-8" />,
                color: 'border-purple-500/30'
              }
            ].map((item, i) => (
              <Card key={i} className={`bg-white/5 border-2 ${item.color} hover:bg-white/10 transition-all group`}>
                <CardContent className="p-10">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-6">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.metrics.map((metric, j) => (
                      <span key={j} className="inline-flex items-center bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-2 text-emerald-400 text-sm font-semibold">
                        {metric}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Security - Split Screen */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Built for compliance from day one</h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                Financial services operate under strict regulatory frameworks. BluBrg's infrastructure is designed to meet the highest standards for security, privacy, and compliance.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'SOC 2 Type II Certified', desc: 'Annual audits of security controls' },
                  { title: 'ISO 27001 Compliant', desc: 'Information security management' },
                  { title: 'GDPR & CCPA Ready', desc: 'Data privacy and protection' },
                  { title: 'PCI DSS Standards', desc: 'Payment card security' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-500/50 transition-all">
                    <div className="font-bold text-white text-lg mb-2">{item.title}</div>
                    <div className="text-white/60">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Enterprise-grade security</h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                Your data and models are protected with military-grade encryption, isolated compute environments, and comprehensive audit logging.
              </p>
              <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 rounded-2xl p-10 space-y-8">
                {[
                  { feature: 'End-to-end encryption', status: 'Active' },
                  { feature: 'Private VPC deployment', status: 'Available' },
                  { feature: 'Role-based access control', status: 'Enabled' },
                  { feature: 'Audit logging & monitoring', status: 'Real-time' },
                  { feature: 'Data residency controls', status: 'Configurable' },
                  { feature: 'Penetration testing', status: 'Quarterly' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-white font-semibold">{item.feature}</span>
                    <span className="bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-sm font-bold">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-3xl p-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-16 text-center">Performance that financial services demand</h2>
            <div className="grid md:grid-cols-4 gap-12">
              {[
                { value: '<1ms', label: 'Trading latency', desc: 'Ultra-low latency inference' },
                { value: '1M+', label: 'TPS capacity', desc: 'Transactions per second' },
                { value: '99.99%', label: 'Uptime SLA', desc: 'Financial-grade reliability' },
                { value: '24/7', label: 'Support', desc: 'Enterprise support team' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-5xl font-bold text-emerald-400 mb-3">{stat.value}</div>
                  <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
                  <div className="text-white/60">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border-2 border-emerald-500/30 rounded-3xl p-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Transform your financial services with AI</h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Join leading banks, insurers, and fintech companies using BluBrg's secure, compliant AI infrastructure.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-7 text-lg">
                  Schedule a Consultation
                </Button>
              </Link>
              <Link to="/products/training">
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

export default FinanceInsurance;