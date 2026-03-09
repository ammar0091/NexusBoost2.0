import { useEffect, useState } from "react";
import PageHero from "@components/common/PageHero";
import PageCTA from "@components/common/PageCTA";
import PortfolioGrid from "@components/sections/portfolio/PortfolioGrid";
import { fetchProjects } from "@/services/contentApi";

const Portfolio = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const projects = await fetchProjects();
        setData(projects);
      } catch (err) {
        setError(err.message || "Failed to load projects");
      }
    };
    loadData();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work That"
        highlight="Drives Growth"
        description="A selection of projects where strategy, design, and performance came together."
      />

      {error ? (
        <div className="max-w-7xl mx-auto px-6 pt-10 text-red-500 text-sm font-semibold">
          {error}
        </div>
      ) : null}

      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <PortfolioGrid projects={data} />
        </div>
      </section>

      <PageCTA
        eyebrow="Have a project?"
        title="Let's Build"
        highlight="Something Great"
        description="Tell us about your idea and we'll help you turn it into a scalable digital product."
        primary="Start a Project"
      />
    </>
  );
};

export default Portfolio;
