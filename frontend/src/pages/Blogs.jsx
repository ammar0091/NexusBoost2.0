import React, { useState, useEffect } from 'react';
import PageHero from '@components/common/PageHero';
import BlogGrid from '@components/sections/blog/BlogGrid';

/* ---------------------------
   1. MOCK BLOG DATA
---------------------------- */
const MOCK_BLOGS = [
  {
    id: '1',
    slug: 'landing-pages-that-convert',
    title: 'How to Build Landing Pages That Convert',
    excerpt: 'The exact principles we use to turn traffic into revenue.',
    category: { id: 'conversion', name: 'Conversion' },
    coverImage: '/assets/images/blog-1.jpg',
    readTime: 6,
    publishedAt: 'Jan 12, 2026',
    featured: true,
  },
  {
    id: '2',
    slug: 'seo-systems-that-scale',
    title: 'SEO Systems That Scale in 2025',
    excerpt: 'Forget hacks. Build compounding organic growth.',
    category: { id: 'seo', name: 'SEO' },
    coverImage: '/assets/images/blog-2.jpg',
    readTime: 5,
    publishedAt: 'Jan 18, 2026',
    featured: false,
  },
  {
    id: '3',
    slug: 'designing-for-trust',
    title: 'Designing for Trust in B2B SaaS',
    excerpt: 'How visual decisions directly impact conversions.',
    category: { id: 'design', name: 'Design' },
    coverImage: '/assets/images/blog-3.jpg',
    readTime: 4,
    publishedAt: 'Jan 22, 2026',
    featured: false,
  },
];

/* ---------------------------
   2. DATA ADAPTER (API-ready)
---------------------------- */
async function getBlogs() {
  // FUTURE: fetch(`${process.env.API_URL}/api/blogs`)
  return { data: MOCK_BLOGS, meta: { total: MOCK_BLOGS.length } };
}

/* ---------------------------
   3. BLOG PAGE
---------------------------- */
const Blog = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await getBlogs();
      setData(response.data);
    };
    loadData();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights That"
        highlight="Drive Results"
        description="Practical lessons on growth, design, and marketing — tested on real projects."
      />

      <BlogGrid posts={data} />
    </>
  );
};

export default Blog;
