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

const RECAPTCHA_SITE_KEY = "6LdG8HMrAAAAAFcf1y1GyHBKdib7ceVpqcEMrkRM";

export default function KomentarPage() {
  const { id: slug } = useParams();
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicId, setTopicId] = useState(null);
  const [topicData, setTopicData] = useState(null);

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
      console.error("Gagal mengambil Masukan:", err);
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
      console.error("Gagal mengirim masukan:", error);
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

  useEffect(() => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        console.log("reCAPTCHA v3 ready");
      });
    }
  }, []);

  const attachFile = topicData?.attach_file || "";

  const DocumentPreview = () => {
    if (loading) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="w-full h-96 bg-gray-50 flex items-center justify-center animate-pulse">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <p className="text-sm text-gray-600">Memuat pratinjau...</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {attachFile ? (
          <>
            <div className="relative h-96">
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(
                  attachFile
                )}&embedded=true`}
                width="100%"
                height="100%"
                title="Document Preview"
                className="border-0"
              />
            </div>
            <div className="p-3 border-t border-gray-100 bg-gray-50 text-center">
              <p className="text-sm font-medium text-gray-800 line-clamp-2">
                {topicData?.title ||
                  topicData?.seo_title_id ||
                  "Judul tidak tersedia"}
              </p>
            </div>
          </>
        ) : (
          <div className="h-96 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <p className="text-sm text-gray-600">Dokumen tidak tersedia</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const paginatedComments = allComments.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-green-700 mb-2">
          Masukan untuk Dokumen: {topicTitle || `ID ${slug}`}
        </h1>

        {/* PDF untuk Mobile */}
        <div className="md:hidden mb-6">
          <DocumentPreview />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-800">Masukan</h2>
              <NewOldFilter
                onSortChange={handleSortChange}
                newestText="Urutkan Berdasarkan Masukan Terbaru"
                oldestText="Urutkan Berdasarkan Masukan Terlama"
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
                <p className="text-gray-500">Belum ada Masukan.</p>
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
                Berikan Masukan
              </h2>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Nama Anda"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  placeholder="Silahkan Tuliskan Masukan"
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar PDF untuk Desktop */}
          <div className="w-full md:w-80 flex-shrink-0 hidden md:block">
            <DocumentPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
