import PageHero from '@components/common/PageHero';

const sections = [
  {
    title: 'Information Collection',
    text: 'We collect personal details such as name, email, and usage data when you interact with our services.',
  },
  {
    title: 'Use of Information',
    text: 'Data is used to deliver services, improve product experience, and communicate relevant updates.',
  },
  {
    title: 'Data Sharing',
    text: 'We do not sell personal information. Data may be shared with trusted providers only for service delivery.',
  },
  {
    title: 'Your Rights',
    text: 'You may request access, correction, or deletion of your personal data by contacting our support team.',
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="overflow-hidden">
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
                <p className="mt-2 text-sm md:text-base leading-relaxed text-[var(--nb-text-muted)]">{section.text}</p>
              </div>
            ))}
            <p className="text-xs text-[var(--nb-text-muted)]">Last updated: February 10, 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
