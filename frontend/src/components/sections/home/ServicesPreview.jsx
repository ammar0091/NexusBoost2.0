import { Link } from 'react-router-dom';
import { ArrowUpRight, BarChart3, Code2, Megaphone, Palette, Search } from 'lucide-react';

const services = [
  {
    title: 'SEO optimization',
    desc: 'Technical SEO, on-page structure, and content planning to improve rankings and qualified traffic.',
    icon: Search,
    tone: 'text-cyan-500',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Social media marketing',
    desc: 'Platform-native creative and campaign systems that grow reach, trust, and engagement.',
    icon: Megaphone,
    tone: 'text-rose-500',
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Performance ads',
    desc: 'ROI-focused campaigns across Google and Meta with tighter targeting and cleaner funnel tracking.',
    icon: BarChart3,
    tone: 'text-amber-500',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Branding and design',
    desc: 'Messaging and identity systems that turn attention into trust and stronger conversion intent.',
    icon: Palette,
    tone: 'text-violet-500',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Web development',
    desc: 'High-conversion websites built for speed, search visibility, and premium user experience.',
    icon: Code2,
    tone: 'text-blue-500',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
  },
];

const ServicesPreview = () => {
  return (
    <section className="nb-section">
      <div className="nb-container">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="nb-pill mb-4 border border-(--nb-border) bg-(--nb-surface) text-(--nb-accent)">
              Services
            </p>
            <h2 className="max-w-4xl text-3xl font-black leading-[0.95] text-(--nb-text) md:text-4xl">
              Digital marketing services built to improve <span className="text-transparent bg-clip-text nb-accent-gradient-alt">rankings, leads, and conversion</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-(--nb-text-muted) md:text-base">
              We blend search, content, design, analytics, and development so every campaign has a stronger foundation and clearer reporting.
            </p>
          </div>

          <Link
            to="/services"
            className="rounded-xl border border-(--nb-border) bg-(--nb-surface) px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-(--nb-text) hover:border-(--nb-accent)"
          >
            View All Services
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="nb-panel group h-full overflow-hidden p-3 transition-all duration-300">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-40 w-full rounded-2xl object-cover"
                  loading="lazy"
                  decoding="async"
                  width="900"
                  height="600"
                />

                <div className="p-2">
                  <span className={`mt-4 inline-flex rounded-lg border border-(--nb-border) bg-(--nb-surface-soft) p-2 ${service.tone}`}>
                    <Icon size={18} />
                  </span>

                  <h3 className="mt-4 flex items-center justify-between text-xl font-bold text-(--nb-text)">
                    {service.title}
                    <ArrowUpRight
                      size={16}
                      className="opacity-40 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-(--nb-text-muted)">{service.desc}</p>
                </div>
              </article>
            );
          })}

          <div className="nb-panel flex flex-col items-center justify-center border-dashed border-(--nb-accent-4)/40 p-6 text-center">
            <p className="mb-2 text-sm font-bold text-(--nb-text)">Need something custom?</p>
            <p className="mb-4 text-xs leading-relaxed text-(--nb-text-muted)">We design bespoke SEO, content, and conversion systems around your funnel and growth stage.</p>
            <Link
              to="/contact"
              className="rounded-lg nb-accent-gradient-alt px-5 py-2 text-[11px] font-black uppercase tracking-wider text-white hover:opacity-90"
            >
              Request Audit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
