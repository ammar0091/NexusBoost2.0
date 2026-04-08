import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const About = () => {
  return (
    <section className="relative py-20 bg-(--nb-surface)">
      <div className="nb-container  relative">
        
        <div className="flex flex-col md:flex-row items-center gap-0">
          
          {/* Left: The Visual Anchor */}
          <div className="relative z-10 w-full md:w-1/2 group">
            <div className="overflow-hidden rounded-sm border border-(--nb-border)/50 p-1 bg-(--nb-surface-soft)">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="NexusBoost Collective"
                className="aspect-5/5 w-full object-cover  transition-all duration-1000  group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right: The Floating Content Block */}
          <div className="relative z-20 w-full md:w-2/3 md:-ml-20 mt-8 md:mt-24 p-8 md:p-12 bg-(--nb-surface) border border-(--nb-border)/40 shadow-2xl backdrop-blur-md">
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-(--nb-accent)">
                About NexusBoost
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-(--nb-text) leading-tight">
              Honest work <br />
              <span className="italic font-serif opacity-70">built</span> to last.
            </h2>

            <p className="mt-6 text-md leading-relaxed text-(--nb-text-muted) font-light tracking-wide italic">
              "We grew tired of agencies that sell dreams but deliver reports. We're here to build websites that actually solve business problems."
            </p>

            <div className="mt-8 flex items-center justify-between border-t border-(--nb-border)/30 pt-6">
               <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-(--nb-text)">Read Full story</span>
                 
               </div>

               <Link
                  to="/about"
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-(--nb-border) transition-all duration-500 hover:bg-(--nb-accent) hover:border-(--nb-accent) hover:text-slate-950"
                >
                  <ArrowUpRight size={18} />
                </Link>
            </div>
          </div>

        </div>

        {/* Decorative Vertical Text (Compact detail) */}
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block">
          <p className="rotate-90 origin-bottom-right text-[9px] font-bold tracking-[0.6em] uppercase text-(--nb-text-muted)/30">
            NexusBoost Studio
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;