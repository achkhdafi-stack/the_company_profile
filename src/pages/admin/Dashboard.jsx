// src/pages/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Newspaper,
  FileText,
  BookOpen,
  Package,
  Gavel,
  Users,
  BadgeCheck,
  Trophy,
  Building2,
  Plus,
  Clock,
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";

const cards = [
  { table: "news", label: "Berita", icon: Newspaper, href: "/admin/news", color: "bg-red-50 text-red-600" },
  { table: "articles", label: "Artikel", icon: FileText, href: "/admin/articles", color: "bg-blue-50 text-blue-600" },
  { table: "journal_issues", label: "Majalah", icon: BookOpen, href: "/admin/journal", color: "bg-purple-50 text-purple-600" },
  { table: "products", label: "Produk", icon: Package, href: "/admin/products", color: "bg-amber-50 text-amber-600" },
  { table: "tenders", label: "Pengadaan", icon: Gavel, href: "/admin/tenders", color: "bg-green-50 text-green-600" },
  { table: "board_members", label: "Manajemen", icon: Users, href: "/admin/board-members", color: "bg-cyan-50 text-cyan-600" },
  { table: "certifications", label: "Sertifikasi", icon: BadgeCheck, href: "/admin/certifications", color: "bg-indigo-50 text-indigo-600" },
  { table: "awards", label: "Penghargaan", icon: Trophy, href: "/admin/awards", color: "bg-orange-50 text-orange-600" },
  { table: "subsidiaries", label: "Anak Perusahaan", icon: Building2, href: "/admin/subsidiaries", color: "bg-teal-50 text-teal-600" },
];

// Tabel yang dilibatkan di feed "Aktivitas Terbaru" (yang punya konten
// bertanggal jelas). Sesuaikan `titleField` dengan kolom judul tiap tabel.
const activityTables = [
  { table: "news", titleField: "title_id", href: (row) => "/admin/news", label: "Berita", icon: Newspaper },
  { table: "articles", titleField: "title_id", href: () => "/admin/articles", label: "Artikel", icon: FileText },
  { table: "products", titleField: "name_id", href: () => "/admin/products", label: "Produk", icon: Package },
  { table: "tenders", titleField: "title_id", href: () => "/admin/tenders", label: "Pengadaan", icon: Gavel },
];

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}

export default function Dashboard() {
  const { session } = useAuth();
  const [counts, setCounts] = useState({});
  const [activity, setActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

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

  useEffect(() => {
    async function fetchActivity() {
      setLoadingActivity(true);
      const allItems = [];

      for (const t of activityTables) {
        const { data } = await supabase
          .from(t.table)
          .select(`id, ${t.titleField}, created_at`)
          .order("created_at", { ascending: false })
          .limit(3);

        (data || []).forEach((row) => {
          allItems.push({
            id: `${t.table}-${row.id}`,
            title: row[t.titleField],
            createdAt: row.created_at,
            href: t.href(row),
            label: t.label,
            icon: t.icon,
          });
        });
      }

      allItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setActivity(allItems.slice(0, 8));
      setLoadingActivity(false);
    }
    fetchActivity();
  }, []);

  const totalContent = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const hour = new Date().getHours();
  const greeting = hour < 11 ? "Selamat pagi" : hour < 15 ? "Selamat siang" : hour < 18 ? "Selamat sore" : "Selamat malam";

  return (
    <div className="p-6 lg:p-10">
      {/* Header sapaan */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-red-600">{greeting} 👋</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            {session?.user?.user_metadata?.full_name || session?.user?.email || "Admin"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Total {totalContent} konten tersimpan di seluruh website.
          </p>
        </div>
        <p className="text-sm text-slate-400">
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long", day: "numeric", month: "long", year: "numeric",
          })}
        </p>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.table}
              to={c.href}
              className="rounded-2xl border border-slate-100 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {counts[c.table] ?? "…"}
              </p>
              <p className="text-sm text-slate-500">{c.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Aktivitas terbaru */}
        <div className="lg:col-span-2">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <Clock className="h-5 w-5 text-slate-400" />
            Aktivitas Terbaru
          </h2>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-white">
            {loadingActivity ? (
              <p className="p-6 text-center text-sm text-slate-400">Memuat aktivitas...</p>
            ) : activity.length === 0 ? (
              <p className="p-6 text-center text-sm text-slate-400">
                Belum ada aktivitas. Mulai tambahkan konten dari menu sidebar.
              </p>
            ) : (
              <div className="divide-y divide-slate-100">
                {activity.map((a) => {
                  const Icon = a.icon;
                  return (
                    <Link
                      key={a.id}
                      to={a.href}
                      className="flex items-center gap-3 p-4 transition hover:bg-slate-50"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-800">{a.title}</p>
                        <p className="text-xs text-slate-400">{a.label} · {timeAgo(a.createdAt)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="text-lg font-bold text-slate-900">Tambah Cepat</h2>
          <div className="mt-4 space-y-2">
            {cards.slice(0, 5).map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.table}
                  to={c.href}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:text-red-600"
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {c.label}
                  </span>
                  <Plus className="h-4 w-4 text-slate-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}