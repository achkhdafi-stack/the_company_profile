// src/pages/admin/ProductsAdmin.jsx
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const categoryOptions = [
  { value: "defense", label: "Pertahanan", href: "/technology/defense" },
  { value: "energy", label: "Energi", href: "/technology/energy" },
  { value: "transportation", label: "Transportasi", href: "/technology/transportation" },
];

const emptyForm = {
  id: null,
  name_id: "",
  name_en: "",
  desc_id: "",
  desc_en: "",
  category: "defense",
  image_url: "",
  detail_href: "/technology/defense",
};

export default function ProductsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const matched = categoryOptions.find((c) => c.value === value);
      setForm((prev) => ({ ...prev, category: value, detail_href: matched?.href || prev.detail_href }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    const payload = {
      name_id: form.name_id,
      name_en: form.name_en,
      desc_id: form.desc_id,
      desc_en: form.desc_en,
      category: form.category,
      image_url: form.image_url,
      detail_href: form.detail_href,
    };

    let error;
    if (form.id) {
      ({ error } = await supabase.from("products").update(payload).eq("id", form.id));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
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
    if (!window.confirm("Yakin mau hapus produk ini?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) fetchItems();
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Produk</h1>
          <p className="mt-1 text-sm text-slate-500">Kelola produk di halaman /product</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">
          <Plus className="h-4 w-4" />
          Tambah Produk
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin" /> Memuat data...
          </div>
        ) : items.length === 0 ? (
          <p className="py-16 text-center text-sm text-slate-500">Belum ada produk. Klik "Tambah Produk" untuk mulai.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">Nama (ID)</th>
                <th className="px-5 py-3">Kategori</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="max-w-xs truncate px-5 py-3 font-medium text-slate-800">{item.name_id}</td>
                  <td className="px-5 py-3 text-slate-500 capitalize">
                    {categoryOptions.find((c) => c.value === item.category)?.label || item.category}
                  </td>
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
              <h2 className="text-lg font-bold text-slate-900">{form.id ? "Edit Produk" : "Tambah Produk"}</h2>
              <button onClick={closeForm} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Nama Produk (Indonesia)</label>
                  <input required name="name_id" value={form.name_id} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Nama Produk (English)</label>
                  <input required name="name_en" value={form.name_en} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Deskripsi (Indonesia)</label>
                  <textarea rows={3} name="desc_id" value={form.desc_id} onChange={handleChange} className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Deskripsi (English)</label>
                  <textarea rows={3} name="desc_en" value={form.desc_en} onChange={handleChange} className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Kategori</label>
                <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400">
                  {categoryOptions.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">URL Gambar</label>
                <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="/assets/product/nama-produk.jpg" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-red-400" />
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