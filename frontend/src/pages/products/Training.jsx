import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Check, Zap, Database, Network } from 'lucide-react';

const Training = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero Section - Unique for Training */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F3D] via-[#0D2847] to-[#0A1F3D]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#0066FF] rounded-full filter blur-[100px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-[#0066FF]/20 rounded-full text-[#0066FF] text-sm font-semibold mb-6">GPU TRAINING CLUSTERS</div>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Compute purpose - built for AI workloads
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl">
              Develop LLMs along with additional AI systems using powerful GPU-based clusters. Managed Kubernetes and Slurm orchestration choices simplify administration while ensuring maximum usage of available computing resources.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button className="bg-white text-[#0A1F3D] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                  Request Demo
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  View Documentation →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <Zap className="w-12 h-12 text-[#0066FF] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">+40% Efficiency - Improved Resource Utilisation</h3>
                <p className="text-white/70">Efficiency gains reaching 40%.</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <Database className="w-12 h-12 text-[#0066FF] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">7.2x faster on throughput and latency</h3>
                <p className="text-white/70">AMD MI300X with GEMM boosts performance 7.2×</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <Network className="w-12 h-12 text-[#0066FF] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">80% Lower cost - More performance for less</h3>
                <p className="text-white/70">Blubrg delivers an average cost saving of up to 80% compared to hyperscalers.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Dynamically manage AI workloads and resources
</h2>
              <p className="text-white/70 mb-8">
                Our Managed Kubernetes offering is purpose-built to support LLM training. Blubrg takes care of the underlying platform, allowing teams to concentrate on innovation. Take advantage of automatic capacity adjustment, coordinated workloads, and smooth alignment with existing processes.
              </p>
              {/* <div className="space-y-4">
                {[
                  'NVIDIA H100, H200, and GB200 GPU options',
                  'RDMA-enabled high-bandwidth networking',
                  'Parallel filesystem with 500+ GB/s throughput',
                  'SLURM and Kubernetes orchestration',
                  'Automatic checkpointing and fault recovery',
                  'Multi-tenancy with GPU isolation'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-white/80">
                    <Check className="w-5 h-5 text-[#0066FF] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div> */}
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Utilise 100% of your cluster with our advanced scheduler</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-white/60 text-sm">Experience a hybrid approach through our Slurm on Kubernetes (SLONK) service. Benefit from sophisticated task queuing, precise capacity distribution, and streamlined workload coordination designed specifically for LLM training.</p>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Training Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Managed Kubernetes',
                description: 'Streamline AI training through our managed Kubernetes offering. Platform operations and capacity growth are handled for you, allowing full attention on creating and improving models.',
                metrics: ['']
              },
              {
                title: 'Computer Vision Models',
                description: 'Train vision transformers, diffusion models, and object detection networks on massive image datasets with accelerated preprocessing.',
                metrics: ['']
              }
            ].map((useCase, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:border-[#0066FF]/50 transition-all">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">{useCase.title}</h3>
                  <p className="text-white/70 mb-6">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.metrics.map((metric, j) => (
                      <span key={j} className="px-3 py-1 bg-[#0066FF]/20 text-[#0066FF] rounded-full text-sm">
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

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0066FF] to-[#0052CC]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Start training your next breakthrough model
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get access to enterprise-grade GPU clusters designed specifically for AI training workloads.
          </p>
          <Link to="/contact">
            <Button className="bg-white text-[#0066FF] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
              Contact Sales Team
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Training;