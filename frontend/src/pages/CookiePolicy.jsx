import PageHero from '@components/common/PageHero';
import Seo from '@components/common/Seo';

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
              <h2 className="text-2xl font-black text-(--nb-text)">What are cookies?</h2>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-(--nb-text-muted)">
                Cookies are small files stored on your device to help websites remember preferences and improve performance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-(--nb-text)">Why we use cookies</h2>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-(--nb-text-muted)">
                We use cookies to keep the site secure, measure performance, remember preferences, and improve the overall experience.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-(--nb-text)">Cookie categories</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {[
                  {
                    title: 'Essential',
                    text: 'Required for core site functionality, security, and session management.',
                  },
                  {
                    title: 'Performance',
                    text: 'Helps us understand usage patterns and improve site speed and reliability.',
                  },
                  {
                    title: 'Functional',
                    text: 'Remembers preferences like theme choice or region.',
                  },
                  {
                    title: 'Marketing',
                    text: 'Measures campaigns and delivers more relevant content.',
                  },
                ].map((item) => (
                  <div key={item.title} className="nb-soft-panel p-4">
                    <h3 className="text-lg font-bold text-(--nb-text)">{item.title}</h3>
                    <p className="mt-2 text-sm text-(--nb-text-muted)">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-(--nb-text)">Third-party cookies</h2>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-(--nb-text-muted)">
                We may use trusted analytics and marketing partners. These providers set their own cookies in accordance
                with their privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-(--nb-text)">Managing cookies</h2>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-(--nb-text-muted)">
                You can block or clear cookies from your browser settings, but some features may not function correctly.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm md:text-base text-(--nb-text-muted)">
                <li>Adjust cookie settings in your browser preferences.</li>
                <li>Delete stored cookies for NexusBoost at any time.</li>
                <li>Opt out of marketing cookies via industry opt-out tools.</li>
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
