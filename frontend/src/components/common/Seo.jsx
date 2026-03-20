import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '@/config/site';

const upsertMeta = ({ name, property, content }) => {
  if (!content) return;
  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    if (name) {
      element.setAttribute('name', name);
    } else if (property) {
      element.setAttribute('property', property);
    }
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const upsertLink = ({ rel, href }) => {
  if (!href) return;
  const selector = `link[rel="${rel}"]`;
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

const upsertJsonLd = ({ id, schema }) => {
  const existing = document.getElementById(id);

  if (!schema) {
    if (existing) existing.remove();
    return;
  }

  const script = existing || document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.setAttribute('id', id);
  script.textContent = JSON.stringify(schema);

  if (!existing) {
    document.head.appendChild(script);
  }
};

const Seo = ({ title, description, image, imageAlt, path, noIndex = false, schema, keywords }) => {
  const location = useLocation();
  const resolvedPath = path || location.pathname;
  const canonicalUrl = new URL(resolvedPath, SITE.url).toString();
  const resolvedTitle = title ? `${title} | ${SITE.name}` : SITE.defaultTitle;
  const resolvedDescription = description || SITE.defaultDescription;
  const resolvedImage = image || SITE.defaultImage;
  const resolvedImageAlt = imageAlt || `${resolvedTitle} preview image`;

  useEffect(() => {
    document.title = resolvedTitle;
    upsertMeta({ name: 'description', content: resolvedDescription });
    upsertMeta({
      name: 'keywords',
      content: Array.isArray(keywords) ? keywords.join(', ') : keywords,
    });
    upsertMeta({
      name: 'robots',
      content: noIndex ? 'noindex, nofollow' : 'index, follow',
    });
    upsertMeta({ property: 'og:title', content: resolvedTitle });
    upsertMeta({ property: 'og:description', content: resolvedDescription });
    upsertMeta({ property: 'og:type', content: 'website' });
    upsertMeta({ property: 'og:url', content: canonicalUrl });
    upsertMeta({ property: 'og:image', content: resolvedImage });
    upsertMeta({ property: 'og:image:alt', content: resolvedImageAlt });
    upsertMeta({ property: 'og:site_name', content: SITE.name });
    upsertMeta({ property: 'og:locale', content: 'en_US' });
    upsertMeta({ name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta({ name: 'twitter:title', content: resolvedTitle });
    upsertMeta({ name: 'twitter:description', content: resolvedDescription });
    upsertMeta({ name: 'twitter:image', content: resolvedImage });
    upsertMeta({ name: 'twitter:image:alt', content: resolvedImageAlt });
    upsertLink({ rel: 'canonical', href: canonicalUrl });
    upsertJsonLd({ id: 'seo-schema', schema });
  }, [canonicalUrl, keywords, noIndex, resolvedDescription, resolvedImage, resolvedImageAlt, resolvedTitle, schema]);

  return null;
};

export default Seo;
