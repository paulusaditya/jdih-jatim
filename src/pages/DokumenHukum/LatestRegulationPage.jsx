import LawPage from "../ProdukHukum/LawPage";
import baseUrl from "../../config/api";

const LatestRegulationPage = () => {
  const typeToSectionId = {
    "Peraturan Daerah": 29,
    "Peraturan Gubernur": 30,
    "Keputusan Gubernur": 20,
    "Instruksi Gubernur": 21,
    "Keputusan Bersama Gubernur": 41,
    "Surat Keputusan Gubernur": 44,
  };

  return (
    <LawPage
      apiUrl={`${baseUrl}/topics`}
      title="Peraturan"
      breadcrumbPaths={[
        { label: "Beranda", path: "/" },
        { label: "Peraturan", path: "/peraturan-terbaru" },
      ]}
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
      detailPath="/peraturan/peraturan-terbaru"
      typeToSectionId={typeToSectionId}
    />
  );
};

export default LatestRegulationPage;
