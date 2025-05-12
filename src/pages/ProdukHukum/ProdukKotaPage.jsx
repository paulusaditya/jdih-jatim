import LawPage from "./LawPage";
import baseUrl from "../../config/api";

const ProdukKotaPage = () => {
  const typeToSectionId = {
    "Peraturan Daerah": 31,
    "Peraturan Walikota": 32,
    "Keputusan Walikota": 33,
    "Surat Keputusan Walikota": 34,
    "Instruksi Walikota": 35,
  };

  return (
    <LawPage
      apiUrl={`${baseUrl}/topics`}
      title="Produk Hukum Kota/Kabupaten"
      breadcrumbPaths={[
        { label: "Beranda", path: "/" },
        {
          label: "Produk Hukum Kota/Kabupaten",
          path: "/site-pages/produk-kota",
        },
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
      typeToSectionId={typeToSectionId}
    />
  );
};

export default ProdukKotaPage;
