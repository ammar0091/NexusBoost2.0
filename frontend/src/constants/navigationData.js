import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  FileText,
  Github,
  Home,
  Instagram,
  LayoutDashboard,
  LayoutGrid,
  Linkedin,
  Mail,
  Newspaper,
  PersonStanding,
  Twitter,
  Users,
} from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: Users },
  { name: 'Services', path: '/services', icon: LayoutGrid },
  { name: 'Portfolio', path: '/portfolio', icon: Briefcase },
  { name: 'Blog', path: '/blogs', icon: BookOpen },
  { name: 'Clients', path: '/clients', icon: PersonStanding },
];

export const ADMIN_NAV_ITEMS = [
  { path: '/admin/overview', label: 'Overview', icon: LayoutDashboard },
  { path: '/admin/blogs', label: 'Blogs', icon: FileText },
  { path: '/admin/projects', label: 'Projects', icon: Briefcase },
  { path: '/admin/team', label: 'Team', icon: Users },
  { path: '/admin/clients', label: 'Clients', icon: ArrowUpRight },
  { path: '/admin/contacts', label: 'Contacts', icon: Mail },
  { path: '/admin/newsletters', label: 'Newsletters', icon: Newspaper },
];

export const FOOTER_LINKS = {
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

export const SOCIAL_LINKS = [
  { icon: Twitter, url: 'https://twitter.com' },
  { icon: Linkedin, url: 'https://linkedin.com' },
  { icon: Instagram, url: 'https://instagram.com' },
  { icon: Github, url: 'https://github.com' },
];

export const FOOTER_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
