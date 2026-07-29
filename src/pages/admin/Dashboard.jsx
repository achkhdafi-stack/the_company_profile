// src/pages/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import {
  Newspaper,
  FileText,
  BookOpen,
  Package,
  Gavel,
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const cards = [
  { table: "news", label: "Berita", icon: Newspaper, href: "/admin/news" },
  { table: "articles", label: "Artikel", icon: FileText, href: "/admin/articles" },
  { table: "journal_issues", label: "Majalah", icon: BookOpen, href: "/admin/journal" },
  { table: "products", label: "Produk", icon: Package, href: "/admin/products" },
  { table: "tenders", label: "Pengadaan", icon: Gavel, href: "/admin/tenders" },
];

export default function Dashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    async function fetchCounts() {
      const results = {};
      for (const c of cards) {
        const { count } = await supabase
          .from(c.table)
          .select("*", { count: "exact", head: true });
        results[c.table] = count ?? 0;
      }
      setCounts(results);
    }
    fetchCounts();
  }, []);

  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Ringkasan jumlah konten yang tersimpan di database.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <a
              key={c.table}
              href={c.href}
              className="rounded-2xl border border-slate-100 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {counts[c.table] ?? "…"}
              </p>
              <p className="text-sm text-slate-500">{c.label}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}