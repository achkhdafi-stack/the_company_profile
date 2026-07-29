// src/data/menu.js
// Struktur menu utama navbar. `children` -> memicu dropdown.
// path disesuaikan dengan folder src/pages/
//
// PENTING: setiap item (termasuk yang punya `children`) WAJIB punya
// `path` sendiri. Kalau tidak, <NavLink to={item.path}> akan jadi
// to={undefined} dan react-router menganggapnya "selalu aktif" di
// halaman manapun -- itu yang menyebabkan banyak menu merah sekaligus.

const menu = [
  {
    label: { id: "Perusahaan", en: "Company" },
    path: "/company",
    children: [
      {
        label: { id: "Tentang Perusahaan", en: "About the Company" },
        path: "/company/profile",
      },
      {
        label: { id: "Visi & Misi", en: "Vision & Mission" },
        path: "/company/vision",
      },
      {
        label: { id: "Manajemen", en: "Management" },
        path: "/company/management",
      },
      {
        label: { id: "Tata Kelola Perusahaan", en: "Corporate Governance" },
        path: "/company/governance",
      },
      {
        label: { id: "Sertifikasi & Penghargaan", en: "Certifications & Awards" },
        path: "/company/certifications",
      },
    ],
  },
  {
    label: { id: "Teknologi & Bisnis", en: "Technology & Business" },
    path: "/technology",
    children: [
      {
        label: { id: "Pertahanan", en: "Defense" },
        path: "/technology/defense",
      },
      {
        label: { id: "Energi", en: "Energy" },
        path: "/technology/energy",
      },
      {
        label: { id: "Transportasi", en: "Transportation" },
        path: "/technology/transportation",
      },
    ],
  },
  {
    label: { id: "Produk", en: "Products" },
    path: "/product",
    children: null,
  },
  {
    label: { id: "Media", en: "Media" },
    path: "/media",
    children: [
      {
        label: { id: "Berita", en: "News" },
        path: "/media/news",
      },
      {
        label: { id: "Majalah", en: "Journal" },
        path: "/media/journal",
      },
      {
        label: { id: "Artikel", en: "Articles" },
        path: "/media/articles",
      },
    ],
  },
  {
    label: { id: "Pengadaan", en: "Procurement" },
    path: "/procurement",
    children: null,
  },
  {
    label: { id: "KIP", en: "KIP" },
    path: "/kip",
    children: null,
  },
  {
    label: { id: "Kontak", en: "Contact" },
    path: "/contact",
    children: null,
  },
];

export default menu;