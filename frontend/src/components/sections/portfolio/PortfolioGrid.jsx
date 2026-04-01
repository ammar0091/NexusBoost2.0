import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const PortfolioGrid = ({ projects }) => {
  return (
    <section className="nb-section pt-6">
      <div className="nb-container">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <h2 className="text-3xl font-black leading-[0.95] text-(--nb-text) md:text-4xl">SEO and digital growth case studies</h2>
          <p className="max-w-md text-sm leading-relaxed text-(--nb-text-muted) md:text-base">
            Selected projects where strategy, content, design, and execution delivered measurable improvements in traffic, conversion, and lead quality.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.id || index} className="nb-panel overflow-hidden transition-transform duration-300">
              <Link to={`/portfolio/${project.slug || project.id}`} className="block">
                <div className="relative h-60">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="800"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 to-transparent" />
                </div>

                <div className="p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-accent)">
                    {project.category || 'Project'}
                  </p>
                  <h3 className="mt-2 flex items-start justify-between gap-3 text-2xl font-black text-(--nb-text)">
                    {project.title}
                    <ArrowUpRight size={18} className="text-(--nb-text-muted)" />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-(--nb-text-muted)">{project.desc}</p>
                </div>
              </Link>
            </article>
          ))}

          {!projects.length ? (
            <p className="col-span-full rounded-xl border border-(--nb-border) bg-(--nb-surface) px-4 py-5 text-sm text-(--nb-text-muted)">
              No portfolio projects found.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
