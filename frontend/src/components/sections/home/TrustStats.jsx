import { BarChart3, BriefcaseBusiness, HeartHandshake, Trophy } from 'lucide-react';

const stats = [
  {
    value: '120+',
    label: 'Projects shipped',
    icon: BriefcaseBusiness,
    tone: 'text-[var(--nb-accent)]',
  },
  {
    value: '95%',
    label: 'Retention rate',
    icon: HeartHandshake,
    tone: 'text-emerald-400',
  },
  {
    value: '2.7x',
    label: 'Avg growth lift',
    icon: BarChart3,
    tone: 'text-amber-400',
  },
  {
    value: '40+',
    label: 'Awards and mentions',
    icon: Trophy,
    tone: 'text-rose-400',
  },
];

const TrustStats = () => {
  return (
    <section className="nb-section pt-4">
      <div className="nb-container">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="nb-panel p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className={`rounded-xl border border-[var(--nb-border)] bg-[var(--nb-surface-soft)] p-2 ${item.tone}`}>
                    <Icon size={18} />
                  </span>
                  <p className="text-3xl font-black text-[var(--nb-text)]">{item.value}</p>
                </div>
                <p className="mt-3 text-sm font-medium text-[var(--nb-text-muted)]">{item.label}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
