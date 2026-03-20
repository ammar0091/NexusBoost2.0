import { useEffect, useState } from 'react';
import PageHero from '@components/common/PageHero';
import BlogGrid from '@components/sections/blog/BlogGrid';
import { fetchBlogs } from '@/services/contentApi';
import Seo from '@components/common/Seo';
import { pageHeroVisuals } from '@/content/marketingContent';

const Blogs = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const blogs = await fetchBlogs();
        setData(blogs);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to load blogs');
      }
    };

    loadData();
  }, []);

  return (
    <div className="overflow-hidden">
      <Seo
        title="SEO, Content Marketing, and CRO Blog"
        description="Read practical digital marketing insights on SEO strategy, content planning, analytics, paid campaigns, and conversion rate optimization."
        image={pageHeroVisuals.blogs.src}
        imageAlt={pageHeroVisuals.blogs.alt}
        keywords={['seo blog', 'digital marketing blog', 'content marketing insights', 'cro blog']}
      />
      <PageHero
        eyebrow="Growth Insights"
        title="Insights for"
        highlight="modern SEO and digital marketing teams"
        description="Practical lessons on search engine optimization, content strategy, analytics, and conversion-focused website growth based on real execution work."
        visual={pageHeroVisuals.blogs}
      />

      {error ? (
        <div className="nb-container pt-4">
          <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{error}</p>
        </div>
      ) : null}

      <BlogGrid posts={data} />
    </div>
  );
};

export default Blogs;
