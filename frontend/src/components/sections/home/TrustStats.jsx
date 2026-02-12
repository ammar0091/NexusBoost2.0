import { Users, Briefcase, TrendingUp, ShieldCheck } from 'lucide-react';

const stats = [
  {
    label: 'Happy Clients',
    value: '50+',
    icon: <Users size={20} className="text-blue-500" />,
  },
  {
    label: 'Projects Delivered',
    value: '100+',
    icon: <Briefcase size={20} className="text-emerald-500" />,
  },
  {
    label: 'Avg Growth',
    value: '3x',
    icon: <TrendingUp size={20} className="text-purple-500" />,
  },
  {
    label: 'Client Retention',
    value: '95%',
    icon: <ShieldCheck size={20} className="text-amber-500" />,
  },
];

const TrustStats = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, i) => (
            <div
              key={i}
              className="group p-8 rounded-4xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-white border border-slate-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-xl lg:text-3xl font-black text-slate-900">
                  {item.value}
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium">
                {item.label}
              </p>
              <div className="mt-6 w-6 h-1 bg-slate-200 group-hover:w-full group-hover:bg-blue-600 transition-all duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
