import DasarHukumPage from "../../components/Profil/DasarHukumPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import WhatsAppButton from "../../components/common/ChatWaButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/profil" },
  { label: "Dasar Hukum", path: "/dasar-hukum" },
];

export default function DasarHukum() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <DasarHukumPage />
      <WhatsAppButton />
    </div>
  );
}
