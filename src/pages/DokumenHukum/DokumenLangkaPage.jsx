import DocPage from "./DocPage";

const DokumenLangkaPage = () => (
  <DocPage
    apiUrl="https://jdih.pisdev.my.id/api/v2/topics"
    title="Dokumen Langka"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Dokumen Langka", path: "/site-pages/dokumen-langka" },
    ]}
    webmasterId="21"
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
    detailPath="/site-pages/dokumen-langka"
  />
);

export default DokumenLangkaPage;
