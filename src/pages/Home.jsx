import Main from "../components/Home/Main";
import LegalStatsDashboard from "../components/Home/LegalStatsDashboard";
import LegalPortal from "../components/Home/ProductLawCard";
import LegalDocumentsSection from "../components/Home/DocumentLawOthers";
import JDIHNetworkMembers from "../components/Home/JdihMembers";
import JDIHUniversityMembers from "../components/Home/JdihUniversityMembers";
import NewsSection from "../components/Home/News";
import LatestRegulations from "../components/Home/LatestRegulations";
import PropemperdaRegulations from "../components/Home/PropemperdaRegulations";
import Monographic from "../components/Home/Monographic";
import ProfileVideo from "../components/Home/ProfileVideo";
import LegalStatsChart from "../components/Home/LegalStatsChart";
import WhatsAppButton from "../components/common/ChatWaButton";
import LinkTerkait from "../components/Home/LinkTerkait";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Main />
        <ProfileVideo />
        <LegalStatsDashboard />
        <LegalPortal />
        <LegalStatsChart />
        <LegalDocumentsSection />
        <JDIHNetworkMembers />
        <JDIHUniversityMembers />
        <NewsSection />
        <LatestRegulations />
        <PropemperdaRegulations />
        <Monographic />
        <LinkTerkait />
      </main>
      <WhatsAppButton />
    </div>
  );
}
