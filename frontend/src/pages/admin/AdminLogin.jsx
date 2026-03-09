import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "@/services/adminApi";
import { isAdminLoggedIn, setAdminToken } from "@/utils/adminAuth";

const DEFAULT_EMAIL = "admin@nexusboost.local";
const DEFAULT_PASSWORD = "Admin@12345";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
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
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-slate-800/80 border border-slate-700 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-400 font-bold mb-4">
          NexusBoost Admin
        </p>
        <h1 className="text-3xl font-black mb-8">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs text-slate-300 uppercase tracking-widest font-semibold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl bg-slate-900 border border-slate-600 px-4 py-3 outline-none focus:border-blue-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-300 uppercase tracking-widest font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl bg-slate-900 border border-slate-600 px-4 py-3 outline-none focus:border-blue-400"
            />
          </div>

          {error ? (
            <p className="text-red-400 text-sm font-medium">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-700 py-3 font-bold uppercase tracking-widest text-sm"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
