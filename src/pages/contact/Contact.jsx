// src/pages/contact/Contact.jsx
import { useState } from "react";
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from "lucide-react";
import PageHero from "../../components/PageHero";
import SectionHeader from "../../components/SectionHeader";
import { useLanguage } from "../../context/LanguageContext";

// ---- Teks & data section, semua dalam pola { id, en } ----

const content = {
  heroTitle: { id: "Kontak", en: "Contact" },
  infoEyebrow: { id: "Hubungi Kami", en: "Get in Touch" },
  infoTitle: { id: "Informasi Kontak", en: "Contact Information" },
  infoDesc: {
    id: "Punya pertanyaan atau ingin bekerja sama dengan kami? Silakan hubungi melalui salah satu kanal berikut.",
    en: "Have a question or want to work with us? Reach out through one of the channels below.",
  },
  sendMessageTitle: { id: "Kirim Pesan", en: "Send a Message" },
  sendMessageDesc: {
    id: "Isi formulir di bawah ini, tim kami akan segera menghubungi kamu kembali.",
    en: "Fill out the form below and our team will get back to you shortly.",
  },
  submittedTitle: { id: "Pesan Terkirim", en: "Message Sent" },
  submittedDesc: {
    id: "Terima kasih telah menghubungi kami. Kami akan merespons secepatnya.",
    en: "Thank you for reaching out. We'll respond as soon as possible.",
  },
  nameLabel: { id: "Nama Lengkap", en: "Full Name" },
  namePlaceholder: { id: "Nama kamu", en: "Your name" },
  emailLabel: { id: "Email", en: "Email" },
  emailPlaceholder: { id: "nama@email.com", en: "name@email.com" },
  subjectLabel: { id: "Subjek", en: "Subject" },
  subjectPlaceholder: { id: "Perihal pesan kamu", en: "Subject of your message" },
  messageLabel: { id: "Pesan", en: "Message" },
  messagePlaceholder: { id: "Tulis pesan kamu di sini...", en: "Write your message here..." },
  submitLabel: { id: "Kirim Pesan", en: "Send Message" },
  locationTitle: { id: "Lokasi Kami", en: "Our Location" },
  locationDesc: {
    id: "Kunjungi kantor pusat PT Akar Emas di alamat berikut.",
    en: "Visit PT Akar Emas's head office at the address below.",
  },
  mapTitle: { id: "Lokasi Kantor PT Akar Emas", en: "PT Akar Emas Office Location" },
};

const contactInfo = [
  {
    icon: MapPin,
    title: { id: "Kantor Pusat", en: "Head Office" },
    lines: [
      { id: "Jl. Contoh Raya No. 1", en: "Jl. Contoh Raya No. 1" },
      {
        id: "Jakarta Selatan, DKI Jakarta, Indonesia",
        en: "South Jakarta, DKI Jakarta, Indonesia",
      },
    ],
  },
  {
    icon: Mail,
    title: { id: "Email", en: "Email" },
    lines: [
      { id: "info@akaremasedu.id", en: "info@akaremasedu.id" },
      { id: "pengadaan@akaremasedu.id", en: "pengadaan@akaremasedu.id" },
    ],
  },
  {
    icon: Phone,
    title: { id: "Telepon", en: "Phone" },
    lines: [
      { id: "+62 21 0000 0000", en: "+62 21 0000 0000" },
      { id: "+62 21 0000 0001 (Fax)", en: "+62 21 0000 0001 (Fax)" },
    ],
  },
  {
    icon: Clock,
    title: { id: "Jam Operasional", en: "Operating Hours" },
    lines: [
      { id: "Senin – Jumat: 08.00 – 17.00 WIB", en: "Monday – Friday: 8:00 AM – 5:00 PM (WIB)" },
      { id: "Sabtu, Minggu & Libur: Tutup", en: "Saturday, Sunday & Holidays: Closed" },
    ],
  },
];

export default function Contact() {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: sambungkan ke endpoint/API pengiriman pesan
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      <PageHero image="/assets/contact/contact-hero.jpg" title={content.heroTitle[language]} />

      {/* Info kontak */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeader
            icon={MapPin}
            eyebrow={content.infoEyebrow[language]}
            title={content.infoTitle[language]}
            desc={content.infoDesc[language]}
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title.id}
                  className="rounded-2xl border border-slate-100 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-900">
                    {c.title[language]}
                  </h3>
                  <div className="mt-2 space-y-0.5">
                    {c.lines.map((line) => (
                      <p key={line.id} className="text-xs text-slate-500">
                        {line[language]}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Peta */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
          {/* Form */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {content.sendMessageTitle[language]}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {content.sendMessageDesc[language]}
            </p>

            {submitted ? (
              <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-100">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
                <h4 className="text-lg font-bold text-slate-900">
                  {content.submittedTitle[language]}
                </h4>
                <p className="text-sm text-slate-500">
                  {content.submittedDesc[language]}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100"
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

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    {content.subjectLabel[language]}
                  </label>
                  <input
                    required
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder={content.subjectPlaceholder[language]}
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    {content.messageLabel[language]}
                  </label>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={content.messagePlaceholder[language]}
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

          {/* Peta */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {content.locationTitle[language]}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {content.locationDesc[language]}
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-100">
              <iframe
                title={content.mapTitle[language]}
                src="https://maps.google.com/maps?q=Jakarta%20Selatan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}