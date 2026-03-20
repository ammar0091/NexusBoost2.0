import { Link } from 'react-router-dom';

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
    <section className="nb-section">
      <div className="nb-container">
        <div className="nb-panel px-7 py-10 md:px-12 md:py-12 text-center relative overflow-hidden">
          <div className="absolute -top-16 -left-12 w-44 h-44 rounded-full bg-(--nb-glow-a) blur-3xl" />
          <div className="absolute -bottom-16 -right-12 w-44 h-44 rounded-full bg-(--nb-glow-b) blur-3xl" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="nb-pill bg-(--nb-surface-soft) border border-(--nb-border) text-(--nb-accent) mb-5">
              {eyebrow}
            </p>

            <h2 className="text-3xl md:text-3xl lg:text-4xl font-black text-(--nb-text) leading-[0.95]">
              {title}
              {highlight ? <span className="block mt-2 text-(--nb-accent)">{highlight}</span> : null}
            </h2>

            {description ? (
              <p className="mt-5 text-base md:text-lg text-(--nb-text-muted) leading-relaxed max-w-2xl mx-auto">
                {description}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to={primaryHref}
                className="nb-shine rounded-xl px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.18em] text-slate-950 bg-(--nb-accent) hover:brightness-110"
              >
                {primary}
              </Link>

              {secondary ? (
                <Link
                  to={secondaryHref}
                  className="rounded-xl border border-(--nb-border) bg-(--nb-surface-soft) px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.18em] text-(--nb-text) hover:border-(--nb-accent)"
                >
                  {secondary}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageCTA;
