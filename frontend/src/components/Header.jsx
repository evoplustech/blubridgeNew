import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Cloud, SlidersHorizontal, Server, Zap, Wrench, Flag, MapPin, Sparkles, Building2, Factory } from 'lucide-react';

// Animated Letter Component for "Coming Soon" text with shimmer effect
const AnimatedText = ({ text, isVisible }) => {
  const letters = text.split('');
  
  return (
    <span className="inline-flex shimmer-text-container">
      {letters.map((letter, index) => (
        <span
          key={index}
          className="shimmer-letter"
          style={{
            display: 'inline-block',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: `opacity 280ms cubic-bezier(0.4, 0, 0.2, 1), transform 280ms cubic-bezier(0.4, 0, 0.2, 1)`,
            transitionDelay: isVisible ? `${index * 30}ms` : '0ms',
            minWidth: letter === ' ' ? '0.3em' : 'auto',
            // background: 'linear-gradient(90deg, #c9a57e 0%, #bd8346 20%, #e8c9a0 50%, #bd8346 80%, #c9a57e 100%)',
            background: 'linear-gradient(90deg, #0b1f3b 0%, #081729 20%, #0d2847 50%, #081729 80%, #0b1f3b 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: isVisible ? 'shimmer 2.5s ease-in-out infinite' : 'none',
            animationDelay: `${index * 50}ms`
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setDropdownVisible(false);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Handle dropdown toggle
  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setDropdownVisible(false);
      setTimeout(() => setActiveDropdown(null), 250);
    } else {
      setActiveDropdown(name);
      setTimeout(() => setDropdownVisible(true), 10);
    }
  };

  // Scroll detection for logo transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
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

  // Close dropdowns when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSubmenuOpen(null);
    setActiveDropdown(null);
    setDropdownVisible(false);
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
        <span>BluBridge is currently focusing on developing a state-of-the-art 70B parameter Large Language Model</span>
        <Link to="/contact" className="ml-2 underline hover:no-underline">See More →</Link>
      </div>

      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo with scroll-based switch behavior */}
          <Link to="/" className="relative flex items-center" style={{ width: '180px', height: '40px' }}>
            {/* Primary BLUBRIDGE wordmark - visible at top */}
            <div 
              className="absolute inset-0 flex items-center"
              style={{
                opacity: isScrolled ? 0 : (hasAnimated ? 1 : 0),
                transform: isScrolled 
                  ? 'translateY(-3px)' 
                  : (hasAnimated ? 'translateY(0)' : 'translateY(3px)'),
                transition: 'opacity 350ms cubic-bezier(0.4, 0, 0.2, 1), transform 350ms cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: isScrolled ? 'none' : 'auto'
              }}
            >
              <img 
                src="/images/blubridge-wordmark.png"
                alt="BluBridge"
                style={{ height: '23px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            
            {/* Compact B icon - visible on scroll */}
            <div 
              className="absolute inset-0 flex items-center"
              style={{
                opacity: isScrolled ? 1 : 0,
                transform: isScrolled ? 'translateY(0)' : 'translateY(3px)',
                transition: 'opacity 350ms cubic-bezier(0.4, 0, 0.2, 1), transform 350ms cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: isScrolled ? 'auto' : 'none'
              }}
            >
              <img 
                src="/images/b-icon.png"
                alt="BluBridge"
                style={{ height: '23px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            

            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => { setActiveDropdown('products'); setTimeout(() => setDropdownVisible(true), 10); }}
              onMouseLeave={() => { setDropdownVisible(false); setTimeout(() => setActiveDropdown(null), 250); }}
            >
              <button className="flex items-center space-x-1 text-[#0B1F3B] hover:text-[#328CC1] transition-colors">
                <span>Products</span>
                <ChevronDown 
                  className="w-4 h-4 transition-transform duration-250" 
                  style={{ transform: activeDropdown === 'products' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              
              {activeDropdown === 'products' && (
                <div 
                  className="absolute pt-3" 
                  style={{ 
                    width: '500px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    top: '100%', 
                    zIndex: 1000 
                  }}
                >
                  <div 
                    className="bg-[#fffdf7] rounded-xl shadow-lg border border-[#e8e6de] relative overflow-hidden"
                    style={{ 
                      height: '200px',
                      opacity: dropdownVisible ? 1 : 0,
                      transform: dropdownVisible ? 'translateY(0)' : 'translateY(-10px)',
                      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {/* Coming Soon Text - Letter by Letter Animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-medium text-[#0B1F3B]">
                        <AnimatedText text="Coming Soon" isVisible={dropdownVisible} />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => { setActiveDropdown('solutions'); setTimeout(() => setDropdownVisible(true), 10); }}
              onMouseLeave={() => { setDropdownVisible(false); setTimeout(() => setActiveDropdown(null), 250); }}
            >
              <button className="flex items-center space-x-1 text-[#0B1F3B] hover:text-[#328CC1] transition-colors">
                <span>Solutions</span>
                <ChevronDown 
                  className="w-4 h-4 transition-transform duration-250" 
                  style={{ transform: activeDropdown === 'solutions' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              
              {activeDropdown === 'solutions' && (
                <div 
                  className="absolute pt-3" 
                  style={{ 
                    width: '500px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    top: '100%', 
                    zIndex: 1000 
                  }}
                >
                  <div 
                    className="bg-[#fffdf7] rounded-xl shadow-lg border border-[#e8e6de] relative overflow-hidden"
                    style={{ 
                      height: '200px',
                      opacity: dropdownVisible ? 1 : 0,
                      transform: dropdownVisible ? 'translateY(0)' : 'translateY(-10px)',
                      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {/* Coming Soon Text - Letter by Letter Animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-medium text-[#0B1F3B]">
                        <AnimatedText text="Coming Soon" isVisible={dropdownVisible} />
                      </span>
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