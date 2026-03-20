import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '@components/common/Seo';
import PageCTA from '@components/common/PageCTA';
import { getServiceBySlug } from '@/content/servicesContent';
import { SITE } from '@/config/site';

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  const schema = service
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.desc,
        provider: {
          '@type': 'Organization',
          name: SITE.name,
        },
        url: `${SITE.url}/services/${service.slug}`,
        image: service.image,
      }
    : null;

  return (
    <div className="overflow-hidden pt-20 ">
      <Seo
        title={service ? `${service.title} Services` : 'Service'}
        description={service?.desc || 'Explore NexusBoost services.'}
        image={service?.image}
        imageAlt={service?.title}
        path={service ? `/services/${service.slug}` : `/services/${slug}`}
        schema={schema}
        noIndex={!service}
      />

      <section className="nb-section pt-32">
        <div className="nb-container max-w-4xl">
          <Link
            to="/services"
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-(--nb-border) bg-(--nb-surface) px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-(--nb-text) hover:border-(--nb-accent)"
          >
            <ArrowLeft size={14} />
            Back to Services
          </Link>

          {!service ? (
            <div className="nb-panel p-8 md:p-10">
              <h1 className="text-3xl font-black text-(--nb-text)">Service not found</h1>
              <p className="mt-4 text-(--nb-text-muted)">The requested service page could not be found.</p>
            </div>
          ) : (
            <article className="space-y-8">
              <header className="space-y-5">
                <p className="nb-pill border border-(--nb-border) bg-(--nb-surface) text-(--nb-accent)">
                  {service.shortTitle}
                </p>
                <h1 className="text-4xl font-black leading-[0.95] text-(--nb-text) md:text-5xl">{service.title}</h1>
                <p className="max-w-3xl text-base leading-relaxed text-(--nb-text-muted) md:text-lg">{service.desc}</p>
              </header>

              <div className="nb-panel overflow-hidden p-3">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-104 w-full rounded-2xl object-cover"
                  loading="lazy"
                  decoding="async"
                  width="1400"
                  height="900"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {service.bullets.map((item) => (
                  <div key={item} className="nb-panel p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-accent)">Included</p>
                    <p className="mt-3 text-sm leading-relaxed text-(--nb-text-muted)">{item}</p>
                  </div>
                ))}
              </div>

              <div className="nb-panel p-7 md:p-10">
                {service.detail.split(/\n\n+/).map((paragraph) => (
                  <p key={paragraph} className="mb-5 text-base leading-8 text-(--nb-text-muted) md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          )}
        </div>
      </section>

      <PageCTA
        eyebrow="Need this service"
        title="Lets turn strategy into"
        highlight="measurable growth"
        description="We can tailor this service to your website, funnel, and growth stage with a practical execution roadmap."
        primary="Book Strategy Call"
        secondary="See Portfolio"
        secondaryHref="/portfolio"
      />
    </div>
  );
};

export default ServiceDetail;
