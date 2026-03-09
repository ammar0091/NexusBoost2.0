import { useEffect, useState } from 'react';
import PageHero from '@components/common/PageHero';
import ClientsGrid from '@components/sections/clients/ClientsGrid';
import { fetchClients } from '@/services/contentApi';

const Clients = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const clients = await fetchClients();
        setData(clients);
      } catch (err) {
        setError(err.message || 'Failed to load clients');
      }
    };

    loadData();
  }, []);

  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Clients"
        title="Brands we partner"
        highlight="and grow with"
        description="From startups to established teams, we help businesses build stronger digital presence and better conversion systems."
      />

      {error ? (
        <div className="nb-container pt-4">
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
        </div>
      ) : null}

      <ClientsGrid clients={data} />
    </div>
  );
};

export default Clients;
