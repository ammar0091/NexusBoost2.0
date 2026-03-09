import { Compass, Eye, Handshake, Zap } from "lucide-react";

const reasons = [
  {
    title: "Strategy first",
    desc: "Every sprint starts with business goals and user intent, not random tasks.",
    icon: Compass,
  },
  {
    title: "Transparent reporting",
    desc: "You see what shipped, what moved, and what we improve next.",
    icon: Eye,
  },
  {
    title: "Fast execution",
    desc: "Lean teams, high ownership, and tight quality control.",
    icon: Zap,
  },
  {
    title: "Long-term partner",
    desc: "We build systems that keep working as your business scales.",
    icon: Handshake,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="nb-section">
      <div className="nb-container grid lg:grid-cols-2 gap-16">

        {/* LEFT SIDE */}
        <div className="relative">

          <p className="nb-pill border border-[var(--nb-border)] bg-[var(--nb-surface)] text-[var(--nb-accent)] mb-4">
            Why Us
          </p>

          <h2 className="text-4xl md:text-5xl font-black leading-[0.95] text-[var(--nb-text)]">
            Built on <br />
            <span className="text-[var(--nb-text-muted)]">clarity & momentum</span>
          </h2>

          <p className="mt-6 max-w-sm text-[var(--nb-text-muted)] leading-relaxed">
            We focus on meaningful progress. Every system we design is built
            to move your business forward.
          </p>

          {/* Vertical Line */}
          <div className="hidden lg:block absolute left-3 top-40 h-[70%] w-px bg-[var(--nb-border)]" />

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-10">

          {reasons.map((reason, i) => {
            const Icon = reason.icon;

            return (
              <div key={reason.title} className="group flex gap-6 relative">

                {/* ICON + CONNECTOR */}
                <div className="flex flex-col items-center">

                  <div className="w-10 h-10 rounded-full border border-[var(--nb-border)] bg-[var(--nb-surface)] flex items-center justify-center text-[var(--nb-accent)] transition-transform duration-300 group-hover:scale-110">
                    <Icon size={18} />
                  </div>

                  {i !== reasons.length - 1 && (
                    <div className="w-px flex-1 bg-[var(--nb-border)] mt-2" />
                  )}

                </div>

                {/* CONTENT */}
                <div>

                  <h3 className="text-lg font-bold text-[var(--nb-text)]">
                    {reason.title}
                  </h3>

                  <p className="text-sm text-[var(--nb-text-muted)] leading-relaxed max-w-md mt-1">
                    {reason.desc}
                  </p>

                  {/* Hover underline */}
                  <div className="mt-4 w-6 h-1 rounded-full bg-[var(--nb-border)] group-hover:w-20 group-hover:bg-[var(--nb-accent)] transition-all duration-500" />

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;