import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LawDetailPage from "./pages/ProdukHukum/LawDetailPage";
import LawPage from "./pages/ProdukHukum/LawPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import productLawData from "./data/productLawData";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Router>
        <Header />
        <main className="flex-grow">
          {" "}
          <Routes>
            <Route path="/" element={<Home />} />
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
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
