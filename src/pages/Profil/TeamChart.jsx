import TeamChartPage from "../../components/Profil/TeamChartPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import WhatsAppButton from "../../components/common/ChatWaButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/profil" },
  {
    label: "Struktur Organisasi Tim Pengelolaan JDIH Provinsi Jawa Timur",
    path: "/struktur-tim",
  },
];

export default function TeamChart() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <TeamChartPage />
      <WhatsAppButton />
    </div>
  );
}
