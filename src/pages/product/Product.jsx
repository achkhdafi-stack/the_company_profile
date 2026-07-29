// src/pages/product/Product.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, ArrowRight, Radar, Sun, TrainFront, Search } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";

// ---- Teks & data section, semua dalam pola { id, en } ----

const content = {
  heroTitle: { id: "Produk", en: "Products" },
  eyebrow: { id: "Katalog Kami", en: "Our Catalog" },
  title: { id: "Produk PT Akar Emas", en: "PT Akar Emas Products" },
  desc: {
    id: "Rangkaian produk teknologi yang kami kembangkan di tiga lini bisnis utama: Pertahanan, Energi, dan Transportasi.",
    en: "A range of technology products we develop across three main business lines: Defense, Energy, and Transportation.",
  },
  searchPlaceholder: { id: "Cari produk...", en: "Search products..." },
  emptyState: {
    id: "Tidak ada produk yang cocok dengan pencarian kamu.",
    en: "No products match your search.",
  },
  viewDetail: { id: "Lihat Detail", en: "View Details" },
  ctaTitle: {
    id: "Butuh solusi khusus untuk kebutuhan kamu?",
    en: "Need a custom solution for your needs?",
  },
  ctaDesc: {
    id: "Tim kami siap membantu merancang solusi yang sesuai dengan kebutuhan proyek kamu.",
    en: "Our team is ready to help design a solution tailored to your project needs.",
  },
  ctaButton: { id: "Hubungi Kami", en: "Contact Us" },
};

const categories = [
  { key: "all", label: { id: "Semua Produk", en: "All Products" }, icon: LayoutGrid },
  { key: "defense", label: { id: "Pertahanan", en: "Defense" }, icon: Radar },
  { key: "energy", label: { id: "Energi", en: "Energy" }, icon: Sun },
  { key: "transportation", label: { id: "Transportasi", en: "Transportation" }, icon: TrainFront },
];

const products = [
  {
    name: "Ground Control Interception Radar",
    category: "defense",
    categoryLabel: { id: "Pertahanan", en: "Defense" },
    desc: {
      id: "Sistem radar deteksi dan pelacakan jarak jauh untuk pengawasan wilayah udara.",
      en: "Long-range detection and tracking radar system for airspace surveillance.",
    },
    image: "/assets/product/gcir.jpg",
    href: "/technology/defense",
  },
  {
    name: { id: "Sistem Komunikasi Taktis", en: "Tactical Communication System" },
    category: "defense",
    categoryLabel: { id: "Pertahanan", en: "Defense" },
    desc: {
      id: "Perangkat komunikasi aman untuk koordinasi operasi lapangan.",
      en: "Secure communication devices for field operation coordination.",
    },
    image: "/assets/product/tactical-comms.jpg",
    href: "/technology/defense",
  },
  {
    name: { id: "Simulator Sistem Pertahanan", en: "Defense System Simulator" },
    category: "defense",
    categoryLabel: { id: "Pertahanan", en: "Defense" },
    desc: {
      id: "Perangkat simulasi untuk pelatihan operator sistem pertahanan.",
      en: "Simulation equipment for training defense system operators.",
    },
    image: "/assets/product/simulator.jpg",
    href: "/technology/defense",
  },
  {
    name: { id: "Paket PLTS Komersial", en: "Commercial Solar Package" },
    category: "energy",
    categoryLabel: { id: "Energi", en: "Energy" },
    desc: {
      id: "Solusi pembangkit listrik tenaga surya untuk kebutuhan industri dan komersial.",
      en: "Solar power generation solutions for industrial and commercial needs.",
    },
    image: "/assets/product/plts.jpg",
    href: "/technology/energy",
  },
  {
    name: "Battery Energy Storage System",
    category: "energy",
    categoryLabel: { id: "Energi", en: "Energy" },
    desc: {
      id: "Sistem penyimpanan energi untuk menjaga stabilitas pasokan listrik.",
      en: "Energy storage system to maintain stable power supply.",
    },
    image: "/assets/product/bess.jpg",
    href: "/technology/energy",
  },
  {
    name: "Smart Grid Monitoring",
    category: "energy",
    categoryLabel: { id: "Energi", en: "Energy" },
    desc: {
      id: "Platform pemantauan distribusi energi berbasis data secara real-time.",
      en: "Real-time, data-based energy distribution monitoring platform.",
    },
    image: "/assets/product/smart-grid.jpg",
    href: "/technology/energy",
  },
  {
    name: { id: "Sistem Persinyalan Kereta", en: "Railway Signaling System" },
    category: "transportation",
    categoryLabel: { id: "Transportasi", en: "Transportation" },
    desc: {
      id: "Teknologi persinyalan untuk keselamatan dan efisiensi operasional perkeretaapian.",
      en: "Signaling technology for railway operational safety and efficiency.",
    },
    image: "/assets/product/signaling.jpg",
    href: "/technology/transportation",
  },
  {
    name: { id: "Gerbang Tiket Elektronik", en: "Electronic Ticket Gate" },
    category: "transportation",
    categoryLabel: { id: "Transportasi", en: "Transportation" },
    desc: {
      id: "Solusi tiket digital dan gerbang otomatis untuk transportasi publik.",
      en: "Digital ticketing and automated gate solutions for public transportation.",
    },
    image: "/assets/product/ticket-gate.jpg",
    href: "/technology/transportation",
  },
  {
    name: { id: "Papan Informasi Penumpang", en: "Passenger Information Display" },
    category: "transportation",
    categoryLabel: { id: "Transportasi", en: "Transportation" },
    desc: {
      id: "Sistem informasi real-time di stasiun maupun dalam kereta.",
      en: "Real-time information system at stations and on trains.",
    },
    image: "/assets/product/pis.jpg",
    href: "/technology/transportation",
  },
];

export default function Product() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const getName = (p) => (typeof p.name === "string" ? p.name : p.name[language]);

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    const matchQuery = getName(p).toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <div className="bg-white">
      <PageHero image="/assets/product/product-hero.jpg" title={content.heroTitle[language]} />

      {/* Intro */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <SectionHeader
            icon={LayoutGrid}
            eyebrow={content.eyebrow[language]}
            title={content.title[language]}
            desc={content.desc[language]}
          />
        </div>
      </section>

      {/* Filter & Search */}
      <section className="pb-6">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Kategori */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {cat.label[language]}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={content.searchPlaceholder[language]}
                className="w-full rounded-full border border-slate-200 py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-red-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid produk */}
      <section className="py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-slate-500">
              {content.emptyState[language]}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <Link
                  key={getName(p)}
                  to={p.href}
                  className="group overflow-hidden rounded-2xl border border-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={getName(p)}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-red-600 backdrop-blur">
                      {p.categoryLabel[language]}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600">
                      {getName(p)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {p.desc[language]}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-600">
                      {content.viewDetail[language]}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              {content.ctaTitle[language]}
            </h3>
            <p className="mt-1 text-sm text-red-50">{content.ctaDesc[language]}</p>
          </div>
          <Link
            to="/kontak"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {content.ctaButton[language]}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}