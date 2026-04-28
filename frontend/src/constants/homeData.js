import {
  BarChart3,
  BriefcaseBusiness,
  Code2,
  Compass,
  Eye,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Megaphone,
  Rocket,
  Search,
  SearchCheck,
  Target,
  Zap,
  Wrench,
} from 'lucide-react';

export const HOME_TRUST_STATS = [
  {
    value: '120+',
    label: 'SEO and website projects delivered',
    icon: BriefcaseBusiness,
    tone: 'text-[var(--nb-accent)]',
  },
  {
    value: '95%',
    label: 'Client retention across ongoing growth work',
    icon: HeartHandshake,
    tone: 'text-emerald-400',
  },
  {
    value: '2.7x',
    label: 'Average qualified lead uplift',
    icon: BarChart3,
    tone: 'text-amber-400',
  },
  {
    value: '40+',
    label: 'Search and brand campaigns scaled',
    icon: SearchCheck,
    tone: 'text-cyan-400',
  },
];

export const HOME_SERVICES_PREVIEW = [
  {
    title: 'SEO Optimization',
    desc: 'Technical SEO and content systems built to scale organic traffic.',
    icon: Search,
    image: '/assets/remote/seo-audit-report.jpg',
  },
  {
    title: 'Social Marketing',
    desc: 'Native creative that builds community and brand trust.',
    icon: Megaphone,
    image: '/assets/remote/social-media-campaign-planning.jpg',
  },
  {
    title: 'Performance Ads',
    desc: 'ROI-focused campaigns across Google and Meta funnels.',
    icon: BarChart3,
    image: '/assets/remote/performance-analytics-dashboard.jpg',
  },
  {
    title: 'Web Engineering',
    desc: 'High-speed, search-visible sites built for conversion.',
    icon: Code2,
    image: '/assets/remote/web-design-workstation.jpg',
  },
];

export const HOME_PROCESS_STEPS = [
  {
    title: 'Discover',
    desc: 'Research audience, demand, and weak points before recommending channels.',
    icon: Lightbulb,
  },
  {
    title: 'Plan',
    desc: 'Translate insights into a roadmap for SEO, content, and reporting.',
    icon: Target,
  },
  {
    title: 'Build',
    desc: 'Ship updates, content systems, and tracking in focused cycles.',
    icon: Wrench,
  },
  {
    title: 'Scale',
    desc: 'Optimize rankings and acquisition efficiency using real data.',
    icon: Rocket,
  },
];

export const HOME_TESTIMONIALS = [
  {
    name: 'Ariana Khan',
    role: 'Founder, Bloom Commerce',
    text: 'NexusBoost rebuilt our ecommerce pages, tightened SEO foundations, and refreshed campaign creative. Lead quality improved within the first month.',
    image: '/assets/remote/testimonial-ecommerce-founder.jpg',
    score: '5.0',
  },
  {
    name: 'Rahul Menon',
    role: 'Head of Growth, TurboLogix',
    text: 'Execution was fast, reporting stayed clear, and the website finally matched our demand generation goals across search and paid channels.',
    image: '/assets/remote/testimonial-growth-head.jpg',
    score: '4.9',
  },
  {
    name: 'Sara Ibrahim',
    role: 'Marketing Lead, ClinicOne',
    text: 'Their team connected local SEO, landing pages, and analytics in a way our internal team could actually scale and learn from.',
    image: '/assets/remote/testimonial-healthcare-lead.jpg',
    score: '5.0',
  },
];

export const HOME_FAQS = [
  {
    q: 'How fast can you launch a new marketing website?',
    a: 'Most website launches take 3 to 6 weeks depending on content readiness, integrations, and the number of landing pages involved.',
  },
  {
    q: 'Can you improve SEO without rebuilding the whole site?',
    a: 'Yes. We often improve technical SEO, content structure, internal linking, and conversion flow on existing websites before a full redesign is needed.',
  },
  {
    q: 'Do you support paid ads and organic growth together?',
    a: 'Yes. We regularly align SEO, PPC, landing pages, and analytics so your traffic acquisition strategy works as one system.',
  },
  {
    q: 'Do you provide post-launch reporting?',
    a: 'Absolutely. We offer ongoing support for rankings, campaign performance, website conversion, content growth, and dashboard reporting.',
  },
];

export const HOME_WHY_CHOOSE_US_FEATURES = [
  {
    title: 'Strategy first',
    desc: 'Every sprint starts with search intent, funnel gaps, and revenue goals rather than random task lists.',
    icon: Compass,
    image: '/assets/remote/team-success-presentation.jpg',
  },
  {
    title: 'Transparent reporting',
    desc: 'You always know what shipped, what improved, and which SEO or campaign opportunities come next.',
    icon: Eye,
    image: '/assets/remote/marketing-dashboard-overview.jpg',
  },
  {
    title: 'Fast execution',
    desc: 'Lean specialists move quickly across content, design, ads, and development without losing quality.',
    icon: Zap,
    image: '/assets/remote/team-collaboration-office.jpg',
  },
  {
    title: 'Long-term partner',
    desc: 'We build systems that keep compounding as your content library, rankings, and acquisition channels expand.',
    icon: Handshake,
    image: '/assets/remote/partnership-growth-team.jpg',
  },
];
