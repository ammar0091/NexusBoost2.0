import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowRight, MoveRight, ExternalLink, Zap } from 'lucide-react';

import ThemeToggle from '@/components/common/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import { NAV_LINKS } from '@/constants/navigationData';
import brandLogoLight from '@/assets/brand/nexusboost-logo-light.svg';
import brandLogoDark from '@/assets/brand/nexusboost-logo-dark.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark } = useTheme();
  const brandLogo = isDark ? brandLogoDark : brandLogoLight;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body Scroll Lock when Menu is Open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out
        ${scrolled
            ? isDark
              ? 'bg-black/90 py-5 border-b border-(--nb-border) shadow-[0_10px_40px_-15px_rgba(0,0,0,0.45)] backdrop-blur-lg'
              : 'bg-white/90 py-5 border-b border-(--nb-border) shadow-[0_10px_40px_-15px_rgba(0,0,0,0.14)] backdrop-blur-lg'
            : 'bg-transparent py-8'
          }`}
      >
        <div className="max-w-360 mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          <Link to="/" className="relative z-60 shrink-0 transition-transform active:scale-90">
            <img 
              src={brandLogo} 
              alt="NexusBoost" 
              className={`w-auto object-contain transition-all duration-500 ${scrolled ? 'h-9' : 'h-11'}`} 
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.name} to={link.path} className="relative group px-5 py-2">
                {({ isActive }) => (
                  <>
                    <span className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300
                      ${isActive ? 'text-(--nb-accent)' : 'text-(--nb-text) group-hover:text-(--nb-accent)'}`}>
                      {link.name}
                    </span>
                    <span className={`absolute bottom-0 left-5 right-5 h-0.5 bg-(--nb-accent) transition-all duration-500 origin-left 
                      ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} 
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
               <ThemeToggle />
            </div>

            <Link
              to="/contact"
              className="group hidden lg:flex items-center gap-3 overflow-hidden rounded-full bg-(--nb-text) px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-(--nb-surface) transition-all hover:bg-(--nb-accent) hover:text-white active:scale-95 shadow-xl"
            >
              Consult Us
              <MoveRight size={14} className="transition-transform group-hover:translate-x-1.5" />
            </Link>

            {/* MOBILE TOGGLE BUTTON */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full bg-(--nb-text) text-(--nb-surface) shadow-lg transition-transform active:scale-90"
            >
               <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU: RIGHT DRAWER */}
      <div className={`fixed inset-0 z-100 lg:hidden transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500" onClick={() => setIsOpen(false)} />
        
        {/* Drawer Panel */}
        <div className={`absolute top-0 right-0 h-full w-[85%] sm:w-105 ${isDark ? 'bg-neutral-950 text-white' : 'bg-white text-black'} p-8 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            
            {/* Drawer Header: Logo + Theme + Close */}
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-(--nb-accent)" fill="currentColor" />
                <span className="text-xl font-black tracking-tighter">NEXUS<span className="text-(--nb-accent)">BOOST</span></span>
              </div>
              
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-(--nb-border) hover:bg-red-500/10 hover:text-red-500 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Links Section */}
            <div className="flex flex-col space-y-1">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-(--nb-accent) opacity-60">Menu</p>
              {NAV_LINKS.map((link, idx) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `group flex items-center justify-between rounded-2xl p-4 transition-all ${isActive ? 'bg-(--nb-accent)/10' : 'hover:bg-(--nb-surface-soft)'}`}
                >
                  <div className="flex items-center gap-5">
                    <span className={`text-[11px] font-bold opacity-30`}>0{idx + 1}</span>
                    <span className="text-2xl font-black uppercase tracking-tight">{link.name}</span>
                  </div>
                  <ExternalLink size={18} className={`opacity-0 group-hover:opacity-100 text-(--nb-accent) transition-opacity`} />
                </NavLink>
              ))}
            </div>

            {/* Footer: Contact Info & CTA */}
            <div className="mt-auto pt-10 border-t border-(--nb-border)">
              <div className="mb-8 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-(--nb-text-muted)">Get in touch</p>
                <a href="mailto:hello@nexusboost.com" className="text-lg font-bold hover:text-(--nb-accent) transition-colors">hello@nexusboost.com</a>
              </div>

              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)} 
                className="flex items-center justify-center gap-3 w-full bg-(--nb-accent) text-white rounded-2xl py-5 font-black uppercase tracking-widest text-xs shadow-xl shadow-(--nb-accent)/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Let's Talk <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
