// src/pages/technology/Transportation.jsx
import { Link } from "react-router-dom";
import { TrainFront, Signpost, Ticket, MonitorSmartphone, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";

// ---- Teks & data section, semua dalam pola { id, en } ----

const content = {
  heroTitle: { id: "Transportasi", en: "Transportation" },
  eyebrow: { id: "Teknologi & Bisnis", en: "Technology & Business" },
  title: { id: "Transportasi", en: "Transportation" },
  desc: {
    id: "PT Akar Emas mendukung pengembangan sistem transportasi massal yang aman, efisien, dan terintegrasi — mulai dari persinyalan kereta, sistem tiket elektronik, hingga informasi penumpang real-time.",
    en: "PT Akar Emas supports the development of safe, efficient, and integrated mass transit systems — from railway signaling and electronic ticketing to real-time passenger information.",
  },
  ctaLabel: { id: "Ajukan Kerja Sama", en: "Propose Partnership" },
  introImageAlt: {
    id: "Teknologi Transportasi PT Akar Emas",
    en: "PT Akar Emas Transportation Technology",
  },
  solutionsEyebrow: { id: "Lini Solusi", en: "Solution Lines" },
  solutionsTitle: {
    id: "Solusi Teknologi Transportasi",
    en: "Transportation Technology Solutions",
  },
  projectsEyebrow: { id: "Portofolio", en: "Portfolio" },
  projectsTitle: { id: "Proyek Unggulan", en: "Featured Projects" },
  advantagesEyebrow: { id: "Mengapa Kami", en: "Why Us" },
  advantagesTitle: { id: "Keunggulan", en: "Advantages" },
};

const solutions = [
  {
    title: { id: "Sistem Persinyalan Kereta", en: "Railway Signaling System" },
    desc: {
      id: "Teknologi persinyalan untuk keselamatan dan efisiensi operasional perkeretaapian.",
      en: "Signaling technology for railway operational safety and efficiency.",
    },
    icon: Signpost,
  },
  {
    title: { id: "Sistem Tiket Elektronik", en: "Electronic Ticketing System" },
    desc: {
      id: "Solusi tiket digital dan gerbang otomatis untuk transportasi publik.",
      en: "Digital ticketing and automated gate solutions for public transportation.",
    },
    icon: Ticket,
  },
  {
    title: {
      id: "Sistem Informasi Penumpang",
      en: "Passenger Information System",
    },
    desc: {
      id: "Papan informasi dan pengumuman real-time di stasiun maupun dalam kereta.",
      en: "Real-time information boards and announcements at stations and on trains.",
    },
    icon: MonitorSmartphone,
  },
  {
    title: {
      id: "Integrasi Sistem Perkeretaapian",
      en: "Railway System Integration",
    },
    desc: {
      id: "Integrasi menyeluruh sistem operasional untuk mendukung mobilitas massal.",
      en: "Comprehensive operational system integration to support mass mobility.",
    },
    icon: TrainFront,
  },
];

const projects = [
  {
    title: { id: "Sistem Persinyalan MRT", en: "MRT Signaling System" },
    desc: {
      id: "Implementasi sistem persinyalan modern untuk mendukung operasional transportasi massal perkotaan.",
      en: "Implementation of a modern signaling system to support urban mass transit operations.",
    },
    image: "/assets/technology/transportation/signaling-project.jpg",
  },
  {
    title: { id: "Gerbang Tiket Elektronik", en: "Electronic Ticket Gates" },
    desc: {
      id: "Pemasangan sistem gerbang tiket otomatis di jaringan stasiun.",
      en: "Installation of automated ticket gate systems across the station network.",
    },
    image: "/assets/technology/transportation/gate-project.jpg",
  },
  {
    title: {
      id: "Papan Informasi Penumpang",
      en: "Passenger Information Display",
    },
    desc: {
      id: "Sistem informasi real-time untuk kenyamanan dan keselamatan penumpang.",
      en: "Real-time information system for passenger comfort and safety.",
    },
    image: "/assets/technology/transportation/pis-project.jpg",
  },
];

const advantages = [
  {
    id: "Meningkatkan keselamatan dan keandalan operasional transportasi.",
    en: "Improves transportation operational safety and reliability.",
  },
  {
    id: "Mendukung mobilitas massal yang efisien di kawasan perkotaan.",
    en: "Supports efficient mass mobility in urban areas.",
  },
  {
    id: "Sistem dapat diintegrasikan dengan infrastruktur yang sudah ada.",
    en: "System can be integrated with existing infrastructure.",
  },
  {
    id: "Didukung layanan pemeliharaan dan dukungan teknis berkelanjutan.",
    en: "Backed by ongoing maintenance and technical support services.",
  },
];

export default function Transportation() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHero
        image="/assets/technology/transportation/transportation-hero.jpg"
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
              src="/assets/technology/transportation/transportation-intro.jpg"
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
            icon={TrainFront}
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
            icon={Signpost}
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