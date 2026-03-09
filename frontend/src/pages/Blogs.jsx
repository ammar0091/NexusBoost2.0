import { useEffect, useState } from 'react';
import PageHero from '@components/common/PageHero';
import BlogGrid from '@components/sections/blog/BlogGrid';
import { fetchBlogs } from '@/services/contentApi';

const Blogs = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const blogs = await fetchBlogs();
        setData(blogs);
      } catch (err) {
        setError(err.message || 'Failed to load blogs');
      }
    };

    loadData();
  }, []);

  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Blog"
        title="Insights for"
        highlight="modern growth teams"
        description="Practical lessons on design, growth, and performance based on real project execution."
      />

      {error ? (
        <div className="nb-container pt-4">
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
        </div>
      ) : null}

      <BlogGrid posts={data} />
    </div>
  );
};

export default Blogs;
