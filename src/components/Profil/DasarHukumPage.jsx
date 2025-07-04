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

  if (loading) {
    return (
      <div className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto bg-gray-100 p-6 md:p-8 rounded-xl shadow-md">
          <div className="space-y-4">
            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>

            {/* Content skeleton */}
            <div className="space-y-3 mt-6">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>

              {/* List items skeleton */}
              <div className="space-y-2 mt-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-gray-200 rounded-full mt-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                  </div>
                ))}
              </div>

              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

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
