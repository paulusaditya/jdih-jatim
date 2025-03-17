
import Main from "../components/Main";
import LegalStatsDashboard from "../components/legal-stats-dashboard";
import LegalPortal from "../components/product-law-card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Main />
      <LegalStatsDashboard/>
      <LegalPortal/>

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Website Pemerintah</h1>
        <p>Selamat datang di website resmi...</p>
      </main>
    </div>
  );
}