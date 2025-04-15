import DocPage from "./DocPage";

const StatsbladsPage = () => (
  <DocPage
    apiUrl="https://jdih.pisdev.my.id/api/v2/topics"
    title="Statsblads"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Statsblads", path: "/site-pages/statsblads" },
    ]}
    webmasterId="17"
    years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"]}
    documentTypes={["", "Buku", "Jurnal", "Artikel", "Penelitian", "Lainnya"]}
    includeStatus={false}
    includeCategory={false}
    detailPath="/site-pages/statsblads"
  />
);

export default StatsbladsPage;
