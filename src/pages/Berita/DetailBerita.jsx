import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import DetailBeritaPage from "../../components/Berita/DetailBeritaPage"
import Breadcrumbs from "../../components/common/Breadcrumbs"

const DetailBerita = () => {
  const { slug } = useParams()
  const [title, setTitle] = useState("Detail Berita")

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await fetch("https://jdih.pisdev.my.id/api/v2/topics?webmaster_id=3")
        const data = await response.json()
        if (data.status === "success") {
          const found = data.data.data.find((item) => {
            const itemSlug = item.link.startsWith("./") ? item.link.substring(2) : item.link
            return itemSlug === slug
          })
          if (found) {
            setTitle(found.title)
          }
        }
      } catch (error) {
        console.error("Gagal mengambil judul berita:", error)
      }
    }

    fetchTitle()
  }, [slug])

  const breadcrumbPaths = [
    { label: "Beranda", path: "/" },
    { label: "Berita", path: "/berita" },
    { label: title, path: `/berita/detail-berita/${slug}` },
  ]

  return (
    <>
      <Breadcrumbs paths={breadcrumbPaths} />
      <DetailBeritaPage slug={slug} />
    </>
  )
}

export default DetailBerita
