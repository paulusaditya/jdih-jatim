import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profil from "./pages/Profil/Profil"; 
import ContactPage from "./pages/Profil/Contact";
import LawDetailPage from "./pages/ProdukHukum/LawDetailPage";
import LawPage from "./pages/ProdukHukum/LawPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import productLawData from "./data/productLawData";
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
