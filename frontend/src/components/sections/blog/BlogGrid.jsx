import { ArrowUpRight } from 'lucide-react';

const BlogGrid = ({ posts }) => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {posts.map((post) => (
        <article
          key={post.id}
          className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-500"
        >
          {/* Image with overlay */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="p-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-2">
              {post.category.name}
            </p>

            <h3 className="text-xl font-extrabold text-slate-900 mb-3 flex items-center justify-between">
              {post.title}
              <ArrowUpRight
                size={20}
                className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
              />
            </h3>

            <p className="text-slate-600 mb-4">{post.excerpt}</p>

            <div className="flex justify-between items-center text-sm text-slate-500">
              <span>{post.readTime} min read</span>
              <span>{post.publishedAt}</span>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-500" />
        </article>
      ))}
    </div>
  </section>
);

export default BlogGrid;
