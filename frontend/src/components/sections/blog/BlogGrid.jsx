import { ArrowUpRight } from 'lucide-react';

const getCategoryName = (category) => {
  if (!category) return 'General';
  if (typeof category === 'string') return category;
  return category.name || 'General';
};

const formatDate = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const BlogGrid = ({ posts }) => {
  return (
    <section className="nb-section pt-6">
      <div className="nb-container">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="nb-panel overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-52 w-full object-cover"
                loading="lazy"
              />

              <div className="p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--nb-accent)]">
                  {getCategoryName(post.category)}
                </p>

                <h3 className="mt-2 flex items-start justify-between gap-2 text-xl font-black text-[var(--nb-text)]">
                  {post.title}
                  <ArrowUpRight size={16} className="text-[var(--nb-text-muted)]" />
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[var(--nb-text-muted)]">{post.excerpt}</p>

                <div className="mt-4 flex items-center justify-between text-xs text-[var(--nb-text-muted)]">
                  <span>{post.readTime} min read</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>
            </article>
          ))}

          {!posts.length ? (
            <p className="col-span-full rounded-xl border border-[var(--nb-border)] bg-[var(--nb-surface)] px-4 py-5 text-sm text-[var(--nb-text-muted)]">
              No blogs published yet.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
