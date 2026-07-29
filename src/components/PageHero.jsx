// src/components/PageHero.jsx
// Banner header sub-halaman: gambar full-bleed + garis merah + judul besar.

export default function PageHero({ image, title }) {
  return (
    <section className="relative flex h-[300px] items-center justify-center overflow-hidden sm:h-[360px] lg:h-[420px]">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-900/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-slate-900/30" />

      <div className="relative flex flex-col items-center px-4 text-center">
        <span className="h-1 w-16 rounded-full bg-red-600" />
        <h1 className="mt-5 text-3xl font-black uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}