import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <ScrollToTop />

      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
