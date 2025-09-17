import KebijakanPrivasiPage from "../components/KebijakanPrivasiPage";
import Breadcrumbs from "../components/common/Breadcrumbs";
import WhatsAppButton from "../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../components/common/FloatingAccessibilityButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Kebijakan Privasi", path: "/kebijakan-privasi" },
];

export default function KebijakanPrivasi() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <KebijakanPrivasiPage />
      <WhatsAppButton />
      <FloatingAccessibilityButton/>
    </div>
  );
}
