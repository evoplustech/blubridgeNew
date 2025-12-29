import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Products = () => {
  const products = [
    {
      category: 'AI Services',
      title: 'Serverless Inference',
      description: 'API endpoints for instant and scalable AI inference without infrastructure management.',
      image: 'https://images.unsplash.com/photo-1639815188546-c43c240ff4df',
      features: ['Auto-scaling', 'Low latency', 'Pay per use', 'Multiple models'],
      link: '/products/serverless'
    },
    {
      category: 'AI Services',
      title: 'Fine-tuning',
      description: 'On-demand, serverless fine-tuning for custom AI models.',
      image: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf',
      features: ['Custom datasets', 'Automated pipelines', 'Version control', 'Fast iteration'],
      link: '/products/fine-tuning'
    },
    {
      category: 'Private Cloud',
      title: 'Training Clusters',
      description: 'Easy to deploy GPU clusters utilizing the SLURM scheduler.',
      image: 'https://images.unsplash.com/photo-1624701928517-44c8ac49d93c',
      features: ['SLURM scheduling', 'Multi-GPU support', 'High bandwidth', 'Dedicated resources'],
      link: '/products/training'
    },
    {
      category: 'Private Cloud',
      title: 'Inference Clusters',
      description: 'Autoscaling dedicated inference clusters for speed and scalability.',
      image: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87',
      features: ['Real-time inference', 'Batch processing', 'Load balancing', 'High availability'],
      link: '/products/inference'
    },
    {
      category: 'Private Cloud',
      title: 'GPU Nodes',
      description: 'Scalable, high performance bare metal GPU clusters engineered for AI.',
      image: 'https://images.unsplash.com/photo-1621164071312-67bb68821b3f',
      features: ['NVIDIA H100/A100', 'Bare metal performance', 'Custom configurations', 'Direct access'],
      link: '/products/gpu-nodes'
    },
    {
      category: 'AI Factories',
      title: 'Sovereign Cloud',
      description: 'Hyperscaler performance with sovereign governance and control.',
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f',
      features: ['Data sovereignty', 'Compliance ready', 'Local data centers', 'Secure infrastructure'],
      link: '/products/sovereign-cloud'
    }
  ];

  useDocumentTitle('Products | BluBrg');

  return (
    <div className="min-h-screen bg-[#F3F6E8]">
      {/* Hero */}
      <section className="py-24 bg-[#F3F6E8] relative overflow-hidden border-b border-[#D6DEC3]">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold text-[#0B1F3B] mb-6">
              Full-stack AI infrastructure
            </h1>
            <p className="text-xl text-[#243447] mb-8">
              From serverless endpoints to dedicated GPU clusters, BluBrg provides complete AI infrastructure solutions.
            </p>
            <Link to="/contact">
              <Button className="bg-[#0B1F3B] text-white hover:bg-[#162B4D] px-8 py-6 text-lg font-semibold">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-[#F3F6E8]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <Card key={idx} className="bg-white border-[#D6DEC3] hover:border-[#328CC1] hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <CardContent className="p-8">
                  <div className="text-[#328CC1] text-sm font-semibold mb-2 uppercase">{product.category}</div>
                  <h3 className="text-2xl font-bold text-[#0B1F3B] mb-3">{product.title}</h3>
                  <p className="text-[#243447] mb-6">{product.description}</p>
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2 text-[#243447] text-sm">
                        <Check className="w-4 h-4 text-[#328CC1]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  {/* <Link to={product.link} className="text-[#328CC1] hover:text-[#0B3C5D] flex items-center space-x-2">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link> */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0B1F3B]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold text-[#0B1F3B] mb-6">
            Ready to scale your AI infrastructure?
          </h2>
          <Link to="/contact">
            <Button className="bg-white text-[#0B1F3B] hover:bg-[#EEF2DC] px-8 py-6 text-lg font-semibold">
              Contact Sales
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Products;