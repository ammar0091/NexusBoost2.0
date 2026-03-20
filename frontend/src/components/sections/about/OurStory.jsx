import { CheckCircle2, Sparkles } from 'lucide-react';

const pillars = [
  'Outcome-focused delivery instead of vanity traffic metrics',
  'SEO, design, content, and development coordinated in one workflow',
  'Scalable systems built for long-term growth, not one-time launches',
];

const OurStory = () => (
  <section className="nb-section">
    <div className="nb-container grid items-center gap-8 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <div className="nb-panel p-3">
          <img
            src="https://images.unsplash.com/photo-1600880292089-90e1ffe0fdbd?auto=format&fit=crop&w=1200&q=80"
            alt="NexusBoost founders reviewing a digital marketing strategy board"
            className="h-105 w-full rounded-2xl object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <div className="lg:col-span-6">
        <p className="nb-pill mb-4 border border-(--nb-border) bg-(--nb-surface) text-(--nb-accent)">
          <Sparkles size={12} />
          Our Story
        </p>

        <h2 className="max-w-xl text-3xl font-black leading-[0.95] text-(--nb-text) md:text-4xl">
          Built from frustration, shaped for measurable digital growth.
        </h2>

        <p className="mt-5 leading-relaxed text-(--nb-text-muted)">
          We started NexusBoost after watching too many businesses pay for disconnected reports, vague marketing plans, and websites that looked good but did not convert. Our model is simple: understand the market, ship high-quality work quickly, and keep improving what moves revenue.
        </p>

        <div className="mt-6 space-y-3">
          {pillars.map((item) => (
            <div key={item} className="nb-soft-panel flex items-start gap-3 px-4 py-3">
              <CheckCircle2 size={16} className="mt-0.5 text-emerald-400" />
              <p className="text-sm text-(--nb-text-muted)">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default OurStory;
