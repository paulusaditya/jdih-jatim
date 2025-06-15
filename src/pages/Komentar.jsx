import KomentarPage from "../components/KomentarPage";
import Breadcrumbs from "../components/common/Breadcrumbs";
import WhatsAppButton from "../components/common/ChatWaButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Layanan Hukum", path: "/layanan-hukum" },
  { label: "Komentar", path: "/layanan-hukum/komentar" },
];

export default function Komentar() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <KomentarPage />
      <WhatsAppButton />
    </div>
  );
}
