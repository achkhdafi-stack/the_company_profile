// src/components/SectionHeader.jsx
// Header kecil yang berulang di tiap section halaman company
// (ikon bulat + label kecil + judul + deskripsi opsional).

export default function SectionHeader({ icon: Icon, eyebrow, title, desc, light = false }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div
        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
          light ? "bg-white/10 text-red-400" : "bg-red-50 text-red-600"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <p
        className={`mt-4 text-xs font-semibold uppercase tracking-widest ${
          light ? "text-red-400" : "text-red-600"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-2 text-2xl font-bold sm:text-3xl ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {desc && (
        <p
          className={`mt-3 text-sm sm:text-base ${
            light ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}