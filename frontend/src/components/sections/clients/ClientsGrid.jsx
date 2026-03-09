const ClientsGrid = ({ clients }) => {
  return (
    <section className="nb-section pt-6">
      <div className="nb-container">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-black text-[var(--nb-text)] leading-[0.95]">Brands that trust our team</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {clients.map((client, index) => (
            <article
              key={client.id || index}
              className="nb-panel p-5 flex flex-col items-center justify-center text-center min-h-[150px]"
            >
              {client.logo ? (
                <img src={client.logo} alt={client.name} className="max-h-12 object-contain" loading="lazy" />
              ) : null}
              <p className="mt-3 text-sm font-semibold text-[var(--nb-text)]">{client.name}</p>
            </article>
          ))}

          {!clients.length ? (
            <p className="col-span-full rounded-xl border border-[var(--nb-border)] bg-[var(--nb-surface)] px-4 py-5 text-sm text-[var(--nb-text-muted)]">
              No clients available.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ClientsGrid;
