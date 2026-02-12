import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Megaphone, BarChart3, Palette, Code2, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: 'SEO Optimization',
    desc: 'Dominate organic search with data-backed content strategies.',
    icon: <Search size={20} />,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    title: 'Social Marketing',
    desc: 'Build brand authority and viral engagement at scale.',
    icon: <Megaphone size={20} />,
    color: 'text-purple-500',
    bg: 'bg-purple-50'
  },
  {
    title: 'Performance Ads',
    desc: 'ROI-driven advertising across Google and Meta ecosystem.',
    icon: <BarChart3 size={20} />,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    title: 'Branding & Design',
    desc: 'Crafting visual identities that convert attention into trust.',
    icon: <Palette size={20} />,
    color: 'text-amber-500',
    bg: 'bg-amber-50'
  },
  {
    title: 'Web Development',
    desc: 'High-conversion digital experiences built for speed.',
    icon: <Code2 size={20} />,
    color: 'text-sky-500',
    bg: 'bg-sky-50'
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2">
              Services
            </p>
            <h2 className="text-3xl md:text-5xl justity-center  font-black tracking-tighter text-slate-900 leading-none">
              WHAT WE <span className="text-slate-400 font-light">DELIVER.</span>
            </h2>
          </div>
          <Link to="/services" className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors border-b border-slate-100 pb-1">
            View All Services
          </Link>
        </div>

        {/* Optimized Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <div
              key={i}
              className="group p-7 rounded-4xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-blue-100 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle Icon Box */}
              <div className={`w-12 h-12 rounded-xl ${service.bg} ${service.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                {service.icon}
              </div>

              <div className="relative z-10">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center justify-between">
                  {service.title}
                  <ArrowUpRight size={16} className="text-slate-200 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-snug pr-4">
                  {service.desc}
                </p>
              </div>

              {/* Minimal Accent Line */}
              <div className="mt-6 w-full h-[1.5px] bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </div>
            </div>
          ))}

          {/* Special CTA Card to keep the grid tight */}
          <div className="p-7 rounded-4xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center group hover:border-blue-200 transition-colors">
            <p className="text-sm font-bold text-slate-900 mb-2 font-mono">Need something custom?</p>
            <p className="text-xs text-slate-400 mb-4 tracking-tight">We build bespoke digital solutions.</p>
            <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-5 py-2.5 rounded-lg group-hover:bg-blue-600 transition-colors">
              Request Audit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;