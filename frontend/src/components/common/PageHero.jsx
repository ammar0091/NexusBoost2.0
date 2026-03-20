import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageHero = ({ eyebrow, title, highlight, description, cta, visual }) => {
  const hasVisual = Boolean(visual?.src);

  return (
    <section className="nb-section pt-32 relative overflow-hidden shadow-sm">
      <div className="absolute inset-0 pointer-events-none nb-grid-lines opacity-45" />

      <div className="nb-container relative z-10">
        <div className={`grid items-center gap-8 p-7 md:p-10 lg:p-12 ${hasVisual ? 'lg:grid-cols-12' : ''}`}>
          <div className="absolute -top-20 -right-10 h-56 w-56 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-8 h-52 w-52 rounded-full blur-3xl" />

          <div className={`relative ${hasVisual ? 'lg:col-span-7 max-w-4xl' : 'max-w-4xl'}`}>
            <p className="nb-pill bg-(--nb-surface-soft) border border-(--nb-border) text-(--nb-accent) mb-6">
              {eyebrow}
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[0.9] text-(--nb-text)">
              {title}
              {highlight ? (
                <span className="block mt-2 text-transparent bg-clip-text nb-accent-gradient-alt">{highlight}</span>
              ) : null}
            </h1>

            {description ? (
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-(--nb-text-muted) md:text-lg">
                {description}
              </p>
            ) : null}

            {cta ? (
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-(--nb-border) bg-(--nb-surface-soft) px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-(--nb-text) hover:border-(--nb-accent)"
              >
                {cta}
                <ArrowRight size={14} />
              </Link>
            ) : null}
          </div>

          {hasVisual ? (
            <div className="relative lg:col-span-5">
              <div className="nb-panel relative overflow-hidden p-3">
                <img
                  src={visual.src}
                  alt={visual.alt || title}
                  className="h-84 w-full rounded-2xl object-cover"
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="900"
                />
                <div className="pointer-events-none absolute inset-3 rounded-2xl bg-linear-to-t from-black/70 via-black/15 to-transparent" />

                <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/15 bg-black/45 p-4 text-white backdrop-blur-sm">
                  {visual.badge ? (
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">{visual.badge}</p>
                  ) : null}
                  {visual.cardTitle ? <p className="mt-2 text-lg font-black leading-tight">{visual.cardTitle}</p> : null}
                  {visual.points?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {visual.points.map((point) => (
                        <span
                          key={point}
                          className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/90"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
