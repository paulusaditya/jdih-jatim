import DocPage from "./DocPage";
import baseUrl from "../../config/api";

const NaskahAkademikPage = () => (
  <DocPage
    apiUrl={`${baseUrl}/topics`}
    title="Naskah Akademik"
    breadcrumbPaths={[
      { label: "Beranda", path: "/" },
      { label: "Naskah Akademik", path: "/site-pages/naskah-akademik" },
    ]}
    sectionId="26"
    years={["", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"]}
    documentTypes={["", "Buku", "Jurnal", "Artikel", "Penelitian", "Lainnya"]}
    includeStatus={false}
    includeCategory={false}
    detailPath="/site-pages/naskah-akademik"
  />
);

export default NaskahAkademikPage;
