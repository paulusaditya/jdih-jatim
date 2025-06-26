import StandartOperasionalPage from "../../components/Profil/StandartOperasionalPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import WhatsAppButton from "../../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../../components/common/FloatingAccessibilityButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/site-pages" },
  { label: "Standar Operasional Prosedur JDIH  Provinsi Jawa Timur", path: "/standar-operasional-prosedur-jdih-provinsi-jawa-timur" },
];

export default function StandartOperasional() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <StandartOperasionalPage />
      <WhatsAppButton />
      <FloatingAccessibilityButton/>
    </div>
  );
}
