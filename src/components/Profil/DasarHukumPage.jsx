import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../config/api";

const DasarHukumPage = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/topics/by-slug/dasar-hukum`)
      .then((res) => {
        const { data } = res.data;
        setHtmlContent(data?.details_id || "<p>Konten tidak tersedia.</p>");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Memuat...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto bg-gray-100 p-6 md:p-8 rounded-xl shadow-md">
        <div
          className="prose max-w-none prose-p:my-2 prose-li:my-1 prose-a:text-blue-600 prose-strong:text-green-700 prose-p:text-center prose-p:first:text-green-700 prose-p:nth-of-type(2):text-green-700 prose-p:nth-of-type(3):text-green-700"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};

export default DasarHukumPage;
