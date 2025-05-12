import DocPage from "./DocPage";
import baseUrl from "../../config/api";

const RancanganPerdaPage = () => (
  <DocPage
    apiUrl={`${baseUrl}/topics`}
    title="Rancangan Peraturan Daerah"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Rancangan Perda", path: "/site-pages/rancangan-perda" },
    ]}
    sectionId="25"
    years={["", "2025", "2024", "2023", "2022"]}
    documentTypes={["", "Raperda", "Naskah Akademik", "Lainnya"]}
    includeStatus={false}
    includeCategory={false}
    detailPath="/site-pages/rancangan-perda"
  />
);

export default RancanganPerdaPage;
