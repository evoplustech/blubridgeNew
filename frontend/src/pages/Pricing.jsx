import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Serverless',
      description: 'Pay-as-you-go AI inference',
      price: 'From $0.0001',
      unit: 'per token',
      features: [
        'Instant scaling',
        'Multiple AI models',
        'API access',
        'No minimum commitment',
        'Pay only for usage',
        'Global edge network'
      ],
      cta: 'Start Free',
      link: '/contact'
    },
    {
      name: 'Training Clusters',
      description: 'Dedicated GPU clusters',
      price: 'From $1.99',
      unit: 'per GPU hour',
      popular: true,
      features: [
        'NVIDIA H100/A100 GPUs',
        'High-speed networking',
        'SLURM scheduler',
        'Dedicated resources',
        'Custom configurations',
        '24/7 support'
      ],
      cta: 'Contact Sales',
      link: '/contact'
    },
    {
      name: 'Private Cloud',
      description: 'Enterprise-grade infrastructure',
      price: 'Custom',
      unit: 'pricing',
      features: [
        'Reserved GPU capacity',
        'Sovereign deployment',
        'Custom SLAs',
        'Dedicated account team',
        'Priority support',
        'Volume discounts'
      ],
      cta: 'Talk to Sales',
      link: '/contact'
    }
  ];

  const addOns = [
    { name: 'Premium Support', price: 'From $5,000/month' },
    { name: 'Managed Services', price: 'Custom pricing' },
    { name: 'Training & Onboarding', price: 'From $2,500' },
    { name: 'Dedicated Account Manager', price: 'Included in Enterprise' }
  ];

  useDocumentTitle('Pricing | BluBrg');

  return (
    <div className="min-h-screen bg-[#E7ECD2]">      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#0A1F3D] via-[#0D2847] to-[#0A1F3D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0066FF] rounded-full filter blur-[120px]" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-white mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-white/80">
              Choose the right infrastructure for your AI workloads. Scale as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, idx) => (
              <Card 
                key={idx} 
                className={`bg-white/5 border-white/10 hover:border-[#0066FF]/50 transition-all duration-300 relative ${
                  plan.popular ? 'ring-2 ring-[#0066FF]' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#0066FF] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/60 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60 ml-2">{plan.unit}</span>
                  </div>
                  <Link to={plan.link}>
                    <Button className={`w-full mb-6 ${
                      plan.popular 
                        ? 'bg-[#0066FF] hover:bg-[#0052CC] text-white' 
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}>
                      {plan.cta}
                    </Button>
                  </Link>
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3 text-white/80">
                        <Check className="w-5 h-5 text-[#0066FF] flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24 bg-[#E7ECD2]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Add-ons & Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {addOns.map((addon, idx) => (
                <Card key={idx} className="bg-white/5 border-white/10">
                  <CardContent className="p-6 flex justify-between items-center">
                    <span className="text-white font-semibold">{addon.name}</span>
                    <span className="text-[#0066FF]">{addon.price}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept major credit cards, wire transfers, and can provide invoicing for enterprise customers.'
                },
                {
                  q: 'Can I change my plan later?',
                  a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
                },
                {
                  q: 'Do you offer volume discounts?',
                  a: 'Yes, we offer significant discounts for large-scale deployments and long-term commitments.'
                },
                {
                  q: 'Is there a free trial?',
                  a: 'Yes, new customers receive $500 in credits to test our platform for 30 days.'
                }
              ].map((faq, idx) => (
                <Card key={idx} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                    <p className="text-white/70">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0066FF] to-[#0052CC]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <Link to="/contact">
            <Button className="bg-white text-[#0066FF] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
              Talk to Sales
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;