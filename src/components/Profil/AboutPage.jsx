import { useEffect, useState } from "react";

export default function AboutPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Tentang Kami");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jdih.pisdev.my.id/api/v2/topics/1");
        const result = await response.json();
        const { data } = result;

        setTitle(data.title || "Tentang Kami");
        setContent(data.details_id || "");
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-8 py-12">
        <h1 className="text-2xl font-bold text-green-800 mb-6">{title}</h1>

        {content ? (
          <section
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-gray-500">Memuat konten...</p>
        )}
      </div>
    </div>
  );
}
