import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminLogin } from "@/services/adminApi";
import { isAdminLoggedIn, setAdminToken } from "@/utils/adminAuth";
import Seo from "@/components/common/Seo";

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdminLoggedIn()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await adminLogin({ email, password });
      setAdminToken(response.token);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <Seo title="Admin Login" noIndex />
      <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-[#0A0A0A] p-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-blue-400">
          NexusBoost Admin
        </p>
        <h1 className="mb-2 text-3xl font-black">Login</h1>
        <p className="mb-8 text-sm leading-relaxed text-neutral-400">
          Sign in with your admin credentials to manage content, leads, and subscribers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-neutral-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
              className="w-full rounded-xl border border-neutral-700 bg-black px-4 py-3 outline-none focus:border-blue-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-neutral-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-neutral-700 bg-black px-4 py-3 outline-none focus:border-blue-400"
            />
          </div>

          {error ? <p className="text-sm font-medium text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold uppercase tracking-widest hover:bg-blue-500 disabled:bg-blue-700"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
