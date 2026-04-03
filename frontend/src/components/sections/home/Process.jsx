import { Lightbulb, Rocket, Target, Wrench, ChevronRight } from 'lucide-react';

const steps = [
  {
    title: 'Discover',
    desc: 'Research audience, demand, and weak points before recommending channels.',
    icon: Lightbulb,
  },
  {
    title: 'Plan',
    desc: 'Translate insights into a roadmap for SEO, content, and reporting.',
    icon: Target,
  },
  {
    title: 'Build',
    desc: 'Ship updates, content systems, and tracking in focused cycles.',
    icon: Wrench,
  },
  {
    title: 'Scale',
    desc: 'Optimize rankings and acquisition efficiency using real data.',
    icon: Rocket,
  },
];

const Process = () => {
  return (
    <section className="py-16 sm:py-20 flex justify-center px-4">
      <div className="nb-container w-full">
        
        {/* Compact Centered Header */}
        <div className="mb-10 text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--nb-text)">
            How we deliver results
          </h2>
          <p className="mt-3 text-base text-(--nb-text-muted) max-w-lg">
            A tight, four-step execution loop designed for compounding growth.
          </p>
        </div>

        {/* Unified Pipeline Block (The core compact element) */}
        <div className="relative w-full rounded-2xl border border-(--nb-border) bg-(--nb-surface-soft) overflow-hidden shadow-sm flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-(--nb-border)">
          
          {/* Subtle Top Glow Line */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-(--nb-accent) to-transparent opacity-40" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.title}
                className="group relative flex-1 p-10 transition-colors duration-300 hover:bg-(--nb-surface)"
              >
                {/* Step Indicator & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-(--nb-text) text-(--nb-surface) shadow-sm transition-transform group-hover:scale-110">
                      <Icon size={14} strokeWidth={2.5} />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-(--nb-text-muted)">
                      Phase 0{index + 1}
                    </span>
                  </div>

                  {/* Connector chevron (Visible on desktop) */}
                  {index < steps.length - 1 && (
                    <ChevronRight size={16} className="hidden lg:block text-(--nb-border) absolute -right-2 top-6 bg-(--nb-surface-soft) z-10" />
                  )}
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-bold text-(--nb-text) mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-(--nb-text-muted)">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Process;