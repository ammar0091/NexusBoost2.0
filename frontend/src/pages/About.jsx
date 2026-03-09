import PageHero from '@components/common/PageHero';
import OurStory from '@components/sections/about/OurStory';
import WhatMakesUsDifferent from '@components/sections/about/WhatMakesUsDifferent';
import PageCTA from '@components/common/PageCTA';

const About = () => {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="About"
        title="We build growth systems"
        highlight="for ambitious brands"
        description="NexusBoost is a digital growth partner combining strategy, design, and engineering in one execution team."
        cta="Meet the team"
      />
      <OurStory />
      <WhatMakesUsDifferent />
      <PageCTA
        eyebrow="Lets Work Together"
        title="Need a team that ships"
        highlight="with speed and quality"
        description="Tell us your business goals and we will map the fastest path to measurable growth."
        primary="Book Strategy Call"
        secondary="View Portfolio"
      />
    </div>
  );
};

export default About;
