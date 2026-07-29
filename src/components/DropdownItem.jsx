// src/components/DropdownItem.jsx
import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function DropdownItem({ label, path, onClick }) {
  const { language } = useLanguage();

  return (
    <li>
      <NavLink
        to={path}
        onClick={onClick}
        className={({ isActive }) =>
          `block px-4 py-2.5 text-sm transition-colors hover:text-red-600 hover:underline hover:underline-offset-4 ${
            isActive
              ? "font-semibold text-red-600 underline underline-offset-4"
              : "text-slate-700"
          }`
        }
      >
        {label[language]}
      </NavLink>
    </li>
  );
}