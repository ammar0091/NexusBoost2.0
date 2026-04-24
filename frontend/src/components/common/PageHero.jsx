import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageHero = ({ eyebrow, title, highlight, description, cta, visual }) => {
  const hasVisual = Boolean(visual?.src);

  return (
    <section className="relative min-h-screen pt-28 lg:pt-32 bg-(--nb-surface-neo) overflow-hidden">

      {/*  RIGHT SIDE IMAGE */}
      {hasVisual && (
        <div className="absolute inset-y-0 right-0 w-full lg:w-2/3">
          <img
            src={visual.src}
            alt={visual.alt || title}
            className="w-full h-full object-cover"
          />

          {/* Smooth gradient cut */}
          <div className="absolute inset-0 bg-linear-to-l from-transparent via-(--nb-surface-neo)/60 to-(--nb-surface-neo)" />
        </div>
      )}

      {/* 🧊 CONTENT */}
      <div className="relative z-10 nb-container min-h-[calc(100vh-7rem)] flex items-center">

        <div className="w-full max-w-xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">

          {/* Eyebrow */}
          {eyebrow && (
            <span className="text-[10px] tracking-[0.35em] uppercase text-(--nb-accent)">
              {eyebrow}
            </span>
          )}

          {/* Title */}
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-4xl font-semibold leading-tight text-(--nb-text-neo)">
            {title}
            {highlight && (
              <span className="block mt-2 text-(--nb-accent)">
                {highlight}
              </span>
            )}
          </h1>

          {/* Description */}
          {description && (
            <p className="mt-6 text-sm md:text-base text-(--nb-text-muted)/80 leading-relaxed">
              {description}
            </p>
          )}

          {/* CTA */}
          {cta && (
            <div className="mt-8">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 text-sm font-semibold text-(--nb-text)"
              >
                {cta}
                <div className="h-10 w-10 flex items-center justify-center rounded-full border border-(--nb-border) transition-all group-hover:bg-(--nb-accent) group-hover:text-white group-hover:scale-110">
                  <ArrowUpRight size={16} />
                </div>
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* 🎯 Decorative line */}
      <div className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 h-40 w-px bg-(--nb-border)" />

    </section>
  );
};

export default PageHero;