const steps = [
  {
    title: 'Understand the business',
    desc: 'We start with deep discovery into your product, audience, and goals.',
  },
  {
    title: 'Build the strategy',
    desc: 'A clear roadmap designed around metrics that matter.',
  },
  {
    title: 'Execute & optimize',
    desc: 'Continuous iteration driven by performance data.',
  },
];

const HowWeDeliver = () => {
  return (
    <section className="py-8 ">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
            How We <span className="text-blue-600">Deliver Results</span>
          </h2>
          <p className="mt-4 text-md text-slate-600 max-w-2xl mx-auto">
            A step-by-step approach to ensure every project drives growth and value.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500 relative overflow-hidden"
            >
              {/* Step Number Circle */}
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 font-black text-lg rounded-full mb-6 relative z-10">
                {i + 1}
              </div>

              {/* Step Title */}
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-slate-600 leading-relaxed">{step.desc}</p>

              {/* Decorative Accent */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeDeliver;
