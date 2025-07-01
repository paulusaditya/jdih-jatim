import Main from "../components/Home/Main";
import LegalStatsDashboard from "../components/Home/LegalStatsDashboard";
import LegalPortal from "../components/Home/ProductLawCard";
import LegalDocumentsSection from "../components/Home/DocumentLawOthers";
import JDIHNetworkMembers from "../components/Home/JdihMembers";
import JDIHUniversityMembers from "../components/Home/JdihUniversityMembers";
import DprdMemberCity from "../components/Home/DprdMemberCity";
import NewsSection from "../components/Home/News";
import LatestRegulations from "../components/Home/LatestRegulations";
import PropemperdaRegulations from "../components/Home/PropemperdaRegulations";
import Monographic from "../components/Home/Monographic";
import HeroSection from "../components/Home/HeroSection";
import LegalStatsChart from "../components/Home/LegalStatsChart";
import WhatsAppButton from "../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../components/common/FloatingAccessibilityButton";
import LinkTerkait from "../components/Home/LinkTerkait";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Main />
        <HeroSection />
        <LegalStatsDashboard />
        <LegalPortal />
        <LegalStatsChart />
        <LegalDocumentsSection />
        <JDIHNetworkMembers />
        <JDIHUniversityMembers />
        <DprdMemberCity />
        <NewsSection />
        <LatestRegulations />
        <PropemperdaRegulations />
        <Monographic />
        <LinkTerkait />
      </main>
      <WhatsAppButton />
      <FloatingAccessibilityButton />
    </div>
  );
}
