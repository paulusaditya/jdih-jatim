import { useEffect } from "react";

function Seo({ seoTitle, seoDescription, seoKeywords }) {
  useEffect(() => {
    document.title = seoTitle || "Default Title";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        seoDescription || "Default description"
      );
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", seoKeywords || "Default keywords");
    }
  }, [seoTitle, seoDescription, seoKeywords]);

  return null; 
}

export default Seo;
