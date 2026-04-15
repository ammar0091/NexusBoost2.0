import { apiRequest } from "@/services/apiClient";
import {
  fallbackBlogs,
  fallbackClients,
  fallbackProjects,
  fallbackTeam,
} from "@/content/marketingContent";

const CONTENT_FALLBACK_ENABLED =
  import.meta.env.DEV && import.meta.env.VITE_ENABLE_CONTENT_FALLBACK === "true";

async function fetchCollection(path, fallbackData, options = {}) {
  const enableFallback = options.enableFallback ?? CONTENT_FALLBACK_ENABLED;
  const res = await apiRequest(path);
  const data = Array.isArray(res?.data) ? res.data : [];

  if (data.length || !enableFallback) {
    return data;
  }

  return fallbackData;
}

export async function fetchBlogs(options = {}) {
  try {
    return await fetchCollection("/blogs", fallbackBlogs, options);
  } catch (error) {
    if (options.enableFallback ?? CONTENT_FALLBACK_ENABLED) {
      return fallbackBlogs;
    }
    throw error;
  }
}

export async function fetchBlogBySlug(slug, options = {}) {
  try {
    const res = await apiRequest(`/blogs/slug/${slug}`);
    if (res?.data) {
      return res.data;
    }
  } catch (error) {
    if (!(options.enableFallback ?? CONTENT_FALLBACK_ENABLED)) {
      throw error;
    }
  }

  const fallback = fallbackBlogs.find((item) => item.slug === slug || item.id === slug);
  if (fallback) {
    return fallback;
  }

  throw new Error("Blog not found");
}

export async function fetchProjects(options = {}) {
  try {
    return await fetchCollection("/projects", fallbackProjects, options);
  } catch (error) {
    if (options.enableFallback ?? CONTENT_FALLBACK_ENABLED) {
      return fallbackProjects;
    }
    throw error;
  }
}

export async function fetchProjectBySlug(slug, options = {}) {
  try {
    const res = await apiRequest(`/projects/slug/${slug}`);
    if (res?.data) {
      return res.data;
    }
  } catch (error) {
    if (!(options.enableFallback ?? CONTENT_FALLBACK_ENABLED)) {
      throw error;
    }
  }

  const fallback = fallbackProjects.find((item) => item.slug === slug || item.id === slug);
  if (fallback) {
    return fallback;
  }

  throw new Error("Project not found");
}

export async function fetchClients(options = {}) {
  try {
    return await fetchCollection("/clients", fallbackClients, options);
  } catch (error) {
    if (options.enableFallback ?? CONTENT_FALLBACK_ENABLED) {
      return fallbackClients;
    }
    throw error;
  }
}

export async function fetchTeams(options = {}) {
  try {
    return await fetchCollection("/teams", fallbackTeam, options);
  } catch (error) {
    if (options.enableFallback ?? CONTENT_FALLBACK_ENABLED) {
      return fallbackTeam;
    }
    throw error;
  }
}

export async function submitContact(formData) {
  return apiRequest("/contact", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}

export async function subscribeNewsletter(email) {
  return apiRequest("/newsletter", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
