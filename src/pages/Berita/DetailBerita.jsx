import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailBeritaPage from "../../components/Berita/DetailBeritaPage";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import baseUrl from "../../config/api";
import WhatsAppButton from "../../components/common/ChatWaButton";
import FloatingAccessibilityButton from "../../components/common/FloatingAccessibilityButton";

const DetailBerita = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState("Detail Berita");

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/topics?webmaster_section_id=3`
        );
        const data = await response.json();
        if (data.status === "success") {
          const found = data.data.data.find(
            (item) => item.seo_url_slug_id === slug
          );
          if (found) {
            setTitle(found.title);
          }
        }
      } catch (error) {
        console.error("Gagal mengambil judul berita:", error);
      }
    };

    fetchTitle();
  }, [slug]);

  const breadcrumbPaths = [
    { label: "Beranda", path: "/" },
    { label: "Berita", path: "/news" },
    { label: title, path: `/news/detail-berita/${slug}` },
  ];

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <DetailBeritaPage slug={slug} />
      <WhatsAppButton />
      <FloatingAccessibilityButton/>
    </>
  );
};

export default DetailBerita;
