// src/pages/technology/Energy.jsx
import { Link } from "react-router-dom";
import { Sun, Battery, Leaf, Gauge, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";

// ---- Teks & data section, semua dalam pola { id, en } ----

const content = {
  heroTitle: { id: "Energi", en: "Energy" },
  eyebrow: { id: "Teknologi & Bisnis", en: "Technology & Business" },
  title: { id: "Energi", en: "Energy" },
  desc: {
    id: "PT Akar Emas berkontribusi pada transisi energi berkelanjutan melalui pengembangan solusi energi terbarukan, sistem penyimpanan energi, dan teknologi smart grid untuk mendukung masa depan energi yang lebih bersih dan efisien.",
    en: "PT Akar Emas contributes to a sustainable energy transition by developing renewable energy solutions, energy storage systems, and smart grid technology to support a cleaner, more efficient energy future.",
  },
  ctaLabel: { id: "Ajukan Kerja Sama", en: "Propose Partnership" },
  introImageAlt: {
    id: "Teknologi Energi PT Akar Emas",
    en: "PT Akar Emas Energy Technology",
  },
  solutionsEyebrow: { id: "Lini Solusi", en: "Solution Lines" },
  solutionsTitle: {
    id: "Solusi Teknologi Energi",
    en: "Energy Technology Solutions",
  },
  projectsEyebrow: { id: "Portofolio", en: "Portfolio" },
  projectsTitle: { id: "Proyek Unggulan", en: "Featured Projects" },
  advantagesEyebrow: { id: "Mengapa Kami", en: "Why Us" },
  advantagesTitle: { id: "Keunggulan", en: "Advantages" },
};

const solutions = [
  {
    title: {
      id: "Pembangkit Listrik Tenaga Surya",
      en: "Solar Power Plants",
    },
    desc: {
      id: "Instalasi PLTS skala komersial maupun industri dengan efisiensi tinggi.",
      en: "High-efficiency solar power installations for commercial and industrial scale.",
    },
    icon: Sun,
  },
  {
    title: { id: "Sistem Penyimpanan Energi", en: "Energy Storage Systems" },
    desc: {
      id: "Baterai dan sistem manajemen energi untuk stabilitas pasokan listrik.",
      en: "Batteries and energy management systems for stable power supply.",
    },
    icon: Battery,
  },
  {
    title: { id: "Energi Terbarukan", en: "Renewable Energy" },
    desc: {
      id: "Solusi energi bersih yang mendukung target net-zero emission.",
      en: "Clean energy solutions supporting net-zero emission targets.",
    },
    icon: Leaf,
  },
  {
    title: { id: "Smart Grid & Monitoring", en: "Smart Grid & Monitoring" },
    desc: {
      id: "Sistem pemantauan dan distribusi energi berbasis data secara real-time.",
      en: "Real-time, data-based energy monitoring and distribution systems.",
    },
    icon: Gauge,
  },
];

const projects = [
  {
    title: { id: "PLTS Komunal 5 MW", en: "5 MW Communal Solar Plant" },
    desc: {
      id: "Pembangunan pembangkit listrik tenaga surya untuk kebutuhan energi komunitas.",
      en: "Construction of a solar power plant for community energy needs.",
    },
    image: "/assets/technology/energy/solar-project.jpg",
  },
  {
    title: {
      id: "Sistem Penyimpanan Energi Baterai",
      en: "Battery Energy Storage System",
    },
    desc: {
      id: "Implementasi Battery Energy Storage System (BESS) untuk stabilisasi jaringan.",
      en: "Implementation of a Battery Energy Storage System (BESS) for grid stabilization.",
    },
    image: "/assets/technology/energy/bess-project.jpg",
  },
  {
    title: {
      id: "Smart Metering & Monitoring",
      en: "Smart Metering & Monitoring",
    },
    desc: {
      id: "Digitalisasi pemantauan konsumsi energi untuk efisiensi operasional.",
      en: "Digitalization of energy consumption monitoring for operational efficiency.",
    },
    image: "/assets/technology/energy/smart-grid-project.jpg",
  },
];

const advantages = [
  {
    id: "Mendukung transisi energi bersih dan berkelanjutan.",
    en: "Supports a clean and sustainable energy transition.",
  },
  {
    id: "Desain sistem disesuaikan dengan kebutuhan dan kondisi lokasi.",
    en: "System design tailored to needs and site conditions.",
  },
  {
    id: "Efisiensi biaya operasional jangka panjang bagi mitra.",
    en: "Long-term operational cost efficiency for partners.",
  },
  {
    id: "Dilengkapi pemantauan performa secara real-time.",
    en: "Equipped with real-time performance monitoring.",
  },
];

export default function Energy() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHero
        image="/assets/technology/energy/energy-hero.jpg"
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
              src="/assets/technology/energy/energy-intro.jpg"
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
            icon={Leaf}
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
            icon={Sun}
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