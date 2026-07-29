// src/pages/media/News.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Newspaper, Search, ChevronLeft, ChevronRight, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";
import { supabase } from "../../lib/supabaseClient";

// ---- Teks statis (label UI) ----

const content = {
  heroTitle: { id: "Berita", en: "News" },
  eyebrow: { id: "Media", en: "Media" },
  title: { id: "Berita Terkini", en: "Latest News" },
  desc: {
    id: "Kabar terbaru seputar aktivitas, proyek, dan pencapaian PT Akar Emas.",
    en: "Latest updates on PT Akar Emas's activities, projects, and achievements.",
  },
  searchPlaceholder: { id: "Cari berita...", en: "Search news..." },
  emptyState: {
    id: "Tidak ada berita yang cocok dengan pencarian kamu.",
    en: "No news matches your search.",
  },
  emptyAll: {
    id: "Belum ada berita yang dipublikasikan.",
    en: "No news has been published yet.",
  },
  readMore: { id: "Baca Selengkapnya", en: "Read More" },
  loading: { id: "Memuat berita...", en: "Loading news..." },
  errorMsg: {
    id: "Gagal memuat berita. Coba muat ulang halaman.",
    en: "Failed to load news. Try reloading the page.",
  },
};

const PAGE_SIZE = 4;

// Format tanggal dari Supabase (format "YYYY-MM-DD") ke tampilan lokal
function formatDate(dateStr, language) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function News() {
  const { language } = useLanguage();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    async function fetchNews() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("published_date", { ascending: false });

      if (!isMounted) return;

      if (error) {
        console.error("Gagal fetch news:", error);
        setError(error);
      } else {
        setNewsList(data || []);
      }
      setLoading(false);
    }

    fetchNews();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = newsList.filter((n) => {
    const title = language === "id" ? n.title_id : n.title_en;
    return (title || "").toLowerCase().includes(query.toLowerCase());
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      <PageHero image="/assets/media/news/news-hero.jpg" title={content.heroTitle[language]} />

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <SectionHeader
            icon={Newspaper}
            eyebrow={content.eyebrow[language]}
            title={content.title[language]}
            desc={content.desc[language]}
          />
        </div>
      </section>

      {/* Search */}
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="relative mx-auto max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder={content.searchPlaceholder[language]}
              className="w-full rounded-full border border-slate-200 py-2.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-red-400"
            />
          </div>
        </div>
      </section>

      {/* Grid berita */}
      <section className="pb-16 lg:pb-24">
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
          ) : newsList.length === 0 ? (
            <p className="py-16 text-center text-sm text-slate-500">
              {content.emptyAll[language]}
            </p>
          ) : paginated.length === 0 ? (
            <p className="py-16 text-center text-sm text-slate-500">
              {content.emptyState[language]}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {paginated.map((item) => {
                const title = language === "id" ? item.title_id : item.title_en;
                const excerpt = language === "id" ? item.excerpt_id : item.excerpt_en;
                return (
                  <Link
                    key={item.id}
                    to={`/media/news/${item.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 transition hover:-translate-y-1 hover:shadow-xl sm:flex-row"
                  >
                    <div className="aspect-[16/10] shrink-0 overflow-hidden sm:aspect-auto sm:w-48">
                      <img
                        src={item.image_url || "/assets/media/news/placeholder.jpg"}
                        alt={title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-xs font-medium text-slate-400">
                        {formatDate(item.published_date, language)}
                      </span>
                      <h3 className="mt-2 line-clamp-2 text-base font-bold text-slate-900 group-hover:text-red-600">
                        {title}
                      </h3>
                      <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-500">
                        {excerpt}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-red-600">
                        {content.readMore[language]}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => goToPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-red-300 hover:text-red-600 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                    page === i + 1
                      ? "bg-red-600 text-white"
                      : "border border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-red-300 hover:text-red-600 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}