// src/pages/company/Certification.jsx
import { Award, BadgeCheck, Trophy, ExternalLink } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";

// ---- Teks & data section, semua dalam pola { id, en } ----

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
  ctaText: {
    id: "Ingin memverifikasi keabsahan sertifikat kami?",
    en: "Want to verify the authenticity of our certificates?",
  },
  ctaLink: { id: "Hubungi tim kami", en: "Contact our team" },
};

const certifications = [
  {
    name: "ISO 9001:2015",
    desc: {
      id: "Sistem Manajemen Mutu",
      en: "Quality Management System",
    },
    image: "/assets/certifications/iso-9001.jpg",
  },
  {
    name: "ISO 27001:2013",
    desc: {
      id: "Sistem Manajemen Keamanan Informasi",
      en: "Information Security Management System",
    },
    image: "/assets/certifications/iso-27001.jpg",
  },
  {
    name: "ISO 45001:2018",
    desc: {
      id: "Sistem Manajemen K3 (Keselamatan & Kesehatan Kerja)",
      en: "Occupational Health & Safety Management System",
    },
    image: "/assets/certifications/iso-45001.jpg",
  },
  {
    name: "ISO 14001:2015",
    desc: {
      id: "Sistem Manajemen Lingkungan",
      en: "Environmental Management System",
    },
    image: "/assets/certifications/iso-14001.jpg",
  },
];

const awards = [
  {
    year: "2025",
    title: {
      id: "Perusahaan Transformasi Digital Terbaik",
      en: "Best Digital Transformation Company",
    },
    org: {
      id: "Indonesia Digital Business Awards",
      en: "Indonesia Digital Business Awards",
    },
  },
  {
    year: "2024",
    title: {
      id: "50 Perusahaan Paling Terpercaya",
      en: "Top 50 Most Trusted Companies",
    },
    org: {
      id: "Corporate Governance Perception Index",
      en: "Corporate Governance Perception Index",
    },
  },
  {
    year: "2023",
    title: {
      id: "Keunggulan Inovasi Teknologi",
      en: "Excellence in Technology Innovation",
    },
    org: {
      id: "National Technology Awards",
      en: "National Technology Awards",
    },
  },
  {
    year: "2022",
    title: {
      id: "Tempat Kerja Terbaik untuk Bertumbuh",
      en: "Best Workplace for Growth",
    },
    org: {
      id: "Indonesia HR Excellence Awards",
      en: "Indonesia HR Excellence Awards",
    },
  },
];

export default function Certification() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHero
        image="/assets/certifications/certification-hero.jpg"
        title={content.heroTitle[language]}
      />

      {/* Sertifikasi */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeader
            icon={BadgeCheck}
            eyebrow={content.certEyebrow[language]}
            title={content.certTitle[language]}
            desc={content.certDesc[language]}
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((c) => (
              <div
                key={c.name}
                className="group overflow-hidden rounded-2xl border border-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex aspect-square items-center justify-center bg-slate-50 p-8">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {c.desc[language]}
                  </p>
                </div>
              </div>
            ))}
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

          <div className="mt-12 space-y-4">
            {awards.map((a) => (
              <div
                key={a.title.id}
                className="flex flex-col gap-3 rounded-xl bg-white/5 p-5 ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                    <Award className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white sm:text-base">
                      {a.title[language]}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                      {a.org[language]}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-sm font-semibold text-red-400 sm:pl-4">
                  {a.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA verifikasi */}
      <section className="py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center">
          <p className="text-sm text-slate-500">{content.ctaText[language]}</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            {content.ctaLink[language]}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}