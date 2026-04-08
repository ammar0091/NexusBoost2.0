import { CheckCircle2, Sparkles } from 'lucide-react';
import { OUR_STORY_PILLARS, OUR_STORY_VISUAL } from '@/constants/aboutData';

const OurStory = () => (
  <section className="nb-section py-20">
    <div className="nb-container ">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div className="relative group">
          <div className="overflow-hidden rounded-xl bg-(--nb-surface) shadow-sm transition-all duration-500 group-hover:shadow-md">
            <img
              src={OUR_STORY_VISUAL.src}
              alt={OUR_STORY_VISUAL.alt}
              className="h-80 w-full object-cover grayscale-[0.5] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
          </div>
          <div className="absolute -inset-3 -z-10 rounded-2xl border border-(--nb-border)/50 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-(--nb-accent) uppercase">
            <Sparkles size={12} strokeWidth={3} />
            Our Story
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-(--nb-text) sm:text-4xl">
            Built for <span className="italic font-serif opacity-80">measurable</span> impact.
          </h2>

          <p className="max-w-md text-sm leading-relaxed text-(--nb-text-muted)">
            We replaced fragmented marketing with a unified model. No vanity metrics-just high-quality work shipped fast to move the revenue needle.
          </p>

          <div className="grid gap-3 pt-2">
            {OUR_STORY_PILLARS.map((item) => (
              <div key={item} className="flex items-center gap-3 transition-opacity hover:opacity-80">
                <CheckCircle2 size={14} className="text-emerald-500/70" />
                <span className="text-sm font-medium tracking-wide text-(--nb-text)">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default OurStory;
