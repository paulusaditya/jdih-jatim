import AboutPage from "../components/Profile/AboutPage";
import Breadcrumbs from "../components/Breadcrumbs";

const breadcrumbPaths = [
    { label: "Beranda", path: "/" },
    { label: "Profil", path: "/profil" },
  ];

export default function Profile() {
  return (
    <div className="min-h-screen bg-white">
        <Breadcrumbs paths={breadcrumbPaths} />
        <AboutPage/>
    </div>
  );
}