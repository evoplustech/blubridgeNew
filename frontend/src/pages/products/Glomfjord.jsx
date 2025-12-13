import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowRight, Zap, Thermometer, Network, Leaf } from 'lucide-react';

const Glomfjord = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F3D] via-[#0D2847] to-[#0A1F3D]" />
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-[#0066FF]/15 rounded-full filter blur-[250px]" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <div className="text-[#0066FF] font-semibold text-sm uppercase tracking-wider mb-6">AI DATA CENTER</div>
            <h1 className="text-6xl sm:text-7xl font-bold text-white mb-8 leading-[1.05]">
              Glomfjord, Norway
            </h1>
            <p className="text-2xl text-white/80 mb-12 leading-relaxed max-w-3xl">
              Located in the Arctic region, our Glomfjord facility operates on entirely renewable energy sources and incorporates the most advanced AI infrastructure to deliver exceptional efficiency alongside peak performance capabilities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-10 py-7 text-lg">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
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

      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">A computing center at the edge of innovation</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                Our Glomfjord data center demonstrates that cutting-edge artificial intelligence infrastructure can thrive alongside thriving local communities. This facility showcases how technological advancement and regional development work together to create sustainable growth opportunities.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 mb-12">
                <h3 className="text-2xl font-bold text-white mb-6">About the Location</h3>
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  Situated in a compact industrial community in northern Norway, just beyond the Arctic boundary, this region has been powered by a substantial hydroelectric facility established more than a century ago. The 120MW generation capacity has long served as the economic foundation for this area of approximately 1,000 residents.
                </p>
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  This distinctive setting provides ideal conditions for high-performance computing and artificial intelligence operations. The naturally cool climate, reliable connectivity infrastructure, and consistent surplus of renewable electricity make it perfectly suited for intensive computational workloads.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  BluBrg is actively contributing to community development through infrastructure investments, employment creation, and innovative heat reuse projects. We're exploring ways to redirect thermal output from our operations to benefit local facilities, including public amenities and residential heating systems.
                </p>
              </div>

              {/* <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 to-[#0D2847]/20 flex items-center justify-center">
                  <div className="text-white/40 text-xl">Video Content Placeholder</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">Key Infrastructure Specifications</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-[#0066FF]/10 rounded-xl flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-[#0066FF]" />
                </div>
                <div className="text-5xl font-bold text-white mb-4">100%</div>
                <h3 className="text-2xl font-bold text-white mb-4">Renewable Energy</h3>
                <p className="text-white/70 leading-relaxed">
                  Glomfjord runs entirely on clean power supplied by the region's hydroelectric infrastructure, ensuring zero carbon emissions from energy consumption.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-[#0066FF]/10 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-[#0066FF]" />
                </div>
                <div className="text-5xl font-bold text-white mb-4">30MW</div>
                <h3 className="text-2xl font-bold text-white mb-4">Power Capacity</h3>
                <p className="text-white/70 leading-relaxed">
                  Currently operational at 30MW with planned expansion capabilities reaching 60MW to accommodate future computational demands and infrastructure growth.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-[#0066FF]/10 rounded-xl flex items-center justify-center mb-6">
                  <Thermometer className="w-8 h-8 text-[#0066FF]" />
                </div>
                <div className="text-2xl font-bold text-white mb-4">Arctic Location</div>
                <h3 className="text-2xl font-bold text-white mb-4">Natural Cooling Advantage</h3>
                <p className="text-white/70 leading-relaxed">
                  Positioned within the Arctic Circle, the facility leverages naturally cool ambient temperatures for highly efficient adiabatic cooling systems, dramatically reducing energy requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-[#0066FF]/10 rounded-xl flex items-center justify-center mb-6">
                  <Network className="w-8 h-8 text-[#0066FF]" />
                </div>
                <div className="text-2xl font-bold text-white mb-4">Redundant Fiber</div>
                <h3 className="text-2xl font-bold text-white mb-4">High-Speed Connectivity</h3>
                <p className="text-white/70 leading-relaxed">
                  Built atop dual redundant low-latency fiber connections, ensuring both exceptional transmission speeds and continuous reliability for mission-critical operations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="grid lg:grid-col items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Sustainable Energy Infrastructure</h2>
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                To support the growing requirements of AI infrastructure, BluBrg strategically positions data centers in areas with stable renewable energy surpluses. This approach prevents strain on local electrical grids and avoids contributing to increased energy costs for community residents.
              </p>
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                The hydroelectric resources in this region provide an abundant supply of clean electricity. This creates a reliable foundation of surplus renewable power, making it exceptionally well-suited for supporting intensive AI computational needs.
              </p>
              <p className="text-xl text-white/70 leading-relaxed">
                Our facility operates exclusively on this renewable energy supply, guaranteeing that we deliver sustainable and efficient AI computing power without compromising environmental responsibility.
              </p>
            </div>
            {/* <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 to-[#0D2847]/20 flex items-center justify-center">
                  <div className="text-white/40 text-xl">Infrastructure Diagram</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
              Access a comprehensive platform for AI development
            </h2>
            <p className="text-xl text-white/70 leading-relaxed">
              Optimize expenses, accelerate development cycles, and execute AI workloads more effectively on a unified infrastructure. Whether utilizing BluBrg's integrated AI tools or bringing your own frameworks, our platform streamlines the path from concept to deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
            {[
              { name: 'Serverless', link: '/products/serverless' },
              { name: 'Training', link: '/products/training' },
              { name: 'Inference', link: '/products/inference' },
              { name: 'Fine-tuning', link: '/products/fine-tuning' },
              { name: 'GPU Nodes', link: '/products/gpu-nodes' }
            ].map((product, i) => (
              <Link
                key={i}
                to={product.link}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 hover:border-[#0066FF]/50 transition-all group"
              >
                <div className="text-white font-semibold text-lg group-hover:text-[#0066FF] transition-colors">
                  {product.name}
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-2xl p-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-white/60 text-sm mb-2">Infrastructure</div>
                <div className="text-white font-semibold text-lg">Renewable Powered</div>
              </div>
              <div>
                <div className="text-white/60 text-sm mb-2">Management</div>
                <div className="text-white font-semibold text-lg">Job Scheduling</div>
              </div>
              <div>
                <div className="text-white/60 text-sm mb-2">Deployment</div>
                <div className="text-white font-semibold text-lg">Container Orchestration</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-[#0066FF]/10 to-transparent border-2 border-[#0066FF]/30 rounded-3xl p-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
              Access thousands of GPUs configured for your specific requirements
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
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

export default Glomfjord;