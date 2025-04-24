import LawPage from "./LawPage";

const ProdukKotaPage = () => (
  <LawPage
    apiUrl="https://jdih.pisdev.my.id/api/v2/topics"
    title="Produk Hukum Kota/Kabupaten"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Produk Hukum Kota/Kabupaten", path: "/site-pages/produk-kota" },
    ]}
    sectionId="39"
    years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]}
    documentTypes={[
      "",
      "Peraturan Daerah",
      "Peraturan Walikota",
      "Keputusan Walikota",
      "Surat Keputusan Walikota",
      "Instruksi Walikota",
    ]}
    includeStatus={true}
    includeCategory={true}
    detailPath="/peraturan/produk-hukum-kota"
  />
);

export default ProdukKotaPage;
