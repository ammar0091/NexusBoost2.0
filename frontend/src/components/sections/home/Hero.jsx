import { Link } from 'react-router-dom';
import { ArrowUpRight, BadgeCheck, PlayCircle, Sparkles, TrendingUp } from 'lucide-react';

const partners = ['Astra', 'Nova', 'Glyph', 'Pulse'];

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-14 lg:pt-40 lg:pb-20">
      <div className="absolute inset-0 pointer-events-none nb-grid-lines opacity-40" />

      <div className="nb-container relative z-10">
        <div className="grid items-center gap-9 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="nb-pill border border-(--nb-border) bg-(--nb-surface) text-(--nb-accent) mb-5">
              <Sparkles size={12} />
              Growth Design Studio
            </p>

            <h1 className="text-4xl sm:text-5xl xl:text-7xl font-black leading-[0.9] text-(--nb-text) max-w-3xl">
              Modern websites that feel premium and convert fast.
            </h1>

            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-(--nb-text-muted)">
              NexusBoost builds sharp digital identities, fast websites, and acquisition systems for ambitious brands.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="nb-shine inline-flex items-center gap-2 rounded-xl bg-(--nb-accent) px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.18em] text-slate-950"
              >
                Start Project
                <ArrowUpRight size={16} />
              </Link>

              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-(--nb-border) bg-(--nb-surface) px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.18em] text-(--nb-text) hover:border-(--nb-accent)"
              >
                Explore Work
                <PlayCircle size={16} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
              <div className="nb-soft-panel px-3 py-2 flex items-center gap-2 text-(--nb-text-muted)">
                <BadgeCheck size={15} className="text-emerald-400" />
                100+ launches delivered
              </div>
              <div className="nb-soft-panel px-3 py-2 flex items-center gap-2 text-(--nb-text-muted)">
                <TrendingUp size={15} className="text-(--nb-accent)" />
                Avg growth uplift 2.7x
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {partners.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-(--nb-border) bg-(--nb-surface) px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-text-muted)"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="nb-panel p-3 sm:p-4 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80"
                alt="Team designing a modern website"
                className="h-95 w-full rounded-2xl object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-3 rounded-2xl bg-linear-to-t from-black/55 to-transparent" />

              <div className="absolute left-6 top-6 nb-sticker border border-white/30 bg-black/50 text-white">
                Fresh UI Drop
              </div>

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-black/45 px-4 py-3 text-white backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">Live Dashboard</p>
                <p className="mt-1 text-2xl font-black">+148% qualified leads</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
