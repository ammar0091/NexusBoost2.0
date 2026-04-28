import { useEffect, useMemo, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Clock3, Share2, Twitter, 
  Linkedin, Facebook, Mail, Bookmark, 
  ChevronLeft, AlertCircle, RefreshCw
} from 'lucide-react';
import Seo from '@components/common/Seo';
import { fetchBlogBySlug } from '@/services/contentApi';
import { SITE } from '@/config/site';

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  return date.toLocaleDateString('en-IN', { 
    day: '2-digit', month: 'long', year: 'numeric' 
  });
};

const BlogDetail = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- API Call Logic ---
  const loadBlog = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchBlogBySlug(slug, { enableFallback: true });
      if (result) {
        setBlog(result);
      } else {
        throw new Error("Article not found");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "Failed to load the article.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadBlog();
  }, [loadBlog]);

  // Safe Content Mapping
  const paragraphs = useMemo(() => {
    const text = blog?.content || blog?.excerpt || "";
    return text.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
  }, [blog]);

  // --- UI Conditional Rendering ---

  if (loading) return <BlogSkeleton />;

  if (error) return <ErrorState message={error} retry={loadBlog} />;

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-(--nb-surface) selection:bg-(--nb-accent)/20">
      <Seo
        title={blog.seoTitle || blog.title}
        description={blog.seoDescription || blog.excerpt}
        image={blog.coverImage}
        path={`/blogs/${slug}`}
      />
      
      {/* 1. FLOATING TOP NAV */}
      <nav className="fixed top-0 z-50 w-full border-b border-(--nb-border) bg-(--nb-surface)/80 backdrop-blur-md">
        <div className="nb-container flex h-16 items-center justify-between">
          <Link to="/blogs" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-(--nb-text-muted) hover:text-(--nb-text)">
            <ChevronLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back
          </Link>
          <div className="hidden md:block overflow-hidden text-ellipsis whitespace-nowrap px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-(--nb-text-muted) max-w-75">
            {blog.title}
          </div>
          <div className="flex items-center gap-4">
            <button className="text-(--nb-text-muted) hover:text-(--nb-accent) transition-colors"><Share2 size={16} /></button>
            <button className="text-(--nb-text-muted) hover:text-(--nb-accent) transition-colors"><Bookmark size={16} /></button>
          </div>
        </div>
      </nav>

      {/* 2. EDITORIAL HERO */}
      <header className="pt-32 pb-16 lg:pt-48 lg:pb-24 border-b border-(--nb-border) bg-linear-to-b from-(--nb-surface-soft)/40 to-transparent">
        <div className="nb-container max-w-5xl">
          <div className="mb-8 flex items-center gap-4">
            <span className="rounded-md bg-(--nb-accent) px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white">
              {typeof blog.category === 'string' ? blog.category : blog.category?.name || 'Insight'}
            </span>
            <span className="h-1 w-1 rounded-full bg-(--nb-border)" />
            <span className="text-[11px] font-bold text-(--nb-text-muted)">{formatDate(blog.publishedAt)}</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-(--nb-text) leading-[0.95] mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {blog.title}
          </h1>

          <p className="text-xl md:text-2xl text-(--nb-text-muted) leading-relaxed max-w-3xl font-medium animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {blog.excerpt}
          </p>
        </div>
      </header>

      {/* 3. READING EXPERIENCE */}
      <main className="nb-container max-w-7xl py-16 lg:py-24">
        <div className="grid lg:grid-cols-[200px_1fr_60px] gap-12 lg:gap-20 items-start">
          
          {/* LEFT RAIL: Metadata */}
          <aside className="hidden lg:block sticky top-32 space-y-10">
            <div className="space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-linear-to-tr from-(--nb-accent) to-indigo-500 shadow-xl shadow-(--nb-accent)/20" />
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-(--nb-text)">NexusBoost Team</p>
                <p className="text-[10px] font-bold text-(--nb-text-muted) uppercase">Growth Engineering</p>
              </div>
            </div>
            <div className="pt-6 border-t border-(--nb-border) space-y-4">
               <div className="flex items-center gap-3 text-[11px] font-black text-(--nb-text-muted) uppercase">
                  <Clock3 size={14} className="text-(--nb-accent)" /> {blog.readTime || 5} min read
               </div>
            </div>
          </aside>

          {/* CENTER: Typography-focused Content */}
          <div className="max-w-180 mx-auto w-full">
            <figure className="mb-16 overflow-hidden rounded-[3rem] border border-(--nb-border) shadow-2xl">
              <img
                src={blog.coverImage}
                alt=""
                className="w-full aspect-video object-cover transition-transform duration-1000 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </figure>

            <div className="prose prose-slate prose-lg max-w-none">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-[19px] md:text-[21px] leading-[1.85] text-(--nb-text-muted) mb-10 font-serif" style={{ fontFamily: 'Georgia, serif' }}>
                  {p}
                </p>
              ))}
            </div>

      
          </div>

          {/* RIGHT RAIL: Sticky Social */}
          <aside className="hidden lg:flex sticky top-32 flex-col items-center gap-8 text-(--nb-text-muted)">
            <button className="hover:text-(--nb-accent) transition-all hover:-translate-y-1"><Twitter size={20} /></button>
            <button className="hover:text-(--nb-accent) transition-all hover:-translate-y-1"><Linkedin size={20} /></button>
            <button className="hover:text-(--nb-accent) transition-all hover:-translate-y-1"><Facebook size={20} /></button>
            <button className="hover:text-(--nb-accent) transition-all hover:-translate-y-1"><Mail size={20} /></button>
            <div className="h-24 w-px bg-linear-to-b from-(--nb-border) to-transparent" />
          </aside>

        </div>
      </main>
    </div>
  );
};

// --- Helper Components ---

const BlogSkeleton = () => (
  <div className="min-h-screen bg-(--nb-surface) pt-48">
    <div className="nb-container max-w-5xl space-y-8 animate-pulse">
      <div className="h-6 w-32 bg-(--nb-surface-soft) rounded-full" />
      <div className="h-20 w-full bg-(--nb-surface-soft) rounded-2xl" />
      <div className="h-8 w-2/3 bg-(--nb-surface-soft) rounded-xl" />
      <div className="h-100 w-full bg-(--nb-surface-soft) rounded-[3rem] mt-12" />
    </div>
  </div>
);

const ErrorState = ({ message, retry }) => (
  <div className="min-h-screen bg-(--nb-surface) flex flex-col items-center justify-center p-6 text-center">
    <div className="mb-6 rounded-full bg-rose-500/10 p-5 text-rose-500">
      <AlertCircle size={40} />
    </div>
    <h2 className="text-2xl font-black text-(--nb-text) mb-2">Something went wrong</h2>
    <p className="text-(--nb-text-muted) mb-8 max-w-xs">{message}</p>
    <div className="flex gap-4">
      <button onClick={retry} className="flex items-center gap-2 bg-(--nb-text) text-(--nb-surface) px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest">
        <RefreshCw size={14} /> Retry
      </button>
      <Link to="/blogs" className="px-6 py-3 rounded-full border border-(--nb-border) text-xs font-black uppercase tracking-widest text-(--nb-text)">
        Back to feed
      </Link>
    </div>
  </div>
);

export default BlogDetail;
