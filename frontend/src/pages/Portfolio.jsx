import React, { useState, useEffect } from 'react';
import PageHero from '@components/common/PageHero';
import PageCTA from '@components/common/PageCTA';
import PortfolioGrid from '@components/sections/portfolio/PortfolioGrid';

/* 
   MOCK PROJECTS DATA
*/
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'E-commerce Growth Engine',
    category: 'Performance Marketing',
    desc: 'Scaled revenue 3x through paid ads and CRO.',
    image: '/assets/images/portfolio-1.jpg',
  },
  {
    id: '2',
    title: 'SaaS Website Redesign',
    category: 'Web & UI',
    desc: 'Conversion-focused redesign for B2B SaaS.',
    image: '/assets/images/portfolio-2.jpg',
  },
  {
    id: '3',
    title: 'Personal Brand System',
    category: 'Branding',
    desc: 'Built authority and inbound demand.',
    image: '/assets/images/portfolio-3.jpg',
  },
  {
    id: '4',
    title: 'SEO Content Machine',
    category: 'SEO',
    desc: 'Organic traffic growth in 90 days.',
    image: '/assets/images/portfolio-4.jpg',
  },
];

/* 
   DATA  (API-Integration Placeholder)
 */
async function getProjects() {
  // FUTURE integration: fetch(`${process.env.API_URL}/api/projects`)
  // return res.json();

  // CURRENT: mock data
  return {
    data: MOCK_PROJECTS,
    meta: {
      total: MOCK_PROJECTS.length,
      page: 1,
      limit: 12,
      hasNextPage: false,
    },
  };
}

/* 
    PAGE
 */
const Portfolio = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await getProjects();
      setData(response.data);
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

      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <PortfolioGrid projects={data} />
        </div>
      </section>

      <PageCTA
        eyebrow="Have a project?"
        title="Let’s Build"
        highlight="Something Great"
        description="Tell us about your idea and we’ll help you turn it into a scalable digital product."
        primary="Start a Project"
      />
    </>
  );
};

export default Portfolio;
