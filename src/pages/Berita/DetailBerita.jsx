import DetailBeritaPage from "../../components/Berita/DetailBeritaPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Berita", path: "/berita" },
  { label: "Detail Berita", path: "/detail-berita" },
];

const DetailBerita = () => {
  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <DetailBeritaPage />
    </>
  );
};

export default DetailBerita;
