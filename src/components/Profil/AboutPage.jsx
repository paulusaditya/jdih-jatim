import { useEffect, useState } from "react";
import baseUrl from "../../config/api";
import LoadingSpinner from "../common/LoadingSpinner";

export default function AboutPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Tentang Kami");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/topics/by-slug/tentang-kami`);
        const result = await response.json();
        const { data } = result;

        setTitle(data.title || "Tentang Kami");
        setContent(data.details_id || "<p>Konten tidak tersedia.</p>");
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-8 md:px-0 py-12 mx-auto max-w-7xl" >
        <h1 className="text-2xl font-bold text-green-800 mb-6">{title}</h1>

        {content ? (
          <section
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <LoadingSpinner/>
        )}
      </div>
    </div>
  );
}
