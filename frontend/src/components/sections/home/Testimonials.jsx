import { Quote, Sparkles, Star } from 'lucide-react';

const reviews = [
  {
    name: 'Ariana Khan',
    role: 'Founder, Bloom Commerce',
    text: 'NexusBoost redesigned our site and launch stack. Conversion quality improved in the first month.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    score: '5.0',
  },
  {
    name: 'Rahul Menon',
    role: 'Head of Growth, TurboLogix',
    text: 'Execution was fast, communication was clear, and the final product looked premium across every device.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    score: '4.9',
  },
];

const Testimonials = () => {
  const newLocal = "absolute -top-12 -right-12 h-44 w-44 rounded-full bg-(--nb-glow-a) blur-3xl";
  return (
    <section className="nb-section">
      <div className="nb-container">
        <div className="nb-panel relative overflow-hidden p-6 md:p-10">
          <div className={newLocal} />

          <div className="relative z-10 mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="nb-pill border border-(--nb-border) bg-(--nb-surface-soft) text-(--nb-accent) mb-3">
                <Sparkles size={12} />
                Testimonials
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-(--nb-text) leading-[0.95]">Client voices</h2>
            </div>

           
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <article key={review.name} className="nb-soft-panel p-5 md:p-6">
                <div className="flex items-center gap-4">
                  <img src={review.image} alt={review.name} className="h-14 w-14 rounded-2xl object-cover" loading="lazy" />
                  <div>
                    <p className="font-bold text-(--nb-text)">{review.name}</p>
                    <p className="text-sm text-(--nb-text-muted)">{review.role}</p>
                  </div>
                  <span className="ml-auto text-sm font-black text-(--nb-accent)">{review.score}</span>
                </div>

                <p className="mt-4 text-(--nb-text-muted) leading-relaxed">"{review.text}"</p>

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
