import { useCallback, useEffect, useMemo, useState } from 'react';
import { Edit2, Plus, RefreshCcw, Sparkles, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createTeamMember, deleteTeamMember, updateTeamMember } from '@/services/adminApi';
import { fetchTeams } from '@/services/contentApi';
import {
  AdminBadge,
  AdminFieldGrid,
  AdminHero,
  AdminList,
  AdminSection,
  AdminSubsection,
  Button,
  EmptyState,
  INITIAL_TEAM,
  Input,
} from '@/components/admin/AdminUI';
import { handleAdminPageError } from '@/components/admin/adminHelpers';

const AdminTeam = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(INITIAL_TEAM);
  const [editId, setEditId] = useState('');
  const [saving, setSaving] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const team = await fetchTeams({ enableFallback: false });
      setItems(team);
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
    setForm(INITIAL_TEAM);
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
      const payload = { ...form, order: Number(form.order || 0) };
      if (editId) await updateTeamMember(editId, payload);
      else await createTeamMember(payload);
      toast.success(editId ? 'Team member updated' : 'Team member added');
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
      role: item.role || '',
      image: item.image || '',
      order: item.order ?? 0,
    });
    setIsComposerOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm('Delete this team member?')) return;
      await deleteTeamMember(id);
      toast.success('Team member deleted');
      await loadItems();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const leadCount = useMemo(() => items.filter((item) => Number(item.order) === 0).length, [items]);
  const highestOrder = useMemo(() => items.reduce((max, item) => Math.max(max, Number(item.order || 0)), 0), [items]);

  return (
    <div className="space-y-6">
      <AdminHero
        eyebrow="Team Roster"
        title="A tighter way to manage leadership and supporting profiles"
        description="No side preview, no clutter. Just a strong roster list and a focused editor when you want to add or revise a member."
        stats={[
          { label: 'Members', value: items.length, helper: 'Profiles currently published' },
          { label: 'Lead slots', value: leadCount, helper: 'Members at order zero' },
          { label: 'Highest order', value: highestOrder, helper: 'Current stack depth' },
        ]}
        actions={
          <>
            <Button type="button" variant="secondary" onClick={loadItems}>
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
            <Button type="button" onClick={openComposerForNew}>
              <Plus className="h-4 w-4" />
              Add Team Member
            </Button>
          </>
        }
      />

      {isComposerOpen ? (
        <AdminSection title={editId ? 'Edit member' : 'Add team member'} description="Simple identity, image, and display order fields.">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AdminSubsection title="Profile details" description="Keep the profile card clean and complete.">
              <AdminFieldGrid>
                <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
                <Input label="Display Order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
                <div className="rounded-2xl border border-neutral-900 bg-black/30 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">Placement hint</p>
                  <p className="mt-3 text-sm text-neutral-400">Lower numbers appear earlier in the team list.</p>
                </div>
              </AdminFieldGrid>
            </AdminSubsection>

            <AdminSubsection title="Profile media" description="Use a direct image URL for the member card.">
              <AdminFieldGrid>
                <Input label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="md:col-span-2" required />
                <div className="md:col-span-2 rounded-2xl border border-neutral-900 bg-black/30 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">Current image</p>
                  {form.image ? (
                    <div className="mt-3 flex items-center gap-4">
                      <img src={form.image} alt={form.name || 'Team member'} className="h-20 w-20 rounded-2xl object-cover" loading="lazy" />
                      <div>
                        <p className="text-sm font-medium text-white">{form.name || 'Team member preview'}</p>
                        <p className="mt-1 text-sm text-neutral-500">{form.role || 'Role will appear here'}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-neutral-500">Add an image URL to show the current profile photo.</p>
                  )}
                </div>
              </AdminFieldGrid>
            </AdminSubsection>

            <div className="flex flex-wrap gap-2">
              <Button type="submit" isLoading={saving}>
                <Sparkles className="h-4 w-4" />
                {editId ? 'Update Member' : 'Save Member'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => clearEditor(true)}>Close Editor</Button>
            </div>
          </form>
        </AdminSection>
      ) : null}

      <AdminSection title="Team list" description="Everything visible on the team page, ready to edit or reorder.">
        {loading ? (
          <p className="py-10 text-center text-neutral-500">Loading team...</p>
        ) : items.length ? (
          <AdminList>
            {items.map((item) => (
              <article key={item.id} className="flex flex-col gap-5 rounded-3xl border border-neutral-900 bg-[#090909] p-5 md:flex-row md:items-center md:justify-between md:p-6">
                <div className="flex min-w-0 items-center gap-4">
                  <img src={item.image} alt={item.name} className="h-20 w-20 rounded-[22px] object-cover" loading="lazy" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <AdminBadge tone="muted">Order {item.order ?? 0}</AdminBadge>
                      <AdminBadge tone="neutral">{item.role}</AdminBadge>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-white">{item.name}</h3>
                    <p className="mt-1 text-sm text-neutral-400">{item.role}</p>
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
          <EmptyState title="No team members yet" description="Open the editor and add your first team profile." />
        )}
      </AdminSection>
    </div>
  );
};

export default AdminTeam;
