import { Link } from 'react-router-dom';

const PageCTA = ({
  eyebrow = 'Let’s Talk',
  title,
  highlight,
  description,
  primary = 'Book a Strategy Call',
  secondary,
}) => {
  return (
    <section className="relative py-28 overflow-hidden bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

        {/* Eyebrow */}
        <p className="font-black uppercase tracking-[0.35em] text-[11px] mb-6 text-blue-600">
          {eyebrow}
        </p>

        {/* Heading */}
        <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-slate-900 mb-6">
          {title}{' '}
          <span className="text-slate-400">{highlight}</span>
        </h2>

        {/* Description */}
        {description && (
          <p className="text-lg max-w-2xl mx-auto mb-12 leading-relaxed text-slate-600">
            {description}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/contact"className="px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm bg-slate-900 text-white hover:bg-blue-600 transition-colors">
            {primary}
          </Link>

          {secondary && (
            <Link to="/portfolio" className="px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm border border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-colors">
              {secondary}
            </Link>
          )}
        </div>
      </div>

      {/* Subtle texture (light-only) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.035)_1px,transparent_0)] bg-size-[28px_28px]" />
    </section>
  );
};

export default PageCTA;
