import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createBlog,
  createClient,
  createProject,
  deleteBlog,
  deleteClient,
  deleteProject,
  fetchAdminContacts,
  fetchAdminNewsletters,
  fetchAdminStats,
  updateBlog,
  updateClient,
  updateContactStatus,
  updateProject,
} from "@/services/adminApi";
import { fetchBlogs, fetchClients, fetchProjects } from "@/services/contentApi";
import { clearAdminToken, isAdminLoggedIn } from "@/utils/adminAuth";

const TABS = [
  { id: "blogs", label: "Blogs" },
  { id: "projects", label: "Projects" },
  { id: "clients", label: "Clients" },
  { id: "contacts", label: "Contacts" },
  { id: "newsletters", label: "Newsletter" },
];

const INITIAL_BLOG = {
  title: "",
  slug: "",
  excerpt: "",
  category: "",
  coverImage: "",
  readTime: 5,
  publishedAt: "",
  featured: false,
};

const INITIAL_PROJECT = {
  title: "",
  category: "",
  desc: "",
  image: "",
};

const INITIAL_CLIENT = {
  name: "",
  logo: "",
};

function toDateInput(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getCategoryName(category) {
  if (!category) return "";
  if (typeof category === "string") return category;
  return category.name || "";
}

function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("blogs");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [stats, setStats] = useState({
    contactCount: 0,
    unresolvedCount: 0,
    newsletterCount: 0,
  });

  const [blogForm, setBlogForm] = useState(INITIAL_BLOG);
  const [projectForm, setProjectForm] = useState(INITIAL_PROJECT);
  const [clientForm, setClientForm] = useState(INITIAL_CLIENT);
  const [editBlogId, setEditBlogId] = useState("");
  const [editProjectId, setEditProjectId] = useState("");
  const [editClientId, setEditClientId] = useState("");

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    loadAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPublishedContent = useMemo(
    () => blogs.length + projects.length + clients.length,
    [blogs.length, projects.length, clients.length]
  );

  async function loadAllData() {
    setLoading(true);
    setError("");
    try {
      const [
        fetchedBlogs,
        fetchedProjects,
        fetchedClients,
        fetchedStats,
        fetchedContacts,
        fetchedNewsletters,
      ] = await Promise.all([
        fetchBlogs(),
        fetchProjects(),
        fetchClients(),
        fetchAdminStats(),
        fetchAdminContacts(),
        fetchAdminNewsletters(),
      ]);

      setBlogs(fetchedBlogs);
      setProjects(fetchedProjects);
      setClients(fetchedClients);
      setStats(fetchedStats);
      setContacts(fetchedContacts);
      setNewsletters(fetchedNewsletters);
    } catch (err) {
      if (String(err.message || "").toLowerCase().includes("token")) {
        clearAdminToken();
        navigate("/admin/login", { replace: true });
        return;
      }
      setError(err.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  }

  function handleError(err) {
    setError(err.message || "Request failed");
  }

  async function submitBlog(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...blogForm,
        readTime: Number(blogForm.readTime),
        publishedAt: blogForm.publishedAt || undefined,
      };

      if (editBlogId) {
        await updateBlog(editBlogId, payload);
      } else {
        await createBlog(payload);
      }

      setBlogForm(INITIAL_BLOG);
      setEditBlogId("");
      await loadAllData();
    } catch (err) {
      handleError(err);
    } finally {
      setSaving(false);
    }
  }

  async function submitProject(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editProjectId) {
        await updateProject(editProjectId, projectForm);
      } else {
        await createProject(projectForm);
      }
      setProjectForm(INITIAL_PROJECT);
      setEditProjectId("");
      await loadAllData();
    } catch (err) {
      handleError(err);
    } finally {
      setSaving(false);
    }
  }

  async function submitClient(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editClientId) {
        await updateClient(editClientId, clientForm);
      } else {
        await createClient(clientForm);
      }
      setClientForm(INITIAL_CLIENT);
      setEditClientId("");
      await loadAllData();
    } catch (err) {
      handleError(err);
    } finally {
      setSaving(false);
    }
  }

  async function onDeleteBlog(id) {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await deleteBlog(id);
      await loadAllData();
    } catch (err) {
      handleError(err);
    }
  }

  async function onDeleteProject(id) {
    if (!window.confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      await loadAllData();
    } catch (err) {
      handleError(err);
    }
  }

  async function onDeleteClient(id) {
    if (!window.confirm("Delete this client?")) return;
    try {
      await deleteClient(id);
      await loadAllData();
    } catch (err) {
      handleError(err);
    }
  }

  function onEditBlog(item) {
    setActiveTab("blogs");
    setEditBlogId(item.id);
    setBlogForm({
      title: item.title || "",
      slug: item.slug || "",
      excerpt: item.excerpt || "",
      category: getCategoryName(item.category),
      coverImage: item.coverImage || "",
      readTime: item.readTime || 5,
      publishedAt: toDateInput(item.publishedAt),
      featured: Boolean(item.featured),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onEditProject(item) {
    setActiveTab("projects");
    setEditProjectId(item.id);
    setProjectForm({
      title: item.title || "",
      category: item.category || "",
      desc: item.desc || "",
      image: item.image || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onEditClient(item) {
    setActiveTab("clients");
    setEditClientId(item.id);
    setClientForm({
      name: item.name || "",
      logo: item.logo || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onToggleContactStatus(contact) {
    const nextStatus = contact.status === "resolved" ? "new" : "resolved";
    try {
      await updateContactStatus(contact.id, nextStatus);
      await loadAllData();
    } catch (err) {
      handleError(err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-300">Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-blue-400 font-bold mb-2">
              NexusBoost Admin
            </p>
            <h1 className="text-3xl font-black">Content Control Panel</h1>
          </div>

          <button
            onClick={handleLogout}
            className="bg-slate-800 border border-slate-600 hover:border-red-400 hover:text-red-300 rounded-xl px-5 py-2 text-sm font-semibold"
          >
            Logout
          </button>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-300">
            {error}
          </div>
        ) : null}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Contact Leads" value={stats.contactCount} />
          <StatCard label="Unresolved Leads" value={stats.unresolvedCount} />
          <StatCard label="Newsletter Users" value={stats.newsletterCount} />
          <StatCard label="Total Content" value={totalPublishedContent} />
        </div>

        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold border ${
                activeTab === tab.id
                  ? "bg-blue-600 border-blue-500"
                  : "bg-slate-900 border-slate-700 hover:border-slate-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "blogs" ? (
          <section className="grid lg:grid-cols-2 gap-6">
            <PanelCard title={editBlogId ? "Edit Blog" : "Create Blog"}>
              <form onSubmit={submitBlog} className="space-y-3">
                <TextInput
                  label="Title"
                  value={blogForm.title}
                  onChange={(value) => setBlogForm((prev) => ({ ...prev, title: value }))}
                />
                <TextInput
                  label="Slug (optional)"
                  value={blogForm.slug}
                  onChange={(value) => setBlogForm((prev) => ({ ...prev, slug: value }))}
                  required={false}
                />
                <TextInput
                  label="Category"
                  value={blogForm.category}
                  onChange={(value) => setBlogForm((prev) => ({ ...prev, category: value }))}
                />
                <TextInput
                  label="Cover Image URL"
                  value={blogForm.coverImage}
                  onChange={(value) => setBlogForm((prev) => ({ ...prev, coverImage: value }))}
                />
                <TextArea
                  label="Excerpt"
                  value={blogForm.excerpt}
                  onChange={(value) => setBlogForm((prev) => ({ ...prev, excerpt: value }))}
                />
                <div className="grid grid-cols-2 gap-3">
                  <TextInput
                    label="Read Time (min)"
                    type="number"
                    min="1"
                    value={blogForm.readTime}
                    onChange={(value) => setBlogForm((prev) => ({ ...prev, readTime: value }))}
                  />
                  <TextInput
                    label="Published Date"
                    type="date"
                    value={blogForm.publishedAt}
                    onChange={(value) => setBlogForm((prev) => ({ ...prev, publishedAt: value }))}
                    required={false}
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={blogForm.featured}
                    onChange={(e) =>
                      setBlogForm((prev) => ({ ...prev, featured: e.target.checked }))
                    }
                  />
                  Featured blog
                </label>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold"
                  >
                    {saving ? "Saving..." : editBlogId ? "Update Blog" : "Create Blog"}
                  </button>
                  {editBlogId ? (
                    <button
                      type="button"
                      onClick={() => {
                        setEditBlogId("");
                        setBlogForm(INITIAL_BLOG);
                      }}
                      className="rounded-lg bg-slate-700 hover:bg-slate-600 px-4 py-2 text-sm font-semibold"
                    >
                      Cancel Edit
                    </button>
                  ) : null}
                </div>
              </form>
            </PanelCard>

            <PanelCard title="Blog List">
              <div className="space-y-3 max-h-[640px] overflow-auto pr-1">
                {blogs.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-700 p-4">
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-slate-400 text-sm">{getCategoryName(item.category)}</p>
                    <p className="text-slate-500 text-xs mt-1">{formatDate(item.publishedAt)}</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => onEditBlog(item)}
                        className="text-xs rounded bg-slate-700 px-3 py-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteBlog(item.id)}
                        className="text-xs rounded bg-red-700/80 px-3 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {!blogs.length ? <p className="text-slate-400 text-sm">No blogs found.</p> : null}
              </div>
            </PanelCard>
          </section>
        ) : null}

        {activeTab === "projects" ? (
          <section className="grid lg:grid-cols-2 gap-6">
            <PanelCard title={editProjectId ? "Edit Project" : "Create Project"}>
              <form onSubmit={submitProject} className="space-y-3">
                <TextInput
                  label="Title"
                  value={projectForm.title}
                  onChange={(value) => setProjectForm((prev) => ({ ...prev, title: value }))}
                />
                <TextInput
                  label="Category"
                  value={projectForm.category}
                  onChange={(value) => setProjectForm((prev) => ({ ...prev, category: value }))}
                />
                <TextInput
                  label="Image URL"
                  value={projectForm.image}
                  onChange={(value) => setProjectForm((prev) => ({ ...prev, image: value }))}
                />
                <TextArea
                  label="Description"
                  value={projectForm.desc}
                  onChange={(value) => setProjectForm((prev) => ({ ...prev, desc: value }))}
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold"
                  >
                    {saving ? "Saving..." : editProjectId ? "Update Project" : "Create Project"}
                  </button>
                  {editProjectId ? (
                    <button
                      type="button"
                      onClick={() => {
                        setEditProjectId("");
                        setProjectForm(INITIAL_PROJECT);
                      }}
                      className="rounded-lg bg-slate-700 hover:bg-slate-600 px-4 py-2 text-sm font-semibold"
                    >
                      Cancel Edit
                    </button>
                  ) : null}
                </div>
              </form>
            </PanelCard>

            <PanelCard title="Project List">
              <div className="space-y-3 max-h-[640px] overflow-auto pr-1">
                {projects.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-700 p-4">
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-slate-400 text-sm">{item.category}</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => onEditProject(item)}
                        className="text-xs rounded bg-slate-700 px-3 py-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteProject(item.id)}
                        className="text-xs rounded bg-red-700/80 px-3 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {!projects.length ? (
                  <p className="text-slate-400 text-sm">No projects found.</p>
                ) : null}
              </div>
            </PanelCard>
          </section>
        ) : null}

        {activeTab === "clients" ? (
          <section className="grid lg:grid-cols-2 gap-6">
            <PanelCard title={editClientId ? "Edit Client" : "Create Client"}>
              <form onSubmit={submitClient} className="space-y-3">
                <TextInput
                  label="Client Name"
                  value={clientForm.name}
                  onChange={(value) => setClientForm((prev) => ({ ...prev, name: value }))}
                />
                <TextInput
                  label="Logo URL"
                  value={clientForm.logo}
                  onChange={(value) => setClientForm((prev) => ({ ...prev, logo: value }))}
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold"
                  >
                    {saving ? "Saving..." : editClientId ? "Update Client" : "Create Client"}
                  </button>
                  {editClientId ? (
                    <button
                      type="button"
                      onClick={() => {
                        setEditClientId("");
                        setClientForm(INITIAL_CLIENT);
                      }}
                      className="rounded-lg bg-slate-700 hover:bg-slate-600 px-4 py-2 text-sm font-semibold"
                    >
                      Cancel Edit
                    </button>
                  ) : null}
                </div>
              </form>
            </PanelCard>

            <PanelCard title="Client List">
              <div className="space-y-3 max-h-[640px] overflow-auto pr-1">
                {clients.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-700 p-4">
                    <p className="text-white font-semibold">{item.name}</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => onEditClient(item)}
                        className="text-xs rounded bg-slate-700 px-3 py-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteClient(item.id)}
                        className="text-xs rounded bg-red-700/80 px-3 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {!clients.length ? <p className="text-slate-400 text-sm">No clients found.</p> : null}
              </div>
            </PanelCard>
          </section>
        ) : null}

        {activeTab === "contacts" ? (
          <PanelCard title="Contact Leads">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-700">
                    <th className="py-3 pr-3">Name</th>
                    <th className="py-3 pr-3">Email</th>
                    <th className="py-3 pr-3">Interest</th>
                    <th className="py-3 pr-3">Status</th>
                    <th className="py-3 pr-3">Date</th>
                    <th className="py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((item) => (
                    <tr key={item.id} className="border-b border-slate-800 align-top">
                      <td className="py-3 pr-3">{item.name}</td>
                      <td className="py-3 pr-3">{item.email}</td>
                      <td className="py-3 pr-3">{item.interest}</td>
                      <td className="py-3 pr-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            item.status === "resolved"
                              ? "bg-emerald-700/50 text-emerald-300"
                              : "bg-yellow-700/40 text-yellow-300"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 pr-3">{formatDate(item.createdAt)}</td>
                      <td className="py-3">
                        <button
                          onClick={() => onToggleContactStatus(item)}
                          className="text-xs rounded bg-slate-700 px-3 py-1"
                        >
                          Mark {item.status === "resolved" ? "New" : "Resolved"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!contacts.length ? <p className="text-slate-400 text-sm">No contacts found.</p> : null}
            </div>
          </PanelCard>
        ) : null}

        {activeTab === "newsletters" ? (
          <PanelCard title="Newsletter Subscribers">
            <div className="space-y-2">
              {newsletters.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-700 px-4 py-3 flex items-center justify-between"
                >
                  <p className="text-sm">{item.email}</p>
                  <p className="text-xs text-slate-400">{formatDate(item.createdAt)}</p>
                </div>
              ))}
              {!newsletters.length ? (
                <p className="text-slate-400 text-sm">No subscribers found.</p>
              ) : null}
            </div>
          </PanelCard>
        ) : null}
      </div>
    </div>
  );
}

function PanelCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-5">
      <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">{label}</p>
      <p className="text-2xl font-black">{value ?? 0}</p>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  required = true,
  type = "text",
  ...rest
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-widest text-slate-300 font-semibold">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 outline-none focus:border-blue-500"
        {...rest}
      />
    </div>
  );
}

function TextArea({ label, value, onChange, required = true }) {
  return (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-widest text-slate-300 font-semibold">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={4}
        className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 outline-none focus:border-blue-500 resize-none"
      />
    </div>
  );
}

export default AdminPanel;
