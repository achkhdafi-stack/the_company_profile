// src/pages/company/Profile.jsx
//
// Halaman "Profil Perusahaan" -- menggabungkan semua sub-bagian profil
// (Tentang Perusahaan, Profil/data legal, Highlight, Legalitas, Sejarah,
// Struktur Perusahaan, Kebijakan Mutu & K3L, Kontribusi Perusahaan)
// dalam satu halaman panjang, TANPA sidebar navigasi -- tiap section
// dibedakan lewat warna latar & tata letak agar tetap mudah di-scan.
//
// Visi & Misi, Manajemen, Tata Kelola Perusahaan, dan Sertifikasi &
// Penghargaan TETAP jadi halaman terpisah (lihat data/menu.js).

import {
  Cpu,
  Briefcase,
  Layers,
  Quote,
  Building2,
  ShieldCheck,
  Landmark,
  Network,
  ClipboardCheck,
  HeartHandshake,
} from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";

// ---- Teks & data section, semua dalam pola { id, en } ----

const content = {
  heroTitle: { id: "Tentang Perusahaan", en: "About the Company" },
  whoWeAreLabel: { id: "Siapa Kami", en: "Who We Are" },
  aboutTitle: { id: "Tentang Perusahaan", en: "About the Company" },
  aboutDesc: {
    id: "PT Akar Emas bergerak di bidang teknologi, bisnis, dan solusi digital untuk mendukung pertumbuhan perusahaan yang modern dan berkelanjutan. Kami hadir sebagai mitra strategis bagi organisasi yang ingin bertransformasi secara digital tanpa kehilangan arah dan nilai inti bisnisnya.",
    en: "PT Akar Emas operates in technology, business, and digital solutions to support modern and sustainable company growth. We serve as a strategic partner for organizations seeking digital transformation without losing sight of their core business values.",
  },
  quote: {
    id: "\"Berakar pada nilai, tumbuh melalui inovasi — begitu cara kami membangun setiap solusi.\"",
    en: "\"Rooted in values, growing through innovation — that's how we build every solution.\"",
  },
  sinceFounded: { id: "Sejak berdiri", en: "Since founded" },
  profileEyebrow: { id: "Data Perusahaan", en: "Company Data" },
  profileTitle: { id: "Profil", en: "Profile" },
  profileDesc: {
    id: "Informasi legal dan operasional utama PT Akar Emas.",
    en: "Key legal and operational information about PT Akar Emas.",
  },
  highlightEyebrow: { id: "Sekilas Angka", en: "At a Glance" },
  highlightTitle: { id: "Highlight", en: "Highlights" },
  legalEyebrow: { id: "Dasar Hukum", en: "Legal Basis" },
  legalTitle: { id: "Legalitas", en: "Legality" },
  legalDesc: {
    id: "PT Akar Emas didirikan dan beroperasi berdasarkan peraturan perundang-undangan Republik Indonesia yang berlaku, termasuk namun tidak terbatas pada Akta Pendirian Perseroan Terbatas, Nomor Induk Berusaha (NIB), serta izin-izin usaha terkait yang diterbitkan oleh instansi berwenang.",
    en: "PT Akar Emas is established and operates in accordance with applicable laws and regulations of the Republic of Indonesia, including but not limited to the Deed of Establishment, Business Identification Number (NIB), and related business licenses issued by authorized institutions.",
  },
  historyEyebrow: { id: "Perjalanan Kami", en: "Our Journey" },
  historyTitle: { id: "Sejarah Perusahaan", en: "Company History" },
  structureEyebrow: { id: "Organisasi", en: "Organization" },
  structureTitle: { id: "Struktur Perusahaan", en: "Company Structure" },
  structureDesc: {
    id: "Pembagian tanggung jawab yang jelas antar direktorat untuk mendukung pengambilan keputusan yang cepat dan akuntabel.",
    en: "Clear division of responsibilities across directorates to support fast and accountable decision-making.",
  },
  structureImageAlt: {
    id: "Struktur Organisasi PT Akar Emas",
    en: "PT Akar Emas Organizational Structure",
  },
  qualityEyebrow: { id: "Komitmen Kualitas", en: "Quality Commitment" },
  qualityTitle: { id: "Kebijakan Mutu dan K3L", en: "Quality and OHS Policy" },
  contributionEyebrow: { id: "Dampak Sosial", en: "Social Impact" },
  contributionTitle: { id: "Kontribusi Perusahaan", en: "Company Contributions" },
};

const companyData = [
  {
    label: { id: "Nama Perusahaan", en: "Company Name" },
    value: { id: "PT Akar Emas", en: "PT Akar Emas" },
  },
  {
    label: { id: "Nama Sapaan", en: "Short Name" },
    value: { id: "Akar Emas", en: "Akar Emas" },
  },
  {
    label: { id: "Bidang Usaha", en: "Business Sector" },
    value: {
      id: "Teknologi, Bisnis, dan Solusi Digital Terintegrasi",
      en: "Technology, Business, and Integrated Digital Solutions",
    },
  },
  {
    label: { id: "Kepemilikan", en: "Ownership" },
    value: { id: "Perusahaan Swasta Nasional", en: "National Private Company" },
  },
  {
    label: { id: "Tanggal Berdiri", en: "Date Founded" },
    value: { id: "1965", en: "1965" },
  },
  {
    label: { id: "Dasar Hukum Pendirian", en: "Legal Basis of Establishment" },
    value: {
      id: "Akta Pendirian Perseroan Terbatas PT Akar Emas beserta perubahan anggaran dasar terakhir yang telah disahkan oleh Kementerian Hukum dan HAM Republik Indonesia.",
      en: "Deed of Establishment of PT Akar Emas Limited Liability Company along with the latest amendment to the articles of association ratified by the Ministry of Law and Human Rights of the Republic of Indonesia.",
    },
  },
  {
    label: { id: "Jumlah Karyawan", en: "Number of Employees" },
    value: {
      id: "Karyawan Tetap: 320 Orang · Karyawan Kontrak: 150 Orang",
      en: "Permanent Employees: 320 · Contract Employees: 150",
    },
  },
  {
    label: { id: "Kantor Pusat", en: "Head Office" },
    value: {
      id: "Jl. Contoh Raya No. 1, Jakarta Selatan, DKI Jakarta, Indonesia",
      en: "Jl. Contoh Raya No. 1, South Jakarta, DKI Jakarta, Indonesia",
    },
  },
  {
    label: { id: "Kantor Perwakilan", en: "Representative Office" },
    value: {
      id: "Jl. Contoh Cabang No. 10, Bandung, Jawa Barat, Indonesia",
      en: "Jl. Contoh Cabang No. 10, Bandung, West Java, Indonesia",
    },
  },
  {
    label: { id: "Layanan Informasi", en: "Information Service" },
    value: {
      id: "T. +62 21 0000 0000 · F. +62 21 0000 0001 · info@akaremasedu.id",
      en: "T. +62 21 0000 0000 · F. +62 21 0000 0001 · info@akaremasedu.id",
    },
  },
];

const highlights = [
  { label: { id: "Tahun Berdiri", en: "Year Founded" }, value: "1965" },
  { label: { id: "Anak Perusahaan", en: "Subsidiaries" }, value: "5+" },
  { label: { id: "Proyek Selesai", en: "Completed Projects" }, value: "200+" },
  { label: { id: "Bidang Layanan", en: "Service Areas" }, value: "3" },
];

const pillars = [
  {
    title: { id: "Teknologi", en: "Technology" },
    desc: {
      id: "Mengembangkan solusi teknologi yang relevan dengan kebutuhan industri masa kini dan masa depan.",
      en: "Developing technology solutions relevant to today's and tomorrow's industry needs.",
    },
    icon: Cpu,
  },
  {
    title: { id: "Bisnis", en: "Business" },
    desc: {
      id: "Membangun model bisnis yang berkelanjutan dan memberi nilai tambah bagi mitra dan pemangku kepentingan.",
      en: "Building sustainable business models that add value for partners and stakeholders.",
    },
    icon: Briefcase,
  },
  {
    title: { id: "Solusi Terintegrasi", en: "Integrated Solutions" },
    desc: {
      id: "Menghadirkan solusi end-to-end yang menghubungkan teknologi, proses, dan manusia dalam satu ekosistem.",
      en: "Delivering end-to-end solutions that connect technology, process, and people in one ecosystem.",
    },
    icon: Layers,
  },
];

const milestones = [
  {
    year: "1965",
    desc: {
      id: "PT Akar Emas didirikan sebagai perintis solusi teknologi nasional.",
      en: "PT Akar Emas was founded as a pioneer of national technology solutions.",
    },
  },
  {
    year: "1998",
    desc: {
      id: "Ekspansi ke layanan bisnis dan konsultasi strategis.",
      en: "Expanded into business services and strategic consulting.",
    },
  },
  {
    year: "2012",
    desc: {
      id: "Peluncuran lini solusi digital terintegrasi pertama.",
      en: "Launched the first integrated digital solutions line.",
    },
  },
  {
    year: "2024",
    desc: {
      id: "Memperluas jaringan anak perusahaan ke 5 lini bisnis.",
      en: "Expanded the subsidiary network to 5 business lines.",
    },
  },
];

const qualityPolicies = [
  {
    id: "Mengutamakan kepuasan pelanggan melalui produk dan layanan bermutu.",
    en: "Prioritizing customer satisfaction through quality products and services.",
  },
  {
    id: "Menerapkan standar Keselamatan, Kesehatan Kerja, dan Lingkungan (K3L) di setiap lini operasional.",
    en: "Implementing Occupational Health, Safety, and Environment (OHS) standards across all operations.",
  },
  {
    id: "Melakukan perbaikan berkelanjutan (continuous improvement) pada seluruh proses bisnis.",
    en: "Conducting continuous improvement across all business processes.",
  },
  {
    id: "Mematuhi seluruh regulasi dan perundang-undangan yang berlaku.",
    en: "Complying with all applicable regulations and legislation.",
  },
];

const contributions = [
  {
    title: { id: "Pemberdayaan Komunitas", en: "Community Empowerment" },
    desc: {
      id: "Program pelatihan digital untuk UMKM dan komunitas sekitar wilayah operasional.",
      en: "Digital training programs for SMEs and communities around operational areas.",
    },
  },
  {
    title: { id: "Lingkungan Hidup", en: "Environment" },
    desc: {
      id: "Inisiatif penghijauan dan pengelolaan sampah di lingkungan kantor dan sekitarnya.",
      en: "Greening initiatives and waste management around office areas.",
    },
  },
  {
    title: { id: "Pendidikan", en: "Education" },
    desc: {
      id: "Beasiswa dan program magang bagi mahasiswa serta lulusan baru di bidang teknologi.",
      en: "Scholarships and internship programs for students and fresh graduates in technology.",
    },
  },
];

export default function Profile() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      {/* ---------------- HERO ---------------- */}
      <PageHero
        image="/assets/company/profile-hero.jpg"
        title={content.heroTitle[language]}
      />

      {/* ---------------- TENTANG PERUSAHAAN ---------------- */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
                {content.whoWeAreLabel[language]}
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                {content.aboutTitle[language]}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                {content.aboutDesc[language]}
              </p>

              <div className="mt-8 flex gap-3 rounded-xl border-l-4 border-red-600 bg-slate-50 p-5">
                <Quote className="h-6 w-6 shrink-0 text-red-300" />
                <p className="text-sm italic leading-relaxed text-slate-600">
                  {content.quote[language]}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/assets/company/about-image.jpg"
                  alt="Tim PT Akar Emas"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-white px-6 py-4 shadow-lg sm:block">
                <p className="text-2xl font-black text-red-600">1965</p>
                <p className="text-xs font-medium text-slate-500">
                  {content.sinceFounded[language]}
                </p>
              </div>
            </div>
          </div>

          {/* Tiga pilar */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-100 p-7 transition duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-2xl"
                >
                  <span className="absolute -right-3 -top-3 text-6xl font-black text-slate-50 transition group-hover:text-red-50">
                    0{i + 1}
                  </span>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="relative mt-5 text-lg font-bold text-slate-900">
                    {p.title[language]}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-500">
                    {p.desc[language]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- PROFIL (DATA PERUSAHAAN) ---------------- */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <SectionHeader
            icon={Building2}
            eyebrow={content.profileEyebrow[language]}
            title={content.profileTitle[language]}
            desc={content.profileDesc[language]}
          />

          <div className="mt-12 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
            {companyData.map((row, i) => (
              <div
                key={row.label.id}
                className={`grid grid-cols-1 gap-1.5 px-6 py-5 sm:grid-cols-[220px_1fr] sm:gap-6 sm:px-8 ${
                  i % 2 === 1 ? "bg-slate-50/70" : "bg-white"
                }`}
              >
                <p className="text-sm font-semibold text-slate-800">
                  {row.label[language]}
                </p>
                <p className="text-sm leading-relaxed text-slate-600">
                  {row.value[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HIGHLIGHT ---------------- */}
      <section className="bg-slate-900 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeader
            icon={ShieldCheck}
            eyebrow={content.highlightEyebrow[language]}
            title={content.highlightTitle[language]}
            light
          />

          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label.id} className="text-center">
                <p className="text-4xl font-black text-white sm:text-5xl">
                  {h.value}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400 sm:text-sm">
                  {h.label[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- LEGALITAS ---------------- */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <SectionHeader
            icon={Landmark}
            eyebrow={content.legalEyebrow[language]}
            title={content.legalTitle[language]}
          />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {content.legalDesc[language]}
          </p>
        </div>
      </section>

      {/* ---------------- SEJARAH PERUSAHAAN ---------------- */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <SectionHeader
            icon={Landmark}
            eyebrow={content.historyEyebrow[language]}
            title={content.historyTitle[language]}
          />

          <div className="mt-14 space-y-10 border-l-2 border-slate-200 pl-8">
            {milestones.map((m) => (
              <div key={m.year} className="relative">
                <span className="absolute -left-[39px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 ring-4 ring-slate-50">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <p className="text-lg font-bold text-red-600">{m.year}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {m.desc[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- STRUKTUR PERUSAHAAN ---------------- */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <SectionHeader
            icon={Network}
            eyebrow={content.structureEyebrow[language]}
            title={content.structureTitle[language]}
            desc={content.structureDesc[language]}
          />

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
            <img
              src="/assets/company/struktur-organisasi.jpg"
              alt={content.structureImageAlt[language]}
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------------- KEBIJAKAN MUTU DAN K3L ---------------- */}
      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <SectionHeader
            icon={ClipboardCheck}
            eyebrow={content.qualityEyebrow[language]}
            title={content.qualityTitle[language]}
          />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {qualityPolicies.map((q) => (
              <div
                key={q.id}
                className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
              >
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                </span>
                <span className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  {q[language]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- KONTRIBUSI PERUSAHAAN ---------------- */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeader
            icon={HeartHandshake}
            eyebrow={content.contributionEyebrow[language]}
            title={content.contributionTitle[language]}
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {contributions.map((c) => (
              <div
                key={c.title.id}
                className="rounded-2xl border border-slate-100 p-7 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-base font-bold text-slate-900">
                  {c.title[language]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {c.desc[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}