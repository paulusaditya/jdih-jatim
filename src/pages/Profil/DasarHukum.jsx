import DasarHukumPage from "../../components/Profil/DasarHukumPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import WhatsAppButton from "../../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../../components/common/FloatingAccessibilityButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/site-pages" },
  { label: "Dasar Hukum", path: "/dasar-hukum" },
];

export default function DasarHukum() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <DasarHukumPage />
      <WhatsAppButton />
      <FloatingAccessibilityButton/>
    </div>
  );
}
