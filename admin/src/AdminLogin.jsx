import axios from "axios";
import React, { useContext, useState } from "react";
import { AdminCotext } from "./AdminCotext";
import { API_BASE } from "./config/api.js";
import { Lock } from "lucide-react";

function AdminLogin() {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const { settooken } = useContext(AdminCotext);
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);

  const loginhandler = async (e) => {
    e.preventDefault();
    seterror("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/auth/adminlogin`, {
        email,
        password,
      });

      if (res.data?.token) {
        settooken(res.data.token);
        localStorage.setItem("tooken", res.data.token);
      } else {
        seterror(res.data?.message || "Login failed");
      }
    } catch (err) {
      seterror(err.response?.data?.message || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-emerald-100 rounded-full">
            <Lock className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-slate-900">
          Admin Login
        </h1>
        <p className="text-center text-sm text-slate-500 mt-2 mb-8">
          Royal Peshawar Co. — store management
        </p>

        <form onSubmit={loginhandler} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-60 transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
