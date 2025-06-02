import BeritaPage from "../../components/Berita/BeritaPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import WhatsAppButton from "../../components/common/ChatWaButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Berita", path: "/news" },
];

export default function Berita() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <BeritaPage />
      <WhatsAppButton />
    </div>
  );
}
