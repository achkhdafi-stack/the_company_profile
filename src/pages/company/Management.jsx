// src/pages/company/Management.jsx
import { useState } from "react";
import { Users } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";

// ---- Teks & data section, semua dalam pola { id, en } ----

const content = {
  heroTitle: { id: "Manajemen", en: "Management" },
  eyebrow: { id: "Jajaran Pimpinan", en: "Leadership Team" },
  title: { id: "Manajemen PT Akar Emas", en: "PT Akar Emas Management" },
  desc: {
    id: "Dipimpin oleh tim profesional berpengalaman yang berkomitmen pada pertumbuhan berkelanjutan.",
    en: "Led by an experienced professional team committed to sustainable growth.",
  },
};

const boards = {
  direksi: [
    {
      name: { id: "Nama Direktur Utama", en: "President Director Name" },
      role: { id: "Direktur Utama", en: "President Director" },
      photo: "/assets/management/direktur-utama.jpg",
    },
    {
      name: { id: "Nama Direktur Operasional", en: "Operations Director Name" },
      role: { id: "Direktur Operasional", en: "Operations Director" },
      photo: "/assets/management/direktur-operasional.jpg",
    },
    {
      name: { id: "Nama Direktur Keuangan", en: "Finance Director Name" },
      role: { id: "Direktur Keuangan", en: "Finance Director" },
      photo: "/assets/management/direktur-keuangan.jpg",
    },
    {
      name: { id: "Nama Direktur Teknologi", en: "Technology Director Name" },
      role: { id: "Direktur Teknologi & Inovasi", en: "Technology & Innovation Director" },
      photo: "/assets/management/direktur-teknologi.jpg",
    },
  ],
  komisaris: [
    {
      name: { id: "Nama Komisaris Utama", en: "President Commissioner Name" },
      role: { id: "Komisaris Utama", en: "President Commissioner" },
      photo: "/assets/management/komisaris-utama.jpg",
    },
    {
      name: { id: "Nama Komisaris Independen", en: "Independent Commissioner Name" },
      role: { id: "Komisaris Independen", en: "Independent Commissioner" },
      photo: "/assets/management/komisaris-independen.jpg",
    },
    {
      name: { id: "Nama Komisaris", en: "Commissioner Name" },
      role: { id: "Komisaris", en: "Commissioner" },
      photo: "/assets/management/komisaris.jpg",
    },
  ],
};

const tabs = [
  { key: "direksi", label: { id: "Dewan Direksi", en: "Board of Directors" } },
  { key: "komisaris", label: { id: "Dewan Komisaris", en: "Board of Commissioners" } },
];

export default function Management() {
  const [activeTab, setActiveTab] = useState("direksi");
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHero
        image="/assets/management/management-hero.jpg"
        title={content.heroTitle[language]}
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeader
            icon={Users}
            eyebrow={content.eyebrow[language]}
            title={content.title[language]}
            desc={content.desc[language]}
          />

          {/* Tab switch */}
          <div className="mx-auto mt-10 flex w-fit gap-1 rounded-full bg-slate-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  activeTab === tab.key
                    ? "bg-red-600 text-white shadow"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label[language]}
              </button>
            ))}
          </div>

          {/* Grid kartu */}
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {boards[activeTab].map((person) => (
              <div key={person.name.id} className="text-center">
                <div className="mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                  <img
                    src={person.photo}
                    alt={person.name[language]}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {person.name[language]}
                </h3>
                <p className="mt-1 text-sm text-red-600">{person.role[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}