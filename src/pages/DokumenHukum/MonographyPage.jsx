import DocPage from "./DocPage";
import PopularDocumentMonography from "../../components/PopularDocumentMonography";

const MonographyPage = () => (
  <DocPage
    apiUrl="https://jdih.pisdev.my.id/api/v2/home/monography"
    title="Dokumen Monografi"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Monografi", path: "/site-pages/monografi" },
    ]}
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
    detailPath="/site-pages/monografi"
    customSidebar={<PopularDocumentMonography />} // ini bagian yang kamu update
  />
);

export default MonographyPage;
