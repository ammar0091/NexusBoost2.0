import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/content/servicesContent';

const ServicesList = () => {
  return (
    <section className="nb-section pt-6">
      <div className="nb-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <h2 className="max-w-2xl text-2xl font-black leading-[0.95] text-(--nb-text) md:text-4xl">
            Services designed to strengthen visibility, demand generation, and website conversion.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-(--nb-text-muted) md:text-base">
            Full-stack growth services from strategy and design to execution, reporting, and optimization across the funnel.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.slug}
                className="group relative h-full overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(191,189,189,0.1)] p-3 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-br from-(--nb-accent)/20 via-transparent to-(--nb-accent)/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                <Link to={`/services/${service.slug}`} className="block">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-44 w-full rounded-2xl object-cover"
                    loading="lazy"
                    decoding="async"
                    width="900"
                    height="600"
                  />

                  <div className="p-3">
                    <span
                      className={`relative inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] p-3 transition-all duration-300 group-hover:scale-110 ${service.tone}`}
                    >
                      <Icon size={20} />
                    </span>

                    <h3 className="relative mt-5 flex items-center justify-between gap-3 text-lg font-bold text-(--nb-text)">
                      {service.title}
                      <ArrowUpRight
                        size={18}
                        className="text-(--nb-text-muted) transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-2"
                      />
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-(--nb-text-muted)">{service.desc}</p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
