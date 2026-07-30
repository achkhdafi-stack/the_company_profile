// src/pages/media/NewsDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle, Calendar } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { supabase } from "../../lib/supabaseClient";

const content = {
  backToList: { id: "Kembali ke Berita", en: "Back to News" },
  loading: { id: "Memuat berita...", en: "Loading news..." },
  notFoundTitle: { id: "Berita Tidak Ditemukan", en: "News Not Found" },
  notFoundDesc: {
    id: "Berita yang kamu cari mungkin sudah dihapus atau salah tautan.",
    en: "The news you're looking for may have been removed or the link is incorrect.",
  },
  errorMsg: { id: "Gagal memuat berita. Coba muat ulang halaman.", en: "Failed to load news. Try reloading the page." },
};

function formatDate(dateStr, language) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function NewsDetail() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchItem() {
      setLoading(true);
      setError(null);
      setItem(null);

      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!isMounted) return;
      if (error) {
        console.error("Gagal fetch news detail:", error);
        setError(error);
      } else {
        setItem(data);
      }
      setLoading(false);
    }
    fetchItem();
    return () => { isMounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm">{content.loading[language]}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-red-500">
        <AlertCircle className="h-8 w-8" />
        <p className="text-sm">{content.errorMsg[language]}</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-xl font-bold text-slate-900">{content.notFoundTitle[language]}</h1>
        <p className="max-w-sm text-sm text-slate-500">{content.notFoundDesc[language]}</p>
        <Link
          to="/media/news"
          className="inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <ArrowLeft className="h-4 w-4" />
          {content.backToList[language]}
        </Link>
      </div>
    );
  }

  const title = language === "id" ? item.title_id : item.title_en;
  const bodyText = (language === "id" ? item.content_id : item.content_en) ||
    (language === "id" ? item.excerpt_id : item.excerpt_en);

  return (
    <div className="bg-white">
      {/* Hero image */}
      <section className="relative h-[280px] overflow-hidden sm:h-[360px] lg:h-[420px]">
        <img
          src={item.image_url || "/assets/media/news/placeholder.jpg"}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8 lg:py-14">
        <Link
          to="/media/news"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600"
        >
          <ArrowLeft className="h-4 w-4" />
          {content.backToList[language]}
        </Link>

        <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
          <Calendar className="h-4 w-4" />
          {formatDate(item.published_date, language)}
        </div>

        <h1 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
          {title}
        </h1>

        <article className="mt-8 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          {bodyText
            ?.split("\n")
            .filter(Boolean)
            .map((paragraph, i) => <p key={i}>{paragraph}</p>) || null}
        </article>
      </div>
    </div>
  );
}