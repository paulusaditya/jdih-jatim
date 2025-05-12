import DocPage from "./DocPage";
import baseUrl from "../../config/api";

const KerjasamaPage = () => (
  <DocPage
    apiUrl={`${baseUrl}/topics`}
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
