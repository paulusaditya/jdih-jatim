import LayananHukumPage from "../components/LayananHukumPage";
import Breadcrumbs from "../components/common/Breadcrumbs";
import WhatsAppButton from "../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../components/common/FloatingAccessibilityButton";

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
      <FloatingAccessibilityButton/>
    </div>
  );
}
