import PerpustakaanPage from "../components/PerpustakaanPage";
import Breadcrumbs from "../components/common/Breadcrumbs";
import WhatsAppButton from "../components/common/ChatWaButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Perpustakaan", path: "/perpustakaan" },
];

export default function Perpustakaan() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <PerpustakaanPage />
      <WhatsAppButton />
    </div>
  );
}
