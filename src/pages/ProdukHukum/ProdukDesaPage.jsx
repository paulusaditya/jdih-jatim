import LawPage from "./LawPage";

const ProdukDesaPage = () => {
  const typeToSectionId = {
    "Peraturan Desa": 35,
    "Keputusan Desa": 36,
  };

  return (
    <LawPage
      apiUrl="https://jdih.pisdev.my.id/api/v2/topics"
      title="Produk Hukum Desa"
      breadcrumbPaths={[
        { label: "Beranda", path: "/" },
        { label: "Produk Hukum Desa", path: "/site-pages/produk-desa" },
      ]}
      sectionId="40"
      years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]}
      documentTypes={["", "Peraturan Desa", "Keputusan Desa"]}
      includeStatus={true}
      includeCategory={true}
      detailPath="/peraturan/produk-hukum-desa"
      typeToSectionId={typeToSectionId}
    />
  );
};

export default ProdukDesaPage;
