import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { HOME_WHY_CHOOSE_US_FEATURES } from '@/constants/homeData';

const WhyChooseUs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="nb-section py-20 sm:py-28 overflow-hidden">
      <div className="nb-container">
        <div className="mb-16   mx-auto">
          <p className="mb-4 inline-flex items-center justify-center rounded-full border border-(--nb-border) bg-(--nb-surface-soft) px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-(--nb-text-muted)">
            Why NexusBoost
          </p>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-(--nb-text) leading-[1.1]">
            Growth engineered for{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--nb-text) to-(--nb-text-muted)/30">
              momentum.
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-5 flex flex-col gap-2">
            {HOME_WHY_CHOOSE_US_FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              const isActive = activeTab === idx;

              return (
                <button
                  key={feature.title}
                  onClick={() => setActiveTab(idx)}
                  className={`group relative w-full text-left p-6 rounded-2xl transition-all duration-300 border ${
                    isActive
                      ? 'bg-(--nb-surface-soft) border-(--nb-border) shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-(--nb-surface-soft)/50'
                  }`}
                >
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300 bg-(--nb-accent) ${
                      isActive ? 'h-12 opacity-100' : 'h-0 opacity-0'
                    }`}
                  />

                  <div className="flex items-start gap-5">
                    <div
                      className={`mt-0.5 transition-colors duration-300 ${
                        isActive ? 'text-(--nb-accent)' : 'text-(--nb-text-muted) group-hover:text-(--nb-text)'
                      }`}
                    >
                      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-bold transition-colors duration-300 ${
                          isActive ? 'text-(--nb-text)' : 'text-(--nb-text-muted) group-hover:text-(--nb-text)'
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isActive ? 'grid-rows-[1fr] mt-2 opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <p className="overflow-hidden text-sm leading-relaxed text-(--nb-text-muted) pr-4">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative w-full aspect-square sm:aspect-5/3 rounded-4xl border border-(--nb-border) bg-(--nb-surface-soft) overflow-hidden shadow-2xl">
              <img
                key={activeTab}
                src={HOME_WHY_CHOOSE_US_FEATURES[activeTab].image}
                alt={HOME_WHY_CHOOSE_US_FEATURES[activeTab].title}
                className="absolute inset-0 h-full w-full object-cover animate-in fade-in zoom-in-95 duration-700"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-linear-to-t from-(--nb-surface) via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                <div className="inline-flex items-center gap-3 rounded-full border border-(--nb-border)/50 bg-(--nb-surface)/80 px-4 py-2 backdrop-blur-md animate-in slide-in-from-bottom-4 fade-in duration-500 delay-150">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-(--nb-text) text-(--nb-surface)">
                    <ArrowRight size={12} />
                  </span>
                  <span className="text-xs font-bold text-(--nb-text)">
                    {HOME_WHY_CHOOSE_US_FEATURES[activeTab].title}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
