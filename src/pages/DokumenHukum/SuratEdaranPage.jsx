import DocPage from "./DocPage";
import baseUrl from "../../config/api";

const SuratEdaranPage = () => (
  <DocPage
    apiUrl={`${baseUrl}/topics`}
    title="Surat Edaran"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Surat Edaran", path: "/site-pages/surat-edaran" },
    ]}
    sectionId="26"
    years={["", "2025", "2024", "2023", "2022"]}
    documentTypes={["", "Surat Edaran", "Instruksi", "Lainnya"]}
    includeStatus={false}
    includeCategory={false}
    detailPath="/site-pages/surat-edaran"
  />
);

export default SuratEdaranPage;
