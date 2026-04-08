import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageHero = ({ eyebrow, title, highlight, description, cta, visual }) => {
  const hasVisual = Boolean(visual?.src);

  return (
    <section className="relative  flex items-center pt-28 pb-16 bg-(--nb-surface-neo)">
      <div className="nb-container">
        <div className={`flex flex-col lg:flex-row items-center gap-12 ${!hasVisual && 'text-center'}`}>
          
          {/* Content: Slim & Focused */}
          <div className={`${hasVisual ? 'lg:w-3/5' : 'max-w-2xl mx-auto'}`}>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-(--nb-accent) mb-6 block">
              {eyebrow}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-(--nb-text) leading-[1.1]">
              {title}
              {highlight && (
                <span className="block italic font-serif text-(--nb-text-muted) opacity-80 mt-1">
                  {highlight}
                </span>
              )}
            </h1>

            {description && (
              <p className="mt-6 text-sm md:text-base leading-relaxed text-(--nb-text-muted)/80 max-w-lg">
                {description}
              </p>
            )}

            {cta && (
              <div className="mt-10">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-(--nb-text) border-b-2 border-(--nb-accent) pb-1 hover:text-(--nb-accent) transition-all"
                >
                  {cta}
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Visual: Minimal Frame */}
          {hasVisual && (
            <div className="lg:w-2/5 group">
              <div className="overflow-hidden rounded-2xl border border-(--nb-border)/50 bg-(--nb-surface-soft) p-1 shadow-sm">
                <img
                  src={visual.src}
                  alt={visual.alt || title}
                  className="aspect-4/3 w-full rounded-xl object-cover  transition-all duration-700  group-hover:scale-105"
                />
              </div>
            </div>
          )}
          
        </div>
      </div>
    </section>
  );
};

export default PageHero;