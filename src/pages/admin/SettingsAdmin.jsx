// src/pages/admin/SettingsAdmin.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, LogOut, CheckCircle2, Save } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function SettingsAdmin() {
  const { session, updateProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFullName(session?.user?.user_metadata?.full_name || "");
  }, [session]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");

    const { error } = await updateProfile({ fullName });

    setSaving(false);

    if (error) {
      setError("Gagal menyimpan: " + error.message);
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-2xl font-bold text-slate-900">Pengaturan</h1>
      <p className="mt-1 text-sm text-slate-500">
        Kelola informasi akun dan sesi login kamu.
      </p>

      {/* Profil */}
      <div className="mt-8 max-w-xl rounded-2xl border border-slate-100 bg-white p-6 lg:p-8">
        <h2 className="text-base font-bold text-slate-900">Profil Pengguna</h2>
        <p className="mt-1 text-sm text-slate-500">
          Nama ini akan tampil di sapaan Dashboard.
        </p>

        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
              <Mail className="h-4 w-4 text-slate-400" />
              Email
            </label>
            <input
              disabled
              value={session?.user?.email || ""}
              className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
              <User className="h-4 w-4 text-slate-400" />
              Nama Pengguna
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masukkan nama kamu"
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            {saved && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                Tersimpan
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Sesi login */}
      <div className="mt-6 max-w-xl rounded-2xl border border-slate-100 bg-white p-6 lg:p-8">
        <h2 className="text-base font-bold text-slate-900">Sesi Login</h2>
        <p className="mt-1 text-sm text-slate-500">
          Keluar dari akun admin di perangkat ini.
        </p>

        <button
          onClick={handleLogout}
          className="mt-5 inline-flex items-center gap-2 rounded-md border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>
    </div>
  );
}