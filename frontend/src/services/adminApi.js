import { apiRequest } from "@/services/apiClient";

export async function adminLogin(payload) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchAdminStats() {
  const res = await apiRequest("/admin/stats");
  return res?.data || {};
}

export async function fetchAdminContacts() {
  const res = await apiRequest("/admin/contacts");
  return res?.data || [];
}

export async function updateContactStatus(id, status) {
  return apiRequest(`/admin/contacts/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function fetchAdminNewsletters() {
  const res = await apiRequest("/admin/newsletters");
  return res?.data || [];
}

export async function createBlog(payload) {
  const res = await apiRequest("/blogs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res?.data;
}

export async function updateBlog(id, payload) {
  const res = await apiRequest(`/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return res?.data;
}

export async function deleteBlog(id) {
  return apiRequest(`/blogs/${id}`, {
    method: "DELETE",
  });
}

export async function createProject(payload) {
  const res = await apiRequest("/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res?.data;
}

export async function updateProject(id, payload) {
  const res = await apiRequest(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return res?.data;
}

export async function deleteProject(id) {
  return apiRequest(`/projects/${id}`, {
    method: "DELETE",
  });
}

export async function createClient(payload) {
  const res = await apiRequest("/clients", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res?.data;
}

export async function updateClient(id, payload) {
  const res = await apiRequest(`/clients/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return res?.data;
}

export async function deleteClient(id) {
  return apiRequest(`/clients/${id}`, {
    method: "DELETE",
  });
}
