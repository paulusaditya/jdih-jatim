import LawPage from "./LawPage";
import baseUrl from "../../config/api";

const PeraturanDaerahJatimPage = () => {
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
      apiUrl={`${baseUrl}/topics`}
      title="Produk Hukum Jawa Timur"
      breadcrumbPaths={[
        { label: "Beranda", path: "/" },
        {
          label: "Produk Hukum Jawa Timur",
          path: "/peraturan/peraturan-daerah",
        },
      ]}
      sectionId="29"
      years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]}
      documentTypes={[
        "",

      ]}
      allowedDocumentTypes={["Peraturan Daerah "]}
      includeStatus={true}
      includeCategory={true}
      detailPath="/peraturan/peraturan-daerah"
      typeToSectionId={typeToSectionId}
      regulationType="Peraturan Daerah"
    />
  );
};

export default PeraturanDaerahJatimPage;