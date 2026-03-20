import PageHero from '@components/common/PageHero';
import Seo from '@components/common/Seo';

const sections = [
  {
    title: 'Acceptance of Terms',
    text: 'By accessing our website and services, you agree to comply with these terms and conditions.',
  },
  {
    title: 'Use of Services',
    text: 'Services must be used lawfully and responsibly. Any misuse, abuse, or disruption is prohibited.',
  },
  {
    title: 'Intellectual Property',
    text: 'All site content, branding, and software are protected by intellectual property laws.',
  },
  {
    title: 'Limitation of Liability',
    text: 'We are not liable for indirect or incidental damages arising from use of the website or services.',
  },
  {
    title: 'Changes to Terms',
    text: 'Terms may be updated periodically. Continued use of the website implies acceptance of revised terms.',
  },
];

const TermsConditions = () => {
  return (
    <div className="overflow-hidden">
      <Seo
        title="Terms and Conditions"
        description="Review the terms and conditions that govern use of NexusBoost services."
      />
      <PageHero
        eyebrow="Legal"
        title="Terms and"
        highlight="Conditions"
        description="Rules and guidelines governing use of our website and services."
      />

      <section className="nb-section pt-6">
        <div className="nb-container max-w-4xl">
          <div className="nb-panel p-6 md:p-8 space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-2xl font-black text-(--nb-text)">{section.title}</h2>
                <p className="mt-2 text-sm md:text-base leading-relaxed text-(--nb-text-muted)">{section.text}</p>
              </div>
            ))}
            <p className="text-xs text-(--nb-text-muted)">Last updated: February 10, 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
