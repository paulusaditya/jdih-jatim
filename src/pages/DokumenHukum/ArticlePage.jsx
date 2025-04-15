import DocPage from "./DocPage";

const ArticlePage = () => (
  <DocPage
    apiUrl="https://jdih.pisdev.my.id/api/v2/topics"
    title="Dokumen Artikel"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Artikel", path: "/dokumentasi/artikel" },
    ]}
    webmasterId="15"
    years={["", "2025", "2024", "2023", "2022"]}
    documentTypes={["", "Buku", "Jurnal", "Artikel", "Penelitian", "Lainnya"]}
    includeStatus={false}
    includeCategory={false}
    detailPath="/dokumentasi/artikel"
  />
);

export default ArticlePage;
