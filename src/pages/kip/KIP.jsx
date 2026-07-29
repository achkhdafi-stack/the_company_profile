// src/pages/kip/KIP.jsx
import { useState } from "react";
import {
  Info,
  FileText,
  Zap,
  Archive,
  Download,
  Send,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";

// ---- Teks & data section, semua dalam pola { id, en } ----

const content = {
  heroTitle: { id: "Keterbukaan Informasi Publik", en: "Public Information Disclosure" },
  introEyebrow: { id: "KIP", en: "KIP" },
  introTitle: { id: "Komitmen Keterbukaan Informasi", en: "Information Disclosure Commitment" },
  introDesc: {
    id: "PT Akar Emas berkomitmen menyediakan akses informasi yang transparan dan akuntabel bagi publik, pemangku kepentingan, dan mitra kerja.",
    en: "PT Akar Emas is committed to providing transparent and accountable access to information for the public, stakeholders, and business partners.",
  },
  categoriesEyebrow: { id: "Klasifikasi", en: "Classification" },
  categoriesTitle: { id: "Kategori Informasi", en: "Information Categories" },
  documentsEyebrow: { id: "Unduhan", en: "Downloads" },
  documentsTitle: { id: "Dokumen Informasi Publik", en: "Public Information Documents" },
  downloadLabel: { id: "Unduh", en: "Download" },
  formEyebrow: { id: "Ajukan Permintaan", en: "Submit a Request" },
  formTitle: { id: "Formulir Permintaan Informasi", en: "Information Request Form" },
  formDesc: {
    id: "Tidak menemukan informasi yang kamu butuhkan? Ajukan permintaan resmi melalui formulir berikut.",
    en: "Can't find the information you need? Submit an official request through the form below.",
  },
  submittedTitle: { id: "Permintaan Terkirim", en: "Request Submitted" },
  submittedDesc: {
    id: "Terima kasih, permintaan informasi kamu telah kami terima dan akan diproses oleh tim PPID kami.",
    en: "Thank you, we have received your information request and it will be processed by our PPID team.",
  },
  nameLabel: { id: "Nama Lengkap", en: "Full Name" },
  namePlaceholder: { id: "Nama kamu", en: "Your name" },
  emailLabel: { id: "Email", en: "Email" },
  emailPlaceholder: { id: "nama@email.com", en: "name@email.com" },
  phoneLabel: { id: "Nomor Telepon", en: "Phone Number" },
  phonePlaceholder: { id: "+62 8xx-xxxx-xxxx", en: "+62 8xx-xxxx-xxxx" },
  infoTypeLabel: { id: "Jenis Informasi", en: "Information Type" },
  purposeLabel: { id: "Tujuan Penggunaan Informasi", en: "Purpose of Information Use" },
  purposePlaceholder: {
    id: "Jelaskan secara singkat kebutuhan informasi kamu...",
    en: "Briefly describe your information needs...",
  },
  submitLabel: { id: "Kirim Permintaan", en: "Submit Request" },
};

const infoCategories = [
  {
    title: { id: "Informasi Berkala", en: "Periodic Information" },
    desc: {
      id: "Informasi yang wajib diumumkan secara rutin, seperti laporan tahunan dan laporan keuangan.",
      en: "Information that must be regularly disclosed, such as annual reports and financial statements.",
    },
    icon: FileText,
  },
  {
    title: { id: "Informasi Serta-Merta", en: "Immediate Information" },
    desc: {
      id: "Informasi yang wajib diumumkan segera karena berkaitan dengan hajat hidup orang banyak.",
      en: "Information that must be disclosed immediately because it concerns public interest.",
    },
    icon: Zap,
  },
  {
    title: { id: "Informasi Setiap Saat", en: "On-Demand Information" },
    desc: {
      id: "Informasi yang tersedia dan dapat diakses publik sewaktu-waktu melalui permintaan resmi.",
      en: "Information available and accessible to the public at any time through an official request.",
    },
    icon: Archive,
  },
];

const documents = [
  {
    title: { id: "Laporan Tahunan 2024", en: "2024 Annual Report" },
    fileUrl: "/assets/kip/annual-report-2024.pdf",
  },
  {
    title: { id: "Laporan Keberlanjutan 2024", en: "2024 Sustainability Report" },
    fileUrl: "/assets/kip/sustainability-report-2024.pdf",
  },
  {
    title: { id: "Pedoman Tata Kelola Perusahaan (GCG)", en: "Corporate Governance Guidelines (GCG)" },
    fileUrl: "/assets/kip/pedoman-gcg.pdf",
  },
  {
    title: { id: "Kode Etik Perusahaan", en: "Company Code of Conduct" },
    fileUrl: "/assets/kip/kode-etik.pdf",
  },
  {
    title: { id: "Struktur Organisasi", en: "Organizational Structure" },
    fileUrl: "/assets/kip/struktur-organisasi.pdf",
  },
];

const infoTypes = [
  { id: "Profil Perusahaan", en: "Company Profile" },
  { id: "Laporan Keuangan", en: "Financial Reports" },
  { id: "Tata Kelola Perusahaan", en: "Corporate Governance" },
  { id: "Produk & Layanan", en: "Products & Services" },
  { id: "Lainnya", en: "Other" },
];

export default function KIP() {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    infoType: infoTypes[0].id,
    purpose: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: sambungkan ke endpoint/API permintaan informasi
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      <PageHero
        image="/assets/kip/kip-hero.jpg"
        title={content.heroTitle[language]}
      />

      {/* Intro */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <SectionHeader
            icon={Info}
            eyebrow={content.introEyebrow[language]}
            title={content.introTitle[language]}
            desc={content.introDesc[language]}
          />
        </div>
      </section>

      {/* Kategori informasi */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeader
            icon={Archive}
            eyebrow={content.categoriesEyebrow[language]}
            title={content.categoriesTitle[language]}
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {infoCategories.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title.id}
                  className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    {c.title[language]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {c.desc[language]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dokumen publik */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <SectionHeader
            icon={FileText}
            eyebrow={content.documentsEyebrow[language]}
            title={content.documentsTitle[language]}
          />

          <div className="mt-10 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100">
            {documents.map((d) => (
              <a
                key={d.title.id}
                href={d.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 p-5 transition hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <FileText className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-800">
                    {d.title[language]}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-red-600">
                  <Download className="h-4 w-4" />
                  {content.downloadLabel[language]}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Formulir permintaan informasi */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <SectionHeader
            icon={Send}
            eyebrow={content.formEyebrow[language]}
            title={content.formTitle[language]}
            desc={content.formDesc[language]}
          />

          {submitted ? (
            <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-100">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
              <h3 className="text-lg font-bold text-slate-900">
                {content.submittedTitle[language]}
              </h3>
              <p className="text-sm text-slate-500">
                {content.submittedDesc[language]}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-5 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    {content.nameLabel[language]}
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={content.namePlaceholder[language]}
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    {content.emailLabel[language]}
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={content.emailPlaceholder[language]}
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    {content.phoneLabel[language]}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={content.phonePlaceholder[language]}
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    {content.infoTypeLabel[language]}
                  </label>
                  <select
                    name="infoType"
                    value={form.infoType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400"
                  >
                    {infoTypes.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t[language]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  {content.purposeLabel[language]}
                </label>
                <textarea
                  required
                  rows={4}
                  name="purpose"
                  value={form.purpose}
                  onChange={handleChange}
                  placeholder={content.purposePlaceholder[language]}
                  className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-700 sm:w-auto sm:px-8"
              >
                <Send className="h-4 w-4" />
                {content.submitLabel[language]}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Kontak PPID */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:justify-center sm:gap-12">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Mail className="h-4 w-4 text-red-500" />
            ppid@akaremasedu.id
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Phone className="h-4 w-4 text-red-500" />
            +62 21 0000 0000
          </div>
        </div>
      </section>
    </div>
  );
}