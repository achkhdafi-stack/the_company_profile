// src/components/Footer.jsx
// Catatan: ikon media sosial dibuat sebagai SVG inline (bukan dari lucide-react)
// karena versi lucide-react terbaru sudah tidak menyediakan ikon brand
// (Facebook/Instagram/Twitter/Youtube) akibat isu trademark.

function IconFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.32C16.3 4.22 15.35 4.13 14.24 4.13c-2.31 0-3.9 1.41-3.9 4v2.37H7.8v3h2.54V21h3.16Z" />
    </svg>
  );
}

function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconX(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3H21l-6.9 7.9L22 21h-6.4l-5-6.5L4.7 21H2.6l7.3-8.3L2 3h6.5l4.6 6L18.9 3Zm-1.1 16.1h1.2L7.3 4.8H6l11.8 14.3Z" />
    </svg>
  );
}

function IconYoutube(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.6a2.7 2.7 0 0 0-1.9-1.9C18 5.2 12 5.2 12 5.2s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .4 4.4 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.4ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}

const socials = [
  { Icon: IconFacebook, href: "#", label: "Facebook" },
  { Icon: IconInstagram, href: "#", label: "Instagram" },
  { Icon: IconX, href: "#", label: "X (Twitter)" },
  { Icon: IconYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 pt-14 pb-8 text-slate-300">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h3 className="text-xl font-bold text-white">PT Akar Emas</h3>
        <p className="mt-1 text-sm text-slate-400">
          Company Profile | Teknologi &amp; Bisnis | Solusi Terintegrasi
        </p>

        <a
          href="/whistleblowing"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-600 px-5 py-2 text-xs font-medium text-slate-200 transition hover:border-red-500 hover:text-red-400"
        >
          Whistleblowing System
        </a>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-10 border-t border-slate-800 px-4 pt-10 sm:grid-cols-3">
        <div>
          <h4 className="text-sm font-semibold text-white">Tentang Kami</h4>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            PT Akar Emas bergerak di bidang teknologi, bisnis, dan solusi
            digital untuk mendukung pertumbuhan perusahaan yang modern dan
            berkelanjutan.
          </p>
        </div>

        <div className="sm:text-center">
          <h4 className="text-sm font-semibold text-white">Kontak</h4>
          <ul className="mt-3 space-y-1 text-sm text-slate-400">
            <li>Email: info@akaremasedu.id</li>
            <li>Telepon: +62 812-3456-7890</li>
            <li>Indonesia</li>
          </ul>
        </div>

        <div className="sm:text-right">
          <h4 className="text-sm font-semibold text-white">Ikuti Kami</h4>
          <div className="mt-3 flex items-center gap-3 sm:justify-end">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-red-600 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-slate-500">
        Copyright &copy; {year} PT Akar Emas | Powered by PT Akar Emas
      </p>
    </footer>
  );
}