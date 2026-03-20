const ClientsGrid = ({ clients }) => {
  return (
    <section className="nb-section pt-6">
      <div className="nb-container">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-black leading-[0.95] text-(--nb-text) md:text-5xl">Brands that trust our team to grow visibility and demand</h2>
          <p className="mt-4 text-sm leading-relaxed text-(--nb-text-muted) md:text-base">
            We partner with ambitious businesses across SaaS, ecommerce, healthcare, logistics, and service industries to strengthen search presence, improve lead generation, and sharpen digital execution.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, index) => (
            <article key={client.id || index} className="nb-panel overflow-hidden p-3">
              <div className="overflow-hidden rounded-2xl bg-(--nb-surface-soft)">
                {client.image ? (
                  <img
                    src={client.image}
                    alt={client.name}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="800"
                  />
                ) : client.logo ? (
                  <div className="flex h-48 items-center justify-center p-8">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-14 object-contain"
                      loading="lazy"
                      decoding="async"
                      width="160"
                      height="56"
                    />
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center text-(--nb-text-muted)">
                    <span className="text-sm font-bold uppercase tracking-[0.18em]">Brand</span>
                  </div>
                )}
              </div>

              <div className="p-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-accent)">{client.industry || 'Client partnership'}</p>
                    <h3 className="mt-2 text-xl font-black text-(--nb-text)">{client.name}</h3>
                  </div>
                  {client.website ? (
                    <a href={client.website} target="_blank" rel="noreferrer" className="text-(--nb-text-muted) hover:text-(--nb-accent)">
                      Visit
                    </a>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-(--nb-text-muted)">{client.summary || 'Growth partner focused on measurable digital marketing outcomes.'}</p>
              </div>
            </article>
          ))}

          {!clients.length ? (
            <p className="col-span-full rounded-xl border border-(--nb-border) bg-(--nb-surface) px-4 py-5 text-sm text-(--nb-text-muted)">
              No clients available.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ClientsGrid;
