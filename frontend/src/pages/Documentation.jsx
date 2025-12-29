import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
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

  useDocumentTitle('Documentation | BluBrg');

  return (
    <div className="min-h-screen bg-[#F3F1E9]">
      {/* Hero */}
      <section className="py-24 bg-[#F3F1E9] relative overflow-hidden border-b border-[#D6DEC3]">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-[#0B1F3B] mb-6">
              Documentation
            </h1>
            <p className="text-xl text-[#2F3A4A] mb-8">
              Everything you need to build and deploy AI applications on BluBrg.
            </p>
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full px-6 py-4 bg-white border border-[#D6DEC3] rounded-lg text-[#0B1F3B] placeholder:text-[#7C8A96] focus:outline-none focus:border-[#328CC1]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-24 bg-[#F3F1E9]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <Card key={idx} className="bg-white border-[#D6DEC3] hover:border-[#328CC1] hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-[#328CC1] mb-4">{section.icon}</div>
                  <h3 className="text-2xl font-bold text-[#0B1F3B] mb-3">{section.title}</h3>
                  <p className="text-[#2F3A4A] mb-6">{section.description}</p>
                  <ul className="space-y-2">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a href={link.url} className="text-[#2F3A4A] hover:text-[#328CC1] transition-colors">
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
      <section className="py-24 bg-[#F3F1E9]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-[#0B1F3B] mb-12 text-center">Popular Tutorials</h2>
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
              <Card key={idx} className="bg-white border-[#D6DEC3] hover:bg-[#EEF2DC] hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#0B1F3B] mb-2">{tutorial.title}</h3>
                  <p className="text-[#2F3A4A] mb-4">{tutorial.description}</p>
                  <p className="text-[#328CC1] text-sm">{tutorial.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-24 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-[#0B1F3B] mb-6">
            Need help?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Our support team is here to assist you 24/7.
          </p>
          <Link to="/contact" className="inline-block bg-white hover:bg-[#EEF2DC] text-[#0B1F3B] px-8 py-4 rounded-lg font-semibold transition-colors">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Documentation;