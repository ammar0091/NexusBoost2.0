import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const About = () => {
  return (
    <section className="nb-section">
      <div className="nb-container grid gap-8 lg:grid-cols-12 items-center">
        <div className="lg:col-span-5">
          <div className="nb-panel p-3">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
              alt="NexusBoost team collaborating"
              className="h-[390px] w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="nb-pill border border-[var(--nb-border)] bg-[var(--nb-surface)] text-[var(--nb-accent)] mb-5">
            <Sparkles size={12} />
            About NexusBoost
          </p>

          <h2 className="text-3xl md:text-5xl font-black leading-[0.95] text-[var(--nb-text)] max-w-2xl">
            We turn brand vision into conversion-ready digital systems.
          </h2>

          <p className="mt-5 text-base md:text-lg text-[var(--nb-text-muted)] leading-relaxed max-w-2xl">
            Strategy, design, and engineering run in one integrated team, so execution stays sharp and measurable.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="nb-soft-panel px-4 py-3 flex items-center gap-3">
              <ShieldCheck size={18} className="text-emerald-400" />
              <span className="text-sm text-[var(--nb-text-muted)]">Brand-safe and performance-first</span>
            </div>
            <div className="nb-soft-panel px-4 py-3 flex items-center gap-3">
              <Zap size={18} className="text-[var(--nb-accent)]" />
              <span className="text-sm text-[var(--nb-text-muted)]">Fast launch cycles with clear KPIs</span>
            </div>
          </div>

          <Link
            to="/about"
            className="mt-7 inline-flex items-center gap-2 rounded-xl border border-[var(--nb-border)] bg-[var(--nb-surface)] px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--nb-text)] hover:border-[var(--nb-accent)]"
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
