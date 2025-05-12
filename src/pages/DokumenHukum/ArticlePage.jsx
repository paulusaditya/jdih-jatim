import DocPage from "./DocPage";
import baseUrl from "../../config/api";

const ArticlePage = () => (
  <DocPage
    apiUrl={`${baseUrl}/topics`}
    title="Dokumen Artikel"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Artikel", path: "/site-pages/artikel-hukum" },
    ]}
    sectionId="15"
    years={["", "2025", "2024", "2023", "2022"]}
    documentTypes={["", "Buku", "Jurnal", "Artikel", "Penelitian", "Lainnya"]}
    includeStatus={false}
    includeCategory={false}
    detailPath="/site-pages/artikel-hukum"
  />
);

export default ArticlePage;
