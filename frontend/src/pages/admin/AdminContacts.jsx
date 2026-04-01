import { useCallback, useEffect, useState } from 'react';
import { CheckCircle2, Clock3, Mail, Reply, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { deleteContact, fetchAdminContacts, updateContactStatus } from '@/services/adminApi';
import {
  AdminList,
  AdminPageHeader,
  AdminSection,
  AdminStatCard,
  Button,
  EmptyState,
  formatDate,
} from '@/components/admin/AdminUI';
import { handleAdminPageError } from '@/components/admin/adminHelpers';

const AdminContacts = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const contacts = await fetchAdminContacts();
      setItems(contacts);
    } catch (err) {
      handleAdminPageError(err, navigate, toast);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const newCount = items.filter((item) => item.status !== 'resolved').length;
  const resolvedCount = items.filter((item) => item.status === 'resolved').length;

  return (
    <div>
      <AdminPageHeader
        eyebrow="Contacts"
        title="Manage inquiries"
        description="A simple list of contact form messages."
        actions={<Button type="button" variant="secondary" onClick={loadItems}>Refresh</Button>}
      />

      {loading ? (
        <AdminSection className="p-10 text-center text-neutral-500">Loading contacts...</AdminSection>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <AdminStatCard label="Total" value={items.length} icon={Mail} />
            <AdminStatCard label="Pending" value={newCount} icon={Clock3} highlight />
            <AdminStatCard label="Resolved" value={resolvedCount} icon={CheckCircle2} />
          </div>

          <AdminSection title="All inquiries" description="Reply, update status, or remove entries.">
            {items.length ? (
              <AdminList>
                {items.map((item) => (
                  <article key={item.id} className="rounded-xl border border-neutral-900 bg-[#0b0b0b] p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <p className="text-xs text-neutral-500">{item.interest || 'General inquiry'} • {formatDate(item.createdAt)}</p>
                        <h3 className="mt-2 text-lg font-medium text-white">{item.name}</h3>
                        <p className="mt-1 text-sm text-neutral-400">{item.email}</p>
                        <p className="mt-3 text-sm text-neutral-400">{item.message}</p>
                      </div>
                      <div className="flex flex-col items-start gap-2 md:items-end">
                        <span className="text-xs text-neutral-500">{item.status}</span>
                        <div className="flex flex-wrap gap-2">
                          <Button type="button" variant="secondary" onClick={() => { window.location.href = `mailto:${item.email}`; }}><Reply className="h-4 w-4" />Reply</Button>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={async () => {
                              await updateContactStatus(item.id, item.status === 'resolved' ? 'new' : 'resolved');
                              loadItems();
                            }}
                          >
                            {item.status === 'resolved' ? 'Mark new' : 'Mark done'}
                          </Button>
                          <Button
                            type="button"
                            variant="danger"
                            onClick={async () => {
                              if (window.confirm('Delete this inquiry?')) {
                                await deleteContact(item.id);
                                loadItems();
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </AdminList>
            ) : (
              <EmptyState title="No inquiries yet" description="New messages will appear here." />
            )}
          </AdminSection>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
