// src/components/Hero.jsx
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Ganti array ini dengan data banner asli (dari CMS/API) nantinya.
const slides = [
  {
    id: 1,
    eyebrow: "Program Magang",
    title: "Cara Mendaftar MagangHub 2026",
    desc: "Ikuti 3 langkah mudah untuk bergabung menjadi peserta magang di Akar Emas.",
    image: "/assets/hero/banner-magang.jpg",
    cta: { label: "Daftar Sekarang", href: "https://magenta.kemnaker.go.id" },
  },
  {
    id: 2,
    eyebrow: "Teknologi Pertahanan",
    title: "Ground Control Interception Radar",
    desc: "Memperkuat kesiapsiagaan pertahanan udara nasional dengan teknologi radar terkini.",
    image: "/assets/hero/banner-radar.jpg",
    cta: { label: "Selengkapnya", href: "/media/berita" },
  },
  {
    id: 3,
    eyebrow: "Keberlanjutan",
    title: "Hilirisasi Advanced Materials",
    desc: "Memperkuat kapabilitas nasional melalui pengembangan advanced materials.",
    image: "/assets/hero/banner-materials.jpg",
    cta: { label: "Selengkapnya", href: "/media/berita" },
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i) => setActive(i);
  const prev = () => setActive((active - 1 + slides.length) % slides.length);
  const next = () => setActive((active + 1) % slides.length);

  return (
    <section className="relative h-[320px] overflow-hidden bg-slate-900 sm:h-[420px] lg:h-[500px]">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/10" />

          {/* Content */}
          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-12">
            <span className="mb-3 w-fit rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {slide.eyebrow}
            </span>
            <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {slide.title}
            </h1>
            <p className="mt-4 max-w-md text-sm text-slate-200 sm:text-base">
              {slide.desc}
            </p>
            <a
              href={slide.cta.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-fit rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              {slide.cta.label}
            </a>
          </div>
        </div>
      ))}

      {/* Prev / Next */}
      <button
        onClick={prev}
        aria-label="Sebelumnya"
        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Berikutnya"
        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-red-600" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}