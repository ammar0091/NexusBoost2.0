import React from 'react';
import { Lightbulb, Target, Code2, Rocket, ArrowRight } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      num: '01',
      title: 'Discovery',
      desc: 'Analyzing your vision and identifying key market opportunities.',
      icon: <Lightbulb size={20} className="text-amber-500" />,
      color: 'group-hover:bg-amber-50'
    },
    {
      num: '02',
      title: 'Strategy',
      desc: 'Crafting a scalable roadmap built for aggressive growth.',
      icon: <Target size={20} className="text-blue-500" />,
      color: 'group-hover:bg-blue-50'
    },
    {
      num: '03',
      title: 'Execution',
      desc: 'Precision development with a focus on clean architecture.',
      icon: <Code2 size={20} className="text-emerald-500" />,
      color: 'group-hover:bg-emerald-50'
    },
    {
      num: '04',
      title: 'Launch',
      desc: 'Deployment followed by optimization for 100% success.',
      icon: <Rocket size={20} className="text-purple-500" />,
      color: 'group-hover:bg-purple-50'
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2">Process</p>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
              THE <span className="text-slate-400">BLUEPRINT</span>
            </h2>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-xs md:text-right">
            A structured, zero-fluff path to turning your brand into a market leader.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="group relative p-8 bg-slate-50/50 rounded-4xl border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/40"
            >
              <div className="flex justify-between items-start mb-6">
                {/* Icon Container - Smaller & Cleaner */}
                <div className={`w-15 h-15 rounded-xl bg-white flex items-center justify-center border border-slate-100 transition-colors duration-300 ${step.color}`}>
                  {step.icon}
                </div>
                {/* Step Number Badge */}
                <span className="text-[12px] font-black text-slate-300 group-hover:text-blue-600 transition-colors border border-slate-100 px-2 py-1 rounded-md bg-white">
                  STEP {step.num}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  {step.desc}
                </p>
              </div>

              {/* Minimal Animated Bottom Line */}
              <div className="mt-6 w-6 h-1 bg-slate-200 group-hover:w-full group-hover:bg-blue-600 transition-all duration-500 rounded-full"></div>
              
              {/* Connector Arrow (Desktop Only) */}
              {i < 3 && (
                <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-100 z-20 group-hover:text-blue-200 transition-colors" size={20} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;