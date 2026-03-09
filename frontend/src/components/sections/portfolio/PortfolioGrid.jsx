import { ArrowUpRight } from 'lucide-react';

const PortfolioGrid = ({ projects }) => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-20">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tight">
            <span className="block text-slate-400">Case Studies</span>
          </h2>

          <p className="text-slate-600 max-w-sm leading-relaxed text-lg">
            Real projects. Measurable outcomes. Work that actually moved the needle.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <div
              key={project.id || i}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 hover:border-blue-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="relative p-8 bg-white">
                <p className="text-[11px] font-black uppercase tracking-widest text-blue-600 mb-3">
                  {project.category}
                </p>

                <h3 className="text-2xl font-extrabold text-slate-900 mb-3 flex items-center justify-between">
                  {project.title}
                  <ArrowUpRight
                    size={20}
                    className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  />
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6">
                  {project.desc}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                  View case study
                  <span className="w-6 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </span>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 h-0.75 w-0 bg-linear-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
          {!projects.length ? (
            <p className="text-slate-500 font-semibold col-span-full">No portfolio projects found.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
