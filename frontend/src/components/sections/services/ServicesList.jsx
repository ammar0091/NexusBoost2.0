import { ArrowUpRight, Search, Megaphone, BarChart3, Palette, Code2, SlidersHorizontal } from 'lucide-react';

const services = [
  {
    title: 'SEO & Organic Growth',
    desc: 'Sustainable traffic through technical SEO, content, and authority.',
    icon: <Search size={20} />,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    title: 'Performance Marketing',
    desc: 'Paid acquisition focused on ROI, not impressions.',
    icon: <BarChart3 size={20} />,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    title: 'Social Media Strategy',
    desc: 'Content systems that build trust and engagement.',
    icon: <Megaphone size={20} />,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  {
    title: 'Branding & Visual Design',
    desc: 'Identity systems designed for credibility and conversion.',
    icon: <Palette size={20} />,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    title: 'Web Development',
    desc: 'Fast, scalable websites built for growth.',
    icon: <Code2 size={20} />,
    color: 'text-sky-500',
    bg: 'bg-sky-50',
  },
  {
    title: 'Conversion Optimization',
    desc: 'Improving funnels, UX, and on-page performance.',
    icon: <SlidersHorizontal size={20} />,
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    title: 'Pay Per Click (PPC) Advertising',
    desc: 'Targeted ad campaigns that drive qualified leads.',
    icon: <BarChart3 size={20} />,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {title: 'Content Marketing', desc: 'Strategic content creation that attracts and retains customers.', icon: <Megaphone size={20} />, color: 'text-purple-500', bg: 'bg-purple-50'},
  {title: 'Email Marketing', desc: 'Automated email campaigns that nurture leads and drive conversions.', icon: <SlidersHorizontal size={20} />, color: 'text-rose-500', bg: 'bg-rose-50'},     
  {title: 'Analytics & Reporting', desc: 'Data-driven insights to optimize marketing performance.', icon: <BarChart3 size={20} />, color: 'text-emerald-500', bg: 'bg-emerald-50'},
  {title: 'video marketing', desc: 'Engaging video content that tells your brand story.', icon: <Megaphone size={20} />, color: 'text-purple-500', bg: 'bg-purple-50'},
  {title: 'UX/UI Design', desc: 'User-centered design that enhances customer experience.', icon: <Palette size={20} />, color: 'text-amber-500', bg: 'bg-amber-50'},
];

const ServicesList = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header (UNCHANGED) */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-16">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight">
            Services
            <span className="block text-slate-400">
              designed to scale.
            </span>
          </h2>

          <p className="text-slate-600 max-w-sm leading-relaxed">
            Each service is a building block of a larger growth system.
          </p>
        </div>

        {/* Cards (UPDATED UI ONLY) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="group p-10 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-100 transition-all duration-300 relative overflow-hidden"
            >
              {/* Icon box */}
              <div
                className={`w-12 h-12 rounded-xl ${service.bg} ${service.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}
              >
                {service.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center justify-between">
                  {service.title}
                  <ArrowUpRight
                    size={16}
                    className="text-slate-200 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </h3>

                <p className="text-slate-500 text-sm font-medium leading-snug pr-4">
                  {service.desc}
                </p>
              </div>

              {/* Accent line */}
              <div className="mt-6 w-full h-[1.5px] bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesList;
