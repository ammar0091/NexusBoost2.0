import PageHero from '@components/common/PageHero';
import Seo from '@components/common/Seo';
import { TERMS_SECTIONS } from '@/constants/legalData';

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
            {TERMS_SECTIONS.map((section) => (
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
