import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Cloud, SlidersHorizontal, Server, Zap, Wrench, Flag, MapPin, Sparkles, Building2, Factory, TrendingUp, Rocket } from 'lucide-react';

/* ------------------------------------------------------------------
   BluBridge Editorial Header — light theme (#f0f1f9)
   Content preserved: all nav labels, dropdown structure, CTA text
   ------------------------------------------------------------------ */

const AnimatedText = ({ text, isVisible }) => {
  const letters = text.split('');
  return (
    <span className="inline-flex">
      {letters.map((letter, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
            transition: `opacity 260ms ease, transform 260ms ease`,
            transitionDelay: isVisible ? `${index * 28}ms` : '0ms',
            minWidth: letter === ' ' ? '0.28em' : 'auto',
            color: '#0a1230',
            fontFamily: 'Geist, Inter, sans-serif',
            fontWeight: 500,
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
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const isCareers = location.pathname === '/careers';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setDropdownVisible(false);
      }
    };
    if (activeDropdown) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSubmenuOpen(null);
    setActiveDropdown(null);
    setDropdownVisible(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const solutionsItems = [
    { name: 'Model Customization', link: '/solutions#model-customization', Icon: SlidersHorizontal },
    { name: 'Value Realization',   link: '/solutions#value-realization',   Icon: TrendingUp },
    { name: 'Deployment',          link: '/solutions#deployment',          Icon: Rocket },
  ];

  const company = [
    { name: 'About Us', link: '/about-us' },
    { name: 'Careers',  link: '/careers' },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0"
        style={{
          zIndex: 1000,
          backgroundColor: 'rgba(240, 241, 249, 0.86)',
          backdropFilter: 'saturate(140%) blur(16px)',
          WebkitBackdropFilter: 'saturate(140%) blur(16px)',
          borderBottom: isCareers ? '1px solid transparent' : `1px solid ${isScrolled ? '#d4d8e8' : 'transparent'}`,
          transition: 'border-color 300ms ease, background-color 300ms ease',
        }}
      >
        {/* Announcement strip — retains existing text */}
        <div
          style={{
            backgroundColor: '#f0f1f9',
            color: '#0a1230',
            borderBottom: isCareers ? 'none' : '1px solid #d4d8e8',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '11.5px',
            letterSpacing: '0.08em',
            padding: '8px 24px',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          <span>Building Frontier AI Intelligence capabilities tailored for you</span>
        </div>

        <div className="bb-container">
          <nav
            className="flex items-center justify-between"
            style={{ height: isScrolled ? '64px' : '76px', transition: 'height 240ms ease' }}
          >
            {/* Logo (untouched) */}
            <Link to="/" className="relative flex items-center" style={{ width: '225px', height: '31px' }}>
              <div
                className="absolute inset-0 flex items-center"
                style={{
                  opacity: isScrolled ? 0 : 1,
                  transform: isScrolled ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'opacity 320ms ease, transform 320ms ease',
                  pointerEvents: isScrolled ? 'none' : 'auto',
                }}
              >
                <img src="/images/blubridge-logo.svg" alt="BluBridge" style={{ width: '225px', height: '31px', objectFit: 'contain' }} />
              </div>
              <div
                className="absolute inset-0 flex items-center"
                style={{
                  opacity: isScrolled ? 1 : 0,
                  transform: isScrolled ? 'translateY(0)' : 'translateY(2px)',
                  transition: 'opacity 320ms ease, transform 320ms ease',
                  pointerEvents: isScrolled ? 'auto' : 'none',
                }}
              >
                <img src="/images/b-icon.svg" alt="BluBridge" style={{ height: '31px', width: 'auto', objectFit: 'contain' }} />
              </div>
            </Link>

            {/* Desktop nav */}
            <div ref={dropdownRef} className="hidden lg:flex items-center gap-9">
              {/* Solutions */}
              <div
                className="relative"
                onMouseEnter={() => { setActiveDropdown('solutions'); setTimeout(() => setDropdownVisible(true), 10); }}
                onMouseLeave={() => { setDropdownVisible(false); setTimeout(() => setActiveDropdown(null), 220); }}
              >
                <button
                  data-testid="nav-solutions"
                  className="flex items-center gap-1.5 text-[14px] font-medium text-bb-ink hover:text-bb-accent transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Link to="/solutions">Solutions</Link>
                  <ChevronDown className="w-3.5 h-3.5" style={{ transform: activeDropdown === 'solutions' ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms ease' }} />
                </button>
                {activeDropdown === 'solutions' && (
                  <div className="absolute pt-4" style={{ width: '320px', left: '50%', transform: 'translateX(-50%)', top: '100%' }}>
                    <div
                      className="bb-panel"
                      style={{
                        padding: '10px',
                        opacity: dropdownVisible ? 1 : 0,
                        transform: dropdownVisible ? 'translateY(0)' : 'translateY(-6px)',
                        transition: 'opacity 220ms ease, transform 220ms ease',
                        boxShadow: '0 12px 40px -8px rgba(10, 18, 48, 0.12)',
                      }}
                    >
                      {solutionsItems.map((item) => {
                        const Icon = item.Icon;
                        return (
                          <Link key={item.name} to={item.link} className="group block">
                            <div
                              className="flex items-center justify-between gap-3 px-3 py-3 rounded-md transition-colors hover:bg-bb-bg-subtle"
                              data-testid={`nav-solutions-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: 'var(--bb-accent-soft)' }}>
                                  <Icon className="w-4 h-4 text-bb-accent" strokeWidth={1.6} />
                                </div>
                                <span className="text-[14px] font-medium text-bb-ink">{item.name}</span>
                              </div>
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-bb-accent font-mono text-xs">→</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Products */}
              <div
                className="relative"
                onMouseEnter={() => { setActiveDropdown('products'); setTimeout(() => setDropdownVisible(true), 10); }}
                onMouseLeave={() => { setDropdownVisible(false); setTimeout(() => setActiveDropdown(null), 220); }}
              >
                <button data-testid="nav-products" className="flex items-center gap-1.5 text-[14px] font-medium text-bb-ink hover:text-bb-accent transition-colors">
                  <span>Products</span>
                  <ChevronDown className="w-3.5 h-3.5" style={{ transform: activeDropdown === 'products' ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms ease' }} />
                </button>
                {activeDropdown === 'products' && (
                  <div className="absolute pt-4" style={{ width: '420px', left: '50%', transform: 'translateX(-50%)', top: '100%' }}>
                    <div
                      className="bb-panel"
                      style={{
                        padding: '48px 24px',
                        textAlign: 'center',
                        opacity: dropdownVisible ? 1 : 0,
                        transform: dropdownVisible ? 'translateY(0)' : 'translateY(-6px)',
                        transition: 'opacity 220ms ease, transform 220ms ease',
                        boxShadow: '0 12px 40px -8px rgba(10, 18, 48, 0.12)',
                      }}
                    >
                      <span style={{ fontSize: '24px', fontFamily: 'Geist, sans-serif', fontWeight: 500 }}>
                        <AnimatedText text="Coming Soon" isVisible={dropdownVisible} />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/research" data-testid="nav-research" className="text-[14px] font-medium text-bb-ink hover:text-bb-accent transition-colors">
                Research
              </Link>

              {/* Company */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('company')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button data-testid="nav-company" className="flex items-center gap-1.5 text-[14px] font-medium text-bb-ink hover:text-bb-accent transition-colors">
                  <span>Company</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {activeDropdown === 'company' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4" style={{ width: '220px' }}>
                    <div className="bb-panel" style={{ padding: '10px', boxShadow: '0 12px 40px -8px rgba(10, 18, 48, 0.12)' }}>
                      {company.map((item) => (
                        <Link
                          key={item.name}
                          to={item.link}
                          data-testid={`nav-company-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-3 py-2 rounded-md text-[14px] text-bb-ink hover:bg-bb-bg-subtle hover:text-bb-accent transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/contact" data-testid="nav-contact-cta" className="bb-btn-primary" style={isCareers ? { borderRadius: '3px' } : undefined}>
                Contact <span aria-hidden style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px' }}>→</span>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-bb-ink p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              data-testid="nav-mobile-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 lg:hidden"
          style={{ zIndex: 9998, top: '104px', background: 'rgba(10, 18, 48, 0.35)' }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile panel */}
      <div
        className={`fixed top-[104px] right-0 bottom-0 w-[88vw] max-w-[380px] lg:hidden overflow-y-auto transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ zIndex: 9999, background: '#ffffff', borderLeft: '1px solid #d4d8e8' }}
      >
        <div className="p-7 space-y-6">
          {/* Solutions */}
          <div>
            <button
              onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === 'solutions' ? null : 'solutions')}
              className="flex items-center justify-between w-full text-bb-ink text-[17px] font-medium"
            >
              <span>Solutions</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${mobileSubmenuOpen === 'solutions' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSubmenuOpen === 'solutions' && (
              <div className="mt-4 space-y-1 pl-2 border-l border-bb-line">
                {solutionsItems.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.link}
                      className="flex items-center gap-3 py-2.5 pl-3 text-[14px] text-bb-ink-2 hover:text-bb-accent"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Products */}
          <div>
            <button
              onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === 'products' ? null : 'products')}
              className="flex items-center justify-between w-full text-bb-ink text-[17px] font-medium"
            >
              <span>Products</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${mobileSubmenuOpen === 'products' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSubmenuOpen === 'products' && (
              <div className="mt-4 pl-2 border-l border-bb-line">
                <span className="pl-3 text-bb-ink-3 text-[14px] font-mono">Coming Soon</span>
              </div>
            )}
          </div>

          {/* Research */}
          <Link
            to="/research"
            className="block text-bb-ink text-[17px] font-medium hover:text-bb-accent"
            onClick={() => setMobileMenuOpen(false)}
          >
            Research
          </Link>

          {/* Company */}
          <div>
            <button
              onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === 'company' ? null : 'company')}
              className="flex items-center justify-between w-full text-bb-ink text-[17px] font-medium"
            >
              <span>Company</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${mobileSubmenuOpen === 'company' ? 'rotate-180' : ''}`} />
            </button>
            {mobileSubmenuOpen === 'company' && (
              <div className="mt-4 space-y-1 pl-2 border-l border-bb-line">
                {company.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="block py-2 pl-3 text-[14px] text-bb-ink-2 hover:text-bb-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-bb-line">
            <Link to="/contact" className="bb-btn-primary w-full justify-center" onClick={() => setMobileMenuOpen(false)}>
              Contact <span aria-hidden style={{ fontFamily: 'IBM Plex Mono' }}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
