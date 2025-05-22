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
import Seo from "../../components/common/Seo";
import baseUrl from "../../config/api";

function RelatedNews({ currentArticleId }) {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedArticles();
  }, [currentArticleId]);

  const fetchRelatedArticles = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/topics?webmaster_section_id=3&per_page=99`
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
            article.seo_url_slug_id.startsWith("./")
              ? article.seo_url_slug_id.substring(2)
              : article.seo_url_slug_id
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
        `${baseUrl}/topics?webmaster_section_id=3&per_page=9999`
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
      <Seo
        seoTitle={article.seo_title_id || article.title}
        seoDescription={article.seo_description_id || article.title}
        seoKeywords={article.seo_keywords_id || "berita, Jawa Timur, JDIH"}
      />

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
                return match
                  .replace(src, newSrc)
                  .replace(
                    /<img/gi,
                    '<img class="w-full h-auto rounded-lg my-4 mx-auto block"'
                  );
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
                fill="currentColor"
                stroke="none"
                className="h-4 w-4"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </button>

            {/* Twitter (X) */}
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => shareToSocialMedia("x")}
              aria-label="Share to X"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M18.365 2h3.067l-7.486 8.533 8.801 11.467h-6.921l-5.417-7.114-6.2 7.114H.143l8.229-9.45L.143 2h7.067l4.857 6.6L18.365 2z" />
              </svg>
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
