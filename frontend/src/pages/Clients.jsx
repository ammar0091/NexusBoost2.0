import { useEffect, useState } from "react";
import PageHero from "@components/common/PageHero";
import ClientsGrid from "@components/sections/clients/ClientsGrid";
import { fetchClients } from "@/services/contentApi";

const Clients = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const clients = await fetchClients();
        setData(clients);
      } catch (err) {
        setError(err.message || "Failed to load clients");
      }
    };
    loadData();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Clients"
        title="Brands We"
        highlight="Partner With"
        description="We've worked with a range of brands, from startups to industry leaders, helping them scale and grow."
      />

      {error ? (
        <div className="max-w-7xl mx-auto px-6 pt-10 text-red-500 text-sm font-semibold">
          {error}
        </div>
      ) : null}
      <ClientsGrid clients={data} />
    </>
  );
};

export default Clients;
