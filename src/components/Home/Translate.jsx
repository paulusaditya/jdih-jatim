import { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (document.getElementById('google-translate-script')) return;

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'id',
          includedLanguages: 'id,en,fr,es',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
      
      // Apply styling AFTER Google Translate is fully loaded
      setTimeout(() => {
        applyCustomStyling();
      }, 1500);
    };

    const applyCustomStyling = () => {
      // Style the existing Google Translate button (don't hide it!)
      const translateGadget = document.querySelector('.goog-te-gadget-simple');
      if (translateGadget) {
        // Style the container
        translateGadget.style.cssText = `
          background: #4285f4 !important;
          border: none !important;
          border-radius: 6px !important;
          padding: 0 !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          display: inline-flex !important;
          align-items: center !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
          cursor: pointer !important;
        `;
      }

      // Style the clickable area
      const translateLink = document.querySelector('.goog-te-gadget-simple a');
      if (translateLink) {
        translateLink.style.cssText = `
          color: white !important;
          text-decoration: none !important;
          display: flex !important;
          align-items: center !important;
          padding: 6px 10px !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          gap: 6px !important;
          min-width: 100px !important;
          height: 28px !important;
          box-sizing: border-box !important;
        `;
      }

      // Style the menu value (the text part)
      const menuValue = document.querySelector('.goog-te-gadget-simple .goog-te-menu-value');
      if (menuValue) {
        menuValue.style.cssText = `
          color: white !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
        `;
        
        // Add Indonesia flag and modify text
        const currentText = menuValue.textContent;
        if (!currentText.includes('🇮🇩')) {
          // Find the language text span
          const textSpan = menuValue.querySelector('span:not([style*="border"])');
          if (textSpan) {
            // Replace or modify the text
            if (textSpan.textContent.includes('Indonesia') || textSpan.textContent.includes('Indonesian')) {
              textSpan.innerHTML = '🇮🇩 Indonesia';
            } else {
              textSpan.innerHTML = '🇮🇩 Indonesia';
            }
            textSpan.style.cssText = `
              color: white !important;
              font-size: 13px !important;
              font-weight: 500 !important;
              display: flex !important;
              align-items: center !important;
              gap: 6px !important;
            `;
          }
        }
      }

      // Hide "Powered by" text but keep the functional parts
      const poweredBy = document.querySelector('.goog-te-gadget-simple .goog-te-menu-value span:first-child');
      if (poweredBy && (poweredBy.textContent.includes('Powered by') || poweredBy.textContent.includes('Select Language'))) {
        poweredBy.style.display = 'none';
      }

      // Style the dropdown arrow
      const arrow = document.querySelector('.goog-te-gadget-simple .goog-te-menu-value span[style*="border"]');
      if (arrow) {
        arrow.style.cssText = `
          display: inline-block !important;
          width: 0 !important;
          height: 0 !important;
          margin-left: 6px !important;
          border-left: 4px solid transparent !important;
          border-right: 4px solid transparent !important;
          border-top: 4px solid white !important;
          border-bottom: none !important;
          vertical-align: middle !important;
        `;
        arrow.innerHTML = '';
      }

      // If no arrow found, create one
      if (!arrow && menuValue) {
        const customArrow = document.createElement('span');
        customArrow.style.cssText = `
          display: inline-block !important;
          width: 0 !important;
          height: 0 !important;
          margin-left: 6px !important;
          border-left: 4px solid transparent !important;
          border-right: 4px solid transparent !important;
          border-top: 4px solid white !important;
          border-bottom: none !important;
          vertical-align: middle !important;
        `;
        menuValue.appendChild(customArrow);
      }

      // Add hover effects
      if (translateGadget) {
        translateGadget.addEventListener('mouseenter', () => {
          translateGadget.style.background = '#3367d6 !important';
          translateGadget.style.boxShadow = '0 2px 6px rgba(66, 133, 244, 0.3) !important';
          translateGadget.style.transition = 'all 0.2s ease !important';
        });
        
        translateGadget.addEventListener('mouseleave', () => {
          translateGadget.style.background = '#4285f4 !important';
          translateGadget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1) !important';
        });
      }

      // Style the dropdown menu when it appears
      const observer = new MutationObserver(() => {
        const dropdown = document.querySelector('.goog-te-menu-frame');
        if (dropdown) {
          dropdown.style.cssText = `
            border-radius: 8px !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
            border: 1px solid #dadce0 !important;
            overflow: hidden !important;
          `;
          
          // Style dropdown items
          const items = dropdown.querySelectorAll('.goog-te-menu2-item');
          items.forEach(item => {
            item.style.cssText = `
              padding: 12px 16px !important;
              font-size: 14px !important;
              transition: background-color 0.2s ease !important;
              border-bottom: 1px solid #f1f3f4 !important;
            `;
            
            item.addEventListener('mouseenter', () => {
              item.style.backgroundColor = '#f8f9fa !important';
            });
            
            item.addEventListener('mouseleave', () => {
              item.style.backgroundColor = 'transparent !important';
            });
          });
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

        /* Hide Google Translate banner */
        .goog-te-banner-frame {
          display: none !important;
        }
        
        body {
          top: 0 !important;
        }

        /* Ensure the widget doesn't break layout */
        .translate-widget {
          display: inline-block;
        }

        /* Additional styling for better integration */
        .goog-te-gadget-simple {
          font-size: 0 !important;
        }

        .goog-te-gadget-simple > span {
          font-size: 14px !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleTranslate;