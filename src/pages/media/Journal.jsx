// src/pages/media/Journal.jsx
import { BookOpen, Download, Eye } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";

// ---- Teks & data section, semua dalam pola { id, en } ----

const content = {
  heroTitle: { id: "Majalah", en: "Journal" },
  eyebrow: { id: "Media", en: "Media" },
  title: { id: "Majalah Akar Emas", en: "Akar Emas Journal" },
  desc: {
    id: "Kumpulan majalah terbitan berkala PT Akar Emas — insight, capaian, dan cerita di balik setiap proyek.",
    en: "A collection of PT Akar Emas's periodic publications — insights, achievements, and the stories behind every project.",
  },
  readLabel: { id: "Baca", en: "Read" },
  downloadLabel: { id: "Unduh", en: "Download" },
};

const issues = [
  {
    edition: { id: "Edisi 24", en: "Issue 24" },
    title: {
      id: "Transformasi Teknologi Menuju Masa Depan",
      en: "Technology Transformation Toward the Future",
    },
    date: { id: "Juni 2026", en: "June 2026" },
    cover: "/assets/media/journal/edisi-24.jpg",
    fileUrl: "/assets/media/journal/edisi-24.pdf",
  },
  {
    edition: { id: "Edisi 23", en: "Issue 23" },
    title: {
      id: "Inovasi Energi Terbarukan Indonesia",
      en: "Indonesia's Renewable Energy Innovation",
    },
    date: { id: "Maret 2026", en: "March 2026" },
    cover: "/assets/media/journal/edisi-23.jpg",
    fileUrl: "/assets/media/journal/edisi-23.pdf",
  },
  {
    edition: { id: "Edisi 22", en: "Issue 22" },
    title: {
      id: "Membangun Ekosistem Transportasi Cerdas",
      en: "Building a Smart Transportation Ecosystem",
    },
    date: { id: "Desember 2025", en: "December 2025" },
    cover: "/assets/media/journal/edisi-22.jpg",
    fileUrl: "/assets/media/journal/edisi-22.pdf",
  },
  {
    edition: { id: "Edisi 21", en: "Issue 21" },
    title: {
      id: "Kesiapsiagaan Teknologi Pertahanan Nasional",
      en: "National Defense Technology Readiness",
    },
    date: { id: "September 2025", en: "September 2025" },
    cover: "/assets/media/journal/edisi-21.jpg",
    fileUrl: "/assets/media/journal/edisi-21.pdf",
  },
  {
    edition: { id: "Edisi 20", en: "Issue 20" },
    title: {
      id: "Perjalanan Transformasi Digital",
      en: "The Digital Transformation Journey",
    },
    date: { id: "Juni 2025", en: "June 2025" },
    cover: "/assets/media/journal/edisi-20.jpg",
    fileUrl: "/assets/media/journal/edisi-20.pdf",
  },
  {
    edition: { id: "Edisi 19", en: "Issue 19" },
    title: {
      id: "Kolaborasi untuk Pertumbuhan Berkelanjutan",
      en: "Collaboration for Sustainable Growth",
    },
    date: { id: "Maret 2025", en: "March 2025" },
    cover: "/assets/media/journal/edisi-19.jpg",
    fileUrl: "/assets/media/journal/edisi-19.pdf",
  },
];

export default function Journal() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHero image="/assets/media/journal/journal-hero.jpg" title={content.heroTitle[language]} />

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <SectionHeader
            icon={BookOpen}
            eyebrow={content.eyebrow[language]}
            title={content.title[language]}
            desc={content.desc[language]}
          />
        </div>
      </section>

      {/* Grid cover majalah */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {issues.map((issue) => (
              <div
                key={issue.edition.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                  <img
                    src={issue.cover}
                    alt={issue.title[language]}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-semibold text-white">
                    {issue.edition[language]}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="line-clamp-2 text-sm font-bold text-slate-900">
                    {issue.title[language]}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">{issue.date[language]}</p>

                  <div className="mt-3 flex gap-2">
                    <a
                      href={issue.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-slate-200 py-1.5 text-xs font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      {content.readLabel[language]}
                    </a>
                    <a
                      href={issue.fileUrl}
                      download
                      className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-red-600 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
                    >
                      <Download className="h-3.5 w-3.5" />
                      {content.downloadLabel[language]}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}