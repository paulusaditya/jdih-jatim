import LawPage from "./LawPage";
import baseUrl from "../../config/api";

const SuratEdaranGubernurPage = () => (
  <LawPage
    apiUrl={`${baseUrl}/topics`}
    title="Surat Edaran Gubernur Jawa Timur"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      {
        label: "Surat Edaran Gubernur Jawa Timur",
        path: "/peraturan/surat-edaran-gubernur",
      },
    ]}
    sectionId="49"
    years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]}
    documentTypes={[""]}
    includeStatus={true}
    includeCategory={true}
    detailPath="/peraturan/surat-edaran-gubernur"
    regulationType="Surat Edaran Gubernur"
  />
);

export default SuratEdaranGubernurPage;
