import DocPage from "./DocPage";

const StaatsbladPage = () => (
  <DocPage
    apiUrl="https://jdih.pisdev.my.id/api/v2/topics"
    title="Staatsblad"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Staatsblad", path: "/site-pages/staatsblad" },
    ]}
    sectionId="17"
    years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"]}
    documentTypes={["", "Buku", "Jurnal", "Artikel", "Penelitian", "Lainnya"]}
    includeStatus={false}
    includeCategory={false}
    detailPath="/site-pages/staatsblad"
  />
);

export default StaatsbladPage;
