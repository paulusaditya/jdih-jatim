import DocPage from "./DocPage";

const PropemperdaPage = () => (
  <DocPage
    apiUrl="https://jdih.pisdev.my.id/api/v2/topics"
    title="Dokumen Propemperda"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Propemperda", path: "/site-pages/propemperda" },
    ]}
    webmasterId="16"
    years={[
      "",
      "2025",
      "2024",
      "2023",
      "2022",
      "2021",
      "2020",
      "2019",
      "2018",
    ]}
    documentTypes={[
      "",
      "Buku",
      "Jurnal",
      "Artikel",
      "Penelitian",
      "Lainnya",
    ]}
    includeStatus={false}
    includeCategory={false}
    detailPath="/site-pages/propemperda"
  />
);

export default PropemperdaPage;
