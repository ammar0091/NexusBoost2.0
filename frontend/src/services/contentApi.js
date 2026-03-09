import { apiRequest } from "@/services/apiClient";

export async function fetchBlogs() {
  const res = await apiRequest("/blogs");
  return res?.data || [];
}

export async function fetchProjects() {
  const res = await apiRequest("/projects");
  return res?.data || [];
}

export async function fetchClients() {
  const res = await apiRequest("/clients");
  return res?.data || [];
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
