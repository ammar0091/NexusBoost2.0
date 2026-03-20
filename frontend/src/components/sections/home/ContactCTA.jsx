import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Sparkles } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="nb-section pt-6">
      <div className="nb-container">
        <div className="nb-panel relative overflow-hidden p-8 md:p-12">
          <div className="absolute -right-16 -top-12 h-52 w-52 rounded-full bg-(--nb-glow-a) blur-3xl" />
          <div className="absolute -bottom-12 -left-10 h-48 w-48 rounded-full bg-(--nb-glow-b) blur-3xl" />

          <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-(--nb-border) bg-(--nb-surface-soft) px-3 py-1 text-[10px] font-black uppercase tracking-widest text-(--nb-accent)">
                <Sparkles size={12} />
                Lets grow your brand
              </div>

              <h2 className="mb-4 text-4xl font-black leading-tight tracking-tight text-(--nb-text) md:text-5xl">
                Ready to <span className="text-(--nb-accent)">scale search visibility and conversion?</span>
              </h2>

              <p className="text-base leading-relaxed text-(--nb-text-muted) md:text-lg">
                From SEO and content strategy to websites, paid media, and reporting, we build the systems ambitious brands need to grow with confidence.
              </p>
            </div>

            <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-(--nb-accent) px-8 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-slate-950 hover:brightness-110 active:scale-95"
              >
                Start Project
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <a
                href="mailto:hello@nexusboost.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-(--nb-border) bg-(--nb-surface) px-8 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-(--nb-text) hover:border-(--nb-accent)"
              >
                <Mail size={15} />
                Email Us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-8 px-2 lg:justify-start">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-(--nb-text)">100+</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-(--nb-text-muted)">Global campaigns</span>
          </div>

          <div className="hidden h-4 w-px self-center bg-(--nb-border) md:block" />

          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-(--nb-text)">98%</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-(--nb-text-muted)">Client satisfaction</span>
          </div>

          <div className="hidden h-4 w-px self-center bg-(--nb-border) md:block" />

          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-(--nb-text)">24/7</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-(--nb-text-muted)">Growth support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
