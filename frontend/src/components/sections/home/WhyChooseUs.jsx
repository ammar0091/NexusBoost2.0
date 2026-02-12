import { Award, Eye, Zap, Handshake } from 'lucide-react';

const reasons = [
  {
    title: 'Results Over Promises',
    desc: 'Every decision is backed by data and ROI metrics.',
    icon: <Award size={18} className="text-emerald-500" />,
  },
  {
    title: 'Radical Transparency',
    desc: 'Clear reporting. No fluff. No hidden costs.',
    icon: <Eye size={18} className="text-blue-500" />,
  },
  {
    title: 'Speed & Precision',
    desc: 'Fast execution without compromising quality.',
    icon: <Zap size={18} className="text-amber-500" />,
  },
  {
    title: 'True Partnership',
    desc: 'We grow when your business grows.',
    icon: <Handshake size={18} className="text-purple-500" />,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white border-y border-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

        {/* LEFT SIDE */}
        <div className="relative">
          <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-3">
            Why Choose Us
          </p>

          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
            BUILT ON <br />
            <span className="text-slate-400">TRUST</span> & RESULTS
          </h2>

          <p className="text-slate-500 text-sm font-medium mt-6 max-w-sm">
            We don’t chase vanity metrics. We focus on outcomes that move your
            business forward.
          </p>

          {/* Vertical Line */}
          <div className="hidden lg:block absolute left-2 top-36 h-[70%] w-px bg-slate-200" />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-10">
          {reasons.map((item, i) => (
            <div key={i} className="group flex gap-6 relative">

              {/* Number + Icon */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition">
                  {item.icon}
                </div>

                {/* Connector Line */}
                {i !== reasons.length - 1 && (
                  <div className="w-px flex-1 bg-slate-200 mt-2" />
                )}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-md">
                  {item.desc}
                </p>

                {/* Hover underline */}
                <div className="mt-4 w-6 h-1 bg-slate-200 group-hover:w-20 group-hover:bg-blue-600 transition-all duration-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
