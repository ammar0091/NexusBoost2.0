import { ABOUT_DIFFERENTIATOR_POINTS, ABOUT_DIFFERENTIATOR_VISUAL } from '@/constants/aboutData';

const WhatMakesUsDifferent = () => {
  return (
    <section className="nb-section">
      <div className="nb-container grid gap-16 lg:grid-cols-2 items-center">
        <div className="relative">
          <p className="nb-pill mb-4 border border-(--nb-border) bg-(--nb-surface) text-(--nb-accent)">
            Our Approach
          </p>

          <h2 className="text-4xl font-black leading-[0.95] text-(--nb-text) md:text-4xl">
            What makes <br />
            <span className="text-(--nb-text-muted)">us different</span>
          </h2>

          <p className="mt-6 max-w-lg leading-relaxed text-(--nb-text-muted)">
            We combine strategic thinking with fast production, giving brands a partner that can handle SEO, content, conversion optimization, and design without fragmentation.
          </p>

          <div className="nb-panel mt-2 overflow-hidden p-3">
            <img
              src={ABOUT_DIFFERENTIATOR_VISUAL.src}
              alt={ABOUT_DIFFERENTIATOR_VISUAL.alt}
              className="h-72 w-full rounded-2xl object-cover"
              loading="lazy"
              decoding="async"
              width="1200"
              height="900"
            />
          </div>
        </div>

        <div className="space-y-10">
          {ABOUT_DIFFERENTIATOR_POINTS.map((point, i) => {
            const Icon = point.icon;

            return (
              <div key={point.title} className="group relative flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-(--nb-border) bg-(--nb-surface) text-(--nb-accent) transition-transform duration-300 group-hover:scale-110">
                    <Icon size={18} />
                  </div>

                  {i !== ABOUT_DIFFERENTIATOR_POINTS.length - 1 && <div className="mt-2 w-px flex-1 bg-(--nb-border)" />}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-(--nb-text)">{point.title}</h3>

                  <p className="mt-1 max-w-md text-sm leading-relaxed text-(--nb-text-muted)">{point.desc}</p>

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

export default WhatMakesUsDifferent;
