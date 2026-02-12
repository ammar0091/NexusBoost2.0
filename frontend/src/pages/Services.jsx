import PageHero from '@components/common/PageHero';
import PageCTA from '@components/common/PageCTA';
import ServicesList from '@components/sections/services/ServicesList';
import HowWeDeliver from '@components/sections/services/HowWeDeliver';


const Services = () => {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Services"
        title="Marketing services"
        highlight="built for performance."
        description="Every service is engineered to drive measurable growth and ROI."
        cta="Explore services"
      />
      <ServicesList />
      <HowWeDeliver />
      <PageCTA
        eyebrow="Next Step"
        title="Not sure which service"
        highlight="you need?"
        description="We’ll audit your current setup and suggest the right path."
        primary="Request a strategy call"
        secondary="View Case Studies"
      />

    </div>
  );
};

export default Services;
