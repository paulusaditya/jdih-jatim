import BeritaPage from "@/components/Berita/BeritaPage";
import Breadcrumbs from "@/components/Breadcrumbs";

const breadcrumbPaths = [
    { label: "Beranda", path: "/" },
    { label: "Berita", path: "/berita" },
  ];

export default function Berita() {
  return (
    <div className="min-h-screen bg-white">
        <Breadcrumbs paths={breadcrumbPaths} />
        <BeritaPage/>
    </div>
  );
}