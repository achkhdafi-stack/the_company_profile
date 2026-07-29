// src/pages/admin/AdminLayout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

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
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-16 items-center gap-2 border-b border-slate-100 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-red-600 text-sm font-black italic text-white">
            A
          </div>
          <span className="font-bold text-slate-800">Admin Panel</span>
        </div>

        <nav className="space-y-1 p-3">
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

        <div className="absolute bottom-0 w-64 border-t border-slate-100 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}