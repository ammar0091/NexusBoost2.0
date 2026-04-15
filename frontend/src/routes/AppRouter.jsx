import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import ProtectedRoute from '@/components/common/ProtectedRoute';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const Clients = lazy(() => import('@/pages/Clients'));
const Blogs = lazy(() => import('@/pages/Blogs'));
const BlogDetail = lazy(() => import('@/pages/BlogDetail'));
const Support = lazy(() => import('@/pages/Support'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('@/pages/TermsConditions'));
const CookiePolicy = lazy(() => import('@/pages/CookiePolicy'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Admin
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminPanel = lazy(() => import('@/pages/admin/AdminPanel'));
const AdminOverview = lazy(() => import('@/pages/admin/AdminOverview'));
const AdminBlogs = lazy(() => import('@/pages/admin/AdminBlogs'));
const AdminProjects = lazy(() => import('@/pages/admin/AdminProjects'));
const AdminTeam = lazy(() => import('@/pages/admin/AdminTeam'));
const AdminClients = lazy(() => import('@/pages/admin/AdminClients'));
const AdminContacts = lazy(() => import('@/pages/admin/AdminContacts'));
const AdminNewsletters = lazy(() => import('@/pages/admin/AdminNewsletters'));
const AdminLayout = lazy(() => import('@/components/admin/AdminLayout'));

const PageLoader = () => (
  <div className="flex h-screen items-center justify-center bg-(--nb-bg)">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
  </div>
);

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPanel />} />
            <Route path="overview" element={<AdminOverview />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="newsletters" element={<AdminNewsletters />} />
          </Route>
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:slug" element={<ProjectDetail />} />
          <Route path="clients" element={<Clients />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:slug" element={<BlogDetail />} />
          <Route path="support" element={<Support />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsConditions />} />
          <Route path="cookies" element={<CookiePolicy />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="cookie" element={<CookiePolicy />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
