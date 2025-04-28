import LawPage from "./LawPage";

const ProdukJatimPage = () => {
  const typeToSectionId = {
    "Keputusan Gubernur": 20,
    "Instruksi Gubernur": 21,
    "Peraturan Daerah": 29,
    "Peraturan Gubernur": 30,
    "Keputusan Bersama Gubernur": 41,
    "Surat Keputusan Gubernur": 44,
  };

  return (
    <LawPage
      apiUrl="https://jdih.pisdev.my.id/api/v2/topics"
      title="Produk Hukum Jawa Timur"
      breadcrumbPaths={[
        { label: "Beranda", path: "/" },
        { label: "Produk Hukum Jawa Timur", path: "/site-pages/produk-jatim" },
      ]}
      sectionId="10"
      years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]}
      documentTypes={[
        "",
        "Peraturan Daerah",
        "Peraturan Gubernur",
        "Keputusan Gubernur",
        "Surat Keputusan Gubernur",
        "Instruksi Gubernur",
        "Keputusan Bersama Gubernur",
      ]}
      includeStatus={true}
      includeCategory={true}
      detailPath="/peraturan/produk-hukum-jatim"
      typeToSectionId={typeToSectionId} 
    />
  );
};

export default ProdukJatimPage;
