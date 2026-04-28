import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { HOME_SERVICES_PREVIEW } from '@/constants/homeData';

const ServicesPreview = () => {
  return (
    <section className="relative py-24 bg-(--nb-surface)">
      <div className="nb-container">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-(--nb-accent)" />
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-(--nb-accent)">Services</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-(--nb-text) leading-none">
              Strategic <span className="italic font-serif opacity-70">growth</span> tools.
            </h2>
          </div>
          <Link to="/services" className="text-[10px] font-bold uppercase tracking-[0.2em] text-(--nb-text-muted) hover:text-(--nb-accent) transition-colors border-b border-transparent hover:border-(--nb-accent) pb-1">
            View all services
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {HOME_SERVICES_PREVIEW.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="group relative">
                <div className="aspect-[4/5] overflow-hidden rounded-sm border border-(--nb-border)/40 bg-(--nb-surface-soft) p-1">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium tracking-tight text-(--nb-text)">{service.title}</h3>
                    <div className="h-8 w-8 flex items-center justify-center rounded-full border border-(--nb-border) group-hover:border-(--nb-accent) transition-colors">
                      <Icon size={14} className="text-(--nb-accent)" />
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-(--nb-text-muted)/80 font-light line-clamp-2">
                    {service.desc}
                  </p>
                </div>

                <Link to="/services" className="absolute inset-0 z-20" />
              </article>
            );
          })}
        </div>

        <div className="mt-20 pt-10 border-t border-(--nb-border)/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-(--nb-text-muted) font-light">
            Need a custom digital strategy? <span className="text-(--nb-text) font-medium">We're currently taking on new clients for 2026.</span>
          </p>
          <Link
            to="/contact"
            className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-(--nb-text)"
          >
            Request Audit
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-(--nb-border) group-hover:bg-(--nb-accent) group-hover:border-(--nb-accent) transition-all">
              <ArrowUpRight size={16} className="group-hover:text-slate-950" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
