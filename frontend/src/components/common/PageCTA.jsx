import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const PageCTA = ({
  eyebrow = 'Lets Talk',
  title,
  highlight,
  description,
  primary = 'Book a Strategy Call',
  primaryHref = '/contact',
  secondary,
  secondaryHref = '/portfolio',
}) => {
  return (
    <section className="relative py-24 overflow-hidden bg-(--nb-surface)">
      {/* Theme Consistency: Structural Accent Lines */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-(--nb-border)/20 hidden lg:block" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-(--nb-border)/20 hidden lg:block" />

      <div className="nb-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Typography & Description */}
          <div className="text-left space-y-8 lg:pr-12">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-(--nb-accent)" />
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-(--nb-accent)">
                {eyebrow}
              </p>
            </div>

            <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-(--nb-text) leading-[0.95]">
              {title}
              {highlight && (
                <span className="block mt-2 italic font-serif text-(--nb-text-muted) opacity-80">
                  {highlight}
                </span>
              )}
            </h2>

            {description && (
              <p className="max-w-md text-sm leading-relaxed text-(--nb-text-muted) tracking-wide opacity-80 font-light">
                {description}
              </p>
            )}
          </div>

          {/* Right Side: Large Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:justify-end gap-8 items-center">
            <Link
              to={primaryHref}
              className="group flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.3em] text-(--nb-text)"
            >
              <span className="border-b border-(--nb-text) pb-1 group-hover:border-(--nb-accent) transition-colors">
                {primary}
              </span>
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-(--nb-border) transition-all duration-500 group-hover:scale-110 group-hover:border-(--nb-accent) group-hover:bg-(--nb-accent)/5">
                <ArrowUpRight size={24} className="text-(--nb-accent)" />
              </div>
            </Link>

            {secondary && (
              <Link
                to={secondaryHref}
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-(--nb-text-muted) hover:text-(--nb-text) transition-colors"
              >
                {secondary}
              </Link>
            )}
          </div>
        </div>

        {/* Floating Label - Bottom Right (Classy Touch) */}
        <div className="absolute bottom-0 right-0 py-10 opacity-20 hidden lg:block">
          <p className="rotate-90 origin-bottom-right text-[9px] font-bold tracking-[0.5em] uppercase text-(--nb-text)">
            NexusBoost Studio
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageCTA;