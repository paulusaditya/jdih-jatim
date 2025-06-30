import StrukturOrganisasiPengelolaanPage from "../../components/Profil/StrukturOrganisasiPengelolaanPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import WhatsAppButton from "../../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../../components/common/FloatingAccessibilityButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/site-pages" },
  { label: "Struktur Organisasi Tim Pengelolaan JDIH Provinsi Jawa Timur", path: "/struktur-organisasi-tim-pengelolaan-jdih-provinsi-jawa-timur" },
];

export default function StrukturOrganisasiPengelolaan() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <StrukturOrganisasiPengelolaanPage />
      <WhatsAppButton />
      <FloatingAccessibilityButton/>
    </div>
  );
}
