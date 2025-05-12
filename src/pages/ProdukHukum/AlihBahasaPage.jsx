import LawPage from "./LawPage";
import baseUrl from "../../config/api";

const AlihBahasaPage = () => (
  <LawPage
    apiUrl={`${baseUrl}/topics`}
    title="Peraturan Alih Bahasa"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      {
        label: "Peraturan Alih Bahasa",
        path: "/site-pages/peraturan-alih-bahasa",
      },
    ]}
    sectionId="43"
    years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019"]}
    documentTypes={[""]}
    includeStatus={true}
    includeCategory={true}
    detailPath="/peraturan/alih-bahasa"
  />
);

export default AlihBahasaPage;
