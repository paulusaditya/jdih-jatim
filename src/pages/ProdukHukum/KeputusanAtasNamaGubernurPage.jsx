import LawPage from "./LawPage";
import baseUrl from "../../config/api";

const KeputusanAtasNamaGubernurPage = () => (
  <LawPage
    apiUrl={`${baseUrl}/topics`}
    title="Keputusan Atas Nama Gubernur Jawa Timur"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      {
        label: "Keputusan Atas Nama Gubernur Jawa Timur",
        path: "/peraturan/keputusan-atas-nama-gubernur",
      },
    ]}
    sectionId="41"
    years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]}
    documentTypes={[""]}
    includeStatus={true}
    includeCategory={true}
    detailPath="/peraturan/keputusan-atas-nama-gubernur"
  />
);

export default KeputusanAtasNamaGubernurPage;