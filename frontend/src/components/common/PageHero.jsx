import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageHero = ({ eyebrow, title, highlight, description, cta }) => {
  return (
    <section className="nb-section pt-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none nb-grid-lines opacity-45" />

      <div className="nb-container relative z-10">
        <div className="nb-panel p-7 md:p-10 lg:p-12 overflow-hidden">
          <div className="absolute -top-20 -right-10 w-56 h-56 rounded-full bg-(--nb-glow-a) blur-3xl" />
          <div className="absolute -bottom-20 -left-8 w-52 h-52 rounded-full bg-(--nb-glow-b) blur-3xl" />

          <div className="relative max-w-4xl">
            <p className="nb-pill bg-(--nb-surface-soft) border border-(--nb-border) text-(--nb-accent) mb-6">
              {eyebrow}
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[0.9] text-(--nb-text)">
              {title}
              {highlight ? (
                <span className="block text-transparent bg-clip-text nb-accent-gradient mt-2">{highlight}</span>
              ) : null}
            </h1>

            {description ? (
              <p className="mt-6 text-base md:text-lg leading-relaxed text-(--nb-text-muted) max-w-3xl">
                {description}
              </p>
            ) : null}

            {cta ? (
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-(--nb-border) bg-(--nb-surface-soft) px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-(--nb-text) hove
                r:border-(--nb-accent)"
              >
                {cta}
                <ArrowRight size={14} />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
