// src/components/PublicLayout.jsx
//
// Layout untuk halaman PUBLIK saja (Home, Perusahaan, Produk, dst).
// Navbar & Footer HANYA dirender di sini -- bukan lagi di App.jsx --
// supaya halaman /admin/* dan /admin/login TIDAK ikut menampilkan
// Navbar/Footer publik.

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}