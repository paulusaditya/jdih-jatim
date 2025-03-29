import ContactPage from "../../components/Profil/ContactPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/profil" },
  { label: "Kontak", path: "/kontak" },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <ContactPage />
    </div>
  );
}
