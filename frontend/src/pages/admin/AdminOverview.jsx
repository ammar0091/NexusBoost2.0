import { useCallback, useEffect, useState } from 'react';
import { CheckCircle2, Clock3, FileText, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchAdminContacts, fetchAdminNewsletters, fetchAdminStats } from '@/services/adminApi';
import { fetchBlogs, fetchClients, fetchProjects } from '@/services/contentApi';
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

const AdminOverview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    blogs: [],
    projects: [],
    clients: [],
    contacts: [],
    newsletters: [],
    stats: {},
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [blogs, projects, clients, stats, contacts, newsletters] = await Promise.all([
        fetchBlogs({ enableFallback: false }),
        fetchProjects({ enableFallback: false }),
        fetchClients({ enableFallback: false }),
        fetchAdminStats(),
        fetchAdminContacts(),
        fetchAdminNewsletters(),
      ]);

      setData({ blogs, projects, clients, stats, contacts, newsletters });
    } catch (err) {
      handleAdminPageError(err, navigate, toast);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const totalContent = data.blogs.length + data.projects.length + data.clients.length;

  return (
    <div>
   

      {loading ? (
        <AdminSection className="p-10 text-center text-neutral-500">Loading overview...</AdminSection>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard label="Leads" value={data.stats.contactCount} icon={Mail} />
            <AdminStatCard label="Pending" value={data.stats.unresolvedCount} icon={Clock3} highlight />
            <AdminStatCard label="Subscribers" value={data.stats.newsletterCount} icon={CheckCircle2} />
            <AdminStatCard label="Content" value={totalContent} icon={FileText} />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <AdminSection title="Recent blogs" description="Latest published or drafted blog entries.">
              {data.blogs.length ? (
                <AdminList>
                  {data.blogs.slice(0, 5).map((blog) => (
                    <div key={blog.id} className="rounded-xl border border-neutral-900 bg-[#0b0b0b] px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-white">{blog.title}</p>
                          <p className="mt-1 text-xs text-neutral-500">{typeof blog.category === 'string' ? blog.category : blog.category?.name || 'Uncategorized'}</p>
                        </div>
                        <span className="text-xs text-neutral-500">{formatDate(blog.publishedAt)}</span>
                      </div>
                    </div>
                  ))}
                </AdminList>
              ) : (
                <EmptyState title="No blogs yet" description="Create the first post from the blogs page." />
              )}
            </AdminSection>

            <AdminSection title="Recent inquiries" description="Newest contact form submissions.">
              {data.contacts.length ? (
                <AdminList>
                  {data.contacts.slice(0, 5).map((contact) => (
                    <div key={contact.id} className="rounded-xl border border-neutral-900 bg-[#0b0b0b] px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-white">{contact.name}</p>
                          <p className="mt-1 text-xs text-neutral-500">{contact.email}</p>
                          <p className="mt-2 text-sm text-neutral-400">{contact.message}</p>
                        </div>
                        <span className="text-xs text-neutral-500">{contact.status}</span>
                      </div>
                    </div>
                  ))}
                </AdminList>
              ) : (
                <EmptyState title="No inquiries yet" description="New inquiries will appear here." />
              )}
            </AdminSection>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOverview;
