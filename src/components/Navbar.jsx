// src/components/Navbar.jsx
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import Dropdown from "./Dropdown";
import Sidebar from "./Sidebar";
import menu from "../data/menu";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

// Class navbar item: teks abu-abu default, merah + underline saat
// hover ATAU saat halaman ini sedang aktif (isActive dari NavLink).
function navItemClass({ isActive }) {
  return `flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-red-600 hover:underline hover:underline-offset-8 ${
    isActive
      ? "text-red-600 underline underline-offset-8"
      : "text-slate-700"
  }`;
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { language, toggleLanguage } = useLanguage();
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded bg-red-600 text-xl font-black italic text-white">
              A
            </div>
            <div className="leading-tight">
              <p className="text-lg font-bold text-slate-800">Akar Emas</p>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                PT Akar Emas
              </p>
            </div>
          </Link>

          {/* Menu desktop */}
          <ul className="hidden items-center gap-1 lg:flex">
            {menu.map((item) => (
              <li
                key={item.path}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label.id)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <NavLink to={item.path} className={navItemClass}>
                  {item.label[language]}
                  {item.children && (
                    <svg className="h-3 w-3 text-slate-400" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </NavLink>
                <Dropdown
                  items={item.children}
                  open={openMenu === item.label.id}
                  onItemClick={() => setOpenMenu(null)}
                />
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search - klik untuk buka input, submit untuk cari */}
            <div className="hidden items-center lg:flex">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => {
                      if (!searchQuery) setSearchOpen(false);
                    }}
                    placeholder={language === "id" ? "Cari di web ini..." : "Search this site..."}
                    className="w-56 rounded-full border border-slate-200 py-1.5 pl-4 pr-3 text-sm outline-none transition focus:border-red-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    aria-label="Tutup pencarian"
                    className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <button
                  aria-label="Cari"
                  onClick={() => setSearchOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Toggle bahasa ID / EN */}
            <div className="hidden items-center gap-1 text-xs font-semibold uppercase lg:flex">
              <button
                onClick={() => language !== "id" && toggleLanguage()}
                className={`transition-colors ${
                  language === "id" ? "text-red-600" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                ID
              </button>
              <span className="text-slate-300">/</span>
              <button
                onClick={() => language !== "en" && toggleLanguage()}
                className={`transition-colors ${
                  language === "en" ? "text-red-600" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                EN
              </button>
            </div>

            {/* Login / Dashboard - otomatis berubah sesuai status login */}
            <Link
              to={session ? "/admin" : "/admin/login"}
              aria-label={session ? "Buka Dashboard Admin" : "Masuk Admin"}
              title={session ? "Dashboard Admin" : "Masuk Admin"}
              className="hidden h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 lg:flex"
            >
              {session ? <LayoutDashboard className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
            </Link>

            <button
              aria-label="Buka menu"
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}