import LawPage from "./LawPage";
import baseUrl from "../../config/api";

const InstruksiGubernurPage = () => (
  <LawPage
    apiUrl={`${baseUrl}/topics`}
    title="Instruksi Gubernur Gubernur Jawa Timur"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      {
        label: "Instruksi Gubernur Gubernur Jawa Timur",
        path: "/peraturan/instruksi-gubernur",
      },
    ]}
    sectionId="21"
    years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]}
    documentTypes={[""]}
    includeStatus={true}
    includeCategory={true}
    detailPath="/peraturan/instruksi-gubernur"
    regulationType="Instruksi Gubernur"
  />
);

export default InstruksiGubernurPage;
