import { ArrowRight } from 'lucide-react';

const PageHero = ({
  eyebrow,
  title,
  highlight,
  description,
  cta,
}) => {
  return (
    <section className="pt-28 pb-10 relative overflow-hidden bg-white text-slate-900 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <p className="font-black uppercase tracking-[0.35em] text-[11px] mb-8 text-blue-600">
          {eyebrow}
        </p>

        <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-[0.95] mb-10">
          {title}
          <br />
          <span className="text-slate-400">{highlight}</span>
        </h1>

        <p className="text-lg lg:text-xl max-w-3xl leading-relaxed mb-12 text-slate-600">
          {description}
        </p>

        {cta && (
          <button className="group inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest border-b-2 border-current pb-2 opacity-80 hover:opacity-100 transition">
            {cta}
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        )}
      </div>

      {/* Background Word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[6rem] lg:text-[12rem] font-black tracking-tighter select-none text-slate-900/8">
          {eyebrow}
        </span>
      </div>
    </section>
  );
};

export default PageHero;
