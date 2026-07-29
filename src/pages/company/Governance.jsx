// src/pages/company/Governance.jsx
import {
  Scale,
  Eye as EyeIcon,
  BadgeCheck,
  UserCheck,
  Users2,
  Download,
  ShieldAlert,
  Network,
} from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";

// ---- Teks & data section, semua dalam pola { id, en } ----

const content = {
  heroTitle: { id: "Tata Kelola Perusahaan", en: "Corporate Governance" },
  introEyebrow: { id: "Good Corporate Governance", en: "Good Corporate Governance" },
  introTitle: {
    id: "Komitmen Tata Kelola yang Baik",
    en: "Commitment to Good Governance",
  },
  introDesc: {
    id: "PT Akar Emas menjalankan prinsip Good Corporate Governance (GCG) sebagai fondasi dalam setiap pengambilan keputusan, demi menjaga kepercayaan pemangku kepentingan.",
    en: "PT Akar Emas applies Good Corporate Governance (GCG) principles as the foundation for every decision, to maintain stakeholder trust.",
  },
  principlesEyebrow: { id: "Lima Prinsip", en: "Five Principles" },
  principlesTitle: { id: "Prinsip GCG (TARIF)", en: "GCG Principles (TARIF)" },
  structureEyebrow: { id: "Struktur", en: "Structure" },
  structureTitle: { id: "Struktur Tata Kelola", en: "Governance Structure" },
  pedomanTitle: { id: "Pedoman Struktur GCG", en: "GCG Structure Guidelines" },
  pedomanDesc: {
    id: "Unduh dokumen lengkap Pedoman Good Corporate Governance PT Akar Emas.",
    en: "Download the complete Good Corporate Governance Guidelines document for PT Akar Emas.",
  },
  downloadLabel: { id: "Unduh Pedoman GCG", en: "Download GCG Guidelines" },
  whistleblowingDesc: {
    id: "Temukan indikasi pelanggaran? Laporkan melalui Whistleblowing System kami.",
    en: "Found signs of a violation? Report it through our Whistleblowing System.",
  },
  whistleblowingLabel: { id: "Whistleblowing System", en: "Whistleblowing System" },
};

const principles = [
  {
    letter: "T",
    title: { id: "Transparansi", en: "Transparency" },
    desc: {
      id: "Keterbukaan dalam proses pengambilan keputusan dan penyampaian informasi material.",
      en: "Openness in decision-making processes and disclosure of material information.",
    },
    icon: EyeIcon,
  },
  {
    letter: "A",
    title: { id: "Akuntabilitas", en: "Accountability" },
    desc: {
      id: "Kejelasan fungsi, pelaksanaan, dan pertanggungjawaban organ perusahaan.",
      en: "Clarity of function, implementation, and accountability of company organs.",
    },
    icon: BadgeCheck,
  },
  {
    letter: "R",
    title: { id: "Responsibilitas", en: "Responsibility" },
    desc: {
      id: "Kepatuhan terhadap peraturan perundang-undangan dan tanggung jawab sosial.",
      en: "Compliance with laws and regulations, and social responsibility.",
    },
    icon: Scale,
  },
  {
    letter: "I",
    title: { id: "Independensi", en: "Independence" },
    desc: {
      id: "Pengelolaan perusahaan secara profesional tanpa benturan kepentingan.",
      en: "Professional company management free from conflicts of interest.",
    },
    icon: UserCheck,
  },
  {
    letter: "F",
    title: { id: "Kewajaran", en: "Fairness" },
    desc: {
      id: "Kesetaraan dan keadilan dalam memenuhi hak-hak pemangku kepentingan.",
      en: "Equality and fairness in fulfilling stakeholders' rights.",
    },
    icon: Users2,
  },
];

const structure = [
  {
    title: {
      id: "Rapat Umum Pemegang Saham (RUPS)",
      en: "General Meeting of Shareholders (GMS)",
    },
    desc: {
      id: "Organ tertinggi pemegang keputusan strategis perusahaan.",
      en: "The highest organ holding the company's strategic decisions.",
    },
  },
  {
    title: { id: "Dewan Komisaris", en: "Board of Commissioners" },
    desc: {
      id: "Mengawasi jalannya pengelolaan perusahaan oleh Direksi.",
      en: "Oversees company management carried out by the Board of Directors.",
    },
  },
  {
    title: { id: "Dewan Direksi", en: "Board of Directors" },
    desc: {
      id: "Bertanggung jawab atas pengelolaan operasional perusahaan sehari-hari.",
      en: "Responsible for the company's day-to-day operational management.",
    },
  },
  {
    title: {
      id: "Komite Audit & Unit Kepatuhan",
      en: "Audit Committee & Compliance Unit",
    },
    desc: {
      id: "Mendukung pengawasan independen dan kepatuhan tata kelola.",
      en: "Supports independent oversight and governance compliance.",
    },
  },
];

export default function Governance() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHero
        image="/assets/governance/governance-hero.jpg"
        title={content.heroTitle[language]}
      />

      {/* Intro */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <SectionHeader
            icon={Scale}
            eyebrow={content.introEyebrow[language]}
            title={content.introTitle[language]}
            desc={content.introDesc[language]}
          />
        </div>
      </section>

      {/* 5 prinsip GCG */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeader
            icon={BadgeCheck}
            eyebrow={content.principlesEyebrow[language]}
            title={content.principlesTitle[language]}
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title.id}
                  className="relative overflow-hidden rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="absolute -right-1 -top-2 text-5xl font-black text-slate-50">
                    {p.letter}
                  </span>
                  <div className="relative mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="relative mt-4 text-sm font-bold text-slate-900">
                    {p.title[language]}
                  </h3>
                  <p className="relative mt-2 text-xs leading-relaxed text-slate-500">
                    {p.desc[language]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Struktur tata kelola */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <SectionHeader
            icon={Network}
            eyebrow={content.structureEyebrow[language]}
            title={content.structureTitle[language]}
          />

          <div className="mt-12 space-y-4 border-l-2 border-slate-100 pl-8">
            {structure.map((s, i) => (
              <div key={s.title.id} className="relative">
                <span className="absolute -left-[39px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white ring-4 ring-white">
                  {i + 1}
                </span>
                <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                  {s.title[language]}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  {s.desc[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pedoman & Whistleblowing */}
      <section className="bg-slate-900 py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              {content.pedomanTitle[language]}
            </h3>
            <p className="mt-2 max-w-md text-sm text-slate-300">
              {content.pedomanDesc[language]}
            </p>
          </div>
          <a
            href="/assets/governance/pedoman-gcg.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <Download className="h-4 w-4" />
            {content.downloadLabel[language]}
          </a>
        </div>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-4 border-t border-slate-800 px-4 pt-10 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-6 w-6 text-red-500" />
            <p className="text-sm text-slate-300">
              {content.whistleblowingDesc[language]}
            </p>
          </div>
          <a
            href="/whistleblowing"
            className="inline-flex items-center gap-2 rounded-md border border-slate-600 px-5 py-2.5 text-sm font-medium text-white transition hover:border-red-500 hover:text-red-400"
          >
            {content.whistleblowingLabel[language]}
          </a>
        </div>
      </section>
    </div>
  );
}