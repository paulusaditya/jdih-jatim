import DocPage from "./DocPage";

const KerjasamaPage = () => (
  <DocPage
    apiUrl="https://jdih.pisdev.my.id/api/v2/topics"
    title="Dokumen Kerja Sama Jawa Timur"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Kerja Sama", path: "/site-pages/dokumen-kerjasama" },
    ]}
    sectionId="24"
    years={["", "2025", "2024", "2023", "2022"]}
    documentTypes={["", "Nota Kesepahaman", "Perjanjian Kerja Sama", "Lainnya"]}
    includeStatus={false}
    includeCategory={false}
    detailPath="/site-pages/dokumen-kerjasama"
  />
);

export default KerjasamaPage;
