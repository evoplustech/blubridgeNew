import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Button } from '../components/ui/button';
import { Download, Mail } from 'lucide-react';

const MediaKit = () => {
  useDocumentTitle('Media Kit | BluBrg');

  return (
    <div className="min-h-screen bg-[#0A1F3D]">      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F3D] to-[#0D2847]" />
        <div className="container-custom relative z-10 text-center py-20">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">Media Kit</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Access our brand resources, logos, and press materials. Everything you need to accurately represent BluBrg in your publications and projects.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Brand Assets</h2>
            <p className="text-lg text-white/60 mb-12 leading-relaxed">
              Our brand identity represents innovation in AI infrastructure. Please maintain proper spacing and avoid modifying our logos. Use these assets responsibly to ensure consistent brand representation.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-10 hover:bg-white/10 transition-all">
                <div className="bg-white rounded-xl h-48 flex items-center justify-center mb-6">
                  <div className="text-4xl font-bold text-[#0066FF]">BLUBRG</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Light Background Logo</h3>
                <p className="text-white/60 mb-4">Use on white or light-colored backgrounds</p>
                <Button className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
              </div>

              <div className="bg-[#0A1F3D] border border-white/10 rounded-2xl p-10 hover:border-[#0066FF]/50 transition-all">
                <div className="bg-[#0D2847] rounded-xl h-48 flex items-center justify-center mb-6">
                  <div className="text-4xl font-bold text-white">BLUBRG</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Dark Background Logo</h3>
                <p className="text-white/60 mb-4">Use on dark or colored backgrounds</p>
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-10 hover:bg-white/10 transition-all">
                <div className="bg-white rounded-xl h-48 flex items-center justify-center mb-6">
                  <div className="text-3xl font-bold text-[#0066FF] tracking-wider">B</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Icon Mark</h3>
                <p className="text-white/60 mb-4">Standalone icon for compact use</p>
                <Button className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download SVG
                </Button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-10 hover:bg-white/10 transition-all">
                <div className="bg-white rounded-xl h-48 flex items-center justify-center mb-6">
                  <div className="text-2xl font-light text-[#0066FF] tracking-widest">BLUBRG</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Wordmark</h3>
                <p className="text-white/60 mb-4">Text-only version of our brand</p>
                <Button className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download SVG
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Company Overview</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-10">
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                BluBrg delivers cutting-edge AI infrastructure that empowers organizations to train, deploy, and scale machine learning models efficiently. Our platform combines enterprise-grade security with developer-friendly tools, making advanced AI accessible to companies of all sizes.
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                Founded with a vision to democratize artificial intelligence, we provide scalable compute resources, pre-optimized frameworks, and seamless integration capabilities that reduce time-to-market for AI applications.
              </p>
              
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-xl font-bold text-white mb-4">Leadership</h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  Our executive team brings decades of combined experience in cloud computing, artificial intelligence, and enterprise software. We are committed to building infrastructure that drives innovation while maintaining the highest standards of reliability and security.
                </p>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h3 className="text-xl font-bold text-white mb-4">Press Inquiries</h3>
                <p className="text-white/70 mb-4">
                  For media requests, interviews, or partnership opportunities, please contact our communications team:
                </p>
                <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white">
                  <Mail className="w-4 h-4 mr-2" />
                  press@blubrg.com
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0B1F35]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Brand Guidelines</h2>
            <p className="text-lg text-white/60 mb-12">
              Download our comprehensive resources to ensure accurate representation of the BluBrg brand.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-all">
                <div className="w-16 h-16 bg-[#0066FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-[#0066FF]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Logo Package</h3>
                <p className="text-white/60 text-sm mb-6">All logo variations and formats</p>
                <Button className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm">
                  Download ZIP
                </Button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-all">
                <div className="w-16 h-16 bg-[#0066FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-[#0066FF]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Brand Guidelines</h3>
                <p className="text-white/60 text-sm mb-6">Complete brand usage guide</p>
                <Button className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm">
                  Download PDF
                </Button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-all">
                <div className="w-16 h-16 bg-[#0066FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-[#0066FF]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Press Images</h3>
                <p className="text-white/60 text-sm mb-6">High-resolution assets</p>
                <Button className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm">
                  Download ZIP
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaKit;