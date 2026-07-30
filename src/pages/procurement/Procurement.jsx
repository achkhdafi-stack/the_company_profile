// src/pages/procurement/Procurement.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  FileSearch,
  Send,
  Gavel,
  CheckCircle2,
  Download,
  Mail,
  Phone,
  Search,
  Loader2,
  AlertCircle,
} from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";
import { supabase } from "../../lib/supabaseClient";

const content = {
  heroTitle: { id: "Pengadaan", en: "Procurement" },
  introEyebrow: { id: "Pengadaan Barang & Jasa", en: "Goods & Services Procurement" },
  introTitle: { id: "Pengadaan PT Akar Emas", en: "PT Akar Emas Procurement" },
  introDesc: {
    id: "Kami menjalankan proses pengadaan barang dan jasa secara transparan, adil, dan kompetitif untuk mendukung keberlangsungan operasional perusahaan.",
    en: "We conduct goods and services procurement transparently, fairly, and competitively to support the company's ongoing operations.",
  },
  processEyebrow: { id: "Alur Proses", en: "Process Flow" },
  processTitle: { id: "Proses Pengadaan", en: "Procurement Process" },
  principlesEyebrow: { id: "Prinsip Kami", en: "Our Principles" },
  principlesTitle: { id: "Prinsip Pengadaan", en: "Procurement Principles" },
  listEyebrow: { id: "Info Terkini", en: "Latest Info" },
  listTitle: { id: "Daftar Pengadaan", en: "Procurement List" },
  searchPlaceholder: { id: "Cari pengadaan...", en: "Search procurement..." },
  emptyState: { id: "Tidak ada pengadaan yang cocok.", en: "No matching procurement found." },
  emptyAll: { id: "Belum ada pengadaan yang dipublikasikan.", en: "No procurement has been published yet." },
  deadlineLabel: { id: "Batas waktu", en: "Deadline" },
  joinButton: { id: "Ikuti Pengadaan", en: "Join Procurement" },
  detailButton: { id: "Lihat Detail", en: "View Details" },
  closedButton: { id: "Ditutup", en: "Closed" },
  pedomanTitle: { id: "Pedoman Pengadaan", en: "Procurement Guidelines" },
  pedomanDesc: {
    id: "Unduh panduan lengkap prosedur dan persyaratan pengadaan barang & jasa PT Akar Emas.",
    en: "Download the complete guide to PT Akar Emas's procurement procedures and requirements.",
  },
  downloadLabel: { id: "Unduh Pedoman", en: "Download Guidelines" },
  loading: { id: "Memuat data pengadaan...", en: "Loading procurement data..." },
  errorMsg: { id: "Gagal memuat data. Coba muat ulang halaman.", en: "Failed to load data. Try reloading the page." },
};

const steps = [
  {
    title: { id: "Pengumuman", en: "Announcement" },
    desc: { id: "Kebutuhan pengadaan diumumkan secara terbuka melalui portal resmi.", en: "Procurement needs are announced openly through the official portal." },
    icon: ClipboardList,
  },
  {
    title: { id: "Pendaftaran & Dokumen", en: "Registration & Documents" },
    desc: { id: "Calon penyedia mendaftar dan melengkapi dokumen administrasi serta teknis.", en: "Prospective vendors register and complete administrative and technical documents." },
    icon: FileSearch,
  },
  {
    title: { id: "Evaluasi & Penawaran", en: "Evaluation & Bidding" },
    desc: { id: "Tim pengadaan mengevaluasi kelengkapan dokumen dan penawaran harga.", en: "The procurement team evaluates document completeness and price offers." },
    icon: Send,
  },
  {
    title: { id: "Penetapan Pemenang", en: "Winner Determination" },
    desc: { id: "Pemenang ditetapkan berdasarkan prinsip transparan, adil, dan kompetitif.", en: "Winners are determined based on principles of transparency, fairness, and competitiveness." },
    icon: Gavel,
  },
];

const principles = [
  { id: "Transparan dan terbuka bagi seluruh penyedia yang memenuhi syarat.", en: "Transparent and open to all qualified vendors." },
  { id: "Adil dan tidak diskriminatif terhadap peserta manapun.", en: "Fair and non-discriminatory toward any participant." },
  { id: "Akuntabel dan dapat dipertanggungjawabkan setiap tahapannya.", en: "Accountable and responsible at every stage." },
  { id: "Efisien dan efektif dalam penggunaan sumber daya perusahaan.", en: "Efficient and effective use of company resources." },
];

const statusFilters = [
  { key: "all", label: { id: "Semua", en: "All" } },
  { key: "open", label: { id: "Dibuka", en: "Open" } },
  { key: "closed", label: { id: "Ditutup", en: "Closed" } },
];

function formatDate(dateStr, language) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default function Procurement() {
  const { language } = useLanguage();
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function fetchTenders() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("tenders")
        .select("*")
        .order("deadline", { ascending: false });
      if (!isMounted) return;
      if (error) {
        console.error("Gagal fetch tenders:", error);
        setError(error);
      } else {
        setTenders(data || []);
      }
      setLoading(false);
    }
    fetchTenders();
    return () => { isMounted = false; };
  }, []);

  const filtered = tenders.filter((t) => {
    const title = language === "id" ? t.title_id : t.title_en;
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const matchQuery = (title || "").toLowerCase().includes(query.toLowerCase());
    return matchStatus && matchQuery;
  });

  return (
    <div className="bg-white">
      <PageHero image="/assets/procurement/procurement-hero.jpg" title={content.heroTitle[language]} />

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <SectionHeader
            icon={ClipboardList}
            eyebrow={content.introEyebrow[language]}
            title={content.introTitle[language]}
            desc={content.introDesc[language]}
          />
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeader icon={FileSearch} eyebrow={content.processEyebrow[language]} title={content.processTitle[language]} />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title.id} className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                  <span className="absolute -right-2 -top-2 text-5xl font-black text-slate-50">0{i + 1}</span>
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="relative mt-4 text-sm font-bold text-slate-900">{s.title[language]}</h3>
                  <p className="relative mt-2 text-xs leading-relaxed text-slate-500">{s.desc[language]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <SectionHeader icon={CheckCircle2} eyebrow={content.principlesEyebrow[language]} title={content.principlesTitle[language]} />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.id} className="flex items-start gap-3 rounded-xl border border-slate-100 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <p className="text-sm leading-relaxed text-slate-600">{p[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daftar pengadaan aktif */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeader icon={Gavel} eyebrow={content.listEyebrow[language]} title={content.listTitle[language]} />

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {statusFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setStatusFilter(f.key)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    statusFilter === f.key
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:text-red-600"
                  }`}
                >
                  {f.label[language]}
                </button>
              ))}
            </div>
            <div className="relative sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={content.searchPlaceholder[language]}
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-red-400"
              />
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {loading ? (
              <div className="flex flex-col items-center gap-3 py-16 text-slate-400">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="text-sm">{content.loading[language]}</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center gap-3 py-16 text-red-500">
                <AlertCircle className="h-8 w-8" />
                <p className="text-sm">{content.errorMsg[language]}</p>
              </div>
            ) : tenders.length === 0 ? (
              <p className="py-12 text-center text-sm text-slate-500">{content.emptyAll[language]}</p>
            ) : filtered.length === 0 ? (
              <p className="py-12 text-center text-sm text-slate-500">{content.emptyState[language]}</p>
            ) : (
              filtered.map((t) => {
                const title = language === "id" ? t.title_id : t.title_en;
                const category = language === "id" ? t.category_id : t.category_en;
                return (
                  <div key={t.id} className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${t.status === "open" ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500"}`}>
                          {t.status === "open" ? statusFilters[1].label[language] : statusFilters[2].label[language]}
                        </span>
                        <span className="text-xs text-slate-400">{t.code}</span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-400">{category}</span>
                      </div>
                      <h3 className="mt-2 text-sm font-bold text-slate-900 sm:text-base">
                        <Link to={`/pengadaan/${t.id}`} className="hover:text-red-600">
                          {title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {content.deadlineLabel[language]}: {formatDate(t.deadline, language)}
                      </p>
                    </div>
                    <Link
                      to={`/pengadaan/${t.id}`}
                      className={`shrink-0 rounded-md px-5 py-2.5 text-center text-sm font-semibold transition ${
                        t.status === "open" ? "bg-red-600 text-white hover:bg-red-700" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {content.detailButton[language]}
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 lg:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">{content.pedomanTitle[language]}</h3>
            <p className="mt-2 max-w-md text-sm text-slate-300">{content.pedomanDesc[language]}</p>
          </div>
          <a
            href="/assets/procurement/pedoman-pengadaan.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <Download className="h-4 w-4" />
            {content.downloadLabel[language]}
          </a>
        </div>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-6 border-t border-slate-800 px-4 pt-10 text-center sm:flex-row sm:justify-center sm:gap-12">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Mail className="h-4 w-4 text-red-500" />
            pengadaan@akaremasedu.id
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Phone className="h-4 w-4 text-red-500" />
            +62 21 0000 0000
          </div>
        </div>
      </section>
    </div>
  );
}