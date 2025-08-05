import LawPage from "./LawPage";
import baseUrl from "../../config/api";

const KeputusanSekretarisDaerahPage = () => (
  <LawPage
    apiUrl={`${baseUrl}/topics`}
    title="Keputusan Sekretaris Daerah Jawa Timur"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      {
        label: "Keputusan Sekretaris Daerah Jawa Timur",
        path: "/peraturan/keputusan-sekretaris-daerah",
      },
    ]}
    sectionId="50"
    years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]}
    documentTypes={["", "Keputusan Sekretaris Daerah"]}
    allowedDocumentTypes={["Keputusan Sekretaris Daerah"]}
    includeStatus={true}
    includeCategory={true}
    detailPath="/peraturan/keputusan-sekretaris-daerah"
    regulationType="Keputusan Sekretaris Daerah"
  />
);

export default KeputusanSekretarisDaerahPage;