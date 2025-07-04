import { useEffect, useState } from "react";
import baseUrl from "../../config/api";

export default function AboutPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Tentang Kami");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/topics/by-slug/tentang-kami`);
        const result = await response.json();
        const { data } = result;

        setTitle(data.title || "Tentang Kami");
        setContent(data.details_id || "<p>Konten tidak tersedia.</p>");
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setContent("<p>Konten tidak tersedia.</p>");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container px-8 md:px-0 py-12 mx-auto max-w-7xl">
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>

          {/* Content skeleton */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>

            {/* Paragraph break */}
            <div className="py-2"></div>

            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-8 md:px-0 py-12 mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold text-green-800 mb-6">{title}</h1>

        <section
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
