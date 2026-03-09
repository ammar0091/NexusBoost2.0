import { Link } from 'react-router-dom';

const PageCTA = ({
  eyebrow = 'Lets Talk',
  title,
  highlight,
  description,
  primary = 'Book a Strategy Call',
  secondary,
}) => {
  return (
    <section className="nb-section">
      <div className="nb-container">
        <div className="nb-panel px-7 py-10 md:px-12 md:py-12 text-center relative overflow-hidden">
          <div className="absolute -top-16 -left-12 w-44 h-44 rounded-full bg-[var(--nb-glow-a)] blur-3xl" />
          <div className="absolute -bottom-16 -right-12 w-44 h-44 rounded-full bg-[var(--nb-glow-b)] blur-3xl" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="nb-pill bg-[var(--nb-surface-soft)] border border-[var(--nb-border)] text-[var(--nb-accent)] mb-5">
              {eyebrow}
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--nb-text)] leading-[0.95]">
              {title}
              {highlight ? <span className="block mt-2 text-[var(--nb-accent)]">{highlight}</span> : null}
            </h2>

            {description ? (
              <p className="mt-5 text-base md:text-lg text-[var(--nb-text-muted)] leading-relaxed max-w-2xl mx-auto">
                {description}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/contact"
                className="nb-shine rounded-xl px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.18em] text-slate-950 bg-[var(--nb-accent)] hover:brightness-110"
              >
                {primary}
              </Link>

              {secondary ? (
                <Link
                  to="/portfolio"
                  className="rounded-xl border border-[var(--nb-border)] bg-[var(--nb-surface-soft)] px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--nb-text)] hover:border-[var(--nb-accent)]"
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
