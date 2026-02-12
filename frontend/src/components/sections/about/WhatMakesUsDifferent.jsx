const points = [
  {
    title: 'Strategy Before Execution',
    desc: 'We never run campaigns without understanding the business, market, and user intent.',
  },
  {
    title: 'Data Over Opinions',
    desc: 'Every decision is backed by performance data, not assumptions.',
  },
  {
    title: 'Built for Scale',
    desc: 'What we build today should still work when your business is 10x bigger.',
  },
];

const WhatMakesUsDifferent = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

        <div>
          <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[11px] mb-6">
            Our Approach
          </p>

          <h2 className="text-3xl lg:text-5xl font-black tracking-tighter text-slate-900">
            What makes us
            <br />
            <span className="text-slate-400">different.</span>
          </h2>
        </div>

        <div className="space-y-10">
          {points.map((item, i) => (
            <div key={i}>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {item.desc}
              </p>

              <div className="mt-4 w-12 h-1 bg-blue-600 rounded-full" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatMakesUsDifferent;
