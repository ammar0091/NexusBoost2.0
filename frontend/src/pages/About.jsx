import PageHero from '@components/common/PageHero';
import OurStory from '@components/sections/about/OurStory';
import WhatMakesUsDifferent from '@components/sections/about/WhatMakesUsDifferent';
import PageCTA from '@components/common/PageCTA';
import Seo from '@components/common/Seo';
import Team from '../components/sections/about/Team';
import { pageHeroVisuals } from '@/content/marketingContent';

const About = () => {
  return (
    <div className="overflow-hidden">
      <Seo
        title="About Our SEO and Digital Marketing Team"
        description="Learn how NexusBoost combines SEO, content, paid media, and web design into one accountable digital growth team."
        image={pageHeroVisuals.about.src}
        imageAlt={pageHeroVisuals.about.alt}
        keywords={['about digital marketing agency', 'seo team', 'growth marketing agency', 'web design experts']}
      />
      <PageHero
        eyebrow="About "
        title="We build digital marketing systems"
        highlight="that turn traffic into revenue"
        description="NexusBoost is a strategy-led agency for SEO, content, websites, paid acquisition, and conversion optimization. We connect planning, execution, and reporting so brands can scale with confidence."
        cta="Meet the team"
        visual={pageHeroVisuals.about}
      />
      <OurStory />
      <WhatMakesUsDifferent />
      <Team />
      <PageCTA
        eyebrow="Growth Partnership"
        title="Need a team that can align"
        highlight="SEO, content, design, and ads"
        description="Tell us your growth goals and we will map a practical execution plan around rankings, conversion rate, and qualified lead volume."
        primary="Book Strategy Call"
        secondary="View Portfolio"
      />
    </div>
  );
};

export default About;
