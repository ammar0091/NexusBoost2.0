import { useCallback, useEffect, useMemo, useState } from 'react';
import { Edit2, Plus, RefreshCcw, Sparkles, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createProject, deleteProject, updateProject } from '@/services/adminApi';
import { fetchProjects } from '@/services/contentApi';
import {
  AdminBadge,
  AdminFieldGrid,
  AdminHero,
  AdminList,
  AdminSection,
  AdminSubsection,
  Button,
  EmptyState,
  INITIAL_PROJECT,
  Input,
  Textarea,
} from '@/components/admin/AdminUI';
import { handleAdminPageError } from '@/components/admin/adminHelpers';

const getSlugPreview = (value, fallback) => value || fallback.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const AdminProjects = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(INITIAL_PROJECT);
  const [editId, setEditId] = useState('');
  const [saving, setSaving] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const projects = await fetchProjects({ enableFallback: false });
      setItems(projects);
    } catch (err) {
      handleAdminPageError(err, navigate, toast);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    if (!loading && items.length === 0) {
      setIsComposerOpen(true);
    }
  }, [items.length, loading]);

  const clearEditor = useCallback((shouldCloseComposer = true) => {
    setForm(INITIAL_PROJECT);
    setEditId('');
    if (shouldCloseComposer) {
      setIsComposerOpen(false);
    }
  }, []);

  const openComposerForNew = useCallback(() => {
    clearEditor(false);
    setIsComposerOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [clearEditor]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (editId) await updateProject(editId, form);
      else await createProject(form);
      toast.success(editId ? 'Project updated' : 'Project created');
      clearEditor(true);
      await loadItems();
    } catch (err) {
      toast.error(err.message || 'Project save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title || '',
      slug: item.slug || '',
      category: item.category || '',
      desc: item.desc || '',
      content: item.content || '',
      seoTitle: item.seoTitle || '',
      seoDescription: item.seoDescription || '',
      image: item.image || '',
    });
    setIsComposerOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm('Delete this project?')) return;
      await deleteProject(id);
      toast.success('Project deleted');
      await loadItems();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const slugPreview = useMemo(() => getSlugPreview(form.slug, form.title), [form.slug, form.title]);
  const categoryCount = useMemo(() => new Set(items.map((item) => item.category).filter(Boolean)).size, [items]);

  return (
    <div className="space-y-6">
      <AdminHero
        eyebrow="Case Studies"
        title="A sharper project management desk for the portfolio"
        description="Show only what matters, open the editor on demand, and keep the portfolio list easy to scan and update."
        stats={[
          { label: 'Projects', value: items.length, helper: 'Total portfolio entries' },
          { label: 'Categories', value: categoryCount, helper: 'Distinct lanes represented' },
          { label: 'Editing', value: editId ? 'Live' : 'Ready', helper: editId ? 'You are updating a project' : 'Open composer when needed' },
        ]}
        actions={
          <>
            <Button type="button" variant="secondary" onClick={loadItems}>
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
            <Button type="button" onClick={openComposerForNew}>
              <Plus className="h-4 w-4" />
              Add New Project
            </Button>
          </>
        }
      />

      {isComposerOpen ? (
        <AdminSection title={editId ? 'Edit project' : 'Add new project'} description="A lean editor for project story, media link, and search fields.">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AdminSubsection title="Project identity" description="Lock in the basics first.">
              <AdminFieldGrid>
                <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated-from-title" />
                <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
                <div className="rounded-2xl border border-neutral-900 bg-black/30 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">Route preview</p>
                  <p className="mt-3 text-sm text-neutral-300">/portfolio/{slugPreview || 'project-slug'}</p>
                </div>
              </AdminFieldGrid>
            </AdminSubsection>

            <AdminSubsection title="Project copy" description="Keep the short summary tight and the full story complete.">
              <div className="space-y-4">
                <Textarea label="Short Description" rows={4} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} required />
                <Textarea label="Project Story" rows={14} className="min-h-[280px]" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Outline the problem, work done, and result." />
              </div>
            </AdminSubsection>

            <AdminSubsection title="Media and SEO" description="One clean image field, plus optional metadata.">
              <div className="space-y-4">
                <AdminFieldGrid>
                  <Input label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
                  <div className="rounded-2xl border border-neutral-900 bg-black/30 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">Current image</p>
                    {form.image ? (
                      <div className="mt-3 overflow-hidden rounded-2xl border border-neutral-800">
                        <img src={form.image} alt={form.title || 'Project preview'} className="h-40 w-full object-cover" loading="lazy" />
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-neutral-500">Add an image URL to preview it here.</p>
                    )}
                  </div>
                </AdminFieldGrid>
                <AdminFieldGrid>
                  <Input label="SEO Title" value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
                  <Textarea label="SEO Description" rows={3} value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} />
                </AdminFieldGrid>
              </div>
            </AdminSubsection>

            <div className="flex flex-wrap gap-2">
              <Button type="submit" isLoading={saving}>
                <Sparkles className="h-4 w-4" />
                {editId ? 'Update Project' : 'Save Project'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => clearEditor(true)}>Close Editor</Button>
            </div>
          </form>
        </AdminSection>
      ) : null}

      <AdminSection title="Project library" description="Every portfolio card in one polished queue.">
        {loading ? (
          <p className="py-10 text-center text-neutral-500">Loading projects...</p>
        ) : items.length ? (
          <AdminList>
            {items.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-[24px] border border-neutral-900 bg-[#090909]">
                <div className="flex flex-col md:flex-row">
                  <div className="h-52 w-full shrink-0 overflow-hidden border-b border-neutral-900 bg-black md:h-auto md:w-60 md:border-b-0 md:border-r">
                    {item.image ? <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" /> : null}
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
                    <div>
                      <AdminBadge tone="muted">{item.category || 'Project'}</AdminBadge>
                      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-400">{item.desc}</p>
                    </div>
                    <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                      <div className="text-sm text-neutral-500">/portfolio/{item.slug || item.id}</div>
                      <div className="flex flex-wrap gap-2">
                        <Button type="button" variant="secondary" onClick={() => handleEdit(item)}>
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button type="button" variant="danger" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </AdminList>
        ) : (
          <EmptyState title="No projects yet" description="Open the editor and create your first project entry." />
        )}
      </AdminSection>
    </div>
  );
};

export default AdminProjects;
