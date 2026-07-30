// src/pages/product/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { supabase } from "../../lib/supabaseClient";

const content = {
  backToList: { id: "Kembali ke Produk", en: "Back to Products" },
  loading: { id: "Memuat produk...", en: "Loading product..." },
  notFoundTitle: { id: "Produk Tidak Ditemukan", en: "Product Not Found" },
  notFoundDesc: {
    id: "Produk yang kamu cari mungkin sudah dihapus atau salah tautan.",
    en: "The product you're looking for may have been removed or the link is incorrect.",
  },
  errorMsg: { id: "Gagal memuat produk. Coba muat ulang halaman.", en: "Failed to load product. Try reloading the page." },
  ctaTitle: { id: "Tertarik dengan produk ini?", en: "Interested in this product?" },
  ctaDesc: {
    id: "Hubungi tim kami untuk konsultasi kebutuhan dan penawaran lebih lanjut.",
    en: "Contact our team for consultation on your needs and further offers.",
  },
  ctaButton: { id: "Hubungi Kami", en: "Contact Us" },
};

const categoryLabels = {
  defense: { id: "Pertahanan", en: "Defense" },
  energy: { id: "Energi", en: "Energy" },
  transportation: { id: "Transportasi", en: "Transportation" },
};

export default function ProductDetail() {
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
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!isMounted) return;
      if (error) {
        console.error("Gagal fetch product detail:", error);
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
          to="/product"
          className="inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <ArrowLeft className="h-4 w-4" />
          {content.backToList[language]}
        </Link>
      </div>
    );
  }

  const name = language === "id" ? item.name_id : item.name_en;
  const desc = language === "id" ? item.desc_id : item.desc_en;
  const categoryLabel = categoryLabels[item.category]?.[language] || item.category;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8 lg:py-14">
        <Link
          to="/product"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600"
        >
          <ArrowLeft className="h-4 w-4" />
          {content.backToList[language]}
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={item.image_url || "/assets/product/placeholder.jpg"}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
              {categoryLabel}
            </span>
            <h1 className="mt-4 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
              {name}
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              {desc}
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              {content.ctaButton[language]}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}