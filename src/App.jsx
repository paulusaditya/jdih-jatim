import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profil from "./pages/Profil/Profil";
import ContactPage from "./pages/Profil/Contact";
import OrganizationalChart from "./pages/Profil/OrganizationalChart";
import TeamChart from "./pages/Profil/TeamChart";
import LawDetailPage from "./pages/ProdukHukum/LawDetailPage";
import LawPage from "./pages/ProdukHukum/LawPage";
import DocPage from "./pages/DokumenHukum/DocPage";
import MonographyPage from "./pages/DokumenHukum/MonographyPage";
import MonographyDetailPage from "./pages/DokumenHukum/MonographyDetailPage";
import PropemperdaPage from "./pages/DokumenHukum/PropemperdaPage";
import Berita from "./pages/Berita/Berita";
import DetailBerita from "./pages/Berita/DetailBerita";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import productLawData from "./data/productLawData";
import docData from "./data/docData";
import NotFound from "./pages/NotFound";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Router>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profil/tentang-kami" element={<Profil />} />
            <Route path="/profil/kontak" element={<ContactPage />} />
            <Route
              path="/profil/struktur-organisasi"
              element={<OrganizationalChart />}
            />
            <Route path="/profil/struktur-tim" element={<TeamChart />} />
            <Route path="/berita" element={<Berita />} />
            <Route path="/berita/:id" element={<DetailBerita />} />
            <Route path="/dokumentasi/monografi" element={<MonographyPage />} />
            <Route path="/dokumentasi/monografi/:docId" element={<MonographyDetailPage />} />
            <Route path="/dokumentasi/propemperda" element={<PropemperdaPage />} />
            {productLawData.map(({ path, title, laws }) => (
              <Route
                key={path}
                path={path}
                element={
                  <LawPage
                    laws={laws}
                    breadcrumbPaths={[
                      { label: "Beranda", path: "/" },
                      { label: "Produk Hukum", path: "/produk-hukum" },
                      { label: title, path: path },
                    ]}
                    title={title}
                  />
                }
              />
            ))}
            <Route path="/law/:number/:year" element={<LawDetailPage />} />
            {docData.map(({ path, title, documents }) => (
              <Route
                key={path}
                path={path}
                element={
                  <DocPage
                    documents={documents}
                    breadcrumbPaths={[
                      { label: "Beranda", path: "/" },
                      { label: title, path: path },
                    ]}
                    title={title}
                  />
                }
              />
            ))}
            <Route path="/dokumen/:number/:year" element={<LawDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
