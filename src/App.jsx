import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProvinsiJatim from "./pages/ProdukHukum/LawPage";
import LawDetailPage from "./pages/ProdukHukum/LawDetailPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produk-hukum/provinsijatim" element={<ProvinsiJatim />} />
        <Route path="/law/:number/:year" element={<LawDetailPage />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
