import { HOME_TRUST_STATS } from '@/constants/homeData';

const TrustStats = () => {
  return (
    <section className="nb-section pt-4">
      <div className="nb-container">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_TRUST_STATS.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="nb-panel p-10">
                <div className="flex items-center justify-between gap-3">
                  <span className={`rounded-xl border border-(--nb-border) bg-(--nb-surface-soft) p-2 ${item.tone}`}>
                    <Icon size={18} />
                  </span>
                  <p className="text-3xl font-black text-(--nb-text)">{item.value}</p>
                </div>
                <p className="mt-3 text-sm font-medium text-(--nb-text-muted)">{item.label}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
