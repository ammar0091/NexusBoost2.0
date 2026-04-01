import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { deleteSubscriber, fetchAdminNewsletters } from '@/services/adminApi';
import { AdminPageHeader, AdminSurface, Button, EmptyState, formatDate } from '@/components/admin/AdminUI';
import { handleAdminPageError } from '@/components/admin/adminHelpers';

const AdminNewsletters = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const newsletters = await fetchAdminNewsletters();
      setItems(newsletters);
    } catch (err) {
      handleAdminPageError(err, navigate, toast);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <div>

      {loading ? (
        <AdminSurface className="p-10 text-center text-neutral-500">Loading subscribers...</AdminSurface>
      ) : items.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <AdminSurface key={item.id} className="p-5">
              <p className="text-sm font-medium text-white">{item.email}</p>
              <p className="mt-2 text-xs text-neutral-500">Subscribed {formatDate(item.createdAt)}</p>
              <Button
                variant="danger"
                className="mt-5 w-full"
                onClick={async () => {
                  if (window.confirm('Remove subscriber?')) {
                    await deleteSubscriber(item.id);
                    loadItems();
                  }
                }}
              >
                Remove subscriber
              </Button>
            </AdminSurface>
          ))}
        </div>
      ) : (
        <EmptyState title="No subscribers yet" description="Newsletter signups will appear here once users subscribe." />
      )}
    </div>
  );
};

export default AdminNewsletters;


