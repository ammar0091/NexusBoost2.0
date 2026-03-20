import { useEffect, useState } from 'react';
import PageHero from '@components/common/PageHero';
import PageCTA from '@components/common/PageCTA';
import PortfolioGrid from '@components/sections/portfolio/PortfolioGrid';
import { fetchProjects } from '@/services/contentApi';
import Seo from '@components/common/Seo';
import { pageHeroVisuals } from '@/content/marketingContent';

const Portfolio = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const projects = await fetchProjects();
        setData(projects);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to load projects');
      }
    };

    loadData();
  }, []);

  return (
    <div className="overflow-hidden">
      <Seo
        title="SEO and Digital Marketing Case Studies"
        description="See how NexusBoost improves organic visibility, paid performance, website conversion, and lead generation through integrated growth work."
        image={pageHeroVisuals.portfolio.src}
        imageAlt={pageHeroVisuals.portfolio.alt}
        keywords={['seo case studies', 'digital marketing portfolio', 'website redesign case study', 'lead generation results']}
      />
      <PageHero
        eyebrow="Case Studies"
        title="Work that drives"
        highlight="qualified traffic and real growth"
        description="Explore a selection of SEO campaigns, conversion-led website redesigns, and digital marketing systems that moved rankings, pipeline, and revenue metrics."
        visual={pageHeroVisuals.portfolio}
      />

      {error ? (
        <div className="nb-container pt-4">
          <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{error}</p>
        </div>
      ) : null}

      <PortfolioGrid projects={data} />

      <PageCTA
        eyebrow="Have a project"
        title="Lets build a growth engine"
        highlight="that scales with your business"
        description="Share your offer, audience, and goals. We will shape a premium website and digital marketing roadmap around measurable growth."
        primary="Start Project"
      />
    </div>
  );
};

export default Portfolio;
