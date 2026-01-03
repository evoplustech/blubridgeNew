import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Cloud, SlidersHorizontal, Server, Zap, Wrench, Flag, MapPin, Sparkles, Building2, Factory } from 'lucide-react';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const location = useLocation();

  // Scroll detection for logo transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100; // Trigger after hero section
      const scrolled = window.scrollY > scrollThreshold;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial load animation trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
      icon: Sparkles,
      items: [
        { name: 'Serverless Inference', link: '/products/serverless', desc: 'API endpoints for instant and scalable AI inference.', icon: Cloud },
        { name: 'Fine-tuning', link: '/products/fine-tuning', desc: 'On-demand, serverless fine-tuning', icon: SlidersHorizontal }
      ]
    },
    {
      title: 'AI Private Cloud',
      subtitle: 'Reserved large scale GPU clusters purpose-built for AI.',
      link: '/products/training',
      icon: Building2,
      items: [
        { name: 'Training Clusters', link: '/products/training', desc: 'Easy to deploy GPU clusters with SLURM scheduler.', icon: Server },
        { name: 'Inference Clusters', link: '/products/inference', desc: 'Autoscaling dedicated inference clusters.', icon: Zap },
        { name: 'Bare metal Clusters', link: '/products/gpu-nodes', desc: 'Scalable, high performance bare metal GPU clusters.', icon: Wrench }
      ]
    },
    {
      title: 'Infrastructure',
      subtitle: 'Data centres and sovereign cloud solutions.',
      link: '/products/sovereign-cloud',
      icon: Factory,
      items: [
        { name: 'Sovereign Cloud', link: '/products/sovereign-cloud', desc: 'Complete jurisdictional control for regulated workloads.', icon: Flag },
        { name: 'Glomfjord', link: '/products/glomfjord', desc: 'Powered by 100% renewable energy.', icon: MapPin },
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
    // { name: 'Join Our Team', link: '/joinourteam' },
    { name: 'Careers', link: '/careers' }
  ];

  return (
    <>
    <header className="fixed top-0 left-0 right-0 bg-[#efede5] shadow-sm border-b border-[#D6DEC3]" style={{ zIndex: 1000 }}>
      {/* Top banner */}
      <div className="bg-[#0B1F3B] text-white py-2 px-6 text-center text-sm">
        <span>BluBridge contracts approximately 200,000 NVIDIA GB300 GPUs with Microsoft</span>
        <Link to="/news" className="ml-2 underline hover:no-underline">See More →</Link>
      </div>

      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo with scroll-based switch behavior */}
          <Link to="/" className="relative flex items-center" style={{ width: '180px', height: '40px' }}>
            {/* Primary logo - visible at top */}
            <div 
              className="absolute inset-0 flex items-center"
              style={{
                opacity: isScrolled ? 0 : (hasAnimated ? 1 : 0),
                transform: isScrolled 
                  ? 'translateY(-6px)' 
                  : (hasAnimated ? 'translateY(0)' : 'translateY(6px)'),
                transition: 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: isScrolled ? 'none' : 'auto'
              }}
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_visual-swap-4/artifacts/8j6y1qxx_logo3.png"
                alt="BluBridge"
                style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            
            {/* B-icon logo - visible on scroll */}
            <div 
              className="absolute inset-0 flex items-center"
              style={{
                opacity: isScrolled ? 1 : 0,
                transform: isScrolled ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: isScrolled ? 'auto' : 'none'
              }}
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_visual-swap-4/artifacts/ivtn213o_B-icon.png"
                alt="BluBridge"
                style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            

            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-[#0B1F3B] hover:text-[#328CC1] transition-colors">
                <span>Products</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'products' && (
                <div className="fixed pt-4" style={{ width: '950px', left: '50%', transform: 'translateX(-50%)', top: '80px', zIndex: 1000 }}>
                  <div className="bg-white rounded-lg shadow-xl border border-[#D6DEC3] p-8 grid grid-cols-3 gap-8">
                    {products.map((section, idx) => (
                      <div key={idx}>
                        <h3 className="text-[#0B1F3B] font-semibold mb-2">{section.title}</h3>
                        <p className="text-[#5B6B7A] text-sm mb-4">{section.subtitle}</p>
                        <div className="space-y-3">
                          {section.items.map((item, i) => {
                            const IconComponent = item.icon;
                            return (
                            <Link
                              key={i}
                              to={item.link}
                              className="block text-[#243447] hover:text-[#328CC1] transition-colors text-sm"
                            ><div className="bg-[#f3f1e9] hover:bg-[#e8e6de] rounded-lg px-3 py-2">
                              <div className="font-medium flex items-center gap-2">
                                <IconComponent className="w-4 h-4 text-[#0B1F3B]" />
                                {item.name}
                              </div>
                              <div className="text-xs text-[#5B6B7A] ml-6">{item.desc}</div>
                              </div>
                            </Link>
                          )})}
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
              <button className="flex items-center space-x-1 text-[#0B1F3B] hover:text-[#328CC1] transition-colors">
                <span>Solutions</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'solutions' && (
                <div 
                  className="fixed pt-4" 
                  style={{ width: '950px', left: '50%', transform: 'translateX(-50%)', top: '80px', zIndex: 1000 }}
                >
                  <div 
                    className="shadow-xl overflow-hidden bg-white rounded-lg border border-[#D6DEC3]"
                    style={{ 
                      padding: '20px 28px 30px 28px'
                    }}
                  >
                    <div className="flex gap-10">
                      <div style={{ flex: '0 0 430px' }}>
                        <h3 className="text-[#0B1F3B] font-medium mb-6 text-base">By Use Case</h3>
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
                                  background: '#f3f1e9'
                                }}
                              >
                                {/* Model Training */}
                                {i === 0 && (
                                  <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/eylbs7nd_Training.avif')` }} />
                                )}
                                
                                {/* AI & ML Inference */}
                                {i === 1 && (
                                  <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/wbzmtk9k_INFERENCE.avif')` }} />
                                )}
                                
                                {/* AI Development */}
                                {i === 2 && (
                                  <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/eaznhozl_AI%20Development.avif')` }} />
                                )}
                                
                                {/* Model Fine-Tuning */}
                                {i === 3 && (
                                  <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_cd93f91c-cb8a-4b14-b67f-aec7ee50893c/artifacts/wde7a5kz_Finetuning.avif')` }} />
                                )}
                                
                                {/* Text label - top left, white, semi-bold */}
                                <div className="absolute top-4 left-4 z-10">
                                  <span className="text-white font-semibold text-sm leading-snug drop-shadow-md">
                                    {item.name}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div style={{ flex: '1' }}>
                        <h3 className="text-[#0B1F3B] font-medium mb-6 text-base">By Industry</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          {solutions.industry.map((item, i) => (
                            <Link
                              key={i}
                              to={item.link}
                              className="hover:text-[#328CC1] block text-[#0B1F3B] rounded-lg transition-all duration-150 cursor-pointer hover:bg-[#e8e6de]"
                              style={{ 
                                background: '#f3f1e9',
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

            {/* Research Link */}
            <Link to="/research" className="text-[#0B1F3B] hover:text-[#328CC1] transition-colors">
              Research
            </Link>

            {/* Company Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-[#0B1F3B] hover:text-[#328CC1] transition-colors">
                <span>Company</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'company' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[250px]">
                  <div className="bg-white rounded-lg shadow-xl border border-[#D6DEC3] p-6">
                    <div className="space-y-2">
                      {company.map((item, i) => (
                        <Link
                          key={i}
                          to={item.link}
                          className="block text-[#243447] hover:text-[#328CC1] transition-colors text-sm py-2 px-3 rounded hover:bg-[#f3f1e9]"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* <Link to="/docs" className="text-white/90 hover:text-white transition-colors">Docs</Link> */}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              to="/contact" 
              className="px-6 py-2.5 bg-[#0B1F3B] text-white rounded-md font-medium hover:bg-[#162B4D] transition-colors"
            >
              Contact
            </Link>
            {/* <Link 
              to="/login" 
              className="px-6 py-2.5 text-white hover:text-[#0066FF] transition-colors flex items-center space-x-2"
            >
              <span>Login</span>
              <span>→</span>
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#0B1F3B] p-2"
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
        className="fixed inset-0 bg-black/20 lg:hidden"
        style={{ zIndex: 1100, top: '104px' }}
        onClick={() => setMobileMenuOpen(false)}
      />
    )}

    {/* Mobile Menu Panel - Rendered outside header for proper z-index */}
    <div 
      className={`fixed top-[104px] right-0 bottom-0 w-80 max-w-[85vw] bg-white lg:hidden shadow-xl border-l border-[#D6DEC3] transition-transform duration-300 ease-in-out overflow-y-auto ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`} 
      style={{ zIndex: 1200 }}
    >
        <div className="p-6 space-y-6">
          {/* Products */}
          <div>
            <button
              onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === 'products' ? null : 'products')}
              className="flex items-center justify-between w-full text-[#0B1F3B] text-lg font-medium"
            >
              <span>Products</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${mobileSubmenuOpen === 'products' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSubmenuOpen === 'products' && (
              <div className="mt-4 space-y-4 pl-4">
                {products.map((section, idx) => (
                  <div key={idx}>
                    <div className="text-[#243447] font-semibold text-sm mb-2">{section.title}</div>
                    {section.items.map((item, i) => (
                      <Link
                        key={i}
                        to={item.link}
                        className="block text-[#5B6B7A] hover:text-[#328CC1] py-1 text-sm"
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
              className="flex items-center justify-between w-full text-[#0B1F3B] text-lg font-medium"
            >
              <span>Solutions</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${mobileSubmenuOpen === 'solutions' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSubmenuOpen === 'solutions' && (
              <div className="mt-4 space-y-4 pl-4">
                <div>
                  <div className="text-[#243447] font-semibold text-sm mb-2">Cases</div>
                  {solutions.useCase.map((item, i) => (
                    <Link
                      key={i}
                      to={item.link}
                      className="block text-[#5B6B7A] hover:text-[#328CC1] py-2 text-sm"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div>
                  <div className="text-[#243447] font-semibold text-sm mb-2">Industry</div>
                  {solutions.industry.map((item, i) => (
                    <Link
                      key={i}
                      to={item.link}
                      className="block text-[#5B6B7A] hover:text-[#328CC1] py-2 text-sm"
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
              className="flex items-center justify-between w-full text-[#0B1F3B] text-lg font-medium"
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
                    className="block text-[#5B6B7A] hover:text-[#328CC1] py-1 text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Direct Links */}
          <Link to="/contact" className="block text-[#0B1F3B] text-lg font-medium">Contact</Link>
          <Link to="/docs" className="block text-[#0B1F3B] text-lg font-medium">Docs</Link>

          {/* Mobile CTA Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#D6DEC3]">
            <Link 
              to="/contact" 
              className="block w-full px-6 py-3 bg-[#0B1F3B] text-white rounded-md font-medium text-center hover:bg-[#162B4D]"
            >
              Contact
            </Link>
            <Link 
              to="/login" 
              className="block w-full px-6 py-3 border border-[#0B1F3B] text-[#0B1F3B] rounded-md font-medium text-center hover:bg-[#f3f1e9]"
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