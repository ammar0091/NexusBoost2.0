import { ArrowUpRight } from 'lucide-react';

const ClientsGrid = ({ clients = [] }) => {
  return (
    <section className="relative py-24 bg-(--nb-surface) overflow-hidden">
      {/* Nexus Signature: Structural Grid Line */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-(--nb-border)/20 hidden lg:block" />

      <div className="nb-container relative z-10">
        


        {/* Studio Grid */}
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, index) => (
            <article key={client.id || index} className="group flex flex-col">
              
              {/* Image/Logo Stage */}
              <div className="relative aspect-video overflow-hidden rounded-sm border  bg-(--nb-surface-soft) p-1 transition-all duration-500 group-hover:border-(--nb-accent)/50">
                <div className="flex h-full w-full items-center justify-center overflow-hidden bg-(--nb-surface-soft)">
                  {client.image ? (
                    <img
                      src={client.image}
                      alt={client.name}
                      className="h-full w-full object-cover  transition-all duration-1000  group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-12 w-3/5 object-contain   transition-all duration-700  "
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-(--nb-text-muted)/30">Brand Partner</span>
                  )}
                </div>
              </div>

              {/* Minimalist Info */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-(--nb-accent)">
                      {client.industry || 'Client'}
                    </p>
                    <h3 className="text-2xl font-medium tracking-tighter text-(--nb-text)">
                      {client.name}
                    </h3>
                  </div>
                  
                  {client.website && (
                    <a 
                      href={client.website} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-(--nb-border) transition-all duration-500 hover:border-(--nb-accent) hover:bg-(--nb-accent)/5 group/link"
                    >
                      <ArrowUpRight size={16} className="text-(--nb-text-muted) group-hover/link:text-(--nb-accent)" />
                    </a>
                  )}
                </div>
                
                <p className="text-sm leading-relaxed text-(--nb-text-muted)/80 font-light tracking-wide line-clamp-2 italic">
                  "{client.summary || 'Strategic growth partner focusing on measurable outcomes.'}"
                </p>
              </div>
            </article>
          ))}

          {/* Fallback */}
          {!clients.length && (
            <div className="col-span-full py-20 text-center border-t border-(--nb-border)/20">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-(--nb-text-muted)/40">No Partnerships Found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientsGrid;