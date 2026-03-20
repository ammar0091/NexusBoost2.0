import { ArrowRight, Lightbulb, Rocket, Target, Wrench } from 'lucide-react';

const steps = [
  {
    title: 'Discover',
    desc: 'Research your audience, search demand, competitors, and funnel weak points before we recommend channels.',
    icon: Lightbulb,
  },
  {
    title: 'Plan',
    desc: 'Translate insights into a growth roadmap covering SEO priorities, landing pages, content, and reporting.',
    icon: Target,
  },
  {
    title: 'Build',
    desc: 'Ship website updates, campaign assets, content systems, and tracking in focused execution cycles.',
    icon: Wrench,
  },
  {
    title: 'Scale',
    desc: 'Optimize rankings, conversion rates, and acquisition efficiency using real performance data.',
    icon: Rocket,
  },
];

const Process = () => {
  return (
    <section className="nb-section">
      <div className="nb-container">
        <div className="mb-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-black leading-[0.95] text-(--nb-text) md:text-4xl">How we deliver SEO and digital marketing results</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-(--nb-text-muted) md:text-base">
              Every engagement follows a clear workflow that keeps strategy, execution, and measurement tightly connected.
            </p>
          </div>
          <div className="nb-panel overflow-hidden p-3 lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                alt="Analytics dashboard used to track SEO and digital marketing performance"
                className="h-52 w-full object-cover"
                loading="lazy"
                decoding="async"
                width="1200"
                height="800"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/15 bg-black/45 p-4 text-white backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">Reporting and optimization</p>
                <p className="mt-2 text-base font-black">We track rankings, conversion rate, CPL, and revenue-facing metrics from the start.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="nb-panel relative p-5">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-accent)">Step {index + 1}</span>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex rounded-lg border border-(--nb-border) bg-(--nb-surface-soft) p-2 text-(--nb-accent)">
                    <Icon size={18} />
                  </span>
                  {index < steps.length - 1 ? <ArrowRight size={15} className="text-(--nb-text-muted)" /> : null}
                </div>
                <h3 className="mt-4 text-xl font-bold text-(--nb-text)">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-(--nb-text-muted)">{step.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
