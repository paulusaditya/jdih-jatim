import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profil from "./pages/Profil/Profil";
import ContactPage from "./pages/Profil/Contact";
import OrganizationalChart from "./pages/Profil/OrganizationalChart";
import TeamChart from "./pages/Profil/TeamChart";
import LawPage from "./pages/ProdukHukum/LawPage";
import LawDetailPage from "./pages/ProdukHukum/LawDetailPage";
import DocPage from "./pages/DokumenHukum/DocPage";
import DocDetailPage from "./pages/DokumenHukum/DocDetailPage";
import MonographyPage from "./pages/DokumenHukum/MonographyPage";
import StatsbladsPage from "./pages/DokumenHukum/StatsbladsPage";
import ArticlePage from "./pages/DokumenHukum/ArticlePage";
import PropemperdaPage from "./pages/DokumenHukum/PropemperdaPage";
import PutusanPengadilanPage from "./pages/DokumenHukum/PutusanPengadilanPage";
import DokumenLangkaPage from "./pages/DokumenHukum/DokumenLangkaPage";
import Berita from "./pages/Berita/Berita";
import DetailBerita from "./pages/Berita/DetailBerita";
import NotFound from "./pages/NotFound";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import productLawData from "./data/productLawData";
import LatestRegulationPage from "./pages/DokumenHukum/LatestRegulationPage";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jdih.pisdev.my.id/api/v2/menus")
      .then((response) => response.json())
      .then((data) => {
        setMenuData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch menu data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Router>
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-yellow-400 text-2xl animate-spin flex items-center justify-center border-t-yellow-400 rounded-full"></div>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              {menuData.map((menu) => (
                <React.Fragment key={menu.id}>
                  <Route
                    path={`/${menu.link}`}
                    element={
                      menu.link === "news" ? (
                        <Berita />
                      ) : menu.link === "peraturan" ? (
                        <LawPage />
                      ) : (
                        <Home />
                      )
                    }
                  />
                  {menu.sub_menus.map((sub) => (
                    <Route
                      key={sub.id}
                      path={`/${menu.link}${
                        sub.link.startsWith("/") ? sub.link : `/${sub.link}`
                      }`}
                      element={
                        menu.link === "peraturan" ? (
                          <LawPage />
                        ) : sub.link.includes("about") ? (
                          <Profil />
                        ) : sub.link.includes("contact") ? (
                          <ContactPage />
                        ) : sub.link.includes(
                            "struktur-organisasi-jdih-jatim"
                          ) ? (
                          <OrganizationalChart />
                        ) : sub.link.includes("struktur-organisasi-tim") ? (
                          <TeamChart />
                        ) : sub.link.includes("staatsblad") ? (
                          <StatsbladsPage />
                        ) : sub.link.includes("monografi") ? (
                          <MonographyPage />
                        ) : sub.link.includes("artikel-hukum") ? (
                          <ArticlePage />
                        ) : sub.link.includes("propemperda") ? (
                          <PropemperdaPage />
                        ) : sub.link.includes("putusan-pengadilan") ? (
                          <PutusanPengadilanPage />
                        ) : sub.link.includes("dokumen-langka") ? (
                          <DokumenLangkaPage />
                        ) : (
                          <Home />
                        )
                      }
                    />
                  ))}
                </React.Fragment>
              ))}
              <Route
                path="/peraturan-terbaru"
                element={<LatestRegulationPage />}
              />
              <Route
                path="/peraturan-terbaru/:slug"
                element={<LawDetailPage />}
              />
              <Route
                path="/peraturan/:typelaw/:slug"
                element={<LawDetailPage />}
              />
              <Route path="/peraturan/:typelaw" element={<LawPage />} />
              <Route
                path="/site-pages/statsblads/:slug"
                element={<DocDetailPage />}
              />
              <Route
                path="/site-pages/monografi/:slug"
                element={<DocDetailPage />}
              />
              <Route
                path="/site-pages/artikel-hukum/:slug"
                element={<DocDetailPage />}
              />
              <Route
                path="/site-pages/propemperda/:slug"
                element={<DocDetailPage />}
              />
              <Route
                path="/site-pages/putusan-pengadilan/:slug"
                element={<DocDetailPage />}
              />
              <Route
                path="/site-pages/dokumen-langka/:slug"
                element={<DocDetailPage />}
              />
              <Route
                path="/news/detail-berita/:slug"
                element={<DetailBerita />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
