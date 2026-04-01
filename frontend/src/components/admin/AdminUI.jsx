/* eslint-disable react-refresh/only-export-components */
import { CheckCircle2 } from 'lucide-react';

export const INITIAL_BLOG = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: '',
  coverImage: '',
  readTime: 5,
  seoTitle: '',
  seoDescription: '',
  publishedAt: '',
  featured: false,
  sourceFile: null,
};

export const INITIAL_PROJECT = {
  title: '',
  slug: '',
  category: '',
  desc: '',
  content: '',
  seoTitle: '',
  seoDescription: '',
  image: '',
};

export const INITIAL_CLIENT = {
  name: '',
  logo: '',
  industry: '',
  summary: '',
  website: '',
  image: '',
};

export const INITIAL_TEAM = {
  name: '',
  role: '',
  image: '',
  order: 0,
};

export function toDateInput(value) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
}

export function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '-'
    : new Intl.DateTimeFormat('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

export function getCategoryName(category) {
  return typeof category === 'string' ? category : category?.name || 'Uncategorized';
}

export function joinClasses(...values) {
  return values.filter(Boolean).join(' ');
}

export const Input = ({ label, className = '', ...props }) => (
  <div className="space-y-2">
    {label ? <label className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">{label}</label> : null}
    <input
      className={joinClasses(
        'w-full rounded-2xl border border-neutral-800 bg-[#0b0b0b] px-4 py-3.5 text-sm text-neutral-100 outline-none transition placeholder:text-neutral-600 focus:border-neutral-500 focus:bg-[#0f0f0f]',
        className,
      )}
      {...props}
    />
  </div>
);

export const Textarea = ({ label, rows = 3, className = '', ...props }) => (
  <div className="space-y-2">
    {label ? <label className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">{label}</label> : null}
    <textarea
      rows={rows}
      className={joinClasses(
        'w-full rounded-2xl border border-neutral-800 bg-[#0b0b0b] px-4 py-3.5 text-sm leading-7 text-neutral-100 outline-none transition placeholder:text-neutral-600 focus:border-neutral-500 focus:bg-[#0f0f0f]',
        className,
      )}
      {...props}
    />
  </div>
);

export const Button = ({ children, variant = 'primary', isLoading, className = '', ...props }) => {
  const variants = {
    primary: 'bg-white text-black hover:bg-neutral-200 font-medium shadow-[0_12px_30px_rgba(255,255,255,0.08)]',
    secondary: 'border border-neutral-800 bg-[#0b0b0b] text-neutral-200 hover:bg-[#121212]',
    ghost: 'bg-transparent text-neutral-400 hover:bg-[#101010] hover:text-white',
    danger: 'border border-red-500/20 bg-red-500/8 text-red-300 hover:bg-red-500/12',
  };

  return (
    <button
      disabled={isLoading || props.disabled}
      className={joinClasses(
        'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      )}
      {...props}
    >
      {isLoading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : children}
    </button>
  );
};

export const AdminPageHeader = ({ eyebrow, title, description, actions }) => (
  <div className="mb-8 flex flex-col gap-4 border-b border-neutral-900 pb-6 md:flex-row md:items-end md:justify-between">
    <div className="max-w-3xl">
      {eyebrow ? <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">{eyebrow}</p> : null}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">{title}</h1>
      {description ? <p className="mt-2 text-sm leading-relaxed text-neutral-400 md:text-base">{description}</p> : null}
    </div>
    {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
  </div>
);

export const AdminSurface = ({ className = '', children }) => (
  <div className={joinClasses('rounded-[28px] border border-neutral-900 bg-[#070707]', className)}>{children}</div>
);

export const AdminHero = ({ eyebrow, title, description, stats = [], actions }) => (
  <AdminSurface className="relative overflow-hidden p-6 md:p-7">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,201,76,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(120,119,198,0.14),transparent_28%)]" />
    <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
      <div className="max-w-3xl space-y-3">
        {eyebrow ? <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">{eyebrow}</p> : null}
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-[2.4rem] md:leading-[1]">{title}</h1>
        {description ? <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">{description}</p> : null}
      </div>
      {actions ? <div className="relative flex flex-wrap gap-2">{actions}</div> : null}
    </div>
    {stats.length ? (
      <div className="relative mt-6 grid gap-3 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">{stat.label}</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{stat.value}</p>
            {stat.helper ? <p className="mt-1 text-xs text-neutral-500">{stat.helper}</p> : null}
          </div>
        ))}
      </div>
    ) : null}
  </AdminSurface>
);

export const AdminSection = ({ eyebrow, title, description, children, className = '' }) => (
  <AdminSurface className={joinClasses('p-5 md:p-6', className)}>
    {eyebrow || title ? (
      <div className="mb-5 border-b border-neutral-900 pb-4">
        {eyebrow ? <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">{eyebrow}</p> : null}
        {title ? <h2 className="mt-2 text-lg font-semibold text-white md:text-xl">{title}</h2> : null}
        {description ? <p className="mt-2 text-sm leading-relaxed text-neutral-500">{description}</p> : null}
      </div>
    ) : null}
    {children}
  </AdminSurface>
);

export const AdminSubsection = ({ title, description, children, className = '' }) => (
  <div className={joinClasses('rounded-2xl border border-neutral-900 bg-[#0b0b0b] p-4 md:p-5', className)}>
    <div className="mb-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">{title}</h3>
      {description ? <p className="mt-1 text-sm leading-relaxed text-neutral-500">{description}</p> : null}
    </div>
    {children}
  </div>
);

export const AdminFieldGrid = ({ className = '', children }) => (
  <div className={joinClasses('grid gap-4 md:grid-cols-2', className)}>{children}</div>
);

export const AdminStack = ({ className = '', children }) => <div className={joinClasses('space-y-4', className)}>{children}</div>;

export const AdminList = ({ className = '', children }) => <div className={joinClasses('space-y-3', className)}>{children}</div>;

export const AdminBadge = ({ children, tone = 'neutral', className = '' }) => {
  const tones = {
    neutral: 'border-neutral-800 bg-[#111111] text-neutral-300',
    accent: 'border-amber-500/20 bg-amber-500/10 text-amber-200',
    success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-200',
    muted: 'border-neutral-900 bg-[#090909] text-neutral-500',
  };

  return (
    <span className={joinClasses('inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em]', tones[tone], className)}>
      {children}
    </span>
  );
};

export const AdminPreviewCard = ({ image, eyebrow, title, description, footer, emptyLabel = 'Preview' }) => (
  <AdminSurface className="overflow-hidden">
    <div className="h-48 border-b border-neutral-900 bg-[#0b0b0b]">
      {image ? (
        <img src={image} alt={typeof emptyLabel === 'string' ? title || emptyLabel : title || 'Preview'} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-neutral-600">{emptyLabel}</div>
      )}
    </div>
    <div className="p-5">
      {eyebrow ? <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">{eyebrow}</p> : null}
      {title ? <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3> : null}
      {description ? <p className="mt-2 text-sm leading-relaxed text-neutral-400">{description}</p> : null}
      {footer ? <div className="mt-4">{footer}</div> : null}
    </div>
  </AdminSurface>
);

export const AdminMetaPreview = ({ title, url, description }) => (
  <AdminSurface className="p-5">
    <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Search Preview</p>
    <p className="mt-3 text-base font-medium text-white">{title || 'SEO title preview'}</p>
    <p className="mt-1 break-all text-xs text-neutral-500">{url}</p>
    <p className="mt-2 text-sm leading-relaxed text-neutral-400">
      {description || 'Meta description preview will appear here as you type.'}
    </p>
  </AdminSurface>
);

export const EmptyState = ({ title, description }) => (
  <AdminSurface className="border-dashed p-10 text-center">
    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 bg-[#0b0b0b] text-neutral-400">
      <CheckCircle2 size={18} />
    </div>
    <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
    <p className="mt-2 text-sm text-neutral-500">{description}</p>
  </AdminSurface>
);

export const AdminStatCard = (props) => {
  const Icon = props.icon;

  return (
    <AdminSurface className="p-5">
      <div className="flex items-center justify-between text-neutral-400">
        <span className="text-sm">{props.label}</span>
        <Icon className={`h-4 w-4 ${props.highlight ? 'text-white' : 'text-neutral-600'}`} />
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{props.value || 0}</p>
    </AdminSurface>
  );
};
