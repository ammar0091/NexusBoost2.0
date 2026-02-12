import React from 'react';
import Hero from '@components/sections/home/Hero';
import TrustStats from '@components/sections/home/TrustStats';
import About from '@components/sections/home/About';
import ServicesPreview from '@components/sections/home/ServicesPreview';
import WhyChooseUs from '@components/sections/home/WhyChooseUs';
import Process from '@components/sections/home/Process';
import Testimonials from '@components/sections/home/Testimonials';
import FAQ from '@components/sections/home/FAQ';
import ContactCTA from '@components/sections/home/ContactCTA';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <TrustStats />
      <About />
      <ServicesPreview />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </div>
  );
};

export default Home;
