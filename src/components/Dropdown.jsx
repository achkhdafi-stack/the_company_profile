// src/components/Dropdown.jsx
import DropdownItem from "./DropdownItem";

export default function Dropdown({ items, open, onItemClick }) {
  if (!items || items.length === 0) return null;

  return (
    <ul
      className={`absolute left-0 top-full min-w-[200px] rounded-lg border border-slate-100 bg-white py-2 shadow-xl shadow-slate-900/10 transition-all duration-150 ${
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      }`}
    >
      {items.map((item) => (
        <DropdownItem
          key={item.path}
          label={item.label}
          path={item.path}
          onClick={onItemClick}
        />
      ))}
    </ul>
  );
}