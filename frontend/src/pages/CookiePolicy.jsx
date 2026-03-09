import PageHero from '@components/common/PageHero';

const CookiePolicy = () => {
  return (
    <div className="overflow-hidden">
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
              <h2 className="text-2xl font-black text-[var(--nb-text)]">What are cookies?</h2>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-[var(--nb-text-muted)]">
                Cookies are small files stored on your device to help websites remember preferences and improve performance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-[var(--nb-text)]">Types of cookies we use</h2>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm md:text-base text-[var(--nb-text-muted)]">
                <li>Essential cookies for core site functionality.</li>
                <li>Performance cookies for analytics and optimization.</li>
                <li>Marketing cookies for campaign measurement and relevance.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-black text-[var(--nb-text)]">Managing cookies</h2>
              <p className="mt-2 text-sm md:text-base leading-relaxed text-[var(--nb-text-muted)]">
                You can block or clear cookies from your browser settings, but some features may not function correctly.
              </p>
            </div>

            <p className="text-xs text-[var(--nb-text-muted)]">Last updated: February 10, 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
