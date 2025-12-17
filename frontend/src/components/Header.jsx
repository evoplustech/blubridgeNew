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
                            return (
                              <Link
                                key={i}
                                to={item.link}
                                className="relative block overflow-hidden rounded-xl group cursor-pointer transition-transform duration-150 hover:translate-y-[-1px]"
                                style={{ 
                                  width: '205px',
                                  height: '103px',
                                  background: '#000'
                                }}
                              >
                                {/* Model Training - Purple twisted ribbons flowing from bottom-left */}
                                {i === 0 && (
                                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 205 103" preserveAspectRatio="xMidYMid slice">
                                    <defs>
                                      <linearGradient id="purple-ribbon-1" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#2a0040" />
                                        <stop offset="30%" stopColor="#6020a0" />
                                        <stop offset="50%" stopColor="#c060ff" />
                                        <stop offset="70%" stopColor="#ff50c0" />
                                        <stop offset="100%" stopColor="#400060" />
                                      </linearGradient>
                                      <linearGradient id="purple-ribbon-2" x1="0%" y1="80%" x2="100%" y2="20%">
                                        <stop offset="0%" stopColor="#200030" />
                                        <stop offset="40%" stopColor="#8040c0" />
                                        <stop offset="60%" stopColor="#d080ff" />
                                        <stop offset="100%" stopColor="#301050" />
                                      </linearGradient>
                                    </defs>
                                    {/* Back ribbon layer */}
                                    <path d="M -10 110 Q 30 70, 80 85 Q 130 100, 160 60 Q 180 35, 210 50 L 210 110 Z" fill="url(#purple-ribbon-1)" opacity="0.7"/>
                                    {/* Middle ribbon */}
                                    <path d="M 20 115 Q 60 50, 120 70 Q 170 85, 200 40 L 210 115 Z" fill="url(#purple-ribbon-2)" opacity="0.85"/>
                                    {/* Front ribbon with highlight */}
                                    <path d="M 50 115 Q 90 45, 150 65 Q 190 80, 215 30 L 215 115 Z" fill="url(#purple-ribbon-1)"/>
                                    <path d="M 50 115 Q 90 45, 150 65 Q 190 80, 215 30" fill="none" stroke="rgba(255,200,255,0.4)" strokeWidth="1"/>
                                  </svg>
                                )}
                                
                                {/* AI & ML Inference - Dark steel angular shards */}
                                {i === 1 && (
                                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 205 103" preserveAspectRatio="xMidYMid slice">
                                    <defs>
                                      <linearGradient id="steel-ribbon-1" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#0a1020" />
                                        <stop offset="30%" stopColor="#1a3050" />
                                        <stop offset="60%" stopColor="#4a7090" />
                                        <stop offset="100%" stopColor="#0a1525" />
                                      </linearGradient>
                                      <linearGradient id="steel-ribbon-2" x1="20%" y1="100%" x2="80%" y2="0%">
                                        <stop offset="0%" stopColor="#051015" />
                                        <stop offset="40%" stopColor="#2a5070" />
                                        <stop offset="70%" stopColor="#5a90b0" />
                                        <stop offset="100%" stopColor="#102035" />
                                      </linearGradient>
                                    </defs>
                                    {/* Sharp angular shapes */}
                                    <path d="M 30 115 L 70 40 L 110 80 L 140 30 L 180 60 L 210 25 L 210 115 Z" fill="url(#steel-ribbon-1)" opacity="0.6"/>
                                    <path d="M 60 115 L 90 50 L 130 75 L 170 35 L 210 55 L 210 115 Z" fill="url(#steel-ribbon-2)" opacity="0.8"/>
                                    <path d="M 80 115 L 120 45 L 160 70 L 200 30 L 210 40 L 210 115 Z" fill="url(#steel-ribbon-1)"/>
                                    <path d="M 80 115 L 120 45 L 160 70 L 200 30" fill="none" stroke="rgba(150,180,220,0.35)" strokeWidth="1"/>
                                  </svg>
                                )}
                                
                                {/* AI Development - Bronze/copper flowing ribbons */}
                                {i === 2 && (
                                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 205 103" preserveAspectRatio="xMidYMid slice">
                                    <defs>
                                      <linearGradient id="bronze-ribbon-1" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#301505" />
                                        <stop offset="30%" stopColor="#804020" />
                                        <stop offset="55%" stopColor="#d08040" />
                                        <stop offset="80%" stopColor="#ffa050" />
                                        <stop offset="100%" stopColor="#503010" />
                                      </linearGradient>
                                      <linearGradient id="bronze-ribbon-2" x1="10%" y1="90%" x2="90%" y2="10%">
                                        <stop offset="0%" stopColor="#201005" />
                                        <stop offset="35%" stopColor="#905025" />
                                        <stop offset="65%" stopColor="#c07030" />
                                        <stop offset="100%" stopColor="#402010" />
                                      </linearGradient>
                                    </defs>
                                    {/* Smooth flowing bronze ribbons */}
                                    <path d="M -20 115 Q 40 60, 100 80 Q 150 95, 190 50 Q 210 30, 220 45 L 220 115 Z" fill="url(#bronze-ribbon-1)" opacity="0.65"/>
                                    <path d="M 10 115 Q 60 50, 130 75 Q 180 90, 210 45 L 220 115 Z" fill="url(#bronze-ribbon-2)" opacity="0.8"/>
                                    <path d="M 40 115 Q 90 40, 160 65 Q 200 80, 220 35 L 220 115 Z" fill="url(#bronze-ribbon-1)"/>
                                    <path d="M 40 115 Q 90 40, 160 65 Q 200 80, 220 35" fill="none" stroke="rgba(255,200,150,0.4)" strokeWidth="1"/>
                                  </svg>
                                )}
                                
                                {/* Model Fine-Tuning - Deep green layered ribbons */}
                                {i === 3 && (
                                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 205 103" preserveAspectRatio="xMidYMid slice">
                                    <defs>
                                      <linearGradient id="green-ribbon-1" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#051510" />
                                        <stop offset="30%" stopColor="#106030" />
                                        <stop offset="55%" stopColor="#30a060" />
                                        <stop offset="80%" stopColor="#50d080" />
                                        <stop offset="100%" stopColor="#083020" />
                                      </linearGradient>
                                      <linearGradient id="green-ribbon-2" x1="10%" y1="90%" x2="90%" y2="10%">
                                        <stop offset="0%" stopColor="#031008" />
                                        <stop offset="40%" stopColor="#208050" />
                                        <stop offset="70%" stopColor="#40b070" />
                                        <stop offset="100%" stopColor="#0a2515" />
                                      </linearGradient>
                                    </defs>
                                    {/* Vertical flowing green ribbons */}
                                    <path d="M 60 115 Q 80 70, 100 85 Q 130 100, 150 55 Q 170 25, 210 40 L 210 115 Z" fill="url(#green-ribbon-1)" opacity="0.6"/>
                                    <path d="M 90 115 Q 110 55, 140 75 Q 175 90, 200 45 L 210 115 Z" fill="url(#green-ribbon-2)" opacity="0.8"/>
                                    <path d="M 110 115 Q 140 45, 170 65 Q 200 80, 220 35 L 220 115 Z" fill="url(#green-ribbon-1)"/>
                                    <path d="M 110 115 Q 140 45, 170 65 Q 200 80, 220 35" fill="none" stroke="rgba(150,255,180,0.35)" strokeWidth="1"/>
                                  </svg>
                                )}
                                
                                {/* Text label - top left, white, semi-bold */}
                                <div className="absolute top-4 left-4 z-10">
                                  <span className="text-white font-semibold text-sm leading-snug">
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