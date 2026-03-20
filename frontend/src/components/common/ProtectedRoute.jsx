import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAdminLoggedIn } from '@/utils/adminAuth';

const ProtectedRoute = () => {
  const location = useLocation();

  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
