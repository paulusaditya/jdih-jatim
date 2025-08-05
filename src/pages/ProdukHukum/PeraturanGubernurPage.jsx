import LawPage from "./LawPage";
import baseUrl from "../../config/api";

const PeraturanGubernurPage = () => (
  <LawPage
    apiUrl={`${baseUrl}/topics`}
    title="Peraturan Gubernur Jawa Timur"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      {
        label: "Peraturan Gubernur Jawa Timur",
        path: "/peraturan/peraturan-gubernur",
      },
    ]}
    sectionId="30"
    years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]}
    documentTypes={["", "Peraturan Gubernur"]}
    allowedDocumentTypes={["Peraturan Gubernur"]}
    includeStatus={true}
    includeCategory={true}
    detailPath="/peraturan/peraturan-gubernur"
    regulationType="Peraturan Gubernur"
  />
);

export default PeraturanGubernurPage;