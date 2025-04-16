"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Calendar, Instagram, Facebook, MessageCircle, ChevronLeftCircle } from "lucide-react"
import LoadingSpinner from "../common/LoadingSpinner";

// Proxy function to handle logo URL
const proxiedLogo = (logo) =>
  logo?.startsWith("http://")
    ? `https://images.weserv.nl/?url=${logo.replace("http://", "")}`
    : logo

function RelatedNews({ currentArticleId }) {
  const [relatedArticles, setRelatedArticles] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRelatedArticles()
  }, [currentArticleId])

  const fetchRelatedArticles = async () => {
    try {
      const response = await fetch(`https://jdih.pisdev.my.id/api/v2/topics?webmaster_id=3&per_page=10`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()

      if (data.status === "success") {
        // Filter out the current article
        const filteredArticles = data.data.data.filter((article) => article.id !== currentArticleId)

        // Shuffle the articles and take the first 4
        const shuffled = [...filteredArticles].sort(() => 0.5 - Math.random())
        const randomArticles = shuffled.slice(0, 4)

        setRelatedArticles(randomArticles)
      }
    } catch (error) {
      console.error("Error fetching related articles:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    const day = date.getDate()
    const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(date)
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (relatedArticles.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedArticles.map((article) => (
        <Link
          key={article.id}
          to={`/news/detail-berita/${article.link.startsWith("./") ? article.link.substring(2) : article.link}`}
          className="block group"
        >
          <div className="overflow-hidden rounded-lg mb-3">
            <img
              src={proxiedLogo(article.image) || "/assets/berita/image113.png"}
              alt={article.title}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = "/assets/berita/image113.png" // Fallback image
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
            {article.title.length > 60 ? article.title.substring(0, 60) + "..." : article.title}
          </h3>
        </Link>
      ))}
    </div>
  )
}

export default function DetailBeritaPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchArticleDetail(slug)
  }, [slug])

  const fetchArticleDetail = async (slug) => {
    setLoading(true)
    try {
      // First, we need to find the article ID from the slug
      const topicsResponse = await fetch(`https://jdih.pisdev.my.id/api/v2/topics?webmaster_id=3`)
      if (!topicsResponse.ok) {
        throw new Error("Network response was not ok")
      }

      const topicsData = await topicsResponse.json()

      if (topicsData.status !== "success") {
        throw new Error("Failed to fetch topics data")
      }

      // Find the article with matching slug
      const allArticles = topicsData.data.data
      const matchingArticle = allArticles.find((article) => {
        const articleSlug = article.link.startsWith("./") ? article.link.substring(2) : article.link
        return articleSlug === slug
      })

      if (!matchingArticle) {
        throw new Error("Article not found")
      }

      setArticle(matchingArticle)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""

    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" }
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", options)
  }

  if (loading) {
    return (
      <LoadingSpinner />
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 text-center">
        <p className="text-red-500">Error: {error}</p>
        <Link to="/news" className="text-blue-600 mt-4 inline-block">
          Kembali ke daftar berita
        </Link>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6 text-center">
        <p>Artikel tidak ditemukan</p>
        <Link to="/news" className="text-blue-600 mt-4 inline-block">
          Kembali ke daftar berita
        </Link>
      </div>
    )
  }

  // Use placeholder content if no description is available
  const placeholderContent = [
    "Figma ipsum component variant main layer. Italic scale variant stroke background mask fill. Text editor text flatten clip library device. Device rotate text undo component bullet main layer mask line. Content asset layout component selection boolean horizontal origin link content outline vector breakthrough. Line clip flatten create clip text edit. Rectangle star layer outline duplicate shadow arrange. Background layer background fill slice flatten group draft hand. Invite effect follower asset connection text edit. Ellipse italic breakthrough.",
    "Background team background fill slice flatten group draft hand. Invite effect follower asset connection text edit. Ellipse italic breakthrough. Invite background layer mask. Figma auto layout component boolean draft. Blur, auto component draft style. Ellipse, auto layout, component draft style union transform selection effect scrolling.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header Image */}
      <div className="mb-6">
        <img
          src={proxiedLogo(article.image) || "/assets/berita/imageberita1.png"}
          alt={article.title}
          className="w-full h-auto rounded-lg"
          onError={(e) => {
            e.target.src = "/assets/berita/imageberita1.png" // Fallback image
          }}
        />
      </div>

      {/* Article Title */}
      <h1 className="text-xl font-bold text-gray-800 mb-4">{article.title}</h1>

      {/* Date and Author */}
      <div className="flex flex-row justify-between items-center mb-6 text-sm text-gray-600">
        <div className="flex items-center text-green-600">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formatDate(article.date)}</span>
        </div>
        <div className="text-gray-600">Oleh: Biro Humas Provinsi Jawa Timur</div>
      </div>

      {/* Article Content */}
      <div className="prose max-w-none mb-8 text-gray-700">
        {/* Use seo_description_id for content, or placeholder if not available */}
        {article.seo_description_id ? (
          <div>
            {article.seo_description_id
              .replace(/<[^>]*>/g, "") // Remove HTML tags
              .split(/\r?\n/) // Split by newlines
              .filter((para) => para.trim() !== "") // Remove empty paragraphs
              .map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph.trim()}
                </p>
              ))}
          </div>
        ) : (
          <>
            {placeholderContent.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {index === 1 && (
                  <div className="my-6">
                    <img
                      src="/assets/berita/imageberita2.png"
                      alt="Grafik Inflasi"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}
                {paragraph}
              </p>
            ))}
          </>
        )}
      </div>

      {/* Share Buttons - Simple version as in the image */}
      <div className="flex items-center justify-between border-t pt-4 pb-4">
        <div className="flex items-center">
          <span className="mr-2 text-sm">Bagikan:</span>
          <div className="flex space-x-2">
            <button className="text-gray-600">
              <Instagram className="h-4 w-4" />
            </button>
            <button className="text-gray-600">
              <Facebook className="h-4 w-4" />
            </button>
            <button className="text-gray-600">
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Back Button */}
        <Link to="/news" className="inline-flex items-center text-blue-600 text-sm">
          <ChevronLeftCircle className="h-4 w-4 mr-1" />
          Kembali
        </Link>
      </div>
      {/* Related News Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Berita Lainnya</h2>
        <RelatedNews currentArticleId={article.id} />
      </div>
    </div>
  )
}
