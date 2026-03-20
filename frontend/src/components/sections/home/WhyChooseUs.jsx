import { Compass, Eye, Handshake, Zap } from 'lucide-react';

const reasons = [
  {
    title: 'Strategy first',
    desc: 'Every sprint starts with search intent, funnel gaps, and revenue goals rather than random task lists.',
    icon: Compass,
  },
  {
    title: 'Transparent reporting',
    desc: 'You always know what shipped, what improved, and which SEO or campaign opportunities come next.',
    icon: Eye,
  },
  {
    title: 'Fast execution',
    desc: 'Lean specialists move quickly across content, design, ads, and development without losing quality.',
    icon: Zap,
  },
  {
    title: 'Long-term partner',
    desc: 'We build systems that keep compounding as your content library, rankings, and acquisition channels expand.',
    icon: Handshake,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="nb-section">
      <div className="nb-container grid gap-16 lg:grid-cols-2">
        <div className="relative">
          <p className="nb-pill mb-4 border border-(--nb-border) bg-(--nb-surface) text-(--nb-accent)">
            Why NexusBoost
          </p>

          <h2 className="text-4xl font-black leading-[0.95] text-(--nb-text) md:text-4xl">
            Built on <br />
            <span className="text-(--nb-text-muted)">clarity, momentum, and measurable growth</span>
          </h2>

          <p className="mt-6 max-w-lg leading-relaxed text-(--nb-text-muted)">
            We focus on the full digital growth picture: better rankings, stronger landing pages, sharper creative, and reporting that points directly to business outcomes.
          </p>

          <div className="nb-panel mt-2 overflow-hidden p-3">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                alt="Agency team reviewing digital marketing results on a presentation screen"
                className="h-72 w-full object-cover"
                loading="lazy"
                decoding="async"
                width="1200"
                height="900"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/45 p-4 text-white backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">Integrated growth execution</p>
                <p className="mt-2 text-lg font-black">SEO, paid media, content, and CRO in one accountable workflow</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;

            return (
              <div key={reason.title} className="group relative flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-(--nb-border) bg-(--nb-surface) text-(--nb-accent) transition-transform duration-300 group-hover:scale-110">
                    <Icon size={18} />
                  </div>

                  {i !== reasons.length - 1 && <div className="mt-2 w-px flex-1 bg-(--nb-border)" />}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-(--nb-text)">{reason.title}</h3>

                  <p className="mt-1 max-w-md text-sm leading-relaxed text-(--nb-text-muted)">{reason.desc}</p>

                  <div className="mt-4 h-1 w-6 rounded-full bg-(--nb-border) transition-all duration-500 group-hover:w-20 group-hover:bg-(--nb-accent)" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
