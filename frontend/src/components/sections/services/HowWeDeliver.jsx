const steps = [
  {
    title: 'Business and search discovery',
    desc: 'We align on business goals, audience segments, keyword themes, conversion blockers, and baseline marketing metrics.',
  },
  {
    title: 'Roadmap and production',
    desc: 'We define priorities for website UX, content, technical SEO, creative assets, paid campaigns, and tracking implementation.',
  },
  {
    title: 'Launch, reporting, and optimization',
    desc: 'After launch, we monitor rankings, traffic quality, cost efficiency, and conversion data to keep improving performance.',
  },
];

const HowWeDeliver = () => {
  return (
    <section className="nb-section pt-4">
      <div className="nb-container">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-3xl font-black text-(--nb-text) md:text-4xl">How we deliver results</h2>
          <p className="mt-3 leading-relaxed text-(--nb-text-muted)">
            A focused operating model that keeps creative quality high, execution fast, and reporting useful.
          </p>
        </div>

        <div className="mb-6 nb-panel overflow-hidden p-3">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80"
              alt="Team reviewing a digital marketing delivery plan and campaign roadmap"
              className="h-64 w-full object-cover"
              loading="lazy"
              decoding="async"
              width="1400"
              height="800"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/45 p-4 text-white backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">Execution framework</p>
              <p className="mt-2 text-lg font-black">We move from audit to implementation with clear owners, milestones, and metrics.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="nb-panel p-6 text-center">
              <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-(--nb-border) bg-(--nb-surface-soft) text-sm font-black text-(--nb-accent)">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-(--nb-text)">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--nb-text-muted)">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeDeliver;
