import LogoJdihPage from "../../components/Profil/LogoJdihPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import WhatsAppButton from "../../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../../components/common/FloatingAccessibilityButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/site-pages" },
  { label: "Logo JDIH", path: "/logo-jdih" },
];

export default function LogoJdih() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <LogoJdihPage />
      <WhatsAppButton />
      <FloatingAccessibilityButton/>
    </div>
  );
}
