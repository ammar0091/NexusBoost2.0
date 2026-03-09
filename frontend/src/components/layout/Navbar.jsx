import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Rocket, ArrowRight, LayoutGrid, Zap, Users, BookOpen, Briefcase } from 'lucide-react';
import ThemeToggle from '@/components/common/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

const navLinks = [
  { name: 'Home', path: '/', icon: <Zap size={16} /> },
  { name: 'About', path: '/about', icon: <Users size={16} /> },
  { name: 'Services', path: '/services', icon: <LayoutGrid size={16} /> },
  { name: 'Portfolio', path: '/portfolio', icon: <Briefcase size={16} /> },
  { name: 'Blog', path: '/blogs', icon: <BookOpen size={16} /> },
  { name: 'Clients', path: '/clients', icon: <Rocket size={16} /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-3 left-0 w-full z-50 px-3">
        <div
          className={`nb-container rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
            isDark ? 'bg-black/75 border-[var(--nb-border)]' : 'bg-white/80 border-[var(--nb-border)]'
          } ${scrolled ? 'py-2.5' : 'py-3.5'}`}
        >
          <div className="px-4 md:px-5 flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl nb-accent-gradient text-white flex items-center justify-center shadow-lg">
                <Rocket size={18} />
              </span>
              <span className="text-lg font-extrabold text-[var(--nb-text)] tracking-tight">
                NEXUS<span className="text-[var(--nb-accent)]">BOOST</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-[11px] font-extrabold uppercase tracking-widest transition-all ${
                      isActive
                        ? 'bg-[var(--nb-text)] text-[var(--nb-surface)]'
                        : 'text-[var(--nb-text-muted)] hover:text-[var(--nb-text)] hover:bg-[var(--nb-surface-soft)]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />

              <Link
                to="/contact"
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-widest bg-[var(--nb-accent)] text-slate-950 hover:brightness-110 transition-all"
              >
                Contact <ArrowRight size={14} />
              </Link>

              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="lg:hidden w-10 h-10 rounded-xl bg-[var(--nb-text)] text-[var(--nb-surface)] flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed top-20 left-3 right-3 z-40 lg:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="nb-container rounded-2xl border border-[var(--nb-border)] bg-[var(--nb-surface)] p-3">
          <div className="grid grid-cols-2 gap-2.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-[var(--nb-border)] bg-[var(--nb-surface-soft)] p-3.5 flex flex-col items-center justify-center gap-2 text-[var(--nb-text)]"
              >
                <span className="text-[var(--nb-accent)]">{link.icon}</span>
                <span className="text-[11px] font-bold uppercase tracking-wider">{link.name}</span>
              </NavLink>
            ))}

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="col-span-2 rounded-xl nb-accent-gradient text-white p-4 flex items-center justify-between"
            >
              <span className="text-sm font-bold">Start a project</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
