// src/pages/media/Articles.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";

// ---- Teks & data section, semua dalam pola { id, en } ----

const content = {
  heroTitle: { id: "Artikel", en: "Articles" },
  eyebrow: { id: "Media", en: "Media" },
  title: { id: "Artikel & Wawasan", en: "Articles & Insights" },
  desc: {
    id: "Perspektif dan wawasan seputar teknologi, bisnis, dan keberlanjutan dari PT Akar Emas.",
    en: "Perspectives and insights on technology, business, and sustainability from PT Akar Emas.",
  },
  emptyState: {
    id: "Belum ada artikel untuk topik ini.",
    en: "No articles available for this topic yet.",
  },
  readArticle: { id: "Baca Artikel", en: "Read Article" },
};

const topics = [
  { key: "all", label: { id: "Semua Topik", en: "All Topics" } },
  { key: "teknologi", label: { id: "Teknologi", en: "Technology" } },
  { key: "bisnis", label: { id: "Bisnis", en: "Business" } },
  { key: "keberlanjutan", label: { id: "Keberlanjutan", en: "Sustainability" } },
];

const articles = [
  {
    title: {
      id: "Mengapa Sistem Radar Modern Penting bagi Pertahanan Udara Nasional",
      en: "Why Modern Radar Systems Matter for National Air Defense",
    },
    topic: "teknologi",
    topicLabel: { id: "Teknologi", en: "Technology" },
    excerpt: {
      id: "Membahas peran teknologi radar dalam menjaga kedaulatan wilayah udara dan bagaimana inovasi terus berkembang.",
      en: "Discusses the role of radar technology in safeguarding airspace sovereignty and how innovation continues to evolve.",
    },
    date: { id: "15 Juli 2026", en: "July 15, 2026" },
    readTime: { id: "6 menit baca", en: "6 min read" },
    image: "/assets/media/articles/radar-article.jpg",
    href: "/media/articles/radar-modern",
  },
  {
    title: {
      id: "Strategi Transisi Energi: Peluang dan Tantangan di Indonesia",
      en: "Energy Transition Strategy: Opportunities and Challenges in Indonesia",
    },
    topic: "keberlanjutan",
    topicLabel: { id: "Keberlanjutan", en: "Sustainability" },
    excerpt: {
      id: "Ulasan mengenai arah kebijakan energi terbarukan dan peran sektor swasta dalam mendukung transisi energi bersih.",
      en: "A review of renewable energy policy direction and the private sector's role in supporting a clean energy transition.",
    },
    date: { id: "8 Juli 2026", en: "July 8, 2026" },
    readTime: { id: "8 menit baca", en: "8 min read" },
    image: "/assets/media/articles/energy-transition.jpg",
    href: "/media/articles/transisi-energi",
  },
  {
    title: {
      id: "Membangun Model Bisnis yang Tahan Terhadap Disrupsi",
      en: "Building a Business Model Resilient to Disruption",
    },
    topic: "bisnis",
    topicLabel: { id: "Bisnis", en: "Business" },
    excerpt: {
      id: "Bagaimana perusahaan teknologi dapat merancang model bisnis yang adaptif menghadapi perubahan pasar yang cepat.",
      en: "How technology companies can design adaptive business models to face rapid market changes.",
    },
    date: { id: "1 Juli 2026", en: "July 1, 2026" },
    readTime: { id: "5 menit baca", en: "5 min read" },
    image: "/assets/media/articles/business-model.jpg",
    href: "/media/articles/model-bisnis-adaptif",
  },
  {
    title: {
      id: "Peran Smart Grid dalam Efisiensi Distribusi Energi",
      en: "The Role of Smart Grid in Energy Distribution Efficiency",
    },
    topic: "teknologi",
    topicLabel: { id: "Teknologi", en: "Technology" },
    excerpt: {
      id: "Teknologi smart grid membantu memantau dan mengelola distribusi energi secara lebih efisien dan transparan.",
      en: "Smart grid technology helps monitor and manage energy distribution more efficiently and transparently.",
    },
    date: { id: "22 Juni 2026", en: "June 22, 2026" },
    readTime: { id: "7 menit baca", en: "7 min read" },
    image: "/assets/media/articles/smart-grid-article.jpg",
    href: "/media/articles/smart-grid-efisiensi",
  },
  {
    title: {
      id: "Kolaborasi Lintas Sektor untuk Transportasi Massal yang Lebih Baik",
      en: "Cross-Sector Collaboration for Better Mass Transportation",
    },
    topic: "bisnis",
    topicLabel: { id: "Bisnis", en: "Business" },
    excerpt: {
      id: "Studi kasus kemitraan strategis dalam pengembangan infrastruktur transportasi publik di kawasan perkotaan.",
      en: "A case study of strategic partnerships in developing public transportation infrastructure in urban areas.",
    },
    date: { id: "10 Juni 2026", en: "June 10, 2026" },
    readTime: { id: "6 menit baca", en: "6 min read" },
    image: "/assets/media/articles/transport-collab.jpg",
    href: "/media/articles/kolaborasi-transportasi",
  },
  {
    title: {
      id: "Komitmen Keberlanjutan: Dari Kebijakan Menuju Aksi Nyata",
      en: "Sustainability Commitment: From Policy to Real Action",
    },
    topic: "keberlanjutan",
    topicLabel: { id: "Keberlanjutan", en: "Sustainability" },
    excerpt: {
      id: "Bagaimana perusahaan menerjemahkan komitmen keberlanjutan menjadi program nyata yang berdampak bagi masyarakat.",
      en: "How companies translate sustainability commitments into real programs that impact society.",
    },
    date: { id: "2 Juni 2026", en: "June 2, 2026" },
    readTime: { id: "5 menit baca", en: "5 min read" },
    image: "/assets/media/articles/sustainability.jpg",
    href: "/media/articles/komitmen-keberlanjutan",
  },
];

export default function Articles() {
  const { language } = useLanguage();
  const [activeTopic, setActiveTopic] = useState("all");

  const filtered = articles.filter(
    (a) => activeTopic === "all" || a.topic === activeTopic
  );

  return (
    <div className="bg-white">
      <PageHero image="/assets/media/articles/articles-hero.jpg" title={content.heroTitle[language]} />

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <SectionHeader
            icon={FileText}
            eyebrow={content.eyebrow[language]}
            title={content.title[language]}
            desc={content.desc[language]}
          />
        </div>
      </section>

      {/* Filter topik */}
      <section className="pb-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 px-4 lg:px-8">
          {topics.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTopic(t.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeTopic === t.key
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600"
              }`}
            >
              {t.label[language]}
            </button>
          ))}
        </div>
      </section>

      {/* Grid artikel */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-slate-500">
              {content.emptyState[language]}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a) => (
                <Link
                  key={a.href}
                  to={a.href}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title[language]}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-red-600 backdrop-blur">
                      {a.topicLabel[language]}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{a.date[language]}</span>
                      <span>·</span>
                      <span>{a.readTime[language]}</span>
                    </div>
                    <h3 className="mt-2 line-clamp-2 text-base font-bold text-slate-900 group-hover:text-red-600">
                      {a.title[language]}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-500">
                      {a.excerpt[language]}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-600">
                      {content.readArticle[language]}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}