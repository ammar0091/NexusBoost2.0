import { Mail, MessageCircle, Phone } from 'lucide-react';
import PageHero from '@components/common/PageHero';
import Seo from '@components/common/Seo';
import { pageHeroVisuals } from '@/content/marketingContent';

const supportCards = [
  {
    icon: Mail,
    title: 'Email support',
    value: 'support@nexusboost.com',
    href: 'mailto:support@nexusboost.com',
  },
  {
    icon: Phone,
    title: 'Call support',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: MessageCircle,
    title: 'Strategy chat',
    value: 'Get help with website, SEO, or campaign questions',
    href: '/contact',
  },
];

const faqs = [
  {
    q: 'How quickly will I get a response?',
    a: 'Most support and campaign questions are answered within one business day, and urgent delivery issues are prioritized faster.',
  },
  {
    q: 'Can you help after launch with SEO and performance?',
    a: 'Yes. We support clients with post-launch SEO updates, tracking fixes, landing page improvements, and campaign optimization.',
  },
  {
    q: 'Do you offer custom retainers?',
    a: 'Yes, we can tailor support around website maintenance, content production, reporting, SEO, or paid media management.',
  },
];

const Support = () => {
  return (
    <div className="overflow-hidden">
      <Seo
        title="Support for Websites, SEO, and Marketing Campaigns"
        description="Get help from the NexusBoost team for website support, SEO questions, campaign guidance, and reporting assistance."
        image={pageHeroVisuals.support.src}
        imageAlt={pageHeroVisuals.support.alt}
        keywords={['website support', 'seo support', 'marketing support', 'campaign support']}
      />
      <PageHero
        eyebrow="Support"
        title="Need help with your"
        highlight="website, SEO, or campaigns"
        description="Get quick assistance, issue resolution, and strategic guidance from our support team across websites, analytics, content, and digital marketing execution."
        visual={pageHeroVisuals.support}
      />

      <section className="nb-section pt-6">
        <div className="nb-container">
          <div className="grid gap-4 md:grid-cols-3">
            {supportCards.map((card) => {
              const Icon = card.icon;
              return (
                <a key={card.title} href={card.href} className="nb-panel block p-5 hover:border-[var(--nb-accent)]">
                  <span className="inline-flex rounded-lg border border-[var(--nb-border)] bg-[var(--nb-surface-soft)] p-2 text-[var(--nb-accent)]">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-[var(--nb-text)]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--nb-text-muted)]">{card.value}</p>
                </a>
              );
            })}
          </div>

          <div className="mt-8 nb-panel p-6">
            <h2 className="text-2xl font-black text-[var(--nb-text)]">Frequently asked questions</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--nb-text-muted)]">
              Common questions about support coverage, response time, SEO retainers, and digital marketing optimization after launch.
            </p>
            <div className="mt-4 space-y-3">
              {faqs.map((item) => (
                <details key={item.q} className="nb-soft-panel px-4 py-3">
                  <summary className="cursor-pointer font-semibold text-[var(--nb-text)]">{item.q}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--nb-text-muted)]">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
