const ClientsGrid = ({ clients }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {clients.map((client, i) => (
            <div
              key={client.id || i}
              className="group relative flex items-center justify-center p-8  rounded-2xl hover hover:shadow-xl hover:scale-105 transition-all duration-500"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-16 object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <p className="text-slate-700 font-medium px-2">{client.name}</p>
            </div>
          ))}
          {!clients.length ? (
            <p className="text-slate-500 font-semibold col-span-full">No clients available.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ClientsGrid;
