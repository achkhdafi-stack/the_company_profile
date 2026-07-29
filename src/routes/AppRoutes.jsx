import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Profile from "../pages/company/Profile";
import Certifications from "../pages/company/Certification";
import Governance from "../pages/company/Governance";
import Management from "../pages/company/Management";
import Vision from "../pages/company/Vision";

import Energy from "../pages/technology/Energy";
import Transportation from "../pages/technology/Transportation";
import Defense from "../pages/technology/Defense";

import Product from "../pages/product/Product";
import News from "../pages/media/News";
import Journal from "../pages/media/Journal";
import Articles from "../pages/media/Articles";
import Procurement from "../pages/procurement/Procurement";
import KIP from "../pages/kip/KIP";
import Contact from "../pages/contact/Contact";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../pages/admin/AdminLayout";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import NewsAdmin from "../pages/admin/NewsAdmin";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ---------------- ADMIN ---------------- */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="news" element={<NewsAdmin />} />
        {/* nanti: articles, journal, products, tenders, dst */}
      </Route>

      {/* ---------------- PUBLIK ---------------- */}
      <Route path="/" element={<Home />} />

      <Route path="/company/profile" element={<Profile />} />
      <Route path="/company/vision" element={<Vision />} />
      <Route path="/company/governance" element={<Governance />} />
      <Route path="/company/management" element={<Management />} />
      <Route path="/company/certifications" element={<Certifications />} />

      <Route path="/technology/energy" element={<Energy />} />
      <Route path="/technology/transportation" element={<Transportation />} />
      <Route path="/technology/defense" element={<Defense />} />

      <Route path="/product" element={<Product />} />

      <Route path="/media/news" element={<News />} />
      <Route path="/media/journal" element={<Journal />} />
      <Route path="/media/articles" element={<Articles />} />

      {/* PENTING: path ini harus /pengadaan, bukan /procurement,
          supaya cocok dengan menu.js dan semua link CTA di halaman lain */}
      <Route path="/pengadaan" element={<Procurement />} />
      <Route path="/kip" element={<KIP />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}