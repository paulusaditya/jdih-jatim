import { useEffect } from "react";

function Seo({ seoTitle, seoDescription, seoKeywords, canonicalUrl }) {
  useEffect(() => {
    document.title = seoTitle || "JDIH Jatim";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        seoDescription ||
          "Jaringan Dokumentasi dan Informasi Hukum Provinsi Jawa Timur - Portal resmi untuk akses dokumen hukum dan informasi legal di Jawa Timur."
      );
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute(
        "content",
        seoDescription ||
          "Jaringan Dokumentasi dan Informasi Hukum Provinsi Jawa Timur - Portal resmi untuk akses dokumen hukum dan informasi legal di Jawa Timur."
      );
      document.head.appendChild(metaDescription);
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute(
        "content",
        seoKeywords ||
          "JDIH, Jawa Timur, dokumen hukum, informasi hukum, peraturan daerah"
      );
    } else {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      metaKeywords.setAttribute(
        "content",
        seoKeywords ||
          "JDIH, Jawa Timur, dokumen hukum, informasi hukum, peraturan daerah"
      );
      document.head.appendChild(metaKeywords);
    }

    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute("href", canonicalUrl);
      } else {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        canonicalLink.setAttribute("href", canonicalUrl);
        document.head.appendChild(canonicalLink);
      }
    }

    return () => {
    };
  }, [seoTitle, seoDescription, seoKeywords, canonicalUrl]);

  return null;
}

export default Seo;
