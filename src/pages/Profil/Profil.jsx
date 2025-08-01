import AboutPage from "../../components/Profil/AboutPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import WhatsAppButton from "../../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../../components/common/FloatingAccessibilityButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/profil" },
  { label: "Tentang Kami", path: "/tentang-kami" },
];

export default function Profil() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <AboutPage />
      <WhatsAppButton />
      <FloatingAccessibilityButton/>
    </div>
  );
}
