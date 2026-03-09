import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Rocket, ArrowRight, LayoutGrid, Zap, Users, BookOpen, Briefcase } from 'lucide-react';
import ThemeToggle from '@/components/common/ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Zap size={20} /> },
    { name: 'About', path: '/about', icon: <Users size={20} /> },
    { name: 'Services', path: '/services', icon: <LayoutGrid size={20} /> },
    { name: 'Portfolio', path: '/portfolio', icon: <Briefcase size={20} /> },
    { name: 'Blog', path: '/blogs', icon: <BookOpen size={20} /> },
    { name: 'Clients', path: '/clients', icon: <Rocket size={20} /> },
  ];

  return (
    <>
      <nav className={`fixed w-full z-100 transition-all duration-500 ${scrolled ? 'py-4 bg-white/70 backdrop-blur-md border-b border-slate-100 shadow-sm' : 'py-8 bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group z-110">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              NEXUS<span className="text-blue-600">BOOST.</span>
            </span>
          </Link>

          {/* Desktop Links (Clean & Professional) */}
          <div className="hidden lg:flex items-center gap-2 p-1.5 ">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `
                  px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all
                  ${isActive ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle className="z-110 shadow-sm" />

            {/* Contact Button */}
            <div className="hidden lg:block">
              <Link to="/contact" className="bg-slate-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">
                Get Started
              </Link>
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden z-110 w-12 h-12 flex items-center justify-center bg-slate-900 rounded-full text-white shadow-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DASHBOARD MENU (The "Khatarnak" Part) */}
      <div className={`fixed inset-0 z-50 bg-white/95 backdrop-blur-xl lg:hidden transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
        }`}>
        <div className="flex flex-col pt-20 px-6 pb-8">

          {/* Header */}
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 m-6 text-center">Main Menu</p>

          {/* Bento Grid Menu */}
          <div className="grid grid-cols-2 gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-gray-200 shadow hover:shadow-lg transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                  {link.icon}
                </div>
                <span className="mt-2 text-sm font-semibold text-gray-900 text-center">{link.name}</span>
              </NavLink>
            ))}

            {/* Contact/Action Card */}
            <NavLink
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="col-span-2 flex items-center justify-between p-4 rounded-2xl bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex flex-col">
                <span className="text-lg font-bold">Work with us</span>
                <span className="text-sm opacity-90">Let's build something amazing.</span>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <ArrowRight size={24} />
              </div>
            </NavLink>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex justify-center gap-6 text-gray-400">
            {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
              <span key={social} className="text-[10px] font-bold uppercase tracking-widest hover:text-blue-600 transition-colors cursor-pointer">
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default Navbar;
