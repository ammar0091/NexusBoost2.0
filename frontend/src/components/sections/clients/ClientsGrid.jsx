const ClientsGrid = ({ clients }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {clients.map((client, i) => (
            <div
              key={i}
              className="group relative flex items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:scale-105 transition-all duration-500"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-16 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsGrid;
