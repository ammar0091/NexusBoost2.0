import { Quote, Sparkles } from 'lucide-react';

const reviews = [
  {
    name: 'Ariana Khan',
    role: 'Founder, Bloom Commerce',
    text: 'NexusBoost rebuilt our ecommerce pages, tightened SEO foundations, and refreshed campaign creative. Lead quality improved within the first month.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    score: '5.0',
  },
  {
    name: 'Rahul Menon',
    role: 'Head of Growth, TurboLogix',
    text: 'Execution was fast, reporting stayed clear, and the website finally matched our demand generation goals across search and paid channels.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    score: '4.9',
  },
  {
    name: 'Sara Ibrahim',
    role: 'Marketing Lead, ClinicOne',
    text: 'Their team connected local SEO, landing pages, and analytics in a way our internal team could actually scale and learn from.',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=80',
    score: '5.0',
  },
];

const Testimonials = () => {
  return (
    <section className="nb-section">
      <div className="nb-container">
        <div className="nb-panel relative overflow-hidden p-6 md:p-10">
          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-(--nb-glow-a) blur-3xl" />
          <div className="absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-(--nb-glow-c) blur-3xl" />

          <div className="relative z-10 mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="nb-pill mb-3 border border-(--nb-border) bg-(--nb-surface-soft) text-(--nb-accent)">
                <Sparkles size={12} />
                Testimonials
              </p>
              <h2 className="text-3xl font-black leading-[0.95] text-(--nb-text) md:text-4xl">Client voices from real growth work</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-(--nb-text-muted) md:text-base">
                Feedback from brands that trusted NexusBoost with SEO, web design, content systems, and digital campaign execution.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="nb-soft-panel p-5 md:p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="h-14 w-14 rounded-2xl object-cover"
                    loading="lazy"
                    decoding="async"
                    width="112"
                    height="112"
                  />
                  <div>
                    <p className="font-bold text-(--nb-text)">{review.name}</p>
                    <p className="text-sm text-(--nb-text-muted)">{review.role}</p>
                  </div>
                  <span className="ml-auto text-sm font-black text-(--nb-accent-2)">{review.score}</span>
                </div>

                <p className="mt-4 leading-relaxed text-(--nb-text-muted)">"{review.text}"</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-(--nb-text-muted)">Verified client</span>
                  <Quote size={18} className="text-(--nb-accent)" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
