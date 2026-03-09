import { ArrowRight, Lightbulb, Rocket, Target, Wrench } from 'lucide-react';

const steps = [
  {
    title: 'Discover',
    desc: 'Research your market, users, and funnel opportunities.',
    icon: Lightbulb,
  },
  {
    title: 'Plan',
    desc: 'Translate insights into a clear roadmap and priorities.',
    icon: Target,
  },
  {
    title: 'Build',
    desc: 'Ship design, content, and development in focused cycles.',
    icon: Wrench,
  },
  {
    title: 'Scale',
    desc: 'Optimize continuously with tracking and growth loops.',
    icon: Rocket,
  },
];

const Process = () => {
  return (
    <section className="nb-section">
      <div className="nb-container">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
          <h2 className="text-3xl md:text-5xl font-black text-[var(--nb-text)] leading-[0.95]">How we deliver results</h2>
          <p className="text-sm md:text-base text-[var(--nb-text-muted)] max-w-lg">
            Structured workflow, quick iterations, and measurable outcomes at each stage.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="nb-panel p-5 relative">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--nb-accent)]">Step {index + 1}</span>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex rounded-lg border border-[var(--nb-border)] bg-[var(--nb-surface-soft)] p-2 text-[var(--nb-accent)]">
                    <Icon size={18} />
                  </span>
                  {index < steps.length - 1 ? <ArrowRight size={15} className="text-[var(--nb-text-muted)]" /> : null}
                </div>
                <h3 className="mt-4 text-xl font-bold text-[var(--nb-text)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--nb-text-muted)]">{step.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
