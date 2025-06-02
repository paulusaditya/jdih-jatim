import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Profil from "./pages/Profil/Profil";
import ContactPage from "./pages/Profil/Contact";
import OrganizationalChart from "./pages/Profil/OrganizationalChart";
import TeamChart from "./pages/Profil/TeamChart";
import LawPage from "./pages/ProdukHukum/LawPage";
import ProdukJatimPage from "./pages/ProdukHukum/ProdukJatimPage";
import ProdukKotaPage from "./pages/ProdukHukum/ProdukKotaPage";
import ProdukDesaPage from "./pages/ProdukHukum/ProdukDesaPage";
import AlihBahasaPage from "./pages/ProdukHukum/AlihBahasaPage";
import LawDetailPage from "./pages/ProdukHukum/LawDetailPage";
import DocPage from "./pages/DokumenHukum/DocPage";
import DocDetailPage from "./pages/DokumenHukum/DocDetailPage";
import MonographyPage from "./pages/DokumenHukum/MonographyPage";
import StaatsbladPage from "./pages/DokumenHukum/StaatsbladPage";
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
import KerjasamaPage from "./pages/DokumenHukum/KerjasamaPage";
import RancanganPerdaPage from "./pages/DokumenHukum/RancanganPerdaPage";
import SuratEdaranPage from "./pages/DokumenHukum/SuratEdaranPage";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PopularDocumentMonography from "./components/PopularDocumentMonography";
import baseUrl from "./config/api";

function TitleUpdater({ menuData }) {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let pageTitle = "JDIH Provinsi Jawa Timur";

    if (path === "/") {
      document.title = "Beranda | JDIH Provinsi Jawa Timur";
      return;
    }

    if (path === "*") {
      document.title = "Halaman Tidak Ditemukan | JDIH Provinsi Jawa Timur";
      return;
    }

    if (menuData && menuData.length > 0) {
      for (const menu of menuData) {
        if (path === `/${menu.link}`) {
          pageTitle = menu.title;
          break;
        }

        if (menu.sub_menus && menu.sub_menus.length > 0) {
          for (const sub of menu.sub_menus) {
            const subPath = `/${menu.link}${
              sub.link.startsWith("/") ? sub.link : `/${sub.link}`
            }`;
            if (path === subPath) {
              pageTitle = sub.title;
              break;
            }
          }
        }
      }
    }

    if (path.includes("/peraturan/") && path.split("/").length > 3) {
      pageTitle = "Detail Peraturan";
    } else if (path.includes("/news/detail-berita/")) {
      pageTitle = "Detail Berita";
    } else if (path.includes("/site-pages/")) {
      const docType = path.split("/")[2];
      if (docType) {
        const formattedDocType = docType
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        pageTitle = `${formattedDocType}`;
      }
    }

    document.title = `${pageTitle} | JDIH Provinsi Jawa Timur`;
  }, [location, menuData]);

  return null;
}

function App() {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/menus`)
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
        <TitleUpdater menuData={menuData} />
        <Header />
        <main className="flex-grow">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="w-20 h-20 border-4 border-transparent text-green-400 text-4xl animate-spin flex items-center justify-center border-t-green-400 rounded-full">
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
                        sub.link.includes("produk-hukum-jatim") ? (
                          <ProdukJatimPage />
                        ) : sub.link.includes("produk-hukum-kabupatenkota") ? (
                          <ProdukKotaPage />
                        ) : sub.link.includes("produk-hukum-desa") ? (
                          <ProdukDesaPage />
                        ) : sub.link.includes("peraturan-alih-bahasa") ? (
                          <AlihBahasaPage />
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
                          <StaatsbladPage />
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
                        ) : sub.link.includes("kerjasama") ? (
                          <KerjasamaPage />
                        ) : sub.link.includes("rancangan-perda") ? (
                          <RancanganPerdaPage />
                        ) : sub.link.includes("surat-edaran") ? (
                          <SuratEdaranPage />
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
                path="/site-pages/staatsblad/:slug"
                element={<DocDetailPage />}
              />
              <Route
                path="/site-pages/monografi/:slug"
                element={
                  <DocDetailPage
                    customSidebar={<PopularDocumentMonography />}
                  />
                }
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
                path="/site-pages/dokumen-populer/:slug"
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
