import DocPage from "./DocPage";

const PutusanPengadilanPage = () => (
  <DocPage
    apiUrl="https://jdih.pisdev.my.id/api/v2/topics"
    title="Putusan Pengadilan"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Putusan Pengadilan", path: "/site-pages/putusan-pengadilan" },
    ]}
    webmasterId="20"
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
    detailPath="/site-pages/putusan-pengadilan"
  />
);

export default PutusanPengadilanPage;
