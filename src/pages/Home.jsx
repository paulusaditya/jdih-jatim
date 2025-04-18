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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Main />
      <LegalStatsDashboard/>
      <LegalPortal/>
      <LegalDocumentsSection/>
      <JDIHNetworkMembers/>
      <JDIHUniversityMembers/>
      <NewsSection/>
      <LatestRegulations/>
      <PropemperdaRegulations/>
      <Monographic/>
    </div>
  );
}