import PageHero from '@components/common/PageHero';
import Seo from '@components/common/Seo';
import {
  COOKIE_CATEGORIES,
  COOKIE_MANAGEMENT_ITEMS,
  COOKIE_POLICY_SECTIONS,
} from '@/constants/legalData';

const CookiePolicy = () => {
  return (
    <div className="overflow-hidden">
      <Seo
        title="Cookie Policy"
        description="Understand how NexusBoost uses cookies and related technologies."
      />
      <PageHero
        eyebrow="Legal"
        title="Cookie"
        highlight="Policy"
        description="How we use cookies and related technologies across our platform."
      />

      <section className="nb-section pt-6">
        <div className="nb-container max-w-4xl">
          <div className="nb-panel p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-black text-(--nb-text)">{COOKIE_POLICY_SECTIONS[0].title}</h2>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-(--nb-text-muted)">
                {COOKIE_POLICY_SECTIONS[0].text}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-(--nb-text)">{COOKIE_POLICY_SECTIONS[1].title}</h2>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-(--nb-text-muted)">
                {COOKIE_POLICY_SECTIONS[1].text}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-(--nb-text)">Cookie categories</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {COOKIE_CATEGORIES.map((item) => (
                  <div key={item.title} className="nb-soft-panel p-4">
                    <h3 className="text-lg font-bold text-(--nb-text)">{item.title}</h3>
                    <p className="mt-2 text-sm text-(--nb-text-muted)">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-(--nb-text)">{COOKIE_POLICY_SECTIONS[2].title}</h2>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-(--nb-text-muted)">
                {COOKIE_POLICY_SECTIONS[2].text}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-(--nb-text)">{COOKIE_POLICY_SECTIONS[3].title}</h2>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-(--nb-text-muted)">
                {COOKIE_POLICY_SECTIONS[3].text}
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm md:text-base text-(--nb-text-muted)">
                {COOKIE_MANAGEMENT_ITEMS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="nb-soft-panel p-5">
              <h3 className="text-lg font-bold text-(--nb-text)">Questions about cookies</h3>
              <p className="mt-2 text-sm md:text-base text-(--nb-text-muted)">
                Contact us at hello@nexusboost.com if you need more details about how we use cookies.
              </p>
            </div>

            <p className="text-xs text-(--nb-text-muted)">Last updated: March 11, 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
