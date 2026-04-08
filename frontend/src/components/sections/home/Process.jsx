import { ChevronRight } from 'lucide-react';
import { HOME_PROCESS_STEPS } from '@/constants/homeData';

const Process = () => {
  return (
    <section className="py-16 sm:py-20 flex justify-center px-4 bg-(--nb-surface)">
      <div className="nb-container w-full ">
        <div className="mb-10 text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--nb-text)">
            How we deliver results
          </h2>
          <p className="mt-3 text-base text-(--nb-text-muted) max-w-lg">
            A tight, four-step execution loop designed for compounding growth.
          </p>
        </div>

        <div className="relative w-full rounded-2xl border border-(--nb-border) bg-(--nb-surface-soft) overflow-hidden shadow-sm flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-(--nb-border)">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-(--nb-accent) to-transparent opacity-40" />

          {HOME_PROCESS_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group relative flex-1 p-10 transition-colors duration-300 hover:bg-(--nb-surface)"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-(--nb-text) text-(--nb-surface) shadow-sm transition-transform group-hover:scale-110">
                      <Icon size={14} strokeWidth={2.5} />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-(--nb-text-muted)">
                      Phase 0{index + 1}
                    </span>
                  </div>

                  {index < HOME_PROCESS_STEPS.length - 1 && (
                    <ChevronRight
                      size={16}
                      className="hidden lg:block text-(--nb-border) absolute -right-2 top-6 bg-(--nb-surface-soft) z-10"
                    />
                  )}
                </div>

                <h3 className="text-lg font-bold text-(--nb-text) mb-1.5">{step.title}</h3>
                <p className="text-sm leading-relaxed text-(--nb-text-muted)">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
