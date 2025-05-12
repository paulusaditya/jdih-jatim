import DocPage from "./DocPage";
import baseUrl from "../../config/api";

const PropemperdaPage = () => (
  <DocPage
    apiUrl={`${baseUrl}/topics`}
    title="Dokumen Propemperda"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Propemperda", path: "/site-pages/propemperda" },
    ]}
    sectionId="16"
    includeStatus={false}
    includeCategory={false}
    detailPath="/site-pages/propemperda"
  />
);

export default PropemperdaPage;
