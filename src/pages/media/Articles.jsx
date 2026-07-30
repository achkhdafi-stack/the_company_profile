// src/pages/media/Articles.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";
import { supabase } from "../../lib/supabaseClient";

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
  emptyAll: {
    id: "Belum ada artikel yang dipublikasikan.",
    en: "No articles have been published yet.",
  },
  readArticle: { id: "Baca Artikel", en: "Read Article" },
  loading: { id: "Memuat artikel...", en: "Loading articles..." },
  errorMsg: {
    id: "Gagal memuat artikel. Coba muat ulang halaman.",
    en: "Failed to load articles. Try reloading the page.",
  },
};

const topics = [
  { key: "all", label: { id: "Semua Topik", en: "All Topics" } },
  { key: "teknologi", label: { id: "Teknologi", en: "Technology" } },
  { key: "bisnis", label: { id: "Bisnis", en: "Business" } },
  { key: "keberlanjutan", label: { id: "Keberlanjutan", en: "Sustainability" } },
];

function formatDate(dateStr, language) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Articles() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTopic, setActiveTopic] = useState("all");

  useEffect(() => {
    let isMounted = true;
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("published_date", { ascending: false });
      if (!isMounted) return;
      if (error) {
        console.error("Gagal fetch articles:", error);
        setError(error);
      } else {
        setArticles(data || []);
      }
      setLoading(false);
    }
    fetchArticles();
    return () => { isMounted = false; };
  }, []);

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
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-20 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="text-sm">{content.loading[language]}</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 py-20 text-red-500">
              <AlertCircle className="h-8 w-8" />
              <p className="text-sm">{content.errorMsg[language]}</p>
            </div>
          ) : articles.length === 0 ? (
            <p className="py-16 text-center text-sm text-slate-500">{content.emptyAll[language]}</p>
          ) : filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-slate-500">{content.emptyState[language]}</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a) => {
                const title = language === "id" ? a.title_id : a.title_en;
                const excerpt = language === "id" ? a.excerpt_id : a.excerpt_en;
                const readTime = language === "id" ? a.read_time_id : a.read_time_en;
                const topicLabel = topics.find((t) => t.key === a.topic)?.label[language] || a.topic;
                return (
                  <Link
                    key={a.id}
                    to={`/media/articles/${a.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={a.image_url || "/assets/media/articles/placeholder.jpg"}
                        alt={title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-red-600 backdrop-blur">
                        {topicLabel}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{formatDate(a.published_date, language)}</span>
                        {readTime && (
                          <>
                            <span>·</span>
                            <span>{readTime}</span>
                          </>
                        )}
                      </div>
                      <h3 className="mt-2 line-clamp-2 text-base font-bold text-slate-900 group-hover:text-red-600">
                        {title}
                      </h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-500">
                        {excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-600">
                        {content.readArticle[language]}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}