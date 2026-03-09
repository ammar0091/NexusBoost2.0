import { Activity, Layers, Scaling } from 'lucide-react';

const points = [
  {
    title: 'Strategy before execution',
    desc: 'Clear direction, audience intent, and business goals define every sprint.',
    icon: Layers,
  },
  {
    title: 'Data over assumptions',
    desc: 'Decisions are tied to real performance signals and tracked improvements.',
    icon: Activity,
  },
  {
    title: 'Built to scale',
    desc: 'Design and systems are structured for your next stage, not just launch day.',
    icon: Scaling,
  },
];

const WhatMakesUsDifferent = () => {
  return (
    <section className="nb-section pt-4">
      <div className="nb-container">
        <div className="mb-7 max-w-2xl">
          <p className="nb-pill border border-[var(--nb-border)] bg-[var(--nb-surface)] text-[var(--nb-accent)] mb-4">Our Approach</p>
          <h2 className="text-3xl md:text-5xl font-black text-[var(--nb-text)] leading-[0.95]">What makes us different</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <article key={point.title} className="nb-panel p-5">
                <span className="inline-flex rounded-lg border border-[var(--nb-border)] bg-[var(--nb-surface-soft)] p-2 text-[var(--nb-accent)]">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 text-xl font-bold text-[var(--nb-text)]">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--nb-text-muted)]">{point.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatMakesUsDifferent;
