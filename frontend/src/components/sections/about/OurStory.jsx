import { OUR_STORY_CONTENT, OUR_STORY_IMAGES } from '@/constants/aboutData';
import { Target, ArrowUpRight } from 'lucide-react';

const OurStory = () => {
  const [primary, secondary] = OUR_STORY_IMAGES;
  const { eyebrow, titlePrefix, titleBrand, highlight, paragraphs } = OUR_STORY_CONTENT;

  return (
    <section className="relative py-24  bg-(--nb-surface) overflow-hidden transition-all duration-700">
      
      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-(--nb-text)/2 hidden lg:block" />
      
     <div className="absolute top-3 left-10 opacity-10 pointer-events-none">
        <p className="text-[12rem] font-black leading-none text-(--nb-text) select-none">STORY</p>
      </div>

      <div className="nb-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">

          {/* 🖼️ LEFT: IMAGE STACK */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 w-full max-w-lg mx-auto group">
              
              {/* Main Image - Added 'Smooth Reveal' effect feel */}
              <div className="relative overflow-hidden rounded-sm border border-(--nb-border)/50 shadow-[40px_40px_80px_-20px_rgba(0,0,0,0.1)]">
                <img
                  src={primary.src}
                  alt={primary.alt}
                  className="w-full aspect-5/5 object-cover transition-transform duration-[1.5s] cubic-bezier(0.2, 1, 0.3, 1) group-hover:scale-110"
                />
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-(--nb-surface)/20 to-transparent" />
              </div>

              {/* Floating Secondary Image - Better positioning & contrast */}
              <div className="absolute -bottom-16 -right-8 md:-right-16 w-3/5 aspect-square overflow-hidden rounded-sm border-12 border-(--nb-surface) shadow-2xl z-20 group-hover:-translate-y-2.5 transition-transform duration-700 ease-out">
                <img
                  src={secondary.src}
                  alt={secondary.alt}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Geometric Detail */}
              <div className="absolute -top-8 -left-8 w-32 h-32 border-l border-t border-(--nb-accent)/30 z-0 hidden md:block" />
            </div>
          </div>

          {/* 🧠 RIGHT: EDITORIAL CONTENT */}
          <div className="lg:col-span-6 space-y-12">
            
            <div className="space-y-6">
              {/* Tag / Eyebrow - Modern 'Pill' style */}
              <div className="inline-flex items-center gap-3 px-3 py-1 border border-(--nb-accent)/20 rounded-full">
                <Target size={14} className="text-(--nb-accent)" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-(--nb-accent)">
                  {eyebrow}
                </span>
              </div>

              {/* Main Heading - Clean contrast between weight/style */}
              <h2 className="text-5xl md:text-6xl font-light tracking-[ -0.04em] text-(--nb-text) leading-[0.85]">
                {titlePrefix} <br />
                <span className="font-serif  text-(--nb-accent) lowercase">
                  {titleBrand}
                </span>
              </h2>
              
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-(--nb-accent)" />
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-(--nb-text-muted)">
                  {highlight}
                </p>
              </div>
            </div>

            {/* Typography - Improved readability & hierarchy */}
            <div className="space-y-8 text-base leading-relaxed text-(--nb-text-muted)/90 max-w-xl">
              {paragraphs.map((text, i) => (
                <p 
                  key={i} 
                  className={i === 0 ? "text-xl text-(--nb-text) font-medium leading-snug" : "font-light"}
                >
                  {text}
                </p>
              ))}
              
           
            </div>
          </div>
        </div>
      </div>

      
     

    </section>
  );
};

export default OurStory;