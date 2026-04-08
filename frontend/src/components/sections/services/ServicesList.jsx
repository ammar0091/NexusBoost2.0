import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/content/servicesContent';

const ServicesList = () => {
  return (
    <section className="relative py-20 bg-(--nb-bg)">
      {/* Structural Accent Line */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-(--nb-border)/20 hidden lg:block" />

      <div className="nb-container relative z-10">
     

        {/* Grid - Refined Studio Cards */}
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.slug} className="group relative">
              <Link to={`/services/${service.slug}`} className="block">
                
                {/* Image Frame - Grayscale Logic */}
                <div className="aspect-[16/10] overflow-hidden rounded-sm border border-(--nb-border)/30 bg-(--nb-surface-soft)/50 p-1">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover  transition-all duration-1000  group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content - Compact & Clean */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-(--nb-accent) tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
                        {service.id || "•"}
                      </span>
                      <h3 className="text-xl font-medium tracking-tight text-(--nb-text)">
                        {service.title}
                      </h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-(--nb-border) transition-all duration-500 group-hover:border-(--nb-accent) group-hover:bg-(--nb-accent)/5">
                      <ArrowUpRight size={16} className="text-(--nb-accent) opacity-40 group-hover:opacity-100" />
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-(--nb-text-muted)/80 font-light tracking-wide line-clamp-3">
                    {service.desc}
                  </p>
                  
                  {/* Subtle "View" link */}
                  <div className="pt-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-(--nb-text) border-b border-(--nb-text)/20 group-hover:border-(--nb-accent) transition-colors">
                      Explore Service
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;