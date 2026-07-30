// src/pages/media/Journal.jsx
import { useEffect, useState } from "react";
import { BookOpen, Download, Eye, Loader2, AlertCircle } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";
import { supabase } from "../../lib/supabaseClient";

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
  loading: { id: "Memuat majalah...", en: "Loading journal..." },
  errorMsg: {
    id: "Gagal memuat majalah. Coba muat ulang halaman.",
    en: "Failed to load journal. Try reloading the page.",
  },
  emptyAll: {
    id: "Belum ada edisi majalah yang dipublikasikan.",
    en: "No journal issues have been published yet.",
  },
};

function formatDate(dateStr, language) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function Journal() {
  const { language } = useLanguage();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchIssues() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("journal_issues")
        .select("*")
        .order("issue_date", { ascending: false });
      if (!isMounted) return;
      if (error) {
        console.error("Gagal fetch journal_issues:", error);
        setError(error);
      } else {
        setIssues(data || []);
      }
      setLoading(false);
    }
    fetchIssues();
    return () => { isMounted = false; };
  }, []);

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
          ) : issues.length === 0 ? (
            <p className="py-16 text-center text-sm text-slate-500">{content.emptyAll[language]}</p>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {issues.map((issue) => {
                const edition = language === "id" ? issue.edition_id : issue.edition_en;
                const title = language === "id" ? issue.title_id : issue.title_en;
                return (
                  <div
                    key={issue.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                      <img
                        src={issue.cover_url || "/assets/media/journal/placeholder.jpg"}
                        alt={title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-semibold text-white">
                        {edition}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="line-clamp-2 text-sm font-bold text-slate-900">{title}</h3>
                      <p className="mt-1 text-xs text-slate-400">
                        {formatDate(issue.issue_date, language)}
                      </p>

                      <div className="mt-3 flex gap-2">
                        <a
                          href={issue.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-1 rounded-md border border-slate-200 py-1.5 text-xs font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          {content.readLabel[language]}
                        </a>
                        <a
                          href={issue.file_url}
                          download
                          className="inline-flex flex-1 items-center justify-center gap-1 rounded-md bg-red-600 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
                        >
                          <Download className="h-3.5 w-3.5" />
                          {content.downloadLabel[language]}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}