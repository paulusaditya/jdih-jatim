import DocPage from "./DocPage";
import baseUrl from "../../config/api";

const ProgramPembentukanPerdaPage = () => (
  <DocPage
    apiUrl={`${baseUrl}/topics`}
    title="Program Pembentukan Peraturan Daerah"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Program Pembentukan Peraturan Daerah", path: "/site-pages/program-pembentukan-peraturan-daerah" },
    ]}
    sectionId="31"
    years={["", "2025", "2024", "2023", "2022"]}
    documentTypes={["", "Raperda", "Program Pembentukan Peraturan Daerah", "Lainnya"]}
    includeStatus={false}
    includeCategory={false}
    detailPath="/site-pages/program-pembentukan-peraturan-daerah"
  />
);

export default ProgramPembentukanPerdaPage;
