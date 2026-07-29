// src/pages/company/Vision.jsx
import { Eye, Target, Sparkles, Handshake, ShieldCheck, TrendingUp } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";

// ---- Teks & data section, semua dalam pola { id, en } ----

const content = {
  heroTitle: { id: "Visi & Misi", en: "Vision & Mission" },
  visionEyebrow: { id: "Arah Kami", en: "Our Direction" },
  visionTitle: { id: "Visi", en: "Vision" },
  visionStatement: {
    id: "\"Menjadi perusahaan teknologi, bisnis, dan solusi digital terintegrasi terdepan yang berakar kuat dan tumbuh berkelanjutan bagi Indonesia.\"",
    en: "\"To become the leading integrated technology, business, and digital solutions company, deeply rooted and sustainably growing for Indonesia.\"",
  },
  missionEyebrow: { id: "Langkah Kami", en: "Our Steps" },
  missionTitle: { id: "Misi", en: "Mission" },
  valuesEyebrow: { id: "Budaya Kerja", en: "Work Culture" },
  valuesTitle: { id: "Nilai-Nilai Perusahaan", en: "Company Values" },
  valuesDesc: {
    id: "Prinsip yang menjadi dasar setiap keputusan dan cara kerja kami.",
    en: "The principles that underpin every decision and way we work.",
  },
};

const missions = [
  {
    id: "Menghadirkan solusi teknologi yang relevan dan berdaya guna tinggi bagi mitra bisnis.",
    en: "Delivering relevant and highly effective technology solutions for business partners.",
  },
  {
    id: "Membangun model bisnis yang berkelanjutan serta memberi nilai tambah bagi pemangku kepentingan.",
    en: "Building sustainable business models that add value for stakeholders.",
  },
  {
    id: "Mengintegrasikan teknologi, proses, dan sumber daya manusia dalam satu ekosistem solusi.",
    en: "Integrating technology, processes, and human resources into a single solutions ecosystem.",
  },
  {
    id: "Mendorong inovasi berkelanjutan untuk menjawab tantangan industri masa depan.",
    en: "Driving continuous innovation to address future industry challenges.",
  },
];

const values = [
  {
    title: { id: "Integritas", en: "Integrity" },
    desc: {
      id: "Menjunjung tinggi kejujuran dan konsistensi dalam setiap tindakan.",
      en: "Upholding honesty and consistency in every action.",
    },
    icon: ShieldCheck,
  },
  {
    title: { id: "Kolaborasi", en: "Collaboration" },
    desc: {
      id: "Bekerja sama dengan mitra dan tim untuk mencapai hasil terbaik.",
      en: "Working together with partners and teams to achieve the best results.",
    },
    icon: Handshake,
  },
  {
    title: { id: "Inovasi", en: "Innovation" },
    desc: {
      id: "Terus mencari cara baru yang lebih baik dalam setiap solusi yang dihadirkan.",
      en: "Continuously seeking better new ways in every solution we deliver.",
    },
    icon: Sparkles,
  },
  {
    title: { id: "Pertumbuhan", en: "Growth" },
    desc: {
      id: "Berkomitmen pada perbaikan dan pertumbuhan berkelanjutan.",
      en: "Committed to continuous improvement and growth.",
    },
    icon: TrendingUp,
  },
];

export default function Vision() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHero
        image="/assets/company/vision-hero.jpg"
        title={content.heroTitle[language]}
      />

      {/* Visi */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <SectionHeader
            icon={Eye}
            eyebrow={content.visionEyebrow[language]}
            title={content.visionTitle[language]}
          />
          <p className="mx-auto mt-8 max-w-2xl text-xl font-semibold leading-relaxed text-slate-800 sm:text-2xl">
            {content.visionStatement[language]}
          </p>
        </div>
      </section>

      {/* Misi */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <SectionHeader
            icon={Target}
            eyebrow={content.missionEyebrow[language]}
            title={content.missionTitle[language]}
          />

          <div className="mt-12 space-y-4">
            {missions.map((m, i) => (
              <div
                key={m.id}
                className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  {m[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nilai-nilai */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeader
            icon={Sparkles}
            eyebrow={content.valuesEyebrow[language]}
            title={content.valuesTitle[language]}
            desc={content.valuesDesc[language]}
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title.id}
                  className="rounded-2xl border border-slate-100 p-6 text-center transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    {v.title[language]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {v.desc[language]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}