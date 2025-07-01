import LawPage from "./LawPage";
import baseUrl from "../../config/api";

const SuratKeputusanGubernurPage = () => (
  <LawPage
    apiUrl={`${baseUrl}/topics`}
    title="Surat Keputusan Gubernur Jawa Timur"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      {
        label: "Surat Keputusan Gubernur Jawa Timur",
        path: "/peraturan/surat-keputusan-gubernur",
      },
    ]}
    sectionId="44"
    years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]}
    documentTypes={[""]}
    includeStatus={true}
    includeCategory={true}
    detailPath="/peraturan/surat-keputusan-gubernur"
  />
);

export default SuratKeputusanGubernurPage;
