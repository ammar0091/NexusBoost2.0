import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';

// Pages Lazy Load ho rahe hain
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Services = lazy(() => import('@/pages/Services'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Clients = lazy(() => import('@/pages/Clients'));
const Blogs = lazy(() => import('@/pages/Blogs'));
const Support = lazy(() => import('@/pages/Support'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('@/pages/TermsConditions'));
const CookiePolicy = lazy(() => import('@/pages/CookiePolicy'));
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminPanel = lazy(() => import('@/pages/admin/AdminPanel'));



// Ek simple loading spinner ya component
const PageLoader = () => (
  <div className="flex h-screen items-center justify-center bg-[var(--nb-bg-page)]">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
  </div>
);

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="clients" element={<Clients />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="support" element={<Support />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsConditions />} />
          <Route path="cookies" element={<CookiePolicy />} /> 
          {/* 404 Page yahan add kar sakte hain */}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
