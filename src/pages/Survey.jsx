import SurveyPage from "../components/SurveyPage";
import Breadcrumbs from "../components/common/Breadcrumbs";
import WhatsAppButton from "../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../components/common/FloatingAccessibilityButton";

const breadcrumbPaths = [
  { label: "Beranda", path: "/" },
  { label: "Survey", path: "/survey" },
];

export default function Survey() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs paths={breadcrumbPaths} />
      <SurveyPage />
      <WhatsAppButton />
      <FloatingAccessibilityButton/>
    </div>
  );
}
