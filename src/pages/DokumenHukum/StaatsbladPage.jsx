import DocPage from "./DocPage";
import baseUrl from "../../config/api";

const StaatsbladPage = () => (
  <DocPage
    apiUrl={`${baseUrl}/topics`}
    title="Staatsblad"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Staatsblad", path: "/site-pages/staatsblad" },
    ]}
    sectionId="17"
    years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"]}
    documentTypes={["", "Buku", "Jurnal", "Artikel", "Penelitian", "Lainnya"]}
    includeStatus={false}
    includeCategory={false}
    detailPath="/site-pages/staatsblad"
  />
);

export default StaatsbladPage;
