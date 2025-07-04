import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (document.getElementById("google-translate-script")) return;

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "id",
          includedLanguages: "id,en,fr,es",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );

      setTimeout(() => {
        applyCustomStyling();
      }, 1500);
    };

    const getLanguageFlag = (langCode) => {
      const flags = {
        id: "🇮🇩",
        en: "🇺🇸",
        fr: "🇫🇷",
        es: "🇪🇸",
      };
      return flags[langCode] || "🌐";
    };

    const getLanguageName = (langCode) => {
      const names = {
        id: "Bahasa Indonesia",
        en: "English",
        fr: "Français",
        es: "Español",
      };
      return names[langCode] || "Language";
    };

    const applyCustomStyling = () => {
      const translateGadget = document.querySelector(".goog-te-gadget-simple");
      if (translateGadget) {
        translateGadget.style.cssText = `
          background: #4CAF50 !important;
          border: none !important;
          border-radius: 6px !important;
          padding: 0 !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          display: inline-flex !important;
          align-items: center !important;
          box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2) !important;
          cursor: pointer !important;
          height: 38px !important;
          min-width: 140px !important;
          transition: all 0.2s ease !important;
        `;
      }

      const translateLink = document.querySelector(".goog-te-gadget-simple a");
      if (translateLink) {
        translateLink.style.cssText = `
          color: white !important;
          text-decoration: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding: 8px 14px !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          width: 100% !important;
          height: 100% !important;
          box-sizing: border-box !important;
          border-radius: 6px !important;
        `;
      }

      const menuValue = document.querySelector(
        ".goog-te-gadget-simple .goog-te-menu-value"
      );
      if (menuValue) {
        menuValue.style.cssText = `
          color: white !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
        `;

        const textSpan = menuValue.querySelector('span:not([style*="border"])');
        if (textSpan) {
          textSpan.innerHTML = "🌐 Pilih Bahasa";
          textSpan.style.cssText = `
            color: white !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            flex: 1 !important;
            display: flex !important;
            align-items: center !important;
            gap: 6px !important;
          `;
        }
      }

      const poweredBy = document.querySelector(
        ".goog-te-gadget-simple .goog-te-menu-value span:first-child"
      );
      if (
        poweredBy &&
        (poweredBy.textContent.includes("Powered by") ||
          poweredBy.textContent.includes("Select Language"))
      ) {
        poweredBy.style.display = "none";
      }

      const arrow = document.querySelector(
        '.goog-te-gadget-simple .goog-te-menu-value span[style*="border"]'
      );
      if (arrow) {
        arrow.style.cssText = `
          display: inline-block !important;
          width: 0 !important;
          height: 0 !important;
          margin-left: 8px !important;
          border-left: 4px solid transparent !important;
          border-right: 4px solid transparent !important;
          border-top: 6px solid white !important;
          border-bottom: none !important;
          vertical-align: middle !important;
          opacity: 0.9 !important;
        `;
        arrow.innerHTML = "";
      }

      if (!arrow && menuValue) {
        const customArrow = document.createElement("span");
        customArrow.style.cssText = `
          display: inline-block !important;
          width: 0 !important;
          height: 0 !important;
          margin-left: 8px !important;
          border-left: 4px solid transparent !important;
          border-right: 4px solid transparent !important;
          border-top: 6px solid white !important;
          border-bottom: none !important;
          vertical-align: middle !important;
          opacity: 0.9 !important;
        `;
        menuValue.appendChild(customArrow);
      }

      if (translateGadget) {
        translateGadget.addEventListener("mouseenter", () => {
          translateGadget.style.background = "#45a049 !important";
          translateGadget.style.boxShadow =
            "0 4px 12px rgba(76, 175, 80, 0.3) !important";
          translateGadget.style.transform = "translateY(-1px) !important";
        });

        translateGadget.addEventListener("mouseleave", () => {
          translateGadget.style.background = "#4CAF50 !important";
          translateGadget.style.boxShadow =
            "0 2px 8px rgba(76, 175, 80, 0.2) !important";
          translateGadget.style.transform = "translateY(0) !important";
        });
      }

      const styleIframe = () => {
        const iframe = document.querySelector(
          "iframe.VIpgJd-ZVi9od-xl07Ob-OEVmcd"
        );
        if (iframe) {
          iframe.style.cssText = `
            border-radius: 8px !important;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid #e1e5e9 !important;
            overflow: hidden !important;
            margin-top: 4px !important;
            background: white !important;
            min-width: 200px !important;
            z-index: 9999 !important;
            visibility: visible !important;
            display: block !important;
          `;
        }
      };

      const observer = new MutationObserver(() => {
        styleIframe();

        const dropdown = document.querySelector(".goog-te-menu-frame");
        if (dropdown) {
          dropdown.style.cssText = `
            border-radius: 8px !important;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid #e1e5e9 !important;
            overflow: hidden !important;
            margin-top: 4px !important;
            background: white !important;
            min-width: 200px !important;
          `;

          const dropdownBody = dropdown.querySelector(".goog-te-menu2");
          if (dropdownBody) {
            dropdownBody.style.cssText = `
              background: white !important;
              border: none !important;
              border-radius: 8px !important;
              padding: 8px 0 !important;
            `;
          }

          const items = dropdown.querySelectorAll(".goog-te-menu2-item");
          items.forEach((item, index) => {
            const langCode = item
              .querySelector(".goog-te-menu2-item div")
              ?.textContent?.toLowerCase();
            const langMap = {
              "bahasa indonesia": "id",
              english: "en",
              français: "fr",
              español: "es",
            };

            const actualLangCode = langMap[langCode] || "id";
            const flag = getLanguageFlag(actualLangCode);
            const langName = getLanguageName(actualLangCode);

            item.style.cssText = `
              padding: 12px 16px !important;
              font-size: 14px !important;
              transition: all 0.2s ease !important;
              border-bottom: 1px solid #f1f3f4 !important;
              color: #374151 !important;
              font-weight: 500 !important;
              cursor: pointer !important;
              display: flex !important;
              align-items: center !important;
              gap: 10px !important;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            `;

            if (index === items.length - 1) {
              item.style.borderBottom = "none !important";
            }

            const originalText = item.textContent;
            item.innerHTML = `
              <span style="font-size: 16px; line-height: 1;">${flag}</span>
              <span style="color: #374151; font-weight: 500;">${langName}</span>
            `;

            item.addEventListener("mouseenter", () => {
              item.style.backgroundColor = "#f0f9f0 !important";
              item.style.color = "#22543d !important";
            });

            item.addEventListener("mouseleave", () => {
              item.style.backgroundColor = "transparent !important";
              item.style.color = "#374151 !important";
            });
          });

          const googleLogo = dropdown.querySelector('img[src*="google"]');
          if (googleLogo) {
            googleLogo.style.display = "none !important";
          }

          const poweredByTexts = dropdown.querySelectorAll("*");
          poweredByTexts.forEach((el) => {
            if (el.textContent && el.textContent.includes("Powered by")) {
              el.style.display = "none !important";
            }
          });

          const googleBranding = dropdown.querySelector(
            ".goog-te-menu2-colpad"
          );
          if (googleBranding) {
            googleBranding.style.display = "none !important";
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div className="translate-container">
      <div id="google_translate_element" className="translate-widget" />

      <style>{`
        .translate-container {
          display: inline-block;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .goog-te-banner-frame {
          display: none !important;
        }
        
        body {
          top: 0 !important;
        }

        .translate-widget {
          display: inline-block;
        }

        .goog-te-gadget-simple {
          font-size: 0 !important;
        }

        .goog-te-gadget-simple > span {
          font-size: 14px !important;
        }

        .goog-te-menu-frame {
          z-index: 9999 !important;
        }

        .goog-te-menu2-item img {
          display: none !important;
        }

        .goog-te-menu2-item .goog-te-menu2-item-selected {
          background-color: #f0f9f0 !important;
          color: #22543d !important;
        }

        [class*="goog-te"] [src*="google"] {
          display: none !important;
        }

        .goog-te-menu2-colpad {
          display: none !important;
        }

        /* Iframe specific styling */
        iframe.VIpgJd-ZVi9od-xl07Ob-OEVmcd.skiptranslate {
          border-radius: 8px !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
          border: 1px solid #e1e5e9 !important;
          overflow: hidden !important;
          margin-top: 4px !important;
          background: white !important;
          min-width: 200px !important;
          z-index: 9999 !important;
          transition: all 0.2s ease !important;
        }

        /* Alternative iframe selector */
        iframe[title="Language Translate Widget"] {
          border-radius: 8px !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
          border: 1px solid #e1e5e9 !important;
          overflow: hidden !important;
          margin-top: 4px !important;
          background: white !important;
          min-width: 200px !important;
          z-index: 9999 !important;
          transition: all 0.2s ease !important;
        }

        /* General iframe styling for Google Translate */
        iframe[src*="translate.google"] {
          border-radius: 8px !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
          border: 1px solid #e1e5e9 !important;
          overflow: hidden !important;
          margin-top: 4px !important;
          background: white !important;
          min-width: 200px !important;
          z-index: 9999 !important;
          transition: all 0.2s ease !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleTranslate;
