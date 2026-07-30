// src/pages/procurement/TenderDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle, Calendar, Tag, Hash } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { supabase } from "../../lib/supabaseClient";

const content = {
  backToList: { id: "Kembali ke Pengadaan", en: "Back to Procurement" },
  loading: { id: "Memuat data pengadaan...", en: "Loading procurement data..." },
  notFoundTitle: { id: "Pengadaan Tidak Ditemukan", en: "Procurement Not Found" },
  notFoundDesc: {
    id: "Pengadaan yang kamu cari mungkin sudah dihapus atau salah tautan.",
    en: "The procurement you're looking for may have been removed or the link is incorrect.",
  },
  errorMsg: { id: "Gagal memuat data. Coba muat ulang halaman.", en: "Failed to load data. Try reloading the page." },
  codeLabel: { id: "Kode Pengadaan", en: "Procurement Code" },
  categoryLabel: { id: "Kategori", en: "Category" },
  deadlineLabel: { id: "Batas Waktu Pendaftaran", en: "Registration Deadline" },
  statusLabel: { id: "Status", en: "Status" },
  open: { id: "Dibuka", en: "Open" },
  closed: { id: "Ditutup", en: "Closed" },
  joinButton: { id: "Ikuti Pengadaan Ini", en: "Join This Procurement" },
  closedButton: { id: "Pendaftaran Ditutup", en: "Registration Closed" },
  infoText: {
    id: "Untuk mengikuti pengadaan ini, silakan hubungi tim pengadaan kami untuk informasi lebih lanjut mengenai persyaratan dan dokumen yang diperlukan.",
    en: "To join this procurement, please contact our procurement team for more information on requirements and required documents.",
  },
};

function formatDate(dateStr, language) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function TenderDetail() {
  const { id } = useParams();
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
        .from("tenders")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!isMounted) return;
      if (error) {
        console.error("Gagal fetch tender detail:", error);
        setError(error);
      } else {
        setItem(data);
      }
      setLoading(false);
    }
    fetchItem();
    return () => { isMounted = false; };
  }, [id]);

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
          to="/pengadaan"
          className="inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <ArrowLeft className="h-4 w-4" />
          {content.backToList[language]}
        </Link>
      </div>
    );
  }

  const title = language === "id" ? item.title_id : item.title_en;
  const category = language === "id" ? item.category_id : item.category_en;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8 lg:py-14">
        <Link
          to="/pengadaan"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600"
        >
          <ArrowLeft className="h-4 w-4" />
          {content.backToList[language]}
        </Link>

        <span
          className={`mt-6 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
            item.status === "open" ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500"
          }`}
        >
          {item.status === "open" ? content.open[language] : content.closed[language]}
        </span>

        <h1 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-slate-100 p-6 sm:grid-cols-3">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase text-slate-400">
              <Hash className="h-3.5 w-3.5" />
              {content.codeLabel[language]}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{item.code}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase text-slate-400">
              <Tag className="h-3.5 w-3.5" />
              {content.categoryLabel[language]}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{category}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              {content.deadlineLabel[language]}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {formatDate(item.deadline, language)}
            </p>
          </div>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-slate-600 sm:text-base">
          {content.infoText[language]}
        </p>

        <Link
          to="/contact"
          className={`mt-8 inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition ${
            item.status === "open"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "pointer-events-none bg-slate-100 text-slate-400"
          }`}
        >
          {item.status === "open" ? content.joinButton[language] : content.closedButton[language]}
        </Link>
      </div>
    </div>
  );
}