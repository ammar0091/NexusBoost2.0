import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const About = () => {
  return (
    <section className="nb-section">
      <div className="nb-container grid items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="nb-panel p-3">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="NexusBoost team collaborating on SEO and website strategy"
              className="h-97.5 w-full rounded-2xl object-cover"
              loading="lazy"
              decoding="async"
              width="1200"
              height="900"
              sizes="(min-width: 1024px) 420px, 100vw"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="nb-pill mb-5 border border-(--nb-border) bg-(--nb-surface) text-(--nb-accent)">
            <Sparkles size={12} />
            About NexusBoost
          </p>

          <h2 className="max-w-2xl text-3xl font-black leading-[0.95] text-(--nb-text) md:text-4xl">
            We turn brand vision into SEO-ready, conversion-focused digital systems.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-(--nb-text-muted) md:text-lg">
            Strategy, content, design, and engineering sit inside one integrated delivery team, so your website and digital marketing stack stays fast, aligned, and measurable from day one.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="nb-soft-panel flex items-center gap-3 px-4 py-3">
              <ShieldCheck size={18} className="text-emerald-400" />
              <span className="text-sm text-(--nb-text-muted)">Search-friendly structure and brand-safe messaging</span>
            </div>
            <div className="nb-soft-panel flex items-center gap-3 px-4 py-3">
              <Zap size={18} className="text-(--nb-accent)" />
              <span className="text-sm text-(--nb-text-muted)">Fast launch cycles with analytics and KPI clarity</span>
            </div>
          </div>

          <Link
            to="/about"
            className="mt-7 inline-flex items-center gap-2 rounded-xl border border-(--nb-border) bg-(--nb-surface) px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-(--nb-text) hover:border-(--nb-accent)"
          >
            Read Our Story
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
