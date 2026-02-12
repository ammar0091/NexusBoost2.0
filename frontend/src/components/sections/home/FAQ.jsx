import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'How soon can we see results?',
    a: 'Paid campaigns show impact in weeks, while SEO builds compounding growth over 3–6 months.',
  },
  {
    q: 'Do you work with startups?',
    a: 'Yes. We specialize in scaling early-stage startups into market leaders with lean strategies.',
  },
  {
    q: 'Is reporting included?',
    a: 'Every month, you receive a transparent deep-dive into performance, ROI, and future roadmaps.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-white border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16">
        
        {/* Left Side: Static Content (Compact) */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black  tracking-widest mb-6">
            <HelpCircle size={12} fill="currentColor" /> FAQs
          </div>
          <p className="text-slate-500 text-lg font-medium max-w-sm">
            Everything you need to know about our high-performance growth process.
          </p>
        </div>

        {/* Right Side: Interactive FAQ List */}
        <div className="lg:col-span-7 divide-y divide-slate-100">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="group py-6 first:pt-0 last:pb-0 cursor-pointer"
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            >
              <div className="flex items-center justify-between gap-4 transition-all">
                <h4 className={`text-xl font-bold tracking-tight transition-colors ${openIndex === i ? 'text-blue-600' : 'text-slate-900'}`}>
                  {faq.q}
                </h4>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${openIndex === i ? 'bg-blue-600 border-blue-600 text-white rotate-180' : 'bg-white border-slate-100 text-slate-400 group-hover:border-blue-200'}`}>
                  {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              
              <div className={`grid transition-all duration-300 ease-in-out ${openIndex === i ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <p className="text-slate-500 text-base leading-relaxed font-medium pr-12">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;