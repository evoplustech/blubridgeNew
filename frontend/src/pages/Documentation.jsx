import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Book, Code, Zap, Shield, Database, Cloud } from 'lucide-react';

const Documentation = () => {
  const sections = [
    {
      icon: <Book className="w-8 h-8" />,
      title: 'Getting Started',
      description: 'Quick start guides and tutorials to get you up and running.',
      links: [
        { name: 'Introduction', url: '#' },
        { name: 'First Steps', url: '#' },
        { name: 'Basic Concepts', url: '#' },
        { name: 'Sample Projects', url: '#' }
      ]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'API Reference',
      description: 'Complete API documentation for all BluBrg services.',
      links: [
        { name: 'Authentication', url: '#' },
        { name: 'REST API', url: '#' },
        { name: 'Python SDK', url: '#' },
        { name: 'Node.js SDK', url: '#' }
      ]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Training & Fine-tuning',
      description: 'Learn how to train and fine-tune AI models on BluBrg.',
      links: [
        { name: 'Model Training', url: '#' },
        { name: 'Fine-tuning Guide', url: '#' },
        { name: 'Hyperparameter Tuning', url: '#' },
        { name: 'Best Practices', url: '#' }
      ]
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'Inference & Deployment',
      description: 'Deploy and scale your AI models in production.',
      links: [
        { name: 'Serverless Inference', url: '#' },
        { name: 'Dedicated Clusters', url: '#' },
        { name: 'Auto-scaling', url: '#' },
        { name: 'Monitoring', url: '#' }
      ]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Infrastructure',
      description: 'GPU clusters, networking, and storage configuration.',
      links: [
        { name: 'GPU Nodes', url: '#' },
        { name: 'Networking', url: '#' },
        { name: 'Storage Options', url: '#' },
        { name: 'SLURM Scheduler', url: '#' }
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Security & Compliance',
      description: 'Security best practices and compliance information.',
      links: [
        { name: 'Security Overview', url: '#' },
        { name: 'Data Sovereignty', url: '#' },
        { name: 'Compliance', url: '#' },
        { name: 'Access Control', url: '#' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-[#0A1F3D] via-[#0D2847] to-[#0A1F3D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0066FF] rounded-full filter blur-[120px]" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-white mb-6">
              Documentation
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Everything you need to build and deploy AI applications on BluBrg.
            </p>
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <Card key={idx} className="bg-white/5 border-white/10 hover:border-[#0066FF]/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-[#0066FF] mb-4">{section.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{section.title}</h3>
                  <p className="text-white/70 mb-6">{section.description}</p>
                  <ul className="space-y-2">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a href={link.url} className="text-white/80 hover:text-[#0066FF] transition-colors">
                          {link.name} →
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorials */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Popular Tutorials</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Train Your First Model',
                description: 'Step-by-step guide to training a language model on BluBrg.',
                time: '15 min read'
              },
              {
                title: 'Deploy Serverless Inference',
                description: 'Deploy a production-ready inference endpoint in minutes.',
                time: '10 min read'
              },
              {
                title: 'Fine-tune with Custom Data',
                description: 'Learn how to fine-tune models with your own datasets.',
                time: '20 min read'
              },
              {
                title: 'Optimize GPU Utilization',
                description: 'Best practices for maximizing GPU performance and efficiency.',
                time: '12 min read'
              }
            ].map((tutorial, idx) => (
              <Card key={idx} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{tutorial.title}</h3>
                  <p className="text-white/70 mb-4">{tutorial.description}</p>
                  <p className="text-[#0066FF] text-sm">{tutorial.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Need help?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Our support team is here to assist you 24/7.
          </p>
          <Link to="/contact" className="inline-block bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-4 rounded-lg font-semibold transition-colors">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Documentation;