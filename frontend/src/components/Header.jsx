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
        { name: 'Glomfjord', link: '/products/glomfjord', desc: 'Powered by 100% renewable energy.' },
        // { name: 'Narvik Campus', link: '/products/narvik', desc: 'Arctic hyperscale infrastructure powered by renewables.' }
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
    { name: 'About Us', link: '/about' },
    { name: 'Careers', link: '/careers' }
  ];

  return (
    <>
    <header className="fixed top-0 left-0 right-0 bg-[#0A1F3D]/95 backdrop-blur-lg shadow-lg" style={{ zIndex: 1000 }}>
      {/* Top banner */}
      <div className="bg-[#0066FF] text-white py-2 px-6 text-center text-sm">
        <span>BluBrg contracts approximately 200,000 NVIDIA GB300 GPUs with Microsoft</span>
        <Link to="/news" className="ml-2 underline hover:no-underline">See More →</Link>
      </div>

      <div className="container-custom">
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
                            ><div className="bg-gray-800 rounded-lg px-3 py-2">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-white/50">{item.desc}</div>
                              </div>
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
                            // Abstract 3D ribbon backgrounds matching screenshot - more prominent ribbons
                            const cardStyles = [
                              // Model Training - Purple/magenta ribbon (more vibrant)
                              {
                                background: 'linear-gradient(145deg, #0a0812 0%, #150a1c 100%)',
                                colors: ['#9030e0', '#d070ff', '#ff40c0', '#6020a0'],
                                ribbonPath: 'M -20 75 Q 60 15, 140 55 Q 200 85, 220 35 L 220 110 L -20 110 Z'
                              },
                              // AI & ML Inference - Dark blue/graphite ribbon (deeper)
                              {
                                background: 'linear-gradient(145deg, #080a10 0%, #0a1525 100%)',
                                colors: ['#2a4060', '#4a6890', '#6a90b0', '#102030'],
                                ribbonPath: 'M -10 80 Q 70 25, 150 60 Q 210 95, 220 45 L 220 110 L -10 110 Z'
                              },
                              // AI Development - Brown/bronze ribbon (warmer)
                              {
                                background: 'linear-gradient(145deg, #0c0a08 0%, #1a1008 100%)',
                                colors: ['#a06025', '#e08030', '#c07025', '#704015'],
                                ribbonPath: 'M 0 70 Q 80 20, 160 60 Q 210 90, 220 40 L 220 110 L 0 110 Z'
                              },
                              // Model Fine-Tuning - Deep green ribbon (richer)
                              {
                                background: 'linear-gradient(145deg, #060c0a 0%, #0a1812 100%)',
                                colors: ['#108040', '#30b070', '#208050', '#085030'],
                                ribbonPath: 'M 10 65 Q 90 15, 170 55 Q 215 85, 220 40 L 220 110 L 10 110 Z'
                              }
                            ];
                            const style = cardStyles[i];
                            return (
                              <Link
                                key={i}
                                to={item.link}
                                className="relative block overflow-hidden rounded-xl group cursor-pointer transition-all duration-200 hover:translate-y-[-2px] hover:brightness-110"
                                style={{ 
                                  width: '205px',
                                  height: '103px',
                                  background: style.background
                                }}
                              >
                                {/* Abstract 3D ribbon SVG */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 205 103" preserveAspectRatio="none">
                                  <defs>
                                    <linearGradient id={`ribbon-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" style={{ stopColor: style.ribbonGradient.match(/#[0-9a-f]{6}/gi)?.[0] || '#333' }} />
                                      <stop offset="30%" style={{ stopColor: style.ribbonGradient.match(/#[0-9a-f]{6}/gi)?.[1] || '#555' }} />
                                      <stop offset="70%" style={{ stopColor: style.ribbonGradient.match(/#[0-9a-f]{6}/gi)?.[2] || '#444' }} />
                                      <stop offset="100%" style={{ stopColor: style.ribbonGradient.match(/#[0-9a-f]{6}/gi)?.[3] || '#222' }} />
                                    </linearGradient>
                                    <filter id={`glow-${i}`} x="-20%" y="-20%" width="140%" height="140%">
                                      <feGaussianBlur stdDeviation="3" result="blur" />
                                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                  </defs>
                                  {/* Main ribbon shape */}
                                  <path 
                                    d={style.ribbonPath}
                                    fill={`url(#ribbon-${i})`}
                                    filter={`url(#glow-${i})`}
                                    opacity="0.9"
                                  />
                                  {/* Secondary ribbon layer for depth */}
                                  <path 
                                    d={style.ribbonPath}
                                    fill="none"
                                    stroke="rgba(255,255,255,0.15)"
                                    strokeWidth="1"
                                    transform="translate(3, 3)"
                                  />
                                </svg>
                                {/* Glassy overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20" />
                                {/* Text label - top left */}
                                <div className="absolute top-4 left-4">
                                  <span className="text-white font-medium text-sm leading-snug drop-shadow-lg">
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
            {/* <Link to="/docs" className="text-white/90 hover:text-white transition-colors">Docs</Link> */}
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