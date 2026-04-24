import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play,Coffee, Activity, Target } from 'lucide-react';

const Hero = () => {
  const [activeImg, setActiveImg] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e905263543?auto=format&fit=crop&w=2000&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-screen w-full flex items-center bg-(--nb-surface) overflow-hidden transition-colors duration-500">
      
      {/* --- HIGH VISIBILITY IMAGE ENGINE --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Marketing Context"
            /* Keep background image visible while preserving foreground readability */
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1500 ease-in-out 
              grayscale brightness-75 contrast-150
              ${i === activeImg ? 'opacity-50 dark:opacity-60 scale-110' : 'opacity-0 scale-100'}`}
          />
        ))}
        
        {/* Layer 1: Color Tint - Yeh image ko background color se blend hone se rokega */}
        <div className="absolute inset-0 bg-black/8 dark:bg-black/16" />
        
        {/* Layer 2: Gradient Protection - Bottom aur Top se white fade taaki clean dikhe */}
        <div className="absolute inset-0 bg-linear-to-b from-(--nb-surface) via-transparent to-(--nb-surface) opacity-72 dark:opacity-80" />
      </div>

      <div className="nb-container relative z-10 w-full pt-20">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-12">
          
          {/* TOP TAG */}
            <div className="flex items-center gap-4 mb-2">
            <span className="h-px w-8 bg-(--nb-text)" />
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-(--nb-text)">
              NexusBoost
            </p>
            <span className="h-px w-8 bg-(--nb-text)" />
          </div>

          {/* MAIN TYPOGRAPHY */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-light tracking-tighter text-(--nb-text) leading-[0.9]">
              Result <br /> 
              <span className="font-serif italic text-(--nb-text-muted) opacity-80">Over</span> Voices.
            </h1>

            <p className="max-w-md mx-auto text-sm md:text-base leading-relaxed text-(--nb-text-muted) tracking-wide">
                   We engineer high-frequency digital growth. <br />
              Calculated market dominance for the elite.
            </p>
          </div>

          {/* ACTIONS */}
         <div className="flex flex-col sm:flex-row items-center gap-8 pt-6">
            <Link
              to="/contact"
              className="group flex items-center gap-4 text-[11px]  font-black uppercase tracking-widest text-(--nb-text)"
            >
              Let’s grab a coffee
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-(--nb-border) transition-all group-hover:scale-110 group-hover:bg-(--nb-text) bg-(--nb-surface)/50 backdrop-blur-sm shadow-sm">
                <Coffee size={16} className="text-(--nb-text) group-hover:text-(--nb-surface)" />
              </div>
            </Link>

            <button className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-full border border-(--nb-border) flex items-center justify-center group-hover:bg-(--nb-text) transition-all duration-300">
                <Play size={12} className="text-(--nb-text) group-hover:text-(--nb-surface) fill-current" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-(--nb-text-muted) group-hover:text-(--nb-text)">
                Methodology
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER STRIP */}
      <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col md:flex-row justify-between items-center border-t border-(--nb-border)/30 bg-(--nb-surface)/60 backdrop-blur-xl gap-8">
        <div className="flex gap-16">
          <div className="space-y-1">
            <p className="text-[9px] font-bold text-(--nb-accent) uppercase tracking-widest">Efficiency</p>
            <p className="text-sm font-black text-(--nb-text)">94.2% Success</p>
          </div>
          <div className="space-y-1 border-l border-(--nb-border)/30 pl-16">
            <p className="text-[9px] font-bold text-(--nb-accent) uppercase tracking-widest">Throughput</p>
            <p className="text-sm font-black text-(--nb-text)">6.2x Avg. ROI</p>
          </div>
        </div>
        
        {/* Visual Progress Indicators */}
        <div className="flex gap-2 items-center">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-500 rounded-full ${i === activeImg ? 'w-10 bg-(--nb-accent)' : 'w-2 bg-(--nb-border)'}`} 
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Hero;
