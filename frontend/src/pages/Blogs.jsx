import { useEffect, useState } from "react";
import PageHero from "@components/common/PageHero";
import BlogGrid from "@components/sections/blog/BlogGrid";
import { fetchBlogs } from "@/services/contentApi";

const Blog = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const blogs = await fetchBlogs();
        setData(blogs);
      } catch (err) {
        setError(err.message || "Failed to load blogs");
      }
    };
    loadData();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights That"
        highlight="Drive Results"
        description="Practical lessons on growth, design, and marketing tested on real projects."
      />

      {error ? (
        <div className="max-w-7xl mx-auto px-6 pt-10 text-red-500 text-sm font-semibold">
          {error}
        </div>
      ) : null}
      <BlogGrid posts={data} />
    </>
  );
};

export default Blog;
