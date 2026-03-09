import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Twitter, Linkedin, Instagram, Github, Mail, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import ScrollToTopButton from '../common/ScrollToTopButton';
import { subscribeNewsletter } from '@/services/contentApi';
import { useTheme } from '@/context/ThemeContext';

const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const FOOTER_LINKS = {
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
  ],
  resources: [
    { name: 'Blog', path: '/blogs' },
    { name: 'Clients', path: '/clients' },
    { name: 'Support', path: '/support' },
  ],
  legal: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms', path: '/terms' },
    { name: 'Cookies', path: '/cookies' },
  ],
};

const SOCIAL_LINKS = [
  { icon: Twitter, url: 'https://twitter.com' },
  { icon: Linkedin, url: 'https://linkedin.com' },
  { icon: Instagram, url: 'https://instagram.com' },
  { icon: Github, url: 'https://github.com' },
];

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (!email) return;

    try {
      setStatus(STATUS.LOADING);
      setErrorMessage('');
      await subscribeNewsletter(email);
      setStatus(STATUS.SUCCESS);
      setEmail('');
      setTimeout(() => setStatus(STATUS.IDLE), 2500);
    } catch (error) {
      setStatus(STATUS.ERROR);
      setErrorMessage(error.message || 'Subscription failed');
    }
  };

  return (
    <footer className={`nb-section border-t border-(--nb-border) ${isDark ? 'bg-black' : 'bg-(--nb-surface-soft)'}`}>
      <div className="nb-container">
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <span className="w-11 h-11 rounded-xl nb-accent-gradient flex items-center justify-center text-white">
                <Rocket size={20} />
              </span>
              <span className="text-2xl font-black text-(--nb-text)">NexusBoost.</span>
            </Link>
            <p className="nb-text-muted max-w-md">
              Modern digital design and growth execution for ambitious brands.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="nb-panel p-4 md:p-5">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Work email"
                  className="flex-1 rounded-xl border border-(--nb-border) bg-(--nb-surface-soft) px-4 py-3 outline-none focus:border-(--nb-accent)"
                />

                <button
                  type="submit"
                  disabled={status !== STATUS.IDLE}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--nb-accent) px-5 py-3 text-[11px] font-black uppercase tracking-widest text-slate-950 hover:brightness-110 disabled:opacity-70"
                >
                  {status === STATUS.IDLE && <Send size={14} />}
                  {status === STATUS.LOADING && (
                    <span className="w-4 h-4 rounded-full border-2 border-slate-900/30 border-t-slate-900 animate-spin" />
                  )}
                  {status === STATUS.SUCCESS && <CheckCircle2 size={14} />}
                  <span>{status === STATUS.SUCCESS ? 'Added' : 'Subscribe'}</span>
                </button>
              </form>
              {status === STATUS.ERROR ? <p className="mt-2 text-sm text-red-400">{errorMessage}</p> : null}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-10 border-y border-(--nb-border)">
          {Object.entries(FOOTER_LINKS).map(([key, links]) => (
            <div key={key}>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-(--nb-accent) mb-4">{key}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="group inline-flex items-center gap-2 text-sm nb-text-muted hover:text-(--nb-text)">
                      {link.name}
                      <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-(--nb-accent) mb-4">social</p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.url}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg border border-(--nb-border) flex items-center justify-center nb-text-muted hover:text-(--nb-text) hover:border-(--nb-accent) transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>

            <a href="mailto:hello@nexusboost.com" className="inline-flex items-center gap-2 text-sm font-bold text-(--nb-text) hover:text-(--nb-accent)">
              hello@nexusboost.com <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs nb-text-muted">� {currentYear} NexusBoost. All rights reserved.</p>
          <ScrollToTopButton />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
