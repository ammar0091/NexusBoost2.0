import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Menu,
  X,
  Rocket,
  PersonStanding,
  ArrowRight,
  LayoutGrid,
  Home,
  Users,
  BookOpen,
  Briefcase,
} from "lucide-react";

import ThemeToggle from "@/components/common/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { name: "Home", path: "/", icon: <Home size={18} /> },
  { name: "About", path: "/about", icon: <Users size={18} /> },
  { name: "Services", path: "/services", icon: <LayoutGrid size={18} /> },
  { name: "Portfolio", path: "/portfolio", icon: <Briefcase size={18} /> },
  { name: "Blog", path: "/blogs", icon: <BookOpen size={18} /> },
  { name: "Clients", path: "/clients", icon: <PersonStanding size={18} /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled
            ? isDark
              ? "bg-black/90 backdrop-blur-lg border-b border-(--nb-border)"
              : "bg-white/90 backdrop-blur-lg border-b border-(--nb-border)"
            : "bg-transparent"
          }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between h-18">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-xl nb-accent-gradient text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
              <Rocket size={18} />
            </span>

            <span className="text-xl font-extrabold tracking-tight text-(--nb-text)">
              NEXUS<span className="text-(--nb-accent)">BOOST</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-2">

            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {({ isActive }) => (
                  <span
                    className={`relative px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all
                    ${isActive
                        ? "text-(--nb-accent) bg-(--nb-surface-soft)"
                        : "text-(--nb-text-muted) hover:text-(--nb-text) hover:bg-(--nb-surface-soft)"
                      }`}
                  >
                    {link.icon}
                    {link.name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* CTA */}
            <Link
              to="/contact"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold nb-accent-gradient text-white transition-all"
            >
              Contact
              <ArrowRight size={16} />
            </Link>

            <ThemeToggle />

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-(--nb-text) text-(--nb-surface) flex items-center justify-center"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </div>

        {/*  BORDER */}
        <div
          className={`h-px w-full border-t border-(--nb-border) transition-all duration-300 ${scrolled ? "opacity-100" : "opacity-0"
            }`}
        ></div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300
        ${isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className={`absolute top-0 right-0 w-[85%] h-full
          ${isDark ? "bg-black" : "bg-white"}
          shadow-xl p-6 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >

          <div className="flex flex-col gap-4 mt-16">

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-(--nb-text) font-medium hover:bg-(--nb-surface-soft)"
              >
                <span className="text-(--nb-accent)">
                  {link.icon}
                </span>
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 nb-accent-gradient text-white rounded-xl py-3 font-semibold"
            >
              Contact
              <ArrowRight size={18} />
            </Link>

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;