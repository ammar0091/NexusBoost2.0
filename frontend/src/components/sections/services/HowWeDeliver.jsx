const steps = [
  {
    title: 'Business discovery',
    desc: 'We align on goals, audience segments, and baseline metrics.',
  },
  {
    title: 'Roadmap and design',
    desc: 'Clear milestones for UX, messaging, and implementation.',
  },
  {
    title: 'Launch and optimize',
    desc: 'Post-launch loops for data-led optimization and growth.',
  },
];

const HowWeDeliver = () => {
  return (
    <section className="nb-section pt-4">
      <div className="nb-container">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--nb-text)]">How we deliver results</h2>
          <p className="mt-3 text-[var(--nb-text-muted)] leading-relaxed">
            A focused execution model that keeps quality high and momentum consistent.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="nb-panel p-6 text-center">
              <div className="mx-auto mb-5 h-10 w-10 rounded-full bg-[var(--nb-surface-soft)] border border-[var(--nb-border)] flex items-center justify-center text-sm font-black text-[var(--nb-accent)]">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-[var(--nb-text)]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--nb-text-muted)]">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeDeliver;
