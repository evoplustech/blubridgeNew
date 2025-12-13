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
      link: '/products/serverless',
      items: [
        { name: 'Serverless Inference', link: '/products/serverless', desc: 'API endpoints for instant and scalable AI inference.' },
        { name: 'Fine-tuning', link: '/products/fine-tuning', desc: 'On-demand, serverless fine-tuning' }
      ]
    },
    {
      title: 'AI Private Cloud',
      subtitle: 'Reserved large scale GPU clusters purpose-built for AI.',
      link: '/products/training',
      items: [
        { name: 'Training Clusters', link: '/products/training', desc: 'Easy to deploy GPU clusters with SLURM scheduler.' },
        { name: 'Inference Clusters', link: '/products/inference', desc: 'Autoscaling dedicated inference clusters.' },
        { name: 'GPU Nodes', link: '/products/gpu-nodes', desc: 'Scalable, high performance bare metal GPU clusters.' }
      ]
    },
    {
      title: 'Infrastructure',
      subtitle: 'Data centres and sovereign cloud solutions.',
      link: '/products/sovereign-cloud',
      items: [
        { name: 'Sovereign Cloud', link: '/products/sovereign-cloud', desc: 'Complete jurisdictional control for regulated workloads.' },
        { name: 'Narvik Campus', link: '/products/narvik', desc: 'Arctic hyperscale infrastructure powered by renewables.' }
      ]
    }
  ];

  const solutions = {
    useCase: [
      { name: 'Model Training', link: '/solutions/training' },
      { name: 'AI & ML Inference', link: '/solutions/inference' },
      { name: 'AI Development', link: '/solutions/ai-development' },
      { name: 'Model Fine-Tuning', link: '/solutions/fine-tuning' }
    ],
    industry: [
      { name: 'Telco', link: '/solutions/industry/telco' },
      { name: 'Software & Technology', link: '/solutions/industry/software-technology' },
      { name: 'Finance & Insurance', link: '/solutions/industry/finance-insurance' },
      { name: 'Manufacturing', link: '/solutions/industry/manufacturing' },
      { name: 'Education', link: '/solutions/industry/education' },
      { name: 'Government', link: '/solutions/industry/government' },
      { name: 'Legal', link: '/solutions/industry/legal' },
      { name: 'Healthcare', link: '/solutions/industry/healthcare' }
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
    <>
    <header className="fixed top-0 left-0 right-0 bg-[#0A1F3D]/95 backdrop-blur-lg shadow-lg" style={{ zIndex: 1000 }}>
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
                <div className="absolute top-full pt-4 w-[800px]">
                  <div className="bg-gradient-to-br from-[#000] to-[#0D2847] rounded-lg shadow-2xl p-8 grid grid-cols-3 gap-8" style={{ marginLeft: "-160px" }}>
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
                <div 
                  className="absolute top-full -translate-x-1/2 pt-4 " 
                  style={{ zIndex: 1000, width: '950px', marginLeft: '200px' }}
                >
                  <div 
                    className="shadow-2xl overflow-hidden bg-gradient-to-br from-[#000] to-[#0D2847] rounded-lg "
                    style={{ 
                      
                      padding: '20px 28px 30px 28px'
                    }}
                  >
                    <div className="flex gap-10">
                      <div style={{ flex: '0 0 430px' }}>
                        <h3 className="text-white font-medium mb-6 text-base">By Use Case</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {solutions.useCase.map((item, i) => {
                            const gradients = [
                              'linear-gradient(135deg, #6b46c1 0%, #4c1d95 100%)',
                              'linear-gradient(135deg, #475569 0%, #1e293b 100%)',
                              'linear-gradient(135deg, #d97706 0%, #92400e 100%)',
                              'linear-gradient(135deg, #059669 0%, #064e3b 100%)'
                            ];
                            return (
                              <Link
                                key={i}
                                to={item.link}
                                className="relative block overflow-hidden rounded-xl group cursor-pointer"
                                style={{ 
                                  width: '205px',
                                  height: '103px',
                                  background: gradients[i]
                                }}
                              >
                                <div className="absolute inset-0 opacity-20" style={{
                                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                                  backgroundSize: '40px 40px'
                                }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                <div className="relative h-full flex items-end p-5">
                                  <span className="text-white font-medium text-base leading-snug group-hover:translate-y-[-2px] transition-transform duration-150">
                                    {item.name}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div style={{ flex: '1' }}>
                        <h3 className="text-white font-medium mb-6 text-base">By Industry</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          {solutions.industry.map((item, i) => (
                            <Link
                              key={i}
                              to={item.link}
                              className="block text-white rounded-lg transition-all duration-150 cursor-pointer hover:brightness-125"
                              style={{ 
                                background: '#2d3a54',
                                padding: '12px 20px',
                                fontSize: '15px',
                                fontWeight: '400'
                              }}
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
                  <div className="bg-gradient-to-br from-[#000] to-[#0D2847] rounded-lg shadow-2xl p-6">
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

          {/* Desktop CTA Buttons */}
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

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>
    </header>

    {/* Mobile Menu Overlay - Rendered outside header for proper z-index */}
    {mobileMenuOpen && (
      <div 
        className="fixed inset-0 bg-black/60 lg:hidden"
        style={{ zIndex: 1100, top: '104px' }}
        onClick={() => setMobileMenuOpen(false)}
      />
    )}

    {/* Mobile Menu Panel - Rendered outside header for proper z-index */}
    <div 
      className={`fixed top-[104px] right-0 bottom-0 w-80 max-w-[85vw] bg-[#0F2847] lg:hidden shadow-2xl transition-transform duration-300 ease-in-out overflow-y-auto ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`} 
      style={{ zIndex: 1200 }}
    >
        <div className="p-6 space-y-6">
          {/* Products */}
          <div>
            <button
              onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === 'products' ? null : 'products')}
              className="flex items-center justify-between w-full text-white text-lg font-medium"
            >
              <span>Products</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${mobileSubmenuOpen === 'products' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSubmenuOpen === 'products' && (
              <div className="mt-4 space-y-4 pl-4">
                {products.map((section, idx) => (
                  <div key={idx}>
                    <div className="text-white/80 font-semibold text-sm mb-2">{section.title}</div>
                    {section.items.map((item, i) => (
                      <Link
                        key={i}
                        to={item.link}
                        className="block text-white/70 hover:text-[#0066FF] py-1 text-sm"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Solutions */}
          <div>
            <button
              onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === 'solutions' ? null : 'solutions')}
              className="flex items-center justify-between w-full text-white text-lg font-medium"
            >
              <span>Solutions</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${mobileSubmenuOpen === 'solutions' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSubmenuOpen === 'solutions' && (
              <div className="mt-4 space-y-4 pl-4">
                <div>
                  <div className="text-white/80 font-semibold text-sm mb-2">Cases</div>
                  {solutions.useCase.map((item, i) => (
                    <Link
                      key={i}
                      to={item.link}
                      className="block text-white/70 hover:text-[#0066FF] py-2 text-sm"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div>
                  <div className="text-white/80 font-semibold text-sm mb-2">Industry</div>
                  {solutions.industry.map((item, i) => (
                    <Link
                      key={i}
                      to={item.link}
                      className="block text-white/70 hover:text-[#0066FF] py-2 text-sm"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Company */}
          <div>
            <button
              onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === 'company' ? null : 'company')}
              className="flex items-center justify-between w-full text-white text-lg font-medium"
            >
              <span>Company</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${mobileSubmenuOpen === 'company' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSubmenuOpen === 'company' && (
              <div className="mt-4 space-y-2 pl-4">
                {company.map((item, i) => (
                  <Link
                    key={i}
                    to={item.link}
                    className="block text-white/70 hover:text-[#0066FF] py-1 text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Direct Links */}
          <Link to="/contact" className="block text-white text-lg font-medium">Contact</Link>
          <Link to="/docs" className="block text-white text-lg font-medium">Docs</Link>

          {/* Mobile CTA Buttons */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <Link 
              to="/contact" 
              className="block w-full px-6 py-3 bg-white text-[#0A1F3D] rounded-md font-medium text-center"
            >
              Contact Sales
            </Link>
            <Link 
              to="/login" 
              className="block w-full px-6 py-3 border border-white text-white rounded-md font-medium text-center"
            >
              Login →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;