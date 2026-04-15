import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Zap, Coffee } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative  flex items-center pt-20 overflow-hidden bg-(--nb-surface)">
      {/* Structural Lines */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-(--nb-border)/30 hidden lg:block" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-(--nb-border)/30 hidden lg:block" />

      <div className="nb-container relative">
        <div className="grid items-stretch lg:grid-cols-2">
          
          {/* Left: Human-Centric Copy */}
          <div className="flex flex-col justify-center py-20 lg:pr-20">
            <div className="flex items-center gap-4 mb-12">
              <span className="h-px w-12 bg-(--nb-accent)" />
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-(--nb-accent)">
                NexusBoost 
              </p>
            </div>

            <h1 className="text-4xl md:text-6xl font-light tracking-tighter text-(--nb-text) leading-[0.9]">
              Hard work <br /> 
              <span className="font-serif italic text-(--nb-text-muted) opacity-80">made</span> visible.
            </h1>

            <p className="mt-12 max-w-sm text-sm leading-relaxed text-(--nb-text-muted) tracking-wide">
              You’ve built a great business. We just make sure the rest of the world sees it that way too. No complex jargon, just a website that actually works while you sleep.
            </p>

            <div className="mt-12 flex flex-wrap gap-8">
              <Link
                to="/contact"
                className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-(--nb-text)"
              >
                Let’s grab a coffee
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-(--nb-border) transition-transform group-hover:scale-110 group-hover:border-(--nb-accent)">
                  <Coffee size={16} className="text-(--nb-accent)" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Side: Realistic Proof */}
          <div className="relative flex flex-col justify-center py-20 lg:pl-20">
            <div className="relative group">
              <div className="aspect-square w-full  overflow-hidden rounded-sm  transition-all duration-700 ">
                <img
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80"
                  alt="Minimalist Tech"
                  className="h-full w-full object-cover transition-opacity"
                />
              </div>

              {/* Data that humans care about */}
              <div className="absolute -bottom-6 -left-6 bg-(--nb-surface) border border-(--nb-border) p-6 rounded-sm shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <p className="text-[9px] font-bold text-(--nb-text-muted) uppercase tracking-widest opacity-60">Status</p>
                      <p className="text-sm font-bold text-(--nb-text)">Everything running smooth</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Zap size={14} className="text-(--nb-accent)" />
                    <div>
                      <p className="text-[9px] font-bold text-(--nb-text-muted) uppercase tracking-widest opacity-60">Result</p>
                      <p className="text-sm font-bold text-(--nb-text)">Double the clicks, zero stress</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-60 right-0 py-20 hidden lg:block">
              <p className="rotate-90 origin-bottom-right text-[10px] font-bold tracking-[0.5em] uppercase text-(--nb-text-muted)/30">
                Focused on your peace of mind
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
