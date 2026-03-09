import { CheckCircle2, Sparkles } from 'lucide-react';

const pillars = [
  'Outcome-focused delivery instead of vanity metrics',
  'Tight collaboration between strategy, design, and dev',
  'Sustainable systems built for long-term scale',
];

const OurStory = () => {
  return (
    <section className="nb-section">
      <div className="nb-container grid gap-8 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6">
          <div className="nb-panel p-3">
            <img
              src="https://images.unsplash.com/photo-1600880292089-90e1ffe0fdbd?auto=format&fit=crop&w=1200&q=80"
              alt="NexusBoost founders reviewing product strategy"
              className="h-[420px] w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="lg:col-span-6">
          <p className="nb-pill border border-[var(--nb-border)] bg-[var(--nb-surface)] text-[var(--nb-accent)] mb-4">
            <Sparkles size={12} />
            Our Story
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-[var(--nb-text)] leading-[0.95] max-w-xl">
            Built from frustration, designed for measurable growth.
          </h2>

          <p className="mt-5 text-[var(--nb-text-muted)] leading-relaxed">
            We started NexusBoost after seeing too many teams pay for reports without meaningful business impact.
            Our model is simple: ship high quality work fast, measure outcomes, and keep improving.
          </p>

          <div className="mt-6 space-y-3">
            {pillars.map((item) => (
              <div key={item} className="nb-soft-panel px-4 py-3 flex items-start gap-3">
                <CheckCircle2 size={16} className="mt-0.5 text-emerald-400" />
                <p className="text-sm text-[var(--nb-text-muted)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
