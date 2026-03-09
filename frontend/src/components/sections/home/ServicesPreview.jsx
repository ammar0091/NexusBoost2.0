import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Code2,
  Megaphone,
  Palette,
  Search,
  BarChart3,
} from "lucide-react";

const services = [
  {
    title: "SEO Optimization",
    desc: "Dominate organic search with data-backed content strategies.",
    icon: Search,
  },
  {
    title: "Social Marketing",
    desc: "Build brand authority and viral engagement at scale.",
    icon: Megaphone,
  },
  {
    title: "Performance Ads",
    desc: "ROI-driven advertising across Google and Meta ecosystem.",
    icon: BarChart3,
  },
  {
    title: "Branding & Design",
    desc: "Crafting visual identities that convert attention into trust.",
    icon: Palette,
  },
  {
    title: "Web Development",
    desc: "High-conversion digital experiences built for speed.",
    icon: Code2,
  },
];

const ServicesPreview = () => {
  return (
    <section className="nb-section">
      <div className="nb-container">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="nb-pill border border-(--nb-border) bg-(--nb-surface) text-(--nb-accent) mb-4">
              Services
            </p>

            <h2 className="text-3xl md:text-4xl font-black text-(--nb-text) leading-[0.95] max-w-2xl">
              WHAT WE <span className="text-(--nb-text-muted)">DELIVER.</span>
            </h2>
          </div>

          <Link
            to="/services"
            className="rounded-xl border border-(--nb-border) bg-(--nb-surface) px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-(--nb-text) hover:border-(--nb-accent)"
          >
            View All Services
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="nb-panel h-full min-h-50 p-5 relative overflow-hidden transition-all duration-300  group"
              >
                {/* Glow */}
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full  " />

                {/* Icon */}
                <span className="inline-flex rounded-lg border border-(--nb-border) bg-(--nb-surface-soft) p-2 text-(--nb-accent)]">
                  <Icon size={18} />
                </span>

                {/* Content */}
                <h3 className="mt-4 text-xl font-bold text-(--nb-text) flex items-center justify-between">
                  {service.title}
                  <ArrowUpRight
                    size={16}
                    className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition"
                  />
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-(--nb-text-muted)">
                  {service.desc}
                </p>
              </article>
            );
          })}

          {/* CTA Card */}
          <div className="nb-panel flex flex-col items-center justify-center text-center p-6 border-dashed">
            <p className="text-sm font-bold text-(--nb-text) mb-2">
              Need something custom?
            </p>

            <p className="text-xs text-(--nb-text-muted) mb-4">
              We build bespoke digital solutions.
            </p>

            <Link
              to="/contact"
              className="rounded-lg bg-(--nb-accent) text-white px-5 py-2 text-[11px] font-black uppercase tracking-wider hover:opacity-90"
            >
              Request Audit
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;