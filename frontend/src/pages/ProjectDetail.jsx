import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '@components/common/Seo';
import PageCTA from '@components/common/PageCTA';
import { fetchProjectBySlug } from '@/services/contentApi';
import { SITE } from '@/config/site';

const toParagraphs = (project) => {
  const body = project?.content || project?.desc || '';
  return body
    .split(/\n\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadProject = async () => {
      setLoading(true);
      try {
        const result = await fetchProjectBySlug(slug, { enableFallback: true });
        if (mounted) {
          setProject(result);
          setError('');
        }
      } catch (err) {
        if (mounted) {
          setProject(null);
          setError(err.message || 'Project not found');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadProject();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const paragraphs = useMemo(() => toParagraphs(project), [project]);

  const schema = project
    ? {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.seoDescription || project.desc,
        image: project.image,
        url: `${SITE.url}/portfolio/${project.slug || slug}`,
        creator: {
          '@type': 'Organization',
          name: SITE.name,
        },
      }
    : null;

  return (
    <div className="overflow-hidden pt-20">
      <Seo
        title={project?.seoTitle || project?.title || 'Project'}
        description={project?.seoDescription || project?.desc || 'Read a NexusBoost case study.'}
        image={project?.image}
        imageAlt={project?.title}
        path={project ? `/portfolio/${project.slug || slug}` : `/portfolio/${slug}`}
        schema={schema}
        noIndex={!project && !loading}
      />

      <section className="nb-section pt-32">
        <div className="nb-container max-w-4xl">
          <Link
            to="/portfolio"
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-(--nb-border) bg-(--nb-surface) px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-(--nb-text) hover:border-(--nb-accent)"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>

          {loading ? (
            <div className="nb-panel p-8 md:p-10">
              <div className="h-10 w-2/3 animate-pulse rounded-xl bg-(--nb-surface-soft)" />
              <div className="mt-4 h-5 w-1/3 animate-pulse rounded-xl bg-(--nb-surface-soft)" />
              <div className="mt-6 h-80 animate-pulse rounded-2xl bg-(--nb-surface-soft)" />
            </div>
          ) : error ? (
            <div className="nb-panel p-8 md:p-10">
              <h1 className="text-3xl font-black text-(--nb-text)">Project not found</h1>
              <p className="mt-4 text-(--nb-text-muted)">{error}</p>
            </div>
          ) : (
            <article className="space-y-8">
              <header className="space-y-5">
                <p className="nb-pill border border-(--nb-border) bg-(--nb-surface) text-(--nb-accent)">
                  {project.category || 'Case Study'}
                </p>
                <h1 className="text-4xl font-black leading-[0.95] text-(--nb-text) md:text-5xl">{project.title}</h1>
                <p className="max-w-3xl text-base leading-relaxed text-(--nb-text-muted) md:text-lg">{project.desc}</p>
              </header>

              <div className="nb-panel overflow-hidden p-3">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-104 w-full rounded-2xl object-cover"
                  loading="lazy"
                  decoding="async"
                  width="1400"
                  height="900"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="nb-panel p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-accent)">Focus</p>
                  <p className="mt-3 text-sm leading-relaxed text-(--nb-text-muted)">Search visibility, content structure, and conversion-ready user journeys.</p>
                </div>
                <div className="nb-panel p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-accent)">Approach</p>
                  <p className="mt-3 text-sm leading-relaxed text-(--nb-text-muted)">Strategy, content, and UX improvements tied to measurable business outcomes.</p>
                </div>
                <div className="nb-panel p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-(--nb-accent)">Outcome</p>
                  <p className="mt-3 text-sm leading-relaxed text-(--nb-text-muted)">A clearer growth system built to turn digital attention into qualified demand.</p>
                </div>
              </div>

              <div className="nb-panel p-7 md:p-10">
                {paragraphs.map((paragraph) => (
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
        eyebrow="Want similar results"
        title="Lets build your next"
        highlight="growth-focused case study"
        description="If you want a website, SEO system, or demand generation setup that performs like this, we can map the right execution plan."
        primary="Start a Project"
        secondary="Explore Services"
        secondaryHref="/services"
      />
    </div>
  );
};

export default ProjectDetail;

