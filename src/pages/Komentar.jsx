import { useParams } from "react-router-dom";
import KomentarPage from "../components/KomentarPage";
import Breadcrumbs from "../components/common/Breadcrumbs";
import WhatsAppButton from "../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../components/common/FloatingAccessibilityButton";

export default function Komentar() {
  const { id } = useParams(); // Ambil ID dari URL

  const breadcrumbPaths = [
    { label: "Beranda", path: "/" },
    { label: "Layanan Hukum", path: "/layanan-hukum" },
    { label: "Komentar", path: `/layanan-hukum/komentar/${id}` }, // Sesuai slug/id
  ];

  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <KomentarPage />
      <WhatsAppButton />
      <FloatingAccessibilityButton/>
    </div>
  );
}
