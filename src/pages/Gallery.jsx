import GalleryPage from "../components/GalleryPage";
import Breadcrumbs from "../components/common/Breadcrumbs";
import WhatsAppButton from "../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../components/common/FloatingAccessibilityButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Gallery", path: "/gallery" },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <GalleryPage />
      <WhatsAppButton />
      <FloatingAccessibilityButton/>
    </div>
  );
}
