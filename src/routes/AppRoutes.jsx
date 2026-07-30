import { Routes, Route } from "react-router-dom";

import PublicLayout from "../components/PublicLayout";

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
import ProductDetail from "../pages/product/ProductDetail";
import News from "../pages/media/News";
import NewsDetail from "../pages/media/NewsDetail";
import Journal from "../pages/media/Journal";
import Articles from "../pages/media/Articles";
import ArticleDetail from "../pages/media/ArticleDetail";
import Procurement from "../pages/procurement/Procurement";
import TenderDetail from "../pages/procurement/TenderDetail";
import KIP from "../pages/kip/KIP";
import Contact from "../pages/contact/Contact";
import SearchResults from "../pages/search/SearchResults";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../pages/admin/AdminLayout";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import NewsAdmin from "../pages/admin/NewsAdmin";
import ArticlesAdmin from "../pages/admin/ArticlesAdmin";
import JournalAdmin from "../pages/admin/JournalAdmin";
import ProductsAdmin from "../pages/admin/ProductsAdmin";
import TendersAdmin from "../pages/admin/TendersAdmin";
import BoardMembersAdmin from "../pages/admin/BoardMembersAdmin";
import CertificationsAdmin from "../pages/admin/CertificationsAdmin";
import AwardsAdmin from "../pages/admin/AwardsAdmin";
import SubsidiariesAdmin from "../pages/admin/SubsidiariesAdmin";
import SettingsAdmin from "../pages/admin/SettingsAdmin";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ---------------- ADMIN & LOGIN ----------------
          SENGAJA di luar <PublicLayout> supaya TIDAK ada
          Navbar/Footer publik yang ikut tampil di sini. */}
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
        <Route path="articles" element={<ArticlesAdmin />} />
        <Route path="journal" element={<JournalAdmin />} />
        <Route path="products" element={<ProductsAdmin />} />
        <Route path="tenders" element={<TendersAdmin />} />
        <Route path="board-members" element={<BoardMembersAdmin />} />
        <Route path="certifications" element={<CertificationsAdmin />} />
        <Route path="awards" element={<AwardsAdmin />} />
        <Route path="subsidiaries" element={<SubsidiariesAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Route>

      {/* ---------------- PUBLIK ----------------
          Semua route di bawah ini otomatis dibungkus Navbar + Footer
          lewat <PublicLayout> (parent route tanpa path, cuma "element"). */}
      <Route element={<PublicLayout />}>
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
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/media/news" element={<News />} />
        <Route path="/media/news/:slug" element={<NewsDetail />} />
        <Route path="/media/journal" element={<Journal />} />
        <Route path="/media/articles" element={<Articles />} />
        <Route path="/media/articles/:slug" element={<ArticleDetail />} />

        <Route path="/procurement" element={<Procurement />} />
        <Route path="/procurement/:id" element={<TenderDetail />} />
        <Route path="/kip" element={<KIP />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchResults />} />
      </Route>
    </Routes>
  );
}