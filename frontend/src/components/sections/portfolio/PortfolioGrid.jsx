import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus } from 'lucide-react';

const PortfolioGrid = ({ projects = [] }) => {
  return (
    <section className="relative py-24 bg-(--nb-surface-soft) overflow-hidden">
      {/* Nexus Signature: Structural Grid Line */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-(--nb-border)/20 hidden lg:block" />

      <div className="nb-container relative z-10">
        
    

        {/* Studio Grid - 2 Column Asymmetric Feel */}
        <div className="grid gap-x-12 gap-y-20 sm:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.id || index}
              className="group relative flex flex-col"
            >
              <Link
                to={`/portfolio/${project.slug || project.id}`}
                className="block relative"
              >
                {/* Image Frame - The Nexus Logic */}
                <div className="aspect-16/10 overflow-hidden rounded-sm border border-(--nb-border)/30 bg-(--nb-surface-soft)/50 p-1">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover  transition-all duration-1000  group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Invisible Action Trigger */}
                <div className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-45">
                  <ArrowUpRight size={20} />
                </div>
              </Link>

              {/* Text Content - Minimalist & Sharp */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-(--nb-text-muted)/60">
                  <span>{project.category || 'Strategy'}</span>
                  <span className="h-px w-6 bg-(--nb-border)" />
                  <span className="text-(--nb-accent)">2026</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-medium tracking-tighter text-(--nb-text)">
                  {project.title}
                </h3>
                
                <p className="text-sm leading-relaxed text-(--nb-text-muted)/80 font-light tracking-wide line-clamp-2 max-w-md">
                  {project.desc || 'Full-funnel strategy and search visibility engineering.'}
                </p>

                <div className="pt-2">
                  <Link 
                    to={`/portfolio/${project.slug || project.id}`}
                    className="group/btn inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-(--nb-text)"
                  >
                    <span className="border-b border-(--nb-text)/20 pb-1 group-hover/btn:border-(--nb-accent) transition-colors">
                      Explore Case Study
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {/* Consistent Nexus CTA Card */}
          <Link 
            to="/contact"
            className="group relative flex aspect-20/10 flex-col items-center justify-center rounded-sm border border-dashed border-(--nb-border) bg-white/1 transition-all hover:bg-(--nb-accent)/50 hover:border-(--nb-accent)/50"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-(--nb-border) transition-all duration-500 group-hover:scale-110 group-hover:bg-(--nb-surface) group-hover:border-(--nb-accent)">
              <Plus size={24} className="text-(--nb-text-muted) group-hover:text-(--nb-accent)" />
            </div>
            <h4 className="mt-8 text-xl font-light tracking-tight text-(--nb-text)">
              Your brand <span className="italic font-serif opacity-70">next?</span>
            </h4>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-(--nb-accent) opacity-0 transition-opacity group-hover:opacity-100">
              Start Project <ArrowUpRight size={12} />
            </div>
          </Link>
        </div>

        {!projects.length && (
          <div className="py-20 text-center border-t border-(--nb-border)/20 mt-20">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-(--nb-text-muted)/40">Updating Archive</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioGrid;