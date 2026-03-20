import PageHero from '@components/common/PageHero';
import Seo from '@components/common/Seo';

const sections = [
  {
    title: 'Overview',
    text: 'This policy explains what data we collect, why we collect it, and the choices you have when using NexusBoost.',
  },
  {
    title: 'Information we collect',
    items: [
      'Contact details such as name, email, and company information.',
      'Usage data like pages viewed, interactions, and referral sources.',
      'Device data including browser type, IP address, and diagnostics.',
      'Preferences and communications you share with our team.',
    ],
  },
  {
    title: 'How we use information',
    items: [
      'Deliver and improve our services, websites, and support.',
      'Communicate updates, onboarding, and service-related notices.',
      'Measure performance, analytics, and product quality.',
      'Protect against fraud, abuse, and security incidents.',
    ],
  },
  {
    title: 'Legal bases',
    text: 'We process data when it is necessary to perform a contract, meet legal obligations, protect legitimate interests, or with your consent.',
  },
  {
    title: 'Sharing and processors',
    text: 'We do not sell personal information. We share data only with vetted providers who help us deliver services, analytics, or communications.',
  },
  {
    title: 'Retention and security',
    text: 'We retain information only as long as needed for the purposes described and apply administrative and technical safeguards to protect it.',
  },
  {
    title: 'Your rights and choices',
    items: [
      'Request access, correction, or deletion of your personal data.',
      'Opt out of non-essential communications at any time.',
      'Ask for a copy of the information we hold about you.',
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="overflow-hidden">
      <Seo
        title="Privacy Policy"
        description="Learn how NexusBoost collects, uses, and protects personal information."
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        highlight="Policy"
        description="How we collect, use, and protect your personal information."
      />

      <section className="nb-section pt-6">
        <div className="nb-container max-w-4xl">
          <div className="nb-panel p-6 md:p-8 space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-2xl font-black text-[var(--nb-text)]">{section.title}</h2>
                {section.text ? (
                  <p className="mt-2 text-sm md:text-base leading-relaxed text-[var(--nb-text-muted)]">{section.text}</p>
                ) : null}
                {section.items ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm md:text-base text-[var(--nb-text-muted)]">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}

            <div className="nb-soft-panel p-5">
              <h3 className="text-lg font-bold text-[var(--nb-text)]">Contact for privacy questions</h3>
              <p className="mt-2 text-sm md:text-base text-[var(--nb-text-muted)]">
                Email us at hello@nexusboost.com with any privacy or data requests. We respond within standard business hours.
              </p>
            </div>

            <p className="text-xs text-[var(--nb-text-muted)]">Last updated: March 11, 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
