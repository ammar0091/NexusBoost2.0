import PageHero from '@components/common/PageHero';
import PageCTA from '@components/common/PageCTA';
import ServicesList from '@components/sections/services/ServicesList';
import HowWeDeliver from '@components/sections/services/HowWeDeliver';

const Services = () => {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Services"
        title="Growth services"
        highlight="built for performance"
        description="From SEO and paid media to website builds, each service is designed to deliver measurable business outcomes."
        cta="See offerings"
      />
      <ServicesList />
      <HowWeDeliver />
      <PageCTA
        eyebrow="Next Step"
        title="Not sure which service"
        highlight="fits your stage"
        description="We can audit your current setup and recommend the right roadmap."
        primary="Request Audit"
        secondary="See Case Studies"
      />
    </div>
  );
};

export default Services;
