import LawPage from "./LawPage";
import baseUrl from "../../config/api";

const KeputusanGubernurPage = () => (
  <LawPage
    apiUrl={`${baseUrl}/topics`}
    title="Keputusan Gubernur Jawa Timur"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      {
        label: "Keputusan Gubernur Jawa Timur",
        path: "/peraturan/keputusan-gubernur",
      },
    ]}
    sectionId="20"
    years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]}
    documentTypes={[""]}
    includeStatus={true}
    includeCategory={true}
    detailPath="/peraturan/keputusan-gubernur"
  />
);

export default KeputusanGubernurPage;
