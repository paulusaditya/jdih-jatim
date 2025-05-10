"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  Facebook,
  ChevronLeftCircle,
  Linkedin,
  Twitter,
} from "lucide-react";
import LoadingSpinner from "../common/LoadingSpinner";

function RelatedNews({ currentArticleId }) {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedArticles();
  }, [currentArticleId]);

  const fetchRelatedArticles = async () => {
    try {
      const response = await fetch(
        `https://jdih.pisdev.my.id/api/v2/topics?webmaster_section_id=3&per_page=10`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      if (data.status === "success") {
        const filteredArticles = data.data.data.filter(
          (article) => article.id !== currentArticleId
        );
        const shuffled = [...filteredArticles].sort(() => 0.5 - Math.random());
        const randomArticles = shuffled.slice(0, 4);
        setRelatedArticles(randomArticles);
      }
    } catch (error) {
      console.error("Error fetching related articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
      date
    );
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  if (loading) return <LoadingSpinner />;
  if (relatedArticles.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedArticles.map((article) => (
        <Link
          key={article.id}
          to={`/news/detail-berita/${
            article.link.startsWith("./")
              ? article.link.substring(2)
              : article.link
          }`}
          className="block group"
        >
          <div className="overflow-hidden rounded-lg mb-3">
            <img
              src={article.image || "/assets/berita/image113.png"}
              alt={article.title}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = "/assets/berita/image113.png";
              }}
            />
          </div>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(article.date)}</span>
            <span className="mx-2">•</span>
            <span className="text-pink-500">Pendidikan</span>
          </div>
          <h3 className="text-base font-semibold leading-tight group-hover:text-blue-600 transition-colors">
            {article.title.length > 60
              ? article.title.substring(0, 60) + "..."
              : article.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}

export default function DetailBeritaPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const shareToSocialMedia = (platform) => {
    const url = window.location.href;
    const title = article.title;
    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "x":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(
            title + " " + url
          )}`,
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchArticleDetail(slug);
  }, [slug]);

  const fetchArticleDetail = async (slug) => {
    setLoading(true);
    try {
      const topicsResponse = await fetch(
        `https://jdih.pisdev.my.id/api/v2/topics?webmaster_section_id=3&per_page=9999`
      );
      if (!topicsResponse.ok) throw new Error("Network response was not ok");

      const topicsData = await topicsResponse.json();
      if (topicsData.status !== "success")
        throw new Error("Failed to fetch topics data");

      const allArticles = topicsData.data.data;
      const matchingArticle = allArticles.find((article) => {
        const articleSlug = article.seo_url_slug_id;
        return articleSlug === slug;
      });

      if (!matchingArticle) throw new Error("Article not found");

      setArticle(matchingArticle);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  if (loading) return <LoadingSpinner />;
  if (error || !article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 text-center">
        <p className="text-red-500">{error || "Artikel tidak ditemukan"}</p>
        <Link to="/news" className="text-blue-600 mt-4 inline-block">
          Kembali ke daftar berita
        </Link>
      </div>
    );
  }

  const placeholderContent = [
    "Figma ipsum component variant main layer...",
    "Background team background fill slice flatten group draft hand...",
    "Duis aute irure dolor in reprehenderit in voluptate...",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <img
          src={article.image || "/assets/berita/imageberita1.png"}
          alt={article.title}
          className="w-full h-auto rounded-lg"
          onError={(e) => {
            e.target.src = "/assets/berita/imageberita1.png";
          }}
        />
      </div>

      <h1 className="text-xl font-bold text-gray-800 mb-4">{article.title}</h1>

      <div className="flex flex-row justify-between items-center mb-6 text-sm text-gray-600">
        <div className="flex items-center text-green-600">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formatDate(article.date)}</span>
        </div>
        <div>Oleh: Biro Humas Provinsi Jawa Timur</div>
      </div>

      {article.details_id ? (
        <div
          className="prose max-w-none mb-8 text-gray-700"
          dangerouslySetInnerHTML={{
            __html: article.details_id.replace(
              /<img\s+[^>]*src=["']([^"']+)["']/gi,
              (match, src) => {
                const newSrc = src.startsWith("http")
                  ? src
                  : `http://files.jdih.jatimprov.go.id/jdih-dev${src}`;
                return match.replace(src, newSrc);
              }
            ),
          }}
        />
      ) : (
        <div className="prose max-w-none mb-8 text-gray-700">
          {placeholderContent.map((p, i) => (
            <p key={i} className="mb-4">
              {i === 1 && (
                <div className="my-6">
                  <img
                    src="/assets/berita/imageberita2.png"
                    alt="Grafik"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}
              {p}
            </p>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t pt-4 pb-4">
        <div className="flex items-center">
          <span className="mr-2 text-sm">Bagikan:</span>
          <div className="flex space-x-2">
            {/* Copy Link */}
            <button
              className="text-gray-600 hover:text-gray-900 flex items-center"
              onClick={() => {
                navigator.clipboard
                  .writeText(window.location.href)
                  .then(() => {
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  })
                  .catch(console.error);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              {copiedLink && (
                <span className="text-xs ml-1">Link URL copy</span>
              )}
            </button>

            {/* Facebook */}
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => shareToSocialMedia("facebook")}
            >
              <Facebook className="h-4 w-4" />
            </button>

            {/* WhatsApp */}
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => shareToSocialMedia("whatsapp")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z"></path>
                <path d="M20.52 3.449C12.831-3.984.106 1.407.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.715 1.447h.006c9.6 0 16.028-9.174 16.028-16.012 0-4.23-1.986-8.072-5.565-10.334zm-5.518 22.311h-.005c-2.608-.001-5.17-.719-7.4-2.075l-.53-.315-5.49 1.434 1.46-5.328-.345-.552c-1.443-2.305-2.208-4.969-2.205-7.7.01-7.958 6.488-14.428 14.465-14.428 3.852.004 7.475 1.498 10.193 4.226 2.726 2.723 4.222 6.35 4.22 10.21-.006 7.953-6.48 14.428-14.453 14.428z"></path>
              </svg>
            </button>

            {/* Twitter (X) */}
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => shareToSocialMedia("x")}
            >
              <Twitter className="h-4 w-4" />
            </button>

            {/* LinkedIn */}
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => shareToSocialMedia("linkedin")}
            >
              <Linkedin className="h-4 w-4" />
            </button>
          </div>
        </div>
        {/* Back button */}
        <Link
          to="/news"
          className="inline-flex items-center text-blue-600 text-sm"
        >
          <ChevronLeftCircle className="h-4 w-4 mr-1" />
          Kembali
        </Link>
      </div>

      {/* Related News */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Berita Lainnya
        </h2>
        <RelatedNews currentArticleId={article.id} />
      </div>
    </div>
  );
}
