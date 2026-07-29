// src/components/Sidebar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import menu from "../data/menu";
import { useLanguage } from "../context/LanguageContext";

export default function Sidebar({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);
  const { language, toggleLanguage } = useLanguage();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-slate-900/50 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-72 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <span className="font-bold text-slate-800">Menu</span>
          <div className="flex items-center gap-3">
            {/* Toggle bahasa */}
            <div className="flex items-center gap-1 text-xs font-semibold uppercase">
              <button
                onClick={() => language !== "id" && toggleLanguage()}
                className={language === "id" ? "text-red-600" : "text-slate-400"}
              >
                ID
              </button>
              <span className="text-slate-300">/</span>
              <button
                onClick={() => language !== "en" && toggleLanguage()}
                className={language === "en" ? "text-red-600" : "text-slate-400"}
              >
                EN
              </button>
            </div>

            <button
              onClick={onClose}
              aria-label="Tutup menu"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <ul className="px-2 py-3">
          {menu.map((item) => (
            <li key={item.path} className="border-b border-slate-50 last:border-none">
              <div className="flex items-center justify-between">
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex-1 px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "font-semibold text-red-600 underline underline-offset-4"
                        : "text-slate-700"
                    }`
                  }
                >
                  {item.label[language]}
                </NavLink>
                {item.children && (
                  <button
                    onClick={() =>
                      setExpanded(expanded === item.path ? null : item.path)
                    }
                    className="p-3 text-slate-400"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expanded === item.path ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>

              {item.children && expanded === item.path && (
                <ul className="bg-slate-50 pb-2">
                  {item.children.map((child) => (
                    <li key={child.path}>
                      <NavLink
                        to={child.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `block px-8 py-2 text-sm transition-colors ${
                            isActive
                              ? "font-semibold text-red-600 underline underline-offset-4"
                              : "text-slate-600"
                          }`
                        }
                      >
                        {child.label[language]}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}