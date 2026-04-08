import PageHero from '@components/common/PageHero';
import Seo from '@components/common/Seo';
import { PRIVACY_SECTIONS } from '@/constants/legalData';

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
            {PRIVACY_SECTIONS.map((section) => (
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
