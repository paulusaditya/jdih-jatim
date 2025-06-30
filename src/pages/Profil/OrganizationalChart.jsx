import OrganizationalChartPage from "../../components/Profil/OrganizationalChartPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import WhatsAppButton from "../../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../../components/common/FloatingAccessibilityButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/profil" },
  {
    label: "Struktur Organisasi JDIH Provinsi Jawa Timur",
    path: "/struktur-organisasi",
  },
];

export default function OrganizationalChart() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <OrganizationalChartPage />
      <WhatsAppButton />
      <FloatingAccessibilityButton/>
    </div>
  );
}
