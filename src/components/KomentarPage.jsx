"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import { Eye, Download } from "lucide-react";
import Pagination from "./common/Pagination";
import NewOldFilter from "./common/NewOldFilter";

dayjs.extend(relativeTime);
dayjs.locale("id");

const avatarColors = [
  "bg-yellow-500",
  "bg-blue-400",
  "bg-orange-500",
  "bg-gray-600",
  "bg-gray-800",
  "bg-amber-600",
  "bg-teal-500",
  "bg-green-500",
];

// Ganti dengan site key milikmu
const RECAPTCHA_SITE_KEY = "6LdG8HMrAAAAAFcf1y1GyHBKdib7ceVpqcEMrkRM";

export default function KomentarPage() {
  const { id: slug } = useParams();
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicId, setTopicId] = useState(null);
  const [topicData, setTopicData] = useState(null);
  const [selectedPreview, setSelectedPreview] = useState("detail");
  const [isLoadingAttachment, setIsLoadingAttachment] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchCommentsBySlug = async () => {
    setLoading(true);
    try {
      // Fetch topic detail by slug
      const topicRes = await axios.get(
        `https://jdih.pisdev.my.id/api/v2/topics/by-slug/${slug}`
      );
      
      if (topicRes.data?.status !== "success") {
        setAllComments([]);
        setLoading(false);
        return;
      }

      const topic = topicRes.data?.data;
      setTopicTitle(topic.title || topic.seo_title_id);
      setTopicId(topic.id);
      setTopicData(topic);

      let comments = [];
      let page = 1;
      let lastPage = 1;

      do {
        const res = await axios.get(
          `https://jdih.pisdev.my.id/api/v2/topics/${topic.id}/comments?page=${page}`
        );
        const data = res.data?.data;
        comments = [...comments, ...(data?.comments || [])];
        lastPage = data?.pagination?.last_page || 1;
        page++;
      } while (page <= lastPage);

      sortAndSetComments(comments, sortOrder);
    } catch (err) {
      console.error("Gagal mengambil komentar:", err);
    } finally {
      setLoading(false);
    }
  };

  const sortAndSetComments = (comments, order) => {
    const sorted = [...comments].sort((a, b) => {
      return order === "desc"
        ? new Date(b.created_at) - new Date(a.created_at)
        : new Date(a.created_at) - new Date(b.created_at);
    });
    setAllComments(sorted);
  };

  useEffect(() => {
    fetchCommentsBySlug();
  }, [slug]);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !commentText.trim() || !topicId)
      return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert("Format email tidak valid");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: "submit_comment",
      });

      await axios.post(
        `https://jdih.pisdev.my.id/api/v2/topics/${topicId}/comments`,
        {
          name: name.trim(),
          email: email.trim(),
          comment: commentText.trim(),
          "g-recaptcha-response": token,
        }
      );

      await fetchCommentsBySlug();
      setName("");
      setEmail("");
      setCommentText("");
    } catch (error) {
      console.error("Gagal mengirim komentar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = (page) => {
    const totalPages = Math.ceil(allComments.length / recordsPerPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    sortAndSetComments(allComments, order);
    setCurrentPage(1);
  };

  const handlePreviewChange = (preview) => {
    setSelectedPreview(preview);
    if (preview === "dokumen") {
      setIsLoadingAttachment(true);
    }
  };

  const handleDownload = () => {
    const url = topicData?.attach_file;
    if (!url) return;

    const decodedFilename = decodeURIComponent(url.split("/").pop());
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", decodedFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const paginatedComments = allComments.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  useEffect(() => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        console.log("reCAPTCHA v3 ready");
      });
    }
  }, []);

  // Get document data
  const fields = topicData?.fields || [];
  const visits = topicData?.visits || 0;
  const judul = topicData?.title || topicData?.seo_title_id || topicTitle;
  const attachFile = topicData?.attach_file || "";
  const documentImage = topicData?.image || "";
  
  // Check if we have abstrak field
  const abstrakField = fields.find((f) =>
    f.title?.toLowerCase().includes("abstrak")
  );
  const hasAbstrak = abstrakField?.details?.trim();

  const DocumentPreview = () => {
    if (loading) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="w-full h-96 bg-gray-50 flex flex-col">
            <div className="p-4 border-b border-gray-200 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-lg">🏛️</span>
              </div>
              <div className="text-xs text-gray-600 leading-tight">
                PEMERINTAH DAERAH
                <br />
                PROVINSI JAWA TENGAH
              </div>
            </div>
            <div className="p-4 flex-1">
              <div className="space-y-2">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="h-2 bg-gray-300 rounded animate-pulse"
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-3 bg-gray-100 border-t border-gray-200">
            <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-lg">📄</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Eye size={16} />
                <span>{visits}</span>
              </div>
              {attachFile && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
                >
                  <Download size={16} />
                </button>
              )}
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
            {judul}
          </h3>
          <p className="text-xs text-gray-500">
            {topicData?.date || "-"}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex text-xs">
            <button
              className={`px-3 py-2 font-medium border-b-2 transition-colors ${
                selectedPreview === "detail"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handlePreviewChange("detail")}
            >
              Detail
            </button>
            {attachFile && (
              <button
                className={`px-3 py-2 font-medium border-b-2 transition-colors ${
                  selectedPreview === "dokumen"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => handlePreviewChange("dokumen")}
              >
                Dokumen
              </button>
            )}
            {hasAbstrak && (
              <button
                className={`px-3 py-2 font-medium border-b-2 transition-colors ${
                  selectedPreview === "abstrak"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => handlePreviewChange("abstrak")}
              >
                Abstrak
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {selectedPreview === "dokumen" && attachFile ? (
            <div className="h-80 relative bg-gray-50">
              {isLoadingAttachment && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                </div>
              )}
              
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(attachFile)}&embedded=true`}
                width="100%"
                height="100%"
                title="Document Preview"
                onLoad={() => setIsLoadingAttachment(false)}
                className="border-0"
              />
              
              {/* PDF Controls Overlay */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
                <span>Halaman</span>
                <span className="bg-white bg-opacity-20 px-2 py-1 rounded">1</span>
                <span>/</span>
                <span>9</span>
                <div className="flex items-center gap-1 ml-2">
                  <button className="w-6 h-6 bg-white bg-opacity-20 rounded flex items-center justify-center hover:bg-opacity-30 transition-colors">
                    <span className="text-xs">+</span>
                  </button>
                </div>
              </div>
            </div>
          ) : selectedPreview === "abstrak" && hasAbstrak ? (
            <div className="p-4 h-80 overflow-y-auto">
              <p className="text-xs text-gray-700 leading-relaxed">
                {hasAbstrak}
              </p>
            </div>
          ) : (
            <div className="p-4 h-80 overflow-y-auto">
              <div className="space-y-3">
                {/* Document Info */}
                <div className="border-b border-gray-100 pb-2">
                  <dt className="text-xs font-medium text-gray-600 mb-1">
                    Judul Dokumen
                  </dt>
                  <dd className="text-xs text-gray-900 break-words">
                    {judul}
                  </dd>
                </div>
                
                <div className="border-b border-gray-100 pb-2">
                  <dt className="text-xs font-medium text-gray-600 mb-1">
                    Tanggal
                  </dt>
                  <dd className="text-xs text-gray-900">
                    {topicData?.date || "-"}
                  </dd>
                </div>
                
                <div className="border-b border-gray-100 pb-2">
                  <dt className="text-xs font-medium text-gray-600 mb-1">
                    Jumlah Komentar
                  </dt>
                  <dd className="text-xs text-gray-900">
                    {topicData?.comment_count || 0}
                  </dd>
                </div>
                
                {/* Custom Fields */}
                {fields.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 pb-2">
                    <dt className="text-xs font-medium text-gray-600 mb-1">
                      {item.title}
                    </dt>
                    <dd className="text-xs text-gray-900 break-words">
                      {item.details.length > 100 ? `${item.details.substring(0, 100)}...` : item.details}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <div className="text-xs text-gray-600 leading-tight text-center">
            JDIH Provinsi Jawa Timur
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-green-700 mb-2">
          Komentar untuk Dokumen: {topicTitle || `ID ${slug}`}
        </h1>

        {/* Sidebar Dokumen - Tampil di atas pada mobile */}
        <div className="w-full md:hidden mb-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="w-full h-96 bg-gray-50 flex flex-col relative">
              {/* PDF Preview */}
              {attachFile && (
                <div className="flex-1 relative">
                  <iframe
                    src={`https://docs.google.com/gview?url=${encodeURIComponent(attachFile)}&embedded=true`}
                    width="100%"
                    height="100%"
                    title="Document Preview"
                    className="border-0"
                  />
                  {/* Overlay controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
                    <span>Halaman</span>
                    <span className="bg-white bg-opacity-20 px-2 py-1 rounded">1</span>
                    <span>/</span>
                    <span>9</span>
                    <div className="flex items-center gap-1 ml-2">
                      <button className="w-6 h-6 bg-white bg-opacity-20 rounded flex items-center justify-center hover:bg-opacity-30">
                        <span className="text-xs">+</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Fallback if no PDF */}
              {!attachFile && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                    <p className="text-sm text-gray-600">Dokumen tidak tersedia</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 bg-gray-100 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center line-clamp-2">
                {topicTitle}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-800">Komentar</h2>
              <NewOldFilter
                onSortChange={handleSortChange}
                newestText="Urutkan Berdasarkan Komentar Terbaru"
                oldestText="Urutkan Berdasarkan Komentar Terlama"
              />
            </div>

            <div className="space-y-6">
              {loading ? (
                <div className="space-y-6">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex gap-4 animate-pulse">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                          <div className="h-3 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded w-full"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : paginatedComments.length === 0 ? (
                <p className="text-gray-500">Belum ada komentar.</p>
              ) : (
                paginatedComments.map((comment, idx) => (
                  <div key={comment.id} className="flex gap-4">
                    <div
                      className={`w-10 h-10 rounded-full ${
                        avatarColors[idx % avatarColors.length]
                      } flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-white font-medium text-sm">
                        {comment.name?.charAt(0) || "U"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">
                          {comment.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {dayjs(comment.created_at).fromNow()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalItems={allComments.length}
                itemsPerPage={recordsPerPage}
                onPageChange={handlePageChange}
              />
            </div>

            <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-6">
                Berikan Komentar
              </h2>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Nama Anda"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  placeholder="Tambahkan Komentar"
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={
                      isSubmitting ||
                      !name.trim() ||
                      !email.trim() ||
                      !commentText.trim()
                    }
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="w-full md:w-80 flex-shrink-0 hidden md:block">
            <DocumentPreview />
          </div>
        </div>
      </div>
    </div>
  );
}