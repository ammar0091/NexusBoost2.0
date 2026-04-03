  import { useState } from 'react';
  import { Compass, Eye, Handshake, Zap, ArrowRight } from 'lucide-react';

  // Maine har feature ke liye ek alag image add ki hai
  const features = [
    {
      title: 'Strategy first',
      desc: 'Every sprint starts with search intent, funnel gaps, and revenue goals rather than random task lists.',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Transparent reporting',
      desc: 'You always know what shipped, what improved, and which SEO or campaign opportunities come next.',
      icon: Eye,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Fast execution',
      desc: 'Lean specialists move quickly across content, design, ads, and development without losing quality.',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Long-term partner',
      desc: 'We build systems that keep compounding as your content library, rankings, and acquisition channels expand.',
      icon: Handshake,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const WhyChooseUs = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
      <section className="nb-section py-20 sm:py-28 overflow-hidden">
        <div className="nb-container">
          
          {/* Minimal Centered Header */}
          <div className="mb-16   mx-auto">
            <p className="mb-4 inline-flex items-center justify-center rounded-full border border-(--nb-border) bg-(--nb-surface-soft) px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-(--nb-text-muted)">
              Why NexusBoost 
            </p>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-(--nb-text) leading-[1.1]">
              Growth engineered for <span className="text-transparent bg-clip-text bg-linear-to-r from-(--nb-text) to-(--nb-text-muted)/30">momentum.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Side: Interactive Tabs */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              {features.map((feature, idx) => {
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
                    {/* Active Indicator Line */}
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300 bg-(--nb-accent) ${
                      isActive ? 'h-12 opacity-100' : 'h-0 opacity-0'
                    }`} />

                    <div className="flex items-start gap-5">
                      <div className={`mt-0.5 transition-colors duration-300 ${isActive ? 'text-(--nb-accent)' : 'text-(--nb-text-muted) group-hover:text-(--nb-text)'}`}>
                        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold transition-colors duration-300 ${isActive ? 'text-(--nb-text)' : 'text-(--nb-text-muted) group-hover:text-(--nb-text)'}`}>
                          {feature.title}
                        </h3>
                        {/* Description animates in/out based on active state */}
                        <div className={`grid transition-all duration-300 ease-in-out ${isActive ? 'grid-rows-[1fr] mt-2 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                          <p className="overflow-hidden text-sm leading-relaxed text-(--nb-text-muted) pr-4">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Side: Dynamic Visual Window */}
            <div className="lg:col-span-7 relative">
              <div className="relative w-full aspect-square sm:aspect-5/3 rounded-4xl border border-(--nb-border) bg-(--nb-surface-soft) overflow-hidden shadow-2xl">
                
                {/* React Key force re-renders the image for a smooth transition effect */}
                <img
                  key={activeTab}
                  src={features[activeTab].image}
                  alt={features[activeTab].title}
                  className="absolute inset-0 h-full w-full object-cover animate-in fade-in zoom-in-95 duration-700"
                  loading="lazy"
                />
                
                {/* Gradient Overlay for Premium Look */}
                <div className="absolute inset-0 bg-linear-to-t from-(--nb-surface) via-transparent to-transparent opacity-80" />
                
                {/* Dynamic Floating Badge inside Image */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                  <div className="inline-flex items-center gap-3 rounded-full border border-(--nb-border)/50 bg-(--nb-surface)/80 px-4 py-2 backdrop-blur-md animate-in slide-in-from-bottom-4 fade-in duration-500 delay-150">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-(--nb-text) text-(--nb-surface)">
                      <ArrowRight size={12} />
                    </span>
                    <span className="text-xs font-bold text-(--nb-text)">
                      {features[activeTab].title}
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