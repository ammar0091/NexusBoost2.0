import { ArrowUpRight } from 'lucide-react';

const PortfolioGrid = ({ projects }) => {
  return (
    <section className="nb-section pt-6">
      <div className="nb-container">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <h2 className="text-3xl md:text-5xl font-black text-[var(--nb-text)] leading-[0.95]">Case studies</h2>
          <p className="max-w-md text-sm md:text-base leading-relaxed text-[var(--nb-text-muted)]">
            Selected projects where strategy and execution delivered measurable business impact.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.id || index} className="nb-panel overflow-hidden">
              <div className="relative h-60">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              </div>

              <div className="p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--nb-accent)]">
                  {project.category || 'Project'}
                </p>
                <h3 className="mt-2 flex items-start justify-between gap-3 text-2xl font-black text-[var(--nb-text)]">
                  {project.title}
                  <ArrowUpRight size={18} className="text-[var(--nb-text-muted)]" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--nb-text-muted)]">{project.desc}</p>
              </div>
            </article>
          ))}

          {!projects.length ? (
            <p className="col-span-full rounded-xl border border-[var(--nb-border)] bg-[var(--nb-surface)] px-4 py-5 text-sm text-[var(--nb-text-muted)]">
              No portfolio projects found.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
