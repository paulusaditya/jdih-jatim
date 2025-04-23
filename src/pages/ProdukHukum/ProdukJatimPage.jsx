import LawPage from "./LawPage";

const ProdukJatimPage = () => (
  <LawPage
    apiUrl="https://jdih.pisdev.my.id/api/v2/topics"
    title="Produk Hukum Jawa Timur"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Produk Hukum Jawa Timur", path: "/site-pages/produk-jatim" },
    ]}
    sectionId="3"
    years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]}
    documentTypes={[
      "",
      "Peraturan Daerah",
      "Peraturan Gubernur",
      "Keputusan Gubernur",
      "Surat Keputusan Gubernur",
      "Instruksi Gubernur",
      "Keputusan Bersama Gubernur",
      "Keputusan Atas Nama Gubernur",
    ]}
    includeStatus={true}
    includeCategory={true}
    detailPath="/peraturan/produk-hukum-jatim" 
  />
);

export default ProdukJatimPage;
