import { ArrowUpRight } from 'lucide-react';
import { HOW_WE_DELIVER_STEPS, HOW_WE_DELIVER_VISUAL } from '@/constants/servicesSectionData';

const HowWeDeliver = () => {
  return (
    <section className="relative py-24 bg-(--nb-surface-soft) overflow-hidden">
      <div className="absolute left-1/2 top-0 h-full w-px bg-(--nb-border)/20 hidden lg:block" />

      <div className="nb-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-1 rounded-full bg-(--nb-accent)" />
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-(--nb-accent)">
                The Framework
              </p>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-(--nb-text) leading-[0.95]">
              How we deliver <br />
              <span className="italic font-serif text-(--nb-text-muted) opacity-80">tangible</span> results.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-(--nb-text-muted)/70 tracking-wide font-light">
            A focused operating model that prioritizes speed and creative quality over agency bloat.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 group">
            <div className="relative overflow-hidden rounded-sm border border-(--nb-border)/30 bg-(--nb-surface-soft)/50 p-1">
              <img
                src={HOW_WE_DELIVER_VISUAL.src}
                alt={HOW_WE_DELIVER_VISUAL.alt}
                className="aspect-[4/3] w-full object-cover transition-all duration-1000 group-hover:opacity-100 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-(--nb-surface) border border-(--nb-border) p-4 shadow-xl">
                <p className="text-[9px] font-bold tracking-widest uppercase text-(--nb-accent)">Execution Only</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div className="space-y-12">
              {HOW_WE_DELIVER_STEPS.map((step) => (
                <div key={step.id} className="group relative flex gap-8 border-b border-(--nb-border)/20 pb-8 last:border-0 last:pb-0">
                  <span className="text-xl font-serif italic text-(--nb-accent) opacity-40 group-hover:opacity-100 transition-opacity">
                    {step.id}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium tracking-tight text-(--nb-text)">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-(--nb-text-muted)/80 font-light max-w-md">{step.desc}</p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="absolute right-0 top-0 text-(--nb-accent) opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeDeliver;
