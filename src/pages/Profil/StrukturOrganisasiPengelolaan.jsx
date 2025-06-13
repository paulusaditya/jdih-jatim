import StrukturOrganiasiPengelolaanPage from "../../components/Profil/StrukturOrganisasiPengelolaanPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import WhatsAppButton from "../../components/common/ChatWaButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/site-pages" },
  { label: "Struktur Organisasi Tim Pengelolaan JDIH Provinsi Jawa Timur", path: "/struktur-organisasi-tim-pengelolaan-jdih-provinsi-jawa-timur" },
];

export default function StrukturOrganiasiPengelolaan() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <StrukturOrganiasiPengelolaanPage />
      <WhatsAppButton />
    </div>
  );
}
