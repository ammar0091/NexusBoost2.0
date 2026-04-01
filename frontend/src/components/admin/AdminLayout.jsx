import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Briefcase,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Toaster } from 'sonner';
import Seo from '@/components/common/Seo';
import { clearAdminToken } from '@/utils/adminAuth';

const navItems = [
  { path: '/admin/overview', label: 'Overview', icon: LayoutDashboard },
  { path: '/admin/blogs', label: 'Blogs', icon: FileText },
  { path: '/admin/projects', label: 'Projects', icon: Briefcase },
  { path: '/admin/team', label: 'Team', icon: Users },
  { path: '/admin/clients', label: 'Clients', icon: ArrowUpRight },
  { path: '/admin/contacts', label: 'Contacts', icon: Mail },
  { path: '/admin/newsletters', label: 'Newsletters', icon: Newspaper },
];

const getPageLabel = (pathname) => {
  const current = navItems.find((item) => pathname.startsWith(item.path));
  return current?.label || 'Admin';
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentLabel = getPageLabel(location.pathname);

  const handleLogout = () => {
    clearAdminToken();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-[#040404] text-white">
      <Seo title={`Admin ${currentLabel}`} noIndex />
      <Toaster theme="dark" position="bottom-right" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.10),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_28%)]" />

      <aside className="relative hidden w-70 shrink-0 border-r border-neutral-900/80 bg-[#070707]/95 backdrop-blur-xl lg:flex lg:flex-col">
        <div className="border-b border-neutral-900 px-6 py-6">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">NexusBoost</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Admin Control</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">Clean workflows for content, leads, and profile management.</p>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
                    isActive
                      ? 'border border-white/10 bg-white text-black shadow-[0_16px_30px_rgba(255,255,255,0.08)]'
                      : 'border border-transparent text-neutral-400 hover:border-neutral-900 hover:bg-[#101010] hover:text-white'
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-neutral-900 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl border border-neutral-900 bg-[#0b0b0b] px-4 py-3 text-sm text-neutral-400 transition hover:bg-[#101010] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="relative flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-neutral-900/80 bg-[#050505]/92 px-4 py-4 backdrop-blur-xl md:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">Admin workspace</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">{currentLabel}</h1>
            </div>
            <button
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-800 bg-[#0b0b0b] text-neutral-200 lg:hidden"
              aria-label="Toggle admin navigation"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {mobileOpen ? (
            <div className="mt-4 grid gap-2 rounded-3xl border border-neutral-900 bg-[#070707] p-3 lg:hidden">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm ${
                      isActive ? 'bg-white text-black' : 'text-neutral-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-neutral-400"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          ) : null}
        </header>

        <main className="relative flex-1 px-4 py-6 md:px-6 md:py-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
