import StrukturOrganisasiBiroHukumPage from "../../components/Profil/StrukturOrganisasiBiroHukumPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import WhatsAppButton from "../../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../../components/common/FloatingAccessibilityButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/site-pages" },
  { label: "Struktur Organisasi Biro Hukum Sekretariat Daerah Provinsi Jawa Timur", path: "/struktur-organisasi-biro-hukum" },
];

export default function StrukturOrganisasiBiroHukum() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <StrukturOrganisasiBiroHukumPage />
      <WhatsAppButton />
      <FloatingAccessibilityButton/>
    </div>
  );
}
