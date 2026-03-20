import { useEffect, useState } from 'react';
import PageHero from '@components/common/PageHero';
import ClientsGrid from '@components/sections/clients/ClientsGrid';
import { fetchClients } from '@/services/contentApi';
import Seo from '@components/common/Seo';
import { pageHeroVisuals } from '@/content/marketingContent';

const Clients = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const clients = await fetchClients();
        setData(clients);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to load clients');
      }
    };

    loadData();
  }, []);

  return (
    <div className="overflow-hidden">
      <Seo
        title="Clients and Brands We Help Grow"
        description="Discover the startups, service brands, ecommerce teams, and SaaS companies that trust NexusBoost for SEO and digital marketing execution."
        image={pageHeroVisuals.clients.src}
        imageAlt={pageHeroVisuals.clients.alt}
        keywords={['digital marketing clients', 'seo agency clients', 'brands we work with', 'growth partners']}
      />
      <PageHero
        eyebrow="Client Partnerships"
        title="Brands we partner with"
        highlight="to grow search visibility and conversion"
        description="From startups to established companies, we help teams improve organic traffic, campaign performance, website conversion, and reporting clarity."
        visual={pageHeroVisuals.clients}
      />

      {error ? (
        <div className="nb-container pt-4">
          <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{error}</p>
        </div>
      ) : null}

      <ClientsGrid clients={data} />
    </div>
  );
};

export default Clients;
