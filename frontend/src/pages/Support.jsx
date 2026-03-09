import { Mail, MessageCircle, Phone } from 'lucide-react';
import PageHero from '@components/common/PageHero';

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
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MessageCircle,
    title: 'Live chat',
    value: 'Chat with our team now',
    href: '/contact',
  },
];

const faqs = [
  {
    q: 'How quickly will I get a response?',
    a: 'Most support queries are answered within 24 hours on business days.',
  },
  {
    q: 'Can I change my service plan anytime?',
    a: 'Yes, plans can be upgraded or adjusted as your requirements evolve.',
  },
  {
    q: 'Do you offer custom support scopes?',
    a: 'Yes, enterprise and custom support packages are available on request.',
  },
];

const Support = () => {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Support"
        title="Need help"
        highlight="our team is here"
        description="Get quick assistance, issue resolution, and guidance from our support specialists."
      />

      <section className="nb-section pt-6">
        <div className="nb-container">
          <div className="grid gap-4 md:grid-cols-3">
            {supportCards.map((card) => {
              const Icon = card.icon;
              return (
                <a key={card.title} href={card.href} className="nb-panel p-5 block hover:border-[var(--nb-accent)]">
                  <span className="inline-flex rounded-lg border border-[var(--nb-border)] bg-[var(--nb-surface-soft)] p-2 text-[var(--nb-accent)]">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-[var(--nb-text)]">{card.title}</h3>
                  <p className="mt-2 text-sm text-[var(--nb-text-muted)]">{card.value}</p>
                </a>
              );
            })}
          </div>

          <div className="mt-8 nb-panel p-6">
            <h2 className="text-2xl font-black text-[var(--nb-text)]">Frequently asked questions</h2>
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
