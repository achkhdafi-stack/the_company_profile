// src/pages/admin/TendersAdmin.jsx
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const emptyForm = {
  id: null,
  title_id: "",
  title_en: "",
  category_id: "",
  category_en: "",
  status: "open",
  deadline: new Date().toISOString().slice(0, 10),
  code: "",
};

export default function TendersAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("tenders").select("*").order("deadline", { ascending: false });
    if (!error) setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setErrorMsg("");
    setShowForm(true);
  };
  const openEdit = (item) => {
    setForm(item);
    setErrorMsg("");
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setForm(emptyForm);
  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    const payload = {
      title_id: form.title_id,
      title_en: form.title_en,
      category_id: form.category_id,
      category_en: form.category_en,
      status: form.status,
      deadline: form.deadline,
      code: form.code,
    };

    let error;
    if (form.id) {
      ({ error } = await supabase.from("tenders").update(payload).eq("id", form.id));
    } else {
      ({ error } = await supabase.from("tenders").insert(payload));
    }

    setSaving(false);
    if (error) {
      setErrorMsg(
        error.code === "23505" ? "Kode pengadaan ini sudah dipakai." : "Gagal menyimpan data: " + error.message
      );
      return;
    }
    closeForm();
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin mau hapus pengadaan ini?")) return;
    const { error } = await supabase.from("tenders").delete().eq("id", id);
    if (!error) fetchItems();
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pengadaan</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola daftar tender di halaman /pengadaan</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">
          <Plus className="h-4 w-4" />
          Tambah Pengadaan
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin" /> Memuat data...
          </div>
        ) : items.length === 0 ? (
          <p className="py-16 text-center text-sm text-slate-500">Belum ada pengadaan. Klik "Tambah Pengadaan" untuk mulai.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">Judul (ID)</th>
                <th className="px-5 py-3">Kode</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Deadline</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="max-w-xs truncate px-5 py-3 font-medium text-slate-800">{item.title_id}</td>
                  <td className="px-5 py-3 text-slate-400">{item.code}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === "open" ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500"}`}>
                      {item.status === "open" ? "Dibuka" : "Ditutup"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{item.deadline}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(item)} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{form.id ? "Edit Pengadaan" : "Tambah Pengadaan"}</h2>
              <button onClick={closeForm} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Judul (Indonesia)</label>
                  <input required name="title_id" value={form.title_id} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Judul (English)</label>
                  <input required name="title_en" value={form.title_en} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Kategori (ID) — misal "Energi"</label>
                  <input name="category_id" value={form.category_id} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Kategori (EN) — misal "Energy"</label>
                  <input name="category_en" value={form.category_en} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Kode Pengadaan</label>
                  <input required name="code" value={form.code} onChange={handleChange} placeholder="PRC/2026/07/001" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
                  <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400">
                    <option value="open">Dibuka</option>
                    <option value="closed">Ditutup</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Batas Waktu</label>
                  <input required type="date" name="deadline" value={form.deadline} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
                </div>
              </div>

              {errorMsg && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{errorMsg}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeForm} className="rounded-md border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Batal</button>
                <button type="submit" disabled={saving} className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60">
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}