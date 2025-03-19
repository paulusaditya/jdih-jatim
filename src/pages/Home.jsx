
import Main from "../components/Main";
import LegalStatsDashboard from "../components/LegalStatsDashboard";
import LegalPortal from "../components/ProductLawCard";
import LegalDocumentsSection from "../components/DocumentLawOthers";
import JDIHNetworkMembers from "../components/JdihMembers";
import JDIHUniversityMembers from "../components/JdihUniversityMembers";
import NewsSection from "../components/News";
import LatestRegulations from "../components/LatestRegulations";
import PromperdaRegulations from "../components/PromperdaRegulations";
import Monographic from "../components/Monographic";

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
      <PromperdaRegulations/>
      <Monographic/>
    </div>
  );
}