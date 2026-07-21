import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Check } from 'lucide-react';

const Partners = () => {
  const partnerLogos = [
    'NVIDIA', 'Microsoft', 'OpenAI', 'AMD', 'Intel',
    'Google', 'AWS', 'Lenovo', 'Dell', 'HPE',
    'Nokia', 'IBM', 'Oracle', 'Cisco', 'VMware'
  ];

  const partnerTypes = [
    {
      title: 'Technology Partners',
      description: 'Leading technology companies providing hardware and software solutions.',
      partners: ['NVIDIA', 'AMD', 'Intel', 'Microsoft', 'Google']
    },
    {
      title: 'Cloud Partners',
      description: 'Strategic partnerships for hybrid and multi-cloud deployments.',
      partners: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Oracle Cloud']
    },
    {
      title: 'Infrastructure Partners',
      description: 'Hardware and infrastructure providers powering our data centres.',
      partners: ['Lenovo', 'Dell', 'HPE', 'Cisco', 'Nokia']
    }
  ];

  const benefits = [
    'Access to cutting-edge AI infrastructure',
    'Co-marketing opportunities',
    'Technical collaboration and support',
    'Early access to new features',
    'Joint go-to-market strategies',
    'Dedicated partner success team'
  ];

  useDocumentTitle('Partners | BluBridge');

  return (
    <div className="min-h-screen bg-[#f1f2fa]">      {/* Hero */}
      <section className="py-24 bg-[#f1f2fa] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#328CC1] rounded-full filter blur-[120px]" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-[#0B1F3B] mb-6">
              Our Partners
            </h1>
            <p className="text-xl text-[#2F3A4A]">
              Building the future of AI infrastructure together with industry leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-24 bg-[#f1f2fa]">
        <div className="container-custom">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-8">
            {partnerLogos.map((partner, idx) => (
              <Card key={idx} className="bg-white/5 border-[#d4d8e8] hover:bg-[#e8eaf3] transition-all duration-300">
                <CardContent className="p-8 flex items-center justify-center">
                  <div className="text-[#2F3A4A] font-bold text-lg text-center">{partner}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-24 bg-[#f1f2fa]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-[#0B1F3B] mb-12 text-center">Partnership Ecosystem</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {partnerTypes.map((type, idx) => (
              <Card key={idx} className="bg-white/5 border-[#d4d8e8]">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-[#0B1F3B] mb-3">{type.title}</h3>
                  <p className="text-[#2F3A4A] mb-6">{type.description}</p>
                  <ul className="space-y-2">
                    {type.partners.map((partner, i) => (
                      <li key={i} className="flex items-center space-x-2 text-[#2F3A4A]">
                        <Check className="w-5 h-5 text-[#328CC1]" />
                        <span>{partner}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-24 bg-[#f1f2fa]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-[#0B1F3B] mb-6 text-center">Become a Partner</h2>
            <p className="text-xl text-[#2F3A4A] text-center mb-12">
              Join our partner ecosystem and help shape the future of AI infrastructure.
            </p>
            <Card className="bg-white/5 border-[#d4d8e8]">
              <CardContent className="p-12">
                <h3 className="text-2xl font-bold text-[#0B1F3B] mb-6">Partner Benefits</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-[#2F3A4A]">
                      <Check className="w-5 h-5 text-[#328CC1] flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Link to="/contact">
                    <Button className="bg-[#328CC1] hover:bg-[#162B4D] text-white px-8 py-6 text-lg font-semibold">
                      Apply to Partner Program
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold text-[#0B1F3B] mb-6">
            Let's build together
          </h2>
          <Link to="/contact">
            <Button className="bg-white text-[#328CC1] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
              Contact Partnership Team
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Partners;