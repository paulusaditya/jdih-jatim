import DocPage from "./DocPage";
import baseUrl from "../../config/api";

const BraillePage = () => (
  <DocPage
    apiUrl={`${baseUrl}/topics`}
    title="Dokumen Brailler"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Artikel", path: "/site-pages/dokumen-braille" },
    ]}
    sectionId="30"
    years={["", "2025", "2024", "2023", "2022"]}
    documentTypes={["", "Buku", "Jurnal", "Artikel", "Penelitian", "Lainnya"]}
    includeStatus={false}
    includeCategory={false}
    detailPath="/site-pages/dokumen-braille"
  />
);

export default BraillePage;
