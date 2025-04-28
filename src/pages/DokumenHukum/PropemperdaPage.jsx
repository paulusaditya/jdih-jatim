import DocPage from "./DocPage";

const PropemperdaPage = () => (
  <DocPage
    apiUrl="https://jdih.pisdev.my.id/api/v2/topics"
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
