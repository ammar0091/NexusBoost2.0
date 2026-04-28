import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Play } from 'lucide-react';

const Hero = () => {
  const [activeImg, setActiveImg] = useState(0);

  const images = [
    '/assets/remote/home-hero-slide-analytics.jpg',
    '/assets/remote/home-hero-slide-teamwork.jpg',
    '/assets/remote/home-hero-slide-growth.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-screen w-full flex items-center bg-(--nb-surface) overflow-hidden transition-colors duration-500">
      {/* Background image engine */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Marketing Context"
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1500 ease-in-out
              brightness-95 contrast-110 saturate-110 dark:brightness-70 dark:contrast-130 dark:saturate-90
              ${i === activeImg ? 'opacity-70 dark:opacity-100 scale-110' : 'opacity-0 scale-100'}`}
          />
        ))}

        {/* Keep content readable while preserving image visibility in light mode */}
        <div className="absolute inset-0 bg-white/24 dark:bg-black/18" />
        <div className="absolute inset-0 bg-linear-to-b from-(--nb-surface) via-transparent to-(--nb-surface) opacity-56 dark:opacity-78" />
      </div>

      <div className="nb-container relative z-10 w-full pt-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center space-y-12 text-center">
          <div className="mb-2 flex items-center gap-4">
            <span className="h-px w-8 bg-(--nb-text)" />
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-(--nb-text)">NexusBoost</p>
            <span className="h-px w-8 bg-(--nb-text)" />
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl font-light leading-[0.9] tracking-tighter text-(--nb-text) md:text-6xl">
              Result <br />
              <span className="font-serif italic text-(--nb-text-muted) opacity-80">Over</span> Voices.
            </h1>

            <p className="mx-auto max-w-md text-sm leading-relaxed tracking-wide text-(--nb-text-muted) md:text-base">
              We engineer high-frequency digital growth. <br />
              Calculated market dominance for the elite.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 pt-6 sm:flex-row">
            <Link
              to="/contact"
              className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-(--nb-text)"
            >
              Let&apos;s grab a coffee
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-(--nb-border) bg-(--nb-surface)/50 shadow-sm backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-(--nb-text)">
                <Coffee size={16} className="text-(--nb-text) group-hover:text-(--nb-surface)" />
              </div>
            </Link>

            <button className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-(--nb-border) transition-all duration-300 group-hover:bg-(--nb-text)">
                <Play size={12} className="fill-current text-(--nb-text) group-hover:text-(--nb-surface)" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-(--nb-text-muted) group-hover:text-(--nb-text)">
                Methodology
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 flex w-full flex-col items-center justify-between gap-8 border-t border-(--nb-border)/30 bg-(--nb-surface)/60 p-10 backdrop-blur-xl md:flex-row">
        <div className="flex gap-16">
          <div className="space-y-1">
            <p className="text-[9px] font-bold uppercase tracking-widest text-(--nb-accent)">Efficiency</p>
            <p className="text-sm font-black text-(--nb-text)">94.2% Success</p>
          </div>
          <div className="space-y-1 border-l border-(--nb-border)/30 pl-16">
            <p className="text-[9px] font-bold uppercase tracking-widest text-(--nb-accent)">Throughput</p>
            <p className="text-sm font-black text-(--nb-text)">6.2x Avg. ROI</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${i === activeImg ? 'w-10 bg-(--nb-accent)' : 'w-2 bg-(--nb-border)'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
