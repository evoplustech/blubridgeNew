import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSubmenuOpen(null);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const products = [
    {
      title: 'AI Services',
      subtitle: 'Develop, train, tune, and deploy AI using our on demand services.',
      link: '/products/ai-services',
      items: [
        { name: 'Serverless Inference', link: '/products/serverless', desc: 'API endpoints for instant and scalable AI inference.' },
        { name: 'Fine-tuning', link: '/products/fine-tuning', desc: 'On-demand, serverless fine-tuning' }
      ]
    },
    {
      title: 'AI Private Cloud',
      subtitle: 'Reserved large scale GPU clusters purpose-built for AI.',
      link: '/products/private-cloud',
      items: [
        { name: 'Training Clusters', link: '/products/training', desc: 'Easy to deploy GPU clusters with SLURM scheduler.' },
        { name: 'Inference Clusters', link: '/products/inference', desc: 'Autoscaling dedicated inference clusters.' },
        { name: 'Bare Metal Clusters', link: '/products/gpu-nodes', desc: 'Scalable, high performance bare metal GPU clusters.' }
      ]
    },
    {
      title: 'AI Factories',
      subtitle: 'Data centres powering the future of innovation.',
      link: '/products/ai-factories',
      items: [
        { name: 'Sovereign Cloud', link: '/products/sovereign-cloud', desc: 'Hyperscaler performance with sovereign governance.' },
        { name: 'GPU Infrastructure', link: '/products/gpu-infrastructure', desc: 'Purpose-built infrastructure for AI workloads.' }
      ]
    }
  ];

  const solutions = {
    useCase: [
      { name: 'Model Training', link: '/solutions /training' },
      { name: 'AI & ML Inference', link: '/solutions /inference' },
      { name: 'AI Development', link: '/solutions /ai-development' },
      { name: 'Model Fine-Tuning', link: '/solutions /fine-tuning' }
    ],
    industry: [
      { name: 'Telco', link: '/solutions /industry/telco' },
      { name: 'Software & Technology', link: '/solutions /industry/software-technology' },
      { name: 'Finance & Insurance', link: '/solutions /industry/finance-insurance' },
      { name: 'Manufacturing', link: '/solutions /industry/manufacturing' },
      { name: 'Education', link: '/solutions /industry/education' },
      { name: 'Government', link: '/solutions /industry/government' },
      { name: 'Legal', link: '/solutions /industry/legal' },
      { name: 'Healthcare', link: '/solutions /industry/healthcare' }
    ]
  };

  const company = [
    { name: 'About Us', link: '/company/about' },
    { name: 'Media Kit', link: '/company/media-kit' },
    { name: 'Blog', link: '/company/blog' },
    { name: 'Careers', link: '/company/careers' },
    { name: 'Newsroom', link: '/company/newsroom' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1F3D]/95 backdrop-blur-lg shadow-lg">
      {/* Top banner */}
      <div className="bg-[#0066FF] text-white py-2 px-6 text-center text-sm">
        <span>BluBrg contracts approximately 200,000 NVIDIA GB300 GPUs with Microsoft</span>
        <Link to="/news" className="ml-2 underline hover:no-underline">See More →</Link>
      </div>

      <div className="mx-auto px-6" style={{ maxWidth: '1261px' }}>
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white tracking-wider">
            BLUBRG
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-white/90 hover:text-white transition-colors">
                <span>Products</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 pt-4 w-[800px]">
                  <div className="bg-[#0F2847] rounded-lg shadow-2xl p-8 grid grid-cols-3 gap-8">
                    {products.map((section, idx) => (
                      <div key={idx}>
                        <h3 className="text-white font-semibold mb-2">{section.title}</h3>
                        <p className="text-white/60 text-sm mb-4">{section.subtitle}</p>
                        <div className="space-y-3">
                          {section.items.map((item, i) => (
                            <Link
                              key={i}
                              to={item.link}
                              className="block text-white/80 hover:text-[#0066FF] transition-colors text-sm"
                            >
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-white/50">{item.desc}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-white/90 hover:text-white transition-colors">
                <span>Solutions</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'solutions' && (
                <div className="absolute top-full left-0 pt-4 w-[600px]">
                  <div className="bg-[#0F2847] rounded-lg shadow-2xl p-8">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-white font-semibold mb-4">By Use Case</h3>
                        <div className="space-y-2">
                          {solutions.useCase.map((item, i) => (
                            <Link
                              key={i}
                              to={item.link}
                              className="block text-white/80 hover:text-[#0066FF] transition-colors text-sm"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-4">By Industry</h3>
                        <div className="space-y-2">
                          {solutions.industry.map((item, i) => (
                            <Link
                              key={i}
                              to={item.link}
                              className="block text-white/80 hover:text-[#0066FF] transition-colors text-sm"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-white/90 hover:text-white transition-colors">
                <span>Company</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'company' && (
                <div className="absolute top-full left-0 pt-4 w-[250px]">
                  <div className="bg-[#0F2847] rounded-lg shadow-2xl p-6">
                    <div className="space-y-2">
                      {company.map((item, i) => (
                        <Link
                          key={i}
                          to={item.link}
                          className="block text-white/80 hover:text-[#0066FF] transition-colors text-sm"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/contact" className="text-white/90 hover:text-white transition-colors">Contact</Link>
            <Link to="/docs" className="text-white/90 hover:text-white transition-colors">Docs</Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              to="/contact" 
              className="px-6 py-2.5 bg-white text-[#0A1F3D] rounded-md font-medium hover:bg-white/90 transition-colors"
            >
              Contact Sales
            </Link>
            <Link 
              to="/login" 
              className="px-6 py-2.5 text-white hover:text-[#0066FF] transition-colors flex items-center space-x-2"
            >
              <span>Login</span>
              <span>→</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;