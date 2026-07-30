// src/pages/admin/JournalAdmin.jsx
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const emptyForm = {
  id: null,
  edition_id: "",
  edition_en: "",
  title_id: "",
  title_en: "",
  issue_date: new Date().toISOString().slice(0, 10),
  cover_url: "",
  file_url: "",
};

export default function JournalAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("journal_issues")
      .select("*")
      .order("issue_date", { ascending: false });
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
      edition_id: form.edition_id,
      edition_en: form.edition_en,
      title_id: form.title_id,
      title_en: form.title_en,
      issue_date: form.issue_date,
      cover_url: form.cover_url,
      file_url: form.file_url,
    };

    let error;
    if (form.id) {
      ({ error } = await supabase.from("journal_issues").update(payload).eq("id", form.id));
    } else {
      ({ error } = await supabase.from("journal_issues").insert(payload));
    }

    setSaving(false);
    if (error) {
      setErrorMsg("Gagal menyimpan data: " + error.message);
      return;
    }
    closeForm();
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin mau hapus edisi majalah ini?")) return;
    const { error } = await supabase.from("journal_issues").delete().eq("id", id);
    if (!error) fetchItems();
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Majalah</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola edisi majalah di halaman /media/journal</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">
          <Plus className="h-4 w-4" />
          Tambah Edisi
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin" /> Memuat data...
          </div>
        ) : items.length === 0 ? (
          <p className="py-16 text-center text-sm text-slate-500">Belum ada edisi. Klik "Tambah Edisi" untuk mulai.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">Edisi</th>
                <th className="px-5 py-3">Judul (ID)</th>
                <th className="px-5 py-3">Tanggal Terbit</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium text-slate-800">{item.edition_id}</td>
                  <td className="max-w-xs truncate px-5 py-3 text-slate-600">{item.title_id}</td>
                  <td className="px-5 py-3 text-slate-500">{item.issue_date}</td>
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
              <h2 className="text-lg font-bold text-slate-900">{form.id ? "Edit Edisi" : "Tambah Edisi"}</h2>
              <button onClick={closeForm} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Label Edisi (ID) — misal "Edisi 25"</label>
                  <input required name="edition_id" value={form.edition_id} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Label Edisi (EN) — misal "Issue 25"</label>
                  <input required name="edition_en" value={form.edition_en} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
                </div>
              </div>

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

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Tanggal Terbit</label>
                <input required type="date" name="issue_date" value={form.issue_date} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">URL Cover (gambar)</label>
                <input name="cover_url" value={form.cover_url} onChange={handleChange} placeholder="/assets/media/journal/edisi-25.jpg" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">URL File PDF</label>
                <input name="file_url" value={form.file_url} onChange={handleChange} placeholder="/assets/media/journal/edisi-25.pdf" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
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