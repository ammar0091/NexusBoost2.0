import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, ChevronRight, Share2 } from 'lucide-react';

const BlogGrid = ({ posts }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!posts?.length) return (
    <div className="nb-container py-24 text-center border-t border-(--nb-border)">
      <p className="text-sm font-medium text-(--nb-text-muted)">Insights pipeline is empty. Check back soon.</p>
    </div>
  );

  const activePost = posts[activeIdx];

  return (
    <section className="nb-section py-16 sm:py-24">
      <div className="nb-container">
        
        {/* Sleek Minimal Header */}
        <div className="mb-12 flex items-center justify-between border-b border-(--nb-border) pb-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-(--nb-text)">The Journal</h2>
            <p className="text-[11px] font-bold uppercase tracking-widest text-(--nb-text-muted) mt-1">
              Strategy / Analytics / Growth
            </p>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black text-(--nb-text-muted)">{activeIdx + 1} of {posts.length}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT SIDE: The Navigation List (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-1 order-2 lg:order-1">
            <div className="mb-4 text-[12px] font-black uppercase tracking-widest text-(--nb-text-muted) px-5">
              Latest Articles
            </div>
            {posts.map((post, idx) => (
              <button
                key={post.id}
                onClick={() => setActiveIdx(idx)}
                className={`group relative flex w-full items-center gap-5 rounded-2xl p-5 transition-all duration-300 ${
                  activeIdx === idx 
                  ? 'bg-(--nb-surface-soft) shadow-sm' 
                  : 'bg-transparent hover:bg-(--nb-surface-soft)/40'
                }`}
              >
                {/* Micro Index Number */}
                <span className={`text-[10px] font-black w-4 ${activeIdx === idx ? 'text-(--nb-accent)' : 'text-(--nb-text-muted)'}`}>
                  0{idx + 1}
                </span>

                {/* List Text */}
                <div className="flex flex-1 flex-col text-left">
                  <h4 className={`text-sm font-bold leading-tight transition-colors ${activeIdx === idx ? 'text-(--nb-text)' : 'text-(--nb-text-muted) group-hover:text-(--nb-text)'}`}>
                    {post.title}
                  </h4>
                  <div className="mt-1 flex items-center gap-3 text-[10px] font-bold uppercase tracking-tighter text-(--nb-text-muted)">
                    <span>{post.category?.name || 'SEO'}</span>
                    <span>•</span>
                    <span>{post.readTime}m read</span>
                  </div>
                </div>

                <ChevronRight 
                  size={16} 
                  className={`transition-all duration-300 ${activeIdx === idx ? 'opacity-100 translate-x-0 text-(--nb-accent)' : 'opacity-0 -translate-x-2'}`} 
                />
              </button>
            ))}
          </div>

          {/* RIGHT SIDE: The Featured Stage (7 Columns) */}
          <div className="lg:col-span-7 order-1 lg:order-2 sticky top-24">
            <div className="relative overflow-hidden rounded-2xl border border-(--nb-border) bg-(--nb-surface)">
              
              {/* Dynamic Image Window */}
              <div className="relative aspect-16/7 w-full overflow-hidden border-b border-(--nb-border)">
                <img 
                  key={`img-${activeIdx}`}
                  src={activePost.coverImage} 
                  className="h-full w-full object-cover animate-in fade-in zoom-in-95 duration-1000" 
                  alt="Selected Insight"
                />
                
                {/* Floating Social/Category Action */}
                <div className="absolute top-5 right-5 flex gap-2">
                   <button className="rounded-full bg-black/20 p-2 text-white backdrop-blur-md hover:bg-black/40 transition-colors">
                      <Share2 size={14} />
                   </button>
                </div>
              </div>

              {/* Dynamic Content Area */}
              <div className="p-6 sm:p-8">
                <div className="mb-3 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-(--nb-accent)">
                   <span className="rounded-md bg-(--nb-accent)/10 px-2 py-0.5">{activePost.category?.name || 'Insight'}</span>
                   <span className="text-(--nb-text-muted)">Published {new Date(activePost.publishedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                </div>
                
                <h3 key={`title-${activeIdx}`} className="text-2xl font-bold leading-[1.1] tracking-tight text-(--nb-text) animate-in slide-in-from-bottom-4 duration-500">
                  {activePost.title}
                </h3>
                
                <p key={`desc-${activeIdx}`} className="mt-4 text-sm leading-relaxed text-(--nb-text-muted) animate-in slide-in-from-bottom-6 duration-700">
                  {activePost.excerpt}
                </p>

                <div className="mt-8 flex items-center gap-6">
                  <Link 
                    to={`/blogs/${activePost.slug || activePost.id}`}
                    className="group inline-flex items-center gap-3 rounded-xl bg-(--nb-text) px-6 py-3 text-[11px] font-black uppercase tracking-widest text-(--nb-surface) transition-all hover:pr-8 active:scale-95"
                  >
                    Read Full Case Study <ArrowUpRight size={14} className="transition-transform group-hover:scale-110" />
                  </Link>
                  
                  <div className="flex items-center gap-2 text-[11px] font-bold text-(--nb-text-muted)">
                    <Clock size={14} /> {activePost.readTime} min read
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogGrid;