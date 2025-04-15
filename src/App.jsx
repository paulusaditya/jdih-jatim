import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home";
import Profil from "./pages/Profil/Profil";
import ContactPage from "./pages/Profil/Contact";
import OrganizationalChart from "./pages/Profil/OrganizationalChart";
import TeamChart from "./pages/Profil/TeamChart";
import LawPage from "./pages/ProdukHukum/LawPage";
import LawDetailPage from "./pages/ProdukHukum/LawDetailPage";
import DocPage from "./pages/DokumenHukum/DocPage";
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
import productLawData from "./data/productLawData";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    fetch("https://jdih.pisdev.my.id/api/v2/menus")
      .then((response) => response.json())
      .then((data) => {
        setMenuData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch menu data:", error);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Router>
        <Header />
        <main className="flex-grow">
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
                      <LawPage data={productLawData} />
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
                        <LawPage data={productLawData} />
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
              path="/peraturan/:slug"
              element={<LawPage data={productLawData} />}
            />
            <Route path="peraturan/:typelaw/:slug" element={<LawDetailPage />} />

            <Route
              path="/news/detail-berita/:slug"
              element={<DetailBerita />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
