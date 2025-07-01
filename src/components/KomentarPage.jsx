"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
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

export default function KomentarPage() {
  const { id: slug } = useParams();
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicId, setTopicId] = useState(null);

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
      const topicsRes = await axios.get(
        "https://jdih.pisdev.my.id/api/v2/topics?webmaster_section_id=28"
      );
      const topics = topicsRes.data?.data?.data || [];
      const topic = topics.find((t) => t.seo_url_slug_id === slug);

      if (!topic) {
        setAllComments([]);
        setLoading(false);
        return;
      }

      setTopicTitle(topic.title || topic.seo_title_id);
      setTopicId(topic.id);

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
    if (!name.trim() || !email.trim() || !commentText.trim() || !topicId) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert("Format email tidak valid");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        `https://jdih.pisdev.my.id/api/v2/topics/${topicId}/comments`,
        {
          name: name.trim(),
          email: email.trim(),
          comment: commentText.trim(),
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

  const paginatedComments = allComments.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-green-700 mb-2">
          Komentar untuk Dokumen: {topicTitle || `ID ${slug}`}
        </h1>

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-800">Komentar</h2>
              <NewOldFilter onSortChange={handleSortChange} />
            </div>

            <div className="space-y-6">
              {loading ? (
                <p className="text-gray-500">Memuat komentar...</p>
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
                    disabled={isSubmitting || !name.trim() || !email.trim() || !commentText.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="w-full h-96 bg-gray-50 flex flex-col">
                <div className="p-4 border-b border-gray-200 text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
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
                        className="h-2 bg-gray-300 rounded"
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-gray-100 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center">{topicTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
