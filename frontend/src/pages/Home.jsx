import Seo from '@components/common/Seo';
import { SITE } from '@/config/site';
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
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: SITE.name,
        url: SITE.url,
        description: SITE.defaultDescription,
        email: 'hello@nexusboost.com',
        areaServed: 'Global',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'hello@nexusboost.com',
          },
        ],
      },
      {
        '@type': 'WebSite',
        name: SITE.name,
        url: SITE.url,
      },
      {
        '@type': 'ProfessionalService',
        name: 'NexusBoost Digital Marketing Services',
        serviceType: ['SEO', 'Digital Marketing', 'Web Design', 'Performance Marketing'],
        url: SITE.url,
      },
    ],
  };

  return (
    <div className="overflow-hidden">
      <Seo
        title="Digital Marketing, SEO, and Website Growth Services"
        description="NexusBoost builds SEO strategy, high-converting websites, content systems, and digital marketing campaigns that drive qualified leads."
        image={SITE.defaultImage}
        keywords={['digital marketing agency', 'seo agency', 'website design', 'performance marketing', 'content marketing']}
        schema={schema}
      />
      <Hero />
      <About />
      <TrustStats />
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
