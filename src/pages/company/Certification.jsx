// src/pages/company/Certification.jsx
import { useEffect, useState } from "react";
import { Award, BadgeCheck, Trophy, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";
import { supabase } from "../../lib/supabaseClient";

const content = {
  heroTitle: { id: "Sertifikasi & Penghargaan", en: "Certifications & Awards" },
  certEyebrow: { id: "Standar Kualitas", en: "Quality Standards" },
  certTitle: { id: "Sertifikasi", en: "Certifications" },
  certDesc: {
    id: "Bukti komitmen PT Akar Emas terhadap mutu, keamanan, dan pengelolaan yang bertanggung jawab.",
    en: "Proof of PT Akar Emas's commitment to quality, security, and responsible management.",
  },
  awardEyebrow: { id: "Rekam Jejak", en: "Track Record" },
  awardTitle: { id: "Penghargaan", en: "Awards" },
  ctaText: { id: "Ingin memverifikasi keabsahan sertifikat kami?", en: "Want to verify the authenticity of our certificates?" },
  ctaLink: { id: "Hubungi tim kami", en: "Contact our team" },
  loading: { id: "Memuat data...", en: "Loading data..." },
  errorMsg: { id: "Gagal memuat data. Coba muat ulang halaman.", en: "Failed to load data. Try reloading the page." },
  emptyCert: { id: "Belum ada sertifikasi yang ditambahkan.", en: "No certifications added yet." },
  emptyAward: { id: "Belum ada penghargaan yang ditambahkan.", en: "No awards added yet." },
};

export default function Certification() {
  const { language } = useLanguage();
  const [certifications, setCertifications] = useState([]);
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setLoading(true);
      setError(null);

      const [certRes, awardRes] = await Promise.all([
        supabase.from("certifications").select("*").order("sort_order", { ascending: true }),
        supabase.from("awards").select("*").order("year", { ascending: false }),
      ]);

      if (!isMounted) return;

      if (certRes.error || awardRes.error) {
        console.error("Gagal fetch certifications/awards:", certRes.error || awardRes.error);
        setError(certRes.error || awardRes.error);
      } else {
        setCertifications(certRes.data || []);
        setAwards(awardRes.data || []);
      }
      setLoading(false);
    }
    fetchData();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="bg-white">
      <PageHero image="/assets/certifications/certification-hero.jpg" title={content.heroTitle[language]} />

      {/* Sertifikasi */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeader
            icon={BadgeCheck}
            eyebrow={content.certEyebrow[language]}
            title={content.certTitle[language]}
            desc={content.certDesc[language]}
          />

          <div className="mt-12">
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
            ) : certifications.length === 0 ? (
              <p className="py-16 text-center text-sm text-slate-500">{content.emptyCert[language]}</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {certifications.map((c) => {
                  const desc = language === "id" ? c.desc_id : c.desc_en;
                  return (
                    <div key={c.id} className="group overflow-hidden rounded-2xl border border-slate-100 transition hover:-translate-y-1 hover:shadow-xl">
                      <div className="flex aspect-square items-center justify-center bg-slate-50 p-8">
                        <img
                          src={c.image_url || "/assets/certifications/placeholder.jpg"}
                          alt={c.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-sm font-bold text-slate-900">{c.name}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">{desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Penghargaan */}
      <section className="bg-slate-900 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <SectionHeader
            icon={Trophy}
            eyebrow={content.awardEyebrow[language]}
            title={content.awardTitle[language]}
            light
          />

          <div className="mt-12">
            {!loading && !error && awards.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-400">{content.emptyAward[language]}</p>
            ) : (
              !loading && !error && (
                <div className="space-y-4">
                  {awards.map((a) => {
                    const title = language === "id" ? a.title_id : a.title_en;
                    const org = language === "id" ? a.org_id : a.org_en;
                    return (
                      <div key={a.id} className="flex flex-col gap-3 rounded-xl bg-white/5 p-5 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                            <Award className="h-5 w-5" />
                          </span>
                          <div>
                            <h3 className="text-sm font-bold text-white sm:text-base">{title}</h3>
                            <p className="mt-1 text-xs text-slate-400 sm:text-sm">{org}</p>
                          </div>
                        </div>
                        <span className="shrink-0 text-sm font-semibold text-red-400 sm:pl-4">{a.year}</span>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA verifikasi */}
      <section className="py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center">
          <p className="text-sm text-slate-500">{content.ctaText[language]}</p>
          <a href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700">
            {content.ctaLink[language]}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}