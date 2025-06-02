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
      // Style the existing Google Translate button to match the green design
      const translateGadget = document.querySelector('.goog-te-gadget-simple');
      if (translateGadget) {
        // Style the container with green background
        translateGadget.style.cssText = `
          background: #4CAF50 !important;
          border: none !important;
          border-radius: 4px !important;
          padding: 0 !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          display: inline-flex !important;
          align-items: center !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
          cursor: pointer !important;
          height: 36px !important;
          min-width: 120px !important;
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
          justify-content: space-between !important;
          padding: 8px 12px !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          width: 100% !important;
          height: 100% !important;
          box-sizing: border-box !important;
        `;
      }

      // Style the menu value (the text part)
      const menuValue = document.querySelector('.goog-te-gadget-simple .goog-te-menu-value');
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
        
        // Replace with "Pilih Bahasa" text
        const textSpan = menuValue.querySelector('span:not([style*="border"])');
        if (textSpan) {
          textSpan.innerHTML = 'Pilih Bahasa';
          textSpan.style.cssText = `
            color: white !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            flex: 1 !important;
          `;
        }
      }

      // Hide "Powered by" text
      const poweredBy = document.querySelector('.goog-te-gadget-simple .goog-te-menu-value span:first-child');
      if (poweredBy && (poweredBy.textContent.includes('Powered by') || poweredBy.textContent.includes('Select Language'))) {
        poweredBy.style.display = 'none';
      }

      // Style the dropdown arrow to match the design
      const arrow = document.querySelector('.goog-te-gadget-simple .goog-te-menu-value span[style*="border"]');
      if (arrow) {
        arrow.style.cssText = `
          display: inline-block !important;
          width: 0 !important;
          height: 0 !important;
          margin-left: 8px !important;
          border-left: 5px solid transparent !important;
          border-right: 5px solid transparent !important;
          border-top: 5px solid white !important;
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
          margin-left: 8px !important;
          border-left: 5px solid transparent !important;
          border-right: 5px solid transparent !important;
          border-top: 5px solid white !important;
          border-bottom: none !important;
          vertical-align: middle !important;
        `;
        menuValue.appendChild(customArrow);
      }

      // Add hover effects with darker green
      if (translateGadget) {
        translateGadget.addEventListener('mouseenter', () => {
          translateGadget.style.background = '#45a049 !important';
          translateGadget.style.boxShadow = '0 3px 6px rgba(76, 175, 80, 0.3) !important';
          translateGadget.style.transition = 'all 0.2s ease !important';
        });
        
        translateGadget.addEventListener('mouseleave', () => {
          translateGadget.style.background = '#4CAF50 !important';
          translateGadget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1) !important';
        });
      }

      // Style the dropdown menu when it appears
      const observer = new MutationObserver(() => {
        const dropdown = document.querySelector('.goog-te-menu-frame');
        if (dropdown) {
          dropdown.style.cssText = `
            border-radius: 4px !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid #e0e0e0 !important;
            overflow: hidden !important;
            margin-top: 2px !important;
          `;
          
          // Style dropdown items
          const items = dropdown.querySelectorAll('.goog-te-menu2-item');
          items.forEach(item => {
            item.style.cssText = `
              padding: 10px 16px !important;
              font-size: 14px !important;
              transition: background-color 0.2s ease !important;
              border-bottom: 1px solid #f5f5f5 !important;
              color: #333 !important;
            `;
            
            item.addEventListener('mouseenter', () => {
              item.style.backgroundColor = '#f0f8f0 !important';
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

        /* Custom styling for the green button */
        .goog-te-gadget-simple:hover {
          transform: translateY(-1px) !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleTranslate;