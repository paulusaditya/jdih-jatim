import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Website Pemerintah</h1>
        <p>Selamat datang di website resmi...</p>
      </main>
    </div>
  );
}