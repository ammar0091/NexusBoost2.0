import { Link } from 'react-router-dom';
import PageHero from '@components/common/PageHero';
import PageCTA from '@components/common/PageCTA';
import Seo from '@components/common/Seo';

const NotFound = () => {
  return (
    <div className="overflow-hidden">
      <Seo title="Page Not Found" description="The page you are looking for does not exist." noIndex />
      <PageHero
        eyebrow="Oops"
        title="Page"
        highlight="Not Found"
        description="The link you followed might be broken or the page may have been moved."
        cta="Go to Contact"
      />

      <section className="nb-section pt-6">
        <div className="nb-container max-w-3xl">
          <div className="nb-panel p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-black text-(--nb-text)">Try one of these</h2>
            <p className="text-sm md:text-base text-(--nb-text-muted)">
              Visit the homepage or explore our services and portfolio to find what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                className="nb-shine rounded-xl px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-950 bg-(--nb-accent) hover:brightness-110"
              >
                Back to Home
              </Link>
              <Link
                to="/services"
                className="rounded-xl border border-(--nb-border) bg-(--nb-surface-soft) px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-(--nb-text) hover:border-(--nb-accent)"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default NotFound;
