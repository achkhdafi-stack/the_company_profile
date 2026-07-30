// src/pages/admin/AdminLayout.jsx
import { NavLink, Outlet } from "react-router-dom";
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
  Settings,
  LayoutDashboard,
} from "lucide-react";

const menuItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/news", label: "Berita", icon: Newspaper },
  { to: "/admin/articles", label: "Artikel", icon: FileText },
  { to: "/admin/journal", label: "Majalah", icon: BookOpen },
  { to: "/admin/products", label: "Produk", icon: Package },
  { to: "/admin/tenders", label: "Pengadaan", icon: Gavel },
  { to: "/admin/board-members", label: "Manajemen", icon: Users },
  { to: "/admin/certifications", label: "Sertifikasi", icon: BadgeCheck },
  { to: "/admin/awards", label: "Penghargaan", icon: Trophy },
  { to: "/admin/subsidiaries", label: "Anak Perusahaan", icon: Building2 },
];

export default function AdminLayout() {
  return (
    // h-screen + overflow-hidden di root: seluruh halaman admin
    // TIDAK ikut scroll bareng, cuma <main> di bawah yang scroll sendiri.
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar - fixed, tidak pernah ikut scroll */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-100 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-red-600 text-sm font-black italic text-white">
            A
          </div>
          <span className="font-bold text-slate-800">Admin Panel</span>
        </div>

        {/* Nav utama - kalau item terlalu banyak untuk layar pendek,
            ini yang boleh scroll sendiri, bukan seluruh sidebar */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-red-50 text-red-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Pengaturan - menggantikan tombol Keluar terpisah.
            Logout sekarang ada DI DALAM halaman Pengaturan. */}
        <div className="shrink-0 border-t border-slate-100 p-3">
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-red-50 text-red-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <Settings className="h-4 w-4" />
            Pengaturan
          </NavLink>
        </div>
      </aside>

      {/* Konten - HANYA bagian ini yang scroll */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}