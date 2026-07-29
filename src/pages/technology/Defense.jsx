// src/pages/technology/Defense.jsx
import { Link } from "react-router-dom";
import { Radar, Radio, ShieldHalf, Satellite, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";

// ---- Teks & data section, semua dalam pola { id, en } ----

const content = {
  heroTitle: { id: "Pertahanan", en: "Defense" },
  eyebrow: { id: "Teknologi & Bisnis", en: "Technology & Business" },
  title: { id: "Pertahanan", en: "Defense" },
  desc: {
    id: "PT Akar Emas menghadirkan solusi teknologi pertahanan yang andal untuk mendukung kesiapsiagaan dan kedaulatan nasional — mulai dari sistem radar, komunikasi taktis, hingga sistem komando dan kendali terintegrasi.",
    en: "PT Akar Emas delivers reliable defense technology solutions to support national readiness and sovereignty — from radar systems and tactical communications to integrated command and control systems.",
  },
  ctaLabel: { id: "Ajukan Kerja Sama", en: "Propose Partnership" },
  introImageAlt: {
    id: "Teknologi Pertahanan PT Akar Emas",
    en: "PT Akar Emas Defense Technology",
  },
  solutionsEyebrow: { id: "Lini Solusi", en: "Solution Lines" },
  solutionsTitle: {
    id: "Solusi Teknologi Pertahanan",
    en: "Defense Technology Solutions",
  },
  projectsEyebrow: { id: "Portofolio", en: "Portfolio" },
  projectsTitle: { id: "Proyek Unggulan", en: "Featured Projects" },
  advantagesEyebrow: { id: "Mengapa Kami", en: "Why Us" },
  advantagesTitle: { id: "Keunggulan", en: "Advantages" },
};

const solutions = [
  {
    title: { id: "Radar Pertahanan", en: "Defense Radar" },
    desc: {
      id: "Sistem radar deteksi dan pelacakan untuk pengawasan wilayah udara dan laut.",
      en: "Detection and tracking radar systems for air and sea territory surveillance.",
    },
    icon: Radar,
  },
  {
    title: { id: "Sistem Komunikasi Taktis", en: "Tactical Communication Systems" },
    desc: {
      id: "Perangkat komunikasi aman untuk mendukung koordinasi operasi lapangan.",
      en: "Secure communication devices to support field operation coordination.",
    },
    icon: Radio,
  },
  {
    title: { id: "C4I Systems", en: "C4I Systems" },
    desc: {
      id: "Command, Control, Communication, Computer & Intelligence untuk pengambilan keputusan cepat.",
      en: "Command, Control, Communication, Computer & Intelligence for rapid decision-making.",
    },
    icon: ShieldHalf,
  },
  {
    title: { id: "Sistem Satelit & Navigasi", en: "Satellite & Navigation Systems" },
    desc: {
      id: "Solusi komunikasi dan navigasi berbasis satelit untuk kebutuhan strategis.",
      en: "Satellite-based communication and navigation solutions for strategic needs.",
    },
    icon: Satellite,
  },
];

const projects = [
  {
    title: {
      id: "Ground Control Interception Radar",
      en: "Ground Control Interception Radar",
    },
    desc: {
      id: "Memperkuat kesiapsiagaan pertahanan udara nasional dengan radar deteksi jarak jauh.",
      en: "Strengthening national air defense readiness with long-range detection radar.",
    },
    image: "/assets/technology/defense/radar-project.jpg",
  },
  {
    title: {
      id: "Sistem Komunikasi Terintegrasi",
      en: "Integrated Communication System",
    },
    desc: {
      id: "Implementasi jaringan komunikasi taktis untuk mendukung operasi gabungan.",
      en: "Implementation of tactical communication networks to support joint operations.",
    },
    image: "/assets/technology/defense/comms-project.jpg",
  },
  {
    title: {
      id: "Simulator & Sistem Pelatihan",
      en: "Simulator & Training System",
    },
    desc: {
      id: "Perangkat simulasi untuk pelatihan operator sistem pertahanan.",
      en: "Simulation equipment for training defense system operators.",
    },
    image: "/assets/technology/defense/simulator-project.jpg",
  },
];

const advantages = [
  {
    id: "Dikembangkan oleh tim insinyur berpengalaman di bidang elektronika pertahanan.",
    en: "Developed by an experienced engineering team in defense electronics.",
  },
  {
    id: "Mendukung kemandirian teknologi pertahanan nasional.",
    en: "Supports national defense technology independence.",
  },
  {
    id: "Teruji dalam berbagai kondisi operasional lapangan.",
    en: "Proven in various field operational conditions.",
  },
  {
    id: "Didukung layanan purna jual dan pemeliharaan berkelanjutan.",
    en: "Backed by after-sales service and ongoing maintenance.",
  },
];

export default function Defense() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHero
        image="/assets/technology/defense/defense-hero.jpg"
        title={content.heroTitle[language]}
      />

      {/* Intro */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
              {content.eyebrow[language]}
            </p>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              {content.title[language]}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              {content.desc[language]}
            </p>
            <Link
              to="/pengadaan"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              {content.ctaLabel[language]}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/assets/technology/defense/defense-intro.jpg"
              alt={content.introImageAlt[language]}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Solusi */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeader
            icon={ShieldHalf}
            eyebrow={content.solutionsEyebrow[language]}
            title={content.solutionsTitle[language]}
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title.id}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    {s.title[language]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {s.desc[language]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proyek unggulan */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            icon={Radar}
            eyebrow={content.projectsEyebrow[language]}
            title={content.projectsTitle[language]}
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <div
                key={p.title.id}
                className="group overflow-hidden rounded-2xl border border-slate-100 transition hover:shadow-xl"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title[language]}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900">
                    {p.title[language]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {p.desc[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <SectionHeader
            icon={CheckCircle2}
            eyebrow={content.advantagesEyebrow[language]}
            title={content.advantagesTitle[language]}
            light
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {advantages.map((a) => (
              <div key={a.id} className="flex items-start gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <p className="text-sm leading-relaxed text-slate-200">{a[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}