import { Link } from 'react-router-dom';
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
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-black leading-[0.95] text-(--nb-text) md:text-4xl">Articles on SEO, content strategy, analytics, and conversion</h2>
          <p className="mt-4 text-sm leading-relaxed text-(--nb-text-muted) md:text-base">
            Practical insights for brands that want better rankings, stronger landing pages, smarter reporting, and more efficient digital marketing execution.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="nb-panel overflow-hidden transition-transform duration-300">
              <Link to={`/blogs/${post.slug || post.id}`} className="block">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-52 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="800"
                />

                <div className="p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-accent)">
                    {getCategoryName(post.category)}
                  </p>

                  <h3 className="mt-2 flex items-start justify-between gap-2 text-xl font-black text-(--nb-text)">
                    {post.title}
                    <ArrowUpRight size={16} className="text-(--nb-text-muted)" />
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-(--nb-text-muted)">{post.excerpt}</p>

                  <div className="mt-4 flex items-center justify-between text-xs text-(--nb-text-muted)">
                    <span>{post.readTime} min read</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}

          {!posts.length ? (
            <p className="col-span-full rounded-xl border border-(--nb-border) bg-(--nb-surface) px-4 py-5 text-sm text-(--nb-text-muted)">
              No blogs published yet.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
