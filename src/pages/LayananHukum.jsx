import LayananHukumPage from "../components/LayananHukumPage";
import Breadcrumbs from "../components/common/Breadcrumbs";
import WhatsAppButton from "../components/common/ChatWaButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Layanan Hukum", path: "/layanan-hukum" },
];

export default function LayananHukum() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <LayananHukumPage />
      <WhatsAppButton />
    </div>
  );
}
