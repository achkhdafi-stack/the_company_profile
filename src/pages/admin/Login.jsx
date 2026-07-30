// src/pages/admin/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, AlertCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// Logo Google resmi (SVG multi-warna) sebagai komponen kecil
function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.42-.22-2.05H12v3.93h6.6c-.13 1.1-.86 2.75-2.47 3.86l-.02.15 3.59 2.78.25.02c2.28-2.1 3.57-5.2 3.57-8.69Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.94-2.92l-3.78-2.93c-1.02.7-2.4 1.19-4.16 1.19-3.18 0-5.88-2.1-6.84-5.02l-.14.01-3.73 2.89-.05.14C3.24 21.3 7.28 24 12 24Z" />
      <path fill="#FBBC05" d="M5.16 14.32A7.5 7.5 0 0 1 4.73 12c0-.8.14-1.58.4-2.32L5.12 9.5 1.35 6.56l-.12.06A11.99 11.99 0 0 0 0 12c0 1.93.46 3.76 1.28 5.38l3.88-3.06Z" />
      <path fill="#EA4335" d="M12 4.75c2.25 0 3.77.97 4.64 1.78l3.39-3.31C17.94 1.19 15.24 0 12 0 7.28 0 3.24 2.7 1.28 6.62l3.87 3.05C6.12 6.85 8.82 4.75 12 4.75Z" />
    </svg>
  );
}

export default function Login() {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);

    setLoading(false);

    if (error) {
      setError("Email atau password salah.");
      return;
    }

    navigate("/admin");
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setError("Gagal login dengan Google: " + error.message);
      setGoogleLoading(false);
    }
    // Kalau sukses, Supabase akan redirect otomatis ke provider Google,
    // jadi tidak perlu navigate() manual di sini.
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        {/* Kembali ke website */}
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Website
        </Link>

        <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-100">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-xl font-black italic text-white">
            A
          </div>
          <h1 className="mt-4 text-center text-xl font-bold text-slate-900">
            Admin Panel
          </h1>
          <p className="mt-1 text-center text-sm text-slate-500">
            PT Akar Emas
          </p>

          {/* Login Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            <GoogleIcon />
            {googleLoading ? "Menghubungkan..." : "Masuk dengan Google"}
          </button>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-100" />
            <span className="text-xs font-medium uppercase text-slate-400">atau</span>
            <span className="h-px flex-1 bg-slate-100" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@akaremasedu.id"
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" />
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}