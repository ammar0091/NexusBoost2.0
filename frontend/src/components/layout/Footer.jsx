import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Rocket,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Mail,
  ArrowUpRight,
  Send,
  CheckCircle2,
} from "lucide-react";
import ScrollToTopButton from "../common/ScrollToTopButton";
import { subscribeNewsletter } from "@/services/contentApi";
import { useTheme } from "@/context/ThemeContext";

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const FOOTER_LINKS = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Careers", path: "/careers" },
  ],
  resources: [
    { name: "Blog", path: "/blogs" },
    { name: "Case Studies", path: "/portfolio" },
    { name: "Clients", path: "/clients" },
    { name: "Support", path: "/support" },
  ],
  legal: [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
  ],
};

const CATEGORY_LABELS = {
  company: "Company",
  resources: "Resources",
  legal: "Legal",
};

const SOCIAL_LINKS = [
  { icon: Twitter, url: "https://twitter.com" },
  { icon: Linkedin, url: "https://linkedin.com" },
  { icon: Instagram, url: "https://instagram.com" },
  { icon: Github, url: "https://github.com" },
];

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (!email) return;

    try {
      setStatus(STATUS.LOADING);
      setErrorMessage("");
      await subscribeNewsletter(email);
      setStatus(STATUS.SUCCESS);
      setEmail("");
      setTimeout(() => setStatus(STATUS.IDLE), 3000);
    } catch (error) {
      setStatus(STATUS.ERROR);
      setErrorMessage(error.message || "Subscription failed");
    }
  };

  return (
    <footer
      className={`pt-16 pb-10 border-t relative overflow-hidden ${
        isDark ? "bg-black border-neutral-900" : "bg-white border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-14">
          <div className="max-w-md">
            <Link to="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all shadow-lg shadow-blue-600/20">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className={`text-2xl font-black uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
                Nexus<span className="text-blue-500">Boost.</span>
              </span>
            </Link>

            <p className={`text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Accelerating digital growth with precision-engineered strategies and world-class
              design.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Subscribe to insights"
                required
                className={`w-full rounded-xl px-6 py-4 outline-none focus:border-blue-500 ${
                  isDark
                    ? "bg-white/5 border border-white/10 text-white"
                    : "bg-slate-50 border border-slate-200 text-slate-900"
                }`}
              />

              <button
                type="submit"
                disabled={status !== STATUS.IDLE}
                className={`absolute right-2 top-2 bottom-2 bg-blue-600 px-6 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-500 transition-all ${
                  isDark ? "disabled:bg-slate-800" : "disabled:bg-blue-300"
                }`}
              >
                {status === STATUS.IDLE && <Send size={14} />}
                {status === STATUS.LOADING && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {status === STATUS.SUCCESS && <CheckCircle2 size={14} />}
                <span>{status === STATUS.SUCCESS ? "Added" : "Join"}</span>
              </button>
            </form>
            {status === STATUS.ERROR ? (
              <p className="mt-3 text-sm text-red-400 font-medium">{errorMessage}</p>
            ) : null}
          </div>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-12 border-y ${
            isDark ? "border-white/5" : "border-slate-200"
          }`}
        >
          {Object.entries(FOOTER_LINKS).map(([key, links]) => (
            <div key={key}>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-6">
                {CATEGORY_LABELS[key]}
              </p>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`text-sm font-medium flex items-center gap-2 group w-fit ${
                        isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {link.name}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-6">
                Socials
              </p>
              <div className="flex gap-4 mb-8">
                {SOCIAL_LINKS.map(({ icon: Icon, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all ${
                      isDark ? "border-white/10 text-slate-400" : "border-slate-300 text-slate-600"
                    }`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <a
              href="mailto:hello@nexusboost.com"
              className={`text-lg font-bold hover:text-blue-400 transition-colors flex items-center gap-3 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              hello@nexusboost.com <Mail size={18} className="text-slate-500" />
            </a>
          </div>
        </div>

        <div className="pt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            &copy; {currentYear} Nexus Digital Group.
          </p>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                Systems Active
              </span>
            </div>
            <ScrollToTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
