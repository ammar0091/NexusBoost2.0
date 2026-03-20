import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LogOut, LayoutDashboard, FileText, Briefcase, 
  Users, Mail, Newspaper, Edit2, Trash2, Plus, ArrowUpRight, CheckCircle2, Clock
} from "lucide-react"; 
import { Toaster, toast } from "sonner";

import {
  createBlog, updateBlog, deleteBlog,
  createProject, updateProject, deleteProject,
  createClient, updateClient, deleteClient,
  createTeamMember, updateTeamMember, deleteTeamMember,
  fetchAdminContacts, fetchAdminNewsletters, fetchAdminStats,
  updateContactStatus, deleteContact, deleteSubscriber,
} from "@/services/adminApi";
import { fetchBlogs, fetchClients, fetchProjects, fetchTeams } from "@/services/contentApi";
import { clearAdminToken, isAdminLoggedIn } from "@/utils/adminAuth";
import Seo from "@/components/common/Seo";

// ==========================================
// 1. CONSTANTS & UTILS
// ==========================================
const INITIAL_BLOG = { title: "", slug: "", excerpt: "", content: "", category: "", coverImage: "", readTime: 5, seoTitle: "", seoDescription: "", publishedAt: "", featured: false };
const INITIAL_PROJECT = { title: "", slug: "", category: "", desc: "", content: "", seoTitle: "", seoDescription: "", image: "" };
const INITIAL_CLIENT = { name: "", logo: "", industry: "", summary: "", website: "", image: "" };
const INITIAL_TEAM = { name: "", role: "", image: "", order: 0 };

function toDateInput(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : new Intl.DateTimeFormat("en-IN", { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function getCategoryName(category) {
  return typeof category === "string" ? category : category?.name || "Uncategorized";
}

// ==========================================
// 2. ULTRA-MODERN UI COMPONENTS
// ==========================================
const Input = ({ label, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="text-[13px] font-medium text-neutral-400">{label}</label>}
    <input className="w-full bg-[#0A0A0A] border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 outline-none transition-all" {...props} />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="text-[13px] font-medium text-neutral-400">{label}</label>}
    <textarea rows={3} className="w-full bg-[#0A0A0A] border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 outline-none transition-all resize-none" {...props} />
  </div>
);

const Button = ({ children, variant = "primary", isLoading, className="", ...props }) => {
  const variants = {
    primary: "bg-white text-black hover:bg-neutral-200 font-medium shadow-sm",
    secondary: "bg-black border border-neutral-800 text-neutral-200 hover:bg-[#0A0A0A]",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    ghost: "bg-transparent text-neutral-400 hover:text-white hover:bg-black"
  };
  return (
    <button disabled={isLoading} className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-[13px] rounded-md transition-all disabled:opacity-50 ${variants[variant]} ${className}`} {...props}>
      {isLoading ? <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : children}
    </button>
  );
};

// ==========================================
// 3. MAIN DASHBOARD LAYOUT
// ==========================================
export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ blogs: [], projects: [], clients: [], team: [], contacts: [], newsletters: [], stats: {} });

  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [blogs, projects, clients, team, stats, contacts, newsletters] = await Promise.all([
        fetchBlogs({ enableFallback: false }),
        fetchProjects({ enableFallback: false }),
        fetchClients({ enableFallback: false }),
        fetchTeams({ enableFallback: false }),
        fetchAdminStats(),
        fetchAdminContacts(),
        fetchAdminNewsletters(),
      ]);
      setData({ blogs, projects, clients, team, stats, contacts, newsletters });
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        clearAdminToken();
        navigate("/admin/login", { replace: true });
      } else {
        toast.error(err.message || "Failed to sync data");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!isAdminLoggedIn()) navigate("/admin/login", { replace: true });
    else loadAllData();
  }, [navigate, loadAllData]);

  const handleLogout = () => {
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#0A0A0A] flex items-center justify-center">
        <Seo title="Admin Panel" noIndex />
        <div className="flex items-center gap-3 text-neutral-400">
          <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium tracking-wide">Loading Workspace...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "blogs", label: "Content Blogs", icon: FileText },
    { id: "projects", label: "Portfolio", icon: Briefcase },
    { id: "team", label: "Team", icon: Users },
    { id: "clients", label: "Partners", icon: ArrowUpRight },
    { id: "contacts", label: "Inbox Leads", icon: Mail },
    { id: "newsletters", label: "Subscribers", icon: Newspaper },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0A0A0A] text-white font-sans overflow-hidden selection:bg-[#0A0A0A]">
      <Seo title="Admin Panel" noIndex />
      <Toaster theme="dark" position="bottom-right" className="bg-[#0A0A0A]! border-neutral-800!" />

      {/* FIXED SIDEBAR */}
      <aside className="w-64 shrink-0 border-r border-neutral-800/60 bg-black flex flex-col h-full">
        <div className="h-16 flex items-center px-6 border-b border-neutral-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
              <span className="text-black font-bold text-sm">N</span>
            </div>
            <span className="font-semibold tracking-tight text-sm">Nexus Admin</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-0.5">
          <p className="px-3 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Menu</p>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-all ${
                  isActive ? "bg-black text-white" : "text-neutral-400 hover:text-neutral-200 hover:bg-[#0A0A0A]/50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-neutral-500"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-800/60">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium text-neutral-400 hover:text-white hover:bg-black transition-all">
            <LogOut className="w-4 h-4 text-neutral-500" /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#0A0A0A]">
        {/* Top Header */}
        <header className="h-16 shrink-0 flex items-center justify-between px-8 border-b border-neutral-800/60 bg-[#0A0A0A]/80 backdrop-blur-md z-10">
          <h1 className="text-lg font-semibold tracking-tight capitalize text-neutral-100">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-[12px] font-medium text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> System Online
            </span>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === "overview" && <OverviewTab data={data} />}
            {activeTab === "blogs" && <BlogTab data={data.blogs} refetch={loadAllData} />}
            {activeTab === "projects" && <ProjectTab data={data.projects} refetch={loadAllData} />}
            {activeTab === "team" && <TeamTab data={data.team} refetch={loadAllData} />}
            {activeTab === "clients" && <ClientTab data={data.clients} refetch={loadAllData} />}
            {activeTab === "contacts" && <ContactTab data={data.contacts} refetch={loadAllData} />}
            {activeTab === "newsletters" && <NewsletterTab data={data.newsletters} refetch={loadAllData} />}
          </div>
        </div>
      </main>
    </div>
  );
}

// ==========================================
// 4. TAB COMPONENTS
// ==========================================

// -- OVERVIEW TAB (New sleek dashboard intro) --
function OverviewTab({ data }) {
  const totalContent = data.blogs.length + data.projects.length + data.clients.length;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Inbox Leads" value={data.stats.contactCount} icon={Mail} />
        <StatCard label="Pending Replies" value={data.stats.unresolvedCount} icon={Clock} highlight />
        <StatCard label="Newsletter Users" value={data.stats.newsletterCount} icon={Users} />
        <StatCard label="Live Content" value={totalContent} icon={CheckCircle2} />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="border border-neutral-800 bg-black p-6 rounded-xl">
          <h3 className="text-sm font-medium text-neutral-400 mb-4">Recent Blogs</h3>
          <div className="space-y-3">
            {data.blogs.slice(0, 3).map(b => (
              <div key={b.id} className="flex justify-between text-sm pb-3 border-b border-neutral-800/50 last:border-0 last:pb-0">
                <span className="text-neutral-200">{b.title}</span>
                <span className="text-neutral-500 text-xs">{formatDate(b.publishedAt)}</span>
              </div>
            ))}
            {!data.blogs.length && <p className="text-neutral-600 text-sm">No recent activity.</p>}
          </div>
        </div>

        <div className="border border-neutral-800 bg-black p-6 rounded-xl">
          <h3 className="text-sm font-medium text-neutral-400 mb-4">Latest Inbox</h3>
          <div className="space-y-3">
            {data.contacts.slice(0, 3).map(c => (
              <div key={c.id} className="flex justify-between items-center text-sm pb-3 border-b border-neutral-800/50 last:border-0 last:pb-0">
                <span className="text-neutral-200 truncate pr-4">{c.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${c.status === 'resolved' ? 'border-neutral-700 text-neutral-500' : 'border-amber-500/30 text-amber-500 bg-amber-500/10'}`}>
                  {c.status}
                </span>
              </div>
            ))}
            {!data.contacts.length && <p className="text-neutral-600 text-sm">Inbox is empty.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, highlight }) {
  const IconComponent = icon;
  return (
    <div className="group relative p-5 rounded-xl border border-neutral-800 bg-black overflow-hidden">
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center justify-between text-neutral-400">
          <span className="text-[13px] font-medium">{label}</span>
          <IconComponent className={`w-4 h-4 ${highlight ? 'text-amber-500' : 'text-neutral-600 group-hover:text-white transition-colors'}`} />
        </div>
        <span className="text-3xl font-semibold tracking-tight text-white">{value || 0}</span>
      </div>
      {/* Subtle bottom gradient glow */}
      <div className="absolute -bottom-px inset-x-0 h-px bg-linear-to-r from-transparent via-neutral-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

// -- BLOGS TAB --
function BlogTab({ data, refetch }) {
  const [form, setForm] = useState(INITIAL_BLOG);
  const [editId, setEditId] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = { ...form, readTime: Number(form.readTime), publishedAt: form.publishedAt || undefined };
      if (editId) await updateBlog(editId, payload); else await createBlog(payload);
      toast.success(editId ? "Post updated" : "Post published");
      setForm(INITIAL_BLOG); setEditId(""); refetch();
    } catch (err) { toast.error(err.message || "Action failed"); } finally { setSaving(false); }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ title: item.title || "", slug: item.slug || "", excerpt: item.excerpt || "", content: item.content || "", category: getCategoryName(item.category), coverImage: item.coverImage || "", readTime: item.readTime || 5, seoTitle: item.seoTitle || "", seoDescription: item.seoDescription || "", publishedAt: toDateInput(item.publishedAt), featured: Boolean(item.featured) });
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      {/* Form Panel - 4 columns */}
      <div className="lg:col-span-4 sticky top-8 border border-neutral-800 bg-black rounded-xl p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold">{editId ? "Edit Post" : "Draft New Post"}</h2>
          {editId && <button onClick={() => {setEditId(""); setForm(INITIAL_BLOG)}} className="text-[11px] text-neutral-500 hover:text-white">Clear</button>}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          <Input label="Slug" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="auto-generated-from-title" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
            <Input label="Read Time" type="number" min="1" value={form.readTime} onChange={e => setForm({...form, readTime: e.target.value})} />
          </div>
          <Input label="Cover Image" value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})} />
          <Textarea label="Excerpt" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} required />
          <Textarea label="Article Content" value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Write the full article content here..." />
          <Input label="SEO Title" value={form.seoTitle} onChange={e => setForm({...form, seoTitle: e.target.value})} />
          <Textarea label="SEO Description" value={form.seoDescription} onChange={e => setForm({...form, seoDescription: e.target.value})} />
          <Input label="Date" type="date" value={form.publishedAt} onChange={e => setForm({...form, publishedAt: e.target.value})} />
          <label className="flex items-center gap-2 text-[13px] text-neutral-400 hover:text-neutral-200 cursor-pointer w-max">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="accent-white w-3.5 h-3.5" /> Featured Post
          </label>
          <Button type="submit" isLoading={saving} className="w-full mt-2">{editId ? "Update Post" : "Publish Post"}</Button>
        </form>
      </div>

      {/* List Panel - 8 columns */}
      <div className="lg:col-span-8 flex flex-col gap-2">
        {data.map(item => (
          <div key={item.id} className="group flex items-center justify-between p-4 rounded-lg border border-transparent hover:border-neutral-800 hover:bg-black transition-all">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-200">{item.title}</span>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-black text-neutral-400">{getCategoryName(item.category)}</span>
                <span className="text-[11px] text-neutral-600">{formatDate(item.publishedAt)}</span>
                {item.featured && <span className="text-[10px] text-amber-500 border border-amber-500/20 px-1.5 rounded">Featured</span>}
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" className="p-2!" onClick={() => handleEdit(item)}><Edit2 className="w-4 h-4 text-neutral-400"/></Button>
              <Button variant="ghost" className="p-2! hover:text-red-500!" onClick={async () => { if(window.confirm("Delete?")) { await deleteBlog(item.id); refetch(); } }}><Trash2 className="w-4 h-4"/></Button>
            </div>
          </div>
        ))}
        {!data.length && <div className="py-20 text-center text-sm text-neutral-600 border border-dashed border-neutral-800 rounded-xl">No content published yet.</div>}
      </div>
    </div>
  );
}

// -- PROJECTS TAB --
function ProjectTab({ data, refetch }) {
  const [form, setForm] = useState(INITIAL_PROJECT);
  const [editId, setEditId] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) await updateProject(editId, form);
      else await createProject(form);
      toast.success(editId ? "Project updated" : "Project created");
      setForm(INITIAL_PROJECT);
      setEditId("");
      refetch();
    } catch (err) {
      toast.error(err.message || "Project save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title || "",
      slug: item.slug || "",
      category: item.category || "",
      desc: item.desc || "",
      content: item.content || "",
      seoTitle: item.seoTitle || "",
      seoDescription: item.seoDescription || "",
      image: item.image || "",
    });
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 sticky top-8 border border-neutral-800 bg-black rounded-xl p-5 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold">{editId ? "Edit Project" : "New Project"}</h2>
          {editId ? <button onClick={() => { setEditId(""); setForm(INITIAL_PROJECT); }} className="text-[11px] text-neutral-500 hover:text-white">Clear</button> : null}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <Input label="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated-from-title" />
          <Input label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
          <Input label="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} required />
          <Textarea label="Description" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} required />
          <Textarea label="Project Story" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Add the full project breakdown for the detail page..." />
          <Input label="SEO Title" value={form.seoTitle} onChange={e => setForm({ ...form, seoTitle: e.target.value })} />
          <Textarea label="SEO Description" value={form.seoDescription} onChange={e => setForm({ ...form, seoDescription: e.target.value })} />
          <div className="flex gap-2 pt-2">
            <Button type="submit" isLoading={saving} className="flex-1">{editId ? "Save Project" : "Add Project"}</Button>
            {editId && <Button type="button" variant="secondary" onClick={() => { setEditId(""); setForm(INITIAL_PROJECT); }}>Cancel</Button>}
          </div>
        </form>
      </div>
      <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
        {data.map(item => (
          <div key={item.id} className="group relative rounded-xl border border-neutral-800 bg-black overflow-hidden hover:border-neutral-700 transition-colors">
            <div className="absolute top-3 right-3 z-10 flex gap-1 rounded-md border border-neutral-800 bg-[#0A0A0A]/50 backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
              <button onClick={() => handleEdit(item)} className="p-1.5 text-neutral-400 hover:text-white"><Edit2 className="w-3.5 h-3.5" /></button>
              <button onClick={async () => { if (window.confirm("Delete project?")) { await deleteProject(item.id); refetch(); } }} className="p-1.5 text-red-500/70 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
            <div className="h-44 w-full overflow-hidden border-b border-neutral-800 bg-[#0A0A0A]">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="p-4">
              <h3 className="text-base font-medium text-neutral-100">{item.title}</h3>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-neutral-500">{item.category}</p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{item.desc}</p>
            </div>
          </div>
        ))}
        {!data.length && <div className="col-span-2 py-20 text-center text-sm text-neutral-600 border border-dashed border-neutral-800 rounded-xl">No projects found.</div>}
      </div>
    </div>
  );
}

// -- TEAM TAB --
function TeamTab({ data, refetch }) {
  const [form, setForm] = useState(INITIAL_TEAM);
  const [editId, setEditId] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        order: Number(form.order || 0),
      };
      if (editId) await updateTeamMember(editId, payload);
      else await createTeamMember(payload);
      toast.success(editId ? "Team member updated" : "Team member added");
      setForm(INITIAL_TEAM);
      setEditId("");
      refetch();
    } catch (err) {
      toast.error(err.message || "Action failed");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      name: item.name || "",
      role: item.role || "",
      image: item.image || "",
      order: item.order ?? 0,
    });
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 sticky top-8 border border-neutral-800 bg-black rounded-xl p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold">{editId ? "Edit Team Member" : "Add Team Member"}</h2>
          {editId && (
            <button
              onClick={() => {
                setEditId("");
                setForm(INITIAL_TEAM);
              }}
              className="text-[11px] text-neutral-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          <Input label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
          <Input
            label="Order"
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: e.target.value })}
          />
          <Button type="submit" isLoading={saving} className="w-full mt-2">
            {editId ? "Update Member" : "Add Member"}
          </Button>
        </form>
      </div>

      <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item.id} className="group relative rounded-xl border border-neutral-800 bg-black overflow-hidden hover:border-neutral-700 transition-colors">
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0A0A0A]/50 backdrop-blur-md rounded-md border border-neutral-800">
              <button onClick={() => handleEdit(item)} className="p-1.5 hover:text-white text-neutral-400">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={async () => {
                  if (window.confirm("Delete team member?")) {
                    await deleteTeamMember(item.id);
                    refetch();
                  }
                }}
                className="p-1.5 text-red-500/70 hover:text-red-500"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="h-56 w-full overflow-hidden">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="p-4">
              <h3 className="text-base font-medium text-neutral-100">{item.name}</h3>
              <p className="text-[12px] text-neutral-500">{item.role}</p>
              <p className="mt-2 text-[10px] text-neutral-600">Order: {item.order ?? 0}</p>
            </div>
          </div>
        ))}
        {!data.length && (
          <div className="col-span-2 py-20 text-center text-sm text-neutral-600 border border-dashed border-neutral-800 rounded-xl">
            No team members found.
          </div>
        )}
      </div>
    </div>
  );
}

// -- CLIENTS TAB --
function ClientTab({ data, refetch }) {
  const [form, setForm] = useState(INITIAL_CLIENT);
  const [editId, setEditId] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) await updateClient(editId, form);
      else await createClient(form);
      toast.success(editId ? "Partner updated" : "Partner added");
      setForm(INITIAL_CLIENT);
      setEditId("");
      refetch();
    } catch (err) {
      toast.error(err.message || "Action failed");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      name: item.name || "",
      logo: item.logo || "",
      industry: item.industry || "",
      summary: item.summary || "",
      website: item.website || "",
      image: item.image || "",
    });
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 sticky top-8 border border-neutral-800 bg-black rounded-xl p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold">{editId ? "Edit Partner" : "Add Partner"}</h2>
          {editId && (
            <button onClick={() => { setEditId(""); setForm(INITIAL_CLIENT); }} className="text-[11px] text-neutral-500 hover:text-white">
              Clear
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Client Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <Input label="Logo URL" value={form.logo} onChange={e => setForm({ ...form, logo: e.target.value })} />
          <Input label="Hero Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          <Input label="Industry" value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} />
          <Input label="Website" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} />
          <Textarea label="Summary" value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} />
          <div className="flex gap-2 pt-2">
            <Button type="submit" isLoading={saving} className="flex-1">{editId ? "Save" : "Add"}</Button>
            {editId && <Button type="button" variant="secondary" onClick={() => { setEditId(""); setForm(INITIAL_CLIENT); }}>Cancel</Button>}
          </div>
        </form>
      </div>

      <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
        {data.map(item => (
          <div key={item.id} className="group relative rounded-xl border border-neutral-800 bg-black overflow-hidden hover:border-neutral-700 transition-colors">
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0A0A0A]/50 backdrop-blur-md rounded-md border border-neutral-800 z-10">
              <button onClick={() => handleEdit(item)} className="p-1.5 hover:text-white text-neutral-400"><Edit2 className="w-3.5 h-3.5" /></button>
              <button onClick={async () => { if (window.confirm("Delete?")) { await deleteClient(item.id); refetch(); } }} className="p-1.5 text-red-500/70 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
            <div className="h-40 w-full overflow-hidden border-b border-neutral-800 bg-[#0A0A0A]">
              {item.image ? (
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
              ) : item.logo ? (
                <div className="flex h-full items-center justify-center p-8"><img src={item.logo} alt={item.name} className="max-h-16 object-contain" loading="lazy" /></div>
              ) : (
                <div className="flex h-full items-center justify-center"><Users className="w-6 h-6 text-neutral-600" /></div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-medium text-neutral-100">{item.name}</h3>
                  <p className="text-[11px] uppercase tracking-wider text-neutral-500">{item.industry || "Client"}</p>
                </div>
                {item.website ? <a href={item.website} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white"><ArrowUpRight className="w-4 h-4" /></a> : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{item.summary || "No summary added yet."}</p>
            </div>
          </div>
        ))}
        {!data.length && <div className="col-span-2 py-20 text-center text-sm text-neutral-600 border border-dashed border-neutral-800 rounded-xl">No partners found.</div>}
      </div>
    </div>
  );
}

// -- CONTACTS TAB --
function ContactTab({ data, refetch }) {
  return (
    <div className="border border-neutral-800 bg-black rounded-xl overflow-hidden">
      <table className="w-full text-left text-[13px]">
        <thead className="bg-[#0A0A0A] border-b border-neutral-800">
          <tr className="text-neutral-500 font-medium">
            <th className="py-3 px-5 font-medium">Prospect</th>
            <th className="py-3 px-5 font-medium">Message</th>
            <th className="py-3 px-5 font-medium">Interest</th>
            <th className="py-3 px-5 font-medium">Date</th>
            <th className="py-3 px-5 font-medium">Status</th>
            <th className="py-3 px-5 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/50">
          {data.map(item => (
            <tr key={item.id} className="hover:bg-[#0A0A0A]/30 transition-colors group">
              <td className="py-3 px-5">
                <div className="flex flex-col">
                  <span className="font-medium text-neutral-200">{item.name}</span>
                  <span className="text-[11px] text-neutral-500">{item.email}</span>
                </div>
              </td>
              <td className="py-3 px-5 text-neutral-400 max-w-xs">
                <span className="truncate" title={item.message}>{item.message}</span>
              </td>
              <td className="py-3 px-5 text-neutral-400">{item.interest}</td>
              <td className="py-3 px-5 text-neutral-500">{formatDate(item.createdAt)}</td>
              <td className="py-3 px-5">
                <button 
                  onClick={async () => { await updateContactStatus(item.id, item.status === 'resolved' ? 'new' : 'resolved'); refetch(); }}
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
                    item.status === "resolved" ? "bg-transparent border-neutral-800 text-neutral-500 hover:border-neutral-600" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20"
                  }`}
                >
                  {item.status === 'resolved' ? 'Resolved' : 'Mark Done'}
                </button>
              </td>
              <td className="py-3 px-5">
                <button
                  onClick={async () => {
                    if (window.confirm("Delete this inquiry?")) {
                      await deleteContact(item.id);
                      refetch();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </td>
            </tr>
          ))}
          {!data.length && <tr><td colSpan="6" className="py-20 text-center text-neutral-600">No leads found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

// -- NEWSLETTERS TAB --
function NewsletterTab({ data, refetch }) {
  return (
    <div className="max-w-2xl border border-neutral-800 bg-black rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-neutral-800 flex justify-between items-center bg-[#0A0A0A]">
        <span className="text-sm font-medium">Subscriber List</span>
        <span className="text-[11px] bg-black text-neutral-400 px-2 py-0.5 rounded">{data.length} Total</span>
      </div>
      <div className="divide-y divide-neutral-800/50">
        {data.map(item => (
          <div key={item.id} className="flex items-center justify-between px-5 py-3 hover:bg-[#0A0A0A]/30 transition-colors">
            <div className="flex flex-col">
              <span className="text-[13px] text-neutral-300 font-medium">{item.email}</span>
              <span className="text-[11px] text-neutral-500">{formatDate(item.createdAt)}</span>
            </div>
            <button
              onClick={async () => {
                if (window.confirm("Remove subscriber?")) {
                  await deleteSubscriber(item.id);
                  refetch();
                }
              }}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
        ))}
        {!data.length && <div className="py-16 text-center text-[13px] text-neutral-600">No subscribers yet.</div>}
      </div>
    </div>
  );
}









