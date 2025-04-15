import DocPage from "./DocPage";

const MonographyPage = () => (
  <DocPage
    apiUrl="https://jdih.pisdev.my.id/api/v2/topics"
    title="Dokumen Monografi"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Monografi", path: "/dokumentasi/monografi" },
    ]}
    webmasterId="11"
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
    detailPath="/dokumentasi/monografi"
  />
);

export default MonographyPage;
