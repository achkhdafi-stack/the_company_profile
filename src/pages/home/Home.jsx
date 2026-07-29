// src/pages/home/Home.jsx
import { useEffect, useState } from "react";
import { Play, ArrowRight, Download } from "lucide-react";
import Hero from "../../components/Hero";
import { useLanguage } from "../../context/LanguageContext";
// Navbar & Footer TIDAK diimport di sini karena sudah dirender
// satu kali di layout global (App.jsx / Layout.jsx).
// Kalau project kamu TIDAK punya layout global, kembalikan 2 import
// di atas dan pasang <Navbar /> / <Footer /> lagi di bawah.

// ---- Teks statis (label, judul, deskripsi) dalam 2 bahasa ----
// Pola: setiap teks disimpan sebagai objek { id, en }, lalu dipanggil
// dengan text.field[language] di JSX.

const content = {
  holdingLabel: {
    id: "BUMN Industri Pertahanan",
    en: "State-Owned Defense Industry",
  },
  memberOf: {
    id: "(Member of DEFEND ID)",
    en: "(Member of DEFEND ID)",
  },
  playVideoLabel: {
    id: "Putar video profil",
    en: "Play profile video",
  },
  profileTitle: { id: "Profil", en: "Profile" },
  profileDesc: {
    id: "PT Akar Emas bergerak di bidang teknologi, bisnis, dan solusi digital untuk mendukung pertumbuhan perusahaan yang modern dan berkelanjutan.",
    en: "PT Akar Emas operates in technology, business, and digital solutions to support modern and sustainable company growth.",
  },
  readMore: { id: "Baca Selanjutnya", en: "Read More" },
  techBusinessTitle: {
    id: "Teknologi & Bisnis",
    en: "Technology & Business",
  },
  annualReportLabel: {
    id: "Annual Report 2024",
    en: "Annual Report 2024",
  },
  annualReportTitle: {
    id: "Transformasi Pertahanan Menuju Masa Depan",
    en: "Transforming Defense Toward the Future",
  },
  download: { id: "Unduh", en: "Download" },
  newsTitle: { id: "Berita", en: "News" },
  gcgTitle: {
    id: "Pedoman Struktur GCG",
    en: "GCG Structure Guidelines",
  },
  gcgDesc: {
    id: "Panduan Pedoman Struktur Corporate Governance PT Akar Emas dalam menjalankan pengelolaan perusahaan yang bersih dan berlandaskan Good Corporate Governance.",
    en: "PT Akar Emas's Corporate Governance Structure guidelines for running clean company management based on Good Corporate Governance.",
  },
  readFurther: { id: "Baca Selengkapnya", en: "Read Further" },
  childCompaniesTitle: {
    id: "Anak Perusahaan Akar Emas",
    en: "Akar Emas Subsidiaries",
  },
};

// ---- Data section (nanti bisa dipindah ke data/ atau fetch dari API/CMS) ----

const subsidiaries = [
  { name: "Dahana", logo: "/assets/logos/dahana.png" },
  { name: "Pindad", logo: "/assets/logos/pindad.png" },
  { name: "Dirgantara Indonesia", logo: "/assets/logos/dirgantara.png" },
  { name: "PAL Indonesia", logo: "/assets/logos/pal.png" },
];

const techBusiness = [
  {
    title: { id: "Radar Pertahanan", en: "Defense Radar" },
    image: "/assets/tech/radar.jpg",
  },
  {
    title: { id: "Sistem Perkeretaapian", en: "Railway Systems" },
    image: "/assets/tech/railway.jpg",
  },
  {
    title: { id: "Energi Terbarukan", en: "Renewable Energy" },
    image: "/assets/tech/solar.jpg",
  },
  {
    title: { id: "Sistem Simulator & Kokpit", en: "Simulator & Cockpit Systems" },
    image: "/assets/tech/cockpit.jpg",
  },
];

const childCompanies = [
  { name: "Akar Emas Teknologi", logo: "/assets/logos/child-teknologi.png" },
  { name: "Akar Emas Global", logo: "/assets/logos/child-global.png" },
  { name: "Akar Emas Edukasi (SEI)", logo: "/assets/logos/child-sei.png" },
  { name: "Akar Emas Rekayasa (RS)", logo: "/assets/logos/child-rs.png" },
  { name: "Akar Emas Digital", logo: "/assets/logos/child-digital.png" },
];

// berapa logo tampil sekaligus per "halaman" carousel
const LOGOS_PER_PAGE = 4;

const news = [
  {
    title: {
      id: "Ancaman Sampah Sungai Tak Bisa Ditunda, PT Akar Emas Ajak Warga Bergerak Lewat Aksi BEWASA",
      en: "River Waste Threat Can't Wait, PT Akar Emas Invites Residents to Act Through BEWASA Campaign",
    },
    excerpt: {
      id: "Bandung, 17 Juli 2026 — Tumpukan sampah dan vegetasi liar yang menyumbat aliran sungai masih menjadi salah satu penyebab meningkatnya risiko banjir di musim hujan...",
      en: "Bandung, July 17, 2026 — Piles of waste and wild vegetation clogging river flow remain one of the causes of increased flood risk during the rainy season...",
    },
    date: { id: "17 Juli 2026", en: "July 17, 2026" },
    image: "/assets/news/bewasa.jpg",
    href: "/media/berita/bewasa",
  },
  {
    title: {
      id: "Akar Emas Perkuat Kapabilitas Ground Control Interception Radar untuk Mendukung Kesiapsiagaan Pertahanan Udara Nasional",
      en: "Akar Emas Strengthens Ground Control Interception Radar Capability to Support National Air Defense Readiness",
    },
    excerpt: {
      id: "Banjarbaru, 16 Juli 2026 — PT Akar Emas terus memperkuat kapabilitas teknologi pertahanan udara nasional melalui implementasi Ground Control...",
      en: "Banjarbaru, July 16, 2026 — PT Akar Emas continues to strengthen national air defense technology capability through Ground Control implementation...",
    },
    date: { id: "16 Juli 2026", en: "July 16, 2026" },
    image: "/assets/news/radar.jpg",
    href: "/media/berita/gcir",
  },
  {
    title: {
      id: "PT Akar Emas Perkuat Hilirisasi Mineral melalui Pengembangan Advanced Materials",
      en: "PT Akar Emas Strengthens Mineral Downstreaming Through Advanced Materials Development",
    },
    excerpt: {
      id: "Jakarta, 9 Juli 2026 — PT Akar Emas menegaskan komitmennya dalam memperkuat hilirisasi industri nasional melalui pengembangan advanced materials...",
      en: "Jakarta, July 9, 2026 — PT Akar Emas reaffirms its commitment to strengthening national industrial downstreaming through advanced materials development...",
    },
    date: { id: "9 Juli 2026", en: "July 9, 2026" },
    image: "/assets/news/materials.jpg",
    href: "/media/berita/advanced-materials",
  },
];

export default function Home() {
  const { language } = useLanguage();
  const totalPages = Math.ceil(childCompanies.length / LOGOS_PER_PAGE);
  const [childPage, setChildPage] = useState(0);

  useEffect(() => {
    if (totalPages <= 1) return;
    const t = setInterval(() => {
      setChildPage((p) => (p + 1) % totalPages);
    }, 4000);
    return () => clearInterval(t);
  }, [totalPages]);

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      {/* Holding Danantara */}
      <section className="border-b border-slate-100 py-10">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4">
          <img
            src="/assets/logos/danantara-indonesia.png"
            alt="Danantara Indonesia"
            className="h-10 w-auto opacity-90"
          />
        </div>
      </section>

      {/* BUMN Industri Pertahanan / DEFEND ID + anak usaha */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-lg font-medium text-slate-500">
            {content.holdingLabel[language]}{" "}
            <span className="font-semibold text-slate-700">
              {content.memberOf[language]}
            </span>
          </h2>

          <div className="mt-6 flex items-center justify-center gap-6">
            <img
              src="/assets/logos/defend-id.png"
              alt="DEFEND ID - Defence Industry Indonesia"
              className="h-14 w-auto"
            />
            <span className="h-10 w-px bg-slate-200" />
            <img
              src="/assets/logos/akar-emas.png"
              alt="PT Akar Emas"
              className="h-14 w-auto"
            />
          </div>

          <div className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-4">
            {subsidiaries.map((s) => (
              <div key={s.name} className="flex items-center justify-center">
                <img
                  src={s.logo}
                  alt={s.name}
                  title={s.name}
                  className="h-12 w-auto grayscale transition hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profil */}
      <section className="bg-gradient-to-r from-red-800 via-red-700 to-red-600">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 lg:grid-cols-2 lg:px-8">
          {/* Video */}
          <button
            aria-label={content.playVideoLabel[language]}
            className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-slate-900"
          >
            <img
              src="/assets/profile/video-thumbnail.jpg"
              alt={content.playVideoLabel[language]}
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 transition group-hover:scale-105">
              <Play className="h-6 w-6 fill-red-600 text-red-600" />
            </span>
          </button>

          {/* Text */}
          <div className="text-white">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {content.profileTitle[language]}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-red-50 sm:text-base">
              {content.profileDesc[language]}
            </p>
            <a
              href="/company/profile"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {content.readMore[language]}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Teknologi & Bisnis */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-800">
            {content.techBusinessTitle[language]}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {techBusiness.map((t) => (
              <a
                key={t.title.id}
                href="/technology"
                className="group relative aspect-[16/10] overflow-hidden rounded-xl"
              >
                <img
                  src={t.image}
                  alt={t.title[language]}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/0 to-transparent" />
                <span className="absolute bottom-4 left-4 text-sm font-semibold text-white">
                  {t.title[language]}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Report */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 lg:flex-row lg:justify-center lg:gap-16">
          <img
            src="/assets/annual-report/cover-2024.jpg"
            alt={content.annualReportTitle[language]}
            className="h-72 w-auto rounded-md shadow-xl"
          />
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
              {content.annualReportLabel[language]}
            </p>
            <h3 className="mt-2 max-w-sm text-2xl font-bold text-slate-800">
              {content.annualReportTitle[language]}
            </h3>
            <a
              href="/assets/annual-report/annual-report-2024.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <Download className="h-4 w-4" />
              {content.download[language]}
            </a>
          </div>
        </div>
      </section>

      {/* Berita */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-slate-800">
            {content.newsTitle[language]}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 transition hover:shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title[language]}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-2 text-base font-bold text-slate-800 group-hover:text-red-600">
                    {item.title[language]}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-500">
                    {item.excerpt[language]}
                  </p>
                  <span className="mt-4 text-xs font-medium text-slate-400">
                    {item.date[language]}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pedoman Struktur GCG */}
      <section className="relative overflow-hidden py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/assets/gcg/gcg-background.jpg)" }}
        />
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {content.gcgTitle[language]}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
            {content.gcgDesc[language]}
          </p>
          <a
            href="/company/governance"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            {content.readFurther[language]}
          </a>
        </div>
      </section>

      {/* Anak Perusahaan */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-800 sm:text-3xl">
            {content.childCompaniesTitle[language]}
          </h2>

          <div className="relative mt-10 overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${childPage * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIdx) => (
                <div
                  key={pageIdx}
                  className="grid w-full shrink-0 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
                >
                  {childCompanies
                    .slice(
                      pageIdx * LOGOS_PER_PAGE,
                      pageIdx * LOGOS_PER_PAGE + LOGOS_PER_PAGE
                    )
                    .map((c) => (
                      <div
                        key={c.name}
                        className="flex flex-col items-center gap-3"
                      >
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-slate-100 bg-white shadow-md">
                          <img
                            src={c.logo}
                            alt={c.name}
                            title={c.name}
                            className="h-14 w-14 object-contain"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setChildPage(i)}
                  aria-label={`Page ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === childPage ? "w-6 bg-red-600" : "w-2 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}