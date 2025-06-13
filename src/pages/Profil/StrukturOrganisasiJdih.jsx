import StrukturOrganisasiJdihPage from "../../components/Profil/StrukturOrganisasiJdihPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import WhatsAppButton from "../../components/common/ChatWaButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/site-pages" },
  { label: "Struktur Organisasi JIDH Jawa Timur", path: "/struktur-organisasi-jdih-jatim" },
];

export default function StrukturOrganisasiJdih() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <StrukturOrganisasiJdihPage />
      <WhatsAppButton />
    </div>
  );
}
