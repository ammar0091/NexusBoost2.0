import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react';
import Seo from '@components/common/Seo';
import PageCTA from '@components/common/PageCTA';
import { fetchBlogBySlug } from '@/services/contentApi';
import { SITE } from '@/config/site';

const formatDate = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const toParagraphs = (blog) => {
  const body = blog?.content || blog?.excerpt || '';
  return body
    .split(/\n\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadBlog = async () => {
      setLoading(true);
      try {
        const result = await fetchBlogBySlug(slug, { enableFallback: true });
        if (mounted) {
          setBlog(result);
          setError('');
        }
      } catch (err) {
        if (mounted) {
          setBlog(null);
          setError(err.message || 'Blog not found');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadBlog();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const paragraphs = useMemo(() => toParagraphs(blog), [blog]);

  const schema = blog
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: blog.title,
        description: blog.seoDescription || blog.excerpt,
        image: blog.coverImage,
        datePublished: blog.publishedAt,
        dateModified: blog.updatedAt || blog.publishedAt,
        mainEntityOfPage: `${SITE.url}/blogs/${blog.slug || slug}`,
        author: {
          '@type': 'Organization',
          name: SITE.name,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE.name,
        },
      }
    : null;

  return (
    <div className="overflow-hidden pt-20">
      <Seo
        title={blog?.seoTitle || blog?.title || 'Blog'}
        description={blog?.seoDescription || blog?.excerpt || 'Read insights from NexusBoost.'}
        image={blog?.coverImage}
        imageAlt={blog?.title}
        path={blog ? `/blogs/${blog.slug || slug}` : `/blogs/${slug}`}
        schema={schema}
        noIndex={!blog && !loading}
      />

      <section className="nb-section pt-32">
        <div className="nb-container max-w-4xl">
          <Link
            to="/blogs"
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-(--nb-border) bg-(--nb-surface) px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-(--nb-text) hover:border-(--nb-accent)"
          >
            <ArrowLeft size={14} />
            Back to Blogs
          </Link>

          {loading ? (
            <div className="nb-panel p-8 md:p-10">
              <div className="h-10 w-2/3 animate-pulse rounded-xl bg-(--nb-surface-soft)" />
              <div className="mt-4 h-5 w-1/3 animate-pulse rounded-xl bg-(--nb-surface-soft)" />
              <div className="mt-6 h-80 animate-pulse rounded-2xl bg-(--nb-surface-soft)" />
            </div>
          ) : error ? (
            <div className="nb-panel p-8 md:p-10">
              <h1 className="text-3xl font-black text-(--nb-text)">Blog not found</h1>
              <p className="mt-4 text-(--nb-text-muted)">{error}</p>
            </div>
          ) : (
            <article className="space-y-8">
              <header className="space-y-5">
                <p className="nb-pill border border-(--nb-border) bg-(--nb-surface) text-(--nb-accent)">
                  {typeof blog.category === 'string' ? blog.category : blog.category?.name}
                </p>
                <h1 className="text-4xl font-black leading-[0.95] text-(--nb-text) md:text-5xl">{blog.title}</h1>
                <p className="max-w-3xl text-base leading-relaxed text-(--nb-text-muted) md:text-lg">{blog.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-(--nb-text-muted)">
                  <span>{formatDate(blog.publishedAt)}</span>
                  <span className="flex items-center gap-2"><Clock3 size={15} /> {blog.readTime} min read</span>
                </div>
              </header>

              <div className="nb-panel overflow-hidden p-3">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="h-104 w-full rounded-2xl object-cover"
                  loading="lazy"
                  decoding="async"
                  width="1400"
                  height="900"
                />
              </div>

              <div className="nb-panel p-7 md:p-10">
                <div className="max-w-none text-(--nb-text-muted)">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mb-5 text-base leading-8 text-(--nb-text-muted) md:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      <PageCTA
        eyebrow="Need similar growth"
        title="Lets turn your content and"
        highlight="SEO strategy into revenue"
        description="If you want help with content marketing, blog strategy, or conversion-focused SEO, we can build the roadmap with you."
        primary="Book Strategy Call"
        secondary="View Services"
        secondaryHref="/services"
      />
    </div>
  );
};

export default BlogDetail;
