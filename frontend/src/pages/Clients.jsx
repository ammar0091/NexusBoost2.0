import React, { useState, useEffect } from 'react';
import PageHero from '@components/common/PageHero';
import ClientsGrid from '@components/sections/clients/ClientsGrid';

/* ------------------------------------------------------------------
   MOCK CLIENT DATA
------------------------------------------------------------------- */
const MOCK_CLIENTS = [
  { name: 'Google', logo: '/assets/images/clients/google.png' },
  { name: 'Amazon', logo: '/assets/images/clients/amazon.png' },
  { name: 'Stripe', logo: '/assets/images/clients/stripe.png' },
  { name: 'Airbnb', logo: '/assets/images/clients/airbnb.png' },
  { name: 'Tesla', logo: '/assets/images/clients/tesla.png' },
  { name: 'Netflix', logo: '/assets/images/clients/netflix.png' },
];

/* ------------------------------------------------------------------
   DATA ADAPTER (API-ready)
------------------------------------------------------------------- */
async function getClients() {
  // FUTURE: fetch(`${process.env.API_URL}/api/clients`)
  // return res.json();

  // CURRENT: mock data
  return {
    data: MOCK_CLIENTS,
    meta: {
      total: MOCK_CLIENTS.length,
      page: 1,
      limit: 20,
      hasNextPage: false,
    },
  };
}

/* ------------------------------------------------------------------
   CLIENTS PAGE
------------------------------------------------------------------- */
const Clients = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await getClients();
      setData(response.data);
    };
    loadData();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Clients"
        title="Brands We"
        highlight="Partner With"
        description="We’ve worked with a range of brands, from startups to industry leaders, helping them scale and grow."
      />

      <ClientsGrid clients={data} />

    </>
  );
};

export default Clients;
