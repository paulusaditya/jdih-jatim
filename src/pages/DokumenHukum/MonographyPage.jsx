import DocPage from "./DocPage";
import PopularDocumentMonography from "../../components/PopularDocumentMonography";
import baseUrl from "../../config/api";

const MonographyPage = () => (
  <DocPage
    apiUrl={`${baseUrl}/topics`}
    title="Dokumen Monografi"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Monografi", path: "/site-pages/monografi" },
    ]}
    sectionId="11"
    includeStatus={false}
    includeCategory={false}
    detailPath="/site-pages/monografi"
    customSidebar={<PopularDocumentMonography />}
  />
);

export default MonographyPage;
