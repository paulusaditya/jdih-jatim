import ContactPage from "../../components/Profil/ContactPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import WhatsAppButton from "../../components/common/ChatWaButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/site-pages" },
  { label: "Kontak", path: "/contact" },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <ContactPage />
      <WhatsAppButton />
    </div>
  );
}
