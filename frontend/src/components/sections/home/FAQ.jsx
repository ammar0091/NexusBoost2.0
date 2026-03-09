import { useState } from 'react';
import { Plus, Minus, HelpCircle, Sparkles } from 'lucide-react';

const faqs = [
  {
    q: 'How fast can you deliver a new website?',
    a: 'Most standard launches are delivered in 3 to 6 weeks depending on content and integrations.',
  },
  {
    q: 'Can you redesign and keep our existing tech stack?',
    a: 'Yes. We can work with your current CMS and backend while upgrading UI and performance.',
  },
  {
    q: 'Do you provide post-launch growth support?',
    a: 'Yes. We offer ongoing optimization for SEO, ads, funnels, and conversion tracking.',
  },
  {
    q: 'Is everything mobile-first?',
    a: 'Absolutely. We design and test for mobile first, then scale to larger viewports.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="nb-section">
      <div className="nb-container grid gap-16 lg:grid-cols-12">

        {/* Left Side (Same Style as Right) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-(--nb-border) text-[10px] font-black tracking-widest text-(--nb-accent)">
            <HelpCircle size={12} />
            FAQs
          </div>

          <h3 className="text-3xl font-black text-(--nb-text) leading-tight">
            Answers to common questions
          </h3>

          <p className="text-(--nb-text-muted) text-base max-w-sm">
            Everything you need to know about how we design, build and scale high-performance websites.
          </p>

          <div className="pt-6 border-t border-(--nb-border)">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-text-muted)">
              Support speed
            </p>

            <p className="mt-1 text-xl font-black text-(--nb-text)">
              First reply under 2 hours
            </p>

            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-(--nb-border) px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-accent)">
              <Sparkles size={12} />
              Priority Support
            </span>
          </div>

        </div>

        {/* Right Side FAQ */}
        <div className="lg:col-span-7 divide-y divide-(--nb-border)">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.q}
                className="group py-6 first:pt-0 last:pb-0 cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <div className="flex items-center justify-between gap-4">

                  <h4
                    className={`text-xl font-bold transition-colors ${
                      isOpen
                        ? 'text-(--nb-accent)'
                        : 'text-(--nb-text)'
                    }`}
                  >
                    {faq.q}
                  </h4>

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                      isOpen
                        ? 'bg-(--nb-accent) border-(--nb-accent) text-white rotate-180'
                        : 'bg-white border-(--nb-border) text-(--nb-text-muted) group-hover:border-(--nb-accent)'
                    }`}
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>

                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 mt-4'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-(--nb-text-muted) text-base leading-relaxed pr-12">
                      {faq.a}
                    </p>
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