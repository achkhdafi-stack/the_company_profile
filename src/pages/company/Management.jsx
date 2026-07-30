// src/pages/company/Management.jsx
import { useEffect, useState } from "react";
import { Users, Loader2, AlertCircle } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";
import { supabase } from "../../lib/supabaseClient";

const content = {
  heroTitle: { id: "Manajemen", en: "Management" },
  eyebrow: { id: "Jajaran Pimpinan", en: "Leadership Team" },
  title: { id: "Manajemen PT Akar Emas", en: "PT Akar Emas Management" },
  desc: {
    id: "Dipimpin oleh tim profesional berpengalaman yang berkomitmen pada pertumbuhan berkelanjutan.",
    en: "Led by an experienced professional team committed to sustainable growth.",
  },
  loading: { id: "Memuat data...", en: "Loading data..." },
  errorMsg: { id: "Gagal memuat data. Coba muat ulang halaman.", en: "Failed to load data. Try reloading the page." },
  emptyState: { id: "Belum ada data untuk kategori ini.", en: "No data available for this category yet." },
};

const tabs = [
  { key: "direksi", label: { id: "Dewan Direksi", en: "Board of Directors" } },
  { key: "komisaris", label: { id: "Dewan Komisaris", en: "Board of Commissioners" } },
];

export default function Management() {
  const { language } = useLanguage();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("direksi");

  useEffect(() => {
    let isMounted = true;
    async function fetchMembers() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("board_members")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!isMounted) return;
      if (error) {
        console.error("Gagal fetch board_members:", error);
        setError(error);
      } else {
        setMembers(data || []);
      }
      setLoading(false);
    }
    fetchMembers();
    return () => { isMounted = false; };
  }, []);

  const filtered = members.filter((m) => m.board_type === activeTab);

  return (
    <div className="bg-white">
      <PageHero image="/assets/management/management-hero.jpg" title={content.heroTitle[language]} />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeader
            icon={Users}
            eyebrow={content.eyebrow[language]}
            title={content.title[language]}
            desc={content.desc[language]}
          />

          <div className="mx-auto mt-10 flex w-fit gap-1 rounded-full bg-slate-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  activeTab === tab.key ? "bg-red-600 text-white shadow" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label[language]}
              </button>
            ))}
          </div>

          <div className="mt-14">
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
            ) : filtered.length === 0 ? (
              <p className="py-16 text-center text-sm text-slate-500">{content.emptyState[language]}</p>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {filtered.map((person) => {
                  const name = language === "id" ? person.name_id : person.name_en;
                  const role = language === "id" ? person.role_id : person.role_en;
                  return (
                    <div key={person.id} className="text-center">
                      <div className="mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                        <img
                          src={person.photo_url || "/assets/management/placeholder.jpg"}
                          alt={name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="mt-4 text-base font-bold text-slate-900">{name}</h3>
                      <p className="mt-1 text-sm text-red-600">{role}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}