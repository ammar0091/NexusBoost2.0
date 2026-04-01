import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Edit2, Plus, RefreshCcw, Sparkles, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createClient, deleteClient, updateClient } from '@/services/adminApi';
import { fetchClients } from '@/services/contentApi';
import {
  AdminBadge,
  AdminFieldGrid,
  AdminHero,
  AdminList,
  AdminSection,
  AdminSubsection,
  Button,
  EmptyState,
  INITIAL_CLIENT,
  Input,
  Textarea,
} from '@/components/admin/AdminUI';
import { handleAdminPageError } from '@/components/admin/adminHelpers';

const AdminClients = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(INITIAL_CLIENT);
  const [editId, setEditId] = useState('');
  const [saving, setSaving] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const clients = await fetchClients({ enableFallback: false });
      setItems(clients);
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
    setForm(INITIAL_CLIENT);
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
      if (editId) await updateClient(editId, form);
      else await createClient(form);
      toast.success(editId ? 'Client updated' : 'Client added');
      clearEditor(true);
      await loadItems();
    } catch (err) {
      toast.error(err.message || 'Action failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      name: item.name || '',
      logo: item.logo || '',
      industry: item.industry || '',
      summary: item.summary || '',
      website: item.website || '',
      image: item.image || '',
    });
    setIsComposerOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm('Delete this client?')) return;
      await deleteClient(id);
      toast.success('Client deleted');
      await loadItems();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const websiteCount = useMemo(() => items.filter((item) => item.website).length, [items]);
  const industryCount = useMemo(() => new Set(items.map((item) => item.industry).filter(Boolean)).size, [items]);

  return (
    <div className="space-y-6">
      <AdminHero
        eyebrow="Client Profiles"
        title="Manage client entries with a cleaner, tighter control panel"
        description="The list stays in focus, the editor opens only when needed, and each client card remains easy to refresh or remove."
        stats={[
          { label: 'Clients', value: items.length, helper: 'Published client cards' },
          { label: 'Websites', value: websiteCount, helper: 'Entries with outbound links' },
          { label: 'Industries', value: industryCount, helper: 'Distinct sectors represented' },
        ]}
        actions={
          <>
            <Button type="button" variant="secondary" onClick={loadItems}>
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
            <Button type="button" onClick={openComposerForNew}>
              <Plus className="h-4 w-4" />
              Add New Client
            </Button>
          </>
        }
      />

      {isComposerOpen ? (
        <AdminSection title={editId ? 'Edit client' : 'Add new client'} description="Only the client profile fields that matter in day-to-day admin work.">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AdminSubsection title="Client identity" description="Basic business profile and positioning.">
              <AdminFieldGrid>
                <Input label="Client Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input label="Industry" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
                <Input label="Website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="md:col-span-2" />
              </AdminFieldGrid>
            </AdminSubsection>

            <AdminSubsection title="Visuals" description="Use direct URLs for the logo and supporting image.">
              <AdminFieldGrid>
                <Input label="Logo URL" value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} />
                <Input label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                <div className="md:col-span-2 rounded-2xl border border-neutral-900 bg-black/30 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">Current media</p>
                  {form.image || form.logo ? (
                    <div className="mt-3 flex items-center gap-4">
                      <img src={form.image || form.logo} alt={form.name || 'Client'} className="h-20 w-20 rounded-[22px] object-cover" loading="lazy" />
                      <div>
                        <p className="text-sm font-medium text-white">{form.name || 'Client preview'}</p>
                        <p className="mt-1 text-sm text-neutral-500">{form.industry || 'Industry label goes here'}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-neutral-500">Add a logo or image URL to preview the media here.</p>
                  )}
                </div>
              </AdminFieldGrid>
            </AdminSubsection>

            <AdminSubsection title="Summary" description="A concise snapshot of the client relationship or positioning.">
              <Textarea label="Summary" rows={5} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
            </AdminSubsection>

            <div className="flex flex-wrap gap-2">
              <Button type="submit" isLoading={saving}>
                <Sparkles className="h-4 w-4" />
                {editId ? 'Update Client' : 'Save Client'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => clearEditor(true)}>Close Editor</Button>
            </div>
          </form>
        </AdminSection>
      ) : null}

      <AdminSection title="Client directory" description="A management-friendly list of every client entry currently on the site.">
        {loading ? (
          <p className="py-10 text-center text-neutral-500">Loading clients...</p>
        ) : items.length ? (
          <AdminList>
            {items.map((item) => (
              <article key={item.id} className="flex flex-col gap-5 rounded-[24px] border border-neutral-900 bg-[#090909] p-5 md:flex-row md:items-center md:justify-between md:p-6">
                <div className="flex min-w-0 items-center gap-4">
                  {item.image || item.logo ? (
                    <img src={item.image || item.logo} alt={item.name} className="h-20 w-20 rounded-[22px] object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-[22px] border border-neutral-800 bg-black text-sm text-neutral-500">No media</div>
                  )}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <AdminBadge tone="muted">{item.industry || 'Client'}</AdminBadge>
                      {item.website ? <AdminBadge tone="success">Website linked</AdminBadge> : null}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-white">{item.name}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400">{item.summary || 'No summary added yet.'}</p>
                    {item.website ? (
                      <a href={item.website} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-neutral-300 transition hover:text-white">
                        Visit website <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
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
              </article>
            ))}
          </AdminList>
        ) : (
          <EmptyState title="No clients yet" description="Open the editor and add your first client profile." />
        )}
      </AdminSection>
    </div>
  );
};

export default AdminClients;
