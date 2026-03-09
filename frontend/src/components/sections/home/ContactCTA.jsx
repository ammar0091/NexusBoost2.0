import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Sparkles } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="nb-section pt-6">
      <div className="nb-container">

        <div className="nb-panel relative overflow-hidden p-8 md:p-12">

          {/* Glow Effects */}
          <div className="absolute -right-16 -top-12 h-52 w-52 rounded-full bg-[var(--nb-glow-a)] blur-3xl" />
          <div className="absolute -left-10 -bottom-12 h-48 w-48 rounded-full bg-[var(--nb-glow-b)] blur-3xl" />

          <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

            {/* Left Content */}
            <div className="max-w-xl">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--nb-surface-soft)] text-[var(--nb-accent)] text-[10px] font-black uppercase tracking-widest mb-4 border border-[var(--nb-border)]">
                <Sparkles size={12} />
                Let's grow your brand
              </div>

              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--nb-text)] leading-tight mb-4">
                Ready to <span className="text-[var(--nb-accent)]">Scale?</span>
              </h2>

              <p className="text-[var(--nb-text-muted)] text-base md:text-lg leading-relaxed">
                Transforming ideas into digital excellence. Your growth story starts with a single conversation.
              </p>

            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--nb-accent)] px-8 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-slate-950 hover:brightness-110 active:scale-95"
              >
                Start Project
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <a
                href="mailto:hello@nexusboost.com"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--nb-border)] bg-[var(--nb-surface)] px-8 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--nb-text)] hover:border-[var(--nb-accent)]"
              >
                <Mail size={15} />
                Email Us
              </a>

            </div>

          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-8 px-2">

          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-[var(--nb-text)]">100+</span>
            <span className="text-[10px] font-black text-[var(--nb-text-muted)] uppercase tracking-widest">
              Global Clients
            </span>
          </div>

          <div className="w-px h-4 bg-[var(--nb-border)] hidden md:block self-center" />

          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-[var(--nb-text)]">98%</span>
            <span className="text-[10px] font-black text-[var(--nb-text-muted)] uppercase tracking-widest">
              Success Rate
            </span>
          </div>

          <div className="w-px h-4 bg-[var(--nb-border)] hidden md:block self-center" />

          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-[var(--nb-text)]">24/7</span>
            <span className="text-[10px] font-black text-[var(--nb-text-muted)] uppercase tracking-widest">
              Expert Support
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactCTA;