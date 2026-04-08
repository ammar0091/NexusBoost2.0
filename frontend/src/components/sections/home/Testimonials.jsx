import { Sparkles } from 'lucide-react';
import { HOME_TESTIMONIALS } from '@/constants/homeData';

const Testimonials = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="nb-container px-4 sm:px-6">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-(--nb-border) bg-(--nb-surface-soft) px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-(--nb-text-muted)">
              <Sparkles size={12} className="text-(--nb-accent)" />
              Client Voices
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-(--nb-text) sm:text-4xl">
              Real growth, real feedback.
            </h2>
          </div>
          <p className="max-w-xs text-sm font-medium text-(--nb-text-muted) md:text-right pb-1">
            Brands that trust us with SEO, web design, and digital execution.
          </p>
        </div>

        <div className="border-t border-b border-(--nb-border) divide-y divide-(--nb-border)">
          {HOME_TESTIMONIALS.map((review) => (
            <article
              key={review.name}
              className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 sm:py-8 transition-colors duration-300 hover:bg-(--nb-surface-soft)/50"
            >
              <div className="flex items-center gap-4 w-full md:w-1/4 shrink-0">
                <img
                  src={review.image}
                  alt={review.name}
                  className="h-12 w-12 rounded-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105 shadow-sm"
                  loading="lazy"
                  width="48"
                  height="48"
                />
                <div>
                  <p className="text-sm font-bold text-(--nb-text)">{review.name}</p>
                  <p className="text-xs font-medium text-(--nb-text-muted)">{review.role}</p>
                </div>
              </div>

              <div className="w-full md:w-2/4 grow px-0 md:px-6 border-l-0 md:border-l border-(--nb-border)">
                <p className="text-base sm:text-lg text-(--nb-text-muted) group-hover:text-(--nb-text) transition-colors duration-300 leading-relaxed">
                  "{review.text}"
                </p>
              </div>

              <div className="w-full md:w-1/4 flex items-center md:justify-end gap-6 md:gap-4 border-t md:border-t-0 border-(--nb-border) pt-4 md:pt-0">
                <div className="text-left md:text-right">
                  <span className="block text-sm font-black text-(--nb-text)">{review.score} / 5.0</span>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-(--nb-accent)">
                    Verified
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
