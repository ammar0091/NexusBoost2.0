import { useEffect, useState } from 'react';
import PageHero from '@components/common/PageHero';
import PageCTA from '@components/common/PageCTA';
import PortfolioGrid from '@components/sections/portfolio/PortfolioGrid';
import { fetchProjects } from '@/services/contentApi';

const Portfolio = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const projects = await fetchProjects();
        setData(projects);
      } catch (err) {
        setError(err.message || 'Failed to load projects');
      }
    };

    loadData();
  }, []);

  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Portfolio"
        title="Work that drives"
        highlight="real growth"
        description="A selection of projects where strategy, design, and delivery moved key business metrics."
      />

      {error ? (
        <div className="nb-container pt-4">
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
        </div>
      ) : null}

      <PortfolioGrid projects={data} />

      <PageCTA
        eyebrow="Have a project"
        title="Lets build something"
        highlight="that scales"
        description="Share your idea and we will turn it into a polished, high-performing digital product."
        primary="Start Project"
      />
    </div>
  );
};

export default Portfolio;
