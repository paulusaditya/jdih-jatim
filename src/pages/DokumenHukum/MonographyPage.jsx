import DocPage from "./DocPage";
import PopularDocumentMonography from "../../components/PopularDocumentMonography";

const MonographyPage = () => (
  <DocPage
    apiUrl="https://jdih.pisdev.my.id/api/v2/topics"
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
