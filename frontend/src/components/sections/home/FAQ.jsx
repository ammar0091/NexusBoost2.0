import { useState } from 'react';
import { HelpCircle, Minus, Plus } from 'lucide-react';
import { HOME_FAQS } from '@/constants/homeData';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="nb-section ">
      <div className="nb-container grid gap-16 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-(--nb-border) px-3 py-1 text-[10px] font-black tracking-widest text-(--nb-accent)">
            <HelpCircle size={12} /> FAQs
          </div>

          <p className="max-w-md border-b border-(--nb-border) pb-5 text-base text-(--nb-text-muted)">
            Everything you need to know about how we plan, build, optimize, and scale SEO-ready digital experiences.
          </p>
        </div>

        <div className="divide-y divide-(--nb-border) lg:col-span-7">
          {HOME_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="group cursor-pointer py-6 first:pt-0 last:pb-0"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className={`text-md font-bold transition-colors ${isOpen ? 'text-(--nb-accent)' : 'text-(--nb-text)'}`}>
                    {faq.q}
                  </h4>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                      isOpen
                        ? 'rotate-180 border-(--nb-accent) bg-(--nb-accent) text-slate-950'
                        : 'border-(--nb-border) bg-(--nb-surface) text-(--nb-text-muted) group-hover:border-(--nb-accent)'
                    }`}
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </div>

                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="pr-12 text-base leading-relaxed text-(--nb-text-muted)">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
