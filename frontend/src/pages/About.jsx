import React from 'react';
import PageHero from '@components/common/PageHero';
import OurStory from '@components/sections/about/OurStory';
import WhatMakesUsDifferent from '@components/sections/about/WhatMakesUsDifferent';
import PageCTA from '@components/common/PageCTA';

const About = () => {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="About"
        title="We build systems"
        highlight="that scale growth."
        description="Nexus Boost is a digital marketing agency focused on long-term, measurable impact."
        cta="Our story"
        dark
      />
      <OurStory />
      <WhatMakesUsDifferent />
      <PageCTA
        eyebrow="Let’s Work Together"
        title="Build something"
        highlight="that actually grows."
        description="If you’re serious about long-term growth, we should talk."
        dark
      />

    </div>
  );
};

export default About;
