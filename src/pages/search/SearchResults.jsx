// src/pages/search/SearchResults.jsx
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Loader2, AlertCircle, Newspaper, FileText, Package, ArrowRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { supabase } from "../../lib/supabaseClient";

const content = {
  title: { id: "Hasil Pencarian", en: "Search Results" },
  resultsFor: { id: "Menampilkan hasil untuk", en: "Showing results for" },
  loading: { id: "Mencari...", en: "Searching..." },
  errorMsg: { id: "Gagal memuat hasil pencarian.", en: "Failed to load search results." },
  empty: {
    id: "Tidak ada hasil yang cocok. Coba kata kunci lain.",
    en: "No matching results. Try a different keyword.",
  },
  emptyQuery: {
    id: "Ketik sesuatu di kolom pencarian untuk memulai.",
    en: "Type something in the search box to get started.",
  },
  news: { id: "Berita", en: "News" },
  articles: { id: "Artikel", en: "Articles" },
  products: { id: "Produk", en: "Products" },
};

const typeConfig = {
  news: { icon: Newspaper, label: content.news, hrefBase: "/media/news" },
  articles: { icon: FileText, label: content.articles, hrefBase: "/media/articles" },
  products: { icon: Package, label: content.products, hrefBase: "/product" },
};

export default function SearchResults() {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    let isMounted = true;
    async function runSearch() {
      setLoading(true);
      setError(null);

      const pattern = `%${query}%`;

      const [newsRes, articlesRes, productsRes] = await Promise.all([
        supabase
          .from("news")
          .select("id, title_id, title_en, excerpt_id, excerpt_en, slug")
          .or(`title_id.ilike.${pattern},title_en.ilike.${pattern}`),
        supabase
          .from("articles")
          .select("id, title_id, title_en, excerpt_id, excerpt_en, slug")
          .or(`title_id.ilike.${pattern},title_en.ilike.${pattern}`),
        supabase
          .from("products")
          .select("id, name_id, name_en, desc_id, desc_en")
          .or(`name_id.ilike.${pattern},name_en.ilike.${pattern}`),
      ]);

      if (!isMounted) return;

      const anyError = newsRes.error || articlesRes.error || productsRes.error;
      if (anyError) {
        console.error("Gagal search:", anyError);
        setError(anyError);
        setLoading(false);
        return;
      }

      const combined = [
        ...(newsRes.data || []).map((r) => ({
          type: "news",
          title: language === "id" ? r.title_id : r.title_en,
          desc: language === "id" ? r.excerpt_id : r.excerpt_en,
          href: `/media/news/${r.slug}`,
        })),
        ...(articlesRes.data || []).map((r) => ({
          type: "articles",
          title: language === "id" ? r.title_id : r.title_en,
          desc: language === "id" ? r.excerpt_id : r.excerpt_en,
          href: `/media/articles/${r.slug}`,
        })),
        ...(productsRes.data || []).map((r) => ({
          type: "products",
          title: language === "id" ? r.name_id : r.name_en,
          desc: language === "id" ? r.desc_id : r.desc_en,
          href: `/product/${r.id}`,
        })),
      ];

      setResults(combined);
      setLoading(false);
    }

    runSearch();
    return () => { isMounted = false; };
  }, [query, language]);

  return (
    <div className="mx-auto min-h-[60vh] max-w-4xl px-4 py-14 lg:px-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
          <Search className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-xl font-bold text-slate-900">{content.title[language]}</h1>
          {query && (
            <p className="text-sm text-slate-500">
              {content.resultsFor[language]} <span className="font-semibold text-slate-700">"{query}"</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-10">
        {!query.trim() ? (
          <p className="py-16 text-center text-sm text-slate-500">{content.emptyQuery[language]}</p>
        ) : loading ? (
          <div className="flex flex-col items-center gap-3 py-16 text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm">{content.loading[language]}</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-3 py-16 text-red-500">
            <AlertCircle className="h-8 w-8" />
            <p className="text-sm">{content.errorMsg[language]}</p>
          </div>
        ) : results.length === 0 ? (
          <p className="py-16 text-center text-sm text-slate-500">{content.empty[language]}</p>
        ) : (
          <div className="space-y-3">
            {results.map((r, i) => {
              const Icon = typeConfig[r.type].icon;
              return (
                <Link
                  key={`${r.type}-${i}`}
                  to={r.href}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-100 p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500 group-hover:bg-red-50 group-hover:text-red-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-red-600">
                      {typeConfig[r.type].label[language]}
                    </span>
                    <h3 className="mt-1 text-sm font-bold text-slate-900 group-hover:text-red-600 sm:text-base">
                      {r.title}
                    </h3>
                    {r.desc && (
                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">{r.desc}</p>
                    )}
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 group-hover:text-red-600" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}