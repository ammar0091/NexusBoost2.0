import PageHero from '@components/common/PageHero';
import PageCTA from '@components/common/PageCTA';
import ServicesList from '@components/sections/services/ServicesList';
import HowWeDeliver from '@components/sections/services/HowWeDeliver';
import Seo from '@components/common/Seo';
import { pageHeroVisuals } from '@/content/marketingContent';

const Services = () => {
  return (
    <div className="overflow-hidden">
      <Seo
        title="SEO, Digital Marketing, and Website Services"
        description="Explore NexusBoost services across SEO, paid media, social media marketing, content strategy, analytics, and conversion-focused web development."
        image={pageHeroVisuals.services.src}
        imageAlt={pageHeroVisuals.services.alt}
        keywords={['seo services', 'digital marketing services', 'website development agency', 'ppc services', 'content marketing agency']}
      />
      <PageHero
        eyebrow="Digital Marketing Services"
        title="Growth services"
        highlight="built for search, conversion, and scale"
        description="From SEO and paid advertising to content production, analytics, and website design, each service is built to improve visibility, lead flow, and measurable revenue outcomes."
        cta="See offerings"
        visual={pageHeroVisuals.services}
      />
      <ServicesList />
      <HowWeDeliver />
      <PageCTA
        eyebrow="Next Step"
        title="Not sure which service mix"
        highlight="fits your growth stage"
        description="We can audit your traffic sources, website, and funnel performance, then recommend the fastest roadmap for SEO growth and demand generation."
        primary="Request Audit"
        secondary="See Case Studies"
      />
    </div>
  );
};

export default Services;
