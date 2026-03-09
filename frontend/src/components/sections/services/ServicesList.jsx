import {
  ArrowUpRight,
  BarChart3,
  Code2,
  Film,
  Mail,
  Megaphone,
  Palette,
  Search,
  SlidersHorizontal,
  TrendingUp,
  UserRound,
  Waypoints,
} from 'lucide-react';

const services = [
  {
    title: 'SEO and organic growth',
    desc: 'Technical SEO, keyword strategy, and content frameworks for compounding visibility.',
    icon: Search,
  },
  {
    title: 'Performance marketing',
    desc: 'ROI-focused paid campaigns on Meta, Google, and high-intent channels.',
    icon: TrendingUp,
  },
  {
    title: 'Social media strategy',
    desc: 'Content planning and creative production to build authority and demand.',
    icon: Megaphone,
  },
  {
    title: 'Branding and visual design',
    desc: 'Identity systems that make your brand memorable and trusted.',
    icon: Palette,
  },
  {
    title: 'Web development',
    desc: 'Fast, modern websites with clean architecture and conversion-first UX.',
    icon: Code2,
  },
  {
    title: 'Conversion optimization',
    desc: 'Test and improve key flows to maximize lead quality and revenue.',
    icon: SlidersHorizontal,
  },
  {
    title: 'PPC advertising',
    desc: 'High-intent ad structures focused on lower CAC and better lead quality.',
    icon: BarChart3,
  },
  {
    title: 'Content marketing',
    desc: 'Strategic content production built around search intent and trust signals.',
    icon: Waypoints,
  },
  {
    title: 'Email marketing',
    desc: 'Lifecycle sequences and campaigns that nurture users and improve retention.',
    icon: Mail,
  },
  {
    title: 'Analytics and reporting',
    desc: 'Unified dashboards and weekly insights for smarter growth decisions.',
    icon: ArrowUpRight,
  },
  {
    title: 'Video marketing',
    desc: 'High-performing short and long-form videos tailored for each channel.',
    icon: Film,
  },
  {
    title: 'UX and UI design',
    desc: 'Interfaces designed to feel premium and move users to action.',
    icon: UserRound,
  },
];

const ServicesList = () => {
  return (
    <section className="nb-section pt-6">
      <div className="nb-container">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <h2 className="text-3xl md:text-5xl font-black text-(--nb-text) leading-[0.95] max-w-2xl">
            Services designed to scale with your business.
          </h2>
          <p className="max-w-md text-sm md:text-base leading-relaxed text-(--nb-text-muted)">
            Full-stack growth services from strategy and design to execution and optimization.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="nb-panel h-full min-h-52.5 p-5 transition-all duration-300 hover:border-(--nb-accent)"
              >
                <span className="inline-flex rounded-lg border border-(--nb-border) bg-(--nb-surface-soft) p-2 text-(--nb-accent)]">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 flex items-start justify-between gap-3 text-lg font-bold text-(--nb-text)">
                  {service.title}
                  <ArrowUpRight size={16} className="text-(--nb-text-muted)" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-(--nb-text-muted)">{service.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
