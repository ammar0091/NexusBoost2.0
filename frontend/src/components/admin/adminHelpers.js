import { clearAdminToken } from '@/utils/adminAuth';

export function handleAdminPageError(err, navigate, toast) {
  if (err.status === 401 || err.status === 403) {
    clearAdminToken();
    navigate('/admin/login', { replace: true });
    return;
  }

  toast.error(err.message || 'Failed to load data');
}
