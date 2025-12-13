import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Check, Cpu, Network, Database } from 'lucide-react';

const SolutionsTraining = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F3D] via-[#0B2440] to-[#0A1F3D]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-[#0066FF] rounded-full filter blur-[140px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-[#0066FF]/20 rounded-full text-[#0066FF] text-sm font-semibold mb-6 uppercase">Training Solutions</div>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Build breakthrough models with optimized training infrastructure
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl">
              From language models to computer vision systems, BluBrg provides the compute density, networking throughput, and storage performance required for efficient large-scale training.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products/training">
                <Button className="bg-white text-[#0A1F3D] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                  Explore Training Product
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Discuss Your Workload →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Workload Characteristics */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-12">Training Workload Requirements</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu className="w-10 h-10" />,
                title: 'Compute Intensity',
                description: 'Training requires sustained GPU utilization across weeks or months. Multi-GPU parallelism distributes gradient calculations across hundreds to thousands of accelerators simultaneously.'
              },
              {
                icon: <Network className="w-10 h-10" />,
                title: 'Network Bandwidth',
                description: 'Model and data parallelism demand high-bandwidth, low-latency interconnects. RDMA-enabled fabrics eliminate communication bottlenecks between GPU nodes during synchronization.'
              },
              {
                icon: <Database className="w-10 h-10" />,
                title: 'Storage Throughput',
                description: 'Training datasets often exceed terabytes. Parallel filesystems with 500+ GB/s read performance ensure GPUs remain fed with data without stalling on IO operations.'
              }
            ].map((item, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <div className="text-[#0066FF] mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Approach */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Purpose-Built Training Architecture</h2>
              <p className="text-white/70 text-lg mb-8">
                BluBrg training clusters eliminate the infrastructure constraints that slow model development. Our architecture addresses the specific bottlenecks of distributed training workloads.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: 'GPU Fabric Design',
                    points: ['400 Gbps node interconnects', 'Non-blocking network topology', 'RDMA over Converged Ethernet', 'Sub-10 microsecond latency']
                  },
                  {
                    title: 'Storage Infrastructure',
                    points: ['Parallel filesystems (GPFS, Lustre)', 'NVMe all-flash arrays', 'Inline data compression', 'Snapshot and checkpoint optimization']
                  }
                ].map((section, i) => (
                  <div key={i}>
                    <h3 className="text-xl font-semibold text-white mb-3">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.points.map((point, j) => (
                        <li key={j} className="flex items-center space-x-3 text-white/70">
                          <Check className="w-5 h-5 text-[#0066FF] flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Common Training Scenarios</h3>
                  <div className="space-y-6">
                    {[
                      { model: 'LLM (7-70B params)', cluster: '64-512 GPUs', time: '2-6 weeks' },
                      { model: 'Foundation Model (175B+ params)', cluster: '512-2000 GPUs', time: '8-16 weeks' },
                      { model: 'Vision Transformer', cluster: '32-256 GPUs', time: '1-3 weeks' },
                      { model: 'Multimodal Model', cluster: '128-512 GPUs', time: '4-10 weeks' }
                    ].map((scenario, i) => (
                      <div key={i} className="pb-4 border-b border-white/10 last:border-0">
                        <div className="text-white font-semibold mb-1">{scenario.model}</div>
                        <div className="text-white/60 text-sm">
                          <span className="text-[#0066FF]">{scenario.cluster}</span> · {scenario.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Support */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">Framework & Tool Integration</h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Native support for leading deep learning frameworks and distributed training libraries.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: 'Frameworks', items: ['PyTorch', 'TensorFlow', 'JAX', 'MXNet'] },
              { category: 'Distributed', items: ['DeepSpeed', 'Megatron-LM', 'FSDP', 'Horovod'] },
              { category: 'Optimization', items: ['Flash Attention', 'BetterTransformer', 'xFormers', 'Triton'] },
              { category: 'Orchestration', items: ['SLURM', 'Kubernetes', 'Ray', 'Dask'] }
            ].map((group, i) => (
              <Card key={i} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-4">{group.category}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item, j) => (
                      <li key={j} className="text-white/70 text-sm">• {item}</li>
                    ))}
                  </ul>
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
            Accelerate your model development timeline
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discuss your training requirements with our infrastructure team.
          </p>
          <Link to="/contact">
            <Button className="bg-white text-[#0066FF] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
              Schedule Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SolutionsTraining;